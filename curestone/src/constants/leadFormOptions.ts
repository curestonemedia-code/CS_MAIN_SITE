/**
 * Single source of truth for the lead-capture form's category taxonomy,
 * shared by every form occurrence on this site (LocationLeadForm, embedded
 * in AppointmentForm's homepage section and the /book page). Kept in sync
 * by hand with the equivalent file in the Dr. Deepanshu Gupta repo - the two
 * sites are separate deploys with no shared package to import between them.
 */

export const CATEGORIES = [
  "Kidney Stone Treatment",
  "Urology & Andrology",
  "Gall Bladder Stone Surgery",
] as const;

export type Category = (typeof CATEGORIES)[number];

/** Categories where the Stone Size field is shown instead of Sub-treatment. */
export const STONE_SIZE_CATEGORIES: Category[] = ["Kidney Stone Treatment", "Gall Bladder Stone Surgery"];

/** The one category where the Sub-treatment field is shown instead of Stone Size. */
export const SUB_TREATMENT_CATEGORY: Category = "Urology & Andrology";

export const STONE_SIZES = [
  "Less than 5mm",
  "5mm - 10mm",
  "10mm - 15mm",
  "15mm - 20mm",
  "20mm - 30mm",
  "Greater than 30mm",
  "Unknown / Not Diagnosed",
];

export const SUB_TREATMENTS = [
  "Circumcision (Laser/Stapler)",
  "Pyeloplasty",
  "Ureteroplasty",
  "TURP",
  "HoLEP",
  "Frenuloplasty",
  "Urethral Stricture",
];
