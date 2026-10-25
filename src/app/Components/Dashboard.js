"use client";

import { useMemo } from "react";
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
  FaClock,
  FaChartPie,
  FaCalendarCheck,
  FaArrowRight,
  FaUserGraduate,
} from "react-icons/fa";
import {
  StatCard,
  ChartCard,
  DonutChart,
  ComparisonBarChart,
  ProgressBar,
} from "@/app/Components/visual-ui";

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
      path: `/${role === "teacher" ? "teacher" : "admin"}-panel/add-announcement`,
      permission: "canAddAnnouncement",
    },
  ];

  const allowedActions = quickActions.filter(
    (item) => permission[item.permission]
  );

  // Student distribution data for Donut Chart
  const studentDistribution = useMemo(() => {
    return [
      { name: "Approved", value: data?.approvedStudents || 0, color: "#10B981" },
      { name: "Pending", value: data?.pendingStudents || 0, color: "#F59E0B" },
      { name: "Blocked", value: data?.blockedStudents || 0, color: "#F43F5E" },
    ];
  }, [data]);

  // Attendance bar chart data from recent sessions
  const attendanceChartData = useMemo(() => {
    if (!data?.recentAttendanceSessions || data.recentAttendanceSessions.length === 0) {
      return [];
    }

    return data.recentAttendanceSessions.slice(0, 6).map((session, idx) => {
      const present = session.records?.filter((r) => r.status === "present").length || 0;
      const absent = session.records?.filter((r) => r.status === "absent").length || 0;
      const leave = session.records?.filter((r) => r.status === "leave").length || 0;
      const name = session.batchName || session.batch?.name || `Cohort ${idx + 1}`;
      const shortName = name.length > 10 ? `${name.slice(0, 9)}…` : name;

      return {
        label: shortName,
        Present: present,
        Absent: absent,
        Leave: leave,
      };
    });
  }, [data]);

  if (statsLoading || classesLoading || annoucementsLoading || activitiesLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-5 sm:space-y-6 lg:space-y-8 min-w-0">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-[#ff855e] p-4 sm:p-6 lg:p-8 text-white shadow-lg min-w-0"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between min-w-0">
          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
              {role === "admin" ? "Academy Operations" : "Teacher Console"}
            </span>

            <h1 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl tracking-tight truncate">
              Welcome Back, {user?.fullName || "Administrator"} 👋
            </h1>

            <p className="mt-2 text-xs sm:text-sm lg:text-base max-w-2xl text-orange-100 leading-relaxed font-normal">
              Monitor admissions, cohort attendance, live class timetables, and academic operations from one unified visual console.
            </p>
          </div>

          {/* Quick Overview Card */}
          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md lg:w-80 shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-xs sm:text-sm tracking-wide uppercase text-orange-100">
                Admissions Snapshot
              </h3>
              <FaUsers className="text-sm opacity-80" />
            </div>

            <div className="mt-3 space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center justify-between">
                <span className="text-orange-100 font-medium">Approved Students</span>
                <span className="font-black text-white">{data?.approvedStudents || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-100 font-medium">Pending Review</span>
                <span className="font-black text-amber-200">{data?.pendingStudents || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-orange-100 font-medium">Blocked Accounts</span>
                <span className="font-black text-rose-200">{data?.blockedStudents || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SaaS Plan Quota Gauges for Admin */}
      {role === "admin" && subscriptionUsage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-[#D6451B]">
                <FaCrown className="text-lg" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    {subscriptionUsage.plan?.name || "Active SaaS Plan"}
                  </h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase ${
                      subscriptionUsage.isActive
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {subscriptionUsage.subscription?.isTrial
                      ? "Free Trial"
                      : subscriptionUsage.isActive
                      ? "Active"
                      : "Expired"}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {subscriptionUsage.isActive
                    ? "Real-time tenant resource allocation & capacity monitoring"
                    : subscriptionUsage.statusReason || "Subscription requires renewal"}
                </p>
              </div>
            </div>

            {subscriptionUsage.subscription?.trialEndsAt && subscriptionUsage.subscription?.isTrial && (
              <span className="text-xs font-bold text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 self-start sm:self-auto">
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
                <div key={q.label} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5 truncate">
                      <Icon className="text-xs text-slate-400" /> {q.label}
                    </span>
                    <span className={`font-black ${isExceeded ? "text-rose-600" : percent >= 80 ? "text-amber-600" : "text-slate-900"}`}>
                      {q.data?.current} / {q.data?.limit}
                    </span>
                  </div>

                  {!q.data?.isUnlimited && (
                    <ProgressBar
                      percentage={percent}
                      colorScheme={isExceeded ? "rose" : percent >= 80 ? "amber" : "emerald"}
                      height="h-1.5"
                      showPercentage={false}
                    />
                  )}

                  <p className="text-[10px] text-slate-400 font-semibold truncate">
                    {q.data?.isUnlimited
                      ? "Unlimited allocation"
                      : isExceeded
                      ? "Limit reached! Upgrade plan"
                      : `${q.data?.remaining} slots remaining`}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Primary KPI Grid (StatCards) */}
      <section className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 min-w-0">
        <StatCard
          title="Total Students"
          value={data?.totalStudents || 0}
          icon={FaUsers}
          color="blue"
          trend="+12%"
          trendDirection="up"
          subText={`${data?.approvedStudents || 0} active enrollment`}
          onClick={() => router.push("/admin-panel/student")}
        />

        {role === "admin" ? (
          <StatCard
            title="Active Faculty"
            value={data?.totalTeachers || 0}
            icon={FaUserTie}
            color="purple"
            trend="+3%"
            trendDirection="up"
            subText="Assigned instructors"
            onClick={() => router.push("/admin-panel/teachers")}
          />
        ) : (
          <StatCard
            title="My Cohorts"
            value={data?.totalBatches || 0}
            icon={FaLayerGroup}
            color="orange"
            trend="+5%"
            trendDirection="up"
            subText="Assigned batches"
          />
        )}

        <StatCard
          title="Curriculum Courses"
          value={data?.totalCourses || 0}
          icon={FaBookOpen}
          color="emerald"
          trend="+5%"
          trendDirection="up"
          subText={`${data?.publishedCourses || data?.totalCourses || 0} published`}
          onClick={() => router.push(role === "admin" ? "/admin-panel/courses" : "/teacher-panel/courses")}
        />

        <StatCard
          title="Attendance Sessions"
          value={data?.totalAttendanceSessions ?? 0}
          icon={FaCheckCircle}
          color="amber"
          trend="Live"
          trendDirection="neutral"
          subText="Recorded roll calls"
          onClick={() => router.push(role === "admin" ? "/admin-panel/attendence" : "/teacher-panel/mark-attendence")}
        />
      </section>

      {/* Visual Analytics Row: Attendance Sessions Chart + Student Distribution Donut */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 min-w-0">
        {/* Recent Attendance Breakdown Chart (2 Cols) */}
        <div className="lg:col-span-2 min-w-0">
          <ChartCard
            title="Recent Cohort Attendance"
            subtitle="Roll call breakdown across active batch sessions"
            icon={FaCalendarCheck}
            actions={
              <Link
                href={role === "teacher" ? "/teacher-panel/mark-attendence" : "/admin-panel/attendence"}
                className="text-xs font-bold text-[#D6451B] hover:underline flex items-center gap-1"
              >
                <span>View Register</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            }
          >
            {attendanceChartData.length > 0 ? (
              <ComparisonBarChart
                data={attendanceChartData}
                xAxisKey="label"
                bars={[
                  { key: "Present", name: "Present", color: "#10B981" },
                  { key: "Leave", name: "Leave", color: "#F59E0B" },
                  { key: "Absent", name: "Absent", color: "#F43F5E" },
                ]}
                height={230}
                showLegend={true}
              />
            ) : (
              <div className="flex h-48 flex-col items-center justify-center text-center p-6 text-slate-400">
                <FaCalendarCheck className="text-3xl text-slate-300 mb-2" />
                <p className="text-xs font-semibold text-slate-600">
                  No attendance sessions marked yet today.
                </p>
                <Link
                  href={role === "teacher" ? "/teacher-panel/mark-attendence" : "/admin-panel/attendence"}
                  className="mt-2 text-xs font-bold text-[#D6451B] hover:underline"
                >
                  Mark Daily Attendance &rarr;
                </Link>
              </div>
            )}
          </ChartCard>
        </div>

        {/* Student Enrollment Distribution Donut (1 Col) */}
        <div className="min-w-0">
          <ChartCard
            title="Admissions Split"
            subtitle="Current status breakdown"
            icon={FaChartPie}
          >
            <DonutChart
              data={studentDistribution}
              nameKey="name"
              valueKey="value"
              height={190}
              innerRadius={50}
              outerRadius={70}
              centerValue={String(data?.totalStudents || 0)}
              centerLabel="Students"
              showLegend={true}
            />
          </ChartCard>
        </div>
      </div>

      {/* Admissions Activity + Schedules Column */}
      <div className="grid gap-5 sm:gap-6 xl:grid-cols-[2fr_1fr] min-w-0">
        {/* Recent Admissions Visual Table */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-6 lg:p-7 shadow-xs min-w-0"
        >
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#D6451B] border border-orange-200/60 text-sm">
                <FaUserGraduate />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Recent Admissions
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Latest students enrolled in academy cohorts
                </p>
              </div>
            </div>

            <button
              onClick={() => router.push("/admin-panel/student")}
              className="shrink-0 text-xs font-bold text-[#D6451B] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <FaArrowRight className="text-[10px]" />
            </button>
          </div>

          {/* Mobile Card List (< 640px) */}
          <div className="mt-4 space-y-2.5 sm:hidden">
            {recentStudents?.length > 0 ? (
              recentStudents.map((item, index) => {
                const studentName =
                  item?.student?.fullName || item?.fullName || item?.name || "Enrolled Student";
                const studentEmail = item?.student?.email || item?.email || "";
                const courseTitle =
                  typeof item?.course === "object"
                    ? item?.course?.title || "General Cohort"
                    : item?.course || item?.batch || "General Cohort";

                return (
                  <div
                    key={item?._id || item?.id || studentEmail || index}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/70 min-w-0"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1 pr-2">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#D6451B] font-bold text-xs border border-orange-200">
                        {studentName.charAt(0) || "S"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-extrabold text-xs text-slate-900 truncate">
                          {studentName}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">
                          {courseTitle}
                        </p>
                      </div>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800 shrink-0">
                      Enrolled
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 py-6 text-center">
                No recent student enrollments found.
              </p>
            )}
          </div>

          {/* Desktop Table (>= 640px) */}
          <div className="mt-4 hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                <tr>
                  <th className="pb-3">Student</th>
                  <th className="pb-3">Course / Cohort</th>
                  <th className="pb-3">Enrolled At</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {recentStudents?.length > 0 ? (
                  recentStudents.map((item, index) => {
                    const studentName =
                      item?.student?.fullName || item?.fullName || item?.name || "Enrolled Student";
                    const studentEmail = item?.student?.email || item?.email || "";
                    const courseTitle =
                      typeof item?.course === "object"
                        ? item?.course?.title || "General Cohort"
                        : item?.course || item?.batch || "General Cohort";
                    const dateValue = item?.createdAt || item?.enrolledAt;

                    return (
                      <tr
                        key={item?._id || item?.id || studentEmail || index}
                        className="hover:bg-slate-50/70 transition-colors"
                      >
                        <td className="py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-100 text-[#D6451B] font-bold text-xs border border-orange-200">
                              {studentName.charAt(0) || "S"}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                                {studentName}
                              </p>
                              {studentEmail && (
                                <p className="text-[11px] text-slate-400 truncate">
                                  {studentEmail}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-slate-600 font-semibold text-xs sm:text-sm">
                          {courseTitle}
                        </td>
                        <td className="py-3 text-slate-400 text-xs">
                          {dateValue ? formatISTDateTime(dateValue) : "Recently"}
                        </td>
                        <td className="py-3 text-right">
                          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                            Active
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-8 text-xs text-slate-400">
                      No recent admissions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Right Sidebar: Quick Actions + Schedule + Announcements */}
        <div className="space-y-4 sm:space-y-6 min-w-0">
          {/* Quick Actions */}
          {allowedActions.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs"
            >
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500">
                Quick Operations
              </h2>

              <div className="mt-3 flex flex-col gap-2">
                {allowedActions.map((item) => (
                  <button
                    key={item.action}
                    onClick={() => router.push(item.path)}
                    className="w-full flex items-center justify-between rounded-xl bg-orange-50/70 border border-orange-100 px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#D6451B] hover:bg-orange-100 transition-colors text-left cursor-pointer"
                  >
                    <span>+ {item.action}</span>
                    <FaArrowRight className="text-[10px] text-orange-400" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Today's Classes */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FaVideo className="text-[#D6451B] text-xs" />
                <h3 className="text-sm font-bold text-slate-900">
                  Today&apos;s Live Classes
                </h3>
              </div>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">
                {classes?.length || 0} scheduled
              </span>
            </div>

            <div className="mt-3 space-y-2.5">
              {classes?.length > 0 ? (
                classes.map((item) => (
                  <div
                    key={item?._id || item?.title}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 flex items-center justify-between gap-3 min-w-0"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {item?.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 truncate">
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
            className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FaBell className="text-amber-500 text-xs" />
                <h3 className="text-sm font-bold text-slate-900">
                  Broadcast Notices
                </h3>
              </div>
              <Link
                href={role === "teacher" ? "/teacher-panel/add-announcement" : "/admin-panel/add-announcement"}
                className="text-xs font-bold text-[#D6451B] hover:underline"
              >
                + Post
              </Link>
            </div>

            <div className="mt-3 space-y-2.5">
              {announcements?.length > 0 ? (
                announcements.slice(0, 4).map((item) => (
                  <div
                    key={item?._id || item?.title}
                    className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 min-w-0"
                  >
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {item?.title}
                    </h4>
                    <p className="mt-1 text-[11px] text-slate-400">
                      {formatISTDateTime(item?.publishAt || item?.createdAt)}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 py-4 text-center">
                  No active announcements.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
