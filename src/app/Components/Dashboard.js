"use client";

import DashboardSkeleton from "@/app/Skeletons/DashBoardSkeleton";
import useAuthStore from "@/store/authStore";
import { formatISTDateTime } from "@/Utils/formatDate";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaUsers,
  FaUserTie,
  FaBookOpen,
  FaLayerGroup,
  FaVideo,
  FaBell,
} from "react-icons/fa";

export default function Dashboard({
  data,
  statsLoading,
  recentStudents,
  activitiesLoading,
  classes,
  classesLoading,
  annoucementsLoading,
  announcements,
  permission = {},
  role,
}) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const quickActions = [
    {
      action: "New Course",
      path: "/admin-panel/add-course",
      permission: "canAddCourse",
    },
    {
      action: "Create Batch",
      path: "/admin-panel/add-batch",
      permission: "canAddBatch",
    },
    {
      action: "Announcement",
      path: "/admin-panel/add-announcement",
      permission: "canAddAnnouncement",
    },
  ];

  const allowedActions = quickActions.filter(
    (item) => permission[item.permission]
  );

  const stats = [
    {
      title: "Total Students",
      value: data?.totalStudents || 0,
      growth: "+12%",
      icon: <FaUsers />,
      color: "bg-blue-50 text-blue-600",
    },
    ...(role === "admin"
      ? [
          {
            title: "Active Trainers",
            value: data?.totalTeachers || 0,
            growth: "+3%",
            icon: <FaUserTie />,
            color: "bg-violet-50 text-violet-600",
          },
        ]
      : []),
    {
      title: "Courses",
      value: data?.totalCourses || 0,
      growth: "+5%",
      icon: <FaBookOpen />,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Batches",
      value: data?.totalBatches || 0,
      growth: "+8%",
      icon: <FaLayerGroup />,
      color: "bg-orange-50 text-[#D6451B]",
    },
  ];

  if (statsLoading || classesLoading || annoucementsLoading || activitiesLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-5 sm:space-y-6 lg:space-y-8">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-[#ff855e] p-4 sm:p-6 lg:p-8 text-white shadow-lg"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              {user?.role} Dashboard
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Welcome Back, {user?.fullName} 👋
            </h1>

            <p className="mt-2 text-xs sm:text-sm lg:text-base max-w-2xl text-orange-100 leading-relaxed font-normal">
              Monitor admissions, manage students, track batches, schedule live classes, and oversee academy operations from one powerful console.
            </p>
          </div>

          {/* Overview Card */}
          <div className="rounded-2xl border hidden lg:block border-white/20 bg-white/10 p-5 backdrop-blur-md lg:w-80 shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm tracking-wide">Overview</h3>
              <FaBell className="text-sm opacity-80" />
            </div>

            <div className="mt-4 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-orange-100">Approved Students</span>
                <span className="font-bold">{data?.approvedStudents || 0}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-orange-100">Pending Students</span>
                <span className="font-bold">{data?.pendingStudents || 0}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-orange-100">Blocked Students</span>
                <span className="font-bold">{data?.blockedStudents || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Statistics */}
      <section className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
        {stats.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-xs hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl text-sm sm:text-xl font-bold ${item.color}`}
              >
                {item.icon}
              </div>
            </div>

            <div className="mt-2.5 sm:mt-4">
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                {item.value}
              </h2>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-500 font-semibold truncate">
                {item.title}
              </p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Analytics + Quick Actions */}
      <div className="grid gap-5 sm:gap-6 xl:grid-cols-[2fr_1fr]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3.5 sm:p-6 lg:p-7 shadow-xs"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-base sm:text-xl font-bold text-slate-900">
              Recent Admissions
            </h2>

            <button
              onClick={() => router.push("/admin-panel/student")}
              className="shrink-0 text-xs sm:text-sm font-bold text-[#D6451B] hover:underline"
            >
              View All
            </button>
          </div>

          {/* Mobile Cards */}
          <div className="mt-4 space-y-3 lg:hidden">
            {recentStudents?.length > 0 ? (
              recentStudents.map((student) => (
                <div
                  key={student?.id || student?._id}
                  className="rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 font-bold text-[#D6451B] text-xs">
                      {student?.name?.charAt(0) || "S"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-bold text-sm text-slate-900">
                        {student?.name}
                      </h3>
                      <p className="truncate text-xs text-slate-500">
                        {student?.course || "General"}
                      </p>
                    </div>

                    <span
                      className={`inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                        student?.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {student?.status}
                    </span>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100 pt-2">
                    <span className="text-slate-400">Batch:</span>
                    <span className="font-semibold text-slate-800 truncate ml-2">
                      {student?.batch || "Unassigned"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-200 py-8 text-center">
                <p className="text-xs sm:text-sm text-slate-500">
                  No recent admissions found
                </p>
              </div>
            )}
          </div>

          {/* Desktop Table */}
          <div className="mt-6 hidden overflow-x-auto lg:block">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <th className="pb-3 text-left">Student</th>
                  <th className="pb-3 text-left">Course</th>
                  <th className="pb-3 text-left">Batch</th>
                  <th className="pb-3 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium">
                {recentStudents?.map((student) => (
                  <tr key={student?.id || student?._id}>
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 font-bold text-[#D6451B] text-xs">
                          {student?.name?.charAt(0) || "S"}
                        </div>
                        <span className="font-bold text-slate-900">
                          {student?.name}
                        </span>
                      </div>
                    </td>
                    <td className="max-w-[180px] truncate py-3.5 text-slate-600">
                      {student?.course}
                    </td>
                    <td className="max-w-[140px] truncate py-3.5 text-slate-600">
                      {student?.batch}
                    </td>
                    <td className="py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          student?.status === "approved"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {student?.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Right Side */}
        <div className="space-y-5">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs"
          >
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Quick Actions
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {allowedActions.map(({ action, path }) => (
                <Link
                  key={action}
                  href={path}
                  className="rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-bold text-center transition hover:border-[#D6451B] hover:bg-orange-50 hover:text-[#D6451B]"
                >
                  {action}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Today's Classes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs"
          >
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Today&apos;s Classes
            </h2>

            <div className="mt-4 space-y-2.5">
              {classes?.length > 0 ? (
                classes.map((item) => (
                  <div
                    key={item?._id}
                    className="rounded-xl bg-slate-50 p-3 border border-slate-100"
                  >
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {item?.title}
                    </h3>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <span className="text-[#D6451B] font-semibold text-[11px] sm:text-xs">
                        {formatISTDateTime(item.meetingDate)}
                      </span>
                      <a
                        href={item?.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-[#D6451B] px-3 py-1 text-xs text-white flex items-center gap-1 font-bold hover:bg-orange-600 transition"
                      >
                        <FaVideo className="text-xs" />
                        <span>Join</span>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 py-4 text-center">
                  No classes scheduled today.
                </p>
              )}
            </div>
          </motion.div>

          {/* Announcements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs"
          >
            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              Announcements
            </h2>

            <div className="mt-4 space-y-2.5">
              {announcements?.length > 0 ? (
                announcements.map((item) => (
                  <div
                    key={item?._id || item?.title}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                  >
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {item?.title}
                    </h3>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {formatISTDateTime(item?.publishAt || item?.createdAt)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 py-4 text-center">
                  No recent announcements.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
