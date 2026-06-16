"use client";

import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaGlobe, FaComments, FaAward } from "react-icons/fa";

const features = [
  {
    icon: <FaChalkboardTeacher />,
    title: "Expert Native Trainers",
    desc: "Learn directly from certified native and fluent instructors with real classroom experience.",
  },
  {
    icon: <FaComments />,
    title: "Real Conversation Practice",
    desc: "Focus on speaking first with live conversations, roleplays, and interactive sessions.",
  },
  {
    icon: <FaGlobe />,
    title: "Global Learning Community",
    desc: "Connect with learners from 25+ countries and practice languages in real-time.",
  },
  {
    icon: <FaAward />,
    title: "Proven Results",
    desc: "Structured pathways designed for 98% success rate from beginner to fluency.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-white text-slate-900 py-24 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] text-slate-400">
            TRUSTED LANGUAGE ACADEMY
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              Our Academy
            </span>
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            We don’t teach memorization. We build real fluency through structured
            speaking practice and immersive learning.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, i) => (
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

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold">
            Start your fluency journey today
          </h3>

          <p className="mt-3 text-slate-600">
            Join thousands of learners already transforming their communication skills.
          </p>

          <button className="mt-6 rounded-full bg-slate-900 px-8 py-3 text-white hover:scale-105 transition">
            Get Started
          </button>
        </div>

      </div>
    </section>
  );
}