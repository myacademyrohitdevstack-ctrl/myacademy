"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const words = [
  "Curiosity",
  "Creativity",
  "Innovation",
  "Excellence",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);

    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-black"
    >
      {/* Mobile Background */}
      <div className="absolute inset-0 lg:hidden">
        <img
          src="/classroom.jpg"
          alt="Students learning at Inquisitive Mind Academy"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
      </div>

      {/* Desktop */}
      <div className="hidden min-h-screen lg:grid lg:grid-cols-2">
        {/* Image */}
        <div className="relative">
          <img
            src="/classroom.jpg"
            alt="Students learning at Inquisitive Mind Academy"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content */}
        <div className="flex items-center bg-white px-12 xl:px-20">
          <HeroContent index={index} desktop />
        </div>
      </div>

      {/* Mobile Content */}
      <div className="relative z-10 flex min-h-screen items-end px-6 pb-16 lg:hidden">
        <HeroContent index={index} />
      </div>
    </section>
  );
}

function HeroContent({ index, desktop = false }) {
  return (
    <div className="max-w-xl">
      <div
        className={`mb-5 text-xs tracking-[0.35em] ${
          desktop ? "text-[#D6451B]" : "text-white/70"
        }`}
      >
        INQUISITIVE MIND ACADEMY
      </div>

      <h1
        className={`font-bold leading-[1.05] ${
          desktop
            ? "text-5xl xl:text-7xl text-slate-900"
            : "text-4xl text-white"
        }`}
      >
        Igniting
        <span className="block text-[#D6451B]">
          Inquisitive Minds
        </span>
        For Tomorrow
      </h1>

      <p
        className={`mt-6 text-lg ${
          desktop ? "text-slate-600" : "text-white/75"
        }`}
      >
        Empowering students through engaging learning experiences,
        critical thinking, and academic excellence.
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <span
          className={
            desktop ? "text-slate-500" : "text-white/60"
          }
        >
          Driven by
        </span>

        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="font-semibold text-[#D6451B]"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <button className="rounded-full bg-[#D6451B] px-7 py-3 font-medium text-white transition hover:opacity-90">
          Explore Programs
        </button>

        <button
          className={`flex items-center gap-2 ${
            desktop ? "text-slate-700" : "text-white"
          }`}
        >
          Learn More
          <FaArrowRight size={12} />
        </button>
      </div>

      <div
        className={`mt-14 flex gap-8 ${
          desktop ? "text-slate-500" : "text-white/70"
        }`}
      >
        <div>
          <div className="text-2xl font-bold text-[#D6451B]">
            5000+
          </div>
          <div className="text-sm">Learners</div>
        </div>

        <div>
          <div className="text-2xl font-bold text-[#D6451B]">
            50+
          </div>
          <div className="text-sm">Educators</div>
        </div>

        <div>
          <div className="text-2xl font-bold text-[#D6451B]">
            98%
          </div>
          <div className="text-sm">Success Rate</div>
        </div>
      </div>
    </div>
  );
}