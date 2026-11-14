import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQ_CATEGORIES } from "@/constants/faqs";

export default function FaqsPage() {
  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Navbar />

      <main className="flex-grow bg-white">
        {/* Hero */}
        <section className="relative pt-24 pb-16 md:pt-40 md:pb-20 bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(43,92,230,0.1),transparent_60%)]" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
            <span className="inline-block px-3 py-1 mb-6 text-[10px] font-black tracking-widest text-primary bg-primary/10 border border-primary/20 rounded-full uppercase">
              Here&apos;s Your Questions Answered
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1] mb-6">
              Kidney Stone <span className="text-primary italic">FAQs</span>
            </h1>
            <p className="max-w-2xl mx-auto text-base md:text-lg text-slate-600 font-medium leading-relaxed">
              Answers on RIRS, Mini PCNL, ESWL, URSL, gallbladder stone surgery, cost, insurance
              and booking a consultation with Dr. Deepanshu Gupta at Cure Stone Hospital, Sector 52, Gurgaon.
            </p>

            {/* Category quick-nav */}
            <nav aria-label="FAQ categories" className="mt-10 flex flex-wrap justify-center gap-2">
              {FAQ_CATEGORIES.map((category) => (
                <a
                  key={category.slug}
                  href={`#${category.slug}`}
                  className="px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-600 bg-white border border-slate-200 rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  {category.title}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 space-y-16">
            {FAQ_CATEGORIES.map((category) => (
              <div key={category.slug} id={category.slug} className="scroll-mt-28">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900">{category.title}</h2>
                  {category.relatedHref && (
                    <Link
                      href={category.relatedHref}
                      className="text-sm font-black text-primary hover:underline whitespace-nowrap"
                    >
                      {category.relatedLabel} →
                    </Link>
                  )}
                </div>

                <FaqAccordion items={category.items} />
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary text-center px-4">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Still Have Questions?</h2>
          <p className="max-w-xl mx-auto text-blue-100 font-medium mb-8">
            Talk to our care team or book a consultation with Dr. Deepanshu Gupta for a
            personalised treatment plan.
          </p>
          <div className="flex xs:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="px-8 py-4 bg-white text-primary font-black rounded-xl text-lg hover:scale-105 transition-all no-underline"
            >
              Book Consultation
            </Link>
            <Link
              href="/checker"
              className="px-8 py-4 bg-primary-dark border border-white/20 text-white font-black rounded-xl text-lg hover:scale-105 transition-all no-underline"
            >
              Check My Symptoms
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
