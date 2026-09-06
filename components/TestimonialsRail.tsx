"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, MoveHorizontal, Star } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";

import type { WebsiteReview } from "@/sanity-reference/lib/reviews";

type TestimonialsRailProps = {
  reviews: WebsiteReview[];
};

function Rating({ value }: { value: WebsiteReview["rating"] }) {
  return (
    <span className="testimonial-card__rating" aria-label={`${value} von 5 Sternen`}>
      <span className="sr-only">{value} von 5 Sternen</span>
      {Array.from({ length: 5 }, (_, index) => (
        <Star key={index} aria-hidden="true" fill="currentColor" />
      ))}
    </span>
  );
}

export default function TestimonialsRail({ reviews }: TestimonialsRailProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const [canScrollBack, setCanScrollBack] = useState(false);
  const [canScrollForward, setCanScrollForward] = useState(false);

  const updateControls = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;

    const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
    setCanScrollBack(rail.scrollLeft > 1);
    setCanScrollForward(rail.scrollLeft < maxScrollLeft - 1);
  }, []);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    updateControls();
    const observer = new ResizeObserver(updateControls);
    observer.observe(rail);
    rail.addEventListener("scroll", updateControls, { passive: true });

    return () => {
      observer.disconnect();
      rail.removeEventListener("scroll", updateControls);
    };
  }, [reviews.length, updateControls]);

  const scrollRail = (direction: -1 | 1) => {
    const rail = railRef.current;
    if (!rail) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollBy({
      left: direction * Math.max(rail.clientWidth * 0.82, 280),
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollRail(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollRail(1);
    }
    if (event.key === "Home") {
      event.preventDefault();
      railRef.current?.scrollTo({ left: 0, behavior: "auto" });
    }
    if (event.key === "End") {
      event.preventDefault();
      const rail = railRef.current;
      if (rail) rail.scrollTo({ left: rail.scrollWidth, behavior: "auto" });
    }
  };

  return (
    <div className="testimonial-rail">
      <div className="testimonial-rail__toolbar">
        <div className="testimonial-rail__controls" aria-label="Kundenstimmen steuern">
          <button
            type="button"
            className="testimonial-rail__button"
            onClick={() => scrollRail(-1)}
            disabled={!canScrollBack}
            aria-label="Vorherige Kundenstimmen"
          >
            <ChevronLeft aria-hidden="true" />
          </button>
          <button
            type="button"
            className="testimonial-rail__button"
            onClick={() => scrollRail(1)}
            disabled={!canScrollForward}
            aria-label="Weitere Kundenstimmen"
          >
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        className="testimonial-rail__viewport"
        role="region"
        aria-label="Kundenstimmen"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="testimonial-rail__track">
          {reviews.map((review) => (
            <article className="testimonial-card" key={review.id}>
              <Rating value={review.rating} />
              <span className="testimonial-card__quote-mark" aria-hidden="true">“</span>
              <blockquote className="testimonial-card__quote">{review.content}</blockquote>
              <footer className="testimonial-card__author">
                {review.avatar ? (
                  <Image
                    className="testimonial-card__avatar"
                    src={review.avatar.src}
                    alt={review.avatar.alt}
                    width={48}
                    height={48}
                  />
                ) : (
                  <span className="testimonial-card__avatar testimonial-card__avatar--fallback" aria-hidden="true">
                    {review.reviewerName.slice(0, 1).toLocaleUpperCase("de-DE")}
                  </span>
                )}
                <span>
                  <strong>{review.reviewerName}</strong>
                  <small>Kundenstimme</small>
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>

      <p className="testimonial-rail__hint">
        <MoveHorizontal aria-hidden="true" /> Wischen, um weitere Stimmen zu lesen
      </p>
    </div>
  );
}
