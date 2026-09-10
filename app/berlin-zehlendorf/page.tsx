import type { Metadata } from "next";

import DistrictLocationPage from "@/components/DistrictLocationPage";
import { districtPath, getDistrict } from "@/lib/districtLocations";

const district = getDistrict("zehlendorf");
const path = districtPath(district);

export const metadata: Metadata = {
  // Absolut: mit dem Marken-Suffix aus dem Layout liefe der Bezirks-Titel
  // ueber die in der Suche angezeigte Laenge hinaus.
  title: { absolute: district.metaTitle },
  description: district.metaDescription,
  alternates: { canonical: path },
  openGraph: {
    title: district.metaTitle,
    description: district.metaDescription,
    url: path,
    locale: "de_DE",
    type: "website",
  },
};

export default function Page() {
  return <DistrictLocationPage district={district} />;
}
