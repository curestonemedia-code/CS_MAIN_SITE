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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
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
