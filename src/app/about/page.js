"use client";

import { motion } from "framer-motion";
import { FaGlobe, FaUsers, FaChalkboardTeacher, FaAward } from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="bg-white text-slate-900 overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative py-24 px-6 text-center overflow-hidden">

        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.12),transparent_60%)]" />

        <div className="relative max-w-3xl mx-auto">

          <p className="text-xs tracking-[0.3em] text-slate-400">
            ABOUT OUR ACADEMY
          </p>

          <h1 className="mt-5 text-4xl sm:text-5xl font-bold leading-tight">
            Building{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              fluent global speakers
            </span>
          </h1>

          <p className="mt-6 text-slate-600 text-sm sm:text-base leading-relaxed">
            We are a modern language academy focused on real communication skills.
            Our goal is not memorization — but confidence, clarity, and fluency through
            live practice and structured learning.
          </p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          {[
            { icon: <FaUsers />, value: "12K+", label: "Students" },
            { icon: <FaGlobe />, value: "25+", label: "Countries" },
            { icon: <FaChalkboardTeacher />, value: "150+", label: "Live Classes" },
            { icon: <FaAward />, value: "98%", label: "Success Rate" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-slate-200 bg-white hover:shadow-md transition"
            >
              <div className="text-blue-500 text-xl flex justify-center">
                {item.icon}
              </div>
              <div className="mt-3 text-2xl font-bold">{item.value}</div>
              <div className="text-xs text-slate-500">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="bg-slate-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-3xl font-bold">
              Our Mission
            </h2>

            <p className="mt-5 text-slate-600 leading-relaxed">
              We aim to break the traditional language learning barrier by focusing
              on speaking-first methodology. Every learner practices real conversations,
              not just grammar rules.
            </p>

            <p className="mt-4 text-slate-600 leading-relaxed">
              Through live sessions, global interaction, and structured pathways,
              we help students become confident communicators in real-world situations.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h3 className="font-semibold mb-4">What Makes Us Different</h3>

            <ul className="space-y-3 text-sm text-slate-600">
              <li>✔ Speaking-first learning system</li>
              <li>✔ Live interactive classes</li>
              <li>✔ Global student community</li>
              <li>✔ Structured fluency roadmap</li>
              <li>✔ Real-world communication training</li>
            </ul>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-6 text-center">

        <div className="max-w-3xl mx-auto">

          <h2 className="text-3xl sm:text-4xl font-bold">
            Start your{" "}
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              fluency journey
            </span>{" "}
            today
          </h2>

          <p className="mt-5 text-slate-600">
            Join thousands of learners already transforming their communication skills.
          </p>

          <button className="mt-8 bg-slate-900 text-white px-8 py-3 rounded-full hover:scale-105 transition">
            Get Started
          </button>

        </div>

      </section>

    </div>
  );
}