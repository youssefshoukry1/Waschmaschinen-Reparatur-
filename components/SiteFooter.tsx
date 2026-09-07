import Image from "next/image";
import Link from "next/link";
import { AnimatedSectionTitle } from "@/components/HeroTitle";
import { MapConsentResetLink } from "@/components/MapConsent";

import { business } from "@/lib/business";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Image className="footer-shape footer-shape--left" src="/images/qlinest/vector-4.svg" alt="" width={320} height={405} />
      <Image className="footer-shape footer-shape--right" src="/images/qlinest/vector-5.svg" alt="" width={320} height={405} />
      <div className="footer-container">
        <section className="footer-cta" aria-labelledby="footer-cta-heading">
          <div><p>Unverbindlich &amp; zum Festpreis</p><AnimatedSectionTitle id="footer-cta-heading" parts={[{ text: "Wann dürfen wir Ihr Gerät reparieren?" }]} /></div>
          <Link className="split-hover-cta" href="/#contact"><span>Termin vereinbaren <span aria-hidden="true">↗</span></span></Link>
        </section>
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/#home" aria-label={`${business.name} – zur Startseite`}><Image src="/images/logo.png" alt="" width={76} height={76} /><span className="footer-wordmark">ALE<span className="footer-wordmark-x">X</span></span></Link>
            <p>Waschmaschinen- und Haushaltsgeräte-Reparatur in ganz Berlin – direkt bei Ihnen vor Ort.</p>
            <span className="footer-trust">Mitgliedsbetrieb der {business.chamber.name}</span>
          </div>
          <nav className="footer-links" aria-label="Navigation im Fußbereich">
            <p>Entdecken</p><Link href="/#home">Startseite</Link><Link href="/#services">Leistungen</Link><Link href="/#einsatzgebiet">Bezirke</Link><Link href="/#faq">Häufige Fragen</Link>
          </nav>
          <address className="footer-contact">
            <p>Kontakt</p><span>{business.address.streetAddress}<br />{business.address.postalCode} {business.address.addressLocality}</span><a href={`tel:${business.telephone}`}>{business.telephoneDisplay}</a><a href={`mailto:${business.email}`}>{business.email}</a><a href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer">Nachricht über WhatsApp</a><span>Inhaber: {business.owner}</span>
          </address>
        </div>
        <div className="footer-bottom"><p>© {business.foundedYear}–2026 {business.name}</p><nav aria-label="Rechtliche Informationen"><Link href="/agb">AGB</Link><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link><MapConsentResetLink /></nav></div>
      </div>
    </footer>
  );
}
