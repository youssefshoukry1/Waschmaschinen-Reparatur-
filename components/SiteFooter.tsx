import Image from "next/image";
import Link from "next/link";
import { AnimatedSectionTitle } from "@/components/HeroTitle";
import { MapConsentResetLink } from "@/components/MapConsent";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <Image className="footer-shape footer-shape--left" src="/images/qlinest/vector-4.svg" alt="" width={320} height={405} />
      <Image className="footer-shape footer-shape--right" src="/images/qlinest/vector-5.svg" alt="" width={320} height={405} />
      <div className="footer-container">
        <section className="footer-cta" aria-labelledby="footer-cta-heading">
          <div><p>Unverbindlich &amp; persönlich</p><AnimatedSectionTitle id="footer-cta-heading" parts={[{ text: "Wie können wir Ihren Alltag leichter machen?" }]} /></div>
          <Link className="split-hover-cta" href="/#contact"><span>Erstgespräch vereinbaren <span aria-hidden="true">↗</span></span></Link>
        </section>
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/#home" aria-label="Helfer im Alltag – zur Startseite"><Image src="/images/logo-white.png" alt="" width={76} height={76} /><span>Helfer im Alltag</span></Link>
            <p>Haushaltshilfe rund um Bernau – Fenster- und Glasreinigung in Berlin und Brandenburg.</p>
            <span className="footer-trust">Anerkannter Anbieter nach § 45a SGB XI</span>
          </div>
          <nav className="footer-links" aria-label="Navigation im Fußbereich">
            <p>Entdecken</p><Link href="/#home">Startseite</Link><Link href="/#unternehmen">Über uns</Link><Link href="/#services">Leistungen</Link><Link href="/#preise">Preise</Link><Link href="/#faq">Häufige Fragen</Link>
          </nav>
          <address className="footer-contact">
            <p>Kontakt</p><span>Schönfelder Weg 71<br />16321 Bernau bei Berlin</span><a href="tel:+4917646687719">0176 46687719</a><a href="mailto:helferimalltag1@gmail.com">helferimalltag1@gmail.com</a><a href="https://wa.me/4917646687719" target="_blank" rel="noopener noreferrer">Nachricht über WhatsApp</a><span>Inhaber: Markus Wilken</span>
          </address>
        </div>
        <div className="footer-bottom"><p>© 2026 Helfer im Alltag</p><nav aria-label="Rechtliche Informationen"><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link><MapConsentResetLink /></nav></div>
      </div>
    </footer>
  );
}
