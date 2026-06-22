"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { get, off, onValue, ref, set, update } from "firebase/database";
import { db } from "@/lib/firebase";
import {
  getQuestionMinimumLength,
  isQuestionAnswered,
} from "@/lib/wildlifeCourse/questionHelpers";
import type { CourseQuestion, CourseSpecies, CourseStudent, QuestionResponse } from "@/lib/wildlifeCourse/types";

type SaveStatus = "idle" | "saving" | "saved" | "error";

const CATEGORY_COLORS: Record<string, string> = {
  "Rehabilitación": "#1a6b3a",
  "Medicina de la Conservación": "#1e5fa8",
  "Patologías": "#b45309",
  "Tratamientos": "#6d28d9",
  "Reinserción": "#0e7490",
};

function groupQuestionsByCategory(questions: Record<string, CourseQuestion>): Array<[string, CourseQuestion[]]> {
  const groups: Record<string, CourseQuestion[]> = {};
  Object.values(questions)
    .sort((a, b) => a.order - b.order)
    .forEach((q) => {
      if (!groups[q.category]) groups[q.category] = [];
      groups[q.category].push(q);
    });
  return Object.entries(groups);
}

export default function SpeciePracticaPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const studentSessionId = params.studentSessionId as string;
  const speciesId = params.speciesId as string;

  const [student, setStudent] = useState<CourseStudent | null>(null);
  const [species, setSpecies] = useState<CourseSpecies | null>(null);
  const [responses, setResponses] = useState<Record<string, QuestionResponse>>({});
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [saveStatus, setSaveStatus] = useState<Record<string, SaveStatus>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  const debounceTimers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const questionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const [studentSnap, speciesSnap] = await Promise.all([
          get(ref(db, `courseStudents/${courseId}/${studentSessionId}`)),
          get(ref(db, `courses/${courseId}/species/${speciesId}`)),
        ]);

        if (!mounted) return;

        if (!studentSnap.exists()) {
          setError("Sesión no encontrada. Vuelve a escanear el QR.");
          setLoading(false);
          return;
        }

        if (!speciesSnap.exists()) {
          setError("Especie no encontrada.");
          setLoading(false);
          return;
        }

        const speciesData = speciesSnap.val() as CourseSpecies;

        if (!speciesData.enabled) {
          setError("Esta especie aún no ha sido habilitada por la profesora.");
          setLoading(false);
          return;
        }

        setStudent(studentSnap.val() as CourseStudent);
        setSpecies(speciesData);
        setLoading(false);
      } catch {
        if (mounted) {
          setError("Error al cargar el práctico. Por favor, intenta de nuevo.");
          setLoading(false);
        }
      }
    }

    load();
    return () => { mounted = false; };
  }, [courseId, studentSessionId, speciesId]);

  // Real-time listener for enabled status (in case species gets disabled)
  useEffect(() => {
    const enabledRef = ref(db, `courses/${courseId}/species/${speciesId}/enabled`);
    const unsubscribe = onValue(enabledRef, (snap) => {
      if (snap.exists() && snap.val() === false && !loading) {
        setError("Esta especie fue deshabilitada por la profesora.");
      }
    });
    return () => off(enabledRef, "value", unsubscribe);
  }, [courseId, speciesId, loading]);

  // Real-time listener for responses
  useEffect(() => {
    const responsesRef = ref(db, `courseResponses/${courseId}/${studentSessionId}/${speciesId}`);
    const unsubscribe = onValue(responsesRef, (snap) => {
      const data: Record<string, QuestionResponse> = snap.exists() ? snap.val() : {};
      setResponses(data);
      // Sync drafts from saved responses (only if not currently editing)
      setDrafts((prev) => {
        const next = { ...prev };
        Object.entries(data).forEach(([qId, r]) => {
          if (!(qId in next)) {
            next[qId] = r.answer;
          }
        });
        return next;
      });
    });
    return () => off(responsesRef, "value", unsubscribe);
  }, [courseId, studentSessionId, speciesId]);

  const saveAnswer = useCallback(async (questionId: string, answer: string) => {
    setSaveStatus((prev) => ({ ...prev, [questionId]: "saving" }));
    try {
      const path = `courseResponses/${courseId}/${studentSessionId}/${speciesId}/${questionId}`;
      const existing = responses[questionId];
      await set(ref(db, path), {
        answer,
        status: existing?.status === "submitted" ? "submitted" : "draft",
        createdAt: existing?.createdAt ?? Date.now(),
        updatedAt: Date.now(),
        submittedAt: existing?.submittedAt ?? null,
      });
      setSaveStatus((prev) => ({ ...prev, [questionId]: "saved" }));
      setTimeout(() => setSaveStatus((prev) => ({ ...prev, [questionId]: "idle" })), 2000);
    } catch {
      setSaveStatus((prev) => ({ ...prev, [questionId]: "error" }));
    }
  }, [courseId, studentSessionId, speciesId, responses]);

  function handleOpenAnswerChange(question: CourseQuestion, value: string) {
    const questionId = question.id;
    setDrafts((prev) => ({ ...prev, [questionId]: value }));

    clearTimeout(debounceTimers.current[questionId]);
    if (value.trim().length >= getQuestionMinimumLength(question)) {
      setSaveStatus((prev) => ({ ...prev, [questionId]: "saving" }));
      debounceTimers.current[questionId] = setTimeout(() => {
        saveAnswer(questionId, value);
      }, 800);
    } else {
      setSaveStatus((prev) => ({ ...prev, [questionId]: "idle" }));
    }
  }

  function handleOptionSelect(questionId: string, optionId: string) {
    setDrafts((prev) => ({ ...prev, [questionId]: optionId }));
    void saveAnswer(questionId, optionId);
  }

  async function handleSubmitAll() {
    if (!species) return;

    const allQuestions = Object.values(species.questions).sort((a, b) => a.order - b.order);

    const firstIncomplete = allQuestions.find((q) => {
      const answer = drafts[q.id] ?? responses[q.id]?.answer ?? "";
      return !isQuestionAnswered(q, responses[q.id], answer);
    });

    if (firstIncomplete) {
      questionRefs.current[firstIncomplete.id]?.scrollIntoView({ behavior: "smooth", block: "center" });
      const el = textareaRefs.current[firstIncomplete.id];
      if (el) {
        el.focus();
      }
      return;
    }

    setSubmitLoading(true);
    try {
      const now = Date.now();
      const updates: Record<string, unknown> = {};
      for (const qId of Object.keys(species.questions)) {
        const answer = drafts[qId] ?? responses[qId]?.answer ?? "";
        updates[`courseResponses/${courseId}/${studentSessionId}/${speciesId}/${qId}`] = {
          answer,
          status: "submitted",
          createdAt: responses[qId]?.createdAt ?? now,
          updatedAt: now,
          submittedAt: responses[qId]?.submittedAt ?? now,
        };
      }
      await update(ref(db), updates);
      router.push(`/curso/${courseId}/sesion/${studentSessionId}`);
    } catch {
      alert("Error al enviar respuestas. Por favor, intenta de nuevo.");
      setSubmitLoading(false);
    }
  }

  // Styles
  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#f5f7f5",
    fontFamily: "system-ui, -apple-system, sans-serif",
    paddingBottom: 80,
  };

  const headerStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #0a2e1a, #1a4d2e)",
    padding: "16px 16px 20px",
    position: "sticky",
    top: 0,
    zIndex: 10,
  };

  if (loading) {
    return (
      <div style={{ ...pageStyle, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "#4a7a5a" }}>Cargando práctico...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a2e1a, #1a4d2e)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: "white", borderRadius: 20, padding: 32, maxWidth: 400, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔒</div>
          <p style={{ color: "#374151", fontWeight: 600, lineHeight: 1.5, marginBottom: 20 }}>{error}</p>
          <button
            onClick={() => router.back()}
            style={{ padding: "10px 24px", background: "#1a6b3a", color: "white", border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer", fontSize: 15 }}
          >
            ← Volver
          </button>
        </div>
      </div>
    );
  }

  if (!species) return null;

  const questionGroups = groupQuestionsByCategory(species.questions);
  const allQuestions = Object.values(species.questions).sort((a, b) => a.order - b.order);
  const totalQuestions = Object.keys(species.questions).length;
  const answeredCount = allQuestions.filter((question) =>
    isQuestionAnswered(question, responses[question.id], drafts[question.id] ?? responses[question.id]?.answer ?? "")
  ).length;
  const submittedCount = Object.values(responses).filter((r) => r?.status === "submitted").length;

  return (
    <div style={pageStyle}>
      {/* Sticky header */}
      <div style={headerStyle}>
        <button
          onClick={() => router.back()}
          style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 14, padding: 0, marginBottom: 10 }}
        >
          ← Volver a especies
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 36 }}>{species.emoji}</span>
          <div>
            <h1 style={{ color: "white", fontSize: 20, fontWeight: 800, margin: 0 }}>{species.name}</h1>
            <p style={{ color: "#86efac", fontSize: 13, margin: "2px 0 0" }}>
              {answeredCount}/{totalQuestions} respondidas
              {submittedCount > 0 && ` · ${submittedCount} enviadas`}
            </p>
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 16px 0" }}>
        {/* Case text */}
        <div style={{
          background: "white",
          borderRadius: 16,
          padding: "18px 18px",
          marginBottom: 20,
          borderLeft: "4px solid #1a6b3a",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#1a6b3a", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 8px" }}>
            Caso práctico
          </p>
          <p style={{ fontSize: 15, color: "#1a1a1a", lineHeight: 1.6, margin: 0 }}>
            {species.caseText}
          </p>
        </div>


        {/* Questions by category */}
        {questionGroups.map(([category, questions]) => {
          const catColor = CATEGORY_COLORS[category] ?? "#4a5568";
          return (
            <div key={category} style={{ marginBottom: 24 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 12,
              }}>
                <div style={{ width: 4, height: 20, background: catColor, borderRadius: 2 }} />
                <h2 style={{ fontSize: 14, fontWeight: 800, color: catColor, margin: 0, textTransform: "uppercase", letterSpacing: 0.5 }}>
                  {category}
                </h2>
              </div>

              {questions.map((q) => {
                const status = saveStatus[q.id] ?? "idle";
                const isSubmitted = responses[q.id]?.status === "submitted";
                const draft = drafts[q.id] ?? responses[q.id]?.answer ?? "";
                const minLength = getQuestionMinimumLength(q);
                const isMultipleChoice = q.type === "multiple_choice";

                return (
                  <div key={q.id} ref={(el) => { questionRefs.current[q.id] = el; }} style={{
                    background: "white",
                    borderRadius: 14,
                    padding: "16px 16px",
                    marginBottom: 12,
                    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
                    border: isSubmitted ? "2px solid #c4b5fd" : "1px solid #e5e7eb",
                  }}>
                    {isSubmitted && (
                      <span style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#7c3aed",
                        background: "#faf5ff",
                        borderRadius: 6,
                        padding: "2px 8px",
                        display: "inline-block",
                        marginBottom: 8,
                      }}>
                        ✓ Enviada
                      </span>
                    )}
                    <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", margin: "0 0 12px", lineHeight: 1.5 }}>
                      {q.text}
                    </p>
                    {isMultipleChoice ? (
                      <div style={{ display: "grid", gap: 8 }}>
                        {q.options?.map((option) => {
                          const selected = draft === option.id;
                          return (
                            <button
                              key={option.id}
                              type="button"
                              onClick={() => handleOptionSelect(q.id, option.id)}
                              style={{
                                textAlign: "left",
                                padding: "12px 14px",
                                borderRadius: 10,
                                border: `2px solid ${selected ? catColor : "#e5e7eb"}`,
                                background: selected ? `${catColor}12` : "#ffffff",
                                color: "#1a1a1a",
                                fontSize: 14,
                                lineHeight: 1.5,
                                cursor: "pointer",
                                fontWeight: selected ? 700 : 500,
                              }}
                            >
                              <span style={{ color: selected ? catColor : "#6b7280", marginRight: 8 }}>
                                {selected ? "●" : "○"}
                              </span>
                              {option.text}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <textarea
                        ref={(el) => { textareaRefs.current[q.id] = el; }}
                        value={draft}
                        onChange={(e) => handleOpenAnswerChange(q, e.target.value)}
                        placeholder={`Escribe tu respuesta aquí... (mínimo ${minLength} caracteres)`}
                        rows={4}
                        maxLength={500}
                        style={{
                          width: "100%",
                          padding: "12px",
                          borderRadius: 10,
                          border: `2px solid ${
                            draft.trim().length > 0 && draft.trim().length < minLength
                              ? "#ef4444"
                              : draft.trim().length >= minLength
                              ? catColor + "60"
                              : "#e5e7eb"
                          }`,
                          fontSize: 15,
                          lineHeight: 1.5,
                          resize: "vertical",
                          outline: "none",
                          boxSizing: "border-box",
                          fontFamily: "inherit",
                          color: "#1a1a1a",
                        }}
                      />
                    )}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6 }}>
                      <span style={{
                        fontSize: 12,
                        color: status === "saving" ? "#d97706"
                          : status === "saved" ? "#1a6b3a"
                          : status === "error" ? "#dc2626"
                          : "transparent",
                      }}>
                        {status === "saving" && "Guardando..."}
                        {status === "saved" && "✓ Guardado"}
                        {status === "error" && "Error al guardar"}
                      </span>
                      {isMultipleChoice ? (
                        <span style={{ fontSize: 12, color: draft ? catColor : "#9ca3af" }}>
                          {draft ? "1 alternativa seleccionada" : "Selecciona 1 alternativa"}
                        </span>
                      ) : (
                        <span style={{
                          fontSize: 12,
                          color: draft.trim().length < minLength && draft.trim().length > 0
                            ? "#ef4444"
                            : "#9ca3af",
                        }}>
                          {draft.length}/500
                          {draft.trim().length > 0 && draft.trim().length < minLength && (
                            <span> · mín. {minLength}</span>
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Key concept */}
        <div style={{
          background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
          borderRadius: 16,
          padding: "18px 18px",
          marginBottom: 24,
          border: "1px solid #86efac",
        }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#1a6b3a", textTransform: "uppercase", letterSpacing: 1, margin: "0 0 8px" }}>
            Idea clave
          </p>
          <p style={{ fontSize: 15, color: "#1a3a2a", fontWeight: 600, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
            &ldquo;{species.keyConcept}&rdquo;
          </p>
        </div>

        {/* Submit all button */}
        <button
          onClick={handleSubmitAll}
          disabled={submitLoading || answeredCount === 0}
          style={{
            width: "100%",
            padding: "16px",
            background: answeredCount === 0 ? "#d1d5db" : "linear-gradient(135deg, #1a6b3a, #2d9a5f)",
            color: answeredCount === 0 ? "#9ca3af" : "white",
            border: "none",
            borderRadius: 14,
            fontSize: 16,
            fontWeight: 700,
            cursor: answeredCount === 0 || submitLoading ? "not-allowed" : "pointer",
            marginBottom: 12,
          }}
        >
          {submitLoading ? "Enviando..." : `Enviar respuestas de ${species.name}`}
        </button>

        <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", margin: 0 }}>
          Las respuestas se guardan automáticamente mientras escribes o eliges una alternativa.
          Puedes editar hasta que la especie sea cerrada.
        </p>
      </div>
    </div>
  );
}
