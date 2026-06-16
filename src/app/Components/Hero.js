"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";

const pairs = [
  ["Hello", "Bonjour"],
  ["Thank you", "Merci"],
  ["I speak", "Je parle"],
  ["Let’s learn", "Apprenons"],
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % pairs.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-white text-slate-900">

      {/* Layout */}
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* 🖼️ IMAGE SIDE */}
        <div className="relative">

          {/* Image */}
          <img
            src="/classroom.jpg"
            alt="Language learning classroom"
            className="h-full w-full object-cover"
          />

          {/* Soft overlay for premium look */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Floating label */}
          <div className="absolute left-6 top-6 rounded-full bg-white/90 px-4 py-2 text-xs font-medium text-black">
            LIVE CLASS EXPERIENCE
          </div>

        </div>

        {/* ✍️ CONTENT SIDE */}
        <div className="flex flex-col justify-center px-8 lg:px-16">

          {/* Badge */}
          <div className="mb-6 text-xs tracking-[0.3em] text-slate-400">
            INTERNATIONAL LANGUAGE ACADEMY
          </div>

          {/* Animated language switch */}
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold leading-tight sm:text-6xl"
          >
            {pairs[index][0]}
            <div className="text-sm text-slate-400">becomes</div>
            <div className="text-transparent bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text">
              {pairs[index][1]}
            </div>
          </motion.div>

          {/* Description */}
          <p className="mt-6 max-w-md text-slate-600">
            Learn French and English through real conversations, live practice,
            and structured fluency training — not memorization.
          </p>

          {/* CTA */}
          <div className="mt-10 flex gap-4">
            <button className="rounded-full bg-slate-900 px-6 py-3 text-white hover:scale-105 transition">
              Enroll Now
            </button>

            <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900">
              View Programs <FaArrowRight />
            </button>
          </div>

          {/* Trust line */}
          <div className="mt-12 text-xs tracking-[0.3em] text-slate-400">
            12K+ STUDENTS • 25+ COUNTRIES • 98% SUCCESS
          </div>

        </div>
      </div>
    </section>
  );
}