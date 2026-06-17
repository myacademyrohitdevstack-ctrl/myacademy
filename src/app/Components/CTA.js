"use client";

import { motion } from "framer-motion";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";

export default function CTA() {
  return (
    <section className="relative py-28 overflow-hidden bg-white text-slate-900">

      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.10),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* GRID LAYOUT */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: EMOTIONAL STORY */}
          <div>

            <div className="text-xs tracking-[0.35em] text-slate-400">
              START YOUR TRANSFORMATION
            </div>

            <h2 className="mt-5 text-4xl sm:text-5xl font-bold leading-tight">
              Speak English with{" "}
              <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
                confidence in real life
              </span>
            </h2>

            <p className="mt-6 text-slate-600 leading-relaxed">
              Stop memorizing rules. Start speaking naturally through live
              practice, real conversations, and guided fluency training.
            </p>

            {/* trust bullets */}
            <div className="mt-8 space-y-3 text-sm text-slate-700">

              {[
                "Live speaking practice every day",
                "Correct pronunciation in real time",
                "Global speaking community access",
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2">
                  <FaCheckCircle className="text-blue-500" />
                  {t}
                </div>
              ))}

            </div>

            {/* buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">

              <button className="group flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-3 text-white hover:scale-105 transition">
                Start Learning Now
                <FaArrowRight className="group-hover:translate-x-1 transition" />
              </button>

              <button className="rounded-full border border-slate-300 px-8 py-3 text-slate-700 hover:bg-slate-100 transition">
                Watch Demo Class
              </button>

            </div>

          </div>

          {/* RIGHT: LIVE SOCIAL PROOF PANEL */}
          <div className="relative">

            {/* glow card */}
            <div className="rounded-2xl p-8 bg-gradient-to-br from-blue-50 to-violet-50 border border-slate-100">

              <div className="text-xs tracking-[0.35em] text-slate-500">
                LIVE ACTIVITY
              </div>

              <div className="mt-6 space-y-4">

                {[
                  "🇮🇳 Rahul just joined a speaking class",
                  "🇫🇷 Sofia completed fluency session",
                  "🇮🇳 Anjali started live practice",
                  "🇪🇸 Maria joined conversation room",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <span className="text-green-500">●</span>
                    {item}
                  </motion.div>
                ))}

              </div>

              {/* urgency badge */}
              <div className="mt-8 inline-flex items-center gap-2 text-xs bg-white px-3 py-1 rounded-full border">
                🔥 127 students joined today
              </div>

            </div>

          </div>

        </div>

        {/* bottom trust strip */}
        <div className="mt-20 text-center text-xs tracking-[0.35em] text-slate-400">
          12K+ STUDENTS • LIVE PRACTICE • REAL RESULTS
        </div>

      </div>
    </section>
  );
}