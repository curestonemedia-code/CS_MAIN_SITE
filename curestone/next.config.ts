import type { NextConfig } from "next";

// Migration redirects from the pre-2026-07-13 URL structure (WordPress →
// this Next.js/Sanity site). Most old URLs already resolve correctly via
// built-in app logic (trailing-slash normalization + the category-mismatch
// fallback in src/app/[category]/[slug]/page.tsx and the legacy-flat-slug
// fallback in src/app/[category]/page.tsx) — these entries exist only for
// the URLs that logic can't already resolve in a single hop: two-hop
// redirect chains it would otherwise produce, slug renames, and a handful
// of genuinely mistyped/garbled links. See gsc-redirect-audit notes.
//
// 410 Gone (WordPress feeds/date archives/login/search artifacts, and
// retired condition pages with no current equivalent) is handled in
// src/proxy.ts instead, since redirects() only supports 3xx status codes.
const MIGRATION_REDIRECTS: Array<{ source: string; destination: string }> = [
  // --- Redirect-chain flattening: old category prefix no longer matches
  // the post's current category in Sanity, producing a 2-hop redirect
  // (trailing-slash strip, then the app's own category-correction redirect).
  {
    source: "/kidney-stones/kidney-stones-while-pregnant-can-you-wait-until-delivery",
    destination: "/kidney/kidney-stones-while-pregnant-can-you-wait-until-delivery",
  },
  { source: "/uncategorized/how-much-time-does-rirs-take", destination: "/treatment-option/how-much-time-does-rirs-take" },
  {
    source: "/kidney-stones/role-of-ultrasound-ct-scan-in-diagnosing-kidney-stones",
    destination: "/kidney/role-of-ultrasound-ct-scan-in-diagnosing-kidney-stones",
  },
  {
    source: "/kidney-stones/why-are-aftercare-follow-up-important-after-kidney-stone-surgery",
    destination: "/kidney/why-are-aftercare-follow-up-important-after-kidney-stone-surgery",
  },
  { source: "/kidney-stones/the-recovery-after-kidney-stone-surgery", destination: "/kidney/the-recovery-after-kidney-stone-surgery" },
  { source: "/uncategorized/does-pushing-help-pass-kidney-stones", destination: "/kidney-stones/does-pushing-help-pass-kidney-stones" },
  { source: "/uncategorized/are-there-any-disadvantages-of-rirs", destination: "/kidney/are-there-any-disadvantages-of-rirs" },
  {
    source: "/uncategorized/the-role-of-diet-in-kidney-stone-formation-prevention",
    destination: "/kidney-stones/the-role-of-diet-in-kidney-stone-formation-prevention",
  },
  {
    source: "/uncategorized/in-which-kidney-stone-cases-is-the-eswl-method-helpful",
    destination: "/kidney-stones/in-which-kidney-stone-cases-is-the-eswl-method-helpful",
  },

  // --- Garbled non-ASCII-dash encoding in the slug (both the "e28091"-style
  // and the literal U+2011 non-breaking-hyphen variants Google recorded).
  {
    source: "/blog/dj-stent-doublee28091j-explained-uses-benefits-faqs",
    destination: "/dj-stent/dj-stent-doublej-explained-uses-benefits-faqs",
  },
  {
    source: "/blog/poste28091surgical-care-after-urological-procedures-essential-tips-for-recovery",
    destination: "/kidney/post-surgical-care-after-urological-procedures-essential-tips-for-recovery",
  },
  {
    source: "/dj-stent/dj-stent-double%E2%80%91j-explained-uses-benefits-faqs",
    destination: "/dj-stent/dj-stent-doublej-explained-uses-benefits-faqs",
  },
  {
    source: "/kidney/post%E2%80%91surgical-care-after-urological-procedures-essential-tips-for-recovery",
    destination: "/kidney/post-surgical-care-after-urological-procedures-essential-tips-for-recovery",
  },

  // --- Slug rename / stray old variant.
  { source: "/blog/the-best-treatment-for-7mm-kidney-stones", destination: "/kidney-stones/best-treatment-for-7mm-kidney-stones" },
  {
    source: "/kidney-stones/why-patients-from-all-over-india-come-to-curestone",
    destination: "/kidney-stones/why-patients-from-all-over-globe-come-to-cure-stone",
  },

  // --- Real, published Hindi posts (truncated old slugs).
  {
    source: "/kidney/%E0%A4%8F%E0%A4%95-%E0%A4%95%E0%A4%BF%E0%A4%A1%E0%A4%A8%E0%A5%80-%E0%A4%B5%E0%A4%BE%E0%A4%B2%E0%A5%87-%E0%A4%AE%E0%A4%B0%E0%A5%80%E0%A4%9C-%E0%A4%95%E0%A5%87-%E0%A4%B2%E0%A4%BF%E0%A4%8F-%E0%A4%95",
    destination: "/kidney/एक-किडनी-वाले-मरीज-के-लिए-कौन-सी-सर्जरी-सुरक्षित-है",
  },
  {
    source: "/kidney-stones/%E0%A4%95%E0%A4%BF%E0%A4%A1%E0%A4%A8%E0%A5%80-%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A5%8B%E0%A4%A8-%E0%A4%AC%E0%A4%BE%E0%A4%B0-%E0%A4%AC%E0%A4%BE%E0%A4%B0-%E0%A4%95%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%82",
    destination: "/kidney-stones/किडनी-स्टोन-बार-बार-क्यों-बनते-हैं",
  },
  {
    source: "/kidney-stones/%E0%A4%95%E0%A4%BF%E0%A4%A1%E0%A4%A8%E0%A5%80-%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A5%8B%E0%A4%A8-%E0%A4%95%E0%A5%87-%E0%A4%B2%E0%A4%BF%E0%A4%8F-%E0%A4%B2%E0%A5%87%E0%A4%9C%E0%A4%BC%E0%A4%B0-%E0%A4%B8",
    destination: "/kidney-stones/किडनी-स्टोन-लेज़र-सर्जरी-कितनी-सुरक्षित-है",
  },
  {
    source: "/treatment-option/%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A5%8B%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A5%87%E0%A4%9F-%E0%A4%AC%E0%A4%A2%E0%A4%BC%E0%A4%A8%E0%A5%87-%E0%A4%AA%E0%A4%B0-%E0%A4%B9%E0%A4%AE%E0%A5%87%E0%A4%B6%E0%A4%BE",
    destination: "/treatment-option/प्रोस्टेट-बढ़ने-पर-हमेशा-सर्जरी-ज़रूरी-है-क्या",
  },
  {
    source: "/kidney/%E0%A4%95%E0%A4%BF%E0%A4%A1%E0%A4%A8%E0%A5%80-%E0%A4%94%E0%A4%B0-%E0%A4%AC%E0%A5%8D%E0%A4%B2%E0%A5%88%E0%A4%A1%E0%A4%B0-%E0%A4%B9%E0%A5%87%E0%A4%B2%E0%A5%8D%E0%A4%A5-%E0%A4%95%E0%A5%87-%E0%A4%B2",
    destination: "/kidney/किडनी-और-ब्लैडर-हेल्थ-के-लिए-बेस्ट-डाइट",
  },

  // --- Old WordPress condition/utility pages with a direct current equivalent.
  { source: "/contact-us", destination: "/contact" },
  { source: "/kidney-stone-treatment", destination: "/specialties/kidney-stone-treatment" },
  { source: "/pelviureteric-junction-obstruction", destination: "/kidney-stones/pelvi-ureteric-junction-obstruction-pujo" },
  { source: "/blogs", destination: "/blog" },
  { source: "/kidney-stone", destination: "/kidney-stones" },
  { source: "/mini-percpcnl", destination: "/mini-pcnl" },
  { source: "/sector-52Location", destination: "/sector-52" },
  { source: "/blogBlogs", destination: "/blog" },
  { source: "/faqsFAQs", destination: "/faqs" },
  { source: "/urinary-tract-infections", destination: "/treatment-option/urinary-tract-infection-uti-diagnosis-treatment" },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...MIGRATION_REDIRECTS.map((r) => ({ ...r, permanent: true })),

      // Old WordPress category archive/pagination pages → the matching
      // current category listing (page number dropped: post counts differ
      // from the old site, so preserving it risks landing on an empty page).
      { source: "/category/:slug/page/:num", destination: "/:slug", permanent: true },
      { source: "/category/:slug", destination: "/:slug", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        port: "",
        pathname: "/vi/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
