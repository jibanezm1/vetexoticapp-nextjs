import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Equipo Docente Veterinaria Exóticos Chile | Especialistas en Pequeños Mamíferos",
  description:
    "👩‍⚕️ Equipo de docentes especialistas en medicina veterinaria de animales exóticos en Chile. Natalia Villalobos, Macarena Hidalgo, Amparo Hidalgo y Camila Arancibia. Profesionales con experiencia en cirugía, odontología y medicina de pequeños mamíferos.",
  keywords: [
    "docentes veterinaria exóticos chile",
    "especialistas animales exóticos",
    "profesores veterinaria pequeños mamíferos",
    "equipo veterinario exóticos",
    "veterinarios especialistas chile",
    "Dra. Natalia Villalobos",
    "Dra. Macarena Hidalgo Pedemonte",
    "Dra. Amparo Hidalgo Mortera",
    "Dra. Camila Arancibia",
  ],
  openGraph: {
    type: "website",
    url: "https://vetexoticapp.cl/docentes",
    title: "Equipo Docente Veterinaria Exóticos Chile",
    description: "Profesionales especializadas en medicina veterinaria de animales exóticos.",
  },
  alternates: {
    canonical: "https://vetexoticapp.cl/docentes",
  },
};

export default function DocentesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
