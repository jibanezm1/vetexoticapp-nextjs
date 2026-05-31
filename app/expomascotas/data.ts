export const EXPO_SESSION_ID = "expo_mascotas_live";
export const EXPO_TITLE = "Expomascotas";

export type SpeciesId =
  | "erizo"
  | "rata"
  | "conejo"
  | "cobayo"
  | "hamster"
  | "huron";

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
  erizo: { id: "erizo", label: "Erizo", image: "erizo.png" },
  rata: { id: "rata", label: "Rata", image: "rata.png" },
  conejo: { id: "conejo", label: "Conejo", image: "conejo.png" },
  cobayo: { id: "cobayo", label: "Cobayo", image: "cobayos.png" },
  hamster: { id: "hamster", label: "Hámster", image: "hamaster.png" },
  huron: { id: "huron", label: "Hurón", image: "huron.png" },
};

export const speciesOptions = Object.values(speciesCatalog);

export const quizBySpecies: Record<SpeciesId, QuizQuestion[]> = {
  erizo: [
    {
      id: 1,
      prompt: "¿Qué tipo de alimentación es más adecuada para un erizo mascota?",
      options: [
        { text: "Solo frutas y verduras", correct: false },
        { text: "Dieta alta en proteína animal, equilibrada y supervisada", correct: true },
        { text: "Solo pan o cereales", correct: false },
      ],
    },
    {
      id: 2,
      prompt: "¿Qué alimento se debe evitar en erizos?",
      options: [
        { text: "Insectos aptos para consumo animal", correct: false },
        { text: "Alimento balanceado recomendado", correct: false },
        { text: "Leche de vaca", correct: true },
      ],
    },
    {
      id: 3,
      prompt: "¿Qué condición ambiental es importante para un erizo?",
      options: [
        { text: "Mantenerlo en un ambiente muy frío", correct: false },
        { text: "Mantener temperatura adecuada y evitar cambios bruscos", correct: true },
        { text: "Dejarlo siempre al aire libre", correct: false },
      ],
    },
    {
      id: 4,
      prompt: "¿Qué conducta puede indicar que un erizo necesita atención?",
      options: [
        { text: "Estar activo durante la noche", correct: false },
        { text: "Enrollarse cuando se asusta", correct: false },
        { text: "No comer, bajar de peso o estar muy decaído", correct: true },
      ],
    },
    {
      id: 5,
      prompt: "¿Qué elemento ayuda al bienestar de un erizo?",
      options: [
        { text: "Espacio seguro, refugio y enriquecimiento ambiental", correct: true },
        { text: "Jaula sin escondites", correct: false },
        { text: "Manipulación constante aunque esté estresado", correct: false },
      ],
    },
  ],
  rata: [
    {
      id: 1,
      prompt: "¿Qué es importante para el bienestar social de las ratas?",
      options: [
        { text: "Vivir siempre completamente solas", correct: false },
        { text: "Tener compañía de otras ratas compatibles", correct: true },
        { text: "No recibir interacción ni estímulos", correct: false },
      ],
    },
    {
      id: 2,
      prompt: "¿Cuál es una alimentación más adecuada para una rata mascota?",
      options: [
        { text: "Dieta equilibrada específica para roedores", correct: true },
        { text: "Solo semillas de girasol", correct: false },
        { text: "Solo restos de comida humana", correct: false },
      ],
    },
    {
      id: 3,
      prompt: "¿Qué alimento o práctica se debe evitar?",
      options: [
        { text: "Agua fresca disponible", correct: false },
        { text: "Exceso de alimentos grasos o azucarados", correct: true },
        { text: "Enriquecimiento ambiental", correct: false },
      ],
    },
    {
      id: 4,
      prompt: "¿Qué señal puede indicar un problema de salud?",
      options: [
        { text: "Curiosear y explorar", correct: false },
        { text: "Dormir en algunos momentos del día", correct: false },
        { text: "Respiración ruidosa, decaimiento o pérdida de apetito", correct: true },
      ],
    },
    {
      id: 5,
      prompt: "¿Qué necesita una rata en su ambiente?",
      options: [
        { text: "Jaula pequeña y sin objetos", correct: false },
        { text: "Espacio, escondites, juguetes seguros y limpieza regular", correct: true },
        { text: "Solo una rueda sin más estímulos", correct: false },
      ],
    },
  ],
  conejo: [
    {
      id: 1,
      prompt: "¿Cuál debe ser la base principal de la dieta de un conejo adulto?",
      options: [
        { text: "Heno de buena calidad disponible todos los días", correct: true },
        { text: "Pan y galletas", correct: false },
        { text: "Fruta como alimento principal", correct: false },
      ],
    },
    {
      id: 2,
      prompt: "¿Por qué es importante el heno en conejos?",
      options: [
        { text: "Ayuda al desgaste dental y al buen funcionamiento digestivo", correct: true },
        { text: "Solo sirve como cama", correct: false },
        { text: "No tiene importancia si come pellets", correct: false },
      ],
    },
    {
      id: 3,
      prompt: "¿Qué alimento debe darse con moderación?",
      options: [
        { text: "Heno", correct: false },
        { text: "Frutas", correct: true },
        { text: "Agua fresca", correct: false },
      ],
    },
    {
      id: 4,
      prompt: "¿Qué señal puede indicar urgencia o problema importante?",
      options: [
        { text: "Que coma heno durante el día", correct: false },
        { text: "Que salte y explore", correct: false },
        { text: "Que deje de comer o no defeque normalmente", correct: true },
      ],
    },
    {
      id: 5,
      prompt: "¿Qué cuidado es recomendable?",
      options: [
        { text: "Revisar dientes, uñas, apetito y deposiciones con frecuencia", correct: true },
        { text: "Bañarlo todas las semanas", correct: false },
        { text: "Mantenerlo siempre en una jaula pequeña", correct: false },
      ],
    },
  ],
  cobayo: [
    {
      id: 1,
      prompt: "¿Qué nutriente es esencial en cobayos porque no lo producen por sí mismos?",
      options: [
        { text: "Vitamina C", correct: true },
        { text: "Azúcar", correct: false },
        { text: "Sal extra", correct: false },
      ],
    },
    {
      id: 2,
      prompt: "¿Cuál debe ser la base de la dieta de un cobayo?",
      options: [
        { text: "Heno disponible todos los días", correct: true },
        { text: "Pan duro", correct: false },
        { text: "Solo frutas", correct: false },
      ],
    },
    {
      id: 3,
      prompt: "¿Qué alimento puede ayudar a aportar vitamina C?",
      options: [
        { text: "Verduras frescas adecuadas, como pimentón en porciones controladas", correct: true },
        { text: "Chocolate", correct: false },
        { text: "Galletas dulces", correct: false },
      ],
    },
    {
      id: 4,
      prompt: "¿Qué señal puede indicar que un cobayo no está bien?",
      options: [
        { text: "Comer heno", correct: false },
        { text: "Vocalizar ocasionalmente", correct: false },
        { text: "Dejar de comer, estar quieto o bajar de peso", correct: true },
      ],
    },
    {
      id: 5,
      prompt: "¿Qué tipo de ambiente necesita un cobayo?",
      options: [
        { text: "Espacio amplio, limpio, con refugios y buena ventilación", correct: true },
        { text: "Piso resbaloso y sin escondites", correct: false },
        { text: "Jaula sucia para que conserve su olor", correct: false },
      ],
    },
  ],
  hamster: [
    {
      id: 1,
      prompt: "¿Qué tipo de alimentación es más adecuada para un hámster?",
      options: [
        { text: "Mezcla o pellet balanceado para hámster", correct: true },
        { text: "Solo pan", correct: false },
        { text: "Solo dulces y fruta", correct: false },
      ],
    },
    {
      id: 2,
      prompt: "¿Qué alimento debe evitarse o darse con mucho cuidado?",
      options: [
        { text: "Agua fresca", correct: false },
        { text: "Alimentos azucarados en exceso", correct: true },
        { text: "Alimento balanceado adecuado", correct: false },
      ],
    },
    {
      id: 3,
      prompt: "¿Qué elemento es importante en su jaula?",
      options: [
        { text: "Refugio, sustrato adecuado y rueda segura", correct: true },
        { text: "Piso de alambre sin descanso", correct: false },
        { text: "Sin escondites para verlo mejor", correct: false },
      ],
    },
    {
      id: 4,
      prompt: "¿Qué conducta es normal en muchos hámsters?",
      options: [
        { text: "Ser más activo durante la noche", correct: true },
        { text: "Necesitar baños frecuentes con shampoo", correct: false },
        { text: "Comer solo una vez a la semana", correct: false },
      ],
    },
    {
      id: 5,
      prompt: "¿Qué práctica ayuda a evitar estrés?",
      options: [
        { text: "Despertarlo bruscamente durante el día", correct: false },
        { text: "Manipularlo con paciencia y respetar sus horarios", correct: true },
        { text: "Cambiar toda su jaula varias veces al día", correct: false },
      ],
    },
  ],
  huron: [
    {
      id: 1,
      prompt: "¿Qué tipo de alimentación es la más adecuada para un hurón?",
      options: [
        { text: "Dieta alta en proteína animal y grasa de calidad", correct: true },
        { text: "Solo frutas y verduras", correct: false },
        { text: "Pan y cereales todos los días", correct: false },
      ],
    },
    {
      id: 2,
      prompt: "¿Qué se debe evitar en la dieta de un hurón?",
      options: [
        { text: "Agua fresca disponible", correct: false },
        { text: "Alimentos con mucho azúcar o carbohidratos", correct: true },
        { text: "Alimento formulado para hurones", correct: false },
      ],
    },
    {
      id: 3,
      prompt: "¿Qué conducta puede ser normal en un hurón sano?",
      options: [
        { text: "Dormir varias horas y luego tener picos de actividad", correct: true },
        { text: "No comer en todo el día", correct: false },
        { text: "Respirar con dificultad", correct: false },
      ],
    },
    {
      id: 4,
      prompt: "¿Qué necesita un hurón para su bienestar?",
      options: [
        { text: "Enriquecimiento, juego supervisado y espacios seguros", correct: true },
        { text: "Permanecer siempre encerrado sin interacción", correct: false },
        { text: "Ambientes sin escondites ni estímulos", correct: false },
      ],
    },
    {
      id: 5,
      prompt: "¿Qué señal amerita consultar al veterinario?",
      options: [
        { text: "Explorar con curiosidad", correct: false },
        { text: "Pérdida de apetito, diarrea o decaimiento marcado", correct: true },
        { text: "Dormir después de jugar", correct: false },
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
    title: "Tutor Nivel 1: Explorador",
    minScore: 0,
    description: "Estás dando tus primeros pasos. Hay mucho potencial para seguir aprendiendo.",
  },
  {
    id: 2,
    title: "Tutor Nivel 2: Atento",
    minScore: 2,
    description: "Tienes bases sólidas y ya reconoces cuidados importantes para tu mascota.",
  },
  {
    id: 3,
    title: "Tutor Nivel 3: Comprometido",
    minScore: 3,
    description: "Demuestras buen criterio y hábitos de cuidado responsables.",
  },
  {
    id: 4,
    title: "Tutor Nivel 4: Experto",
    minScore: 5,
    description: "Tu nivel es sobresaliente. Manejas muy bien los cuidados clave de la especie.",
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
