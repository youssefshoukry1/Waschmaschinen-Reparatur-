import { AnimatedSectionTitle } from "./HeroTitle";

const appliances = [
  "Waschmaschinen",
  "Geschirrspüler",
  "Trockner",
  "Kühlschränke",
  "Kaffeemaschinen",
  "Fernseher",
  "Hifi",
  "Gastronomiegeräte",
  "Gastro Geschirrspüler",
  "Gastro Kühlschränke",
  "Kühlzellen",
  "Satellitenanlagen",
];

export default function TroubleshootingSection() {
  return (
    <section className="faq-section" id="fehler" aria-labelledby="appliances-heading">
      <div className="faq-section__aside">
        <p className="faq-section__eyebrow">Reparatur &amp; Verkauf</p>
        <AnimatedSectionTitle id="appliances-heading" parts={[{ text: "Wir reparieren und verkaufen" }]} />
        <p className="faq-section__lead">Haushaltsgeräte, Unterhaltungselektronik und Gastronomietechnik – Reparatur und Verkauf aus einer Hand.</p>
        <div className="faq-section__contact">
          <span>Ihr Gerät ist dabei?</span>
          <strong>Wir kommen vorbei und prüfen Ihr Gerät</strong>
          <a className="split-hover-cta" href="#contact"><span>Jetzt anrufen <span aria-hidden="true">↗</span></span></a>
        </div>
      </div>

      <ul className="appliance-list" aria-label="Geräte, die wir reparieren und verkaufen">
        {appliances.map((appliance, index) => (
          <li className="appliance-item" key={appliance}>
            <span className="appliance-item__number">{String(index + 1).padStart(2, "0")}</span>
            <span className="appliance-item__name">{appliance}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
