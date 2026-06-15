"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { get, off, onValue, ref, runTransaction, set } from "firebase/database";
import { db } from "@/lib/firebase";
import {
  USS_SESSION_ID,
  USS_SESSION_ROOT,
  USS_TITLE,
  groupCatalog,
  peerCriteria,
  selfAssessmentQuestions,
} from "../data";

type ScaleValue = 1 | 2 | 3 | 4;

interface UssSessionSnapshot {
  activeGroupId?: string | null;
  activeRoundId?: string | null;
  state?: "idle" | "collecting";
  responses?: Record<string, Record<string, StudentResponse>>;
}

interface StudentResponse {
  studentId: string;
  studentName: string;
  groupId: string;
  roundId: string;
  submittedAt: number;
  selfEvaluation: {
    mainContribution: string;
    learning: string;
    groupDecision: string;
    improvement: string;
    commitment: ScaleValue;
  };
  peerEvaluations: Record<string, Record<string, ScaleValue>>;
}

function showAlert(message: string) {
  if (typeof window !== "undefined") {
    window.alert(message);
  }
}

async function claimStudentResponseSlot(
  sessionId: string,
  groupId: string,
  studentId: string,
  roundId: string,
) {
  const responseRef = ref(
    db,
    `${USS_SESSION_ROOT}/${sessionId}/responses/${groupId}/${studentId}`,
  );

  const result = await runTransaction(
    responseRef,
    (currentValue) => {
      if (currentValue?.roundId === roundId && currentValue?.submittedAt) {
        return;
      }

      return {
        pending: true,
        roundId,
        reservedAt: Date.now(),
      };
    },
    { applyLocally: false },
  );

  return { committed: result.committed, responseRef };
}

function UssSalonContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session") || USS_SESSION_ID;
  const groupId = searchParams.get("group") || "";
  const roundId = searchParams.get("token") || "";

  const [session, setSession] = useState<UssSessionSnapshot>({});
  const [studentId, setStudentId] = useState("");
  const [selfAnswers, setSelfAnswers] = useState({
    mainContribution: "",
    learning: "",
    groupDecision: "",
    improvement: "",
    commitment: "" as "" | ScaleValue,
  });
  const [peerAnswers, setPeerAnswers] = useState<Record<string, Record<string, "" | ScaleValue>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sessionRef = ref(db, `${USS_SESSION_ROOT}/${sessionId}`);
    onValue(sessionRef, (snapshot) => {
      setSession((snapshot.val() as UssSessionSnapshot) || {});
      setLoading(false);
    });
    return () => off(sessionRef);
  }, [sessionId]);

  const activeGroup = useMemo(() => groupCatalog[groupId] || null, [groupId]);
  const groupResponses = session.responses?.[groupId] || {};
  const submittedStudentIds = new Set(Object.keys(groupResponses));

  const activeGroupIsValid =
    Boolean(activeGroup) &&
    session.activeGroupId === groupId &&
    session.activeRoundId === roundId &&
    session.state === "collecting";

  const peerMembers = useMemo(() => {
    if (!activeGroup || !studentId) return [];
    return activeGroup.members.filter((member) => member.id !== studentId);
  }, [activeGroup, studentId]);

  useEffect(() => {
    if (!peerMembers.length) {
      setPeerAnswers({});
      return;
    }

    setPeerAnswers((current) => {
      const next: Record<string, Record<string, "" | ScaleValue>> = {};
      for (const member of peerMembers) {
        next[member.id] = current[member.id] || Object.fromEntries(
          peerCriteria.map((criterion) => [criterion.id, ""]),
        ) as Record<string, "" | ScaleValue>;
      }
      return next;
    });
  }, [peerMembers]);

  const handleSubmit = async () => {
    if (!activeGroup || !activeGroupIsValid) {
      showAlert("Este acceso ya no está activo. Pide a la profesora el QR vigente.");
      return;
    }

    if (!studentId) {
      showAlert("Selecciona tu nombre antes de continuar.");
      return;
    }

    if (submittedStudentIds.has(studentId)) {
      showAlert("Este integrante ya respondió. Si necesitas corregirlo, la profesora debe reiniciar su registro.");
      return;
    }

    for (const question of selfAssessmentQuestions) {
      if (
        question.type === "text" &&
        question.id !== "commitment" &&
        !selfAnswers[question.id].trim()
      ) {
        showAlert("Completa todas las respuestas de autoevaluación.");
        return;
      }
      if (question.type === "scale" && !selfAnswers.commitment) {
        showAlert("Indica tu compromiso en escala de 1 a 4.");
        return;
      }
    }

    for (const member of peerMembers) {
      for (const criterion of peerCriteria) {
        if (!peerAnswers[member.id]?.[criterion.id]) {
          showAlert("Completa toda la pauta de coevaluación para cada compañero.");
          return;
        }
      }
    }

    setIsSubmitting(true);

    const student = activeGroup.members.find((member) => member.id === studentId);
    if (!student) {
      showAlert("No pudimos identificar al estudiante seleccionado.");
      setIsSubmitting(false);
      return;
    }

    const { committed, responseRef } = await claimStudentResponseSlot(
      sessionId,
      groupId,
      studentId,
      roundId,
    );

    if (!committed) {
      showAlert("Este integrante ya quedó tomado por otra respuesta. Selecciona otro nombre o pide apoyo a la profesora.");
      setIsSubmitting(false);
      return;
    }

    try {
      const currentSessionSnapshot = await get(ref(db, `${USS_SESSION_ROOT}/${sessionId}`));
      const currentSession = (currentSessionSnapshot.val() as UssSessionSnapshot) || {};

      if (
        currentSession.activeGroupId !== groupId ||
        currentSession.activeRoundId !== roundId ||
        currentSession.state !== "collecting"
      ) {
        await set(responseRef, null);
        showAlert("La profesora ya cambió de grupo o cerró esta ronda.");
        setIsSubmitting(false);
        return;
      }

      const responsePayload: StudentResponse = {
        studentId: student.id,
        studentName: student.name,
        groupId,
        roundId,
        submittedAt: Date.now(),
        selfEvaluation: {
          mainContribution: selfAnswers.mainContribution.trim(),
          learning: selfAnswers.learning.trim(),
          groupDecision: selfAnswers.groupDecision.trim(),
          improvement: selfAnswers.improvement.trim(),
          commitment: selfAnswers.commitment as ScaleValue,
        },
        peerEvaluations: Object.fromEntries(
          peerMembers.map((member) => [
            member.id,
            Object.fromEntries(
              peerCriteria.map((criterion) => [
                criterion.id,
                peerAnswers[member.id][criterion.id] as ScaleValue,
              ]),
            ),
          ]),
        ),
      };

      await set(responseRef, responsePayload);
      router.push(`/uss/juego?session=${sessionId}&group=${groupId}&student=${studentId}`);
    } catch (error) {
      await set(responseRef, null);
      showAlert(
        error instanceof Error
          ? error.message
          : "No pudimos guardar tus respuestas. Intenta nuevamente.",
      );
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <Shell>Cargando evaluación...</Shell>;
  }

  if (!activeGroup || !roundId) {
    return (
      <Shell>
        <Message
          eyebrow="Acceso inválido"
          title="Este QR no es válido"
          copy="Pide a la profesora Siboney que active el grupo correcto y vuelve a escanear."
        />
      </Shell>
    );
  }

  if (!activeGroupIsValid) {
    return (
      <Shell>
        <Message
          eyebrow="Ronda cerrada"
          title="Este acceso ya no está activo"
          copy="La profesora puede haber pasado al siguiente grupo. Escanea el QR actualizado para responder."
        />
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="ussForm">
        <p className="ussForm__eyebrow">Autoevaluación y coevaluación</p>
        <h1 className="ussForm__title">{USS_TITLE}</h1>
        <p className="ussForm__copy">
          Grupo {activeGroup.number}: {activeGroup.title}
        </p>

        <label className="ussForm__label">
          Tu nombre
          <select
            className="ussForm__input"
            value={studentId}
            onChange={(event) => setStudentId(event.target.value)}
          >
            <option value="">Selecciona tu nombre</option>
            {activeGroup.members.map((member) => (
              <option
                key={member.id}
                value={member.id}
                disabled={submittedStudentIds.has(member.id)}
              >
                {member.name}
                {submittedStudentIds.has(member.id) ? " · ya respondió" : ""}
              </option>
            ))}
          </select>
        </label>

        <section className="ussForm__section">
          <h2 className="ussForm__sectionTitle">Pauta breve de autoevaluación</h2>
          <div className="ussForm__stack">
            {selfAssessmentQuestions.map((question, index) => (
              <label key={question.id} className="ussForm__label">
                <span>
                  {index + 1}. {question.prompt}
                </span>
                {question.type === "text" ? (
                  <textarea
                    className="ussForm__input ussForm__textarea"
                    value={selfAnswers[question.id]}
                    onChange={(event) =>
                      setSelfAnswers((current) => ({
                        ...current,
                        [question.id]: event.target.value,
                      }))
                    }
                    rows={4}
                  />
                ) : (
                  <div className="ussForm__scale">
                    {[1, 2, 3, 4].map((value) => (
                      <button
                        key={value}
                        type="button"
                        className={`ussForm__scaleBtn ${selfAnswers.commitment === value ? "ussForm__scaleBtn--active" : ""}`}
                        onClick={() =>
                          setSelfAnswers((current) => ({
                            ...current,
                            commitment: value as ScaleValue,
                          }))
                        }
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                )}
              </label>
            ))}
          </div>
        </section>

        {studentId ? (
          <section className="ussForm__section">
            <h2 className="ussForm__sectionTitle">Pauta breve de coevaluación</h2>
            <div className="ussForm__criteriaTable">
              <div className="ussForm__criteriaHead">Criterio</div>
              <div className="ussForm__criteriaHead">4</div>
              <div className="ussForm__criteriaHead">3</div>
              <div className="ussForm__criteriaHead">2</div>
              <div className="ussForm__criteriaHead">1</div>
              {peerCriteria.map((criterion) => (
                <div key={criterion.id} className="ussForm__criteriaRow">
                  <strong>{criterion.label}</strong>
                  <span>{criterion.descriptions[4]}</span>
                  <span>{criterion.descriptions[3]}</span>
                  <span>{criterion.descriptions[2]}</span>
                  <span>{criterion.descriptions[1]}</span>
                </div>
              ))}
            </div>

            <div className="ussForm__peerCards">
              {peerMembers.map((member) => (
                <article key={member.id} className="ussForm__peerCard">
                  <h3 className="ussForm__peerName">{member.name}</h3>
                  <div className="ussForm__stack">
                    {peerCriteria.map((criterion) => (
                      <div key={criterion.id} className="ussForm__criterionCard">
                        <p className="ussForm__criterionLabel">{criterion.label}</p>
                        <div className="ussForm__scale">
                          {[4, 3, 2, 1].map((value) => (
                            <button
                              key={value}
                              type="button"
                              className={`ussForm__scaleBtn ${peerAnswers[member.id]?.[criterion.id] === value ? "ussForm__scaleBtn--active" : ""}`}
                              onClick={() =>
                                setPeerAnswers((current) => ({
                                  ...current,
                                  [member.id]: {
                                    ...current[member.id],
                                    [criterion.id]: value as ScaleValue,
                                  },
                                }))
                              }
                            >
                              {value}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <button
          type="button"
          className="ussForm__submit"
          disabled={!studentId || isSubmitting}
          onClick={handleSubmit}
        >
          {isSubmitting ? "Enviando..." : "Enviar evaluación"}
        </button>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .ussForm {
          display: grid;
          gap: 1.1rem;
        }

        .ussForm__eyebrow {
          margin: 0;
          font-size: 0.78rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ffca7a;
        }

        .ussForm__title,
        .ussForm__sectionTitle,
        .ussForm__peerName {
          margin: 0;
        }

        .ussForm__title {
          font-size: clamp(2rem, 7vw, 3.25rem);
          line-height: 0.95;
        }

        .ussForm__copy,
        .ussForm__criterionLabel {
          margin: 0;
          color: rgba(255, 248, 235, 0.82);
          line-height: 1.5;
        }

        .ussForm__section,
        .ussForm__peerCard {
          display: grid;
          gap: 0.9rem;
          border-radius: 24px;
          padding: 1rem;
          background: rgba(255, 248, 235, 0.05);
          border: 1px solid rgba(255, 248, 235, 0.08);
        }

        .ussForm__label {
          display: grid;
          gap: 0.45rem;
          font-size: 0.95rem;
        }

        .ussForm__input {
          width: 100%;
          border-radius: 16px;
          border: 1px solid rgba(255, 248, 235, 0.16);
          background: rgba(255, 255, 255, 0.06);
          color: #fff8eb;
          padding: 0.95rem 1rem;
          font-size: 1rem;
        }

        .ussForm__textarea {
          min-height: 118px;
          resize: vertical;
        }

        .ussForm__stack,
        .ussForm__peerCards {
          display: grid;
          gap: 0.9rem;
        }

        .ussForm__criteriaTable {
          display: grid;
          gap: 0.35rem;
        }

        .ussForm__criteriaHead {
          display: none;
        }

        .ussForm__criteriaRow {
          display: grid;
          gap: 0.35rem;
          padding: 0.8rem;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.04);
          font-size: 0.88rem;
          color: rgba(255, 248, 235, 0.8);
        }

        .ussForm__criteriaRow strong {
          color: #fff8eb;
        }

        .ussForm__scale {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 0.55rem;
        }

        .ussForm__scaleBtn,
        .ussForm__submit {
          border: none;
          border-radius: 16px;
          padding: 0.95rem 1rem;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
        }

        .ussForm__scaleBtn {
          background: rgba(255, 255, 255, 0.08);
          color: #fff8eb;
          border: 1px solid rgba(255, 248, 235, 0.12);
        }

        .ussForm__scaleBtn--active {
          background: rgba(255, 202, 122, 0.18);
          border-color: rgba(255, 202, 122, 0.44);
          color: #ffca7a;
        }

        .ussForm__submit {
          background: url("/images/botones/after.png") center / 100% 100% no-repeat;
          color: #fff8eb;
          min-height: 70px;
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
        }

        .ussForm__submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (min-width: 900px) {
          .ussForm__peerCards {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </Shell>
  );
}

function Message({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="ussMessage">
      <p className="ussMessage__eyebrow">{eyebrow}</p>
      <h1 className="ussMessage__title">{title}</h1>
      <p className="ussMessage__copy">{copy}</p>

      <style>{`
        .ussMessage {
          display: grid;
          gap: 0.9rem;
        }

        .ussMessage__eyebrow,
        .ussMessage__title,
        .ussMessage__copy {
          margin: 0;
        }

        .ussMessage__eyebrow {
          font-size: 0.78rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ffca7a;
        }

        .ussMessage__title {
          font-size: clamp(2rem, 7vw, 3.15rem);
          line-height: 0.95;
        }

        .ussMessage__copy {
          color: rgba(255, 248, 235, 0.82);
          line-height: 1.55;
        }
      `}</style>
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="ussShell">
      <div className="ussShell__card">{children}</div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .ussShell {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 1.25rem 1.25rem 3rem;
          color: #fff8eb;
          background:
            linear-gradient(180deg, rgba(12, 18, 13, 0.28), rgba(12, 18, 13, 0.88)),
            url("/images/expomascostas/fondomobile.png") center / cover no-repeat;
          font-family: Arial, Helvetica, sans-serif;
        }

        .ussShell__card {
          width: min(100%, 860px);
          display: grid;
          gap: 1rem;
          border-radius: 28px;
          padding: 1.35rem 1.35rem 1.9rem;
          background: rgba(12, 15, 13, 0.82);
          backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 248, 235, 0.14);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
        }
      `}</style>
    </div>
  );
}

export default function UssSalonPage() {
  return (
    <Suspense fallback={null}>
      <UssSalonContent />
    </Suspense>
  );
}
