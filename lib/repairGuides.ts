/**
 * Inhalte der Hilfeanleitungen auf /leistungen.
 *
 * Reine Daten – die Darstellung übernimmt components/RepairGuidesSection.tsx.
 * Jede Anleitung ist eine Frage („Was tun, wenn …“) mit Lösungspunkten, damit
 * sie im gleichen Akkordeon wie die FAQ auf der Startseite funktioniert.
 */

/** Ein Abschnitt innerhalb einer Anleitung. */
export type GuideBlock =
  /** Nummerierte Handlungsschritte, optional mit fetter Zwischenüberschrift. */
  | { kind: "steps"; title?: string; items: { title?: string; text: string }[] }
  /** Ungeordnete Aufzählung, z. B. mögliche Ursachen. */
  | { kind: "list"; title?: string; items: string[] }
  /** Kostentabelle o. Ä. */
  | { kind: "table"; columns: [string, string, string]; rows: [string, string, string][] }
  /** Hervorgehobener Sicherheitshinweis. */
  | { kind: "note"; text: string };

export type RepairGuide = {
  /** Stabile ID für aria-controls und Anker. */
  id: string;
  /** Überschrift im Akkordeon. */
  question: string;
  /** Einleitungssatz über den Blöcken. */
  lead?: string;
  blocks: GuideBlock[];
};

export const repairGuides: RepairGuide[] = [
  {
    id: "trommel-ausbauen",
    question: "Trommel einer Waschmaschine ausbauen",
    lead: "So zerlegen Sie das Gerät Schritt für Schritt und nehmen die Trommel heraus.",
    blocks: [
      {
        kind: "steps",
        items: [
          {
            title: "Vorbereitung",
            text: "Leeren Sie die Waschmaschine vollständig und ziehen Sie den Netzstecker, um die Stromverbindung zu unterbrechen.",
          },
          {
            title: "Gehäuse entfernen",
            text: "Zerlegen Sie das Gehäuse der Waschmaschine, um Zugang zu den inneren Komponenten zu erhalten.",
          },
          {
            title: "Komponenten abbauen",
            text: "Entfernen Sie die Ausgleichsgewichte, den Motor, die elektrischen Leitungen, die oberen Federn und die Stoßdämpfer vom Trommelbottich.",
          },
          {
            title: "Bottich herausheben",
            text: "Heben Sie den Bottich mit Unterstützung einer zweiten Person vorsichtig aus der Maschine.",
          },
          {
            title: "Bottich öffnen",
            text: "Lösen Sie die Schrauben, die die beiden Hälften des Bottichs verbinden, und nehmen Sie die vordere Hälfte ab.",
          },
          {
            title: "Lager und Trommel entfernen",
            text: "Bauen Sie das Lagerkreuz sowie das Lager von der Rückseite ab und ziehen Sie die zweite Bottichhälfte samt Trommel heraus.",
          },
        ],
      },
    ],
  },
  {
    id: "wasser-laeuft-aus",
    question: "Wasser läuft am oder unter der Waschmaschine aus",
    lead: "Diese Sofortmaßnahmen stoppen den Wasseraustritt und finden die Ursache.",
    blocks: [
      {
        kind: "steps",
        items: [
          {
            title: "Strom und Wasser abstellen",
            text: "Trennen Sie die Waschmaschine vom Stromnetz und schließen Sie den Wasserzulauf.",
          },
          {
            title: "Ursache identifizieren",
            text: "Überprüfen Sie die Türdichtung, Schläuche und Waschmittelkammer auf sichtbare Schäden oder Verstopfungen.",
          },
          {
            title: "Reparatur durchführen",
            text: "Ersetzen Sie defekte Teile wie Schläuche oder Dichtungen. Reinigen Sie die Waschmittelkammer gründlich.",
          },
          {
            title: "Testlauf durchführen",
            text: "Schließen Sie die Waschmaschine wieder an und starten Sie einen kurzen Waschgang, um die Reparatur zu überprüfen.",
          },
        ],
      },
    ],
  },
  {
    id: "kindersicherung",
    question: "Waschmaschine Kindersicherung aktivieren und deaktivieren",
    lead: "Die Tastenkombination unterscheidet sich je nach Hersteller – hier die gängigen Marken.",
    blocks: [
      {
        kind: "steps",
        title: "Kindersicherung aktivieren – Schritt für Schritt nach Marke",
        items: [
          {
            title: "Bosch",
            text: "Drücken und halten Sie die Start-/Pause-Taste für 3–5 Sekunden. Ein Schlosssymbol im Display zeigt die Aktivierung an.",
          },
          {
            title: "Siemens & AEG",
            text: "Halten Sie die Start-/Pause-Taste für 5 Sekunden gedrückt. Bei AEG drücken Sie stattdessen gleichzeitig „Optionen“ + „Start/Pause“.",
          },
          {
            title: "Samsung",
            text: "Halten Sie „Temperatur“ + „Spülen“ gleichzeitig 3 Sekunden gedrückt. Das Schloss-Symbol bestätigt die Aktivierung.",
          },
          {
            title: "Miele",
            text: "Drücken Sie nach Programmstart die Start/Stop-Taste lange, wählen Sie „Kindersicherung“ und bestätigen Sie mit OK.",
          },
          {
            title: "LG",
            text: "Halten Sie die mit einem Schlosssymbol markierten Tasten (z. B. „Vorwäsche“ + „Spülen“) 3 Sekunden lang gedrückt.",
          },
        ],
      },
      {
        kind: "note",
        text: "Kindersicherung deaktivieren: In der Regel drücken Sie dieselbe Tastenkombination erneut für 3–5 Sekunden, bis das Schlosssymbol im Display erlischt. Sollte das nicht funktionieren, starten Sie die Maschine neu oder konsultieren Sie die Hersteller-Bedienungsanleitung.",
      },
    ],
  },
  {
    id: "trommel-schleift",
    question: "Waschmaschine Trommel schleift",
    lead: "Schleifende oder kratzende Geräusche eingrenzen und die Ursache beheben.",
    blocks: [
      {
        kind: "steps",
        items: [
          { text: "Strom trennen. Sicherheit geht vor." },
          { text: "Trommel leer per Hand drehen und Geräuschquelle lokalisieren (Metall vs. Gummi)." },
          { text: "Manschette prüfen: Abrieb, Risse, eingeklemmte Textilreste. Sitz vorsichtig richten." },
          { text: "Fremdkörper-Verdacht: Taschenlampe an Trommelrand halten; bei Verdacht Maschine nicht betreiben." },
          { text: "Stand & Unwucht: Gerät exakt ausrichten, Transportsicherungen entfernen, Testlauf mit kleiner Beladung." },
        ],
      },
      {
        kind: "note",
        text: "Wichtig: Arbeiten an Heizung, Bottich und Lagern erfordern Erfahrung (Dichtheits- & Sicherheitsprüfung). Bei Unsicherheit unseren 24/7-Notdienst rufen.",
      },
    ],
  },
  {
    id: "pumpt-nicht-ab",
    question: "Waschmaschine pumpt nicht ab",
    lead: "Bleibt das Wasser stehen oder schleudert die Maschine nicht, arbeiten Sie diese Punkte der Reihe nach ab.",
    blocks: [
      {
        kind: "steps",
        items: [
          {
            title: "Flusensieb reinigen",
            text: "Öffnen Sie die Serviceklappe, entnehmen Sie das Flusensieb und spülen Sie es unter fließendem Wasser aus. Entfernen Sie alle Fusseln und Fremdkörper.",
          },
          {
            title: "Laugenpumpe prüfen & austauschen",
            text: "Leiten Sie den Ablaufschlauch in einen Eimer und starten Sie das Abpumpen. Bleibt das Wasser stehen, ist die Pumpe defekt und sollte von einem Fachmann gewechselt werden.",
          },
          {
            title: "Abflussschlauch & Siphon kontrollieren",
            text: "Prüfen Sie Schläuche auf Knicke, Risse oder Verstopfungen. Reinigen Sie den Siphonanschluss und achten Sie darauf, dass der Schlauch korrekt eingespannt ist.",
          },
          {
            title: "Ablaufkrümmer freimachen",
            text: "Der Ablaufkrümmer unter der Pumpe kann sich zusetzen. Schrauben Sie ihn ab, spülen Sie ihn aus und setzen Sie ihn mit neuer Dichtung wieder ein.",
          },
          {
            title: "Keilriemen & Elektronikcheck",
            text: "Sichtprüfung des Keilriemens auf Abrieb und Spannkraft. Elektronische Fehlercodes können auf ein Steuerungsproblem hinweisen – hier hilft nur ein Technik-Einsatz.",
          },
          {
            title: "Spül-Stop & Sicherung",
            text: "Deaktivieren Sie versehentlich eingeschaltete Spül-Stop-Funktionen und prüfen Sie die Haussicherung, falls die Maschine komplett ausfällt.",
          },
        ],
      },
      {
        kind: "list",
        title: "Markenspezifische Hinweise",
        items: [
          "Bosch & Siemens: Diese Geräte zeigen oft F-Codes bei Pumpenfehlern. Reinigen Sie Flusensieb und Siphon und vergewissern Sie sich, dass der Ablaufschlauch korrekt montiert ist.",
          "Miele: Miele-Maschinen verfügen über spezielle Laugenpumpen. Ein Austausch erfordert Original-Ersatzteile und sollte durch den Profi erfolgen.",
          "Samsung & AEG: Bei Samsung stoppen Wasserstands-Sensoren das Abpumpen. AEG kann per Service-Menü in den Diagnosetest versetzt werden, um Pumpenfunktionen zu prüfen.",
          "Bauknecht & Beko: Prüfen Sie hier vorrangig das Flusensieb und den Ablaufkrümmer. Diese Marken neigen zu Ablagerungen im Pumpensumpf.",
        ],
      },
    ],
  },
  {
    id: "entkalken",
    question: "Waschmaschine entkalken / Flusensieb reinigen",
    lead: "So lösen Sie Kalk im Inneren und halten das Sieb dauerhaft frei.",
    blocks: [
      {
        kind: "steps",
        items: [
          { title: "Vorbereitung", text: "Leere Trommel, Maschine auf 60 °C oder höher einstellen." },
          { title: "Entkalkungsmittel einfüllen", text: "Hausmittel direkt in die Trommel, Spezial-Entkalker ins Fach." },
          { title: "Entkalkungsprogramm starten", text: "Ohne Wäsche einen Vollwaschgang durchführen." },
          { title: "Pause", text: "Nach dem Aufheizen 1–2 Stunden stehen lassen, damit die Säure einwirkt." },
          { title: "Abschließender Spülgang", text: "Programmende abwarten, Maschine leer nochmals spülen." },
          { title: "Gummidichtungen & Flusensieb", text: "Nach dem Entkalken Türmanschette und Sieb reinigen." },
        ],
      },
    ],
  },
  {
    id: "transport-ohne-transportsicherung",
    question: "Eine Waschmaschine ohne Transportsicherung transportieren",
    lead: "Ohne Transportsicherung schlägt die Trommel frei – mit diesen Maßnahmen kommt das Gerät heil an.",
    blocks: [
      {
        kind: "steps",
        items: [
          {
            title: "Trommel stabilisieren",
            text: "Legen Sie weiche Polster (z. B. Decken, Handtücher oder Schaumstoffpads) rund um die Trommel im Inneren, um seitliches Spiel zu dämpfen. Das vermindert Schlagbewegungen während der Fahrt.",
          },
          {
            title: "Maschine immer stehend transportieren",
            text: "Transportieren Sie die Waschmaschine ausschließlich aufrecht. Ein liegender Transport ohne Transportsicherung erhöht das Risiko, dass die Trommel unkontrolliert schlägt und die Aufhängung beschädigt wird.",
          },
          {
            title: "Fixierung außen",
            text: "Sichern Sie die Maschine mit Spanngurten auf dem Transportwagen oder im Fahrzeug, damit sie nicht kippt oder verrutscht. Polstern Sie die Außenflächen mit Decken, um Stöße abzufangen.",
          },
          {
            title: "Fahrt vorsichtig gestalten",
            text: "Vermeiden Sie starke Bremsmanöver, Schlaglöcher und hohe Geschwindigkeiten. Eine sanfte Fahrweise reduziert die Belastung auf interne Bauteile erheblich.",
          },
          {
            title: "Nach dem Transport prüfen",
            text: "Bevor die Waschmaschine wieder in Betrieb genommen wird, prüfen Sie durch leichtes Schaukeln, ob die Trommel ungewöhnlich spielt, und führen Sie einen Kurzlauf ohne Wäsche durch. Achten Sie auf ungewöhnliche Geräusche oder Vibrationen.",
          },
        ],
      },
    ],
  },
  {
    id: "maschine-stinkt",
    question: "Waschmaschine stinkt / Wäsche stinkt",
    lead: "Diese Ursachen stecken hinter muffigem Geruch aus Maschine oder Wäsche.",
    blocks: [
      {
        kind: "list",
        items: [
          "Schimmel & Biofilm in Türmanschette, Trommel oder Waschmittelschublade",
          "Waschmittelreste durch zu viel oder falsches Waschmittel und zu niedrige Temperaturen",
          "Verstopftes Flusensieb oder Ablaufschlauch mit Rückständen",
          "Kalkablagerungen, die Bakteriennester fördern",
          "Feucht eingesetzte Maschine (Tür dauerhaft geschlossen nach dem Waschgang)",
          "Defekte Dichtung / stehendes Wasser in der Gummimanschette",
          "Unvollständiger Abfluss durch Rückstau oder Schmutz",
        ],
      },
    ],
  },
  {
    id: "zieht-kein-wasser",
    question: "Waschmaschine zieht kein Wasser",
    lead: "Kommt kein Wasser in die Maschine, prüfen Sie Zulauf und Siebe in dieser Reihenfolge.",
    blocks: [
      {
        kind: "steps",
        items: [
          { text: "Netzstecker ziehen. Sicherheit zuerst." },
          { text: "Wasserhahn voll öffnen und kurz in einen Eimer laufen lassen (Druckcheck)." },
          { text: "Zulaufschlauch prüfen: Knicke und Quetschungen beseitigen." },
          { text: "Zulaufsieb reinigen: Schlauch am Hahn lösen, Siebchen entnehmen, durchspülen." },
          { text: "Aquastop-Schlauch visuell prüfen (ggf. klickt er oder ist gesperrt) – bei Verdacht Fachservice rufen." },
        ],
      },
      {
        kind: "note",
        text: "Hinweis: Arbeiten an Aquastop, Magnetventil und Elektrik erfordern Fachwissen. Bei Unsicherheit unseren 24/7-Notdienst kontaktieren.",
      },
    ],
  },
  {
    id: "reparatur-kosten",
    question: "Waschmaschine Reparatur Kosten",
    lead: "Typische Defekte und ungefähre Kosten – als Orientierung für die Entscheidung zwischen Reparatur und Neukauf.",
    blocks: [
      {
        kind: "table",
        columns: ["Defekt", "Kosten (inkl. Teile & Arbeit)", "Bemerkung"],
        rows: [
          ["Flusensieb / Ablaufprobleme", "ab ca. 80–150 €", "Verstopfung entfernen, Dichtung prüfen"],
          ["Laugenpumpe / Ablaufpumpe", "100–250 €", "Pumpentausch, abhängig vom Modell"],
          ["Steuerplatine / Elektronik", "150–350 €", "Komplexer, häufig teurer Ersatz"],
          ["Trommellager / Lagerwechsel", "150–300 €", "Arbeitsintensiv, oft Grenze zur Neuanschaffung"],
          ["Türdichtung / Manschette", "80–160 €", "Einfacher Tausch, häufige Ursache für Lecks"],
        ],
      },
    ],
  },
  {
    id: "gummidichtung-reinigen",
    question: "Gummidichtung reinigen / Pumpe reinigen",
    lead: "Die Türmanschette ist der häufigste Schimmelherd – so wird sie richtig sauber.",
    blocks: [
      {
        kind: "steps",
        items: [
          {
            title: "Maschine vorbereiten",
            text: "Schalten Sie die Waschmaschine aus und ziehen Sie den Netzstecker. Öffnen Sie die Tür und ziehen Sie die Gummidichtung leicht zurück, um die Falten und Vertiefungen sichtbar zu machen.",
          },
          {
            title: "Groben Schmutz entfernen",
            text: "Entfernen Sie sichtbare Ablagerungen, Haare oder Flusen mit einem weichen Tuch oder einer kleinen Bürste.",
          },
          {
            title: "Schimmel und Ablagerungen behandeln",
            text: "Verwenden Sie ein mildes Desinfektionsmittel, Essigwasser oder spezielle Maschinenreiniger, um Schimmel und Bakterien zu beseitigen. Alle Falten und Vertiefungen gründlich abwischen. Achtung: Essig nur gelegentlich verwenden, um die Dichtungen zu schonen.",
          },
          {
            title: "Trocknen und lüften",
            text: "Nach der Reinigung die Gummidichtung gründlich trocken wischen. Tür und Waschmittelschublade offen lassen, damit Restfeuchtigkeit entweichen kann und Schimmel erst gar nicht entsteht.",
          },
        ],
      },
      {
        kind: "list",
        title: "Regelmäßige Pflege",
        items: [
          "Einmal pro Monat einen heißen Waschgang ohne Wäsche (60 °C) durchführen.",
          "Tür nach jedem Waschgang offen lassen.",
          "Flusensieb regelmäßig reinigen.",
          "Nur die empfohlene Menge Waschmittel verwenden.",
        ],
      },
    ],
  },
  {
    id: "pumpe-reinigen",
    question: "Waschmaschine Pumpe reinigen",
    lead: "Fremdkörper im Pumpenrad blockieren das Abpumpen – so machen Sie die Pumpe wieder frei.",
    blocks: [
      {
        kind: "steps",
        items: [
          {
            title: "Strom trennen & Wasser ablassen",
            text: "Gerät vom Netz nehmen und Wasser durch Öffnen des Flusensieb-Deckels in ein Gefäß ablaufen lassen.",
          },
          {
            title: "Flusensieb ausbauen",
            text: "Sieb gegen den Uhrzeigersinn herausdrehen, Rückstände und Ablagerungen entfernen.",
          },
          {
            title: "Pumpe öffnen",
            text: "Mit einem Schraubendreher oder Inbusschlüssel die Abdeckung der Pumpe lösen. Vorsicht vor scharfen Kanten.",
          },
          {
            title: "Fremdkörper entfernen",
            text: "Pumpenrad von Flusen, Münzen, Knöpfen und anderen Rückständen befreien.",
          },
          {
            title: "Pumpe testen",
            text: "Nach der Reinigung das Pumpenrad von Hand drehen – es muss leichtgängig laufen.",
          },
          {
            title: "Alles wieder montieren",
            text: "Abdeckung und Flusensieb fest anbauen, Wasserzulauf wieder anschließen und Probelauf starten.",
          },
          {
            title: "Abpumpfunktion prüfen",
            text: "Kurzprogramm ohne Wäsche durchführen und auf korrekten Abfluss achten.",
          },
        ],
      },
    ],
  },
  {
    id: "flusensieb-reinigen",
    question: "Flusensieb Waschmaschine reinigen",
    lead: "Alle zwei bis drei Monate reinigen – das beugt Abpumpproblemen zuverlässig vor.",
    blocks: [
      {
        kind: "steps",
        items: [
          { text: "Maschine ausschalten und vom Strom trennen." },
          {
            text: "Wasser ablassen: Eine Schale unterstellen, Serviceklappe öffnen und langsam das Flusensieb lösen, damit Restwasser kontrolliert abläuft.",
          },
          { text: "Flusensieb entnehmen und unter fließendem Wasser reinigen. Fusseln, Münzen oder Haare entfernen." },
          { text: "Innenraum überprüfen: Blick in den Pumpensumpf – Fremdkörper entfernen." },
          { text: "Dichtung kontrollieren und das Sieb wieder einsetzen, dabei auf festen Sitz achten." },
          { text: "Probelauf starten (kurzer Abpumpzyklus ohne Wäsche), um die Funktion zu prüfen." },
        ],
      },
    ],
  },
  {
    id: "waesche-stinkt",
    question: "Wäsche stinkt nach dem Waschen",
    lead: "Riecht die Wäsche trotz Waschgang muffig, hilft diese Reihenfolge dauerhaft.",
    blocks: [
      {
        kind: "steps",
        items: [
          {
            title: "Waschmaschine gründlich reinigen",
            text: "Führen Sie einen Reinigungszyklus bei mindestens 60 °C ohne Wäsche durch. Verwenden Sie dafür entweder einen spezialisierten Maschinenreiniger oder schonend Zitronensäure bzw. Essigessenz (nicht zu häufig, um Dichtungen zu schonen). Anschließend einen zusätzlichen Spülgang laufen lassen.",
          },
          {
            title: "Türmanschette & Dichtungen säubern",
            text: "Ziehen Sie die Gummidichtung zurück und reinigen Sie alle Falten mit einem milden Reinigungsmittel oder einer Mischung aus Wasser und Essig. Trocknen Sie anschließend gründlich, damit keine Restfeuchte verbleibt.",
          },
          {
            title: "Waschmittelschublade reinigen",
            text: "Entnehmen Sie die Schublade und entfernen Sie Rückstände von Waschmittel und Weichspüler. Reinigen Sie mit warmem Wasser und einer Bürste, anschließend gut trocknen lassen.",
          },
          {
            title: "Flusensieb & Ablaufsystem prüfen",
            text: "Reinigen Sie das Flusensieb regelmäßig. Prüfen Sie, ob Abfluss und Siphon frei sind, damit kein Wasser mit Rückständen stehen bleibt.",
          },
          {
            title: "Wäsche korrekt waschen",
            text: "Sortieren Sie nach Farben und Material, dosieren Sie Waschmittel nach Wasserhärte und Verschmutzungsgrad, und wählen Sie bei stärkerer Verschmutzung höhere Temperaturen. Vermeiden Sie eine Überladung der Trommel.",
          },
          {
            title: "Maschine nach dem Waschgang lüften",
            text: "Lassen Sie Tür und Waschmittelschublade offen, damit Restfeuchte entweichen kann und kein Nährboden für Schimmel entsteht.",
          },
        ],
      },
    ],
  },
  {
    id: "schleudert-nicht",
    question: "Waschmaschine schleudert nicht",
    lead: "Von der Unwucht bis zum Fehlercode – diese Punkte klären das Schleuderproblem.",
    blocks: [
      {
        kind: "steps",
        items: [
          {
            title: "Unwucht ausgleichen",
            text: "Öffnen Sie die Trommel und verteilen Sie die Wäsche gleichmäßig. Entfernen Sie ein oder zwei Teile, wenn die Maschine zu voll ist.",
          },
          {
            title: "Flusensieb & Ablaufschlauch prüfen",
            text: "Säubern Sie das Flusensieb und entfernen Sie Fremdkörper aus Ablaufschlauch und Siphon, damit das Wasser vollständig abgepumpt werden kann.",
          },
          {
            title: "Türverriegelung kontrollieren",
            text: "Stellen Sie sicher, dass die Tür fest schließt. Ersetzen Sie bei Bedarf das Türschloss oder den Verriegelungsmechanismus.",
          },
          {
            title: "Keilriemen & Lager prüfen",
            text: "Sichtprüfung des Keilriemens auf Risse und korrekte Spannung; überprüfen Sie die Trommellager auf ungewöhnliche Geräusche.",
          },
          {
            title: "Elektronik & Fehlermeldungen",
            text: "Lesen Sie angezeigte Fehlercodes (z. B. E10, E20) in der Bedienungsanleitung nach und setzen Sie die Steuerung zurück oder rufen Sie den Techniker.",
          },
        ],
      },
    ],
  },
];

/**
 * Anleitung als Fließtext – für das FAQPage-Schema, das nur reinen Text kennt.
 */
export function guideToPlainText(guide: RepairGuide): string {
  const parts: string[] = [];
  if (guide.lead) parts.push(guide.lead);

  for (const block of guide.blocks) {
    if (block.kind === "steps") {
      if (block.title) parts.push(`${block.title}:`);
      parts.push(
        block.items
          .map((item, index) => `${index + 1}. ${item.title ? `${item.title}: ` : ""}${item.text}`)
          .join(" "),
      );
    } else if (block.kind === "list") {
      if (block.title) parts.push(`${block.title}:`);
      parts.push(block.items.join(" "));
    } else if (block.kind === "table") {
      parts.push(block.rows.map((row) => `${row[0]}: ${row[1]} (${row[2]})`).join(" "));
    } else {
      parts.push(block.text);
    }
  }

  return parts.join(" ");
}
