"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { AnimatedSectionTitle } from "./HeroTitle";

/** Das Maskottchen, das die Ueberschrift beim Scrollen freigibt. */
export type FaqMascot = {
  src: string;
  /** Leer lassen: Die Figur ist reine Dekoration, die H2 benennt die Sektion. */
  alt?: string;
};

/**
 * Die sitzende Figur mit Frage- und Ausrufezeichen. Sie passt auf jede
 * Geraete- und Anleitungsseite, deshalb steht sie hier einmal statt in jeder
 * Sektion erneut. Wer eine andere Figur braucht, reicht `mascot` durch.
 */
export const DEFAULT_FAQ_MASCOT: FaqMascot = {
  src: "/images/img18.png",
  // Reine Dekoration: Die Ueberschrift daneben sagt bereits alles.
  alt: "",
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
 * Bindet die Enthuellung an den Scrollstand der Sektion und gibt die Referenz
 * zurueck, die an deren Wurzelelement gehoert.
 *
 * Der Effekt laeuft komplett ueber vier CSS-Variablen, die der Scrollhandler
 * fortschreibt - React rendert dabei kein einziges Mal neu.
 */
export function useFaqMascotReveal<T extends HTMLElement>() {
  const sectionRef = useRef<T>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Die Figur laeuft auf jeder Breite mit - nur ihre Masse aendern sich, und
    // die stehen komplett im CSS. Wer weniger Bewegung wuenscht, bekommt direkt
    // den Endzustand.
    const skip = window.matchMedia("(prefers-reduced-motion: reduce)");

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
      // Nicht nur zeichnen, auch den Nachlauf mitziehen: Schaltet der Nutzer
      // die Bewegung spaeter wieder frei, startet sie vom Endzustand statt vom
      // alten Wert.
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
    // nichts, was sich innerhalb der Sektion aendert.
  }, []);

  return sectionRef;
}

type Props = {
  /** Die id der H2, auf die das `aria-labelledby` der Sektion zeigt. */
  headingId: string;
  heading: string;
  /** Ueberschreibt die Standardfigur - sonst laeuft ueberall dieselbe. */
  mascot?: FaqMascot;
};

/**
 * Die Zeile der Ueberschrift samt Buehne fuer die Figur.
 *
 * Die Figur startet links auf der Zeile der H2 und deckt sie dabei ab. Beim
 * Weiterscrollen huepft sie in zwei Saetzen nach rechts und zieht die
 * Ueberschrift hinter sich her ans Licht, bis am Zeilenende beide nebeneinander
 * stehen. Vorspann und Liste darunter bleiben unberuehrt.
 */
export default function FaqMascotHeadline({
  headingId,
  heading,
  mascot = DEFAULT_FAQ_MASCOT,
}: Props) {
  return (
    <div className="device-faq__headline">
      <AnimatedSectionTitle id={headingId} parts={[{ text: heading }]} />
      {/* Die Huelle traegt den waagerechten Weg und den Schatten, der am
          Boden bleibt; das Bild darin huepft, neigt und staucht sich. */}
      <span className="device-faq__mascot" aria-hidden="true">
        {/* Die Stufen entsprechen --faq-mascot-size im CSS. */}
        <Image
          src={mascot.src}
          alt={mascot.alt ?? ""}
          width={1254}
          height={1254}
          sizes="(max-width: 575px) 88px, (max-width: 1024px) 124px, 160px"
        />
      </span>
    </div>
  );
}
