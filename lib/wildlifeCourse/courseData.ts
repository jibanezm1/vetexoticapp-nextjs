import type { CourseQuestion, CourseQuestionOption, CourseSpecies } from "./types";

type StoredSpecies = Omit<CourseSpecies, "enabled" | "enabledAt" | "enabledBy">;
type BaseQuestion = Omit<CourseQuestion, "type" | "minLength" | "options"> &
  Partial<Pick<CourseQuestion, "type" | "minLength" | "options">>;
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
          "No. Un pingüino puede permanecer quieto en playa por descanso, muda u otras conductas fisiológicas, pero en rehabilitación se asume cautela clínica. Debe realizarse una evaluación a distancia obligatoria para valorar nivel de alerta, postura, esfuerzo respiratorio, condición corporal y alineación del plumaje antes de cualquier contención física, evitando manipulaciones que agraven el distrés o una descompensación metabólica.",
        citation: {
          source: "USS PNGUINO - Rescate y primeros auxilios",
          url: "https://www.sernapesca.cl/area-trabajo/rescate-y-conservacion/",
        },
        order: 1,
      },
      r2: {
        id: "r2",
        category: "Rehabilitación",
        text: "¿Qué observarías a través de la evaluación a distancia antes de realizar la contención física del paciente?",
        expectedAnswer:
          "El nivel de alerta, la postura, la búsqueda de ortopnea, el esfuerzo respiratorio, la condición corporal y el estado de alineación del plumaje, porque la inspección visual a distancia es obligatoria antes de intervenir.",
        citation: {
          source: "Etapas de la rehabilitación de fauna silvestre",
          url: "https://www.fia.cl/wp-content/uploads/2019/01/Manual_basico_Operacional_Rescate_y_rehabilitacion_silvestre.pdf",
        },
        order: 2,
      },
      r3: {
        id: "r3",
        category: "Rehabilitación",
        text: "¿Cuál es el objetivo principal al ingreso del paciente en el flujo de rehabilitación?",
        expectedAnswer:
          "Lograr la estabilización médica inicial: mitigar el distrés, revertir el shock, controlar la temperatura y corregir el déficit estimado de deshidratación antes de cualquier procedimiento prolongado.",
        citation: {
          source: "USS PNGUINO - Rescate y primeros auxilios",
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
          "Un pingüino varado actúa como centinela epidemiológico de primera línea. Bajo el paradigma de Una Salud, informa sobre contaminación por hidrocarburos, variaciones en la disponibilidad de presas, pesca incidental, interacción humana y circulación de patógenos con impacto poblacional y zoonótico como H5N1.",
        citation: {
          source: "USS PNGUINO - Medicina de Conservación en Sphenisciformes",
          url: "https://www.sernapesca.cl/noticias/sernapesca-investiga-causas-de-varamiento-masivo-en-playas-de-concon/",
        },
        order: 5,
      },
      mc2: {
        id: "mc2",
        category: "Medicina de la Conservación",
        text: "Desde el enfoque de \"Una Salud\" (One Health), ¿por qué es insuficiente abordar el rescate solo desde la atención clínica individual?",
        expectedAnswer:
          "Porque el individuo puede alertar sobre eventos ambientales o sanitarios mayores. Como centinela epidemiológico, su evaluación permite detectar FAN, influenza aviar altamente patogénica, contaminación y otras amenazas ecosistémicas que exceden la clínica individual.",
        citation: {
          source: "Etapas de la rehabilitación de fauna silvestre - One Health",
          url: "https://www.sernapesca.cl/noticias/sernapesca-investiga-causas-de-varamiento-masivo-en-playas-de-concon/",
        },
        order: 6,
      },
      mc3: {
        id: "mc3",
        category: "Medicina de la Conservación",
        text: "¿Cuáles son las principales amenazas antrópicas que impactan la conservación de los Sphenisciformes en Chile?",
        expectedAnswer:
          "La sobrepesca con reducción de anchoveta, la captura incidental en redes, la contaminación por hidrocarburos y la perturbación humana de hábitats de nidificación son amenazas antrópicas clave para la conservación de los Sphenisciformes.",
        citation: {
          source: "USS PNGUINO - Amenazas naturales y antropogénicas",
          url: "https://www.int-res.com/articles/esr2017/34/n034p373.pdf",
        },
        order: 7,
      },
      p1: {
        id: "p1",
        category: "Patologías",
        text: "¿Cuáles son los principales diagnósticos diferenciales?",
        expectedAnswer:
          "Los principales diagnósticos diferenciales incluyen síndrome de emaciación o inanición, contaminación por hidrocarburos con empetrolamiento, traumatismos o heridas profundas por enmallamiento, aspergilosis u otras enfermedades respiratorias, además de parasitosis gastrointestinales o pulmonares severas.",
        citation: {
          source: "USS PNGUINO - Patologías y rescate",
          url: "https://sanccob.co.za/wp-content/uploads/2021/10/Prognostic_Indicators_RehabOutcomes_adultAfricanPenguuins.pdf",
        },
        order: 8,
      },
      p2: {
        id: "p2",
        category: "Patologías",
        text: "¿Qué consecuencias fisiopatológicas críticas genera la contaminación del plumaje por petróleo crudo?",
        expectedAnswer:
          "El plumaje pierde su estructura, aislamiento térmico e impermeabilidad, lo que desencadena hipotermia severa, toxicidad sistémica por acicalamiento e inanición secundaria.",
        citation: {
          source: "USS PNGUINO - Limpieza del plumaje",
          url: "https://seabirdrescue.org.au/wp-content/uploads/2022/08/olied-seabirds-jessop-and-healy.pdf",
        },
        order: 9,
      },
      p3: {
        id: "p3",
        category: "Patologías",
        text: "¿Qué hallazgos clínicos te harían sospechar de una patología respiratoria severa como la Aspergilosis (Aspergillus fumigatus)?",
        expectedAnswer:
          "Disnea con esfuerzo, ortopnea, ruidos respiratorios anormales, letargia progresiva, pérdida de peso marcada y focos radiopacos en sacos aéreos hacen sospechar patología respiratoria severa como aspergilosis.",
        citation: {
          source: "USS PNGUINO - Fisiología respiratoria y patología",
          url: "https://www.fia.cl/wp-content/uploads/2019/01/Manual_basico_Operacional_Rescate_y_rehabilitacion_silvestre.pdf",
        },
        order: 10,
      },
      t1: {
        id: "t1",
        category: "Tratamientos",
        text: "¿Qué tratamiento general priorizarías al ingreso?",
        expectedAnswer:
          "Se prioriza la estabilización sistémica y hemodinámica inmediata: aislamiento acústico y visual, soporte térmico diferenciado, fluidoterapia parenteral con Ringer Lactato más dextrosa al 5% para corregir deshidratación, antes de realizar procedimientos invasivos o prolongados.",
        citation: {
          source: "USS PNGUINO - Fluidoterapia y soporte",
          url: "https://myodfw.com/sites/default/files/2026-03/MinimumStandards3rdEdition.pdf",
        },
        order: 11,
      },
      t2: {
        id: "t2",
        category: "Tratamientos",
        text: "¿Está indicada la antibioticoterapia preventiva y sistemática en todos los pingüinos que ingresan al centro?",
        expectedAnswer:
          "No. La antibioticoterapia debe aplicarse bajo criterios de medicina basada en la evidencia, ante hallazgos clínicos concretos como heridas por enmallamiento, sospecha de infección secundaria o inmunosupresión.",
        citation: {
          source: "Etapas de la rehabilitación de fauna silvestre - MBE",
          url: "https://myodfw.com/sites/default/files/2026-03/MinimumStandards3rdEdition.pdf",
        },
        order: 12,
      },
      t3: {
        id: "t3",
        category: "Tratamientos",
        text: "¿Someterías a un lavado inmediato con detergentes especiales a un pingüino que ingresa con severa contaminación por petróleo?",
        expectedAnswer:
          "No siempre. Primero es mandatorio estabilizar hemodinámicamente al paciente, corregir la deshidratación y desintoxicarlo según criterio clínico antes de realizar un lavado que es prolongado y altamente estresante.",
        citation: {
          source: "USS PNGUINO - Orden del protocolo de atención a empetrolados",
          url: "https://seabirdrescue.org.au/wp-content/uploads/2022/08/olied-seabirds-jessop-and-healy.pdf",
        },
        order: 13,
      },
      ri1: {
        id: "ri1",
        category: "Reinserción",
        text: "¿Cuándo puede liberarse?",
        expectedAnswer:
          "Solo cuando recupera independencia funcional absoluta en el medio marino: simetría anatómica, impermeabilidad total del plumaje comprobada en natación controlada, condición corporal adecuada, nado competente y conducta evasiva frente al ser humano.",
        citation: {
          source: "USS PNGUINO - Criterios de liberación",
          url: "https://seabirdrescue.org.au/wp-content/uploads/2022/08/olied-seabirds-jessop-and-healy.pdf",
        },
        order: 14,
      },
      ri2: {
        id: "ri2",
        category: "Reinserción",
        text: "¿Es suficiente que un pingüino logre alimentarse por sí solo en cautiverio para autorizar su alta médica y liberación?",
        expectedAnswer:
          "No. Además de alimentarse, debe demostrar comportamiento evasivo frente a humanos, competencia biomecánica de nado, acondicionamiento físico adecuado e impermeabilidad total del plumaje.",
        citation: {
          source: "USS PNGUINO - Reinserción funcional",
          url: "https://seabirdrescue.org.au/wp-content/uploads/2022/08/olied-seabirds-jessop-and-healy.pdf",
        },
        order: 15,
      },
      ri3: {
        id: "ri3",
        category: "Reinserción",
        text: "¿Cuál de los siguientes factores se considera un impedimento clínico absoluto para la liberación de un Sphenisciforme?",
        expectedAnswer:
          "La pérdida de impermeabilidad del plumaje tras el nado, lesiones anatómicas permanentes asimétricas, mala condición corporal o pérdida de aversión al ser humano son impedimentos absolutos para su liberación.",
        citation: {
          source: "USS PNGUINO - Checklist de reinserción",
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
        text: "Un tucúquere ingresa con una fractura en el ala izquierda. ¿Por qué es fundamental limitar los tiempos de vendaje prolongados y qué estructura membranosa del miembro torácico corre el riesgo de sufrir contractura irreversible?",
        expectedAnswer:
          "Los vendajes prolongados favorecen anquilosis y contracturas. En aves rapaces, el riesgo principal es la contractura irreversible del tendón o membrana propatagial, lo que compromete de forma definitiva la biomecánica del ala y la sustentación de vuelo.",
        citation: {
          source: "USS CLASE RAPACES - Rehabilitación traumatológica",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 1,
      },
      r2: {
        id: "r2",
        category: "Rehabilitación",
        text: "Ingresa a urgencias un Tucúquere politraumatizado y agresivo. ¿Qué debe evaluarse como prioridad absoluta siguiendo los protocolos clínicos hospitalarios?",
        expectedAnswer:
          "La prioridad es una contención física segura con mínimo distrés y una evaluación primaria ABCD: vía aérea, respiración, circulación y déficit neurológico, antes del examen traumatológico completo.",
        citation: {
          source: "Etapas de la rehabilitación de fauna silvestre - Protocolo ABCD",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 2,
      },
      r3: {
        id: "r3",
        category: "Rehabilitación",
        text: "Si un tucúquere presenta una consolidación ósea clínicamente completa tras una fractura de ala, ¿por qué está contraindicada su liberación si aún evidencia una leve deficiencia aerodinámica?",
        expectedAnswer:
          "Porque un vuelo asimétrico impide la sustentación aerodinámica necesaria para caza silente, evasión y supervivencia; aunque el hueso consolide, una deficiencia biomecánica condena al ave a inanición en vida libre.",
        citation: {
          source: "USS CLASE RAPACES - Rehabilitación aerodinámica",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 3,
      },
      mc1: {
        id: "mc1",
        category: "Medicina de la Conservación",
        text: "¿Qué amenazas de origen antrópico explican de manera recurrente el ingreso de grandes búhos y rapaces nocturnas a los centros de rehabilitación en la zona central de Chile?",
        expectedAnswer:
          "Las amenazas recurrentes incluyen colisiones con vehículos o tendidos, intoxicación secundaria por rodenticidas anticoagulantes, disparos por caza ilegal y degradación de sitios de nidificación, todas de origen antrópico.",
        citation: {
          source: "USS CLASE RAPACES - Interfase rural-silvestre",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10403058/",
        },
        order: 4,
      },
      mc2: {
        id: "mc2",
        category: "Medicina de la Conservación",
        text: "Desde la perspectiva de la Medicina de la Conservación y el paradigma de Una Salud, ¿por qué la intoxicación de un tucúquere en la interfase rural-silvestre reviste gran importancia ecológica?",
        expectedAnswer:
          "Porque los estrígidos, como depredadores tope, actúan como centinelas epidemiológicos de la bioacumulación y exposición ambiental a rodenticidas anticoagulantes en el ecosistema.",
        citation: {
          source: "USS CLASE RAPACES - Rodenticidas y conservación",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10403058/",
        },
        order: 5,
      },
      mc3: {
        id: "mc3",
        category: "Medicina de la Conservación",
        text: "¿Cuál es el rol ecológico fundamental que cumple el tucúquere en los ecosistemas forestales y agrícolas de Chile?",
        expectedAnswer:
          "Actúa como depredador y controlador biológico clave, regulando poblaciones de pequeños y medianos vertebrados, especialmente roedores plaga y lagomorfos.",
        citation: {
          source: "USS CLASE RAPACES - Rol ecológico",
          url: "https://www.scielo.cl/article_plus.php?lng=es&pid=S0718-686X2018000300067&tlng=en",
        },
        order: 6,
      },
      p1: {
        id: "p1",
        category: "Patologías",
        text: "Al monitorear la egagrópila regurgitada por un tucúquere hospitalizado, observas que los huesos de los roedores están completamente disueltos por el ácido gástrico. ¿Es este un hallazgo estándar o una alerta de divergencia anatómica o patológica?",
        expectedAnswer:
          "Es una alerta patológica. En estrígidos, la egagrópila normal conserva esqueletos relativamente íntegros por su pH gástrico moderado; la disolución completa del hueso sugiere una divergencia anatómica o un trastorno digestivo severo.",
        citation: {
          source: "USS CLASE RAPACES - Egagrópilas y fisiología digestiva",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 7,
      },
      p2: {
        id: "p2",
        category: "Patologías",
        text: "Si recibes un tucúquere al borde de una carretera con debilidad extrema, hematomas generalizados y sangrado activo por la ranfoteca sin fracturas evidentes, ¿qué patología sistémica debes sospechar?",
        expectedAnswer:
          "Debe sospecharse coagulopatía severa por intoxicación secundaria con rodenticidas anticoagulantes, debido al bloqueo de la vitamina K epóxido reductasa.",
        citation: {
          source: "USS CLASE RAPACES - SGARs",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10403058/",
        },
        order: 8,
      },
      p3: {
        id: "p3",
        category: "Patologías",
        text: "Durante la evaluación oftalmológica de una rapaz nocturna traumatizada por colisión, ¿por qué es mandatorio inspeccionar el fondo de ojo y la integridad del pecten ocular?",
        expectedAnswer:
          "Porque el trauma por colisión puede lesionar el pecten, producir hemorragia vítrea o desprendimiento de retina, y un ave con visión monocular grave o ceguera es inviable en la naturaleza.",
        citation: {
          source: "USS CLASE RAPACES - Oftalmología de rapaces",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 9,
      },
      t1: {
        id: "t1",
        category: "Tratamientos",
        text: "Si se confirma mediante examen de sangre que el tucúquere sufre de Saturnismo debido a la ingesta indirecta de perdigones, ¿cuál es el tratamiento médico de urgencia indicado?",
        expectedAnswer:
          "Ante toxicosis clínica por plomo severa debe instaurarse terapia de quelación con CaEDTA por vía intramuscular en pauta repetida, con el objetivo de remover el metal acumulado y favorecer su excreción renal.",
        citation: {
          source: "USS CLASE RAPACES - Saturnismo y quelación",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 10,
      },
      t2: {
        id: "t2",
        category: "Tratamientos",
        text: "Ingresas al tucúquere a pabellón para resolución ortopédica. ¿Qué particularidad fisiológica de los estrígidos debes considerar bajo anestesia inhalatoria con Isoflurano?",
        expectedAnswer:
          "Los estrígidos tienen alta propensión a desarrollar reflejos vagales oculares durante la manipulación anestésica, con riesgo de bradicardia súbita o incluso paro cardíaco.",
        citation: {
          source: "USS CLASE RAPACES - Anestesia en estrígidos",
          url: "https://www.doc.govt.nz/globalassets/documents/our-work/wildlife-health/raptors-rehabilitation-guide.pdf",
        },
        order: 11,
      },
      t3: {
        id: "t3",
        category: "Tratamientos",
        text: "¿Cuál es el abordaje clínico correcto para el manejo hospitalario de un tucúquere con pododermatitis avanzada (Bumblefoot grado III a V)?",
        expectedAnswer:
          "Requiere desbridamiento quirúrgico, perlas de PMMA, antibioticoterapia sistémica y ajuste de perchas terapéuticas, porque es una lesión profunda y no un simple problema de apoyo.",
        citation: {
          source: "USS CLASE RAPACES - Manejo de Bumblefoot",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 12,
      },
      ri1: {
        id: "ri1",
        category: "Reinserción",
        text: "Si un tucúquere huérfano es criado en cautiverio sin aislamiento visual, asimila al ser humano como su conspecífico. ¿Cómo se denomina este fenómeno etológico y por qué inhabilita al ejemplar para la liberación?",
        expectedAnswer:
          "Se denomina impronta humana o imprinting. Inhabilita la liberación porque el ave pierde la distancia de seguridad y la identificación normal con su especie, comprometiendo supervivencia, cortejo y reproducción silvestre.",
        citation: {
          source: "USS CLASE RAPACES - Etología y liberación",
          url: "https://www.doc.govt.nz/globalassets/documents/our-work/wildlife-health/raptors-rehabilitation-guide.pdf",
        },
        order: 13,
      },
      ri2: {
        id: "ri2",
        category: "Reinserción",
        text: "Antes de autorizar el alta definitiva y la liberación de un tucúquere, ¿qué destreza conductual y biomecánica debe superar obligatoriamente en los jaulones de musculación?",
        expectedAnswer:
          "Debe demostrar vuelo silente, simetría perfecta de batido, aterrizaje preciso y capacidad de captura activa de presas vivas, porque comer alimento entregado por humanos no equivale a aptitud de caza.",
        citation: {
          source: "USS CLASE RAPACES - Criterios de pre-liberación",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 14,
      },
      ri3: {
        id: "ri3",
        category: "Reinserción",
        text: "¿Cuál de los siguientes criterios representa un impedimento clínico y ético absoluto para un tucúquere en rehabilitación?",
        expectedAnswer:
          "Una pérdida irreversible de la visión binocular, fractura mal consolidada con asimetría alar o habituación humana severa son impedimentos absolutos y éticos para su liberación.",
        citation: {
          source: "USS CLASE RAPACES - Árbol de decisiones éticas",
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
        text: "Si un pudú estresado ingresa al hospital y evidencia mioglobinuria, ¿qué proceso fisiopatológico sistémico e irreversible se está instaurando en su organismo?",
        expectedAnswer:
          "Se está instaurando una miopatía de captura con acidosis metabólica, rabdomiólisis, liberación de mioglobina y progresión a falla renal aguda. Es una cascada sistémica potencialmente irreversible asociada a distrés intenso.",
        citation: {
          source: "USS mamíferos silvestres - Miopatía de captura",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6612673/",
        },
        order: 1,
      },
      r2: {
        id: "r2",
        category: "Rehabilitación",
        text: "Un pudú juvenil ingresa con distrés marcado tras ser perseguido por una jauría de perros. ¿Por qué está contraindicada una manipulación física exhaustiva de inmediato?",
        expectedAnswer:
          "Porque el esfuerzo físico extremo y la activación simpática masiva pueden gatillar una cascada metabólica anaeróbica que desencadena miopatía de captura fatal.",
        citation: {
          source: "USS mamíferos silvestres - Hands-off en cérvidos",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6612673/",
        },
        order: 2,
      },
      r3: {
        id: "r3",
        category: "Rehabilitación",
        text: "¿Qué condiciones ambientales e intrahospitalarias estrictas requiere este paciente durante su primera fase de admisión para mitigar el distrés neuroendocrino?",
        expectedAnswer:
          "Requiere un ambiente ciego, de baja intensidad lumínica, con absoluto control acústico y mínima exposición visual, usando barreras opacas o capucha ocular para reducir el distrés.",
        citation: {
          source: "USS mamíferos silvestres - Manejo ambiental del pudú",
          url: "https://www.sag.gob.cl/sites/default/files/criterios_tec_mantencion_fauna_silv_cautiverio.pdf",
        },
        order: 3,
      },
      mc1: {
        id: "mc1",
        category: "Medicina de la Conservación",
        text: "Explique cómo la fragmentación del hábitat y la interfaz pudú-ganado bovino u ovino vulnera la barrera sanitaria del cérvido, mencionando al menos un patógeno emergente de carácter zoonótico.",
        expectedAnswer:
          "La fragmentación y el contacto con ganado rompen barreras sanitarias y favorecen transmisión horizontal de patógenos como Chlamydia abortus o Leptospira pomona, comprometiendo poblaciones aisladas de pudú desde el enfoque One Health.",
        citation: {
          source: "USS mamíferos silvestres - Interfaz sanitaria pudú-ganado",
          url: "https://www.cambridge.org/core/journals/oryx/article/evaluating-mortality-sources-for-the-vulnerable-pudu-pudu-puda-in-chile-implications-for-the-conservation-of-a-threatened-deer/388770F8DB1BC84E20873C7CFCF12415",
        },
        order: 4,
      },
      mc2: {
        id: "mc2",
        category: "Medicina de la Conservación",
        text: "Desde el enfoque de Una Salud, ¿qué disrupción sanitaria y amenaza de conservación crítica para la fauna endémica se evidencia directamente en este caso?",
        expectedAnswer:
          "La depredación y ataque por perros domésticos o asilvestrados en la interfase urbano-silvestre constituye una de las amenazas críticas y principales causas de mortalidad del pudú.",
        citation: {
          source: "USS mamíferos silvestres - Amenazas antrópicas del pudú",
          url: "https://www.cambridge.org/core/journals/oryx/article/evaluating-mortality-sources-for-the-vulnerable-pudu-pudu-puda-in-chile-implications-for-the-conservation-of-a-threatened-deer/388770F8DB1BC84E20873C7CFCF12415",
        },
        order: 5,
      },
      mc3: {
        id: "mc3",
        category: "Medicina de la Conservación",
        text: "¿Qué medida regulatoria y educativa prioritaria deriva del análisis de la casuística de ingresos de cérvidos nativos a los centros de rehabilitación en Chile?",
        expectedAnswer:
          "Debe promoverse la tenencia responsable con control de jaurías, eliminación de barreras antrópicas relevantes y denuncia obligatoria a la autoridad competente como el SAG.",
        citation: {
          source: "USS mamíferos silvestres - Medidas regulatorias y educativas",
          url: "https://www.sag.cl/sites/default/files/ley_de_caza_2017.pdf",
        },
        order: 6,
      },
      p1: {
        id: "p1",
        category: "Patologías",
        text: "Al realizar el examen de un pudú mordido por perros, ¿por qué una herida punzante pequeña en la piel del dorso o abdomen representa una emergencia quirúrgica de pronóstico reservado?",
        expectedAnswer:
          "Porque puede representar el efecto iceberg: una abertura cutánea pequeña con desgarros musculares masivos subcutáneos, necrosis, inoculación bacteriana profunda y riesgo de sepsis secundaria generalizada.",
        citation: {
          source: "USS mamíferos silvestres - Trauma por cánidos",
          url: "https://researchers.unab.cl/es/publications/evaluating-mortality-sources-for-the-vulnerable-pudu-pudu-puda-in/",
        },
        order: 7,
      },
      p2: {
        id: "p2",
        category: "Patologías",
        text: "Además de las lesiones por mordedura, ¿qué patología polimicrobiana de la cavidad oral asociada a osteomielitis piogranulomatosa debes vigilar en pudúes bajo cautiverio prolongado?",
        expectedAnswer:
          "Debe vigilarse la Mandíbula Grumosa o Lumpy Jaw, asociada a infección polimicrobiana con osteomielitis piogranulomatosa favorecida por microabrasiones del ramoneo abrasivo y cautiverio prolongado.",
        citation: {
          source: "USS mamíferos silvestres - Lumpy Jaw",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6612673/",
        },
        order: 8,
      },
      p3: {
        id: "p3",
        category: "Patologías",
        text: "¿Qué alteraciones en las constantes fisiológicas y bioquímicas del pudú indicarían un estado crítico de shock e hipertermia por pánico?",
        expectedAnswer:
          "Frecuencia cardíaca muy elevada, hiperglicemia marcada y creatina quinasa extremadamente alta sugieren shock e hipertermia por pánico con importante daño muscular y compromiso metabólico.",
        citation: {
          source: "USS mamíferos silvestres - Shock e hipertermia en cérvidos",
          url: "https://researchers.unab.cl/es/publications/evaluating-mortality-sources-for-the-vulnerable-pudu-pudu-puda-in/",
        },
        order: 9,
      },
      t1: {
        id: "t1",
        category: "Tratamientos",
        text: "¿Cuál es el abordaje médico inicial inmediato que debes instaurar una vez que el pudú ha sido ingresado al área clínica bajo contención química?",
        expectedAnswer:
          "Se debe priorizar estabilización fisiológica y metabólica hands-off, analgesia multimodal agresiva, oxigenoterapia si corresponde y fluidoterapia con Ringer Lactato para proteger riñón y corregir el impacto del distrés y la mioglobina circulante.",
        citation: {
          source: "USS mamíferos silvestres - Abordaje médico inicial",
          url: "https://www.sag.gob.cl/sites/default/files/criterios_tec_mantencion_fauna_silv_cautiverio.pdf",
        },
        order: 10,
      },
      t2: {
        id: "t2",
        category: "Tratamientos",
        text: "Para realizar procedimientos clínicos minimizando el tiempo de captura y distrés en un pudú, ¿qué pauta anestésica general y de contención química se recomienda?",
        expectedAnswer:
          "Se recomiendan protocolos de inducción química rápida y reversibles, con monitoreo continuo de saturación, temperatura y frecuencia cardíaca, minimizando tiempos de captura física.",
        citation: {
          source: "USS mamíferos silvestres - Contención farmacológica",
          url: "https://www.sag.gob.cl/ambitos-de-accion/registro-nacional-de-tenedores-de-fauna-silvestre-rntfs",
        },
        order: 11,
      },
      t3: {
        id: "t3",
        category: "Tratamientos",
        text: "¿Cómo debe estructurarse la nutrición clínica de un pudú en rehabilitación para evitar desórdenes metabólicos o disbiosis digestiva severa?",
        expectedAnswer:
          "Debe basarse en forraje suave y de alta calidad, propio de un ramoneador selectivo, evitando dietas monótonas o inadecuadas que favorezcan disbiosis, estrés nutricional y dependencia humana.",
        citation: {
          source: "USS mamíferos silvestres - Nutrición del pudú",
          url: "https://www.sag.gob.cl/sites/default/files/criterios_tec_mantencion_fauna_silv_cautiverio.pdf",
        },
        order: 12,
      },
      ri1: {
        id: "ri1",
        category: "Reinserción",
        text: "Al planificar la reinserción de un pudú, ¿por qué es un requisito científico mandatorio evaluar la ecología espacial del sitio de suelta y evitar zonas con presencia ganadera activa?",
        expectedAnswer:
          "Porque debe evaluarse capacidad de carga, calidad del sotobosque, ausencia de perros y ganado, y riesgo de reinfección por patógenos pecuarios, asegurando un sitio de suelta ecológica y sanitariamente apto.",
        citation: {
          source: "USS mamíferos silvestres - Sitio de liberación y bioseguridad",
          url: "https://www.sag.cl/sites/default/files/ley_de_caza_2017.pdf",
        },
        order: 13,
      },
      ri2: {
        id: "ri2",
        category: "Reinserción",
        text: "¿Qué criterios médicos, etológicos y de verificación veterinaria debe cumplir estrictamente un pudú juvenil antes de autorizar su alta definitiva y liberación?",
        expectedAnswer:
          "Debe presentar cicatrización total, ausencia de claudicación, conducta esquiva absoluta hacia humanos y mantenimiento de un presupuesto conductual silvestre compatible con vida libre.",
        citation: {
          source: "USS mamíferos silvestres - Criterios de alta del pudú",
          url: "https://www.cambridge.org/core/journals/oryx/article/evaluating-mortality-sources-for-the-vulnerable-pudu-pudu-puda-in-chile-implications-for-the-conservation-of-a-threatened-deer/388770F8DB1BC84E20873C7CFCF12415",
        },
        order: 14,
      },
      ri3: {
        id: "ri3",
        category: "Reinserción",
        text: "¿Bajo qué condiciones biológicas o ambientales se considera que la liberación de un pudú rehabilitado está contraindicada y debe postergarse o cancelarse?",
        expectedAnswer:
          "Está contraindicada si presenta impronta humana irreversible, claudicación permanente por necrosis muscular o si el ecosistema receptor carece de capacidad de carga y bioseguridad adecuadas.",
        citation: {
          source: "USS mamíferos silvestres - Contraindicaciones de reinserción",
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
        text: "Un civil intenta empujar a un lobo marino juvenil de vuelta al mar porque cree que está varado. Explica por qué esta acción es contraproducente desde la fisiología de la especie y la contención clínica.",
        expectedAnswer:
          "Los otáridos salen a tierra de forma fisiológica a descansar, mudar o termorregular. Forzarlo al agua incrementa el distrés, puede agravar una lesión que comprometa la natación y enmascara déficits neurológicos o respiratorios que requieren evaluación clínica previa.",
        citation: {
          source: "USS mamíferos silvestres - Otaria flavescens en el litoral chileno",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7152169/",
        },
        order: 1,
      },
      r2: {
        id: "r2",
        category: "Rehabilitación",
        text: "Se reporta un lobo marino juvenil descansando solo en una playa turística. ¿Qué signos clínicos y biomecánicos justificarían una intervención inmediata de rescate en terreno?",
        expectedAnswer:
          "La intervención se justifica ante heridas profundas, enmallamiento, disnea severa, postración con incapacidad de locomoción cuadrúpeda o signos neurológicos como ataxia, stargazing o convulsiones.",
        citation: {
          source: "USS mamíferos silvestres - Rescate de pinnípedos",
          url: "https://www.sernapesca.cl/area-trabajo/rescate-y-conservacion/",
        },
        order: 2,
      },
      r3: {
        id: "r3",
        category: "Rehabilitación",
        text: "Si un lobo marino juvenil ingresa debilitado y requiere soporte hídrico en admisión, ¿por qué es mandatorio aplicar restricción estricta de agua libre en su recinto hasta la evaluación clínica completa?",
        expectedAnswer:
          "Porque los animales débiles, deshidratados o con alteración de conciencia tienen alto riesgo de broncoaspiración, por lo que no se debe permitir acceso irrestricto a agua antes de completar la evaluación clínica.",
        citation: {
          source: "USS mamíferos silvestres - Admisión clínica de otáridos",
          url: "https://publications.gc.ca/collections/collection_2018/mpo-dfo/fs70-5/Fs70-5-2018-030-eng.pdf",
        },
        order: 3,
      },
      mc1: {
        id: "mc1",
        category: "Medicina de la Conservación",
        text: "¿Qué fenómeno de origen antrópico e industrial genera laceraciones profundas crónicas en cuello y aletas de los lobos marinos en Chile, y qué consecuencia sistémica provoca?",
        expectedAnswer:
          "El entallamiento por ghost gear o artes de pesca fantasmas provoca laceraciones progresivas y puede evolucionar a sepsis secundaria severa por compromiso crónico de tejidos blandos.",
        citation: {
          source: "USS mamíferos silvestres - Ghost gear y entallamientos",
          url: "https://www.fisheries.noaa.gov/alaska/marine-life-distress/pinniped-entanglement-marine-debris",
        },
        order: 4,
      },
      mc2: {
        id: "mc2",
        category: "Medicina de la Conservación",
        text: "Al registrar la ficha clínica y anamnesis ambiental de un lobo marino varado, ¿por qué es vital recopilar datos epidemiológicos de la zona del hallazgo?",
        expectedAnswer:
          "Porque permite geoposicionar el caso, evaluar la interfaz con la industria pesquera, monitorear brotes locales y coordinar el manejo y destino con SERNAPESCA bajo el enfoque One Health.",
        citation: {
          source: "USS mamíferos silvestres - Registro epidemiológico",
          url: "https://publications.gc.ca/collections/collection_2018/mpo-dfo/fs70-5/Fs70-5-2018-030-eng.pdf",
        },
        order: 5,
      },
      mc3: {
        id: "mc3",
        category: "Medicina de la Conservación",
        text: "Desde el enfoque de Una Salud, ¿por qué los varamientos y mortalidades masivas de lobos marinos en el litoral chileno son críticos para la conservación y la salud pública?",
        expectedAnswer:
          "Porque los lobos marinos actúan como centinelas epidemiológicos de primera línea, revelando crisis como FAN o derrames zoonóticos de influenza aviar altamente patogénica H5N1 con impacto en fauna y salud pública.",
        citation: {
          source: "USS mamíferos silvestres - One Health en pinnípedos",
          url: "https://www.sernapesca.cl/area-trabajo/rescate-y-conservacion/",
        },
        order: 6,
      },
      p1: {
        id: "p1",
        category: "Patologías",
        text: "¿Cuál es el agente etiológico de la Influenza Aviar que provocó la muerte de miles de lobos marinos en Chile, qué signología predominante se describió y qué resguardo de bioseguridad debes adoptar?",
        expectedAnswer:
          "El agente es H5N1 de alta patogenicidad. La signología predominante incluye compromiso neurológico y neumónico, y exige bioseguridad estricta con EPP completo por tratarse de una zoonosis de alta letalidad.",
        citation: {
          source: "USS mamíferos silvestres - IAAP H5N1 en lobos marinos",
          url: "https://repository.library.noaa.gov/view/noaa/48555/noaa_48555_DS1.pdf",
        },
        order: 7,
      },
      p2: {
        id: "p2",
        category: "Patologías",
        text: "Si ingresa un lobo marino proveniente de una zona afectada por FAN con letargo, descoordinación, incapacidad para nadar y convulsiones, ¿cuál es la sospecha fisiopatológica principal?",
        expectedAnswer:
          "Debe sospecharse daño neurológico y motor severo por intoxicación con biotoxinas marinas como saxitoxina o ácido domoico bioacumuladas en la red trófica.",
        citation: {
          source: "USS mamíferos silvestres - FAN y biotoxinas marinas",
          url: "https://www.fisheries.noaa.gov/alaska/marine-life-distress/pinniped-entanglement-marine-debris",
        },
        order: 8,
      },
      p3: {
        id: "p3",
        category: "Patologías",
        text: "Durante la hospitalización y alimentación forzada de una cría con pescado congelado, ¿qué patología neurológica fulminante puedes inducir si omites suplementación profiláctica de Tiamina?",
        expectedAnswer:
          "Existe riesgo de polioencefalomalacia por deficiencia de vitamina B1, con ataxia cerebelosa, convulsiones y muerte rápida, asociada a la acción de tiaminasas presentes en pescado congelado.",
        citation: {
          source: "USS mamíferos silvestres - Tiamina y tiaminasa",
          url: "https://repository.library.noaa.gov/view/noaa/48555/noaa_48555_DS1.pdf",
        },
        order: 9,
      },
      t1: {
        id: "t1",
        category: "Tratamientos",
        text: "Al formular una nutrición magistral para una cría de lobo marino rescatada, ¿qué ingrediente lácteo tradicional está estrictamente prohibido y qué alteración clínica se busca prevenir?",
        expectedAnswer:
          "Está prohibida la leche con lactosa o leche entera, porque los pinípedos carecen de lactasa y se busca prevenir diarreas osmóticas severas, deshidratación aguda y disbiosis digestiva.",
        citation: {
          source: "USS mamíferos silvestres - Nutrición de crías de otáridos",
          url: "https://www.sernapesca.cl/area-trabajo/rescate-y-conservacion/",
        },
        order: 10,
      },
      t2: {
        id: "t2",
        category: "Tratamientos",
        text: "Ingresa un lobo marino emaciado con neumonía bacteriana secundaria por Pasteurella multocida. ¿Qué protocolo farmacológico y de soporte vital está indicado?",
        expectedAnswer:
          "Se indica antibioticoterapia apropiada, fluidoterapia con Ringer Lactato, soporte calórico por sonda y suplementación antioxidante o vitamínica, dentro de un protocolo completo de estabilización respiratoria y nutricional.",
        citation: {
          source: "USS mamíferos silvestres - Tratamiento hospitalario de lobos marinos",
          url: "https://repository.library.noaa.gov/view/noaa/48555/noaa_48555_DS1.pdf",
        },
        order: 11,
      },
      t3: {
        id: "t3",
        category: "Tratamientos",
        text: "¿Por qué el manejo clínico e inmovilización química de Otaria flavescens debe ser ejecutado exclusivamente por personal médico veterinario capacitado y bajo estrictos protocolos de bioseguridad?",
        expectedAnswer:
          "Porque son mamíferos grandes y fuertes, con contención compleja y riesgo real de transmisión de zoonosis confirmadas, por lo que requieren personal entrenado y uso estricto de EPP.",
        citation: {
          source: "USS mamíferos silvestres - Bioseguridad y contención",
          url: "https://repository.library.noaa.gov/view/noaa/48555/noaa_48555_DS1.pdf",
        },
        order: 12,
      },
      ri1: {
        id: "ri1",
        category: "Reinserción",
        text: "¿Por qué el éxito definitivo de la rehabilitación de un lobo marino no se mide con el alta médica o su salida del hospital, y qué herramientas tecnológicas se utilizan para verificarlo?",
        expectedAnswer:
          "Porque el éxito real es su supervivencia, dispersión y reintegración en la naturaleza. Esto se verifica con monitoreo postliberación mediante tecnologías como marcas satelitales o VHF adheridas al animal.",
        citation: {
          source: "USS mamíferos silvestres - Monitoreo postliberación",
          url: "https://publications.gc.ca/collections/collection_2018/mpo-dfo/fs70-5/Fs70-5-2018-030-eng.pdf",
        },
        order: 13,
      },
      ri2: {
        id: "ri2",
        category: "Reinserción",
        text: "Para autorizar el alta médica definitiva y la liberación de un lobo marino rehabilitado, ¿qué evaluación conductual obligatoria debe superar con éxito en las piscinas de musculación?",
        expectedAnswer:
          "Debe superar varias sesiones de prueba de pesca viva en piscina profunda, demostrando captura activa de presas y restauración de una conducta plenamente esquiva o defensiva.",
        citation: {
          source: "USS mamíferos silvestres - Prueba de pesca viva",
          url: "https://publications.gc.ca/collections/collection_2018/mpo-dfo/fs70-5/Fs70-5-2018-030-eng.pdf",
        },
        order: 14,
      },
      ri3: {
        id: "ri3",
        category: "Reinserción",
        text: "¿Cuál de las siguientes condiciones clínicas vigentes inhabilita de forma absoluta a un lobo marino para su reinserción?",
        expectedAnswer:
          "La ceguera bilateral, dependencia humana irreversible o heridas crónicas que comprometan termorregulación y capacidad de buceo son impedimentos absolutos para reinserción.",
        citation: {
          source: "USS mamíferos silvestres - Criterios éticos de no liberación",
          url: "https://publications.gc.ca/collections/collection_2018/mpo-dfo/fs70-5/Fs70-5-2018-030-eng.pdf",
        },
        order: 15,
      },
    },
  },

  quiz_integrador: {
    id: "quiz_integrador",
    name: "Quiz Integrador",
    emoji: "📝",
    order: 5,
    caseText:
      "Evaluación integradora de medicina y rehabilitación de fauna silvestre. Consolida los contenidos de pingüinos, rapaces y estrígidos, pudúes y lobos marinos, con énfasis en biomecánica, fisiopatología del shock y criterio ético de destinación.",
    keyConcept:
      "Integrar la clínica, la conservación y la ética permite decidir no solo cómo tratar, sino también cuándo un paciente puede volver responsablemente a la vida silvestre.",
    questions: {
      q1: {
        id: "q1",
        category: "Selección múltiple",
        text: "Llega a la sala de urgencias un pudú juvenil rescatado de un ataque de perros y un tucúquere politraumatizado por colisión vial. Siguiendo los protocolos intrahospitalarios de triage, ¿cuál es el abordaje inmediato obligatorio antes de profundizar en el examen físico exhaustivo?",
        type: "multiple_choice",
        expectedAnswer:
          "Instaurar la estabilización médica inicial: control estricto del distrés acústico y visual, analgesia multimodal agresiva y fluidoterapia térmica para frenar la cascada metabólica fatal.",
        citation: {
          source: "Minimum Standards for Wildlife Rehabilitation",
          url: "https://myodfw.com/sites/default/files/2026-03/MinimumStandards3rdEdition.pdf",
        },
        order: 1,
        options: [
          { id: "a", text: "Registrar el peso exacto en gramos en la balanza y proceder a la contención física forzada para suturar heridas superficiales inmediatamente.", isCorrect: false },
          { id: "b", text: "Instaurar la estabilización médica inicial: control estricto del distrés acústico/visual, analgesia multimodal agresiva y fluidoterapia térmica para frenar la cascada metabólica fatal.", isCorrect: true },
          { id: "c", text: "Ofrecer una presa viva o forraje leñoso de forma forzada para medir la integridad de la almohadilla dental o el reflejo de prensión de la garra.", isCorrect: false },
        ],
      },
      q2: {
        id: "q2",
        category: "Selección múltiple",
        text: "Durante la fase de hospitalización de un pingüino varado y empetrolado, se requiere canalizar una vía para fluidoterapia parenteral. ¿Qué particularidad anatómica ósea condiciona la elección de la vía de acceso hídrico en esta especie?",
        type: "multiple_choice",
        expectedAnswer:
          "Los pingüinos presentan una pérdida evolutiva de la neumaticidad ósea, con huesos densos, sólidos y compactos, por lo que debe preferirse el acceso intravenoso o subcutáneo.",
        citation: {
          source: "USS PNGUINO - Rescate y primeros auxilios",
          url: "https://seabirdrescue.org.au/wp-content/uploads/2022/08/olied-seabirds-jessop-and-healy.pdf",
        },
        order: 2,
        options: [
          { id: "a", text: "Los pingüinos poseen una alta neumaticidad en el húmero y fémur, por lo que la fluidoterapia intraósea es la vía de elección para bolos rápidos.", isCorrect: false },
          { id: "b", text: "Presentan una pérdida evolutiva de la neumaticidad ósea, resultando en huesos densos, sólidos y compactos, lo que hace la administración intraósea casi imposible y obliga a preferir el acceso intravenoso o subcutáneo.", isCorrect: true },
          { id: "c", text: "Sus huesos largos reducidos a tendones distales exigen exclusivamente un lavado intramedular para evitar el shock térmico.", isCorrect: false },
        ],
      },
      q3: {
        id: "q3",
        category: "Selección múltiple",
        text: "Al evaluar la salud digestiva de los pacientes rapaces en el hospital mediante el monitoreo de sus egagrópilas, ¿qué hallazgo se considera una alerta de divergencia patológica severa y no un estándar fisiológico?",
        type: "multiple_choice",
        expectedAnswer:
          "Observar que los huesos de las presas se encuentran completamente disueltos por el ácido gástrico dentro de la egagrópila de un búho.",
        citation: {
          source: "Birds of Prey: Initial Treatment and Care Guidelines",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 3,
        options: [
          { id: "a", text: "Encontrar esqueletos de roedores perfectamente intactos en la egagrópila de una rapaz nocturna como el tucúquere.", isCorrect: false },
          { id: "b", text: "Encontrar restos de pelo y plumas compactados en la molleja de un halcón peregrino tras 24 horas de confinamiento.", isCorrect: false },
          { id: "c", text: "Observar que los huesos de las presas se encuentran completamente disueltos por el ácido gástrico dentro de la egagrópila de un búho (Strigiformes).", isCorrect: true },
        ],
      },
      q4: {
        id: "q4",
        category: "Selección múltiple",
        text: "Un pudú que ha sufrido una persecución prolongada por caninos ingresa al centro de rescate evidenciando mioglobinuria, rigidez muscular extrema y una temperatura rectal superior a 41 °C. ¿Qué cuadro fisiopatológico sistémico no infeccioso se ha desencadenado?",
        type: "multiple_choice",
        expectedAnswer:
          "Miopatía de captura en fase aguda, caracterizada por rabdomiólisis, acidosis láctica severa y necrosis del músculo esquelético con riesgo inminente de falla renal.",
        citation: {
          source: "USS mamíferos silvestres - Miopatía de captura",
          url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6612673/",
        },
        order: 4,
        options: [
          { id: "a", text: "Miopatía de captura en fase aguda, caracterizada por rabdomiólisis, acidosis láctica severa y necrosis del músculo esquelético con riesgo inminente de falla renal.", isCorrect: true },
          { id: "b", text: "Infección polimicrobiana aguda por Actinomyces pyogenes y Fusobacterium necrophorum con destrucción del parénquima esplénico.", isCorrect: false },
          { id: "c", text: "Placentitis necrótica inducida por una baja inmunitaria y cambios hormonales mediados por el fotoperíodo austral.", isCorrect: false },
        ],
      },
      q5: {
        id: "q5",
        category: "Selección múltiple",
        text: "Un lobo marino común (Otaria flavescens) juvenil en rehabilitación es alimentado exclusivamente con pescado magro congelado sin recibir suplementación vitamínica profiláctica. ¿Qué cuadro clínico neurológico corre el riesgo de desarrollar debido a la acción de las tiaminasas?",
        type: "multiple_choice",
        expectedAnswer:
          "Polioencefalomalacia, caracterizada por ataxia cerebelosa, convulsiones generalizadas y muerte en cuestión de horas.",
        citation: {
          source: "USS mamíferos silvestres - Tiamina y tiaminasa",
          url: "https://repository.library.noaa.gov/view/noaa/48555/noaa_48555_DS1.pdf",
        },
        order: 5,
        options: [
          { id: "a", text: "Anisakiasis gástrica perforante con migración de larvas L3 hacia el tejido muscular apendicular.", isCorrect: false },
          { id: "b", text: "Polioencefalomalacia, caracterizada por ataxia cerebelosa, convulsiones generalizadas y muerte en cuestión de horas.", isCorrect: true },
          { id: "c", text: "Tuberculosis marina zoonótica mediada por la destrucción enzimática de la queratina sulfatada de la aleta.", isCorrect: false },
        ],
      },
      q6: {
        id: "q6",
        category: "Selección múltiple",
        text: "Un polluelo de rapaz nocturna es criado a mano en un centro de rescate sin la utilización de títeres ni mallas miméticas, asimilando de forma irreversible al ser humano como su conspecífico. De acuerdo con las normativas del SAG y los comités de ética, ¿cuál es el destino de este espécimen?",
        type: "multiple_choice",
        expectedAnswer:
          "Se clasifica como un animal irrecuperable e inviable en la naturaleza; se prohíbe su liberación y debe mantenerse en cautiverio formal autorizado para educación ambiental o como nodriza.",
        citation: {
          source: "Raptors Rehabilitation Guide",
          url: "https://www.doc.govt.nz/globalassets/documents/our-work/wildlife-health/raptors-rehabilitation-guide.pdf",
        },
        order: 6,
        options: [
          { id: "a", text: "Debe ser liberado de inmediato mediante una suelta directa (Hard Release) en un Parque Nacional de alta montaña.", isCorrect: false },
          { id: "b", text: "Debe ser sometido a natación terapéutica intensiva para revertir la habituación antes de la caída anual de plumas.", isCorrect: false },
          { id: "c", text: "Se clasifica como un animal irrecuperable e inviable en la naturaleza; se prohíbe su liberación y debe confinarse de por vida en cautiverio formal para educación ambiental o como nodriza.", isCorrect: true },
        ],
      },
      q7: {
        id: "q7",
        category: "Desarrollo",
        text: "Frente a una fractura distal del miembro torácico en una rapaz o ave marina, se aplica temporalmente un vendaje en \"ocho\". ¿Por qué una tensión excesiva o una inmovilización prolongada e inadecuada en la Zona 1 (codo) puede provocar una contractura irreversible que condene al ave al cautiverio permanente? Explique basándose en las estructuras anatómicas en riesgo.",
        type: "open",
        minLength: 50,
        expectedAnswer:
          "En la cara anterior del codo se ubican el tendón y la membrana propatagial. Una tensión excesiva o inmovilización prolongada genera isquemia, compresión y contractura permanente, con pérdida de flexibilidad alar y sustentación aerodinámica que inhabilita al ave para volar y cazar.",
        citation: {
          source: "Birds of Prey: Initial Treatment and Care Guidelines",
          url: "https://www.environment.nsw.gov.au/sites/default/files/birds-of-prey-initial-treatment-care-guidelines-210567.pdf",
        },
        order: 7,
      },
      q8: {
        id: "q8",
        category: "Desarrollo",
        text: "Durante el brote de Influenza Aviar Altamente Patogénica (IAAP) H5N1 registrado en el litoral chileno, se reportó la muerte masiva de más de 30.000 lobos marinos comunes (Otaria flavescens). Explique brevemente la signología neurológica y respiratoria predominante descrita en esta especie y qué rol cumplen los Centros de Rehabilitación de Fauna Silvestre bajo el paradigma de One Health frente a estas zoonosis emergentes.",
        type: "open",
        minLength: 50,
        expectedAnswer:
          "La signología incluye ataxia severa, stargazing, convulsiones, disnea y secreción nasal sanguinolenta. Bajo Una Salud, los centros actúan como centinelas epidemiológicos de primera línea, detectando precozmente derrames zoonóticos y brotes ambientales antes de que afecten a personas o ganado.",
        citation: {
          source: "USS mamíferos silvestres - IAAP H5N1 en lobos marinos",
          url: "https://repository.library.noaa.gov/view/noaa/48555/noaa_48555_DS1.pdf",
        },
        order: 8,
      },
      q9: {
        id: "q9",
        category: "Desarrollo",
        text: "Al planificar la liberación o reubicación de un pudú o huemul rehabilitado, las normativas de la UICN exigen evaluar la ecología del sitio receptor e impedir la suelta en áreas con ganadería doméstica activa. ¿Qué riesgos sanitarios y qué patologías infecciosas de la interfaz ganado-fauna nativa justifican esta restricción científica?",
        type: "open",
        minLength: 50,
        expectedAnswer:
          "Se debe evitar la exposición de fauna silvestre a patógenos pecuarios y resguardar la capacidad de carga. Entre los riesgos documentados están Chlamydia abortus, causante de placentitis necrótica y abortos, y Leptospira pomona, transmitida por contacto con orina de ganado en fuentes de agua compartidas.",
        citation: {
          source: "IUCN Guidelines for Reintroductions and Other Conservation Translocations",
          url: "https://portals.iucn.org/library/efiles/documents/2013-009.pdf",
        },
        order: 9,
      },
      q10: {
        id: "q10",
        category: "Desarrollo",
        text: "De acuerdo con los manuales de estándares mínimos de rehabilitación y el algoritmo de decisión ética hospitalaria, describa al menos dos escenarios clínicos basales que determinen de forma inmediata la clasificación de un paciente en \"Código Negro\" (indicación de eutanasia compasiva).",
        type: "open",
        minLength: 50,
        expectedAnswer:
          "Son válidos: amputaciones traumáticas masivas o fracturas expuestas de huesos neumáticos conectados al sistema respiratorio; sección o trauma medular completo; evisceración o necrosis extensa irreversible; y ceguera o pérdida completa de la visión binocular en depredadores de élite.",
        citation: {
          source: "Minimum Standards for Wildlife Rehabilitation",
          url: "https://myodfw.com/sites/default/files/2026-03/MinimumStandards3rdEdition.pdf",
        },
        order: 10,
      },
    },
  },
};

const MULTIPLE_CHOICE_OPTIONS: Record<string, Record<string, CourseQuestionOption[]>> = {
  pinguino: {
    r2: [
      { id: "a", text: "El nivel de alerta, la postura (búsqueda de ortopnea), el esfuerzo respiratorio, la condición corporal y el estado de alineación del plumaje.", isCorrect: true },
      { id: "b", text: "Solo confirmar si pertenece a una colonia cercana de Humboldt o Magallanes para devolverlo al mar de inmediato sin evaluación.", isCorrect: false },
      { id: "c", text: "Realizar una aproximación directa para tomar la temperatura cloacal y ofrecer alimento de forma forzada.", isCorrect: false },
    ],
    r3: [
      { id: "a", text: "Lavar el plumaje contaminado y forzar la alimentación sólida para acelerar el alta y liberación inmediata.", isCorrect: false },
      { id: "b", text: "Lograr la estabilización médica inicial: mitigar el distrés, revertir el shock, controlar la temperatura y corregir el déficit estimado de deshidratación.", isCorrect: true },
      { id: "c", text: "Forzar la actividad física o el nado inmediato en piscina para comprobar su capacidad motora aerodinámica.", isCorrect: false },
    ],
    mc2: [
      { id: "a", text: "Porque el individuo actúa como centinela epidemiológico de primera línea y puede alertar sobre eventos ambientales mayores, FAN o brotes zoonóticos como la Influenza Aviar H5N1.", isCorrect: true },
      { id: "b", text: "Porque los pingüinos varados en el litoral chileno son causados única y exclusivamente por redes de tráfico ilegal de fauna exótica.", isCorrect: false },
      { id: "c", text: "Porque la medicina de la conservación solo prioriza la atención médica cuando las especies son introducidas o invasoras.", isCorrect: false },
    ],
    mc3: [
      { id: "a", text: "La sobrepesca, la captura incidental en redes (bycatch), la contaminación por hidrocarburos y la perturbación humana de hábitats de nidificación.", isCorrect: true },
      { id: "b", text: "Exclusivamente la depredación natural de huevos y polluelos por parte de lobos marinos, orcas y skúas en las colonias.", isCorrect: false },
      { id: "c", text: "Únicamente el estrés térmico provocado por el transporte terrestre en las cajas de ventilación del centro de rescate.", isCorrect: false },
    ],
    p2: [
      { id: "a", text: "El hidrocarburo incrementa la flotabilidad y densidad ósea, pero altera la secreción de las glándulas supraorbitarias nasales.", isCorrect: false },
      { id: "b", text: "El plumaje pierde completamente su estructura, aislamiento térmico e impermeabilidad, gatillando hipotermia severa, toxicidad sistémica por acicalamiento e inanición.", isCorrect: true },
      { id: "c", text: "El único impacto clínico relevante es un cambio conductual transitorio que inhibe las vocalizaciones de cortejo.", isCorrect: false },
    ],
    p3: [
      { id: "a", text: "Disnea con esfuerzo respiratorio (ortopnea), ruidos anormales, letargia progresiva, pérdida marcada de peso y focos radiopacos en sacos aéreos.", isCorrect: true },
      { id: "b", text: "Principalmente la presencia de diarrea verde esmeralda, hiperfagia y aumento agudo de la flotabilidad.", isCorrect: false },
      { id: "c", text: "Únicamente el hallazgo de un plumaje seco e impermeable junto con respuestas defensivas agresivas hacia el personal médico.", isCorrect: false },
    ],
    t2: [
      { id: "a", text: "Sí, debido a que el ambiente marino expone a todos los pacientes a cargas bacterianas letales desde el momento del varamiento.", isCorrect: false },
      { id: "b", text: "No; se debe aplicar bajo criterios de Medicina Basada en la Evidencia, ante hallazgos clínicos claros.", isCorrect: true },
      { id: "c", text: "Solo se justifica administrar antibióticos de amplio espectro una vez que el animal recuperó su condición corporal idónea y está listo para el alta.", isCorrect: false },
    ],
    t3: [
      { id: "a", text: "Sí, porque la remoción del crudo es la única manera de frenar el distrés agudo y la miopatía de captura del paciente.", isCorrect: false },
      { id: "b", text: "No siempre; primero es mandatorio estabilizar hemodinámicamente al paciente, corregir la deshidratación y desintoxicar antes de realizar el lavado.", isCorrect: true },
      { id: "c", text: "Solo si el petróleo se encuentra completamente seco en la zona del autopodium y el animal ya realiza forrajeo autónomo.", isCorrect: false },
    ],
    ri2: [
      { id: "a", text: "Sí, el consumo voluntario de pescado es el único indicador metabólico necesario para asegurar la supervivencia en el medio natural.", isCorrect: false },
      { id: "b", text: "No; además debe demostrar comportamiento evasivo ante humanos, perfecta competencia biomecánica de nado, acondicionamiento físico y una impermeabilidad total del plumaje.", isCorrect: true },
      { id: "c", text: "Sí, siempre y cuando el hemograma y perfil bioquímico no evidencien heterofilia ni elevación de fibrinógeno en las últimas 24 horas.", isCorrect: false },
    ],
    ri3: [
      { id: "a", text: "Plumaje que pierde la impermeabilidad tras el nado, lesiones anatómicas permanentes asimétricas, mala condición corporal o pérdida de aversión al ser humano.", isCorrect: true },
      { id: "b", text: "Haber permanecido bajo cuidados hospitalarios por un período superior a una semana en el área de cuarentena estricta.", isCorrect: false },
      { id: "c", text: "Que el ejemplar corresponda a una especie con hábitos de distribución exclusivamente oceánicos y no costeros.", isCorrect: false },
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
  const sortedQuestions = Object.values(questions).sort((a, b) => a.order - b.order);

  if (sortedQuestions.some((question) => question.type)) {
    return Object.fromEntries(
      sortedQuestions.map((question, index) => {
        const type = question.type ?? "open";
        return [
          question.id,
          {
            ...question,
            type,
            order: index + 1,
            ...(type === "open" ? { minLength: question.minLength ?? 50 } : {}),
          } as CourseQuestion,
        ];
      })
    );
  }

  const grouped: Record<string, BaseQuestion[]> = {};

  sortedQuestions.forEach((question) => {
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
