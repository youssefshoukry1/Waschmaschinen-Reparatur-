"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { business } from "@/lib/business";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const easeInOutCubic = (value: number) =>
  value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;

export default function ScrollMovement() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    if (!section || !image) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let targetProgress = 0;
    let renderedProgress = 0;

    const measureTarget = () => {
      const sectionRect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const triggerLine = viewportHeight * 0.65;
      const motionRange = triggerLine + sectionRect.height * 0.5;
      const scrollProgress = clamp(
        (triggerLine - sectionRect.top) / motionRange,
        0,
        1,
      );

      // Hold for the first and last 15% of the section's scroll range.
      const activeProgress = clamp((scrollProgress - 0.15) / 0.7, 0, 1);
      targetProgress = easeInOutCubic(activeProgress);
    };

    const render = () => {
      if (reducedMotion.matches) {
        targetProgress = 0;
        renderedProgress = 0;
        image.style.transform = "translate3d(0, 0, 0)";
        section.style.setProperty("--reveal-position", "110%");
        section.style.setProperty("--movement-text-opacity", "1");
        section.style.setProperty("--fog-opacity", "0");
        frame = 0;
        return;
      } else {
        renderedProgress += (targetProgress - renderedProgress) * 0.09;
        if (Math.abs(targetProgress - renderedProgress) < 0.0005) {
          renderedProgress = targetProgress;
        }

        const imageWidth = image.getBoundingClientRect().width;
        const travel = Math.max(section.clientWidth - imageWidth, 0);
        const x = renderedProgress * travel;
        const y = -Math.sin(renderedProgress * Math.PI) * 18;
        const rotation = -2 + renderedProgress * 4;
        const scale = 0.96 + renderedProgress * 0.04;
        image.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rotation}deg) scale(${scale})`;

        const revealPosition = renderedProgress * 118 - 8;
        const fadeOut = clamp((renderedProgress - 0.88) / 0.12, 0, 1);
        section.style.setProperty("--reveal-position", `${revealPosition}%`);
        section.style.setProperty("--movement-text-opacity", `${1 - fadeOut}`);
        section.style.setProperty("--fog-opacity", `${1 - renderedProgress * 0.45}`);
      }

      if (renderedProgress !== targetProgress) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const requestUpdate = () => {
      measureTarget();
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(requestUpdate);
    resizeObserver.observe(section);
    resizeObserver.observe(image);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);
    requestUpdate();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="scroll-movement" id="movement" ref={sectionRef} aria-label="Über uns">
      <div className="scroll-movement__track">
        <div className="scroll-movement__message">
          <p>Über uns – seit {business.foundedYear} in Berlin</p>
          <h2>Über {business.experienceYears} Jahre Erfahrung mit Haushaltsgeräten.</h2>
        </div>
        <div className="scroll-movement__fog" aria-hidden="true" />
        <div className="scroll-movement__figure" ref={imageRef} aria-hidden="true">
          <Image
            src="/images/movment.png"
            alt=""
            fill
            sizes="(max-width: 575px) 260px, (max-width: 991px) 360px, 500px"
          />
        </div>
      </div>
    </section>
  );
}
