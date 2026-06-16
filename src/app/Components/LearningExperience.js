"use client";

import { motion } from "framer-motion";
import { FaComments, FaVideo, FaHeadphones, FaTasks } from "react-icons/fa";

const experiences = [
  {
    icon: <FaComments />,
    title: "Live Speaking Practice",
    desc: "Daily conversation sessions with trainers and learners to build real fluency.",
  },
  {
    icon: <FaVideo />,
    title: "Interactive Live Classes",
    desc: "Engaging video-based classes with real-time feedback and corrections.",
  },
  {
    icon: <FaHeadphones />,
    title: "Listening Immersion",
    desc: "Train your ear with native accents, dialogues, and real-world audio practice.",
  },
  {
    icon: <FaTasks />,
    title: "Structured Practice Tasks",
    desc: "Weekly speaking, writing, and vocabulary tasks designed for steady improvement.",
  },
];

export default function LearningExperience() {
  return (
    <section className="relative bg-white text-slate-900 py-24 overflow-hidden">

      {/* Soft gradient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] text-slate-400">
            IMMERSIVE LANGUAGE TRAINING
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold">
            Your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              Learning Experience
            </span>
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            A structured, immersive approach designed to help you think, speak,
            and respond naturally in real-life situations.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-xl transition"
            >
              {/* Icon */}
              <div className="text-blue-500 text-xl">
                {item.icon}
              </div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-semibold">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/5 to-violet-500/5 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom split section */}
        <div className="mt-20 grid lg:grid-cols-2 gap-10 items-center">

          {/* Left content */}
          <div>
            <h3 className="text-3xl font-bold leading-snug">
              Learn by doing, not memorizing
            </h3>

            <p className="mt-4 text-slate-600">
              Every lesson is designed to simulate real-life situations so you can
              think in English/French naturally without translating in your head.
            </p>

            <button className="mt-6 rounded-full bg-slate-900 px-8 py-3 text-white hover:scale-105 transition">
              Start Learning
            </button>
          </div>

          {/* Right visual mock */}
          <div className="relative rounded-2xl border border-slate-200 p-8 bg-gradient-to-br from-blue-50 to-violet-50">

            <div className="text-xs tracking-[0.3em] text-slate-500">
              TYPICAL LEARNING SESSION
            </div>

            <div className="mt-6 space-y-3">
              {[
                "🎤 Speak with trainer for 10 minutes",
                "🧠 Correct grammar in real-time",
                "💬 Practice real-life dialogue",
                "📊 Get instant feedback report",
              ].map((step, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white/80 border border-slate-200 p-3 text-sm text-slate-700"
                >
                  {step}
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Footer line */}
        <div className="mt-16 text-center text-xs tracking-[0.3em] text-slate-400">
          IMMERSION • PRACTICE • FLUENCY
        </div>

      </div>
    </section>
  );
}