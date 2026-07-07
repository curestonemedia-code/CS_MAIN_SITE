export const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "pxhg726k";
export const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const SANITY_API_VERSION =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

type SanityFetchOptions = {
  query: string;
  params?: Record<string, unknown>;
};

type SanityResponse<T> = {
  result?: T;
  error?: {
    description?: string;
    message?: string;
  };
};

export async function sanityFetch<T>({ query, params = {} }: SanityFetchOptions): Promise<T> {
  const url = new URL(
    `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`
  );

  url.searchParams.set("query", query);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(`$${key}`, JSON.stringify(value));
    }
  });

  const response = await fetch(url, {
    cache: "no-store",
    headers: process.env.SANITY_TOKEN
      ? { Authorization: `Bearer ${process.env.SANITY_TOKEN}` }
      : undefined,
  });

  if (!response.ok) {
    throw new Error(`Sanity request failed with ${response.status}`);
  }

  const payload = (await response.json()) as SanityResponse<T>;

  if (payload.error) {
    throw new Error(payload.error.description || payload.error.message || "Sanity query failed");
  }

  return payload.result as T;
}

export function cleanText(value?: string | null) {
  if (!value) return "";

  return value
    .replace(/<[^>]*>/g, "")
    .replace(/&hellip;/g, "...")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .trim();
}
