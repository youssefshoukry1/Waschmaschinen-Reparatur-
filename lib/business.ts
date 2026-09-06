/**
 * Single source of truth for every business detail shown on the website.
 *
 * All values marked TODO_ must be replaced with the real company data before
 * going live. No component hardcodes contact data — editing this file is
 * enough to update the header, hero, footer, legal pages, structured data,
 * sitemap and the WhatsApp widget.
 */

/**
 * The public canonical URL used in metadata, sitemaps, and structured data.
 * Configure NEXT_PUBLIC_SITE_URL for each deployment/template consumer.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.TODO-DOMAIN.de"
).replace(/\/$/, "");

export const business = {
  name: "TODO_FIRMENNAME",
  legalName: "TODO_RECHTLICHER_NAME",
  /** Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV. */
  owner: "TODO_INHABER",
  description:
    "Waschmaschinen Reparatur in Berlin – direkt bei Ihnen vor Ort. Kostenvoranschlag vor Ort, 36 Monate Garantie auf die Reparatur.",
  email: "TODO@example.de",
  /** E.164 für tel:-Links. */
  telephone: "+4930000000",
  /** Menschenlesbare Schreibweise für die Anzeige. */
  telephoneDisplay: "030 000000",
  /** Nur Ziffern, ohne +, für wa.me-Links. */
  whatsapp: "4930000000",
  address: {
    streetAddress: "TODO Straße 1",
    postalCode: "10115",
    addressLocality: "Berlin",
    addressCountry: "DE",
  },
  /** Umsatzsteuer-Identifikationsnummer nach § 27a UStG. Leer lassen, wenn stattdessen die Steuernummer angegeben wird. */
  vatId: "TODO_USTIDNR",
  /** Steuernummer. Leer lassen, wenn eine USt-IdNr. vorliegt. */
  taxNumber: "",
  /** Handelsregister – nur bei GmbH/UG/OHG etc. Auf null setzen, wenn kein Registereintrag besteht. */
  registry: {
    court: "TODO_REGISTERGERICHT",
    number: "TODO_HRB",
  } as { court: string; number: string } | null,
  chamber: {
    name: "Handwerkskammer Berlin",
    memberNumber: "TODO_BETRIEBSNUMMER",
  },
  /** Gründungsjahr – erscheint im Abschnitt „Über uns“. */
  foundedYear: 1989,
  /** Erfahrung in Jahren, wie in der Außendarstellung kommuniziert. */
  experienceYears: 33,
  /** Garantie auf die durchgeführte Reparatur, in Monaten. */
  warrantyMonths: 36,
  financing: {
    partner: "Santander Consumer Bank",
    interestRate: 0,
    maxMonths: 48,
  },
  serviceAreas: ["Berlin"],
} as const;

export const publicServices = [
  "Waschmaschinen Reparatur",
  "Kühlschrank Reparatur",
  "Spülmaschinen Reparatur",
  "Trockner Reparatur",
  "Herd- & Backofen Reparatur",
  "Kaffeemaschinen Reparatur",
  "TV & Elektronik Reparatur",
] as const;

/** Typische Defekte, die vor Ort behoben werden. */
export const commonDefects = [
  "Maschine pumpt kein Wasser ab",
  "Trommel dreht sich nicht",
  "Fehlercode im Display",
  "Wasseraustritt und undichte Stellen",
  "Schleudergang funktioniert nicht",
  "Maschine heizt nicht mehr",
  "Laute Geräusche beim Schleudern",
  "Tür oder Bullauge lässt sich nicht öffnen",
] as const;

/** Unterstützte Hersteller. */
export const brands = [
  "Miele",
  "Bosch",
  "Siemens",
  "Samsung",
  "LG",
  "AEG",
  "Bauknecht",
  "Beko",
  "Whirlpool",
  "Zanussi",
  "Gorenje",
  "Privileg",
] as const;

/** Berliner Bezirke und Ortsteile im Einsatzgebiet. */
export const districts = [
  "Mitte",
  "Pankow",
  "Prenzlauer Berg",
  "Neukölln",
  "Friedrichshain",
  "Kreuzberg",
  "Charlottenburg",
  "Wilmersdorf",
  "Schöneberg",
  "Tempelhof",
  "Steglitz",
  "Zehlendorf",
  "Spandau",
  "Reinickendorf",
  "Lichtenberg",
  "Marzahn-Hellersdorf",
  "Treptow-Köpenick",
  "Wedding",
] as const;
