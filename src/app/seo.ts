import type { Metadata } from 'next'

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://vibradrinks.com.br/"),
  title: "Vibra drinks: qualidade que eleva seu evento",
  icons: {
    icon: [{ url: "/Logo.svg", sizes: "32x32", type: "image/x-icon" }]
  },
  description:
    "Vibra drinks: qualidade que eleva seu evento",

  openGraph: {
    title: "Vibra drinks: qualidade que eleva seu evento",
    description:
      "Vibra drinks: qualidade que eleva seu evento",
    url: "https://vibradrinks.com.br",
    siteName: "Vibra drinks",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo.webp",
        width: 500,
        height: 627,
        alt: "Logo da Vibra"
      }
    ]
  },

  twitter: {
    card: "summary_large_image",
    title: "Vibra drinks: qualidade que eleva seu evento",
    description: "SERVIÇO DE BARMAN ESPECIALIZADO EM EVENTOS PESSOAIS E CORPORATIVOS",
    images: [`/Logo.svg`]
  },
  robots: {
    index: true,
    follow: true
  }
};
