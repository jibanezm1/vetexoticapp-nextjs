export interface QuizOption {
  text: string;
  correct: boolean;
}

export interface QuizQuestion {
  id: number;
  bird: string;
  scientific: string;
  image: string; // nombre del archivo en /public/images/quiz/
  options: QuizOption[];
}

export const QUIZ_TITLE = "Aves Rapaces de Chile";

export const questions: QuizQuestion[] = [
  {
    id: 1,
    bird: "Cóndor andino",
    scientific: "Vultur gryphus",
    image: "condor.png",
    options: [
      { text: "Cóndor (Vultur gryphus)", correct: true },
      { text: "Peuco (Parabuteo unicinctus)", correct: false },
      { text: "Cernícalo (Falco sparverius)", correct: false },
    ],
  },
  {
    id: 2,
    bird: "Jote de cabeza colorada",
    scientific: "Cathartes aura",
    image: "jotecabezacolorada.png",
    options: [
      { text: "Aguilucho común (Buteo polyosoma)", correct: false },
      { text: "Jote de cabeza colorada (Cathartes aura)", correct: true },
      { text: "Águila pescadora (Pandion haliaetus)", correct: false },
    ],
  },
  {
    id: 3,
    bird: "Águila mora",
    scientific: "Geranoaetus melanoleucus",
    image: "aguilamora.png",
    options: [
      { text: "Bailarín (Elanus leucurus)", correct: false },
      { text: "Vari huevetero (Circus buffoni)", correct: false },
      { text: "Águila mora (Geranoaetus melanoleucus)", correct: true },
    ],
  },
  {
    id: 4,
    bird: "Halcón peregrino",
    scientific: "Falco peregrinus",
    image: "halconperegrino.png",
    options: [
      { text: "Chuncho (Glaucidium nanum)", correct: false },
      { text: "Halcón peregrino (Falco peregrinus)", correct: true },
      { text: "Lechuza blanca (Tyto alba)", correct: false },
    ],
  },
  {
    id: 5,
    bird: "Aguilucho común",
    scientific: "Buteo polyosoma",
    image: "aguiluchocomun.png",
    options: [
      { text: "Águila pescadora (Pandion haliaetus)", correct: false },
      { text: "Nuco (Asio flammeus)", correct: false },
      { text: "Aguilucho común (Buteo polyosoma)", correct: true },
    ],
  },
  {
    id: 6,
    bird: "Peuco",
    scientific: "Parabuteo unicinctus",
    image: "peuco.png",
    options: [
      { text: "Peuco (Parabuteo unicinctus)", correct: true },
      { text: "Águila pescadora (Pandion haliaetus)", correct: false },
      { text: "Cernícalo (Falco sparverius)", correct: false },
    ],
  },
  {
    id: 7,
    bird: "Vari huevetero",
    scientific: "Circus buffoni",
    image: "varihuevetero.png",
    options: [
      { text: "Tucúquere (Bubo magellanicus)", correct: false },
      { text: "Vari huevetero (Circus buffoni)", correct: true },
      { text: "Cóndor (Vultur gryphus)", correct: false },
    ],
  },
  {
    id: 8,
    bird: "Bailarín (Milano bailarín)",
    scientific: "Elanus leucurus",
    image: "bailarin.png",
    options: [
      { text: "Bailarín (Elanus leucurus)", correct: true },
      { text: "Traro (Carancho) (Caracara plancus)", correct: false },
      { text: "Cernícalo (Falco sparverius)", correct: false },
    ],
  },
  {
    id: 9,
    bird: "Cernícalo",
    scientific: "Falco sparverius",
    image: "cernicalo.png",
    options: [
      { text: "Cernícalo (Falco sparverius)", correct: true },
      { text: "Lechuza blanca (Tyto alba)", correct: false },
      { text: "Nuco (Asio flammeus)", correct: false },
    ],
  },
  {
    id: 10,
    bird: "Traro (Carancho)",
    scientific: "Caracara plancus",
    image: "traro.png",
    options: [
      { text: "Nuco (Asio flammeus)", correct: false },
      { text: "Traro (Carancho) (Caracara plancus)", correct: true },
      { text: "Jote de cabeza colorada (Cathartes aura)", correct: false },
    ],
  },
  {
    id: 11,
    bird: "Tucúquere",
    scientific: "Bubo magellanicus",
    image: "tucuquere.png",
    options: [
      { text: "Chuncho (Glaucidium nanum)", correct: false },
      { text: "Cernícalo (Falco sparverius)", correct: false },
      { text: "Tucúquere (Bubo magellanicus)", correct: true },
    ],
  },
  {
    id: 12,
    bird: "Nuco",
    scientific: "Asio flammeus",
    image: "nuco.png",
    options: [
      { text: "Aguilucho común (Buteo polyosoma)", correct: false },
      { text: "Nuco (Asio flammeus)", correct: true },
      { text: "Vari huevetero (Circus buffoni)", correct: false },
    ],
  },
  {
    id: 13,
    bird: "Chuncho",
    scientific: "Glaucidium nanum",
    image: "chuncho.png",
    options: [
      { text: "Chuncho (Glaucidium nanum)", correct: true },
      { text: "Bailarín (Elanus leucurus)", correct: false },
      { text: "Halcón perdiguero (Falco femoralis)", correct: false },
    ],
  },
  {
    id: 14,
    bird: "Lechuza blanca",
    scientific: "Tyto alba",
    image: "lechuzablanca.png",
    options: [
      { text: "Traro (Carancho) (Caracara plancus)", correct: false },
      { text: "Águila mora (Geranoaetus melanoleucus)", correct: false },
      { text: "Lechuza blanca (Tyto alba)", correct: true },
    ],
  },
];
