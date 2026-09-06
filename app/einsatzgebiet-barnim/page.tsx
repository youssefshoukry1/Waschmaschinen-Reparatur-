import type { Metadata } from "next";
import Link from "next/link";

import JsonLd from "@/components/JsonLd";
import Navbar from "@/components/Navbar";
import SeoPageFooter from "@/components/SeoPageFooter";
import { siteUrl } from "@/lib/business";

const title = "Einsatzgebiet: Haushaltshilfe in Bernau & Fensterreinigung in Berlin-Brandenburg";
const description = "Haushaltshilfe in 16321 Bernau bei Berlin und im Umkreis von 20 km. Fenster- und Glasreinigung in ganz Berlin und Brandenburg.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/einsatzgebiet-barnim" },
  openGraph: { title, description, url: "/einsatzgebiet-barnim", locale: "de_DE", type: "website" },
};

export default function ServiceAreaPage() {
  const pageUrl = `${siteUrl}/einsatzgebiet-barnim`;
  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Startseite", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Einsatzgebiet Barnim", item: pageUrl },
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbs} />
      <Navbar />
      <main className="seo-page">
        <section className="seo-page__hero">
          <p>Persönlich, nah und zuverlässig</p>
          <h1>Unser Einsatzgebiet für <span>Bernau, Berlin und Brandenburg</span></h1>
          <p className="seo-page__lead">Je nach Leistung sind wir regional oder in ganz Berlin und Brandenburg für Sie unterwegs.</p>
          <Link className="split-hover-cta seo-page__cta" href="/#contact"><span>Einsatzort anfragen <span aria-hidden="true">↗</span></span></Link>
        </section>

        <section className="seo-page__section" aria-labelledby="area-heading">
          <h2 id="area-heading">Unser Einsatzgebiet</h2>
          <p>Haushaltshilfe und Alltagshilfe bieten wir in 16321 Bernau bei Berlin und im Umkreis von 20 km an. Für Fenster- und Glasreinigung sind wir in ganz Berlin und Brandenburg unterwegs.</p>
          <p>Ob ein Einsatz an Ihrer Adresse möglich ist, klären wir gern vorab persönlich. So können wir Bedarf, Erreichbarkeit und einen passenden Termin zuverlässig abstimmen.</p>
        </section>

        <section className="seo-page__section seo-page__section--blue" aria-labelledby="request-heading">
          <h2 id="request-heading">Unterstützung an Ihrem Wohnort anfragen</h2>
          <p>Nennen Sie uns einfach Ihren Wohnort und kurz, wobei Sie Entlastung wünschen. Wir melden uns persönlich bei Ihnen zurück.</p>
          <Link className="split-hover-cta seo-page__cta" href="/#contact"><span>Kontakt aufnehmen <span aria-hidden="true">↗</span></span></Link>
        </section>

        <section className="seo-page__section" aria-labelledby="service-heading">
          <h2 id="service-heading">Haushaltshilfe nach § 45a SGB XI</h2>
          <p>Erfahren Sie, wie unsere anerkannte Alltagshilfe unterstützen kann und wann eine Abrechnung über den Entlastungsbetrag in Betracht kommt.</p>
          <Link className="seo-page__text-link" href="/haushaltshilfe-45a-barnim">Mehr zur Haushaltshilfe nach § 45a SGB XI <span aria-hidden="true">→</span></Link>
        </section>
      </main>
      <SeoPageFooter />
    </>
  );
}
