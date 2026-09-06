import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSectionEyebrow, AnimatedSectionTitle } from "./HeroTitle";

import { business } from "@/lib/business";

export default function Section45a() {
  if (!business.section45a.isRecognized) return null;

  return (
    <section className="section-45a" aria-labelledby="section-45a-heading">
      <div className="section-45a__content">
        <AnimatedSectionEyebrow text="Anerkannter Anbieter nach § 45a SGB XI" />
        <AnimatedSectionTitle id="section-45a-heading" parts={[{ text: "Haushaltshilfe mit Entlastungsbetrag nutzen" }]} />
        <p>
          Als anerkannter Anbieter unterstützen wir Sie im Haushalt und im Alltag.
          Bei erfüllten persönlichen Voraussetzungen können passende Leistungen über
          den Entlastungsbetrag der Pflegekasse abgerechnet werden. Der Betrag liegt
          aktuell bei bis zu {business.section45a.reliefAmountMonthly} Euro monatlich.
        </p>
        <div className="section-45a__amount"><strong>Bis zu {business.section45a.reliefAmountMonthly} €</strong><span>monatlich verfügbar</span></div>
        <Link className="section-45a__link split-hover-cta" href="/haushaltshilfe-45a-barnim"><span>Mehr zu § 45a SGB XI <ArrowUpRight aria-hidden="true" /></span></Link>
      </div>
      <ol className="section-45a__steps" aria-label="So funktioniert die Unterstützung">
        <li><strong>Bedarf besprechen</strong><span>Wir hören zu und klären, welche Unterstützung zu Ihnen passt.</span></li>
        <li><strong>Leistung prüfen</strong><span>Gemeinsam besprechen wir Einsatz, Voraussetzungen und Abrechnung.</span></li>
        <li><strong>Alltag entlasten</strong><span>Wir vereinbaren einen passenden Termin für Ihre Unterstützung.</span></li>
      </ol>
    </section>
  );
}
