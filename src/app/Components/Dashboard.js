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
  FaCrown,
  FaCheckCircle,
  FaExclamationTriangle,
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
  subscriptionUsage,
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

      {/* SaaS Plan & Resource Quotas Banner for Admin */}
      {role === "admin" && subscriptionUsage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-[#D6451B]">
                <FaCrown className="text-base" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    {subscriptionUsage.plan?.name || "Active SaaS Plan"}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase ${
                      subscriptionUsage.isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {subscriptionUsage.subscription?.isTrial ? "Free Trial" : subscriptionUsage.isActive ? "Active" : "Expired"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {subscriptionUsage.isActive
                    ? "Enforced by backend • Real-time resource quota monitoring"
                    : subscriptionUsage.statusReason || "Subscription requires renewal"}
                </p>
              </div>
            </div>

            {subscriptionUsage.subscription?.trialEndsAt && subscriptionUsage.subscription?.isTrial && (
              <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-xl border border-amber-200 self-start sm:self-auto">
                Trial ends: {new Date(subscriptionUsage.subscription.trialEndsAt).toLocaleDateString("en-IN")}
              </span>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {[
              { label: "Students Quota", data: subscriptionUsage.usage?.students, icon: FaUsers },
              { label: "Courses Quota", data: subscriptionUsage.usage?.courses, icon: FaBookOpen },
              { label: "Batches Quota", data: subscriptionUsage.usage?.batches, icon: FaLayerGroup },
              { label: "Faculty / Staff", data: subscriptionUsage.usage?.staff, icon: FaUserTie },
            ].map((q) => {
              const Icon = q.icon;
              const isExceeded = q.data?.isExceeded;
              const percent = q.data?.percent || 0;
              return (
                <div key={q.label} className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-600 flex items-center gap-1.5">
                      <Icon className="text-xs text-slate-400" /> {q.label}
                    </span>
                    <span className={`font-extrabold ${isExceeded ? "text-rose-600" : percent >= 80 ? "text-amber-600" : "text-slate-800"}`}>
                      {q.data?.current} / {q.data?.limit}
                    </span>
                  </div>
                  {!q.data?.isUnlimited && (
                    <div className="mt-2 h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          isExceeded ? "bg-rose-500" : percent >= 80 ? "bg-amber-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  )}
                  <p className="mt-1 text-[10px] text-slate-400 font-medium">
                    {q.data?.isUnlimited
                      ? "Unlimited allocation"
                      : isExceeded
                      ? "Limit reached! Upgrade needed"
                      : `${q.data?.remaining} slots available`}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

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
          <div className="mt-4 space-y-3 sm:hidden">
            {recentStudents?.length > 0 ? (
              recentStudents.map((item) => (
                <div
                  key={item?._id || item?.student?.email}
                  className="rounded-xl border border-slate-100 bg-slate-50/70 p-3"
                >
                  <p className="font-bold text-xs text-slate-900">
                    {item?.student?.fullName}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {item?.student?.email}
                  </p>
                  <p className="mt-1 text-[11px] font-semibold text-slate-600">
                    Course: {item?.course?.title}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">
                No recent admissions.
              </p>
            )}
          </div>

          {/* Desktop Table */}
          <div className="mt-4 hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="pb-3 font-semibold">Student</th>
                  <th className="pb-3 font-semibold">Course</th>
                  <th className="pb-3 font-semibold">Enrolled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {recentStudents?.length > 0 ? (
                  recentStudents.map((item) => (
                    <tr
                      key={item?._id || item?.student?.email}
                      className="hover:bg-slate-50/70 transition-colors"
                    >
                      <td className="py-3">
                        <div className="font-bold text-slate-900">
                          {item?.student?.fullName}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {item?.student?.email}
                        </div>
                      </td>
                      <td className="py-3 text-slate-600 font-semibold">
                        {item?.course?.title}
                      </td>
                      <td className="py-3 text-slate-400 text-xs">
                        {formatISTDateTime(item?.createdAt)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className="text-center py-6 text-xs text-slate-400"
                    >
                      No recent admissions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Right Sidebar: Quick Actions + Today's Schedule */}
        <div className="space-y-5 sm:space-y-6">
          {/* Quick Actions */}
          {allowedActions.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs"
            >
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Quick Actions
              </h2>

              <div className="mt-4 flex flex-col gap-2.5">
                {allowedActions.map((item) => (
                  <button
                    key={item.action}
                    onClick={() => router.push(item.path)}
                    className="w-full rounded-xl bg-orange-50 px-4 py-2.5 text-xs sm:text-sm font-bold text-[#D6451B] hover:bg-orange-100 transition-colors text-left"
                  >
                    + {item.action}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Today's Classes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Today's Classes
              </h2>
              <FaVideo className="text-slate-400 text-sm" />
            </div>

            <div className="mt-4 space-y-2.5">
              {classes?.length > 0 ? (
                classes.map((item) => (
                  <div
                    key={item?._id || item?.title}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                        {item?.title}
                      </h3>
                      <p className="text-[11px] text-slate-400">
                        {formatISTDateTime(item?.meetingDate)}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <a
                        href={item?.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-lg bg-[#D6451B] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#b93814] transition-colors"
                      >
                        Join
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
