"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";


import MatchingScreen from "./MatchingScreen";

import StepCard, {
  
  BudgetSelector,
  
  ContactForm,
  AvailabilitySelector,
} from "./StepCard";

import {
  goalOptions,
  languageOptions,
  levels,
  focusAreas,
  budgetOptions,
  availabilityOptions,
  tutorPreferences,
  academicBudgetOptions,
  languageBudgetOptions,
  academicSubjects,
  academicLevels,
  academicFocusAreas,
  academicPreferences,
  timeSlotOptions,
 
} from "./data";
import ProgressTracker from "./ProgressTraker";
import TutorPreview from "./TutorPreview";
import { validateStep } from "../validation";
import SITE_CONFIG from "@/app/siteConfig";

export default function StudentOnboarding() {
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);
const {whatsappNumber}=SITE_CONFIG
const [form, setForm] = useState({
  goal: "",
  language: "",
  level: "",
  focus: "",
  budget: "",
  availability: [],
  timeSlot: "",
  tutor: "",
  name: "",
  email: "",
});

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const toggleDay = (day) => {
    if (form.availability.includes(day)) {
      update(
        "availability",
        form.availability.filter(
          (d) => d !== day
        )
      );
    } else {
      update("availability", [
        ...form.availability,
        day,
      ]);
    }
  };



const next = () => {
  const errorMessage = validateStep(step, form);

  if (errorMessage) {
    setError(errorMessage);
    return;
  }

  setError("");

  if (step < 9) {
    setStep(step + 1);
  }
};

  const prev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

 

  return (
    <section className="relative min-h-screen overflow-hidden bg-white py-20">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#D6451B]/10 blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#7BC3D7]/10 blur-[120px]" />

        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 py-6 lg:px-8 lg:py-10">

        {/* Progress */}

        <ProgressTracker
          currentStep={step}
          totalSteps={10}
        />
        <div className="mb-8 flex flex-wrap justify-center gap-3">

  {form.goal && (
    <span className="rounded-full bg-[#D6451B]/10 px-4 py-2 text-sm text-[#D6451B]">
      {form.goal}
    </span>
  )}

  {form.language && (
    <span className="rounded-full bg-[#7BC3D7]/10 px-4 py-2 text-sm text-[#1d7e97]">
      {form.language}
    </span>
  )}

  {form.level && (
    <span className="rounded-full bg-slate-100 px-4 py-2 text-sm">
      {form.level}
    </span>
  )}

</div>

     <div className="mx-auto max-w-4xl">

     <div className="relative overflow-hidden rounded-[40px] border border-white/60 bg-white/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:p-12">
  
  <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[#D6451B]/10 blur-3xl" />

  <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#7BC3D7]/10 blur-3xl" />

  <div className="relative">

              <AnimatePresence mode="wait">

                {/* GOAL */}

                {step === 0 && (
                  <StepCard
                    title="Why are you learning?"
                    subtitle="We'll personalize your tutor recommendations."
                    options={goalOptions}
                    selected={form.goal}
                    onSelect={(v) =>
                      update("goal", v)
                    }
                  />
                )}

                {/* LANGUAGE */}

                {step === 1 && (
                  <StepCard
                    title="Which language do you want to learn?"
                    subtitle="Choose your primary learning focus."
                  options={
  form.goal === "Academics"
    ? academicSubjects
    : languageOptions
}
                    selected={form.language}
                    onSelect={(v) =>
                      update("language", v)
                    }
                  />
                )}

                {/* LEVEL */}

                {step === 2 && (
                  <StepCard
                    title="What's your current level?"
                    subtitle="This helps us recommend suitable tutors."
                   options={
  form.goal === "Academics"
    ? academicLevels
    : levels
}
                    selected={form.level}
                    onSelect={(v) =>
                      update("level", v)
                    }
                  />
                )}

                {/* FOCUS */}

                {step === 3 && (
                  <StepCard
                    title="What do you want to improve?"
                    subtitle="Choose your learning priority."
                   options={
  form.goal === "Academics"
    ? academicFocusAreas
    : focusAreas
}
                    selected={form.focus}
                    onSelect={(v) =>
                      update("focus", v)
                    }
                  />
                )}

                {/* BUDGET */}

                {step === 4 && (
                 <BudgetSelector
  value={form.budget}
  onChange={(v) => update("budget", v)}
  budgets={
    form.goal === "Academics"
      ? academicBudgetOptions
      : languageBudgetOptions
  }
/>
                )}

                {/* AVAILABILITY */}

                {step === 5 && (
                  <AvailabilitySelector
                    selected={
                      form.availability
                    }
                    toggleDay={toggleDay}
                    days={
                      availabilityOptions
                    }
                  />
                )}
                {/* TIME SLOT */}

{step === 6 && (
  <StepCard
    title="What time works best for you?"
    subtitle="We'll recommend classes that fit your schedule."
    options={timeSlotOptions}
    selected={form.timeSlot}
    onSelect={(v) =>
      update("timeSlot", v)
    }
  />
)}

                {/* TUTOR */}

                {step === 7 && (
                  <StepCard
                    title="Tutor preferences"
                    subtitle="We'll prioritize tutors that match your preferences."
                   options={
  form.goal === "Academics"
    ? academicPreferences
    : tutorPreferences
}
                    selected={form.tutor}
                    onSelect={(v) =>
                      update("tutor", v)
                    }
                  />
                )}

                {/* CONTACT */}

                {step === 8 && (
                  <ContactForm
                    form={form}
                    update={update}
                  />
                )}

                {/* MATCHING */}

                {step === 9 && (
                 <MatchingScreen
  onContinue={() => {
    const message = `
🎓 New Tutor Request

👤 Name: ${form.name}
📧 Email: ${form.email}
📱 Phone: ${form.phone}

🎯 Goal: ${form.goal}
📚 Subject: ${form.language}
📈 Level: ${form.level}
⭐ Focus: ${form.focus}

💰 Budget: ${form.budget}
📅 Days: ${form.availability.join(", ")}
⏰ Time: ${form.timeSlot}

🎯 Preference: ${form.tutor}
`;

    const whatsappUrl =
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`;

    window.open(whatsappUrl, "_blank");
  }}
/>
                )}

              </AnimatePresence>

              {/* Navigation */}
{error && (
  <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
    {error}
  </div>
)}
              {step < 9 && (
                <div className="mt-10 flex items-center gap-3">

                  {step > 0 && (
                    <button
                      onClick={prev}
                      className="rounded-full border border-slate-200 px-6 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                    >
                      Back
                    </button>
                  )}

                  <button
                    onClick={next}
                    className="flex-1 rounded-full bg-gradient-to-r from-[#D6451B] to-[#E8653D] px-6 py-4 font-medium text-white shadow-lg shadow-[#D6451B]/20 transition hover:scale-[1.01]"
                  >
                    Continue
                  </button>
                </div>
              )}

            </div>


          </div>
        </div>
      </div>
    </section>
  );
}