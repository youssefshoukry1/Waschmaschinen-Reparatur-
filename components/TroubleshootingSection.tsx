"use client";

import { useState } from "react";
import { AnimatedSectionTitle } from "./HeroTitle";

const problems = [
  {
    question: "Waschmaschine pumpt kein Wasser ab",
    answer: "Prüfen Sie zuerst das Flusensieb unten an der Frontblende und reinigen Sie es. Kontrollieren Sie anschließend, ob der Ablaufschlauch geknickt oder verstopft ist. Bleibt das Wasser stehen, ist meist die Laugenpumpe defekt – das tauschen wir vor Ort.",
  },
  {
    question: "Trommel dreht sich nicht mehr",
    answer: "Öffnen und schließen Sie die Tür erneut, damit der Türkontakt sicher einrastet, und wählen Sie ein anderes Programm. Dreht sich die Trommel weiterhin nicht, sind in der Regel Keilriemen, Kohlebürsten oder der Motor betroffen.",
  },
  {
    question: "Fehlercode im Display",
    answer: "Notieren Sie den angezeigten Code und trennen Sie das Gerät für zehn Minuten vom Strom. Erscheint der Code danach erneut, nennen Sie ihn uns am Telefon – wir können die benötigten Ersatzteile dann direkt mitbringen.",
  },
  {
    question: "Wasser läuft unter der Maschine aus",
    answer: "Ziehen Sie sofort den Netzstecker und schließen Sie den Wasserhahn. Häufige Ursachen sind eine poröse Türdichtung, ein defekter Zulaufschlauch oder ein Riss im Laugenbehälter. Betreiben Sie das Gerät bis zur Reparatur nicht weiter.",
  },
  {
    question: "Maschine schleudert nicht richtig",
    answer: "Verteilen Sie die Wäsche gleichmäßig in der Trommel – eine Unwucht bricht den Schleudergang ab. Kontrollieren Sie außerdem das Flusensieb. Bleibt das Problem, sind meist Stoßdämpfer, Lager oder der Drehzahlsensor verschlissen.",
  },
  {
    question: "Tür lässt sich nicht öffnen",
    answer: "Warten Sie zwei bis drei Minuten nach Programmende, bis die Türverriegelung entsperrt. Steht noch Wasser in der Trommel, lassen Sie es über das Notablaufschlauch am Flusensieb ab. Öffnet die Tür danach nicht, ist das Türschloss defekt.",
  },
];

export default function TroubleshootingSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="faq-section" id="fehler" aria-labelledby="troubleshooting-heading">
      <div className="faq-section__aside">
        <p className="faq-section__eyebrow">Selbst prüfen</p>
        <AnimatedSectionTitle id="troubleshooting-heading" parts={[{ text: "Diese Fehler lösen Sie oft selbst." }]} />
        <p className="faq-section__lead">Die häufigsten Waschmaschinen-Fehler lassen sich oft in wenigen Minuten selbst beheben. Hilft keiner der Schritte, kommen wir zu Ihnen.</p>
        <div className="faq-section__contact">
          <span>Fehler bleibt bestehen?</span>
          <strong>Wir kommen vorbei und prüfen Ihr Gerät</strong>
          <a className="split-hover-cta" href="#contact"><span>Jetzt anrufen <span aria-hidden="true">↗</span></span></a>
        </div>
      </div>

      <div className="faq-list">
        {problems.map((problem, index) => {
          const isOpen = openIndex === index;
          const answerId = `troubleshooting-answer-${index}`;

          return (
            <article className={`faq-item${isOpen ? " is-open" : ""}`} key={problem.question}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="faq-item__number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="faq-item__question">{problem.question}</span>
                  <span className="faq-item__icon" aria-hidden="true" />
                </button>
              </h3>
              <div className="faq-item__answer" id={answerId} aria-hidden={!isOpen}>
                <div><p>{problem.answer}</p></div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
