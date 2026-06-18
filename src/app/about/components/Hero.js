"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/classroom.jpg"
          alt="Students learning languages"
          className="h-full w-full object-cover"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center py-24 lg:py-20">
        <div className="max-w-7xl mx-auto w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            {/* Label */}
            <div className="text-[10px] tracking-[0.35em] text-white/60">
              ABOUT OUR ACADEMY
            </div>

            {/* Heading */}
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-8xl font-bold leading-[0.95] text-white">
              Transforming
              <span className="block bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                Confidence
              </span>
              Through Language
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-2xl text-base sm:text-lg text-white/75 leading-relaxed">
              For over a decade, we have helped students,
              professionals, and future immigrants master
              English and French through immersive learning,
              real conversations, and practical fluency
              development.
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button className="rounded-full bg-white px-7 py-3 font-medium text-slate-900 transition hover:scale-105">
                Explore Programs
              </button>

              <button className="flex items-center gap-2 text-white">
                Our Story
                <FaArrowRight size={14} />
              </button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/15 pt-8 max-w-5xl">
              <div>
                <div className="text-3xl font-bold text-white">
                  12K+
                </div>
                <div className="mt-1 text-sm text-white/60">
                  Students Trained
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-white">
                  25+
                </div>
                <div className="mt-1 text-sm text-white/60">
                  Countries
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-white">
                  98%
                </div>
                <div className="mt-1 text-sm text-white/60">
                  Success Rate
                </div>
              </div>

              <div>
                <div className="text-3xl font-bold text-white">
                  10+
                </div>
                <div className="mt-1 text-sm text-white/60">
                  Years Experience
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}