export interface ServiceDetail {
  slug: string;
  icon: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  treatments: string[];
  stats: { label: string; value: string }[];
  features: string[];
  symptoms: string[];
  emergencySigns: string[];
  videoGallery: { ytId: string; title: string; tag: string }[];
  faqs: { q: string; a: string }[];
}

export const SERVICES: ServiceDetail[] = [
  {
    slug: "kidney-stone-treatment",
    icon: "🔬",
    name: "Kidney Stone Treatment",
    shortDesc: "FANS-RIRS, ESWL, URSL, PCNL — tailored to stone size, location and clinical findings.",
    fullDesc: "We offer a comprehensive spectrum of kidney stone treatments, from non-invasive shockwave lithotripsy to advanced laser surgeries. FANS-RIRS (Fluoroscopy-free RIRS) may reduce X-ray exposure in suitable cases while supporting precise laser stone treatment.",
    treatments: ["RIRS Laser Surgery", "ESWL Lithotripsy", "URSL (Ureteroscopy)", "Mini-PCNL"],
    stats: [
      { label: "Care Focus", value: "RIRS" },
      { label: "Procedures", value: "9,000+" },
      { label: "Recovery", value: "24 Hrs" }
    ],
    features: [
      "Zero Radiation (FANS-RIRS)",
      "Case-based Treatment Planning",
      "Natural-pathway RIRS Option",
      "Advanced Laser Tech"
    ],
    symptoms: [
      "Sharp pain in the side and back, below the ribs",
      "Pain that radiates to the lower abdomen and groin",
      "Pink, red or brown urine (blood in urine)",
      "Nausea and vomiting"
    ],
    emergencySigns: [
      "Pain accompanied by fever and chills",
      "Difficulty passing urine",
      "Pain so severe that you can't sit still"
    ],
    videoGallery: [
      { ytId: "K5va1bE282M", title: "How RIRS Laser Surgery Works — Complete Guide", tag: "Procedure" },
      { ytId: "aHsGua3WaVM", title: "Kidney Stone Prevention — Diet & Hydration", tag: "Education" },
      { ytId: "qobqvzQ6za4", title: "DJ Stent Removal — Complete Walkthrough", tag: "Post-op" }
    ],
    faqs: [
      { q: "How long does RIRS surgery take?", a: "Typically, the procedure takes between 45 to 90 minutes depending on the stone size and complexity." },
      { q: "When can I return to normal activities?", a: "Most patients return to sedentary work within 48 hours and full physical activity within a week." },
      { q: "Is the laser treatment safe?", a: "Yes, Holmium/Thulium lasers are extremely precise, targeting only the stone without damaging surrounding tissue." }
    ]
  },
  {
    slug: "",
    icon: "⚕️",
    name: "Urology & Andrology",
    shortDesc: "Expert diagnosis for prostate issues, UTIs, male sexual health and urological disorders.",
    fullDesc: "Dedicated care for all urological conditions and male reproductive health. Our team specializes in precision diagnosis and treatment of prostate enlargement (BPH), recurrent UTIs, and male fertility concerns using the latest medical protocols.",
    treatments: ["BPH Treatment (HoLEP/TURP)", "Prostate Screening", "Male Infertility Care", "UTI Management", "Circumcision", "Varicocel", "Hydrocele", "Urethral Stricture"],
    stats: [
      { label: "Expert Doctors", value: "15+ Yrs Exp" },
      { label: "Patient Trust", value: "30,000+" },
      { label: "Diagnostics", value: "In-house" }
    ],
    features: [
      "Privacy & Confidentiality",
      "Advanced Urodynamics",
      "Minimally Invasive TURP",
      "Evidence-based Protocols"
    ],
    symptoms: [
      "Frequent or urgent need to urinate",
      "Increased frequency of urination at night",
      "Difficulty starting urination or weak stream",
      "Pain or burning during urination"
    ],
    emergencySigns: [
      "Complete inability to urinate",
      "Severe pain in the bladder area",
      "Visible blood in urine with clots"
    ],
    videoGallery: [
      { ytId: "cQMDYm__gHM", title: "Understanding Prostate Enlargement (BPH)", tag: "Education" },
      { ytId: "K5va1bE282M", title: "Advanced Urological Screenings", tag: "Diagnostics" }
    ],
    faqs: [
      { q: "Is prostate enlargement always cancer?", a: "No, most cases are Benign Prostatic Hyperplasia (BPH), which is a non-cancerous growth of the prostate." },
      { q: "At what age should men start urological checkups?", a: "Men over 50 should have annual checkups, or starting at 45 if there is a family history." }
    ]
  },
  {
    slug: "",
    icon: "🫚",
    name: "Gallbladder Stone Treatment",
    shortDesc: "Laparoscopic cholecystectomy for gallbladder stones — minimally invasive, fast recovery.",
    fullDesc: "Specialized focus on gallbladder health and surgical management of gallstones. We utilize state-of-the-state laparoscopic technology (Keyhole surgery) to ensure minimal discomfort and rapid return to normal activities.",
    treatments: ["Laparoscopic Cholecystectomy", "Diagnostic Ultrasound", "Post-op Nutrition Plan", "Single-port Surgery Options"],
    stats: [
      { label: "Surgery Time", value: "45-60 Mins" },
      { label: "Discharge", value: "Within 24 Hours" },
      { label: "Safety", value: "Gold Standard" }
    ],
    features: [
      "Minimal Scarring",
      "Fastest Recovery Time",
      "Expert Laparoscopic Team",
      "Comprehensive Care Path"
    ],
    symptoms: [
      "Sudden and rapidly intensifying pain in the upper right abdomen",
      "Pain in the center of your abdomen, just below your breastbone",
      "Back pain between your shoulder blades",
      "Nausea or vomiting"
    ],
    emergencySigns: [
      "Yellowing of your skin and the whites of your eyes (jaundice)",
      "High fever with chills",
      "Severe abdominal pain that makes it impossible to sit comfortably"
    ],
    videoGallery: [
      { ytId: "K5va1bE282M", title: "Laparoscopic Gallbladder Surgery Explained", tag: "Procedure" },
      { ytId: "aHsGua3WaVM", title: "Dietary Changes After Gallbladder Removal", tag: "Recovery" }
    ],
    faqs: [
      { q: "Can I live normally without a gallbladder?", a: "Yes, the liver continues to produce bile. Most patients experience no long-term dietary restrictions." },
      { q: "Why choice laparoscopic over open surgery?", a: "Laparoscopic surgery involves smaller incisions, less pain, and much faster recovery times." }
    ]
  }
];
