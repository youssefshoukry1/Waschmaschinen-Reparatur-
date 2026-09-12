import Image from "next/image";

import { business, mapsUrl } from "@/lib/business";

/**
 * Rote Servicespalte in der Fragen-Sektion der Geraetseiten.
 *
 * Sie steht ab 1025px als zweite Spalte von links im Raster
 * `.device-faq-layout` - zwischen der Markenleiste und der Fragenliste - und
 * laeuft ganz normal im Textfluss mit. Kein `sticky`, kein `fixed`: Die Karte
 * ist so hoch wie ihr Inhalt und scrollt mit der Sektion aus dem Bild.
 *
 * Die Explosionszeichnung des Geraets sitzt wieder im Hero, deshalb traegt die
 * Karte nur noch das Callcenter-Foto. Der uebrige Inhalt ist auf allen Seiten
 * derselbe: Die Texte gelten geraeteuebergreifend, Rufnummer und Adresse kommen
 * aus lib/business.ts.
 *
 * Nur ab 1025px sichtbar: darunter blendet `.service-rail` komplett aus, damit
 * Telefon und Tablet unveraendert bleiben.
 */
export default function ServiceRail() {
  return (
    <aside
      className="service-rail"
      aria-label="Notdienst und Service auf einen Blick"
    >
      <div className="service-rail__figure service-rail__figure--callcenter">
        <Image
          src="/images/call_center.webp"
          alt="Mitarbeiterin unseres Notdienstes nimmt Ihren Anruf entgegen"
          width={1672}
          height={941}
          sizes="(max-width: 1024px) 1px, (max-width: 1439px) 280px, 340px"
        />
      </div>

      <div className="service-rail__block">
        <p className="service-rail__label">Unsere Notrufnummer:</p>
        <a className="service-rail__phone" href={`tel:${business.telephone}`}>
          {business.telephoneDisplay}
        </a>
        <p>
          Bei Ihnen streikt die Waschmaschine, Trockner, Kühlschrank,
          Geschirrspüler oder der Fernseher?
        </p>
        <p>
          <strong>Kein Problem!</strong> Wir kommen bei Ihnen sofort vorbei.
        </p>
        <a
          className="service-rail__link split-hover-cta"
          href={`tel:${business.telephone}`}
        >
          <span>Jetzt anrufen</span>
        </a>
      </div>

      <div className="service-rail__block">
        <h2 className="service-rail__heading">Firmensitz:</h2>
        <p>
          Gerne möchten wir Sie darauf hinweisen, dass bei einer Reparatur
          kleinerer Haushaltsgeräte ein Vorortservice nicht immer unbedingt
          notwendig ist. Gerne nehmen wir Ihre Geräte bei uns im Laden entgegen
          und ersparen Ihnen z.B. die ohnehin preiswerten An- und
          Abfahrtskosten.
        </p>
        <a
          className="service-rail__link split-hover-cta"
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>zum Routenplaner</span>
        </a>
      </div>

      <div className="service-rail__block">
        <h2 className="service-rail__heading">Rückruf Service</h2>
        <p>
          Sie konnten uns telefonisch nicht erreichen oder haben aktuell kein
          Telefon zur Hand? Kein Problem! kontaktieren Sie uns über unser
          Kontaktformular. Wir werden Sie schnellst möglich zurückrufen.
        </p>
        <a className="service-rail__link split-hover-cta" href="#contact">
          <span>zum Kontaktformular</span>
        </a>
      </div>
    </aside>
  );
}
