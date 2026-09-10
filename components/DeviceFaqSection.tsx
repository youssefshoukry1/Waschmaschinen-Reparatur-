"use client";

import { useState } from "react";

import FaqMascotHeadline, {
  useFaqMascotReveal,
  type FaqMascot,
} from "./FaqMascotHeadline";
import type { FaqItem } from "@/lib/kaffeeFaq";

export type { FaqMascot };

type Props = {
  /** Anker der Sektion, z. B. "haeufige-fragen". */
  id: string;
  heading: string;
  lead: string;
  items: FaqItem[];
  /** Ueberschreibt die Standardfigur - sonst laeuft ueberall dieselbe. */
  mascot?: FaqMascot;
};

/**
 * Akkordeon für gerätespezifische Fragen und Antworten.
 *
 * Anders als FAQSection trägt diese Variante keine rote Intro-Karte mehr: Auf
 * den Gerätseiten steht direkt links daneben schon die rote Servicekarte, zwei
 * rote Flächen nebeneinander wären eine Dopplung. Überschrift und Vorspann
 * laufen deshalb als schlichter Kopf über der Liste – die H2 bleibt erhalten
 * und benennt die Sektion weiterhin per `aria-labelledby`.
 *
 * Dazu kommt auf allen sechs Geraeteseiten die scrollgebundene Enthuellung der
 * Ueberschrift aus FaqMascotHeadline.
 */
export default function DeviceFaqSection({
  id,
  heading,
  lead,
  items,
  mascot,
}: Props) {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useFaqMascotReveal<HTMLElement>();
  const headingId = `${id}-heading`;

  return (
    <section
      className="device-faq device-faq--mascot"
      id={id}
      aria-labelledby={headingId}
      ref={sectionRef}
    >
      <div className="device-faq__header">
        {/* Nur die Ueberschrift steckt in der Buehne. Der Vorspann darunter und
            die Fragenliste bleiben unangetastet - sie sind von Anfang an da. */}
        <FaqMascotHeadline headingId={headingId} heading={heading} mascot={mascot} />
        <p className="device-faq__lead">{lead}</p>
      </div>

      <div className="faq-list">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${item.id}`;

          return (
            <article className={`faq-item${isOpen ? " is-open" : ""}`} key={item.id} id={item.id}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="faq-item__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="faq-item__question">{item.question}</span>
                  <span className="faq-item__icon" aria-hidden="true" />
                </button>
              </h3>
              <div className="faq-item__answer" id={answerId} aria-hidden={!isOpen}>
                <div>
                  <p>{item.answer}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
