"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Muss mit `top` der Sticky-Karte in globals.css uebereinstimmen
 * (@media (max-width: 991px) -> .faq-section--guides .faq-section__aside).
 */
const STICKY_TOP = 84;

/**
 * Meldet, ob die Intro-Karte einer Anleitungs-/FAQ-Sektion gerade am oberen
 * Rand klebt. Beobachtet wird nicht die Karte selbst, sondern ein 1px hoher
 * Marker direkt darueber: sobald dieser ueber die Sticky-Linie gescrollt ist,
 * steht die Karte fest und darf auf die schmale Leiste zusammenschrumpfen.
 *
 * Der Observer laeuft auf allen Breiten – die Klasse `is-stuck` wird aber nur
 * innerhalb der Mobile-Media-Query ausgewertet, Desktop bleibt unveraendert.
 */
export default function useStuckAside() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [isStuck, setIsStuck] = useState(false);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStuck(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { rootMargin: `-${STICKY_TOP}px 0px 0px 0px`, threshold: 0 },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return { sentinelRef, isStuck };
}
