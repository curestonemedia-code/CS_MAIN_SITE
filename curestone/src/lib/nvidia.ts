// Lightweight hand-rolled client for build.nvidia.com's OpenAI-compatible
// chat completions endpoint — mirrors sanityFetch/sanityMutate's style
// rather than adding a new SDK dependency for one endpoint. Used as the
// video classifier's primary provider (see youtubeSync.ts), with Groq as a
// fallback when NVIDIA_API_KEY isn't set.
const NVIDIA_API_BASE = "https://integrate.api.nvidia.com/v1";
// NVIDIA Build models reach end-of-life and get pulled without much warning
// (meta/llama-3.1-70b-instruct did, with a 410 Gone). Worse: a model can be
// listed in GET /v1/models and still 404 ("Function ... Not found for
// account ...") because the specific hosted deployment isn't entitled on
// this account/key, even though the model itself is real — confirmed by
// actually POSTing to /v1/chat/completions, not just checking the catalog
// listing. If this one also breaks, re-verify the same way before swapping.
const NVIDIA_MODEL = "meta/llama-3.2-11b-vision-instruct";

export function hasNvidiaKey(): boolean {
  return Boolean(process.env.NVIDIA_API_KEY);
}

// Without this, a single stalled response (no error, just nothing coming
// back) hangs the fetch forever — hit in practice: a 1,450-video reclassify
// run sat at 0% CPU for 30+ minutes on one dead connection, with no
// indication anything was wrong. A timeout turns that into a normal
// catchable failure the retry/skip logic already handles.
const REQUEST_TIMEOUT_MS = 45_000;

/** Returns the raw assistant message content, or null if NVIDIA_API_KEY isn't set. Throws on an HTTP error or timeout. */
export async function nvidiaChat(
  systemPrompt: string,
  userContent: string,
  maxTokens: number
): Promise<string | null> {
  const apiKey = process.env.NVIDIA_API_KEY;
  if (!apiKey) return null;

  const response = await fetch(`${NVIDIA_API_BASE}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: NVIDIA_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent },
      ],
      temperature: 0.1,
      max_tokens: maxTokens,
    }),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });

  if (!response.ok) {
    throw new Error(`NVIDIA chat completion failed with ${response.status}: ${await response.text()}`);
  }

  const data = await response.json();
  return data?.choices?.[0]?.message?.content ?? null;
}

/**
 * Some NIM-hosted models wrap JSON output in a markdown code fence, or add
 * prose before/after it ("Here's the classification: {...}"), despite
 * instructions not to. Strip whichever wrapping is present before
 * JSON.parse rather than failing the whole batch over formatting —
 * weaker/smaller models (which is what's actually available on a given
 * NVIDIA Build account) are more prone to this than Groq's was.
 */
export function extractJsonObject(raw: string): string {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced) return fenced[1].trim();

  // No fence — find the first '{' and its balanced matching '}', so any
  // leading/trailing prose around the object is discarded. Doesn't attempt
  // to fix truncated/invalid JSON inside the braces; that's still a parse
  // error the caller handles (retry, then skip — never silently guess).
  const start = raw.indexOf("{");
  if (start === -1) return raw.trim();

  let depth = 0;
  for (let i = start; i < raw.length; i++) {
    if (raw[i] === "{") depth++;
    else if (raw[i] === "}") {
      depth--;
      if (depth === 0) return raw.slice(start, i + 1).trim();
    }
  }

  return raw.slice(start).trim();
}
