import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarCheck2, Home, MapPin, Phone, Search } from "lucide-react";

const helpfulLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Book Consultation", href: "/book", icon: CalendarCheck2 },
  { label: "Health Blog", href: "/blog", icon: BookOpen },
  { label: "Contact Hospital", href: "/contact", icon: Phone },
];

const treatmentLinks = [
  { label: "RIRS Surgery", href: "/rirs" },
  { label: "Mini PCNL", href: "/mini-pcnl" },
  { label: "URSL", href: "/ursl" },
  { label: "ESWL", href: "/eswl" },
  { label: "Gurgaon Location", href: "/gurgaon" },
  { label: "Sector 52 Hospital", href: "/sector-52" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      <Navbar />

      <main className="flex-grow pt-20">
        <section className="relative overflow-hidden bg-slate-950 py-20 lg:py-28">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(43,92,230,0.45),transparent_35%),linear-gradient(135deg,#0f172a_0%,#1d4ed8_100%)]" />
          <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
            <div>
              <p className="text-[7rem] font-black leading-none tracking-tight text-white/10 sm:text-[10rem]">
                404
              </p>
              <h1 className="-mt-8 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
                This page could not be found.
              </h1>
              <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-blue-100">
                The link may be old, moved, or typed incorrectly. You can continue to
                Cure Stone&apos;s main pages for kidney stone care, appointments, blog
                articles, and hospital directions.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-black text-slate-950"
                >
                  Go Home <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-sm font-black text-white"
                >
                  Book Consultation
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <div className="rounded-3xl bg-white p-6">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Search className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black text-slate-950">Looking for something specific?</h2>
                <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
                  Try one of these common destinations.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {helpfulLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 rounded-2xl border border-slate-200 p-4 text-sm font-black text-slate-700 transition-colors hover:border-primary hover:text-primary"
                      >
                        <Icon className="h-4 w-4" />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-primary">
                Popular Pages
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950">
                Continue with Cure Stone services.
              </h2>
              <p className="mt-4 text-sm font-medium leading-7 text-slate-500">
                These pages cover kidney stone surgery in Gurgaon, RIRS, PCNL,
                URSL, ESWL, and the Sector 52 hospital location.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {treatmentLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-black text-slate-700 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:text-primary hover:shadow-xl"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-14">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-12">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-950">Need hospital directions?</h2>
                <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
                  Cure Stone Hospital is in Sector 52, Gurgaon. Our care team can help
                  with appointment booking, scan review, and directions.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="tel:+918800263884" className="rounded-xl bg-primary px-5 py-3 text-center text-sm font-black text-white">
                Call +91 88002 63884
              </a>
              <Link href="/contact" className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-center text-sm font-black text-slate-800">
                Contact Page
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
