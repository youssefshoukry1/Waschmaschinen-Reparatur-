import type { Metadata } from "next";
import { business } from "@/lib/business";
import styles from "../legal.module.css";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Helfer im Alltag in Bernau bei Berlin.",
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
        </section>

        <section>
          <h2>Kontakt</h2>
          <p>
            Telefon: <a href={`tel:${business.telephone}`}>0176 46687719</a><br />
            E-Mail: <a href={`mailto:${business.email}`}>{business.email}</a>
          </p>
        </section>

        <section>
          <h2>Verantwortlich für den Inhalt</h2>
          <p>Markus Wilken, Anschrift wie oben.</p>
        </section>

        <section>
          <h2>Anerkennung als Angebot zur Unterstützung im Alltag</h2>
          <p>
            WohlDaheim ist als Angebot zur Unterstützung im Alltag gemäß § 45a SGB XI anerkannt.
          </p>
          <h3>Zuständige Anerkennungsbehörde</h3>
          <address>
            Magistrat der Stadt Offenbach am Main
          </address>
        </section>

        <section>
          <h2>Streitbeilegung</h2>
          <p>Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </section>
      </article>
    </main><SiteFooter /></>
  );
}
