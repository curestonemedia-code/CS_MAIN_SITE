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

type SanityMutation = Record<string, unknown>;

/**
 * Writes to Sanity via the HTTP Mutate API. Requires `SANITY_TOKEN` to be a
 * write-scoped ("Editor" or higher) token — the read-only query helper
 * above works without one, but mutations always need it. Used by server-only
 * code (the YouTube sync job today) — never import this from client
 * components.
 */
export async function sanityMutate(mutations: SanityMutation[]): Promise<void> {
  const token = process.env.SANITY_TOKEN;
  if (!token) {
    throw new Error("sanityMutate: SANITY_TOKEN is not set — cannot write to Sanity without a write-scoped token.");
  }

  const url = `https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${SANITY_DATASET}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ mutations }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Sanity mutate request failed with ${response.status}: ${text}`);
  }
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
