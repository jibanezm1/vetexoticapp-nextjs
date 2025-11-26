"use client";

import Image from "next/image";
import { useState } from "react";
import ScrollAnimations from "@/components/ScrollAnimations";

const casesData = [
  {
    id: "caso1",
    category: "cirugia",
    image: "/images/caso3.png",
    title: "Cirugía Abdominal en Conejo",
    summary: "Extirpación exitosa de masa abdominal en conejo de 3 años mediante técnicas mínimamente invasivas.",
    animal: "Conejo - Oryctolagus cuniculus",
    date: "Marzo 2024",
    duration: "2 horas",
    fullAnimal: "Conejo doméstico (Oryctolagus cuniculus)",
    fullDate: "15 de Marzo, 2024",
    fullDuration: "2 horas 30 minutos",
    diagnosis: "Masa abdominal sólida de 3cm de diámetro",
    procedure: "Laparotomía exploratoria con extirpación de masa",
    outcome: "Recuperación completa sin complicaciones",
    description: `
      <p><strong>Presentación del caso:</strong> Conejo macho castrado de 3 años presentado por el propietario debido a pérdida de apetito y letargo de 5 días de duración.</p>
      
      <p><strong>Examen clínico:</strong> Durante la palpación abdominal se detectó una masa firme en el cuadrante inferior derecho. Los parámetros vitales estaban dentro de rangos normales.</p>
      
      <p><strong>Diagnóstico por imágenes:</strong> La radiografía abdominal reveló una opacidad de tejido blando compatible con masa abdominal. La ecografía confirmó una lesión sólida de aproximadamente 3cm.</p>
      
      <p><strong>Procedimiento quirúrgico:</strong> Se realizó laparotomía exploratoria bajo anestesia general. La masa fue localizada en el mesenterio y se procedió a su extirpación completa preservando la vascularización intestinal.</p>
      
      <p><strong>Histopatología:</strong> El análisis reveló un lipoma benigno sin signos de malignidad.</p>
      
      <p><strong>Seguimiento:</strong> El paciente se recuperó completamente y retomó su alimentación normal al tercer día post-operatorio.</p>
    `,
  },
  {
    id: "caso2",
    category: "odontologia",
    image: "/images/caso5.png",
    title: "Corrección Dental en Chinchilla",
    summary: "Limado y corrección de dientes con sobrecrecimiento en chinchilla joven.",
    animal: "Chinchilla - Chinchilla lanigera",
    date: "Abril 2024",
    duration: "Odontología",
    fullAnimal: "Chinchilla (Chinchilla lanigera)",
    fullDate: "22 de Abril, 2024",
    fullDuration: "45 minutos",
    diagnosis: "Sobrecrecimiento dental bilateral",
    procedure: "Limado dental bajo sedación",
    outcome: "Mejoría inmediata en la alimentación",
    description: `
      <p><strong>Historia clínica:</strong> Chinchilla hembra de 2 años con dificultad para masticar y pérdida gradual de peso durante las últimas 3 semanas.</p>
      
      <p><strong>Examen oral:</strong> Se observó sobrecrecimiento de molares e incisivos con formación de puntas afiladas que causaban laceraciones en lengua y mejillas.</p>
      
      <p><strong>Sedación:</strong> Se utilizó una combinación de ketamina y medetomidina para permitir un examen oral completo y el procedimiento de limado.</p>
      
      <p><strong>Procedimiento:</strong> Se realizó limado cuidadoso de todas las superficies dentales sobrecrecidas, eliminando puntas afiladas y restaurando la oclusión normal.</p>
      
      <p><strong>Cuidados post-procedimiento:</strong> Se administró analgesia y se proporcionaron recomendaciones dietéticas para prevenir futuros sobrececimientos.</p>
      
      <p><strong>Resultado:</strong> La chinchilla comenzó a alimentarse normalmente inmediatamente después del procedimiento y recuperó su peso en 2 semanas.</p>
    `,
  },
  {
    id: "caso3",
    category: "medicina",
    image: "/images/caso7.png",
    title: "Diagnóstico Radiológico en Iguana",
    summary: "Evaluación y tratamiento de trastorno digestivo mediante radiografías y ecografías.",
    animal: "Iguana - Iguana iguana",
    date: "Mayo 2024",
    duration: "Diagnóstico por Imagen",
    fullAnimal: "Iguana verde (Iguana iguana)",
    fullDate: "10 de Mayo, 2024",
    fullDuration: "1 hora 15 minutos",
    diagnosis: "Impactación intestinal severa",
    procedure: "Radiografía y tratamiento médico",
    outcome: "Resolución completa mediante tratamiento conservador",
    description: `
      <p><strong>Motivo de consulta:</strong> Iguana macho adulto de 4 años presentado por ausencia de deposiciones durante 2 semanas y pérdida del apetito.</p>
      
      <p><strong>Examen físico:</strong> Palpación abdominal reveló distensión y contenido intestinal firme. El animal mostraba signos de deshidratación leve.</p>
      
      <p><strong>Estudios por imágenes:</strong> Las radiografías laterales y dorso-ventrales mostraron acumulación importante de contenido radiopaco en intestino grueso, compatible con impactación.</p>
      
      <p><strong>Tratamiento:</strong> Se implementó protocolo de fluidoterapia, baños tibios diarios, aumento de temperatura ambiental y administración de aceite mineral.</p>
      
      <p><strong>Monitoreo:</strong> Radiografías de control cada 3 días mostraron progresiva movilización del contenido intestinal.</p>
      
      <p><strong>Evolución:</strong> A los 8 días del tratamiento, el animal evacuó completamente y retomó la alimentación normal.</p>
    `,
  },
  {
    id: "caso4",
    category: "cirugia",
    image: "/images/caso8.png",
    title: "Cirugía de Saco Aéreo en Loro",
    summary: "Reparación quirúrgica de saco aéreo dañado en loro amazónico.",
    animal: "Loro - Amazona aestiva",
    date: "Junio 2024",
    duration: "Sistema Respiratorio",
    fullAnimal: "Loro amazónico (Amazona aestiva)",
    fullDate: "5 de Junio, 2024",
    fullDuration: "1 hora 45 minutos",
    diagnosis: "Ruptura traumática de saco aéreo cervical",
    procedure: "Reparación quirúrgica de saco aéreo",
    outcome: "Recuperación exitosa de función respiratoria",
    description: `
      <p><strong>Emergencia respiratoria:</strong> Loro amazónico de 6 años ingresado por dificultad respiratoria severa tras traumatismo por vuelo contra ventana.</p>
      
      <p><strong>Evaluación inicial:</strong> Examen clínico reveló enfisema subcutáneo en región cervical y sonidos respiratorios anormales. El ave presentaba distrés respiratorio moderado.</p>
      
      <p><strong>Diagnóstico:</strong> La palpación y radiografías confirmaron ruptura del saco aéreo cervical con escape de aire hacia tejidos blandos.</p>
      
      <p><strong>Preparación quirúrgica:</strong> Se estableció anestesia inhalatoria cuidadosa manteniendo ventilación asistida durante todo el procedimiento.</p>
      
      <p><strong>Técnica quirúrgica:</strong> Abordaje lateral del cuello con identificación y reparación de la ruptura mediante sutura con material reabsorbible 6-0.</p>
      
      <p><strong>Post-operatorio:</strong> Manejo en cámara de oxígeno durante 24 horas con monitoreo respiratorio constante.</p>
      
      <p><strong>Recuperación:</strong> Resolución completa del enfisema en 72 horas y retorno a respiración normal.</p>
    `,
  },
  {
    id: "caso5",
    category: "emergencia",
    image: "/images/caso9.png",
    title: "Obstrucción Intestinal en Hurón",
    summary: "Cirugía de emergencia para extraer cuerpo extraño del intestino delgado.",
    animal: "Hurón - Mustela putorius",
    date: "Julio 2024",
    duration: "Urgencia",
    fullAnimal: "Hurón doméstico (Mustela putorius)",
    fullDate: "18 de Julio, 2024",
    fullDuration: "2 horas",
    diagnosis: "Obstrucción intestinal por cuerpo extraño",
    procedure: "Enterotomía de urgencia",
    outcome: "Recuperación completa sin complicaciones",
    description: `
      <p><strong>Presentación de urgencia:</strong> Hurón hembra de 1.5 años presentado por vómitos persistentes de 24 horas y ausencia de deposiciones.</p>
      
      <p><strong>Examen de urgencia:</strong> El animal mostraba signos de dolor abdominal agudo, deshidratación y letargo. La palpación abdominal reveló distensión intestinal.</p>
      
      <p><strong>Radiografías de emergencia:</strong> Se observó patrón obstructivo con dilatación intestinal y presencia de estructura radiopaca en intestino delgado.</p>
      
      <p><strong>Estabilización:</strong> Fluidoterapia inmediata y analgesia antes de proceder a cirugía de urgencia.</p>
      
      <p><strong>Hallazgos quirúrgicos:</strong> Durante la laparotomía se identificó un juguete de goma pequeño obstruyendo el yeyuno distal.</p>
      
      <p><strong>Procedimiento:</strong> Enterotomía cuidadosa con extracción del cuerpo extraño y sutura intestinal en dos planos.</p>
      
      <p><strong>Post-operatorio:</strong> Ayuno de 24 horas seguido de reintroducción gradual de alimentación. Recuperación sin complicaciones.</p>
    `,
  },
  {
    id: "caso6",
    category: "medicina",
    image: "/images/caso10.png",
    title: "Chequeo Integral en Tortuga",
    summary: "Evaluación completa de salud y medicina preventiva en tortuga rusa.",
    animal: "Tortuga - Testudo horsfieldii",
    date: "Agosto 2024",
    duration: "Preventivo",
    fullAnimal: "Tortuga rusa (Testudo horsfieldii)",
    fullDate: "12 de Agosto, 2024",
    fullDuration: "30 minutos",
    diagnosis: "Evaluación de salud preventiva",
    procedure: "Examen físico completo y análisis laboratoriales",
    outcome: "Estado de salud excelente con recomendaciones preventivas",
    description: `
      <p><strong>Medicina preventiva:</strong> Tortuga rusa hembra de 8 años presentada para chequeo anual de rutina por propietario responsable.</p>
      
      <p><strong>Examen físico completo:</strong> Evaluación de caparazón, extremidades, cabeza, ojos, y cavidad oral. Peso y medidas corporales dentro de parámetros normales.</p>
      
      <p><strong>Evaluación nutricional:</strong> Revisión de la dieta actual y recomendaciones para optimización del aporte de calcio y vitaminas.</p>
      
      <p><strong>Análisis laboratoriales:</strong> Hemograma completo y química sanguínea mostraron valores dentro de rangos de referencia para la especie.</p>
      
      <p><strong>Evaluación del hábitat:</strong> Discusión sobre temperatura, humedad, iluminación UV y enriquecimiento ambiental apropiados.</p>
      
      <p><strong>Programa de desparasitación:</strong> Examen coprológico negativo. Se estableció protocolo preventivo de desparasitación anual.</p>
      
      <p><strong>Seguimiento:</strong> Se programó próxima evaluación en 12 meses y se proporcionó guía de cuidados estacionales.</p>
    `,
  },
];

const categories = [
  { id: "all", label: "Todos" },
  { id: "cirugia", label: "Cirugía" },
  { id: "medicina", label: "Medicina Interna" },
  { id: "odontologia", label: "Odontología" },
  { id: "emergencia", label: "Emergencias" },
];

export default function CasosClinicosPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedCase, setSelectedCase] = useState<typeof casesData[0] | null>(null);

  const filteredCases =
    activeFilter === "all" ? casesData : casesData.filter((c) => c.category === activeFilter);

  const getCategoryLabel = (category: string) => {
    const map: Record<string, string> = {
      cirugia: "Cirugía",
      medicina: "Medicina Interna",
      odontologia: "Odontología",
      emergencia: "Emergencia",
    };
    return map[category] || category;
  };

  return (
    <>
      <ScrollAnimations />

      {/* Hero Section */}
      <section className="cv-header">
        <div className="container">
          <div className="cv-intro" style={{ alignItems: "center" }}>
            <div className="cv-photo">
              <Image
                src="/images/banner-erizo.png"
                alt="Casos clínicos veterinaria animales exóticos - erizo tratamiento especializado Chile"
                width={220}
                height={220}
                priority
                style={{
                  maxWidth: "220px",
                  width: "100%",
                  height: "auto",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </div>
            <div className="cv-basic-info">
              <h1>Casos Clínicos Reales de Animales Exóticos</h1>
              <h2>Cirugías y Tratamientos Exitosos en Conejos, Hurones y Más</h2>
              <p>
                <strong>Documentación de casos clínicos reales</strong> tratados con{" "}
                <em>técnicas avanzadas</em> en <strong>cirugía</strong> y{" "}
                <strong>medicina interna</strong> de animales exóticos.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="case-filters">
        <div className="container">
          <div className="filter-buttons">
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-btn ${activeFilter === cat.id ? "active" : ""}`}
                onClick={() => setActiveFilter(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="clinical-cases">
        <div className="container">
          <div className="cases-grid">
            {filteredCases.map((caseItem) => (
              <article key={caseItem.id} className="case-card" data-category={caseItem.category}>
                <div className="case-image">
                  <Image src={caseItem.image} alt={caseItem.title} width={400} height={300} />
                  <div className="case-overlay">
                    <span className="case-category">{getCategoryLabel(caseItem.category)}</span>
                  </div>
                </div>
                <div className="case-content">
                  <h3>{caseItem.title}</h3>
                  <p className="case-summary">{caseItem.summary}</p>
                  <div className="case-details">
                    <span className="detail">
                      <i className="fas fa-paw"></i> {caseItem.animal}
                    </span>
                    <span className="detail">
                      <i className="fas fa-calendar"></i> {caseItem.date}
                    </span>
                    <span className="detail">
                      <i className="fas fa-clock"></i> {caseItem.duration}
                    </span>
                  </div>
                  <button className="btn-case-detail" onClick={() => setSelectedCase(caseItem)}>
                    Ver Detalles
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="case-stats">
        <div className="container">
          <h2>Experiencia Documentada</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-procedures"></i>
              </div>
              <div className="stat-number">200+</div>
              <div className="stat-label">Cirugías Realizadas</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-paw"></i>
              </div>
              <div className="stat-number">15</div>
              <div className="stat-label">Especies Tratadas</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-percentage"></i>
              </div>
              <div className="stat-number">98%</div>
              <div className="stat-label">Tasa de Éxito</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="stat-number">6</div>
              <div className="stat-label">Años de Experiencia</div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Detail Modal */}
      {selectedCase && (
        <div className="modal" style={{ display: "block" }} onClick={() => setSelectedCase(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setSelectedCase(null)}>
              &times;
            </span>
            <div id="modalContent">
              <h2>{selectedCase.title}</h2>
              <div className="case-detail-meta">
                <div className="meta-grid">
                  <div className="meta-item">
                    <strong>Animal:</strong> {selectedCase.fullAnimal}
                  </div>
                  <div className="meta-item">
                    <strong>Fecha:</strong> {selectedCase.fullDate}
                  </div>
                  <div className="meta-item">
                    <strong>Duración:</strong> {selectedCase.fullDuration}
                  </div>
                  <div className="meta-item">
                    <strong>Diagnóstico:</strong> {selectedCase.diagnosis}
                  </div>
                  <div className="meta-item">
                    <strong>Procedimiento:</strong> {selectedCase.procedure}
                  </div>
                  <div className="meta-item">
                    <strong>Resultado:</strong> {selectedCase.outcome}
                  </div>
                </div>
              </div>

              <div
                className="case-detail-content"
                dangerouslySetInnerHTML={{ __html: selectedCase.description }}
              />

              <div className="case-detail-footer">
                <p>
                  <em>
                    Este caso forma parte de la experiencia clínica documentada de la Dra. Siboney
                    Pérez en medicina de animales exóticos.
                  </em>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
