import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { business, siteUrl } from "@/lib/business";
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
    default: "Waschmaschinen Reparatur Berlin – Haushaltsgeräte Service vor Ort",
    template: "%s | ALEX",
  },
  description: business.description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: { icon: "/images/logo.png" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: 'ALEX',
    title: "Waschmaschinen Reparatur Berlin – direkt bei Ihnen vor Ort",
    description: business.description,
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
