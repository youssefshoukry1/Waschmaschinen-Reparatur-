import Image from "next/image";

import { business, mapsUrl } from "@/lib/business";

type Props = {
  /**
   * Explosionszeichnung des Geraets, um das es auf der jeweiligen Seite geht.
   * Sie sitzt oben in der Spalte und ersetzt dort die Zeichnung, die der Hero
   * ab 1025px ausblendet.
   */
  image: { src: string; alt: string };
};

/**
 * Rote Servicespalte rechts neben dem Hero der Geraeteseiten.
 *
 * Sie traegt die Explosionszeichnung, das Callcenter-Foto, die Notrufnummer und
 * drei Service-Bloecke. Ueber `position: sticky` steht sie beim Scrollen still
 * und laeuft erst mit dem Banner "Selbst geprueft und nichts gefunden?" aus dem
 * Bild – die Sticky-Grenze ist der Wrapper `.rail-layout` auf der Seite, der
 * Hero, Mittelteil und Kontaktsektion umschliesst, den Banner aber nicht mehr.
 *
 * Bis auf das Bild ist der Inhalt auf allen Seiten derselbe: Die Texte gelten
 * geraeteuebergreifend, Rufnummer und Adresse kommen aus lib/business.ts.
 *
 * Der Inhalt ist bewusst knapp gehalten: Die Spalte ist genau eine Fensterhoehe
 * hoch und soll ohne eigenen Scrollbalken vollstaendig sichtbar bleiben. Wer
 * hier etwas ergaenzt, nimmt den Bildern Platz weg - siehe `.service-rail` in
 * app/globals.css.
 *
 * Nur ab 1025px sichtbar: darunter blendet `.service-rail` komplett aus, damit
 * Telefon und Tablet unveraendert bleiben.
 */
export default function ServiceRail({ image }: Props) {
  return (
    <aside
      className="service-rail"
      aria-label="Notdienst und Service auf einen Blick"
    >
      {/* Die beiden einzigen flexiblen Elemente der Spalte: Sie teilen sich zu
          gleichen Teilen den Platz, der nach den Textbloecken uebrig bleibt, und
          schrumpfen auf flachen Fenstern mit, statt den Text unten
          abzuschneiden. */}
      <div className="service-rail__figure service-rail__figure--diagram">
        <Image
          src={image.src}
          alt={image.alt}
          width={1200}
          height={1200}
          priority
          sizes="360px"
        />
      </div>

      <div className="service-rail__figure service-rail__figure--callcenter">
        <Image
          src="/images/call_center.webp"
          alt="Mitarbeiterin unseres Notdienstes nimmt Ihren Anruf entgegen"
          width={1672}
          height={941}
          priority
          sizes="360px"
        />
      </div>

      <div className="service-rail__block">
        <p className="service-rail__label">Unsere Notrufnummer:</p>
        <a className="service-rail__phone" href={`tel:${business.telephone}`}>
          030-4985 43 26
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
