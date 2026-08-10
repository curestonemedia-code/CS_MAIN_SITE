// Next.js's built-in sitemap.xml serializer interpolates video title/
// description fields directly into the XML with no escaping of its own
// (confirmed in next/dist/build/webpack/loaders/metadata/resolve-route-data.js),
// so a raw "&", "<" or ">" in that text breaks the generated sitemap.
// Escape any free-text field passed into a `videos` sitemap entry with this.
export function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
