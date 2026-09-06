import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimatedSectionEyebrow, AnimatedSectionTitle } from "./HeroTitle";

import { business } from "@/lib/business";

export default function DefectsSection() {
  return (
    <section className="defects-section" aria-labelledby="defects-section-heading">
      <div className="defects-section__content">
        <AnimatedSectionEyebrow text="Anfahrt + Kostenvoranschlag in ganz Berlin" />
        <AnimatedSectionTitle id="defects-section-heading" parts={[{ text: "Typische Defekte, die wir beheben" }]} />
        <p>
          Ob die Maschine kein Wasser mehr abpumpt, die Trommel stillsteht oder ein
          Fehlercode im Display erscheint: Wir kommen zu Ihnen nach Hause, stellen die
          Ursache fest und reparieren in den meisten Fällen direkt beim ersten Termin.
        </p>
        <div className="defects-section__amount">
          <strong>{business.warrantyMonths} Monate Garantie</strong>
          <span>auf jede durchgeführte Reparatur</span>
        </div>
        <Link className="defects-section__link split-hover-cta" href="/waschmaschinen-reparatur-berlin">
          <span>Alle Waschmaschinen-Defekte <ArrowUpRight aria-hidden="true" /></span>
        </Link>
      </div>
      <ol className="defects-section__steps" aria-label="Häufige Defekte an Haushaltsgeräten">
        <li><strong>Maschine pumpt kein Wasser ab</strong><span>Verstopfte Laugenpumpe, Flusensieb oder defekter Ablaufschlauch.</span></li>
        <li><strong>Trommel dreht sich nicht</strong><span>Gerissener Keilriemen, verschlissene Kohlebürsten oder defekter Motor.</span></li>
        <li><strong>Fehlercode im Display</strong><span>Wir lesen den Code aus und beheben die dahinterliegende Ursache.</span></li>
        <li><strong>Wasseraustritt und undichte Stellen</strong><span>Poröse Schläuche, defekte Türdichtung oder ein undichter Laugenbehälter.</span></li>
      </ol>
    </section>
  );
}
