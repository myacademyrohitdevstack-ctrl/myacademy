"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa";

export default function CTA() {
  const router=useRouter()
  return (
    <section className="relative py-28 overflow-hidden bg-white text-slate-900">

      {/* Logo-inspired glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.12),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* GRID LAYOUT */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <div>

            <div className="text-xs tracking-[0.35em] text-slate-500">
              START YOUR TRANSFORMATION
            </div>

            <h2 className="mt-5 text-4xl sm:text-5xl font-bold leading-tight">
              Speak English with{" "}
              <span className="bg-gradient-to-r from-amber-500 to-yellow-400 text-transparent bg-clip-text">
                confidence in real life
              </span>
            </h2>

            <p className="mt-6 text-slate-600 leading-relaxed">
              Stop memorizing rules. Start speaking naturally through live
              practice, real conversations, and guided fluency training.
            </p>

            {/* Trust Bullets */}
            <div className="mt-8 space-y-3 text-sm text-slate-700">

              {[
                "Live speaking practice every day",
                "Correct pronunciation in real time",
                "Global speaking community access",
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <FaCheckCircle className="text-amber-500" />
                  {t}
                </div>
              ))}

            </div>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">

              <button onClick={()=>{router.push('/find-tutor')}} className="group flex items-center justify-center gap-2 rounded-full bg-[#0F172A] px-8 py-3 text-white transition hover:-translate-y-1">
               Start Learning Now
               
              </button>

              <button onClick={()=>{router.push('/about')}} className="rounded-full border border-amber-200 px-8 py-3 text-slate-700 hover:bg-amber-50 transition">
                  Watch Demo Class
            
              </button>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="relative">

            <div className="rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50 p-8">

              <div className="text-xs tracking-[0.35em] text-slate-500">
                LIVE ACTIVITY
              </div>

              <div className="mt-6 space-y-4">

                {[
                  "🇮🇳 Rahul just joined a speaking class",
                  "🇫🇷 Sofia completed fluency session",
                  "🇮🇳 Anjali started live practice",
                  "🇪🇸 Maria joined conversation room",
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-2 text-sm text-slate-700"
                  >
                    <span className="text-amber-500">●</span>
                    {item}
                  </motion.div>
                ))}

              </div>

              {/* Badge */}
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-4 py-2 text-xs text-amber-700">
                🔥 127 students joined today
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Trust Strip */}
        <div className="mt-20 text-center text-xs tracking-[0.35em] text-slate-500">
          12K+ STUDENTS • GLOBAL COMMUNITY • CERTIFIED TRAINERS
        </div>

      </div>
    </section>
  );
}