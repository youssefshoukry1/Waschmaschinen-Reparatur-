"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const leadingText = "Waschmaschinen Reparatur in Berlin ";
const highlightedText = "Direkt bei Ihnen vor Ort";
export type TitlePart = { text: string; emphasized?: boolean; desktopBreakAfter?: boolean };

export function AnimatedCharacters({ text, emphasized = false, startIndex = 0 }: { text: string; emphasized?: boolean; startIndex?: number }) {
  const segments = (text.match(/\S+|\s+/g) ?? []).map((segment, segmentIndex, allSegments) => ({
    segment,
    segmentIndex,
    characterOffset: allSegments.slice(0, segmentIndex).join("").length,
  }));

  return (
    <span className={emphasized ? "hero-title__emphasis" : "hero-title__text"} aria-hidden="true">
      {segments.map(({ segment, segmentIndex, characterOffset }) => {
        if (/^\s+$/.test(segment)) {
          // Ein echtes, umbruchfaehiges Leerzeichen statt einer festen em-Breite:
          // am Zeilenende faellt es weg, statt die Folgezeile einzuruecken.
          return <span className="hero-title__space" key={`space-${segmentIndex}`}> </span>;
        }

        return (
          <span className="hero-title__word" key={`${segment}-${segmentIndex}`}>
            {Array.from(segment).map((character, index) => (
              <span className="hero-title__character" style={{ "--character-index": startIndex + characterOffset + index } as CSSProperties} key={`${character}-${index}`}>
                {character}
              </span>
            ))}
          </span>
        );
      })}
    </span>
  );
}

export default function HeroTitle() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const title = titleRef.current;
    if (!title || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(title);
    return () => observer.disconnect();
  }, []);

  return (
    <h1 id="hero-heading" className={isVisible ? "hero-title hero-title--hero hero-title--visible" : "hero-title hero-title--hero"} ref={titleRef}>
      <span className="sr-only">{leadingText}{highlightedText}</span>
      <AnimatedCharacters text={leadingText} />
      <br className="hero-title__desktop-break" aria-hidden="true" />
      <AnimatedCharacters text={highlightedText} emphasized startIndex={leadingText.length} />
    </h1>
  );
}

export function AnimatedSectionTitle({ id, parts }: { id: string; parts: TitlePart[] }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const title = titleRef.current;
    if (!title || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealWhenApproachingViewport = () => {
      const { top, bottom } = title.getBoundingClientRect();
      if (top <= window.innerHeight * 0.9 && bottom >= 0) {
        setIsVisible(true);
        title.classList.add("hero-title--visible");
        window.removeEventListener("scroll", revealWhenApproachingViewport);
        window.removeEventListener("resize", revealWhenApproachingViewport);
      }
    };

    revealWhenApproachingViewport();
    window.addEventListener("scroll", revealWhenApproachingViewport, { passive: true });
    window.addEventListener("resize", revealWhenApproachingViewport);
    return () => {
      window.removeEventListener("scroll", revealWhenApproachingViewport);
      window.removeEventListener("resize", revealWhenApproachingViewport);
    };
  }, []);

  return (
    <h2 id={id} className={isVisible ? "hero-title hero-title--visible animated-section-title" : "hero-title animated-section-title"} ref={titleRef}>
      <span className="sr-only">{parts.map((part) => part.text).join("")}</span>
      {parts.map((part, index) => {
        const startIndex = parts.slice(0, index).reduce((total, previousPart) => total + previousPart.text.length, 0);
        return (
          <span key={`${part.text}-${index}`}>
            <AnimatedCharacters text={part.text} emphasized={part.emphasized} startIndex={startIndex} />
            {part.desktopBreakAfter ? <br className="hero-title__desktop-break" aria-hidden="true" /> : null}
          </span>
        );
      })}
    </h2>
  );
}

export function AnimatedSectionEyebrow({ text }: { text: string }) {
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const eyebrow = eyebrowRef.current;
    if (!eyebrow || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const revealWhenApproachingViewport = () => {
      const { top, bottom } = eyebrow.getBoundingClientRect();
      if (top <= window.innerHeight * 0.9 && bottom >= 0) {
        setIsVisible(true);
        eyebrow.classList.add("hero-title--visible");
        window.removeEventListener("scroll", revealWhenApproachingViewport);
        window.removeEventListener("resize", revealWhenApproachingViewport);
      }
    };

    revealWhenApproachingViewport();
    window.addEventListener("scroll", revealWhenApproachingViewport, { passive: true });
    window.addEventListener("resize", revealWhenApproachingViewport);
    return () => {
      window.removeEventListener("scroll", revealWhenApproachingViewport);
      window.removeEventListener("resize", revealWhenApproachingViewport);
    };
  }, []);

  return (
    <p className={isVisible ? "defects-section__eyebrow hero-title hero-title--visible" : "defects-section__eyebrow hero-title"} ref={eyebrowRef}>
      <span aria-hidden="true">✓</span>
      <span className="sr-only">{text}</span>
      <AnimatedCharacters text={text} />
    </p>
  );
}
