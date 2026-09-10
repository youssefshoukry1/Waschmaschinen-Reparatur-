import type { Metadata } from "next";

/**
 * Das Sanity-Studio ist in robots.txt gesperrt - das verhindert aber nur das
 * Crawlen, nicht das Indexieren der URL selbst. Erst das noindex hier haelt
 * /studio zuverlaessig aus den Suchergebnissen.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
