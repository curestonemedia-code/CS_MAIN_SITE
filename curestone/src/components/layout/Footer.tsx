import Link from "next/link";
import Image from "next/image";

const SocialIcons = {
  Instagram: () => (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" /></svg>
  ),
  Facebook: () => (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  ),
  Youtube: () => (
    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
  ),
};

const footerSections = [
  {
    title: "Treatments",
    links: [
      { label: "Kidney Stone Surgery in Gurgaon", href: "/gurgaon" },
      { label: "RIRS Laser Surgery", href: "/rirs" },
      { label: "Mini PCNL Surgery", href: "/mini-pcnl" },
      { label: "URSL Treatment", href: "/ursl" },
      { label: "ESWL Lithotripsy", href: "/eswl" },
      { label: "Sector 52 Hospital", href: "/sector-52" },
    ],
  },
  {
    title: "Patient Resources",
    links: [
      { label: "Health Blog", href: "/blog" },
      { label: "FAQs", href: "/faqs" },
      { label: "Cure Stone AI", href: "/checker" },
      { label: "Book Consultation", href: "/book" },
      { label: "RIRS Surgery Cost in Gurgaon", href: "/gurgaon" },
      { label: "Urologist Doctor Gurgaon", href: "/sector-52" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Cure Stone", href: "/about" },
      { label: "Dr. Deepanshu Gupta", href: "/dr-deepanshu-gupta" },
      { label: "Contact Us", href: "/contact" },
      { label: "Blogs", href: "/blog" },
      { label: "Location", href: "/sector-52" },
    ],
  },
];

const contactLinks = [
  { label: "+91 88002 63884", href: "tel:+918800263884" },
  { label: "care@thecurestone.com", href: "mailto:care@thecurestone.com" },
  { label: "WhatsApp Support", href: "https://wa.me/918800263884", external: true },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#08090A] pt-20 pb-10 text-white">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_0.9fr_0.9fr_1.15fr]">
          <div className="space-y-6">
            <Link href="/" className="inline-block w-fit no-underline">
              <div className="relative h-12 w-44">
                <Image
                  src="/PNG-Black-e1664728676618.png"
                  alt="Cure Stone Hospital"
                  fill
                  className="object-contain object-left brightness-0 invert"
                />
              </div>
            </Link>
            <p className="max-w-sm text-[13px] leading-relaxed text-white/55">
              Cure Stone Hospital in Sector 52, Gurgaon provides focused kidney stone care,
              urology consultations, RIRS, PCNL, URSL, and ESWL treatment planning.
            </p>
            <div className="space-y-3 text-[13px]">
              {contactLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="block text-white/70 no-underline transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex gap-3 pt-2">
              <a href="https://www.youtube.com/@cure_stone" target="_blank" rel="noopener noreferrer" aria-label="Cure Stone YouTube" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/45 transition-all hover:border-white/30 hover:bg-[#FF0000] hover:text-white">
                <SocialIcons.Youtube />
              </a>
              <a href="https://www.instagram.com/the_cure_stone/" target="_blank" rel="noopener noreferrer" aria-label="Cure Stone Instagram" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/45 transition-all hover:border-white/30 hover:bg-primary hover:text-white">
                <SocialIcons.Instagram />
              </a>
              <a href="https://www.facebook.com/curestone/" target="_blank" rel="noopener noreferrer" aria-label="Cure Stone Facebook" className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-white/45 transition-all hover:border-white/30 hover:bg-primary hover:text-white">
                <SocialIcons.Facebook />
              </a>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title} className="space-y-5">
              <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
                {section.title}
              </h2>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {section.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link
                      href={link.href}
                      className="text-[13px] text-white/62 no-underline transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="space-y-5">
            <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/35">
              Hospital Location
            </h2>
            <p className="text-sm font-semibold leading-6 text-white/80">
              Cure Stone Hospital, Sector 52, Near Plot 3, Road No D-13 A,
              Ardee City, Gurugram, Haryana 122003
            </p>
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/35">
                Consultation Hours
              </p>
              <p className="text-sm text-white/70">10:00 AM - 7:00 PM by appointment</p>
              <p className="text-sm text-white/70">Emergency support available 24/7</p>
            </div>
            <a
              href="https://maps.app.goo.gl/6HjEJfWJu2MwhYiT9"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary no-underline"
            >
              Get Directions <span>→</span>
            </a>
          </div>
        </div>

        {/* Map Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center py-12 border-y border-white/5 mb-12">
          <div className="rounded-2xl overflow-hidden border border-white/10 aspect-video lg:aspect-auto lg:h-64 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14033.273570394473!2d77.070288!3d28.439817!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d19559d21f213%3A0xa736733167a5023b!2sCure%20Stone!5e0!3m2!1sen!2sin!4v1782981388299!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="opacity-90"
              title="Cure Stone Hospital Location"
            />
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="text-primary text-sm font-bold uppercase tracking-widest mb-2">Visit Our Hospital</h4>
              <p className="text-xl font-medium text-white/90"> Cure Stone Hospital</p>
              <p className="text-white/50 text-sm mt-1">Sector 52, Near Plot, 3, Rd No D-13 A, Ardee City, Gurugram, Haryana 122003</p>
            </div>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Consultation Hours</p>
                <p className="text-sm text-white/70 font-medium">10:00 AM – 7:00 PM On Appoiment</p>
              </div>
              <div>
                <p className="text-[10px] text-white/30 uppercase tracking-widest mb-1">Emergency Service</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <p className="text-sm text-white/70 font-medium text-green-500/80">Available 24/7</p>
                </div>
              </div>
            </div>
            <a
              href="https://share.google/VjnKWDjoss7qaD1mi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest no-underline"
            >
              Get Directions <span>→</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">
            © 2026 Cure Stone Hospital. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {[
              { label: "Home", href: "/" },
              { label: "About", href: "/about" },
              { label: "Doctor", href: "/dr-deepanshu-gupta" },
              { label: "Contact", href: "/contact" },
              { label: "Blogs", href: "/blog" },
              { label: "Book", href: "/book" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[10px] font-bold uppercase tracking-widest text-white/30 no-underline transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
