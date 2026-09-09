"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { AnimatedSectionTitle } from "./HeroTitle";
import type { FaqItem } from "@/lib/kaffeeFaq";

/** Das Maskottchen, das die Ueberschrift beim Scrollen freigibt. */
export type FaqMascot = {
  src: string;
  /** Leer lassen: Die Figur ist reine Dekoration, die H2 benennt die Sektion. */
  alt?: string;
};

/**
 * Die sitzende Figur mit Frage- und Ausrufezeichen. Sie passt auf jede
 * Geraeteseite, deshalb steht sie hier einmal statt sechsmal in den Seiten.
 * Wer eine andere Figur braucht, reicht `mascot` durch.
 */
const DEFAULT_FAQ_MASCOT: FaqMascot = {
  src: "/images/img18.png",
  // Reine Dekoration: Die Ueberschrift daneben sagt bereits alles.
  alt: "",
};

type Props = {
  /** Anker der Sektion, z. B. "haeufige-fragen". */
  id: string;
  heading: string;
  lead: string;
  items: FaqItem[];
  /** Ueberschreibt die Standardfigur - sonst laeuft ueberall dieselbe. */
  mascot?: FaqMascot;
};

/* --------------------------------------------------------------------------
   Das Scrollfenster der Enthuellung

   START: Oberkante der Sektion auf 78 % der Bildschirmhoehe. Die Ueberschrift
          ist damit gerade im unteren Drittel angekommen - die Figur laeuft
          sofort los, statt erst auf halber Hoehe aufzuwachen.
   SPAN:  Gut eine halbe Bildschirmhoehe Scrollweg. Bewusst lang: Jeder der
          beiden Saetze bekommt so seine Zeit, statt in wenigen Rasten des
          Mausrads durchgerissen zu werden.
   -------------------------------------------------------------------------- */
const REVEAL_START = 0.78;
const REVEAL_SPAN = 0.62;

/* Nachlauf pro Bild. Das Mausrad springt in Rasten von rund 100px - haengt die
   Figur starr am Scrollwert, ruckelt sie in genau diesen Stufen mit. Sie zieht
   deshalb weich hinterher: Pro Frame legt sie nur diesen Anteil des Rests zum
   Sollwert zurueck. Kleiner = traeger und weicher. */
const REVEAL_DAMPING = 0.085;

/** Traege anlaufen, zuegig durch die Mitte, weich ankommen. */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
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
 * Dazu kommt auf allen sechs Geraeteseiten dieselbe scrollgebundene
 * Enthuellung, die ausschliesslich die Ueberschrift betrifft: Die Figur startet
 * links auf deren Zeile und deckt sie dabei ab. Beim Weiterscrollen huepft sie
 * in zwei Saetzen nach rechts und zieht die Ueberschrift hinter sich her ans
 * Licht, bis am Zeilenende beide nebeneinander stehen. Vorspann und
 * Fragenliste bleiben unberuehrt.
 *
 * Der Effekt laeuft komplett ueber vier CSS-Variablen, die der Scrollhandler
 * fortschreibt - React rendert dabei kein einziges Mal neu.
 */
export default function DeviceFaqSection({
  id,
  heading,
  lead,
  items,
  mascot = DEFAULT_FAQ_MASCOT,
}: Props) {
  const [openIndex, setOpenIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingId = `${id}-heading`;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Unter 1025px steht die Liste allein und die Figur ist ausgeblendet; wer
    // weniger Bewegung wuenscht, bekommt direkt den Endzustand.
    const skip = window.matchMedia("(max-width: 1024px), (prefers-reduced-motion: reduce)");

    let frame = 0;
    let running = false;
    /** Der geglaettete Fortschritt. -1 heisst "noch nie gemessen". */
    let current = -1;

    const write = (t: number, hop: number, lean: number, squash: number) => {
      const style = section.style;
      style.setProperty("--faq-t", t.toFixed(4));
      style.setProperty("--faq-hop", hop.toFixed(4));
      style.setProperty("--faq-lean", lean.toFixed(3));
      style.setProperty("--faq-squash", squash.toFixed(4));
    };

    /** Wo steht die Sektion gerade im Scrollfenster? 0 bis 1. */
    const measure = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const raw = (vh * REVEAL_START - rect.top) / (vh * REVEAL_SPAN);
      return Math.min(1, Math.max(0, raw));
    };

    const render = (p: number) => {
      // Der Weg selbst laeuft weich an und weich aus.
      const t = easeInOutCubic(p);

      // Zwei Saetze statt eines Rutsches: Der Sinus ueber die doppelte Strecke
      // ergibt zwei Boegen, der zweite flacher als der erste - so wirkt es, als
      // verliere sie zum Sitzplatz hin an Schwung.
      const arc = Math.sin(Math.PI * t * 2);
      const hop = Math.abs(arc) * (1 - 0.42 * t);

      // In der Luft neigt sie sich in die Bewegungsrichtung, am Boden steht sie
      // wieder gerade - am Ende bleibt kein Rest-Kippen stehen.
      const lean = Math.sin(Math.PI * t) * 7;

      // Beim Aufsetzen kurz stauchen. Der Bogen beruehrt bei t = 0,5 den Boden;
      // rund um diesen Punkt drueckt es die Figur flach.
      const landing = Math.max(0, 1 - Math.abs(t - 0.5) * 14);
      const squash = landing * 0.07;

      write(t, hop, lean, squash);
    };

    /**
     * Ein Bild der Bewegung: neu messen, ein Stueck auf den Sollwert zulaufen,
     * zeichnen. Solange noch ein Rest offen ist, meldet sich die Schleife
     * selbst zum naechsten Bild an - die Figur laeuft also auch dann noch
     * weiter, wenn der Finger vom Rad schon wieder weg ist.
     */
    const tick = () => {
      frame = 0;
      const target = measure();

      if (current < 0) {
        // Erster Blick - etwa beim Laden mitten auf der Seite. Kein Nachlauf,
        // sonst huepft die Figur ohne Anlass durchs Bild.
        current = target;
      } else {
        current += (target - current) * REVEAL_DAMPING;
      }

      if (Math.abs(target - current) < 0.0004) current = target;
      else frame = window.requestAnimationFrame(tick);

      render(current);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
      tick();
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
      // Nicht nur zeichnen, auch den Nachlauf mitziehen: Wechselt die Breite
      // spaeter zurueck, startet er vom Endzustand statt vom alten Wert.
      current = 1;
      write(1, 0, 0, 0);
    };

    // Der Scrollhandler laeuft nur, solange die Sektion wirklich im Bild ist.
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { rootMargin: "160px 0px" },
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
    // Der Effekt liest nur das DOM, nicht die Figur selbst - er haengt an
    // nichts, was sich beim Auf- und Zuklappen der Fragen aendert.
  }, []);

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
        <div className="device-faq__headline">
          <AnimatedSectionTitle id={headingId} parts={[{ text: heading }]} />
          {/* Die Huelle traegt den waagerechten Weg und den Schatten, der am
              Boden bleibt; das Bild darin huepft, neigt und staucht sich. */}
          <span className="device-faq__mascot" aria-hidden="true">
            <Image
              src={mascot.src}
              alt={mascot.alt ?? ""}
              width={1254}
              height={1254}
              sizes="160px"
            />
          </span>
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
