// JavaScript para la página de casos clínicos

document.addEventListener("DOMContentLoaded", function () {
  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn");
  const caseCards = document.querySelectorAll(".case-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterValue = this.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter cases
      caseCards.forEach((card) => {
        if (
          filterValue === "all" ||
          card.getAttribute("data-category") === filterValue
        ) {
          card.style.display = "block";
          card.style.animation = "fadeIn 0.5s ease";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Modal functionality
  const modal = document.getElementById("caseModal");
  const modalContent = document.getElementById("modalContent");
  const closeBtn = document.querySelector(".close");
  const caseDetailButtons = document.querySelectorAll(".btn-case-detail");

  // Case details data
  const caseDetails = {
    caso1: {
      title: "Cirugía Abdominal en Conejo",
      animal: "Conejo doméstico (Oryctolagus cuniculus)",
      date: "15 de Marzo, 2024",
      duration: "2 horas 30 minutos",
      diagnosis: "Masa abdominal sólida de 3cm de diámetro",
      procedure: "Laparotomía exploratoria con extirpación de masa",
      outcome: "Recuperación completa sin complicaciones",
      images: [
        "images/Captura de pantalla 2025-11-25 a la(s) 12.16.30 a.m..png",
      ],
      description: `
                <p><strong>Presentación del caso:</strong> Conejo macho castrado de 3 años presentado por el propietario debido a pérdida de apetito y letargo de 5 días de duración.</p>
                
                <p><strong>Examen clínico:</strong> Durante la palpación abdominal se detectó una masa firme en el cuadrante inferior derecho. Los parámetros vitales estaban dentro de rangos normales.</p>
                
                <p><strong>Diagnóstico por imágenes:</strong> La radiografía abdominal reveló una opacidad de tejido blando compatible con masa abdominal. La ecografía confirmó una lesión sólida de aproximadamente 3cm.</p>
                
                <p><strong>Procedimiento quirúrgico:</strong> Se realizó laparotomía exploratoria bajo anestesia general. La masa fue localizada en el mesenterio y se procedió a su extirpación completa preservando la vascularización intestinal.</p>
                
                <p><strong>Histopatología:</strong> El análisis reveló un lipoma benigno sin signos de malignidad.</p>
                
                <p><strong>Seguimiento:</strong> El paciente se recuperó completamente y retomó su alimentación normal al tercer día post-operatorio.</p>
            `,
    },
    caso2: {
      title: "Corrección Dental en Chinchilla",
      animal: "Chinchilla (Chinchilla lanigera)",
      date: "22 de Abril, 2024",
      duration: "45 minutos",
      diagnosis: "Sobrecrecimiento dental bilateral",
      procedure: "Limado dental bajo sedación",
      outcome: "Mejoría inmediata en la alimentación",
      images: [
        "images/Captura de pantalla 2025-11-25 a la(s) 12.16.45 a.m..png",
      ],
      description: `
                <p><strong>Historia clínica:</strong> Chinchilla hembra de 2 años con dificultad para masticar y pérdida gradual de peso durante las últimas 3 semanas.</p>
                
                <p><strong>Examen oral:</strong> Se observó sobrecrecimiento de molares e incisivos con formación de puntas afiladas que causaban laceraciones en lengua y mejillas.</p>
                
                <p><strong>Sedación:</strong> Se utilizó una combinación de ketamina y medetomidina para permitir un examen oral completo y el procedimiento de limado.</p>
                
                <p><strong>Procedimiento:</strong> Se realizó limado cuidadoso de todas las superficies dentales sobrecrecidas, eliminando puntas afiladas y restaurando la oclusión normal.</p>
                
                <p><strong>Cuidados post-procedimiento:</strong> Se administró analgesia y se proporcionaron recomendaciones dietéticas para prevenir futuros sobrececimientos.</p>
                
                <p><strong>Resultado:</strong> La chinchilla comenzó a alimentarse normalmente inmediatamente después del procedimiento y recuperó su peso en 2 semanas.</p>
            `,
    },
    caso3: {
      title: "Diagnóstico Radiológico en Iguana",
      animal: "Iguana verde (Iguana iguana)",
      date: "10 de Mayo, 2024",
      duration: "1 hora 15 minutos",
      diagnosis: "Impactación intestinal severa",
      procedure: "Radiografía y tratamiento médico",
      outcome: "Resolución completa mediante tratamiento conservador",
      images: [
        "images/Captura de pantalla 2025-11-25 a la(s) 12.17.10 a.m..png",
      ],
      description: `
                <p><strong>Motivo de consulta:</strong> Iguana macho adulto de 4 años presentado por ausencia de deposiciones durante 2 semanas y pérdida del apetito.</p>
                
                <p><strong>Examen físico:</strong> Palpación abdominal reveló distensión y contenido intestinal firme. El animal mostraba signos de deshidratación leve.</p>
                
                <p><strong>Estudios por imágenes:</strong> Las radiografías laterales y dorso-ventrales mostraron acumulación importante de contenido radiopaco en intestino grueso, compatible con impactación.</p>
                
                <p><strong>Tratamiento:</strong> Se implementó protocolo de fluidoterapia, baños tibios diarios, aumento de temperatura ambiental y administración de aceite mineral.</p>
                
                <p><strong>Monitoreo:</strong> Radiografías de control cada 3 días mostraron progresiva movilización del contenido intestinal.</p>
                
                <p><strong>Evolución:</strong> A los 8 días del tratamiento, el animal evacuó completamente y retomó la alimentación normal.</p>
            `,
    },
    caso4: {
      title: "Cirugía de Saco Aéreo en Loro",
      animal: "Loro amazónico (Amazona aestiva)",
      date: "5 de Junio, 2024",
      duration: "1 hora 45 minutos",
      diagnosis: "Ruptura traumática de saco aéreo cervical",
      procedure: "Reparación quirúrgica de saco aéreo",
      outcome: "Recuperación exitosa de función respiratoria",
      images: [
        "images/Captura de pantalla 2025-11-25 a la(s) 12.17.22 a.m..png",
      ],
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
    caso5: {
      title: "Obstrucción Intestinal en Hurón",
      animal: "Hurón doméstico (Mustela putorius)",
      date: "18 de Julio, 2024",
      duration: "2 horas",
      diagnosis: "Obstrucción intestinal por cuerpo extraño",
      procedure: "Enterotomía de urgencia",
      outcome: "Recuperación completa sin complicaciones",
      images: [
        "images/Captura de pantalla 2025-11-25 a la(s) 12.17.41 a.m..png",
      ],
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
    caso6: {
      title: "Chequeo Integral en Tortuga",
      animal: "Tortuga rusa (Testudo horsfieldii)",
      date: "12 de Agosto, 2024",
      duration: "30 minutos",
      diagnosis: "Evaluación de salud preventiva",
      procedure: "Examen físico completo y análisis laboratoriales",
      outcome: "Estado de salud excelente con recomendaciones preventivas",
      images: [
        "images/Captura de pantalla 2025-11-25 a la(s) 12.18.29 a.m..png",
      ],
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
  };

  // Add click event to case detail buttons
  caseDetailButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const caseId = this.getAttribute("data-case");
      const caseData = caseDetails[caseId];

      if (caseData) {
        modalContent.innerHTML = `
                    <h2>${caseData.title}</h2>
                    <div class="case-detail-meta">
                        <div class="meta-grid">
                            <div class="meta-item">
                                <strong>Animal:</strong> ${caseData.animal}
                            </div>
                            <div class="meta-item">
                                <strong>Fecha:</strong> ${caseData.date}
                            </div>
                            <div class="meta-item">
                                <strong>Duración:</strong> ${caseData.duration}
                            </div>
                            <div class="meta-item">
                                <strong>Diagnóstico:</strong> ${caseData.diagnosis}
                            </div>
                            <div class="meta-item">
                                <strong>Procedimiento:</strong> ${caseData.procedure}
                            </div>
                            <div class="meta-item">
                                <strong>Resultado:</strong> ${caseData.outcome}
                            </div>
                        </div>
                    </div>
                    
                    <div class="case-detail-content">
                        ${caseData.description}
                    </div>
                    
                    <div class="case-detail-footer">
                        <p><em>Este caso forma parte de la experiencia clínica documentada de la Dra. Siboney Pérez en medicina de animales exóticos.</em></p>
                    </div>
                `;

        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    });
  });

  // Close modal functionality
  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Escape key to close modal
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal.style.display === "block") {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  // Add CSS for case detail modal
  const style = document.createElement("style");
  style.textContent = `
        .case-detail-meta {
            background: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            margin: 20px 0;
        }
        
        .meta-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 15px;
        }
        
        .meta-item {
            padding: 10px 0;
            border-bottom: 1px solid #e9ecef;
        }
        
        .meta-item strong {
            color: #2c5aa0;
        }
        
        .case-detail-content {
            line-height: 1.8;
            color: #444;
        }
        
        .case-detail-content p {
            margin-bottom: 20px;
        }
        
        .case-detail-content strong {
            color: #2c3e50;
        }
        
        .case-detail-footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
            text-align: center;
        }
        
        .case-detail-footer em {
            color: #666;
        }
    `;

  document.head.appendChild(style);

  // Animate stat numbers
  const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumber = entry.target.querySelector(".stat-number");
        const finalNumber = parseInt(statNumber.textContent);
        let currentNumber = 0;
        const increment = finalNumber / 50;

        const updateNumber = () => {
          currentNumber += increment;
          if (currentNumber < finalNumber) {
            statNumber.textContent =
              Math.floor(currentNumber) + (finalNumber >= 100 ? "+" : "%");
            requestAnimationFrame(updateNumber);
          } else {
            statNumber.textContent =
              finalNumber + (statNumber.textContent.includes("%") ? "%" : "+");
          }
        };

        updateNumber();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".stat-card").forEach((card) => {
    observer.observe(card);
  });
});

// Add fade in animation for filtered items
const fadeInKeyframes = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

const styleSheet = document.createElement("style");
styleSheet.textContent = fadeInKeyframes;
document.head.appendChild(styleSheet);
