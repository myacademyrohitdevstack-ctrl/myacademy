"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const pathways = [
  {
    title: "Beginner Pathway",
    level: "A1 → A2",
    desc: "Start from zero and build everyday conversation skills with real-life practice.",
    tag: "FOUNDATION",
  },
  {
    title: "Intermediate Pathway",
    level: "B1 → B2",
    desc: "Strengthen grammar, fluency, and confidence in structured speaking sessions.",
    tag: "GROWTH",
  },
  {
    title: "Advanced Fluency Pathway",
    level: "C1 → C2",
    desc: "Master natural expression, accents, and professional communication.",
    tag: "FLUENCY",
  },
];

export default function LanguagePathways() {
  return (
    <section className="relative bg-white text-slate-900 py-28 overflow-hidden">

      {/* soft background system */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            STRUCTURED LEARNING JOURNEY
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold">
            Your Path from{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              Beginner to Fluent
            </span>
          </h2>

          <p className="mt-5 text-slate-600 max-w-xl mx-auto">
            A guided progression system designed to build fluency step by step.
          </p>
        </div>

        {/* MAIN LAYOUT (FIXED: no empty space) */}
        <div className="relative">

          {/* CENTER BACKGROUND JOURNEY LINE */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2" />

          {/* LEFT FLOATING CONTEXT (not sticky, just visual anchor) */}
          <div className="hidden lg:block absolute left-0 top-10 max-w-sm text-slate-600">
            <div className="text-xs tracking-[0.35em] text-slate-400">
              LEARNING FLOW
            </div>

            <h3 className="mt-4 text-3xl font-bold leading-snug">
              Learn step by step — like leveling up in real life
            </h3>

            <p className="mt-4 text-sm">
              Each stage unlocks speaking ability, not just theory.
            </p>

            <div className="mt-6 space-y-2 text-xs text-slate-500">
              <p>✓ Real conversation practice</p>
              <p>✓ Structured progression</p>
              <p>✓ Measurable fluency growth</p>
            </div>
          </div>

          {/* RIGHT FLOW (PRIMARY CONTENT) */}
          <div className="space-y-14 lg:ml-[45%]">

            {pathways.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-10"
              >

                {/* node */}
                <div className="absolute left-[-6px] top-2 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />

                {/* tag */}
                <div className="text-[10px] tracking-[0.35em] text-slate-400">
                  {item.tag}
                </div>

                <h3 className="mt-2 text-2xl sm:text-3xl font-semibold">
                  {item.title}
                </h3>

                <div className="mt-1 text-sm text-blue-600 font-medium">
                  {item.level}
                </div>

                <p className="mt-3 text-slate-600 max-w-md">
                  {item.desc}
                </p>

                <div className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-900">
                  <span className="border-b border-slate-300 pb-1">
                    Explore Pathway
                  </span>
                  <FaArrowRight />
                </div>

              </motion.div>
            ))}

          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-24 text-center text-[10px] tracking-[0.35em] text-slate-400">
          PERSONALIZED • STRUCTURED • RESULT-ORIENTED LEARNING
        </div>

      </div>
    </section>
  );
}