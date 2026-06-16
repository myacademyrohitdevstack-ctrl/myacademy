"use client";

import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const stories = [
  {
    name: "Anjali Sharma",
    country: "India",
    result: "B1 → C1 in 6 Months",
    text: "I could barely speak English before joining. Now I confidently give presentations at work in English.",
  },
  {
    name: "Rahul Mehta",
    country: "India",
    result: "IELTS 7.5 Score",
    text: "The structured speaking practice helped me improve my fluency and achieve my dream score.",
  },
  {
    name: "Sofia Martin",
    country: "France",
    result: "Fluent Conversation Level",
    text: "The live classes and global community made me comfortable speaking with people worldwide.",
  },
];

export default function SuccessStories() {
  return (
    <section className="relative bg-white text-slate-900 py-24 overflow-hidden">

      {/* Soft glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(99,102,241,0.08),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] text-slate-400">
            REAL TRANSFORMATIONS
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold">
            Success{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              Stories
            </span>
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            See how our students transformed their communication skills and achieved
            real-world success through structured learning.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {stories.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-xl transition"
            >
              {/* Stars */}
              <div className="flex gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              {/* Result */}
              <div className="mt-4 text-sm font-semibold text-blue-600">
                {item.result}
              </div>

              {/* Text */}
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                “{item.text}”
              </p>

              {/* Name */}
              <div className="mt-5 font-semibold">
                {item.name}
              </div>

              {/* Country */}
              <div className="text-xs text-slate-400">
                {item.country}
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/5 to-violet-500/5 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold">
            Your success story starts here
          </h3>

          <p className="mt-3 text-slate-600">
            Join thousands of learners already transforming their future.
          </p>

          <button className="mt-6 rounded-full bg-slate-900 px-8 py-3 text-white hover:scale-105 transition">
            Start Your Journey
          </button>
        </div>

      </div>
    </section>
  );
}