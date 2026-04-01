import Image from "next/image";
import Link from "next/link";
import ScrollAnimations from "@/components/ScrollAnimations";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veterinaria Animales Exóticos Santiago Chile | Dra. Siboney Pérez - Cirugía y Odontología",
  description: "🐰 Veterinaria especialista en animales exóticos en Santiago. Cirugía de tejidos blandos, odontología especializada y medicina interna para conejos, hurones, chinchillas, cobayos y pequeños mamíferos. Atención en Exoticare Maipú. Urgencias 24/7.",
  keywords: [
    "veterinaria animales exóticos santiago",
    "cirugía conejos chile",
    "odontología conejos santiago",
    "veterinario hurones maipú",
    "especialista animales exóticos chile",
    "cirugía tejidos blandos exóticos",
    "veterinaria pequeños mamíferos",
    "exoticare maipú",
    "urgencias veterinarias exóticos",
  ],
  openGraph: {
    title: "Veterinaria Animales Exóticos Santiago | Dra. Siboney Pérez",
    description: "Especialista en cirugía y odontología de animales exóticos. Atención para conejos, hurones, chinchillas y más.",
    url: "https://vetexoticapp.cl",
    type: "website",
  },
  alternates: {
    canonical: "https://vetexoticapp.cl",
  },
};

export default function HomePage() {
  return (
    <>
      <ScrollAnimations />
      {/* Hero Section */}
      <section id="inicio" className="hero">
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1>Veterinaria Especialista en Animales Exóticos en Chile</h1>
              <h2>
                Dra. Siboney Pérez - Cirugía de Tejidos Blandos y Procedimientos
                Odontológicos en Pequeños Mamíferos
              </h2>
              <p>
                <strong>
                  Atención veterinaria especializada en pequeños mamíferos
                  exóticos en Santiago
                </strong>
                . <em>Cirugías avanzadas</em>,{" "}
                <em>odontología especializada</em> y <em>medicina interna</em>{" "}
                para <strong>conejos</strong>, <strong>cobayos</strong>,{" "}
                <strong>chinchillas</strong>, <strong>miomorfos</strong> (ratas,
                hámster sirio, hámster ruso, ratones y jerbos) y{" "}
                <strong>hurones</strong>. Más de{" "}
                <strong>7 años de experiencia</strong> en centros de excelencia.
              </p>
              <div className="hero-buttons">
                <a href="#servicios" className="btn btn-primary">
                  Nuestros Servicios
                </a>
                <Link href="/casos-clinicos" className="btn btn-secondary">
                  Ver Casos Clínicos
                </Link>
                <a href="#contacto" className="btn btn-secondary">
                  Agendar Cita
                </a>
              </div>
            </div>
            <div className="hero-image">
              <Image
                src="/images/siboneyperfil.png"
                alt="Dra. Siboney Pérez cirujano veterinario especialista en animales exóticos, conejos, hurones y chinchillas en Chile"
                id="hero-img"
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Servicios Section */}
      <section id="servicios" className="services">
        <div className="container">
          <div className="section-header">
            <h2>Servicios Veterinarios Especializados en Pequeños Mamíferos</h2>
            <p>
              Atención médica y quirúrgica de excelencia para conejos, cobayos,
              chinchillas, miomorfos y hurones
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card overflow-hidden break-words">
              <div className="service-icon">
                <i className="fas fa-cut"></i>
              </div>
              <h3>Cirugía de Tejidos Blandos para Animales Exóticos</h3>
              <p>
                Procedimientos quirúrgicos especializados en pequeños mamíferos
                con protocolos anestésicos seguros.
              </p>
              <ul className="service-details w-full break-words overflow-hidden">
                <li className="break-words max-w-full hyphens-auto pr-2">
                  Cirugías Electivas: Esterilizaciones (OVH) y castraciones
                  preventivas
                </li>
                <li className="break-words max-w-full hyphens-auto pr-2">Cirugías Programadas: Resolución de patologías diversas</li>
                <li className="break-words max-w-full hyphens-auto pr-2">
                  Urgencias Quirúrgicas 24/7: Disponibilidad para emergencias
                  vitales
                </li>
              </ul>
            </div>

            <div className="service-card overflow-hidden break-words">
              <div className="service-icon">
                <i className="fas fa-tooth"></i>
              </div>
              <h3>Odontología Veterinaria para Animales Exóticos</h3>
              <p>
                Manejo integral de la salud oral, fundamental en estas especies.
              </p>
              <ul className="service-details w-full break-words overflow-hidden">
                <li className="break-words max-w-full hyphens-auto pr-2">Procedimientos Dentales: Limados y destartrajes</li>
                <li className="break-words max-w-full hyphens-auto pr-2">Cirugía Oral: Exodoncias (extracciones) complejas</li>
                <li className="break-words max-w-full hyphens-auto pr-2">
                  Manejo de Abscesos: Resolución quirúrgica de abscesos de
                  origen dentario
                </li>
                <li className="break-words max-w-full hyphens-auto pr-2">
                  Cirugía Maxilofacial: Rinotomías, ablación del conducto
                  auditivo externo y sus variantes
                </li>
              </ul>
            </div>

            <div className="service-card overflow-hidden break-words">
              <div className="service-icon">
                <i className="fas fa-stethoscope"></i>
              </div>
              <h3>Medicina Interna y Preventiva</h3>
              <p>
                <strong>
                  Diagnóstico y tratamiento de enfermedades en pequeños
                  mamíferos exóticos
                </strong>
                . Consultas especializadas y seguimiento médico integral.
              </p>
              <p style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>
                <em>Atención en Exotic Care y UBO</em>
              </p>
              <ul className="service-details w-full break-words overflow-hidden">
                <li className="break-words max-w-full hyphens-auto pr-2">
                  Consultas de Especialidad: Diagnóstico y plan de tratamiento
                </li>
                <li className="break-words max-w-full hyphens-auto pr-2">
                  Toma de Muestras: Exámenes de sangre, citologías y cultivos
                </li>
                <li className="break-words max-w-full hyphens-auto pr-2">
                  Seguimiento Clínico: Monitoreo integral de la evolución del
                  paciente
                </li>
              </ul>
            </div>

            <div className="service-card overflow-hidden break-words">
              <div className="service-icon">
                <i className="fas fa-home"></i>
              </div>
              <h3>Servicio a Domicilio</h3>
              <p>
                <strong>
                  Atención personalizada en la comodidad de tu hogar
                </strong>
                , realizada directamente por la Dra. Sibo o personal médico
                calificado de su confianza.
              </p>
              <ul className="service-details w-full break-words overflow-hidden">
                <li className="break-words max-w-full hyphens-auto pr-2">Consultas domiciliarias especializadas</li>
                <li className="break-words max-w-full hyphens-auto pr-2">Medicina preventiva y seguimiento</li>
                <li className="break-words max-w-full hyphens-auto pr-2">Evaluación clínica personalizada</li>
                <li className="break-words max-w-full hyphens-auto pr-2">Reducción del estrés para tu mascota</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="about overflow-hidden">
        <div className="container">
          <div className="about-content overflow-hidden">
            <div className="about-text overflow-hidden break-words w-full max-w-full">
              <h2>Sobre la Dra. Sibo - Especialista en Pequeños Mamíferos</h2>
              <p className="about-intro break-words overflow-wrap-break-word">
                <strong>
                  Veterinaria especializada en pequeños mamíferos exóticos
                </strong>
                , con más de 7 años de experiencia en <em>clínica</em>,{" "}
                <em>cirugía</em> e <em>investigación</em>. Enfocada en brindar{" "}
                <strong>atención de alta calidad</strong> y en la{" "}
                <em>docencia universitaria</em> en Chile.
              </p>
              <p className="about-intro break-words overflow-wrap-break-word">
                <em>Experiencia y Pasión por los Exóticos</em> - Con más de 7
                años de experiencia, la Dra. Sibo se ha consolidado como
                referente en la atención de mascotas no convencionales,
                especializándose en cirugías complejas de tejidos blandos y
                procedimientos odontológicos avanzados.
              </p>

              <div className="credentials overflow-hidden break-words w-full">
                <h3>Especialidades y Certificaciones</h3>
                <ul>
                  <li>
                    <i className="fas fa-graduation-cap"></i>
                    <strong>GPCert (ExAP, ISVPS)</strong> - Postgrado en Clínica
                    de animales exóticos
                  </li>
                  <li>
                    <i className="fas fa-certificate"></i>
                    <strong>Grand Master</strong> en Medicina y Cirugía de Aves
                    y Animales Exóticos
                  </li>
                  <li>
                    <i className="fas fa-cut"></i> <strong>Diplomado</strong> en
                    Cirugía de Tejidos Blandos
                  </li>
                  <li>
                    <i className="fas fa-tooth"></i>
                    <strong>Especialización</strong> en Odontología Veterinaria
                    de Mascotas No Convencionales
                  </li>
                  <li>
                    <i className="fas fa-dove"></i> <strong>Diplomado</strong>{" "}
                    en Medicina de Aves
                  </li>
                </ul>
              </div>

              <div className="experience-highlights overflow-hidden break-words w-full">
                <h3>Experiencia Destacada</h3>
                <div className="experience-item overflow-hidden break-words">
                  <h4>Cirujano de Mascotas No Convencionales</h4>
                  <p>
                    Más de 7 años realizando cirugías especializadas en tejidos
                    blandos y odontológicas
                  </p>
                </div>
                <div className="experience-item overflow-hidden break-words">
                  <h4>Docente Universitaria</h4>
                  <p>
                    <strong>Pregrado:</strong> Universidad Andrés Bello (sedes
                    Colina, Viña del Mar y Concepción) y Universidad Bernardo
                    O'Higgins - Medicina y Cirugía de Pequeños Mamíferos
                    Exóticos
                  </p>
                  <p style={{ marginTop: "0.5rem" }}>
                    <strong>Postgrado:</strong> Universidad de Chile - Diplomado
                    en Medicina de Animales Exóticos
                  </p>
                </div>
                <div className="experience-item overflow-hidden break-words">
                  <h4>Investigación Científica</h4>
                  <p>
                    Participación continua en estudios clínicos y publicaciones
                    en revistas científicas sobre medicina de animales exóticos
                  </p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <Image
                src="/images/siboneyperfil.png"
                alt="Dra. Siboney Pérez veterinaria especialista en cirugía de animales exóticos Chile"
                id="about-img"
                width={400}
                height={400}
              />
              <div className="about-stats">
                <div className="stat">
                  <span className="stat-number">7+</span>
                  <span className="stat-label">Años de Experiencia</span>
                </div>
                <div className="stat">
                  <span className="stat-number">1000+</span>
                  <span className="stat-label">Cirugías Realizadas</span>
                </div>
                <div className="stat">
                  <span className="stat-number">15+</span>
                  <span className="stat-label">Certificaciones</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="galeria" className="gallery">
        <div className="container">
          <div className="section-header">
            <h2>Pequeños Mamíferos que Atendemos</h2>
            <p>
              <strong>
                Especialistas en conejos, cobayos, chinchillas, miomorfos y
                hurones
              </strong>{" "}
              - Atención veterinaria de excelencia
            </p>
          </div>

          <div className="gallery-grid">
            <div className="gallery-item">
              <Image
                src="/images/4.png"
                alt="Veterinario especialista en hurones Chile - cirugía y medicina para hurones"
                width={300}
                height={300}
              />
              <div className="gallery-overlay">
                <h3>Hurones</h3>
                <p>
                  <strong>Medicina y cirugía especializada</strong> en hurones
                </p>
              </div>
            </div>

            <div className="gallery-item">
              <Image
                src="/images/3.png"
                alt="Veterinario chinchillas Santiago - odontología y cuidado dental especializado"
                width={300}
                height={300}
              />
              <div className="gallery-overlay">
                <h3>Chinchillas</h3>
                <p>
                  <strong>Odontología especializada</strong> en chinchillas y
                  cuidado dental
                </p>
              </div>
            </div>

            <div className="gallery-item">
              <Image
                src="/images/2.png"
                alt="Veterinario cobayos y cuyes Chile - medicina preventiva y tratamiento especializado"
                width={300}
                height={300}
              />
              <div className="gallery-overlay">
                <h3>Cobayos (Cuyes)</h3>
                <p>
                  <strong>Atención especializada</strong> para cobayos
                </p>
              </div>
            </div>

            <div className="gallery-item">
              <Image
                src="/images/1.png"
                alt="Veterinario conejos Chile - cirugía y odontología especializada"
                width={300}
                height={300}
              />
              <div className="gallery-overlay">
                <h3>Conejos</h3>
                <p>
                  <strong>Cirugía y odontología especializada</strong> para
                  conejos
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Promotion Section */}
      <section className="courses-promo">
        <div className="container">
          <div className="promo-content">
            <div className="promo-text">
              <h2>¿Eres Veterinario o Estudiante?</h2>
              <h3>Capacitación y Cursos de Especialización</h3>
              <p>
                La Dra. Sibo ofrece instancias de formación para colegas
                interesados en profundizar en el área de pequeños mamíferos
                exóticos. Formación práctica con casos reales.
              </p>
              <ul className="promo-features">
                <li>
                  <i className="fas fa-graduation-cap"></i> Certificación
                  profesional
                </li>
                <li>
                  <i className="fas fa-users"></i> Grupos reducidos y atención
                  personalizada
                </li>
                <li>
                  <i className="fas fa-microscope"></i> Práctica con casos
                  reales
                </li>
                <li>
                  <i className="fas fa-award"></i> Instructora certificada
                  internacionalmente
                </li>
              </ul>
              <div className="promo-buttons">
                <Link href="/cursos" className="btn btn-primary">
                  Ver Cursos
                </Link>
                <Link href="/casos-clinicos" className="btn btn-secondary">
                  Casos Clínicos
                </Link>
              </div>
            </div>
            <div className="promo-image">
              <Image
                src="/images/cursos-veterinaria.png"
                alt="Cursos de especialización veterinaria"
                width={500}
                height={500}
              />
              <div className="promo-badge">
                <span>Nuevos Cursos</span>
                <small>2025</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Derivación Section */}
      <section
        className="courses-promo"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div className="container">
          <div
            className="promo-content"
            style={{ gridTemplateColumns: "1fr", textAlign: "center" }}
          >
            <div className="promo-text">
              <h2 style={{ color: "white" }}>
                ¿Quieres Atenderte con la Dra. Sibo?
              </h2>
              <h3 style={{ color: "rgba(255, 255, 255, 0.95)" }}>
                Solicita tu Derivación a Nuestros Centros de Excelencia
              </h3>
              <p
                style={{
                  color: "rgba(255, 255, 255, 0.9)",
                  maxWidth: "800px",
                  margin: "0 auto 2rem",
                  fontSize: "1.1rem",
                }}
              >
                La Dra. Sibo atiende en prestigiosos centros veterinarios
                equipados con tecnología de última generación y personal
                altamente calificado. Todos nuestros centros cuentan con los más
                altos estándares de calidad en cirugía y medicina veterinaria.
              </p>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  padding: "2rem",
                  borderRadius: "15px",
                  margin: "2rem auto",
                  maxWidth: "700px",
                  backdropFilter: "blur(10px)",
                }}
              >
                <h4 style={{ color: "white", marginBottom: "1rem" }}>
                  <i className="fas fa-hospital"></i> Centros Disponibles
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "1rem",
                    textAlign: "left",
                    color: "white",
                  }}
                >
                  <div>
                    <i
                      className="fas fa-check-circle"
                      style={{ color: "#e67e22" }}
                    ></i>{" "}
                    Exotic Care
                  </div>
                  <div>
                    <i
                      className="fas fa-check-circle"
                      style={{ color: "#e67e22" }}
                    ></i>{" "}
                    Clínica Veterinaria UBO
                  </div>
                </div>
              </div>
              <div
                className="promo-buttons"
                style={{ justifyContent: "center", marginTop: "2rem" }}
              >
                <Link
                  href="/clinicas"
                  className="btn"
                  style={{
                    background: "white",
                    color: "#667eea",
                    padding: "15px 35px",
                    borderRadius: "50px",
                    fontWeight: "600",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "all 0.3s ease",
                  }}
                >
                  Ver Todas las Clínicas
                </Link>
                <a
                  href="#contacto"
                  className="btn"
                  style={{
                    background: "rgba(255, 255, 255, 0.2)",
                    color: "white",
                    border: "2px solid white",
                    padding: "15px 35px",
                    borderRadius: "50px",
                    fontWeight: "600",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    transition: "all 0.3s ease",
                  }}
                >
                  Contactar Ahora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>Contáctanos</h2>
            <p>
              Agenda tu cita o solicita información sobre nuestros servicios
            </p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h3>Email</h3>
                  <p>vetexotic.app@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <i className="fab fa-instagram"></i>
                <div>
                  <h3>Instagram</h3>
                  <p>@drasibo.exotic</p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Nombre completo" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Teléfono" />
                </div>
                <div className="form-group">
                  <select required>
                    <option value="">Tipo de mascota</option>
                    <option value="conejo">Conejo</option>
                    <option value="hamster">Hámster/Roedor</option>
                    <option value="ave">Ave</option>
                    <option value="reptil">Reptil</option>
                    <option value="erizo">Erizo</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea
                    placeholder="Describe la consulta o motivo de la cita"
                    rows={4}
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Enviar Consulta
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
