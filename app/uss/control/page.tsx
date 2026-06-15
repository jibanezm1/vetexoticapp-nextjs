"use client";

import { useEffect, useMemo, useState } from "react";
import { off, onValue, ref, remove, update } from "firebase/database";
import QRCode from "@/app/quiz/components/QRCode";
import { db } from "@/lib/firebase";
import {
  USS_SESSION_ID,
  USS_SESSION_ROOT,
  USS_TITLE,
  getNextGroupId,
  groupCatalog,
  peerCriteria,
  ussGroups,
} from "../data";

type ScaleValue = 1 | 2 | 3 | 4;

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

interface UssSessionSnapshot {
  activeGroupId?: string | null;
  activeRoundId?: string | null;
  state?: "idle" | "collecting";
  responses?: Record<string, Record<string, StudentResponse>>;
}

function createRoundId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function average(values: number[]) {
  if (!values.length) return null;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

export default function UssControlPage() {
  const [session, setSession] = useState<UssSessionSnapshot>({});
  const [selectedGroupId, setSelectedGroupId] = useState(ussGroups[0]?.id || "");
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(window.location.origin);
    }
  }, []);

  useEffect(() => {
    const sessionRef = ref(db, `${USS_SESSION_ROOT}/${USS_SESSION_ID}`);
    onValue(sessionRef, (snapshot) => {
      setSession((snapshot.val() as UssSessionSnapshot) || {});
    });
    return () => off(sessionRef);
  }, []);

  const selectedGroup = groupCatalog[selectedGroupId] || null;
  const activeGroup = session.activeGroupId ? groupCatalog[session.activeGroupId] || null : null;
  const selectedResponses = session.responses?.[selectedGroupId] || {};
  const selectedSubmittedIds = new Set(Object.keys(selectedResponses));
  const selectedMembers = selectedGroup?.members || [];
  const allSelectedSubmitted = selectedMembers.length > 0 && selectedMembers.every((member) => selectedSubmittedIds.has(member.id));

  const activeQrUrl =
    baseUrl && session.activeGroupId && session.activeRoundId
      ? `${baseUrl}/uss/salon?session=${USS_SESSION_ID}&group=${session.activeGroupId}&token=${session.activeRoundId}`
      : "";

  const results = useMemo(() => {
    if (!selectedGroup) return [];

    return selectedGroup.members.map((member) => {
      const ownResponse = selectedResponses[member.id] || null;
      const received = Object.values(selectedResponses)
        .filter((response) => response.studentId !== member.id)
        .map((response) => ({
          evaluatorName: response.studentName,
          scores: response.peerEvaluations?.[member.id] || null,
        }))
        .filter((entry) => entry.scores);

      const perCriterion = Object.fromEntries(
        peerCriteria.map((criterion) => {
          const values = received
            .map((entry) => entry.scores?.[criterion.id])
            .filter((value): value is ScaleValue => typeof value === "number");
          return [criterion.id, average(values)];
        }),
      ) as Record<string, number | null>;

      const overallAverage = average(
        Object.values(perCriterion).filter((value): value is number => typeof value === "number"),
      );

      return {
        member,
        ownResponse,
        received,
        perCriterion,
        overallAverage,
      };
    });
  }, [selectedGroup, selectedResponses]);

  const activateSelectedGroup = async () => {
    if (!selectedGroup) return;
    const nextRoundId = createRoundId();

    await update(ref(db, `${USS_SESSION_ROOT}/${USS_SESSION_ID}`), {
      activeGroupId: selectedGroup.id,
      activeRoundId: nextRoundId,
      state: "collecting",
      activatedAt: Date.now(),
    });
  };

  const closeCurrentRound = async () => {
    await update(ref(db, `${USS_SESSION_ROOT}/${USS_SESSION_ID}`), {
      state: "idle",
      activeGroupId: null,
      activeRoundId: null,
      closedAt: Date.now(),
    });
  };

  const activateNextGroup = async () => {
    const nextGroupId = getNextGroupId(session.activeGroupId || selectedGroupId);
    if (!nextGroupId) return;
    setSelectedGroupId(nextGroupId);
    const nextRoundId = createRoundId();
    await update(ref(db, `${USS_SESSION_ROOT}/${USS_SESSION_ID}`), {
      activeGroupId: nextGroupId,
      activeRoundId: nextRoundId,
      state: "collecting",
      activatedAt: Date.now(),
    });
  };

  const resetStudent = async (groupId: string, studentId: string) => {
    await remove(ref(db, `${USS_SESSION_ROOT}/${USS_SESSION_ID}/responses/${groupId}/${studentId}`));
  };

  const clearAll = async () => {
    await remove(ref(db, `${USS_SESSION_ROOT}/${USS_SESSION_ID}`));
  };

  return (
    <div className="ussControl">
      <aside className="ussControl__sidebar">
        <p className="ussControl__eyebrow">Control docente</p>
        <h1 className="ussControl__title">{USS_TITLE}</h1>
        <p className="ussControl__copy">
          La profesora Siboney activa un grupo, comparte su QR y monitorea en vivo
          quiénes ya respondieron autoevaluación y coevaluación.
        </p>

        <div className="ussControl__groupList">
          {ussGroups.map((group) => (
            <button
              key={group.id}
              type="button"
              className={`ussControl__groupBtn ${selectedGroupId === group.id ? "ussControl__groupBtn--active" : ""}`}
              onClick={() => setSelectedGroupId(group.id)}
            >
              <strong>Grupo {group.number}</strong>
              <span>{group.members.length} integrantes</span>
            </button>
          ))}
        </div>
      </aside>

      <main className="ussControl__main">
        <section className="ussControl__top">
          <div className="ussControl__panel">
            <p className="ussControl__panelEyebrow">Grupo seleccionado</p>
            {selectedGroup ? (
              <>
                <h2 className="ussControl__panelTitle">Grupo {selectedGroup.number}</h2>
                <p className="ussControl__panelText">{selectedGroup.title}</p>
                <p className="ussControl__panelHint">{selectedGroup.focus}</p>
              </>
            ) : null}

            <div className="ussControl__actions">
              <button className="ussControl__btn ussControl__btn--yellow" onClick={activateSelectedGroup}>
                Activar QR de este grupo
              </button>
              <button className="ussControl__btn ussControl__btn--dark" onClick={closeCurrentRound}>
                Cerrar ronda actual
              </button>
              <button className="ussControl__btn ussControl__btn--dark" onClick={activateNextGroup}>
                Pasar al siguiente grupo
              </button>
              <button className="ussControl__btn ussControl__btn--danger" onClick={clearAll}>
                Limpiar todo
              </button>
            </div>
          </div>

          <div className="ussControl__panel ussControl__panel--qr">
            <p className="ussControl__panelEyebrow">QR activo</p>
            {activeGroup && activeQrUrl ? (
              <>
                <h2 className="ussControl__panelTitle">Grupo {activeGroup.number}</h2>
                <div className="ussControl__qrWrap">
                  <QRCode url={activeQrUrl} />
                </div>
                <p className="ussControl__panelHint">Escanea este QR solo con el grupo activo.</p>
              </>
            ) : (
              <p className="ussControl__panelText">No hay un grupo activo en este momento.</p>
            )}
          </div>
        </section>

        <section className="ussControl__summaryGrid">
          <div className="ussControl__panel">
            <p className="ussControl__panelEyebrow">Estado</p>
            <h3 className="ussControl__stat">{session.state === "collecting" ? "Recibiendo respuestas" : "En espera"}</h3>
            <p className="ussControl__panelHint">
              {activeGroup ? `Grupo activo: ${activeGroup.number}` : "Sin grupo activo"}
            </p>
          </div>

          <div className="ussControl__panel">
            <p className="ussControl__panelEyebrow">Progreso del grupo</p>
            <h3 className="ussControl__stat">
              {selectedSubmittedIds.size}/{selectedMembers.length}
            </h3>
            <p className="ussControl__panelHint">
              {allSelectedSubmitted ? "Todo el grupo respondió." : "Aún faltan integrantes por responder."}
            </p>
          </div>
        </section>

        <section className="ussControl__panel">
          <p className="ussControl__panelEyebrow">Integrantes</p>
          <div className="ussControl__memberGrid">
            {selectedMembers.map((member) => {
              const answered = selectedSubmittedIds.has(member.id);
              return (
                <article key={member.id} className="ussControl__memberCard">
                  <div>
                    <h3 className="ussControl__memberName">{member.name}</h3>
                    <p className="ussControl__memberState">
                      {answered ? "Respondió" : "Pendiente"}
                    </p>
                  </div>
                  {answered ? (
                    <button
                      type="button"
                      className="ussControl__miniBtn"
                      onClick={() => resetStudent(selectedGroupId, member.id)}
                    >
                      Reiniciar
                    </button>
                  ) : null}
                </article>
              );
            })}
          </div>
        </section>

        <section className="ussControl__results">
          {results.map((result) => (
            <article key={result.member.id} className="ussControl__resultCard">
              <div className="ussControl__resultHeader">
                <div>
                  <h3 className="ussControl__memberName">{result.member.name}</h3>
                  <p className="ussControl__memberState">
                    {result.ownResponse ? "Autoevaluación recibida" : "Sin respuesta aún"}
                  </p>
                </div>
                <div className="ussControl__badge">
                  Promedio pares: {result.overallAverage ? result.overallAverage.toFixed(2) : "--"}
                </div>
              </div>

              {result.ownResponse ? (
                <div className="ussControl__resultGrid">
                  <section className="ussControl__block">
                    <h4 className="ussControl__blockTitle">Autoevaluación</h4>
                    <div className="ussControl__qa">
                      <strong>Principal aporte</strong>
                      <p>{result.ownResponse.selfEvaluation.mainContribution}</p>
                    </div>
                    <div className="ussControl__qa">
                      <strong>Aprendizaje</strong>
                      <p>{result.ownResponse.selfEvaluation.learning}</p>
                    </div>
                    <div className="ussControl__qa">
                      <strong>Decisión que mejoró el mensaje</strong>
                      <p>{result.ownResponse.selfEvaluation.groupDecision}</p>
                    </div>
                    <div className="ussControl__qa">
                      <strong>Aspecto a mejorar</strong>
                      <p>{result.ownResponse.selfEvaluation.improvement}</p>
                    </div>
                    <div className="ussControl__qa">
                      <strong>Compromiso</strong>
                      <p>{result.ownResponse.selfEvaluation.commitment}/4</p>
                    </div>
                  </section>

                  <section className="ussControl__block">
                    <h4 className="ussControl__blockTitle">Coevaluación recibida</h4>
                    <div className="ussControl__criteriaSummary">
                      {peerCriteria.map((criterion) => (
                        <div key={criterion.id} className="ussControl__criteriaItem">
                          <strong>{criterion.label}</strong>
                          <span>
                            {typeof result.perCriterion[criterion.id] === "number"
                              ? result.perCriterion[criterion.id]!.toFixed(2)
                              : "--"}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="ussControl__peerList">
                      {result.received.length > 0 ? result.received.map((entry) => (
                        <div key={`${result.member.id}-${entry.evaluatorName}`} className="ussControl__peerItem">
                          <strong>{entry.evaluatorName}</strong>
                          <span>
                            {average(Object.values(entry.scores || {}).map((value) => Number(value)))?.toFixed(2) || "--"}
                          </span>
                        </div>
                      )) : <p className="ussControl__empty">Todavía no hay coevaluaciones recibidas.</p>}
                    </div>
                  </section>
                </div>
              ) : (
                <p className="ussControl__empty">Este integrante aún no responde la evaluación.</p>
              )}
            </article>
          ))}
        </section>
      </main>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .ussControl {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 320px 1fr;
          background: #11140f;
          color: #fff8eb;
          font-family: Arial, Helvetica, sans-serif;
        }

        .ussControl__sidebar {
          padding: 1.5rem;
          background:
            linear-gradient(180deg, rgba(38, 30, 14, 0.96), rgba(18, 16, 12, 0.98)),
            url("/images/expomascostas/lateral.png") center / cover no-repeat;
          border-right: 1px solid rgba(255, 248, 235, 0.08);
          display: grid;
          align-content: start;
          gap: 1rem;
        }

        .ussControl__main {
          padding: 1.5rem;
          display: grid;
          gap: 1rem;
          background:
            linear-gradient(180deg, rgba(10, 12, 10, 0.92), rgba(10, 12, 10, 0.96)),
            url("/images/expomascostas/fondo.png") center / cover no-repeat;
        }

        .ussControl__eyebrow,
        .ussControl__panelEyebrow {
          margin: 0;
          font-size: 0.76rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ffca7a;
        }

        .ussControl__title,
        .ussControl__panelTitle,
        .ussControl__memberName,
        .ussControl__blockTitle {
          margin: 0;
        }

        .ussControl__copy,
        .ussControl__panelText,
        .ussControl__panelHint,
        .ussControl__memberState,
        .ussControl__empty,
        .ussControl__qa p {
          margin: 0;
          color: rgba(255, 248, 235, 0.78);
          line-height: 1.5;
        }

        .ussControl__groupList,
        .ussControl__actions,
        .ussControl__memberGrid,
        .ussControl__results,
        .ussControl__peerList {
          display: grid;
          gap: 0.75rem;
        }

        .ussControl__groupBtn,
        .ussControl__btn,
        .ussControl__miniBtn {
          border: none;
          cursor: pointer;
          font: inherit;
        }

        .ussControl__groupBtn {
          display: grid;
          gap: 0.2rem;
          text-align: left;
          padding: 0.9rem 1rem;
          border-radius: 18px;
          background: rgba(255, 248, 235, 0.08);
          color: #fff8eb;
          border: 1px solid rgba(255, 248, 235, 0.08);
        }

        .ussControl__groupBtn span {
          color: rgba(255, 248, 235, 0.7);
          font-size: 0.88rem;
        }

        .ussControl__groupBtn--active {
          background: rgba(255, 202, 122, 0.14);
          border-color: rgba(255, 202, 122, 0.34);
        }

        .ussControl__top,
        .ussControl__summaryGrid {
          display: grid;
          grid-template-columns: 1.25fr 0.9fr;
          gap: 1rem;
        }

        .ussControl__summaryGrid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .ussControl__panel,
        .ussControl__resultCard {
          border-radius: 26px;
          padding: 1.15rem;
          background:
            linear-gradient(180deg, rgba(64, 48, 18, 0.9), rgba(32, 28, 22, 0.9)),
            rgba(20, 18, 16, 0.92);
          border: 1px solid rgba(255, 214, 138, 0.16);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.22);
          display: grid;
          gap: 0.85rem;
        }

        .ussControl__panel--qr {
          justify-items: center;
          text-align: center;
        }

        .ussControl__qrWrap {
          background: white;
          border-radius: 22px;
          padding: 1rem;
        }

        .ussControl__actions {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .ussControl__btn {
          padding: 0.9rem 1rem;
          border-radius: 18px;
          font-weight: 700;
        }

        .ussControl__btn--yellow {
          background: #ffca7a;
          color: #241606;
        }

        .ussControl__btn--dark {
          background: rgba(255, 248, 235, 0.1);
          color: #fff8eb;
        }

        .ussControl__btn--danger,
        .ussControl__miniBtn {
          background: rgba(255, 91, 91, 0.18);
          color: #fff3f3;
        }

        .ussControl__stat {
          margin: 0;
          font-size: clamp(1.8rem, 4vw, 2.7rem);
          color: #ffca7a;
        }

        .ussControl__memberGrid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .ussControl__memberCard,
        .ussControl__peerItem,
        .ussControl__criteriaItem {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 0.8rem;
          padding: 0.9rem 1rem;
          border-radius: 18px;
          background: rgba(255, 248, 235, 0.06);
        }

        .ussControl__resultHeader,
        .ussControl__resultGrid {
          display: grid;
          gap: 1rem;
        }

        .ussControl__resultGrid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .ussControl__badge {
          width: fit-content;
          padding: 0.7rem 0.9rem;
          border-radius: 999px;
          background: rgba(255, 202, 122, 0.16);
          color: #ffca7a;
          font-weight: 700;
        }

        .ussControl__block {
          display: grid;
          gap: 0.8rem;
        }

        .ussControl__qa {
          display: grid;
          gap: 0.28rem;
          padding: 0.9rem;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.04);
        }

        .ussControl__criteriaSummary {
          display: grid;
          gap: 0.6rem;
        }

        @media (max-width: 1100px) {
          .ussControl {
            grid-template-columns: 1fr;
          }

          .ussControl__top,
          .ussControl__summaryGrid,
          .ussControl__resultGrid,
          .ussControl__memberGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
