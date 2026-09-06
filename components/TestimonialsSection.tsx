import { Star } from "lucide-react";

import { getPublishedReviews } from "@/sanity-reference/lib/reviews";
import type { WebsiteTrustSettings } from "@/sanity-reference/lib/trustSettings";
import TestimonialsRail from "./TestimonialsRail";
import { AnimatedSectionTitle } from "./HeroTitle";

type TestimonialsSectionProps = {
  trustSettings: WebsiteTrustSettings;
};

export default async function TestimonialsSection({
  trustSettings,
}: TestimonialsSectionProps) {
  const reviews = await getPublishedReviews();

  if (reviews.length === 0) {
    return null;
  }

  return (
    <section
      className="testimonial-section"
      id="bewertungen"
      aria-labelledby="testimonials-heading"
    >
      <div className="testimonial-section__inner">
        <header className="testimonial-section__heading">
          <div>
            <p>Erfahrungen unserer Kunden</p>
            <AnimatedSectionTitle id="testimonials-heading" parts={[{ text: "Vertrauen, das " }, { text: "im Alltag", emphasized: true }, { text: " spürbar wird." }]} />
            {trustSettings.showRating ? (
              <span className="testimonial-section__trust-badge">
                <Star aria-hidden="true" fill="currentColor" />
                <strong>
                  {new Intl.NumberFormat("de-DE", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  }).format(trustSettings.ratingValue)}
                </strong>
                <span>{trustSettings.ratingLabel}</span>
              </span>
            ) : null}
          </div>
        </header>

        <TestimonialsRail reviews={reviews} />

        <a className="testimonial-section__cta split-hover-cta" href="#contact">
          <span>Unverbindlich anfragen <span aria-hidden="true">↗</span></span>
        </a>
      </div>
    </section>
  );
}
