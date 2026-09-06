/**
 * The public canonical URL used in metadata, sitemaps, and structured data.
 * Configure NEXT_PUBLIC_SITE_URL for each deployment/template consumer.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.helferimalltagbarnim.de"
).replace(/\/$/, "");

export const business = {
  name: "Helfer im Alltag",
  legalName: "Helfer im Alltag – Markus Wilken",
  description:
    "Haushaltshilfe in Bernau bei Berlin im Umkreis von 20 km sowie Fenster- und Glasreinigung in Berlin und Brandenburg.",
  email: "helferimalltag1@gmail.com",
  telephone: "+4917646687719",
  address: {
    streetAddress: "Schönfelder Weg 71",
    postalCode: "16321",
    addressLocality: "Bernau bei Berlin",
    addressCountry: "DE",
  },
  serviceAreas: ["Bernau bei Berlin", "Berlin", "Brandenburg"],
  section45a: {
    isRecognized: true,
    reliefAmountMonthly: 131,
    reliefAmountCheckedAt: "2026-07-15",
    sourceUrl:
      "https://www.bundesgesundheitsministerium.de/pflege-zu-hause/weitere-leistungen-und-angebote-zur-unterstuetzung-im-alltag",
  },
} as const;

export const publicServices = [
  "Haushaltshilfe",
  "Unterstützung beim Einkaufen",
  "Begleitung im Alltag",
  "Alltagsnahe Unterstützung zu Hause",
] as const;
