"use client";

import { useEffect, useMemo, useState } from "react";
import { off, onValue, ref, remove, serverTimestamp, update } from "firebase/database";
import { db } from "@/lib/firebase";
import { EXPO_SESSION_ID, EXPO_SESSION_ROOT, SpeciesId, speciesCatalog } from "../data";

type SessionState = "idle" | "playing";

interface Participant {
  id?: string;
  name?: string;
  species?: SpeciesId;
  photoUrl?: string;
  joinedAt?: number;
  finished?: boolean;
  score?: number;
  timedOut?: boolean;
}

interface SessionSnapshot {
  state?: SessionState;
  currentParticipantId?: string | null;
  participants?: Record<string, Participant>;
}

export default function ExpomascotasControlPage() {
  const [session, setSession] = useState<SessionSnapshot>({});

  useEffect(() => {
    const sessionRef = ref(db, `${EXPO_SESSION_ROOT}/${EXPO_SESSION_ID}`);
    onValue(sessionRef, (snap) => {
      setSession((snap.val() as SessionSnapshot) || {});
    });
    return () => off(sessionRef);
  }, []);

  const participants = useMemo(() => {
    return Object.entries(session.participants || {})
      .map(([id, participant]) => ({ id, ...participant }))
      .sort((a, b) => (b.joinedAt || 0) - (a.joinedAt || 0));
  }, [session.participants]);

  const activeParticipants = participants.filter((participant) => !participant.finished);
  const completedParticipants = participants.filter((participant) => participant.finished);

  const handleKickParticipant = async (participantId?: string) => {
    if (!participantId) return;

    const updates: Record<string, unknown> = {
      [`participants/${participantId}`]: null,
      [`answers/${participantId}`]: null,
      lastKickedParticipantId: participantId,
      lastKickedAt: serverTimestamp(),
    };

    if (session.currentParticipantId === participantId) {
      updates.state = "idle";
      updates.currentParticipantId = null;
      updates.currentSpecies = null;
      updates.questions = null;
      updates.timeoutAt = null;
      updates.kickedAt = serverTimestamp();
      updates.kickedParticipantId = participantId;
    }

    await update(ref(db, `${EXPO_SESSION_ROOT}/${EXPO_SESSION_ID}`), updates);
  };

  const handleReset = async () => {
    await update(ref(db, `${EXPO_SESSION_ROOT}/${EXPO_SESSION_ID}`), {
      state: "idle",
      currentParticipantId: null,
      currentSpecies: null,
      questions: null,
      timeoutAt: null,
    });
  };

  const handleClearHistory = async () => {
    await remove(ref(db, `${EXPO_SESSION_ROOT}/${EXPO_SESSION_ID}`));
  };

  return (
    <div className="control">
      <header className="control__header">
        <div>
          <p className="control__eyebrow">Vista interna</p>
          <h1 className="control__title">Expomascotas Control</h1>
        </div>
        <div className="control__actions">
          <button className="control__btn control__btn--yellow" onClick={handleReset}>
            Resetear sesión
          </button>
          <button className="control__btn control__btn--dark" onClick={handleClearHistory}>
            Limpiar historial
          </button>
        </div>
      </header>

      <div className="control__summary">
        <span className="control__pill">
          Estado: {session.state === "playing" ? "Quiz activo" : "En espera"}
        </span>
        <span className="control__pill">Total participantes: {participants.length}</span>
      </div>

      <main className="control__grid">
        <section className="control__panel">
          <h2 className="control__panelTitle">Respondiendo o pendientes</h2>
          <div className="control__list">
            {activeParticipants.length > 0 ? activeParticipants.map((participant) => (
              <article key={participant.id} className="control__card">
                <div className="control__meta">
                  <h3>{participant.name || "Participante"}</h3>
                  <p>{speciesCatalog[participant.species as SpeciesId]?.label || "Especie no indicada"}</p>
                </div>
                <button className="control__kick" onClick={() => handleKickParticipant(participant.id)}>
                  Patear
                </button>
              </article>
            )) : <div className="control__empty">No hay participantes activos.</div>}
          </div>
        </section>

        <section className="control__panel">
          <h2 className="control__panelTitle">Ya participaron</h2>
          <div className="control__list">
            {completedParticipants.length > 0 ? completedParticipants.map((participant) => (
              <article key={participant.id} className="control__card">
                <div className="control__meta">
                  <h3>{participant.name || "Participante"}</h3>
                  <p>
                    {speciesCatalog[participant.species as SpeciesId]?.label || "Especie no indicada"}
                    {" · "}
                    {participant.score ?? 0} pts
                    {participant.timedOut ? " · timeout" : ""}
                  </p>
                </div>
                <button className="control__kick" onClick={() => handleKickParticipant(participant.id)}>
                  Patear
                </button>
              </article>
            )) : <div className="control__empty">Todavía no hay participantes finalizados.</div>}
          </div>
        </section>
      </main>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }
        .control {
          min-height: 100vh;
          padding: 2rem;
          background: #11140f;
          color: #fff8eb;
          font-family: Arial, Helvetica, sans-serif;
        }
        .control__header, .control__summary, .control__actions {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
        }
        .control__eyebrow {
          margin: 0 0 0.4rem;
          color: #ffca7a;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-size: 0.78rem;
        }
        .control__title, .control__panelTitle {
          margin: 0;
        }
        .control__summary {
          margin: 1.5rem 0;
        }
        .control__pill {
          padding: 0.75rem 1rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.06);
        }
        .control__grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }
        .control__panel {
          border-radius: 24px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          padding: 1rem;
        }
        .control__list {
          display: grid;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .control__card {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          align-items: center;
          padding: 0.9rem 1rem;
          border-radius: 18px;
          background: rgba(255,255,255,0.05);
        }
        .control__meta h3, .control__meta p {
          margin: 0;
        }
        .control__meta p {
          color: rgba(255,248,235,0.72);
          margin-top: 0.25rem;
        }
        .control__kick, .control__btn {
          border: none;
          border-radius: 999px;
          padding: 0.8rem 1rem;
          font-weight: 700;
          cursor: pointer;
        }
        .control__kick {
          background: rgba(255, 91, 91, 0.18);
          color: #fff3f3;
        }
        .control__btn--yellow {
          background: #ffca7a;
          color: #241606;
        }
        .control__btn--dark {
          background: #23221c;
          color: #fff8eb;
          border: 1px solid rgba(255,255,255,0.12);
        }
        .control__empty {
          color: rgba(255,248,235,0.68);
          padding: 1rem 0.25rem;
        }
        @media (max-width: 900px) {
          .control {
            padding: 1rem;
          }
          .control__grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
