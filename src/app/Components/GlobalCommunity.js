"use client";

import { motion } from "framer-motion";
import { FaGlobe, FaUsers, FaComments, FaVideo } from "react-icons/fa";

const communityStats = [
  {
    icon: <FaGlobe />,
    value: "25+",
    label: "Countries",
    desc: "Students learning from around the world",
  },
  {
    icon: <FaUsers />,
    value: "12K+",
    label: "Active Learners",
    desc: "Daily practicing real conversations",
  },
  {
    icon: <FaComments />,
    value: "50K+",
    label: "Live Conversations",
    desc: "Monthly speaking practice sessions",
  },
  {
    icon: <FaVideo />,
    value: "1.5K+",
    label: "Live Classes",
    desc: "Interactive sessions with mentors",
  },
];

export default function GlobalCommunity() {
  return (
    <section className="relative bg-white text-slate-900 py-24 overflow-hidden">

      {/* Soft background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(59,130,246,0.08),transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-xs tracking-[0.3em] text-slate-400">
            WORLDWIDE LANGUAGE NETWORK
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold">
            Join Our{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              Global Community
            </span>
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Connect with learners, practice real conversations, and grow your
            confidence with people from across the world.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {communityStats.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-xl transition"
            >
              {/* Icon */}
              <div className="text-blue-500 text-xl">
                {item.icon}
              </div>

              {/* Value */}
              <div className="mt-4 text-3xl font-bold">
                {item.value}
              </div>

              {/* Label */}
              <div className="mt-1 text-sm font-medium text-slate-700">
                {item.label}
              </div>

              {/* Description */}
              <p className="mt-3 text-sm text-slate-500">
                {item.desc}
              </p>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-blue-500/5 to-violet-500/5 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-20 grid lg:grid-cols-2 gap-10 items-center">

          {/* Left text */}
          <div>
            <h3 className="text-3xl font-bold leading-snug">
              Learn beyond classrooms with real people worldwide
            </h3>

            <p className="mt-4 text-slate-600">
              Our global ecosystem connects you with native speakers, mentors,
              and learners so you can practice language in real-time, not just
              theory.
            </p>

            <button className="mt-6 flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-white hover:scale-105 transition">
              Join Community
            </button>
          </div>

          {/* Right visual card */}
          <div className="relative rounded-2xl border border-slate-200 p-8 bg-gradient-to-br from-blue-50 to-violet-50">
            <div className="text-xs tracking-[0.3em] text-slate-500">
              LIVE GLOBAL ACTIVITY
            </div>

            <div className="mt-6 space-y-4">
              {[
                "🇫🇷 Sarah joined a French speaking room",
                "🇮🇳 Arjun practiced English with a tutor",
                "🇪🇸 Maria completed A2 speaking test",
                "🇺🇸 John started beginner pathway",
              ].map((text, i) => (
                <div
                  key={i}
                  className="rounded-xl bg-white/80 border border-slate-200 p-3 text-sm text-slate-700"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer line */}
        <div className="mt-16 text-center text-xs tracking-[0.3em] text-slate-400">
          CONNECT • PRACTICE • GROW GLOBALLY
        </div>

      </div>
    </section>
  );
}