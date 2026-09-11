/**
 * Inhalte der Gastronomiegeraete-FAQ auf /gastronomiegeraete.
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
    id: "welche-geraete",
    question: "Welche Gastronomiegeräte reparieren Sie?",
    answer:
      "Wir kümmern uns um die Technik in Küche und Theke: Gewerbespülmaschinen und Gläserspüler, Kühl- und Tiefkühlschränke, Kühltheken, Gastroherde und Konvektomaten, Fritteusen, Mikrowellen sowie Siebträger- und Kaffeevollautomaten. Auch Waschmaschinen und Trockner im gewerblichen Einsatz gehören dazu.",
  },
  {
    id: "ausfall-im-betrieb",
    question: "Mein Gerät fällt mitten im Betrieb aus – wie schnell können Sie kommen?",
    answer:
      "Ein Ausfall in der Küche kostet Umsatz, deshalb behandeln wir Gastronomiebetriebe als Notdienst und kommen in der Regel noch am selben Tag. Nennen Sie uns am Telefon Gerät, Hersteller und Typenschild, dann bringt der Techniker die gängigen Ersatzteile direkt mit. Auf Wunsch kommen wir außerhalb Ihrer Öffnungszeiten, damit der Betrieb weiterläuft.",
  },
];

export const gastroFaqs: FaqItem[] = withGlobalFaqs(deviceFaqs);
