/**
 * Inhalte der Mikrowellen-FAQ auf /Magnetron.
 *
 * Reine Daten – die Darstellung übernimmt components/DeviceFaqSection.tsx.
 * Aus derselben Liste wird auch das FAQPage-Schema der Seite erzeugt.
 */

import type { FaqItem } from "./kaffeeFaq";

export const microwaveFaqs: FaqItem[] = [
  {
    id: "funktioniert-nicht",
    question: "Die Mikrowelle funktioniert nicht.",
    answer:
      "Überprüfen Sie, ob die Stromzufuhr unterbrochen ist (Strom in der Steckdose vorhanden? Eventuell mit einem anderen Gerät prüfen, Sicherung intakt?). Ist Strom vorhanden, ziehen Sie den Netzstecker, warten Sie ca. 5 Minuten und versuchen dann erneut, das Gerät in Betrieb zu nehmen. Sollte zwar Strom vorhanden sein, aber die Mikrowelle nicht einschalten, stellen Sie sicher, dass die Tür korrekt geschlossen ist (befinden sich eventuell Fremdkörper, wie Speisereste, in der Tür bzw. im Türrahmen?), stellen Sie die Zeit erneut ein und drücken Sie die Start-Taste.",
  },
  {
    id: "erwaermt-langsam",
    question: "Die Speisen erwärmen sich langsamer als zuvor.",
    answer:
      "Überprüfen Sie die korrekte Einstellung der Mikrowellen-Leistung (wurde eventuell die Leistung verstellt?). Stellen Sie sicher, dass sich nicht eine grössere Menge an Speisen als gewöhnlich im Gerät befindet oder die Speisen kälter waren als gewöhnlich. Dies kann durch Verlängerung der Zeitdauer behoben werden. Rühren Sie ausserdem grössere Mengen, oder kältere Speisen öfter um bzw. wenden Sie sie, um ein gleichmässiges Erwärmen zu ermöglichen.",
  },
];
