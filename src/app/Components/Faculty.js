"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaChalkboardTeacher,
  FaGlobe,
  FaCertificate,
} from "react-icons/fa";

const faculty = [
  {
    name: "Emily Carter",
    role: "Senior English Trainer",
    experience: "8+ Years Experience",
    desc: "Specialist in spoken English, pronunciation, and fluency training for beginners to advanced learners.",
    focus: "English Fluency Specialist",
    img: "/faculty/emily.jpg",
  },
  {
    name: "Jean Dupont",
    role: "French Language Expert",
    experience: "10+ Years Experience",
    desc: "Native French instructor focused on conversational fluency and exam preparation (DELF/DALF).",
    focus: "French Native Mentor",
    img: "/faculty/jean.jpg",
  },
  {
    name: "Michael Roberts",
    role: "Business Communication Coach",
    experience: "12+ Years Experience",
    desc: "Corporate trainer helping professionals improve presentations, meetings, and workplace communication.",
    focus: "Corporate Communication Expert",
    img: "/faculty/michael.jpg",
  },
];

export default function Faculty() {
  const [active, setActive] = useState(0);

  const mentor = faculty[active];

  return (
    <section className="relative bg-white text-slate-900 py-28 overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.06),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            EXPERT LANGUAGE TRAINERS
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold">
            Meet your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              mentors
            </span>
          </h2>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
            Learn from real experts who guide your fluency journey personally.
          </p>
        </div>

        {/* MAIN LAYOUT */}
        <div className="grid lg:grid-cols-3 gap-10 items-start">

          {/* LEFT SELECTOR */}
          <div className="space-y-4">
            {faculty.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setActive(i)}
                className={`w-full text-left p-4 rounded-xl border transition ${
                  active === i
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-100 hover:bg-slate-50"
                }`}
              >
                <div className="font-semibold">{item.name}</div>
                <div className="text-xs text-slate-500">{item.role}</div>
              </button>
            ))}
          </div>

          {/* CENTER FEATURED IMAGE */}
          <motion.div
            key={mentor.name}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 relative"
          >

            {/* IMAGE WRAPPER */}
            <div className="relative rounded-2xl overflow-hidden h-[420px]">

              <img
                src={mentor.img}
                alt={mentor.name}
                className="h-full w-full object-cover scale-105 hover:scale-110 transition duration-700"
              />

              {/* cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* glowing aura */}
              <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />

              {/* TEXT OVER IMAGE */}
              <div className="absolute bottom-6 left-6 text-white space-y-2">

                <div className="text-xs tracking-[0.3em] text-white/60">
                  FEATURED MENTOR
                </div>

                <div className="text-3xl font-bold">
                  {mentor.name}
                </div>

                <div className="text-sm text-white/80">
                  {mentor.role}
                </div>

                <p className="text-sm text-white/70 max-w-md">
                  {mentor.desc}
                </p>

                {/* focus badge */}
                <div className="mt-3 inline-flex items-center gap-2 text-xs bg-white/10 px-3 py-1 rounded-full backdrop-blur">
                  <FaChalkboardTeacher className="text-blue-300" />
                  {mentor.focus}
                </div>

              </div>

            </div>

            {/* TRUST STRIP */}
            <div className="mt-6 flex gap-6 text-xs text-slate-500">

              <span className="flex items-center gap-1">
                <FaCertificate className="text-blue-500" />
                Certified Trainer
              </span>

              <span className="flex items-center gap-1">
                <FaGlobe className="text-blue-500" />
                Global Experience
              </span>

            </div>

          </motion.div>

        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-semibold">
            Learn directly from expert mentors
          </h3>

          <p className="mt-3 text-slate-600">
            Real guidance from real professionals.
          </p>

          <button className="mt-6 rounded-full bg-slate-900 px-8 py-3 text-white hover:scale-105 transition">
            Book a Session
          </button>
        </div>

      </div>
    </section>
  );
}