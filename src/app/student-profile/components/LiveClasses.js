"use client";

import { motion } from "framer-motion";
import {
  FaVideo,
  FaCalendarAlt,
  FaClock,
  FaUserTie,
  FaPlayCircle,
  FaBookOpen,
} from "react-icons/fa";

const classes = [
  {
    id: 1,
    title: "English Speaking Practice",
    trainer: "John Smith",
    date: "Today",
    time: "6:00 PM - 7:00 PM",
    topic: "Daily Conversation",
    status: "Live",
  },
  {
    id: 2,
    title: "Business Communication",
    trainer: "Emma Johnson",
    date: "Tomorrow",
    time: "5:00 PM - 6:00 PM",
    topic: "Formal Emails",
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Grammar Workshop",
    trainer: "Sophia Lee",
    date: "Saturday",
    time: "11:00 AM - 12:00 PM",
    topic: "Tenses",
    status: "Upcoming",
  },
];

export default function LiveClasses() {
  return (
    <div className="space-y-8">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[32px] bg-gradient-to-r from-[#D6451B] to-orange-500 p-8 text-white shadow-xl"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
              Next Live Class
            </span>

            <h1 className="mt-5 text-4xl font-bold">
              English Speaking Practice
            </h1>

            <p className="mt-3 text-orange-100">
              Improve your speaking confidence through real conversations.
            </p>

            <div className="mt-8 flex flex-wrap gap-6">

              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                Today
              </div>

              <div className="flex items-center gap-2">
                <FaClock />
                6:00 PM
              </div>

              <div className="flex items-center gap-2">
                <FaUserTie />
                John Smith
              </div>

            </div>

          </div>

          <button className="flex items-center gap-3 rounded-2xl bg-white px-8 py-4 font-semibold text-[#D6451B] transition hover:scale-105">
            <FaPlayCircle />
            Join Class
          </button>

        </div>

      </motion.div>

      {/* Schedule */}

      <div className="grid gap-6">

        {classes.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <h2 className="text-2xl font-bold">
                    {item.title}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      item.status === "Live"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-[#D6451B]"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-2">

                  <div className="flex items-center gap-3">

                    <FaCalendarAlt className="text-[#D6451B]" />

                    <div>

                      <p className="text-sm text-slate-500">
                        Date
                      </p>

                      <h4 className="font-semibold">
                        {item.date}
                      </h4>

                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <FaClock className="text-[#D6451B]" />

                    <div>

                      <p className="text-sm text-slate-500">
                        Time
                      </p>

                      <h4 className="font-semibold">
                        {item.time}
                      </h4>

                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <FaUserTie className="text-[#D6451B]" />

                    <div>

                      <p className="text-sm text-slate-500">
                        Trainer
                      </p>

                      <h4 className="font-semibold">
                        {item.trainer}
                      </h4>

                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <FaBookOpen className="text-[#D6451B]" />

                    <div>

                      <p className="text-sm text-slate-500">
                        Topic
                      </p>

                      <h4 className="font-semibold">
                        {item.topic}
                      </h4>

                    </div>

                  </div>

                </div>

              </div>

              <button
                className={`rounded-2xl px-6 py-3 font-medium text-white ${
                  item.status === "Live"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-[#D6451B] hover:opacity-90"
                }`}
              >
                {item.status === "Live"
                  ? "Join Now"
                  : "View Details"}
              </button>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}