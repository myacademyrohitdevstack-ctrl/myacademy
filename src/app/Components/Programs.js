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
    <section className="relative overflow-hidden bg-white py-20 text-slate-900 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,69,27,0.08),transparent_65%)]" />

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        {/* Header */}
        <div className="mb-10 text-center lg:mb-16">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            LEARNING PROGRAMS
          </div>

          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Explore your{" "}
            <span className="bg-gradient-to-r from-[#D6451B] to-[#7BC3D7] bg-clip-text text-transparent">
              learning journey
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#D6451B] to-[#7BC3D7]" />

          <p className="mx-auto mt-5 max-w-2xl text-sm text-slate-600 sm:text-base">
            One connected system designed to take you from basic communication
            to real fluency.
          </p>
        </div>

        {/* Program Selector */}
        <div className="mb-10 flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {programs.map((p, i) => (
            <button
              key={p.title}
              onClick={() => setActive(i)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-xs transition sm:text-sm ${
                active === i
                  ? "bg-[#D6451B] text-white"
                  : "border border-slate-200 bg-white text-slate-600"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* Main Layout */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          {/* Left Visual */}
          <div className="relative h-[240px] overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white sm:h-[300px] lg:h-[380px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,69,27,0.15),transparent_60%)]" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#D6451B]/10 text-[70px] text-[#D6451B] sm:h-36 sm:w-36 sm:text-[90px] lg:h-44 lg:w-44 lg:text-[110px]">
                {current.icon}
              </div>
            </div>

            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
              <div className="text-[10px] tracking-[0.35em] text-slate-500">
                CURRENT MODULE
              </div>

              <div className="mt-1 text-sm font-semibold text-slate-800">
                {current.title}
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex min-h-[260px] flex-col justify-center sm:min-h-[320px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="text-[10px] tracking-[0.35em] text-[#D6451B]">
                  {current.level}
                </div>

                <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
                  {current.title}
                </h3>

                <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {current.desc}
                </p>

                <div className="mt-6 space-y-3">
                  {current.points.map((pt, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm text-slate-700"
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-[#D6451B] to-[#7BC3D7]" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                <button className="mt-8 w-full rounded-full bg-[#D6451B] px-8 py-3 text-white transition hover:opacity-90 sm:w-auto">
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