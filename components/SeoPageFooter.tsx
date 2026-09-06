import Link from "next/link";

import { business } from "@/lib/business";

export default function SeoPageFooter() {
  return (
    <footer className="seo-page-footer">
      <div>
        <strong>{business.name}</strong>
        <p>Waschmaschinen- und Haushaltsgeräte-Reparatur in ganz Berlin – direkt bei Ihnen vor Ort.</p>
      </div>
      <address>
        {business.address.streetAddress}<br />
        {business.address.postalCode} {business.address.addressLocality}<br />
        <a href={`tel:${business.telephone}`}>{business.telephoneDisplay}</a><br />
        <a href={`mailto:${business.email}`}>{business.email}</a>
      </address>
      <nav aria-label="Weiterführende Informationen">
        <Link href="/">Startseite</Link>
        <Link href="/waschmaschinen-reparatur-berlin">Waschmaschinen Reparatur</Link>
        <Link href="/einsatzgebiet-berlin">Einsatzgebiet</Link>
        <Link href="/agb">AGB</Link>
      </nav>
    </footer>
  );
}
