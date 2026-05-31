"use client";

import { Suspense, useEffect, useId, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { get, ref, set, update } from "firebase/database";
import { db } from "@/lib/firebase";
import {
  EXPO_SESSION_ID,
  EXPO_TITLE,
  SpeciesId,
  quizBySpecies,
  speciesOptions,
} from "../data";

function SalonContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session") || EXPO_SESSION_ID;
  const reactId = useId().replace(/:/g, "");
  const participantId = useRef(`expo_${reactId}`);

  const [name, setName] = useState("");
  const [species, setSpecies] = useState<SpeciesId | "">("");
  const [photoDataUrl, setPhotoDataUrl] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);

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
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          setCameraReady(true);
        }
      } catch {
        setError("No pudimos acceder a la cámara. Revisa los permisos e inténtalo de nuevo.");
      }
    };

    startCamera();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || !video.videoWidth || !video.videoHeight) {
      setError("La cámara aún no está lista.");
      return;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("No se pudo generar la foto.");
      return;
    }

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setPhotoDataUrl(canvas.toDataURL("image/jpeg", 0.92));
    setError("");
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

  const handleStart = async () => {
    if (!name.trim()) return setError("Ingresa tu nombre.");
    if (name.trim().length < 2) return setError("Tu nombre debe tener al menos 2 caracteres.");
    if (!species) return setError("Selecciona una especie.");
    if (!photoDataUrl) return setError("Necesitas tomarte una foto antes de continuar.");

    setIsSubmitting(true);
    setError("");

    try {
      const sessionRef = ref(db, `expomascotas_sessions/${sessionId}`);
      const sessionSnapshot = await get(sessionRef);
      const sessionData = sessionSnapshot.val();

      if (sessionData?.state === "playing" && sessionData?.currentParticipantId) {
        setError("Hay otro participante respondiendo en este momento. Intenta en unos segundos.");
        setIsSubmitting(false);
        return;
      }

      const photoUrl = await uploadPhoto();
      const selectedQuestions = quizBySpecies[species].map((question) => ({
        id: question.id,
        prompt: question.prompt,
        options: question.options.map((option) => option.text),
        correct: question.options.findIndex((option) => option.correct),
      }));

      await set(ref(db, `expomascotas_sessions/${sessionId}/participants/${participantId.current}`), {
        name: name.trim(),
        species,
        photoUrl,
        joinedAt: Date.now(),
        finished: false,
      });

      await update(sessionRef, {
        state: "playing",
        currentParticipantId: participantId.current,
        startedAt: Date.now(),
        currentSpecies: species,
        questions: selectedQuestions,
      });

      router.push(`/expomascotas/juego?session=${sessionId}&pid=${participantId.current}`);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "No pudimos iniciar el quiz. Intenta nuevamente."
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
            onChange={(event) => setSpecies(event.target.value as SpeciesId)}
          >
            <option value="">Selecciona una especie</option>
            {speciesOptions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <div className="salon__cameraWrap">
          {!photoDataUrl ? (
            <video ref={videoRef} muted playsInline className="salon__video" />
          ) : (
            <img src={photoDataUrl} alt="Vista previa" className="salon__video" />
          )}
          <canvas ref={canvasRef} hidden />
        </div>

        <div className="salon__actions">
          <button className="salon__secondary salon__actionBtn salon__actionBtn--dark" onClick={handleCapture} disabled={!cameraReady}>
            {photoDataUrl ? "Tomar otra foto" : "Tomar foto"}
          </button>
          <button className="salon__primary salon__actionBtn salon__actionBtn--pink" onClick={handleStart} disabled={isSubmitting}>
            {isSubmitting ? "Iniciando..." : "Comenzar quiz"}
          </button>
        </div>

        {error ? <p className="salon__error">{error}</p> : null}
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .salon {
          min-height: 100vh;
          padding: 1.25rem;
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
          padding: 1.35rem;
          display: grid;
          gap: 1rem;
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

        .salon__copy, .salon__error {
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

        .salon__video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transform: scaleX(-1);
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

        .salon__error {
          color: #ffb4b4;
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
