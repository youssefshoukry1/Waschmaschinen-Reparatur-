/**
 * Geraeteuebergreifende Fragen und Antworten.
 *
 * Diese Liste haengt an keinem Geraet: Preis, Erreichbarkeit, Anfahrt und
 * Garantie gelten auf jeder Geraetseite gleich. Die Zahlen kommen aus
 * lib/business.ts, damit sie nur an einer Stelle gepflegt werden.
 *
 * Reine Daten - die Darstellung uebernimmt components/DeviceFaqSection.tsx.
 * Aus derselben Liste wird auch das FAQPage-Schema der Seiten erzeugt.
 */

import { business } from "./business";
import type { FaqItem } from "./kaffeeFaq";

export const globalFaqs: FaqItem[] = [
  {
    id: "global-kosten",
    question: "Was kostet der Technikerbesuch?",
    answer: `Die Kosten betragen nur ${business.calloutFee} € für den 24-Stunden-Service in Berlin und Umland, auch an Feiertagen und Wochenenden ohne Preisaufschlag. In diesem Betrag sind die Anfahrt und der Kostenvoranschlag vor Ort bereits enthalten.`,
  },
  {
    id: "global-erreichbarkeit",
    question: "Wann sind Sie erreichbar?",
    answer: `Unser Notdienst ist rund um die Uhr erreichbar – an sieben Tagen die Woche, auch an Wochenenden und Feiertagen. Rufen Sie uns unter ${business.telephoneDisplay} an oder schreiben Sie uns über das Kontaktformular, dann rufen wir schnellstmöglich zurück.`,
  },
  {
    id: "global-termin",
    question: "Wie schnell ist ein Techniker bei mir?",
    answer:
      "In den meisten Fällen kommen wir noch am selben Tag zu Ihnen. Sagen Sie uns am Telefon kurz Gerät, Marke und Fehlerbild, dann bringt der Techniker die passenden Ersatzteile gleich mit und die Reparatur ist in einem Termin erledigt.",
  },
  {
    id: "global-festpreis",
    question: "Wann erfahre ich den Preis der Reparatur?",
    answer:
      "Der Techniker stellt die Ursache bei Ihnen vor Ort fest und nennt Ihnen den Festpreis, bevor er mit der Reparatur beginnt. Sie entscheiden erst danach, ob wir loslegen sollen – es entstehen keine versteckten Kosten.",
  },
  {
    id: "global-garantie",
    question: "Welche Garantie erhalte ich auf die Reparatur?",
    answer: `Auf jede durchgeführte Reparatur geben wir ${business.warrantyMonths} Monate Garantie. Wir arbeiten mit Original-Ersatzteilen und Sie erhalten eine Rechnung mit ausgewiesener Garantiezeit.`,
  },
];

/**
 * Haengt die geraeteuebergreifenden Fragen an die geraetespezifischen an.
 * Die spezifischen Fragen stehen bewusst oben - sie beantworten das, weswegen
 * die Besucherin oder der Besucher auf der Seite gelandet ist.
 */
export function withGlobalFaqs(deviceFaqs: FaqItem[]): FaqItem[] {
  return [...deviceFaqs, ...globalFaqs];
}
