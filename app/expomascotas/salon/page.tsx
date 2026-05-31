"use client";

import { Suspense, useEffect, useId, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { get, ref, set, update } from "firebase/database";
import { db } from "@/lib/firebase";
import {
  EXPO_SESSION_ID,
  EXPO_QUIZ_TIMEOUT_MS,
  EXPO_SESSION_ROOT,
  EXPO_TITLE,
  SpeciesId,
  quizBySpecies,
  speciesOptions,
} from "../data";

const avatarOptions = [
  { id: "conejo", label: "Conejo", url: createAvatar("Conejo", "#ffb857", "#5b2a00", "CO") },
  { id: "huron", label: "Hurón", url: createAvatar("Hurón", "#ff7ab6", "#3e1028", "HU") },
  { id: "hamster", label: "Hámster", url: createAvatar("Hámster", "#ffd84d", "#4a3200", "HA") },
  { id: "cobayo", label: "Cobayo", url: createAvatar("Cobayo", "#8fe0ff", "#032c3a", "CB") },
  { id: "erizo", label: "Erizo", url: createAvatar("Erizo", "#bfa4ff", "#26124f", "ER") },
  { id: "rata", label: "Rata", url: createAvatar("Rata", "#9ff5b2", "#08361d", "RA") },
];

function createAvatar(name: string, bg: string, fg: string, initials: string) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <rect width="512" height="512" rx="96" fill="${bg}"/>
      <circle cx="256" cy="188" r="92" fill="rgba(255,255,255,0.3)"/>
      <path d="M116 438c24-88 92-134 140-134s116 46 140 134" fill="rgba(255,255,255,0.28)"/>
      <text x="256" y="228" text-anchor="middle" font-size="76" font-family="Arial, Helvetica, sans-serif" font-weight="700" fill="${fg}">${initials}</text>
      <text x="256" y="472" text-anchor="middle" font-size="34" font-family="Arial, Helvetica, sans-serif" fill="${fg}">${name}</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function showAlert(message: string) {
  if (typeof window !== "undefined") {
    window.alert(message);
  }
}

function SalonContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session") || EXPO_SESSION_ID;
  const reactId = useId().replace(/:/g, "");
  const participantId = useRef(`expo_${reactId}`);

  const [name, setName] = useState("");
  const [species, setSpecies] = useState<SpeciesId | "">("");
  const [photoDataUrl, setPhotoDataUrl] = useState("");
  const [imageMode, setImageMode] = useState<"camera" | "avatar">("camera");
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0].id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [cameraAvailable, setCameraAvailable] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    let cancelled = false;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user", width: { ideal: 1080 }, height: { ideal: 1080 } },
          audio: false,
        });

        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = stream;
        setCameraAvailable(true);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraReady(true);
        }
      } catch {
        setCameraAvailable(false);
        setCameraReady(false);
        setImageMode("avatar");
      }
    };

    startCamera();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  useEffect(() => {
    if (imageMode !== "camera" || photoDataUrl || !streamRef.current || !videoRef.current) return;

    const attachStream = async () => {
      try {
        videoRef.current!.srcObject = streamRef.current;
        await videoRef.current!.play();
        setCameraReady(true);
      } catch {
        setCameraReady(false);
      }
    };

    void attachStream();
  }, [imageMode, photoDataUrl]);

  const handleCapture = () => {
    if (photoDataUrl) {
      setPhotoDataUrl("");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || !video.videoWidth || !video.videoHeight) {
      showAlert("La cámara aún no está lista.");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      showAlert("No se pudo generar la foto.");
      return;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhotoDataUrl(canvas.toDataURL("image/jpeg", 0.92));
  };

  const uploadPhoto = async () => {
    const blob = await fetch(photoDataUrl).then((response) => response.blob());
    const formData = new FormData();
    formData.append("file", new File([blob], `${participantId.current}.jpg`, { type: "image/jpeg" }));
    formData.append("participantName", name.trim());
    formData.append("species", species);

    const response = await fetch("/api/expomascotas/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error || "No se pudo subir la foto.");
    }

    return data.url as string;
  };

  const selectedAvatarUrl =
    avatarOptions.find((avatar) => avatar.id === selectedAvatar)?.url || avatarOptions[0].url;

  const handleStart = async () => {
    if (!name.trim()) {
      showAlert("Ingresa tu nombre.");
      return;
    }
    if (name.trim().length < 2) {
      showAlert("Tu nombre debe tener al menos 2 caracteres.");
      return;
    }
    if (!species) {
      showAlert("Selecciona una especie.");
      return;
    }
    if (imageMode === "camera" && !photoDataUrl) {
      showAlert("Toma una foto o cambia a avatar para continuar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const sessionRef = ref(db, `${EXPO_SESSION_ROOT}/${sessionId}`);
      const sessionSnapshot = await get(sessionRef);
      const sessionData = sessionSnapshot.val();

      if (sessionData?.state === "playing" && sessionData?.currentParticipantId) {
        showAlert("Hay otro participante respondiendo en este momento. Intenta en unos segundos.");
        setIsSubmitting(false);
        return;
      }

      const photoUrl = imageMode === "camera" ? await uploadPhoto() : selectedAvatarUrl;
      const selectedQuestions = quizBySpecies[species].map((question) => ({
        id: question.id,
        prompt: question.prompt,
        options: question.options.map((option) => option.text),
        correct: question.options.findIndex((option) => option.correct),
      }));

      await set(ref(db, `${EXPO_SESSION_ROOT}/${sessionId}/participants/${participantId.current}`), {
        name: name.trim(),
        species,
        photoUrl,
        joinedAt: Date.now(),
        finished: false,
      });

      const startedAt = Date.now();

      await update(sessionRef, {
        state: "playing",
        currentParticipantId: participantId.current,
        startedAt,
        timeoutAt: startedAt + EXPO_QUIZ_TIMEOUT_MS,
        timedOutAt: null,
        timedOutParticipantId: null,
        currentSpecies: species,
        questions: selectedQuestions,
      });

      if (typeof window !== "undefined") {
        const previewImage = imageMode === "camera" ? photoDataUrl : selectedAvatarUrl;
        window.sessionStorage.setItem(
          `expomascotas-share:${participantId.current}`,
          JSON.stringify({
            participantId: participantId.current,
            imageUrl: previewImage,
            mode: imageMode,
          }),
        );
      }

      router.push(`/expomascotas/juego?session=${sessionId}&pid=${participantId.current}`);
    } catch (submissionError) {
      showAlert(
        submissionError instanceof Error
          ? submissionError.message
          : "No pudimos iniciar el quiz. Intenta nuevamente.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="salon">
      <div className="salon__card">
        <p className="salon__eyebrow">Acceso móvil</p>
        <h1 className="salon__title">{EXPO_TITLE}</h1>
        <p className="salon__copy">
          Completa tus datos, tómate una foto y arranca el quiz de tu especie.
        </p>

        <label className="salon__label">
          Nombre
          <input
            className="salon__input"
            type="text"
            value={name}
            maxLength={40}
            placeholder="Tu nombre"
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label className="salon__label">
          Especie
          <select
            className="salon__input"
            value={species}
            onChange={(event) => {
              const nextSpecies = event.target.value as SpeciesId;
              setSpecies(nextSpecies);
              if (nextSpecies) {
                const matchingAvatar = avatarOptions.find((avatar) => avatar.id === nextSpecies);
                if (matchingAvatar) {
                  setSelectedAvatar(matchingAvatar.id);
                }
              }
            }}
          >
            <option value="">Selecciona una especie</option>
            {speciesOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <div className="salon__modeTabs">
          {cameraAvailable ? (
            <button
              className={`salon__modeBtn ${imageMode === "camera" ? "salon__modeBtn--active" : ""}`}
              type="button"
              onClick={() => setImageMode("camera")}
            >
              Usar cámara
            </button>
          ) : null}
          <button
            className={`salon__modeBtn ${imageMode === "avatar" ? "salon__modeBtn--active" : ""}`}
            type="button"
            onClick={() => setImageMode("avatar")}
          >
            Elegir avatar
          </button>
        </div>

        {!cameraAvailable ? (
          <p className="salon__helper">
            No se detectó permiso de cámara. Usaremos automáticamente un avatar según la especie elegida.
          </p>
        ) : null}

        <div className="salon__cameraWrap">
          {imageMode === "camera" && cameraAvailable ? (
            !photoDataUrl ? (
              <video ref={videoRef} muted playsInline className="salon__video" />
            ) : (
              <img src={photoDataUrl} alt="Vista previa" className="salon__video" />
            )
          ) : (
            <img src={selectedAvatarUrl} alt="Avatar elegido" className="salon__video salon__video--avatar" />
          )}
          <canvas ref={canvasRef} hidden />
        </div>

        {imageMode === "avatar" ? (
          <div className="salon__avatarGrid">
            {avatarOptions.map((avatar) => (
              <button
                key={avatar.id}
                type="button"
                className={`salon__avatarCard ${selectedAvatar === avatar.id ? "salon__avatarCard--active" : ""}`}
                onClick={() => setSelectedAvatar(avatar.id)}
              >
                <img src={avatar.url} alt={avatar.label} className="salon__avatarThumb" />
                <span>{avatar.label}</span>
              </button>
            ))}
          </div>
        ) : null}

        <div className="salon__actions">
          <button
            className="salon__secondary salon__actionBtn salon__actionBtn--dark"
            onClick={handleCapture}
            disabled={!cameraAvailable || imageMode !== "camera" || !cameraReady}
            type="button"
          >
            {photoDataUrl ? "Tomar otra foto" : "Tomar foto"}
          </button>
          <button className="salon__primary salon__actionBtn salon__actionBtn--pink" onClick={handleStart} disabled={isSubmitting} type="button">
            {isSubmitting ? "Iniciando..." : "Comenzar quiz"}
          </button>
        </div>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .salon {
          min-height: 100vh;
          padding: 1.25rem 1.25rem 3rem;
          display: grid;
          place-items: center;
          background:
            linear-gradient(180deg, rgba(12, 18, 13, 0.25), rgba(12, 18, 13, 0.85)),
            url("/images/expomascostas/fondomobile.png") center / cover no-repeat;
          color: #fff8eb;
          font-family: Arial, Helvetica, sans-serif;
        }

        .salon__card {
          width: min(100%, 520px);
          border-radius: 28px;
          background: rgba(12, 15, 13, 0.78);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 248, 235, 0.14);
          padding: 1.35rem 1.35rem 1.9rem;
          display: grid;
          gap: 1.05rem;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
        }

        .salon__eyebrow {
          margin: 0;
          font-size: 0.78rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ffca7a;
        }

        .salon__title {
          margin: 0;
          font-size: clamp(2rem, 7vw, 3.25rem);
          line-height: 0.95;
        }

        .salon__copy {
          margin: 0;
          line-height: 1.5;
        }

        .salon__label {
          display: grid;
          gap: 0.45rem;
          font-size: 0.95rem;
        }

        .salon__input {
          width: 100%;
          border-radius: 16px;
          border: 1px solid rgba(255, 248, 235, 0.14);
          background: rgba(255, 255, 255, 0.06);
          color: #fff8eb;
          padding: 0.95rem 1rem;
          font-size: 1rem;
        }

        .salon__cameraWrap {
          border-radius: 24px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.06);
          aspect-ratio: 1 / 1;
        }

        .salon__modeTabs {
          display: grid;
          grid-template-columns: repeat(${cameraAvailable ? 2 : 1}, 1fr);
          gap: 0.75rem;
        }

        .salon__modeBtn {
          border: 1px solid rgba(255, 248, 235, 0.14);
          background: rgba(255, 255, 255, 0.06);
          color: #fff8eb;
          border-radius: 999px;
          padding: 0.8rem 1rem;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .salon__modeBtn--active {
          background: rgba(255, 202, 122, 0.18);
          border-color: rgba(255, 202, 122, 0.42);
          color: #ffca7a;
        }

        .salon__video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scaleX(-1);
        }

        .salon__video--avatar {
          transform: none;
        }

        .salon__helper {
          margin: 0;
          color: rgba(255, 248, 235, 0.76);
          line-height: 1.45;
          font-size: 0.9rem;
        }

        .salon__avatarGrid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 0.75rem;
        }

        .salon__avatarCard {
          border: 1px solid rgba(255, 248, 235, 0.12);
          background: rgba(255, 255, 255, 0.06);
          border-radius: 18px;
          padding: 0.6rem;
          color: #fff8eb;
          display: grid;
          gap: 0.45rem;
          justify-items: center;
          font-size: 0.82rem;
        }

        .salon__avatarCard--active {
          border-color: rgba(255, 202, 122, 0.48);
          box-shadow: 0 0 0 2px rgba(255, 202, 122, 0.18);
        }

        .salon__avatarThumb {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          border-radius: 16px;
        }

        .salon__actions {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .salon__primary,
        .salon__secondary {
          border: none;
          padding: 0.95rem 1rem;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
        }

        .salon__actionBtn {
          min-height: 62px;
          background-color: transparent;
          background-position: center;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          transition: transform 0.18s ease, filter 0.18s ease;
        }

        .salon__actionBtn:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.01);
          filter: brightness(1.04);
        }

        .salon__actionBtn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }

        .salon__actionBtn--pink {
          background-image: url("/images/botones/after.png");
          color: #fff8eb;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.32);
        }

        .salon__actionBtn--dark {
          background-image: url("/images/botones/accesorapido.png");
          color: #fff8eb;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
}

export default function ExpomascotasSalonPage() {
  return (
    <Suspense fallback={null}>
      <SalonContent />
    </Suspense>
  );
}
