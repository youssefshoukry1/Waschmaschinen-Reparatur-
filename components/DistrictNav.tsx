"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { districtLocations, districtPath } from "@/lib/districtLocations";

/**
 * Pillen-Navigation ueber alle Bezirksseiten - gleiche Optik wie die DeviceNav
 * unter dem Hero der Geraeteseiten, deshalb dieselben Klassen.
 *
 * Zweck ist die interne Verlinkung: jede Bezirksseite verweist auf die zehn
 * anderen, sodass keine Seite verwaist im Index steht.
 */
export default function DistrictNav() {
  const pathname = usePathname();

  return (
    <nav className="device-nav" aria-label="Weitere Bezirke">
      <ul className="device-nav__list">
        {districtLocations.map((district) => {
          const href = districtPath(district);
          const active = pathname === href;
          return (
            <li key={district.slug}>
              <Link
                className={`device-nav__pill${active ? " is-active" : ""}`}
                href={href}
                aria-current={active ? "page" : undefined}
              >
                {district.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
