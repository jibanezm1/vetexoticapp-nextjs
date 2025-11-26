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
    "Veterinaria especializada en animales exóticos en Chile. Cirugía, odontología, medicina interna para conejos, hurones, chinchillas, erizos y más. Atención en Exoticare Maipú, Centro Veterinario República e Italia.",
  keywords: [
    "veterinaria animales exóticos chile",
    "cirugía animales exóticos",
    "odontología conejos",
    "veterinario hurones",
    "veterinario chinchillas",
    "veterinario erizos",
    "cirugía conejos",
    "veterinaria exóticos santiago",
    "exoticare maipu",
    "veterinaria república",
  ],
  authors: [{ name: "Dra. Siboney Pérez" }],
  creator: "Dra. Siboney Pérez",
  publisher: "VetExoticApp",
  robots: {
    index: true,
    follow: true,
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
