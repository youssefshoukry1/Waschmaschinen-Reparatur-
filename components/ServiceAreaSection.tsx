import { MapPin, Sparkles } from "lucide-react";
import { AnimatedSectionTitle } from "./HeroTitle";

import { districts } from "@/lib/business";

const areas = [
  {
    title: "Reparatur vor Ort",
    text: "In allen zwölf Berliner Bezirken.",
    detail: "Wir kommen mit Werkzeug und gängigen Ersatzteilen direkt zu Ihnen nach Hause.",
  },
  {
    title: "Termin am selben Tag",
    text: "Bei Anruf bis 12 Uhr, je nach Auslastung.",
    detail: "Auch abends und samstags – damit Sie sich keinen Urlaubstag nehmen müssen.",
  },
];

export default function ServiceAreaSection() {
  return (
    <section className="service-area" id="einsatzgebiet" aria-labelledby="service-area-heading">
      <div className="service-area__heading">
        <p><MapPin aria-hidden="true" /> Unsere Bezirke</p>
        <AnimatedSectionTitle id="service-area-heading" parts={[{ text: "In ganz Berlin ", desktopBreakAfter: true }, { text: "für Sie unterwegs", emphasized: true }]} />
        <span>Wir kommen zu Ihnen nach Hause – unabhängig davon, in welchem Bezirk Sie wohnen.</span>
      </div>
      <div className="service-area__cards">
        {areas.map((area) => (
          <article className="service-area__card" key={area.title}>
            <Sparkles aria-hidden="true" />
            <h3>{area.title}</h3>
            <strong>{area.text}</strong>
            <p>{area.detail}</p>
          </article>
        ))}
      </div>
      <ul className="chip-list">
        {districts.map((district) => <li key={district}>{district}</li>)}
      </ul>
      <p className="chip-list__note">Ihr Ortsteil ist nicht aufgeführt? Fragen Sie uns – wir fahren im gesamten Stadtgebiet.</p>
    </section>
  );
}
