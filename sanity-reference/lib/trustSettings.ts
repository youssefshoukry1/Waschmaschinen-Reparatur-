import { groq } from "next-sanity";
import { unstable_cache } from "next/cache";

import { client, isSanityConfigured } from "./client";

type SanityTrustSettings = {
  showRating?: boolean;
  ratingValue?: number;
  ratingLabel?: string;
  satisfiedCustomerCount?: number;
};

export type WebsiteTrustSettings =
  | {
      showRating: true;
      ratingValue: number;
      ratingLabel: string;
      satisfiedCustomerCount: number;
    }
  | {
      showRating: false;
      satisfiedCustomerCount: number;
    };

const TRUST_SETTINGS_QUERY = groq`
  *[_id == "trustSettings" && _type == "trustSettings"][0] {
    showRating,
    ratingValue,
    ratingLabel,
    satisfiedCustomerCount
  }
`;

function getSatisfiedCustomerCount(settings: SanityTrustSettings | null) {
  if (
    typeof settings?.satisfiedCustomerCount === "number" &&
    Number.isInteger(settings.satisfiedCustomerCount) &&
    settings.satisfiedCustomerCount >= 0
  ) {
    return settings.satisfiedCustomerCount;
  }

  return 6;
}

function toWebsiteTrustSettings(
  settings: SanityTrustSettings | null,
): WebsiteTrustSettings {
  const satisfiedCustomerCount = getSatisfiedCustomerCount(settings);

  if (
    !settings?.showRating ||
    typeof settings.ratingValue !== "number" ||
    settings.ratingValue < 1 ||
    settings.ratingValue > 5 ||
    typeof settings.ratingLabel !== "string" ||
    settings.ratingLabel.trim().length === 0
  ) {
    return { showRating: false, satisfiedCustomerCount };
  }

  return {
    showRating: true,
    ratingValue: settings.ratingValue,
    ratingLabel: settings.ratingLabel,
    satisfiedCustomerCount,
  };
}

async function fetchTrustSettings(): Promise<WebsiteTrustSettings> {
  if (!isSanityConfigured) {
    return { showRating: false, satisfiedCustomerCount: 6 };
  }

  try {
    const settings = await client.fetch<SanityTrustSettings | null>(
      TRUST_SETTINGS_QUERY,
      {},
    );

    return toWebsiteTrustSettings(settings);
  } catch (error) {
    console.error("Failed to fetch Sanity trust settings", error);
    return { showRating: false, satisfiedCustomerCount: 6 };
  }
}

export const getTrustSettings = unstable_cache(
  fetchTrustSettings,
  ["trust-settings-v2"],
  {
    revalidate: 60,
    tags: ["trust-settings"],
  },
);
