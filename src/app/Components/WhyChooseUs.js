"use client";

import { motion } from "framer-motion";
import {
  FaChalkboardTeacher,
  FaGlobe,
  FaComments,
  FaAward,
} from "react-icons/fa";

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
    <section className="relative bg-white text-slate-900 py-28 overflow-hidden">

      {/* ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.06),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            TRUSTED LANGUAGE ACADEMY
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
            Why learners choose{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              real fluency
            </span>
          </h2>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
            We don’t teach memorization. We build real communication ability
            through structured speaking systems and immersion.
          </p>
        </div>

        {/* CONTENT LAYOUT */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">

          {/* LEFT BIG STATEMENT */}
          <div className="lg:col-span-1 space-y-6">

            <div className="text-[10px] tracking-[0.35em] text-slate-400">
              THE DIFFERENCE
            </div>

            <h3 className="text-3xl font-bold leading-tight">
              Not just learning a language —{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                living it
              </span>
            </h3>

            <p className="text-slate-600 leading-relaxed">
              Most platforms teach vocabulary. We train your brain to think,
              respond, and communicate naturally in real situations.
            </p>

            <div className="pt-6 border-t border-slate-100 text-xs tracking-[0.3em] text-slate-400">
              IMMERSION • SPEAKING • CONFIDENCE
            </div>
          </div>

          {/* RIGHT FEATURE FLOW (NOT GRID CARDS) */}
          <div className="lg:col-span-2 space-y-12">

            {features.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex gap-5 items-start"
              >

                {/* icon node */}
                <div className="mt-1 text-blue-500 text-xl shrink-0">
                  {item.icon}
                </div>

                {/* content */}
                <div className="space-y-2">

                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-slate-600 leading-relaxed max-w-xl">
                    {item.desc}
                  </p>

                </div>
              </motion.div>
            ))}

          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
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