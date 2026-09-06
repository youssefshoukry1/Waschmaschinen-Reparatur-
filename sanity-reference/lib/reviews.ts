import { groq } from "next-sanity";
import { unstable_cache } from "next/cache";

import { client, isSanityConfigured } from "./client";
import { urlFor } from "./image";

type SanityReview = {
  _id: string;
  reviewerName?: string;
  rating?: number;
  content?: string;
  avatar?: unknown;
};

export type WebsiteReview = {
  id: string;
  reviewerName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  content: string;
  avatar?: { src: string; alt: string };
};

const REVIEWS_QUERY = groq`
  *[
    _type == "review" &&
    isApproved == true &&
    isRealReview == true &&
    hasPublicationConsent == true
  ] | order(sortOrder asc, _createdAt desc)[0...6] {
    _id,
    reviewerName,
    rating,
    content,
    avatar
  }
`;

function isRating(value: unknown): value is WebsiteReview["rating"] {
  return (
    typeof value === "number" &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 5
  );
}

function getAvatarUrl(source: unknown) {
  try {
    return urlFor(source as Parameters<typeof urlFor>[0])
      .width(160)
      .height(160)
      .fit("crop")
      .auto("format")
      .url();
  } catch {
    return null;
  }
}

function toWebsiteReview(review: SanityReview): WebsiteReview | null {
  if (
    !review._id ||
    typeof review.reviewerName !== "string" ||
    typeof review.content !== "string" ||
    !isRating(review.rating)
  ) {
    return null;
  }

  const avatarSrc = getAvatarUrl(review.avatar);

  return {
    id: review._id,
    reviewerName: review.reviewerName,
    rating: review.rating,
    content: review.content,
    ...(avatarSrc
      ? {
          avatar: {
            src: avatarSrc,
            alt: `Kundenavatar ${review.reviewerName}`,
          },
        }
      : {}),
  };
}

async function fetchPublishedReviews() {
  if (!isSanityConfigured) {
    return [];
  }

  try {
    const reviews = await client.fetch<SanityReview[]>(REVIEWS_QUERY, {});

    return reviews
      .map((review) => toWebsiteReview(review))
      .filter((review): review is WebsiteReview => review !== null);
  } catch (error) {
    console.error("Failed to fetch Sanity reviews", error);
    return [];
  }
}

export const getPublishedReviews = unstable_cache(
  fetchPublishedReviews,
  ["published-reviews-v2"],
  {
    revalidate: 60,
    tags: ["reviews"],
  },
);
