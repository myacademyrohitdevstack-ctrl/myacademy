"use client";

import { useStudentsAllAnnouncements } from "@/Hooks/useStudentAllAnnoucements";
import { useStudentsAllClasses } from "@/Hooks/useStudentAllClasses";
import { useStudentStatics } from "@/Hooks/useStudentsStatics";
import { useGetStudentAttendenceDashboard } from "@/Hooks/useStudentAttendanceDashboard";
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
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaExclamationTriangle,
  FaShieldAlt,
  FaCalendarMinus,
  FaLayerGroup,
} from "react-icons/fa";
import CommingSoon from "@/app/Components/ui/CommingSoon";
import DashboardSkeleton from "@/app/Skeletons/DashBoardSkeleton";

export default function Dashboard({ user }) {
  const { data: announcements, isLoading: announcementsLoading } = useStudentsAllAnnouncements();
  const { data: classes, isLoading: classesLoading } = useStudentsAllClasses();
  const { data: statics, isLoading: staticsLoading } = useStudentStatics();
  const { data: attendanceData, isLoading: attendanceLoading } = useGetStudentAttendenceDashboard();

  if (announcementsLoading || classesLoading || staticsLoading || attendanceLoading) {
    return <DashboardSkeleton />;
  }

  const attendanceStats = attendanceData?.stats || {};
  const attendanceProgress = attendanceData?.progress || {};
  const recentAttendance = attendanceData?.recentAttendance || [];
  const attendanceInsights = attendanceData?.insights || {};

  const attendancePercentage =
    attendanceStats.attendancePercentage !== null && attendanceStats.attendancePercentage !== undefined
      ? attendanceStats.attendancePercentage
      : null;

  const isEligible = attendancePercentage === null || attendancePercentage >= (attendanceProgress.requiredAttendance || 75);

  const stats = [
    {
      title: "Attendance Rate",
      value: attendancePercentage !== null ? `${attendancePercentage}%` : "100%",
      sub: attendanceStats.totalClasses
        ? `${attendanceStats.present || 0} Attended • ${attendanceStats.leave || 0} Leave`
        : "100% Academic Standing",
      icon: <FaCalendarCheck />,
      highlight: true,
      color:
        attendancePercentage !== null
          ? attendancePercentage >= 75
            ? "text-emerald-600"
            : "text-rose-600"
          : "text-emerald-600",
    },
    {
      title: "Enrolled Batches",
      value: statics?.batches || 0,
      sub: "Active cohorts",
      icon: <FaUsers />,
      color: "text-slate-800",
    },
    {
      title: "Total Classes",
      value: attendanceStats.totalClasses || statics?.classes || 0,
      sub: `${attendanceStats.present || 0} Attended • ${attendanceStats.leave || 0} Leave`,
      icon: <FaChalkboardTeacher />,
      color: "text-slate-800",
    },
    {
      title: "Notes & PDFs",
      value: (statics?.notes || 0) + (statics?.pdfs || 0),
      sub: "Study resources",
      icon: <FaStickyNote />,
      color: "text-slate-800",
    },
  ];

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
                Continue your learning journey, monitor your classroom attendance, attend scheduled live batches, and access chapter study materials.
              </p>

              <Link
                href="/student-profile/batches"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-[#D6451B] shadow-xs hover:bg-orange-50 transition"
              >
                <span>Resume Learning</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>

            {/* Attendance Quick Badge in Hero */}
            <div className="rounded-2xl bg-white/15 p-4 sm:p-5 backdrop-blur-md lg:w-80 shrink-0 border border-white/20">
              <div className="flex items-center justify-between text-xs uppercase font-semibold text-orange-100 tracking-wider">
                <span>Attendance Status</span>
                <FaCalendarCheck className="text-white/80" />
              </div>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold">
                  {attendancePercentage !== null ? `${attendancePercentage}%` : "100%"}
                </span>
                <span className="text-xs text-orange-100">
                  {attendanceStats.totalClasses
                    ? `${attendanceStats.present || 0}/${attendanceStats.totalClasses} attended`
                    : "Zero Missed Sessions"}
                </span>
              </div>

              <div className="mt-3.5 h-2.5 overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${Math.min(100, attendancePercentage ?? 100)}%` }}
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-orange-100">
                <span>75% Minimum Required</span>
                <span>{isEligible ? "✓ Eligible" : "⚠️ Shortage"}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
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

              <h3 className={`mt-2.5 text-lg sm:text-2xl font-extrabold tracking-tight ${item.color}`}>
                {item.value}
              </h3>

              <p className="mt-0.5 text-xs font-semibold text-slate-700 truncate">
                {item.title}
              </p>
              <p className="text-[11px] text-slate-400 truncate">
                {item.sub}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ATTENDANCE OVERVIEW SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-xs"
        >
          {/* Card Header */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#D6451B]">
                <FaCalendarCheck />
              </div>
              <div>
                <h2 className="text-base sm:text-xl font-bold text-slate-900">
                  Classroom Attendance Overview
                </h2>
                <p className="text-xs text-slate-500">
                  Official records marked by instructors across all your cohorts
                </p>
              </div>
            </div>

            {/* Standing Badge */}
            <div className="self-start sm:self-auto">
              {attendancePercentage === null ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                  <FaCheckCircle className="text-[11px] text-emerald-600" />
                  <span>In Good Standing (Zero Absences)</span>
                </span>
              ) : attendancePercentage >= 75 ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-bold text-emerald-700">
                  <FaCheckCircle className="text-[11px] text-emerald-600" />
                  <span>Eligible for Examinations (75%+ Met)</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-3 py-1 text-xs font-bold text-rose-700">
                  <FaExclamationTriangle className="text-[11px] text-rose-600" />
                  <span>Attendance Shortage (&lt;75% Threshold)</span>
                </span>
              )}
            </div>
          </div>

          {/* Metric Highlights Row */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
            {/* Total Classes */}
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-600">Total Classes</span>
                <FaLayerGroup className="text-xs text-slate-500" />
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  {attendanceStats.totalClasses || 0}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">classes</span>
              </div>
              <p className="mt-1 text-[11px] text-slate-400">
                {attendanceStats.totalClasses ? "Conducted cohort sessions" : "Zero classes recorded"}
              </p>
            </div>

            {/* Present Count */}
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-800">Attended Classes</span>
                <FaCheckCircle className="text-xs text-emerald-600" />
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700">
                  {attendanceStats.present || 0}
                </span>
                <span className="text-[11px] text-emerald-600 font-medium">present</span>
              </div>
              <p className="mt-1 text-[11px] text-emerald-600/80">
                Marked present by faculty
              </p>
            </div>

            {/* Leave Count */}
            <div className="rounded-xl border border-amber-100 bg-amber-50/40 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-800">Leave</span>
                <FaCalendarMinus className="text-xs text-amber-600" />
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-amber-700">
                  {attendanceStats.leave || 0}
                </span>
                <span className="text-[11px] text-amber-600 font-medium">leave</span>
              </div>
              <p className="mt-1 text-[11px] text-amber-600/80">
                {attendanceStats.leave > 0 ? "Approved academic leave" : "Zero leaves recorded"}
              </p>
            </div>

            {/* Absent Count */}
            <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-rose-800">Missed / Absent</span>
                <FaTimesCircle className="text-xs text-rose-600" />
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-rose-700">
                  {attendanceStats.absent || 0}
                </span>
                <span className="text-[11px] text-rose-600 font-medium">absent</span>
              </div>
              <p className="mt-1 text-[11px] text-rose-600/80">
                {attendanceStats.absent > 0 ? "Unexcused absences" : "Zero missed classes 🎉"}
              </p>
            </div>

            {/* Overall Rate */}
            <div className="col-span-2 sm:col-span-1 rounded-xl border border-orange-100 bg-orange-50/40 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-orange-900">Attendance Rate</span>
                <FaFire className="text-xs text-[#D6451B]" />
              </div>
              <div className="mt-1 flex items-baseline gap-1.5">
                <span className={`text-2xl sm:text-3xl font-extrabold ${
                  attendancePercentage !== null
                    ? attendancePercentage >= 75
                      ? "text-emerald-600"
                      : "text-rose-600"
                    : "text-emerald-600"
                }`}>
                  {attendancePercentage !== null ? `${attendancePercentage}%` : "100%"}
                </span>
                <span className="text-[11px] text-orange-700 font-medium">rate</span>
              </div>
              <p className="mt-1 text-[11px] text-orange-700/80">
                {attendancePercentage !== null && attendancePercentage >= 75
                  ? "75%+ exam benchmark met"
                  : attendancePercentage !== null
                  ? "Shortage below 75%"
                  : "Zero absences recorded"}
              </p>
            </div>
          </div>

          {/* Visual Progress Bar with 75% target indicator */}
          <div className="mt-6 rounded-xl border border-slate-100 bg-slate-50/60 p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
              <span>Attendance Progress vs Mandatory 75% Benchmark</span>
              <span className={attendancePercentage === null || attendancePercentage >= 75 ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>
                {attendancePercentage !== null ? `${attendancePercentage}% Recorded` : "100% In Good Standing"}
              </span>
            </div>

            <div className="relative mt-3 h-3 w-full rounded-full bg-slate-200 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  attendancePercentage === null || attendancePercentage >= 75
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                    : "bg-gradient-to-r from-rose-500 to-amber-500"
                }`}
                style={{ width: `${Math.min(100, attendancePercentage ?? 100)}%` }}
              />
              {/* 75% threshold marker line */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-slate-900/60 z-10"
                style={{ left: "75%" }}
                title="75% Required Benchmark"
              />
            </div>

            <div className="mt-1.5 flex justify-between text-[10px] text-slate-400 font-medium">
              <span>0%</span>
              <span className="font-bold text-slate-700">75% (Exam Threshold)</span>
              <span>100%</span>
            </div>
          </div>

          {/* Recent Attendance Log (Last 10 records) */}
          <div className="mt-6">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs sm:text-sm font-bold text-slate-800">
                Recent Class Sessions Log
              </h3>
              <span className="text-[11px] font-medium text-slate-400">
                {recentAttendance.length > 0 ? `Showing last ${recentAttendance.length} records` : "Good standing"}
              </span>
            </div>

            {recentAttendance.length === 0 ? (
              <div className="py-8 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-600 mb-2">
                  <FaCheckCircle />
                </div>
                <h4 className="mt-1 text-xs sm:text-sm font-bold text-slate-800">
                  All Caught Up • Zero Absences Recorded
                </h4>
                <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
                  Your academic profile is in full compliance with zero recorded absences. Class session logs will update here as instructors complete daily roll calls.
                </p>
              </div>
            ) : (
              <div className="mt-3 divide-y divide-slate-100">
                {recentAttendance.map((item, idx) => {
                  const isPresent = item.status === "present";
                  const isLeave = item.status === "leave";
                  const isAbsent = item.status === "absent";
                  const recordDate = item.date
                    ? new Date(item.date).toLocaleDateString("en-IN", {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Date N/A";

                  return (
                    <div
                      key={item.attendanceId || idx}
                      className="flex items-center justify-between py-2.5 px-2 hover:bg-slate-50/80 rounded-lg transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm ${
                            isPresent
                              ? "bg-emerald-50 text-emerald-600"
                              : isLeave
                              ? "bg-amber-50 text-amber-600"
                              : isAbsent
                              ? "bg-rose-50 text-rose-600"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {isPresent ? (
                            <FaCheckCircle />
                          ) : isLeave ? (
                            <FaCalendarMinus />
                          ) : isAbsent ? (
                            <FaTimesCircle />
                          ) : (
                            <FaClock />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                            {item.batchName || "Classroom Session"}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {recordDate}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                          isPresent
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : isLeave
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : isAbsent
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        {item.status || "Unmarked"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </motion.div>

        {/* Classes + Announcements Row */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
          {/* Upcoming Classes */}
          <motion.div
            whileHover={{ y: -3 }}
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FaVideo className="text-[#D6451B]" />
                <h2 className="text-base sm:text-xl font-bold text-slate-900">
                  Upcoming Classes
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-400">
                {classes?.length || 0} Scheduled
              </span>
            </div>

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
                  There are no scheduled live sessions right now. Check back later for new meetings.
                </p>
              </div>
            )}
          </motion.div>

          {/* Announcements */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FaBullhorn className="text-[#D6451B]" />
                <h2 className="text-base sm:text-xl font-bold text-slate-900">
                  Latest Announcements
                </h2>
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
                          <div className="flex items-center gap-1.5 min-w-0">
                            {(item.isPinned || item.pinned) && (
                              <span className="text-[10px] text-amber-700 font-bold shrink-0">📌</span>
                            )}
                            <h3 className="truncate text-xs sm:text-sm font-bold text-slate-900">
                              {item.title}
                            </h3>
                          </div>
                          <span className="text-[10px] text-slate-400 shrink-0">
                            {formatISTDateTime(item.publishAt || item.createdAt)}
                          </span>
                        </div>

                        {item.batch?.name && (
                          <span className="inline-block mt-0.5 text-[10px] font-semibold text-[#D6451B] bg-orange-50 px-1.5 py-0.5 rounded-md">
                            Batch: {item.batch.name}
                          </span>
                        )}

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
                    You&apos;re all caught up with academy updates.
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
