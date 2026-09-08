"use client";

import { useState } from "react";

import { AnimatedSectionTitle } from "./HeroTitle";
import type { FaqItem } from "@/lib/kaffeeFaq";

type Props = {
  /** Anker der Sektion, z. B. "haeufige-fragen". */
  id: string;
  /** Kleine Zeile über der Überschrift. */
  eyebrow: string;
  heading: string;
  lead: string;
  items: FaqItem[];
};

/**
 * Akkordeon für gerätespezifische Fragen und Antworten.
 * Gleiches Markup wie FAQSection und RepairGuidesSection – nur die Inhalte
 * kommen von außen.
 */
export default function DeviceFaqSection({ id, eyebrow, heading, lead, items }: Props) {
  const [openIndex, setOpenIndex] = useState(0);
  const headingId = `${id}-heading`;

  return (
    <section className="faq-section faq-section--guides" id={id} aria-labelledby={headingId}>
      <div className="faq-section__aside">
        <p className="faq-section__eyebrow">{eyebrow}</p>
        <AnimatedSectionTitle id={headingId} parts={[{ text: heading }]} />
        <p className="faq-section__lead">{lead}</p>
        <div className="faq-section__contact">
          <span>Ihre Frage ist nicht dabei?</span>
          <strong>Unser 24-Stunden-Notdienst ist für Sie da.</strong>
          <a className="split-hover-cta" href="#contact">
            <span>
              Kontakt aufnehmen <span aria-hidden="true">↗</span>
            </span>
          </a>
        </div>
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
