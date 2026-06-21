"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { get, ref, set } from "firebase/database";
import { db } from "@/lib/firebase";
import type { Course, CourseStudent } from "@/lib/wildlifeCourse/types";

function generateSessionId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return "s" + crypto.randomUUID().replace(/-/g, "").slice(0, 16);
  }
  return "s" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

type FormState = "idle" | "loading" | "success" | "error";

export default function InscripcionPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.courseId as string;

  const [course, setCourse] = useState<Course | null>(null);
  const [courseLoading, setCourseLoading] = useState(true);
  const [courseError, setCourseError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [group, setGroup] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const [formState, setFormState] = useState<FormState>("idle");
  const [sessionUrl, setSessionUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    get(ref(db, `courses/${courseId}`)).then((snap) => {
      if (snap.exists()) {
        setCourse(snap.val() as Course);
      } else {
        setCourseError("Curso no encontrado. Verifica el enlace o solicita ayuda a la profesora.");
      }
      setCourseLoading(false);
    }).catch(() => {
      setCourseError("Error al cargar el curso. Por favor, intenta de nuevo.");
      setCourseLoading(false);
    });
  }, [courseId]);

  function validateEmail(value: string): boolean {
    if (!value) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNameError("");
    setEmailError("");

    if (!name.trim()) {
      setNameError("El nombre es obligatorio.");
      return;
    }
    if (email && !validateEmail(email)) {
      setEmailError("Ingresa un email válido o déjalo vacío.");
      return;
    }

    setFormState("loading");

    try {
      const sessionId = generateSessionId();
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const url = `${origin}/curso/${courseId}/sesion/${sessionId}`;

      const student: CourseStudent = {
        id: sessionId,
        name: name.trim(),
        email: email.trim(),
        group: group.trim(),
        createdAt: Date.now(),
        lastAccessAt: Date.now(),
        sessionUrl: url,
      };

      await set(ref(db, `courseStudents/${courseId}/${sessionId}`), student);

      if (typeof localStorage !== "undefined") {
        localStorage.setItem(`wildlife_session_${courseId}`, sessionId);
      }

      setSessionUrl(url);
      setFormState("success");
    } catch {
      setFormState("error");
    }
  }

  function handleCopy() {
    if (!sessionUrl) return;
    navigator.clipboard.writeText(sessionUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleEnter() {
    if (sessionUrl) router.push(sessionUrl);
  }

  // Styles
  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a2e1a 0%, #1a4d2e 50%, #0d3320 100%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px 16px",
    fontFamily: "system-ui, -apple-system, sans-serif",
  };

  const cardStyle: React.CSSProperties = {
    background: "white",
    borderRadius: 20,
    padding: "32px 28px",
    maxWidth: 440,
    width: "100%",
    boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 14,
    fontWeight: 600,
    color: "#1a3a2a",
    marginBottom: 6,
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 10,
    border: "2px solid #d1e8d9",
    fontSize: 16,
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const inputErrorStyle: React.CSSProperties = {
    ...inputStyle,
    border: "2px solid #ef4444",
  };

  const btnPrimaryStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #1a6b3a, #2d9a5f)",
    color: "white",
    border: "none",
    borderRadius: 12,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    marginTop: 8,
  };

  const btnSecondaryStyle: React.CSSProperties = {
    width: "100%",
    padding: "13px",
    background: "white",
    color: "#1a6b3a",
    border: "2px solid #1a6b3a",
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
    marginTop: 8,
  };

  if (courseLoading) {
    return (
      <div style={pageStyle}>
        <div style={{ color: "white", fontSize: 18, opacity: 0.8 }}>Cargando curso...</div>
      </div>
    );
  }

  if (courseError) {
    return (
      <div style={pageStyle}>
        <div style={{ ...cardStyle, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <p style={{ color: "#dc2626", fontWeight: 600 }}>{courseError}</p>
        </div>
      </div>
    );
  }

  if (formState === "success") {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>✅</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a3a2a", margin: 0 }}>
              Inscripción completada
            </h2>
            <p style={{ color: "#4a7a5a", marginTop: 8, fontSize: 14 }}>
              Guarda esta URL para volver a ingresar a tu práctico desde cualquier dispositivo.
            </p>
          </div>

          <div style={{
            background: "#f0f7f2",
            borderRadius: 10,
            padding: "12px 14px",
            marginBottom: 20,
            wordBreak: "break-all",
            fontSize: 13,
            color: "#1a4a2a",
            border: "1px solid #c8e6d0",
          }}>
            {sessionUrl}
          </div>

          <button style={btnPrimaryStyle} onClick={handleEnter}>
            Entrar al práctico →
          </button>
          <button style={btnSecondaryStyle} onClick={handleCopy}>
            {copied ? "✓ Enlace copiado" : "Copiar mi enlace"}
          </button>
        </div>
      </div>
    );
  }

  if (formState === "error") {
    return (
      <div style={pageStyle}>
        <div style={cardStyle}>
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 48 }}>❌</div>
            <p style={{ color: "#dc2626", fontWeight: 600 }}>
              Hubo un error al inscribirte. Por favor, intenta de nuevo.
            </p>
          </div>
          <button style={btnPrimaryStyle} onClick={() => setFormState("idle")}>
            Intentar de nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 42, marginBottom: 8 }}>🌿</div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1a3a2a", margin: "0 0 6px" }}>
            {course?.title ?? "Clase práctica"}
          </h1>
          <p style={{ fontSize: 13, color: "#5a7a6a", margin: 0, lineHeight: 1.5 }}>
            {course?.description ?? "Práctico interactivo por especies."}
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle} htmlFor="name">
              Nombre completo <span style={{ color: "#dc2626" }}>*</span>
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre completo"
              style={nameError ? inputErrorStyle : inputStyle}
              autoComplete="name"
            />
            {nameError && (
              <p style={{ color: "#dc2626", fontSize: 12, marginTop: 4, marginBottom: 0 }}>
                {nameError}
              </p>
            )}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={labelStyle} htmlFor="email">
              Email <span style={{ color: "#8a9a8a", fontWeight: 400 }}>(opcional)</span>
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              style={emailError ? inputErrorStyle : inputStyle}
              autoComplete="email"
            />
            {emailError && (
              <p style={{ color: "#dc2626", fontSize: 12, marginTop: 4, marginBottom: 0 }}>
                {emailError}
              </p>
            )}
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle} htmlFor="group">
              Sección <span style={{ color: "#8a9a8a", fontWeight: 400 }}>(opcional)</span>
            </label>
            <select
              id="group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              style={{ ...inputStyle, color: group ? "#1a1a1a" : "#9ca3af", cursor: "pointer" }}
            >
              <option value="">Selecciona tu sección</option>
              <option value="Sección 1">Sección 1</option>
              <option value="Sección 2">Sección 2</option>
            </select>
          </div>

          <button
            type="submit"
            style={{
              ...btnPrimaryStyle,
              opacity: formState === "loading" ? 0.7 : 1,
              cursor: formState === "loading" ? "wait" : "pointer",
            }}
            disabled={formState === "loading"}
          >
            {formState === "loading" ? "Inscribiendo..." : "Inscribirme"}
          </button>
        </form>
      </div>
    </div>
  );
}
