"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaComments,
  FaVideo,
  FaHeadphones,
  FaTasks,
} from "react-icons/fa";

const experiences = [
  {
    icon: <FaComments />,
    title: "Live Speaking Practice",
    desc: "Daily conversation sessions with trainers and learners to build real fluency.",
  },
  {
    icon: <FaVideo />,
    title: "Interactive Live Classes",
    desc: "Real-time video sessions with corrections and guidance.",
  },
  {
    icon: <FaHeadphones />,
    title: "Listening Immersion",
    desc: "Train your ear with native accents and real-world audio.",
  },
  {
    icon: <FaTasks />,
    title: "Structured Practice Tasks",
    desc: "Weekly challenges designed for steady fluency growth.",
  },
];

export default function LearningExperience() {
  return (
    <section className="relative overflow-hidden bg-white py-28 text-slate-900">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,69,27,0.06),transparent_60%)]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            IMMERSIVE LANGUAGE TRAINING
          </div>

          <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            A{" "}
            <span className="bg-gradient-to-r from-[#D6451B] to-[#7BC3D7] bg-clip-text text-transparent">
              real learning experience
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#D6451B] to-[#7BC3D7]" />

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            Not lessons. A continuous experience that trains thinking,
            speaking, and responding in real time.
          </p>
        </div>

        {/* Content */}
        <div className="grid items-start gap-16 lg:grid-cols-3">
          {/* Left */}
          <div className="space-y-6">
            <div className="text-[10px] tracking-[0.35em] text-slate-400">
              WHY THIS WORKS
            </div>

            <h3 className="text-3xl font-bold leading-tight">
              You don’t study language —{" "}
              <span className="bg-gradient-to-r from-[#D6451B] to-[#7BC3D7] bg-clip-text text-transparent">
                you experience it
              </span>
            </h3>

            <p className="leading-relaxed text-slate-600">
              Every interaction is designed to simulate real communication,
              so your brain stops translating and starts thinking naturally.
            </p>

            <div className="border-t border-slate-100 pt-6 text-xs tracking-[0.3em] text-[#D6451B]">
              SPEAK • HEAR • THINK • RESPOND
            </div>
          </div>

          {/* Center Timeline */}
          <div className="relative">
            <div className="absolute bottom-0 left-4 top-0 w-px bg-[#D6451B]/20" />

            <div className="space-y-16">
              {experiences.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-3 top-2 h-3 w-3 rounded-full bg-gradient-to-r from-[#D6451B] to-[#7BC3D7]" />

                  <div className="text-xl text-[#D6451B]">
                    {item.icon}
                  </div>

                  <h3 className="mt-3 text-lg font-semibold">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <div className="text-[10px] tracking-[0.35em] text-slate-400">
              LIVE ACTIVITY
            </div>

            <h3 className="text-2xl font-semibold">
              Learning is happening right now
            </h3>

            <div className="space-y-4">
              {[
                "🎤 Sarah practiced pronunciation",
                "🧠 John corrected sentence structure",
                "💬 Maria joined live speaking room",
                "🌍 Arjun completed conversation task",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm text-slate-700"
                >
                  <span className="mr-2 text-[#D6451B]">●</span>
                  {text}
                </motion.div>
              ))}
            </div>

            <div className="border-t border-slate-100 pt-6 text-xs tracking-[0.3em] text-[#D6451B]">
              ALWAYS ACTIVE • GLOBAL LEARNING
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-semibold">
            Start learning through real experience
          </h3>

          <p className="mt-3 text-slate-600">
            Every session builds natural fluency — not memorized knowledge.
          </p>

          <button className="mt-6 rounded-full bg-[#D6451B] px-8 py-3 text-white transition hover:opacity-90">
           <Link href='/login'>Start Learning</Link>
            
          </button>
        </div>
      </div>
    </section>
  );
}