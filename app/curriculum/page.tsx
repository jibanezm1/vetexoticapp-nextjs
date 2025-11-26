import Image from "next/image";
import type { Metadata } from "next";
import ScrollAnimations from "@/components/ScrollAnimations";

export const metadata: Metadata = {
  title: "CV Dra. Siboney Pérez | Veterinaria Especialista en Animales Exóticos",
  description:
    "Currículum de la Dra. Siboney Pérez, veterinaria especialista en cirugía y odontología de animales exóticos. Docente en UNAB y UBO. Experiencia en Exoticare y centros veterinarios de prestigio.",
  keywords:
    "siboney pérez veterinaria, curriculum veterinario exóticos, especialista animales exóticos chile, cirujano veterinario exóticos, odontólogo veterinario",
  openGraph: {
    type: "profile",
    url: "https://vetexoticapp.cl/curriculum",
    title: "CV Dra. Siboney Pérez | Veterinaria Especialista",
    description: "Veterinaria especialista en cirugía y odontología de animales exóticos en Chile.",
    images: [
      {
        url: "https://vetexoticapp.cl/images/dra-siboney-real.jpg",
        alt: "Dra. Siboney Pérez",
      },
    ],
  },
};

export default function CurriculumPage() {
  return (
    <>
      <ScrollAnimations />
      {/* CV Header */}
      <section className="cv-header">
        <div className="container">
          <div className="cv-intro with-photo">
            <div className="cv-photo">
              <Image
                src="/images/dra-siboney-real.jpg"
                alt="Dra. Siboney Pérez"
                id="cv-photo"
                width={300}
                height={300}
              />
            </div>
            <div className="cv-basic-info">
              <h1>Dra. Siboney Pérez</h1>
              <h2>MÉDICO VETERINARIO</h2>
              <div className="contact-details">
                <div className="contact-row">
                  <div className="contact-item">
                    <i className="fas fa-phone"></i>
                    <span>+56 9 3449 7035</span>
                  </div>
                  <div className="contact-item">
                    <i className="fas fa-envelope"></i>
                    <span>vetexotic.app@gmail.com</span>
                  </div>
                </div>
                <div className="contact-row">
                  <div className="contact-item">
                    <i className="fas fa-map-marker-alt"></i>
                    <span>San Bernardo, Chile</span>
                  </div>
                  <div className="contact-item">
                    <i className="fab fa-instagram"></i>
                    <span>@drasibo.exotic</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CV Content */}
      <section className="cv-content">
        <div className="container">
          <div className="cv-grid">
            {/* Sobre Mí */}
            <div className="cv-section">
              <h3>
                <i className="fas fa-user"></i> Sobre Mí
              </h3>
              <p>
                Veterinaria especializada en animales exóticos, con experiencia en clínica, cirugía e
                investigación. Enfocada en brindar atención de alta calidad y en la docencia
                universitaria.
              </p>
            </div>

            {/* Formación Académica */}
            <div className="cv-section">
              <h3>
                <i className="fas fa-graduation-cap"></i> Formación Académica
              </h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-date">2022 - 2025</div>
                  <div className="timeline-content">
                    <h4>Postgrado en Clínica de animales exóticos</h4>
                    <p>
                      <strong>GPCert (ExAP, ISVPS)</strong> - Improve International
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">2024</div>
                  <div className="timeline-content">
                    <h4>III Diplomado Latinoamericano en Cirugía por Especialidades</h4>
                    <p>
                      <strong>Quirúrgicas, tejidos blandos, ortopedia y traumatología</strong> - F&G
                      Educational Society
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">feb. - oct. 2024</div>
                  <div className="timeline-content">
                    <h4>Postgrado de Animales Exóticos</h4>
                    <p>
                      <strong>PGCert</strong> - Ifevet
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">2023 - 2024</div>
                  <div className="timeline-content">
                    <h4>
                      II Mentoría en odontología veterinaria de mascotas no convencionales
                    </h4>
                    <p>
                      <strong>Dr. Fecchio</strong>
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">2022 - 2024</div>
                  <div className="timeline-content">
                    <h4>Grand Master en Medicina y Cirugía de Aves y Animales Exóticos</h4>
                    <p>
                      <strong>Tech University</strong>
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">2022 - 2023</div>
                  <div className="timeline-content">
                    <h4>Diplomado en cirugía de tejidos blandos</h4>
                    <p>
                      <strong>Teórico (150 h) - práctico (42 h)</strong> - Intermedica, Argentina
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">2021</div>
                  <div className="timeline-content">
                    <h4>Diplomado online de Medicina de aves</h4>
                    <p>
                      <strong>
                        Instituto Mexicano de Fauna Silvestre y Animales de Compañía, IMFAC
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">2017</div>
                  <div className="timeline-content">
                    <h4>
                      Diplomado de Medicina Interna, Diagnóstico y Cirugía en Animales Exóticos
                    </h4>
                    <p>
                      <strong>
                        Instituto Mexicano de Fauna Silvestre y Animales de Compañía, IMFAC
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">2016</div>
                  <div className="timeline-content">
                    <h4>Diplomado en Medicina y Manejo de Animales Exóticos</h4>
                    <p>
                      <strong>Universidad de Chile, FAVET</strong>
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">2009 - 2017</div>
                  <div className="timeline-content">
                    <h4>Médico Veterinario</h4>
                    <p>
                      <strong>Universidad de Chile, FAVET</strong>
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">2009 - 2016</div>
                  <div className="timeline-content">
                    <h4>Licenciada de Medicina Veterinaria</h4>
                    <p>
                      <strong>Universidad de Chile, FAVET</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experiencia Laboral */}
            <div className="cv-section">
              <h3>
                <i className="fas fa-briefcase"></i> Experiencia Laboral
              </h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-date">mar 2025 – Actualidad</div>
                  <div className="timeline-content">
                    <h4>Médico Vet. Cirujano de mascotas no convencionales</h4>
                    <p>
                      <strong>
                        Clínica Veterinaria República | Clínica Veterinaria Italia
                      </strong>
                    </p>
                    <p>Cirugías tejidos blandos y odontológicas en pequeños mamíferos.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">jul. 2024 – actualidad</div>
                  <div className="timeline-content">
                    <h4>Médico Vet. Cirujano de mascotas no convencionales</h4>
                    <p>
                      <strong>Clínica Veterinaria Exoticare</strong>
                    </p>
                    <p>Cirugías tejidos blandos y odontológicas en pequeños mamíferos.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">dic. 2023 – actualidad</div>
                  <div className="timeline-content">
                    <h4>Docente Pregrado y Médico Veterinario Cirujano</h4>
                    <p>
                      <strong>Universidad Andrés Bello (UMEX)</strong>
                    </p>
                    <p>Impartición de clases teóricas y prácticas en medicina exótica.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">2024</div>
                  <div className="timeline-content">
                    <h4>
                      Docente clase teórica y prácticos de cirugía en Mamíferos Exóticos I
                    </h4>
                    <p>
                      <strong>Diplomado en Medicina de Animales Exóticos, UdeChile</strong>
                    </p>
                    <p>
                      Profesora invitada a clase de postgrado teórico-práctico de cirugía en
                      pequeños mamíferos.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">abr. 2020 – mar. 2025</div>
                  <div className="timeline-content">
                    <h4>Médico Veterinario de planta</h4>
                    <p>
                      <strong>Clínica Veterinaria Tus Mascotas</strong>
                    </p>
                    <p>Cirugías tejidos blandos y odontológicas en pequeños mamíferos.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">mar. 2018 - ene. 2020</div>
                  <div className="timeline-content">
                    <h4>Médico Veterinario de planta</h4>
                    <p>
                      <strong>Clínica Veterinaria Exopet</strong>
                    </p>
                    <p>Medicina y Cirugías en Animales Exóticos.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">sep. 2017 - mar. 2021</div>
                  <div className="timeline-content">
                    <h4>Médico Veterinario externo</h4>
                    <p>
                      <strong>
                        Hospital SOS Zoológico de Buin | Clínica Veterinaria Bellavista | Todo
                        animal | Vet Portugal
                      </strong>
                    </p>
                    <p>Interconsultas y cirugías en mascotas no convencionales.</p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">ago. 2017 - dic. 2020</div>
                  <div className="timeline-content">
                    <h4>Médico Veterinario Mascotas Exóticas (a domicilio)</h4>
                    <p>
                      <strong>Profesional Independiente</strong>
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">jul. 2017 - mar. 2018</div>
                  <div className="timeline-content">
                    <h4>Médico Veterinario Internista</h4>
                    <p>
                      <strong>Clínica Veterinaria Exzootic Vet</strong>
                    </p>
                    <p>Aves, reptiles, pequeños mamíferos.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Otras Certificaciones */}
            <div className="cv-section">
              <h3>
                <i className="fas fa-certificate"></i> Otras Certificaciones
              </h3>
              <div className="certifications">
                <div className="cert-item">
                  <h4>
                    I Simpósio Internacional de Cirurgia em Animais Selvagens Exóticos e Pets não
                    convencionais
                  </h4>
                  <p>
                    <strong>10 h</strong> - Safari pet. | febrero, 2024
                  </p>
                </div>

                <div className="cert-item">
                  <h4>Curso medicina interna de mamíferos exóticos</h4>
                  <p>
                    <strong>10 horas</strong> - IMFAC. | mayo, 2021
                  </p>
                </div>

                <div className="cert-item">
                  <h4>II Workshop online de cirugía de animales no convencionales</h4>
                  <p>
                    <strong>16 horas</strong> - Safari vets. | mayo, 2021
                  </p>
                </div>

                <div className="cert-item">
                  <h4>
                    Terapéutica general y dermatología de animales exóticos de compañía
                  </h4>
                  <p>pequeños mamíferos, aves y reptiles - IMFAC. | marzo - abril 2021</p>
                </div>

                <div className="cert-item">
                  <h4>I Workshop online de medicina de aves</h4>
                  <p>
                    <strong>16 horas</strong> - Safari vets. | marzo, 2021
                  </p>
                </div>

                <div className="cert-item">
                  <h4>I Workshop online de odontología en conejos y roedores</h4>
                  <p>
                    <strong>12 horas</strong> - Safari vets. | octubre, 2020
                  </p>
                </div>

                <div className="cert-item">
                  <h4>Curso de cirugía básica para médicos veterinarios</h4>
                  <p>
                    <strong>40 h teóricas-prácticas</strong> - Centralvet | 2do semestre 2019
                  </p>
                </div>

                <div className="cert-item">
                  <h4>Multiples cursos prácticos</h4>
                  <p>Universidad de Chile, FAVET | 2012 - 2019</p>
                </div>
              </div>
            </div>

            {/* Publicaciones */}
            <div className="cv-section">
              <h3>
                <i className="fas fa-book"></i> Publicaciones
              </h3>
              <div className="publication">
                <h4>
                  Detection of antimicrobial resistant Salmonella enterica strains in samples of
                  ground hedgehogs (Atelerix albiventris) reared as pets in the urban area of
                  Santiago, Chile
                </h4>
                <p>
                  <strong>Autores:</strong> Pérez, Siboney, Barreto, Marlen, & Retamal, Patricio.
                  (2021)
                </p>
                <p>
                  <strong>Revista:</strong> Austral journal of veterinary sciences, 53(2), 133-137
                </p>
                <p>
                  <strong>DOI:</strong>{" "}
                  <a
                    href="https://dx.doi.org/10.4067/S0719-81322021000200133"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    10.4067/S0719-81322021000200133
                  </a>
                </p>
              </div>
            </div>

            {/* Ayudantías y Tutorías */}
            <div className="cv-section">
              <h3>
                <i className="fas fa-chalkboard-teacher"></i> Ayudantías y Tutorías
              </h3>
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-date">1° semestre 2012</div>
                  <div className="timeline-content">
                    <h4>Tutoría en Microbiología Clínica Veterinaria</h4>
                    <p>
                      <strong>FAVET</strong> - Profesor Guía: Dra. María Antonieta Jara O.
                    </p>
                    <p>
                      Laboratorio de Microbiología Clínica: aplicación de normas de bioseguridad,
                      preparación y esterilización de medios de cultivo. Diagnóstico directo:
                      tinciones, aislamiento bacteriano e identificación mediante pruebas
                      bioquímicas. Diagnóstico indirecto: prueba rosa de bengala. Mantención de
                      cepario de Salmonella spp., aisladas de reptiles.
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">oct. 2010- oct. 2014</div>
                  <div className="timeline-content">
                    <h4>Ayudante Prácticos Conejos: Formativo 1° y 2° / Básicos Grals. de 1°</h4>
                    <p>
                      <strong>Universidad de Chile, FAVET</strong>
                    </p>
                  </div>
                </div>

                <div className="timeline-item">
                  <div className="timeline-date">2do semestre 2010</div>
                  <div className="timeline-content">
                    <h4>Ayudantía en trabajo práctico en sistema reproductivo</h4>
                    <p>
                      <strong>FAVET</strong> - Docente responsable: Dra. Bessie Urquieta
                    </p>
                    <p>
                      Departamento de fisiología – laboratorio: &quot;Efecto de hormonas ováricas
                      sobre el desarrollo de los anexos reproductivos en ratas hembras adultas no
                      preñadas&quot;
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
