"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { districtRegions, districts } from "@/lib/business";
import { districtPathByName } from "@/lib/districtLocations";

/**
 * Einsatzgebiet kompakt: Statt einer 18 Chips langen Wolke - auf dem Handy
 * fuenf bis sechs Zeilen - sind die Bezirke nach Himmelsrichtung gruppiert.
 * Sichtbar sind immer nur die Chips einer Gruppe, hoechstens sechs.
 * Die Gruppenleiste selbst scrollt horizontal mit Snap statt umzubrechen.
 */
export default function DistrictCloud() {
  const [activeId, setActiveId] = useState<string>(districtRegions[0].id);
  const activeRegion = districtRegions.find((region) => region.id === activeId) ?? districtRegions[0];

  return (
    <div className="district-map">
      <div className="district-map__bar">
        <div className="district-map__tabs" role="group" aria-label="Einsatzgebiet nach Stadtteil filtern">
          {districtRegions.map((region) => (
            <button
              type="button"
              key={region.id}
              className={region.id === activeId ? "district-tab district-tab--active" : "district-tab"}
              aria-pressed={region.id === activeId}
              onClick={() => setActiveId(region.id)}
            >
              <span>{region.label}</span>
              <em>{region.districts.length}</em>
            </button>
          ))}
        </div>
        <p className="district-map__total">
          <MapPin aria-hidden="true" />
          {districts.length} Bezirke
        </p>
      </div>

      {/* key erzwingt ein Remount, damit die Chips bei jedem Gruppenwechsel neu einlaufen. */}
      <ul className="district-map__list" key={activeRegion.id} aria-live="polite">
        {activeRegion.districts.map((district, index) => {
          // Bezirke mit eigener Standortseite werden zum Link - der Pfeil macht
          // sichtbar, dass hinter dem Chip eine Seite steht. Die uebrigen
          // bleiben ein reiner Chip.
          const href = districtPathByName.get(district);
          return (
            <li
              className={href ? "district-chip district-chip--linked" : "district-chip"}
              style={{ "--chip-index": index } as CSSProperties}
              key={district}
            >
              {href ? (
                <Link href={href}>
                  {district}
                  <span aria-hidden="true">→</span>
                </Link>
              ) : (
                district
              )}
            </li>
          );
        })}
      </ul>

      {/* Die uebrigen Gruppen bleiben fuer Suchmaschinen und Screenreader im
          Markup. Bezirke mit eigener Seite stehen hier als echter Link, sonst
          waere von der Startseite aus immer nur die gerade aktive Gruppe
          verlinkt - Google saehe also nur einen einzigen Standort. */}
      <p className="sr-only">
        Weitere Bezirke im Einsatzgebiet:{" "}
        {districtRegions
          .filter((region) => region.id !== activeRegion.id)
          .flatMap((region) => region.districts)
          .map((district, index, all) => {
            const href = districtPathByName.get(district);
            return (
              <span key={district}>
                {/* tabIndex -1: der Absatz ist optisch versteckt, ohne das
                    waeren es unsichtbare Stationen in der Tab-Reihenfolge. */}
                {href ? (
                  <Link href={href} tabIndex={-1}>
                    {district}
                  </Link>
                ) : (
                  district
                )}
                {index < all.length - 1 ? ", " : "."}
              </span>
            );
          })}
      </p>

      <p className="chip-list__note">
        Ihr Ortsteil ist nicht aufgeführt? Fragen Sie uns – wir fahren im gesamten Stadtgebiet.
      </p>

      <Link className="district-map__all" href="/einsatzgebiet-berlin">
        Alle Standorte und Bezirksseiten ansehen <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}
