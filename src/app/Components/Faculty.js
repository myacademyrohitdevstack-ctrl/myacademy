"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
    <section className="relative overflow-hidden bg-white py-28 text-slate-900">
      {/* Brand Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,69,27,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            EXPERT LANGUAGE TRAINERS
          </div>

          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Meet your{" "}
            <span className="bg-gradient-to-r from-[#D6451B] to-[#7BC3D7] bg-clip-text text-transparent">
              mentors
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#D6451B] to-[#7BC3D7]" />

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            Learn from real experts who guide your fluency journey personally.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid items-start gap-10 lg:grid-cols-3">
          {/* Mentor Selector */}
          <div className="space-y-4">
            {faculty.map((item, i) => (
              <button
                key={item.name}
                onClick={() => setActive(i)}
                className={`w-full rounded-2xl border p-5 text-left transition-all duration-300 ${
                  active === i
                    ? "border-[#D6451B] bg-[#D6451B]/5 shadow-sm"
                    : "border-slate-100 hover:bg-slate-50"
                }`}
              >
                <div className="font-semibold text-slate-900">
                  {item.name}
                </div>

                <div className="mt-1 text-xs text-slate-500">
                  {item.role}
                </div>

                {active === i && (
                  <div className="mt-3 h-1 w-12 rounded-full bg-gradient-to-r from-[#D6451B] to-[#7BC3D7]" />
                )}
              </button>
            ))}
          </div>

          {/* Featured Mentor */}
          <motion.div
            key={mentor.name}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative lg:col-span-2"
          >
            <div className="relative h-[420px] overflow-hidden rounded-3xl">
              <img
                src={mentor.img}
                alt={mentor.name}
                className="h-full w-full object-cover transition duration-700 hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              {/* Brand Overlay */}
              <div className="absolute inset-0 bg-[#D6451B]/10 mix-blend-overlay" />

              {/* Content */}
              <div className="absolute bottom-6 left-6 text-white">
                <div className="text-xs tracking-[0.3em] text-white/60">
                  FEATURED MENTOR
                </div>

                <h3 className="mt-2 text-3xl font-bold">
                  {mentor.name}
                </h3>

                <p className="mt-1 text-sm text-white/80">
                  {mentor.role}
                </p>

                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/70">
                  {mentor.desc}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs backdrop-blur-sm">
                  <FaChalkboardTeacher className="text-[#7BC3D7]" />
                  {mentor.focus}
                </div>
              </div>
            </div>

            {/* Trust Strip */}
            <div className="mt-6 flex flex-wrap gap-6 text-xs text-slate-500">
              <span className="flex items-center gap-2">
                <FaCertificate className="text-[#D6451B]" />
                Certified Trainer
              </span>

              <span className="flex items-center gap-2">
                <FaGlobe className="text-[#D6451B]" />
                Global Experience
              </span>

              <span className="flex items-center gap-2">
                <FaChalkboardTeacher className="text-[#D6451B]" />
                {mentor.experience}
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

          <button className="mt-6 rounded-full bg-[#D6451B] px-8 py-3 text-white transition hover:opacity-90">
           <Link href='/contact'>  Book a Session</Link>
          
          </button>
        </div>
      </div>
    </section>
  );
}