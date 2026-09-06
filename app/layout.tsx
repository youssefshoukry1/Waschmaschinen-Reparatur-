import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { siteUrl } from "@/lib/business";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Haushaltshilfe in Bernau | Fensterreinigung Berlin-Brandenburg | Helfer im Alltag",
    template: "%s | Helfer im Alltag",
  },
  description: "Haushaltshilfe in Bernau bei Berlin im Umkreis von 20 km sowie Fenster- und Glasreinigung in Berlin und Brandenburg.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico?v=2" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "Helfer im Alltag",
    title: "Haushaltshilfe in Bernau | Fensterreinigung Berlin-Brandenburg",
    description: "Haushaltshilfe in Bernau bei Berlin im Umkreis von 20 km sowie Fenster- und Glasreinigung in Berlin und Brandenburg.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} ${jakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
