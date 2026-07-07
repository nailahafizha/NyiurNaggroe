import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "https://nyiurnanggroe.id"
  ),
  title: {
    default: "Nyiur Nanggroe — Marketplace Ekonomi Sirkular Kelapa",
    template: "%s | Nyiur Nanggroe",
  },
  description:
    "Platform marketplace berbasis AI yang menghubungkan petani kelapa, UMKM, dan pembeli. Dari sisa nyiur menjadi nilai untuk nanggroe.",
  keywords: [
    "kelapa",
    "ekonomi sirkular",
    "marketplace Indonesia",
    "produk kelapa",
    "UMKM Aceh",
    "tempurung kelapa",
    "sabut kelapa",
    "cocopeat",
    "arang kelapa",
    "briket kelapa",
    "minyak kelapa",
    "kerajinan kelapa",
    "AI marketplace",
    "green economy",
  ],
  authors: [{ name: "Nyiur Nanggroe Team" }],
  creator: "Nyiur Nanggroe",
  publisher: "Nyiur Nanggroe",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: "en_US",
    url: "https://nyiurnanggroe.id",
    siteName: "Nyiur Nanggroe",
    title: "Nyiur Nanggroe — Marketplace Ekonomi Sirkular Kelapa Berbasis AI",
    description:
      "Dari sisa nyiur menjadi nilai untuk nanggroe. Marketplace kelapa pertama berbasis AI di Indonesia.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nyiur Nanggroe — Marketplace Ekonomi Sirkular Kelapa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nyiur Nanggroe — Marketplace Kelapa Berbasis AI",
    description:
      "Platform marketplace berbasis AI untuk ekonomi sirkular kelapa Indonesia.",
    images: ["/og-image.jpg"],
    creator: "@nyiurnanggroe",
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#1A3A2A" },
    ],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://nyiurnanggroe.id",
    languages: {
      "id-ID": "https://nyiurnanggroe.id",
      "en-US": "https://nyiurnanggroe.id/en",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1A3A2A" },
    { media: "(prefers-color-scheme: dark)", color: "#1A3A2A" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-cream antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
