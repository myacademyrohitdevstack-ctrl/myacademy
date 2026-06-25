"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

ProgressTracker

import StepCard, {
  AvailabilitySelector,
  BudgetSelector,
  ContactForm,
} from "@/app/find-tutor/components/StepCard";

import TutorSuccess from "./TutorSuccess";


import {
  tutorSubjectOptions,
  experienceOptions,
  studentLevelOptions,
  teachingModeOptions,
  tutorAvailabilityOptions,
  tutorTimeSlots,
  earningOptions,
  qualificationOptions,
} from "./data";
import ProgressTracker from "@/app/find-tutor/components/ProgressTraker";
import { validateStep } from "./Validation";


export default function BecomeTutor() {
  const [error, setError] = useState("");
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    subject: "",
    experience: "",
    studentLevel: "",
    mode: "",
    availability: [],
    timeSlot: "",
    earnings: "",
    qualification: "",
    name: "",
    email: "",
    phone: "",
    city: "",
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

  // Contact form completed
  if (step === 8) {
    const message = `
🎓 *New Tutor Application*

👤 Name: ${form.name}
📧 Email: ${form.email}
📱 Phone: ${form.phone}
📍 City: ${form.city}

📚 Subject: ${form.subject}
👨‍🏫 Experience: ${form.experience}
🎯 Student Level: ${form.studentLevel}
💻 Teaching Mode: ${form.mode}

📅 Availability: ${
      form.availability.length
        ? form.availability.join(", ")
        : "Not Provided"
    }

⏰ Time Slot: ${form.timeSlot}

💰 Expected Earnings: ${form.earnings}

🎓 Qualification: ${form.qualification}
`;

    const whatsappNumber = "919876543210"; // your number

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );

    setStep(9);
    return;
  }

  if (step < 9) {
    setStep(step + 1);
  }
};

  const prev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };
  const canContinue =
  !validateStep(step, form);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white py-20">
      {/* Background */}
      <div className="absolute inset-0">

        <div className="absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-[#D6451B]/10 blur-[120px]" />

        <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[#7BC3D7]/10 blur-[120px]" />

        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5">

        <ProgressTracker
          currentStep={step}
          totalSteps={10}
        />

        {/* Selected Values */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">

          {form.subject && (
            <span className="rounded-full bg-[#D6451B]/10 px-4 py-2 text-sm text-[#D6451B]">
              {form.subject}
            </span>
          )}

          {form.experience && (
            <span className="rounded-full bg-[#7BC3D7]/10 px-4 py-2 text-sm text-[#1d7e97]">
              {form.experience}
            </span>
          )}

          {form.studentLevel && (
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm">
              {form.studentLevel}
            </span>
          )}

        </div>

        <div className="mx-auto max-w-4xl">

          <div className="relative overflow-hidden rounded-[40px] border border-white/60 bg-white/90 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.08)] backdrop-blur-xl lg:p-12">

            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-[#D6451B]/10 blur-3xl" />

            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-[#7BC3D7]/10 blur-3xl" />

            <div className="relative">

              <AnimatePresence mode="wait">

                {/* SUBJECT */}

                {step === 0 && (
                  <StepCard
                    title="What would you like to teach?"
                    subtitle="Choose your primary subject."
                    options={tutorSubjectOptions}
                    selected={form.subject}
                    onSelect={(v) =>
                      update("subject", v)
                    }
                  />
                )}

                {/* EXPERIENCE */}

                {step === 1 && (
                  <StepCard
                    title="Teaching experience"
                    subtitle="Tell us about your background."
                    options={experienceOptions}
                    selected={form.experience}
                    onSelect={(v) =>
                      update("experience", v)
                    }
                  />
                )}

                {/* STUDENT LEVEL */}

                {step === 2 && (
                  <StepCard
                    title="Who do you teach?"
                    subtitle="Select your preferred student groups."
                    options={studentLevelOptions}
                    selected={form.studentLevel}
                    onSelect={(v) =>
                      update("studentLevel", v)
                    }
                  />
                )}

                {/* MODE */}

                {step === 3 && (
                  <StepCard
                    title="Teaching mode"
                    subtitle="How would you like to teach?"
                    options={teachingModeOptions}
                    selected={form.mode}
                    onSelect={(v) =>
                      update("mode", v)
                    }
                  />
                )}

                {/* AVAILABILITY */}

                {step === 4 && (
                  <AvailabilitySelector
                    selected={form.availability}
                    toggleDay={toggleDay}
                    days={tutorAvailabilityOptions}
                  />
                )}

                {/* TIME SLOT */}

                {step === 5 && (
                  <StepCard
                    title="Preferred teaching hours"
                    subtitle="Choose the time that suits you."
                    options={tutorTimeSlots}
                    selected={form.timeSlot}
                    onSelect={(v) =>
                      update("timeSlot", v)
                    }
                  />
                )}

                {/* EARNINGS */}

                {step === 6 && (
                  <BudgetSelector
                    value={form.earnings}
                    onChange={(v) =>
                      update("earnings", v)
                    }
                    budgets={earningOptions}
                  />
                )}

                {/* QUALIFICATION */}

                {step === 7 && (
                  <StepCard
                    title="Qualifications"
                    subtitle="Tell us about your credentials."
                    options={qualificationOptions}
                    selected={form.qualification}
                    onSelect={(v) =>
                      update(
                        "qualification",
                        v
                      )
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

                {/* SUCCESS */}

                {step === 9 && (
                 <TutorSuccess
  onContinue={() => {
    window.location.href = "/";
  }}
/>
                )}

              </AnimatePresence>
{error && (
  <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
    {error}
  </div>
)}
              {/* Navigation */}

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
  disabled={!canContinue}
  className={`flex-1 rounded-full px-6 py-4 font-medium transition
  ${
    canContinue
      ? "bg-gradient-to-r from-[#D6451B] to-[#E8653D] text-white shadow-lg shadow-[#D6451B]/20"
      : "cursor-not-allowed bg-slate-200 text-slate-400"
  }`}
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