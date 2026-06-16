"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function CTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-white text-slate-900">

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_60%)]" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">

        {/* Badge */}
        <div className="text-xs tracking-[0.3em] text-slate-400">
          START YOUR JOURNEY TODAY
        </div>

        {/* Heading */}
        <h2 className="mt-6 text-4xl sm:text-5xl font-bold leading-tight">
          Ready to become{" "}
          <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
            fluent & confident?
          </span>
        </h2>

        {/* Subtext */}
        <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
          Join thousands of learners who transformed their communication skills
          with structured learning, live practice, and real conversations.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <button className="group flex items-center gap-2 rounded-full bg-slate-900 px-8 py-3 text-white hover:scale-105 transition">
            Enroll Now
            <FaArrowRight className="group-hover:translate-x-1 transition" />
          </button>

          <button className="rounded-full border border-slate-300 px-8 py-3 text-slate-700 hover:bg-slate-100 transition">
            Book Free Demo
          </button>

        </div>

        {/* Trust line */}
        <div className="mt-12 text-xs tracking-[0.3em] text-slate-400">
          12K+ STUDENTS • LIVE CLASSES • GLOBAL COMMUNITY
        </div>

      </div>
    </section>
  );
}