/**
 * Inhalte der Herd- und Backofen-FAQ auf /Magnetron.
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
    id: "kochfeld-ohne-funktion",
    question: "Das Kochfeld heizt nicht mehr.",
    answer:
      "Prüfen Sie zuerst, ob die Kindersicherung aktiv ist und ob die Sicherung im Zählerkasten ausgelöst hat. Herde sind meist über Starkstrom angeschlossen – schalten Sie die Sicherung ab und wieder ein und stellen Sie eine Kochzone erneut ein. Bleibt sie kalt, sind in der Regel Heizleiter, Energieregler oder die Steuerelektronik defekt. Diese Arbeiten gehören wegen der Spannung in Fachhände.",
  },
  {
    id: "backofen-heizt-nicht",
    question: "Der Backofen wird nicht mehr richtig heiß.",
    answer:
      "Kontrollieren Sie die eingestellte Betriebsart – bei Umluft und Ober-/Unterhitze arbeiten unterschiedliche Heizelemente. Backt das Gerät einseitig, zu langsam oder gar nicht mehr, ist meist ein Heizelement durchgebrannt, der Temperaturfühler verstellt oder die Türdichtung undicht, sodass Hitze entweicht. Wir messen die Heizkreise durch und tauschen das defekte Teil vor Ort.",
  },
];

export const stoveFaqs: FaqItem[] = withGlobalFaqs(deviceFaqs);
