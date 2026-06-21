"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { off, onValue, ref } from "firebase/database";
import { db } from "@/lib/firebase";
import type { Course, CourseSpecies, CourseStudent, StudentResponses } from "@/lib/wildlifeCourse/types";

type SpeciesStatus = "locked" | "enabled" | "partial" | "completed";

function getSpeciesStatus(
  species: CourseSpecies,
  responses: Record<string, unknown> | undefined
): SpeciesStatus {
  if (!species.enabled) return "locked";
  if (!responses) return "enabled";

  const questionCount = Object.keys(species.questions).length;
  const answeredCount = Object.values(responses).filter(
    (r) => r && typeof r === "object" && (r as { answer?: string }).answer?.trim()
  ).length;
  const submittedCount = Object.values(responses).filter(
    (r) => r && typeof r === "object" && (r as { status?: string }).status === "submitted"
  ).length;

  if (submittedCount === questionCount) return "completed";
  if (answeredCount > 0) return "partial";
  return "enabled";
}

const STATUS_CONFIG = {
  locked: { label: "Bloqueada", color: "#9ca3af", bg: "#f3f4f6", border: "#e5e7eb", emoji: "🔒" },
  enabled: { label: "Disponible", color: "#1a6b3a", bg: "#f0fdf4", border: "#86efac", emoji: "✅" },
  partial: { label: "En progreso", color: "#d97706", bg: "#fffbeb", border: "#fcd34d", emoji: "✏️" },
  completed: { label: "Completada", color: "#7c3aed", bg: "#faf5ff", border: "#c4b5fd", emoji: "🎉" },
};

export default function StudentSessionPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;
  const studentSessionId = params.studentSessionId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [student, setStudent] = useState<CourseStudent | null>(null);
  const [responses, setResponses] = useState<StudentResponses>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    // Load student once
    import("firebase/database").then(({ get }) => {
      get(ref(db, `courseStudents/${courseId}/${studentSessionId}`)).then((snap) => {
        if (!mounted) return;
        if (!snap.exists()) {
          setError("Sesión no encontrada. Vuelve a escanear el QR o solicita ayuda a la profesora.");
          setLoading(false);
          return;
        }
        setStudent(snap.val() as CourseStudent);

        // Update lastAccessAt
        import("firebase/database").then(({ update }) => {
          update(ref(db, `courseStudents/${courseId}/${studentSessionId}`), {
            lastAccessAt: Date.now(),
          });
        });

        setLoading(false);
      }).catch(() => {
        if (mounted) {
          setError("Error al cargar la sesión. Por favor, intenta de nuevo.");
          setLoading(false);
        }
      });
    });

    return () => { mounted = false; };
  }, [courseId, studentSessionId]);

  // Real-time listener for course (species enabled state)
  useEffect(() => {
    const courseRef = ref(db, `courses/${courseId}`);
    const unsubscribe = onValue(courseRef, (snap) => {
      if (snap.exists()) setCourse(snap.val() as Course);
    });
    return () => off(courseRef, "value", unsubscribe);
  }, [courseId]);

  // Real-time listener for student responses
  useEffect(() => {
    const responsesRef = ref(db, `courseResponses/${courseId}/${studentSessionId}`);
    const unsubscribe = onValue(responsesRef, (snap) => {
      setResponses(snap.exists() ? snap.val() : {});
    });
    return () => off(responsesRef, "value", unsubscribe);
  }, [courseId, studentSessionId]);

  const sortedSpecies = course
    ? Object.values(course.species).sort((a, b) => a.order - b.order)
    : [];

  const hasAnyEnabled = sortedSpecies.some((s) => s.enabled);

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #0a2e1a 0%, #0d3320 100%)",
    fontFamily: "system-ui, -apple-system, sans-serif",
    padding: "0 0 40px",
  };

  const headerStyle: React.CSSProperties = {
    background: "rgba(0,0,0,0.3)",
    padding: "20px 20px 16px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  };

  const cardStyle: React.CSSProperties = {
    background: "white",
    borderRadius: 16,
    padding: "18px 18px",
    marginBottom: 12,
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    cursor: "default",
  };

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <p style={{ color: "white", fontSize: 18, opacity: 0.8 }}>Cargando sesión...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={pageStyle}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", padding: 24 }}>
          <div style={{ background: "white", borderRadius: 20, padding: 32, maxWidth: 400, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
            <p style={{ color: "#dc2626", fontWeight: 600, lineHeight: 1.5 }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: 1 }}>
          Práctico activo
        </p>
        <h1 style={{ color: "white", fontSize: 18, fontWeight: 800, margin: "0 0 4px" }}>
          {course?.title ?? "Clase práctica de fauna silvestre"}
        </h1>
        <p style={{ color: "#86efac", fontSize: 14, margin: 0, fontWeight: 600 }}>
          👤 {student?.name}
          {student?.group && <span style={{ color: "rgba(255,255,255,0.5)", fontWeight: 400 }}> · {student.group}</span>}
        </p>
      </div>

      <div style={{ padding: "20px 16px 0" }}>
        {/* Waiting state */}
        {!course || (!hasAnyEnabled && sortedSpecies.length > 0) ? (
          <div style={{
            background: "rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: "32px 24px",
            textAlign: "center",
            border: "1px solid rgba(255,255,255,0.1)",
            marginBottom: 20,
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
            <p style={{ color: "white", fontWeight: 700, fontSize: 16, margin: "0 0 6px" }}>
              Espera la indicación de la profesora
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, margin: 0 }}>
              La profesora aún no ha habilitado una especie. Mantente en esta pantalla.
            </p>
          </div>
        ) : null}

        {/* Section title */}
        {sortedSpecies.length > 0 && (
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
            Especies del práctico
          </p>
        )}

        {/* Species cards */}
        {sortedSpecies.map((species) => {
          const status = getSpeciesStatus(species, responses[species.id]);
          const config = STATUS_CONFIG[status];
          const isClickable = status !== "locked";

          return (
            <div
              key={species.id}
              style={{
                ...cardStyle,
                border: `2px solid ${config.border}`,
                background: config.bg,
                cursor: isClickable ? "pointer" : "default",
                opacity: status === "locked" ? 0.65 : 1,
                transform: "translateY(0)",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onClick={() => {
                if (isClickable) {
                  router.push(`/curso/${courseId}/sesion/${studentSessionId}/especie/${species.id}`);
                }
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontSize: 36, flexShrink: 0 }}>{species.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <h3 style={{ fontSize: 17, fontWeight: 800, color: "#1a1a1a", margin: 0 }}>
                      {species.name}
                    </h3>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: config.color,
                      background: `${config.color}18`,
                      borderRadius: 6,
                      padding: "2px 8px",
                    }}>
                      {config.emoji} {config.label}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: "#5a5a5a", margin: "4px 0 0", lineHeight: 1.4 }}>
                    {Object.keys(species.questions).length} preguntas
                    {responses[species.id] && (() => {
                      const answered = Object.values(responses[species.id]).filter(
                        (r) => r?.answer?.trim()
                      ).length;
                      return answered > 0 ? ` · ${answered} respondidas` : "";
                    })()}
                  </p>
                </div>
                {isClickable && (
                  <div style={{ color: config.color, fontSize: 20, flexShrink: 0 }}>›</div>
                )}
              </div>
            </div>
          );
        })}

        {sortedSpecies.length === 0 && (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ color: "rgba(255,255,255,0.5)" }}>Cargando especies...</p>
          </div>
        )}
      </div>
    </div>
  );
}
