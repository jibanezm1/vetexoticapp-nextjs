export const EXPO_SESSION_ID = "uss_live";
export const EXPO_TITLE = "USS Fauna Silvestre";
export const EXPO_SESSION_ROOT = "quiz_sessions";
export const EXPO_QUIZ_TIMEOUT_MS = 60_000;

export type SpeciesId =
  | "zoonosis"
  | "pinguinos"
  | "mascotas"
  | "hogar"
  | "polluelos"
  | "hidro";

export interface SpeciesMeta {
  id: SpeciesId;
  label: string;
  image: string;
}

export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: number;
  prompt: string;
  options: QuizOption[];
}

export const speciesCatalog: Record<SpeciesId, SpeciesMeta> = {
  zoonosis: { id: "zoonosis", label: "Zoonosis en fauna silvestre", image: "rata.png" },
  pinguinos: { id: "pinguinos", label: "Pingüinos varados", image: "conejo.png" },
  mascotas: { id: "mascotas", label: "Ataque de perros y gatos", image: "huron.png" },
  hogar: { id: "hogar", label: "Fauna silvestre en el hogar", image: "erizo.png" },
  polluelos: { id: "polluelos", label: "Polluelos fuera del nido", image: "cobayos.png" },
  hidro: { id: "hidro", label: "Fauna con hidrocarburos", image: "hamaster.png" },
};

export const speciesOptions = Object.values(speciesCatalog);

export const quizBySpecies: Record<SpeciesId, QuizQuestion[]> = {
  zoonosis: [
    {
      id: 1,
      prompt: "Si encuentras fauna silvestre, ¿cuál es la conducta más segura para reducir riesgo sanitario?",
      options: [
        { text: "Mantener distancia y evitar manipularla", correct: true },
        { text: "Tomarla rápido antes de que escape", correct: false },
        { text: "Llevarla a casa para observarla mejor", correct: false },
      ],
    },
    {
      id: 2,
      prompt: "¿Qué debe comunicar una publicación responsable sobre zoonosis?",
      options: [
        { text: "Que algunas interacciones pueden afectar tanto a personas como a animales", correct: true },
        { text: "Que tocar fauna silvestre no tiene consecuencias relevantes", correct: false },
        { text: "Que basta con alimentarla para ayudarla", correct: false },
      ],
    },
    {
      id: 3,
      prompt: "Frente a ciertos animales silvestres, ¿qué mensaje NO es adecuado?",
      options: [
        { text: "Alejar mascotas y niños del lugar", correct: false },
        { text: "Respetar el espacio del animal", correct: false },
        { text: "Acercarse para grabarlo o tocarlo de cerca", correct: true },
      ],
    },
    {
      id: 4,
      prompt: "Según la pauta USS, una recomendación clara para público general debe:",
      options: [
        { text: "Decir qué hacer y qué no hacer de forma simple", correct: true },
        { text: "Usar solo lenguaje técnico", correct: false },
        { text: "Dejar la acción abierta a interpretación", correct: false },
      ],
    },
    {
      id: 5,
      prompt: "¿Qué institución o canal debe incluirse cuando corresponde?",
      options: [
        { text: "Autoridad o centro autorizado pertinente al caso", correct: true },
        { text: "Solo la cuenta personal del creador", correct: false },
        { text: "Ningún contacto para evitar consultas", correct: false },
      ],
    },
  ],
  pinguinos: [
    {
      id: 1,
      prompt: "Si ves un pingüino varado en la playa, ¿qué acción es la más adecuada?",
      options: [
        { text: "Observar a distancia y contactar a la institución correspondiente", correct: true },
        { text: "Devolverlo de inmediato al mar por tu cuenta", correct: false },
        { text: "Moverlo a un patio para cuidarlo", correct: false },
      ],
    },
    {
      id: 2,
      prompt: "¿Por qué no se recomienda manipular un pingüino sin indicación?",
      options: [
        { text: "Porque puede aumentar su estrés y empeorar su condición", correct: true },
        { text: "Porque siempre intentará atacar", correct: false },
        { text: "Porque así aprende a volver solo a casa", correct: false },
      ],
    },
    {
      id: 3,
      prompt: "¿Qué debe hacer una persona con sus mascotas cerca de un pingüino varado?",
      options: [
        { text: "Alejarlas para evitar estrés, heridas o contagios", correct: true },
        { text: "Acercarlas con correa para que lo huelan", correct: false },
        { text: "Dejarlas sueltas para que lo rodeen", correct: false },
      ],
    },
    {
      id: 4,
      prompt: "¿Qué tipo de mensaje encaja mejor con una historia o carrusel educativo sobre este tema?",
      options: [
        { text: "Qué hacer, qué no hacer y a quién llamar", correct: true },
        { text: "Una lista larga de definiciones sin instrucciones", correct: false },
        { text: "Solo una foto bonita del animal", correct: false },
      ],
    },
    {
      id: 5,
      prompt: "En Chile, ¿qué tipo de canal debe mencionarse en este escenario costero?",
      options: [
        { text: "SERNAPESCA u otra autoridad indicada para fauna marina", correct: true },
        { text: "Solo una tienda de mascotas", correct: false },
        { text: "Ninguna institución", correct: false },
      ],
    },
  ],
  mascotas: [
    {
      id: 1,
      prompt: "Si un perro o gato ataca fauna silvestre, ¿qué enfoque debe transmitir el mensaje?",
      options: [
        { text: "Prevención y tenencia responsable", correct: true },
        { text: "Que el daño es poco importante", correct: false },
        { text: "Que basta con soltar al animal después", correct: false },
      ],
    },
    {
      id: 2,
      prompt: "¿Qué medida preventiva es correcta para tutores de perros y gatos?",
      options: [
        { text: "Evitar el libre deambular y supervisar salidas", correct: true },
        { text: "Permitir caza para que se ejerciten", correct: false },
        { text: "Asumir que solo afectan especies invasoras", correct: false },
      ],
    },
    {
      id: 3,
      prompt: "Si una persona encuentra fauna herida tras el ataque de una mascota, ¿qué NO debe hacer?",
      options: [
        { text: "Manipularla sin protección ni orientación", correct: true },
        { text: "Contactar a la institución pertinente", correct: false },
        { text: "Separar a la mascota del animal lesionado", correct: false },
      ],
    },
    {
      id: 4,
      prompt: "¿Por qué este tema se conecta con bienestar animal y conservación?",
      options: [
        { text: "Porque puede provocar lesiones, muerte y alteración de fauna nativa", correct: true },
        { text: "Porque solo afecta la estética del entorno", correct: false },
        { text: "Porque no tiene impacto real si ocurre pocas veces", correct: false },
      ],
    },
    {
      id: 5,
      prompt: "Una buena pieza para redes sobre este tema debe estar dirigida especialmente a:",
      options: [
        { text: "Tutores de perros y gatos y público general", correct: true },
        { text: "Solo especialistas universitarios", correct: false },
        { text: "Solo niños pequeños", correct: false },
      ],
    },
  ],
  hogar: [
    {
      id: 1,
      prompt: "¿Por qué no se recomienda cuidar fauna silvestre en el hogar?",
      options: [
        { text: "Porque puede comprometer bienestar, salud y posibilidades de rehabilitación", correct: true },
        { text: "Porque siempre se vuelve agresiva en minutos", correct: false },
        { text: "Porque en casa se recupera más rápido que con profesionales", correct: false },
      ],
    },
    {
      id: 2,
      prompt: "¿Qué mensaje es más responsable si alguien encuentra fauna silvestre?",
      options: [
        { text: "No mantenerla en casa y buscar orientación autorizada", correct: true },
        { text: "Criarla hasta que se vea fuerte", correct: false },
        { text: "Mostrarla en redes antes de pedir ayuda", correct: false },
      ],
    },
    {
      id: 3,
      prompt: "¿Qué riesgo comunicacional debe evitar el producto USS?",
      options: [
        { text: "Promover manipulación innecesaria de fauna", correct: true },
        { text: "Pedir distancia y calma", correct: false },
        { text: "Indicar canales de contacto", correct: false },
      ],
    },
    {
      id: 4,
      prompt: "¿Qué fundamento técnico respalda no criar fauna silvestre en casa?",
      options: [
        { text: "Puede producir estrés, impronta, habituación y manejo inadecuado", correct: true },
        { text: "Porque los hogares siempre tienen temperatura perfecta", correct: false },
        { text: "Porque toda fauna necesita solo alimento y descanso", correct: false },
      ],
    },
    {
      id: 5,
      prompt: "Según la pauta, una recomendación clara en redes debería incluir:",
      options: [
        { text: "Qué hacer, qué evitar y a quién contactar", correct: true },
        { text: "Solo una opinión personal", correct: false },
        { text: "Solo imágenes sin texto", correct: false },
      ],
    },
  ],
  polluelos: [
    {
      id: 1,
      prompt: "Si ves un polluelo o volantón fuera del nido, ¿cuál es la primera conducta más prudente?",
      options: [
        { text: "Observar el contexto antes de intervenir", correct: true },
        { text: "Llevarlo de inmediato a casa", correct: false },
        { text: "Alimentarlo enseguida con pan o leche", correct: false },
      ],
    },
    {
      id: 2,
      prompt: "¿Qué diferencia debe explicar una buena publicación sobre este caso?",
      options: [
        { text: "Que no todo polluelo encontrado necesita rescate", correct: true },
        { text: "Que todos deben ser retirados del lugar", correct: false },
        { text: "Que siempre están abandonados", correct: false },
      ],
    },
    {
      id: 3,
      prompt: "¿Qué medida puede ser útil mientras se evalúa la situación?",
      options: [
        { text: "Alejar mascotas y personas del ave", correct: true },
        { text: "Tomarlo para revisarlo por varios minutos", correct: false },
        { text: "Subir su ubicación exacta a redes sociales", correct: false },
      ],
    },
    {
      id: 4,
      prompt: "¿Qué error frecuente debería prevenir el contenido?",
      options: [
        { text: "Confundir una etapa normal de aprendizaje con abandono", correct: true },
        { text: "Pedir ayuda profesional", correct: false },
        { text: "Mantener distancia", correct: false },
      ],
    },
    {
      id: 5,
      prompt: "¿Qué característica pide la rúbrica para un caso real bien presentado?",
      options: [
        { text: "Especie o grupo, escenario, riesgo y conducta recomendada", correct: true },
        { text: "Solo una consigna llamativa", correct: false },
        { text: "Solo citar bibliografía sin contexto", correct: false },
      ],
    },
  ],
  hidro: [
    {
      id: 1,
      prompt: "Si encuentras fauna silvestre con petróleo o hidrocarburos, ¿qué NO deberías hacer?",
      options: [
        { text: "Lavarla por tu cuenta con agua o detergente", correct: true },
        { text: "Contactar a la autoridad o centro autorizado", correct: false },
        { text: "Mantener distancia y evitar manipulación", correct: false },
      ],
    },
    {
      id: 2,
      prompt: "¿Por qué el manejo improvisado puede ser riesgoso en estos casos?",
      options: [
        { text: "Porque aumenta estrés y expone a contaminantes", correct: true },
        { text: "Porque el petróleo se elimina solo en minutos", correct: false },
        { text: "Porque el contacto humano siempre mejora su condición", correct: false },
      ],
    },
    {
      id: 3,
      prompt: "¿A qué público puede dirigirse especialmente este mensaje, según la guía USS?",
      options: [
        { text: "Público general y primeros respondedores", correct: true },
        { text: "Solo estudiantes del curso", correct: false },
        { text: "Solo dueños de fauna exótica doméstica", correct: false },
      ],
    },
    {
      id: 4,
      prompt: "¿Qué estructura sería adecuada en un reel breve sobre este tema?",
      options: [
        { text: "Gancho, problema, qué hacer, qué evitar y contacto", correct: true },
        { text: "Definiciones extensas sin acciones concretas", correct: false },
        { text: "Solo imágenes con música", correct: false },
      ],
    },
    {
      id: 5,
      prompt: "¿Qué valor debe tener la información entregada al público?",
      options: [
        { text: "Ser clara, segura y basada en evidencia", correct: true },
        { text: "Ser impactante aunque no sea precisa", correct: false },
        { text: "Ser breve aunque promueva acciones inadecuadas", correct: false },
      ],
    },
  ],
};

export interface TutorLevel {
  id: 1 | 2 | 3 | 4;
  title: string;
  minScore: number;
  description: string;
}

export const tutorLevels: TutorLevel[] = [
  {
    id: 1,
    title: "Nivel 1: Inicial",
    minScore: 0,
    description: "Aún falta reforzar criterios sanitarios y de conservación para comunicar con seguridad.",
  },
  {
    id: 2,
    title: "Nivel 2: En desarrollo",
    minScore: 2,
    description: "Ya identificas varias conductas correctas, pero todavía puedes afinar claridad y enfoque preventivo.",
  },
  {
    id: 3,
    title: "Nivel 3: Competente",
    minScore: 3,
    description: "Manejas bien las recomendaciones clave y reconoces acciones responsables frente a fauna silvestre.",
  },
  {
    id: 4,
    title: "Nivel 4: Sobresaliente",
    minScore: 5,
    description: "Tu criterio es sólido y se alinea muy bien con el enfoque sanitario, de bienestar y conservación.",
  },
];

export function getTutorLevel(score: number) {
  if (score >= 5) return tutorLevels[3];
  if (score >= 3) return tutorLevels[2];
  if (score >= 2) return tutorLevels[1];
  return tutorLevels[0];
}

export function getSpeciesImage(species?: string | null) {
  if (!species) return null;
  return speciesCatalog[species as SpeciesId]?.image ?? null;
}
