"use client";

import React, { useState } from "react";
import DietPlannerForm from "./DietPlannerForm";
import DietPlanLoader, { LOADER_TOTAL_MS } from "./DietPlanLoader";
import DietPlanResults from "./DietPlanResults";
import MobileDietWizard from "./mobile/MobileDietWizard";
import DietPlanLoaderMobile from "./mobile/DietPlanLoaderMobile";
import { PHONE_DISPLAY } from "@/constants/business";
import type { DietPlanApiResponse } from "@/lib/dietPlanner/types";
import type { DietPlanInput } from "@/lib/dietPlanner/types";

type Status = "form" | "loading" | "results" | "error";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function Hero() {
  return (
    <div id="diet-planner-tool" className="max-w-3xl mx-auto px-6 text-center mb-12 scroll-mt-24">
      <span className="inline-block px-4 py-1.5 mt-5 lg:mt-0 mb-4 text-[10px] font-black tracking-widest text-primary bg-primary/5 border border-primary/10 rounded-full uppercase">
        Free Tool
      </span>
      <h1 className="text-3xl md:text-5xl font-black tracking-tight text-foreground">
        7-Day Kidney Stone Diet Chart &amp; Personalized Diet Planner
      </h1>
      <p className="mt-4 text-text-light font-medium">
        Answer a few questions and get food guidance, hydration targets and a
        full 7-day meal plan — tailored to your stone type and status.
      </p>
    </div>
  );
}

export default function DietPlannerApp() {
  const [status, setStatus] = useState<Status>("form");
  const [plan, setPlan] = useState<DietPlanApiResponse | null>(null);
  const [submittedInput, setSubmittedInput] = useState<DietPlanInput | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (input: DietPlanInput) => {
    setStatus("loading");
    setSubmittedInput(input);

    try {
      const [response] = await Promise.all([
        fetch("/api/diet-plan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(input),
        }),
        wait(LOADER_TOTAL_MS),
      ]);

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(
          body.error || "Could not build your plan. Please try again.",
        );
      }

      const data: DietPlanApiResponse = await response.json();
      setPlan(data);
      setStatus("results");
    } catch (error) {
      console.error("Diet plan submission failed:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : `Something went wrong. Please call ${PHONE_DISPLAY} for help.`,
      );
      setStatus("error");
    }
  };

  const handleReset = () => {
    setPlan(null);
    setErrorMessage("");
    setStatus("form");
  };

  if (status === "results" && plan && submittedInput) {
    return (
      <DietPlanResults
        plan={plan}
        input={submittedInput}
        onReset={handleReset}
      />
    );
  }

  return (
    <>
      <Hero />

      {status === "loading" && (
        <>
          <DietPlanLoader />
          <DietPlanLoaderMobile />
        </>
      )}

      {status === "error" && (
        <div className="max-w-xl mx-auto text-center py-20 px-6">
          <p className="font-bold text-foreground text-lg mb-2">
            We couldn&apos;t build your plan
          </p>
          <p className="text-text-mid mb-6">{errorMessage}</p>
          <button
            onClick={handleReset}
            className="bg-gradient-to-br from-blue-900 to-blue-700 text-white font-bold px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      )}

      {status === "form" && (
        <div className="px-4">
          <DietPlannerForm onSubmit={handleSubmit} />
          <MobileDietWizard onSubmit={handleSubmit} />
        </div>
      )}
    </>
  );
}
