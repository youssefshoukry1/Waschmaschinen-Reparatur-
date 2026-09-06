type ReviewDocument = Record<string, unknown> & {
  reviewerName?: unknown;
  rating?: unknown;
  content?: unknown;
  isRealReview?: unknown;
  hasPublicationConsent?: unknown;
  isApproved?: unknown;
};

export const firstNamePattern = /^[A-Za-zÀ-ÖØ-öø-ÿ'-]+$/;
const MAX_FIRST_NAME_LENGTH = 40;

export function validateReviewerFirstName(value: unknown): string | true {
  if (typeof value !== "string") {
    return "Der Vorname des Bewerters ist erforderlich.";
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return "Der Vorname des Bewerters ist erforderlich.";
  }

  if (trimmed.includes(" ")) {
    return "Nur der Vorname ist erlaubt. Keine vollständigen Namen eingeben.";
  }

  if (trimmed.length < 2) {
    return "Der Vorname ist zu kurz.";
  }

  if (trimmed.length > MAX_FIRST_NAME_LENGTH) {
    return "Der Vorname darf höchstens 40 Zeichen lang sein.";
  }

  if (!firstNamePattern.test(trimmed)) {
    return "Nur einen Vornamen mit Buchstaben, Apostrophen oder Bindestrichen verwenden.";
  }

  return true;
}

export function getReviewPublicationIssues(document?: ReviewDocument | null) {
  const issues: string[] = [];

  if (!document) {
    return ["Der Bewertungstext ist noch nicht bereit für die Veröffentlichung."];
  }

  const reviewerNameIssue = validateReviewerFirstName(document.reviewerName);
  if (reviewerNameIssue !== true) {
    issues.push(reviewerNameIssue);
  }

  if (
    typeof document.rating !== "number" ||
    !Number.isInteger(document.rating) ||
    document.rating < 1 ||
    document.rating > 5
  ) {
    issues.push("Die Sternebewertung muss eine ganze Zahl von 1 bis 5 sein.");
  }

  if (typeof document.content !== "string") {
    issues.push("Der Bewertungstext ist erforderlich.");
  } else {
    const content = document.content.trim();

    if (content.length > 500) {
      issues.push("Der Bewertungstext darf höchstens 500 Zeichen lang sein.");
    }
  }

  if (document.isRealReview !== true) {
    issues.push("Bestätigen, dass diese Bewertung echt ist.");
  }

  if (document.hasPublicationConsent !== true) {
    issues.push("Bestätigen, dass der Bewerter der Veröffentlichung zugestimmt hat.");
  }

  if (document.isApproved !== true) {
    issues.push("Die Bewertung als für die Website freigegeben markieren.");
  }

  return issues;
}
