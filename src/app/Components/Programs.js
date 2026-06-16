"use client";

import { motion } from "framer-motion";
import { FaLanguage, FaUserGraduate, FaBriefcase, FaGlobe } from "react-icons/fa";

const programs = [
  {
    icon: <FaLanguage />,
    title: "General English Program",
    level: "Beginner → Advanced",
    desc: "Build strong grammar, vocabulary, and real-life speaking confidence step by step.",
  },
  {
    icon: <FaUserGraduate />,
    title: "Academic English Program",
    level: "IELTS / Study Abroad",
    desc: "Focused training for exams, essays, interviews, and university admission success.",
  },
  {
    icon: <FaBriefcase />,
    title: "Business Communication",
    level: "Professional Level",
    desc: "Master corporate communication, meetings, presentations, and workplace fluency.",
  },
  {
    icon: <FaGlobe />,
    title: "Global Conversation Club",
    level: "All Levels",
    desc: "Practice speaking with learners and native speakers in real-time global sessions.",
  },
];

export default function Programs() {
  return (
    <section className="relative bg-white text-slate-900 py-24 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.08),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] text-slate-400">
            LEARNING STRUCTURE
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold">
            Our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              Programs
            </span>
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Structured language programs designed to take you from basic understanding
            to confident global communication.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((item, i) => (
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

              {/* Level */}
              <div className="mt-1 text-xs font-medium text-blue-600">
                {item.level}
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>

              {/* CTA */}
              <button className="mt-5 text-sm font-medium text-slate-900 flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore Program →
              </button>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/5 to-violet-500/5 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold">
            Not sure which program is right for you?
          </h3>

          <p className="mt-3 text-slate-600">
            Get a free level assessment and personalized learning roadmap.
          </p>

          <button className="mt-6 rounded-full bg-slate-900 px-8 py-3 text-white hover:scale-105 transition">
            Take Free Assessment
          </button>
        </div>

      </div>
    </section>
  );
}