import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import cursos from "@/data/cursos.json";
import workshops from "@/data/workshops.json";
import docentes from "@/data/docentes.json";
import ScrollAnimations from "@/components/ScrollAnimations";
import TeacherCard from "@/components/TeacherCard";

export const metadata: Metadata = {
  title: "Cursos Veterinaria Animales Exóticos Chile | Cirugía, Odontología y Medicina de Aves",
  description:
    "📚 Cursos de especialización en medicina veterinaria de animales exóticos en Chile. Cirugía de tejidos blandos, odontología especializada y medicina de aves. Formación profesional con la Dra. Siboney Pérez, Dra. Natalia Villalobos, Dra. Macarena Hidalgo, Dra. Amparo Hidalgo y Dra. Camila Arancibia. Grupos reducidos, práctica dirigida y certificación.",
  keywords: [
    "cursos veterinaria exóticos chile",
    "curso cirugía animales exóticos",
    "curso odontología veterinaria",
    "formación veterinaria exóticos",
    "especialización veterinaria chile",
    "curso medicina aves",
    "capacitación veterinaria pequeños mamíferos",
    "workshop veterinaria exóticos",
    "Dra. Natalia Villalobos veterinaria",
    "Dra. Macarena Hidalgo Pedemonte",
    "Dra. Amparo Hidalgo Mortera",
    "Dra. Camila Arancibia anestesista",
    "docentes veterinaria exóticos chile",
    "especialistas animales exóticos chile",
    "expertos veterinaria exóticos",
    "profesores veterinaria chile",
  ],
  openGraph: {
    type: "website",
    url: "https://vetexoticapp.cl/cursos",
    title: "Cursos Veterinaria Animales Exóticos Chile | Especialización Profesional",
    description: "Capacítate con especialistas en medicina veterinaria de animales exóticos. Certificación profesional y práctica dirigida.",
  },
  alternates: {
    canonical: "https://vetexoticapp.cl/cursos",
  },
};

export default function CursosPage() {
  // Generar Schema.org para docentes
  const teachersSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Equipo Docente - Cursos Veterinaria Exóticos Chile",
    "description": "Profesionales especializados en medicina veterinaria de animales exóticos en Chile",
    "itemListElement": docentes.map((docente, index) => ({
      "@type": "Person",
      "position": index + 1,
      "name": docente.nombre,
      "jobTitle": docente.especialidad,
      "description": docente.descripcion,
      "knowsAbout": docente.areas,
      "alumniOf": docente.formacion,
      "email": docente.contacto?.email,
      "telephone": docente.contacto?.telefono,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teachersSchema) }}
      />
      <ScrollAnimations />
      <section className="courses-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Cursos Especializados</h1>
            <h2>Medicina y Cirugía de Animales Exóticos</h2>
            <p>
              Capacítate con una de las especialistas más reconocidas en medicina veterinaria de
              animales exóticos en Chile.
            </p>
            <div className="hero-features">
              <span>
                <i className="fas fa-certificate"></i> Certificación Profesional
              </span>
              <span>
                <i className="fas fa-hands-helping"></i> Práctica Dirigida
              </span>
              <span>
                <i className="fas fa-users"></i> Grupos Reducidos
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-courses">
        <div className="container">
          <div className="section-header">
            <h2>Cursos Destacados</h2>
            <p>Programas de formación diseñados para veterinarios que buscan especializarse</p>
          </div>

          <div className="courses-grid">
            {cursos.map((curso) => (
              <div
                key={curso.id}
                className={`course-card ${curso.destacado ? "featured" : ""}`}
              >
                {curso.destacado && <div className="course-badge">Más Popular</div>}
                <div className="course-image">
                  <Image
                    src={curso.imagen}
                    alt={curso.titulo}
                    width={400}
                    height={300}
                    loading="lazy"
                  />
                </div>
                <div className="course-content">
                  <h3>{curso.titulo}</h3>
                  <p className="course-description">{curso.descripcion}</p>

                  <div className="course-highlights">
                    <div className="highlight">
                      <i className="fas fa-calendar"></i>
                      <span>{curso.duracion}</span>
                    </div>
                    <div className="highlight">
                      <i className="fas fa-clock"></i>
                      <span>{curso.horas}</span>
                    </div>
                    <div className="highlight">
                      <i className="fas fa-users"></i>
                      <span>Máx. {curso.maxAlumnos} alumnos</span>
                    </div>
                  </div>

                  <div className="course-topics">
                    <h4>Temario Principal:</h4>
                    <ul>
                      {curso.temario.map((tema, index) => (
                        <li key={index}>{tema}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="course-price">
                    <span className="price">${curso.precio.toLocaleString("es-CL")}</span>
                    <span className="price-note">CLP - Incluye material</span>
                  </div>

                  <div className="course-actions">
                    <button className="btn btn-primary">Inscribirse</button>
                    <button className="btn btn-secondary">Más Información</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Docentes - SEO Optimizada */}
      <section className="teachers-section" style={{ padding: "5rem 0", backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <div className="section-header" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "2.5rem", color: "#2c5aa0", marginBottom: "1rem" }}>
              <i className="fas fa-chalkboard-teacher"></i> Nuestro Equipo Docente
            </h2>
            <p style={{ fontSize: "1.1rem", color: "#555", maxWidth: "800px", margin: "0 auto" }}>
              Profesionales altamente especializados en medicina veterinaria de animales exóticos,
              comprometidos con la excelencia académica y la formación continua
            </p>
          </div>

          <div className="teachers-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "3rem"
          }}>
            {docentes.map((docente) => (
              <TeacherCard key={docente.id} docente={docente} />
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link
              href="/docentes"
              className="btn btn-primary"
              style={{
                display: "inline-block",
                padding: "1rem 2.5rem",
                backgroundColor: "#2c5aa0",
                color: "#fff",
                borderRadius: "50px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "1.1rem",
                transition: "all 0.3s ease"
              }}
            >
              <i className="fas fa-users"></i> Conoce a Todo el Equipo Docente
            </Link>
          </div>
        </div>
      </section>

      <section className="workshops-section">
        <div className="container">
          <div className="section-header">
            <h2>Próximos Workshops</h2>
            <p>Talleres prácticos de corta duración para actualización profesional</p>
          </div>

          <div className="workshops-timeline">
            {workshops.map((workshop) => (
              <div key={workshop.id} className="workshop-item">
                <div className="workshop-date">
                  <span className="month">{workshop.mes}</span>
                  <span className="day">{workshop.dia}</span>
                </div>
                <div className="workshop-content">
                  <h3>{workshop.titulo}</h3>
                  <p>{workshop.descripcion}</p>
                  <div className="workshop-meta">
                    <span>
                      <i className="fas fa-clock"></i> {workshop.duracion}
                    </span>
                    <span>
                      <i className="fas fa-users"></i> Máx. {workshop.maxParticipantes}{" "}
                      participantes
                    </span>
                    <span>
                      <i className="fas fa-tag"></i> ${workshop.precio.toLocaleString("es-CL")}
                    </span>
                  </div>
                  <button className="btn btn-sm">Reservar Cupo</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>¿Listo para Especializarte?</h2>
            <p>Únete a la nueva generación de veterinarios especialistas en animales exóticos</p>
            <div className="cta-buttons">
              <a href="mailto:vetexotic.app@gmail.com" className="btn btn-primary">
                Solicitar Información
              </a>
              <a href="tel:+56934497035" className="btn btn-secondary">
                Llamar Ahora
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
