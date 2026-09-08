import type { CSSProperties } from "react";

import { brandLogos } from "@/lib/business";

/**
 * Feintuning einzelner Logos, die optisch aus der Reihe fallen – gleiche Werte
 * wie im waagerechten Laufband, damit beide Varianten identisch wirken.
 */
const LOGO_SCALE: Record<string, number> = { Miele: .82, Beko: 1.1, LG: 1.05 };

/**
 * Drei Kopien: die Schleife verschiebt sich um genau ein Drittel der Spurhoehe,
 * dadurch springt sie nahtlos zurueck, ohne dass etwas gemessen werden muss.
 * Zwei Kopien wuerden auf hohen Bildschirmen eine Luecke zeigen.
 */
const COPIES = [0, 1, 2];

/**
 * Senkrechte Markenleiste am rechten Bildschirmrand: fest positioniert, ueber
 * die volle Viewport-Hoehe sichtbar, waehrend die Seite darunter scrollt.
 *
 * Bewusst ohne JavaScript – die Schleife laeuft als reine CSS-Animation auf
 * `transform`. Das laeuft im Compositor und belastet auch auf schwacher
 * Hardware den Hauptthread nicht. Auf Telefonen und Tablets blendet
 * `.brand-rail` die Leiste komplett aus.
 */
export default function BrandRail() {
  return (
    <aside className="brand-rail" aria-label="Marken, die wir reparieren">
      <div className="brand-rail__viewport">
        <ul className="brand-rail__track">
          {COPIES.map((copy) =>
            brandLogos.map((logo) => (
              <li
                className="brand-rail__item"
                key={`${copy}-${logo.name}`}
                // Nur die erste Kopie zaehlt fuer Screenreader.
                aria-hidden={copy > 0 || undefined}
              >
                {logo.src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={logo.src}
                    alt={copy === 0 ? logo.name : ""}
                    width={logo.width}
                    height={logo.height}
                    // Nicht lazy: die Spur laeuft per transform, dabei meldet
                    // der Lazy-Loader die tiefer liegenden Logos nicht
                    // zuverlaessig nach - sie blieben leer.
                    decoding="async"
                    draggable={false}
                    style={{ "--logo-scale": LOGO_SCALE[logo.name] ?? 1 } as CSSProperties}
                  />
                ) : (
                  <span className="brand-rail__wordmark">{logo.name}</span>
                )}
              </li>
            )),
          )}
        </ul>
      </div>
    </aside>
  );
}
