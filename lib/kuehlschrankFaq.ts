/**
 * Inhalte der Kühlschrank-FAQ auf /kuehlschrank-reparatur-berlin.
 *
 * Reine Daten – die Darstellung übernimmt components/DeviceFaqSection.tsx.
 * Aus derselben Liste wird auch das FAQPage-Schema der Seite erzeugt.
 */

import { business } from "./business";
import type { FaqItem } from "./kaffeeFaq";

/** Marken, die wir bei Kühlschränken und Kühlgeräten reparieren. */
export const fridgeBrands = [
  "Miele",
  "Siemens",
  "Bosch",
  "Privileg",
  "Bauknecht",
  "Whirlpool",
  "Bomann",
  "Fagor",
  "Blomberg",
  "Liebherr",
  "Constructa",
  "Neff",
  "Indesit",
  "Gorenje",
  "Hanseatic",
  "Beko",
  "Amica",
  "Ariston",
  "EBD",
  "Candy",
  "Lloyds",
  "Philips",
  "Hoover",
  "Zanussi",
  "Foron",
  "Juno",
  "LG",
  "SEG",
  "AEG",
  "Küppersbusch",
  "Panasonic",
  "Samsung",
  "Grundig",
];

export const fridgeFaqs: FaqItem[] = [
  {
    id: "anfahrt",
    question: "Wie hoch sind die Kosten für Anfahrt und Kostenvoranschlag für eine Kühlschrankreparatur?",
    answer: `Die Kosten betragen nur ${business.calloutFee} € für den 24-Stunden-Service in Berlin und Umland, auch an Feiertagen und Wochenenden ohne Preisaufschlag.`,
  },
  {
    id: "telefon",
    question: "Wie lautet die direkte Telefonnummer für Terminvereinbarungen oder Fragen zur Kühlschrankreparatur?",
    answer: `Die Telefonnummer lautet: ${business.telephoneDisplay}`,
  },
  {
    id: "marken",
    question: "Welche Marken von Kühlschränken und Kühlgeräten werden repariert?",
    answer: `Es werden alle Fabrikate repariert, wie: ${fridgeBrands.join(", ")}.`,
  },
  {
    id: "leihgeraet",
    question: "Was passiert, wenn eine Sofortreparatur vor Ort einmal nicht möglich sein sollte?",
    answer:
      "Es wird kostenlos ein Leihgerät zur Verfügung gestellt, damit keine Ware antaut und kein Schaden durch das Entsorgen von Lebensmitteln entsteht.",
  },
  {
    id: "kostenvoranschlag",
    question: "Wie werden die Reparaturkosten ermittelt und erfolgt eine Beratung zur Wirtschaftlichkeit?",
    answer:
      "Direkt nach der Fehleranalyse wird ein Kostenvoranschlag unterbreitet. Die Servicemitarbeiter besprechen gemeinsam mit dem Kunden, ob eine Reparatur unter Berücksichtigung des Alters sinnvoll ist oder ob eine Neuanschaffung eines energiesparenden Neugerätes dauerhaft kostengünstiger wäre.",
  },
  {
    id: "vor-ort",
    question: "Ist für Reparaturen immer ein Vor-Ort-Service erforderlich?",
    answer:
      "Nicht zwingend; kleinere Haushaltsgeräte können auch direkt im Laden (Firmensitz) abgegeben werden, um An- und Abfahrtskosten zu sparen.",
  },
];
