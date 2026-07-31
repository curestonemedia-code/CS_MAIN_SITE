import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const viewport: Viewport = {
  themeColor: "#1e3a8a",
  width: "device-width",
  initialScale: 1,
};

const SITE_URL = "https://thecurestone.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cure Stone | Kidney Stone Surgery in Gurgaon",
    template: "%s | Cure Stone",
  },
  description:
    "Cure Stone offers kidney stone surgery in Gurgaon, including RIRS, PCNL, ESWL and URSL care at Sector 52. Book a consultation with a urologist doctor in Gurgaon.",
  keywords: [
    "kidney stone surgery Gurgaon",
    "RIRS laser surgery",
    "kidney stone treatment Sector 52 Gurgaon",
    "urologist doctor Gurgaon",
    "urologist Gurgaon near me",
    "urologist in Gurgaon",
    "laser stone removal",
    "PCNL surgery",
    "ESWL treatment",
    "kidney stone specialist",
    "kidney stone hospital in Gurgaon",
    "RIRS surgery in Gurgaon",
    "RIRS surgery cost in Gurgaon",
    "Cure Stone",
    "thecurestone",
    "kidney stone doctor gurgaon",
  ],
  authors: [{ name: "Cure Stone Medical Team", url: SITE_URL }],
  creator: "Cure Stone",
  publisher: "Cure Stone Private Limited",
  category: "Healthcare / Urology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "Cure Stone",
    title: "Cure Stone | Kidney Stone Surgery in Gurgaon",
    description:
      "Kidney stone surgery in Gurgaon with RIRS, PCNL, ESWL and URSL options at Cure Stone Hospital, Sector 52.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Cure Stone – Advanced Kidney Stone Laser Surgery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@curestone_in",
    creator: "@curestone_in",
    title: "Cure Stone | Kidney Stone Surgery in Gurgaon",
    description:
      "RIRS laser surgery and kidney stone treatment in Gurgaon. Book a consultation at Cure Stone Hospital, Sector 52.",
    images: ["/og-image.svg"],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-IN": SITE_URL,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
    ],
  },
  manifest: "/site.webmanifest",
};

// JSON-LD Structured Data
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: "Cure Stone",
  alternateName: "The Cure Stone",
  description:
    "Advanced kidney stone treatment hospital offering RIRS, PCNL and ESWL laser surgery in Sector 52, Gurgaon.",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/PNG-Black-e1664728676618.png`,
    width: 400,
    height: 100,
  },
  image: `${SITE_URL}/og-image.svg`,
  telephone: "+91-88002-63884",
  email: "care@thecurestone.com",
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Credit Card, Insurance, EMI",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sector 52, Near Plot 3, Rd No D-13 A, Ardee City",
    addressLocality: "Gurgaon",
    addressRegion: "Haryana",
    postalCode: "122003",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "28.4595",
    longitude: "77.0266",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "20:00",
    },
  ],
  medicalSpecialty: "Urology",
  availableService: [
    {
      "@type": "MedicalProcedure",
      name: "RIRS – Retrograde Intrarenal Surgery",
    },
    {
      "@type": "MedicalProcedure",
      name: "PCNL – Percutaneous Nephrolithotomy",
    },
    {
      "@type": "MedicalProcedure",
      name: "ESWL – Extracorporeal Shock Wave Lithotripsy",
    },
    { "@type": "MedicalProcedure", name: "URSL – Ureteroscopic Lithotripsy" },
  ],
  sameAs: [
    "https://www.facebook.com/curestone/",
    "https://www.instagram.com/the_cure_stone/",
    "https://www.youtube.com/c/Urogyaan",
    "https://www.linkedin.com/company/cure-stone/",
    "https://thecurestone.com",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "500",
    bestRating: "5",
    worstRating: "1",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Cure Stone",
  description: "Kidney Stone Surgery in Gurgaon",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
  inLanguage: "en-IN",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${poppins.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Warms the DNS/TLS connection to the CRM ahead of form submission,
            since it's a separate origin from this site's own hosting. */}
        <link rel="preconnect" href="https://crm.thecurestone.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://crm.thecurestone.com" />
        <meta name="geo.region" content="IN-HR" />
        <meta name="geo.placename" content="Gurgaon, Haryana, India" />
        <meta name="geo.position" content="28.4595;77.0266" />
        <meta name="ICBM" content="28.4595, 77.0266" />
      </head>
      <body className="font-sans min-h-full flex flex-col">{children}</body>
      <GoogleAnalytics gaId="G-DH8MHSNF6C" />
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "xuzdy1huhv");`}
      </Script>
    </html>
  );
}
