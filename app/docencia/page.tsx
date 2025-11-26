import Image from "next/image";
import Link from "next/link";
import ScrollAnimations from "@/components/ScrollAnimations";

export const metadata = {
  title: "Docencia Veterinaria Exóticos UNAB UBO | Profesora Dra. Siboney Pérez",
  description:
    "Docencia universitaria en medicina veterinaria de animales exóticos. Profesora en UNAB Viña del Mar, Concepción, Colina y Universidad Bernardo O'Higgins. Formación de especialistas.",
  keywords:
    "docencia veterinaria exóticos chile, profesor veterinaria UNAB, profesor veterinaria UBO, enseñanza cirugía exóticos, formación veterinaria animales exóticos",
  openGraph: {
    type: "website",
    url: "https://vetexoticapp.cl/docencia",
    title: "Docencia Veterinaria Exóticos | UNAB y UBO",
    description:
      "Formación de nuevos especialistas en medicina veterinaria de animales exóticos en Chile.",
    images: [
      {
        url: "https://vetexoticapp.cl/images/conejo-docencia.png",
        alt: "Docencia Veterinaria Exóticos",
      },
    ],
  },
};

export default function DocenciaPage() {
  return (
    <>
      <ScrollAnimations />

      {/* Hero Section */}
      <section
        className="cv-header with-image"
        style={{
          background: "linear-gradient(135deg, #2c5aa0 0%, #667eea 100%)",
          padding: "6rem 0",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "4rem",
              alignItems: "center",
            }}
          >
            <div className="cv-basic-info">
              <h1
                style={{
                  color: "white",
                  fontSize: "3.5rem",
                  marginBottom: "1.5rem",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                Docencia
                <br />
                Universitaria
              </h1>
              <h2
                style={{
                  color: "rgba(255, 255, 255, 0.95)",
                  fontSize: "1.3rem",
                  marginBottom: "2rem",
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
              >
                Formando a
                <br />
                los Nuevos
                <br />
                Especialistas
                <br />
                en Medicina
                <br />
                Veterinaria
              </h2>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  maxWidth: "500px",
                }}
              >
                La Dra. Siboney Pérez comparte su experiencia y conocimientos en
                prestigiosas universidades de Chile, formando a la próxima
                generación de veterinarios especializados en animales exóticos.
              </p>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                src="/images/bunny.png"
                alt="Conejo"
                width={450}
                height={450}
                style={{
                  maxWidth: "450px",
                  width: "100%",
                  height: "auto",
                  filter: "drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3))",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Universidades Section */}
      <section className="cv-content">
        <div className="container">
          <div
            className="section-header"
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <h2>Instituciones Académicas</h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#666",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              Docente activa en reconocidas universidades chilenas, impartiendo
              cátedras y talleres prácticos en medicina y cirugía de animales
              exóticos.
            </p>
          </div>

          <div className="courses-grid" style={{ marginTop: "3rem" }}>
            {/* UNAB Viña del Mar */}
            <div className="course-card featured">
              <div className="course-badge">Campus Principal</div>
              <div className="course-content">
                <h3>
                  <i className="fas fa-university"></i> Universidad Andrés Bello -
                  Viña del Mar
                </h3>
                <p className="course-description">
                  Docente de medicina y cirugía de animales exóticos en la
                  Facultad de Ciencias de la Vida. Formación práctica con casos
                  clínicos reales.
                </p>

                <div className="course-highlights">
                  <div className="highlight">
                    <i className="fas fa-chalkboard-teacher"></i>
                    <span>Medicina Exótica</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-microscope"></i>
                    <span>Práctica Clínica</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-graduation-cap"></i>
                    <span>Pregrado y Postgrado</span>
                  </div>
                </div>

                <div className="course-details" style={{ marginTop: "1.5rem" }}>
                  <p>
                    <i className="fas fa-map-marker-alt" style={{ color: "#e67e22" }}></i>
                    {" "}<strong>Ubicación:</strong> Viña del Mar, Región de Valparaíso
                  </p>
                  <p>
                    <i className="fas fa-book" style={{ color: "#e67e22" }}></i>
                    {" "}
                    <strong>Cátedras:</strong> Medicina y Cirugía de Exóticos
                  </p>
                </div>
              </div>
            </div>

            {/* UNAB Concepción */}
            <div className="course-card">
              <div className="course-content">
                <h3>
                  <i className="fas fa-university"></i> Universidad Andrés Bello -
                  Concepción
                </h3>
                <p className="course-description">
                  Talleres especializados y formación clínica en el manejo y
                  tratamiento de animales no convencionales.
                </p>

                <div className="course-highlights">
                  <div className="highlight">
                    <i className="fas fa-hands-helping"></i>
                    <span>Talleres Prácticos</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-stethoscope"></i>
                    <span>Casos Clínicos</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-certificate"></i>
                    <span>Certificaciones</span>
                  </div>
                </div>

                <div className="course-details" style={{ marginTop: "1.5rem" }}>
                  <p>
                    <i className="fas fa-map-marker-alt" style={{ color: "#e67e22" }}></i>
                    {" "}<strong>Ubicación:</strong> Concepción, Región del Biobío
                  </p>
                  <p>
                    <i className="fas fa-clipboard-list" style={{ color: "#e67e22" }}></i>
                    {" "}
                    <strong>Modalidad:</strong> Talleres y Seminarios
                  </p>
                </div>
              </div>
            </div>

            {/* UNAB Colina */}
            <div className="course-card">
              <div className="course-content">
                <h3>
                  <i className="fas fa-university"></i> Universidad Andrés Bello -
                  Colina
                </h3>
                <p className="course-description">
                  Docencia en el Hospital Clínico Veterinario, con énfasis en
                  cirugía de tejidos blandos y medicina de pequeños mamíferos
                  exóticos.
                </p>

                <div className="course-highlights">
                  <div className="highlight">
                    <i className="fas fa-hospital"></i>
                    <span>Hospital Clínico</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-syringe"></i>
                    <span>Cirugía Especializada</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-user-md"></i>
                    <span>Supervisión Clínica</span>
                  </div>
                </div>

                <div className="course-details" style={{ marginTop: "1.5rem" }}>
                  <p>
                    <i className="fas fa-map-marker-alt" style={{ color: "#e67e22" }}></i>
                    {" "}<strong>Ubicación:</strong> Colina, Región Metropolitana
                  </p>
                  <p>
                    <i className="fas fa-hospital-alt" style={{ color: "#e67e22" }}></i>
                    {" "}
                    <strong>Área:</strong> Hospital Veterinario UNAB
                  </p>
                </div>
              </div>
            </div>

            {/* Universidad Bernardo O'Higgins */}
            <div className="course-card">
              <div className="course-content">
                <h3>
                  <i className="fas fa-university"></i> Universidad Bernardo O&apos;Higgins
                </h3>
                <p className="course-description">
                  Docente colaboradora en programas de especialización
                  veterinaria, compartiendo conocimientos en medicina de animales
                  exóticos.
                </p>

                <div className="course-highlights">
                  <div className="highlight">
                    <i className="fas fa-brain"></i>
                    <span>Especialización</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-comments"></i>
                    <span>Seminarios</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-award"></i>
                    <span>Capacitación Continua</span>
                  </div>
                </div>

                <div className="course-details" style={{ marginTop: "1.5rem" }}>
                  <p>
                    <i className="fas fa-map-marker-alt" style={{ color: "#e67e22" }}></i>
                    {" "}<strong>Ubicación:</strong> Santiago
                  </p>
                  <p>
                    <i className="fas fa-laptop-medical" style={{ color: "#e67e22" }}></i>
                    {" "}
                    <strong>Programas:</strong> Especialización Veterinaria
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Compromiso Académico */}
          <div
            className="cv-section"
            style={{
              marginTop: "4rem",
              background: "linear-gradient(135deg, #2c5aa0 0%, #667eea 100%)",
              padding: "3rem",
              borderRadius: "20px",
              color: "white",
            }}
          >
            <h3
              style={{
                color: "white",
                fontSize: "2rem",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              <i className="fas fa-graduation-cap"></i> Compromiso con la Educación
            </h3>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  marginBottom: "1.5rem",
                  textAlign: "center",
                }}
              >
                La Dra. Siboney Pérez está comprometida con la formación de
                excelencia en medicina veterinaria de animales exóticos:
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "2rem",
                  marginTop: "2rem",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <i
                    className="fas fa-book-open"
                    style={{
                      fontSize: "2.5rem",
                      marginBottom: "1rem",
                      display: "block",
                    }}
                  ></i>
                  <h4 style={{ color: "white", marginBottom: "0.5rem" }}>
                    Teoría Actualizada
                  </h4>
                  <p>Contenidos basados en evidencia científica actual</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <i
                    className="fas fa-hands-helping"
                    style={{
                      fontSize: "2.5rem",
                      marginBottom: "1rem",
                      display: "block",
                    }}
                  ></i>
                  <h4 style={{ color: "white", marginBottom: "0.5rem" }}>
                    Práctica Real
                  </h4>
                  <p>Casos clínicos reales y experiencia práctica</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <i
                    className="fas fa-certificate"
                    style={{
                      fontSize: "2.5rem",
                      marginBottom: "1rem",
                      display: "block",
                    }}
                  ></i>
                  <h4 style={{ color: "white", marginBottom: "0.5rem" }}>
                    Certificación Internacional
                  </h4>
                  <p>Formación con estándares internacionales</p>
                </div>
              </div>
            </div>
          </div>

          {/* Áreas de Docencia */}
          <div className="cv-section" style={{ marginTop: "3rem" }}>
            <h3 style={{ color: "#2c5aa0", marginBottom: "2rem", textAlign: "center" }}>
              <i className="fas fa-clipboard-list"></i> Áreas de Docencia
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "2rem",
              }}
            >
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "2rem",
                  borderRadius: "15px",
                  borderLeft: "4px solid #e67e22",
                }}
              >
                <h4 style={{ color: "#2c5aa0", marginBottom: "1rem" }}>
                  <i className="fas fa-cut"></i> Cirugía de Tejidos Blandos
                </h4>
                <ul style={{ color: "#666", lineHeight: 2 }}>
                  <li>Técnicas quirúrgicas avanzadas</li>
                  <li>Cirugía gastrointestinal</li>
                  <li>Cirugía reproductiva</li>
                  <li>Manejo anestésico en exóticos</li>
                </ul>
              </div>
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "2rem",
                  borderRadius: "15px",
                  borderLeft: "4px solid #e67e22",
                }}
              >
                <h4 style={{ color: "#2c5aa0", marginBottom: "1rem" }}>
                  <i className="fas fa-tooth"></i> Odontología Veterinaria
                </h4>
                <ul style={{ color: "#666", lineHeight: 2 }}>
                  <li>Anatomía dental en roedores</li>
                  <li>Técnicas de limado dental</li>
                  <li>Tratamiento de abscesos</li>
                  <li>Radiología dental</li>
                </ul>
              </div>
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "2rem",
                  borderRadius: "15px",
                  borderLeft: "4px solid #e67e22",
                }}
              >
                <h4 style={{ color: "#2c5aa0", marginBottom: "1rem" }}>
                  <i className="fas fa-stethoscope"></i> Medicina Interna
                </h4>
                <ul style={{ color: "#666", lineHeight: 2 }}>
                  <li>Diagnóstico en exóticos</li>
                  <li>Farmacología especializada</li>
                  <li>Manejo nutricional</li>
                  <li>Medicina preventiva</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="courses-promo">
        <div className="container">
          <div className="promo-content" style={{ gridTemplateColumns: "1fr" }}>
            <div className="promo-text" style={{ textAlign: "center" }}>
              <h2>¿Quieres Especializarte en Medicina Exótica?</h2>
              <h3>Conoce Nuestros Cursos de Formación Continua</h3>
              <p style={{ maxWidth: "700px", margin: "0 auto 2rem" }}>
                Ofrecemos cursos especializados para veterinarios que desean
                profundizar en medicina y cirugía de animales exóticos.
              </p>
              <div className="promo-buttons" style={{ justifyContent: "center" }}>
                <Link href="/cursos" className="btn btn-primary">
                  Ver Cursos Disponibles
                </Link>
                <Link href="/#contacto" className="btn btn-secondary">
                  Más Información
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
