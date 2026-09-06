"use client";

import { useState } from "react";
import { AnimatedSectionTitle } from "./HeroTitle";

import { business } from "@/lib/business";

const faqs = [
  {
    question: "Wie lange dauert eine Reparatur?",
    answer: "Die meisten Reparaturen erledigen wir in 30 bis 90 Minuten direkt bei Ihnen zu Hause. Gängige Ersatzteile führen wir im Servicewagen mit, sodass in der Regel kein zweiter Termin nötig ist.",
  },
  {
    question: "Was kostet die Anfahrt?",
    answer: "Anfahrt und Kostenvoranschlag berechnen wir pauschal – in jedem Berliner Bezirk zum selben Satz. Die Höhe der Pauschale nennen wir Ihnen am Telefon. Entscheiden Sie sich für die Reparatur, nennen wir Ihnen vorab einen verbindlichen Festpreis.",
  },
  {
    question: "Wie setzt sich der Preis zusammen?",
    answer: "Sie zahlen einen Festpreis aus Arbeitsleistung und Ersatzteil. Wir nennen ihn, bevor wir mit der Reparatur beginnen – es gibt keine Stundenabrechnung und keine versteckten Zuschläge.",
  },
  {
    question: "Reparieren Sie auch ältere Geräte?",
    answer: "Ja. Wir reparieren auch Modelle, die seit Jahren nicht mehr hergestellt werden, und beschaffen passende Ersatzteile. Lohnt sich eine Reparatur nicht mehr, sagen wir Ihnen das offen.",
  },
  {
    question: "Welche Garantie erhalte ich?",
    answer: `Auf jede durchgeführte Reparatur geben wir ${business.warrantyMonths} Monate Garantie auf Arbeitsleistung und verbaute Ersatzteile. Die Garantie wird schriftlich auf Ihrer Rechnung festgehalten.`,
  },
  {
    question: "Bekomme ich einen Termin am selben Tag?",
    answer: "Wenn Sie uns bis 12 Uhr anrufen, ist ein Termin am selben Tag meist möglich. Auch Abend- und Samstagstermine bieten wir an, damit Sie keinen Urlaubstag nehmen müssen.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="faq-section__aside">
        <p className="faq-section__eyebrow">Gut zu wissen</p>
        <AnimatedSectionTitle id="faq-heading" parts={[{ text: "Antworten, die Ihnen Sicherheit geben." }]} />
        <p className="faq-section__lead">Die wichtigsten Fragen zu Dauer, Kosten und Garantie einer Reparatur.</p>
        <div className="faq-section__contact">
          <span>Noch etwas unklar?</span>
          <strong>Wir beraten Sie persönlich.</strong>
          <a className="split-hover-cta" href="#contact"><span>Kontakt aufnehmen <span aria-hidden="true">↗</span></span></a>
        </div>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const answerId = `faq-answer-${index}`;

          return (
            <article className={`faq-item${isOpen ? " is-open" : ""}`} key={faq.question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="faq-item__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="faq-item__question">{faq.question}</span>
                  <span className="faq-item__icon" aria-hidden="true" />
                </button>
              </h3>
              <div className="faq-item__answer" id={answerId} aria-hidden={!isOpen}>
                <div><p>{faq.answer}</p></div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
