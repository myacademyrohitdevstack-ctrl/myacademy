"use client";

import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaDollarSign,
  FaUsers,
  FaStar,
  FaCalendarCheck,
} from "react-icons/fa";
import Link from "next/link";

export default function BecomeTutor() {
  return (
    <section className="relative overflow-hidden bg-white py-20 lg:py-28">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(214,69,27,0.12),transparent_60%)]" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-[10px] tracking-[0.35em] text-[#D6451B]">
              BECOME A TUTOR
            </div>

            <h2 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Turn your expertise into
              <span className="bg-gradient-to-r from-[#D6451B] to-[#7BC3D7] bg-clip-text text-transparent">
                {" "}
                a global classroom
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Teach students worldwide, manage your own schedule, and grow
              your income from a modern teaching platform built for online
              educators.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Flexible Schedule",
                "Global Students",
                "Online Teaching",
                "Secure Payments",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>

            <Link href='/become-a-tutor' className="mt-8 lg:w-fit flex items-center gap-3 rounded-full bg-[#D6451B] px-8 py-3 font-medium text-white transition hover:opacity-90">
              Become a Tutor
              <FaArrowRight />
            </Link>
          </motion.div>

          {/* Right Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Floating Badge 1 */}
            <div className="absolute -left-4 top-10 z-20 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
              <p className="text-xs text-slate-500">New Booking</p>
              <p className="text-sm font-semibold text-slate-800">
                IELTS Student
              </p>
            </div>

            {/* Floating Badge 2 */}
            <div className="absolute -right-4 bottom-10 z-20 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
              <p className="text-xs text-slate-500">Online Now</p>
              <p className="text-sm font-semibold text-[#D6451B]">
                Teaching Session
              </p>
            </div>

            {/* Main Dashboard */}
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-6 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">
                <div>
                  <h3 className="font-semibold text-slate-900">
                    Tutor Dashboard
                  </h3>
                  <p className="text-sm text-slate-500">
                    Monthly Overview
                  </p>
                </div>

                <div className="rounded-full bg-[#D6451B]/10 px-4 py-2 text-sm font-medium text-[#D6451B]">
                  Active
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-[#D6451B]">
                    <FaDollarSign />
                    <span className="text-sm">Earnings</span>
                  </div>

                  <p className="mt-2 text-2xl font-bold">$1,240</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-[#D6451B]">
                    <FaUsers />
                    <span className="text-sm">Students</span>
                  </div>

                  <p className="mt-2 text-2xl font-bold">48</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-[#D6451B]">
                    <FaCalendarCheck />
                    <span className="text-sm">Lessons</span>
                  </div>

                  <p className="mt-2 text-2xl font-bold">126</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-4">
                  <div className="flex items-center gap-2 text-[#D6451B]">
                    <FaStar />
                    <span className="text-sm">Rating</span>
                  </div>

                  <p className="mt-2 text-2xl font-bold">4.9</p>
                </div>
              </div>

              {/* Activity */}
              <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#D6451B] to-[#E66A42] p-5 text-white">
                <p className="text-sm opacity-90">
                  Upcoming Lesson
                </p>

                <h4 className="mt-1 text-lg font-semibold">
                  Business English Session
                </h4>

                <p className="mt-2 text-sm opacity-90">
                  Today • 7:00 PM • Online
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}