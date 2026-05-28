"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { db } from "@/lib/firebase";
import { ref, onValue, off, set, update } from "firebase/database";
import { QUIZ_TITLE } from "../data/questions";

interface FirebaseQuestion {
  id: number;
  bird: string;
  scientific: string;
  image: string;
  options: string[];
  correct: number;
}

function JuegoContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session") || "";
  const participantId = searchParams.get("pid") || "";

  const [questions, setQuestions] = useState<FirebaseQuestion[]>([]);
  const [gameState, setGameState] = useState<string>("playing");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) return;
    const questionsRef = ref(db, `quiz_sessions/${sessionId}/questions`);
    onValue(questionsRef, (snap) => {
      const data = snap.val();
      if (data) { setQuestions(data); setLoading(false); }
    });
    return () => off(questionsRef);
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;
    const stateRef = ref(db, `quiz_sessions/${sessionId}/state`);
    onValue(stateRef, (snap) => { const v = snap.val(); if (v) setGameState(v); });
    return () => off(stateRef);
  }, [sessionId]);

  const handleSelect = (oi: number) => { if (!confirmed) setSelected(oi); };

  const handleConfirm = async () => {
    if (selected === null) return;
    const newAnswers = { ...answers, [current]: selected };
    setAnswers(newAnswers);
    setConfirmed(true);
    await set(ref(db, `quiz_sessions/${sessionId}/answers/${participantId}/${current}`), selected);
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((c) => c + 1);
        setSelected(null);
        setConfirmed(false);
      } else {
        handleFinish(newAnswers);
      }
    }, 1400);
  };

  const handleFinish = async (finalAnswers: Record<number, number>) => {
    setFinished(true);
    await update(ref(db, `quiz_sessions/${sessionId}/participants/${participantId}`), {
      finished: true, finishedAt: Date.now(),
    });
    const obj: Record<string, number> = {};
    Object.entries(finalAnswers).forEach(([qi, ai]) => { obj[qi] = ai; });
    await set(ref(db, `quiz_sessions/${sessionId}/answers/${participantId}`), obj);
  };

  const getScore = () => {
    if (!questions.length) return 0;
    return Object.entries(answers).filter(([qi, ai]) => {
      const q = questions[Number(qi)];
      return q && ai === q.correct;
    }).length;
  };

  const optionLetters = ["A", "B", "C", "D"];

  // ── LOADING ──
  if (loading) return (
    <Shell>
      <div className="jg-center">
        <div className="jg-spinner" />
        <p className="jg-loading-txt">CARGANDO PREGUNTAS...</p>
      </div>
    </Shell>
  );

  // ── FINALIZADO POR ADMIN ──
  if (gameState === "finished" && !finished) return (
    <Shell>
      <div className="jg-center">
        <div className="jg-end-icon">⏱️</div>
        <h2 className="jg-end-title">EL QUIZ HA FINALIZADO</h2>
        <p className="jg-end-sub">El anfitrión cerró la sesión.</p>
      </div>
    </Shell>
  );

  // ── TERMINÓ ──
  if (finished) {
    const score = getScore();
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    return (
      <Shell>
        <div className="jg-finish">
          <div className="jg-finish-trophy">{pct === 100 ? "🏆" : pct >= 70 ? "🎯" : "💪"}</div>
          <p className="jg-finish-label">RESULTADO FINAL</p>
          <div className="jg-finish-score">
            <span className="jg-finish-num">{score}</span>
            <span className="jg-finish-of">/{total}</span>
          </div>
          <div className="jg-finish-bar-wrap">
            <div className="jg-finish-bar" style={{ width: `${pct}%` }} />
          </div>
          <p className="jg-finish-pct">{pct}% CORRECTO</p>
          <p className="jg-finish-msg">
            {pct === 100 ? "¡PERFECTO! Conoces muy bien las aves rapaces de Chile."
              : pct >= 70 ? "¡EXCELENTE! Muy buen conocimiento ornitológico."
              : pct >= 40 ? "BUEN INTENTO. Sigue aprendiendo sobre estas aves."
              : "Hay mucho por descubrir sobre las aves rapaces."}
          </p>
          <p className="jg-finish-wait">Esperando resultados del anfitrión...</p>
        </div>
      </Shell>
    );
  }

  const q = questions[current];
  if (!q) return null;

  const progress = (current / questions.length) * 100;

  return (
    <Shell>
      {/* Barra de progreso */}
      <div className="jg-progress">
        <div className="jg-progress-fill" style={{ width: `${progress}%` }} />
      </div>
      <div className="jg-counter">
        PREGUNTA <span className="jg-counter-num">{current + 1}</span> DE {questions.length}
      </div>

      {/* Imagen */}
      <div className="jg-img-wrap">
        <img
          src={`/images/quiz/${q.image}`}
          alt="¿Qué ave es esta?"
          className="jg-img"
          onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0.2"; }}
        />
        <div className="jg-img-overlay" />
      </div>

      <h2 className="jg-question">¿CUÁL ES EL NOMBRE DE ESTA AVE RAPAZ?</h2>

      {/* Opciones */}
      <div className="jg-options">
        {q.options.map((opt, oi) => {
          let mod = "";
          if (confirmed) {
            if (oi === q.correct) mod = "jg-opt--correct";
            else if (oi === selected) mod = "jg-opt--wrong";
            else mod = "jg-opt--dim";
          } else if (selected === oi) {
            mod = "jg-opt--selected";
          }
          return (
            <button key={oi} className={`jg-opt ${mod}`} onClick={() => handleSelect(oi)} disabled={confirmed}>
              <span className="jg-opt-letter">{optionLetters[oi]}</span>
              <span className="jg-opt-text">{opt}</span>
              {confirmed && oi === q.correct && <span className="jg-opt-icon">✓</span>}
              {confirmed && oi === selected && oi !== q.correct && <span className="jg-opt-icon jg-opt-icon--x">✗</span>}
            </button>
          );
        })}
      </div>

      {!confirmed && (
        <button className="jg-confirm" onClick={handleConfirm} disabled={selected === null}>
          CONFIRMAR RESPUESTA
        </button>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="jg">
      <div className="jg-card">{children}</div>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .jg {
          min-height: 100vh;
          font-family: 'Share Tech', sans-serif;
          background-color: #1b1a14;
          background-image:
            radial-gradient(ellipse at top, #2a1a00 0%, transparent 60%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8a84b' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          display: flex;
          justify-content: center;
          padding: 1.25rem 1rem 2rem;
          color: #f0e6c8;
        }
        .jg-card {
          width: 100%;
          max-width: 460px;
        }

        /* PROGRESS */
        .jg-progress {
          height: 4px;
          background: rgba(200,168,75,0.15);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 0.6rem;
        }
        .jg-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #c8a84b, #f0d080);
          border-radius: 2px;
          transition: width 0.5s ease;
        }
        .jg-counter {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          color: rgba(200,168,75,0.5);
          text-align: center;
          margin-bottom: 1rem;
        }
        .jg-counter-num { color: #c8a84b; }

        /* IMAGE */
        .jg-img-wrap {
          width: 100%;
          border-radius: 6px;
          overflow: hidden;
          margin-bottom: 1.25rem;
          background: rgba(200,168,75,0.04);
          border: 1px solid #3a3015;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          max-height: 260px;
        }
        .jg-img {
          width: 100%;
          height: auto;
          max-height: 260px;
          object-fit: contain;
          display: block;
        }
        .jg-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, transparent 60%, rgba(27,26,20,0.6) 100%);
          pointer-events: none;
        }

        /* QUESTION */
        .jg-question {
          font-size: 0.9rem;
          letter-spacing: 0.12em;
          text-align: center;
          color: rgba(240,230,200,0.7);
          margin-bottom: 1rem;
        }

        /* OPTIONS */
        .jg-options {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        .jg-opt {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.8rem 1rem;
          background: rgba(200,168,75,0.05);
          border: 1px solid #3a3015;
          border-radius: 4px;
          color: #f0e6c8;
          font-family: 'Share Tech', sans-serif;
          font-size: 0.95rem;
          letter-spacing: 0.04em;
          cursor: pointer;
          text-align: left;
          transition: border-color 0.15s, background 0.15s, transform 0.1s;
        }
        .jg-opt:hover:not(:disabled) {
          border-color: rgba(200,168,75,0.4);
          background: rgba(200,168,75,0.1);
          transform: translateX(4px);
        }
        .jg-opt--selected {
          border-color: #c8a84b !important;
          background: rgba(200,168,75,0.12) !important;
        }
        .jg-opt--correct {
          border-color: #4a9a5a !important;
          background: rgba(74,154,90,0.15) !important;
        }
        .jg-opt--wrong {
          border-color: #9a4a4a !important;
          background: rgba(154,74,74,0.15) !important;
        }
        .jg-opt--dim { opacity: 0.35; }
        .jg-opt-letter {
          width: 26px;
          height: 26px;
          border-radius: 3px;
          background: rgba(200,168,75,0.12);
          border: 1px solid rgba(200,168,75,0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          color: #c8a84b;
          flex-shrink: 0;
        }
        .jg-opt-text { flex: 1; }
        .jg-opt-icon { font-size: 1rem; font-weight: bold; color: #7ddf91; }
        .jg-opt-icon--x { color: #df7d7d; }

        /* CONFIRM */
        .jg-confirm {
          width: 100%;
          padding: 0.85rem;
          background: linear-gradient(135deg, #c8a84b, #a07828);
          color: #0d0b00;
          border: none;
          border-radius: 4px;
          font-family: 'Share Tech', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.15em;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
        }
        .jg-confirm:hover:not(:disabled) { transform: translateY(-2px); }
        .jg-confirm:disabled { opacity: 0.3; cursor: not-allowed; transform: none; }

        /* STATES */
        .jg-center {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
          gap: 1rem;
          text-align: center;
        }
        .jg-spinner {
          width: 44px; height: 44px;
          border: 3px solid rgba(200,168,75,0.15);
          border-top-color: #c8a84b;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .jg-loading-txt {
          font-size: 0.8rem;
          letter-spacing: 0.2em;
          color: rgba(200,168,75,0.5);
        }
        .jg-end-icon { font-size: 3.5rem; }
        .jg-end-title {
          font-size: 1.2rem;
          letter-spacing: 0.1em;
          color: #c8a84b;
        }
        .jg-end-sub {
          font-size: 0.85rem;
          color: rgba(240,230,200,0.4);
          letter-spacing: 0.08em;
        }

        /* FINISH */
        .jg-finish {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 2rem 0;
          text-align: center;
        }
        .jg-finish-trophy { font-size: 4rem; filter: drop-shadow(0 0 20px rgba(200,168,75,0.5)); }
        .jg-finish-label {
          font-size: 0.68rem;
          letter-spacing: 0.22em;
          color: rgba(200,168,75,0.5);
        }
        .jg-finish-score {
          display: flex;
          align-items: baseline;
          gap: 0.2rem;
        }
        .jg-finish-num { font-size: 5rem; color: #c8a84b; line-height: 1; }
        .jg-finish-of  { font-size: 2rem; color: rgba(200,168,75,0.4); }
        .jg-finish-bar-wrap {
          width: 200px;
          height: 6px;
          background: rgba(200,168,75,0.12);
          border-radius: 3px;
          overflow: hidden;
        }
        .jg-finish-bar {
          height: 100%;
          background: linear-gradient(90deg, #c8a84b, #f0d080);
          border-radius: 3px;
          transition: width 1s ease;
        }
        .jg-finish-pct { font-size: 0.85rem; color: #c8a84b; letter-spacing: 0.15em; }
        .jg-finish-msg {
          font-size: 0.9rem;
          color: rgba(240,230,200,0.6);
          max-width: 300px;
          letter-spacing: 0.05em;
          line-height: 1.5;
        }
        .jg-finish-wait {
          font-size: 0.72rem;
          color: rgba(240,230,200,0.3);
          letter-spacing: 0.12em;
          animation: blink 2s ease-in-out infinite;
        }
        @keyframes blink { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.7; } }
      `}</style>
    </div>
  );
}

export default function JuegoPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", background: "#1b1a14", display: "flex", alignItems: "center", justifyContent: "center", color: "#c8a84b", fontFamily: "'Share Tech', sans-serif", letterSpacing: "0.2em" }}>
        CARGANDO...
      </div>
    }>
      <JuegoContent />
    </Suspense>
  );
}
