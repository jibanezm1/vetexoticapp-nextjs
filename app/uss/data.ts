export const USS_SESSION_ID = "uss_live";
export const USS_TITLE = "Evaluación USS";
export const USS_SESSION_ROOT = "quiz_sessions";

export interface GroupMember {
  id: string;
  name: string;
}

export interface UssGroup {
  id: string;
  number: number;
  title: string;
  focus: string;
  image: string;
  members: GroupMember[];
}

export interface SelfAssessmentQuestion {
  id:
    | "mainContribution"
    | "learning"
    | "groupDecision"
    | "improvement"
    | "commitment";
  prompt: string;
  type: "text" | "scale";
}

export interface PeerCriterion {
  id:
    | "researchParticipation"
    | "taskCompletion"
    | "designContribution"
    | "collaborationRespect"
    | "topicMastery";
  label: string;
  descriptions: Record<1 | 2 | 3 | 4, string>;
}

function toMember(name: string): GroupMember {
  return {
    id: slugify(name),
    name,
  };
}

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

export const ussGroups: UssGroup[] = [
  {
    id: "grupo-1",
    number: 1,
    title: "Zoonosis en fauna silvestre: ¿por qué no acercarse ni interactuar con ciertos animales silvestres?",
    focus: "Público general y prevención de riesgos sanitarios.",
    image: "rata.png",
    members: [
      toMember("María José Aravena Moya"),
      toMember("Carla Chamorro Champos"),
      toMember("Pía Núñez Santander"),
      toMember("Jasmine Olivos Suxe"),
    ],
  },
  {
    id: "grupo-2",
    number: 2,
    title: "Detección de pingüinos varados: ¿cómo actuar?",
    focus: "Público general en zonas costeras.",
    image: "conejo.png",
    members: [
      toMember("Constanza Alvarado Medina"),
      toMember("Ayleen Herraz Nuñez"),
      toMember("Dayana Sáez Reyes"),
    ],
  },
  {
    id: "grupo-3",
    number: 3,
    title: "Ataque de gatos o perros hacia fauna silvestre",
    focus: "Tutores de perros y gatos y consecuencias para fauna nativa.",
    image: "huron.png",
    members: [
      toMember("Paloma Canales Arellano"),
      toMember("Ignacia Medina Cortez"),
      toMember("Nicole Sánchez Talbot"),
    ],
  },
  {
    id: "grupo-4",
    number: 4,
    title: "¿Por qué no se recomienda cuidar fauna silvestre en el hogar?",
    focus: "Consecuencias para bienestar y conservación.",
    image: "erizo.png",
    members: [
      toMember("Paula Durán García"),
      toMember("Paula Espinoza Imio"),
      toMember("Diego Herrera Sandoval"),
    ],
  },
  {
    id: "grupo-5",
    number: 5,
    title: "¿Cómo actuar ante la detección de un ave polluelo o volantón fuera del nido?",
    focus: "Público general frente a aves nativas.",
    image: "cobayos.png",
    members: [
      toMember("Danae Gutiérrez Canales"),
      toMember("Francisca Jorquera Viveros"),
      toMember("Maciel Maturana Rivera"),
      toMember("Dannae Sandoval Aravena"),
    ],
  },
  {
    id: "grupo-6",
    number: 6,
    title: "Primera respuesta ante detección de fauna con petróleo o hidrocarburos",
    focus: "Público general o primeros respondedores.",
    image: "hamaster.png",
    members: [
      toMember("Sergio Muñoz Muñoz"),
      toMember("Camila Olivero Pino"),
      toMember("José Tomás Zuñiga Aravena"),
    ],
  },
  {
    id: "grupo-7",
    number: 7,
    title: "Detección de lobos marinos varados: ¿cómo actuar?",
    focus: "Personas que encuentran fauna marina varada.",
    image: "conejo.png",
    members: [
      toMember("Fabiana Córdova Ruiz"),
      toMember("María Ignacia Lagunas Domínguez"),
    ],
  },
  {
    id: "grupo-8",
    number: 8,
    title: "Primera respuesta ante detección de fauna afectada por incendios forestales",
    focus: "Público general o primeros respondedores ante emergencias.",
    image: "huron.png",
    members: [
      toMember("Ámbar Cornejo Estay"),
      toMember("Javiera Gallardo Baeza"),
      toMember("Catalina Osorio Salazar"),
    ],
  },
  {
    id: "grupo-9",
    number: 9,
    title: "Qué es la impronta y habituación: ¿cómo diferenciarlos?",
    focus: "Explicar conceptos y consecuencias para rehabilitación o liberación.",
    image: "erizo.png",
    members: [
      toMember("Amanda Aranda Lafquén"),
      toMember("Sofía Norambiena Villegas"),
    ],
  },
  {
    id: "grupo-10",
    number: 10,
    title: "Choque de aves contra ventanales",
    focus: "Situación frecuente orientada al público general.",
    image: "cobayos.png",
    members: [
      toMember("Marcelo Lillo Galdames"),
      toMember("Rocío Saavedra"),
      toMember("Fernanda López Reyes"),
    ],
  },
];

export const groupCatalog = Object.fromEntries(
  ussGroups.map((group) => [group.id, group]),
) as Record<string, UssGroup>;

export const selfAssessmentQuestions: SelfAssessmentQuestion[] = [
  {
    id: "mainContribution",
    prompt: "¿Cuál fue mi principal aporte al producto final?",
    type: "text",
  },
  {
    id: "learning",
    prompt: "¿Qué aprendí sobre el manejo responsable de fauna silvestre?",
    type: "text",
  },
  {
    id: "groupDecision",
    prompt: "¿Qué decisión del grupo mejoró la calidad del mensaje educativo?",
    type: "text",
  },
  {
    id: "improvement",
    prompt: "¿Qué aspecto podría mejorar en una próxima actividad?",
    type: "text",
  },
  {
    id: "commitment",
    prompt: "En escala de 1 a 4, ¿cómo evalúo mi compromiso con el trabajo?",
    type: "scale",
  },
];

export const peerCriteria: PeerCriterion[] = [
  {
    id: "researchParticipation",
    label: "Participación en la búsqueda de información",
    descriptions: {
      4: "Participó activamente y aportó fuentes útiles",
      3: "Participó de forma adecuada",
      2: "Participó poco",
      1: "No participó",
    },
  },
  {
    id: "taskCompletion",
    label: "Cumplimiento de tareas acordadas",
    descriptions: {
      4: "Cumplió completamente y a tiempo",
      3: "Cumplió con leves retrasos",
      2: "Cumplió parcialmente",
      1: "No cumplió",
    },
  },
  {
    id: "designContribution",
    label: "Aporte al diseño o producción del material",
    descriptions: {
      4: "Realizó aportes significativos",
      3: "Aportó de forma adecuada",
      2: "Aportó poco",
      1: "No aportó",
    },
  },
  {
    id: "collaborationRespect",
    label: "Trabajo colaborativo y respeto",
    descriptions: {
      4: "Favoreció el trabajo del grupo",
      3: "Se integró adecuadamente",
      2: "Tuvo participación irregular",
      1: "Dificultó el trabajo",
    },
  },
  {
    id: "topicMastery",
    label: "Dominio del tema",
    descriptions: {
      4: "Demostró dominio sólido",
      3: "Dominio adecuado",
      2: "Dominio básico",
      1: "Bajo dominio",
    },
  },
];

export function getGroupImage(groupId?: string | null) {
  if (!groupId) return null;
  return groupCatalog[groupId]?.image ?? null;
}

export function getNextGroupId(currentGroupId?: string | null) {
  if (!currentGroupId) return ussGroups[0]?.id ?? null;

  const currentIndex = ussGroups.findIndex((group) => group.id === currentGroupId);
  if (currentIndex === -1 || currentIndex === ussGroups.length - 1) return null;
  return ussGroups[currentIndex + 1].id;
}
