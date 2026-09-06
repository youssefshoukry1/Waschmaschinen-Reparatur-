"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const RELAY_URL = process.env.NEXT_PUBLIC_RELAY_CONTACT_URL;
const FORM_KEY = process.env.NEXT_PUBLIC_RELAY_FORM_KEY;
const CONSENT_VERSION = process.env.NEXT_PUBLIC_RELAY_CONSENT_VERSION ?? "v1";

type SubmissionState = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
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
          message: service ? `Gewünschte Leistung: ${service}\n\n${message}` : message,
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
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit}>
      {status === "success" ? (
        <section className="contact-form__success" aria-labelledby="contact-success-heading">
          <span className="contact-form__success-icon" aria-hidden="true">✓</span>
          <p className="contact-form__success-eyebrow">Anfrage versendet</p>
          <h3 id="contact-success-heading" ref={successHeadingRef} tabIndex={-1}>Vielen Dank{submittedName ? `, ${submittedName}` : ""}!</h3>
          <p>Wir haben Ihre Nachricht erhalten und melden uns in der Regel innerhalb eines Werktags persönlich bei Ihnen.</p>
          <button className="contact-form__secondary-button" type="button" onClick={startAnotherRequest}>Weitere Anfrage senden</button>
        </section>
      ) : <>
      <div className="contact-form__heading">
        <span className="contact-form__step">Unverbindliche Anfrage</span>
        <p>Füllen Sie das Formular aus – wir melden uns in der Regel innerhalb eines Werktags bei Ihnen.</p>
      </div>
      <div className="contact-form__row">
        <label><span>Ihr Name</span><input type="text" name="name" placeholder="Vor- und Nachname" autoComplete="name" maxLength={120} required /></label>
        <label><span>Telefon</span><input type="tel" name="phone" placeholder="Ihre Telefonnummer" autoComplete="tel" maxLength={30} /></label>
      </div>
      <label><span>E-Mail-Adresse</span><input type="email" name="email" placeholder="name@beispiel.de" autoComplete="email" required /></label>
      <label>
        <span>Wobei dürfen wir helfen?</span>
        <select name="service" defaultValue="">
          <option value="" disabled>Leistung auswählen</option>
          <option>Haushaltshilfe</option><option>Glas- und Fensterreinigung</option><option>Gartenarbeit</option><option>Begleitung und Fahrten</option><option>Sonstige Unterstützung</option>
        </select>
      </label>
      <label><span>Ihre Nachricht</span><textarea name="message" rows={4} placeholder="Erzählen Sie uns kurz von Ihrem Anliegen …" maxLength={5000} required /></label>
      <input className="contact-form__honeypot" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="contact-form__consent"><input type="checkbox" name="consent" required /><span>Ich willige in die Verarbeitung meiner Daten zur Kontaktaufnahme ein. Details finden Sie in der <a href="/datenschutz">Datenschutzerklärung</a>.</span></label>
      <div className="contact-form__footer">
        <button className="split-hover-cta" type="submit" disabled={status === "sending"}><span>{status === "sending" ? "Wird gesendet …" : "Anfrage senden"} <span aria-hidden="true">↗</span></span></button>
        <p className={`contact-form__status contact-form__status--${status}`} role={status === "error" ? "alert" : "status"} aria-live="polite">
          {status === "sending" ? "Ihre Nachricht wird sicher übermittelt." : null}
          {status === "error" ? <>Das Senden ist fehlgeschlagen. Bitte versuchen Sie es erneut oder rufen Sie uns an: <a href="tel:+4917646687719">0176 46687719</a>.</> : null}
        </p>
      </div>
      </>}
    </form>
  );
}
