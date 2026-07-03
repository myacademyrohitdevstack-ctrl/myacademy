"use client";


import DashboardSkeleton from "@/app/Skeletons/DashBoardSkeleton";
import useAuthStore from "@/store/authStore";

import { formatISTDateTime } from "@/Utils/formatDate";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaUsers,
  FaUserTie,
  FaBookOpen,
  FaLayerGroup,
  FaVideo,
  FaBell,
} from "react-icons/fa";







export default function Dashboard({
data,statsLoading,recentStudents,activitiesLoading,classes,classesLoading,annoucementsLoading,announcements,permission,role
}) {

  const user=useAuthStore(state=>state.user)
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

  if(statsLoading || classesLoading || annoucementsLoading || activitiesLoading) return <DashboardSkeleton></DashboardSkeleton>
  return (
    <div className="py-28">
    <div className="space-y-8 mx-auto max-w-7xl px-4 md:px-0 ">

      {/* Hero */}

      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#D6451B] to-[#ff855e] p-8 text-white shadow-xl"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              {user?.role} Dashboard
            </span>

            <h1 className="mt-6 text-4xl font-bold lg:text-5xl">
              Welcome Back, {user?.fullName} 👋
            </h1>

            <p className="mt-4 max-w-2xl text-orange-100 leading-7">
              Monitor admissions, manage students, track revenue,
              schedule live classes and oversee your academy from one
              powerful dashboard.
            </p>

           

          </div>

          {/* Overview Card */}

          <div className="rounded-3xl border hidden lg:block border-white/20 bg-white/10 p-6 backdrop-blur-md lg:w-80">

            <div className="flex items-center justify-between">

              <h3 className="font-semibold">
                 Overview
              </h3>

              <FaBell />

            </div>

            <div className="mt-6 space-y-5">

              <div className="flex items-center justify-between">

                <span className="text-orange-100">
                  Approved Students
                </span>

                <span className="font-bold">
                  {data?.approvedStudents || 0}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-orange-100">
                  Pending Students
                </span>

                <span className="font-bold">
                 {data?.pendingStudents || 0}
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-orange-100">
                  Block Students
                </span>

                <span className="font-bold">
                {data?.blockedStudents || 0}
                </span>

              </div>

            

            </div>

          </div>

        </div>

      </motion.section>

      {/* Statistics */}

      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">

        {stats.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg"
          >

            <div className="flex items-center justify-between">

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl ${item.color}`}
              >
                {item.icon}
              </div>

              {/* <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">
                <FaArrowUp />
                {item.growth}
              </span> */}

            </div>

            <h2 className="mt-6 text-4xl font-bold text-slate-900">
              {item.value}
            </h2>

            <p className="mt-2 text-slate-500">
              {item.title}
            </p>

          </motion.div>
        ))}

      </section>

           {/* Analytics + Quick Actions */}

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">

      <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-xl sm:p-6 lg:p-8"
>
  <div className="flex items-center justify-between gap-4">
    <h2 className="text-xl font-bold sm:text-2xl">
      Recent Admissions
    </h2>

    <button
      onClick={() => router.push("/admin-panel/students")}
      className="shrink-0 text-sm font-medium text-[#D6451B] hover:underline"
    >
      View All
    </button>
  </div>

  {/* Mobile Cards */}
  <div className="mt-6 space-y-4 lg:hidden">
    {recentStudents?.length > 0 ? (
      recentStudents.map((student) => (
        <div
          key={student?.id}
          className="rounded-2xl border border-slate-200 p-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 font-bold text-[#D6451B]">
              {student?.name?.charAt(0)}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="truncate font-semibold text-slate-900">
                {student?.name}
              </h3>

              <p className="truncate text-sm text-slate-500">
                {student?.course}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-slate-500">
                Batch
              </p>

              <p className="mt-1 text-sm font-medium text-slate-800">
                {student?.batch}
              </p>
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Status
              </p>

              <span
                className={`mt-1 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  student?.status === "approved"
                    ? "bg-green-100 text-green-600"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {student?.status}
              </span>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="rounded-2xl border border-dashed border-slate-300 py-10 text-center">
        <p className="text-slate-500">
          No recent admissions found
        </p>
      </div>
    )}
  </div>

  {/* Desktop Table */}
  <div className="mt-8 hidden overflow-x-auto lg:block">
    <table className="w-full">
      <thead>
        <tr className="border-b border-slate-200">
          <th className="pb-4 text-left font-semibold">
            Student
          </th>

          <th className="pb-4 text-left font-semibold">
            Course
          </th>

          <th className="pb-4 text-left font-semibold">
            Batch
          </th>

          <th className="pb-4 text-left font-semibold">
            Status
          </th>
        </tr>
      </thead>

      <tbody>
        {recentStudents?.map((student) => (
          <tr
            key={student?.id}
            className="border-b border-slate-100 last:border-none"
          >
            <td className="py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-bold text-[#D6451B]">
                  {student?.name?.charAt(0)}
                </div>

                <span className="font-medium">
                  {student?.name}
                </span>
              </div>
            </td>

            <td className="max-w-[220px] truncate">
              {student?.course}
            </td>

            <td className="max-w-[180px] truncate">
              {student?.batch}
            </td>

            <td>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  student?.status === "approved"
                    ? "bg-green-100 text-green-600"
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

        <div className="space-y-6">

          {/* Attendance */}

          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
          >

            <h2 className="text-xl font-bold">
              Attendance
            </h2>

            <div className="mt-8 flex justify-center">

              <div className="relative flex h-48 w-48 items-center justify-center rounded-full border-[18px] border-orange-100">

                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "conic-gradient(#D6451B 92%, #FDE7DF 92%)",
                    borderRadius: "9999px",
                  }}
                />

                <div className="absolute flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white">

                  <h3 className="text-4xl font-bold text-[#D6451B]">
                    92%
                  </h3>

                  <p className="text-sm text-slate-500">
                    Present
                  </p>

                </div>

              </div>

            </div>

          </motion.div> */}

          {/* Quick Actions */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
          >

            <h2 className="text-xl font-bold">
              Quick Actions
            </h2>

            <div className="mt-6 grid grid-cols-2 gap-4">

              {allowedActions.map(({action,path}) => (
                <Link
                  key={action}
                  href={path}
                  className="rounded-2xl border border-slate-200 p-4 text-sm font-medium transition hover:border-[#D6451B] hover:bg-orange-50"
                >
                  {action}
                </Link>
              ))}

            </div>

          </motion.div>

        </div>

      </div>
<div className="grid gap-6 xl:grid-cols-[2fr_1fr]">

 

<div className="space-y-6">

    {/* Today's Classes */}

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
    >

      <h2 className="text-xl font-bold">
        Today's Classes
      </h2>

      <div className="mt-6 space-y-4">

        {classes?.map((item) => (

          <div
            key={item?._id}
            className="rounded-2xl bg-slate-50 p-4"
          >

            <h3 className="font-semibold">
              {item?.title}
            </h3>

        

            <div className="mt-3 flex items-center justify-between">

              <span className="text-[#D6451B] font-medium">
                {formatISTDateTime(item.meetingDate)}
              </span>

              <a href={item?.meetingLink} className="rounded-xl bg-[#D6451B] px-4 py-2 text-sm text-white">
                <FaVideo></FaVideo>
              </a>

            </div>

          </div>

        ))}

      </div>

    </motion.div>

    {/* Payments */}

    {/* <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
    >

      <h2 className="text-xl font-bold">
        Recent Payments
      </h2>

      <div className="mt-6 space-y-4">

        {payments.map((payment) => (

          <div
            key={payment.student}
            className="flex items-center justify-between rounded-2xl border p-4"
          >

            <div>

              <h3 className="font-semibold">
                {payment.student}
              </h3>

              <p className="text-sm text-slate-500">
                {payment.amount}
              </p>

            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs ${
                payment.status === "Paid"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {payment.status}
            </span>

          </div>

        ))}

      </div>

    </motion.div> */}

    {/* Announcements */}

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
    >

      <h2 className="text-xl font-bold">
        Announcements
      </h2>

      <div className="mt-6 space-y-4">

        {announcements?.map((item) => (

          <div
            key={item.title}
            className="rounded-2xl border p-4"
          >

            <h3 className="font-semibold">
              {item?.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {formatISTDateTime(item?.publishAt)}
            </p>

          </div>

        ))}

      </div>

    </motion.div>

  </div>

</div>
    </div></div>
  );
}