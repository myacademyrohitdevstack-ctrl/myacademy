"use client";

import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaChartLine,
  FaCertificate,
  FaCalendarAlt,
  FaFire,
  FaArrowRight,
} from "react-icons/fa";

const stats = [
  {
    title: "Classes",
    value: "32",
    icon: <FaBookOpen />,
  },
  {
    title: "Progress",
    value: "78%",
    icon: <FaChartLine />,
  },
  {
    title: "Certificates",
    value: "5",
    icon: <FaCertificate />,
  },
  {
    title: "Streak",
    value: "15 Days",
    icon: <FaFire />,
  },
];

const upcomingClasses = [
  {
    title: "English Speaking Practice",
    time: "Tomorrow • 6:00 PM",
  },
  {
    title: "Business Communication",
    time: "Friday • 5:00 PM",
  },
  {
    title: "Grammar Workshop",
    time: "Saturday • 11:00 AM",
  },
];

const announcements = [
  "🎉 Speaking Competition this Saturday",
  "📚 New Grammar Module Released",
  "🏖 Holiday on Monday",
];

export default function Dashboard({user}) {
  return (
    <div className="space-y-8">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] bg-gradient-to-r from-[#D6451B] to-[#ff855e] p-8 text-white shadow-xl"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              Welcome Back, {capitalizeFirstLetter(user?.fullName)} 👋
            </h1>

            <p className="mt-4 max-w-xl text-orange-100">
              Continue your English learning journey and achieve fluency with
              every lesson.
            </p>

            <button className="mt-8 flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-[#D6451B]">
              Resume Learning
              <FaArrowRight />
            </button>
          </div>

          <div className="rounded-3xl bg-white/15 p-6 backdrop-blur">
            <p className="text-sm text-orange-100">
              Current Course
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              General English
            </h2>

            <p className="text-orange-100">
              Intermediate Level
            </p>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/30">
              <div className="h-full w-[78%] rounded-full bg-white" />
            </div>

            <div className="mt-2 flex justify-between text-sm">
              <span>Progress</span>
              <span>78%</span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -6 }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#D6451B]">
              {item.icon}
            </div>

            <h3 className="mt-5 text-3xl font-bold">
              {item.value}
            </h3>

            <p className="mt-2 text-slate-500">
              {item.title}
            </p>
          </motion.div>
        ))}

      </div>

      {/* Course + Classes */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Current Course */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold">
            Current Course
          </h2>

          <p className="mt-2 text-slate-500">
            General English • Intermediate
          </p>

          <div className="mt-6 h-3 rounded-full bg-orange-100 overflow-hidden">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#D6451B] to-orange-400" />
          </div>

          <div className="mt-6 flex justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Current Module
              </p>

              <h3 className="font-semibold">
                Module 8 / 10
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Completion
              </p>

              <h3 className="font-semibold text-[#D6451B]">
                78%
              </h3>
            </div>
          </div>

          <button className="mt-8 rounded-2xl bg-[#D6451B] px-6 py-3 text-white hover:opacity-90">
            Continue Course
          </button>
        </motion.div>

        {/* Upcoming Classes */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold">
            Upcoming Classes
          </h2>

          <div className="mt-6 space-y-4">

            {upcomingClasses.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 hover:border-[#D6451B]"
              >
                <div>
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {item.time}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#D6451B]">
                  <FaCalendarAlt />
                </div>
              </div>
            ))}

          </div>
        </motion.div>

      </div>

      {/* Bottom */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Streak */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">
          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-[#D6451B]">
              <FaFire />
            </div>

            <div>
              <h2 className="text-2xl font-bold">
                15 Day Streak 🔥
              </h2>

              <p className="text-slate-500">
                Keep learning every day.
              </p>
            </div>

          </div>

          <div className="mt-6 h-3 rounded-full bg-orange-100 overflow-hidden">
            <div className="h-full w-4/5 bg-gradient-to-r from-[#D6451B] to-orange-400" />
          </div>

          <p className="mt-3 text-sm text-slate-500">
            Weekly Goal: 8 / 10 Lessons
          </p>
        </div>

        {/* Announcements */}
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">
          <h2 className="text-2xl font-bold">
            Latest Announcements
          </h2>

          <div className="mt-6 space-y-4">

            {announcements.map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-slate-50 p-4"
              >
                {item}
              </div>
            ))}

          </div>
        </div>

      </div>

    </div>
  );
}