"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useState } from "react";
import { off, onValue, ref, update } from "firebase/database";
import QRCode from "@/app/quiz/components/QRCode";
import { db } from "@/lib/firebase";
import {
  EXPO_SESSION_ID,
  EXPO_QUIZ_TIMEOUT_MS,
  EXPO_SESSION_ROOT,
  SpeciesId,
  getSpeciesImage,
  speciesCatalog,
} from "./data";

type SessionState = "idle" | "playing";

interface Participant {
  id?: string;
  name: string;
  species: SpeciesId;
  photoUrl?: string;
  joinedAt: number;
  finished?: boolean;
  timedOut?: boolean;
  timedOutAt?: number;
  score?: number;
  totalQuestions?: number;
  tutorLevelTitle?: string;
}

interface SessionSnapshot {
  state?: SessionState;
  currentParticipantId?: string | null;
  currentSpecies?: SpeciesId | null;
  timeoutAt?: number | null;
  timedOutAt?: number | null;
  timedOutParticipantId?: string | null;
  participants?: Record<string, Participant>;
}

export default function ExpomascotasPage() {
  const [salonUrl, setSalonUrl] = useState("");
  const [session, setSession] = useState<SessionSnapshot>({});
  const [now, setNow] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const frame = window.requestAnimationFrame(() => {
        setSalonUrl(
          `${window.location.origin}/expomascotas/salon?session=${EXPO_SESSION_ID}`,
        );
      });
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setHydrated(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const sessionRef = ref(db, `${EXPO_SESSION_ROOT}/${EXPO_SESSION_ID}`);
    onValue(sessionRef, (snap) => {
      setSession((snap.val() as SessionSnapshot) || {});
    });
    return () => off(sessionRef);
  }, []);

  useEffect(() => {
    if (session.state !== "playing") return;

    const frame = window.requestAnimationFrame(() => {
      setNow(Date.now());
    });

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(timer);
    };
  }, [session.state]);

  const currentParticipant = useMemo(() => {
    const participants = session.participants || {};
    if (
      session.currentParticipantId &&
      participants[session.currentParticipantId]
    ) {
      return {
        id: session.currentParticipantId,
        ...participants[session.currentParticipantId],
      };
    }

    const activeEntries = Object.entries(participants)
      .filter(([, participant]) => !participant.finished)
      .sort(([, a], [, b]) => b.joinedAt - a.joinedAt)
      .map(([id, participant]) => ({ id, ...participant }));

    return activeEntries[0] || null;
  }, [session]);

  const isPlaying = session.state === "playing" && currentParticipant;
  const displayIsPlaying = hydrated && Boolean(isPlaying);
  const rankingParticipants = useMemo(() => {
    return Object.entries(session.participants || {})
      .filter(([, participant]) => participant.finished)
      .map(([id, participant]) => ({ id, ...participant }))
      .sort((a, b) => {
        const scoreDiff = (b.score || 0) - (a.score || 0);
        if (scoreDiff !== 0) return scoreDiff;
        return b.joinedAt - a.joinedAt;
      });
  }, [session.participants]);
  const shouldAutoScrollRanking = rankingParticipants.length > 6;
  const rankingTrack = shouldAutoScrollRanking
    ? [...rankingParticipants, ...rankingParticipants]
    : rankingParticipants;
  const rankingDurationSeconds = Math.max(
    26,
    rankingParticipants.length * 3.8,
  );
  const activeSpecies =
    session.currentSpecies || currentParticipant?.species || null;
  const activeImage = getSpeciesImage(activeSpecies);
  const backgroundImage =
    displayIsPlaying && activeImage
      ? `/images/expomascostas/${activeImage}`
      : "/images/expomascostas/fondo.png";
  const remainingMs = session.timeoutAt
    ? Math.max(0, session.timeoutAt - now)
    : EXPO_QUIZ_TIMEOUT_MS;
  const remainingSeconds = Math.ceil(remainingMs / 1000);
  const countdownLabel = `${String(Math.floor(remainingSeconds / 60)).padStart(2, "0")}:${String(
    remainingSeconds % 60,
  ).padStart(2, "0")}`;

  useEffect(() => {
    if (
      session.state !== "playing" ||
      !session.timeoutAt ||
      now < session.timeoutAt
    )
      return;

    const participantId = session.currentParticipantId;
    const timedOutAt = Date.now();

    const resetForTimeout = async () => {
      await update(ref(db, `${EXPO_SESSION_ROOT}/${EXPO_SESSION_ID}`), {
        state: "idle",
        currentParticipantId: null,
        currentSpecies: null,
        questions: null,
        timeoutAt: null,
        timedOutAt,
        timedOutParticipantId: participantId || null,
      });

      if (participantId) {
        await update(
          ref(
            db,
            `${EXPO_SESSION_ROOT}/${EXPO_SESSION_ID}/participants/${participantId}`,
          ),
          { timedOut: true, timedOutAt },
        );
      }
    };

    void resetForTimeout();
  }, [now, session.currentParticipantId, session.state, session.timeoutAt]);

  return (
    <div className="expo">
      <section className="expo__left">
        <div className="expo__panel">
          {displayIsPlaying && currentParticipant ? (
            <div className="expo__sidebarLive">
              <p className="expo__eyebrow">PARTICIPANTE ACTUAL</p>
              <h2 className="expo__introTitle expo__introTitle--live">
                {currentParticipant.name}
              </h2>
              <p className="expo__participantSpecies expo__participantSpecies--sidebar">
                {speciesCatalog[currentParticipant.species]?.label}
              </p>
              <div className="expo__timer expo__timer--sidebar">
                <span className="expo__timerLabel">Tiempo restante</span>
                <strong className="expo__timerValue">{countdownLabel}</strong>
              </div>
              {currentParticipant.photoUrl ? (
                <img
                  src={currentParticipant.photoUrl}
                  alt={currentParticipant.name}
                  className="expo__participantPhoto expo__participantPhoto--sidebar"
                />
              ) : null}
            </div>
          ) : (
            <>
              <p className="expo__eyebrow">ACTIVACIÓN EN VIVO</p>
              <div className="expo__introNote">
                <h3 className="expo__introTitle">Escanea y participa</h3>
              </div>

              <div className="expo__qrCard">
                {salonUrl && <QRCode url={salonUrl} />}
                <img
                  src="/images/expomascostas/logosansebastian.png"
                  alt="Logo San Sebastián"
                  className="expo__qrLogo"
                />
              </div>

              <div className="expo__status">
                <span className="expo__badge">Esperando participante</span>
              </div>
            </>
          )}
        </div>
      </section>

      <section
        className={`expo__stage ${isPlaying ? "expo__stage--active" : ""}`}
        style={{ ["--expo-bg" as string]: `url(${backgroundImage})` }}
      >
        <div className="expo__overlay" />
        <div className="expo__mobileIdle" />

        {!displayIsPlaying ? (
          <div className="expo__ranking">
            <div className="expo__rankingHeader">
              <p className="expo__participantLabel">Ranking de tutores</p>
            </div>

            <div className="expo__rankingViewport">
              <div
                className={`expo__rankingTrack ${shouldAutoScrollRanking ? "expo__rankingTrack--animated" : ""}`}
                style={
                  {
                    ["--ranking-duration" as string]: `${rankingDurationSeconds}s`,
                  } as CSSProperties
                }
              >
              {rankingParticipants.length > 0 ? (
                rankingTrack.map((participant, index) => (
                  <article
                    key={`${participant.id || participant.name}-${participant.joinedAt}-${index}`}
                    className="expo__rankingCard"
                    aria-hidden={shouldAutoScrollRanking && index >= rankingParticipants.length}
                  >
                    <div className="expo__rankingPosition">
                      {(index % rankingParticipants.length) + 1}
                    </div>
                    {participant.photoUrl ? (
                      <img
                        src={participant.photoUrl}
                        alt={participant.name}
                        className="expo__rankingPhoto"
                      />
                    ) : (
                      <div className="expo__rankingPhoto expo__rankingPhoto--placeholder">
                        {(
                          participant.name?.trim()?.charAt(0) || "?"
                        ).toUpperCase()}
                      </div>
                    )}
                    <div className="expo__rankingMeta">
                      <h3 className="expo__rankingName">
                        {participant.name || "Participante"}
                      </h3>
                      <p className="expo__rankingSpecies">
                        {speciesCatalog[participant.species]?.label ||
                          "Especie no indicada"}
                      </p>
                    </div>
                    <div className="expo__rankingScore">
                      <span>{participant.score ?? 0}</span>
                      <small>pts</small>
                    </div>
                  </article>
                ))
              ) : (
                <div className="expo__rankingEmpty">
                  Aún no hay tutores en el ranking. Se llenará a medida que
                  respondan el quiz.
                </div>
              )}
              </div>
            </div>
          </div>
        ) : null}
      </section>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .expo {
          min-height: 100vh;
          display: grid;
          grid-template-columns: minmax(320px, 440px) 1fr;
          background: #0f130d;
          color: #fff8eb;
          font-family: Arial, Helvetica, sans-serif;
        }

        .expo__left {
          position: relative;
          padding: 2rem;
          background:
            url("/images/expomascostas/lateral.png") center / cover no-repeat;
          overflow: hidden;
        }

        .expo__left::after {
          content: "";
          position: absolute;
          top: 0;
          right: -1px;
          width: 18px;
          height: 100%;
          opacity: 0.45;
        }

        .expo__panel {
          position: relative;
          z-index: 1;
          min-height: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .expo__sidebarLive {
          display: grid;
          gap: 1rem;
          align-content: start;
        }

        .expo__introNote {
          display: grid;
          gap: 0.65rem;
          padding: 1.1rem 1.2rem;
          border-radius: 22px;

        }

        .expo__introTitle {
          margin: 0;
          font-size: clamp(1.2rem, 3vw, 2.8rem);
          line-height: 0.95;
          letter-spacing: -0.05em;
        }

        .expo__introTitle--live {
          font-size: clamp(1.8rem, 3.6vw, 3.4rem);
        }

        .expo__introCopy {
          margin: 0;
          color: rgba(255, 248, 235, 0.78);
          line-height: 1.45;
        }

        .expo__eyebrow {
          margin: 0;
          font-size: 0.75rem;
          letter-spacing: 0.25em;
          color: #ffca7a;
        }

        .expo__title {
          margin: 0;
          font-size: clamp(2rem, 4vw, 3.4rem);
          line-height: 0.95;
          letter-spacing: -0.04em;
          text-shadow: 0 4px 18px rgba(0, 0, 0, 0.26);
        }

        .expo__copy, .expo__url, .expo__participantSpecies {
          margin: 0;
          color: rgba(255, 248, 235, 0.78);
          line-height: 1.5;
        }

        .expo__qrCard {

          border-radius: 26px;
          padding: 1.25rem;
          display: grid;
          gap: 1rem;

        }

        .expo__qrLogo {
          width: min(100%, 240px);
          justify-self: center;
          object-fit: contain;
        }

        .expo__url {
          font-size: 0.8rem;
          word-break: break-word;
        }

        .expo__status {
          display: flex;
          gap: 0.75rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .expo__status {
          display: grid;
          grid-template-columns: 1fr;
        }

        .expo__badge, .expo__count {
          min-height: 54px;
          min-width: 0;
          width: 100%;
          max-width: 100%;
          padding: 0.8rem 1.6rem;
          background: transparent url("/images/botones/after.png") center / 100% 100% no-repeat;
          color: #fff8eb;
          font-size: clamp(0.82rem, 1.4vw, 0.95rem);
          font-weight: 700;
          text-align: center;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 1.1;
          white-space: nowrap;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
        }

        .expo__badge--live {
          filter: brightness(1.06) saturate(1.05);
        }

        .expo__stage {
          min-height: 100vh;
          position: relative;
          display: flex;
          align-items: stretch;
          justify-content: flex-end;
          background-image: var(--expo-bg);
          background-size: cover;
          background-position: center;
          overflow: hidden;
        }

        .expo__stage::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(8, 12, 8, 0.4) 0%, rgba(8, 12, 8, 0.08) 38%, rgba(8, 12, 8, 0.68) 100%);
        }

        .expo__stage:not(.expo__stage--active) {
          background-image: url("/images/expomascostas/fondo.png");
        }

        .expo__mobileIdle {
          display: none;
        }

        .expo__participantCard,
        .expo__ranking {
          position: relative;
          z-index: 1;
          width: min(42vw, 560px);
          padding: 2rem;
          border-radius: 28px;
          background:
            linear-gradient(180deg, rgba(64, 48, 18, 0.92), rgba(33, 28, 22, 0.9)),
            rgba(20, 18, 16, 0.92);
          border: 1px solid rgba(255, 214, 138, 0.18);
          box-shadow:
            0 24px 60px rgba(0, 0, 0, 0.32),
            inset 0 1px 0 rgba(255, 245, 226, 0.06);
          overflow: hidden;
        }

        .expo__participantCard {
          margin: auto 2.5rem 2.5rem auto;
        }

        .expo__ranking {
          align-self: flex-start;
          margin: 2rem auto auto 2rem;
        }

        .expo__participantCard::before,
        .expo__ranking::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 12% 18%, rgba(255, 202, 122, 0.16), transparent 24%),
            radial-gradient(circle at 82% 78%, rgba(255, 0, 133, 0.12), transparent 22%);
          pointer-events: none;
        }

        .expo__participantCard::after,
        .expo__ranking::after {
          content: "";
          position: absolute;
          left: 1.1rem;
          right: 1.1rem;
          top: 1rem;
          height: 3px;
          background: linear-gradient(90deg, #ffca7a, #ff4db8, #48d7ff);
          border-radius: 999px;
          opacity: 0.9;
        }

        .expo__participantLabel {
          position: relative;
          z-index: 1;
          margin: 0 0 0.75rem;
          font-size: 0.78rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #ffca7a;
        }

        .expo__participantName {
          position: relative;
          z-index: 1;
          margin: 0;
          font-size: clamp(2rem, 4vw, 4rem);
          line-height: 0.92;
          letter-spacing: -0.05em;
          text-shadow: 0 8px 22px rgba(0, 0, 0, 0.34);
        }

        .expo__participantPhoto {
          position: relative;
          z-index: 1;
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          border-radius: 22px;
          margin-top: 1.25rem;
          border: 2px solid rgba(255, 248, 235, 0.22);
        }

        .expo__participantPhoto--sidebar {
          margin-top: 0;
          max-width: 100%;
        }

        .expo__participantSpecies--sidebar {
          font-size: 1.1rem;
        }

        .expo__kickBtn,
        .expo__rankingKick {
          border: 1px solid rgba(255, 248, 235, 0.16);
          background: rgba(255, 91, 91, 0.14);
          color: #fff3f3;
          border-radius: 999px;
          padding: 0.7rem 1rem;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.18s ease, transform 0.18s ease;
        }

        .expo__kickBtn:hover,
        .expo__rankingKick:hover {
          background: rgba(255, 91, 91, 0.22);
          transform: translateY(-1px);
        }

        .expo__timer {
          position: relative;
          z-index: 1;
          margin-top: 1rem;
          display: inline-grid;
          gap: 0.22rem;
          padding: 0.9rem 1rem;
          border-radius: 18px;
          background: rgba(255, 248, 235, 0.08);
          border: 1px solid rgba(255, 248, 235, 0.12);
        }

        .expo__timer--sidebar {
          width: fit-content;
        }

        .expo__timerLabel {
          color: rgba(255, 248, 235, 0.74);
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }

        .expo__timerValue {
          color: #ffca7a;
          font-size: clamp(1.8rem, 4vw, 2.7rem);
          line-height: 1;
        }

        .expo__rankingHeader,
        .expo__rankingViewport,
        .expo__rankingTrack {
          position: relative;
          z-index: 1;
        }

        .expo__rankingTitle {
          margin: 0;
          font-size: clamp(1.8rem, 3vw, 2.6rem);
          line-height: 0.98;
          letter-spacing: -0.05em;
          max-width: 12ch;
        }

        .expo__rankingViewport {
          margin-top: 1rem;
          position: relative;
          max-height: min(68vh, 760px);
          overflow: hidden;
        }

        .expo__rankingViewport::before,
        .expo__rankingViewport::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 48px;
          z-index: 2;
          pointer-events: none;
        }

        .expo__rankingViewport::before {
          top: 0;
          background: linear-gradient(180deg, rgba(55, 41, 17, 0.96), rgba(55, 41, 17, 0));
        }

        .expo__rankingViewport::after {
          bottom: 0;
          background: linear-gradient(0deg, rgba(35, 29, 21, 0.98), rgba(35, 29, 21, 0));
        }

        .expo__rankingTrack {
          display: grid;
          gap: 0.9rem;
        }

        .expo__rankingTrack--animated {
          animation: expoRankingScroll var(--ranking-duration) linear infinite;
          will-change: transform;
        }

        .expo__ranking:hover .expo__rankingTrack--animated {
          animation-play-state: paused;
        }

        .expo__rankingCard {
          display: grid;
          grid-template-columns: 42px 72px 1fr auto auto;
          align-items: center;
          gap: 0.9rem;
          padding: 0.8rem;
          border-radius: 22px;
          background: rgba(255, 248, 235, 0.06);
          border: 1px solid rgba(255, 248, 235, 0.08);
        }

        .expo__rankingPosition {
          display: grid;
          place-items: center;
          width: 42px;
          height: 42px;
          border-radius: 999px;
          background: linear-gradient(180deg, #ffca7a, #ff4db8);
          color: #18130d;
          font-weight: 800;
        }

        .expo__rankingPhoto {
          width: 72px;
          height: 72px;
          object-fit: cover;
          border-radius: 18px;
          border: 2px solid rgba(255, 248, 235, 0.18);
        }

        .expo__rankingPhoto--placeholder {
          display: grid;
          place-items: center;
          background: rgba(255, 248, 235, 0.12);
          color: #fff8eb;
          font-size: 1.5rem;
          font-weight: 800;
        }

        .expo__rankingMeta {
          min-width: 0;
        }

        .expo__rankingName {
          margin: 0 0 0.25rem;
          font-size: 1.1rem;
          line-height: 1.05;
        }

        .expo__rankingSpecies {
          margin: 0;
          color: rgba(255, 248, 235, 0.76);
          font-size: 0.92rem;
        }

        .expo__rankingScore {
          display: grid;
          justify-items: end;
          gap: 0.1rem;
          color: #ffca7a;
          font-weight: 800;
        }

        .expo__rankingScore span {
          font-size: 1.35rem;
          line-height: 1;
        }

        .expo__rankingScore small {
          color: rgba(255, 248, 235, 0.68);
          font-size: 0.72rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .expo__rankingEmpty {
          padding: 1rem 1.1rem;
          border-radius: 18px;
          background: rgba(255, 248, 235, 0.06);
          color: rgba(255, 248, 235, 0.76);
          line-height: 1.5;
        }

        @keyframes expoRankingScroll {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(calc(-50% - 0.45rem));
          }
        }

        @media (max-width: 900px) {
          .expo {
            grid-template-columns: 1fr;
          }

          .expo__left {
            border-right: none;
            border-bottom: 1px solid rgba(255, 248, 235, 0.08);
          }

          .expo__left::after {
            display: none;
          }

          .expo__stage {
            min-height: 60vh;
          }

          .expo__stage:not(.expo__stage--active) {
            background-image: url("/images/expomascostas/fondomobile.png");
          }

          .expo__participantCard,
          .expo__ranking {
            width: calc(100% - 2rem);
            margin: auto 1rem 1rem;
            padding: 1.35rem;
          }

          .expo__participantName {
            font-size: 2rem;
          }

          .expo__badge,
          .expo__count {
            font-size: 0.82rem;
            padding-inline: 1.3rem;
          }

          .expo__status {
            grid-template-columns: 1fr;
          }

          .expo__rankingCard {
            grid-template-columns: 34px 56px 1fr auto;
          }

          .expo__rankingPhoto {
            width: 56px;
            height: 56px;
          }

          .expo__rankingScore {
            grid-column: 2 / -1;
            justify-items: start;
          }

          .expo__rankingViewport {
            max-height: none;
            overflow: visible;
          }

          .expo__rankingViewport::before,
          .expo__rankingViewport::after {
            display: none;
          }

          .expo__rankingTrack--animated {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
