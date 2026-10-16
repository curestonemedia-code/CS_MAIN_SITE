import { NextRequest, NextResponse } from "next/server";
import { syncVideos } from "@/lib/youtubeSync";

// Invoked on a schedule by vercel.json's "crons" entry. Vercel attaches
// `Authorization: Bearer ${CRON_SECRET}` automatically to its own cron
// invocations when CRON_SECRET is set as a project env var — this check is
// what stops the endpoint being triggerable by anyone who finds the URL.
export async function GET(request: NextRequest) {
  const expected = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!expected || authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const summary = await syncVideos();
    return NextResponse.json(summary);
  } catch (error) {
    console.error("[cron/sync-youtube] failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Sync failed" },
      { status: 500 }
    );
  }
}
