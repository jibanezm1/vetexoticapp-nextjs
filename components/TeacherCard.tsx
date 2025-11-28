"use client";

import Image from "next/image";
import Link from "next/link";

interface Docente {
  id: string;
  nombre: string;
  especialidad: string;
  imagen: string;
  descripcion: string;
  areas: string[];
  formacion: string[];
  contacto?: {
    email?: string;
    telefono?: string;
  };
}

export default function TeacherCard({ docente }: { docente: Docente }) {
  return (
    <article
      key={docente.id}
      className="teacher-card"
      itemScope
      itemType="https://schema.org/Person"
      style={{
        backgroundColor: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <div className="teacher-image" style={{ position: "relative", height: "300px", overflow: "hidden" }}>
        <Image
          src={docente.imagen || "https://www.dignipets.co.uk/wp-content/uploads/2025/05/SizedPictures_Placeholder-Female.png"}
          alt={`${docente.nombre} - ${docente.especialidad}`}
          width={400}
          height={300}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          itemProp="image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://www.dignipets.co.uk/wp-content/uploads/2025/05/SizedPictures_Placeholder-Female.png";
          }}
        />
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)",
          padding: "2rem 1.5rem 1rem",
          color: "#fff"
        }}>
          <h3 itemProp="name" style={{ fontSize: "1.4rem", marginBottom: "0.3rem", fontWeight: "600" }}>
            {docente.nombre}
          </h3>
          <p itemProp="jobTitle" style={{ fontSize: "0.95rem", opacity: 0.9, margin: 0 }}>
            {docente.especialidad}
          </p>
        </div>
      </div>

      <div className="teacher-content" style={{ padding: "1.5rem" }}>
        <p itemProp="description" style={{ fontSize: "0.95rem", lineHeight: "1.6", color: "#555", marginBottom: "1.5rem" }}>
          {docente.descripcion}
        </p>

        {docente.areas && docente.areas.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "0.9rem", color: "#2c5aa0", marginBottom: "0.75rem", fontWeight: "600" }}>
              <i className="fas fa-stethoscope"></i> Áreas de Especialización
            </h4>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {docente.areas.map((area, idx) => (
                <span
                  key={idx}
                  itemProp="knowsAbout"
                  style={{
                    backgroundColor: "#e8f4f8",
                    color: "#2c5aa0",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "20px",
                    fontSize: "0.85rem",
                    fontWeight: "500"
                  }}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}

        {docente.formacion && docente.formacion.length > 0 && (
          <div style={{ marginBottom: "1.5rem" }}>
            <h4 style={{ fontSize: "0.9rem", color: "#2c5aa0", marginBottom: "0.75rem", fontWeight: "600" }}>
              <i className="fas fa-graduation-cap"></i> Formación Académica
            </h4>
            <ul style={{ margin: 0, paddingLeft: "1.2rem", fontSize: "0.9rem", color: "#666" }}>
              {docente.formacion.slice(0, 3).map((formacion, idx) => (
                <li key={idx} itemProp="alumniOf" style={{ marginBottom: "0.5rem", lineHeight: "1.5" }}>
                  {formacion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {docente.contacto && (docente.contacto.email || docente.contacto.telefono) && (
          <div style={{
            borderTop: "1px solid #eee",
            paddingTop: "1rem",
            marginTop: "1rem",
            fontSize: "0.9rem"
          }}>
            {docente.contacto.email && (
              <p style={{ margin: "0.3rem 0" }}>
                <i className="fas fa-envelope" style={{ color: "#2c5aa0", marginRight: "0.5rem" }}></i>
                <span itemProp="email">{docente.contacto.email}</span>
              </p>
            )}
            {docente.contacto.telefono && (
              <p style={{ margin: "0.3rem 0" }}>
                <i className="fas fa-phone" style={{ color: "#2c5aa0", marginRight: "0.5rem" }}></i>
                <a href={`tel:${docente.contacto.telefono}`} itemProp="telephone" style={{ color: "#555", textDecoration: "none" }}>
                  {docente.contacto.telefono}
                </a>
              </p>
            )}
          </div>
        )}

        <Link
          href="/docentes"
          style={{
            display: "inline-block",
            marginTop: "1rem",
            color: "#2c5aa0",
            textDecoration: "none",
            fontWeight: "600",
            fontSize: "0.95rem",
            transition: "color 0.3s ease"
          }}
        >
          Ver perfil completo <i className="fas fa-arrow-right"></i>
        </Link>
      </div>
    </article>
  );
}
