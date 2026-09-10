/**
 * Die elf Bezirks-Landingpages.
 *
 * Eine Zeile pro Standort - Route (`/berlin-<slug>`), Adresse, Metadaten und
 * Hero-Text stehen ausschliesslich hier. Die Seiten unter `app/berlin-...` sind
 * nur noch duenne Huellen um `DistrictLocationPage`, und die Sitemap liest
 * dieselbe Liste.
 *
 * Wichtig fuer die lokale Suche: Titel, Description und Einleitung sind pro
 * Bezirk unterschiedlich formuliert. Elf nahezu identische Seiten wuerden von
 * Google als Duplicate Content zusammengefasst und fielen aus dem Index.
 */

export type DistrictLocation = {
  /** Ergibt die Route: "prenzlauer-berg" -> /berlin-prenzlauer-berg */
  slug: string;
  /** Bezirksname, wie er im Fliesstext erscheint. */
  name: string;
  /** Leer, wenn fuer den Standort noch keine Adresse vorliegt (Hellersdorf). */
  streetAddress: string;
  /** Leer, wenn keine Strassenadresse vorliegt. */
  postalCode: string;
  /** Die Einzugsgebiet-Zeile unter der Adresse. */
  areaLine: string;
  metaTitle: string;
  metaDescription: string;
  /** Kicker ueber der Ueberschrift. */
  kicker: string;
  /** Erster Teil der H1. */
  titleLead: string;
  /** Zweiter, hervorgehobener Teil der H1. */
  titleEmphasis: string;
  /** Einleitungsabsatz im Hero. */
  intro: string;
  /** Optionaler Zusatz unter der Adresse. */
  extraNote?: string;
  /** Absatz zum Ladengeschaeft - bisher nur am Hauptstandort. */
  storeNote?: string;
  /** Kieze und Ortsteile - Keyword-Flaeche fuer die lokale Suche. */
  neighbourhoods: string[];
  /** Hero-Bild. Aktuell auf allen Bezirksseiten dasselbe - pro Standort ueberschreibbar. */
  heroImage: string;
};

export const districtLocations: DistrictLocation[] = [
  {
    slug: "prenzlauer-berg",
    name: "Prenzlauer Berg",
    streetAddress: "Greifswalder Str. 45",
    postalCode: "10405",
    areaLine: "10405 Berlin Prenzlauer Berg und Umgebung",
    metaTitle: "Haushaltsgeräte Reparatur Berlin Prenzlauer Berg – schnell & zuverlässig",
    metaDescription:
      "Haushaltsgeräte Reparatur in Berlin Prenzlauer Berg: Waschmaschine, Geschirrspüler, Kühlschrank, Trockner, Herd, Kaffeemaschine und Fernseher aller Marken. Originalteile, Festpreis, oft noch am selben Tag – Greifswalder Str. 45.",
    kicker: "Greifswalder Str. 45 · Prenzlauer Berg und Umgebung",
    titleLead: "Haushaltsgeräte Reparatur Berlin Prenzlauer Berg – ",
    titleEmphasis: "schnell & zuverlässig",
    intro:
      "Als lokaler Expertenservice für die Haushaltsgeräte Reparatur in Berlin Prenzlauer Berg bieten wir fachgerechte Reparaturen für Waschmaschinen, Geschirrspüler, Kühlschränke, Trockner, Herde, Kaffeemaschinen und Fernsehergeräte aller Marken. Wir verwenden originale Ersatzteile, arbeiten mit transparenten Festpreisen und sind oft noch am selben Tag bei Ihnen vor Ort.",
    storeNote:
      "Unser Reparaturdienst besteht aus einem sehr geräumigen Ladengeschäft, indem wir auch neue, und gebrauchte Haushaltsgeräte auch verschieden Ersatzteile verkaufen. Kommen Sie doch vorbei, Sie sind herzlich eingeladen. Wir freuen uns auf Ihren Besuch! Sie werden bei uns bestimmt finden was Sie suchen!",
    neighbourhoods: [
      "Kollwitzkiez",
      "Helmholtzplatz",
      "Bötzowviertel",
      "Winsviertel",
      "Thälmannpark",
      "Prenzlauer Allee",
      "Greifswalder Straße",
      "Schönhauser Allee",
    ],
    heroImage: "/images/img19.png",
  },
  {
    slug: "marzahn",
    name: "Marzahn",
    streetAddress: "Märkische Allee 176",
    postalCode: "12681",
    areaLine: "12681 Berlin Marzahn und Umgebung",
    metaTitle: "Marzahn Kundendienst Berlin – Haushaltsgeräte Reparatur vor Ort",
    metaDescription:
      "Haushaltsgeräte Reparatur in Berlin-Marzahn: Waschmaschine, Geschirrspüler, Kühlschrank, Trockner, Herd und Backofen. Transparente Kosten, qualifizierte Techniker, kurze Reaktionszeiten – Märkische Allee 176.",
    kicker: "Märkische Allee 176 · Marzahn und Umgebung",
    titleLead: "Marzahn Kundendienst Berlin – ",
    titleEmphasis: "Haushaltsgeräte Reparatur vor Ort",
    intro:
      "Als regionaler Fachbetrieb für Haushaltsgeräte Reparatur in Berlin-Marzahn helfen wir schnell und zuverlässig bei defekten Waschmaschinen, Geschirrspülern, Kühlschränken, Trocknern, Herden, Backöfen und weiteren Geräten. Transparente Kosten, qualifizierte Techniker und kurze Reaktionszeiten – direkt bei Ihnen vor Ort.",
    neighbourhoods: [
      "Marzahn-Nord",
      "Marzahn-Mitte",
      "Marzahn-Süd",
      "Springpfuhl",
      "Ahrensfelder Berge",
      "Marzahner Promenade",
      "Landsberger Allee",
      "Alt-Marzahn",
    ],
    heroImage: "/images/img19.png",
  },
  {
    slug: "hellersdorf",
    name: "Hellersdorf",
    streetAddress: "",
    postalCode: "",
    areaLine: "Berlin Hellersdorf und Umgebung",
    metaTitle: "Haushaltsgeräte Reparatur Berlin Hellersdorf – Techniker vor Ort",
    metaDescription:
      "Gerät defekt in Berlin-Hellersdorf? Wir reparieren Waschmaschine, Trockner, Kühlschrank, Geschirrspüler, Herd und Kaffeemaschine bei Ihnen zu Hause – zum Festpreis und meist beim ersten Termin.",
    kicker: "Reparaturdienst für Hellersdorf und Umgebung",
    titleLead: "Haushaltsgeräte Reparatur in ",
    titleEmphasis: "Berlin Hellersdorf",
    intro:
      "Vom Cecilienplatz bis zur Hellen Mitte sind wir für Sie unterwegs: Wir reparieren Trockner, Waschmaschinen, Kühl- und Gefriergeräte, Geschirrspüler, Herde und Kaffeevollautomaten aller Hersteller – bei Ihnen zu Hause, mit gängigen Ersatzteilen im Servicewagen und einem Festpreis, den Sie vor Beginn der Arbeit kennen.",
    extraNote:
      "Termine in Hellersdorf vereinbaren Sie telefonisch – unser Techniker kommt aus dem benachbarten Marzahn zu Ihnen.",
    neighbourhoods: [
      "Helle Mitte",
      "Kaulsdorf-Nord",
      "Hellersdorf-Ost",
      "Hellersdorf-Süd",
      "Boulevard Kastanienallee",
      "Cecilienplatz",
      "Gülzower Straße",
      "Louis-Lewin-Straße",
    ],
    heroImage: "/images/img19.png",
  },
  {
    slug: "koepenick",
    name: "Köpenick",
    streetAddress: "Müggelheimer Str. 29",
    postalCode: "12555",
    areaLine: "12555 Berlin Köpenick und Umgebung",
    metaTitle: "Haushaltsgeräte Reparatur Berlin Köpenick – Kundendienst vor Ort",
    metaDescription:
      "Reparaturdienst für Haushaltsgeräte in Berlin-Köpenick: Waschmaschine, Kühlschrank, Geschirrspüler, Trockner, Herd und Fernseher. Originalteile, Festpreis, Termin oft am selben Tag – Müggelheimer Str. 29.",
    kicker: "Müggelheimer Str. 29 · Köpenick und Umgebung",
    titleLead: "Haushaltsgeräte Reparatur in ",
    titleEmphasis: "Berlin Köpenick",
    intro:
      "Unser Standort in der Müggelheimer Straße liegt mitten in der Altstadt Köpenick – die Wege zu Ihnen sind entsprechend kurz. Wir setzen Waschmaschinen, Kühl- und Gefrierschränke, Geschirrspüler, Trockner, Herde und Fernseher aller Marken instand, mit originalen Ersatzteilen und einem verbindlichen Festpreis statt Stundenabrechnung.",
    neighbourhoods: [
      "Altstadt Köpenick",
      "Friedrichshagen",
      "Müggelheim",
      "Grünau",
      "Wendenschloß",
      "Rahnsdorf",
      "Bohnsdorf",
      "Allende-Viertel",
    ],
    heroImage: "/images/img19.png",
  },
  {
    slug: "zehlendorf",
    name: "Zehlendorf",
    streetAddress: "Hindenburgdamm 95",
    postalCode: "12203",
    areaLine: "12203 Berlin Zehlendorf und Umgebung",
    metaTitle: "Haushaltsgeräte Reparatur Berlin Zehlendorf – Service beim Kunden",
    metaDescription:
      "Haushaltsgeräte Reparatur in Berlin-Zehlendorf: Waschmaschine, Trockner, Kühlschrank, Geschirrspüler, Herd, Backofen und Kaffeemaschine. Diagnose vor Ort, Festpreis vorab – Hindenburgdamm 95.",
    kicker: "Hindenburgdamm 95 · Zehlendorf und Umgebung",
    titleLead: "Haushaltsgeräte Reparatur in ",
    titleEmphasis: "Berlin Zehlendorf",
    intro:
      "Ob Einbaugerät in der Altbauküche oder freistehende Maschine im Souterrain: In Zehlendorf reparieren wir Waschmaschinen, Wäschetrockner, Kühl- und Gefrierschränke, Geschirrspüler, Herde, Backöfen und Kaffeevollautomaten direkt bei Ihnen zu Hause. Sie erfahren den Festpreis nach der Diagnose – und entscheiden erst danach.",
    neighbourhoods: [
      "Zehlendorf-Mitte",
      "Schlachtensee",
      "Nikolassee",
      "Wannsee",
      "Dahlem",
      "Düppel",
      "Onkel Toms Hütte",
      "Krumme Lanke",
    ],
    heroImage: "/images/img19.png",
  },
  {
    slug: "reinickendorf",
    name: "Reinickendorf",
    streetAddress: "Eichborndamm 289",
    postalCode: "13437",
    areaLine: "13437 Berlin Reinickendorf und Umgebung",
    metaTitle: "Haushaltsgeräte Reparatur Berlin Reinickendorf – Techniker aus dem Bezirk",
    metaDescription:
      "Reparaturdienst für Haushaltsgeräte in Berlin-Reinickendorf. Unsere Techniker kommen direkt aus Reinickendorf zu Ihnen: Waschmaschine, Kühlschrank, Geschirrspüler, Trockner und Herd – Eichborndamm 289.",
    kicker: "Eichborndamm 289 · Reinickendorf und Umgebung",
    titleLead: "Haushaltsgeräte Reparatur in ",
    titleEmphasis: "Berlin Reinickendorf",
    intro:
      "Am Eichborndamm sind wir im Bezirk zu Hause – das merken Sie an der Anfahrtszeit. Wir reparieren Waschmaschinen, Geschirrspüler, Kühl- und Gefriergeräte, Trockner, Herde und Kaffeemaschinen aller Hersteller vor Ort, mit originalen Ersatzteilen und transparenten Festpreisen ohne versteckte Zuschläge.",
    extraNote: "Unsere Techniker kommen direkt aus Reinickendorf zu Ihnen!",
    neighbourhoods: [
      "Wittenau",
      "Tegel",
      "Waidmannslust",
      "Hermsdorf",
      "Frohnau",
      "Borsigwalde",
      "Märkisches Viertel",
      "Lübars",
    ],
    heroImage: "/images/img19.png",
  },
  {
    slug: "mitte",
    name: "Mitte",
    streetAddress: "Utrechter Str. 48",
    postalCode: "13347",
    areaLine: "13347 Berlin Mitte und Umgebung",
    metaTitle: "Haushaltsgeräte Reparatur Berlin Mitte – Kundendienst vor Ort",
    metaDescription:
      "Haushaltsgeräte Reparatur in Berlin Mitte: Waschmaschine, Kühlschrank, Geschirrspüler, Trockner, Herd, Kaffeemaschine und Fernseher aller Marken. Festpreis, Originalteile, oft noch am selben Tag – Utrechter Str. 48.",
    kicker: "Utrechter Str. 48 · Berlin Mitte und Umgebung",
    titleLead: "Haushaltsgeräte Reparatur in ",
    titleEmphasis: "Berlin Mitte",
    intro:
      "Vom Wedding bis zum Alexanderplatz: In Berlin Mitte reparieren wir Waschmaschinen, Kühlschränke, Geschirrspüler, Trockner, Herde, Kaffeemaschinen und Fernseher aller Marken direkt in Ihrer Wohnung. Enge Treppenhäuser und Einbauküchen sind für unsere Techniker Alltag – die meisten Geräte laufen schon beim ersten Termin wieder.",
    neighbourhoods: [
      "Wedding",
      "Gesundbrunnen",
      "Moabit",
      "Tiergarten",
      "Hansaviertel",
      "Alexanderplatz",
      "Rosenthaler Platz",
      "Leopoldplatz",
    ],
    heroImage: "/images/img19.png",
  },
  {
    slug: "lichtenberg",
    name: "Lichtenberg",
    streetAddress: "Landsberger Allee 12",
    postalCode: "10249",
    areaLine: "10249 Berlin Lichtenberg und Umgebung",
    metaTitle: "Haushaltsgeräte Reparatur Berlin Lichtenberg – schnell vor Ort",
    metaDescription:
      "Gerät defekt in Berlin-Lichtenberg? Wir reparieren Waschmaschine, Trockner, Kühlschrank, Geschirrspüler und Herd bei Ihnen zu Hause – Festpreis vorab, Originalteile, Termin oft am selben Tag.",
    kicker: "Landsberger Allee 12 · Lichtenberg und Umgebung",
    titleLead: "Haushaltsgeräte Reparatur in ",
    titleEmphasis: "Berlin Lichtenberg",
    intro:
      "Pumpt die Waschmaschine nicht mehr ab, taut der Kühlschrank auf oder bleibt der Geschirrspüler mit Fehlercode stehen? In Lichtenberg stellen wir die Ursache bei Ihnen vor Ort fest, nennen Ihnen den Festpreis und reparieren in den meisten Fällen sofort – mit gängigen Ersatzteilen aus dem Servicewagen.",
    neighbourhoods: [
      "Rummelsburg",
      "Karlshorst",
      "Friedrichsfelde",
      "Fennpfuhl",
      "Alt-Hohenschönhausen",
      "Neu-Hohenschönhausen",
      "Falkenberg",
      "Weitlingkiez",
    ],
    heroImage: "/images/img19.png",
  },
  {
    slug: "friedrichshain",
    name: "Friedrichshain",
    streetAddress: "Frankfurter Allee 35",
    postalCode: "10247",
    areaLine: "10247 Berlin Friedrichshain und Umgebung",
    metaTitle: "Haushaltsgeräte Reparatur Berlin Friedrichshain – Service beim Kunden",
    metaDescription:
      "Haushaltsgeräte Reparatur in Berlin-Friedrichshain: Waschmaschine, Kühlschrank, Geschirrspüler, Trockner, Herd und Kaffeevollautomat. Transparente Festpreise, Originalteile, kurze Wege – Frankfurter Allee 35.",
    kicker: "Frankfurter Allee 35 · Friedrichshain und Umgebung",
    titleLead: "Haushaltsgeräte Reparatur in ",
    titleEmphasis: "Berlin Friedrichshain",
    intro:
      "Unser Standort an der Frankfurter Allee liegt mitten im Kiez – zwischen Boxhagener Platz und Ostkreuz sind wir in wenigen Minuten bei Ihnen. Wir reparieren Waschmaschinen, Kühl- und Gefriergeräte, Geschirrspüler, Trockner, Herde und Kaffeevollautomaten aller Marken, zum Festpreis und mit originalen Ersatzteilen.",
    neighbourhoods: [
      "Boxhagener Platz",
      "Samariterviertel",
      "Ostkreuz",
      "Rigaer Straße",
      "Frankfurter Tor",
      "Stralauer Kiez",
      "Warschauer Straße",
      "Traveplatz",
    ],
    heroImage: "/images/img19.png",
  },
  {
    slug: "pankow",
    name: "Pankow",
    streetAddress: "Provinzstraße 74",
    postalCode: "13158",
    areaLine: "13158 Berlin Pankow und Umgebung",
    metaTitle: "Haushaltsgeräte Reparatur Berlin Pankow – Kundendienst vor Ort",
    metaDescription:
      "Reparaturdienst für Haushaltsgeräte in Berlin-Pankow: Waschmaschine, Trockner, Kühlschrank, Geschirrspüler, Herd und Backofen. Diagnose vor Ort, Festpreis vorab, Originalteile – Provinzstraße 74.",
    kicker: "Provinzstraße 74 · Pankow und Umgebung",
    titleLead: "Haushaltsgeräte Reparatur in ",
    titleEmphasis: "Berlin Pankow",
    intro:
      "Von Niederschönhausen bis Buch sind wir im Bezirk unterwegs. Waschmaschine, Wäschetrockner, Kühl- und Gefrierschrank, Geschirrspüler, Herd oder Backofen: Wir prüfen das Gerät bei Ihnen zu Hause, nennen Ihnen den Festpreis aus Arbeitsleistung und Ersatzteil – und reparieren meist direkt im selben Termin.",
    neighbourhoods: [
      "Niederschönhausen",
      "Buch",
      "Karow",
      "Blankenburg",
      "Französisch Buchholz",
      "Wilhelmsruh",
      "Rosenthal",
      "Heinersdorf",
    ],
    heroImage: "/images/img19.png",
  },
  {
    slug: "neukoelln",
    name: "Neukölln",
    streetAddress: "Karl-Marx-Straße 280-282",
    postalCode: "12057",
    areaLine: "12057 Berlin Neukölln und Umgebung",
    metaTitle: "Haushaltsgeräte Reparatur Berlin Neukölln – schnell & zum Festpreis",
    metaDescription:
      "Haushaltsgeräte Reparatur in Berlin-Neukölln: Waschmaschine, Kühlschrank, Geschirrspüler, Trockner, Herd, Kaffeemaschine und Fernseher. Festpreis vorab, Originalteile, Termin oft am selben Tag – Karl-Marx-Str. 280-282.",
    kicker: "Karl-Marx-Straße 280-282 · Neukölln und Umgebung",
    titleLead: "Haushaltsgeräte Reparatur in ",
    titleEmphasis: "Berlin Neukölln",
    intro:
      "Unser Standort an der Karl-Marx-Straße ist der kurze Weg zu Ihnen – ob Rixdorf, Schillerkiez oder Britz. Wir reparieren Waschmaschinen, Kühlschränke, Geschirrspüler, Trockner, Herde, Kaffeemaschinen und Fernseher aller Hersteller, mit originalen Ersatzteilen und einem Festpreis, den Sie vor Beginn der Reparatur kennen.",
    neighbourhoods: [
      "Rixdorf",
      "Schillerkiez",
      "Reuterkiez",
      "Britz",
      "Gropiusstadt",
      "Buckow",
      "Rudow",
      "Hermannplatz",
    ],
    heroImage: "/images/img19.png",
  },
];

/** Route einer Bezirksseite. */
export const districtPath = (district: DistrictLocation) => `/berlin-${district.slug}`;

/**
 * Standort per Slug. Wirft beim Build, wenn eine Seite auf einen Slug zeigt,
 * den es in der Liste nicht (mehr) gibt - so faellt ein Tippfehler sofort auf.
 */
export function getDistrict(slug: string): DistrictLocation {
  const district = districtLocations.find((entry) => entry.slug === slug);
  if (!district) throw new Error(`Unbekannter Bezirk: ${slug}`);
  return district;
}

/** Bezirksname -> Route, fuer die Chips im Einsatzgebiet. */
export const districtPathByName = new Map(
  districtLocations.map((district) => [district.name, districtPath(district)]),
);
