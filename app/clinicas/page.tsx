import Link from "next/link";
import ScrollAnimations from "@/components/ScrollAnimations";

export const metadata = {
  title:
    "Clínicas Veterinarias Animales Exóticos Santiago | Exoticare, República, Italia",
  description:
    "Clínicas veterinarias especializadas en animales exóticos en Santiago: Exoticare Maipú, Centro Veterinario República, Centro Veterinario Italia, UNAB Colina. Cirugía y odontología especializada.",
  keywords:
    "exoticare maipu, centro veterinario república, veterinaria italia santiago, veterinaria animales exóticos santiago, clínica conejos santiago, veterinaria hurones santiago",
  openGraph: {
    type: "website",
    url: "https://vetexoticapp.cl/clinicas",
    title: "Clínicas Veterinarias Animales Exóticos Santiago",
    description:
      "Centros veterinarios de excelencia donde atiende la Dra. Siboney Pérez en Santiago de Chile.",
    images: [
      {
        url: "https://vetexoticapp.cl/images/dra-siboney-real.jpg",
        alt: "Clínicas Veterinarias Exóticos",
      },
    ],
  },
};

export default function ClinicasPage() {
  return (
    <>
      <ScrollAnimations />

      {/* Hero Section */}
      <section className="cv-header">
        <div className="container">
          <div className="cv-intro">
            <div className="cv-basic-info">
              <h1>Centros Veterinarios de Excelencia</h1>
              <h2>Atención Profesional con los Más Altos Estándares</h2>
              <p>
                La Dra. Siboney Pérez atiende en prestigiosos centros veterinarios
                equipados con tecnología de última generación y personal altamente
                calificado, garantizando el mejor cuidado para su mascota exótica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clínicas Section */}
      <section className="cv-content">
        <div className="container">
          <div
            className="section-header"
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <h2>¿Dónde Puedes Atenderte?</h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#666",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              Si deseas atenderte con la Dra. Siboney Pérez, puedes solicitar una
              derivación a cualquiera de estos centros veterinarios de excelencia.
              Todos cuentan con equipamiento quirúrgico de última generación y
              personal especializado.
            </p>
          </div>

          <div className="courses-grid" style={{ marginTop: "3rem" }}>
            {/* Exoticare Maipú */}
            <div className="course-card featured">
              <div className="course-badge">Especializado</div>
              <div className="course-content">
                <h3>
                  <i className="fas fa-hospital"></i> Exoticare Maipú
                </h3>
                <p className="course-description">
                  Centro veterinario especializado en animales exóticos con
                  equipamiento de última generación para cirugías complejas y
                  diagnóstico avanzado.
                </p>

                <div className="course-highlights">
                  <div className="highlight">
                    <i className="fas fa-syringe"></i>
                    <span>Cirugía Especializada</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-x-ray"></i>
                    <span>Diagnóstico por Imágenes</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-microscope"></i>
                    <span>Laboratorio Clínico</span>
                  </div>
                </div>

                <div className="course-details" style={{ marginTop: "1.5rem" }}>
                  <p>
                    <i
                      className="fas fa-map-marker-alt"
                      style={{ color: "#e67e22" }}
                    ></i>
                    <strong>Ubicación:</strong> Maipú, Santiago
                  </p>
                  <p>
                    <i className="fas fa-star" style={{ color: "#e67e22" }}></i>
                    <strong>Especialidad:</strong> Animales Exóticos
                  </p>
                </div>

                <div className="course-actions" style={{ marginTop: "1.5rem" }}>
                  <Link href="/#contacto" className="btn btn-primary">
                    Solicitar Derivación
                  </Link>
                </div>
              </div>
            </div>

            {/* Centro Veterinario República */}
            <div className="course-card">
              <div className="course-content">
                <h3>
                  <i className="fas fa-hospital"></i> Centro Veterinario República
                </h3>
                <p className="course-description">
                  Clínica veterinaria de excelencia con sala quirúrgica equipada
                  con tecnología de punta y equipo médico altamente capacitado.
                </p>

                <div className="course-highlights">
                  <div className="highlight">
                    <i className="fas fa-heartbeat"></i>
                    <span>Monitoreo Anestésico</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-procedures"></i>
                    <span>UCI Veterinaria</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-user-md"></i>
                    <span>Personal Especializado</span>
                  </div>
                </div>

                <div className="course-details" style={{ marginTop: "1.5rem" }}>
                  <p>
                    <i
                      className="fas fa-map-marker-alt"
                      style={{ color: "#e67e22" }}
                    ></i>
                    <strong>Ubicación:</strong> Santiago Centro
                  </p>
                  <p>
                    <i className="fas fa-award" style={{ color: "#e67e22" }}></i>
                    <strong>Servicios:</strong> Cirugía y Medicina Interna
                  </p>
                </div>

                <div className="course-actions" style={{ marginTop: "1.5rem" }}>
                  <Link href="/#contacto" className="btn btn-primary">
                    Solicitar Derivación
                  </Link>
                </div>
              </div>
            </div>

            {/* Centro Veterinario Italia */}
            <div className="course-card">
              <div className="course-content">
                <h3>
                  <i className="fas fa-hospital"></i> Centro Veterinario Italia
                </h3>
                <p className="course-description">
                  Centro veterinario integral con instalaciones modernas y
                  equipamiento quirúrgico de última generación para procedimientos
                  complejos.
                </p>

                <div className="course-highlights">
                  <div className="highlight">
                    <i className="fas fa-clinic-medical"></i>
                    <span>Instalaciones Modernas</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-tools"></i>
                    <span>Equipamiento Avanzado</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-ambulance"></i>
                    <span>Atención de Urgencias</span>
                  </div>
                </div>

                <div className="course-details" style={{ marginTop: "1.5rem" }}>
                  <p>
                    <i
                      className="fas fa-map-marker-alt"
                      style={{ color: "#e67e22" }}
                    ></i>
                    <strong>Ubicación:</strong> Santiago
                  </p>
                  <p>
                    <i
                      className="fas fa-check-circle"
                      style={{ color: "#e67e22" }}
                    ></i>
                    <strong>Servicios:</strong> Atención Integral
                  </p>
                </div>

                <div className="course-actions" style={{ marginTop: "1.5rem" }}>
                  <Link href="/#contacto" className="btn btn-primary">
                    Solicitar Derivación
                  </Link>
                </div>
              </div>
            </div>

            {/* UNAB Colina */}
            <div className="course-card">
              <div className="course-content">
                <h3>
                  <i className="fas fa-university"></i> UNAB Colina - Unidad de
                  Animales Pequeños
                </h3>
                <p className="course-description">
                  Hospital clínico veterinario universitario con tecnología de
                  vanguardia y equipo docente de excelencia académica.
                </p>

                <div className="course-highlights">
                  <div className="highlight">
                    <i className="fas fa-graduation-cap"></i>
                    <span>Hospital Universitario</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-microscope"></i>
                    <span>Investigación Clínica</span>
                  </div>
                  <div className="highlight">
                    <i className="fas fa-hospital-alt"></i>
                    <span>Equipamiento de Vanguardia</span>
                  </div>
                </div>

                <div className="course-details" style={{ marginTop: "1.5rem" }}>
                  <p>
                    <i
                      className="fas fa-map-marker-alt"
                      style={{ color: "#e67e22" }}
                    ></i>
                    <strong>Ubicación:</strong> Colina, Santiago
                  </p>
                  <p>
                    <i
                      className="fas fa-university"
                      style={{ color: "#e67e22" }}
                    ></i>
                    <strong>Institución:</strong> Universidad Andrés Bello
                  </p>
                </div>

                <div className="course-actions" style={{ marginTop: "1.5rem" }}>
                  <Link href="/#contacto" className="btn btn-primary">
                    Solicitar Derivación
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Calidad y Estándares */}
          <div
            className="cv-section"
            style={{
              marginTop: "4rem",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
              <i className="fas fa-award"></i> Garantía de Excelencia
            </h3>
            <div style={{ maxWidth: "900px", margin: "0 auto" }}>
              <p
                style={{
                  fontSize: "1.1rem",
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                  textAlign: "center",
                }}
              >
                Todos los centros veterinarios donde la Dra. Siboney Pérez atiende
                cuentan con los <strong>más altos estándares de calidad</strong> en
                cirugía veterinaria:
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
                    className="fas fa-tools"
                    style={{
                      fontSize: "2.5rem",
                      marginBottom: "1rem",
                      display: "block",
                    }}
                  ></i>
                  <h4 style={{ color: "white", marginBottom: "0.5rem" }}>
                    Equipamiento Quirúrgico
                  </h4>
                  <p>Tecnología de última generación para procedimientos complejos</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <i
                    className="fas fa-user-nurse"
                    style={{
                      fontSize: "2.5rem",
                      marginBottom: "1rem",
                      display: "block",
                    }}
                  ></i>
                  <h4 style={{ color: "white", marginBottom: "0.5rem" }}>
                    Personal Capacitado
                  </h4>
                  <p>Equipo médico y técnico altamente especializado</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <i
                    className="fas fa-shield-alt"
                    style={{
                      fontSize: "2.5rem",
                      marginBottom: "1rem",
                      display: "block",
                    }}
                  ></i>
                  <h4 style={{ color: "white", marginBottom: "0.5rem" }}>
                    Protocolos de Seguridad
                  </h4>
                  <p>Estándares internacionales en asepsia y bioseguridad</p>
                </div>
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
              <h2>¿Quieres Atenderte con la Dra. Siboney Pérez?</h2>
              <h3>Solicita tu Derivación Ahora</h3>
              <p style={{ maxWidth: "700px", margin: "0 auto 2rem" }}>
                Contacta con nosotros para agendar tu consulta en cualquiera de
                nuestros centros veterinarios de excelencia. Tu mascota exótica
                recibirá la mejor atención profesional.
              </p>
              <div className="promo-buttons" style={{ justifyContent: "center" }}>
                <Link href="/#contacto" className="btn btn-primary">
                  Contactar Ahora
                </Link>
                <a href="tel:+56934497035" className="btn btn-secondary">
                  <i className="fas fa-phone"></i> Llamar Directamente
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
