import Image from "next/image";
import Navbar from "@/components/Navbar";
import GravityCTA from "@/components/GravityCTA";
import ServicesSection from "@/components/ServicesSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";
import TrustSection from "@/components/TrustSection";
import BrandsSection from "@/components/BrandsSection";
import TroubleshootingSection from "@/components/TroubleshootingSection";
import { MapConsent, MapConsentResetLink } from "@/components/MapConsent";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import FAQSection from "@/components/FAQSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import HeroTitle from "@/components/HeroTitle";
import { AnimatedSectionTitle } from "@/components/HeroTitle";
import JsonLd from "@/components/JsonLd";
import WhatsAppFab from "@/components/WhatsAppFab";
import ContactForm from "@/components/ContactForm";
import { BadgeCheck, Banknote, ShieldCheck, Star, Wrench } from "lucide-react";
import { getTrustSettings } from "@/sanity-reference/lib/trustSettings";
import { business, districts, publicServices, siteUrl } from "@/lib/business";

const ctaPatternLeft = "/images/qlinest/vector-4.svg";
const ctaPatternRight = "/images/qlinest/vector-5.svg";

const reasons = [
  {
    icon: "wrench",
    title: `Über ${business.experienceYears} Jahre Erfahrung`,
    description: `Seit ${business.foundedYear} reparieren wir Haushaltsgeräte in Berlin – vom Klassiker bis zum aktuellen Modell.`,
  },
  {
    icon: "shield",
    title: `${business.warrantyMonths} Monate Garantie`,
    description:
      "Auf Arbeitsleistung und verbaute Ersatzteile – schriftlich auf Ihrer Rechnung festgehalten.",
  },
  {
    icon: "badge",
    title: "Transparente Festpreise",
    description:
      "Sie erfahren den Preis, bevor wir beginnen. Keine Stundenabrechnung, keine versteckten Zuschläge.",
  },
  {
    icon: "money",
    title: "Anfahrt + Kostenvoranschlag",
    description:
      "Wir kommen in jeden Berliner Bezirk, prüfen das Gerät vor Ort und nennen Ihnen den Festpreis, bevor wir beginnen.",
  },
];

function ReasonIcon({ name }: { name: string }) {
  if (name === "wrench") return <Wrench aria-hidden="true" />;
  if (name === "shield") return <ShieldCheck aria-hidden="true" />;
  if (name === "badge") return <BadgeCheck aria-hidden="true" />;
  return <Banknote aria-hidden="true" />;
}

export default async function Home() {
  const trustSettings = await getTrustSettings();
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    legalName: business.legalName,
    url: siteUrl,
    email: business.email,
    telephone: business.telephone,
    image: `${siteUrl}/images/logo.png`,
    logo: `${siteUrl}/images/logo.png`,
    foundingDate: String(business.foundedYear),
    address: { "@type": "PostalAddress", ...business.address },
    areaServed: districts.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Haushaltsgeräte Reparatur & Verkauf",
      itemListElement: publicServices.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <Navbar />
      <main className="page-shell">
        <section className="hero" id="home" aria-labelledby="hero-heading">
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
                Anfahrt + Kostenvoranschlag in ganz Berlin
              </p>
              <HeroTitle />
              <p className="hero-description">
                Wir reparieren Ihre Waschmaschine direkt bei Ihnen zu Hause –
                zum Festpreis, mit {business.warrantyMonths} Monaten Garantie
                und meist noch am selben Tag.
              </p>
              <p className="hero-service-area">
                <a href={`tel:${business.telephone}`}>
                  {business.telephoneDisplay}
                </a>{" "}
                <span aria-hidden="true">&nbsp;·&nbsp;</span>
                <a
                  href={`https://wa.me/${business.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>{" "}
                <span aria-hidden="true">&nbsp;·&nbsp;</span>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </p>

              <div className="hero-actions">
                <div className="hero-cta-buttons">
                  <a className="primary-cta split-hover-cta" href="#contact">
                    <span>Termin heute vereinbaren</span>
                  </a>
                </div>
                {trustSettings.showRating ? (
                  <div
                    className="customer-proof"
                    aria-label={`${trustSettings.ratingValue} von 5 Sternen: ${trustSettings.ratingLabel}`}
                  >
                    <span className="google-review__stars" aria-hidden="true">
                      {Array.from({ length: 5 }, (_, index) => (
                        <Star key={index} />
                      ))}
                    </span>
                    <strong className="google-review__score">
                      {new Intl.NumberFormat("de-DE", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      }).format(trustSettings.ratingValue)}
                    </strong>
                    <span className="google-review__label">
                      {trustSettings.ratingLabel}
                    </span>
                  </div>
                ) : null}
              </div>

              <div className="hero-photo">
                <Image
                  src="/images/repair/img2.png"
                  alt="Techniker repariert ein Haushaltsgerät beim Kunden vor Ort"
                  fill
                  priority
                  sizes="(max-width: 575px) min(calc(100vw - 12px), 420px), (max-width: 991px) min(68vw, 560px), (max-width: 1024px) min(44vw, 470px), min(48vw, 680px)"
                />
              </div>
            </div>
          </div>
        </section>

        <GravityCTA />

        <ServicesSection />

        <section
          className="why-choose"
          id="unternehmen"
          aria-labelledby="why-choose-heading"
        >
          <div className="why-choose-inner">
            <div className="why-choose-heading">
              <p>Warum unser Reparaturdienst</p>
              <h2 id="why-choose-heading">
                Reparatur, auf die Sie sich verlassen können.
              </h2>
              <span>
                Seit {business.foundedYear} stehen wir für saubere Arbeit, klare
                Preise und ehrliche Beratung.
              </span>
            </div>
            <div className="reason-grid">
              {reasons.map((reason) => (
                <article className="reason-card" key={reason.title}>
                  <span className="reason-icon">
                    <ReasonIcon name={reason.icon} />
                  </span>
                  <h3>{reason.title}</h3>
                  <p>{reason.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <TrustSection trustSettings={trustSettings} />

        <TroubleshootingSection />

        <TestimonialsSection trustSettings={trustSettings} />

        <BrandsSection />

        <ServiceAreaSection />

        <FAQSection />

        <section
          className="contact-section"
          id="contact"
          aria-labelledby="contact-heading"
        >
          <div className="contact-section__intro">
            <div>
              <p className="contact-section__eyebrow">Rückruf zur Wunschzeit</p>
              <AnimatedSectionTitle
                id="contact-heading"
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
          aria-labelledby="booking-banner-heading"
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
              id="booking-banner-heading"
              parts={[
                { text: "Gerät defekt? " },
                { text: "Wir kommen", emphasized: true },
                { text: " zu Ihnen." },
              ]}
            />
            <p>
              Rufen Sie uns an oder schreiben Sie uns – bei Anruf bis 12 Uhr ist
              ein Termin am selben Tag meist möglich.
            </p>
            <a className="split-hover-cta" href="#contact">
              <span>Unverbindlich anfragen</span>
            </a>
          </div>
        </section>

        <footer className="site-footer">
          <Image
            className="footer-shape footer-shape--left"
            src="/images/qlinest/vector-4.svg"
            alt=""
            width={320}
            height={405}
          />
          <Image
            className="footer-shape footer-shape--right"
            src="/images/qlinest/vector-5.svg"
            alt=""
            width={320}
            height={405}
          />

          <div className="footer-container">
            <section
              className="footer-cta"
              aria-labelledby="footer-cta-heading"
            >
              <div>
                <p>Unverbindlich &amp; zum Festpreis</p>
                <AnimatedSectionTitle
                  id="footer-cta-heading"
                  parts={[{ text: "Wann dürfen wir Ihr Gerät reparieren?" }]}
                />
              </div>
              <a className="split-hover-cta" href="#contact">
                <span>
                  Termin vereinbaren <span aria-hidden="true">↗</span>
                </span>
              </a>
            </section>

            <div className="footer-main">
              <div className="footer-brand">
                <a
                  href="#home"
                 
                >
                  <Image
                    src="/images/logo.png"
                    alt=""
                    width={2172}
                    height={724}
                    sizes="(max-width: 575px) 160px, 200px"
                  />
                </a>
                <p>
                  Waschmaschinen- und Haushaltsgeräte-Reparatur in ganz Berlin –
                  direkt bei Ihnen vor Ort.
                </p>
                <span className="footer-trust">
                  Mitgliedsbetrieb der {business.chamber.name}
                </span>
              </div>

              <nav
                className="footer-links"
                aria-label="Navigation im Fußbereich"
              >
                <p>Entdecken</p>
                <a href="#home">Startseite</a>
                <a href="/leistungen">Leistungen</a>
                <a href="#einsatzgebiet">Bezirke</a>
                <a href="#faq">Häufige Fragen</a>
              </nav>

              <address className="footer-contact">
                <p>Kontakt</p>
                <span>
                  {business.address.streetAddress}
                  <br />
                  {business.address.postalCode}{" "}
                  {business.address.addressLocality}
                </span>
                <a href={`tel:${business.telephone}`}>
                  {business.telephoneDisplay}
                </a>
                <a href={`mailto:${business.email}`}>{business.email}</a>
                <a
                  href={`https://wa.me/${business.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Nachricht über WhatsApp
                </a>
                <span>Inhaber: {business.owner}</span>
              </address>
            </div>

            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} </p>{" "}
              <nav aria-label="Rechtliche Informationen">
                <a href="/agb">AGB</a>
                <a href="/impressum">Impressum</a>
                <a href="/datenschutz">Datenschutz</a>
                <MapConsentResetLink />
              </nav>
            </div>
          </div>
        </footer>
      </main>

      <WhatsAppFab />
      <CookieConsentBanner />
    </>
  );
}
