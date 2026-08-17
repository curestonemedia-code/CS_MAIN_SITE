import { NextRequest, NextResponse } from "next/server";

// Migration cleanup: URLs from the pre-2026-07-13 WordPress site that are
// genuinely retired, not just moved. redirects() in next.config.ts only
// supports 3xx status codes, so anything that should return 410 Gone
// (rather than a redirect or a plain 404) is handled here instead. 410
// tells Google to drop the URL from the index faster than a 404 would.
//
// Matched without a trailing slash: Next's default trailing-slash redirect
// runs before proxy sees the request, so the path always arrives stripped.
const GONE_PATTERNS: RegExp[] = [
  // WordPress RSS feeds — this site has none. Covers post feeds
  // (/kidney/some-post/feed), category feeds (/category/x/feed), the
  // author feed, and the old search feed.
  /\/feed$/,
  // WordPress monthly archive pages, e.g. /2025/12, /2024/08.
  /^\/\d{4}\/\d{2}$/,
  // WordPress login/lost-password probes (incl. ?redirect_to=... variants).
  /^\/wp-login\.php/,
  // Old WordPress sitelinks-searchbox URL template; the current WebSite
  // schema uses /blog?q= instead.
  /^\/search\//,
  // Cloudflare's email-obfuscation decoder path — not a real page.
  /^\/cdn-cgi\//,
];

// Retired condition pages with no current equivalent on the site.
const GONE_EXACT_PATHS = new Set<string>([
  "/urological-cancer",
  "/urethral-stricture",
  "/neurogenic-bladder-problem",
]);

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (GONE_EXACT_PATHS.has(pathname) || GONE_PATTERNS.some((re) => re.test(pathname))) {
    return new NextResponse("Gone", { status: 410 });
  }

  return NextResponse.next();
}

export const config = {
  // Skip static assets and Next internals; every actual page request still
  // passes through so the patterns above can match.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
