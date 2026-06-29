import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1A2744",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://capicord.in"),
  title: {
    default: "Capicord — Credit, Connected.",
    template: "%s | Capicord",
  },
  description:
    "Capicord is India's digital Lending Service Provider (LSP) connecting borrowers, DSA agents, and NBFC partners through a transparent, RBI-compliant technology platform. Apply for a loan or partner with us today.",
  keywords: [
    "lending service provider",
    "LSP India",
    "digital lending",
    "loan application India",
    "NBFC partner",
    "DSA agent platform",
    "RBI compliant lending",
    "fintech India",
    "loan origination",
    "KYC verification",
    "financial inclusion India",
    "small business loan",
    "microfinance India",
    "Capicord",
  ],
  authors: [{ name: "Capicord Fintech Pvt. Ltd." }],
  creator: "Capicord Fintech Pvt. Ltd.",
  publisher: "Capicord Fintech Pvt. Ltd.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "https://capicord.in",
  },
  openGraph: {
    type: "website",
    url: "https://capicord.in",
    siteName: "Capicord",
    title: "Capicord — Credit, Connected.",
    description:
      "India's digital Lending Service Provider connecting borrowers, agents, and NBFC partners through a transparent, RBI-compliant platform. Apply for a loan or become a Capicord agent today.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@capi_cord",
    creator: "@capi_cord",
    title: "Capicord — Credit, Connected.",
    description:
      "India's digital Lending Service Provider connecting borrowers, agents, and NBFC partners through a transparent, RBI-compliant platform.",
  },
  category: "finance",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Capicord",
    alternateName: "Capicord Fintech Pvt. Ltd.",
    url: "https://capicord.in",
    description:
      "Capicord is a Lending Service Provider (LSP) in India connecting borrowers, DSA agents, and NBFC lending partners through technology.",
    slogan: "Credit, Connected.",
    foundingDate: "2025",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    serviceType: "Lending Service Provider",
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: "admin@capicord.com",
        contactType: "customer support",
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: [
      "https://twitter.com/capi_cord",
      "https://instagram.com/capi.cord",
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
              .replace(/</g, "\\u003c")
              .replace(/>/g, "\\u003e")
              .replace(/\//g, "\\u002f"),
          }}
        />
      </head>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
