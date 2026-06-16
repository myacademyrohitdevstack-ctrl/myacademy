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
    <section className="relative bg-white text-slate-900 py-24 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] text-slate-400">
            STRUCTURED LEARNING JOURNEY
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              Language Pathway
            </span>
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Learn step-by-step with guided pathways designed to take you from
            beginner to fluent communicator.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pathways.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-8 hover:shadow-xl transition"
            >

              {/* Tag */}
              <div className="text-xs tracking-[0.3em] text-slate-400 mb-4">
                {item.tag}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold">
                {item.title}
              </h3>

              {/* Level */}
              <div className="mt-2 text-sm text-blue-600 font-medium">
                {item.level}
              </div>

              {/* Description */}
              <p className="mt-4 text-slate-600 leading-relaxed">
                {item.desc}
              </p>

              {/* CTA */}
              <button className="mt-6 flex items-center gap-2 text-slate-900 font-medium group-hover:gap-3 transition-all">
                Explore Pathway <FaArrowRight />
              </button>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/5 to-violet-500/5 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom trust line */}
        <div className="mt-16 text-center text-xs tracking-[0.3em] text-slate-400">
          PERSONALIZED • STRUCTURED • RESULT-ORIENTED LEARNING
        </div>

      </div>
    </section>
  );
}