import Groq from "groq-sdk";

let cachedGroq: Groq | null | undefined;

export function getGroq() {
  if (cachedGroq !== undefined) return cachedGroq;

  const apiKey = process.env.GROQ_API_KEY;
  cachedGroq = apiKey ? new Groq({ apiKey }) : null;

  return cachedGroq;
}
