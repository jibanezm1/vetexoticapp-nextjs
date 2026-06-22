import type { CourseQuestion, CourseQuestionOption, CourseSpecies } from "./types";

type StoredSpecies = Omit<CourseSpecies, "enabled" | "enabledAt" | "enabledBy">;
type BaseQuestion = Omit<CourseQuestion, "type" | "minLength" | "options">;
type StaticSpecies = Omit<StoredSpecies, "questions"> & {
  questions: Record<string, BaseQuestion>;
};

export const COURSE_ID = "fauna-silvestre-2026";

export const COURSE_TITLE = "Clase práctica: Clínica de animales silvestres y mascotas exóticas";
export const COURSE_DESCRIPTION =
  "Práctico interactivo por especies. Cada alumno responde preguntas clínicas de rehabilitación, medicina de la conservación, patologías, tratamientos y reinserción.";

const BASE_SPECIES_DATA: Record<string, StaticSpecies> = {
  pinguino: {
    id: "pinguino",
    name: "Pingüino",
    emoji: "🐧",
    order: 1,
    caseText:
      "Llega aviso de un pingüino encontrado en una playa. Está quieto, no huye, tiene plumas sucias, baja condición corporal y fue manipulado por turistas. Algunos alumnos proponen hidratarlo, otros liberarlo de inmediato porque 'es normal que esté en la playa'.",
    keyConcept:
      "El pingüino no se libera porque se ve mejor; se libera cuando puede sobrevivir en el mar sin asistencia.",
    questions: {
      r1: {
        id: "r1",
        category: "Rehabilitación",
        text: "Un pingüino aparece quieto en la playa. ¿Eso significa siempre que está enfermo?",
        expectedAnswer:
          "No necesariamente. Puede estar descansando o en una etapa normal, pero si está letárgico, con baja respuesta, flaco, herido, con plumaje contaminado o sin capacidad de desplazarse, debe considerarse un posible varamiento o caso clínico que requiere evaluación especializada.",
        citation: {
          source: "SERNAPESCA - Rescate y conservación",
          url: "https://www.sernapesca.cl/area-trabajo/rescate-y-conservacion/",
        },
        order: 1,
      },
      r2: {
        id: "r2",
        category: "Rehabilitación",
        text: "¿Qué observarías antes de tocarlo?",
        expectedAnswer:
          "Nivel de alerta, postura, respiración, condición corporal, presencia de heridas, contaminación del plumaje, respuesta al entorno y si hay otros animales afectados en la zona. La evaluación inicial a distancia reduce estrés y ayuda a decidir si requiere intervención.",
        citation: {
          source: "Manual básico operacional de rescate y rehabilitación de fauna silvestre",
          url: "https://www.fia.cl/wp-content/uploads/2019/01/Manual_basico_Operacional_Rescate_y_rehabilitacion_silvestre.pdf",
        },
        order: 2,
      },
      r3: {
        id: "r3",
        category: "Rehabilitación",
        text: "¿Cuál es el primer objetivo en rehabilitación?",
        expectedAnswer:
          "Estabilizar antes de manipular en exceso: reducir estrés, controlar temperatura, evaluar hidratación y condición general, y evitar procedimientos largos antes de que el animal esté clínicamente estable.",
        citation: {
          source: "Jessop & Healy - Oiled seabirds rehabilitation material",
          url: "https://seabirdrescue.org.au/wp-content/uploads/2022/08/olied-seabirds-jessop-and-healy.pdf",
        },
        order: 3,
      },
      r4: {
        id: "r4",
        category: "Rehabilitación",
        text: "¿Por qué es peligroso manipular demasiado a un pingüino silvestre?",
        expectedAnswer:
          "Porque el estrés puede agravar su condición. Además, la manipulación inadecuada puede causar lesiones, alterar la termorregulación, empeorar la deshidratación o aumentar el riesgo de aspiración si se intenta alimentar sin criterio.",
        citation: {
          source: "Minimum Standards for Wildlife Rehabilitation",
          url: "https://myodfw.com/sites/default/files/2026-03/MinimumStandards3rdEdition.pdf",
        },
        order: 4,
      },
      mc1: {
        id: "mc1",
        category: "Medicina de la Conservación",
        text: "¿Qué información de conservación puede entregar un pingüino varado?",
        expectedAnswer:
          "Puede indicar problemas ambientales o poblacionales: contaminación, interacción con pesquerías, falta de alimento, enfermedad, eventos climáticos o mortalidad inusual. La investigación de varamientos permite detectar causas ambientales o sanitarias más amplias.",
        citation: {
          source: "SERNAPESCA - Investigación de varamiento masivo",
          url: "https://www.sernapesca.cl/noticias/sernapesca-investiga-causas-de-varamiento-masivo-en-playas-de-concon/",
        },
        order: 5,
      },
      mc2: {
        id: "mc2",
        category: "Medicina de la Conservación",
        text: "¿Por qué no basta con atender al individuo?",
        expectedAnswer:
          "Porque un caso individual puede ser parte de un evento mayor. Registrar lugar, fecha, condición corporal, lesiones, contaminación y número de animales afectados ayuda a vigilancia sanitaria y conservación.",
        citation: {
          source: "SERNAPESCA - Investigación de varamiento masivo",
          url: "https://www.sernapesca.cl/noticias/sernapesca-investiga-causas-de-varamiento-masivo-en-playas-de-concon/",
        },
        order: 6,
      },
      mc3: {
        id: "mc3",
        category: "Medicina de la Conservación",
        text: "¿Qué amenazas humanas son relevantes para pingüinos?",
        expectedAnswer:
          "Captura incidental en pesquerías, contaminación marina, perturbación de sitios de nidificación, competencia por alimento y eventos ambientales. Reducir la mortalidad por pesca incidental es clave para la resiliencia de poblaciones de pingüinos.",
        citation: {
          source: "Trathan et al. / Endangered Species Research - Penguin conservation and bycatch",
          url: "https://www.int-res.com/articles/esr2017/34/n034p373.pdf",
        },
        order: 7,
      },
      p1: {
        id: "p1",
        category: "Patologías",
        text: "¿Cuáles son los principales diagnósticos diferenciales?",
        expectedAnswer:
          "Desnutrición, deshidratación, hipotermia, trauma, contaminación por hidrocarburos u otros aceites, neumonía, parasitismo, heridas e ingestión de cuerpos extraños.",
        citation: {
          source: "SANCCOB - Prognostic indicators and rehabilitation outcomes in African penguins",
          url: "https://sanccob.co.za/wp-content/uploads/2021/10/Prognostic_Indicators_RehabOutcomes_adultAfricanPenguuins.pdf",
        },
        order: 8,
      },
      p2: {
        id: "p2",
        category: "Patologías",
        text: "¿Qué problema genera el plumaje contaminado con aceite?",
        expectedAnswer:
          "El plumaje pierde impermeabilidad y capacidad aislante, lo que puede provocar pérdida de calor, agotamiento, incapacidad para nadar y dificultad para alimentarse.",
        citation: {
          source: "Jessop & Healy - Oiled seabirds rehabilitation material",
          url: "https://seabirdrescue.org.au/wp-content/uploads/2022/08/olied-seabirds-jessop-and-healy.pdf",
        },
        order: 9,
      },
      p3: {
        id: "p3",
        category: "Patologías",
        text: "¿Qué signos harían sospechar enfermedad respiratoria?",
        expectedAnswer:
          "Respiración con esfuerzo, decaimiento, descarga nasal, sonidos respiratorios anormales, intolerancia al manejo y postura anormal.",
        citation: {
          source: "Manual básico operacional de rescate y rehabilitación de fauna silvestre",
          url: "https://www.fia.cl/wp-content/uploads/2019/01/Manual_basico_Operacional_Rescate_y_rehabilitacion_silvestre.pdf",
        },
        order: 10,
      },
      t1: {
        id: "t1",
        category: "Tratamientos",
        text: "¿Qué tratamiento general priorizarías al ingreso?",
        expectedAnswer:
          "Ambiente tranquilo, control térmico, hidratación según evaluación, analgesia si hay dolor, soporte nutricional progresivo y examen clínico completo.",
        citation: {
          source: "Minimum Standards for Wildlife Rehabilitation",
          url: "https://myodfw.com/sites/default/files/2026-03/MinimumStandards3rdEdition.pdf",
        },
        order: 11,
      },
      t2: {
        id: "t2",
        category: "Tratamientos",
        text: "¿Le darías antibiótico a todos los pingüinos varados?",
        expectedAnswer:
          "No. El antibiótico debe indicarse según hallazgos clínicos: heridas contaminadas, infección sospechada, neumonía u otra causa justificada.",
        citation: {
          source: "Minimum Standards for Wildlife Rehabilitation",
          url: "https://myodfw.com/sites/default/files/2026-03/MinimumStandards3rdEdition.pdf",
        },
        order: 12,
      },
      t3: {
        id: "t3",
        category: "Tratamientos",
        text: "¿Lavarías inmediatamente a un pingüino con aceite?",
        expectedAnswer:
          "No necesariamente. Primero se estabiliza; el lavado puede ser largo y estresante. Debe realizarse cuando el animal está en condiciones de tolerarlo y luego se debe confirmar impermeabilidad antes de liberarlo.",
        citation: {
          source: "Jessop & Healy - Oiled seabirds rehabilitation material",
          url: "https://seabirdrescue.org.au/wp-content/uploads/2022/08/olied-seabirds-jessop-and-healy.pdf",
        },
        order: 13,
      },
      ri1: {
        id: "ri1",
        category: "Reinserción",
        text: "¿Cuándo puede liberarse?",
        expectedAnswer:
          "Cuando tiene buena condición corporal, plumaje impermeable, capacidad de nadar, termorregular, alimentarse y responder adecuadamente al ambiente.",
        citation: {
          source: "Jessop & Healy - Oiled seabirds rehabilitation material",
          url: "https://seabirdrescue.org.au/wp-content/uploads/2022/08/olied-seabirds-jessop-and-healy.pdf",
        },
        order: 14,
      },
      ri2: {
        id: "ri2",
        category: "Reinserción",
        text: "¿Basta con que coma en cautiverio?",
        expectedAnswer:
          "No. Comer en cautiverio no asegura supervivencia; debe demostrar funcionalidad para vida libre: nadar, mantener impermeabilidad, orientarse, alimentarse y no depender del humano.",
        citation: {
          source: "Jessop & Healy - Oiled seabirds rehabilitation material",
          url: "https://seabirdrescue.org.au/wp-content/uploads/2022/08/olied-seabirds-jessop-and-healy.pdf",
        },
        order: 15,
      },
      ri3: {
        id: "ri3",
        category: "Reinserción",
        text: "¿Qué impediría su liberación?",
        expectedAnswer:
          "Lesiones permanentes incompatibles con nado o alimentación, enfermedad activa, mala condición corporal, plumaje no impermeable, dependencia humana o incapacidad de sobrevivir en el mar.",
        citation: {
          source: "Minimum Standards for Wildlife Rehabilitation",
          url: "https://myodfw.com/sites/default/files/2026-03/MinimumStandards3rdEdition.pdf",
        },
        order: 16,
      },
    },
  },

  tucuquere: {
    id: "tucuquere",
    name: "Tucúquere",
    emoji: "🦉",
    order: 2,
    caseText:
      "Ingresa un tucúquere encontrado al borde de una carretera. Está alerta, pero no vuela. Presenta una posible lesión en ala y se muestra agresivo al manejo.",
    keyConcept: "En un ave rapaz, sobrevivir no es suficiente: debe poder cazar.",
    questions: {
      r1: {
        id: "r1",
        category: "Rehabilitación",
        text: "Un tucúquere no puede volar. ¿Por qué es grave?",
        expectedAnswer:
          "Porque una rapaz depende del vuelo para cazar, escapar y sobrevivir. La liberación exige retorno completo a condición física, vuelo y capacidad de caza.",
        citation: {
          source: "NSW Environment - Birds of prey initial treatment and care guidelines",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 1,
      },
      r2: {
        id: "r2",
        category: "Rehabilitación",
        text: "¿Qué debe evaluarse primero?",
        expectedAnswer:
          "Estado general, respiración, hidratación, condición corporal, alas, patas, garras, pico, ojos y signos de trauma. La evaluación inicial debe priorizar estabilización, contención segura y reducción de estrés.",
        citation: {
          source: "NSW Environment - Birds of prey initial treatment and care guidelines",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 2,
      },
      r3: {
        id: "r3",
        category: "Rehabilitación",
        text: "¿Por qué no sirve liberarlo si se ve bien pero vuela mal?",
        expectedAnswer:
          "Porque un vuelo deficiente impide caza, defensa territorial, escape y supervivencia. Debe volar correctamente y tener condición física completa antes de liberarse.",
        citation: {
          source: "NSW Environment - Birds of prey initial treatment and care guidelines",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 3,
      },
      mc1: {
        id: "mc1",
        category: "Medicina de la Conservación",
        text: "¿Qué amenazas humanas pueden explicar su ingreso?",
        expectedAnswer:
          "Atropellos, choques, electrocución, enredo en materiales humanos, ataques de perros o gatos, pérdida de hábitat e intoxicación por rodenticidas o plaguicidas.",
        citation: {
          source: "PMC - Anthropogenic threats and anticoagulant exposure in owls",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10403058/",
        },
        order: 4,
      },
      mc2: {
        id: "mc2",
        category: "Medicina de la Conservación",
        text: "¿Por qué una intoxicación en una rapaz importa para conservación?",
        expectedAnswer:
          "Porque puede revelar contaminación o uso de tóxicos en la cadena trófica. Los búhos funcionan como depredadores y también como centinelas de exposición ambiental a rodenticidas.",
        citation: {
          source: "PMC - Anthropogenic threats and anticoagulant exposure in owls",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10403058/",
        },
        order: 5,
      },
      mc3: {
        id: "mc3",
        category: "Medicina de la Conservación",
        text: "¿Qué rol ecológico cumple el tucúquere?",
        expectedAnswer:
          "Es un depredador que consume principalmente pequeños y medianos vertebrados, especialmente mamíferos, por lo que participa en la regulación de poblaciones presa.",
        citation: {
          source: "SciELO Chile - Dieta del tucúquere en Chile",
          url: "https://www.scielo.cl/article_plus.php?lng=es&pid=S0718-686X2018000300067&tlng=en",
        },
        order: 6,
      },
      p1: {
        id: "p1",
        category: "Patologías",
        text: "¿Qué patologías sospechas si fue encontrado al borde de una carretera?",
        expectedAnswer:
          "Trauma por atropello o golpe, fracturas, luxaciones, contusiones, trauma craneal, lesiones oculares, heridas, daño de plumas, shock o debilidad secundaria.",
        citation: {
          source: "NSW Environment - Birds of prey initial treatment and care guidelines",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 7,
      },
      p2: {
        id: "p2",
        category: "Patologías",
        text: "¿Qué sospechas si está débil, incoordinado o con sangrado?",
        expectedAnswer:
          "Trauma neurológico, intoxicación, especialmente anticoagulantes, shock o enfermedad sistémica.",
        citation: {
          source: "PMC - Anthropogenic threats and anticoagulant exposure in owls",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10403058/",
        },
        order: 8,
      },
      p3: {
        id: "p3",
        category: "Patologías",
        text: "¿Por qué los ojos son críticos en una rapaz?",
        expectedAnswer:
          "Porque la visión es esencial para cazar, orientarse, posarse y evitar obstáculos. Una lesión ocular puede impedir la reinserción aunque el resto del cuerpo se recupere.",
        citation: {
          source: "NSW Environment - Birds of prey initial treatment and care guidelines",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 9,
      },
      t1: {
        id: "t1",
        category: "Tratamientos",
        text: "¿Cuál es el manejo inicial recomendado?",
        expectedAnswer:
          "Contención segura, ambiente tranquilo y oscuro, mínima manipulación, estabilización, analgesia si hay dolor, hidratación si corresponde y evaluación veterinaria con imágenes si se sospecha fractura.",
        citation: {
          source: "NSW Environment - Birds of prey initial treatment and care guidelines",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 10,
      },
      t2: {
        id: "t2",
        category: "Tratamientos",
        text: "¿Qué puede requerir una fractura de ala?",
        expectedAnswer:
          "Según localización y gravedad: inmovilización, vendaje, cirugía, analgesia, reposo controlado y luego rehabilitación progresiva en jaula de vuelo.",
        citation: {
          source: "Department of Conservation NZ - Raptors rehabilitation guide",
          url: "https://www.doc.govt.nz/globalassets/documents/our-work/wildlife-health/raptors-rehabilitation-guide.pdf",
        },
        order: 11,
      },
      t3: {
        id: "t3",
        category: "Tratamientos",
        text: "¿Por qué la rehabilitación no termina cuando consolida la fractura?",
        expectedAnswer:
          "Porque debe recuperar musculatura, coordinación, resistencia, vuelo simétrico, despegue, aterrizaje, maniobra y capacidad de caza.",
        citation: {
          source: "NSW Environment - Birds of prey initial treatment and care guidelines",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 12,
      },
      ri1: {
        id: "ri1",
        category: "Reinserción",
        text: "¿Qué debe demostrar antes de liberarse?",
        expectedAnswer:
          "Vuelo fuerte, simétrico y sostenido; capacidad de despegar, aterrizar, ganar altura, maniobrar, posarse, cazar, mantener buena condición corporal y mostrar conducta silvestre.",
        citation: {
          source: "Department of Conservation NZ - Raptors rehabilitation guide",
          url: "https://www.doc.govt.nz/globalassets/documents/our-work/wildlife-health/raptors-rehabilitation-guide.pdf",
        },
        order: 13,
      },
      ri2: {
        id: "ri2",
        category: "Reinserción",
        text: "¿Puede liberarse si come alimento entregado por humanos pero no caza?",
        expectedAnswer:
          "No. Debe ser capaz de forrajear y cazar de manera independiente; en rapaces, la capacidad de caza es un criterio central de liberación.",
        citation: {
          source: "NSW Environment - Birds of prey initial treatment and care guidelines",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 14,
      },
      ri3: {
        id: "ri3",
        category: "Reinserción",
        text: "¿Qué factores impedirían la liberación?",
        expectedAnswer:
          "Vuelo deficiente, lesión ocular relevante, fractura mal consolidada, incapacidad de cazar, habituación humana, enfermedad activa o lesión permanente incompatible con vida libre.",
        citation: {
          source: "Department of Conservation NZ - Raptors rehabilitation guide",
          url: "https://www.doc.govt.nz/globalassets/documents/our-work/wildlife-health/raptors-rehabilitation-guide.pdf",
        },
        order: 15,
      },
    },
  },

  pudu: {
    id: "pudu",
    name: "Pudú",
    emoji: "🦌",
    order: 3,
    caseText:
      "Un pudú juvenil es encontrado en una zona rural. Los vecinos dicen que fue perseguido por perros. Presenta estrés marcado, heridas superficiales y dificultad para mantenerse tranquilo. Algunos alumnos quieren manipularlo para revisar todo de inmediato.",
    keyConcept: "En pudú, muchas veces el enemigo clínico principal no es solo la mordida: es el estrés.",
    questions: {
      r1: {
        id: "r1",
        category: "Rehabilitación",
        text: "Un pudú llega después de ser perseguido por perros. ¿Qué te preocupa primero?",
        expectedAnswer:
          "Estrés severo, shock, heridas por mordida, trauma y riesgo de miopatía por captura. La miopatía por captura es una condición inducida por estrés o esfuerzo en animales silvestres capturados, y puede ser grave o fatal.",
        citation: {
          source: "PMC - Capture myopathy review",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6612673/",
        },
        order: 1,
      },
      r2: {
        id: "r2",
        category: "Rehabilitación",
        text: "¿Por qué no conviene manipularlo repetidamente?",
        expectedAnswer:
          "Porque el estrés, la persecución y la restricción física pueden agravar el cuadro, desencadenar miopatía por captura y comprometer el pronóstico.",
        citation: {
          source: "PMC - Capture myopathy review",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6612673/",
        },
        order: 2,
      },
      r3: {
        id: "r3",
        category: "Rehabilitación",
        text: "¿Qué ambiente requiere al inicio?",
        expectedAnswer:
          "Ambiente tranquilo, con poco ruido, baja luz, mínima presencia humana, temperatura adecuada, sin perros ni estímulos, y manipulación solo cuando sea necesaria.",
        citation: {
          source: "SAG - Criterios técnicos para mantención de fauna silvestre en cautiverio",
          url: "https://www.sag.gob.cl/sites/default/files/criterios_tec_mantencion_fauna_silv_cautiverio.pdf",
        },
        order: 3,
      },
      mc1: {
        id: "mc1",
        category: "Medicina de la Conservación",
        text: "¿Qué amenaza de conservación aparece claramente?",
        expectedAnswer:
          "Los perros. En pudú, estudios en Chile identifican ataques de perros y atropellos como causas frecuentes de ingreso a centros de rehabilitación y mortalidad, además de pérdida de bosque y posible caza furtiva.",
        citation: {
          source: "Oryx / Cambridge - Mortality sources for Pudu puda in Chile",
          url: "https://www.cambridge.org/core/journals/oryx/article/evaluating-mortality-sources-for-the-vulnerable-pudu-pudu-puda-in-chile-implications-for-the-conservation-of-a-threatened-deer/388770F8DB1BC84E20873C7CFCF12415",
        },
        order: 4,
      },
      mc2: {
        id: "mc2",
        category: "Medicina de la Conservación",
        text: "¿Qué mensaje educativo deriva del caso?",
        expectedAnswer:
          "Tenencia responsable: no dejar perros sueltos, evitar persecución de fauna, no intentar criar pudúes, avisar a la autoridad y proteger hábitats con cobertura vegetal.",
        citation: {
          source: "Oryx / Cambridge - Mortality sources for Pudu puda in Chile",
          url: "https://www.cambridge.org/core/journals/oryx/article/evaluating-mortality-sources-for-the-vulnerable-pudu-pudu-puda-in-chile-implications-for-the-conservation-of-a-threatened-deer/388770F8DB1BC84E20873C7CFCF12415",
        },
        order: 5,
      },
      mc3: {
        id: "mc3",
        category: "Medicina de la Conservación",
        text: "¿Por qué no debe transformarse en mascota?",
        expectedAnswer:
          "Porque es fauna silvestre, tiene requerimientos biológicos específicos, puede estresarse gravemente, perder conducta natural y quedar inhabilitado para volver a vida libre. Los centros de rehabilitación son espacios de recuperación y tránsito, no de domesticación.",
        citation: {
          source: "SAG - Ley de Caza",
          url: "https://www.sag.cl/sites/default/files/ley_de_caza_2017.pdf",
        },
        order: 6,
      },
      p1: {
        id: "p1",
        category: "Patologías",
        text: "¿Qué patologías sospechas tras ataque de perros?",
        expectedAnswer:
          "Heridas por mordida, infección secundaria, fracturas, trauma torácico o abdominal, shock, dolor, deshidratación y miopatía por captura.",
        citation: {
          source: "Universidad Andrés Bello / Oryx - Mortality sources for Pudu puda",
          url: "https://researchers.unab.cl/es/publications/evaluating-mortality-sources-for-the-vulnerable-pudu-pudu-puda-in/",
        },
        order: 7,
      },
      p2: {
        id: "p2",
        category: "Patologías",
        text: "¿Qué signos indicarían gravedad?",
        expectedAnswer:
          "Decaimiento marcado, dificultad respiratoria, sangrado, incapacidad de mantenerse de pie, mucosas alteradas, hipotermia, dolor intenso, fracturas evidentes o heridas profundas.",
        citation: {
          source: "PMC - Capture myopathy review",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6612673/",
        },
        order: 8,
      },
      p3: {
        id: "p3",
        category: "Patologías",
        text: "¿Por qué una mordida pequeña puede ser grave?",
        expectedAnswer:
          "Porque puede haber daño profundo, contaminación bacteriana, lesiones musculares o perforaciones no evidentes externamente.",
        citation: {
          source: "Universidad Andrés Bello / Oryx - Mortality sources for Pudu puda",
          url: "https://researchers.unab.cl/es/publications/evaluating-mortality-sources-for-the-vulnerable-pudu-pudu-puda-in/",
        },
        order: 9,
      },
      t1: {
        id: "t1",
        category: "Tratamientos",
        text: "¿Cuál es el tratamiento inicial general?",
        expectedAnswer:
          "Reducir estrés, estabilizar, controlar dolor, evaluar hidratación, tratar heridas, prevenir infección cuando haya mordidas contaminadas, evaluar fracturas o trauma interno y mantenerlo en un ambiente seguro y silencioso.",
        citation: {
          source: "SAG - Criterios técnicos para mantención de fauna silvestre en cautiverio",
          url: "https://www.sag.gob.cl/sites/default/files/criterios_tec_mantencion_fauna_silv_cautiverio.pdf",
        },
        order: 10,
      },
      t2: {
        id: "t2",
        category: "Tratamientos",
        text: "¿Qué error común debe evitarse?",
        expectedAnswer:
          "Manipularlo muchas veces, alimentarlo de forma improvisada, mantenerlo cerca de personas o perros, intentar domesticarlo o liberarlo sin evaluación.",
        citation: {
          source: "SAG - Registro Nacional de Tenedores de Fauna Silvestre",
          url: "https://www.sag.gob.cl/ambitos-de-accion/registro-nacional-de-tenedores-de-fauna-silvestre-rntfs",
        },
        order: 11,
      },
      t3: {
        id: "t3",
        category: "Tratamientos",
        text: "¿Por qué la alimentación debe ser cuidadosa?",
        expectedAnswer:
          "Porque una dieta inadecuada puede causar problemas digestivos, desbalance nutricional, estrés y dependencia humana. La nutrición debe respetar sus requerimientos como herbívoro silvestre.",
        citation: {
          source: "SAG - Criterios técnicos para mantención de fauna silvestre en cautiverio",
          url: "https://www.sag.gob.cl/sites/default/files/criterios_tec_mantencion_fauna_silv_cautiverio.pdf",
        },
        order: 12,
      },
      ri1: {
        id: "ri1",
        category: "Reinserción",
        text: "¿Qué debe cumplir para ser liberado?",
        expectedAnswer:
          "Desplazamiento normal, buena condición corporal, heridas resueltas, conducta de alerta y escape, capacidad de alimentarse solo, baja habituación humana y sitio de liberación adecuado.",
        citation: {
          source: "SAG - Ley de Caza",
          url: "https://www.sag.cl/sites/default/files/ley_de_caza_2017.pdf",
        },
        order: 13,
      },
      ri2: {
        id: "ri2",
        category: "Reinserción",
        text: "¿Cuándo no debería liberarse?",
        expectedAnswer:
          "Si tiene lesiones permanentes incompatibles con vida libre, dependencia humana, incapacidad de desplazarse, enfermedad activa, conducta excesivamente dócil o si el sitio tiene riesgo inmediato alto, como perros sueltos o tránsito intenso.",
        citation: {
          source: "Oryx / Cambridge - Mortality sources for Pudu puda in Chile",
          url: "https://www.cambridge.org/core/journals/oryx/article/evaluating-mortality-sources-for-the-vulnerable-pudu-pudu-puda-in-chile-implications-for-the-conservation-of-a-threatened-deer/388770F8DB1BC84E20873C7CFCF12415",
        },
        order: 14,
      },
      ri3: {
        id: "ri3",
        category: "Reinserción",
        text: "¿Por qué importa el lugar de liberación?",
        expectedAnswer:
          "Porque debe ser un hábitat adecuado y seguro. Liberarlo en una zona con perros sueltos, tránsito intenso o poca cobertura vegetal aumenta el riesgo de muerte.",
        citation: {
          source: "Oryx / Cambridge - Mortality sources for Pudu puda in Chile",
          url: "https://www.cambridge.org/core/journals/oryx/article/evaluating-mortality-sources-for-the-vulnerable-pudu-pudu-puda-in-chile-implications-for-the-conservation-of-a-threatened-deer/388770F8DB1BC84E20873C7CFCF12415",
        },
        order: 15,
      },
    },
  },

  lobo_marino: {
    id: "lobo_marino",
    name: "Lobo marino",
    emoji: "🦭",
    order: 4,
    caseText:
      "Se reporta un lobo marino juvenil en la playa. Está solo. Personas se acercan para tomar fotos. Algunos creen que hay que devolverlo al mar de inmediato. Otros dicen que hay que capturarlo porque está varado.",
    keyConcept:
      "No todo lobo marino en la playa necesita rescate; muchas veces la mejor intervención inicial es distancia, evaluación y aviso a la autoridad.",
    questions: {
      r1: {
        id: "r1",
        category: "Rehabilitación",
        text: "Un lobo marino está acostado en la playa. ¿Eso significa que está varado?",
        expectedAnswer:
          "No necesariamente. Los pinnípedos necesitan zonas secas de descanso o haul-out; por eso, estar en playa puede ser normal. Se debe evaluar a distancia si hay heridas, enmallamiento, debilidad extrema, alteración respiratoria o riesgo por interacción humana.",
        citation: {
          source: "PMC - Pinniped haul-out and disease ecology",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7152169/",
        },
        order: 1,
      },
      r2: {
        id: "r2",
        category: "Rehabilitación",
        text: "¿Qué signos justificarían intervención?",
        expectedAnswer:
          "Heridas, enmallamiento, sangrado, dificultad respiratoria, debilidad extrema, desorientación, incapacidad de desplazarse, cría comprometida o riesgo por ubicación.",
        citation: {
          source: "SERNAPESCA - Rescate y conservación",
          url: "https://www.sernapesca.cl/area-trabajo/rescate-y-conservacion/",
        },
        order: 2,
      },
      r3: {
        id: "r3",
        category: "Rehabilitación",
        text: "¿Por qué no se debe empujar al mar?",
        expectedAnswer:
          "Porque puede estar descansando, enfermo o lesionado; forzarlo al agua puede agravar estrés, impedir evaluación y comprometer su seguridad.",
        citation: {
          source: "DFO Canada - Marine mammal release and rehabilitation criteria",
          url: "https://publications.gc.ca/collections/collection_2018/mpo-dfo/fs70-5/Fs70-5-2018-030-eng.pdf",
        },
        order: 3,
      },
      mc1: {
        id: "mc1",
        category: "Medicina de la Conservación",
        text: "¿Qué amenazas humanas pueden afectar a lobos marinos?",
        expectedAnswer:
          "Enmallamiento en redes o líneas de pesca, basura marina, contaminación, interacción con pesquerías, disturbio humano y pérdida o alteración de zonas de descanso.",
        citation: {
          source: "NOAA Fisheries - Pinniped entanglement in marine debris",
          url: "https://www.fisheries.noaa.gov/alaska/marine-life-distress/pinniped-entanglement-marine-debris",
        },
        order: 4,
      },
      mc2: {
        id: "mc2",
        category: "Medicina de la Conservación",
        text: "¿Qué información debe registrarse?",
        expectedAnswer:
          "Ubicación exacta, fecha, tamaño aproximado, conducta, presencia de heridas, enmallamiento, interacción con personas o perros, fotos a distancia y si hay más animales afectados.",
        citation: {
          source: "DFO Canada - Marine mammal release and rehabilitation criteria",
          url: "https://publications.gc.ca/collections/collection_2018/mpo-dfo/fs70-5/Fs70-5-2018-030-eng.pdf",
        },
        order: 5,
      },
      mc3: {
        id: "mc3",
        category: "Medicina de la Conservación",
        text: "¿Por qué el público puede empeorar el caso?",
        expectedAnswer:
          "Porque acercarse, tocar, alimentar o intentar mover al animal aumenta estrés, riesgo de mordidas, riesgo sanitario y dificulta el trabajo de equipos entrenados.",
        citation: {
          source: "SERNAPESCA - Rescate y conservación",
          url: "https://www.sernapesca.cl/area-trabajo/rescate-y-conservacion/",
        },
        order: 6,
      },
      p1: {
        id: "p1",
        category: "Patologías",
        text: "¿Cuáles son los problemas más probables?",
        expectedAnswer:
          "Desnutrición, deshidratación, heridas por redes o líneas de pesca, trauma, infecciones, neumonía, lesiones cutáneas, agotamiento, parasitismo o separación materna en crías.",
        citation: {
          source: "NOAA - Marine mammal rehabilitation standards",
          url: "https://repository.library.noaa.gov/view/noaa/48555/noaa_48555_DS1.pdf",
        },
        order: 7,
      },
      p2: {
        id: "p2",
        category: "Patologías",
        text: "¿Qué sospechas si tiene una línea de pesca alrededor del cuello?",
        expectedAnswer:
          "Enmallamiento o constricción, con riesgo de heridas profundas, infección, dolor, dificultad para alimentarse o respirar y deterioro progresivo.",
        citation: {
          source: "NOAA Fisheries - Pinniped entanglement in marine debris",
          url: "https://www.fisheries.noaa.gov/alaska/marine-life-distress/pinniped-entanglement-marine-debris",
        },
        order: 8,
      },
      p3: {
        id: "p3",
        category: "Patologías",
        text: "¿Qué signos respiratorios serían preocupantes?",
        expectedAnswer:
          "Respiración con esfuerzo, secreciones, tos, letargia, postura anormal, intolerancia al movimiento o sonidos respiratorios anormales.",
        citation: {
          source: "NOAA - Marine mammal rehabilitation standards",
          url: "https://repository.library.noaa.gov/view/noaa/48555/noaa_48555_DS1.pdf",
        },
        order: 9,
      },
      t1: {
        id: "t1",
        category: "Tratamientos",
        text: "¿Cuál es la primera medida ante un lobo marino en playa?",
        expectedAnswer:
          "Evaluar a distancia, mantener a las personas alejadas, evitar manipulación, delimitar el área si es posible y contactar a SERNAPESCA.",
        citation: {
          source: "SERNAPESCA - Rescate y conservación",
          url: "https://www.sernapesca.cl/area-trabajo/rescate-y-conservacion/",
        },
        order: 10,
      },
      t2: {
        id: "t2",
        category: "Tratamientos",
        text: "¿Qué tratamientos generales podría requerir si está comprometido?",
        expectedAnswer:
          "Estabilización, hidratación, soporte nutricional, manejo del dolor, tratamiento de heridas, retiro seguro de redes o líneas por personal capacitado, manejo de infecciones y evaluación respiratoria.",
        citation: {
          source: "NOAA - Marine mammal rehabilitation standards",
          url: "https://repository.library.noaa.gov/view/noaa/48555/noaa_48555_DS1.pdf",
        },
        order: 11,
      },
      t3: {
        id: "t3",
        category: "Tratamientos",
        text: "¿Por qué no debe ser manejado por cualquier persona?",
        expectedAnswer:
          "Porque son animales grandes y fuertes, pueden morder, estresarse gravemente y requerir técnicas de contención, bioseguridad y evaluación veterinaria especializada.",
        citation: {
          source: "NOAA - Marine mammal rehabilitation standards",
          url: "https://repository.library.noaa.gov/view/noaa/48555/noaa_48555_DS1.pdf",
        },
        order: 12,
      },
      ri1: {
        id: "ri1",
        category: "Reinserción",
        text: "¿Qué criterios debe cumplir para volver al mar?",
        expectedAnswer:
          "Buena condición corporal, capacidad de nadar, respiración normal, heridas resueltas o controladas, conducta alerta, capacidad de alimentarse y ausencia de dependencia humana.",
        citation: {
          source: "DFO Canada - Marine mammal release and rehabilitation criteria",
          url: "https://publications.gc.ca/collections/collection_2018/mpo-dfo/fs70-5/Fs70-5-2018-030-eng.pdf",
        },
        order: 13,
      },
      ri2: {
        id: "ri2",
        category: "Reinserción",
        text: "¿Puede liberarse si aún tiene una herida importante?",
        expectedAnswer:
          "No si la herida compromete movilidad, alimentación, respiración, termorregulación o tiene riesgo alto de infección. La decisión debe basarse en examen veterinario, pronóstico y riesgo para el individuo y la población silvestre.",
        citation: {
          source: "DFO Canada - Marine mammal release and rehabilitation criteria",
          url: "https://publications.gc.ca/collections/collection_2018/mpo-dfo/fs70-5/Fs70-5-2018-030-eng.pdf",
        },
        order: 14,
      },
      ri3: {
        id: "ri3",
        category: "Reinserción",
        text: "¿Qué factores impedirían la reinserción?",
        expectedAnswer:
          "Debilidad extrema, enfermedad activa, incapacidad de nadar, heridas graves, enmallamiento no resuelto, dependencia humana o riesgo alto inmediato en la zona de liberación.",
        citation: {
          source: "DFO Canada - Marine mammal release and rehabilitation criteria",
          url: "https://publications.gc.ca/collections/collection_2018/mpo-dfo/fs70-5/Fs70-5-2018-030-eng.pdf",
        },
        order: 15,
      },
    },
  },
};

const MULTIPLE_CHOICE_OPTIONS: Record<string, Record<string, CourseQuestionOption[]>> = {
  pinguino: {
    r2: [
      { id: "a", text: "Nivel de alerta, postura, respiración, condición corporal y estado del plumaje antes de intervenir.", isCorrect: true },
      { id: "b", text: "Solo confirmar si pertenece a una colonia cercana y devolverlo al mar de inmediato.", isCorrect: false },
      { id: "c", text: "Tomar temperatura cloacal y ofrecer alimento antes de observarlo a distancia.", isCorrect: false },
    ],
    r3: [
      { id: "a", text: "Lavar el plumaje y alimentar de inmediato para acelerar la liberación.", isCorrect: false },
      { id: "b", text: "Estabilizarlo primero: bajar estrés, controlar temperatura y evaluar hidratación antes de procedimientos largos.", isCorrect: true },
      { id: "c", text: "Mantenerlo activo para comprobar rápido si aún puede nadar.", isCorrect: false },
    ],
    mc2: [
      { id: "a", text: "Porque un solo individuo puede ser parte de un evento ambiental o sanitario mayor y debe registrarse.", isCorrect: true },
      { id: "b", text: "Porque los pingüinos varados siempre indican tráfico ilegal de fauna.", isCorrect: false },
      { id: "c", text: "Porque la conservación solo importa si el animal pertenece a una especie exótica.", isCorrect: false },
    ],
    mc3: [
      { id: "a", text: "Captura incidental, contaminación marina, perturbación de nidificación y cambios en disponibilidad de presas.", isCorrect: true },
      { id: "b", text: "Únicamente depredación natural por orcas y skúas; la acción humana no es relevante.", isCorrect: false },
      { id: "c", text: "Solo la deshidratación durante traslados terrestres dentro de centros de rescate.", isCorrect: false },
    ],
    p2: [
      { id: "a", text: "El aceite mejora la flotabilidad, pero dificulta secar el plumaje al salir del agua.", isCorrect: false },
      { id: "b", text: "El plumaje pierde impermeabilidad y aislamiento, lo que favorece hipotermia y dificulta nadar y alimentarse.", isCorrect: true },
      { id: "c", text: "El único problema clínico es que el ave deja de vocalizar por unas horas.", isCorrect: false },
    ],
    p3: [
      { id: "a", text: "Respiración con esfuerzo, descarga nasal, sonidos anormales y postura alterada.", isCorrect: true },
      { id: "b", text: "Solo diarrea y aumento del apetito.", isCorrect: false },
      { id: "c", text: "Únicamente plumaje seco y reacción agresiva al cuidador.", isCorrect: false },
    ],
    t2: [
      { id: "a", text: "Sí, porque todo pingüino varado debe recibir antibiótico preventivo amplio.", isCorrect: false },
      { id: "b", text: "No; se indica según hallazgos clínicos como heridas contaminadas o sospecha de infección.", isCorrect: true },
      { id: "c", text: "Solo si el animal ya recuperó peso y está listo para la liberación.", isCorrect: false },
    ],
    t3: [
      { id: "a", text: "Sí, porque el lavado inmediato reduce el estrés aunque el paciente esté inestable.", isCorrect: false },
      { id: "b", text: "No siempre; primero debe estabilizarse y luego comprobar impermeabilidad antes de liberarlo.", isCorrect: true },
      { id: "c", text: "Solo si el aceite está seco y el animal ya comió por sí solo.", isCorrect: false },
    ],
    ri2: [
      { id: "a", text: "Sí, comer en cautiverio es suficiente para asegurar supervivencia en el mar.", isCorrect: false },
      { id: "b", text: "No; además debe nadar, mantener impermeabilidad, orientarse y no depender de humanos.", isCorrect: true },
      { id: "c", text: "Sí, siempre que haya pasado al menos 24 horas sin vómitos.", isCorrect: false },
    ],
    ri3: [
      { id: "a", text: "Plumaje no impermeable, lesiones permanentes, mala condición corporal o dependencia humana.", isCorrect: true },
      { id: "b", text: "Haber permanecido más de una semana en rehabilitación.", isCorrect: false },
      { id: "c", text: "Que pertenezca a una especie costera y no oceánica.", isCorrect: false },
    ],
  },
  tucuquere: {
    r2: [
      { id: "a", text: "Estado general, respiración, hidratación, alas, patas, garras, pico y ojos con contención segura.", isCorrect: true },
      { id: "b", text: "Solo el peso corporal, porque las lesiones de ala se detectan después.", isCorrect: false },
      { id: "c", text: "Primero dejarlo cazar una presa viva para medir reflejos.", isCorrect: false },
    ],
    r3: [
      { id: "a", text: "Porque un vuelo deficiente impide cazar, escapar y sostenerse en vida libre.", isCorrect: true },
      { id: "b", text: "Porque las rapaces solo vuelan durante la época reproductiva.", isCorrect: false },
      { id: "c", text: "Porque cualquier ave que planea puede compensar con mayor agresividad territorial.", isCorrect: false },
    ],
    mc2: [
      { id: "a", text: "Porque los búhos pueden actuar como centinelas de exposición ambiental a rodenticidas.", isCorrect: true },
      { id: "b", text: "Porque toda intoxicación en rapaces implica necesariamente rabia.", isCorrect: false },
      { id: "c", text: "Porque la única fuente de tóxicos en búhos son plantas ornamentales urbanas.", isCorrect: false },
    ],
    mc3: [
      { id: "a", text: "Regular poblaciones presa, especialmente de pequeños y medianos vertebrados.", isCorrect: true },
      { id: "b", text: "Dispersar semillas de bosques templados mediante dieta frugívora estacional.", isCorrect: false },
      { id: "c", text: "Mantener playas libres de carroña marina.", isCorrect: false },
    ],
    p2: [
      { id: "a", text: "Trauma neurológico, intoxicación anticoagulante, shock o enfermedad sistémica.", isCorrect: true },
      { id: "b", text: "Solo un periodo normal de muda de plumas.", isCorrect: false },
      { id: "c", text: "Exceso de alimento previo a la captura.", isCorrect: false },
    ],
    p3: [
      { id: "a", text: "Porque la visión es esencial para cazar, orientarse, posarse y evitar obstáculos.", isCorrect: true },
      { id: "b", text: "Porque los ojos sirven solo para comunicación intraespecífica, no para la caza.", isCorrect: false },
      { id: "c", text: "Porque las lesiones oculares se compensan completamente con el oído.", isCorrect: false },
    ],
    t2: [
      { id: "a", text: "Puede requerir inmovilización, analgesia, cirugía y luego rehabilitación en jaula de vuelo.", isCorrect: true },
      { id: "b", text: "Solo reposo en una caja pequeña hasta que deje de vocalizar.", isCorrect: false },
      { id: "c", text: "Liberación temprana para que el ave termine de fortalecer el ala en terreno.", isCorrect: false },
    ],
    t3: [
      { id: "a", text: "Porque consolidar hueso basta; la coordinación y musculatura se recuperan solas después de liberar.", isCorrect: false },
      { id: "b", text: "Porque además debe recuperar vuelo simétrico, resistencia, maniobra y capacidad de caza.", isCorrect: true },
      { id: "c", text: "Porque en rapaces la prioridad final es solo tolerar la presencia humana.", isCorrect: false },
    ],
    ri2: [
      { id: "a", text: "Sí, si acepta presas entregadas por humanos puede liberarse de inmediato.", isCorrect: false },
      { id: "b", text: "No; debe forrajear y cazar de manera independiente antes de volver a vida libre.", isCorrect: true },
      { id: "c", text: "Sí, si el apetito mejora y se posa correctamente dentro de la caja de transporte.", isCorrect: false },
    ],
    ri3: [
      { id: "a", text: "Vuelo deficiente, lesión ocular relevante, fractura mal consolidada o habituación humana.", isCorrect: true },
      { id: "b", text: "Haber recibido analgesia durante la rehabilitación.", isCorrect: false },
      { id: "c", text: "Provenir de una zona con presencia de roedores silvestres.", isCorrect: false },
    ],
  },
  pudu: {
    r2: [
      { id: "a", text: "Porque el estrés y la restricción repetida pueden agravar el cuadro y desencadenar miopatía por captura.", isCorrect: true },
      { id: "b", text: "Porque la piel del pudú no tolera el contacto humano por más de un minuto.", isCorrect: false },
      { id: "c", text: "Porque las mordidas de perro siempre son superficiales y no requieren revisión inmediata.", isCorrect: false },
    ],
    r3: [
      { id: "a", text: "Un ambiente tranquilo, de baja luz, poco ruido y mínima presencia humana.", isCorrect: true },
      { id: "b", text: "Un recinto con tránsito frecuente para que no pierda tolerancia a las personas.", isCorrect: false },
      { id: "c", text: "Un espacio compartido con otros herbívoros domésticos para disminuir ansiedad.", isCorrect: false },
    ],
    mc2: [
      { id: "a", text: "Promover tenencia responsable: no dejar perros sueltos, no criar pudúes y avisar a la autoridad.", isCorrect: true },
      { id: "b", text: "Indicar que los perros con collar no representan riesgo para fauna nativa.", isCorrect: false },
      { id: "c", text: "Explicar que basta con trasladar los pudúes juveniles a patios domiciliarios protegidos.", isCorrect: false },
    ],
    mc3: [
      { id: "a", text: "Porque es fauna silvestre con alta susceptibilidad al estrés y debe mantener conducta natural para reinsertarse.", isCorrect: true },
      { id: "b", text: "Porque solo los machos adultos pueden adaptarse a la convivencia humana.", isCorrect: false },
      { id: "c", text: "Porque la ley solo prohíbe mantener pudúes durante el verano.", isCorrect: false },
    ],
    p2: [
      { id: "a", text: "Decaimiento marcado, disnea, sangrado, incapacidad de mantenerse de pie, dolor intenso o fracturas evidentes.", isCorrect: true },
      { id: "b", text: "Orejas erguidas, inmovilidad breve y evitación visual aislada.", isCorrect: false },
      { id: "c", text: "Aumento de apetito dentro de las primeras horas de manejo.", isCorrect: false },
    ],
    p3: [
      { id: "a", text: "Porque una herida pequeña puede ocultar daño profundo, contaminación bacteriana o perforaciones internas.", isCorrect: true },
      { id: "b", text: "Porque las mordidas pequeñas solo generan riesgo si el animal pesa más de 20 kg.", isCorrect: false },
      { id: "c", text: "Porque las lesiones por perro no se infectan cuando el pudú sigue caminando.", isCorrect: false },
    ],
    t2: [
      { id: "a", text: "Evitar manipulación repetida, alimentación improvisada, cercanía con perros o intentos de domesticación.", isCorrect: true },
      { id: "b", text: "Ofrecer leche y frutas dulces para reducir el miedo al humano.", isCorrect: false },
      { id: "c", text: "Mantenerlo con visitas frecuentes para evaluar si recupera docilidad.", isCorrect: false },
    ],
    t3: [
      { id: "a", text: "Porque como herbívoro silvestre requiere una dieta acorde; una dieta improvisada favorece trastornos digestivos y dependencia.", isCorrect: true },
      { id: "b", text: "Porque todos los rumiantes silvestres deben recibir solo pellet comercial de conejo.", isCorrect: false },
      { id: "c", text: "Porque la alimentación solo importa después del alta conductual.", isCorrect: false },
    ],
    ri2: [
      { id: "a", text: "No debe liberarse si tiene lesiones permanentes, dependencia humana, mala locomoción o un sitio con riesgo inmediato alto.", isCorrect: true },
      { id: "b", text: "Puede liberarse aunque esté demasiado dócil si su peso corporal es normal.", isCorrect: false },
      { id: "c", text: "Solo debe retenerse si aún conserva heridas visibles en la piel.", isCorrect: false },
    ],
    ri3: [
      { id: "a", text: "Porque el sitio debe ofrecer hábitat adecuado y evitar perros sueltos, tránsito intenso o baja cobertura vegetal.", isCorrect: true },
      { id: "b", text: "Porque los pudúes siempre deben liberarse cerca de áreas urbanas para facilitar su monitoreo.", isCorrect: false },
      { id: "c", text: "Porque el lugar de liberación solo importa si el animal fue criado en cautiverio.", isCorrect: false },
    ],
  },
  lobo_marino: {
    r2: [
      { id: "a", text: "Heridas, enmallamiento, sangrado, dificultad respiratoria, debilidad extrema o incapacidad de desplazarse.", isCorrect: true },
      { id: "b", text: "Solo estar solo en la playa durante el día.", isCorrect: false },
      { id: "c", text: "Dormir más de diez minutos en la arena seca.", isCorrect: false },
    ],
    r3: [
      { id: "a", text: "Porque puede estar descansando, enfermo o lesionado, y forzarlo al agua empeora el estrés y dificulta la evaluación.", isCorrect: true },
      { id: "b", text: "Porque los lobos marinos no pueden nadar después de tocar la arena caliente.", isCorrect: false },
      { id: "c", text: "Porque siempre regresan solos al mar apenas baja la marea.", isCorrect: false },
    ],
    mc2: [
      { id: "a", text: "Ubicación, fecha, tamaño aproximado, conducta, heridas, enmallamiento y fotos tomadas a distancia.", isCorrect: true },
      { id: "b", text: "Solo el peso estimado y la velocidad del viento al momento del hallazgo.", isCorrect: false },
      { id: "c", text: "Exclusivamente si la playa tiene acceso vehicular o no.", isCorrect: false },
    ],
    mc3: [
      { id: "a", text: "Porque acercarse, tocar o moverlo aumenta estrés, riesgo de mordidas y dificulta el trabajo del equipo entrenado.", isCorrect: true },
      { id: "b", text: "Porque los lobos marinos solo se alteran si escuchan ruidos metálicos.", isCorrect: false },
      { id: "c", text: "Porque el principal problema del público es que enfría demasiado el sustrato de descanso.", isCorrect: false },
    ],
    p2: [
      { id: "a", text: "Enmallamiento o constricción con riesgo de heridas profundas, infección y dificultad para alimentarse o respirar.", isCorrect: true },
      { id: "b", text: "Una marca superficial sin relevancia clínica si aún puede vocalizar.", isCorrect: false },
      { id: "c", text: "Un signo típico de recambio normal del pelaje juvenil.", isCorrect: false },
    ],
    p3: [
      { id: "a", text: "Respiración con esfuerzo, secreciones, tos, postura anormal o sonidos respiratorios alterados.", isCorrect: true },
      { id: "b", text: "Aletas húmedas y pupilas contraídas bajo sol intenso.", isCorrect: false },
      { id: "c", text: "Únicamente bostezos repetidos antes de entrar al agua.", isCorrect: false },
    ],
    t2: [
      { id: "a", text: "Estabilización, hidratación, analgesia, tratamiento de heridas y retiro seguro de redes por personal capacitado.", isCorrect: true },
      { id: "b", text: "Ejercicio forzado en arena para evaluar resistencia antes de iniciar cualquier terapia.", isCorrect: false },
      { id: "c", text: "Alimentación manual en playa abierta como medida inicial estándar.", isCorrect: false },
    ],
    t3: [
      { id: "a", text: "Porque son animales grandes y fuertes que requieren contención especializada, bioseguridad y evaluación veterinaria.", isCorrect: true },
      { id: "b", text: "Porque el principal riesgo es solo que escapen antes de ser fotografiados.", isCorrect: false },
      { id: "c", text: "Porque fuera del agua no pueden responder con mordidas ni estrés severo.", isCorrect: false },
    ],
    ri2: [
      { id: "a", text: "No, si la herida compromete movilidad, alimentación, respiración, termorregulación o mantiene alto riesgo infeccioso.", isCorrect: true },
      { id: "b", text: "Sí, siempre que el animal vuelva a entrar al agua por sus propios medios.", isCorrect: false },
      { id: "c", text: "Sí, si la lesión está seca aunque siga abierta.", isCorrect: false },
    ],
    ri3: [
      { id: "a", text: "Debilidad extrema, enfermedad activa, incapacidad de nadar, heridas graves o dependencia humana.", isCorrect: true },
      { id: "b", text: "Permanecer menos de 48 horas en rehabilitación.", isCorrect: false },
      { id: "c", text: "Pertenecer a una colonia de gran tamaño.", isCorrect: false },
    ],
  },
};

function normalizeSpeciesQuestions(
  speciesId: string,
  questions: Record<string, BaseQuestion>
): Record<string, CourseQuestion> {
  const grouped: Record<string, BaseQuestion[]> = {};

  Object.values(questions)
    .sort((a, b) => a.order - b.order)
    .forEach((question) => {
      if (!grouped[question.category]) {
        grouped[question.category] = [];
      }
      grouped[question.category].push(question);
    });

  const normalized: Record<string, CourseQuestion> = {};
  let nextOrder = 1;

  Object.values(grouped).forEach((group) => {
    group.slice(0, 3).forEach((question, index) => {
      const type = index === 0 ? "open" : "multiple_choice";
      const options = type === "multiple_choice"
        ? MULTIPLE_CHOICE_OPTIONS[speciesId]?.[question.id]
        : undefined;

      normalized[question.id] = {
        ...question,
        type,
        order: nextOrder,
        ...(type === "open" ? { minLength: 50 } : {}),
        ...(options ? { options } : {}),
      };

      nextOrder += 1;
    });
  });

  return normalized;
}

function normalizeSpeciesData(data: Record<string, StaticSpecies>): Record<string, StoredSpecies> {
  return Object.fromEntries(
    Object.entries(data).map(([speciesId, species]) => [
      speciesId,
      {
        ...species,
        questions: normalizeSpeciesQuestions(speciesId, species.questions),
      },
    ])
  );
}

export const SPECIES_DATA: Record<string, StoredSpecies> = normalizeSpeciesData(BASE_SPECIES_DATA);
