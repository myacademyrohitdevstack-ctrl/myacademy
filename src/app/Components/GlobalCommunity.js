"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
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
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
  return (
    <section className="relative overflow-hidden bg-white py-28 text-slate-900">
      {/* Brand Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,69,27,0.06),transparent_60%)]" />

      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* HEADER */}
        <div className="mb-20 text-center">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            WORLDWIDE LANGUAGE NETWORK
          </div>

          <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
            A{" "}
            <span className="bg-gradient-to-r from-[#D6451B] to-[#7BC3D7] bg-clip-text text-transparent">
              living community
            </span>{" "}
            of learners
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#D6451B] to-[#7BC3D7]" />

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            Not a platform — a global language ecosystem where people practice,
            fail, improve, and grow together in real time.
          </p>
        </div>

        {/* STATS */}
        <div className="relative mb-24">
          <div className="flex flex-wrap justify-center gap-12">
            {communityStats.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="max-w-[180px] text-center"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D6451B]/10 text-xl text-[#D6451B]">
                  {item.icon}
                </div>

                <div className="mt-4 text-3xl font-bold">
                  {item.value}
                </div>

                <div className="mt-1 text-sm font-medium text-slate-700">
                  {item.label}
                </div>

                <div className="mt-2 text-xs leading-relaxed text-slate-500">
                  {item.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* LEFT */}
          <div className="space-y-6">
            <div className="text-[10px] tracking-[0.35em] text-slate-400">
              REAL TIME ACTIVITY
            </div>

            <h3 className="text-3xl font-bold leading-tight">
              Every second, someone somewhere is{" "}
              <span className="bg-gradient-to-r from-[#D6451B] to-[#7BC3D7] bg-clip-text text-transparent">
                speaking
              </span>
            </h3>

            <p className="leading-relaxed text-slate-600">
              You’re not learning alone. You’re entering a live network of
              conversations happening across the world — 24/7.
            </p>

            <button className="mt-4 flex items-center gap-2 border-b border-[#D6451B]/30 pb-1 font-medium text-[#D6451B]">
            <Link href='/signup'>   Join Community <span>→</span></Link>
           
            </button>
          </div>

          {/* RIGHT FEED */}
          <div className="relative">
            <div className="absolute bottom-0 left-0 top-0 w-px bg-[#D6451B]/20" />

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
                  <span className="mr-2 text-[#D6451B]">●</span>
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