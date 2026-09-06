type ResultComparisonDocument = Record<string, unknown> & {
  _id?: unknown;
  title?: unknown;
  beforeImage?: unknown;
  afterImage?: unknown;
  beforeAlt?: unknown;
  afterAlt?: unknown;
  isRealClientWork?: unknown;
  hasClientPublicationConsent?: unknown;
  hasNoPrivateInformation?: unknown;
};

export const MAX_APPROVED_RESULT_COMPARISONS = 3;

function hasImageAsset(value: unknown) {
  return (
    typeof value === "object" &&
    value !== null &&
    "asset" in value &&
    Boolean(value.asset)
  );
}

function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export function getResultComparisonPublicationIssues(
  document?: ResultComparisonDocument | null,
) {
  const issues: string[] = [];

  if (!document) {
    return ["Der Ergebnisvergleich ist noch nicht bereit für die Veröffentlichung."];
  }

  if (!hasText(document.title)) {
    issues.push("Der Titel ist erforderlich.");
  }

  if (!hasImageAsset(document.beforeImage)) {
    issues.push("Das Vorher-Bild ist erforderlich.");
  }

  if (!hasImageAsset(document.afterImage)) {
    issues.push("Das Nachher-Bild ist erforderlich.");
  }

  if (!hasText(document.beforeAlt)) {
    issues.push("Der Alt-Text für das Vorher-Bild ist erforderlich.");
  }

  if (!hasText(document.afterAlt)) {
    issues.push("Der Alt-Text für das Nachher-Bild ist erforderlich.");
  }

  if (document.isRealClientWork !== true) {
    issues.push("Bestätigen, dass diese Bilder echte Kundenarbeit zeigen.");
  }

  if (document.hasClientPublicationConsent !== true) {
    issues.push("Bestätigen, dass der Kunde die Veröffentlichung dieser Bilder erlaubt hat.");
  }

  if (document.hasNoPrivateInformation !== true) {
    issues.push(
      "Bestätigen, dass die Bilder keine privaten Informationen, Adressen, Telefonnummern, Kennzeichen, Dokumente oder andere DSGVO-sensible Daten zeigen.",
    );
  }

  return issues;
}
