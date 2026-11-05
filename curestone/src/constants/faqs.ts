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
        a: "You can book a video consultation or an in-clinic appointment with Dr. Deepanshu Gupta through the online booking form or by calling +91 88002 63884. Your CT KUB scan is reviewed before confirming RIRS as the right procedure.",
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
        a: "Book a video consultation or an in-clinic appointment with Dr. Deepanshu Gupta through the online booking form or by calling +91 88002 63884, with your CT KUB scan ready for review.",
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
        a: "Book a video consultation or an in-clinic appointment with Dr. Deepanshu Gupta through the online booking form or by calling +91 88002 63884. ESWL sessions are scheduled after your CT KUB scan is reviewed.",
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
        a: "Book a video consultation or an in-clinic appointment with Dr. Deepanshu Gupta through the online booking form or by calling +91 88002 63884, with your CT KUB scan ready for review.",
      },
    ],
  },
  {
    slug: "rirs-cost",
    title: "RIRS Cost — India & Gurgaon",
    relatedHref: "/rirs-cost",
    relatedLabel: "RIRS Cost",
    items: [
      {
        q: "How much does RIRS surgery cost in India?",
        a: "Published rates from other Indian hospital groups place RIRS cost roughly between ₹85,000 and ₹2,00,000, varying by hospital tier, city and stone complexity. At Cure Stone Hospital, Gurgaon, RIRS starts from ₹78,000, with your final cost confirmed after Dr. Deepanshu Gupta reviews your CT or USG scan.",
      },
      {
        q: "What determines the exact cost of my RIRS surgery?",
        a: "Stone size and complexity, length of hospital stay, anesthesia type, any additional imaging or lab tests, and choice of room category all affect the final RIRS cost. There is no fixed number until your scan is reviewed.",
      },
      {
        q: "Is RIRS surgery covered by health insurance?",
        a: "RIRS is generally covered under cashless health insurance when medically indicated. Cure Stone's team assists with documentation and insurer approvals before your admission date.",
      },
      {
        q: "Does the quoted RIRS cost include the CT or USG scan?",
        a: "Not usually — the quoted range covers the surgery itself (surgeon's fee, OT, anaesthesia, standard stay). If you don't already have a recent scan, that's billed separately, whether it's done at Cure Stone or brought in from elsewhere.",
      },
      {
        q: "Is RIRS priced differently for a recurrent (repeat) stone?",
        a: "Not inherently — a repeat case is priced the same way as a first-time case: by stone size, location and complexity. If scar tissue from an earlier surgery makes access harder, that's factored in at consultation like any other complicating factor.",
      },
    ],
  },
  {
    slug: "rirs-cost-gurgaon",
    title: "RIRS Cost in Gurgaon — Cure Stone Hospital",
    relatedHref: "/rirs-cost-in-gurgaon",
    relatedLabel: "RIRS Cost in Gurgaon",
    items: [
      {
        q: "What is included in Cure Stone's RIRS cost estimate in Gurgaon?",
        a: "The starting price typically covers the surgeon's fee, OT and anaesthesia charges, and a standard ward stay for the usual same-day-to-24-hour admission. A private room upgrade or a longer stay than usual can add to this — ask for the exact breakdown at your consultation.",
      },
      {
        q: "Will I know the exact cost before my surgery date?",
        a: "Yes. Once Dr. Deepanshu Gupta reviews your CT or USG scan at consultation, Cure Stone's team gives you a written case-specific estimate before you confirm your admission date.",
      },
      {
        q: "How do I get an exact RIRS cost estimate for my case in Gurgaon?",
        a: "Book a video consultation or an in-clinic visit at Sector 52 with your CT or USG scan. Dr. Deepanshu Gupta reviews the scan and gives you a case-specific cost estimate before you decide on surgery.",
      },
      {
        q: "Can I get a RIRS cost estimate without visiting Sector 52 in person?",
        a: "Yes. Book a video consultation and share your CT or USG scan digitally — Dr. Deepanshu Gupta reviews it the same way he would in person and gives you a case-specific estimate, useful if you're travelling in from outside Gurgaon.",
      },
      {
        q: "Will my RIRS cost change if the surgery turns out more complex than expected?",
        a: "The written estimate given after your scan review is what you're billed, barring a genuine surprise once the surgeon is inside — a stone that fragments differently than imaging suggested, for instance. That's uncommon, and the team talks you through it rather than simply adding it to the final bill.",
      },
    ],
  },
  {
    slug: "mini-pcnl-cost",
    title: "Mini-PCNL Cost — India & Gurgaon",
    relatedHref: "/mini-pcnl-cost",
    relatedLabel: "Mini-PCNL Cost",
    items: [
      {
        q: "How much does Mini-PCNL cost in India?",
        a: "Published rates from other Indian hospital groups place Mini-PCNL cost roughly between ₹1,00,000 and ₹1,90,000, varying by stone size, hospital tier and city. At Cure Stone Hospital, Gurgaon, Mini-PCNL starts from ₹70,000, with your final cost confirmed after Dr. Deepanshu Gupta reviews your CT or USG scan.",
      },
      {
        q: "Why does Mini-PCNL cost more than RIRS?",
        a: "Mini-PCNL is used for larger or staghorn stones (20mm and above) that need a small keyhole tract and a longer hospital stay (typically 1-2 days) to clear in one session — that extra complexity and stay is what pushes the cost above RIRS.",
      },
      {
        q: "Is Mini-PCNL surgery covered by health insurance?",
        a: "Mini-PCNL is generally covered under cashless health insurance when medically indicated. Cure Stone's team assists with documentation and insurer approvals before your admission date.",
      },
      {
        q: "Does the quoted Mini-PCNL cost include the CT or USG scan?",
        a: "Not usually — the quoted range covers the surgery itself (surgeon's fee, OT, anaesthesia, standard stay). If you don't already have a recent scan, that's billed separately, whether it's done at Cure Stone or brought in from elsewhere.",
      },
      {
        q: "Will I get a written Mini-PCNL estimate before I agree to surgery?",
        a: "Yes — once Dr. Deepanshu Gupta reviews your scan at consultation, Cure Stone's team gives you a written, case-specific estimate before you confirm your admission date, not a number mentioned in passing.",
      },
    ],
  },
  {
    slug: "mini-pcnl-cost-gurgaon",
    title: "Mini-PCNL Cost in Gurgaon — Cure Stone Hospital",
    relatedHref: "/mini-pcnl-cost-in-gurgaon",
    relatedLabel: "Mini-PCNL Cost in Gurgaon",
    items: [
      {
        q: "What is included in Cure Stone's Mini-PCNL cost estimate in Gurgaon?",
        a: "The starting price typically covers the surgeon's fee, OT and anaesthesia charges, and a standard ward stay of 1-2 days. A private room upgrade or a longer stay than usual can add to this — ask for the exact breakdown at your consultation.",
      },
      {
        q: "Does Mini-PCNL cost more for staghorn stones?",
        a: "Yes. Staghorn or multiple-stone cases can need a longer procedure, sometimes a second tract, and a longer hospital stay — Dr. Deepanshu Gupta confirms the exact cost after reviewing your CT or USG scan.",
      },
      {
        q: "How do I get an exact Mini-PCNL cost estimate for my case in Gurgaon?",
        a: "Book a video consultation or an in-clinic visit at Sector 52 with your CT or USG scan. Dr. Deepanshu Gupta reviews the scan and gives you a case-specific cost estimate before you decide on surgery.",
      },
      {
        q: "Can I get a Mini-PCNL cost estimate without visiting Sector 52 in person?",
        a: "Yes. Book a video consultation and share your CT or USG scan digitally — Dr. Deepanshu Gupta reviews it the same way he would in person and gives you a case-specific estimate before you plan your travel.",
      },
      {
        q: "Is Mini-PCNL priced differently for a recurrent (repeat) stone?",
        a: "Not inherently — a repeat case is priced by stone size, number of tracts needed and complexity, the same factors that apply to a first-time case. Scar tissue from an earlier surgery is factored in at consultation if relevant.",
      },
    ],
  },
  {
    slug: "ursl-cost",
    title: "URSL Cost — India & Gurgaon",
    relatedHref: "/ursl-cost",
    relatedLabel: "URSL Cost",
    items: [
      {
        q: "How much does URSL cost in India?",
        a: "Published rates from other Indian hospital groups place URSL cost roughly between ₹55,000 and ₹1,30,000, varying by stone location, hospital tier and city. At Cure Stone Hospital, Gurgaon, URSL starts from ₹58,000, with your final cost confirmed after Dr. Deepanshu Gupta reviews your CT or USG scan.",
      },
      {
        q: "Does URSL cost depend on where the stone is in the ureter?",
        a: "Yes. Stones lower in the ureter are generally more straightforward to reach with the rigid scope than stones higher up (mid-ureter) or larger, impacted stones — that difference in complexity is what moves the cost within the range.",
      },
      {
        q: "Is URSL surgery covered by health insurance?",
        a: "URSL is generally covered under cashless health insurance when medically indicated. Cure Stone's team assists with documentation and insurer approvals before your admission date.",
      },
      {
        q: "Will I get a written URSL estimate before I agree to surgery?",
        a: "Yes — once Dr. Deepanshu Gupta reviews your scan at consultation, Cure Stone's team gives you a written, case-specific estimate before you confirm your admission date, not a number mentioned in passing.",
      },
      {
        q: "Does the quoted URSL cost include the CT or USG scan?",
        a: "Not usually — the quoted range covers the surgery itself (surgeon's fee, OT, anaesthesia, standard stay). If you don't already have a recent scan, that's billed separately, whether it's done at Cure Stone or brought in from elsewhere.",
      },
    ],
  },
  {
    slug: "ursl-cost-gurgaon",
    title: "URSL Cost in Gurgaon — Cure Stone Hospital",
    relatedHref: "/ursl-cost-in-gurgaon",
    relatedLabel: "URSL Cost in Gurgaon",
    items: [
      {
        q: "What is included in Cure Stone's URSL cost estimate in Gurgaon?",
        a: "The starting price typically covers the surgeon's fee, OT and anaesthesia charges, and the standard same-day-to-24-hour stay. A DJ stent, if needed, and its later removal are confirmed as a separate line item.",
      },
      {
        q: "Is URSL cost different for an emergency/urgent case?",
        a: "The procedure cost itself is the same; what can change is timing and priority scheduling for a severely painful or obstructing stone — call +91 88002 63884 directly for urgent cases rather than the standard booking form.",
      },
      {
        q: "How do I get an exact URSL cost estimate for my case in Gurgaon?",
        a: "Book a video consultation or an in-clinic visit at Sector 52 with your CT or USG scan. Dr. Deepanshu Gupta reviews the scan and gives you a case-specific cost estimate before you decide on surgery.",
      },
      {
        q: "Can I get a URSL cost estimate without visiting Sector 52 in person?",
        a: "Yes. Book a video consultation and share your CT or USG scan digitally — Dr. Deepanshu Gupta reviews it the same way he would in person and gives you a case-specific estimate before you plan your travel.",
      },
      {
        q: "Will my URSL cost change if the procedure turns out more complex than expected?",
        a: "The written estimate given after your scan review is what you're billed, barring a genuine surprise once the surgeon is inside — a stone that's more impacted than imaging suggested, for instance. That's uncommon, and the team talks you through it rather than simply adding it to the final bill.",
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
        a: "Cost depends on the stone size, the procedure recommended, and the length of hospital stay required. Book a consultation for a personalised estimate.",
      },
      {
        q: "How do I book an appointment with a urologist in Gurgaon?",
        a: "You can book a video consultation or an in-clinic appointment with Dr. Deepanshu Gupta at Cure Stone Hospital, Sector 52, Gurgaon through our online booking form or by calling +91 88002 63884.",
      },
      {
        q: "Does Cure Stone offer online consultations for patients outside India?",
        a: "Yes, Cure Stone offers international video consultations for patients outside India. Select 'Online Video Consult' while booking and mention your location in the description.",
      },
    ],
  },
  {
    slug: "surgery-cost-guide",
    title: "What Affects Kidney Stone Surgery Cost",
    relatedHref: "/book",
    relatedLabel: "Book a Consultation",
    items: [
      {
        q: "Why does the same procedure cost different amounts at different hospitals?",
        a: "Costs vary hospital to hospital and policy to policy — hospital tier, city, surgeon experience, room category and what your specific insurance policy covers all move the final number. There's no single fixed price for any kidney stone procedure across India.",
      },
      {
        q: "Will I need more than one procedure for my stone?",
        a: "It clearly depends on your case. Larger stones, multiple stones, or stones in a difficult location can sometimes need a staged approach — more than one sitting — which adds to the total cost. Dr. Deepanshu Gupta tells you upfront after reviewing your CT or USG scan if your case is likely to need staging.",
      },
      {
        q: "What's typically included in a kidney stone surgery cost estimate?",
        a: "Most estimates cover the surgeon's fee, OT and anaesthesia charges, and a standard ward stay. A private room upgrade, a longer stay than usual, a DJ stent (where applicable), or additional pre-op imaging can add to the total — ask for the exact breakdown at your consultation.",
      },
      {
        q: "Is kidney stone surgery covered by health insurance?",
        a: "It's generally covered under cashless health insurance when medically indicated, but coverage terms differ policy to policy. Cure Stone's team checks your specific policy and handles documentation and insurer approvals before your admission date.",
      },
      {
        q: "Can my cost estimate change after the surgery has already started?",
        a: "The written estimate given after your scan review is what you're billed, barring a genuine surprise once the surgeon is inside — a stone that behaves differently than imaging suggested, for instance. That's uncommon, and the team talks you through it rather than adding it to the final bill unexplained.",
      },
      {
        q: "Does the quoted cost include the CT or USG scan?",
        a: "Not usually — the quoted range covers the surgery itself. If you don't already have a recent scan, that's billed separately, whether it's done at Cure Stone or brought in from elsewhere.",
      },
    ],
  },
  {
    slug: "diet-planner",
    title: "Kidney Stone Diet & Nutrition",
    relatedHref: "/kidney-stone-diet-planner",
    relatedLabel: "Try the Diet Planner",
    items: [
      {
        q: "What is the best diet for kidney stones?",
        a: "There's no single diet for every stone — it depends on the stone type. In general: drink enough water to pass 2.5–3 litres of urine a day, keep sodium (salt) low, don't restrict dietary calcium, and limit high-oxalate foods and excess animal protein. Our diet planner personalizes this based on your stone type and profile.",
      },
      {
        q: "What foods should I avoid with kidney stones?",
        a: "The foods to limit depend on the stone type. For the most common type (calcium oxalate), high-oxalate foods like spinach, beetroot and nuts, plus excess salt and red/organ meat, are the main ones to moderate. For uric acid stones, high-purine foods like organ meat and certain seafood matter more. Avoid guessing — our planner tiers foods by your specific stone type.",
      },
      {
        q: "Should I stop eating dairy or calcium if I have kidney stones?",
        a: "No — this is a common myth. Low dietary calcium actually increases oxalate absorption and raises stone risk. Most guidelines recommend normal calcium intake (around 1000–1200mg/day) from food, ideally eaten alongside oxalate-rich foods rather than avoided.",
      },
      {
        q: "How much water should I drink daily to prevent kidney stones?",
        a: "Most adults with a history of kidney stones are advised to drink enough fluid to produce at least 2.5 litres of urine a day — for an average adult this is often 3–3.5 litres of water, spread through the day rather than all at once. Your exact target depends on your weight, activity level and climate; our diet planner calculates this for you.",
      },
      {
        q: "Which fruits are good for kidney stones?",
        a: "Citrus fruits — lemon, orange and sweet lime — are especially helpful since their citrate content can reduce stone formation. Most fruits are low-oxalate and safe; a few (like berries in large amounts) are higher in oxalate and best eaten in moderation.",
      },
      {
        q: "Is the kidney stone diet different for different stone types?",
        a: "Yes. Calcium oxalate stones (the most common type) respond to oxalate and sodium control. Uric acid stones respond more to limiting animal protein and purines. Struvite stones are infection-driven, so diet plays a smaller role. Cystine stones need sodium and fluid management. Our planner asks your stone type and adjusts accordingly.",
      },
      {
        q: "What should I eat after kidney stone surgery (RIRS, PCNL, ESWL, URSL)?",
        a: "Post-surgery, hydration is the priority — fluid intake is often recommended slightly higher than the general prevention target to help flush the urinary tract. Keep meals light for the first few days, maintain normal sodium and calcium intake, and avoid very high-oxalate foods until you've followed up with your surgeon.",
      },
      {
        q: "Does a vegetarian diet help prevent kidney stones?",
        a: "It can help for some stone types — lower animal protein intake reduces uric acid and calcium excretion, which benefits calcium oxalate and uric acid stone formers. It isn't required, though: a non-vegetarian diet is fine with moderated portions of red meat and organ meat. Our planner adapts its recommendations to your dietary preference either way.",
      },
      {
        q: "Can I follow a 7-day Indian diet chart for kidney stones?",
        a: "Yes — a kidney stone diet chart can include familiar Indian foods like roti, rice, dal, seasonal vegetables and curd. Portions and specific food choices should still be adjusted to your stone type and medical history, which is exactly what our planner personalizes beyond the general 7-day chart above.",
      },
      {
        q: "What should I eat for breakfast, lunch and dinner if I have kidney stones?",
        a: "A sample day could include vegetable poha with curd for breakfast, roti with dal and vegetables for lunch, and rice with a balanced vegetable dish for dinner. Exact choices should be personalized, particularly if you have calcium oxalate or uric acid stones — see the 7-day chart above for a full week of ideas.",
      },
      {
        q: "Is rice or dal safe for kidney stone patients?",
        a: "Generally yes — rice and dal can be part of a kidney-stone-friendly diet. The right portions depend on your stone type, overall protein intake, and other conditions like chronic kidney disease, so check with your doctor if you have additional health concerns.",
      },
      {
        q: "What is a low-oxalate diet for calcium oxalate kidney stones?",
        a: "A low-oxalate approach limits particularly high-oxalate foods — spinach, rhubarb, certain nuts — when clinically appropriate, while still eating adequate calcium from food (ideally alongside oxalate-rich foods) and keeping sodium in check. It's the most common dietary approach since calcium oxalate is the most common stone type.",
      },
      {
        q: "Can kidney stone patients drink milk and eat curd?",
        a: "Yes, for most people with calcium oxalate stones, normal dietary calcium from milk and curd is beneficial rather than harmful — calcium binds oxalate in the gut, reducing how much gets absorbed. Don't restrict dietary calcium unless your doctor specifically advises it.",
      },
      {
        q: "Is lemon water good for preventing kidney stones?",
        a: "Yes, as part of a prevention routine — lemon water supports hydration and provides citrate, which helps reduce stone formation. It can't dissolve an existing stone or replace medical treatment, though.",
      },
      {
        q: "Can I follow a kidney stone diet plan without knowing my stone type?",
        a: "You can start with general habits — adequate hydration, moderate salt, balanced meals — covered in the 7-day chart above. A personalized prevention plan is more effective once your stone type is known from a lab test, which is why our planner asks for it (optionally) if you have it.",
      },
      {
        q: "What foods should I limit if I have uric acid kidney stones?",
        a: "High-purine foods — organ meats, excess red meat, certain seafood — are the main ones to limit. Maintaining a healthy weight and leaning toward more plant-based proteins also helps. Follow your clinician's specific advice for your case.",
      },
      {
        q: "Can a kidney stone diet prevent stones from coming back?",
        a: "Dietary changes meaningfully reduce recurrence risk, especially combined with adequate fluid intake and any medical management your doctor recommends. No single diet guarantees complete prevention — the right approach depends on your specific stone type and cause.",
      },
      {
        q: "Can people with diabetes or chronic kidney disease use this diet planner?",
        a: "Yes, as general educational guidance — but diabetes, reduced kidney function and similar conditions often need special adjustments to fluid, protein, potassium and other nutrients beyond what a general kidney-stone diet covers. Have any plan reviewed by your treating doctor before making major changes.",
      },
    ],
  },
  {
    slug: "videos",
    title: "Kidney Stone Videos",
    relatedHref: "/videos",
    relatedLabel: "Watch the Full Video Library",
    items: [
      {
        q: "Where can I watch kidney stone surgery videos by Dr. Deepanshu Gupta?",
        a: "Every video from Dr. Deepanshu Gupta's YouTube channel is organized at thecurestone.com/videos — browse by stone size, procedure (RIRS, PCNL, URSL, ESWL), diet, prevention, symptoms, recovery and more, or search directly for a topic.",
      },
      {
        q: "Does Cure Stone have videos explaining RIRS, PCNL, URSL and ESWL?",
        a: "Yes — the video library has a dedicated category for each kidney stone procedure (RIRS, PCNL, URSL, ESWL), so you can watch the exact surgery type you're considering or preparing for, including what to expect and recovery.",
      },
      {
        q: "Are there videos about kidney stone diet and foods to avoid?",
        a: "Yes, the Diet category on the video page covers foods to eat and avoid, hydration habits, and nutrition guidance after surgery. Pair it with the kidney stone diet planner for a personalized plan.",
      },
      {
        q: "Is there a video explaining which kidney stone size needs surgery?",
        a: "Yes — the \"By Stone Size\" category groups videos by stone size (under 5mm, 5–10mm, over 10mm) so you can watch content specific to your stone's size and the treatment options typically considered at that size.",
      },
      {
        q: "Does Dr. Gupta have patient testimonial or recovery videos?",
        a: "Yes, the Patient Stories and Recovery categories feature real patient experiences and post-surgery care guidance, including what recovery after RIRS, PCNL, URSL or ESWL actually feels like.",
      },
      {
        q: "Are the kidney stone videos in Hindi or English?",
        a: "Most videos are in Hindi (with some in English), matching how Dr. Gupta communicates with patients directly — the video library doesn't filter by language, but titles make the language clear before you click play.",
      },
      {
        q: "How often are new videos added to the library?",
        a: "The library syncs automatically with Dr. Gupta's YouTube channel every few hours, so newly published videos appear here — and get sorted into the right categories — without any manual work.",
      },
    ],
  },
];

export const ALL_FAQS: FaqItem[] = FAQ_CATEGORIES.flatMap((category) => category.items);
