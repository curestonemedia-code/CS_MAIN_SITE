import Image from "next/image";
import { Video, LayoutGrid, ShieldCheck, CalendarClock } from "lucide-react";

const TRUST_BADGES = [
  { icon: Video, label: "Expert Videos", sub: "By Dr. Deepanshu Gupta" },
  { icon: LayoutGrid, label: "Organized by Topics", sub: "Find what you need easily" },
  { icon: ShieldCheck, label: "Trusted & Evidence-based", sub: "Simple, clear explanations" },
  { icon: CalendarClock, label: "New Videos Regularly", sub: "Latest treatments & updates" },
];

// Desktop-only now (mobile uses its own compact circular-avatar strip
// below). The name tag floats below the image via absolute positioning —
// harmless here since the next section sits far below on desktop.
function DoctorPhoto({ className }: { className?: string }) {
  return (
    <div className="relative shrink-0">
      <div className={`relative rounded-3xl overflow-hidden shadow-lg bg-gradient-to-br from-primary/5 to-slate-100 ${className ?? ""}`}>
        <Image src="/assets/doctor.png" alt="Dr. Deepanshu Gupta, Urologist" fill sizes="256px" className="object-cover object-top" />
      </div>
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-md border border-border/50 px-4 py-2 whitespace-nowrap">
        <p className="text-xs font-black text-foreground">Dr. Deepanshu Gupta</p>
        <p className="text-[10px] font-semibold text-text-light">Urologist</p>
      </div>
    </div>
  );
}

export default function VideosHero({ totalVideos }: { totalVideos: number }) {
  // Real count, rounded down for a stable-looking headline figure rather
  // than an exact number that changes every sync.
  const roundedTotal = Math.max(100, Math.floor(totalVideos / 100) * 100);

  const badges = TRUST_BADGES.map((badge) => ({
    ...badge,
    title: badge.label === "Expert Videos" ? `${roundedTotal}+ Expert Videos` : badge.label,
  }));

  return (
    <div className="mb-10">
      {/* Desktop — unchanged from before: text+badges column, photo column. */}
      <div className="hidden lg:flex items-center gap-10">
        <div className="flex-1 text-left">
          <span className="inline-block mb-4 px-4 py-1.5 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">
            Watch & Learn
          </span>
          <h1 className="text-5xl font-black tracking-tight text-foreground">
            Kidney Stone <span className="text-primary">Video Library</span>
          </h1>
          <p className="mt-4 text-text-light font-medium max-w-xl">
            Expert videos by Dr. Deepanshu Gupta on kidney stones — from symptoms and treatment to diet, prevention and real patient
            stories.
          </p>

          <div className="grid grid-cols-2 gap-3 mt-7 max-w-xl">
            {badges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-2.5 bg-white border border-border/50 rounded-xl px-3.5 py-2.5 text-left">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 shrink-0">
                  <badge.icon className="w-4 h-4 text-primary" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-black text-foreground leading-tight truncate">{badge.title}</p>
                  <p className="text-[10px] font-semibold text-text-light truncate">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DoctorPhoto className="w-64 h-72" />
      </div>

      {/* Mobile/tablet — headline+subtitle, then a compact credential strip
          (small round photo + name, not fighting badge text for width), then
          badges get the full row to themselves below. */}
      <div className="lg:hidden">
        <div className="text-center">
          <span className="inline-block mt-5 mb-4 px-4 py-1.5 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">
            Watch & Learn
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
            Kidney Stone <span className="text-primary">Video Library</span>
          </h1>
          <p className="mt-4 text-text-light font-medium max-w-xl mx-auto">
            Expert videos by Dr. Deepanshu Gupta on kidney stones — from symptoms and treatment to diet, prevention and real patient
            stories.
          </p>
        </div>

        <div className="flex items-center gap-3 mt-6 bg-white border border-border/50 rounded-2xl px-4 py-3 max-w-xl mx-auto">
          <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 ring-2 ring-primary/10">
            <Image src="/assets/doctor.png" alt="Dr. Deepanshu Gupta, Urologist" fill sizes="56px" className="object-cover object-top" />
          </div>
          <div className="min-w-0 text-left">
            <p className="text-sm font-black text-foreground truncate">Dr. Deepanshu Gupta</p>
            <p className="text-xs font-semibold text-text-light truncate">Urologist · Cure Stone Hospital</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5 max-w-xl mx-auto">
          {badges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2.5 bg-white border border-border/50 rounded-xl px-3.5 py-2.5 text-left">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/5 shrink-0">
                <badge.icon className="w-4 h-4 text-primary" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-black text-foreground leading-tight">{badge.title}</p>
                <p className="text-[10px] font-semibold text-text-light">{badge.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
