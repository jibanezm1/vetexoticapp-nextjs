"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { off, onValue, ref } from "firebase/database";
import { db } from "@/lib/firebase";
import { USS_SESSION_ID, USS_SESSION_ROOT, groupCatalog } from "../data";

interface StudentResponse {
  studentName: string;
  submittedAt: number;
  selfEvaluation?: {
    commitment?: number;
  };
}

function UssCompletionContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session") || USS_SESSION_ID;
  const groupId = searchParams.get("group") || "";
  const studentId = searchParams.get("student") || "";
  const [response, setResponse] = useState<StudentResponse | null>(null);

  useEffect(() => {
    if (!groupId || !studentId) return;
    const responseRef = ref(
      db,
      `${USS_SESSION_ROOT}/${sessionId}/responses/${groupId}/${studentId}`,
    );
    onValue(responseRef, (snapshot) => {
      setResponse((snapshot.val() as StudentResponse) || null);
    });
    return () => off(responseRef);
  }, [groupId, sessionId, studentId]);

  const group = useMemo(() => groupCatalog[groupId] || null, [groupId]);

  return (
    <div className="ussDone">
      <div className="ussDone__card">
        <p className="ussDone__eyebrow">Respuesta registrada</p>
        <h1 className="ussDone__title">
          {response?.studentName || "Tu evaluación"} ya fue enviada
        </h1>
        <p className="ussDone__copy">
          {group
            ? `Tus respuestas para el Grupo ${group.number} fueron guardadas correctamente.`
            : "Tus respuestas fueron guardadas correctamente."}
        </p>
        <div className="ussDone__summary">
          <strong>Estado:</strong> Autoevaluación y coevaluación recibidas.
          {response?.selfEvaluation?.commitment ? (
            <span> Compromiso declarado: {response.selfEvaluation.commitment}/4.</span>
          ) : null}
        </div>
        <p className="ussDone__note">
          Puedes cerrar esta pantalla. La profesora Siboney ya puede ver tu envío en la vista de control.
        </p>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .ussDone {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 1.25rem;
          color: #fff8eb;
          background:
            linear-gradient(180deg, rgba(12, 18, 13, 0.3), rgba(12, 18, 13, 0.9)),
            url("/images/expomascostas/fondomobile.png") center / cover no-repeat;
          font-family: Arial, Helvetica, sans-serif;
        }

        .ussDone__card {
          width: min(100%, 680px);
          display: grid;
          gap: 1rem;
          border-radius: 28px;
          padding: 1.5rem;
          background: rgba(12, 15, 13, 0.82);
          border: 1px solid rgba(255, 248, 235, 0.14);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.28);
        }

        .ussDone__eyebrow,
        .ussDone__title,
        .ussDone__copy,
        .ussDone__summary,
        .ussDone__note {
          margin: 0;
        }

        .ussDone__eyebrow {
          font-size: 0.78rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ffca7a;
        }

        .ussDone__title {
          font-size: clamp(2rem, 7vw, 3.2rem);
          line-height: 0.95;
        }

        .ussDone__copy,
        .ussDone__note {
          color: rgba(255, 248, 235, 0.82);
          line-height: 1.55;
        }

        .ussDone__summary {
          padding: 1rem;
          border-radius: 18px;
          background: rgba(255, 248, 235, 0.07);
        }
      `}</style>
    </div>
  );
}

export default function UssJuegoPage() {
  return (
    <Suspense fallback={null}>
      <UssCompletionContent />
    </Suspense>
  );
}
