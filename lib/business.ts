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
  email: "kontakt@waschmaschinen-reparaturdienst-berlin.de",
  /** E.164 für tel:-Links. */
  telephone: "+493049854326",
  /** Menschenlesbare Schreibweise für die Anzeige. */
  telephoneDisplay: "030 49854326",
  /** Nur Ziffern, ohne +, für wa.me-Links. */
  whatsapp: "493049854326",
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
  /** Pauschale für Anfahrt + Kostenvoranschlag in Euro – ohne Wochenend- oder Feiertagszuschlag. */
  calloutFee: 5,
  financing: {
    partner: "Santander Consumer Bank",
    interestRate: 0,
    maxMonths: 48,
  },
  serviceAreas: ["Berlin"],
} as const;

/** Einzeilige Anschrift für Karten, Routenplaner und strukturierte Daten. */
export const fullAddress = `${business.address.streetAddress}, ${business.address.postalCode} ${business.address.addressLocality}`;

/** Google-Maps-Suche auf den Firmensitz – Ziel jedes „Routenplaner"-Links. */
export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

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

/** Ein Herstellerlogo in der Marken-Marquee. */
export type BrandLogo = {
  name: string;
  /** null -> wird als Text-Wortmarke gerendert (kein Logo vorhanden). */
  src: string | null;
  width: number;
  height: number;
};

/** Unterstützte Hersteller mit Logo (Maße stammen aus der viewBox der SVG). */
export const brandLogos: BrandLogo[] = [
  { name: "Miele", src: "/images/companies_svg/miele.svg", width: 100, height: 38.3 },
  { name: "Bosch", src: "/images/companies_svg/bosch.svg", width: 433, height: 97 },
  { name: "Siemens", src: "/images/companies_svg/siemens.svg", width: 302.4, height: 50 },
  { name: "Samsung", src: "/images/companies_svg/samsung.svg", width: 544.8, height: 83.4 },
  { name: "LG", src: "/images/companies_svg/lg.svg", width: 225, height: 99 },
  { name: "AEG", src: "/images/companies_svg/aeg.svg", width: 81, height: 30 },
  { name: "Bauknecht", src: "/images/companies_svg/bauknecht.svg", width: 246.78, height: 60 },
  { name: "Beko", src: "/images/companies_svg/beko.svg", width: 105, height: 60 },
  { name: "Whirlpool", src: "/images/companies_svg/whirlpool.svg", width: 1680, height: 559.56 },
  { name: "Zanussi", src: "/images/companies_svg/zanussi.svg", width: 148, height: 53 },
  { name: "Gorenje", src: "/images/companies_svg/gorenje.svg", width: 1480.55, height: 409.3 },
  { name: "Privileg", src: null, width: 0, height: 0 },
];

/** Nur die Markennamen - für Fließtext und strukturierte Daten. */
export const brands = brandLogos.map((logo) => logo.name);

/**
 * Einsatzgebiet nach Himmelsrichtung gruppiert. Die Website zeigt dadurch
 * immer nur eine handliche Gruppe statt aller 18 Chips auf einmal.
 * `districts` wird daraus abgeleitet - es gibt also nur diese eine Liste.
 */
export const districtRegions = [
  { id: "mitte", label: "Mitte & West", districts: ["Mitte", "Charlottenburg", "Wilmersdorf", "Spandau"] },
  { id: "nord", label: "Nord", districts: ["Pankow", "Prenzlauer Berg", "Reinickendorf", "Wedding"] },
  { id: "ost", label: "Ost", districts: ["Friedrichshain", "Lichtenberg", "Marzahn-Hellersdorf", "Treptow-Köpenick"] },
  { id: "sued", label: "Süd", districts: ["Neukölln", "Kreuzberg", "Tempelhof", "Schöneberg", "Steglitz", "Zehlendorf"] },
] as const;

/** Berliner Bezirke und Ortsteile im Einsatzgebiet. */
export const districts = districtRegions.flatMap((region) => region.districts);
