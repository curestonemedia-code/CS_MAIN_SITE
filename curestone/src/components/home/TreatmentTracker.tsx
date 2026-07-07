"use client";
import React, { useState, useMemo } from 'react';

const TreatmentTracker = () => {
  const [size, setSize] = useState(8);
  const [pain, setPain] = useState(3);
  const [water, setWater] = useState(1.5);
  const [isRecovery, setIsRecovery] = useState(false);

  const insight = useMemo(() => {
    const goal = 3.5;
    const hydrationPct = Math.min(Math.round((water / goal) * 100), 100);

    let risk = "MODERATE RISK";
    let riskClass = "bg-warning/10 text-warning border-warning/20";
    let title = "Fans-RIRS Laser Standard";
    let tag = "Clinical Recommendation";
    let tagClass = "bg-primary/5 text-primary border-primary/20";
    let text = `Stones between 5–10mm may have a lower chance of spontaneous passage. FANS-RIRS may be considered after clinical evaluation and imaging review.`;

    if (isRecovery) {
      risk = "RECOVERY";
      riskClass = "bg-accent/10 text-accent border-accent/20";
      title = "Post-Surgery Recovery";
      tag = "Recovery Mode";
      tagClass = "bg-accent/5 text-accent border-accent/20";
      text = "Focus on hydration (3.5L/day), avoid strenuous activity for 2 weeks, and take prescribed antibiotics. Schedule follow-up ultrasound in 4–6 weeks.";
    } else if (size <= 4 && pain <= 3) {
      risk = "LOW RISK";
      riskClass = "bg-accent/10 text-accent border-accent/20";
      title = "Conservative Management";
      text = "Stones ≤4mm have a 70–80% chance of passing on their own. Drink 3.5L water daily, take pain relief as needed, and monitor for 2–4 weeks.";
    } else if (size <= 10) {
      // Default case already set
    } else if (size <= 20) {
      risk = "HIGH RISK";
      riskClass = "bg-error/10 text-error border-error/20";
      tag = "Urgent Consultation";
      title = "RIRS or PCNL Required";
      text = `Stones ${size}mm require surgical intervention. RIRS (up to 20mm) or PCNL for larger complex stones. Consult Dr. Deepanshu Gupta immediately.`;
    } else {
      risk = "URGENT CARE";
      riskClass = "bg-error/10 text-error border-error/20";
      tag = "URGENT";
      title = "PCNL or Staged Procedure";
      text = `Stones >20mm require PCNL or RIRS Staged Procedure. Call +91 88002 63884 immediately or visit Cure Stone Gurugram.`;
    }

    if (pain >= 8 && !isRecovery) {
      risk = "SEE DOCTOR NOW";
      riskClass = "bg-error/10 text-error border-error/20";
    }

    let hydrationStatus = "GREAT: Excellent hydration!";
    let hydrationColor = "bg-accent";
    if (hydrationPct < 57) {
      hydrationStatus = "CRITICAL: Dehydration risks stone growth.";
      hydrationColor = "bg-error";
    } else if (hydrationPct < 86) {
      hydrationStatus = "LOW: Drink more water.";
      hydrationColor = "bg-warning";
    }

    return { risk, riskClass, title, tag, tagClass, text, hydrationPct, hydrationStatus, hydrationColor };
  }, [size, pain, water, isRecovery]);

  const reset = () => {
    setSize(8);
    setPain(3);
    setWater(1.5);
    setIsRecovery(false);
  };

  return (
    <section className="py-24 bg-white" id="treatment-tracker">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-foreground leading-tight px-4">
            Track Your <span className="text-primary tracking-tighter">Treatment</span>
          </h2>
          <p className="mt-4 text-text-light font-medium max-w-2xl mx-auto italic text-sm sm:text-base px-6">
            Compared to traditional shockwave therapy (ESWL) and PCNL, Fans-RIRS offers unmatched precision and safety.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          {/* Tracker Card */}
          <div className="bg-background-alt p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-border/50 shadow-sm flex flex-col space-y-8 sm:space-y-10">
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-foreground uppercase tracking-tight">Treatment Tracker</h3>
              <p className="text-[9px] sm:text-[10px] font-black text-text-light uppercase tracking-[0.2em]">Digital Self-Assessment</p>
            </div>

            {/* Stone Size Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-[11px] font-black text-text-mid uppercase tracking-widest">Stone Size (Est.)</span>
                <span className="text-sm font-black text-primary bg-primary/10 px-3 py-1 rounded-lg">{size} mm</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            {/* Pain Level Buttons */}
            <div className="space-y-4">
              <span className="text-[10px] sm:text-[11px] font-black text-text-mid uppercase tracking-widest">Pain Level</span>
              <div className="grid grid-cols-5 gap-2">
                {[1, 3, 5, 8, 10].map((level) => (
                  <button
                    key={level}
                    onClick={() => setPain(level)}
                    className={`py-3 sm:py-4 rounded-xl sm:rounded-2xl border-2 transition-all font-black text-xs sm:text-sm ${pain === level
                        ? "bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105"
                        : "bg-white border-border/50 text-text-mid hover:border-primary/30"
                      }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Water Intake Slider */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] sm:text-[11px] font-black text-text-mid uppercase tracking-widest">Water Intake</span>
                <span className="text-sm font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-lg">{water}L</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5"
                step="0.1"
                value={water}
                onChange={(e) => setWater(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            {/* Recovery Mode Toggle */}
            <div className="flex items-center justify-between p-4 bg-white rounded-[1.5rem] border border-border/50 shadow-sm">
              <span className="text-[10px] sm:text-xs font-bold text-text-mid italic">Recovery Mode (Post-Surgery)</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={isRecovery} onChange={(e) => setIsRecovery(e.target.checked)} />
                <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>

          {/* Insight Card */}
          <div className="bg-white border-2 border-border/10 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] shadow-xl flex flex-col space-y-6 sm:space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] rounded-full -mr-16 -mt-16" />

            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-[9px] sm:text-[10px] font-black text-text-light uppercase tracking-[0.2em]">Health Insight</p>
                <p className="text-[11px] font-bold text-foreground">Clinical Assessment</p>
              </div>
              <div className={`px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[9px] sm:text-[10px] font-black border uppercase tracking-widest ${insight.riskClass}`}>
                {insight.risk}
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-primary/5 border border-primary/10 relative">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <p className="text-lg sm:text-xl font-black text-foreground tracking-tight">{insight.title}</p>
                <span className={`inline-block w-fit px-3 py-1 rounded-lg text-[8px] font-black border uppercase tracking-widest ${insight.tagClass}`}>
                  {insight.tag}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-text-mid font-medium leading-relaxed">
                {insight.text}
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-end gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-foreground tracking-tighter leading-none">{insight.hydrationPct}%</span>
                  <span className="text-[9px] sm:text-[10px] font-black text-text-light mb-1 uppercase tracking-widest">Hydration</span>
                </div>
                <span className="text-[9px] font-black text-primary uppercase tracking-[0.1em] bg-primary/5 px-2 py-0.5 rounded border border-primary/10">3.5L Goal</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-700 ${insight.hydrationColor}`}
                  style={{ width: `${insight.hydrationPct}%` }}
                />
              </div>
              <p className={`text-[10px] font-black uppercase tracking-wide italic flex items-center gap-2`}>
                <span className={`w-1.5 h-1.5 rounded-full ${insight.hydrationColor} animate-pulse`} />
                {insight.hydrationStatus}
              </p>
            </div>

            <p className="mt-auto pt-6 text-[9px] sm:text-[10px] text-text-light italic leading-relaxed border-t border-border/50">
              Note: This tracker provides general guidance. Always consult Dr. Deepanshu Gupta for a formal diagnosis.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="flex-1 px-8 py-4 bg-foreground text-white font-black rounded-xl sm:rounded-2xl shadow-xl hover:bg-black transition-all hover:-translate-y-1 active:scale-95 text-sm">
                Consult Specialist
              </button>
              <button onClick={reset} className="px-6 py-4 border-2 border-border text-[9px] font-black rounded-xl sm:rounded-2xl hover:bg-background-alt transition-all uppercase">
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Sticky Mobile Result Indicator */}

      </div>
    </section>
  );
};

export default TreatmentTracker;
