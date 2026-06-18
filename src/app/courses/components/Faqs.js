"use client";

import { useState } from "react";
import { FaPlus, FaMinus, FaHeadset } from "react-icons/fa";

const faqs = [
  {
    question: "Do I need any prior knowledge to join?",
    answer:
      "No. Our programs are designed for complete beginners as well as advanced learners. We'll assess your level and place you in the right pathway.",
  },
  {
    question: "Are classes live or pre-recorded?",
    answer:
      "Most learning happens through live interactive sessions with trainers, speaking practice rooms, and guided activities.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes. Students receive completion certificates after successfully finishing their program and assessments.",
  },
  {
    question: "Can I attend classes from anywhere?",
    answer:
      "Absolutely. Our academy is fully online, allowing students from different countries to learn together.",
  },
  {
    question: "How long does it take to become fluent?",
    answer:
      "It depends on your starting level and consistency. Most learners notice significant improvement within 3–6 months.",
  },
];

export default function FAQs() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-28 bg-slate-50 overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.06),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-16">

          {/* LEFT */}
          <div className="lg:sticky lg:top-24 h-fit">

            <p className="text-xs tracking-[0.35em] text-slate-400">
              FREQUENTLY ASKED QUESTIONS
            </p>

            <h2 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
              Everything you need
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
                {" "}to know
              </span>
            </h2>

            <p className="mt-5 text-slate-600 max-w-md">
              Have questions about our courses, learning process,
              certifications, or community? Find answers below.
            </p>

            {/* Support Card */}
            <div className="mt-10 rounded-3xl bg-white border border-slate-200 p-6">

              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <FaHeadset />
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                Still have questions?
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Our advisors can help you choose the right learning pathway.
              </p>

              <button className="mt-5 rounded-full bg-slate-900 px-6 py-3 text-white hover:scale-105 transition">
                Talk to Advisor
              </button>

            </div>

          </div>

          {/* RIGHT */}
          <div className="space-y-4">

            {faqs.map((faq, index) => {
              const isOpen = active === index;

              return (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-200 bg-white overflow-hidden"
                >

                  <button
                    onClick={() =>
                      setActive(isOpen ? null : index)
                    }
                    className="w-full flex items-center justify-between text-left p-6"
                  >

                    <span className="font-semibold text-slate-900">
                      {faq.question}
                    </span>

                    <div className="text-slate-500">
                      {isOpen ? <FaMinus /> : <FaPlus />}
                    </div>

                  </button>

                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      isOpen
                        ? "max-h-40 pb-6 px-6"
                        : "max-h-0"
                    }`}
                  >
                    <p className="text-slate-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>

                </div>
              );
            })}

          </div>

        </div>

      </div>
    </section>
  );
}