"use client";

import { motion } from "framer-motion";
import {
  FaSearch,
  FaStar,
  FaCalendarAlt,
  FaGlobe,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import Link from "next/link";

const features = [
  {
    icon: <FaSearch />,
    title: "Smart Tutor Matching",
    desc: "Find tutors based on your goals, level, and learning style.",
  },
  {
    icon: <FaStar />,
    title: "Verified Reviews",
    desc: "Choose confidently with authentic student feedback.",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Flexible Scheduling",
    desc: "Book lessons that fit your daily routine and timezone.",
  },
  {
    icon: <FaGlobe />,
    title: "Learn Anywhere",
    desc: "Connect with expert tutors from anywhere in the world.",
  },
];

export default function FindTutor() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,69,27,0.08),transparent_65%)]" />

      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        {/* Header */}
        <div className="mb-14 text-center">
          <div className="text-[10px] tracking-[0.35em] text-slate-400">
            FIND YOUR TUTOR
          </div>

          <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Discover the perfect{" "}
            <span className="bg-gradient-to-r from-[#D6451B] to-[#7BC3D7] bg-clip-text text-transparent">
              tutor for your goals
            </span>
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#D6451B] to-[#7BC3D7]" />

          <p className="mx-auto mt-5 max-w-2xl text-sm text-slate-600 sm:text-base">
            Browse verified tutors, compare expertise, read reviews, and book
            lessons that fit your schedule.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Search Experience Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-xl"
          >
            {/* Search Bar */}
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <FaSearch className="text-[#D6451B]" />
              <span className="text-sm text-slate-500">
                Search tutors, subjects, or goals...
              </span>
            </div>

            {/* Filters */}
            <div className="mt-6 flex flex-wrap gap-3">
              {["IELTS", "Business English", "Conversation", "Beginner"].map(
                (item) => (
                  <div
                    key={item}
                    className="rounded-full border border-slate-200 px-4 py-2 text-xs text-slate-700"
                  >
                    {item}
                  </div>
                )
              )}
            </div>

            {/* Results Preview */}
            <div className="mt-8 space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4"
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#D6451B]/20 to-[#7BC3D7]/20" />

                  <div className="flex-1">
                    <div className="h-3 w-28 rounded-full bg-slate-200" />
                    <div className="mt-2 h-2 w-20 rounded-full bg-slate-100" />
                  </div>

                  <div className="rounded-full bg-[#D6451B]/10 px-3 py-1 text-xs font-medium text-[#D6451B]">
                    Available
                  </div>
                </div>
              ))}
            </div>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                "Verified Tutors",
                "Instant Booking",
                "Trial Lessons",
                "Global Access",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-slate-700"
                >
                  <FaCheckCircle className="text-[#D6451B]" />
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#D6451B]/30 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D6451B]/10 text-xl text-[#D6451B]">
                    {feature.icon}
                  </div>

                  <h3 className="mt-4 text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>

            <Link href='/find-tutor'  className="mt-8 lg:w-fit flex items-center gap-3 rounded-full bg-[#D6451B] px-8 py-3 text-white transition hover:opacity-90">
              Find Your Tutor
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}