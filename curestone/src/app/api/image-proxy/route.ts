import { NextRequest, NextResponse } from "next/server";

// cdn.sanity.io doesn't send Access-Control-Allow-Origin, so a browser can
// display these images in an <img> tag fine but a same-page fetch() (which
// @react-pdf/renderer's client-side Image component needs, to get raw bytes
// to embed in the generated PDF) is blocked by CORS. This proxies the
// request through our own origin, which has no CORS restriction server-side.
// Locked to cdn.sanity.io only — this must never become an open proxy.
const ALLOWED_HOST = "cdn.sanity.io";

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (parsed.protocol !== "https:" || parsed.hostname !== ALLOWED_HOST) {
    return NextResponse.json({ error: `Only https://${ALLOWED_HOST} URLs are allowed` }, { status: 400 });
  }

  const upstream = await fetch(parsed, { cache: "force-cache" });
  if (!upstream.ok || !upstream.body) {
    return NextResponse.json({ error: `Upstream fetch failed with ${upstream.status}` }, { status: 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "image/jpeg",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
