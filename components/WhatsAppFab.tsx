import { business } from "@/lib/business";

export default function WhatsAppFab() {
  return (
    <a
      className="whatsapp-fab"
      href={`https://wa.me/${business.whatsapp}?text=${encodeURIComponent("Hallo, ich brauche eine Reparatur für mein Haushaltsgerät.")}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${business.name} über WhatsApp kontaktieren – Termin online buchen`}
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16.04 3A12.9 12.9 0 0 0 5.1 22.75L3.38 29l6.4-1.68A12.93 12.93 0 1 0 16.04 3Zm0 23.67c-1.93 0-3.82-.52-5.46-1.5l-.39-.23-3.8 1 1.02-3.7-.25-.38a10.73 10.73 0 1 1 8.88 4.81Zm5.88-8.04c-.32-.16-1.9-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6a9.68 9.68 0 0 1-1.79-2.23c-.19-.32-.02-.5.14-.66.15-.14.32-.37.49-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.55-.73-.56h-.62c-.22 0-.57.08-.87.4-.29.33-1.13 1.11-1.13 2.7s1.16 3.13 1.32 3.35c.16.21 2.28 3.48 5.52 4.88.77.33 1.37.53 1.84.68.77.25 1.48.21 2.03.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.3-.21-.62-.37Z" />
      </svg>
    </a>
  );
}
