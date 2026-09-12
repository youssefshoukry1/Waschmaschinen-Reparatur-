/**
 * Inhalte der HiFi-FAQ auf /hifi-reparatur-berlin.
 *
 * Zuerst die geraetespezifischen Fragen, danach der geraeteuebergreifende
 * Block aus lib/globalFaq.ts.
 *
 * Reine Daten – die Darstellung übernimmt components/DeviceFaqSection.tsx.
 * Aus derselben Liste wird auch das FAQPage-Schema der Seite erzeugt.
 */

import { withGlobalFaqs } from "./globalFaq";
import type { FaqItem } from "./kaffeeFaq";

const deviceFaqs: FaqItem[] = [
  {
    id: "boxen-schnarren",
    question: "Welches Problem kann bei HiFi-Anlagen und Boxen auftreten?",
    answer:
      "Am häufigsten schnarren oder kratzen die Boxen, ein Kanal bleibt stumm oder der Verstärker brummt. Ursache sind meist poröse Sicken, ein defekter Hochtöner, kalte Lötstellen in der Frequenzweiche oder alte Elektrolytkondensatoren im Netzteil.",
  },
  {
    id: "reparaturleistungen",
    question: "Welche Reparaturleistungen werden für HiFi und Boxen angeboten?",
    answer:
      "Folgende Leistungen werden angeboten: Sickenreparatur, Weichen, Hochtöner. Dazu prüfen und instand setzen wir Endstufen, Netzteile und Verkabelung – bei Regal- und Standlautsprechern, Studiomonitoren und Soundbars.",
  },
];

export const hifiFaqs: FaqItem[] = withGlobalFaqs(deviceFaqs);
