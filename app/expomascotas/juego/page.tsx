"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { off, onValue, ref, set, update } from "firebase/database";
import { db } from "@/lib/firebase";
import {
  EXPO_SESSION_ID,
  EXPO_SESSION_ROOT,
  SpeciesId,
  getSpeciesImage,
  getTutorLevel,
  speciesCatalog,
} from "../data";

interface FirebaseQuestion {
  id: number;
  prompt: string;
  options: string[];
  correct: number;
}

interface Participant {
  name: string;
  species: SpeciesId;
  photoUrl?: string;
}

interface SessionSnapshot {
  state?: "idle" | "playing";
  timedOutAt?: number | null;
  timedOutParticipantId?: string | null;
}

function JuegoContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session") || EXPO_SESSION_ID;
  const participantId = searchParams.get("pid") || "";

  const [questions, setQuestions] = useState<FirebaseQuestion[]>([]);
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timedOut, setTimedOut] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!participantId) return;
    const participantRef = ref(db, `${EXPO_SESSION_ROOT}/${sessionId}/participants/${participantId}`);
    onValue(participantRef, (snap) => {
      setParticipant((snap.val() as Participant) || null);
    });
    return () => off(participantRef);
  }, [participantId, sessionId]);

  useEffect(() => {
    const questionsRef = ref(db, `${EXPO_SESSION_ROOT}/${sessionId}/questions`);
    onValue(questionsRef, (snap) => {
      const data = snap.val();
      if (data) {
        setQuestions(data);
      }
      setLoading(false);
    });
    return () => off(questionsRef);
  }, [sessionId]);

  useEffect(() => {
    const sessionRef = ref(db, `${EXPO_SESSION_ROOT}/${sessionId}`);
    onValue(sessionRef, (snap) => {
      const data = (snap.val() as SessionSnapshot) || {};
      if (
        !finished &&
        data.state === "idle" &&
        data.timedOutParticipantId === participantId &&
        Boolean(data.timedOutAt)
      ) {
        setTimedOut(true);
      }
    });
    return () => off(sessionRef);
  }, [finished, participantId, sessionId]);

  const handleConfirm = async () => {
    if (selected === null || !participantId) return;

    const nextAnswers = { ...answers, [current]: selected };
    setAnswers(nextAnswers);
    setConfirmed(true);

    await set(ref(db, `${EXPO_SESSION_ROOT}/${sessionId}/answers/${participantId}/${current}`), selected);

    window.setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((value) => value + 1);
        setSelected(null);
        setConfirmed(false);
      } else {
        void handleFinish(nextAnswers);
      }
    }, 1200);
  };

  const handleFinish = async (finalAnswers: Record<number, number>) => {
    const score = Object.entries(finalAnswers).filter(([questionIndex, answerIndex]) => {
      const question = questions[Number(questionIndex)];
      return question && question.correct === answerIndex;
    }).length;

    const level = getTutorLevel(score);

    setFinished(true);

    await update(ref(db, `${EXPO_SESSION_ROOT}/${sessionId}/participants/${participantId}`), {
      finished: true,
      finishedAt: Date.now(),
      score,
      totalQuestions: questions.length,
      tutorLevel: level.id,
      tutorLevelTitle: level.title,
      tutorLevelDescription: level.description,
    });

    await update(ref(db, `${EXPO_SESSION_ROOT}/${sessionId}`), {
      state: "idle",
      currentParticipantId: null,
      currentSpecies: null,
      questions: null,
      timeoutAt: null,
      completedAt: Date.now(),
      lastResult: {
        participantId,
        participantName: participant?.name || "",
        score,
        totalQuestions: questions.length,
        tutorLevelTitle: level.title,
      },
    });
  };

  const score = useMemo(() => {
    return Object.entries(answers).filter(([questionIndex, answerIndex]) => {
      const question = questions[Number(questionIndex)];
      return question && question.correct === answerIndex;
    }).length;
  }, [answers, questions]);

  if (loading) {
    return <Shell backgroundImage="/images/expomascostas/fondomobile.png">Cargando quiz...</Shell>;
  }

  if (timedOut) {
    const backgroundImage = participant && getSpeciesImage(participant.species)
      ? `/images/expomascostas/${getSpeciesImage(participant.species)}`
      : "/images/expomascostas/fondomobile.png";

    return (
      <Shell backgroundImage={backgroundImage}>
        <div className="expoQuiz__result">
          <p className="expoQuiz__eyebrow">Tiempo agotado</p>
          <h1 className="expoQuiz__name">{participant?.name || "Participante"}</h1>
          <p className="expoQuiz__message">
            Se cumplió el minuto disponible para responder. Vuelve a escanear el QR si quieres intentarlo otra vez.
          </p>
        </div>
      </Shell>
    );
  }

  if (finished && participant) {
    const level = getTutorLevel(score);
    const backgroundImage = getSpeciesImage(participant.species)
      ? `/images/expomascostas/${getSpeciesImage(participant.species)}`
      : "/images/expomascostas/fondomobile.png";

    return (
      <Shell backgroundImage={backgroundImage}>
        <div className="expoQuiz__result">
          <p className="expoQuiz__eyebrow">Resultado final</p>
          <h1 className="expoQuiz__name">{participant.name}</h1>
          <p className="expoQuiz__species">{speciesCatalog[participant.species]?.label}</p>
          <div className="expoQuiz__score">
            {score}/{questions.length}
          </div>
          <h2 className="expoQuiz__level">{level.title}</h2>
          <p className="expoQuiz__message">{level.description}</p>
        </div>
      </Shell>
    );
  }

  const question = questions[current];
  if (!question) {
    return <Shell backgroundImage="/images/expomascostas/fondomobile.png">No encontramos preguntas activas.</Shell>;
  }

  const backgroundImage = participant && getSpeciesImage(participant.species)
    ? `/images/expomascostas/${getSpeciesImage(participant.species)}`
    : "/images/expomascostas/fondomobile.png";

  return (
    <Shell backgroundImage={backgroundImage}>
      <div className="expoQuiz">
        <p className="expoQuiz__eyebrow">
          Pregunta {current + 1} de {questions.length}
        </p>
        <h1 className="expoQuiz__name">{participant?.name || "Participante"}</h1>
        <h2 className="expoQuiz__question">{question.prompt}</h2>

        <div className="expoQuiz__options">
          {question.options.map((option, optionIndex) => {
            let modifier = "";
            if (confirmed) {
              if (optionIndex === question.correct) modifier = "expoQuiz__option--correct";
              else if (optionIndex === selected) modifier = "expoQuiz__option--wrong";
            } else if (selected === optionIndex) {
              modifier = "expoQuiz__option--selected";
            }

            return (
              <button
                key={`${question.id}-${optionIndex}`}
                className={`expoQuiz__option ${modifier}`}
                onClick={() => !confirmed && setSelected(optionIndex)}
                disabled={confirmed}
              >
                {option}
              </button>
            );
          })}
        </div>

        <button className="expoQuiz__confirm" onClick={handleConfirm} disabled={selected === null || confirmed}>
          Confirmar respuesta
        </button>
      </div>
    </Shell>
  );
}

function Shell({
  backgroundImage,
  children,
}: {
  backgroundImage: string;
  children: React.ReactNode;
}) {
  return (
    <div className="expoQuizShell" style={{ ["--quiz-bg" as string]: `url(${backgroundImage})` }}>
      <div className="expoQuizShell__overlay" />
      <div className="expoQuizShell__card">{children}</div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .expoQuizShell {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 1rem;
          color: #fff8eb;
          background:
            linear-gradient(180deg, rgba(10, 15, 10, 0.35), rgba(10, 15, 10, 0.92)),
            var(--quiz-bg) center / cover no-repeat;
          font-family: Arial, Helvetica, sans-serif;
          position: relative;
        }

        .expoQuizShell__overlay {
          position: absolute;
          inset: 0;
          backdrop-filter: blur(5px);
        }

        .expoQuizShell__card {
          position: relative;
          z-index: 1;
          width: min(100%, 720px);
          border-radius: 30px;
          background: rgba(12, 15, 13, 0.72);
          border: 1px solid rgba(255, 248, 235, 0.14);
          padding: 1.35rem;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.32);
        }

        .expoQuiz {
          display: grid;
          gap: 1rem;
        }

        .expoQuiz__eyebrow {
          margin: 0;
          font-size: 0.82rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ffca7a;
        }

        .expoQuiz__name {
          margin: 0;
          font-size: clamp(1.6rem, 6vw, 3rem);
          line-height: 0.98;
        }

        .expoQuiz__question {
          margin: 0;
          font-size: clamp(1.25rem, 5vw, 2.1rem);
          line-height: 1.15;
        }

        .expoQuiz__options {
          display: grid;
          gap: 0.75rem;
        }

        .expoQuiz__option,
        .expoQuiz__confirm {
          width: 100%;
          border: none;
          padding: 1rem;
          text-align: left;
          font-size: 1rem;
        }

        .expoQuiz__option {
          background: rgba(255, 255, 255, 0.08);
          color: #fff8eb;
          border: 1px solid rgba(255, 248, 235, 0.12);
        }

        .expoQuiz__option--selected {
          background: rgba(255, 202, 122, 0.2);
          border-color: #ffca7a;
        }

        .expoQuiz__option--correct {
          background: rgba(88, 181, 112, 0.28);
          border-color: #80df95;
        }

        .expoQuiz__option--wrong {
          background: rgba(208, 90, 90, 0.22);
          border-color: #ff8f8f;
        }

        .expoQuiz__confirm {
          min-height: 66px;
          background: transparent url("/images/botones/ahora.png") center / 100% 100% no-repeat;
          color: #fff8eb;
          font-weight: 700;
          text-align: center;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.28);
          transition: transform 0.18s ease, filter 0.18s ease;
        }

        .expoQuiz__confirm:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.01);
          filter: brightness(1.04);
        }

        .expoQuiz__confirm:disabled {
          opacity: 0.45;
        }

        .expoQuiz__result {
          display: grid;
          gap: 0.85rem;
          text-align: center;
        }

        .expoQuiz__species,
        .expoQuiz__message {
          margin: 0;
          color: rgba(255, 248, 235, 0.82);
          line-height: 1.5;
        }

        .expoQuiz__score {
          font-size: clamp(3rem, 12vw, 5rem);
          font-weight: 800;
          color: #ffca7a;
          line-height: 1;
        }

        .expoQuiz__level {
          margin: 0;
          font-size: clamp(1.4rem, 6vw, 2.3rem);
        }
      `}</style>
    </div>
  );
}

export default function ExpomascotasJuegoPage() {
  return (
    <Suspense fallback={null}>
      <JuegoContent />
    </Suspense>
  );
}
