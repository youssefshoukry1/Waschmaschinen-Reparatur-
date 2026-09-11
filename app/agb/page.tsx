import type { Metadata } from "next";
import { business } from "@/lib/business";
import styles from "../legal.module.css";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "AGB",
  description: `Allgemeine Geschäftsbedingungen von ${business.name} für Reparaturleistungen an Haushaltsgeräten in Berlin.`,
  alternates: { canonical: "/agb" },
};

export default function AgbPage() {
  return (
    <><Navbar /><main className={styles.page}>
      <article className={styles.content}>
        <p className={styles.eyebrow}>Rechtliche Informationen</p>
        <h1>Allgemeine Geschäftsbedingungen</h1>
        <p className={styles.intro}>Stand: 6. September 2026</p>

        <section>
          <h2>1. Geltungsbereich</h2>
          <p>Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge über Reparatur-, Wartungs- und Verkaufsleistungen zwischen {business.legalName} (nachfolgend „Auftragnehmer“) und dem Auftraggeber. Abweichende Bedingungen des Auftraggebers werden nur wirksam, wenn der Auftragnehmer ihnen ausdrücklich in Textform zustimmt.</p>
        </section>

        <section>
          <h2>2. Vertragsschluss</h2>
          <p>Der Vertrag kommt durch die Beauftragung des Auftraggebers – telefonisch, per E-Mail, über WhatsApp oder über das Anfrageformular – und die Auftragsannahme durch den Auftragnehmer zustande.</p>
        </section>

        <section>
          <h2>3. Anfahrt und Kostenvoranschlag</h2>
          <p>Für Anfahrt und Erstellung des Kostenvoranschlags berechnet der Auftragnehmer eine Pauschale inklusive Umsatzsteuer, deren Höhe vor dem Termin mitgeteilt wird. Erteilt der Auftraggeber im Anschluss den Reparaturauftrag, wird diese Pauschale auf den vereinbarten Festpreis angerechnet.</p>
          <p>Lehnt der Auftraggeber die Reparatur nach der Diagnose ab, bleibt die Pauschale zur Zahlung fällig. Weitere Kosten entstehen in diesem Fall nicht.</p>
        </section>

        <section>
          <h2>4. Preise und Zahlung</h2>
          <p>Der Auftragnehmer nennt vor Beginn der Reparatur einen verbindlichen Festpreis aus Arbeitsleistung und Ersatzteil. Alle Preise verstehen sich inklusive der gesetzlichen Umsatzsteuer.</p>
          <p>Die Vergütung ist unmittelbar nach Abschluss der Arbeiten und Rechnungsstellung ohne Abzug fällig. Zeigt sich während der Reparatur, dass der Aufwand den vereinbarten Festpreis erheblich übersteigt, informiert der Auftragnehmer den Auftraggeber vor der Fortsetzung der Arbeiten.</p>
          <p>Eine Finanzierung über die {business.financing.partner} zu {business.financing.interestRate} % effektivem Jahreszins mit einer Laufzeit von bis zu {business.financing.maxMonths} Monaten kann auf Wunsch vermittelt werden. Der Finanzierungsvertrag kommt ausschließlich zwischen dem Auftraggeber und der finanzierenden Bank zustande; deren Bedingungen und Bonitätsprüfung gehen vor.</p>
        </section>

        <section>
          <h2>5. Mitwirkungspflichten des Auftraggebers</h2>
          <p>Der Auftraggeber stellt sicher, dass das Gerät zum vereinbarten Termin frei zugänglich ist und die erforderlichen Strom- und Wasseranschlüsse zur Verfügung stehen. Erforderliche Vorarbeiten, etwa das Ausräumen eines Einbaugeräts, obliegen dem Auftraggeber.</p>
          <p>Kann ein vereinbarter Termin nicht wahrgenommen werden, ist er spätestens 24 Stunden vorher abzusagen. Bei einer vergeblichen Anfahrt kann der Auftragnehmer die Anfahrtspauschale berechnen.</p>
        </section>

        <section>
          <h2>6. Gewährleistung und Garantie</h2>
          <p>Es gelten die gesetzlichen Mängelrechte. Darüber hinaus gewährt der Auftragnehmer auf jede durchgeführte Reparatur eine Garantie von {business.warrantyMonths} Monaten auf die erbrachte Arbeitsleistung und die verbauten Ersatzteile. Die Garantie wird auf der Rechnung schriftlich festgehalten.</p>
          <p>Von der Garantie ausgenommen sind Verschleißteile, Schäden durch unsachgemäße Bedienung, Eingriffe Dritter, Überspannung, Verkalkung sowie Folgeschäden, die nicht auf der ausgeführten Reparatur beruhen.</p>
        </section>

        <section>
          <h2>7. Unreparierbare Geräte</h2>
          <p>Stellt sich heraus, dass eine Reparatur technisch nicht möglich oder wirtschaftlich nicht sinnvoll ist, teilt der Auftragnehmer dies mit. In diesem Fall ist lediglich die Pauschale für Anfahrt und Kostenvoranschlag zu zahlen. Auf Wunsch nimmt der Auftragnehmer das Altgerät gegen gesondertes Entgelt zur fachgerechten Entsorgung mit.</p>
        </section>

        <section>
          <h2>8. Haftung</h2>
          <p>Der Auftragnehmer haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit. Bei einfacher Fahrlässigkeit haftet der Auftragnehmer nur bei Verletzung einer wesentlichen Vertragspflicht und begrenzt auf den vertragstypischen, vorhersehbaren Schaden.</p>
          <p>Die Haftung nach dem Produkthaftungsgesetz bleibt unberührt.</p>
        </section>

        <section>
          <h2>9. Widerrufsrecht für Verbraucher</h2>
          <p>Verbrauchern steht bei außerhalb von Geschäftsräumen geschlossenen Verträgen ein gesetzliches Widerrufsrecht von 14 Tagen zu. Die Einzelheiten und das Muster-Widerrufsformular teilt der Auftragnehmer bei Vertragsschluss in Textform mit.</p>
          <p>Wünscht der Auftraggeber ausdrücklich, dass die Arbeiten vor Ablauf der Widerrufsfrist beginnen, schuldet er bei einem Widerruf Wertersatz für die bis dahin erbrachte Leistung.</p>
        </section>

        <section>
          <h2>10. Eigentumsvorbehalt</h2>
          <p>Eingebaute Ersatzteile bleiben bis zur vollständigen Bezahlung Eigentum des Auftragnehmers. Ausgetauschte Altteile werden fachgerecht entsorgt, sofern der Auftraggeber sie nicht bei Auftragserteilung ausdrücklich zurückfordert.</p>
        </section>

        <section>
          <h2>11. Streitbeilegung</h2>
          <p>Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </section>

        <section>
          <h2>12. Schlussbestimmungen</h2>
          <p>Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts. Sollte eine Bestimmung dieser Bedingungen unwirksam sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.</p>
        </section>
      </article>
    </main><SiteFooter /></>
  );
}
