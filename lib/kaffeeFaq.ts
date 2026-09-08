/**
 * Inhalte der Kaffeemaschinen-FAQ auf /Koffiezetapparaat.
 *
 * Reine Daten – die Darstellung übernimmt components/DeviceFaqSection.tsx.
 * Aus derselben Liste wird auch das FAQPage-Schema der Seite erzeugt.
 */

import { business } from "./business";

export type FaqItem = {
  /** Stabile ID für aria-controls und Anker. */
  id: string;
  question: string;
  answer: string;
};

/** Marken, die im Haus repariert werden. */
export const coffeeBrands = [
  "AEG",
  "Alfi",
  "Ariston",
  "Bauknecht",
  "Bomann",
  "Bosch",
  "Café Bonitas",
  "Clatronic",
  "Coffeema",
  "DeLonghi",
  "Enova",
  "Faema",
  "Franke Bremer",
  "G3 Ferrari",
  "Gaggenau",
  "Gaggia",
  "Gorenje",
  "Heru",
  "HGZ",
  "Illy",
  "Jura",
  "Kaffeepartner",
  "Kitchen Aid",
  "Krups",
  "Küppersbusch",
  "La San Marco",
  "LaCimbali",
  "Macchiavalley",
  "Melitta",
  "Miele",
  "NEFF",
  "Nivona",
  "Panasonic",
  "Philips",
  "Poccino",
  "Privileg",
  "Quick Mill",
  "Rotel",
  "Rowenta",
  "Russel Hobbs",
  "Saeco",
  "Schaerer",
  "Servomat Steigler / Rheavendors",
  "Severin",
  "Siemens",
  "Simonelli",
  "Solac",
  "Solis",
  "Spidem",
  "Thermoplan",
  "Turmix",
  "Unold",
  "WEGA",
  "WIK",
  "Wittenborg",
  "WMF",
];

export const coffeeFaqs: FaqItem[] = [
  {
    id: "leistungen",
    question: "Welche Dienstleistungen bietet das Reparaturzentrum in Bezug auf Kaffeeautomaten an?",
    answer:
      "Wir übernehmen Kaffeeautomaten-Reparaturen, Wartung, Inspektion, Reinigung sowie den kompletten Service für Haushalts-, Industrie- und Gastronomie-Kaffeemaschinen, Kaffeevollautomaten und Espressomaschinen aller Marken.",
  },
  {
    id: "marken",
    question: "Welche Marken von Kaffeeautomaten werden repariert?",
    answer: `Wir reparieren zahlreiche Marken, darunter: ${coffeeBrands.join(", ")} und weitere.`,
  },
  {
    id: "anfahrt",
    question: "Wie hoch sind die Kosten für die Anfahrt, Fehleranalyse und den Kostenvoranschlag?",
    answer: `Anfahrt, Fehleranalyse vor Ort und Kostenvoranschlag kosten zusammen nur ${business.calloutFee} € – in Berlin und Umland.`,
  },
  {
    id: "zuschlaege",
    question: "Gibt es an Feiertagen oder Wochenenden zusätzliche Aufpreise?",
    answer:
      "Nein. Wir sind auch an Sonn- und Feiertagen sowie am Wochenende für Sie da – ohne Preisaufschlag.",
  },
  {
    id: "uebergabe",
    question: "Welche Optionen stehen für die Übergabe der Kaffeemaschine zur Reparatur zur Verfügung?",
    answer: "Sie haben die Wahl zwischen vier Wegen: Abgeben, Abholen, Zusenden oder Kundenservice vor Ort.",
  },
  {
    id: "wartung",
    question: "Wird eine regelmäßige Wartung und Reinigung für Kaffeevollautomaten angeboten?",
    answer:
      "Ja. Wartung, Inspektion und Reinigung der Geräte führen wir auf Wunsch auch regelmäßig nach den von den Herstellern empfohlenen Zyklen durch.",
  },
  {
    id: "wirtschaftlichkeit",
    question: "Was passiert, wenn sich eine Reparatur der Kaffeemaschine wirtschaftlich nicht lohnt?",
    answer:
      "Stellt sich nach der Fehlerdiagnose heraus, dass sich eine Reparatur nicht lohnt, bieten wir Ihnen eine Auswahl vergleichbarer Geräte an – neu oder gebraucht mit 24 Monaten Garantie –, die Sie bei uns erwerben können.",
  },
  {
    id: "notdienst",
    question: "Welche Kontaktnummer gilt für den Notdienst oder die Störungshilfe?",
    answer: `Unser 24-Stunden-Service und die Störungshilfe erreichen Sie unter Tel: ${business.telephoneDisplay}.`,
  },
  {
    id: "oeffnungszeiten",
    question: "Wie lauten die Öffnungszeiten des Büros?",
    answer:
      "Das Büro ist täglich von 8:00 bis 22:00 Uhr geöffnet, auch an Sonn- und Feiertagen. Unsere Fachkräfte sind zudem rund um die Uhr im Außendienst tätig.",
  },
];
