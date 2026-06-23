"use client";

import { useStudentsAllAnnouncements } from "@/Hooks/useStudentAllAnnoucements";
import { useStudentsAllClasses } from "@/Hooks/useStudentAllClasses";
import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";
import { formatISTDateTime } from "@/Utils/formatDate";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaChartLine,
  FaCertificate,
  FaFire,
  FaArrowRight,
  FaBullhorn,
  FaVideo,
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



export default function Dashboard({user}) {
  const {data:announcements}=useStudentsAllAnnouncements()
  const {data:classes}=useStudentsAllClasses()
  return (
    <div className="py-10">
    <div className="space-y-8 max-w-6xl mx-auto px-2 ">

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
{classes?.length> 0?
          <div className="mt-6 space-y-4">

            {classes?.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 hover:border-[#D6451B]"
              >
                <div>
                  <h3 className="font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {formatISTDateTime(item.meetingDate)}
                  </p>
                </div>

                <a href={item?.meetingLink} target="_blank" className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-xl bg-orange-50 text-[#D6451B]">
                  <FaVideo />
                </a>
              </div>
            ))}

          </div>:    <div className="flex flex-col items-center justify-center py-10">
        <FaVideo className="text-4xl text-slate-300" />

        <h3 className="mt-3 font-semibold text-slate-700">
          No Classes
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          You're all caught up for now.
        </p>
      </div>}
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
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-2xl font-bold">
        Latest Announcements
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Important updates from your academy
      </p>
    </div>

    <div className="rounded-2xl bg-orange-50 px-4 py-2 text-sm font-medium text-[#D6451B]">
      {announcements?.length || 0} Updates
    </div>
  </div>

  <div className="mt-6 space-y-4">
    {announcements?.length > 0 ? (
      announcements.map((item) => (
        <div
          key={item._id}
          className="
            group rounded-3xl border border-slate-200
            bg-gradient-to-r from-white to-orange-50/30
            p-5 transition-all duration-300
            hover:border-[#D6451B]
            hover:shadow-md
          "
        >
          <div className="flex gap-4">
            <div
              className="
                flex h-12 w-12 shrink-0
                items-center justify-center
                rounded-2xl bg-orange-100
                text-[#D6451B]
              "
            >
              <FaBullhorn />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                {item.pinned && (
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
                    📌 Pinned
                  </span>
                )}

                <span className="text-xs text-slate-500">
                  {formatISTDateTime(item.createdAt)}
                </span>
              </div>

              <h3 className="mt-2 text-lg font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.message}
              </p>

              <div className="mt-3 text-xs text-slate-500">
                Posted by{" "}
                <span className="font-medium">
                  {item.createdBy?.fullName || "Admin"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="flex flex-col items-center justify-center py-10">
        <FaBullhorn className="text-4xl text-slate-300" />

        <h3 className="mt-3 font-semibold text-slate-700">
          No Announcements
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          You're all caught up for now.
        </p>
      </div>
    )}
  </div>
</div>

      </div>

    </div></div>
  );
}