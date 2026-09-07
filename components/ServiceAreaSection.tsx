import { Clock, MapPin, Wrench } from "lucide-react";
import { AnimatedSectionTitle } from "./HeroTitle";
import DistrictCloud from "./DistrictCloud";

const areas = [
  {
    icon: Wrench,
    title: "Reparatur vor Ort",
    text: "In allen zwölf Berliner Bezirken.",
    detail: "Wir kommen mit Werkzeug und gängigen Ersatzteilen direkt zu Ihnen nach Hause.",
  },
  {
    icon: Clock,
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
        {areas.map(({ icon: Icon, ...area }) => (
          <article className="service-area__card" key={area.title}>
            <Icon aria-hidden="true" />
            <h3>{area.title}</h3>
            <strong>{area.text}</strong>
            <p>{area.detail}</p>
          </article>
        ))}
      </div>
      <DistrictCloud />
    </section>
  );
}
