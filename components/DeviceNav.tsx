"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/** Die sieben Geraeteseiten in der Reihenfolge, in der sie im Hero stehen. */
const devices = [
  ["/leistungen", "Waschmaschine"],
  ["/Afwasmachine", "Spülmaschine"],
  ["/Koelkast", "Kühlschrank"],
  ["/Magnetron", "Mikrowelle"],
  ["/Koffiezetapparaat", "Kaffeemaschine"],
  ["/TV", "Fernseher"],
  ["/Sprekerstudio", "Lautsprecher"],
] as const;

/**
 * Kleine Pillen-Navigation unter dem Hero-CTA. Die aktive Seite kommt aus dem
 * Pfad, deshalb braucht die Komponente auf keiner Seite eigene Props. Die
 * Liste laeuft ueber flex-wrap - alle sieben Eintraege bleiben damit auf jeder
 * Breite sichtbar, ohne horizontales Scrollen.
 */
export default function DeviceNav() {
  const pathname = usePathname();

  return (
    <nav className="device-nav" aria-label="Weitere Geräte">
      <ul className="device-nav__list">
        {devices.map(([href, label]) => {
          const active = pathname === href;
          return (
            <li key={href}>
              <Link
                className={`device-nav__pill${active ? " is-active" : ""}`}
                href={href}
                aria-current={active ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
