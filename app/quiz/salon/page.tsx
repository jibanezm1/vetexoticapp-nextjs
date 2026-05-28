"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { ref, set, onValue, off } from "firebase/database";
import { QUIZ_TITLE } from "../data/questions";

function SalonContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session") || "";

  const [step, setStep] = useState<"form" | "waiting">("form");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [participantCount, setParticipantCount] = useState(0);
  const participantId = useRef<string>(`p_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`);

  useEffect(() => {
    if (!sessionId) return;
    const stateRef = ref(db, `quiz_sessions/${sessionId}/state`);
    onValue(stateRef, (snap) => {
      const val = snap.val();
      if (val === "playing" && step === "waiting") {
        router.push(`/quiz/juego?session=${sessionId}&pid=${participantId.current}`);
      }
    });
    return () => off(stateRef);
  }, [sessionId, step, router]);

  useEffect(() => {
    if (!sessionId) return;
    const participantsRef = ref(db, `quiz_sessions/${sessionId}/participants`);
    onValue(participantsRef, (snap) => {
      setParticipantCount(Object.keys(snap.val() || {}).length);
    });
    return () => off(participantsRef);
  }, [sessionId]);

  const handleJoin = async () => {
    if (!name.trim()) { setError("Ingresa tu nombre"); return; }
    if (name.trim().length < 2) { setError("Mínimo 2 caracteres"); return; }
    if (!sessionId) { setError("Sesión inválida. Escanea el QR nuevamente."); return; }
    try {
      await set(ref(db, `quiz_sessions/${sessionId}/participants/${participantId.current}`), {
        name: name.trim(),
        joinedAt: Date.now(),
        finished: false,
      });
      setStep("waiting");
    } catch {
      setError("Error al conectar. Intenta nuevamente.");
    }
  };

  return (
    <div className="salon">
      {/* Siluetas decorativas */}
      <div className="salon__deco salon__deco--left">🌿</div>
      <div className="salon__deco salon__deco--right">🌿</div>

      <div className="salon__card">
        <div className="salon__bird">🦅</div>
        <h1 className="salon__title">{QUIZ_TITLE}</h1>
        <div className="salon__divider" />

        {step === "form" ? (
          <>
            <p className="salon__sub">INGRESA TU NOMBRE PARA PARTICIPAR</p>
            <div className="salon__form">
              <input
                className="salon__input"
                type="text"
                placeholder="Tu nombre..."
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleJoin()}
                maxLength={40}
                autoFocus
              />
              {error && <p className="salon__error">{error}</p>}
              <button className="salon__btn" onClick={handleJoin}>
                ENTRAR AL SALÓN →
              </button>
            </div>
          </>
        ) : (
          <div className="salon__waiting">
            <p className="salon__sub">BIENVENIDO/A</p>
            <div className="salon__name">{name}</div>
            <div className="salon__divider" />
            <p className="salon__waiting-msg">Esperando que el anfitrión inicie...</p>
            <div className="salon__counter-wrap">
              <span className="salon__counter-num">{participantCount}</span>
              <span className="salon__counter-lbl">
                {participantCount === 1 ? "PARTICIPANTE EN SALA" : "PARTICIPANTES EN SALA"}
              </span>
            </div>
            <div className="salon__paws">
              <span>🐾</span><span>🐾</span><span>🐾</span>
            </div>
          </div>
        )}
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .salon {
          min-height: 100vh;
          font-family: 'Share Tech', sans-serif;
          background-color: #1b1a14;
          background-image:
            radial-gradient(ellipse at top left, #2a1a00 0%, transparent 55%),
            radial-gradient(ellipse at bottom right, #001a0d 0%, transparent 55%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8a84b' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .salon__deco {
          position: fixed;
          font-size: 5rem;
          opacity: 0.07;
          pointer-events: none;
          user-select: none;
        }
        .salon__deco--left  { bottom: 2rem; left: -1rem; transform: scaleX(-1); }
        .salon__deco--right { bottom: 2rem; right: -1rem; }

        .salon__card {
          background: linear-gradient(160deg, #1e1b0a, #111000);
          border: 1px solid #3a3015;
          border-radius: 8px;
          padding: 2.5rem 2rem;
          width: 100%;
          max-width: 400px;
          text-align: center;
          position: relative;
          box-shadow: 0 0 60px rgba(200,168,75,0.08), 0 20px 60px rgba(0,0,0,0.5);
        }
        .salon__card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #c8a84b, transparent);
        }

        .salon__bird {
          font-size: 3.5rem;
          line-height: 1;
          margin-bottom: 0.75rem;
          filter: drop-shadow(0 0 20px rgba(200,168,75,0.4));
        }
        .salon__title {
          font-size: 1.4rem;
          color: #c8a84b;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          line-height: 1.2;
          margin-bottom: 1rem;
        }
        .salon__divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #3a3015, transparent);
          margin: 1rem 0;
        }
        .salon__sub {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          color: rgba(200,168,75,0.55);
          text-transform: uppercase;
          margin-bottom: 1.25rem;
        }

        .salon__form {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        .salon__input {
          width: 100%;
          padding: 0.85rem 1rem;
          background: rgba(200,168,75,0.06);
          border: 1px solid #3a3015;
          border-radius: 4px;
          color: #f0e6c8;
          font-family: 'Share Tech', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.05em;
          outline: none;
          transition: border-color 0.2s;
        }
        .salon__input::placeholder { color: rgba(240,230,200,0.25); }
        .salon__input:focus { border-color: #c8a84b; box-shadow: 0 0 0 3px rgba(200,168,75,0.08); }
        .salon__error {
          color: #e07070;
          font-size: 0.82rem;
          letter-spacing: 0.05em;
        }
        .salon__btn {
          padding: 0.85rem;
          background: linear-gradient(135deg, #c8a84b, #a07828);
          color: #0d0b00;
          border: none;
          border-radius: 4px;
          font-family: 'Share Tech', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: pointer;
          transition: transform 0.15s, opacity 0.15s;
        }
        .salon__btn:hover { transform: translateY(-2px); opacity: 0.92; }

        /* WAITING */
        .salon__waiting {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
        }
        .salon__name {
          font-size: 2rem;
          color: #f0e6c8;
          letter-spacing: 0.08em;
        }
        .salon__waiting-msg {
          font-size: 0.85rem;
          color: rgba(240,230,200,0.45);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .salon__counter-wrap {
          background: rgba(200,168,75,0.08);
          border: 1px solid rgba(200,168,75,0.2);
          border-radius: 4px;
          padding: 0.75rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 0.5rem 0;
        }
        .salon__counter-num {
          font-size: 2.8rem;
          color: #c8a84b;
          line-height: 1;
        }
        .salon__counter-lbl {
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          color: rgba(200,168,75,0.5);
          text-transform: uppercase;
          margin-top: 0.2rem;
        }
        .salon__paws {
          display: flex;
          gap: 0.5rem;
          font-size: 1.1rem;
          opacity: 0.5;
          animation: paw-pulse 1.5s ease-in-out infinite;
        }
        .salon__paws span:nth-child(2) { animation-delay: 0.25s; }
        .salon__paws span:nth-child(3) { animation-delay: 0.5s; }
        @keyframes paw-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}

export default function SalonPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "#1b1a14", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8a84b", fontFamily: "'Share Tech', sans-serif", letterSpacing: "0.2em" }}>
        CARGANDO...
      </div>
    }>
      <SalonContent />
    </Suspense>
  );
}
