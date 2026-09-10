import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";

import ContactForm from "@/components/ContactForm";
import { AnimatedSectionTitle } from "@/components/HeroTitle";
import { business } from "@/lib/business";

/**
 * Roter Kontakt-Block: Formular links, Mitarbeiterin plus Kontaktkarte rechts.
 * Wird auf allen Seiten mit eigener Ueberschrift-ID eingebunden.
 */
export default function ContactSection({ headingId = "contact-heading" }: { headingId?: string }) {
  return (
    <section className="contact-callback" id="contact" aria-labelledby={headingId}>
      <div className="contact-callback__card">
        <div className="contact-callback__body">
          <p className="contact-callback__badge">Kontakt</p>
          <AnimatedSectionTitle id={headingId} parts={[{ text: "Wir helfen Ihnen gern." }]} />
          <p className="contact-callback__lead">
            Beschreiben Sie kurz Ihr Anliegen – wir melden uns bei Ihnen.
          </p>

          <ContactForm variant="callback" />
        </div>

        <div className="contact-callback__aside">
          <Image
            className="contact-callback__agent"
            src="/images/img20.png"
            alt="Mitarbeiterin im Kundenservice mit Headset"
            width={1250}
            height={1250}
            sizes="(max-width: 1024px) 60vw, 420px"
          />

          <ul className="contact-callback__info">
            <li>
              <span className="contact-callback__info-icon" aria-hidden="true"><MapPin /></span>
              <div>
                <strong>{business.address.streetAddress}</strong>
                <span>{business.address.postalCode} {business.address.addressLocality}</span>
              </div>
            </li>
            <li>
              <span className="contact-callback__info-icon" aria-hidden="true"><Phone /></span>
              <div>
                <span>Sie erreichen uns unter</span>
                <a href={`tel:${business.telephone}`}>{business.telephoneDisplay}</a>
              </div>
            </li>
            <li>
              <span className="contact-callback__info-icon" aria-hidden="true"><Mail /></span>
              <div>
                <a href={`mailto:${business.email}`}>{business.email}</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
