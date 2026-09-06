import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import SeoPageFooter from "@/components/SeoPageFooter";
import { business, publicServices, siteUrl } from "@/lib/business";

const title = "Haushaltshilfe nach § 45a SGB XI in Bernau bei Berlin";
const description = "Anerkannte Haushaltshilfe und Alltagshilfe nach § 45a SGB XI in 16321 Bernau bei Berlin und im Umkreis von 20 km. Persönlich beraten lassen und Abrechnung klären.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/haushaltshilfe-45a-barnim" },
  openGraph: { title, description, url: "/haushaltshilfe-45a-barnim", locale: "de_DE", type: "website" },
};

const faqs = [
  ["Was bedeutet Haushaltshilfe nach § 45a SGB XI?", "§ 45a SGB XI beschreibt anerkannte Angebote zur Unterstützung im Alltag. Dazu können alltagsnahe Hilfen im Haushalt und bei der Organisation des Alltags gehören."],
  ["Kann die Haushaltshilfe über die Pflegekasse abgerechnet werden?", "Bei erfüllten persönlichen Voraussetzungen können passende Leistungen über den Entlastungsbetrag abgerechnet werden. Wir klären den passenden Ablauf mit Ihnen persönlich."],
  ["Wie hoch ist der Entlastungsbetrag?", `Aktuell beträgt der Entlastungsbetrag bis zu ${business.section45a.reliefAmountMonthly} Euro monatlich. Maßgeblich sind immer Ihre persönlichen Voraussetzungen und die Entscheidung Ihrer Pflegekasse.`],
  ["Für wen ist die Unterstützung geeignet?", "Unser Angebot richtet sich an Menschen, die im Haushalt oder bei alltäglichen Aufgaben Entlastung wünschen, sowie an Angehörige, die Unterstützung organisieren möchten."],
  ["Bieten Sie auch Pflegeleistungen an?", "Wir bieten alltagsnahe Unterstützung. Medizinische oder körperbezogene Pflegeleistungen sind nicht Teil dieses Angebots."],
  ["Wo ist Helfer im Alltag tätig?", "Haushaltshilfe und Alltagshilfe bieten wir in 16321 Bernau bei Berlin und im Umkreis von 20 km an. Den konkreten Einsatzort stimmen wir vorab mit Ihnen ab."],
];

export default function HouseholdHelp45aPage() {
  const serviceUrl = `${siteUrl}/haushaltshilfe-45a-barnim`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Haushaltshilfe nach § 45a SGB XI",
    description,
    url: serviceUrl,
    provider: { "@type": "LocalBusiness", name: business.name, url: siteUrl },
    areaServed: business.serviceAreas.map((name) => ({ "@type": "AdministrativeArea", name })),
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  };
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Haushaltshilfe nach § 45a SGB XI", item: serviceUrl },
    ],
  };

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbs} />
      <Navbar />
      <main className="seo-page">
        <section className="seo-page__hero">
          <p>Haushaltshilfe in Bernau bei Berlin + 20 km Umkreis</p>
          <h1>Haushaltshilfe nach <span>§ 45a SGB XI</span></h1>
          <p className="seo-page__lead">Persönliche Unterstützung im Haushalt und Alltag – zuverlässig, respektvoll und auf Ihre Situation abgestimmt.</p>
          <Link className="split-hover-cta seo-page__cta" href="/#contact"><span>Haushaltshilfe anfragen <span aria-hidden="true">↗</span></span></Link>
        </section>

        <section className="seo-page__section" aria-labelledby="support-heading">
          <h2 id="support-heading">Unterstützung, die im Alltag entlastet</h2>
          <p>Wir besprechen mit Ihnen persönlich, welche Hilfe zu Ihrem Alltag passt. Dabei stehen Selbstständigkeit, ein gutes Gefühl zu Hause und spürbare Entlastung im Mittelpunkt.</p>
          <ul className="seo-page__service-list">
            {publicServices.map((service) => <li key={service}>{service}</li>)}
          </ul>
          <p className="seo-page__note">Medizinische oder körperbezogene Pflegeleistungen bieten wir nicht an.</p>
        </section>

        <section className="seo-page__section seo-page__section--blue" aria-labelledby="billing-heading">
          <p className="seo-page__eyebrow">Entlastungsbetrag</p>
          <h2 id="billing-heading">Abrechnung verständlich klären</h2>
          <p>Als anerkannter Anbieter nach § 45a SGB XI können passende Leistungen bei erfüllten persönlichen Voraussetzungen über den Entlastungsbetrag der Pflegekasse abgerechnet werden. Dieser beträgt aktuell bis zu {business.section45a.reliefAmountMonthly} Euro monatlich.</p>
          <p>Wir geben keine Zusage über eine Kostenerstattung. Vor dem Einsatz klären wir mit Ihnen, welche Unterstützung sinnvoll ist und wie der Ablauf aussehen kann.</p>
          <a className="seo-page__text-link" href={business.section45a.sourceUrl} target="_blank" rel="noreferrer">Offizielle Informationen zum Entlastungsbetrag <span aria-hidden="true">↗</span></a>
        </section>

        <section className="seo-page__section" aria-labelledby="steps-heading">
          <h2 id="steps-heading">So starten Sie</h2>
          <ol className="seo-page__steps">
            <li><strong>Kontakt aufnehmen</strong><span>Sie erzählen uns, wobei Sie Unterstützung wünschen.</span></li>
            <li><strong>Persönlich klären</strong><span>Wir besprechen Bedarf, Einsatzgebiet und mögliche Abrechnung.</span></li>
            <li><strong>Termin vereinbaren</strong><span>Wir stimmen eine passende Unterstützung für Ihren Alltag ab.</span></li>
          </ol>
        </section>

        <section className="seo-page__section" aria-labelledby="area-heading">
          <h2 id="area-heading">In Bernau bei Berlin und im Umkreis von 20 km für Sie da</h2>
          <p>Unser Standort ist in 16321 Bernau bei Berlin. Haushaltshilfe und Alltagshilfe bieten wir im Umkreis von 20 km an.</p>
          <Link className="seo-page__text-link" href="/einsatzgebiet-barnim">Einsatzgebiet ansehen <span aria-hidden="true">→</span></Link>
        </section>

        <section className="seo-page__section seo-page__faq" aria-labelledby="faq-heading">
          <h2 id="faq-heading">Häufige Fragen zur Haushaltshilfe nach § 45a</h2>
          {faqs.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}
        </section>
      </main>
      <SeoPageFooter />
    </>
  );
}
