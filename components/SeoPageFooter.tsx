import Link from "next/link";

import { business } from "@/lib/business";

export default function SeoPageFooter() {
  return (
    <footer className="seo-page-footer">
      <div>
        <strong>{business.name}</strong>
        <p>Haushaltshilfe rund um Bernau – Fenster- und Glasreinigung in Berlin und Brandenburg.</p>
      </div>
      <address>
        {business.address.streetAddress}<br />
        {business.address.postalCode} {business.address.addressLocality}<br />
        <a href={`tel:${business.telephone}`}>0176 46687719</a><br />
        <a href={`mailto:${business.email}`}>{business.email}</a>
      </address>
      <nav aria-label="Weiterführende Informationen">
        <Link href="/">Startseite</Link>
        <Link href="/haushaltshilfe-45a-barnim">Haushaltshilfe nach § 45a</Link>
        <Link href="/einsatzgebiet-barnim">Einsatzgebiet</Link>
      </nav>
    </footer>
  );
}
