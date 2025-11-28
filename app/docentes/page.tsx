"use client";

import Image from "next/image";
import docentes from "@/data/docentes.json";
import ScrollAnimations from "@/components/ScrollAnimations";

export default function DocentesPage() {
  return (
    <>
      <ScrollAnimations />
      <section className="cv-header">
        <div className="container">
          <div className="cv-intro">
            <div className="cv-basic-info">
              <h1>Nuestro Equipo Docente</h1>
              <h2>Especialistas en Medicina Veterinaria de Animales Exóticos</h2>
              <p>
                <strong>Profesionales altamente capacitadas</strong> dedicadas a la enseñanza y
                formación de nuevos especialistas en <em>medicina de animales exóticos</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cv-content" style={{ padding: "80px 0" }}>
        <div className="container">
          {docentes.map((docente) => (
            <div
              key={docente.id}
              className="teacher-card"
              style={{
                background: "white",
                padding: "40px",
                borderRadius: "15px",
                boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                marginBottom: "40px",
              }}
            >
              <div
                className="teacher-grid-layout"
                style={{
                  display: "grid",
                  gridTemplateColumns: "250px 1fr",
                  gap: "40px",
                  alignItems: "start",
                }}
              >
                <div className="teacher-sidebar" style={{ textAlign: "center" }}>
                  <div
                    className="teacher-photo"
                    style={{
                      width: "250px",
                      height: "250px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      margin: "0 auto 20px",
                      border: "5px solid #2c5aa0",
                    }}
                  >
                    <Image
                      src={docente.imagen || "https://www.dignipets.co.uk/wp-content/uploads/2025/05/SizedPictures_Placeholder-Female.png"}
                      alt={`${docente.nombre} - ${docente.especialidad}`}
                      width={250}
                      height={250}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://www.dignipets.co.uk/wp-content/uploads/2025/05/SizedPictures_Placeholder-Female.png";
                      }}
                    />
                  </div>
                  <h3 style={{ color: "#2c5aa0", marginBottom: "10px" }}>{docente.nombre}</h3>
                  <p style={{ color: "#666", fontSize: "0.95rem", marginBottom: "15px" }}>
                    <strong>{docente.especialidad}</strong>
                  </p>
                  {docente.contacto?.email && (
                    <div style={{ fontSize: "0.9rem", color: "#555" }}>
                      <div>
                        <i className="fas fa-envelope" style={{ color: "#e67e22", marginRight: "8px" }}></i>
                        {docente.contacto.email}
                      </div>
                    </div>
                  )}
                  {docente.contacto?.telefono && (
                    <div style={{ fontSize: "0.9rem", color: "#555", marginTop: "5px" }}>
                      <div>
                        <i className="fas fa-phone" style={{ color: "#e67e22", marginRight: "8px" }}></i>
                        {docente.contacto.telefono}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <h4 style={{ color: "#2c5aa0", marginBottom: "15px", fontSize: "1.3rem" }}>
                    Perfil Profesional
                  </h4>
                  <p style={{ lineHeight: "1.8", marginBottom: "20px" }}>{docente.descripcion}</p>

                  <div
                    style={{
                      background: "#f8f9fa",
                      padding: "20px",
                      borderRadius: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    <h5 style={{ color: "#2c5aa0", marginBottom: "15px" }}>
                      <i className="fas fa-graduation-cap"></i> Formación Académica
                    </h5>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                      {docente.formacion.map((item, index) => (
                        <li
                          key={index}
                          style={{ padding: "8px 0", borderBottom: "1px solid #e0e0e0" }}
                        >
                          <i
                            className="fas fa-certificate"
                            style={{ color: "#e67e22", marginRight: "10px" }}
                          ></i>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div
                    style={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      padding: "20px",
                      borderRadius: "10px",
                      color: "white",
                      marginBottom: "20px",
                    }}
                  >
                    <h5 style={{ marginBottom: "15px" }}>
                      <i className="fas fa-stethoscope"></i> Áreas de Especialización
                    </h5>
                  <div
                    className="areas-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gap: "10px",
                    }}
                  >
                      {docente.areas.map((area, index) => (
                        <div key={index}>
                          <i className="fas fa-check"></i> {area}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 style={{ color: "#2c5aa0", marginBottom: "15px" }}>
                      <i className="fas fa-briefcase"></i> Experiencia Profesional
                    </h5>
                    <p style={{ lineHeight: "1.8" }}>{docente.experiencia}</p>
                  </div>

                  {docente.certificaciones && (
                    <div style={{ marginTop: "20px" }}>
                      <h5 style={{ color: "#2c5aa0", marginBottom: "15px" }}>
                        <i className="fas fa-award"></i> Certificaciones Destacadas
                      </h5>
                      <div
                        className="certifications-grid"
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(2, 1fr)",
                          gap: "10px",
                          fontSize: "0.9rem",
                        }}
                      >
                        {docente.certificaciones.map((cert, index) => (
                          <div
                            key={index}
                            style={{
                              padding: "10px",
                              background: "#f8f9fa",
                              borderRadius: "5px",
                            }}
                          >
                            <i className="fas fa-certificate" style={{ color: "#e67e22" }}></i> {cert}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          background: "linear-gradient(135deg, #2c5aa0 0%, #667eea 100%)",
          padding: "60px 0",
          color: "white",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "white", marginBottom: "20px" }}>¿Interesado en Nuestros Cursos?</h2>
          <p style={{ fontSize: "1.1rem", marginBottom: "30px", color: "rgba(255,255,255,0.95)" }}>
            Aprende de las mejores especialistas en medicina veterinaria de animales exóticos
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="/cursos"
              style={{
                background: "white",
                color: "#2c5aa0",
                padding: "15px 40px",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "600",
                display: "inline-block",
              }}
            >
              Ver Cursos Disponibles
            </a>
            <a
              href="/#contacto"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "2px solid white",
                padding: "15px 40px",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "600",
                display: "inline-block",
              }}
            >
              Contactar
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
