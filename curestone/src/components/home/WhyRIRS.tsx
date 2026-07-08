import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Scissors, Target } from 'lucide-react';

const tableData = [
  { feature: "Incision / Cuts", rirs: "Completely Scarless", eswl: "None", pcnl: "Small Keyhole" },
  { feature: "Success Rate", rirs: "98% (High)", eswl: "60–70% (Variable)", pcnl: "90–95% (High)" },
  { feature: "Hospital Stay", rirs: "Day Care (24 Hrs)", eswl: "Outpatient", pcnl: "3–4 Days" },
  { feature: "Safety (Radiation)", rirs: "Radiation-Free (FANS)", eswl: "X-Ray Based", pcnl: "Minimal Exposure" },
  { feature: "Stone Size", rirs: "Up to 20mm", eswl: "Small (<10mm)", pcnl: "Large (20mm+)" },
  { feature: "Pain Level", rirs: "Minimal", eswl: "Moderate", pcnl: "Significant" },
];

const WhyRIRS = () => {
  const highlights = [
    { icon: <Scissors className="w-6 h-6 text-blue-600" />, title: "No Cuts", desc: "100% Scarless Procedure" },
    { icon: <ShieldCheck className="w-6 h-6 text-green-600" />, title: "Maximum Safety", desc: "Radiation-Free Technology" },
    { icon: <Zap className="w-6 h-6 text-amber-500" />, title: "Rapid Recovery", desc: "Back home within 24 hours" },
    { icon: <Target className="w-6 h-6 text-red-500" />, title: "Precision", desc: "98% Stone-Free Success" },
  ];

  return (
    <section className="py-12 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">

          {/* Header Section */}
          <div className="space-y-4 w-full">
            <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] text-blue-600 bg-blue-50 border border-blue-100 rounded-full uppercase">
              Advanced Kidney Stone Treatment
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 leading-[1.1]">
              The <span className="text-blue-600 italic">Smart Choice</span> <br className="hidden sm:block" />
              for a Stone-Free Life
            </h2>
            <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              RIRS is a revolutionary laser procedure that removes kidney stones through natural pathways. No incisions, no stitches, and a significantly faster return to your daily routine.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {highlights.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center gap-2 transition-all hover:shadow-md">
                <div className="p-3 bg-slate-50 rounded-xl mb-2">{item.icon}</div>
                <p className="text-xs font-black text-slate-900 uppercase tracking-wider leading-tight">
                  {item.title}
                </p>
                <p className="text-[10px] font-bold text-slate-500 uppercase">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-blue-600 text-white font-black rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all hover:-translate-y-1">
            Schedule a Consultation <ArrowRight className="w-5 h-5" />
          </button>

        </div>
      </div>

      {/* Comparison Table Section */}
      <div className="mt-20 max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900">How RIRS <span className="text-blue-600">Compares</span></h2>
          <p className="text-slate-500 font-medium mt-3">Why specialists recommend RIRS over traditional methods.</p>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 shadow-2xl bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest">Feature</th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-blue-400">🏆 RIRS (Recommended)</th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest">ESWL (Shockwave)</th>
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest">PCNL (Surgery)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tableData.map((row, i) => (
                  <tr key={i} className="group hover:bg-blue-50/30 transition-colors">
                    <td className="p-5 text-[11px] font-bold text-slate-500 uppercase tracking-wide">{row.feature}</td>
                    <td className="p-5 text-sm font-black text-blue-700 bg-blue-50/50">{row.rirs}</td>
                    <td className="p-5 text-sm font-medium text-slate-600">{row.eswl}</td>
                    <td className="p-5 text-sm font-medium text-slate-600">{row.pcnl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyRIRS;
