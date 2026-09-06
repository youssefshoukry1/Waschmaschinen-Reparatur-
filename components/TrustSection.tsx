import { Award, ShieldCheck } from "lucide-react";
import { AnimatedSectionTitle } from "./HeroTitle";

import type { WebsiteTrustSettings } from "@/sanity-reference/lib/trustSettings";
import { business } from "@/lib/business";

export default function TrustSection({ trustSettings }: { trustSettings: WebsiteTrustSettings }) {
  const ratingBadge = trustSettings.showRating
    ? {
        title: `${new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(trustSettings.ratingValue)} von 5 Sternen`,
        text: trustSettings.ratingLabel,
        detail: "Bewertungen von Kundinnen und Kunden, die wir in Berlin vor Ort betreut haben.",
      }
    : {
        title: "Transparente Festpreise",
        text: "Der Preis steht fest, bevor wir beginnen",
        detail: "Sie erfahren den Preis, bevor wir mit der Reparatur beginnen. Ohne versteckte Zuschläge.",
      };

  const badges = [
    {
      title: business.chamber.name,
      text: "Eingetragener Mitgliedsbetrieb",
      detail: `Geprüfter Handwerksbetrieb mit Betriebsnummer ${business.chamber.memberNumber}. Reparaturen führen ausgebildete Techniker durch.`,
    },
    {
      title: `${business.warrantyMonths} Monate Garantie`,
      text: "Auf jede durchgeführte Reparatur",
      detail: "Verbaute Ersatzteile und die geleistete Arbeit sind abgesichert – schriftlich auf Ihrer Rechnung festgehalten.",
    },
    ratingBadge,
  ];

  return (
    <section className="service-area" id="vertrauen" aria-labelledby="trust-heading">
      <div className="service-area__heading">
        <p><ShieldCheck aria-hidden="true" /> Vertrauen &amp; Qualität</p>
        <AnimatedSectionTitle id="trust-heading" parts={[{ text: "Worauf Sie sich ", desktopBreakAfter: true }, { text: "verlassen können", emphasized: true }]} />
        <span>Seit {business.foundedYear} reparieren wir Haushaltsgeräte in Berlin – geprüft, abgesichert und zum Festpreis.</span>
      </div>
      <div className="service-area__cards">
        {badges.map((badge) => (
          <article className="service-area__card" key={badge.title}>
            <Award aria-hidden="true" />
            <h3>{badge.title}</h3>
            <strong>{badge.text}</strong>
            <p>{badge.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
