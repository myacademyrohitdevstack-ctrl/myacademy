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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % pairs.length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  // scroll reveal (SEO-safe, no layout shift)
  useEffect(() => {
    const el = document.getElementById("hero");
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );

    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-black"
    >

      {/* MOBILE FULL IMAGE */}
      <div className="absolute inset-0 lg:hidden">
        <img
          src="/classroom.jpg"
          className="h-full w-full object-cover scale-105 animate-slowZoom"
          alt="Language learning"
        />

        {/* cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden lg:grid grid-cols-2 min-h-screen bg-white text-slate-900">
        <div className="relative overflow-hidden">
          <img
            src="/classroom.jpg"
            className="h-full w-full object-cover scale-105 animate-slowZoom"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="flex flex-col justify-center px-16">
          <Content index={index} visible={visible} />
        </div>
      </div>

      {/* MOBILE CONTENT */}
      <div className="relative z-10 flex min-h-screen items-end px-6 pb-16 lg:hidden">

        <div className="w-full animate-fadeUp">

          <div className="text-[10px] tracking-[0.35em] text-white/60 mb-5">
            INTERNATIONAL LANGUAGE ACADEMY
          </div>

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white font-bold leading-tight text-4xl"
          >
            {pairs[index][0]}

            <div className="text-xs text-white/50 mt-2">becomes</div>

            <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">
              {pairs[index][1]}
            </div>
          </motion.div>

          <p className="mt-5 text-white/70 text-sm leading-relaxed max-w-sm">
            Learn languages through real conversations, live practice, and fluency training.
          </p>

          <div className="mt-8 flex items-center gap-6">
            <button className="text-white font-medium border-b border-white/40 pb-1 active:scale-95 transition">
              Enroll Now
            </button>

            <button className="flex items-center gap-2 text-white/70">
              View Programs <FaArrowRight size={12} />
            </button>
          </div>

          <div className="mt-10 text-[10px] tracking-[0.3em] text-white/50">
            12K+ STUDENTS • 25+ COUNTRIES • 98% SUCCESS
          </div>
        </div>
      </div>

      {/* ANIMATION STYLES */}
      <style jsx>{`
        @keyframes slowZoom {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.12); }
          100% { transform: scale(1.05); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-slowZoom {
          animation: slowZoom 10s ease-in-out infinite;
        }

        .animate-fadeUp {
          animation: fadeUp 0.9s ease-out both;
        }
      `}</style>
    </section>
  );
}

/* shared desktop content */
function Content({ index, visible }) {
  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="mb-4 text-xs tracking-[0.3em] text-slate-400">
        INTERNATIONAL LANGUAGE ACADEMY
      </div>

      <motion.div
        key={index}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-6xl font-bold leading-tight"
      >
        {pairs[index][0]}

        <div className="text-sm text-slate-400 mt-2">becomes</div>

        <div className="text-transparent bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text">
          {pairs[index][1]}
        </div>
      </motion.div>

      <p className="mt-6 max-w-md text-slate-600">
        Learn French and English through real conversations, live practice,
        and structured fluency training — not memorization.
      </p>

      <div className="mt-10 flex gap-6 items-center">
        <button className="rounded-full bg-slate-900 px-6 py-3 text-white hover:scale-105 transition">
          Enroll Now
        </button>

        <button className="text-slate-600 flex items-center gap-2">
          View Programs <FaArrowRight />
        </button>
      </div>
    </div>
  );
}