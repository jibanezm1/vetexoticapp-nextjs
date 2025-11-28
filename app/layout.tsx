import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Script from "next/script";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Veterinaria Animales Exóticos Chile | Cirugía y Odontología - Dra. Siboney Pérez",
    template: "%s | VetExoticApp - Dra. Siboney Pérez",
  },
  description:
    "🐰 Veterinaria especialista en animales exóticos en Santiago, Chile. Dra. Siboney Pérez - GPCert (ExAP). Cirugía de tejidos blandos, odontología especializada y medicina interna para conejos, hurones, chinchillas, cobayos, erizos y pequeños mamíferos. Atención en Exoticare Maipú, Centro Veterinario República. Urgencias 24/7 y servicio a domicilio disponible.",
  keywords: [
    "veterinaria animales exóticos chile",
    "veterinaria especialista exóticos santiago",
    "cirugía animales exóticos chile",
    "odontología veterinaria conejos",
    "veterinario hurones santiago",
    "veterinario chinchillas chile",
    "veterinario cobayos",
    "veterinario erizos",
    "cirugía conejos santiago",
    "veterinaria exóticos maipú",
    "exoticare maipu",
    "veterinaria república santiago",
    "odontología animales exóticos",
    "cirugía tejidos blandos exóticos",
    "medicina interna animales exóticos",
    "veterinaria pequeños mamíferos",
    "especialista lagomorfos",
    "dra siboney pérez",
    "veterinario miomorfos",
    "atención veterinaria exóticos domicilio",
    "urgencias veterinarias exóticos",
    "esterilización conejos",
    "castración hurones",
    "dental rabbit",
    "abscesos dentales conejos",
    "cirugía maxilofacial animales exóticos",
  ],
  authors: [{ name: "Dra. Siboney Pérez" }],
  creator: "Dra. Siboney Pérez",
  publisher: "VetExoticApp",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Reemplazar con código real de Google Search Console
  },
  alternates: {
    canonical: 'https://vetexoticapp.cl',
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://vetexoticapp.cl/",
    siteName: "VetExoticApp - Dra. Siboney Pérez",
    title: "Veterinaria Animales Exóticos Chile | Cirugía y Odontología - Dra. Siboney Pérez",
    description:
      "Veterinaria especializada en animales exóticos. Cirugía, odontología y medicina interna para conejos, hurones, chinchillas y más.",
    images: [
      {
        url: "https://vetexoticapp.cl/images/dra-siboney-real.jpg",
        width: 1200,
        height: 630,
        alt: "Dra. Siboney Pérez - Veterinaria Especialista en Animales Exóticos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Veterinaria Animales Exóticos Chile | Dra. Siboney Pérez",
    description: "Especialista en cirugía y odontología de animales exóticos en Chile.",
    images: ["https://vetexoticapp.cl/images/dra-siboney-real.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        {/* Preconnect para mejorar performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/dra-siboney-real.jpg" />
        
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WSCG66X3');
          `}
        </Script>
        <link rel="stylesheet" href="/css/styles.css" />
        <link rel="stylesheet" href="/css/courses-cases.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <meta name="geo.region" content="CL-RM" />
        <meta name="geo.placename" content="Santiago, Chile" />
        <meta name="geo.position" content="-33.4489;-70.6693" />
        <meta name="ICBM" content="-33.4489, -70.6693" />
        
        {/* Schema.org structured data */}
        <Script id="structured-data-organization" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "VeterinaryCare",
              "name": "VetExoticApp - Dra. Siboney Pérez",
              "image": "https://vetexoticapp.cl/images/dra-siboney-real.jpg",
              "description": "Veterinaria especialista en animales exóticos en Santiago, Chile. Cirugía, odontología y medicina interna para pequeños mamíferos.",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Exoticare Maipú",
                "addressLocality": "Maipú",
                "addressRegion": "Santiago",
                "addressCountry": "CL"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -33.4489,
                "longitude": -70.6693
              },
              "url": "https://vetexoticapp.cl",
              "telephone": "+56934497035",
              "email": "vetexotic.app@gmail.com",
              "priceRange": "$$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "19:00"
              },
              "sameAs": [
                "https://www.instagram.com/drasibo.exotic"
              ]
            }
          `}
        </Script>
        
        <Script id="structured-data-person" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Dra. Siboney Pérez",
              "jobTitle": "Médico Veterinario Especialista en Animales Exóticos",
              "description": "Veterinaria especialista en cirugía de tejidos blandos y odontología de animales exóticos. GPCert (ExAP) ISVPS.",
              "url": "https://vetexoticapp.cl",
              "image": "https://vetexoticapp.cl/images/dra-siboney-real.jpg",
              "sameAs": [
                "https://www.instagram.com/drasibo.exotic"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Universidad Andrés Bello"
              },
              "worksFor": {
                "@type": "VeterinaryCare",
                "name": "VetExoticApp"
              },
              "knowsAbout": [
                "Cirugía de Animales Exóticos",
                "Odontología Veterinaria",
                "Medicina Interna de Pequeños Mamíferos",
                "Lagomorfos",
                "Chinchillas",
                "Hurones"
              ]
            }
          `}
        </Script>
        
        <Script id="structured-data-medical-service" type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "@id": "https://vetexoticapp.cl",
              "name": "VetExoticApp - Clínica Veterinaria Animales Exóticos",
              "description": "Atención veterinaria especializada en animales exóticos. Cirugía, odontología, medicina interna y urgencias para conejos, hurones, chinchillas y pequeños mamíferos.",
              "image": "https://vetexoticapp.cl/images/dra-siboney-real.jpg",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Santiago",
                "addressRegion": "Región Metropolitana",
                "addressCountry": "Chile"
              },
              "telephone": "+56934497035",
              "email": "vetexotic.app@gmail.com",
              "url": "https://vetexoticapp.cl",
              "medicalSpecialty": "Veterinary Specialty",
              "availableService": [
                {
                  "@type": "MedicalProcedure",
                  "name": "Cirugía de Tejidos Blandos en Animales Exóticos"
                },
                {
                  "@type": "MedicalProcedure",
                  "name": "Odontología Veterinaria para Lagomorfos"
                },
                {
                  "@type": "MedicalProcedure",
                  "name": "Medicina Interna de Pequeños Mamíferos"
                },
                {
                  "@type": "MedicalProcedure",
                  "name": "Esterilizaciones y Castraciones"
                }
              ]
            }
          `}
        </Script>
      </head>
      <body className={poppins.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WSCG66X3"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
