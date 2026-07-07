import Groq from "groq-sdk";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

let cachedRatelimit: Ratelimit | null | undefined;
let cachedGroq: Groq | null | undefined;

function getRatelimit() {
  if (cachedRatelimit !== undefined) return cachedRatelimit;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    cachedRatelimit = null;
    return cachedRatelimit;
  }

  cachedRatelimit = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, "1m"),
    analytics: true,
  });

  return cachedRatelimit;
}

function getGroq() {
  if (cachedGroq !== undefined) return cachedGroq;

  const apiKey = process.env.GROQ_API_KEY;
  cachedGroq = apiKey ? new Groq({ apiKey }) : null;

  return cachedGroq;
}

// 2. High-Conversion Professional System Prompt
const SYSTEM_PROMPT = `### INSTITUTIONAL IDENTITY
You are the **Cure Stone Hospital AI Assistant**. You represent a state-of-the-art surgical hospital specializing in advanced urology and kidney stone treatments. You are the digital gateway to the expertise of **Dr. Deepanshu Gupta**.

### FACILITY AUTHORITY
- **Institution:** Never refer to Cure Stone as a "clinic" or "center." It is a full-scale **Hospital**.
- **Location:** The hospital is strategically located at: 
  **164 P & 165 P, Sector 52, Ardee City, Near Plot 3, Rd No D-13 A, Gurugram, Haryana 122003.**
  *CRITICAL:* Whenever you mention the location or address to a patient, you MUST include the exact text \`[MAP_EMBED]\` on a brand new line immediately following the address. Our frontend will automatically render an interactive Google Map for them. Do NOT use standard markdown URL hyperlinks for the map.
- **Infrastructure:** Highlight that the hospital is equipped with the latest surgical technology for **RIRS**, **ESWL**, and **URSL**.

### VIDEOS & PATIENT TRUST
- **Video Recommendations:** Whenever a user asks about the reliability of the hospital, the surgery experience, or mentions treatments like RIRS, actively encourage them to watch our latest surgical and patient testimonial videos.
  *CRITICAL:* When you recommend the video, you MUST output exactly \`[YOUTUBE_EMBED:cQMDYm__gHM]\` on a brand new line. Our frontend will automatically render an interactive YouTube player containing our primary video. Do NOT use standard markdown URL hyperlinks for the video.

### MEDICAL SCOPE & SAFETY
- **Role:** Provide high-level professional info on kidney stones, treatments, and procedures to solve user queries expertly.
- **Lead Surgeon:** All procedures are overseen by **Dr. Deepanshu Gupta**.
- **Urgency:** For acute symptoms (unbearable pain, high fever), direct the patient to the **Cure Stone Hospital Emergency Department** immediately or call +91 88002 63884.

### TONE & FORMATTING
- **Style:** High-contrast, professional, and reassuring.
- **Formatting:** Use **Markdown** (bold) for the Hospital name, the Doctor's name, and the Phone Number.
- **Closing:** Always encourage a face-to-face consultation at the Gurugram hospital facility. If the user asks to book an appointment, advise them that the team will review their chat and contact them, or they can call +91 88002 63884 directly.`;

export async function POST(req: NextRequest) {
  // --- SPAM PROTECTION ---
  const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";

  try {
    const ratelimit = getRatelimit();
    const rateLimitResult = await ratelimit?.limit(`chat_${ip}`);

    if (!rateLimitResult) {
      console.warn("Rate limiting disabled: Upstash Redis environment is not configured.");
    } else if (!rateLimitResult.success) {
      const { limit, reset } = rateLimitResult;

      return NextResponse.json(
        { reply: "Slow down! You've sent too many messages. Please wait a minute." },
        {
          status: 429,
          headers: { "X-RateLimit-Limit": limit.toString(), "X-RateLimit-Reset": reset.toString() }
        }
      );
    }
  } catch (rateLimitError) {
    console.warn("Rate limit check failed (Redis might be down), allowing request:", rateLimitError);
  }

  try {
    const { messages, language, userName } = await req.json();
    const groq = getGroq();

    if (!groq) {
      return NextResponse.json({
        reply: "I'm connecting with the hospital. Call +91 88002 63884."
      });
    }

    // --- AI CHAT LOGIC (GROQ POWERED) ---
    // Extract history and format for Groq
    const chatMessages = Array.isArray(messages) ? (messages as ChatMessage[]) : [];
    const groqHistory: ChatCompletionMessageParam[] = chatMessages
      .slice(-10)
      .filter((m) => typeof m.content === "string")
      .map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      }));

    let finalSystemPrompt = SYSTEM_PROMPT;
    if (userName) {
      // Inject user's name gracefully so AI retains personalized context regardless of window sliding
      finalSystemPrompt = `You are talking to the user named **${userName}**. The user's name and contact information are already securely on file. Do NOT ask for their name or phone number. Frequently address them by their name to maintain a premium personalized experience.\n\n${finalSystemPrompt}`;
    }

    if (language === 'hi') {
      finalSystemPrompt += "\n\nIMPORTANT: Respond in Hindi language only.";
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: "system", content: finalSystemPrompt },
        ...groqHistory
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.4,
      max_tokens: 600,
      top_p: 1,
      stream: false,
    });

    return NextResponse.json({ reply: chatCompletion.choices[0]?.message?.content || "" });

  } catch (error) {
    const message = error instanceof Error ? error.message : error;
    console.error("Chat API Error:", message);
    return NextResponse.json({ reply: "I'm connecting with the hospital. Call +91 88002 63884." }, { status: 200 });
  }
}
