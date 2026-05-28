"use client";

import { useEffect, useState, useRef } from "react";
import { db } from "@/lib/firebase";
import { ref, set, onValue, off, remove, update } from "firebase/database";
import { questions, QUIZ_TITLE } from "./data/questions";
import QuizResults from "./components/QuizResults";
import QRCode from "./components/QRCode";

type GameState = "waiting" | "playing" | "finished";

interface Participant {
  name: string;
  joinedAt: number;
  finished?: boolean;
}
interface ParticipantMap {
  [id: string]: Participant;
}

export default function QuizAdminPage() {
  const [gameState, setGameState] = useState<GameState>("waiting");
  const [participants, setParticipants] = useState<ParticipantMap>({});
  const [salonUrl, setSalonUrl] = useState("");
  const [finishedCount, setFinishedCount] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Record<number, number>>>({});

  const sessionId = useRef<string>(`quiz_${Date.now()}`);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSalonUrl(`${window.location.origin}/quiz/salon?session=${sessionId.current}`);
    }
  }, []);

  useEffect(() => {
    const participantsRef = ref(db, `quiz_sessions/${sessionId.current}/participants`);
    onValue(participantsRef, (snap) => {
      const data = snap.val() || {};
      setParticipants(data);
      const done = Object.values(data as ParticipantMap).filter((p) => p.finished).length;
      setFinishedCount(done);
    });
    return () => off(participantsRef);
  }, []);

  useEffect(() => {
    const stateRef = ref(db, `quiz_sessions/${sessionId.current}/state`);
    onValue(stateRef, (snap) => {
      const val = snap.val();
      if (val) setGameState(val as GameState);
    });
    return () => off(stateRef);
  }, []);

  useEffect(() => {
    const answersRef = ref(db, `quiz_sessions/${sessionId.current}/answers`);
    onValue(answersRef, (snap) => setAnswers(snap.val() || {}));
    return () => off(answersRef);
  }, []);

  const handleComenzar = async () => {
    await update(ref(db, `quiz_sessions/${sessionId.current}`), {
      state: "playing",
      startedAt: Date.now(),
      questions: questions.map((q) => ({
        id: q.id,
        bird: q.bird,
        scientific: q.scientific,
        image: q.image,
        options: q.options.map((o) => o.text),
        correct: q.options.findIndex((o) => o.correct),
      })),
    });
    setGameState("playing");
  };

  const handleFinalizar = async () => {
    await update(ref(db, `quiz_sessions/${sessionId.current}`), { state: "finished" });
    setGameState("finished");
  };

  const handleReiniciar = async () => {
    await remove(ref(db, `quiz_sessions/${sessionId.current}`));
    sessionId.current = `quiz_${Date.now()}`;
    if (typeof window !== "undefined") {
      setSalonUrl(`${window.location.origin}/quiz/salon?session=${sessionId.current}`);
    }
    setParticipants({});
    setAnswers({});
    setFinishedCount(0);
    setGameState("waiting");
  };

  const total = Object.keys(participants).length;

  return (
    <div className="qa">
      {/* Header estilo safari */}
      <header className="qa-header">
        <div className="qa-header__inner">
          <div className="qa-header__brand">
            <span className="qa-header__icon">🦅</span>
            <div>
              <div className="qa-header__title">{QUIZ_TITLE}</div>
              <div className="qa-header__sub">Panel del Anfitrión</div>
            </div>
          </div>
          <span className={`qa-badge qa-badge--${gameState}`}>
            {gameState === "waiting" && "⏳ En espera"}
            {gameState === "playing" && "▶ En curso"}
            {gameState === "finished" && "✅ Finalizado"}
          </span>
        </div>
      </header>

      <main className="qa-main">
        {gameState !== "finished" ? (
          <div className="qa-grid">
            {/* QR */}
            <section className="qa-card qa-card--qr">
              <div className="qa-card__label">ESCANEA PARA UNIRTE</div>
              {salonUrl && <QRCode url={salonUrl} />}
              <p className="qa-url">{salonUrl}</p>
            </section>

            {/* Participantes */}
            <section className="qa-card qa-card--participants">
              <div className="qa-card__label">PARTICIPANTES</div>
              <div className="qa-count-row">
                <span className="qa-count">{total}</span>
                <span className="qa-count-label">en sala</span>
                {gameState === "playing" && (
                  <span className="qa-done">{finishedCount}/{total} terminaron</span>
                )}
              </div>

              <div className="qa-list">
                {total === 0 ? (
                  <div className="qa-empty">Esperando participantes...</div>
                ) : (
                  Object.entries(participants).map(([id, p]) => (
                    <div key={id} className="qa-participant">
                      <span className="qa-avatar">{p.name.charAt(0).toUpperCase()}</span>
                      <span className="qa-pname">{p.name}</span>
                      {gameState === "playing" && (
                        <span className={`qa-status ${p.finished ? "qa-status--done" : ""}`}>
                          {p.finished ? "✓" : "···"}
                        </span>
                      )}
                    </div>
                  ))
                )}
              </div>

              <div className="qa-controls">
                {gameState === "waiting" && (
                  <button className="qa-btn qa-btn--green" onClick={handleComenzar} disabled={total === 0}>
                    ▶ COMENZAR QUIZ
                  </button>
                )}
                {gameState === "playing" && (
                  <button className="qa-btn qa-btn--red" onClick={handleFinalizar}>
                    ⏹ FINALIZAR Y VER RESULTADOS
                  </button>
                )}
              </div>
            </section>
          </div>
        ) : (
          <div className="qa-results">
            <QuizResults answers={answers} participants={participants} />
            <button className="qa-btn qa-btn--outline" onClick={handleReiniciar}>
              🔄 NUEVA SESIÓN
            </button>
          </div>
        )}
      </main>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .qa {
          min-height: 100vh;
          font-family: 'Share Tech', sans-serif;
          background-color: #1b1a14;
          background-image:
            radial-gradient(ellipse at top, #2a2200 0%, transparent 60%),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c8a84b' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          color: #f0e6c8;
        }

        /* HEADER */
        .qa-header {
          background: linear-gradient(90deg, #0d0b00 0%, #1a1500 50%, #0d0b00 100%);
          border-bottom: 2px solid #c8a84b;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .qa-header__inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 1rem 1.5rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }
        .qa-header__brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        .qa-header__icon { font-size: 2.2rem; line-height: 1; }
        .qa-header__title {
          font-size: 1.4rem;
          font-family: 'Share Tech', sans-serif;
          color: #c8a84b;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          line-height: 1.1;
        }
        .qa-header__sub {
          font-size: 0.7rem;
          color: rgba(200,168,75,0.55);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .qa-badge {
          padding: 0.3rem 0.9rem;
          border-radius: 4px;
          font-size: 0.8rem;
          letter-spacing: 0.1em;
          font-family: 'Share Tech', sans-serif;
          border: 1px solid;
        }
        .qa-badge--waiting  { color: #aaa; border-color: #444; background: rgba(255,255,255,0.04); }
        .qa-badge--playing  { color: #7ddf91; border-color: #3a7a47; background: rgba(61,122,70,0.2); }
        .qa-badge--finished { color: #c8a84b; border-color: #7a6020; background: rgba(122,96,32,0.2); }

        /* MAIN */
        .qa-main {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }

        /* GRID */
        .qa-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          align-items: start;
        }
        @media (max-width: 720px) {
          .qa-grid { grid-template-columns: 1fr; }
        }

        /* CARDS */
        .qa-card {
          background: linear-gradient(145deg, #1e1b0a, #141200);
          border: 1px solid #3a3015;
          border-radius: 8px;
          padding: 1.75rem;
          position: relative;
          overflow: hidden;
        }
        .qa-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c8a84b' fill-opacity='0.03'%3E%3Cpath d='M20 0L0 20 20 40 40 20z'/%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }
        .qa-card__label {
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          color: #c8a84b;
          border-bottom: 1px solid #3a3015;
          padding-bottom: 0.6rem;
          margin-bottom: 1.25rem;
          text-transform: uppercase;
        }

        /* QR */
        .qa-card--qr { text-align: center; }
        .qa-url {
          font-size: 0.68rem;
          color: rgba(200,168,75,0.4);
          word-break: break-all;
          margin-top: 1rem;
          font-family: monospace;
        }

        /* PARTICIPANTS */
        .qa-count-row {
          display: flex;
          align-items: baseline;
          gap: 0.5rem;
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .qa-count {
          font-size: 3rem;
          color: #c8a84b;
          line-height: 1;
        }
        .qa-count-label {
          font-size: 0.9rem;
          color: rgba(240,230,200,0.5);
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .qa-done {
          margin-left: auto;
          font-size: 0.85rem;
          color: #7ddf91;
          background: rgba(61,122,70,0.15);
          border: 1px solid #3a7a47;
          border-radius: 4px;
          padding: 0.2rem 0.6rem;
        }

        .qa-list {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          max-height: 280px;
          overflow-y: auto;
          margin-bottom: 1.5rem;
          scrollbar-width: thin;
          scrollbar-color: #3a3015 transparent;
        }
        .qa-empty {
          text-align: center;
          color: rgba(240,230,200,0.3);
          font-size: 0.9rem;
          padding: 2rem 0;
          letter-spacing: 0.1em;
        }
        .qa-participant {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          background: rgba(200,168,75,0.06);
          border: 1px solid rgba(200,168,75,0.12);
          border-radius: 4px;
          padding: 0.5rem 0.8rem;
        }
        .qa-avatar {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #c8a84b;
          color: #0d0b00;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          font-weight: bold;
          flex-shrink: 0;
        }
        .qa-pname { flex: 1; font-size: 0.95rem; letter-spacing: 0.05em; }
        .qa-status { color: rgba(240,230,200,0.3); font-size: 0.9rem; }
        .qa-status--done { color: #7ddf91; }

        /* CONTROLS */
        .qa-controls { display: flex; gap: 1rem; flex-wrap: wrap; }
        .qa-btn {
          font-family: 'Share Tech', sans-serif;
          font-size: 1rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.75rem 1.75rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: transform 0.15s, opacity 0.15s;
        }
        .qa-btn:hover { transform: translateY(-2px); }
        .qa-btn:disabled { opacity: 0.35; cursor: not-allowed; transform: none; }
        .qa-btn--green {
          background: linear-gradient(135deg, #3a7a47, #2a5a34);
          color: #c8f0d0;
          border: 1px solid #4a9a5a;
        }
        .qa-btn--red {
          background: linear-gradient(135deg, #7a2a2a, #5a1a1a);
          color: #f0c8c8;
          border: 1px solid #9a4a4a;
        }
        .qa-btn--outline {
          background: transparent;
          color: #c8a84b;
          border: 1px solid #c8a84b;
        }
        .qa-btn--outline:hover { background: rgba(200,168,75,0.1); }

        /* RESULTS */
        .qa-results {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
      `}</style>
    </div>
  );
}
