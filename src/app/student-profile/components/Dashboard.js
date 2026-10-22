"use client";

import { useStudentsAllAnnouncements } from "@/Hooks/useStudentAllAnnoucements";
import { useStudentsAllClasses } from "@/Hooks/useStudentAllClasses";
import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";
import { formatISTDateTime } from "@/Utils/formatDate";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaFire,
  FaArrowRight,
  FaBullhorn,
  FaVideo,
  FaChalkboardTeacher,
  FaUsers,
  FaStickyNote,
  FaFilePdf,
} from "react-icons/fa";
import { useStudentStatics } from "@/Hooks/useStudentsStatics";
import CommingSoon from "@/app/Components/ui/CommingSoon";
import DashboardSkeleton from "@/app/Skeletons/DashBoardSkeleton";

export default function Dashboard({ user }) {
  const { data: announcements, isLoading: announcementsLoading } = useStudentsAllAnnouncements();
  const { data: classes, isLoading: classesLoading } = useStudentsAllClasses();
  const { data: statics, isLoading: staticsLoading } = useStudentStatics();

  const stats = [
    {
      title: "Classes",
      value: statics?.classes || 0,
      icon: <FaChalkboardTeacher />,
    },
    {
      title: "Batches",
      value: statics?.batches || 0,
      icon: <FaUsers />,
    },
    {
      title: "Notes",
      value: statics?.notes || 0,
      icon: <FaStickyNote />,
    },
    {
      title: "PDF Resources",
      value: statics?.pdfs || 0,
      icon: <FaFilePdf />,
    },
  ];

  if (announcementsLoading || classesLoading || staticsLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="py-2 sm:py-4">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6 lg:space-y-8">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-[#ff855e] p-4 sm:p-6 lg:p-8 text-white shadow-lg"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                Student Learning Console
              </span>

              <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                Welcome Back, {capitalizeFirstLetter(user?.fullName)} 👋
              </h1>

              <p className="mt-2 text-xs sm:text-sm lg:text-base max-w-xl text-orange-100 font-normal leading-relaxed">
                Continue your learning journey, attend scheduled live batches, and access chapter study materials.
              </p>

              <Link
                href="/student-profile/batches"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-[#D6451B] shadow-xs hover:bg-orange-50 transition"
              >
                <span>Resume Learning</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>

            <div className="rounded-2xl bg-white/15 p-4 sm:p-5 backdrop-blur-md lg:w-80 shrink-0 border border-white/20">
              <p className="text-xs uppercase font-semibold text-orange-100 tracking-wider">
                Current Course
              </p>

              <h2 className="mt-1 text-lg sm:text-xl font-bold">
                General English
              </h2>

              <p className="text-xs text-orange-100">
                Intermediate Level
              </p>

              <div className="mt-3.5 h-2.5 overflow-hidden rounded-full bg-white/30">
                <div className="h-full w-[78%] rounded-full bg-white" />
              </div>

              <div className="mt-2 flex justify-between text-xs font-semibold">
                <span>Progress</span>
                <span>78%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">
          {stats.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 shadow-xs hover:shadow-md transition-all"
            >
              <div className="flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl bg-orange-50 text-base sm:text-lg text-[#D6451B]">
                {item.icon}
              </div>

              <h3 className="mt-2.5 text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                {item.value}
              </h3>

              <p className="mt-0.5 text-xs font-semibold text-slate-500 truncate">
                {item.title}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Course + Classes */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
          {/* Current Course */}
          <motion.div
            whileHover={{ y: -3 }}
            className="relative rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs overflow-hidden"
          >
            <CommingSoon />
            <h2 className="text-base sm:text-xl font-bold text-slate-900">
              Current Course
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              General English • Intermediate
            </p>

            <div className="mt-4 h-2.5 rounded-full bg-orange-100 overflow-hidden">
              <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#D6451B] to-orange-400" />
            </div>

            <div className="mt-4 flex justify-between text-xs sm:text-sm">
              <div>
                <p className="text-slate-500">Current Module</p>
                <h3 className="font-bold text-slate-900 mt-0.5">Module 8 / 10</h3>
              </div>

              <div className="text-right">
                <p className="text-slate-500">Completion</p>
                <h3 className="font-bold text-[#D6451B] mt-0.5">78%</h3>
              </div>
            </div>

            <button className="mt-6 rounded-xl bg-[#D6451B] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:opacity-90 transition">
              Continue Course
            </button>
          </motion.div>

          {/* Upcoming Classes */}
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs"
          >
            <h2 className="text-base sm:text-xl font-bold text-slate-900">
              Upcoming Classes
            </h2>

            {classes?.length > 0 ? (
              <div className="mt-4 space-y-3">
                {classes.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-xl border border-slate-200/80 bg-gradient-to-r from-white to-orange-50/30 p-3 sm:p-4 transition hover:border-[#D6451B]"
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0 flex-1">
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700">
                          Upcoming
                        </span>

                        <h3 className="mt-1.5 truncate text-xs sm:text-sm font-bold text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-0.5 text-[11px] text-slate-500">
                          {formatISTDateTime(item.meetingDate)}
                        </p>
                      </div>

                      <a
                        href={item.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full sm:w-auto items-center justify-center gap-1.5 rounded-lg sm:rounded-xl bg-[#D6451B] px-3.5 py-2 text-xs font-bold text-white transition hover:opacity-90 shrink-0"
                      >
                        <FaVideo className="text-xs" />
                        <span>Join Class</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 rounded-xl border border-dashed border-slate-200 bg-slate-50 py-8 px-4 text-center">
                <FaVideo className="mx-auto text-3xl text-orange-300" />
                <h3 className="mt-2 text-sm font-bold text-slate-800">
                  No Upcoming Classes
                </h3>
                <p className="mt-1 text-xs text-slate-500 max-w-xs mx-auto">
                  There are no scheduled classes right now. Check back later for new sessions.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Streak */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs relative overflow-hidden">
            <CommingSoon />
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-xl text-[#D6451B]">
                <FaFire />
              </div>

              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900">
                  15 Day Streak 🔥
                </h2>
                <p className="text-xs text-slate-500">
                  Keep learning every day.
                </p>
              </div>
            </div>

            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-orange-100">
              <div className="h-full w-4/5 bg-gradient-to-r from-[#D6451B] to-orange-400" />
            </div>

            <p className="mt-2 text-xs font-semibold text-slate-500">
              Weekly Goal: 8 / 10 Lessons
            </p>
          </div>

          {/* Announcements */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900">
                  Latest Announcements
                </h2>
                <p className="text-xs text-slate-500">
                  Important academy updates
                </p>
              </div>

              <div className="rounded-lg bg-orange-50 px-2.5 py-1 text-xs font-bold text-[#D6451B]">
                {announcements?.length || 0} Updates
              </div>
            </div>

            <div className="mt-4 space-y-2.5">
              {announcements?.length > 0 ? (
                announcements.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                  >
                    <div className="flex gap-2.5">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-[#D6451B] text-xs">
                        <FaBullhorn />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h3 className="truncate text-xs sm:text-sm font-bold text-slate-900">
                            {item.title}
                          </h3>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {formatISTDateTime(item.createdAt)}
                          </span>
                        </div>

                        <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-6">
                  <FaBullhorn className="text-2xl text-slate-300" />
                  <h3 className="mt-2 font-bold text-xs sm:text-sm text-slate-700">
                    No Announcements
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-400">
                    You&apos;re all caught up.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
