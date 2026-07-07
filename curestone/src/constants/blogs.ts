export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  tag?: string;
  language: "en" | "hi";
  image: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: "urs-vs-rirs-best-options-removing-kidney-stones",
    title: "URS vs. RIRS: Comparing Options For Removing Kidney Stones",
    category: "Kidney Stones",
    excerpt: "Understand the key differences between URS and RIRS for kidney stone removal and which one is right for your unique case.",
    date: "April 10, 2025",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    tag: "Featured",
    language: "en",
    image: "/Blogs/safe-surgery-single-kidney.jpg",
    content: `
      <h2>Introduction to Modern Stone Removal</h2>
      <p>When it comes to removing kidney stones, modern urology has moved far beyond traditional open surgery. Today, two of the most popular and effective minimally invasive options are <strong>URS (Ureteroscopy)</strong> and <strong>RIRS (Retrograde Intrarenal Surgery)</strong>.</p>
      
      <h3>What is URS (Ureteroscopy)?</h3>
      <p>URS is typically used for stones located in the ureter (the tube connecting the kidney to the bladder). A thin instrument called a ureteroscope is passed through the urethra and bladder into the ureter. The stone is then either removed with a "basket" or broken into small pieces using a laser.</p>
      
      <h3>What is RIRS (Retrograde Intrarenal Surgery)?</h3>
      <p>RIRS is a more advanced procedure used for stones inside the kidney itself. It uses a <strong>flexible fiberoptic ureteroscope</strong> that can navigate the complex inner anatomy of the kidney. At Cure Stone, we use the <strong>FANS-RIRS</strong> technique, which allows for maximum precision and a higher stone-free rate.</p>

      <div class="bg-primary/5 p-6 rounded-2xl my-8">
        <h4 class="text-primary font-bold mb-2">Comparison at a Glance:</h4>
        <ul class="space-y-2">
          <li><strong>URS:</strong> Ideal for lower ureteral stones. Semi-rigid scope.</li>
          <li><strong>RIRS:</strong> Ideal for kidney stones & upper ureteral stones. Flexible scope.</li>
        </ul>
      </div>

      <h3>Which One is Right for You?</h3>
      <p>The choice between URS and RIRS depends on several factors:</p>
      <ul>
        <li><strong>Stone Size:</strong> Larger stones may require different techniques.</li>
        <li><strong>Stone Location:</strong> Stones in the lower pole of the kidney almost always require RIRS.</li>
        <li><strong>Anatomy:</strong> Your unique urinary tract structure plays a role.</li>
      </ul>

      <p>At Cure Stone, Dr. Deepanshu Gupta performs a detailed NCCT mapping to decide the most efficient path for your recovery.</p>
    `
  },
  {
    id: 2,
    slug: "safe-surgery-single-kidney-patients",
    title: "एक किडनी वाले मरीज के लिए कौन सी सर्जरी सुरक्षित है?",
    category: "Kidney",
    excerpt: "Learn about the safest surgical options and precautions for patients living with a single kidney.",
    date: "April 08, 2025",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    tag: "Patient Guide",
    language: "hi",
    image: "/Blogs/safe-surgery-single-kidney.jpg",
    content: `
      <h2>एक किडनी वाले मरीजों के लिए विशेष देखभाल</h2>
      <p>एकल किडनी (Solitary Kidney) के साथ रहना पूरी तरह से संभव है, लेकिन जब सर्जरी की बात आती है, तो अतिरिक्त सावधानी बरतना अनिवार्य है।</p>
      
      <h3>सुरक्षित विकल्प: RIRS और Mini-PCNL</h3>
      <p>एक किडनी वाले मरीजों के लिए हमारा मुख्य लक्ष्य <strong>Cortex (किडनी का मांस)</strong> को सुरक्षित रखना होता है। पारंपरिक बड़ी सर्जरी किडनी के फंक्शन को प्रभावित कर सकती है।</p>
      
      <ul>
        <li><strong>RIRS:</strong> यह सबसे सुरक्षित विकल्प है क्योंकि इसमें किडनी पर कोई कट नहीं लगाया जाता।</li>
        <li><strong>Mini-PCNL:</strong> अगर पत्थर बहुत बड़ा है, तो बहुत छोटे छेद (Keyhole) के जरिए इसे निकाला जाता है।</li>
      </ul>

      <h3>सर्जरी से पहले के महत्वपूर्ण टेस्ट</h3>
      <p>Cure Stone में हम सुनिश्चित करते हैं कि मरीज का <strong>Serum Creatinine</strong> और <strong>GFR</strong> लेवल स्थिर हो। NCCT स्कैन के जरिए पत्थर की सटीक स्थिति का पता लगाया जाता है ताकि सर्जरी कम से कम समय में पूरी हो सके।</p>

      <div class="bg-amber-50 p-6 rounded-2xl my-8 border border-amber-100">
        <p class="text-amber-900 font-bold">प्रो टिप:</p>
        <p class="text-amber-800 italic">"एक किडनी वाले मरीजों को सर्जरी के बाद हाइड्रेशन और डाइट का 2 गुना ज्यादा ध्यान रखना चाहिए।" - डॉ. दीपांशु गुप्ता</p>
      </div>
    `
  },
  {
    id: 3,
    slug: "is-surgery-always-necessary-for-enlarged-prostate",
    title: "प्रोस्टेट बढ़ने पर हमेशा सर्जरी ज़रूरी है क्या?",
    category: "Treatment Option",
    excerpt: "Explore when an enlarged prostate requires surgery and what non-surgical alternatives are available.",
    date: "April 06, 2025",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "hi",
    image: "/assets/blog/prostate-health.jpg",
    content: `
      <h2>प्रोस्टेट (BPH) और इसके उपचार के विकल्प</h2>
      <p>उम्र के साथ प्रोस्टेट ग्रंथि का बढ़ना एक सामान्य प्रक्रिया है जिसे <strong>BPH (Benign Prostatic Hyperplasia)</strong> कहा जाता है। लेकिन क्या हर मरीज को सर्जरी की जरूरत होती है? जवाब है: नहीं।</p>
      
      <h3>मेडिकल मैनेजमेंट (दवाएं)</h3>
      <p>शुरुआती चरणों में, हम दवाओं (जैसे Alpha Blockers) के जरिए यूरिन के फ्लो को बेहतर बना सकते हैं। यदि आपके लक्षण हल्के हैं, तो केवल जीवनशैली में बदलाव ही काफी हो सकते हैं।</p>
      
      <h3>सर्जरी की जरूरत कब पड़ती है?</h3>
      <p>सर्जरी पर विचार तब किया जाता है जब:</p>
      <ul>
        <li>दवाएं काम करना बंद कर दें।</li>
        <li>पेशाब पूरी तरह से रुक जाए (Retention)।</li>
        <li>बार-बार यूरिन इन्फेक्शन (UTI) हो।</li>
        <li>किडनी के फंक्शन पर असर पड़ने लगे।</li>
      </ul>

      <h3>आधुनिक लेज़र सर्जरी: HoLEP</h3>
      <p>आजकल <strong>HoLEP (Holmium Laser Enucleation)</strong> के जरिए बिना किसी चीरे के बढ़े हुए प्रोस्टेट का इलाज संभव है। इसमें मरीज को अगले ही दिन छुट्टी मिल जाती है।</p>
    `
  },
  {
    id: 4,
    slug: "best-diet-kidney-bladder-health",
    title: "किडनी और ब्लैडर हेल्थ के लिए सही डाइट",
    category: "Kidney",
    excerpt: "A comprehensive guide to the best foods and nutritional habits to maintain optimal kidney and bladder health.",
    date: "April 04, 2025",
    readTime: "5 min read",
    author: "Dr. Deepanshu Gupta",
    language: "hi",
    image: "/assets/blog/diet-health.jpg",
    content: `
      <h2>किडनी स्वास्थ्य के लिए पोषण का महत्व</h2>
      <p>आप जो खाते हैं उसका सीधा असर आपकी किडनी के फंक्शन पर पड़ता है। किडनी स्टोन से बचने और ब्लैडर को स्वस्थ रखने के लिए सही डाइट चुनना सबसे आसान और प्रभावी तरीका है।</p>
      
      <h3>1. भरपूर पानी (Hydration)</h3>
      <p>यूरिन को पतला रखने के लिए दिन भर में कम से कम 3-4 लीटर पानी पिएं। यदि आपका यूरिन साफ (Clear) है, तो इसका मतलब है कि आप पर्याप्त पानी पी रहे हैं।</p>
      
      <h3>2. नमक कम करें (Low Sodium)</h3>
      <p>नमक में मौजूद सोडियम किडनी पर दबाव डालता है और कैल्शियम स्टोन बनने की संभावना बढ़ाता है। ऊपर से नमक डालना बंद करें और प्रोसेस्ड फूड से बचें।</p>
      
      <h3>3. सिट्रस फ्रूट्स (Citrus Fruits)</h3>
      <p>नींबू, संतरा और मौसमी में सिट्रेट होता है, जो किडनी में स्टोन बनने की प्रक्रिया को रोकता है। रोजाना एक गिलास नींबू पानी पीना बहुत फायदेमंद होता है।</p>

      <div class="bg-blue-50 p-6 rounded-2xl my-8">
        <h4 class="text-blue-900 font-bold mb-2">क्या न खाएं?</h4>
        <ul class="list-disc pl-5">
          <li>पालक, टमाटर के बीज, बैंगन (High Oxalate)</li>
          <li>ज्यादा रेड मीट (High Uric Acid)</li>
          <li>कोल्ड ड्रिंक्स और ज्यादा मीठी चीजें</li>
        </ul>
      </div>
    `
  },
  {
    id: 5,
    slug: "why-kidney-stones-recur-causes-prevention",
    title: "किडनी स्टोन बार-बार क्यों बनते हैं? कारण और रोकथाम",
    category: "Kidney Stones",
    excerpt: "Discover why kidney stones often come back and how you can prevent future occurrences with lifestyle changes.",
    date: "April 02, 2025",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "hi",
    image: "/assets/blog/stone-recurrence.jpg",
    content: `
      <h2>स्टोन रिकरेंस: एक गंभीर समस्या</h2>
      <p>आंकड़े बताते हैं कि जिन लोगों को एक बार किडनी स्टोन हुआ है, उन्हें अगले 5-10 सालों में दोबारा स्टोन होने की संभावना 50% तक होती है।</p>
      
      <h3>दोबारा स्टोन बनने के मुख्य कारण:</h3>
      <ul>
        <li><strong>आनुवंशिकी (Genetics):</strong> अगर आपके परिवार में स्टोन की हिस्ट्री है।</li>
        <li><strong>मेटाबॉलिक डिसऑर्डर:</strong> आपके शरीर में कैल्शियम या यूरिक एसिड का अवशोषण सही से न होना।</li>
        <li><strong>अधूरा इलाज:</strong> पिछली सर्जरी में छोटे कणों का छूट जाना।</li>
      </ul>

      <h3>रोकथाम के उपाय</h3>
      <p>Cure Stone में हम <strong>Metabolic Evaluation</strong> करते हैं जिसमें आपके स्टोन के प्रकार की जांच की जाती है। यदि हमें पता चल जाए कि स्टोन किस केमिकल से बना है, तो हम उसे दोबारा बनने से रोक सकते हैं।</p>
    `
  },
  {
    id: 6,
    slug: "safety-laser-surgery-kidney-stones",
    title: "किडनी स्टोन के लिए लेज़र सर्जरी कितनी सुरक्षित है?",
    category: "Kidney Stones",
    excerpt: "Evaluating the safety, precision, and recovery benefits of modern laser RIRS surgery for stones.",
    date: "March 31, 2025",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    tag: "Popular",
    language: "hi",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 7,
    slug: "laser-rirs-surgery-explained",
    title: "Laser RIRS for Stones (Retrograde Intrarenal Surgery)",
    category: "Kidney",
    excerpt: "A deep dive into FANS-RIRS technique and minimally invasive kidney stone treatment planning.",
    date: "March 28, 2025",
    readTime: "10 min read",
    author: "Dr. Deepanshu Gupta",
    tag: "Guide",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 8,
    slug: "can-kidney-stones-be-treated-without-surgery",
    title: "Can kidney stones be treated without surgery?",
    category: "Kidney Stones",
    excerpt: "Exploring non-invasive options for small kidney stones, including hydration and medical expulsion therapy.",
    date: "March 25, 2025",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 9,
    slug: "hereditary-causes-kidney-stones",
    title: "Hereditary causes of kidney stones",
    category: "Kidney Stones",
    excerpt: "Understanding the genetic factors that contribute to repeated stone formation and how to manage risk.",
    date: "March 22, 2025",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 10,
    slug: "open-surgery-vs-rirs-safety-effectiveness",
    title: "Open Surgery vs RIRS – Which Is Safer and More Effective?",
    category: "Treatment Option",
    excerpt: "A direct comparison between traditional open surgery and advanced laser RIRS for complex stone cases.",
    date: "March 19, 2025",
    readTime: "10 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 11,
    slug: "rirs-success-rate-complex-kidney-stones",
    title: "RIRS Outcomes in Complex Kidney Stones",
    category: "Kidney Stones",
    excerpt: "How stone size, anatomy, and clinical factors influence RIRS treatment planning for complex stones.",
    date: "March 16, 2025",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 12,
    slug: "avoid-uti-after-sex",
    title: "How to Avoid Getting a UTI After Sex",
    category: "Urological Problems",
    excerpt: "Practical tips and preventive measures to reduce the frequency of urinary tract infections.",
    date: "March 13, 2025",
    readTime: "5 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 13,
    slug: "water-intake-prevent-kidney-stones",
    title: "How much water should you drink to prevent kidney stones?",
    category: "Kidney",
    excerpt: "Calculating the ideal daily water intake based on your activity level and history of stone formation.",
    date: "March 10, 2025",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 14,
    slug: "robotic-prostate-surgery-cancer",
    title: "Robotic surgery in prostate cancer – Is it better?",
    category: "Treatment Option",
    excerpt: "Understanding the precision and recovery advantages of robotic Da Vinci surgery for prostate cancer.",
    date: "March 07, 2025",
    readTime: "11 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 15,
    slug: "gas-pain-vs-gallstones-difference",
    title: "Gas Pain vs Gallstones: How to Tell the Difference",
    category: "Treatment Option",
    excerpt: "A guide to identifying the Source of abdominal discomfort and when to consult a specialist.",
    date: "March 04, 2025",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 16,
    slug: "laser-vs-shockwave-kidney-stones",
    title: "Laser vs shockwave treatment for kidney stones – How they compare",
    category: "Kidney",
    excerpt: "Comparing RIRS (Laser) and ESWL (Shockwave) to help you discuss suitable treatment options.",
    date: "March 01, 2025",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 17,
    slug: "rirs-vs-pcnl-vs-eswl-best-treatment",
    title: "RIRS vs PCNL vs ESWL – Comparing Kidney Stone Treatment Options",
    category: "Kidney Stones",
    excerpt: "A detailed breakdown of the three primary stone treatments based on stone size and location.",
    date: "February 26, 2025",
    readTime: "12 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 18,
    slug: "gallbladder-vs-kidney-stone-difference",
    title: "Difference Between Gallbladder Stone and Kidney Stone",
    category: "Size",
    excerpt: "Common symptoms and diagnostic markers to distinguish between these two painful conditions.",
    date: "February 23, 2025",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 19,
    slug: "laparoscopic-vs-open-gallbladder-surgery",
    title: "Laparoscopic vs Open Gallbladder Stone Surgery",
    category: "Kidney Stones",
    excerpt: "Why keyhole laparoscopic surgery is the preferred modern choice for gallbladder stones.",
    date: "February 20, 2025",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 20,
    slug: "small-vs-large-stones-best-surgery",
    title: "Small vs large kidney stones – How surgery options differ",
    category: "Kidney Stones",
    excerpt: "Tailoring the surgical approach to the physical dimensions of the stone for case-based outcomes.",
    date: "February 17, 2025",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 21,
    slug: "cranberry-juice-and-utis",
    title: "Cranberry Juice and Urinary Tract Infections",
    category: "Kidney Stones",
    excerpt: "Debunking myths and explaining the real science behind cranberry juice for UTI prevention.",
    date: "February 14, 2025",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 22,
    slug: "uti-vs-kidney-infection-differences",
    title: "UTI vs Kidney Infection – How to Know the Difference",
    category: "Urological Problems",
    excerpt: "Warning signs that a simple bladder infection may have spread to your kidneys.",
    date: "February 11, 2025",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 23,
    slug: "vitamin-b3-kidney-stone-risk",
    title: "Vitamin B3 May Cut Kidney Stone Risk by 22%—Here’s What You Need to Know",
    category: "Kidney Stones",
    excerpt: "New clinical research on the role of nicotinamide in preventing calcium oxalate formation.",
    date: "February 08, 2025",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 24,
    slug: "what-mimics-kidney-stone-pain",
    title: "What Can Mimic Kidney Stone Pain?",
    category: "Kidney",
    excerpt: "From back issues to appendicitis, learn what other conditions can feel like a kidney stone.",
    date: "February 05, 2025",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 25,
    slug: "does-ejaculating-help-pass-kidney-stones",
    title: "Does ejaculating help pass kidney stones?",
    category: "Kidney Stones",
    excerpt: "The biological facts and myths regarding prostate health and stone passage.",
    date: "February 02, 2025",
    readTime: "5 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 26,
    slug: "good-exercise-for-kidney-stones",
    title: "What Exercise is Good for Kidney Stones?",
    category: "Kidney Stones",
    excerpt: "Recommended physical activities to help move stones naturally and prevent new ones.",
    date: "January 30, 2025",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 27,
    slug: "new-surgery-for-kidney-stones",
    title: "What is the New Surgery for Kidney Stones?",
    category: "Kidney",
    excerpt: "Exploring the latest robotic and ultrasonic breakthroughs in urological surgery.",
    date: "January 27, 2025",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 28,
    slug: "kidney-stones-worse-in-morning",
    title: "Why Are Kidney Stones Worse in the Morning?",
    category: "Kidney Stones",
    excerpt: "Explaining the impact of overnight dehydration and posture on kidney stone discomfort.",
    date: "January 24, 2025",
    readTime: "5 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 29,
    slug: "signs-kidney-stone-about-to-pass",
    title: "What Are the Signs That a Kidney Stone Is About to Pass?",
    category: "Kidney Stones",
    excerpt: "Identifying the shift in pain and bladder symptoms as a stone moves through the ureter.",
    date: "January 21, 2025",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 30,
    slug: "does-pushing-help-pass-kidney-stones",
    title: "Does pushing help pass kidney stones",
    category: "Uncategorized",
    excerpt: "Common misconceptions about the mechanics of passing stones and what actually works.",
    date: "January 18, 2025",
    readTime: "5 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 31,
    slug: "where-do-you-feel-kidney-stone-pain",
    title: "Where do you feel kidney stone pain?",
    category: "Kidney Stones",
    excerpt: "Mapping the 'Flank to Groin' pain path and what your pain location says about the stone.",
    date: "January 15, 2025",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 32,
    slug: "why-rirs-best-for-kidney-stones",
    title: "When RIRS May Be Considered for Kidney Stones",
    category: "Kidney Stones",
    excerpt: "Clinical factors that may make RIRS suitable for selected kidney stone cases.",
    date: "January 12, 2025",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 33,
    slug: "safest-procedure-for-kidney-stones",
    title: "What is the safest procedure for a kidney stone?",
    category: "Kidney Stones",
    excerpt: "Risk-benefit analysis of modern stone treatments for high-risk and elderly patients.",
    date: "January 09, 2025",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 34,
    slug: "how-to-know-stone-is-close-to-passing",
    title: "How do you know when a kidney stone is close to passing?",
    category: "Kidney Stones",
    excerpt: "Clinical indicators that a stone has reached the bladder-ureter junction.",
    date: "January 06, 2025",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 35,
    slug: "can-7mm-stone-dissolve-naturally",
    title: "Can a 7mm kidney stone dissolve Naturally?",
    category: "Kidney Stones",
    excerpt: "Understanding thresholds for natural stone passage and the science of stone dissolution.",
    date: "January 03, 2025",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 36,
    slug: "speed-up-passing-kidney-stones",
    title: "How can I speed up the passing of kidney stones?",
    category: "Kidney Stones",
    excerpt: "Medical expulsion therapy and home strategies that significantly aid stone transit.",
    date: "December 30, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 37,
    slug: "walking-help-pass-stones",
    title: "Does More Walking Help Pass Kidney Stones?",
    category: "Kidney Stones",
    excerpt: "How gravity and physical movement assist the ureter in moving stones toward the bladder.",
    date: "December 27, 2024",
    readTime: "5 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 38,
    slug: "why-stones-hurt-more-at-night",
    title: "Why Do Kidney Stones Hurt More at Night?",
    category: "Kidney Stones",
    excerpt: "Biological rhythms and reduced distraction: why renal colic peaks during resting hours.",
    date: "December 24, 2024",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 39,
    slug: "can-you-feel-stone-moving",
    title: "Can you feel a kidney stone moving?",
    category: "Kidney Stones",
    excerpt: "Describing the sensation of renal colic as stones traverse the urinary tract.",
    date: "December 21, 2024",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 40,
    slug: "most-painful-stage-of-kidney-stones",
    title: "What Is The Most Painful Stage Of Kidney Stones?",
    category: "Kidney",
    excerpt: "Ranking the levels of discomfort from renal pelvis entry to urethral passage.",
    date: "December 18, 2024",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 41,
    slug: "how-do-i-know-if-stone-is-severe",
    title: "How Do I Know If My Kidney Stone Is Severe?",
    category: "Kidney Stones",
    excerpt: "Critical warning signs like fever and vomiting that require emergency urological care.",
    date: "December 15, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 42,
    slug: "final-stage-of-kidney-stone",
    title: "What Is The Final Stage Of A Kidney Stone?",
    category: "Kidney Stones",
    excerpt: "The experience of a stone entering the bladder and the subsequent relief.",
    date: "December 12, 2024",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 43,
    slug: "can-kidney-stones-kill-you",
    title: "Can Kidney Stones Kill You?",
    category: "Kidney",
    excerpt: "Understanding the rare but serious risks of sepsis and kidney failure from untreated stones.",
    date: "December 09, 2024",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 44,
    slug: "expect-during-kidney-stone-tests",
    title: "What To Expect During Your Kidney Stone Tests?",
    category: "Kidney Stones",
    excerpt: "Walkthrough of Blood tests, Urinalysis, and NCCT Scans for stone diagnosis.",
    date: "December 06, 2024",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 45,
    slug: "foods-for-prostate-health",
    title: "12 Foods To Consider For Prostate Health",
    category: "Urological Problems",
    excerpt: "Integrating Lycopene and Selenium into your diet for long-term prostate wellness.",
    date: "December 03, 2024",
    readTime: "10 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 46,
    slug: "avoid-common-urological-problems",
    title: "How to Identify & Avoid Common Urological Problems?",
    category: "Urological Problems",
    excerpt: "An overview of preventive urology for lifelong bladder and kidney health.",
    date: "November 30, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 47,
    slug: "dj-stent-explained",
    title: "DJ Stent (Double‑J) Explained: Uses, Benefits & FAQs",
    category: "DJ Stent",
    excerpt: "Everything you need to know about post-surgery stents and how to manage them.",
    date: "November 27, 2024",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 48,
    slug: "post-surgical-care-urological-procedures",
    title: "Post‑Surgical Care After Urological Procedures: Essential Tips for Recovery",
    category: "Kidney",
    excerpt: "Maximizing your healing after kidney or prostate surgery at home.",
    date: "November 24, 2024",
    readTime: "10 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 49,
    slug: "stones-cause-urine-blockage",
    title: "Do Kidney Stones Cause Urine Blockage?",
    category: "Kidney Stones",
    excerpt: "Recognizing the signs of obstructive uropathy and its clinical significance.",
    date: "November 21, 2024",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 51,
    slug: "back-pain-vs-kidney-stone",
    title: "Is Your Back Pain Actually a Kidney Stone?",
    category: "Kidney",
    excerpt: "Distinguishing between musculoskeletal back pain and renal colic through specific diagnostic markers.",
    date: "November 15, 2024",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 52,
    slug: "role-of-urologist-treating-kidney-issues",
    title: "The Role of a Urologist in Treating Kidney & Urinary Issues",
    category: "Uncategorized",
    excerpt: "When to transition from a general practitioner to a specialist for stones and prostate issues.",
    date: "November 12, 2024",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 53,
    slug: "non-surgical-options-small-stones",
    title: "Non-Surgical Treatment Options for Small Kidney Stones",
    category: "Treatment Option",
    excerpt: "Success rates of hydration, movement, and medication for stones under 5mm.",
    date: "November 09, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 54,
    slug: "types-of-kidney-stones-treatment",
    title: "Types of Kidney Stones & How They’re Treated Differently",
    category: "Kidney Stones",
    excerpt: "Tailoring treatment for Calcium, Uric Acid, Struvite, and Cystine stones.",
    date: "November 06, 2024",
    readTime: "10 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 55,
    slug: "stones-women-vs-men-differences",
    title: "Kidney Stones in Women vs. Men: What’s the Difference?",
    category: "Treatment Option",
    excerpt: "Exploring the anatomical and hormonal factors that impact stone risk and symptoms in different genders.",
    date: "November 03, 2024",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 56,
    slug: "kidney-stones-while-pregnant",
    title: "Kidney Stones While Pregnant: Can You Wait Until Delivery?",
    category: "Kidney",
    excerpt: "Safe management of stones during pregnancy to protect both mother and child.",
    date: "October 31, 2024",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 57,
    slug: "stones-and-digestive-issues-connection",
    title: "Kidney Stones and Digestive Issues: What’s the Connection?",
    category: "Kidney Stones",
    excerpt: "How gut health and inflammatory bowel conditions can trigger stone formation.",
    date: "October 28, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 58,
    slug: "kidney-stones-faqs",
    title: "Kidney Stones – Frequently Asked Questions & Answers (FAQs)",
    category: "Kidney Stones",
    excerpt: "Dr. Deepanshu Gupta answers the most common queries about RIRS, diet, and recovery.",
    date: "October 25, 2024",
    readTime: "12 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 59,
    slug: "bladder-stones-removal-recovery",
    title: "How Are Bladder Stones Removed? Treatment & Recovery",
    category: "Kidney Stones",
    excerpt: "Understanding cystolitholapaxy and other modern techniques for bladder stone clearance.",
    date: "October 22, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 60,
    slug: "life-after-stone-surgery",
    title: "Life After Kidney Stone Surgery: Diet, Lifestyle & Follow-ups",
    category: "Kidney",
    excerpt: "Your long-term wellness plan to reduce recurrence risk after a kidney stone procedure.",
    date: "October 19, 2024",
    readTime: "10 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 61,
    slug: "stone-symptoms-ignore",
    title: "Kidney Stone Symptoms You Shouldn’t Ignore",
    category: "Treatment Option",
    excerpt: "Differentiating between minor passage pain and clinical emergencies.",
    date: "October 16, 2024",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 62,
    slug: "right-surgeon-gurgaon",
    title: "How to Choose the Right Kidney Stone Surgeon in Gurgaon?",
    category: "Treatment Option",
    excerpt: "Criteria for evaluating expertise in RIRS and advanced urological care.",
    date: "October 13, 2024",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 63,
    slug: "stone-treatment-gurgaon-eligibility",
    title: "Kidney Stone Treatment in Gurgaon: Eligibility, Procedure & Recovery",
    category: "Kidney",
    excerpt: "A local patient's guide to kidney stone treatment planning at Cure Stone center.",
    date: "October 10, 2024",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 64,
    slug: "diet-role-stone-prevention",
    title: "The Role of Diet in Kidney Stone Formation & Prevention",
    category: "Uncategorized",
    excerpt: "In-depth nutritional science: oxalates, sodium, and calcium balance.",
    date: "October 07, 2024",
    readTime: "11 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 65,
    slug: "recurring-stones-what-to-know",
    title: "Recurring Kidney Stones? Here’s What You Need to Know",
    category: "Kidney Stones",
    excerpt: "Breaking the cycle of repeat stone formation with 24-hour urine analysis and precision care.",
    date: "October 04, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 66,
    slug: "signs-see-specialist",
    title: "10 Signs You Need to See a Kidney Stone Specialist",
    category: "Kidney Stones",
    excerpt: "From chronic UTIs to hematuria: when a specialist intervention is vital.",
    date: "October 01, 2024",
    readTime: "10 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 67,
    slug: "ultrasound-ct-scan-diagnosis",
    title: "Role of Ultrasound & CT Scan in Diagnosing Kidney Stones",
    category: "Kidney",
    excerpt: "Why the Non-Contrast CT Scan is the Gold Standard for stone mapping.",
    date: "September 28, 2024",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 68,
    slug: "myths-vs-facts-stones",
    title: "10 Myths vs Facts About Kidney Stones & Treatment",
    category: "Kidney Stones",
    excerpt: "Science-based corrections to common urological misconceptions.",
    date: "September 25, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 69,
    slug: "gurgaon-hub-for-surgery",
    title: "Why is Gurgaon Emerging as a Trusted Hub for Kidney Stone Surgery?",
    category: "Kidney Stones",
    excerpt: "Technological parity with global standards and the rise of specialty centers.",
    date: "September 22, 2024",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 70,
    slug: "patient-guide-stone-surgery",
    title: "Preparing for a Kidney Stone Surgery: A Patient’s Guide",
    category: "Kidney Stones",
    excerpt: "Pre-op protocols, anesthesia expectations, and mental preparation for a successful surgery.",
    date: "September 19, 2024",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 71,
    slug: "questions-ask-specialist",
    title: "Questions To Ask Your Kidney Stone Specialist in Gurgaon",
    category: "Kidney Stones",
    excerpt: "Empowering patients to have informed discussions with their clinical team.",
    date: "September 16, 2024",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 72,
    slug: "candidate-for-pcnl",
    title: "Who Is the Right Candidate for PCNL Kidney Stone Removal?",
    category: "Kidney",
    excerpt: "Assessing suitability for Percutaneous Nephrolithotomy in cases of large staghorn stones.",
    date: "September 13, 2024",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 73,
    slug: "permanent-kidney-damage-risk",
    title: "Can Kidney Stones Cause Permanent Kidney Damage?",
    category: "Kidney Stones",
    excerpt: "The risks of chronic obstruction and silent kidney failure from long-term stones.",
    date: "September 10, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 74,
    slug: "improve-kidney-function-post-surgery",
    title: "Will Removing Kidney Stones Improve Kidney Function?",
    category: "Kidney",
    excerpt: "Clinical data on renal function recovery after successful stone clearance and de-obstruction.",
    date: "September 07, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 75,
    slug: "stone-location-matters",
    title: "Kidney Stone Location: Why It Matters More Than You Think",
    category: "Kidney",
    excerpt: "Impact of stone site (Calyx, Ureter, Bladder) on treatment strategy and pain intensity.",
    date: "September 04, 2024",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 76,
    slug: "recovery-after-stone-surgery",
    title: "The Recovery after Kidney Stone Surgery",
    category: "Kidney",
    excerpt: "Timeline for return to work, physical activity, and normal diet post-operation.",
    date: "September 01, 2024",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 77,
    slug: "aftercare-follow-up-importance",
    title: "Why Are Aftercare & Follow-Up Important After Kidney Stone Surgery?",
    category: "Kidney",
    excerpt: "Managing stents, monitoring for infection, and preventing immediate recurrence.",
    date: "August 28, 2024",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 78,
    slug: "check-myself-for-stones",
    title: "How Do I Check Myself for Kidney Stones?",
    category: "Kidney Stones",
    excerpt: "Self-assessment guide for early symptoms and the 'jump and bump' test.",
    date: "August 25, 2024",
    readTime: "5 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 79,
    slug: "remove-stones-painlessly",
    title: "How Kidney Stone Procedures Are Managed for Comfort",
    category: "Kidney",
    excerpt: "Modern laser techniques and anesthesia management for a comfortable patient experience.",
    date: "August 22, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 80,
    slug: "eswl-method-helpful-cases",
    title: "In Which Kidney Stone Cases is the ESWL Method Helpful?",
    category: "Uncategorized",
    excerpt: "Eligibility criteria for Extracorporeal Shock Wave Lithotripsy.",
    date: "August 19, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 81,
    slug: "pcnl-side-effects",
    title: "Are There Any Side Effects After PCNL Surgery?",
    category: "Staghorn",
    excerpt: "Honest discussion on potential post-op outcomes and long-term safety.",
    date: "August 16, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 82,
    slug: "chronic-kidney-disease-risk",
    title: "Kidney Stones & the Risk of Chronic Kidney Disease",
    category: "Treatment Option",
    excerpt: "Managing stone disease to prevent long-term renal failure.",
    date: "August 13, 2024",
    readTime: "11 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 83,
    slug: "dialysis-patients-stones",
    title: "Dialysis Patients with Kidney Stones: What You Must Know",
    category: "Kidney Stones",
    excerpt: "Specialized urological considerations for patients on hemodialysis.",
    date: "August 10, 2024",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 84,
    slug: "4-methods-stone-removal",
    title: "4 Methods of Kidney Stone Removal: A Guide",
    category: "Kidney Stones",
    excerpt: "Comparing RIRS, ESWL, PCNL, and Mini-PCNL techniques.",
    date: "August 07, 2024",
    readTime: "10 min read",
    author: "Dr. Deepanshu Gupta",
    tag: "Essential",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 85,
    slug: "causes-stones-women",
    title: "What Causes Kidney Stones in Women?",
    category: "Kidney Stones",
    excerpt: "Hormonal, dietary, and anatomical factors unique to the female urinary tract.",
    date: "August 04, 2024",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 86,
    slug: "stone-pain-location-help",
    title: "Kidney Stones Pain Location: When to Seek Help?",
    category: "Kidney Stones",
    excerpt: "Identifying ureteric, renal, and bladder pain zones and urgency levels.",
    date: "August 01, 2024",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 87,
    slug: "fans-rirs-eligibility",
    title: "Who’s Eligible For FANS RIRS- Kidney Stone Treatment?",
    category: "Kidney Stones",
    excerpt: "Assessing stone density and count for the advanced 'dusting' technique.",
    date: "July 29, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 88,
    slug: "best-rirs-delhi",
    title: "RIRS Treatment Options: Advanced Kidney Stone Care",
    category: "Kidney",
    excerpt: "What to consider when evaluating RIRS and laser stone treatment options.",
    date: "July 26, 2024",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 89,
    slug: "anesthesia-during-rirs",
    title: "Do Patients Need to Be Given Anesthesia During RIRS Procedure?",
    category: "Treatment Option",
    excerpt: "Explaining the importance of general/spinal anesthesia for patient safety and procedural accuracy.",
    date: "July 23, 2024",
    readTime: "7 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 90,
    slug: "can-stone-patients-consume-milk",
    title: "Can Kidney Stone Patients Consume Milk?",
    category: "Diet",
    excerpt: "Scientific evidence on dietary calcium vs. stone risk: the real facts.",
    date: "July 20, 2024",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 91,
    slug: "pain-after-passing-stone",
    title: "Can You Still Have Pain After Passing a Kidney Stone?",
    category: "Kidney Stones",
    excerpt: "Causes of post-passage discomfort and secondary bladder irritation.",
    date: "July 17, 2024",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 92,
    slug: "main-factors-causing-stones",
    title: "Which Factors Mainly Cause Kidney Stones?",
    category: "Kidney Stones",
    excerpt: "Metabolic, hereditary, and lifestyle triggers for stone disease.",
    date: "July 14, 2024",
    readTime: "8 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 93,
    slug: "best-rirs-gurgaon",
    title: "RIRS in Gurgaon: Kidney Stone Laser Treatment Options",
    category: "Kidney Stones",
    excerpt: "What patients should know about RIRS, imaging review, and treatment planning in Gurgaon.",
    date: "July 11, 2024",
    readTime: "9 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 94,
    slug: "immediate-relief-stone-pain",
    title: "How can I get immediate relief from kidney stone pain?",
    category: "Kidney",
    excerpt: "Clinically safe at-home strategies and when to use emergency painkillers.",
    date: "July 08, 2024",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 95,
    slug: "can-i-walk-after-rirs",
    title: "Can I Walk After RIRS Surgery? Post-Surgery Recovery",
    category: "Kidney Stones",
    excerpt: "Immediate post-op mobility guidelines and the importance of early movement.",
    date: "July 05, 2024",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 96,
    slug: "number-1-treatment-for-stones",
    title: "What Is The Number 1 Treatment For Kidney Stones",
    category: "Kidney",
    excerpt: "Comparing global clinical guidelines to identify the most effective current standard.",
    date: "July 02, 2024",
    readTime: "5 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 97,
    slug: "disadvantages-of-rirs",
    title: "Are There Any Disadvantages of RIRS?",
    category: "Uncategorized",
    excerpt: "A balanced clinical view on the limitations and side-profile of laser surgery.",
    date: "June 29, 2024",
    readTime: "5 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 98,
    slug: "fans-rirs-vs-rirs-difference",
    title: "FANS RIRS vs RIRS: What’s The Differnce?",
    category: "Kidney Stones",
    excerpt: "The surgical nuance of 'Fine and Slow' dusting for zero-fragment clearance.",
    date: "June 26, 2024",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    tag: "Essential",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  },
  {
    id: 99,
    slug: "ursl-modern-approach",
    title: "URSL: A Modern Approach to Kidney Stone Treatment",
    category: "Kidney",
    excerpt: "Focusing on ureteric stone clearance with rigid ureteroscopy and laser.",
    date: "June 23, 2024",
    readTime: "6 min read",
    author: "Dr. Deepanshu Gupta",
    language: "en",
    image: "/assets/blog/placeholder.jpg",
    content: "<p>Detailed article content coming soon...</p>"
  }
];
