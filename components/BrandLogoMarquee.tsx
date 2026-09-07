"use client";

import { useCallback, useEffect, useRef, type CSSProperties, type PointerEvent as ReactPointerEvent } from "react";

import { brandLogos, type BrandLogo } from "@/lib/business";

/** Pixel pro Sekunde, mit denen die Schleife von allein weiterläuft. */
const AUTO_SPEED = 40;
/** Ruhephase nach der letzten Eingabe, bevor die Automatik weiterläuft. */
const RESUME_DELAY = 1200;
/** Feintuning einzelner Logos, die optisch aus der Reihe fallen. */
const LOGO_SCALE: Record<string, number> = { Miele: .82, Beko: 1.1, LG: 1.05 };

function LogoItem({ logo, duplicate }: { logo: BrandLogo; duplicate: boolean }) {
  const scale = LOGO_SCALE[logo.name];

  return (
    <li
      className="brand-marquee__item"
      style={scale ? ({ "--logo-scale": scale } as CSSProperties) : undefined}
      aria-hidden={duplicate || undefined}
    >
      {logo.src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo.src}
          alt={duplicate ? "" : logo.name}
          width={logo.width}
          height={logo.height}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      ) : (
        <span className="brand-marquee__wordmark">{logo.name}</span>
      )}
    </li>
  );
}

export default function BrandLogoMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  /** Breite einer Listenkopie – der Punkt, an dem nahtlos zurückgesprungen wird. */
  const halfWidthRef = useRef(0);
  /** Dauerhafte Pause beim Ziehen und bei Tastaturfokus – Hovern läuft weiter. */
  const heldRef = useRef(false);
  /** Kurze Pause nach Scrollen, Wischen oder Ziehen. */
  const idleRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Hält scrollLeft im Bereich [0, halfWidth) – die zweite Kopie ist identisch. */
  const wrap = useCallback(() => {
    const viewport = viewportRef.current;
    const half = halfWidthRef.current;
    if (!viewport || half <= 0) return;

    if (viewport.scrollLeft >= half) viewport.scrollLeft -= half;
    else if (viewport.scrollLeft <= 0) viewport.scrollLeft += half;
  }, []);

  /** Pausiert nach einer Eingabe und startet nach einer Ruhephase wieder. */
  const nudge = useCallback(() => {
    idleRef.current = true;
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => { idleRef.current = false; }, RESUME_DELAY);
  }, []);

  const hold = useCallback(() => { heldRef.current = true; }, []);
  const release = useCallback(() => { heldRef.current = false; nudge(); }, [nudge]);

  // Breite der ersten Kopie messen – ändert sich mit Viewport und Schriftladung.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => { halfWidthRef.current = track.scrollWidth / 2; };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  // Automatischer Lauf: nur sichtbar, nicht pausiert und ohne "reduce motion".
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last = 0;
    let visible = false;

    const step = (now: number) => {
      const delta = last ? Math.min(now - last, 100) : 0;
      last = now;

      if (!heldRef.current && !idleRef.current && halfWidthRef.current > 0) {
        viewport.scrollLeft += (AUTO_SPEED * delta) / 1000;
        wrap();
      }

      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === visible) return;
      visible = entry.isIntersecting;

      if (visible) {
        last = 0;
        frame = requestAnimationFrame(step);
      } else {
        cancelAnimationFrame(frame);
      }
    });
    observer.observe(viewport);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [wrap]);

  useEffect(() => () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  }, []);

  // Ziehen mit der Maus: der Zeiger verschiebt scrollLeft direkt.
  const handlePointerDown = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
    hold();
  }, [hold]);

  const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;
    if (!viewport.hasPointerCapture(event.pointerId)) return;

    viewport.scrollLeft -= event.movementX;
    wrap();
  }, [wrap]);

  const endDrag = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = event.currentTarget;
    if (!viewport.hasPointerCapture(event.pointerId)) return;

    viewport.releasePointerCapture(event.pointerId);
    viewport.classList.remove("is-dragging");
    release();
  }, [release]);

  return (
    <div className="brand-marquee">
      <div
        ref={viewportRef}
        className="brand-marquee__viewport"
        role="region"
        aria-label="Marken, die wir reparieren"
        tabIndex={0}
        onFocus={hold}
        onBlur={release}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onScroll={wrap}
        onWheel={nudge}
        onTouchStart={nudge}
        onTouchMove={nudge}
      >
        <ul ref={trackRef} className="brand-marquee__track">
          {brandLogos.map((logo) => <LogoItem key={logo.name} logo={logo} duplicate={false} />)}
          {brandLogos.map((logo) => <LogoItem key={`clone-${logo.name}`} logo={logo} duplicate />)}
        </ul>
      </div>
    </div>
  );
}
