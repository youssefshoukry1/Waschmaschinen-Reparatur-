"use client";

import { ExternalLink, MapPin, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

export const MAP_CONSENT_KEY = "helfer-im-alltag-google-maps-consent";
export const COOKIE_CONSENT_KEY = "helfer-im-alltag-cookie-consent";
const MAPS_URL = "https://www.google.com/maps/search/?api=1&query=Sch%C3%B6nfelder%20Weg%2071%2C%2016321%20Bernau%20bei%20Berlin";

export function MapConsent() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consentFrame = window.requestAnimationFrame(() => {
      setHasConsent(window.localStorage.getItem(MAP_CONSENT_KEY) === "granted");
    });

    const resetConsent = () => {
      window.localStorage.removeItem(MAP_CONSENT_KEY);
      window.localStorage.removeItem(COOKIE_CONSENT_KEY);
      setHasConsent(false);
      window.dispatchEvent(new Event("privacy-consent-updated"));
    };

    const enableMaps = () => setHasConsent(true);

    window.addEventListener("google-maps-consent-reset", resetConsent);
    window.addEventListener("google-maps-consent-granted", enableMaps);
    return () => {
      window.cancelAnimationFrame(consentFrame);
      window.removeEventListener("google-maps-consent-reset", resetConsent);
      window.removeEventListener("google-maps-consent-granted", enableMaps);
    };
  }, []);

  const grantConsent = () => {
    window.localStorage.setItem(MAP_CONSENT_KEY, "granted");
    window.localStorage.setItem(COOKIE_CONSENT_KEY, "maps");
    setHasConsent(true);
    window.dispatchEvent(new Event("privacy-consent-updated"));
  };

  return (
    <div className={`contact-map${hasConsent ? " is-loaded" : ""}`}>
      {hasConsent ? (
        <iframe
          src="https://www.google.com/maps?q=Sch%C3%B6nfelder%20Weg%2071%2C%2016321%20Bernau%20bei%20Berlin&output=embed"
          title="Standort von Helfer im Alltag in Bernau bei Berlin"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="contact-map__preview" aria-hidden="true">
          <span className="contact-map__preview-pin"><MapPin /></span>
          <span className="contact-map__road contact-map__road--one" />
          <span className="contact-map__road contact-map__road--two" />
          <span className="contact-map__road contact-map__road--three" />
        </div>
      )}

      {!hasConsent && (
        <div className="map-consent" role="region" aria-label="Einwilligung für Google Maps">
          <span className="map-consent__icon" aria-hidden="true"><MapPin /></span>
          <p className="map-consent__eyebrow"><ShieldCheck /> Datenschutz</p>
          <h3>Google Maps anzeigen</h3>
          <p>Beim Laden der Karte wird eine Verbindung zu Google hergestellt. Dabei können personenbezogene Daten übertragen werden.</p>
          <button className="map-consent__button split-hover-cta" type="button" onClick={grantConsent}><span>Karte laden</span></button>
          <a href="/datenschutz">Datenschutzerklärung</a>
        </div>
      )}

      <div className="contact-map__card">
        <span className="contact-map__pin" aria-hidden="true"><MapPin /></span>
        <div>
          <p>Unser Standort</p>
          <strong>Schönfelder Weg 71</strong>
          <span>16321 Bernau bei Berlin</span>
        </div>
        <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" aria-label="Standort in Google Maps öffnen"><ExternalLink /></a>
      </div>
    </div>
  );
}

export function MapConsentResetLink() {
  const resetConsent = () => window.dispatchEvent(new Event("google-maps-consent-reset"));

  return <button className="footer-map-reset" type="button" onClick={resetConsent}>Google Maps zurücksetzen</button>;
}
