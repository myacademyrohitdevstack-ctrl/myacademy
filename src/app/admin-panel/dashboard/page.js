"use client";

import CommingSoon from "@/app/Components/ui/CommingSoon";
import { useAdminGetStats } from "@/Hooks/useAdminGetStats";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaUsers,
  FaUserTie,
  FaBookOpen,
  FaLayerGroup,
  FaVideo,
  FaRupeeSign,
  FaArrowUp,
  FaArrowRight,
  FaBell,
  FaPlus,
} from "react-icons/fa";
const recentStudents = [
  {
    name: "Anjali Sharma",
    course: "General English",
    batch: "Morning Batch",
    status: "Active",
  },
  {
    name: "Rahul Verma",
    course: "IELTS",
    batch: "Evening Batch",
    status: "Pending",
  },
  {
    name: "Priya Singh",
    course: "Spoken English",
    batch: "Weekend",
    status: "Active",
  },
  {
    name: "Amit Kumar",
    course: "Business English",
    batch: "Morning",
    status: "Active",
  },
];

const liveClasses = [
  {
    title: "Speaking Practice",
    trainer: "John Smith",
    time: "10:00 AM",
  },
  {
    title: "IELTS Writing",
    trainer: "Emma Johnson",
    time: "2:00 PM",
  },
  {
    title: "Grammar Workshop",
    trainer: "David Wilson",
    time: "5:00 PM",
  },
];

const payments = [
  {
    student: "Anjali Sharma",
    amount: "₹12,000",
    status: "Paid",
  },
  {
    student: "Rahul Verma",
    amount: "₹8,000",
    status: "Pending",
  },
  {
    student: "Priya Singh",
    amount: "₹10,000",
    status: "Paid",
  },
];

const announcements = [
  {
    title: "Holiday Notice",
    date: "18 Jun",
  },
  {
    title: "IELTS Mock Test",
    date: "20 Jun",
  },
  {
    title: "New Batch Starts",
    date: "25 Jun",
  },
];

const quickActions=[
  {action:"New Course",path:"/admin-panel/add-course"},
  {action:"Create Batch",path:"/admin-panel/add-course"},
  {action:"Add Student",path:""},
  {action:"Add Trainer",path:""},
  {action:" Announcement",path:"/admin-panel/add-announcement"},
  {action:" ClassLink",path:"/admin-panel/add-classLink"},
  {action:"Add Material",path:"/admin-panel/add-notes"},
]
export default function Dashboard() {
  const {data,isLoading}=useAdminGetStats()
   const stats = [
  {
    title: "Total Students",
    value: data?.totalStudents,
    growth: "+12%",
    icon: <FaUsers />,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Active Trainers",
    value: "24",
    growth: "+3%",
    icon: <FaUserTie />,
    color: "bg-violet-50 text-violet-600",
  },
  {
    title: "Courses",
    value: data?.totalCourses,
    growth: "+5%",
    icon: <FaBookOpen />,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Batches",
    value: data?.totalBatches,
    growth: "+8%",
    icon: <FaLayerGroup />,
    color: "bg-orange-50 text-[#D6451B]",
  },
  {
    title: "Today's Classes",
    value: "16",
    growth: "+2",
    icon: <FaVideo />,
    color: "bg-red-50 text-red-600",
  },
  {
    title: "Monthly Revenue",
    value: "₹8.4L",
    growth: "+18%",
    icon: <FaRupeeSign />,
    color: "bg-emerald-50 text-emerald-600",
  },
];

  if(isLoading) return
  return (
    <div className="py-28">
    <div className="space-y-8 mx-auto max-w-7xl px-2 ">

      {/* Hero */}

      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#D6451B] to-[#ff855e] p-8 text-white shadow-xl"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
              Admin Dashboard
            </span>

            <h1 className="mt-6 text-4xl font-bold lg:text-5xl">
              Welcome Back, Admin 👋
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

        {/* Revenue Overview */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl relative"
        >
       <CommingSoon></CommingSoon>
          <div className="flex items-center justify-between">

            <div>

              <h2 className="text-2xl font-bold text-slate-900">
                Revenue Overview
              </h2>

              <p className="mt-2 text-slate-500">
                Monthly academy income
              </p>

            </div>

            <button className="rounded-xl border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50">
              This Month
            </button>

          </div>

          {/* Placeholder Chart */}

          <div className="mt-10 flex h-72 items-end justify-between gap-4">

            {[45, 60, 80, 70, 95, 75, 100, 88, 110, 95, 120, 130].map(
              (height, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={{ height }}
                  transition={{ delay: index * 0.05 }}
                  className="flex-1 rounded-t-full bg-gradient-to-t from-[#D6451B] to-orange-300"
                />
              )
            )}

          </div>

          <div className="mt-6 flex justify-between text-sm text-slate-500">

            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>

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

              {quickActions.map(({action,path}) => (
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

  {/* Recent Students */}

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
  >

    <div className="flex items-center justify-between">

      <h2 className="text-2xl font-bold">
        Recent Admissions
      </h2>

      <button className="text-[#D6451B] font-medium">
        View All
      </button>

    </div>

    <div className="mt-8 overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b">

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

          {recentStudents.map((student) => (

            <tr
              key={student.name}
              className="border-b last:border-none"
            >

              <td className="py-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 font-bold text-[#D6451B]">

                    {student.name.charAt(0)}

                  </div>

                  <span className="font-medium">
                    {student.name}
                  </span>

                </div>

              </td>

              <td>{student.course}</td>

              <td>{student.batch}</td>

              <td>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    student.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {student.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </motion.div>

  {/* Right */}

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

        {liveClasses.map((item) => (

          <div
            key={item.title}
            className="rounded-2xl bg-slate-50 p-4"
          >

            <h3 className="font-semibold">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {item.trainer}
            </p>

            <div className="mt-3 flex items-center justify-between">

              <span className="text-[#D6451B] font-medium">
                {item.time}
              </span>

              <button className="rounded-xl bg-[#D6451B] px-4 py-2 text-sm text-white">
                Manage
              </button>

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

        {announcements.map((item) => (

          <div
            key={item.title}
            className="rounded-2xl border p-4"
          >

            <h3 className="font-semibold">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {item.date}
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