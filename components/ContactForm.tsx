"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

import { business } from "@/lib/business";

const RELAY_URL = process.env.NEXT_PUBLIC_RELAY_CONTACT_URL;
const FORM_KEY = process.env.NEXT_PUBLIC_RELAY_FORM_KEY;
const CONSENT_VERSION = process.env.NEXT_PUBLIC_RELAY_CONSENT_VERSION ?? "v1";

type SubmissionState = "idle" | "sending" | "success" | "error";

const DEVICE_OPTIONS = [
  "Waschmaschine",
  "Kühlschrank",
  "Spülmaschine",
  "Trockner",
  "Herd oder Backofen",
  "Kaffeemaschine",
  "TV oder Elektronik",
  "Satellitenanlage",
  "Gastronomiegeräte",
  "Anderes Gerät",
];

export default function ContactForm({ variant = "panel" }: { variant?: "panel" | "callback" }) {
  const isCallback = variant === "callback";
  const renderedAt = useRef(0);
  const submitToken = useRef<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [submittedName, setSubmittedName] = useState("");

  useEffect(() => {
    renderedAt.current = Date.now() / 1000;
    if (!RELAY_URL || !FORM_KEY) return;
    const controller = new AbortController();

    fetch(`${RELAY_URL}/submit-token?form_key=${encodeURIComponent(FORM_KEY)}`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data: { submit_token?: string } | null) => {
        submitToken.current = data?.submit_token ?? null;
      })
      .catch(() => undefined);

    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (status === "success") successHeadingRef.current?.focus();
  }, [status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!RELAY_URL || !FORM_KEY || status === "sending") {
      setStatus("error");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const service = String(formData.get("service") ?? "").trim();
    const callbackTime = String(formData.get("callbackTime") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const idempotencyKey = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15_000);

    setStatus("sending");
    try {
      const response = await fetch(`${RELAY_URL}/submit`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          form_key: FORM_KEY,
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone") || null,
          message: [service ? `Gerät / Leistung: ${service}` : "", callbackTime ? `Rückruf gewünscht: ${callbackTime}` : "", message].filter(Boolean).join("\n\n"),
          consent: formData.get("consent") === "on",
          consent_text_version: CONSENT_VERSION,
          honeypot: formData.get("website") || "",
          idempotency_key: idempotencyKey,
          rendered_at: renderedAt.current,
          submit_token: submitToken.current,
        }),
        signal: controller.signal,
      });

      if (response.status !== 202) throw new Error("Relay submission failed");
      form.reset();
      setSubmittedName(name);
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      window.clearTimeout(timeout);
    }
  };

  const startAnotherRequest = () => {
    setSubmittedName("");
    setStatus("idle");
    window.requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("input[name='name']")?.focus());
  };

  return (
    <form ref={formRef} className={`contact-form${isCallback ? " contact-form--callback" : ""}`} onSubmit={handleSubmit}>
      {status === "success" ? (
        <section className="contact-form__success" aria-labelledby="contact-success-heading">
          <span className="contact-form__success-icon" aria-hidden="true">✓</span>
          <p className="contact-form__success-eyebrow">Anfrage versendet</p>
          <h3 id="contact-success-heading" ref={successHeadingRef} tabIndex={-1}>Vielen Dank{submittedName ? `, ${submittedName}` : ""}!</h3>
          <p>Wir haben Ihre Nachricht erhalten und melden uns in der Regel innerhalb eines Werktags persönlich bei Ihnen.</p>
          <button className="contact-form__secondary-button" type="button" onClick={startAnotherRequest}>Weitere Anfrage senden</button>
        </section>
      ) : <>
      {isCallback ? null : (
        <div className="contact-form__heading">
          <span className="contact-form__step">Rückruf anfordern</span>
          <p>Sagen Sie uns, wann wir Sie erreichen dürfen – wir rufen Sie zur gewünschten Zeit zurück.</p>
        </div>
      )}
      {isCallback ? (
        <>
        <div className="contact-form__row">
          <label><span>Ihr Name</span><input type="text" name="name" placeholder="Vor- und Nachname" autoComplete="name" maxLength={120} required /></label>
          <label><span>E-Mail-Adresse</span><input type="email" name="email" placeholder="name@beispiel.de" autoComplete="email" required /></label>
        </div>
        <div className="contact-form__row">
          <label><span>Telefon</span><input type="tel" name="phone" placeholder="Ihre Telefonnummer" autoComplete="tel" maxLength={30} /></label>
          <label>
          <span>Welches Gerät ist defekt?</span>
          <select name="service" defaultValue="">
            <option value="" disabled>Gerät auswählen</option>
            {DEVICE_OPTIONS.map((device) => <option key={device}>{device}</option>)}
          </select>
        </label>
        </div>
        </>
      ) : (
        <>
        <div className="contact-form__row">
          <label><span>Ihr Name</span><input type="text" name="name" placeholder="Vor- und Nachname" autoComplete="name" maxLength={120} required /></label>
          <label><span>Telefon</span><input type="tel" name="phone" placeholder="Ihre Telefonnummer" autoComplete="tel" maxLength={30} /></label>
        </div>
        <div className="contact-form__row">
          <label><span>E-Mail-Adresse</span><input type="email" name="email" placeholder="name@beispiel.de" autoComplete="email" required /></label>
          <label><span>Wunschzeit für den Rückruf</span><input type="text" name="callbackTime" placeholder="z. B. 14 bis 16 Uhr" maxLength={120} /></label>
        </div>
        <label>
          <span>Welches Gerät ist defekt?</span>
          <select name="service" defaultValue="">
            <option value="" disabled>Gerät auswählen</option>
            {DEVICE_OPTIONS.map((device) => <option key={device}>{device}</option>)}
          </select>
        </label>
        </>
      )}
      <label><span>Ihre Nachricht</span><textarea name="message" rows={4} placeholder="Welcher Fehler tritt auf? Marke und Modell helfen uns weiter …" maxLength={5000} required /></label>
      <input className="contact-form__honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="contact-form__consent"><input type="checkbox" name="consent" required /><span>Ich willige in die Verarbeitung meiner Daten zur Kontaktaufnahme ein. Details finden Sie in der <a href="/datenschutz">Datenschutzerklärung</a>.</span></label>
      <div className="contact-form__footer">
        <button className="split-hover-cta" type="submit" disabled={status === "sending"}><span>{status === "sending" ? "Wird gesendet …" : "Anfrage senden"} <span aria-hidden="true">↗</span></span></button>
        <p className={`contact-form__status contact-form__status--${status}`} role={status === "error" ? "alert" : "status"} aria-live="polite">
          {status === "sending" ? "Ihre Nachricht wird sicher übermittelt." : null}
          {status === "error" ? <>Das Senden ist fehlgeschlagen. Bitte versuchen Sie es erneut oder rufen Sie uns an: <a href={`tel:${business.telephone}`}>{business.telephoneDisplay}</a>.</> : null}
        </p>
      </div>
      </>}
    </form>
  );
}
