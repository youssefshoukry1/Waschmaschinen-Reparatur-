import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import SeoPageFooter from "@/components/SeoPageFooter";
import { business, commonDefects, siteUrl } from "@/lib/business";

const title = "Waschmaschinen Reparatur in Berlin – direkt bei Ihnen vor Ort";
const description = `Waschmaschine defekt? Wir reparieren in ganz Berlin direkt bei Ihnen zu Hause. Kostenvoranschlag vor Ort, Festpreis und ${business.warrantyMonths} Monate Garantie.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/waschmaschinen-reparatur-berlin" },
  openGraph: { title, description, url: "/waschmaschinen-reparatur-berlin", locale: "de_DE", type: "website" },
};

const faqs = [
  ["Wie lange dauert die Reparatur einer Waschmaschine?", "Die meisten Reparaturen erledigen wir in 30 bis 90 Minuten direkt bei Ihnen zu Hause. Gängige Ersatzteile führen wir im Servicewagen mit, sodass in der Regel kein zweiter Termin nötig ist."],
  ["Was kostet die Anfahrt?", "Anfahrt und Kostenvoranschlag berechnen wir pauschal – in jedem Berliner Bezirk zum selben Satz. Die Höhe nennen wir Ihnen am Telefon. Entscheiden Sie sich für die Reparatur, rechnen wir den Betrag auf den Festpreis an."],
  ["Wie setzt sich der Preis zusammen?", "Sie zahlen einen Festpreis aus Arbeitsleistung und Ersatzteil. Wir nennen ihn, bevor wir mit der Reparatur beginnen – ohne Stundenabrechnung und ohne versteckte Zuschläge."],
  ["Reparieren Sie auch ältere Waschmaschinen?", "Ja. Wir reparieren auch Modelle, die seit Jahren nicht mehr hergestellt werden, und beschaffen passende Ersatzteile. Lohnt sich eine Reparatur nicht mehr, sagen wir Ihnen das offen."],
  ["Welche Garantie erhalte ich?", `Auf jede durchgeführte Reparatur geben wir ${business.warrantyMonths} Monate Garantie auf Arbeitsleistung und verbaute Ersatzteile. Sie wird schriftlich auf Ihrer Rechnung festgehalten.`],
  ["Bekomme ich einen Termin am selben Tag?", "Wenn Sie uns bis 12 Uhr anrufen, ist ein Termin am selben Tag meist möglich. Auch Abend- und Samstagstermine bieten wir an."],
];

export default function WashingMachineRepairPage() {
  const serviceUrl = `${siteUrl}/waschmaschinen-reparatur-berlin`;
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Waschmaschinen Reparatur Berlin",
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
      { "@type": "ListItem", position: 2, name: "Waschmaschinen Reparatur Berlin", item: serviceUrl },
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
          <p>Anfahrt + Kostenvoranschlag · in ganz Berlin</p>
          <h1>Waschmaschinen Reparatur <span>in Berlin</span></h1>
          <p className="seo-page__lead">Wir kommen direkt zu Ihnen nach Hause, stellen die Ursache fest und reparieren in den meisten Fällen beim ersten Termin.</p>
          <Link className="split-hover-cta seo-page__cta" href="/#contact"><span>Reparatur anfragen <span aria-hidden="true">↗</span></span></Link>
        </section>

        <section className="seo-page__section" aria-labelledby="defects-heading">
          <h2 id="defects-heading">Typische Defekte, die wir beheben</h2>
          <p>Von der blockierten Laugenpumpe bis zum Fehlercode im Display: Diese Störungen reparieren wir regelmäßig direkt vor Ort.</p>
          <ul className="seo-page__service-list">
            {commonDefects.map((defect) => <li key={defect}>{defect}</li>)}
          </ul>
          <p className="seo-page__note">Ist Ihr Fehler nicht dabei? Rufen Sie uns an – wir klären die Ursache am Telefon vor.</p>
        </section>

        <section className="seo-page__section seo-page__section--blue" aria-labelledby="pricing-heading">
          <p className="seo-page__eyebrow">Festpreis</p>
          <h2 id="pricing-heading">Kosten transparent geklärt</h2>
          <p>Anfahrt und Kostenvoranschlag berechnen wir pauschal. Nach der Diagnose nennen wir Ihnen einen verbindlichen Festpreis aus Arbeitsleistung und Ersatzteil – erst danach entscheiden Sie.</p>
          <p>Auf jede durchgeführte Reparatur geben wir {business.warrantyMonths} Monate Garantie. Größere Beträge können Sie über die {business.financing.partner} in bis zu {business.financing.maxMonths} Monatsraten zu {business.financing.interestRate} % Zinsen zahlen.</p>
          <Link className="seo-page__text-link" href="/#contact">Reparatur jetzt anfragen <span aria-hidden="true">→</span></Link>
        </section>

        <section className="seo-page__section" aria-labelledby="steps-heading">
          <h2 id="steps-heading">So läuft Ihre Reparatur ab</h2>
          <ol className="seo-page__steps">
            <li><strong>Termin vereinbaren</strong><span>Sie nennen uns Gerät, Fehler und Ihre Wunschzeit für den Rückruf.</span></li>
            <li><strong>Diagnose vor Ort</strong><span>Wir stellen die Ursache fest und nennen Ihnen den Festpreis.</span></li>
            <li><strong>Reparatur & Garantie</strong><span>Wir reparieren meist sofort – mit {business.warrantyMonths} Monaten Garantie auf der Rechnung.</span></li>
          </ol>
        </section>

        <section className="seo-page__section" aria-labelledby="area-heading">
          <h2 id="area-heading">In allen Berliner Bezirken für Sie da</h2>
          <p>Ob Mitte, Pankow, Neukölln oder Spandau – dieselbe Anfahrtspauschale gilt im gesamten Stadtgebiet.</p>
          <Link className="seo-page__text-link" href="/einsatzgebiet-berlin">Einsatzgebiet ansehen <span aria-hidden="true">→</span></Link>
        </section>

        <section className="seo-page__section seo-page__faq" aria-labelledby="faq-heading">
          <h2 id="faq-heading">Häufige Fragen zur Waschmaschinen-Reparatur</h2>
          {faqs.map(([question, answer]) => <article key={question}><h3>{question}</h3><p>{answer}</p></article>)}
        </section>
      </main>
      <SeoPageFooter />
    </>
  );
}
