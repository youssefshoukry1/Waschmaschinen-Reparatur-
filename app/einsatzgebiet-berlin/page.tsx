import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import SeoPageFooter from "@/components/SeoPageFooter";
import { districts, siteUrl } from "@/lib/business";

const title = "Einsatzgebiet: Geräte-Reparatur in allen Berliner Bezirken";
const description = "Wir reparieren Haushaltsgeräte in ganz Berlin – von Mitte über Pankow bis Spandau. Anfahrt und Kostenvoranschlag zur festen Pauschale.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/einsatzgebiet-berlin" },
  openGraph: { title, description, url: "/einsatzgebiet-berlin", locale: "de_DE", type: "website" },
};

export default function ServiceAreaPage() {
  const pageUrl = `${siteUrl}/einsatzgebiet-berlin`;
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Einsatzgebiet Berlin", item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <Navbar />
      <main className="seo-page">
        <section className="seo-page__hero">
          <p>Schnell, zuverlässig und vor Ort</p>
          <h1>Unser Einsatzgebiet in <span>ganz Berlin</span></h1>
          <p className="seo-page__lead">In allen zwölf Bezirken kommen wir direkt zu Ihnen nach Hause – zur gleichen Anfahrtspauschale.</p>
          <Link className="split-hover-cta seo-page__cta" href="/#contact"><span>Termin anfragen <span aria-hidden="true">↗</span></span></Link>
        </section>

        <section className="seo-page__section" aria-labelledby="area-heading">
          <h2 id="area-heading">Bezirke und Ortsteile</h2>
          <p>Wir sind im gesamten Stadtgebiet unterwegs. Diese Bezirke und Ortsteile fahren wir regelmäßig an:</p>
          <ul className="seo-page__service-list">
            {districts.map((district) => <li key={district}>{district}</li>)}
          </ul>
          <p className="seo-page__note">Ihr Ortsteil ist nicht aufgeführt? Fragen Sie uns – wir fahren im gesamten Stadtgebiet.</p>
        </section>

        <section className="seo-page__section seo-page__section--blue" aria-labelledby="request-heading">
          <h2 id="request-heading">Termin an Ihrer Adresse anfragen</h2>
          <p>Nennen Sie uns Gerät, Fehler und Ihre Adresse. Bei Anruf bis 12 Uhr ist ein Termin am selben Tag meist möglich – auch abends und samstags.</p>
          <Link className="split-hover-cta seo-page__cta" href="/#contact"><span>Kontakt aufnehmen <span aria-hidden="true">↗</span></span></Link>
        </section>

        <section className="seo-page__section" aria-labelledby="service-heading">
          <h2 id="service-heading">Waschmaschinen Reparatur in Berlin</h2>
          <p>Erfahren Sie, welche Defekte wir vor Ort beheben, wie der Festpreis zustande kommt und welche Garantie Sie erhalten.</p>
          <Link className="seo-page__text-link" href="/waschmaschinen-reparatur-berlin">Mehr zur Waschmaschinen-Reparatur <span aria-hidden="true">→</span></Link>
        </section>
      </main>
      <SeoPageFooter />
    </>
  );
}
