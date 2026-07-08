import Image from "next/image";
import Link from "next/link";
import {
  Users,
  BookOpen,
  Award,
  History,
  Stethoscope,
  MapPin,
  Star,
  MessageCircle,
  CalendarCheck2,
  Trophy,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";
const DoctorProfile = () => {
  const stats = [
    {
      label: "Surgeries Done",
      value: "9K+",
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Publications",
      value: "200+",
      icon: BookOpen,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      label: "Awards Won",
      value: "22+",
      icon: Trophy,
      color: "text-amber-500",
      bg: "bg-amber-50",
    },
    {
      label: "Years Experience",
      value: "15+",
      icon: History,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  const expertises = [
    "Fans-RIRS Laser Surgery",
    "PCNL",
    "URSL",
    "ESWL",
    "Gallstone Surgery",
    "Circumcision",
    "TURP/HoLEP",
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
      subtext:
        "Designed to reduce radiation exposure during selected procedures.",
    },

    {
      icon: Star,
      text: "4.9/5 Patient Satisfaction",
      subtext: "Based on 1,000+ verified patient reviews on Google & Practo",
    },
  ];

  return (
    <section className="relative py-16 bg-[#EBF4FD] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[100px] -ml-48 -mb-48 opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full shadow-sm">
            <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
            <span className="text-[11px] font-bold tracking-[0.1em] text-blue-700 uppercase">
              Meet Your Specialist
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
            Global Standard Care by <br />
            <span className="bg-linear-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
              Dr. Deepanshu Gupta
            </span>
          </h2>
          <p className="mt-6 text-slate-600 font-medium max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Combining 15+ years of clinical excellence with the world&apos;s
            most advanced laser technologies for kidney stone treatment.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: Profile Photo & Key Info */}
          <div className="lg:col-span-12 xl:col-span-5 relative animate-fade-in-up [animation-delay:200ms]">
            <div className="relative group max-w-2xl mx-auto xl:mx-0">
              {/* Photo Card */}
              <div className="relative aspect-[4/5] bg-white rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(43,92,230,0.15)] transition-all duration-700 group-hover:shadow-[0_48px_80px_-16px_rgba(43,92,230,0.2)]">
                <Image
                  src="/assets/doctor.png"
                  alt="Dr. Deepanshu Gupta"
                  fill
                  sizes="(min-width: 1280px) 40vw, (min-width: 640px) 672px, calc(100vw - 48px)"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-1000 ease-out"
                />

                {/* Visual Overlays */}
                <div className="absolute inset-0 bg-linear-to-t from-blue-950/90 via-blue-900/20 to-transparent"></div>

                {/* Bottom Overlay Content */}
                <div className="absolute bottom-0 inset-x-0 p-8 md:p-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-blue-100 text-xs font-bold tracking-wider uppercase">
                      4.9 Patient Rating
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-2">
                    Dr. Deepanshu Gupta
                  </h3>
                  <div className="flex flex-col gap-1">
                    <p className="text-blue-200 text-xs sm:text-sm font-bold flex items-center gap-2">
                      Senior Urologist & Kidney Stone Specialist
                    </p>
                    <p className="text-blue-200/60 text-[12px] sm:text-[12px] font-medium leading-relaxed">
                      MBBS · MS (PGIMS) · MCh Urology (Rank 1)
                    </p>
                  </div>
                </div>
              </div>

              {/* Floatings Tags */}
            </div>

            {/* Quick Contact Card */}
            <div className="mt-6 bg-white/70 backdrop-blur-md border border-white p-6 rounded-[2rem] shadow-sm max-w-2xl mx-auto xl:mx-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.15em]">
                    Hospital Location
                  </p>
                  <p className="text-sm font-bold text-slate-800 mt-1 underline">
                    <a
                      href="https://maps.app.goo.gl/6HjEJfWJu2MwhYiT9"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Sector 52, Near Plot, 3, Rd No D-13 A, Ardee City,
                      Gurugram, Haryana 122003
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Detailed Content */}
          <div className="lg:col-span-12 xl:col-span-7 flex flex-col gap-10 animate-slide-in-right [animation-delay:400ms]">
            {/* Professional Summary */}
            <div className="relative">
              <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-600 to-indigo-500 rounded-full"></div>
              <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-3">
                <Stethoscope className="text-blue-600" size={24} />
                Expert Overview
              </h4>
              <p className="text-lg text-slate-600 leading-relaxed font-medium text-justify">
                Dr. Deepanshu Gupta is an experienced urologist in Gurgaon known
                for precision-led care and a compassionate approach. His work
                includes{" "}
                <strong className="text-blue-700 font-extrabold underline decoration-blue-200 decoration-4 underline-offset-4 uppercase">
                  advanced fluoroscopy-free FANS-RIRS laser surgery
                </strong>
                , supporting minimally invasive kidney stone treatment at
                Cure Stone Hospital.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="group bg-white border border-blue-50 p-6 rounded-[2rem] text-center transition-all duration-300 hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1"
                >
                  <div
                    className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon size={24} />
                  </div>
                  <p
                    className={`text-2xl font-black text-slate-900 tracking-tight`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Achievements Section */}
            <div>
              <p className="text-xs font-black text-slate-950 uppercase tracking-[0.25em] mb-6">
                Distinguished Achievements
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {achievements.map((item, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-5 bg-white/40 border border-white rounded-[1.5rem] transition-all hover:bg-white/80 group"
                  >
                    <div className="shrink-0 w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-[13px] font-black text-slate-900 leading-tight">
                        {item.text}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-500 mt-1 leading-normal">
                        {item.subtext}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Expertise Pills */}
            <div>
              <p className="text-xs font-black text-slate-950 uppercase tracking-[0.25em] mb-6">
                Surgical Expertise
              </p>
              <div className="flex flex-wrap gap-2.5">
                {expertises.map((exp, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600/5 border border-blue-600/10 rounded-2xl text-[12px] font-bold text-blue-700 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-200 transition-all cursor-default group"
                  >
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full group-hover:bg-white"></span>
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href="/book"
                className="flex-1 px-8 py-5 bg-blue-600 text-white font-black rounded-3xl shadow-[0_20px_40px_-12px_rgba(43,92,230,0.4)] hover:bg-blue-700 hover:shadow-[0_24px_48px_-12px_rgba(43,92,230,0.5)] transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                <CalendarCheck2 size={20} />
                Book Consultation Free
              </Link>
              <a
                href="https://wa.me/918800263884"
                target="_blank"
                className="flex-1 px-8 py-5 bg-white border-2 border-blue-100 text-slate-800 font-black rounded-3xl hover:border-blue-400 hover:bg-blue-50 transition-all flex items-center justify-center gap-3 no-underline shadow-sm"
              >
                <MessageCircle className="text-green-600" size={20} />
                WhatsApp Report
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorProfile;
