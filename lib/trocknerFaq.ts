/**
 * Inhalte der Trockner-FAQ auf /trockner.
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
    id: "waesche-bleibt-feucht",
    question: "Die Wäsche bleibt nach dem Programm feucht.",
    answer:
      "Reinigen Sie zuerst das Flusensieb in der Tür und – bei Wärmepumpentrocknern – zusätzlich den Wärmetauscher im Sockel. Beide setzen sich mit Flusen zu und bremsen den Luftstrom. Prüfen Sie außerdem, ob der Kondenswasserbehälter geleert ist und die Trommel nicht überladen wurde. Bleibt die Wäsche danach weiterhin feucht, sind meist der Feuchtigkeitsfühler, das Heizelement oder der Wärmepumpenkreis defekt.",
  },
  {
    id: "trockner-startet-nicht",
    question: "Der Trockner startet nicht oder bleibt mitten im Programm stehen.",
    answer:
      "Kontrollieren Sie, ob die Tür sauber schließt und der Wasserbehälter geleert ist – viele Geräte verweigern sonst den Start. Prüfen Sie Steckdose und Sicherung mit einem anderen Gerät. Läuft das Programm an und stoppt dann, liegt es häufig am Türschalter, am Thermostat oder an einer überhitzten Elektronik. Wir messen die Bauteile vor Ort durch und tauschen das defekte Teil.",
  },
];

export const dryerFaqs: FaqItem[] = withGlobalFaqs(deviceFaqs);
