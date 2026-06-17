"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLanguage,
  FaUserGraduate,
  FaBriefcase,
  FaGlobe,
} from "react-icons/fa";

const programs = [
  {
    icon: <FaLanguage />,
    title: "General English",
    level: "Beginner → Advanced",
    desc: "Build real speaking confidence through daily conversation practice, not memorization.",
    points: [
      "Daily speaking drills",
      "Real-life conversation practice",
      "Step-by-step fluency building",
    ],
  },
  {
    icon: <FaUserGraduate />,
    title: "Academic English",
    level: "IELTS / Study Abroad",
    desc: "Master writing, essays, interviews, and structured academic communication.",
    points: [
      "IELTS focused training",
      "Essay writing system",
      "Interview preparation",
    ],
  },
  {
    icon: <FaBriefcase />,
    title: "Business Communication",
    level: "Professional Level",
    desc: "Speak confidently in meetings, presentations, and workplace discussions.",
    points: [
      "Corporate speaking skills",
      "Presentation mastery",
      "Email & formal communication",
    ],
  },
  {
    icon: <FaGlobe />,
    title: "Global Conversation Club",
    level: "All Levels",
    desc: "Practice with global learners in real-time speaking environments.",
    points: [
      "Live global sessions",
      "Native speaker interaction",
      "Confidence building rooms",
    ],
  },
];

export default function Programs() {
  const [active, setActive] = useState(0);
  const current = programs[active];

  return (
    <section className="relative bg-white text-slate-900 py-20 lg:py-28 overflow-hidden">

      {/* background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_65%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6">

        {/* HEADER */}
        <div className="text-center mb-10 lg:mb-16">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            LEARNING PROGRAMS
          </div>

          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
            Explore your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              learning journey
            </span>
          </h2>

          <p className="mt-5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            One connected system designed to take you from basic communication to real fluency.
          </p>
        </div>

        {/* PROGRAM SELECTOR (mobile scrollable pills) */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-10 scrollbar-hide">
          {programs.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActive(i)}
              className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm border transition ${
                active === i
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* LEFT VISUAL */}
          <div className="relative h-[240px] sm:h-[300px] lg:h-[380px] rounded-3xl overflow-hidden border border-slate-200 bg-gradient-to-br from-slate-50 to-white">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25),transparent_60%)]" />

            <div className="absolute inset-0 flex items-center justify-center text-[70px] sm:text-[90px] lg:text-[110px] text-blue-500">
              {current.icon}
            </div>

            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
              <div className="text-[10px] tracking-[0.35em] text-slate-500">
                CURRENT MODULE
              </div>
              <div className="text-sm font-semibold text-slate-800 mt-1">
                {current.title}
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="min-h-[260px] sm:min-h-[320px] flex flex-col justify-center">

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >

                <div className="text-[10px] tracking-[0.35em] text-slate-400">
                  {current.level}
                </div>

                <h3 className="mt-3 text-2xl sm:text-3xl font-bold">
                  {current.title}
                </h3>

                <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                  {current.desc}
                </p>

                {/* points */}
                <div className="mt-6 space-y-3">
                  {current.points.map((pt, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <span className="mt-1 w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button className="mt-8 w-full sm:w-auto rounded-full bg-slate-900 px-8 py-3 text-white hover:scale-105 transition">
                  Explore Program
                </button>

              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}