import { groq } from "next-sanity";
import { unstable_cache } from "next/cache";

import { client, isSanityConfigured } from "./client";
import { urlFor } from "./image";

type SanityResultComparison = {
  _id: string;
  title?: string;
  beforeImage?: unknown;
  afterImage?: unknown;
  beforeAlt?: string;
  afterAlt?: string;
};

export type WebsiteResultComparison = {
  id: string;
  title: string;
  before: { src: string; alt: string; label: string };
  after: { src: string; alt: string; label: string };
  cardPreview: { src: string; alt: string };
};

const RESULT_COMPARISONS_QUERY = groq`
  *[
    _type == "resultComparison" &&
    isRealClientWork == true &&
    hasClientPublicationConsent == true &&
    hasNoPrivateInformation == true
  ] | order(_createdAt desc)[0...3] {
    _id,
    title,
    beforeImage,
    afterImage,
    beforeAlt,
    afterAlt
  }
`;

function getImageUrl(source: unknown) {
  try {
    return urlFor(source as Parameters<typeof urlFor>[0])
      .width(1400)
      .height(920)
      .fit("crop")
      .auto("format")
      .url();
  } catch {
    return null;
  }
}

function toWebsiteResultComparison(
  comparison: SanityResultComparison,
): WebsiteResultComparison | null {
  const beforeSrc = getImageUrl(comparison.beforeImage);
  const afterSrc = getImageUrl(comparison.afterImage);

  if (
    !comparison._id ||
    typeof comparison.title !== "string" ||
    comparison.title.trim().length === 0 ||
    typeof comparison.beforeAlt !== "string" ||
    comparison.beforeAlt.trim().length === 0 ||
    typeof comparison.afterAlt !== "string" ||
    comparison.afterAlt.trim().length === 0 ||
    !beforeSrc ||
    !afterSrc
  ) {
    return null;
  }

  return {
    id: comparison._id,
    title: comparison.title,
    before: {
      src: beforeSrc,
      alt: comparison.beforeAlt,
      label: "Vorher",
    },
    after: {
      src: afterSrc,
      alt: comparison.afterAlt,
      label: "Nachher",
    },
    cardPreview: {
      src: afterSrc,
      alt: `Ergebnis ${comparison.title}`,
    },
  };
}

async function fetchResultComparisons(): Promise<WebsiteResultComparison[]> {
  if (!isSanityConfigured) {
    return [];
  }

  try {
    const comparisons = await client.fetch<SanityResultComparison[]>(
      RESULT_COMPARISONS_QUERY,
      {},
    );

    return comparisons
      .map((comparison) => toWebsiteResultComparison(comparison))
      .filter(
        (comparison): comparison is WebsiteResultComparison =>
          comparison !== null,
      );
  } catch (error) {
    console.error("Failed to fetch Sanity result comparisons", error);
    return [];
  }
}

export const getResultComparisons = unstable_cache(
  fetchResultComparisons,
  ["result-comparisons-v1"],
  {
    revalidate: 60,
    tags: ["result-comparisons"],
  },
);
