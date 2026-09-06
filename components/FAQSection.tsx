"use client";

import { useState } from "react";
import { AnimatedSectionTitle } from "./HeroTitle";

const faqs = [
  {
    question: "Welche Leistungen bieten Sie im Alltag an?",
    answer: "Wir unterstützen Sie unter anderem bei der Haushaltsführung, beim Einkaufen, bei Begleitungen und Fahrten, bei Gartenarbeiten sowie bei der Glas- und Fensterreinigung.",
  },
  {
    question: "Kann die Haushaltshilfe über die Pflegekasse abgerechnet werden?",
    answer: "Ja. Als anerkanntes Dienstleistungsunternehmen können wir Leistungen nach § 45a SGB XI über den Entlastungsbetrag abrechnen, sofern die persönlichen Voraussetzungen erfüllt sind.",
  },
  {
    question: "Wie vereinbare ich einen ersten Termin?",
    answer: "Senden Sie uns eine Anfrage über das Kontaktformular, schreiben Sie uns per WhatsApp oder rufen Sie uns an. Wir besprechen Ihren Bedarf persönlich und vereinbaren anschließend einen passenden Termin.",
  },
  {
    question: "In welchem Gebiet sind Sie tätig?",
    answer: "Haushaltshilfe und Alltagshilfe bieten wir in 16321 Bernau bei Berlin und im Umkreis von 20 km an. Für Fenster- und Glasreinigung sind wir in ganz Berlin und Brandenburg unterwegs.",
  },
  {
    question: "Sind regelmäßige und einmalige Einsätze möglich?",
    answer: "Beides ist möglich. Wir stimmen Häufigkeit, Umfang und Zeiten individuell mit Ihnen ab – vom einmaligen Einsatz bis zur verlässlichen regelmäßigen Unterstützung.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section" id="faq" aria-labelledby="faq-heading">
      <div className="faq-section__aside">
        <p className="faq-section__eyebrow">Gut zu wissen</p>
        <AnimatedSectionTitle id="faq-heading" parts={[{ text: "Antworten, die Ihnen Sicherheit geben." }]} />
        <p className="faq-section__lead">Die wichtigsten Fragen zu unseren Leistungen, zur Abrechnung und zum ersten Termin.</p>
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
