"use client";

import Image from "next/image";
import { BadgeEuro, Info, ListChecks, ShoppingCart, Sprout } from "lucide-react";
import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { AnimatedSectionTitle } from "./HeroTitle";

type ServiceId = "household" | "cleaning" | "windows" | "garden" | "shopping" | "senior";
type WindowType = "standard" | "double" | "floor" | "roof" | "wintergarden" | "patio";
type WindowGroup = { id: number; type: WindowType; quantity: number };

const services: Array<{ id: ServiceId; title: string; text: string; icon: ReactNode; iconSrc?: string }> = [
  { id: "household", title: "Haushaltshilfe", text: "Unterstützung bei täglichen Aufgaben", icon: "⌂", iconSrc: "/images/ui/household-help.svg" },
  { id: "cleaning", title: "Reinigungsdienste", text: "Gründliche Reinigung nach Bedarf", icon: "✦", iconSrc: "/images/ui/clean.svg" },
  { id: "windows", title: "Glas- & Fensterreinigung", text: "Fenster, Wintergärten und Glasflächen", icon: "▦", iconSrc: "/images/ui/glass-window.svg" },
  { id: "garden", title: "Gartenarbeit", text: "Rasen, Hecken und leichte Pflege", icon: <Sprout size={22} strokeWidth={2} /> },
  { id: "shopping", title: "Einkaufsservice", text: "Einkaufen lassen oder begleiten", icon: <ShoppingCart size={22} strokeWidth={2} /> },
  { id: "senior", title: "Seniorenbetreuung", text: "Zeit und Unterstützung im Alltag", icon: "♡", iconSrc: "/images/ui/senior-assistance.svg" },
];

const windowTypes: Array<{ value: WindowType; label: string; detail: string; price: number }> = [
  { value: "standard", label: "Standardfenster", detail: "Bis ca. 1 × 1 m", price: 8.5 },
  { value: "double", label: "Doppelfenster", detail: "Zwei Flügel", price: 14 },
  { value: "floor", label: "Bodentief", detail: "Fenster oder Balkontür", price: 15 },
  { value: "roof", label: "Dachfenster", detail: "Gut erreichbar", price: 20 },
  { value: "wintergarden", label: "Wintergarten", detail: "Berechnung nach m²", price: 12 },
  { value: "patio", label: "Terrassendach", detail: "Berechnung nach m²", price: 14 },
];

const areaChoices = [40, 65, 100, 140, 180];
const frequencyChoices = [
  ["once", "Einmalig"],
  ["weekly", "Wöchentlich"],
  ["biweekly", "Alle zwei Wochen"],
  ["monthly", "Monatlich"],
] as const;

function useAnimatedNumber(value: number, duration = 450) {
  const [displayValue, setDisplayValue] = useState(value);
  const previousValue = useRef(value);

  useEffect(() => {
    const startValue = previousValue.current;
    previousValue.current = value;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frameId = requestAnimationFrame(() => setDisplayValue(value));
      return () => cancelAnimationFrame(frameId);
    }

    const startedAt = performance.now();
    let frameId = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + (value - startValue) * easedProgress));

      if (progress < 1) frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [duration, value]);

  return displayValue;
}

function formatUnitPrice(value: number) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function RadioCards({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: Array<{ value: string; label: string; detail?: string }>;
  onChange: (value: string) => void;
}) {
  return (
    <div className="calc-options">
      {options.map((option) => (
        <label className={`calc-choice${value === option.value ? " is-selected" : ""}`} key={option.value}>
          <input type="radio" name={name} value={option.value} checked={value === option.value} onChange={() => onChange(option.value)} />
          <span className="calc-choice__check" aria-hidden="true">✓</span>
          <strong>{option.label}</strong>
          {option.detail && <small>{option.detail}</small>}
        </label>
      ))}
    </div>
  );
}

function Extras({
  values,
  selected,
  onChange,
}: {
  values: Array<{ id: string; label: string; detail: string; price: string }>;
  selected: string[];
  onChange: (value: string[]) => void;
}) {
  const toggle = (id: string) => onChange(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]);
  return (
    <div className="calc-extras">
      {values.map((extra) => (
        <label className={`calc-extra${selected.includes(extra.id) ? " is-selected" : ""}`} key={extra.id}>
          <input type="checkbox" checked={selected.includes(extra.id)} onChange={() => toggle(extra.id)} />
          <span>
            <strong>{extra.label}</strong>
            <small>{extra.detail}</small>
          </span>
          <b>{extra.price}</b>
        </label>
      ))}
    </div>
  );
}

function Stepper({ value, min, max, label, onChange }: { value: number; min: number; max: number; label: string; onChange: (value: number) => void }) {
  return (
    <div className="calc-stepper">
      <button type="button" aria-label={`${label} verringern`} disabled={value <= min} onClick={() => onChange(Math.max(min, value - 1))}>−</button>
      <input aria-label={label} type="number" min={min} max={max} value={value} onChange={(event) => onChange(Math.max(min, Math.min(max, Number(event.target.value) || min)))} />
      <button type="button" aria-label={`${label} erhöhen`} disabled={value >= max} onClick={() => onChange(Math.min(max, value + 1))}>+</button>
    </div>
  );
}

export default function PriceCalculator() {
  const [service, setService] = useState<ServiceId | null>("windows");
  const [windowGroups, setWindowGroups] = useState<WindowGroup[]>([{ id: 1, type: "standard", quantity: 6 }]);
  const [glassArea, setGlassArea] = useState(12);
  const [livingArea, setLivingArea] = useState(65);
  const [frequency, setFrequency] = useState("once");
  const [supportType, setSupportType] = useState("general");
  const [cleaningType, setCleaningType] = useState("maintenance");
  const [bathrooms, setBathrooms] = useState(1);
  const [gardenTask, setGardenTask] = useState("lawn");
  const [gardenLength, setGardenLength] = useState(10);
  const [duration, setDuration] = useState(2);
  const [distance, setDistance] = useState(5);
  const [shoppingMode, setShoppingMode] = useState("delivery");
  const [seniorType, setSeniorType] = useState("company");
  const [extras, setExtras] = useState<string[]>([]);

  const selectService = (id: ServiceId) => {
    setService(id);
    setExtras([]);
  };

  const addWindowGroup = () => {
    if (windowGroups.length < 4) setWindowGroups([...windowGroups, { id: Date.now(), type: "double", quantity: 2 }]);
  };

  const updateWindowGroup = (id: number, patch: Partial<WindowGroup>) =>
    setWindowGroups(windowGroups.map((group) => (group.id === id ? { ...group, ...patch } : group)));

  const estimate = useMemo(() => {
    if (!service) return { subtotal: 0, lower: 0, upper: 0, requiresQuote: false, summary: [] as string[] };
    let subtotal = 0;
    let requiresQuote = false;
    const summary: string[] = [];
    const frequencyMultiplier = frequency === "weekly" ? 4.33 : frequency === "biweekly" ? 2.17 : 1;

    if (service === "windows") {
      const areaGroup = windowGroups.find((group) => group.type === "wintergarden" || group.type === "patio");
      if (areaGroup) {
        subtotal = glassArea * (areaGroup.type === "patio" ? 14 : 12);
        summary.push(`${glassArea} m² Glasfläche`);
      } else {
        subtotal = windowGroups.reduce((sum, group) => sum + group.quantity * (windowTypes.find((item) => item.value === group.type)?.price ?? 9), 0);
        const totalWindows = windowGroups.reduce((sum, group) => sum + group.quantity, 0);
        requiresQuote = totalWindows > 40;
        summary.push(`${totalWindows} Fenster in ${windowGroups.length} Gruppe${windowGroups.length > 1 ? "n" : ""}`);
      }
      const extrasPercent =
        (extras.includes("frames") ? 0.15 : 0) +
        (extras.includes("sills") ? 0.1 : 0) +
        (extras.includes("blinds") ? 0.2 : 0) +
        (extras.includes("dirty") ? 0.2 : 0) +
        (extras.includes("access") ? 0.15 : 0);
      subtotal *= 1 + extrasPercent;
      summary.push("Preis inkl. 19 % MwSt.");
    }

    if (service === "household") {
      const hours = Math.max(2, livingArea / 35) + extras.length * 0.5;
      subtotal = hours * 35 * frequencyMultiplier;
      summary.push(`${livingArea} m²`, frequencyChoices.find(([id]) => id === frequency)?.[1] ?? "Einmalig");
    }

    if (service === "cleaning") {
      const typeMultiplier = cleaningType === "deep" ? 1.6 : cleaningType === "move" ? 1.8 : 1;
      const hours = (Math.max(2, livingArea / 30) + Math.max(0, bathrooms - 1) * 0.5) * typeMultiplier;
      subtotal = hours * 35 * frequencyMultiplier;
      if (extras.includes("oven")) subtotal += 25;
      if (extras.includes("fridge")) subtotal += 20;
      if (extras.includes("cabinets")) subtotal += 35;
      if (extras.includes("heavy")) subtotal *= 1.25;
      summary.push(`${livingArea} m²`, `${bathrooms} Badezimmer`);
    }

    if (service === "garden") {
      subtotal = gardenLength * 20;
      if (extras.includes("waste")) subtotal += 25;
      if (extras.includes("equipment")) subtotal += 10;
      summary.push(`${gardenLength} Laufmeter à 20 €`, gardenTask === "lawn" ? "Rasen mähen" : gardenTask === "hedge" ? "Hecke schneiden" : gardenTask === "care" ? "Leichte Pflegearbeiten" : "Mehrere Arbeiten");
    }

    if (service === "shopping") {
      subtotal = duration * 35 + Math.max(0, distance - 5) * 0.6;
      summary.push(shoppingMode === "delivery" ? "Einkauf & Lieferung" : "Einkaufsbegleitung", `${duration} Stunde${duration > 1 ? "n" : ""}`);
    }

    if (service === "senior") {
      subtotal = duration * 35 * frequencyMultiplier;
      summary.push(`${duration} Stunde${duration > 1 ? "n" : ""}`, frequencyChoices.find(([id]) => id === frequency)?.[1] ?? "Einmalig");
    }

    const lower = Math.round(subtotal * 1.19);
    return { subtotal, lower, upper: Math.round(subtotal * 1.2), requiresQuote, summary };
  }, [service, windowGroups, glassArea, livingArea, frequency, cleaningType, bathrooms, gardenTask, gardenLength, duration, distance, shoppingMode, extras]);

  const selectedService = services.find((item) => item.id === service);
  const formatPrice = (value: number) => new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
  const animatedPrice = useAnimatedNumber(estimate.lower);

  const windowExtras = [
    { id: "frames", label: "Rahmenreinigung", detail: "Gründliche Reinigung der Fensterrahmen", price: "+15 %" },
    { id: "sills", label: "Fensterbänke", detail: "Reinigung der inneren Fensterbänke", price: "+10 %" },
    { id: "blinds", label: "Jalousien oder Rollläden", detail: "Reinigung der vorhandenen Beschattung", price: "+20 %" },
    { id: "dirty", label: "Starke Verschmutzung", detail: "Erhöhter Reinigungsaufwand", price: "+20 %" },
    { id: "access", label: "Schwer erreichbar", detail: "Nach Sicherheitsprüfung vor Ort", price: "+15 %" },
  ];

  return (
    <section className="price-collector" id="preise" aria-labelledby="price-collector-heading">
      <div className="price-collector__heading">
        <p><BadgeEuro aria-hidden="true" /> Sofort-Preisrechner</p>
        <AnimatedSectionTitle id="price-collector-heading" parts={[{ text: "Fensterreinigung direkt " }, { text: "berechnen", emphasized: true }]} />
        <div>Für Privat- und Gewerbekunden: Wählen Sie Fenster und Umfang – Sie erhalten sofort eine unverbindliche Preisschätzung.</div>
      </div>

      <div className="price-collector__shell">
        <div className="price-config">
          <fieldset className="calc-block">
            <legend><span>1</span> Welche Leistung benötigen Sie?</legend>
            <p>Wählen Sie zunächst eine Leistung. Weitere Leistungen können Sie anschließend anfragen.</p>
            <div className="service-selector">
              {services.map((item) => (
                <label className={`service-option service-option--${item.id}${service === item.id ? " is-selected" : ""}`} key={item.id}>
                  <input type="radio" name="service" checked={service === item.id} onChange={() => selectService(item.id)} />
                  <span className="service-option__icon" aria-hidden="true">
                    {item.iconSrc ? <Image src={item.iconSrc} alt="" width={24} height={24} /> : item.icon}
                  </span>
                  <span><strong>{item.title}</strong><small>{item.text}</small></span>
                  <b aria-hidden="true">✓</b>
                </label>
              ))}
            </div>
          </fieldset>

          {service === "windows" && (
            <>
              <fieldset className="calc-block">
                <legend><span>2</span> Anzahl und Fenstertyp</legend>
                <p>Fassen Sie gleiche Fenster zusammen. Bis zu vier Gruppen sind möglich.</p>
                <div className="calc-price-notice" role="note">
                  <Info aria-hidden="true" />
                  <span><strong>Transparent kalkuliert:</strong> An- und Abfahrt sind inklusive. Alle Preise verstehen sich inkl. 19 % MwSt.</span>
                </div>
                <div className="window-groups">
                  {windowGroups.map((group, index) => {
                    const usesArea = group.type === "wintergarden" || group.type === "patio";
                    return (
                      <div className="window-group" key={group.id}>
                        <div className="window-group__head"><strong>Fenstergruppe {index + 1}</strong>{windowGroups.length > 1 && <button type="button" onClick={() => setWindowGroups(windowGroups.filter((item) => item.id !== group.id))}>Entfernen</button>}</div>
                      <RadioCards name={`window-type-${group.id}`} value={group.type} onChange={(value) => updateWindowGroup(group.id, { type: value as WindowType })} options={windowTypes.map((item) => ({ value: item.value, label: item.label, detail: `${item.detail} · ${formatUnitPrice(item.price)} €${item.value === "wintergarden" || item.value === "patio" ? " / m²" : " / Stück"}` }))} />
                        {usesArea ? (
                          <label className="calc-number"><span>Fläche der Verglasung (ca.)</span><span><input type="number" min="5" max="40" value={glassArea} onChange={(event) => setGlassArea(Math.max(5, Math.min(40, Number(event.target.value) || 5)))} /> m²</span></label>
                        ) : (
                          <label className="calc-number"><span>Anzahl der Fenster</span><Stepper label="Fensteranzahl" min={1} max={40} value={group.quantity} onChange={(quantity) => updateWindowGroup(group.id, { quantity })} /></label>
                        )}
                      </div>
                    );
                  })}
                </div>
                {windowGroups.length < 4 && <button className="calc-add" type="button" onClick={addWindowGroup}>+ Weiteren Fenstertyp hinzufügen</button>}
                <div className="calc-included"><ListChecks aria-hidden="true" /> Die Reinigung der Glasflächen innen und außen ist enthalten.</div>
              </fieldset>
              <fieldset className="calc-block"><legend><span>3</span> Zusatzleistungen</legend><p>Optional – wählen Sie nur, was Sie wirklich benötigen.</p><Extras values={windowExtras} selected={extras} onChange={setExtras} /></fieldset>
            </>
          )}

          {(service === "household" || service === "cleaning") && (
            <>
              <fieldset className="calc-block">
                <legend><span>2</span> Wohnfläche (ca.)</legend>
                <div className="area-options">
                  {areaChoices.map((area, index) => <button type="button" className={livingArea === area ? "is-selected" : ""} onClick={() => setLivingArea(area)} key={area}>{index === 0 ? "Bis 49 m²" : index === 4 ? "Ab 160 m²" : `${areaChoices[index - 1] + 10}–${area} m²`}</button>)}
                </div>
                <label className="calc-number calc-number--compact"><span>Genaue Wohnfläche</span><span><input type="number" min="20" max="500" value={livingArea} onChange={(event) => setLivingArea(Math.max(20, Math.min(500, Number(event.target.value) || 20)))} /> m²</span></label>
              </fieldset>
              {service === "household" ? (
                <>
                  <fieldset className="calc-block"><legend><span>3</span> Häufigkeit</legend><RadioCards name="household-frequency" value={frequency} onChange={setFrequency} options={frequencyChoices.map(([value, label]) => ({ value, label }))} /></fieldset>
                  <fieldset className="calc-block"><legend><span>4</span> Gewünschte Unterstützung</legend><RadioCards name="support" value={supportType} onChange={setSupportType} options={[{ value: "general", label: "Allgemeine Haushaltsaufgaben" }, { value: "laundry", label: "Wäschepflege" }, { value: "beds", label: "Betten beziehen" }, { value: "order", label: "Aufräumen & Ordnung" }]} /><Extras selected={extras} onChange={setExtras} values={[{ id: "laundry", label: "Zusätzliche Wäschepflege", detail: "Waschen, Trocknen und Zusammenlegen", price: "+0,5 Std." }, { id: "beds", label: "Betten beziehen", detail: "Frische Bettwäsche aufziehen", price: "+0,5 Std." }]} /></fieldset>
                </>
              ) : (
                <>
                  <fieldset className="calc-block"><legend><span>3</span> Reinigungsart</legend><RadioCards name="cleaning-type" value={cleaningType} onChange={setCleaningType} options={[{ value: "maintenance", label: "Unterhaltsreinigung" }, { value: "deep", label: "Grundreinigung", detail: "Intensiver, einmaliger Aufwand" }, { value: "move", label: "Umzugsreinigung", detail: "Vor Einzug oder Übergabe" }]} /><label className="calc-number"><span>Anzahl Badezimmer</span><Stepper label="Anzahl Badezimmer" min={1} max={5} value={bathrooms} onChange={setBathrooms} /></label></fieldset>
                  <fieldset className="calc-block"><legend><span>4</span> Zusatzleistungen</legend><Extras selected={extras} onChange={setExtras} values={[{ id: "oven", label: "Backofen innen", detail: "Gründliche Innenreinigung", price: "+25 €" }, { id: "fridge", label: "Kühlschrank innen", detail: "Leer und zugänglich", price: "+20 €" }, { id: "cabinets", label: "Küchenschränke innen", detail: "Leer und zugänglich", price: "+35 €" }, { id: "heavy", label: "Starke Verschmutzung", detail: "Erhöhter Reinigungsaufwand", price: "+25 %" }]} /></fieldset>
                </>
              )}
            </>
          )}

          {service === "garden" && (
            <>
              <fieldset className="calc-block"><legend><span>2</span> Gartenarbeit und Umfang</legend><RadioCards name="garden-task" value={gardenTask} onChange={setGardenTask} options={[{ value: "lawn", label: "Rasen mähen" }, { value: "hedge", label: "Hecke schneiden" }, { value: "care", label: "Leichte Pflegearbeiten" }, { value: "multiple", label: "Mehrere Arbeiten" }]} /><label className="calc-number"><span>Länge der zu bearbeitenden Fläche (ca.)</span><span><input type="number" min="1" max="500" value={gardenLength} onChange={(event) => setGardenLength(Math.max(1, Math.min(500, Number(event.target.value) || 1)))} /> Laufmeter</span></label><div className="calc-included"><Info aria-hidden="true" /> Die Gartenarbeit wird mit 20 € pro Laufmeter berechnet.</div></fieldset>
              <fieldset className="calc-block"><legend><span>3</span> Zusatzleistungen</legend><Extras selected={extras} onChange={setExtras} values={[{ id: "waste", label: "Grünschnitt mitnehmen", detail: "Grundpauschale, nach Volumen", price: "+25 €" }, { id: "equipment", label: "Eigenes Gerät erforderlich", detail: "Gerätepauschale", price: "+10 €" }]} /></fieldset>
            </>
          )}

          {service === "shopping" && (
            <fieldset className="calc-block"><legend><span>2</span> Einkaufsservice</legend><RadioCards name="shopping-mode" value={shoppingMode} onChange={setShoppingMode} options={[{ value: "delivery", label: "Einkauf übernehmen & liefern" }, { value: "accompany", label: "Beim Einkauf begleiten" }]} /><label className="calc-number"><span>Voraussichtlicher Zeitaufwand</span><Stepper label="Dauer in Stunden" min={1} max={3} value={duration} onChange={setDuration} /></label><label className="calc-number calc-number--compact"><span>Entfernung zum Geschäft (ca.)</span><span><input type="number" min="0" max="50" value={distance} onChange={(event) => setDistance(Math.max(0, Math.min(50, Number(event.target.value) || 0)))} /> km</span></label><div className="calc-included"><Info aria-hidden="true" /> Die Kosten der Einkäufe sind nicht in der Schätzung enthalten.</div></fieldset>
          )}

          {service === "senior" && (
            <fieldset className="calc-block"><legend><span>2</span> Unterstützung und Dauer</legend><RadioCards name="senior-type" value={seniorType} onChange={setSeniorType} options={[{ value: "company", label: "Gesellschaft & Gespräche" }, { value: "activities", label: "Gemeinsame Aktivitäten" }, { value: "daily", label: "Alltagsaufgaben" }, { value: "multiple", label: "Mehrere Bereiche" }]} /><label className="calc-number"><span>Dauer je Termin</span><Stepper label="Dauer in Stunden" min={1} max={4} value={duration} onChange={setDuration} /></label><h4>Häufigkeit</h4><RadioCards name="senior-frequency" value={frequency} onChange={setFrequency} options={frequencyChoices.map(([value, label]) => ({ value, label }))} /><div className="calc-included"><Info aria-hidden="true" /> Unterstützung und Betreuung im Alltag, keine medizinische oder pflegerische Behandlung.</div></fieldset>
          )}
        </div>

        <aside className={`estimate-card${service ? " is-active" : ""}`}>
          <p>Ihre Schätzung</p>
          {!service ? (
            <div className="estimate-card__empty"><span aria-hidden="true"><ListChecks /></span><h3>Noch keine Leistung gewählt</h3><div>Wählen Sie links eine Leistung aus, um eine erste Preisschätzung zu erhalten.</div><strong>– €</strong></div>
          ) : (
            <div className="estimate-card__active">
              <span className="estimate-card__service">{selectedService?.title}</span>
              <ul>{estimate.summary.map((item) => <li key={item}>{item}</li>)}{extras.length > 0 && <li>{extras.length} Zusatzleistung{extras.length > 1 ? "en" : ""}</li>}</ul>
              <div className="estimate-card__rule" />
              <span>Geschätzter Preis</span>
              {estimate.requiresQuote ? <strong className="estimate-card__quote">Individuelles Angebot</strong> : <strong aria-label={`Ab ${formatPrice(estimate.lower)}`}><span aria-hidden="true">Ab {formatPrice(animatedPrice)}</span></strong>}
              <small aria-live="polite">Unverbindliche Schätzung inkl. 19 % MwSt. und der gewählten Leistungen.</small>
              <p>Der endgültige Preis wird nach Prüfung Ihrer Angaben bestätigt.</p>
              <a className="split-hover-cta" href="#contact"><span>Unverbindliches Angebot anfordern</span></a>
              <a className="estimate-card__secondary" href="tel:+4917646687719">Rückruf vereinbaren</a>
            </div>
          )}
        </aside>
      </div>

      {service && <div className="mobile-estimate"><span>Schätzung</span><strong aria-label={estimate.requiresQuote ? undefined : `Ab ${formatPrice(estimate.lower)}`}>{estimate.requiresQuote ? "Angebot erforderlich" : <span aria-hidden="true">Ab {formatPrice(animatedPrice)}</span>}</strong><a className="split-hover-cta" href="#contact"><span>Weiter</span></a></div>}
    </section>
  );
}
