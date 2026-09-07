import { Wrench } from "lucide-react";
import { AnimatedSectionTitle } from "./HeroTitle";

import BrandLogoMarquee from "./BrandLogoMarquee";

export default function BrandsSection() {
  return (
    <section className="service-area" id="marken" aria-labelledby="brands-heading">
      <div className="service-area__heading">
        <p><Wrench aria-hidden="true" /> Marken</p>
        <AnimatedSectionTitle id="brands-heading" parts={[{ text: "Wir reparieren ", desktopBreakAfter: true }, { text: "alle gängigen Hersteller", emphasized: true }]} />
        <span>Original-Ersatzteile und passendes Werkzeug für jede Marke haben wir im Servicewagen dabei.</span>
      </div>
      <BrandLogoMarquee />
      <p className="chip-list__note">Ihre Marke ist nicht dabei? Rufen Sie uns an – wir reparieren auch ältere und seltenere Modelle.</p>
    </section>
  );
}
