"use client";

import { Cookie, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { COOKIE_CONSENT_KEY, MAP_CONSENT_KEY } from "@/components/MapConsent";

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.localStorage.getItem(COOKIE_CONSENT_KEY) === null);
    updateVisibility();
    window.addEventListener("privacy-consent-updated", updateVisibility);
    return () => {
      window.removeEventListener("privacy-consent-updated", updateVisibility);
    };
  }, []);

  const saveChoice = (choice: "essential" | "maps") => {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, choice);
    if (choice === "maps") {
      window.localStorage.setItem(MAP_CONSENT_KEY, "granted");
      window.dispatchEvent(new Event("google-maps-consent-granted"));
    }
    setIsVisible(false);
    window.dispatchEvent(new Event("privacy-consent-updated"));
  };

  if (isVisible !== true) return null;

  return (
    <aside className="cookie-banner" aria-label="Datenschutz-Einstellungen">
      <span className="cookie-banner__icon" aria-hidden="true"><Cookie /></span>
      <div className="cookie-banner__content">
        <p>Datenschutz-Einstellungen</p>
        <h2>Google Maps aktivieren?</h2>
        <span>Für die Standortkarte benötigen wir Ihre Einwilligung. Dabei wird eine Verbindung zu Google hergestellt.</span>
        <a href="/datenschutz">Datenschutzerklärung</a>
      </div>
      <div className="cookie-banner__actions">
        <button className="cookie-banner__necessary" type="button" onClick={() => saveChoice("essential")}>Nur notwendige</button>
        <button className="cookie-banner__allow split-hover-cta" type="button" onClick={() => saveChoice("maps")}><span><MapPin /> Google Maps erlauben</span></button>
      </div>
    </aside>
  );
}
