"use client";

import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const pathways = [
  {
    title: "Curiosity Stage",
    level: "Explore",
    desc: "Encouraging young minds to ask questions, think creatively, and develop a lifelong love for learning.",
    tag: "DISCOVER",
  },
  {
    title: "Knowledge Stage",
    level: "Learn",
    desc: "Building strong academic foundations through structured guidance, practical activities, and critical thinking.",
    tag: "GROWTH",
  },
  {
    title: "Achievement Stage",
    level: "Excel",
    desc: "Transforming knowledge into confidence, leadership, and real-world success through continuous development.",
    tag: "EXCELLENCE",
  },
];

export default function LearningJourney() {
  return (
    <section className="relative overflow-hidden bg-white py-28 text-slate-900">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,69,27,0.06),transparent_60%)]" />

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative mx-auto max-w-6xl px-6">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            LEARNING JOURNEY
          </div>

          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">
            Your Journey from{" "}
            <span className="bg-gradient-to-r from-[#D6451B] to-[#7BC3D7] bg-clip-text text-transparent">
              Curiosity to Excellence
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-slate-600">
            A structured learning pathway designed to inspire curiosity,
            strengthen knowledge, and unlock every learner's full potential.
          </p>
        </div>

        {/* Main Layout */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-slate-200 lg:block" />

          {/* Left Side */}
          <div className="absolute left-0 top-10 hidden max-w-sm lg:block">
            <div className="text-xs tracking-[0.35em] text-slate-400">
              GROWTH FRAMEWORK
            </div>

            <h3 className="mt-4 text-3xl font-bold leading-snug">
              Every learner follows a journey of discovery, growth, and
              achievement
            </h3>

            <p className="mt-4 text-sm text-slate-600">
              Designed to nurture confidence, creativity, and academic
              excellence at every stage.
            </p>

            <div className="mt-6 space-y-2 text-xs text-slate-500">
              <p>✓ Curiosity-driven learning</p>
              <p>✓ Academic excellence</p>
              <p>✓ Personal growth & confidence</p>
            </div>
          </div>

          {/* Right Side */}
          <div className="space-y-14 lg:ml-[45%]">
            {pathways.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-10"
              >
                {/* Node */}
                <div className="absolute left-[-6px] top-2 h-3 w-3 rounded-full bg-gradient-to-r from-[#D6451B] to-[#7BC3D7]" />

                {/* Tag */}
                <div className="text-[10px] tracking-[0.35em] text-slate-400">
                  {item.tag}
                </div>

                <h3 className="mt-2 text-2xl font-semibold sm:text-3xl">
                  {item.title}
                </h3>

                <div className="mt-1 text-sm font-medium text-[#D6451B]">
                  {item.level}
                </div>

                <p className="mt-3 max-w-md text-slate-600">
                  {item.desc}
                </p>

                <button className="mt-4 flex items-center gap-2 text-sm font-medium text-slate-900 transition hover:text-[#D6451B]">
                  <span className="border-b border-slate-300 pb-1">
                    Explore Stage
                  </span>
                  <FaArrowRight />
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-24 text-center text-[10px] tracking-[0.35em] text-slate-400">
          DISCOVER • LEARN • ACHIEVE
        </div>
      </div>
    </section>
  );
}