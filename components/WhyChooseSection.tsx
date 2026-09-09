import { BadgeCheck, Banknote, ShieldCheck, Wrench } from "lucide-react";

import { business } from "@/lib/business";

/**
 * Die vier Gruende der Startseite, noch einmal fuer die Geraetseiten.
 *
 * Markup und Klassennamen sind bewusst identisch zu app/page.tsx: So sieht der
 * Block exakt aus wie auf der Startseite - hellblaue Flaeche, dieselbe Pille,
 * dieselben Karten samt Hover-Drehung der Icons. Angepasst wird per
 * `why-choose--inline` nur, was die schmalere Spalte erzwingt.
 */
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

/**
 * Steht in der rechten Spalte der Fragen-Sektion ueber der Fragenliste, damit
 * beides als eine Sektion liest.
 *
 * Der Anker `#unternehmen` der Startseite darf hier nicht auftauchen - id und
 * `aria-labelledby` bekommen deshalb ein eigenes Praefix.
 */
export default function WhyChooseInline({ idPrefix }: { idPrefix: string }) {
  const headingId = `${idPrefix}-why-choose-heading`;

  return (
    <section
      className="why-choose why-choose--inline"
      aria-labelledby={headingId}
    >
      <div className="why-choose-inner">
        <div className="why-choose-heading">
          <p>Warum unser Reparaturdienst</p>
          <h2 id={headingId}>Reparatur, auf die Sie sich verlassen können.</h2>
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
  );
}
