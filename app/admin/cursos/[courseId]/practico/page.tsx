"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { off, onValue, ref, update } from "firebase/database";
import { db } from "@/lib/firebase";
import QRCode from "@/app/quiz/components/QRCode";
import {
  getQuestionResponseText,
  hasStoredAnswer,
  isQuestionAnswered,
} from "@/lib/wildlifeCourse/questionHelpers";
import { RABBIT_DENTAL_COURSE_ID, RABBIT_DENTAL_U3_U4_COURSE_ID } from "@/lib/wildlifeCourse/courseData";
import { seedWildlifeCourse } from "@/lib/wildlifeCourse/seed";
import type {
  AllStudentResponses,
  Course,
  CourseQuestion,
  CourseSpecies,
  CourseStudent,
  QuestionResponse,
} from "@/lib/wildlifeCourse/types";

type AdminTab = "alumnos" | "especies" | "respuestas" | "graficos";
type SelectedGraphQuestion = { speciesId: string; questionId: string };

const PROTECTED_COURSE_IDS = new Set([
  "fauna-silvestre-2026",
  RABBIT_DENTAL_COURSE_ID,
  RABBIT_DENTAL_U3_U4_COURSE_ID,
]);
const ADMIN_ACCESS_CODE = "Valkytorby3032";

function getAdminAccessStorageKey(courseId: string): string {
  return `wildlife_admin_access_${courseId}`;
}

function getMultipleChoiceQuestions(species: CourseSpecies): CourseQuestion[] {
  return Object.values(species.questions)
    .filter((question) => question.type === "multiple_choice" && question.options?.length)
    .sort((a, b) => a.order - b.order);
}

function getOptionCounts(
  speciesId: string,
  question: CourseQuestion,
  allResponses: AllStudentResponses
): Record<string, number> {
  const counts = Object.fromEntries(
    (question.options ?? []).map((option) => [option.id, 0])
  );

  Object.values(allResponses).forEach((studentResponses) => {
    const answer = studentResponses?.[speciesId]?.[question.id]?.answer;
    if (answer && answer in counts) {
      counts[answer] += 1;
    }
  });

  return counts;
}

const PIE_COLORS = ["#1a6b3a", "#2563eb", "#f59e0b", "#dc2626", "#7c3aed", "#0891b2"];

function getPiePoint(center: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180;
  return {
    x: center + radius * Math.cos(angleInRadians),
    y: center + radius * Math.sin(angleInRadians),
  };
}

function getPieSlicePath(center: number, radius: number, startAngle: number, endAngle: number): string {
  const safeEndAngle = endAngle - startAngle >= 360 ? startAngle + 359.99 : endAngle;
  const start = getPiePoint(center, radius, safeEndAngle);
  const end = getPiePoint(center, radius, startAngle);
  const largeArcFlag = safeEndAngle - startAngle <= 180 ? "0" : "1";

  return [
    `M ${center} ${center}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleString("es-CL", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getStudentProgress(
  species: Record<string, CourseSpecies>,
  studentResponses: Record<string, Record<string, QuestionResponse>> | undefined
): string {
  if (!studentResponses) return "No iniciado";
  const totalQ = Object.values(species).reduce((acc, s) => acc + Object.keys(s.questions).length, 0);
  if (totalQ === 0) return "No iniciado";
  const answered = Object.values(species).reduce((acc, currentSpecies) => {
    const speciesResponses = studentResponses[currentSpecies.id] ?? {};
    return acc + Object.values(currentSpecies.questions).filter((question) =>
      isQuestionAnswered(question, speciesResponses[question.id])
    ).length;
  }, 0);
  const submitted = Object.values(studentResponses).flatMap((sr) => Object.values(sr)).filter((r) => r?.status === "submitted").length;
  if (answered === 0) return "No iniciado";
  if (submitted === totalQ) return "Completado";
  if (submitted > 0) return "Completado parcial";
  return "En progreso";
}

export default function AdminPracticoPage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const requiresAccessCode = PROTECTED_COURSE_IDS.has(courseId);
  const enrollUrl =
    typeof window !== "undefined" ? `${window.location.origin}/curso/${courseId}/inscripcion` : "";

  const [course, setCourse] = useState<Course | null>(null);
  const [students, setStudents] = useState<Record<string, CourseStudent>>({});
  const [allResponses, setAllResponses] = useState<AllStudentResponses>({});
  const [activeTab, setActiveTab] = useState<AdminTab>("alumnos");
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");
  const [copiedId, setCopiedId] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [selectedGraphSpecies, setSelectedGraphSpecies] = useState<string | null>(null);
  const [selectedGraphCategory, setSelectedGraphCategory] = useState<string | null>(null);
  const [selectedGraphQuestion, setSelectedGraphQuestion] = useState<SelectedGraphQuestion | null>(null);
  const [togglingSpecies, setTogglingSpecies] = useState<Record<string, boolean>>({});
  const [resettingStudent, setResettingStudent] = useState<Record<string, boolean>>({});
  const [deletingStudent, setDeletingStudent] = useState<Record<string, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});
  const [isAuthorized, setIsAuthorized] = useState(() => {
    if (!requiresAccessCode || typeof window === "undefined") {
      return !requiresAccessCode;
    }

    return window.sessionStorage.getItem(getAdminAccessStorageKey(courseId)) === ADMIN_ACCESS_CODE;
  });
  const [accessCodeInput, setAccessCodeInput] = useState("");
  const [accessError, setAccessError] = useState("");

  // Real-time: course
  useEffect(() => {
    const courseRef = ref(db, `courses/${courseId}`);
    const unsub = onValue(courseRef, (snap) => {
      setCourse(snap.exists() ? snap.val() : null);
    });
    return () => off(courseRef, "value", unsub);
  }, [courseId]);

  // Real-time: students
  useEffect(() => {
    const studentsRef = ref(db, `courseStudents/${courseId}`);
    const unsub = onValue(studentsRef, (snap) => {
      setStudents(snap.exists() ? snap.val() : {});
    });
    return () => off(studentsRef, "value", unsub);
  }, [courseId]);

  // Real-time: all responses
  useEffect(() => {
    const responsesRef = ref(db, `courseResponses/${courseId}`);
    const unsub = onValue(responsesRef, (snap) => {
      setAllResponses(snap.exists() ? snap.val() : {});
    });
    return () => off(responsesRef, "value", unsub);
  }, [courseId]);

  async function handleSeed() {
    setSeeding(true);
    setSeedMsg("");
    try {
      const result = await seedWildlifeCourse(courseId);
      setSeedMsg(result.message);
    } catch (err) {
      setSeedMsg("Error al inicializar: " + String(err));
    }
    setSeeding(false);
  }

  async function handleToggleSpecies(speciesId: string, currentEnabled: boolean) {
    if (!course) return;
    setTogglingSpecies((prev) => ({ ...prev, [speciesId]: true }));
    try {
      const allowMultiple = course.settings?.allowMultipleEnabledSpecies ?? true;
      const updates: Record<string, unknown> = {};

      if (!allowMultiple && !currentEnabled) {
        // Disable all other species first
        for (const sid of Object.keys(course.species)) {
          if (sid !== speciesId) {
            updates[`courses/${courseId}/species/${sid}/enabled`] = false;
            updates[`courses/${courseId}/species/${sid}/enabledAt`] = null;
          }
        }
      }

      updates[`courses/${courseId}/species/${speciesId}/enabled`] = !currentEnabled;
      updates[`courses/${courseId}/species/${speciesId}/enabledAt`] = !currentEnabled
        ? { ".sv": "timestamp" }
        : null;
      await update(ref(db), updates);
    } catch {
      alert("Error al cambiar estado de la especie.");
    }
    setTogglingSpecies((prev) => ({ ...prev, [speciesId]: false }));
  }

  async function handleResetStudent(studentId: string, studentName: string) {
    const confirmed = window.confirm(`¿Reiniciar todas las respuestas de ${studentName}? Esta acción no se puede deshacer.`);
    if (!confirmed) return;

    setResettingStudent((prev) => ({ ...prev, [studentId]: true }));
    try {
      await update(ref(db), {
        [`courseResponses/${courseId}/${studentId}`]: null,
      });

      if (selectedStudent === studentId) {
        setActiveTab("respuestas");
      }
    } catch {
      alert("Error al reiniciar respuestas del alumno.");
    }
    setResettingStudent((prev) => ({ ...prev, [studentId]: false }));
  }

  async function handleDeleteStudent(studentId: string, studentName: string) {
    const confirmed = window.confirm(`¿Eliminar a ${studentName} del curso? También se borrarán todas sus respuestas.`);
    if (!confirmed) return;

    setDeletingStudent((prev) => ({ ...prev, [studentId]: true }));
    try {
      await update(ref(db), {
        [`courseStudents/${courseId}/${studentId}`]: null,
        [`courseResponses/${courseId}/${studentId}`]: null,
      });

      if (selectedStudent === studentId) {
        setSelectedStudent(null);
      }
    } catch {
      alert("Error al eliminar alumno.");
    }
    setDeletingStudent((prev) => ({ ...prev, [studentId]: false }));
  }

  function handleCopy(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(""), 2000);
    });
  }

  function toggleRevealAnswer(speciesId: string, questionId: string) {
    const revealKey = `${speciesId}:${questionId}`;
    setRevealedAnswers((prev) => ({
      ...prev,
      [revealKey]: !prev[revealKey],
    }));
  }

  function handleAccessSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (accessCodeInput.trim() !== ADMIN_ACCESS_CODE) {
      setAccessError("Código incorrecto. Intenta nuevamente.");
      return;
    }

    if (typeof window !== "undefined") {
      window.sessionStorage.setItem(getAdminAccessStorageKey(courseId), ADMIN_ACCESS_CODE);
    }

    setAccessError("");
    setIsAuthorized(true);
  }

  const sortedSpecies = course
    ? Object.values(course.species).sort((a, b) => a.order - b.order)
    : [];

  const sortedStudents = Object.values(students).sort((a, b) => b.createdAt - a.createdAt);
  const activeGraphSpecies = selectedGraphSpecies && sortedSpecies.some((species) => species.id === selectedGraphSpecies)
    ? selectedGraphSpecies
    : sortedSpecies[0]?.id ?? null;
  const modalGraphSpecies = selectedGraphQuestion
    ? sortedSpecies.find((species) => species.id === selectedGraphQuestion.speciesId)
    : null;
  const modalGraphQuestion = modalGraphSpecies && selectedGraphQuestion
    ? modalGraphSpecies.questions[selectedGraphQuestion.questionId]
    : null;

  // Styles
  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#f5f7f5",
    fontFamily: "system-ui, -apple-system, sans-serif",
    paddingBottom: 60,
  };

  const headerStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #0a2e1a, #1a4d2e)",
    padding: "20px 20px 24px",
  };

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: "10px 18px",
    background: active ? "white" : "transparent",
    color: active ? "#1a6b3a" : "rgba(255,255,255,0.7)",
    border: "none",
    borderRadius: 10,
    fontWeight: active ? 700 : 500,
    fontSize: 14,
    cursor: "pointer",
    transition: "all 0.15s",
  });

  const cardStyle: React.CSSProperties = {
    background: "white",
    borderRadius: 14,
    padding: "18px",
    marginBottom: 12,
    boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
  };

  const btnSmStyle: React.CSSProperties = {
    padding: "6px 12px",
    background: "#f0f7f2",
    color: "#1a6b3a",
    border: "1px solid #c8e6d0",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap" as const,
  };

  const accessPageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a2e1a 0%, #123e26 55%, #1d5c37 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const accessCardStyle: React.CSSProperties = {
    width: "100%",
    maxWidth: 420,
    background: "rgba(255,255,255,0.98)",
    borderRadius: 22,
    padding: 28,
    boxShadow: "0 24px 60px rgba(0,0,0,0.28)",
  };

  const accessInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "1px solid #b7cfbe",
    fontSize: 16,
    outline: "none",
    boxSizing: "border-box",
    marginTop: 10,
    marginBottom: 12,
  };

  const accessButtonStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(135deg, #0f5a32, #2f8f57)",
    color: "#fff",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  };

  if (requiresAccessCode && !isAuthorized) {
    return (
      <main style={accessPageStyle}>
        <form style={accessCardStyle} onSubmit={handleAccessSubmit}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 54,
              height: 54,
              borderRadius: 16,
              background: "#e7f4eb",
              color: "#14532d",
              fontSize: 28,
              marginBottom: 16,
            }}
          >
            🔒
          </div>
          <h1 style={{ margin: 0, color: "#123524", fontSize: 28, fontWeight: 800 }}>
            Acceso protegido
          </h1>
          <p style={{ margin: "10px 0 0", color: "#486356", fontSize: 15, lineHeight: 1.5 }}>
            Ingresa el código de seguridad para acceder al práctico de administración.
          </p>
          <label
            htmlFor="admin-access-code"
            style={{ display: "block", marginTop: 18, color: "#1f3b2c", fontSize: 14, fontWeight: 700 }}
          >
            Código de acceso
          </label>
          <input
            id="admin-access-code"
            type="password"
            value={accessCodeInput}
            onChange={(e) => {
              setAccessCodeInput(e.target.value);
              if (accessError) setAccessError("");
            }}
            placeholder="Ingresa el código"
            style={accessInputStyle}
            autoFocus
          />
          {accessError ? (
            <p style={{ margin: "0 0 12px", color: "#b42318", fontSize: 14 }}>{accessError}</p>
          ) : null}
          <button type="submit" style={accessButtonStyle}>
            Entrar al práctico
          </button>
        </form>
      </main>
    );
  }

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>
          Panel de administración
        </p>
        <h1 style={{ color: "white", fontSize: 20, fontWeight: 800, margin: "0 0 16px" }}>
          {course?.title ?? "Clase práctica de fauna silvestre"}
        </h1>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, background: "rgba(0,0,0,0.2)", borderRadius: 12, padding: 4, flexWrap: "wrap" }}>
          {(["alumnos", "especies", "respuestas", "graficos"] as AdminTab[]).map((tab) => (
            <button key={tab} style={tabStyle(activeTab === tab)} onClick={() => setActiveTab(tab)}>
              {tab === "alumnos" && `👥 Alumnos (${sortedStudents.length})`}
              {tab === "especies" && "🐾 Especies"}
              {tab === "respuestas" && "📝 Respuestas"}
              {tab === "graficos" && "📊 Gráficos"}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 16px 0" }}>
        {/* No course warning */}
        {!course && (
          <div style={{ ...cardStyle, border: "2px solid #fcd34d", background: "#fffbeb" }}>
            <p style={{ fontWeight: 700, color: "#92400e", margin: "0 0 12px" }}>
              ⚠️ El curso no está inicializado en Firebase
            </p>
            <p style={{ color: "#92400e", fontSize: 14, margin: "0 0 14px" }}>
              Usa el botón abajo para crear el curso con todas las especies y preguntas.
            </p>
            <button
              onClick={handleSeed}
              disabled={seeding}
              style={{ padding: "10px 20px", background: "#1a6b3a", color: "white", border: "none", borderRadius: 10, fontWeight: 700, cursor: seeding ? "wait" : "pointer", fontSize: 14 }}
            >
              {seeding ? "Inicializando..." : "Inicializar curso en Firebase"}
            </button>
            {seedMsg && <p style={{ fontSize: 13, color: "#1a6b3a", marginTop: 8, marginBottom: 0 }}>{seedMsg}</p>}
          </div>
        )}

        {/* Seed button when course exists */}
        {course && (
          <div style={{ marginBottom: 16, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
            <button
              onClick={handleSeed}
              disabled={seeding}
              style={{ ...btnSmStyle, background: "#f0fdf4" }}
            >
              {seeding ? "Actualizando..." : "🔄 Re-sincronizar contenido"}
            </button>
            {seedMsg && <span style={{ fontSize: 12, color: "#1a6b3a" }}>{seedMsg}</span>}
          </div>
        )}

        {/* ===== TAB: ALUMNOS ===== */}
        {activeTab === "alumnos" && (
          <div>
            {/* QR Card */}
            <div style={{ ...cardStyle, marginBottom: 20 }}>
              <p style={{ fontWeight: 700, color: "#1a3a2a", margin: "0 0 4px", fontSize: 15 }}>
                QR de inscripción
              </p>
              <p style={{ fontSize: 13, color: "#5a7a6a", margin: "0 0 16px" }}>
                Muestra este QR a los alumnos para que se inscriban.
              </p>
              {enrollUrl && <QRCode url={enrollUrl} />}
              <div style={{ marginTop: 14, display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => handleCopy(enrollUrl, "enroll")} style={btnSmStyle}>
                  {copiedId === "enroll" ? "✓ Copiado" : "Copiar enlace"}
                </button>
                <a href={enrollUrl} target="_blank" rel="noopener noreferrer" style={{ ...btnSmStyle, textDecoration: "none", display: "inline-block" }}>
                  Abrir enlace ↗
                </a>
              </div>
            </div>

            {/* Students table */}
            {sortedStudents.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>👥</div>
                <p style={{ margin: 0 }}>Aún no hay alumnos inscritos.</p>
              </div>
            ) : (
              sortedStudents.map((student) => {
                const progress = course
                  ? getStudentProgress(course.species, allResponses[student.id])
                  : "No iniciado";
                const isResetting = resettingStudent[student.id] ?? false;
                const isDeleting = deletingStudent[student.id] ?? false;
                const progressColor =
                  progress === "Completado" ? "#7c3aed" :
                  progress === "Completado parcial" ? "#d97706" :
                  progress === "En progreso" ? "#1a6b3a" : "#9ca3af";

                return (
                  <div key={student.id} style={cardStyle}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#f0f7f2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                        👤
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                          <span style={{ fontWeight: 700, fontSize: 15, color: "#1a1a1a" }}>{student.name}</span>
                          <span style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: progressColor,
                            background: `${progressColor}15`,
                            borderRadius: 6,
                            padding: "2px 8px",
                          }}>
                            {progress}
                          </span>
                        </div>
                        {student.email && <p style={{ fontSize: 12, color: "#5a7a6a", margin: "2px 0 0" }}>{student.email}</p>}
                        {student.group && <p style={{ fontSize: 12, color: "#7a8a7a", margin: "2px 0 0" }}>Grupo: {student.group}</p>}
                        <p style={{ fontSize: 11, color: "#9ca3af", margin: "4px 0 0" }}>
                          Inscrito: {formatDate(student.createdAt)}
                        </p>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                      <button
                        onClick={() => handleCopy(student.sessionUrl, student.id)}
                        style={btnSmStyle}
                        disabled={isResetting || isDeleting}
                      >
                        {copiedId === student.id ? "✓ Copiado" : "Copiar enlace"}
                      </button>
                      <button
                        onClick={() => {
                          setSelectedStudent(selectedStudent === student.id ? null : student.id);
                          setActiveTab("respuestas");
                        }}
                        style={btnSmStyle}
                        disabled={isResetting || isDeleting}
                      >
                        Ver respuestas
                      </button>
                      <button
                        onClick={() => handleResetStudent(student.id, student.name)}
                        style={{ ...btnSmStyle, background: "#fff7ed", border: "1px solid #fdba74", color: "#c2410c" }}
                        disabled={isResetting || isDeleting}
                      >
                        {isResetting ? "Reiniciando..." : "Reiniciar respuestas"}
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id, student.name)}
                        style={{ ...btnSmStyle, background: "#fef2f2", border: "1px solid #fca5a5", color: "#b91c1c" }}
                        disabled={isResetting || isDeleting}
                      >
                        {isDeleting ? "Eliminando..." : "Eliminar alumno"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ===== TAB: GRAFICOS ===== */}
        {activeTab === "graficos" && (
          <div>
            {!course ? (
              <p style={{ color: "#9ca3af", textAlign: "center", paddingTop: 40 }}>Inicializa el curso primero.</p>
            ) : (
              <>
                <div style={{ ...cardStyle, marginBottom: 16, padding: 12 }}>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {sortedSpecies.map((species) => {
                      const isActive = species.id === activeGraphSpecies;
                      return (
                        <button
                          key={species.id}
                          type="button"
                          onClick={() => {
                            setSelectedGraphSpecies(species.id);
                            setSelectedGraphCategory(null);
                          }}
                          style={{
                            padding: "10px 14px",
                            borderRadius: 10,
                            border: `1px solid ${isActive ? "#86efac" : "#d1d5db"}`,
                            background: isActive ? "#f0fdf4" : "white",
                            color: isActive ? "#166534" : "#374151",
                            fontSize: 13,
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          {species.emoji} {species.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {sortedSpecies
                  .filter((species) => species.id === activeGraphSpecies)
                  .map((species) => {
                    const multipleChoiceQuestions = getMultipleChoiceQuestions(species);
                    const graphCategories = Array.from(new Set(multipleChoiceQuestions.map((question) => question.category)));
                    const activeGraphCategory = selectedGraphCategory && graphCategories.includes(selectedGraphCategory)
                      ? selectedGraphCategory
                      : graphCategories[0] ?? null;
                    const filteredQuestions = activeGraphCategory
                      ? multipleChoiceQuestions.filter((question) => question.category === activeGraphCategory)
                      : multipleChoiceQuestions;

                    return (
                      <div key={species.id} style={{ ...cardStyle, marginBottom: 20 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 28 }}>{species.emoji}</span>
                          <div>
                            <h3 style={{ fontSize: 17, fontWeight: 800, color: "#1a1a1a", margin: 0 }}>{species.name}</h3>
                            <p style={{ fontSize: 12, color: "#6b7280", margin: "2px 0 0" }}>
                              {multipleChoiceQuestions.length} preguntas de alternativa en tiempo real
                            </p>
                          </div>
                        </div>

                        {multipleChoiceQuestions.length === 0 ? (
                          <p style={{ fontSize: 13, color: "#9ca3af", margin: 0 }}>Esta especie no tiene preguntas de alternativa.</p>
                        ) : (
                          <>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                              {graphCategories.map((category) => {
                                const isActive = category === activeGraphCategory;
                                const categoryCount = multipleChoiceQuestions.filter((question) => question.category === category).length;

                                return (
                                  <button
                                    key={category}
                                    type="button"
                                    onClick={() => setSelectedGraphCategory(category)}
                                    style={{
                                      padding: "8px 12px",
                                      borderRadius: 999,
                                      border: `1px solid ${isActive ? "#86efac" : "#d1d5db"}`,
                                      background: isActive ? "#f0fdf4" : "white",
                                      color: isActive ? "#166534" : "#4b5563",
                                      fontSize: 12,
                                      fontWeight: 700,
                                      cursor: "pointer",
                                    }}
                                  >
                                    {category} · {categoryCount}
                                  </button>
                                );
                              })}
                            </div>

                            <div className="admin-graphs-grid">
                            {filteredQuestions.map((question) => (
                                <button
                                  key={question.id}
                                  type="button"
                                  onClick={() => setSelectedGraphQuestion({ speciesId: species.id, questionId: question.id })}
                                  className="admin-graph-question-card"
                                  style={{
                                    width: "100%",
                                    textAlign: "left",
                                    border: "1px solid #dbe7df",
                                    borderRadius: 14,
                                    background: "#ffffff",
                                    padding: "14px 16px",
                                    marginTop: 10,
                                    cursor: "pointer",
                                    boxShadow: "0 1px 5px rgba(0,0,0,0.06)",
                                  }}
                                >
                                  <p style={{ fontSize: 14, fontWeight: 600, color: "#1f2937", margin: 0, lineHeight: 1.5 }}>
                                    {question.text}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        )}

        {/* ===== TAB: ESPECIES ===== */}
        {activeTab === "especies" && (
          <div>
            {!course ? (
              <p style={{ color: "#9ca3af", textAlign: "center", paddingTop: 40 }}>Inicializa el curso primero.</p>
            ) : (
              <>
                <div style={{ ...cardStyle, background: "#f0fdf4", border: "1px solid #86efac", marginBottom: 20 }}>
                  <p style={{ fontSize: 14, color: "#1a3a2a", margin: 0, lineHeight: 1.5 }}>
                    <strong>Habilitar una especie</strong> hace que todos los alumnos puedan verla y responderla en tiempo real.
                    {course.settings?.allowMultipleEnabledSpecies
                      ? " Puedes tener varias activas a la vez."
                      : " Solo una especie activa a la vez."}
                  </p>
                </div>

                {sortedSpecies.map((species) => (
                  <div key={species.id} style={{
                    ...cardStyle,
                    border: species.enabled ? "2px solid #86efac" : "1px solid #e5e7eb",
                    background: species.enabled ? "#f0fdf4" : "white",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 32, flexShrink: 0 }}>{species.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 2px", color: "#1a1a1a" }}>{species.name}</h3>
                        <p style={{ fontSize: 12, color: "#5a7a6a", margin: 0 }}>
                          {Object.keys(species.questions).length} preguntas
                          {species.enabledAt && species.enabled && (
                            <> · Habilitada {formatDate(species.enabledAt)}</>
                          )}
                        </p>
                      </div>
                      {/* Toggle */}
                      <button
                        onClick={() => handleToggleSpecies(species.id, species.enabled)}
                        disabled={togglingSpecies[species.id]}
                        style={{
                          padding: "8px 16px",
                          background: species.enabled ? "#dc2626" : "#1a6b3a",
                          color: "white",
                          border: "none",
                          borderRadius: 10,
                          fontWeight: 700,
                          cursor: togglingSpecies[species.id] ? "wait" : "pointer",
                          fontSize: 13,
                          flexShrink: 0,
                          opacity: togglingSpecies[species.id] ? 0.6 : 1,
                        }}
                      >
                        {togglingSpecies[species.id]
                          ? "..."
                          : species.enabled ? "Deshabilitar" : "Habilitar"}
                      </button>
                    </div>

                    {/* Progress bar */}
                    {species.enabled && (() => {
                      const total = Object.keys(species.questions).length;
                      const speciesQuestions = Object.values(species.questions);
                      const responded = Object.values(allResponses).filter(
                        (sr) => sr?.[species.id] && speciesQuestions.some((question) =>
                          isQuestionAnswered(question, sr[species.id]?.[question.id])
                        )
                      ).length;
                      const pct = sortedStudents.length > 0 ? Math.round((responded / sortedStudents.length) * 100) : 0;
                      return (
                        <div style={{ marginTop: 12 }}>
                          <p style={{ fontSize: 12, color: "#4a7a5a", margin: "0 0 4px" }}>
                            {responded}/{sortedStudents.length} alumnos han respondido · {total} preguntas
                          </p>
                          <div style={{ background: "#d1fae5", borderRadius: 4, height: 6, overflow: "hidden" }}>
                            <div style={{ background: "#1a6b3a", height: "100%", width: `${pct}%`, borderRadius: 4, transition: "width 0.5s" }} />
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* ===== TAB: RESPUESTAS ===== */}
        {activeTab === "respuestas" && (
          <div>
            {/* Filters */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
              <select
                value={selectedStudent ?? ""}
                onChange={(e) => setSelectedStudent(e.target.value || null)}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #d1e8d9", fontSize: 13, background: "white", color: "#1a3a2a", flex: 1, minWidth: 140 }}
              >
                <option value="">Todos los alumnos</option>
                {sortedStudents.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>

              <select
                value={selectedSpecies ?? ""}
                onChange={(e) => setSelectedSpecies(e.target.value || null)}
                style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid #d1e8d9", fontSize: 13, background: "white", color: "#1a3a2a", flex: 1, minWidth: 140 }}
              >
                <option value="">Todas las especies</option>
                {sortedSpecies.map((s) => (
                  <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>
                ))}
              </select>
            </div>

            {/* Responses */}
            {sortedStudents
              .filter((s) => !selectedStudent || s.id === selectedStudent)
              .map((student) => {
                const studentResponses = allResponses[student.id];
                if (!studentResponses && !selectedStudent) return null;

                const speciesToShow = sortedSpecies.filter(
                  (sp) => (!selectedSpecies || sp.id === selectedSpecies) && studentResponses?.[sp.id]
                );
                if (speciesToShow.length === 0 && selectedStudent !== student.id) return null;

                return (
                  <div key={student.id} style={{ marginBottom: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 16 }}>👤</span>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1a3a2a", margin: 0 }}>{student.name}</h3>
                      {student.group && <span style={{ fontSize: 12, color: "#9ca3af" }}>{student.group}</span>}
                    </div>

                    {speciesToShow.length === 0 ? (
                      <div style={{ ...cardStyle, color: "#9ca3af", fontSize: 14, textAlign: "center" }}>
                        No hay respuestas aún.
                      </div>
                    ) : (
                      speciesToShow.map((species) => {
                        const speciesResponses = studentResponses?.[species.id] ?? {};
                        const questions = Object.values(species.questions).sort((a, b) => a.order - b.order);

                        return (
                          <div key={species.id} style={{ marginBottom: 12 }}>
                            <p style={{ fontSize: 13, fontWeight: 700, color: "#1a6b3a", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 6 }}>
                              <span>{species.emoji}</span> {species.name}
                            </p>
                            {questions.map((q) => {
                              const r = speciesResponses[q.id];
                              if (!r) return null;
                              return (
                                <div key={q.id} style={{
                                  background: "white",
                                  borderRadius: 12,
                                  padding: "12px 14px",
                                  marginBottom: 8,
                                  boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                                  borderLeft: `3px solid ${r.status === "submitted" ? "#7c3aed" : "#d97706"}`,
                                }}>
                                  {(() => {
                                    const answerText = getQuestionResponseText(q, r);
                                    const hasAnswer = hasStoredAnswer(answerText);

                                    return (
                                      <>
                                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, flexWrap: "wrap", gap: 4 }}>
                                    <span style={{ fontSize: 11, color: "#9ca3af" }}>{q.category}</span>
                                    <span style={{
                                      fontSize: 11,
                                      fontWeight: 600,
                                      color: r.status === "submitted" ? "#7c3aed" : "#d97706",
                                    }}>
                                      {r.status === "submitted" ? "✓ Enviada" : "Borrador"}
                                    </span>
                                  </div>
                                  <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", margin: "0 0 6px" }}>{q.text}</p>
                                  {q.type === "multiple_choice" && (
                                    <p style={{ fontSize: 11, fontWeight: 700, color: "#1a6b3a", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.4 }}>
                                      Alternativa
                                    </p>
                                  )}
                                  <p style={{
                                    fontSize: 14,
                                    color: hasAnswer ? "#1a1a1a" : "#9ca3af",
                                    margin: 0,
                                    lineHeight: 1.5,
                                    fontStyle: hasAnswer ? "normal" : "italic",
                                    background: "#f9fafb",
                                    borderRadius: 8,
                                    padding: "8px 10px",
                                  }}>
                                    {answerText || "Sin respuesta"}
                                  </p>
                                  {r.updatedAt && (
                                    <p style={{ fontSize: 11, color: "#9ca3af", margin: "4px 0 0" }}>
                                      Actualizada: {formatDate(r.updatedAt)}
                                      {r.submittedAt && ` · Enviada: ${formatDate(r.submittedAt)}`}
                                    </p>
                                  )}
                                      </>
                                    );
                                  })()}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })
                    )}
                  </div>
                );
              })}

            {sortedStudents.filter((s) => !selectedStudent || s.id === selectedStudent).length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#9ca3af" }}>
                <p>No hay respuestas disponibles.</p>
              </div>
            )}
          </div>
        )}
      </div>
      {modalGraphSpecies && modalGraphQuestion && (() => {
        const revealKey = `${modalGraphSpecies.id}:${modalGraphQuestion.id}`;
        const isRevealed = revealedAnswers[revealKey] ?? false;
        const optionCounts = getOptionCounts(modalGraphSpecies.id, modalGraphQuestion, allResponses);
        const totalResponses = Object.values(optionCounts).reduce((sum, count) => sum + count, 0);
        const correctOption = modalGraphQuestion.options?.find((option) => option.isCorrect);
        const correctCount = correctOption ? optionCounts[correctOption.id] ?? 0 : 0;
        const correctPercentage = totalResponses > 0 ? Math.round((correctCount / totalResponses) * 100) : 0;

        return (
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Gráfico de ${modalGraphQuestion.text}`}
            onClick={() => setSelectedGraphQuestion(null)}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 50,
              background: "rgba(6, 24, 14, 0.72)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 18,
            }}
          >
            <div
              onClick={(event) => event.stopPropagation()}
              style={{
                width: "100%",
                maxWidth: 920,
                maxHeight: "90vh",
                overflow: "auto",
                background: "#ffffff",
                borderRadius: 22,
                padding: 22,
                boxShadow: "0 30px 80px rgba(0,0,0,0.35)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                <div>
                  <p style={{ fontSize: 12, fontWeight: 800, color: "#1a6b3a", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: 0.6 }}>
                    {modalGraphSpecies.emoji} {modalGraphSpecies.name} · {modalGraphQuestion.category}
                  </p>
                  <h2 style={{ fontSize: 18, lineHeight: 1.45, color: "#1f2937", margin: 0 }}>
                    {modalGraphQuestion.text}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedGraphQuestion(null)}
                  style={{
                    border: "none",
                    background: "#f3f4f6",
                    color: "#374151",
                    borderRadius: 999,
                    width: 36,
                    height: 36,
                    fontSize: 20,
                    fontWeight: 800,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                  aria-label="Cerrar gráfico"
                >
                  ×
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
                <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
                  {totalResponses} respuestas registradas
                </p>
                <button
                  type="button"
                  onClick={() => toggleRevealAnswer(modalGraphSpecies.id, modalGraphQuestion.id)}
                  style={{
                    ...btnSmStyle,
                    background: isRevealed ? "#ecfdf5" : "#eff6ff",
                    border: `1px solid ${isRevealed ? "#86efac" : "#93c5fd"}`,
                    color: isRevealed ? "#166534" : "#1d4ed8",
                  }}
                >
                  {isRevealed ? "Ocultar correcta" : "Revelar correcta"}
                </button>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "minmax(220px, 300px) minmax(0, 1fr)", gap: 22, alignItems: "center" }}>
                <div style={{ position: "relative", width: "100%", maxWidth: 300, margin: "0 auto" }}>
                  <svg viewBox="0 0 180 180" role="img" aria-label={`Gráfico de torta para ${modalGraphQuestion.text}`} style={{ width: "100%", height: "auto", display: "block", overflow: "visible" }}>
                    <circle cx="90" cy="90" r="64" fill="#eef2f7" />
                    {totalResponses === 0 ? (
                      <circle cx="90" cy="90" r="46" fill="#ffffff" opacity="0.92" />
                    ) : (() => {
                      let startAngle = 0;
                      return (modalGraphQuestion.options ?? []).map((option, optionIndex) => {
                        const count = optionCounts[option.id] ?? 0;
                        const angle = (count / totalResponses) * 360;
                        const endAngle = startAngle + angle;
                        const midAngle = startAngle + angle / 2;
                        const isCorrectSlice = isRevealed && option.isCorrect;
                        const explodeDistance = isCorrectSlice ? 12 : 0;
                        const offset = getPiePoint(0, explodeDistance, midAngle);
                        const slicePath = angle > 0 ? getPieSlicePath(90, 64, startAngle, endAngle) : "";
                        startAngle = endAngle;

                        if (!slicePath) return null;

                        return (
                          <g
                            key={option.id}
                            transform={`translate(${offset.x}, ${offset.y})`}
                            style={{ transition: "transform 0.45s ease" }}
                          >
                            <path
                              d={slicePath}
                              fill={PIE_COLORS[optionIndex % PIE_COLORS.length]}
                              stroke="#ffffff"
                              strokeWidth={isCorrectSlice ? 4 : 2}
                              style={{
                                filter: isCorrectSlice ? "drop-shadow(0 10px 14px rgba(22, 101, 52, 0.28))" : "none",
                                transition: "filter 0.45s ease, stroke-width 0.45s ease",
                              }}
                            />
                          </g>
                        );
                      });
                    })()}
                    <circle cx="90" cy="90" r="38" fill="#ffffff" opacity="0.96" />
                    <text x="90" y={isRevealed ? "84" : "92"} textAnchor="middle" fill={isRevealed ? "#166534" : "#374151"} fontSize={isRevealed ? "26" : "18"} fontWeight="800">
                      {isRevealed ? `${correctPercentage}%` : totalResponses}
                    </text>
                    <text x="90" y={isRevealed ? "105" : "111"} textAnchor="middle" fill="#6b7280" fontSize="10" fontWeight="700">
                      {isRevealed ? "correctas" : "respuestas"}
                    </text>
                  </svg>
                  {isRevealed && (
                    <div style={{
                      position: "absolute",
                      right: 4,
                      top: 4,
                      background: "#dcfce7",
                      color: "#166534",
                      border: "1px solid #86efac",
                      borderRadius: 999,
                      padding: "6px 10px",
                      fontSize: 12,
                      fontWeight: 800,
                      boxShadow: "0 8px 20px rgba(22, 101, 52, 0.18)",
                    }}>
                      {correctCount}/{totalResponses} correctas
                    </div>
                  )}
                </div>

                <div style={{ display: "grid", gap: 10 }}>
                  {(modalGraphQuestion.options ?? []).map((option, optionIndex) => {
                    const count = optionCounts[option.id] ?? 0;
                    const percentage = totalResponses > 0 ? Math.round((count / totalResponses) * 100) : 0;
                    const showCorrect = isRevealed && option.isCorrect;

                    return (
                      <div
                        key={option.id}
                        style={{
                          border: `2px solid ${showCorrect ? "#16a34a" : "#e5e7eb"}`,
                          borderRadius: 12,
                          padding: "10px 12px",
                          background: showCorrect ? "#f0fdf4" : "#fafafa",
                          boxShadow: showCorrect ? "0 10px 24px rgba(22, 101, 52, 0.12)" : "none",
                          transition: "all 0.25s ease",
                        }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                            <span style={{ width: 12, height: 12, borderRadius: "50%", background: PIE_COLORS[optionIndex % PIE_COLORS.length], flexShrink: 0 }} />
                            <span style={{ fontSize: 12, fontWeight: 800, color: "#6b7280", flexShrink: 0 }}>
                              {option.id.toUpperCase()}
                            </span>
                            <span style={{ fontSize: 13, color: "#1f2937", lineHeight: 1.4 }}>
                              {option.text}
                            </span>
                            {showCorrect && (
                              <span style={{ fontSize: 11, fontWeight: 700, color: "#166534", background: "#dcfce7", borderRadius: 999, padding: "2px 8px", flexShrink: 0 }}>
                                Correcta
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: 12, fontWeight: 800, color: showCorrect ? "#166534" : "#374151", flexShrink: 0 }}>
                            {count} · {percentage}%
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
