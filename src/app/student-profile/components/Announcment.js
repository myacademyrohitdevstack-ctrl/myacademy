"use client";

import { motion } from "framer-motion";
import {
  FaBullhorn,
  FaCalendarAlt,
  FaBell,
  FaBookOpen,
  FaTrophy,
  FaExclamationCircle,
} from "react-icons/fa";

const announcements = [
  {
    id: 1,
    title: "Speaking Competition Registration Open",
    message:
      "Register before 25th June to participate in the academy speaking competition.",
    category: "Event",
    date: "18 Jun 2026",
    priority: "High",
  },
  {
    id: 2,
    title: "New Grammar Module Released",
    message:
      "Module 8 covering Advanced Tenses is now available in your course.",
    category: "Course",
    date: "17 Jun 2026",
    priority: "Normal",
  },
  {
    id: 3,
    title: "Holiday Notice",
    message:
      "Academy will remain closed next Monday due to a public holiday.",
    category: "Notice",
    date: "15 Jun 2026",
    priority: "Low",
  },
];

const categoryIcons = {
  Event: <FaTrophy />,
  Course: <FaBookOpen />,
  Notice: <FaBell />,
};

export default function Announcements() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[32px] bg-gradient-to-r from-[#D6451B] to-orange-500 p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
            <FaBullhorn className="text-2xl" />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              Announcements
            </h1>

            <p className="mt-2 text-orange-100">
              Stay updated with academy news, events and course updates.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Announcement Cards */}

      <div className="space-y-6">

        {announcements.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -4 }}
            className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

              <div className="flex gap-5">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#D6451B]">
                  {categoryIcons[item.category]}
                </div>

                <div>

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-2xl font-bold">
                      {item.title}
                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        item.priority === "High"
                          ? "bg-red-100 text-red-600"
                          : item.priority === "Normal"
                          ? "bg-orange-100 text-[#D6451B]"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {item.priority}
                    </span>

                  </div>

                  <p className="mt-4 text-slate-600 leading-7">
                    {item.message}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-500">

                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />
                      {item.date}
                    </div>

                    <div>
                      Category:
                      <span className="ml-2 font-medium text-[#D6451B]">
                        {item.category}
                      </span>
                    </div>

                  </div>

                </div>

              </div>

              <div className="flex items-start">

                <button className="rounded-2xl bg-[#D6451B] px-5 py-3 text-white hover:opacity-90">
                  Mark as Read
                </button>

              </div>

            </div>
          </motion.div>
        ))}

      </div>

      {/* Empty State (show when no announcements) */}

      {/* 
      <div className="rounded-[30px] bg-white p-16 text-center shadow-lg">
        <FaBell className="mx-auto text-5xl text-slate-300" />
        <h2 className="mt-5 text-2xl font-bold">
          No Announcements
        </h2>
        <p className="mt-2 text-slate-500">
          You're all caught up.
        </p>
      </div>
      */}

    </div>
  );
}