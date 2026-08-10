import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Marquee from "@/components/home/Marquee";
import DoctorProfile from "@/components/home/DoctorProfile";
import ExpertVideos from "@/components/home/ExpertVideos";
import PatientMosaic from "@/components/home/PatientMosaic";
import GoogleReviews from "@/components/home/GoogleReviews";
import GlobalReach from "@/components/home/GlobalReach";
import Services from "@/components/home/Services";
import WhyRIRS from "@/components/home/WhyRIRS";
import PhysioSection from "@/components/home/PhysioSection";
import AestheticSection from "@/components/home/AestheticSection";
import TreatmentTracker from "@/components/home/TreatmentTracker";
import AppointmentForm from "@/components/home/AppointmentForm";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kidney Stone Surgery in Gurgaon",
  description:
    "Cure Stone offers kidney stone treatment in Gurgaon with RIRS, PCNL, ESWL and URSL options at Sector 52. Consult a urologist doctor in Gurgaon.",
  alternates: {
    canonical: "https://thecurestone.com",
  },
  openGraph: {
    title: "Cure Stone | Kidney Stone Surgery in Gurgaon",
    description:
      "RIRS surgery in Gurgaon and laser stone treatment options at Cure Stone Hospital, Sector 52.",
    url: "https://thecurestone.com",
    images: [{ url: "/og-image.svg", width: 1200, height: 630 }],
  },
};

// Real, distinct videos from the Cure Stone YouTube channel featured on this
// page (ExpertVideos + the one genuine testimonial clip in PatientMosaic).
// Dates/durations pulled from each video's own YouTube watch page metadata.
const homeVideos = [
  {
    ytId: "K5va1bE282M",
    name: "How RIRS Laser Surgery Works — Complete Guide",
    description: "Dr. Deepanshu Gupta explains how RIRS laser surgery works for kidney stone treatment at Cure Stone Hospital, Gurgaon.",
    uploadDate: "2024-06-08T09:01:46-07:00",
    duration: "PT20M21S",
  },
  {
    ytId: "qobqvzQ6za4",
    name: "DJ Stent Removal — Is It Painful?",
    description: "Dr. Deepanshu Gupta on what to expect during DJ stent removal after kidney stone surgery, and how much discomfort is typical.",
    uploadDate: "2022-11-28T03:30:08-08:00",
    duration: "PT1M12S",
  },
  {
    ytId: "aHsGua3WaVM",
    name: "Kidney Stone Prevention — Diet & Hydration",
    description: "Dietary and hydration guidance from Dr. Deepanshu Gupta to help reduce the risk of recurrent kidney stones.",
    uploadDate: "2026-01-24T07:45:00-08:00",
    duration: "PT10M18S",
  },
  {
    ytId: "4FE-zSpLWPQ",
    name: "11mm Kidney Stone Treatment — Patient Case",
    description: "A Cure Stone Hospital patient case discussing treatment for an 11mm kidney stone.",
    uploadDate: "2025-01-25T04:00:05-08:00",
    duration: "PT7M5S",
  },
];

const videoSchemas = homeVideos.map((video) => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  name: video.name,
  description: video.description,
  thumbnailUrl: [`https://img.youtube.com/vi/${video.ytId}/maxresdefault.jpg`],
  uploadDate: video.uploadDate,
  duration: video.duration,
  embedUrl: `https://www.youtube.com/embed/${video.ytId}`,
  contentUrl: `https://www.youtube.com/watch?v=${video.ytId}`,
  publisher: {
    "@type": "Organization",
    name: "Cure Stone",
    "@id": "https://thecurestone.com/#organization",
  },
}));

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {videoSchemas.map((schema) => (
        <script
          key={schema.embedUrl}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
        />
      ))}
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Marquee />
        <DoctorProfile />
        <ExpertVideos />
        <PatientMosaic />
        <GoogleReviews />
        <GlobalReach />
        <Services />
        <WhyRIRS />
        <TreatmentTracker />
        <AppointmentForm />
      </main>
      <Footer />
    </div>
  );
}
