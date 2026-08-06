import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Award,
  BookOpen,
  CalendarCheck2,
  GraduationCap,
  History,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Star,
  Stethoscope,
  Trophy,
  Users,
} from "lucide-react";

const TITLE = "Dr. Deepanshu Gupta | Urologist in Gurgaon";
const DESCRIPTION =
  "Profile of Dr. Deepanshu Gupta, senior urologist and kidney stone specialist at Cure Stone Hospital, Sector 52, Gurgaon.";
const URL = "https://thecurestone.com/dr-deepanshu-gupta";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: URL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    siteName: "Cure Stone",
    type: "profile",
    locale: "en_IN",
    images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.svg"],
  },
};

const stats = [
  { label: "Surgeries Done", value: "9K+", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
  { label: "Publications", value: "200+", icon: BookOpen, color: "text-indigo-600", bg: "bg-indigo-50" },
  { label: "Awards Won", value: "22+", icon: Trophy, color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Years Experience", value: "15+", icon: History, color: "text-emerald-600", bg: "bg-emerald-50" },
];

const achievements = [
  {
    icon: Award,
    text: "Experienced in FANS-RIRS laser surgery",
    subtext: "Advanced kidney stone care at Cure Stone Hospital",
  },
  {
    icon: GraduationCap,
    text: "1st Rank Holder in MCh Urology",
    subtext: "(RML Hospital), New Delhi",
  },
  {
    icon: ShieldCheck,
    text: "Advanced fluoroscopy-free RIRS approach",
    subtext: "Designed to reduce radiation exposure during selected procedures.",
  },
  {
    icon: Star,
    text: "4.9/5 Patient Satisfaction",
    subtext: "Based on 1,000+ verified patient reviews on Google & Practo",
  },
];

const expertises = [
  "FANS-RIRS Laser Surgery",
  "PCNL",
  "URSL",
  "ESWL",
  "Gallstone Surgery",
  "Circumcision",
  "TURP/HoLEP",
];

const workExperience = [
  {
    src: "/PNG-Black-e1664728676618.png",
    alt: "Cure Stone Hospital",
    title: "Chief Urologist & Founder",
    location: "Cure Stone Hospital, Gurugram",
  },
  {
    src: "/dr-gupta/apollo.png",
    alt: "Apollo Hospitals",
    title: "Visiting Consultant: Urology",
    location: "Apollo Hospital, Delhi",
  },
  {
    src: "https://i.pinimg.com/474x/88/5d/8a/885d8ac1a17ac7f1f1c9759c573bc8f4.jpg",
    alt: "RML Hospital",
    title: "Consultant: Urology & Renal Transplant",
    location: "Dr RML Hospital and PGIMER",
  },
  {
    src: "https://i.pinimg.com/474x/88/5d/8a/885d8ac1a17ac7f1f1c9759c573bc8f4.jpg",
    alt: "RML Hospital",
    title: "Senior Resident: MCh Urology Residency",
    location: "Dr RML Hospital and PGIMER",
  },
  {
    src: "/dr-gupta/fortis.png",
    alt: "Fortis Hospital",
    title: "Senior Resident: Urology & Transplant",
    location: "Fortis Hospital, Shalimar Bagh, New Delhi",
  },
  {
    src: "/dr-gupta/max.jpg",
    alt: "Max Healthcare",
    title: "Senior Resident: Urology & Transplant",
    location: "Max Hospital, Shalimar Bagh, New Delhi",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/en/e/e9/Pandit_Bhagwat_Dayal_Sharma_Post_Graduate_Institute_of_Medical_Sciences_logo.png",
    alt: "PGIMS Rohtak",
    title: "Senior Resident: General Surgery",
    location: "Pt. B.D. Sharma, PGIMS, Rohtak",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/en/e/e9/Pandit_Bhagwat_Dayal_Sharma_Post_Graduate_Institute_of_Medical_Sciences_logo.png",
    alt: "PGIMS Rohtak",
    title: "Resident (PG) in General Surgery",
    location: "Pt. B.D. Sharma, PGIMS, Rohtak",
  },
];

const memberships = [
  { src: "/dr-gupta/member1.png", alt: "Delhi Urological Society" },
  { src: "/dr-gupta/member2.png", alt: "Urological Society of India" },
  { src: "/dr-gupta/member3.png", alt: "Urological Association of Asia" },
  { src: "/dr-gupta/member4.png", alt: "Delhi Medical Association" },
  { src: "/dr-gupta/member5.png", alt: "European Association of Urology" },
];

const physicianSchema = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr. Deepanshu Gupta",
  image: "https://thecurestone.com/og-image.svg",
  url: URL,
  jobTitle: "Senior Urologist & Kidney Stone Specialist",
  medicalSpecialty: "Urology",
  description: DESCRIPTION,
  alumniOf: "PGIMS Rohtak, RML Hospital New Delhi",
  hasCredential: "MBBS, MS (PGIMS), MCh Urology (Rank 1, RML Hospital)",
  worksFor: {
    "@type": "MedicalBusiness",
    name: "Cure Stone",
    "@id": "https://thecurestone.com/#organization",
  },
  sameAs: ["https://drdeepanshugupta.com"],
  knowsAbout: expertises,
  memberOf: memberships.map((m) => ({ "@type": "Organization", name: m.alt })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thecurestone.com" },
    { "@type": "ListItem", position: 2, name: "Dr. Deepanshu Gupta", item: URL },
  ],
};

export default function DrDeepanshuGuptaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />

      <main className="flex-grow pt-20">
        <section className="relative overflow-hidden bg-[#EBF4FD] py-16 lg:py-24">
          <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-primary/10 blur-[130px]" />
          <div className="absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-blue-400/10 blur-[110px]" />

          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
            <div className="order-2 lg:order-1">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-blue-700">
                  Doctor Profile
                </span>
              </div>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
                Dr. Deepanshu Gupta
              </h1>
              <p className="mt-4 text-lg font-black text-primary">
                Senior Urologist & Kidney Stone Specialist
              </p>
              <p className="mt-2 text-sm font-bold text-slate-500">
                MBBS · MS (PGIMS) · MCh Urology (Rank 1)
              </p>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600 text-justify">
                Dr. Deepanshu Gupta is an experienced urologist in Gurgaon known for
                precision-led care and a compassionate approach. His work includes
                advanced fluoroscopy-free FANS-RIRS laser surgery, supporting minimally
                invasive kidney stone treatment at Cure Stone Hospital.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 text-sm font-black text-white shadow-xl shadow-blue-200"
                >
                  <CalendarCheck2 className="h-5 w-5" />
                  Book Consultation
                </Link>
                <a
                  href="https://wa.me/918800263884"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 rounded-2xl border-2 border-blue-100 bg-white px-7 py-4 text-sm font-black text-slate-800"
                >
                  <MessageCircle className="h-5 w-5 text-green-600" />
                  WhatsApp Report
                </a>
              </div>

              <a
                href="https://drdeepanshugupta.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-600 hover:underline"
              >
                Visit Dr. Gupta&apos;s Personal Website →
              </a>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative mx-auto aspect-[4/5] max-w-xl overflow-hidden rounded-[3rem] bg-white shadow-[0_32px_64px_-16px_rgba(43,92,230,0.18)]">
                <Image
                  src="/assets/doctor.png"
                  alt="Dr. Deepanshu Gupta"
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, calc(100vw - 48px)"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-950/85 via-blue-900/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-8">
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, index) => (
                        <Star key={index} className="h-4 w-4" fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
                      4.9 Patient Rating
                    </span>
                  </div>
                  <p className="text-3xl font-black text-white">Dr. Deepanshu Gupta</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div key={stat.label} className="rounded-[2rem] border border-blue-50 bg-white p-6 text-center shadow-sm">
                  <div className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${stat.bg} ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-2xl font-black tracking-tight text-slate-900">{stat.value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-primary">
                Expert Overview
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950">
                Scan-based kidney stone care in Gurgaon.
              </h2>
              <p className="mt-5 text-base font-medium leading-8 text-slate-600">
                Every treatment plan depends on stone size, location, symptoms, kidney
                function, infection risk, and patient fitness. Dr. Deepanshu Gupta reviews these
                factors before discussing RIRS, PCNL, URSL, ESWL, or observation where suitable.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {achievements.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.text} className="flex gap-4 rounded-3xl border border-white bg-white/80 p-5 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-black leading-tight text-slate-900">{item.text}</p>
                      <p className="mt-1 text-xs font-semibold leading-normal text-slate-500">
                        {item.subtext}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="mb-10">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-primary">
              Career Timeline
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Work Experience
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {workExperience.map((exp) => (
              <div
                key={`${exp.title}-${exp.location}`}
                className="rounded-3xl border border-blue-50 bg-white p-6 text-center shadow-sm"
              >
                <div className="relative mx-auto mb-4 h-24 w-24 rounded-2xl bg-blue-50/50 p-2">
                  <Image
                    src={exp.src}
                    alt={exp.alt}
                    fill
                    sizes="96px"
                    className="object-contain mix-blend-multiply"
                  />
                </div>
                <p className="text-[15px] font-black leading-tight text-slate-900">{exp.title}</p>
                <p className="mt-2 text-xs font-semibold leading-relaxed text-slate-500">
                  {exp.location}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
              Proud Alumni &amp; Member
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-20">
              {memberships.map((member) => (
                <div
                  key={member.alt}
                  className="relative h-16 w-16 opacity-60 mix-blend-multiply transition-opacity duration-300 hover:opacity-100 md:h-20 md:w-20 lg:h-24 lg:w-24"
                >
                  <Image src={member.src} alt={member.alt} fill sizes="96px" className="object-contain" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.85fr]">
            <div className="rounded-[2rem] border border-slate-200 p-8">
              <div className="mb-6 flex items-center gap-3">
                <Stethoscope className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-black text-slate-900">Surgical Expertise</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {expertises.map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-2xl border border-blue-600/10 bg-blue-600/5 px-5 py-2.5 text-xs font-bold text-blue-700"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950 p-8 text-white">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600">
                <MapPin className="h-6 w-6" />
              </div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-white/40">
                Hospital Location
              </p>
              <h2 className="mt-3 text-2xl font-black">Cure Stone Hospital</h2>
              <p className="mt-3 text-sm font-medium leading-6 text-white/60">
                Sector 52, Near Plot 3, Road No D-13 A, Ardee City,
                Gurugram, Haryana 122003
              </p>
              <a
                href="https://maps.app.goo.gl/6HjEJfWJu2MwhYiT9"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex text-sm font-black text-blue-200"
              >
                Get Directions
              </a>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="rounded-[2rem] bg-slate-950 p-8 text-center text-white lg:p-12">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-200">
              Consult Dr. Deepanshu Gupta
            </p>
            <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black tracking-tight lg:text-5xl">
              Book a kidney stone consultation at Cure Stone Hospital.
            </h2>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/book" className="rounded-2xl bg-white px-7 py-4 text-sm font-black text-slate-950">
                Book Consultation
              </Link>
              <a href="tel:+918800263884" className="rounded-2xl bg-blue-600 px-7 py-4 text-sm font-black text-white">
                Call +91 88002 63884
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
