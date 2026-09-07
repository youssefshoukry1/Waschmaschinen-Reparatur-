"use client";

import { useEffect, useRef, type CSSProperties } from "react";

import { brandLogos, type BrandLogo } from "@/lib/business";

/** Pixel pro Sekunde, mit denen die Schleife von allein weiterläuft. */
const AUTO_SPEED = 40;
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

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let last = 0;
    let visible = false;
    let offset = 0;
    let loopWidth = 0;

    // Include the gap between copies so the loop joins seamlessly.
    const measure = () => {
      const first = track.children[0] as HTMLElement | undefined;
      const duplicate = track.children[brandLogos.length] as HTMLElement | undefined;
      loopWidth = first && duplicate ? duplicate.offsetLeft - first.offsetLeft : 0;
    };
    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);

    // Only elapsed time controls movement; user input cannot move or pause it.
    const step = (now: number) => {
      const delta = last ? Math.min(now - last, 100) : 0;
      last = now;

      if (loopWidth > 0) {
        offset = (offset + (AUTO_SPEED * delta) / 1000) % loopWidth;
        track.style.transform = `translate3d(${-offset}px, 0, 0)`;
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
      resizeObserver.disconnect();
      track.style.transform = "";
    };
  }, []);

  return (
    <div className="brand-marquee">
      <div
        ref={viewportRef}
        className="brand-marquee__viewport"
        role="region"
        aria-label="Marken, die wir reparieren"
      >
        <ul ref={trackRef} className="brand-marquee__track">
          {brandLogos.map((logo) => <LogoItem key={logo.name} logo={logo} duplicate={false} />)}
          {brandLogos.map((logo) => <LogoItem key={`clone-${logo.name}`} logo={logo} duplicate />)}
        </ul>
      </div>
    </div>
  );
}
