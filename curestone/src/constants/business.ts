/**
 * Single source of truth for Cure Stone's NAP (Name, Address, Phone) and
 * related facility facts. The rest of the codebase currently hardcodes this
 * data independently in 15+ files (layout.tsx, Footer.tsx, every procedure
 * page, etc.) with real drift between copies — e.g. layout.tsx's structured
 * address reads "Near Plot 3" while Footer.tsx's display string reads "Near
 * Plot, 3". This file doesn't attempt to fix every existing occurrence; it
 * exists so new pages (starting with the /*-in-gurgaon pillar pages) stop
 * adding a 16th, 17th, 18th independent copy of the same facts.
 */

export const BUSINESS_NAME = "Cure Stone Hospital";

export const PHONE_DISPLAY = "+91 88002 63884";
export const PHONE_TEL = "+918800263884";
export const PHONE_SCHEMA = "+91-88002-63884";

export const EMAIL = "care@thecurestone.com";

export const ADDRESS = {
  streetAddress: "Sector 52, Near Plot 3, Rd No D-13 A, Ardee City",
  addressLocality: "Gurgaon",
  addressRegion: "Haryana",
  postalCode: "122003",
  addressCountry: "IN",
};

export const ADDRESS_DISPLAY = "Sector 52, Near Plot 3, Rd No D-13 A, Ardee City, Gurugram, Haryana 122003";

export const GEO = {
  latitude: "28.4595",
  longitude: "77.0266",
};

export const MAPS_DIRECTIONS_URL = "https://share.google/VjnKWDjoss7qaD1mi";
export const MAPS_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14033.273570394473!2d77.070288!3d28.439817!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19559d21f213%3A0xa736733167a5023b!2sCure%20Stone!5e0!3m2!1sen!2sin!4v1782981388299!5m2!1sen!2sin";

export const CONSULTATION_HOURS = "10:00 AM – 7:00 PM, Monday to Saturday (by appointment)";

/** JSON-LD @id anchors for the sitewide schema graph (defined in layout.tsx / dr-deepanshu-gupta/page.tsx). */
export const ORGANIZATION_ID = "https://thecurestone.com/#organization";
export const PHYSICIAN_ID = "https://thecurestone.com/dr-deepanshu-gupta#physician";
