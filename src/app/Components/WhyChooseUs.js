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
    <section className="relative overflow-hidden bg-white py-28 text-slate-900">
      {/* Brand Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,69,27,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <div className="mb-20 text-center">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            TRUSTED LANGUAGE ACADEMY
          </div>

          <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            Why learners choose{" "}
            <span className="bg-gradient-to-r from-[#D6451B] to-[#7BC3D7] bg-clip-text text-transparent">
              real fluency
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#D6451B] to-[#7BC3D7]" />

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            We don’t teach memorization. We build real communication ability
            through structured speaking systems and immersion.
          </p>
        </div>

        {/* CONTENT */}
        <div className="grid items-start gap-12 lg:grid-cols-3">
          {/* LEFT */}
          <div className="space-y-6 lg:col-span-1">
            <div className="text-[10px] tracking-[0.35em] text-slate-400">
              THE DIFFERENCE
            </div>

            <h3 className="text-3xl font-bold leading-tight">
              Not just learning a language —{" "}
              <span className="bg-gradient-to-r from-[#D6451B] to-[#7BC3D7] bg-clip-text text-transparent">
                living it
              </span>
            </h3>

            <p className="leading-relaxed text-slate-600">
              Most platforms teach vocabulary. We train your brain to think,
              respond, and communicate naturally in real situations.
            </p>

            <div className="border-t border-slate-100 pt-6 text-xs tracking-[0.3em] text-[#D6451B]">
              IMMERSION • SPEAKING • CONFIDENCE
            </div>
          </div>

          {/* RIGHT FEATURES */}
          <div className="space-y-12 lg:col-span-2">
            {features.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="flex items-start gap-5"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#D6451B]/10 text-xl text-[#D6451B]">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">
                    {item.title}
                  </h3>

                  <p className="max-w-xl leading-relaxed text-slate-600">
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
            Join thousands of learners already transforming their communication
            skills.
          </p>

          <button className="mt-6 rounded-full bg-[#D6451B] px-8 py-3 text-white transition hover:opacity-90">
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}