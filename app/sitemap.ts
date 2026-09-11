import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/business";
import { districtLocations, districtPath } from "@/lib/districtLocations";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/leistungen`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/waschmaschinen-reparatur-berlin`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/einsatzgebiet-berlin`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    // Die Geraeteseiten - jede mit eigenem Canonical und eigenem Service-Schema.
    { url: `${siteUrl}/Afwasmachine`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/Koelkast`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/Magnetron`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/Koffiezetapparaat`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/TV`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/Sprekerstudio`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/satellitenanlage`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/gastronomiegeraete`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/trockner`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    // Die elf Bezirksseiten kommen aus derselben Liste wie die Seiten selbst.
    ...districtLocations.map((district) => ({
      url: `${siteUrl}${districtPath(district)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${siteUrl}/agb`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/impressum`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${siteUrl}/datenschutz`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
