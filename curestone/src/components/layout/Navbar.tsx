"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Social Media Icons
const SocialIcons = {
  Instagram: () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37zM17.5 6.5h.01" /></svg>
  ),
  Facebook: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
  ),
  Youtube: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
  )
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const frame = requestAnimationFrame(handleScroll);
    window.addEventListener("scroll", handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Ensure new page navigation starts from the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const navLinks = [
    { name: "Cure Stone AI", href: "/checker", highlight: true },
    { name: "Specialties", href: "/specialties" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];
  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 bg-white/95 backdrop-blur-xl border-b border-slate-100 ${scrolled ? "h-16 shadow-md" : "h-20"}`}>
        <div className="max-w-7xl mx-auto h-full px-6 md:px-10 flex items-center justify-between">

          <Link href="/" className="flex items-center shrink-0 z-[70]">
            <div className={`relative transition-all duration-300 ${scrolled ? "w-28 h-10" : "w-32 h-12"}`}>
              <Image src="/PNG-Black-e1664728676618.png" alt="Cure Stone Logo" fill sizes="128px" className="object-contain object-left" priority />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={`relative px-2 xl:px-4 py-2 group whitespace-nowrap ${link.highlight ? "" : "font-bold text-slate-600 hover:text-primary text-sm"}`}>
                {link.highlight ? (
                  <div className="relative">
                    {/* Pulsing Highlight Border for Cure Stone AI */}
                    <div className="absolute inset-0 rounded-full border-2 border-primary animate-pulse" />
                    <div className="absolute inset-[-4px] rounded-full border border-primary/20" />
                    <span className="relative px-3 xl:px-4 py-1.5 flex items-center gap-2 text-xs xl:text-sm font-black text-primary uppercase whitespace-nowrap">
                      {link.name}
                    </span>
                  </div>
                ) : link.name}
              </Link>
            ))}
          </div>

          {/* Right Section: Socials + Phone + Book Button */}
          <div className="hidden md:flex items-center gap-4 xl:gap-5">
            <div className="hidden xl:flex items-center gap-3 pr-4 border-r border-slate-200">
              <a href="https://www.youtube.com/@cure_stone" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#FF0000] transition-colors"><SocialIcons.Youtube /></a>
              <a href="https://www.instagram.com/the_cure_stone/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors"><SocialIcons.Instagram /></a>
              <a href="https://www.facebook.com/curestone/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-primary transition-colors"><SocialIcons.Facebook /></a>
            </div>

            <a href="tel:+918800263884" className="hidden xl:block text-sm font-black text-slate-700 hover:text-primary whitespace-nowrap">+91 88002 63884</a>

            <Link href="/book" className="group relative px-5 xl:px-7 py-2 md:py-2.5 bg-primary text-white font-black text-[10px] md:text-xs rounded-full uppercase tracking-widest shadow-lg shadow-primary/30">
              {/* Thick Outer Highlight Border */}
              <div className="absolute inset-[-3px] rounded-full border-2 border-primary group-hover:border-primary-dark transition-colors" />
              <span className="relative whitespace-nowrap">BOOK Free APPOINTMENT</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden p-2 text-primary" onClick={() => setIsOpen(true)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M4 8h16M4 16h16" /></svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 z-[100] bg-white transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full"}`}>

        {/* Mobile Header with Close Button */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-slate-100">
          <div className="relative w-28 h-10">
            <Image src="/PNG-Black-e1664728676618.png" alt="Logo" fill sizes="112px" className="object-contain" />
          </div>
          <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex flex-col h-[calc(100vh-80px)]">
          <div className="p-6 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block w-full p-4 rounded-xl text-lg font-black transition-all ${link.highlight
                  ? "bg-primary text-white border-b-4 border-primary-dark shadow-xl"
                  : "text-slate-800 hover:bg-slate-50 border border-transparent"
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Footer: Socials & Phone */}
          <div className="mt-auto p-8 bg-slate-900 text-white rounded-t-[40px] space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest">Call Expert</p>
                <a href="tel:+918800263884" className="text-xl font-black">+91 88002 63884</a>
              </div>
              <div className="flex gap-3">
                <a href="https://www.youtube.com/@cure_stone" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#FF0000]"><SocialIcons.Youtube /></a>
                <a href="https://www.instagram.com/the_cure_stone/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary"><SocialIcons.Instagram /></a>
                <a href="https://www.facebook.com/curestone/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-primary"><SocialIcons.Facebook /></a>
              </div>
            </div>

            <Link
              href="/book"
              onClick={() => setIsOpen(false)}
              className="block w-full py-5 bg-primary text-white text-center rounded-2xl font-black text-lg shadow-2xl shadow-primary/40 border-b-4 border-primary-dark"
            >
              BOOK CONSULTATION
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
