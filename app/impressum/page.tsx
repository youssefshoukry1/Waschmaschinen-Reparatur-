import type { Metadata } from "next";
import { business } from "@/lib/business";
import styles from "../legal.module.css";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum von ${business.name} in ${business.address.addressLocality}.`,
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <><Navbar variant="dark" /><main className={styles.page}>
      <article className={styles.content}>
        <p className={styles.eyebrow}>Rechtliche Informationen</p>
        <h1>Impressum</h1>
        <p className={styles.intro}>Angaben gemäß § 5 DDG</p>

        <section>
          <h2>Anbieter</h2>
          <address>
            <strong>{business.legalName}</strong><br />
            {business.address.streetAddress}<br />
            {business.address.postalCode} {business.address.addressLocality}
          </address>
          {business.registry ? (
            <p>
              Registergericht: {business.registry.court}<br />
              Registernummer: {business.registry.number}
            </p>
          ) : null}
        </section>

        <section>
          <h2>Kontakt</h2>
          <p>
            Telefon: <a href={`tel:${business.telephone}`}>{business.telephoneDisplay}</a><br />
            E-Mail: <a href={`mailto:${business.email}`}>{business.email}</a>
          </p>
        </section>

        <section>
          <h2>Verantwortlich für den Inhalt</h2>
          <p>{business.owner}, Anschrift wie oben.</p>
        </section>

        <section>
          <h2>Umsatzsteuer</h2>
          <p>
            {business.vatId
              ? <>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: {business.vatId}</>
              : <>Steuernummer: {business.taxNumber}</>}
          </p>
        </section>

        <section>
          <h2>Aufsichtsbehörde und Kammerzugehörigkeit</h2>
          <p>
            Zuständige Kammer: {business.chamber.name}<br />
            Betriebsnummer: {business.chamber.memberNumber}
          </p>
          <p>
            Berufsbezeichnung: Elektrotechniker / Elektroniker für Geräte und Systeme (verliehen in der
            Bundesrepublik Deutschland). Es gelten die Handwerksordnung (HwO) sowie die
            Berufsordnung der {business.chamber.name}.
          </p>
        </section>

        <section>
          <h2>Streitbeilegung</h2>
          <p>Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </section>
      </article>
    </main><SiteFooter /></>
  );
}
