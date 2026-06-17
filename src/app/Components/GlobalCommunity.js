"use client";

import { motion } from "framer-motion";
import { FaGlobe, FaUsers, FaComments, FaVideo } from "react-icons/fa";

const communityStats = [
  {
    icon: <FaGlobe />,
    value: "25+",
    label: "Countries",
    desc: "Students learning across continents",
  },
  {
    icon: <FaUsers />,
    value: "12K+",
    label: "Active Learners",
    desc: "Daily real conversation practice",
  },
  {
    icon: <FaComments />,
    value: "50K+",
    label: "Live Conversations",
    desc: "Monthly speaking interactions",
  },
  {
    icon: <FaVideo />,
    value: "1.5K+",
    label: "Live Classes",
    desc: "Interactive mentor-led sessions",
  },
];

export default function GlobalCommunity() {
  return (
    <section className="relative bg-white text-slate-900 py-28 overflow-hidden">

      {/* ambient global glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            WORLDWIDE LANGUAGE NETWORK
          </div>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold leading-tight">
            A{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              living community
            </span>{" "}
            of learners
          </h2>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
            Not a platform — a global language ecosystem where people practice,
            fail, improve, and grow together in real time.
          </p>
        </div>

        {/* FLOATING STATS (not grid cards) */}
        <div className="relative mb-24">

          <div className="flex flex-wrap justify-center gap-12">

            {communityStats.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center max-w-[160px]"
              >

                {/* icon */}
                <div className="text-blue-500 text-xl flex justify-center">
                  {item.icon}
                </div>

                {/* value */}
                <div className="mt-3 text-3xl font-bold">
                  {item.value}
                </div>

                {/* label */}
                <div className="mt-1 text-sm font-medium text-slate-700">
                  {item.label}
                </div>

                {/* subtle desc */}
                <div className="mt-2 text-xs text-slate-500 leading-relaxed">
                  {item.desc}
                </div>

              </motion.div>
            ))}

          </div>
        </div>

        {/* CENTRAL ECOSYSTEM SECTION */}
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* LEFT STORY */}
          <div className="space-y-6">

            <div className="text-[10px] tracking-[0.35em] text-slate-400">
              REAL TIME ACTIVITY
            </div>

            <h3 className="text-3xl font-bold leading-tight">
              Every second, someone somewhere is{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">
                speaking
              </span>
            </h3>

            <p className="text-slate-600 leading-relaxed">
              You’re not learning alone. You’re entering a live network of
              conversations happening across the world — 24/7.
            </p>

            <button className="mt-4 flex items-center gap-2 border-b border-slate-300 pb-1 font-medium">
              Join Community <span>→</span>
            </button>
          </div>

          {/* RIGHT LIVE FEED (no card box feel) */}
          <div className="relative">

            <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200" />

            <div className="space-y-6 pl-6">

              {[
                "🇫🇷 Sarah joined a French speaking room",
                "🇮🇳 Arjun practiced English with a tutor",
                "🇪🇸 Maria completed A2 speaking test",
                "🇺🇸 John started beginner pathway",
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-sm text-slate-700"
                >
                  <span className="text-slate-400 mr-2">●</span>
                  {text}
                </motion.div>
              ))}

            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-24 text-center text-[10px] tracking-[0.35em] text-slate-400">
          CONNECT • PRACTICE • GROW GLOBALLY
        </div>

      </div>
    </section>
  );
}