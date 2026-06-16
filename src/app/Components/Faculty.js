"use client";

import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaGlobe, FaCertificate } from "react-icons/fa";

const faculty = [
  {
    name: "Emily Carter",
    role: "Senior English Trainer",
    experience: "8+ Years Experience",
    desc: "Specialist in spoken English, pronunciation, and fluency training for beginners to advanced learners.",
  },
  {
    name: "Jean Dupont",
    role: "French Language Expert",
    experience: "10+ Years Experience",
    desc: "Native French instructor focused on conversational fluency and exam preparation (DELF/DALF).",
  },
  {
    name: "Michael Roberts",
    role: "Business Communication Coach",
    experience: "12+ Years Experience",
    desc: "Corporate trainer helping professionals improve presentations, meetings, and workplace communication.",
  },
];

export default function Faculty() {
  return (
    <section className="relative bg-white text-slate-900 py-24 overflow-hidden">

      {/* Soft background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] text-slate-400">
            EXPERT LANGUAGE TRAINERS
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold">
            Meet Our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              Faculty
            </span>
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Learn from certified native and expert trainers who focus on real fluency,
            not memorization.
          </p>
        </div>

        {/* Faculty Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {faculty.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-xl transition"
            >
              {/* Avatar placeholder */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg">
                {item.name.charAt(0)}
              </div>

              {/* Name */}
              <h3 className="mt-4 text-xl font-semibold">
                {item.name}
              </h3>

              {/* Role */}
              <div className="text-sm text-blue-600 font-medium">
                {item.role}
              </div>

              {/* Experience */}
              <div className="mt-1 text-xs text-slate-400">
                {item.experience}
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>

              {/* Badges */}
              <div className="mt-5 flex gap-2 text-xs text-slate-500">
                <span className="flex items-center gap-1">
                  <FaChalkboardTeacher /> Certified
                </span>
                <span className="flex items-center gap-1">
                  <FaCertificate /> Expert
                </span>
                <span className="flex items-center gap-1">
                  <FaGlobe /> Global
                </span>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/5 to-violet-500/5 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-semibold">
            Learn from the best in the industry
          </h3>

          <p className="mt-3 text-slate-600">
            Expert-led training designed to build real-world communication skills.
          </p>

          <button className="mt-6 rounded-full bg-slate-900 px-8 py-3 text-white hover:scale-105 transition">
            Meet All Faculty
          </button>
        </div>

      </div>
    </section>
  );
}