/**
 * Inhalte der Satellitenanlagen-FAQ auf /satellitenanlagen-service-berlin.
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
    id: "kein-signal",
    question: "Der Receiver meldet „Kein Signal“.",
    answer:
      "Prüfen Sie zuerst, ob die Anschlusskabel am Receiver und an der Antennendose fest sitzen und ob der Sendersuchlauf versehentlich zurückgesetzt wurde. Tritt der Ausfall nach einem Sturm auf, hat sich meist die Schüssel verstellt – schon wenige Millimeter reichen aus. Wir richten die Anlage mit dem Messgerät neu aus und prüfen dabei LNB, Kabel und Multischalter.",
  },
  {
    id: "bildaussetzer",
    question: "Das Bild klotzt, friert ein oder einzelne Sender fehlen.",
    answer:
      "Klötzchenbildung und fehlende Sender sind ein Zeichen für zu schwachen Empfangspegel: feuchtes oder geknicktes Koaxkabel, ein alterndes LNB, korrodierte F-Stecker oder ein defekter Multischalter in Mehrfamilienhäusern. Wir messen den Pegel an jeder Dose, ersetzen das schwache Bauteil und richten die Anlage anschließend neu ein.",
  },
];

export const satelliteFaqs: FaqItem[] = withGlobalFaqs(deviceFaqs);
