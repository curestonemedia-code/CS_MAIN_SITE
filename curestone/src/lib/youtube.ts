// Pulls real uploadDate/duration from a video's own YouTube watch page —
// Google's video rich-result guidelines list uploadDate as a required
// property, and fetching it keeps schema accurate without hand-verifying
// and hardcoding each video ID in code.
export async function getYouTubeMeta(ytId: string): Promise<{ uploadDate?: string; duration?: string }> {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${ytId}`, {
      headers: { "User-Agent": "Mozilla/5.0" },
      next: { revalidate: 60 * 60 * 24 * 7 },
    });
    if (!res.ok) return {};
    const html = await res.text();
    const uploadDate = html.match(/"uploadDate":"([^"]+)"/)?.[1];
    const lengthSeconds = html.match(/"lengthSeconds":"(\d+)"/)?.[1];
    let duration: string | undefined;
    if (lengthSeconds) {
      const total = parseInt(lengthSeconds, 10);
      const h = Math.floor(total / 3600);
      const m = Math.floor((total % 3600) / 60);
      const s = total % 60;
      duration = `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s}S`;
    }
    return { uploadDate, duration };
  } catch {
    return {};
  }
}
