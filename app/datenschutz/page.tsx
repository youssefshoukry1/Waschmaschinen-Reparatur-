import type { Metadata } from "next";
import { business } from "@/lib/business";
import styles from "../legal.module.css";
import Navbar from "@/components/Navbar";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung von ${business.name}.`,
  alternates: { canonical: "/datenschutz" },
};

export default function DatenschutzPage() {
  return (
    <><Navbar /><main className={styles.page}>
      <article className={styles.content}>
        <p className={styles.eyebrow}>Ihre Daten</p>
        <h1>Datenschutzerklärung</h1>
        <p className={styles.intro}>Stand: 6. September 2026</p>

        <section>
          <h2>1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:<br /><br />
            <strong>{business.legalName}</strong><br />
            {business.address.streetAddress}<br />
            {business.address.postalCode} {business.address.addressLocality}<br />
            Telefon: <a href={`tel:${business.telephone}`}>{business.telephoneDisplay}</a><br />
            E-Mail: <a href={`mailto:${business.email}`}>{business.email}</a>
          </p>
        </section>

        <section>
          <h2>2. Bereitstellung der Website</h2>
          <p>Diese Website wird über Vercel Pro bereitgestellt und betrieben. Beim Aufruf verarbeitet Vercel technisch erforderliche Daten zur Auslieferung, Sicherheit und Stabilität der Website. Dazu können insbesondere IP-Adresse, Datum und Uhrzeit des Zugriffs, aufgerufene Seite beziehungsweise angeforderte Datei, übertragene Datenmenge, Referrer-URL, Browsertyp, Betriebssystem sowie weitere technische Protokolldaten gehören. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO zur sicheren und zuverlässigen Bereitstellung der Website.</p>
          <p>Vercel kann personenbezogene Daten auch außerhalb des Europäischen Wirtschaftsraums verarbeiten. Soweit dabei eine Übermittlung in ein Drittland erfolgt, richtet sie sich nach den Voraussetzungen der Art. 44 ff. DSGVO und den jeweils anwendbaren geeigneten Garantien für internationale Datenübermittlungen.</p>
        </section>

        <section>
          <h2>3. Kontaktaufnahme und Anfrageformular</h2>
          <p>Wenn Sie uns per E-Mail, Telefon, WhatsApp oder über das Anfrageformular kontaktieren, verarbeiten wir die von Ihnen mitgeteilten Daten zur Bearbeitung Ihrer Anfrage und für die damit verbundene Kommunikation. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Verarbeitung zur Durchführung vorvertraglicher Maßnahmen erforderlich ist, sowie im Übrigen Art. 6 Abs. 1 lit. f DSGVO.</p>
          <p>Das Anfrageformular stellt eine direkte Verbindung Ihres Browsers zu <code>relay-kontaktformular.msadatax.com</code> her. Beim Laden des Formulars wird ein technischer Submit-Token abgerufen. Dabei werden insbesondere die öffentliche Formular-Kennung sowie die bei jeder Verbindung technisch anfallenden Daten, etwa IP-Adresse und HTTP-/Browser-Metadaten, an den Relay-Dienst übermittelt. Beim Absenden übermittelt Ihr Browser Name, E-Mail-Adresse, optional Telefonnummer, das betroffene Gerät, eine gewünschte Rückrufzeit und Ihre Nachricht. Geräteangabe und Rückrufwunsch werden zusammen mit der Nachricht übermittelt. Zusätzlich werden der Stand Ihrer Einwilligungs-Checkbox, die Version des Einwilligungstextes, ein verborgenes Anti-Spam-Feld, ein im Browser erzeugter Vorgangs-/Idempotenzwert, der Zeitpunkt des Renderns des Formulars und der Submit-Token übertragen. Diese technischen und Anti-Spam-Daten dienen der sicheren Übermittlung und dem Schutz vor missbräuchlichen Formularsendungen.</p>
          <p>MSA DataX betreibt den Relay-Dienst als technischen Auftragsverarbeiter für {business.name}. Die Verarbeitung durch MSA DataX erfolgt im Auftrag und nach Weisung von {business.name} im Rahmen der hierfür vorgesehenen Vereinbarung zur Auftragsverarbeitung nach Art. 28 DSGVO.</p>
          <p>Die über das Relay weitergeleiteten Anfragen werden an <a href={`mailto:${business.email}`}>{business.email}</a> übermittelt und dort über den E-Mail-Dienst des Anbieters verarbeitet und gespeichert. Der konkrete datenschutzrechtliche Vertragspartner für dieses E-Mail-Konto ergibt sich nicht aus der Website. Im Zusammenhang mit dem eingesetzten E-Mail-Dienst kann eine Verarbeitung personenbezogener Daten auch außerhalb des Europäischen Wirtschaftsraums erfolgen. Soweit eine Drittlandübermittlung erfolgt, richtet sie sich nach den Voraussetzungen der Art. 44 ff. DSGVO und den jeweils anwendbaren geeigneten Garantien für internationale Datenübermittlungen. Bitte übermitteln Sie im Freitext nur die Daten, die für Ihre Anfrage erforderlich sind.</p>
        </section>

        <section>
          <h2>4. Google Maps</h2>
          <p>Die Standortkarte wird als Google-Maps-iframe erst geladen, wenn Sie ausdrücklich einwilligen. Vor Ihrer Einwilligung wird lediglich eine lokale Platzhalterdarstellung angezeigt; es wird kein Google-Maps-iframe eingebunden und keine automatische Verbindung zu Google hergestellt. Mit dem Laden der Karte wird eine Verbindung zu Google hergestellt. Dabei können insbesondere Ihre IP-Adresse sowie technische Nutzungsdaten an Google übermittelt und gegebenenfalls auch außerhalb des Europäischen Wirtschaftsraums verarbeitet werden. Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG.</p>
          <p>Wenn Sie „Nur notwendige“ wählen, wird kein Maps-iframe geladen. Sie können eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie auf der Startseite „Google Maps zurücksetzen“ wählen. Dadurch werden die lokalen Einwilligungseinstellungen entfernt und die Karte wieder blockiert, bis Sie erneut einwilligen.</p>
          <p>Zusätzlich ist ein gewöhnlicher externer Link zu Google Maps vorhanden. Dieser stellt erst dann eine Verbindung zu Google her, wenn Sie ihn aktiv anklicken.</p>
          <p>Weitere Informationen finden Sie in der <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noreferrer">Datenschutzerklärung von Google</a>.</p>
        </section>

        <section>
          <h2>5. Lokale Speicherungen</h2>
          <p>Wir verwenden für die Google-Maps-Einstellung keine eigenen Cookies. Ausschließlich lokal in Ihrem Browser werden zwei Local-Storage-Einträge verwendet: <code>geraete-service-cookie-consent</code> speichert die Auswahl „essential“ oder „maps“; <code>geraete-service-google-maps-consent</code> wird bei erteilter Einwilligung mit dem Wert „granted“ gesetzt. Bei einer Ablehnung wird kein Maps-Eintrag gesetzt. Die Einträge dienen ausschließlich dazu, Ihre Auswahl zu berücksichtigen; eine Übermittlung dieser Local-Storage-Werte an uns findet nicht statt.</p>
          <p>Nach Einwilligung für Google Maps kann Google im Rahmen des eingebundenen Dienstes eigene Cookies oder andere Speichertechnologien verwenden. Deren Einsatz richtet sich nach den Vorgaben von Google.</p>
        </section>

        <section>
          <h2>6. Content-Management-System Sanity</h2>
          <p>Für die redaktionelle Verwaltung und Bereitstellung veröffentlichter Website-Inhalte verwenden wir Sanity. Der Abruf allgemeiner veröffentlichter CMS-Inhalte erfolgt serverseitig durch die Website. Soweit veröffentlichte Bilder oder Avatare eingebunden sind, kann Ihr Browser diese unmittelbar über das Sanity-Content-Delivery-Netzwerk <code>cdn.sanity.io</code> abrufen. Dabei werden an Sanity die für den Bildabruf technisch erforderlichen Daten, insbesondere Ihre IP-Adresse und HTTP-/Browser-Metadaten, übermittelt. Die Verarbeitung zur Verwaltung und Bereitstellung allgemeiner Website-Inhalte erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO; unser berechtigtes Interesse liegt in einer aktuellen, sicheren und wirtschaftlichen redaktionellen Bereitstellung der Website.</p>
          <p>Über Sanity können insbesondere veröffentlichte Bewertungen mit Name, Bewertung, Bewertungstext und optionalem Avatar sowie weitere veröffentlichte Bildinhalte verwaltet werden. Für die Veröffentlichung identifizierbarer Kundenbewertungen, Namen, Avatare, Referenzbilder oder Vorher-/Nachher-Bilder ist jeweils eine eigenständige Rechtsgrundlage erforderlich. Soweit die Veröffentlichung auf einer Einwilligung beruht, ist Art. 6 Abs. 1 lit. a DSGVO die Rechtsgrundlage; andernfalls richtet sie sich nach der jeweils tatsächlich einschlägigen Rechtsgrundlage. Die technische Kennzeichnung eines Inhalts im CMS ersetzt nicht die Prüfung dieser Rechtsgrundlage. Angaben zu Speicherorten, Löschfristen oder internationalen Übermittlungsmechanismen von Sanity ergeben sich nicht aus dieser Website.</p>
        </section>

        <section>
          <h2>7. Externe Kontaktlinks</h2>
          <p>WhatsApp ist auf dieser Website ausschließlich als gewöhnlicher externer Link eingebunden. Es werden keine Scripts, Pixel, Widgets, eingebetteten Inhalte oder sonstigen Verbindungen zu WhatsApp geladen, bevor Sie einen solchen Link aktiv anklicken. Erst mit dem Klick verlassen Sie unsere Website beziehungsweise wird eine Verbindung zum Anbieter hergestellt. Für die anschließende Verarbeitung gelten die Datenschutzhinweise des Anbieters.</p>
        </section>

        <section>
          <h2>8. Speicherdauer</h2>
          <p>Wir speichern personenbezogene Daten nur so lange, wie dies für den jeweiligen Verarbeitungszweck erforderlich ist. Daten werden gelöscht oder in ihrer Verarbeitung eingeschränkt, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungspflichten, die Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder sonstige rechtliche Gründe einer Löschung entgegenstehen. Soweit bei einzelnen Verarbeitungen keine konkrete Frist genannt ist, richtet sich die Löschung nach diesen objektiven Kriterien.</p>
        </section>

        <section>
          <h2>9. Ihre Rechte</h2>
          <p>Sie haben nach Maßgabe der gesetzlichen Voraussetzungen das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch gegen Verarbeitungen, die auf Art. 6 Abs. 1 lit. e oder f DSGVO beruhen. Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen.</p>
          <p>Sie haben außerdem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Für uns zuständig ist die Berliner Beauftragte für Datenschutz und Informationsfreiheit.</p>
        </section>
      </article>
    </main><SiteFooter /></>
  );
}
