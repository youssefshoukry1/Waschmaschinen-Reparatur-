"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { AnimatedSectionTitle } from "./HeroTitle";
import type { FaqItem } from "@/lib/kaffeeFaq";

/** Ein Maskottchen, das die Fragenliste beim Scrollen aufdeckt. Optional. */
export type FaqMascot = {
  src: string;
  /** Leer lassen: Die Figur ist reine Dekoration, die H2 benennt die Sektion. */
  alt?: string;
};

type Props = {
  /** Anker der Sektion, z. B. "haeufige-fragen". */
  id: string;
  heading: string;
  lead: string;
  items: FaqItem[];
  /**
   * Nur die Fernseherseite fuehrt die sitzende Figur mit. Ohne diese Prop
   * rendert die Sektion exakt wie bisher - die uebrigen Geraeteseiten aendern
   * sich dadurch nicht.
   */
  mascot?: FaqMascot;
};

/** Sanftes Auslaufen, damit die Figur am Ende nicht hart stehen bleibt. */
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Akkordeon für gerätespezifische Fragen und Antworten.
 *
 * Anders als FAQSection und RepairGuidesSection trägt diese Variante keine rote
 * Intro-Karte mehr: Auf den Gerätseiten steht direkt links daneben schon die
 * rote Servicekarte, zwei rote Flächen nebeneinander wären eine Dopplung.
 * Überschrift und Vorspann laufen deshalb als schlichter Kopf über der Liste –
 * die H2 bleibt erhalten und benennt die Sektion weiterhin per
 * `aria-labelledby`.
 *
 * Mit `mascot` kommt eine scrollgebundene Enthuellung dazu, die ausschliesslich
 * die Ueberschrift betrifft: Die Figur startet links auf deren Zeile und deckt
 * sie dabei ab. Beim Weiterscrollen wandert sie nach rechts und gibt die
 * Ueberschrift Stueck fuer Stueck frei, bis am Zeilenende beide nebeneinander
 * stehen. Vorspann und Fragenliste bleiben unberuehrt. Gesteuert wird das ueber
 * eine einzige CSS-Variable (`--faq-reveal`, 0 bis 1) - React rendert dabei
 * kein einziges Mal neu.
 */
export default function DeviceFaqSection({ id, heading, lead, items, mascot }: Props) {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingId = `${id}-heading`;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !mascot) return;

    // Unter 1025px steht die Liste allein und die Figur ist ausgeblendet; wer
    // weniger Bewegung wuenscht, bekommt direkt den Endzustand.
    const skip = window.matchMedia("(max-width: 1024px), (prefers-reduced-motion: reduce)");

    let frame = 0;
    let running = false;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // Start, sobald die Sektion knapp im Bild ist; fertig, wenn ihr oberer
      // Rand das obere Drittel erreicht - rund 0,6 Bildschirmhoehen Weg.
      const raw = (vh * 0.85 - rect.top) / (vh * 0.6);
      const progress = easeOutCubic(Math.min(1, Math.max(0, raw)));
      section.style.setProperty("--faq-reveal", progress.toFixed(4));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const start = () => {
      if (running) return;
      running = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      update();
    };

    const stop = () => {
      if (!running) return;
      running = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const settle = () => {
      stop();
      section.style.setProperty("--faq-reveal", "1");
    };

    // Der Scrollhandler laeuft nur, solange die Sektion wirklich im Bild ist.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "120px 0px" },
    );

    const sync = () => {
      if (skip.matches) {
        observer.disconnect();
        settle();
      } else {
        observer.observe(section);
      }
    };

    sync();
    skip.addEventListener("change", sync);

    return () => {
      skip.removeEventListener("change", sync);
      observer.disconnect();
      stop();
    };
  }, [mascot]);

  return (
    <section
      className={mascot ? "device-faq device-faq--mascot" : "device-faq"}
      id={id}
      aria-labelledby={headingId}
      ref={sectionRef}
    >
      <div className="device-faq__header">
        {/* Nur die Ueberschrift steckt in der Buehne. Der Vorspann darunter und
            die Fragenliste bleiben unangetastet - sie sind von Anfang an da. */}
        <div className="device-faq__headline">
          <AnimatedSectionTitle id={headingId} parts={[{ text: heading }]} />
          {mascot ? (
            <Image
              className="device-faq__mascot"
              src={mascot.src}
              alt={mascot.alt ?? ""}
              aria-hidden={mascot.alt ? undefined : true}
              width={1254}
              height={1254}
              sizes="160px"
            />
          ) : null}
        </div>
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
