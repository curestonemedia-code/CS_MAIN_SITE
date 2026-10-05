// Turns a chat reply into display blocks. The widget only knows a small
// markdown subset, so anything outside it is cleaned up here rather than
// shown as literal punctuation (stray "#", "|", "---", or "**").

export type ChatBlock =
  | { type: "space" }
  | { type: "title"; text: string }
  | { type: "heading"; text: string }
  | { type: "bullet"; level: number; text: string }
  | { type: "number"; level: number; n: string; text: string }
  | { type: "para"; text: string };

// Placeholders the model sometimes still writes (any formatting). The app
// adds its own map and video, so these never reach the screen.
export function stripEmbedTags(text: string) {
  return text
    .replace(/[*_`]*\[\s*(MAP_EMBED|YOUTUBE_EMBED[^\]]*)\][*_`]*/gi, "")
    .replace(/^\s*[-*•]\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Removes heading hashes left inside a line of text, e.g. "Title ##" or "## Title".
function cleanText(text: string) {
  return text.replace(/(^|\s)#{1,6}(?=\s|$)/g, "$1").replace(/\s{2,}/g, " ").trim();
}

export function parseBotText(input: string): ChatBlock[] {
  const blocks: ChatBlock[] = [];
  const push = (block: ChatBlock) => {
    if (block.type === "space" && blocks[blocks.length - 1]?.type === "space") return;
    blocks.push(block);
  };

  for (const rawLine of stripEmbedTags(input).split("\n")) {
    const line = rawLine.replace(/\t/g, "  ");

    if (!line.trim()) {
      push({ type: "space" });
      continue;
    }
    // Horizontal rules add nothing in a chat bubble.
    if (/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) continue;

    // Markdown tables: keep the content, drop the separator row.
    if (/^\s*\|/.test(line)) {
      if (/^\s*\|?\s*:?-{2,}/.test(line)) continue;
      const cells = line.split("|").map((c) => cleanText(c)).filter(Boolean);
      if (cells.length) push({ type: "bullet", level: 0, text: cells.join(" — ") });
      continue;
    }

    // Headings in any form: "## Title", "**## Title**", "###Title", "- ## Title".
    const heading =
      line.match(/^\s*(?:\*\*|__)?\s*#{1,6}\s*(.+?)\s*(?:\*\*|__)?\s*$/) ??
      line.match(/^\s*(?:[-*•]\s+)?#{1,6}\s*(.+)$/);
    if (heading) {
      const text = cleanText(heading[1].replace(/\*\*|__/g, ""));
      if (text) push({ type: "heading", text });
      continue;
    }

    const bullet = line.match(/^(\s*)[-*•+]\s+(.*)$/);
    if (bullet) {
      push({ type: "bullet", level: Math.min(3, Math.floor(bullet[1].length / 2)), text: cleanText(bullet[2]) });
      continue;
    }

    const numbered = line.match(/^(\s*)(\d+)[.)]\s+(.*)$/);
    if (numbered) {
      push({
        type: "number",
        level: Math.min(3, Math.floor(numbered[1].length / 2)),
        n: numbered[2],
        text: cleanText(numbered[3]),
      });
      continue;
    }

    // A line that is only a bold label is a section title.
    const title = line.trim().match(/^\*\*([^*]+?)\*\*:?$/);
    if (title) {
      push({ type: "title", text: cleanText(title[1]) });
      continue;
    }

    push({ type: "para", text: cleanText(line) });
  }

  while (blocks[blocks.length - 1]?.type === "space") blocks.pop();
  return blocks;
}

// Splits inline **bold**, *italic* and _italic_ spans. Underscores inside words
// (e.g. CT_KUB) are left alone.
export function splitInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|\*[^*\s][^*]*?\*|(?<![A-Za-z0-9])_[^_\s][^_]*?_(?![A-Za-z0-9]))/g).map((part) => {
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) return { kind: "bold" as const, text: part.slice(2, -2) };
    if (part.length > 2 && ((part.startsWith("*") && part.endsWith("*")) || (part.startsWith("_") && part.endsWith("_")))) {
      return { kind: "italic" as const, text: part.slice(1, -1) };
    }
    return { kind: "text" as const, text: part };
  });
}
