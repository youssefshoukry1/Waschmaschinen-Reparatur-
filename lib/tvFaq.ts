/**
 * Inhalte der Fernseher-FAQ auf /TV.
 *
 * Reine Daten – die Darstellung übernimmt components/DeviceFaqSection.tsx.
 * Aus derselben Liste wird auch das FAQPage-Schema der Seite erzeugt.
 */

import { business } from "./business";
import type { FaqItem } from "./kaffeeFaq";

export const tvFaqs: FaqItem[] = [
  {
    id: "dauer",
    question: "Dauert das lange?",
    answer: "Oft zeitnahe Termine; viele Fehlerbilder klären wir nach kurzer Fehlersuche.",
  },
  {
    id: "lohnt-sich-die-reparatur",
    question: "Lohnt sich die Reparatur?",
    answer:
      "Wenn Bauteile verfügbar sind und das Panel intakt ist, kann Instandsetzung wirtschaftlich sein – wir bewerten das offen und begründet.",
  },
  {
    id: "modell-bekannt",
    question: "Kennt ihr mein Modell?",
    answer:
      "Breites Marken-Spektrum: Samsung, LG, Sony, Philips, Panasonic u.a. • LED/LCD, OLED, QLED • Android TV, Tizen, webOS.",
  },
  {
    id: "startet-nicht",
    question: "Fernseher startet nicht / Bildschirm bleibt schwarz – was tun?",
    answer:
      "Strom & Reset: Netzstecker entfernen, 60 Sekunden warten, andere Steckdose testen. Schalter am Gerät prüfen. Peripherie trennen: Alle HDMI-Geräte, Soundbar/ARC und USB abziehen. TV erneut einschalten; anschließend Kabel nacheinander anstecken. Software/Ports: Falls möglich, Menü aufrufen, Update prüfen. HDMI-Eingang wechseln. Reagiert der TV nur mit Blinkcode (z. B. Sony Blink 6×), bitte Service kontaktieren.",
  },
  {
    id: "marken",
    question: "Welche Marken werden unterstützt?",
    answer:
      "Wir arbeiten u.a. mit Samsung, LG, Sony, Philips, Panasonic, Hisense und TCL. Auch Grundig, Toshiba, Metz oder Loewe sind möglich – bitte Modellbezeichnung bereit halten.",
  },
  {
    id: "termin",
    question: "Wie schnell erhalte ich einen Termin?",
    answer:
      "Meist kurzfristig. Beschreiben Sie Symptom, Baujahr und Indikator (z. B. „Samsung Error 7“). So können wir die Prüfung effizient planen.",
  },
  {
    id: "reparatur-oder-neukauf",
    question: "Reparatur oder Neukauf – was ist sinnvoll?",
    answer:
      "Ist Panel/Display intakt und Teile verfügbar, ist eine Instandsetzung häufig wirtschaftlich. Wir legen die Bewertung offen und geben eine klare Empfehlung.",
  },
  {
    id: "notdienst",
    question: "Gibt es einen Notdienst?",
    answer: `Ja, für eilige Fälle versuchen wir Termine in 24–48 Stunden. Rufen Sie an: ${business.telephoneDisplay}.`,
  },
  {
    id: "ersatzteile",
    question: "Welche Teile werden verwendet?",
    answer:
      "Wir setzen auf passende Komponenten oder Originalteile, abhängig von Modell und Verfügbarkeit. Die Optionen werden transparent erläutert.",
  },
  {
    id: "bezahlung",
    question: "Wie kann ich bezahlen?",
    answer: "Üblich sind bargeldlos und bar. Details teilen wir mit dem Kostenvoranschlag mit.",
  },
];
