import type { Metadata } from "next";
import Image from "next/image";

import BrandRail from "@/components/BrandRail";
import ContactForm from "@/components/ContactForm";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import DeviceFaqSection from "@/components/DeviceFaqSection";
import DeviceNav from "@/components/DeviceNav";
import {
  AnimatedPageTitle,
  AnimatedSectionTitle,
} from "@/components/HeroTitle";
import JsonLd from "@/components/JsonLd";
import { MapConsent } from "@/components/MapConsent";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import ServiceRail from "@/components/ServiceRail";
import WhatsAppFab from "@/components/WhatsAppFab";
import WhyChooseInline from "@/components/WhyChooseSection";
import { business, siteUrl } from "@/lib/business";
import { tvFaqs } from "@/lib/tvFaq";

const ctaPatternLeft = "/images/qlinest/vector-4.svg";
const ctaPatternRight = "/images/qlinest/vector-5.svg";

/** Die Explosionszeichnung des Geraets. Sie steht auf jeder Breite im Hero. */
const heroImage = {
  src: "/images/img17.png",
  alt: "Explosionszeichnung eines Fernsehers: Panel, Backlight-Einheit, Diffusorfolien, T-Con-Platine, Mainboard und Netzteil",
};

const title = "Fernseher Reparatur Berlin – TV Service & Notdienst";
const description = `TV- und Fernseher-Reparatur in Berlin und Umland, rund um die Uhr. Anfahrt inklusive Kostenvoranschlag für nur ${business.calloutFee} € – ohne Zuschlag an Wochenenden und Feiertagen. Dazu ${tvFaqs.length} häufige Fragen und Antworten rund um Fernseher und TV-Technik.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/TV" },
  openGraph: {
    title,
    description,
    url: "/TV",
    locale: "de_DE",
    type: "website",
  },
};

export default function LeistungenPage() {
  const pageUrl = `${siteUrl}/TV`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Fernseher Reparatur Notdienst Berlin",
    description,
    url: pageUrl,
    serviceType: "Fernseher Reparatur",
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      url: siteUrl,
      telephone: business.telephone,
      email: business.email,
    },
    areaServed: business.serviceAreas.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    hoursAvailable: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    offers: {
      "@type": "Offer",
      name: "Anfahrt inklusive Kostenvoranschlag",
      price: String(business.calloutFee),
      priceCurrency: "EUR",
      description:
        "Technikerbesuch mit Kostenvoranschlag – ohne Wochenend- oder Feiertagszuschlag.",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: tvFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Fernseher Reparatur", item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbs} />
      <Navbar />
      <main className="page-shell">
        <section
          className="hero hero--diagram"
          id="notdienst"
          aria-labelledby="tv-heading"
        >
          <svg
            className="hero-pattern"
            aria-hidden="true"
            width="571"
            height="803"
            viewBox="0 0 571 803"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.3"
              d="M454.081 0V93.5533C454.081 100.619 448.355 106.347 441.29 106.347H350.954C343.889 106.347 338.163 112.075 338.163 119.141V209.496C338.163 216.561 332.436 222.289 325.372 222.289H235.035C227.971 222.289 222.244 228.017 222.244 235.083V325.438C222.244 332.503 216.517 338.231 209.453 338.231H119.116C112.052 338.231 106.325 343.959 106.325 351.025V441.38C106.325 448.446 100.599 454.173 93.5343 454.173H-1.62721e-05M570 0V93.5533C570 100.619 564.273 106.347 557.209 106.347H466.872C459.808 106.347 454.081 112.075 454.081 119.141V209.496C454.081 216.561 448.355 222.289 441.29 222.289H350.954C343.889 222.289 338.163 228.017 338.163 235.083V325.438C338.163 332.503 343.889 338.231 350.954 338.231H441.29C448.355 338.231 454.081 332.503 454.081 325.438V233.484L454.193 232.728C455.052 226.933 459.969 222.606 465.825 222.494L476.466 222.289H557.209C564.273 222.289 570 228.017 570 235.083V325.438C570 332.503 564.273 338.231 557.209 338.231H466.073L463.036 338.434C457.997 338.77 454.081 342.956 454.081 348.008V357.822M454.081 347.827V441.38C454.081 448.446 448.355 454.173 441.29 454.173H350.954C343.889 454.173 338.163 459.901 338.163 466.967V557.322C338.163 564.388 332.436 570.116 325.372 570.116H235.035C227.971 570.116 222.244 575.844 222.244 582.909V673.264C222.244 680.33 216.517 686.058 209.453 686.058H119.116C112.052 686.058 106.325 691.786 106.325 698.851V789.206C106.325 796.272 100.599 802 93.5343 802H-1.62721e-05"
              stroke="#FFF1F0"
              strokeWidth="0.431035"
            />
          </svg>

          <div className="hero-inner">
            <div className="hero-content">
              <p className="hero-kicker">
                Fernseher &amp; TV-Technik · Berlin &amp; Umland
              </p>
              <AnimatedPageTitle
                id="tv-heading"
                parts={[
                  { text: "Fernseher Reparatur " },
                  { text: "bei Ihnen zu Hause", emphasized: true },
                ]}
              />
              <p className="hero-description">
                Schwarzes Bild, Streifen im Panel, kein Ton oder das Gerät
                bleibt im Standby? Wir prüfen Backlight, Netzteil, T-Con und
                Mainboard – bei LED-, OLED- und QLED-Geräten aller Marken,
                direkt bei Ihnen vor Ort.
              </p>

              <div className="hero-callout">
                <p className="hero-callout__price">
                  <span aria-hidden="true">nur</span>
                  <strong>{business.calloutFee} €</strong>
                </p>
                <div className="hero-callout__text">
                  <strong>Technikerbesuch inklusive Kostenvoranschlag</strong>
                  <span>
                    Keine Zuschläge an Wochenenden und Feiertagen – der Preis
                    gilt rund um die Uhr.
                  </span>
                </div>
              </div>

              <div className="hero-actions">
                <div className="hero-cta-buttons">
                  <a className="primary-cta split-hover-cta" href="#contact">
                    <span>Rückruf anfragen</span>
                  </a>
                </div>
                <DeviceNav />
              </div>

              <div className="hero-photo">
                <Image
                  src={heroImage.src}
                  alt={heroImage.alt}
                  fill
                  priority
                  sizes="(max-width: 575px) min(calc(100vw - 12px), 420px), (max-width: 991px) min(68vw, 560px), (max-width: 1024px) min(44vw, 470px), min(48vw, 680px)"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Zweite Sektion der Seite: Markenleiste ganz links, daneben die rote
            Servicekarte mit der Notrufnummer, rechts die Fragenliste. Alle drei
            laufen im normalen Fluss mit und scrollen gemeinsam vorbei. Unter
            1025px blenden die beiden Leisten aus und die Liste steht allein. */}
        <div className="device-faq-layout device-faq-layout--with-why device-faq-layout--rail-match">
          {/* Markenleiste und Servicekarte stehen ab 1200px in einem eigenen
              Subraster nebeneinander. Dadurch ist die Schleife exakt so hoch
              wie die rote Karte. Unter 1200px loest sich der Wrapper per
              `display: contents` wieder auf - am bisherigen Raster aendert
              sich dort nichts. */}
          <div className="device-faq-pair">
            <BrandRail />
            <ServiceRail />
          </div>

          {/* Der Wrapper uebernimmt nur das Rasterfeld der Fragenliste, damit
              die vier Gruende darueber stehen koennen. Er ist ein schlichter
              Block ohne eigene Groessen - an der Fragenliste aendert sich
              dadurch nichts. */}
          <div className="device-faq-column">
            <WhyChooseInline idPrefix="tv" />

            <DeviceFaqSection
              id="haeufige-fragen"
              heading="Häufige Fragen zu Ihrem Fernseher."
              lead="Termine, Marken, Kosten und die wichtigsten Selbsthilfe-Schritte auf einen Blick."
              items={tvFaqs}
            />
          </div>
        </div>

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="tv-contact-heading"
        >
          <div className="contact-section__intro">
            <div>
              <p className="contact-section__eyebrow">Rückruf zur Wunschzeit</p>
              <AnimatedSectionTitle
                id="tv-contact-heading"
                parts={[
                  { text: "Sagen Sie uns, wann wir Sie zurückrufen dürfen." },
                ]}
              />
            </div>
            <p>
              Beschreiben Sie kurz Gerät und Fehler. Wir melden uns zur
              gewünschten Zeit und nennen Ihnen den Festpreis.
            </p>
          </div>

          <div className="contact-panel">
            <div className="contact-form-wrap">
              <ContactForm />
            </div>

            <MapConsent />
          </div>
        </section>

        <section
          className="booking-banner"
          aria-labelledby="leistungen-banner-heading"
        >
          <Image
            className="booking-banner__pattern booking-banner__pattern--left"
            src={ctaPatternLeft}
            alt=""
            aria-hidden="true"
            width={320}
            height={405}
          />
          <Image
            className="booking-banner__pattern booking-banner__pattern--right"
            src={ctaPatternRight}
            alt=""
            aria-hidden="true"
            width={320}
            height={405}
          />

          <Image
            className="booking-banner__cleaner booking-banner__cleaner--left"
            src="/images/repair/img9.png"
            alt="Kaffeevollautomat wird gewartet"
            width={2000}
            height={2000}
          />
          <Image
            className="booking-banner__cleaner booking-banner__cleaner--right"
            src="/images/repair/img8.png"
            alt="Kühlschrank wird vom Techniker geprüft"
            width={2000}
            height={2000}
          />

          <div className="booking-banner__content">
            <AnimatedSectionTitle
              id="leistungen-banner-heading"
              parts={[
                { text: "Selbst geprüft und " },
                { text: "nichts gefunden", emphasized: true },
                { text: "?" },
              ]}
            />
            <p>
              Rufen Sie uns an – wir kommen für {business.calloutFee} € vorbei,
              stellen die Ursache fest und nennen Ihnen den Festpreis, bevor wir
              beginnen.
            </p>
            <a className="split-hover-cta" href={`tel:${business.telephone}`}>
              <span>{business.telephoneDisplay}</span>
            </a>
          </div>
        </section>

        <SiteFooter />
      </main>

      <WhatsAppFab />
      <CookieConsentBanner />
    </>
  );
}
