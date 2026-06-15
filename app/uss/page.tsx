"use client";

import { useEffect, useMemo, useState } from "react";
import { off, onValue, ref } from "firebase/database";
import { db } from "@/lib/firebase";
import { USS_SESSION_ID, USS_SESSION_ROOT, USS_TITLE, groupCatalog, getGroupImage } from "./data";

interface UssSessionSnapshot {
  activeGroupId?: string | null;
  activeRoundId?: string | null;
  state?: "idle" | "collecting";
}

export default function UssPage() {
  const [session, setSession] = useState<UssSessionSnapshot>({});

  useEffect(() => {
    const sessionRef = ref(db, `${USS_SESSION_ROOT}/${USS_SESSION_ID}`);
    onValue(sessionRef, (snapshot) => {
      setSession((snapshot.val() as UssSessionSnapshot) || {});
    });
    return () => off(sessionRef);
  }, []);

  const activeGroup = useMemo(() => {
    if (!session.activeGroupId) return null;
    return groupCatalog[session.activeGroupId] || null;
  }, [session.activeGroupId]);

  const backgroundImage = getGroupImage(activeGroup?.id)
    ? `/images/expomascostas/${getGroupImage(activeGroup?.id)}`
    : "/images/expomascostas/fondo.png";

  return (
    <div className="ussLanding" style={{ ["--uss-bg" as string]: `url(${backgroundImage})` }}>
      <div className="ussLanding__overlay" />
      <section className="ussLanding__card">
        <p className="ussLanding__eyebrow">Evaluación docente</p>
        <h1 className="ussLanding__title">{USS_TITLE}</h1>
        <p className="ussLanding__copy">
          La profesora Siboney activará el QR específico de cada grupo desde la vista de control.
          Escanea solo el QR que corresponda a tu equipo para responder autoevaluación y coevaluación.
        </p>

        {activeGroup ? (
          <div className="ussLanding__active">
            <p className="ussLanding__activeLabel">Grupo activo</p>
            <h2 className="ussLanding__groupTitle">
              Grupo {activeGroup.number}
            </h2>
            <p className="ussLanding__groupTopic">{activeGroup.title}</p>
            <p className="ussLanding__groupFocus">{activeGroup.focus}</p>
          </div>
        ) : (
          <div className="ussLanding__empty">
            No hay un grupo activo por ahora. Espera a que la profesora habilite el acceso.
          </div>
        )}
      </section>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; }

        .ussLanding {
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: 1.5rem;
          color: #fff8eb;
          background:
            linear-gradient(180deg, rgba(8, 12, 8, 0.62), rgba(8, 12, 8, 0.88)),
            var(--uss-bg) center / cover no-repeat;
          font-family: Arial, Helvetica, sans-serif;
          position: relative;
        }

        .ussLanding__overlay {
          position: absolute;
          inset: 0;
          backdrop-filter: blur(6px);
        }

        .ussLanding__card {
          position: relative;
          z-index: 1;
          width: min(100%, 760px);
          display: grid;
          gap: 1rem;
          border-radius: 30px;
          padding: 1.6rem;
          background: rgba(20, 16, 12, 0.78);
          border: 1px solid rgba(255, 248, 235, 0.12);
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
        }

        .ussLanding__eyebrow {
          margin: 0;
          font-size: 0.78rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #ffca7a;
        }

        .ussLanding__title,
        .ussLanding__groupTitle {
          margin: 0;
        }

        .ussLanding__title {
          font-size: clamp(2rem, 5vw, 3.4rem);
          line-height: 0.95;
        }

        .ussLanding__copy,
        .ussLanding__groupTopic,
        .ussLanding__groupFocus,
        .ussLanding__empty {
          margin: 0;
          line-height: 1.55;
          color: rgba(255, 248, 235, 0.84);
        }

        .ussLanding__active,
        .ussLanding__empty {
          border-radius: 24px;
          padding: 1.15rem;
          background: rgba(255, 248, 235, 0.06);
          border: 1px solid rgba(255, 248, 235, 0.08);
        }

        .ussLanding__active {
          display: grid;
          gap: 0.55rem;
        }

        .ussLanding__activeLabel {
          margin: 0;
          font-size: 0.74rem;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          color: #ffca7a;
        }

        @media (max-width: 700px) {
          .ussLanding__card {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
