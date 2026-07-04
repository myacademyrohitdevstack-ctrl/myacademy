"use client";

import DashboardSkeleton from "@/app/Skeletons/DashBoardSkeleton";
import useAuthStore from "@/store/authStore";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaMoneyBillWave,
  FaWallet,
  FaExclamationCircle,
  FaClock,
  FaUsers,
  FaChartLine,
  FaPlus,
  FaFileInvoiceDollar,
} from "react-icons/fa";
export default function FeeDashboard({
  data,
  statsLoading,
  permission,
}) {
  const user = useAuthStore((state) => state.user);

  const quickActions = [
    {
      action: "Collect Fee",
      path: "/admin-panel/fees/collect",
    },
    {
      action: "Pending Fees",
      path: "/admin-panel/fees/pending",
    },
    {
      action: "Transactions",
      path: "/admin-panel/fees/history",
    },
    {
      action: "Reports",
      path: "/admin-panel/fees/reports",
    },
  ];

  const stats = [
    {
      title: "Today's Collection",
      value: `₹${data?.todayCollection || 0}`,
      icon: <FaMoneyBillWave />,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Monthly Collection",
      value: `₹${data?.monthlyCollection || 0}`,
      icon: <FaWallet />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Pending Amount",
      value: `₹${data?.pendingAmount || 0}`,
      icon: <FaExclamationCircle />,
      color: "bg-orange-50 text-[#D6451B]",
    },
    {
      title: "Overdue Fees",
      value: data?.overdueStudents || 0,
      icon: <FaClock />,
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Students",
      value: data?.totalStudents || 0,
      icon: <FaUsers />,
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "Collection %",
      value: `${data?.collectionRate || 0}%`,
      icon: <FaChartLine />,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  if (statsLoading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="py-28">
      <div className="mx-auto max-w-7xl space-y-8 px-4 md:px-0">
        <motion.section
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  className="overflow-hidden rounded-[32px] bg-gradient-to-r from-[#D6451B] to-[#ff855e] p-8 text-white shadow-xl"
>
  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

    <div>

      <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
        Fee Management
      </span>

      <h1 className="mt-6 text-4xl font-bold lg:text-5xl">
        Welcome Back, {user?.fullName} 💰
      </h1>

      <p className="mt-4 max-w-2xl leading-7 text-orange-100">
        Track fee collections, monitor pending payments,
        generate receipts and manage academy revenue from
        one centralized dashboard.
      </p>

    </div>

    <div className="hidden w-80 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-md lg:block">

      <div className="flex items-center justify-between">

        <h3 className="font-semibold">
          Revenue Overview
        </h3>

        <FaWallet />

      </div>

      <div className="mt-6 space-y-5">

        <div className="flex items-center justify-between">

          <span className="text-orange-100">
            Today's Collection
          </span>

          <span className="font-bold">
            ₹{data?.todayCollection || 0}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-orange-100">
            Pending Fees
          </span>

          <span className="font-bold">
            ₹{data?.pendingAmount || 0}
          </span>

        </div>

        <div className="flex items-center justify-between">

          <span className="text-orange-100">
            Collection Rate
          </span>

          <span className="font-bold">
            {data?.collectionRate || 0}%
          </span>

        </div>

      </div>

    </div>

  </div>
</motion.section>
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
<div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-xl sm:p-6 lg:p-8"
>
  <div className="flex items-center justify-between">

    <h2 className="text-xl font-bold sm:text-2xl">
      Revenue Overview
    </h2>

    <button
      className="text-sm font-medium text-[#D6451B] hover:underline"
    >
      View Report
    </button>

  </div>

  <div className="mt-8 h-[340px] rounded-3xl border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center">

    <div className="text-center">

      <FaChartLine className="mx-auto text-5xl text-slate-300" />

      <h3 className="mt-4 text-xl font-semibold">
        Revenue Analytics
      </h3>

      <p className="mt-2 text-slate-500">
        Monthly collection chart will appear here.
      </p>

    </div>

  </div>

  <div className="mt-8 grid gap-4 sm:grid-cols-3">

    <div className="rounded-2xl bg-green-50 p-5">

      <p className="text-sm text-slate-500">
        Total Revenue
      </p>

      <h3 className="mt-2 text-2xl font-bold text-green-600">
        ₹{data?.totalRevenue || 0}
      </h3>

    </div>

    <div className="rounded-2xl bg-orange-50 p-5">

      <p className="text-sm text-slate-500">
        Pending Revenue
      </p>

      <h3 className="mt-2 text-2xl font-bold text-[#D6451B]">
        ₹{data?.pendingAmount || 0}
      </h3>

    </div>

    <div className="rounded-2xl bg-blue-50 p-5">

      <p className="text-sm text-slate-500">
        Average Payment
      </p>

      <h3 className="mt-2 text-2xl font-bold text-blue-600">
        ₹{data?.averagePayment || 0}
      </h3>

    </div>

  </div>

</motion.div>
<div className="space-y-6">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
>

  <div className="flex items-center justify-between">

    <h2 className="text-xl font-bold">
      Today's Collections
    </h2>

    <FaMoneyBillWave className="text-[#D6451B]" />

  </div>

  <div className="mt-6 space-y-4">

    {data?.todayPayments?.length ? (

      data.todayPayments.map((payment) => (

        <div
          key={payment._id}
          className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
        >

          <div>

            <h3 className="font-semibold">
              {payment.student}
            </h3>

            <p className="text-sm text-slate-500">
              {payment.paymentMode}
            </p>

          </div>

          <span className="font-bold text-green-600">
            ₹{payment.amount}
          </span>

        </div>

      ))

    ) : (

      <div className="rounded-2xl border border-dashed border-slate-300 py-10 text-center">

        <p className="text-slate-500">
          No collections today.
        </p>

      </div>

    )}

  </div>

</motion.div>
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
>

  <h2 className="text-xl font-bold">
    Quick Actions
  </h2>

  <div className="mt-6 grid grid-cols-2 gap-4">

    {quickActions.map((action) => (

      <Link
        key={action.action}
        href={action.path}
        className="rounded-2xl border border-slate-200 p-4 text-center text-sm font-medium transition hover:border-[#D6451B] hover:bg-orange-50"
      >

        {action.action}

      </Link>

    ))}

  </div>

</motion.div>
</div>
</div>
<div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[28px] border border-slate-200 bg-white p-4 shadow-xl sm:p-6 lg:p-8"
>
  <div className="flex items-center justify-between">

    <h2 className="text-xl font-bold sm:text-2xl">
      Pending Fees
    </h2>

    <Link
      href="/admin-panel/fees/pending"
      className="text-sm font-medium text-[#D6451B] hover:underline"
    >
      View All
    </Link>

  </div>

  {/* Mobile */}

  <div className="mt-6 space-y-4 lg:hidden">

    {data?.pendingFees?.length ? (

      data.pendingFees.map((student) => (

        <div
          key={student._id}
          className="rounded-2xl border border-slate-200 p-4"
        >

          <h3 className="font-semibold">
            {student.name}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {student.batch}
          </p>

          <div className="mt-4 flex items-center justify-between">

            <span className="font-bold text-red-600">
              ₹{student.pending}
            </span>

            <Link
              href={`/admin-panel/fees/collect/${student._id}`}
              className="rounded-xl bg-[#D6451B] px-4 py-2 text-sm text-white"
            >
              Collect
            </Link>

          </div>

        </div>

      ))

    ) : (

      <div className="rounded-2xl border border-dashed border-slate-300 py-10 text-center">

        No Pending Fees 🎉

      </div>

    )}

  </div>

  {/* Desktop */}

  <div className="mt-8 hidden overflow-x-auto lg:block">

    <table className="w-full">

      <thead>

        <tr className="border-b border-slate-200">

          <th className="pb-4 text-left font-semibold">
            Student
          </th>

          <th className="pb-4 text-left font-semibold">
            Batch
          </th>

          <th className="pb-4 text-left font-semibold">
            Pending
          </th>

          <th className="pb-4 text-left font-semibold">
            Due Date
          </th>

          <th className="pb-4 text-left font-semibold">
            Action
          </th>

        </tr>

      </thead>

      <tbody>

        {data?.pendingFees?.map((student) => (

          <tr
            key={student._id}
            className="border-b border-slate-100"
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

            <td>

              {student.batch}

            </td>

            <td className="font-semibold text-red-600">

              ₹{student.pending}

            </td>

            <td>

              {student.dueDate}

            </td>

            <td>

              <Link
                href={`/admin-panel/fees/collect/${student._id}`}
                className="rounded-xl bg-[#D6451B] px-4 py-2 text-sm text-white"
              >
                Collect
              </Link>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  </div>

</motion.div>
<div className="space-y-6">
    <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl"
>

  <div className="flex items-center justify-between">

    <h2 className="text-xl font-bold">
      Recent Transactions
    </h2>

    <FaFileInvoiceDollar className="text-[#D6451B]" />

  </div>

  <div className="mt-6 space-y-4">

    {data?.recentTransactions?.length ? (

      data.recentTransactions.map((payment) => (

        <div
          key={payment._id}
          className="rounded-2xl border border-slate-200 p-4"
        >

          <div className="flex items-center justify-between">

            <div>

              <h3 className="font-semibold">

                {payment.student}

              </h3>

              <p className="mt-1 text-sm text-slate-500">

                {payment.paymentMode}

              </p>

            </div>

            <span className="font-bold text-green-600">

              ₹{payment.amount}

            </span>

          </div>

        </div>

      ))

    ) : (

      <div className="rounded-2xl border border-dashed border-slate-300 py-10 text-center">

        <p className="text-slate-500">

          No recent transactions.

        </p>

      </div>

    )}

  </div>

</motion.div>
</div>
</div>

</div>
</div>
);
}