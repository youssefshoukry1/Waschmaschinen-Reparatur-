/**
 * Inhalte der Lautsprecher-FAQ auf /hifi-reparatur-berlin.
 *
 * Reine Daten – die Darstellung übernimmt components/DeviceFaqSection.tsx.
 * Aus derselben Liste wird auch das FAQPage-Schema der Seite erzeugt.
 */

import type { FaqItem } from "./kaffeeFaq";

export const speakerFaqs: FaqItem[] = [
  {
    id: "boxen-schnarren",
    question: "Welches Problem kann bei den Lautsprechern/Boxen auftreten?",
    answer: "Die Boxen schnarren.",
  },
  {
    id: "reparaturleistungen",
    question: "Welche Reparaturleistungen werden für Lautsprecher/Boxen angeboten?",
    answer: "Folgende Leistungen werden angeboten: Sickenreparatur, Weichen, Hochtöner.",
  },
];
