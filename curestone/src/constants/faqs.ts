export type FaqItem = {
  q: string;
  a: string;
};

export type FaqCategory = {
  slug: string;
  title: string;
  relatedHref?: string;
  relatedLabel?: string;
  items: FaqItem[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    slug: "rirs",
    title: "RIRS Laser Surgery",
    relatedHref: "/rirs",
    relatedLabel: "RIRS Surgery in Gurgaon",
    items: [
      {
        q: "What is RIRS?",
        a: "RIRS stands for Retrograde Intrarenal Surgery. It is a minimally invasive procedure used to treat kidney stones by inserting a flexible ureteroscope through the urinary tract to access and remove stones from the kidney.",
      },
      {
        q: "How does RIRS work?",
        a: "During RIRS, a flexible ureteroscope is passed through the urethra, bladder, and ureter to reach the kidney. The stones are then fragmented using laser energy and removed using a basket.",
      },
      {
        q: "What are the advantages of RIRS over traditional surgery?",
        a: "RIRS is minimally invasive, involves no external incisions, has a shorter recovery time, and generally causes less pain compared to traditional open or laparoscopic surgery.",
      },
      {
        q: "Who is a candidate for RIRS?",
        a: "Patients with small to medium-sized kidney stones, those who cannot undergo shock wave lithotripsy, or individuals who prefer a minimally invasive approach are good candidates for RIRS.",
      },
      {
        q: "Is RIRS a painful procedure?",
        a: "RIRS is performed under anesthesia, so patients do not feel pain during the procedure. Post-operative pain is generally mild and manageable with medication.",
      },
      {
        q: "How long does it take to recover from RIRS?",
        a: "Most patients can return to normal activities within a few days. Full recovery typically occurs within one to two weeks, depending on the individual's condition and overall health.",
      },
      {
        q: "Are there any risks associated with RIRS?",
        a: "As with any medical procedure, there are risks, including infection, bleeding, injury to the urinary tract, and the possibility of residual stone fragments. However, these risks are relatively low.",
      },
      {
        q: "What should I expect after RIRS?",
        a: "After RIRS, you may experience mild discomfort, blood in the urine, and the need to urinate frequently. These symptoms usually resolve within a few days.",
      },
      {
        q: "How successful is RIRS in treating kidney stones?",
        a: "RIRS has a high success rate for removing kidney stones, with most patients being stone-free after the procedure. The success depends on the size, location, and number of stones.",
      },
      {
        q: "Can RIRS be used for all types of kidney stones?",
        a: "RIRS is effective for most types of kidney stones, especially those located within the kidney. However, the suitability of RIRS depends on the stone's size, location, and patient's anatomy.",
      },
      {
        q: "How long does an RIRS procedure take?",
        a: "The duration of the procedure varies but typically ranges from one to three hours, depending on the complexity of the case and the number of stones.",
      },
      {
        q: "Do I need to follow any special instructions before undergoing RIRS?",
        a: "Your doctor will provide specific pre-operative instructions, which may include fasting, stopping certain medications, and completing any necessary pre-surgical tests.",
      },
      {
        q: "What are the alternatives to RIRS for treating kidney stones?",
        a: "Alternatives include Extracorporeal Shock Wave Lithotripsy (ESWL), Ureteroscopy (URSL), and Percutaneous Nephrolithotomy (PCNL). The best treatment option depends on the stone's characteristics and patient's health.",
      },
      {
        q: "How can I prevent kidney stones from forming in the future?",
        a: "To prevent kidney stones, stay hydrated, follow a balanced diet low in salt and oxalates, and avoid excessive intake of calcium supplements. Regular follow-up with your healthcare provider is also important for monitoring and managing any underlying conditions that may contribute to stone formation.",
      },
    ],
  },
  {
    slug: "kidney-stones",
    title: "Kidney Stone Symptoms & Prevention",
    relatedHref: "/checker",
    relatedLabel: "Check My Symptoms",
    items: [
      {
        q: "What is the best treatment for a kidney stone larger than 20mm?",
        a: "Stones larger than 20mm, including staghorn stones, are generally treated with Mini PCNL, a minimally invasive keyhole procedure that clears large stones in a single session. Your urologist confirms suitability based on your CT KUB scan.",
      },
      {
        q: "Can kidney stones be treated without surgery?",
        a: "Small stones — typically under 5mm — may pass naturally with hydration and medication. Larger or symptomatic stones usually need a procedure such as ESWL, RIRS, URSL or Mini PCNL, chosen based on stone size and location.",
      },
      {
        q: "What foods should I avoid to prevent kidney stones from coming back?",
        a: "Reducing salt, animal protein and oxalate-rich foods (such as spinach and nuts), while staying well-hydrated, can lower the risk of recurrent kidney stones. Ask your urologist for a diet plan suited to your specific stone type.",
      },
      {
        q: "How do doctors diagnose a kidney stone?",
        a: "Diagnosis typically involves a CT KUB scan or ultrasound to confirm the stone's size, number and location, along with urine and blood tests to assess kidney function and stone composition risk.",
      },
      {
        q: "What are the early warning signs of a kidney stone?",
        a: "Common early signs include sharp pain in the side or back, blood in the urine, nausea, and pain radiating towards the lower abdomen or groin. Seek immediate care if pain is accompanied by fever or chills.",
      },
    ],
  },
  {
    slug: "pcnl",
    title: "Mini PCNL Surgery",
    relatedHref: "/mini-pcnl",
    relatedLabel: "Mini PCNL Surgery",
    items: [
      {
        q: "What is the recovery time after Mini PCNL surgery?",
        a: "Most patients stay in hospital for 1 to 2 days after Mini PCNL and resume light activity within a week, depending on stone complexity and overall health.",
      },
      {
        q: "Is Mini PCNL surgery safe for large or staghorn kidney stones?",
        a: "Yes. Mini PCNL is specifically designed for large and staghorn stones (20mm and above) that are not suitable for ESWL or RIRS, using a small keyhole tract for high stone clearance in a single session.",
      },
    ],
  },
  {
    slug: "eswl",
    title: "ESWL Lithotripsy",
    relatedHref: "/eswl",
    relatedLabel: "ESWL Lithotripsy",
    items: [
      {
        q: "How many ESWL sessions are needed to break a kidney stone?",
        a: "Smaller stones may clear in a single ESWL session, while larger stones sometimes need 2 to 3 sessions spaced a few weeks apart. Your urologist assesses progress with follow-up imaging between sessions.",
      },
      {
        q: "Does ESWL require anesthesia?",
        a: "Most ESWL sessions are performed without general anesthesia, using mild sedation or pain relief since the procedure is non-invasive and typically lasts 45 to 60 minutes.",
      },
    ],
  },
  {
    slug: "ursl",
    title: "URSL Treatment",
    relatedHref: "/ursl",
    relatedLabel: "URSL Treatment",
    items: [
      {
        q: "What is the difference between URSL and RIRS?",
        a: "URSL uses a rigid or semi-rigid scope and is generally used for stones in the mid or lower ureter, while RIRS uses a flexible scope to reach stones inside the kidney or upper ureter.",
      },
    ],
  },
  {
    slug: "gallbladder",
    title: "Gallbladder Stone Surgery",
    relatedHref: "/specialties/gallbladder-stone-treatment",
    relatedLabel: "Gallbladder Stone Treatment",
    items: [
      {
        q: "How soon can I return to work after gallbladder stone surgery?",
        a: "Most patients undergoing laparoscopic cholecystectomy return to desk-based work within a week, with full recovery typically within 2 to 3 weeks.",
      },
      {
        q: "Can I live a normal life without a gallbladder?",
        a: "Yes. The liver continues producing bile after gallbladder removal, and most patients have no long-term dietary restrictions.",
      },
    ],
  },
  {
    slug: "rirs-gurgaon",
    title: "RIRS in Gurgaon — Hospital & Booking",
    relatedHref: "/rirs-in-gurgaon",
    relatedLabel: "RIRS in Gurgaon",
    items: [
      {
        q: "Where is Cure Stone Hospital located for RIRS surgery in Gurgaon?",
        a: "Cure Stone Hospital is located in Sector 52, Ardee City, Gurgaon, Haryana 122003. Full directions and a map are available on the RIRS in Gurgaon page.",
      },
      {
        q: "How do I book RIRS surgery at Cure Stone, Gurgaon?",
        a: "You can book a free video consultation or an in-clinic appointment with Dr. Deepanshu Gupta through the online booking form or by calling +91 88002 63884. Your CT KUB scan is reviewed before confirming RIRS as the right procedure.",
      },
      {
        q: "Is parking available at Cure Stone Hospital, Sector 52?",
        a: "Yes, on-site parking is available for patients and attendants visiting for RIRS consultations or surgery.",
      },
    ],
  },
  {
    slug: "mini-pcnl-gurgaon",
    title: "Mini-PCNL in Gurgaon — Hospital & Booking",
    relatedHref: "/mini-pcnl-in-gurgaon",
    relatedLabel: "Mini-PCNL in Gurgaon",
    items: [
      {
        q: "Where is Mini-PCNL surgery performed in Gurgaon?",
        a: "Mini-PCNL procedures at Cure Stone are performed at the hospital's Sector 52, Ardee City facility in Gurgaon, Haryana 122003.",
      },
      {
        q: "How do I book a Mini-PCNL consultation at Cure Stone, Gurgaon?",
        a: "Book a free video consultation or an in-clinic appointment with Dr. Deepanshu Gupta through the online booking form or by calling +91 88002 63884, with your CT KUB scan ready for review.",
      },
      {
        q: "Does Cure Stone Hospital in Gurgaon assist with cashless insurance for Mini-PCNL?",
        a: "Yes, most Mini-PCNL procedures are covered under cashless health insurance when medically indicated, and Cure Stone's team assists with documentation and approvals.",
      },
    ],
  },
  {
    slug: "eswl-gurgaon",
    title: "ESWL in Gurgaon — Hospital & Booking",
    relatedHref: "/eswl-in-gurgaon",
    relatedLabel: "ESWL in Gurgaon",
    items: [
      {
        q: "Where can I get ESWL treatment in Gurgaon?",
        a: "ESWL sessions at Cure Stone are performed at the hospital's Sector 52, Ardee City facility in Gurgaon, Haryana 122003.",
      },
      {
        q: "How do I book an ESWL session at Cure Stone, Gurgaon?",
        a: "Book a free video consultation or an in-clinic appointment with Dr. Deepanshu Gupta through the online booking form or by calling +91 88002 63884. ESWL sessions are scheduled after your CT KUB scan is reviewed.",
      },
      {
        q: "Is ESWL available as a same-day outpatient procedure at Cure Stone, Gurgaon?",
        a: "Yes, ESWL is typically an outpatient procedure at Cure Stone's Gurgaon facility, with most patients going home the same day.",
      },
    ],
  },
  {
    slug: "ursl-gurgaon",
    title: "URSL in Gurgaon — Hospital & Booking",
    relatedHref: "/ursl-in-gurgaon",
    relatedLabel: "URSL in Gurgaon",
    items: [
      {
        q: "Where is URSL surgery performed in Gurgaon?",
        a: "URSL procedures at Cure Stone are performed at the hospital's Sector 52, Ardee City facility in Gurgaon, Haryana 122003.",
      },
      {
        q: "Can I book an urgent URSL consultation at Cure Stone, Gurgaon?",
        a: "Yes — ureteric stones causing severe pain or blockage can be urgent. Call +91 88002 63884 directly for priority scheduling, or use the online booking form for a standard consultation.",
      },
      {
        q: "How do I book a URSL consultation at Cure Stone, Gurgaon?",
        a: "Book a free video consultation or an in-clinic appointment with Dr. Deepanshu Gupta through the online booking form or by calling +91 88002 63884, with your CT KUB scan ready for review.",
      },
    ],
  },
  {
    slug: "cost-appointments",
    title: "Cost, Insurance & Appointments",
    relatedHref: "/book",
    relatedLabel: "Book a Consultation",
    items: [
      {
        q: "Does health insurance cover kidney stone surgery in Gurgaon?",
        a: "Most kidney stone procedures, including RIRS, Mini PCNL, ESWL and URSL, are covered under cashless health insurance when medically indicated. Cure Stone's team assists with insurance documentation and approvals.",
      },
      {
        q: "How much does kidney stone treatment cost?",
        a: "Cost depends on the stone size, the procedure recommended, and the length of hospital stay required. Book a consultation for a personalised estimate — the first video consultation is free and in-clinic consultations start at ₹800.",
      },
      {
        q: "How do I book an appointment with a urologist in Gurgaon?",
        a: "You can book a free video consultation or an in-clinic appointment with Dr. Deepanshu Gupta at Cure Stone Hospital, Sector 52, Gurgaon through our online booking form or by calling +91 88002 63884.",
      },
      {
        q: "Does Cure Stone offer online consultations for patients outside India?",
        a: "Yes, Cure Stone offers international video consultations for patients outside India. Select 'Online Video Consult' while booking and mention your location in the description.",
      },
    ],
  },
];

export const ALL_FAQS: FaqItem[] = FAQ_CATEGORIES.flatMap((category) => category.items);
