import { MapPin, Sparkles } from "lucide-react";
import { AnimatedSectionTitle } from "./HeroTitle";

const areas = [
  {
    title: "Haushaltshilfe & Alltagshilfe",
    text: "In 16321 Bernau bei Berlin und im Umkreis von 20 km.",
    detail: "Persönliche Unterstützung für Ihren Alltag – nah, zuverlässig und vor Ort.",
  },
  {
    title: "Fenster- & Glasreinigung",
    text: "In ganz Berlin und Brandenburg.",
    detail: "Für private Haushalte und Gewerbe – flexibel in der gesamten Region unterwegs.",
  },
];

export default function ServiceAreaSection() {
  return (
    <section className="service-area" id="einsatzgebiet" aria-labelledby="service-area-heading">
      <div className="service-area__heading">
        <p><MapPin aria-hidden="true" /> Unser Einsatzgebiet</p>
        <AnimatedSectionTitle id="service-area-heading" parts={[{ text: "Hier sind wir ", desktopBreakAfter: true }, { text: "für Sie da", emphasized: true }]} />
        <span>Je nach Leistung sind wir in unterschiedlichen Gebieten für Sie unterwegs.</span>
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
    </section>
  );
}
