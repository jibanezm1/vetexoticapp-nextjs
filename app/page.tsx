import Image from "next/image";
import Link from "next/link";
import ScrollAnimations from "@/components/ScrollAnimations";

export default function HomePage() {
  return (
    <>
      <ScrollAnimations />
      {/* Hero Section */}
      <section id="inicio" className="hero">
        <div className="hero-content">
          <div className="container">
            <div className="hero-text">
              <h1>
                Veterinaria Especialista en Animales Exóticos en Chile
              </h1>
              <h2>
                Dra. Siboney Pérez - Cirugía y Odontología para Conejos, Hurones, Chinchillas y Más
              </h2>
              <p>
                <strong>Atención veterinaria especializada en animales exóticos en Santiago</strong>.{" "}
                <em>Cirugías avanzadas</em>, <em>odontología especializada</em> y{" "}
                <em>medicina interna</em> para <strong>conejos</strong>, <strong>hurones</strong>,{" "}
                <strong>chinchillas</strong>, <strong>erizos</strong> y otras mascotas exóticas. Más de{" "}
                <strong>8 años de experiencia</strong> en centros de excelencia.
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
            <h2>Servicios Veterinarios Especializados en Animales Exóticos</h2>
            <p>
              Atención médica y quirúrgica de excelencia para conejos, hurones, chinchillas, erizos y más
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-cut"></i>
              </div>
              <h3>Cirugía de Tejidos Blandos para Animales Exóticos</h3>
              <p>
                Procedimientos quirúrgicos especializados en chinchillas, cuyes, erizos y otros pequeños
                mamíferos exóticos. Cirugías gastrointestinales, reproductivas y de emergencia realizadas
                con equipamiento de última generación.
              </p>
              <ul className="service-details">
                <li>Esterilizaciones y castraciones en animales exóticos</li>
                <li>Cirugía gastrointestinal especializada</li>
                <li>Extracción de tumores</li>
                <li>Cirugías de emergencia 24/7</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-tooth"></i>
              </div>
              <h3>Odontología Veterinaria para Animales Exóticos</h3>
              <p>
                Tratamientos dentales especializados para conejos, chinchillas, cuyes, y otros roedores
                exóticos. Limpieza, extracción y corrección dental con equipamiento especializado y
                radiografía dental digital.
              </p>
              <ul className="service-details">
                <li>Limado de dientes en conejos y roedores</li>
                <li>Extracción dental especializada</li>
                <li>Tratamiento de abscesos dentales</li>
                <li>Evaluación radiográfica dental completa</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-stethoscope"></i>
              </div>
              <h3>Medicina Interna para Animales Exóticos</h3>
              <p>
                <strong>Diagnóstico y tratamiento de enfermedades</strong> en <em>cuyes</em>,{" "}
                <em>chinchillas</em>, <em>erizos</em> y otros pequeños mamíferos exóticos. Consultas
                especializadas y seguimiento médico integral.
              </p>
              <ul className="service-details">
                <li>Diagnóstico por imágenes</li>
                <li>Análisis clínicos</li>
                <li>Tratamientos especializados</li>
                <li>Medicina preventiva</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-dove"></i>
              </div>
              <h3>Medicina Veterinaria Especializada en Aves Exóticas</h3>
              <p>
                <strong>Atención integral para aves ornamentales y de compañía</strong>. Desde{" "}
                <em>loros</em> hasta <em>canarios</em>, brindamos cuidado veterinario especializado.
              </p>
              <ul className="service-details">
                <li>Medicina de aves ornamentales</li>
                <li>Cirugía aviar</li>
                <li>Sexado de aves</li>
                <li>Nutrición especializada</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-dragon"></i>
              </div>
              <h3>Veterinaria Especializada en Reptiles Exóticos</h3>
              <p>
                <strong>Cuidado veterinario especializado para reptiles de compañía</strong>. Desde{" "}
                <em>iguanas</em> hasta <em>tortugas</em>, ofrecemos atención médica integral.
              </p>
              <ul className="service-details">
                <li>Medicina de reptiles</li>
                <li>Manejo nutricional</li>
                <li>Tratamiento parasitario</li>
                <li>Cirugía de reptiles</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-home"></i>
              </div>
              <h3>Veterinario a Domicilio para Animales Exóticos</h3>
              <p>
                <strong>Servicios veterinarios a domicilio</strong> en Santiago, en la comodidad de su
                hogar para reducir el estrés de sus <em>mascotas exóticas</em>.
              </p>
              <ul className="service-details">
                <li>Consultas domiciliarias</li>
                <li>Medicina preventiva</li>
                <li>Eutanasia humanitaria</li>
                <li>Seguimiento post-quirúrgico</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>Sobre la Dra. Siboney Pérez - Especialista en Animales Exóticos</h2>
              <p className="about-intro">
                <strong>Veterinaria especializada en animales exóticos</strong>, con más de 8 años de
                experiencia en <em>clínica</em>, <em>cirugía</em> e <em>investigación</em>. Enfocada en
                brindar <strong>atención de alta calidad</strong> y en la <em>docencia universitaria</em>{" "}
                en Chile.
              </p>

              <div className="credentials">
                <h3>Especialidades y Certificaciones</h3>
                <ul>
                  <li>
                    <i className="fas fa-graduation-cap"></i>
                    <strong>GPCert (ExAP, ISVPS)</strong> - Postgrado en Clínica de animales exóticos
                  </li>
                  <li>
                    <i className="fas fa-certificate"></i>
                    <strong>Grand Master</strong> en Medicina y Cirugía de Aves y Animales Exóticos
                  </li>
                  <li>
                    <i className="fas fa-cut"></i> <strong>Diplomado</strong> en Cirugía de Tejidos
                    Blandos
                  </li>
                  <li>
                    <i className="fas fa-tooth"></i>
                    <strong>Especialización</strong> en Odontología Veterinaria de Mascotas No
                    Convencionales
                  </li>
                  <li>
                    <i className="fas fa-dove"></i> <strong>Diplomado</strong> en Medicina de Aves
                  </li>
                </ul>
              </div>

              <div className="experience-highlights">
                <h3>Experiencia Destacada</h3>
                <div className="experience-item">
                  <h4>Cirujano de Mascotas No Convencionales</h4>
                  <p>
                    Más de 6 años realizando cirugías especializadas en tejidos blandos y odontológicas
                  </p>
                </div>
                <div className="experience-item">
                  <h4>Docente Universitaria</h4>
                  <p>
                    Universidad Andrés Bello (UMEX) - Medicina Exótica y Cirugía de Mamíferos Exóticos
                  </p>
                </div>
                <div className="experience-item">
                  <h4>Investigación Científica</h4>
                  <p>
                    Publicaciones en revistas científicas sobre resistencia antimicrobiana en animales
                    exóticos
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
                  <span className="stat-number">8+</span>
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
            <h2>Galería de Animales Exóticos que Atendemos</h2>
            <p>
              <strong>Especialistas en conejos, hurones, chinchillas, erizos y más</strong> - Atención
              veterinaria de excelencia
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
                  <strong>Odontología especializada</strong> en chinchillas y cuidado dental
                </p>
              </div>
            </div>

            <div className="gallery-item">
              <Image
                src="/images/1.png"
                alt="Veterinario erizos domésticos Chile - atención especializada para erizos"
                width={300}
                height={300}
              />
              <div className="gallery-overlay">
                <h3>Erizos</h3>
                <p>
                  <strong>Cuidado veterinario especializado</strong> para erizos domésticos
                </p>
              </div>
            </div>

            <div className="gallery-item">
              <Image
                src="/images/2.png"
                alt="Veterinario cuyes y cobayas Chile - medicina preventiva y tratamiento especializado"
                width={300}
                height={300}
              />
              <div className="gallery-overlay">
                <h3>Cuyes y Cobayas</h3>
                <p>
                  <strong>Atención especializada</strong> para cuyes domésticos
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
              <h2>¿Eres Veterinario?</h2>
              <h3>Especialízate en Medicina de Animales Exóticos</h3>
              <p>
                Únete a nuestros cursos especializados y amplía tus conocimientos en medicina y cirugía
                de animales exóticos. Formación práctica con casos reales.
              </p>
              <ul className="promo-features">
                <li>
                  <i className="fas fa-graduation-cap"></i> Certificación profesional
                </li>
                <li>
                  <i className="fas fa-users"></i> Grupos reducidos (máx. 10 alumnos)
                </li>
                <li>
                  <i className="fas fa-microscope"></i> Práctica con casos reales
                </li>
                <li>
                  <i className="fas fa-award"></i> Instructor certificada internacionalmente
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
        style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
      >
        <div className="container">
          <div className="promo-content" style={{ gridTemplateColumns: "1fr", textAlign: "center" }}>
            <div className="promo-text">
              <h2 style={{ color: "white" }}>¿Quieres Atenderte con la Dra. Siboney Pérez?</h2>
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
                La Dra. Siboney Pérez atiende en prestigiosos centros veterinarios equipados con
                tecnología de última generación y personal altamente calificado. Todos nuestros centros
                cuentan con los más altos estándares de calidad en cirugía y medicina veterinaria.
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
                    <i className="fas fa-check-circle" style={{ color: "#e67e22" }}></i> Exoticare
                    Maipú
                  </div>
                  <div>
                    <i className="fas fa-check-circle" style={{ color: "#e67e22" }}></i> Centro Vet.
                    República
                  </div>
                  <div>
                    <i className="fas fa-check-circle" style={{ color: "#e67e22" }}></i> Centro Vet.
                    Italia
                  </div>
                  <div>
                    <i className="fas fa-check-circle" style={{ color: "#e67e22" }}></i> UNAB Colina
                  </div>
                </div>
              </div>
              <div className="promo-buttons" style={{ justifyContent: "center", marginTop: "2rem" }}>
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
            <p>Agenda tu cita o solicita información sobre nuestros servicios</p>
          </div>

          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <div>
                  <h3>Teléfono</h3>
                  <p>+56 9 3449 7035</p>
                </div>
              </div>

              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h3>Email</h3>
                  <p>vetexotic.app@gmail.com</p>
                </div>
              </div>

              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h3>Ubicación</h3>
                  <p>San Bernardo, Chile</p>
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
                  <textarea placeholder="Describe la consulta o motivo de la cita" rows={4}></textarea>
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
