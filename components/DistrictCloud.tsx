"use client";

import { useState, type CSSProperties } from "react";
import { MapPin } from "lucide-react";

import { districtRegions, districts } from "@/lib/business";

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
        {activeRegion.districts.map((district, index) => (
          <li className="district-chip" style={{ "--chip-index": index } as CSSProperties} key={district}>
            {district}
          </li>
        ))}
      </ul>

      {/* Die uebrigen Gruppen bleiben fuer Suchmaschinen und Screenreader im Markup. */}
      <p className="sr-only">
        Weitere Bezirke im Einsatzgebiet:{" "}
        {districtRegions
          .filter((region) => region.id !== activeRegion.id)
          .flatMap((region) => region.districts)
          .join(", ")}
        .
      </p>

      <p className="chip-list__note">Ihr Ortsteil ist nicht aufgeführt? Fragen Sie uns – wir fahren im gesamten Stadtgebiet.</p>
    </div>
  );
}
