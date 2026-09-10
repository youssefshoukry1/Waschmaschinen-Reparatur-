import Image from "next/image";
import Link from "next/link";

import ContactSection from "@/components/ContactSection";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import DistrictNav from "@/components/DistrictNav";
import { AnimatedPageTitle, AnimatedSectionTitle } from "@/components/HeroTitle";
import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";
import WhatsAppFab from "@/components/WhatsAppFab";
import WhyChooseInline from "@/components/WhyChooseSection";
import { business, publicServices, siteUrl } from "@/lib/business";
import { districtPath, type DistrictLocation } from "@/lib/districtLocations";

const ctaPatternLeft = "/images/qlinest/vector-4.svg";
const ctaPatternRight = "/images/qlinest/vector-5.svg";

/**
 * Gemeinsame Huelle aller elf Bezirksseiten.
 *
 * Aufbau bewusst identisch zu den Geraeteseiten (siehe app/TV/page.tsx): Hero,
 * die vier Gruende, ein lokaler Textblock, Kontaktformular, Banner, Footer.
 * Dadurch braucht keine Bezirksseite eigenes Layout-CSS.
 *
 * Alles Bezirksspezifische kommt aus lib/districtLocations.ts - hier steht
 * ausschliesslich Struktur.
 */
export default function DistrictLocationPage({ district }: { district: DistrictLocation }) {
  const pageUrl = `${siteUrl}${districtPath(district)}`;
  const headingId = `${district.slug}-heading`;
  const hasStreetAddress = Boolean(district.streetAddress);

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${pageUrl}#localbusiness`,
    parentOrganization: { "@id": `${siteUrl}/#organization` },
    name: `${business.name} – ${district.name}`,
    legalName: business.legalName,
    description: district.metaDescription,
    url: pageUrl,
    email: business.email,
    telephone: business.telephone,
    image: `${siteUrl}/images/logo.png`,
    logo: `${siteUrl}/images/logo.png`,
    foundingDate: String(business.foundedYear),
    address: {
      "@type": "PostalAddress",
      // Ohne bestaetigte Strassenadresse bleibt das Feld weg - eine erfundene
      // Adresse waere fuer die lokale Suche schaedlicher als gar keine.
      ...(hasStreetAddress
        ? { streetAddress: district.streetAddress, postalCode: district.postalCode }
        : {}),
      addressLocality: "Berlin",
      addressRegion: district.name,
      addressCountry: "DE",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: `Berlin ${district.name}` },
      ...district.neighbourhoods.map((name) => ({ "@type": "AdministrativeArea", name })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Haushaltsgeräte Reparatur in Berlin ${district.name}`,
      itemListElement: publicServices.map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name, areaServed: `Berlin ${district.name}` },
      })),
    },
    priceRange: "€€",
    makesOffer: {
      "@type": "Offer",
      name: "Anfahrt inklusive Kostenvoranschlag",
      price: String(business.calloutFee),
      priceCurrency: "EUR",
      description:
        "Technikerbesuch mit Kostenvoranschlag – ohne Wochenend- oder Feiertagszuschlag.",
    },
  };

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Einsatzgebiet Berlin", item: `${siteUrl}/einsatzgebiet-berlin` },
      { "@type": "ListItem", position: 3, name: `Berlin ${district.name}`, item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={localBusinessSchema} />
      <JsonLd data={breadcrumbs} />
      <Navbar />
      <main className="page-shell">
        <section className="hero" id="home" aria-labelledby={headingId}>
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
              <p className="hero-kicker">{district.kicker}</p>

              <AnimatedPageTitle
                id={headingId}
                parts={[
                  { text: district.titleLead },
                  { text: district.titleEmphasis, emphasized: true },
                ]}
              />

              <p className="hero-description">{district.intro}</p>

              <address className="district-address">
                <strong>{district.name}</strong>
                {hasStreetAddress ? <span>{district.streetAddress}</span> : null}
                <span>{district.areaLine}</span>
                {district.extraNote ? <em>{district.extraNote}</em> : null}
              </address>

              <div className="hero-callout">
                <p className="hero-callout__price">
                  <span aria-hidden="true">nur</span>
                  <strong>{business.calloutFee} €</strong>
                </p>
                <div className="hero-callout__text">
                  <strong>Technikerbesuch inklusive Kostenvoranschlag</strong>
                  <span>
                    Keine Zuschläge an Wochenenden und Feiertagen – der Preis gilt rund um die Uhr.
                  </span>
                </div>
              </div>

              <div className="hero-actions">
                <div className="hero-cta-buttons">
                  <a
                    className="primary-cta split-hover-cta"
                    href={`tel:${business.telephone}`}
                    aria-label={`Jetzt anrufen: ${business.telephoneDisplay}`}
                  >
                    <span>Jetzt anrufen: {business.telephoneDisplay}</span>
                  </a>
                </div>
                <p className="hero-service-area">
                  <a
                    href={`https://wa.me/${business.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp
                  </a>{" "}
                  <span aria-hidden="true">&nbsp;·&nbsp;</span>
                  <a href={`mailto:${business.email}`}>{business.email}</a>{" "}
                  <span aria-hidden="true">&nbsp;·&nbsp;</span>
                  <a href="#contact">Rückruf anfragen</a>
                </p>
              </div>

              <div className="hero-photo">
                <Image
                  src={district.heroImage}
                  alt={`Techniker unseres Reparaturdienstes zeigt den Standort in Berlin ${district.name} auf einer Karte`}
                  fill
                  priority
                  sizes="(max-width: 575px) min(calc(100vw - 12px), 420px), (max-width: 991px) min(68vw, 560px), (max-width: 1024px) min(44vw, 470px), min(48vw, 680px)"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Zweite Sektion: die vier Gruende der Startseite, unveraendert. Der
            Wrapper gibt die Breite vor - .why-choose--inline ist fuer die
            schmale Spalte der Geraeteseiten gebaut und bringt selbst keine mit. */}
        <div className="district-why">
          <WhyChooseInline idPrefix={district.slug} />
        </div>

        {/* Die beiden Textsektionen teilen sich den Container der Startseite -
            .seo-page__section bringt selbst keine Breite mit. */}
        <div className="district-sections">
        <section className="seo-page__section" aria-labelledby={`${district.slug}-local-heading`}>
          <h2 id={`${district.slug}-local-heading`}>
            Ihr Reparaturdienst in Berlin {district.name}
          </h2>

          {district.storeNote ? <p>{district.storeNote}</p> : null}

          <p>
            Wir reparieren {publicServices.slice(0, 6).join(", ")} und weitere Haushaltsgeräte aller
            Hersteller – direkt bei Ihnen zu Hause in {district.name}. Diese Kieze und Ortsteile
            fahren wir regelmäßig an:
          </p>

          <ul className="seo-page__service-list">
            {district.neighbourhoods.map((neighbourhood) => (
              <li key={neighbourhood}>{neighbourhood}</li>
            ))}
          </ul>

          <p className="seo-page__note">
            Ihre Straße ist nicht dabei? Rufen Sie uns an – wir sind im gesamten Bezirk und in den
            angrenzenden Ortsteilen unterwegs.
          </p>
        </section>

        <section className="seo-page__section" aria-labelledby={`${district.slug}-nav-heading`}>
          <h2 id={`${district.slug}-nav-heading`}>Weitere Bezirke in Berlin</h2>
          <p>
            Wir sind im gesamten Stadtgebiet für Sie unterwegs – zur selben Anfahrtspauschale.
          </p>
          <div className="district-nav-wrap">
            <DistrictNav />
          </div>
          <Link className="seo-page__text-link" href="/einsatzgebiet-berlin">
            Gesamtes Einsatzgebiet ansehen <span aria-hidden="true">→</span>
          </Link>
        </section>
        </div>

        <ContactSection headingId={`${district.slug}-contact-heading`} />

        <section className="booking-banner" aria-labelledby={`${district.slug}-banner-heading`}>
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
              id={`${district.slug}-banner-heading`}
              parts={[
                { text: "Gerät defekt in " },
                { text: district.name, emphasized: true },
                { text: "?" },
              ]}
            />
            <p>
              Rufen Sie uns an – wir kommen für {business.calloutFee} € vorbei, stellen die Ursache
              fest und nennen Ihnen den Festpreis, bevor wir beginnen.
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
