import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import type { Metadata } from "next";
import { CalendarClock, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";

const TITLE = "Contact Cure Stone Hospital | Sector 52, Gurgaon";
const DESCRIPTION =
  "Contact Cure Stone Hospital in Sector 52, Gurgaon for kidney stone consultation, RIRS, PCNL, URSL, ESWL, appointment booking, and directions.";
const URL = "https://thecurestone.com/contact";

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
    type: "website",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://thecurestone.com" },
    { "@type": "ListItem", position: 2, name: "Contact", item: URL },
  ],
};

const contactCards = [
  {
    icon: Phone,
    label: "Call",
    title: "+91 88002 63884",
    text: "Speak with the care team for appointments and scan review.",
    href: "tel:+918800263884",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    title: "Message Us",
    text: "Share your appointment request or reports securely with the coordinator.",
    href: "https://wa.me/918800263884",
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    title: "care@thecurestone.com",
    text: "Send non-urgent queries and appointment details.",
    href: "mailto:care@thecurestone.com",
  },
];

const visitDetails = [
  { label: "Hospital", value: "Cure Stone Hospital" },
  { label: "Location", value: "Sector 52, Near Plot 3, Road No D-13 A, Ardee City, Gurugram, Haryana 122003" },
  { label: "Consultation Hours", value: "10:00 AM - 7:00 PM by appointment" },
  { label: "Emergency Support", value: "Available 24/7" },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c") }}
      />
      <Navbar />

      <main className="flex-grow pt-20">
        <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14033.273570394473!2d77.070288!3d28.439817!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19559d21f213%3A0xa736733167a5023b!2sCure%20Stone!5e0!3m2!1sen!2sin!4v1782981388299!5m2!1sen!2sin"
            className="pointer-events-none absolute inset-0 h-full w-full scale-110 border-0 opacity-35 grayscale z-10"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            tabIndex={-1}
            aria-hidden="true"
            title="Cure Stone Hospital map background"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,92,230,0.45),transparent_38%),linear-gradient(135deg,rgba(15,23,42,0.96)_0%,rgba(29,78,216,0.88)_100%)]" />
          <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20" />
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-blue-100">
                Contact Cure Stone
              </p>
              <h1 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
                Visit or Contact Cure Stone Hospital in Gurgaon
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-blue-100">
                Book a kidney stone consultation, get directions to Sector 52,
                or speak with our team about scan review and urology appointments.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/book" className="rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-950">
                  Book Consultation
                </Link>
                <a href="tel:+918800263884" className="rounded-2xl border border-white/20 px-6 py-4 text-sm font-black text-white">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="grid gap-6 md:grid-cols-3">
            {contactCards.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl"
                >
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-400">
                    {item.label}
                  </p>
                  <h2 className="mt-2 text-xl font-black text-slate-900">{item.title}</h2>
                  <p className="mt-3 text-sm font-medium leading-6 text-slate-500">{item.text}</p>
                </a>
              );
            })}
          </div>
        </section>

        <section className="bg-slate-50 py-16">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-center gap-3">
                <MapPin className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-black text-slate-900">Hospital Details</h2>
              </div>
              <div className="space-y-5">
                {visitDetails.map((item) => (
                  <div key={item.label} className="border-b border-slate-100 pb-5 last:border-b-0 last:pb-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-bold leading-6 text-slate-800">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://maps.app.goo.gl/6HjEJfWJu2MwhYiT9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl bg-primary px-5 py-3 text-sm font-black text-white"
                >
                  Get Directions
                </a>
                <Link href="/sector-52" className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-black text-slate-700">
                  View Location Page
                </Link>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="h-full bg-slate-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14033.273570394473!2d77.070288!3d28.439817!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19559d21f213%3A0xa736733167a5023b!2sCure%20Stone!5e0!3m2!1sen!2sin!4v1782981388299!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Cure Stone Hospital map"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: CalendarClock,
                title: "Appointments",
                text: "Use the booking form for online or in-clinic consultation requests.",
                href: "/book",
                label: "Book Now",
              },
              {
                icon: ShieldCheck,
                title: "Secure & Confidential",
                text: "Patient information shared through booking or consultation channels is handled carefully.",
                href: "/book",
                label: "Start Booking",
              },
              {
                icon: MapPin,
                title: "Local Care",
                text: "Find Cure Stone in Sector 52, Gurgaon for kidney stone treatment planning.",
                href: "/gurgaon",
                label: "Gurgaon Page",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="rounded-3xl border border-slate-200 p-7">
                  <Icon className="h-7 w-7 text-primary" />
                  <h2 className="mt-5 text-xl font-black text-slate-900">{item.title}</h2>
                  <p className="mt-3 text-sm font-medium leading-6 text-slate-500">{item.text}</p>
                  <Link href={item.href} className="mt-5 inline-block text-sm font-black text-primary">
                    {item.label}
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
