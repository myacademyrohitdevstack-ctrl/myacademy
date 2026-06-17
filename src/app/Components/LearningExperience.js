"use client";

import { motion } from "framer-motion";
import {
  FaComments,
  FaVideo,
  FaHeadphones,
  FaTasks,
} from "react-icons/fa";

const experiences = [
  {
    icon: <FaComments />,
    title: "Live Speaking Practice",
    desc: "Daily conversation sessions with trainers and learners to build real fluency.",
  },
  {
    icon: <FaVideo />,
    title: "Interactive Live Classes",
    desc: "Real-time video sessions with corrections and guidance.",
  },
  {
    icon: <FaHeadphones />,
    title: "Listening Immersion",
    desc: "Train your ear with native accents and real-world audio.",
  },
  {
    icon: <FaTasks />,
    title: "Structured Practice Tasks",
    desc: "Weekly challenges designed for steady fluency growth.",
  },
];

export default function LearningExperience() {
  return (
    <section className="relative bg-white text-slate-900 py-28 overflow-hidden">

      {/* background depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.06),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            IMMERSIVE LANGUAGE TRAINING
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
            A{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              real learning experience
            </span>
          </h2>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
            Not lessons. A continuous experience that trains thinking, speaking,
            and responding in real time.
          </p>
        </div>

        {/* 3-COLUMN DESKTOP LAYOUT */}
        <div className="grid lg:grid-cols-3 gap-16 items-start">

          {/* LEFT CONTEXT PANEL (fixes emptiness) */}
          <div className="space-y-6">

            <div className="text-[10px] tracking-[0.35em] text-slate-400">
              WHY THIS WORKS
            </div>

            <h3 className="text-3xl font-bold leading-tight">
              You don’t study language —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                you experience it
              </span>
            </h3>

            <p className="text-slate-600 leading-relaxed">
              Every interaction is designed to simulate real communication,
              so your brain stops translating and starts thinking naturally.
            </p>

            <div className="pt-6 border-t border-slate-100 text-xs tracking-[0.3em] text-slate-400">
              SPEAK • HEAR • THINK • RESPOND
            </div>
          </div>

          {/* CENTER TIMELINE */}
          <div className="relative">

            <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200" />

            <div className="space-y-16">

              {experiences.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative pl-12"
                >

                  <div className="absolute left-3 top-2 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />

                  <div className="text-blue-500 text-xl">
                    {item.icon}
                  </div>

                  <h3 className="mt-3 text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>

                </motion.div>
              ))}

            </div>
          </div>

          {/* RIGHT “LIVE PULSE” (fills empty space visually) */}
          <div className="space-y-6">

            <div className="text-[10px] tracking-[0.35em] text-slate-400">
              LIVE ACTIVITY
            </div>

            <h3 className="text-2xl font-semibold">
              Learning is happening right now
            </h3>

            <div className="space-y-4">

              {[
                "🎤 Sarah practiced pronunciation",
                "🧠 John corrected sentence structure",
                "💬 Maria joined live speaking room",
                "🌍 Arjun completed conversation task",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm text-slate-700"
                >
                  <span className="text-slate-400 mr-2">●</span>
                  {text}
                </motion.div>
              ))}

            </div>

            <div className="pt-6 border-t border-slate-100 text-xs tracking-[0.3em] text-slate-400">
              ALWAYS ACTIVE • GLOBAL LEARNING
            </div>

          </div>

        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-semibold">
            Start learning through real experience
          </h3>

          <p className="mt-3 text-slate-600">
            Every session builds natural fluency — not memorized knowledge.
          </p>

          <button className="mt-6 rounded-full bg-slate-900 px-8 py-3 text-white hover:scale-105 transition">
            Start Learning
          </button>
        </div>

      </div>
    </section>
  );
}