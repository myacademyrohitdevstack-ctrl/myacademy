"use client";

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
  FaArrowRight,
  FaCheckCircle,
  FaReceipt,
  FaCashRegister,
  FaSpinner,
} from "react-icons/fa";
import FeesNav from "../components/FeesNav";
import { useFeesDashboard, usePendingFees, useFeePayments } from "@/Hooks/useFees";

export default function FeeDashboard({ data: propData, statsLoading: propLoading }) {
  const { data: dashboardData, isLoading: isDashLoading } = useFeesDashboard();
  const { data: pendingData, isLoading: isPendingLoading } = usePendingFees({ limit: 5 });
  const { data: paymentsData, isLoading: isPaymentsLoading } = useFeePayments({ limit: 5 });

  const isLoading = propLoading || isDashLoading;

  // Strict server data mapping without dummy fallbacks
  const data = propData || {
    todayCollection: dashboardData?.today?.amount ?? 0,
    monthlyCollection: dashboardData?.totalCollected ?? 0,
    pendingAmount: dashboardData?.totalOutstanding ?? 0,
    overdueStudents: pendingData?.length ?? 0,
    totalStudents: dashboardData?.activeStudents ?? 0,
    collectionRate: dashboardData?.realizationRate ?? 0,
    pendingFees:
      pendingData && pendingData.length > 0
        ? pendingData.map((f) => ({
            _id: f.student?._id || f._id,
            name: f.student?.fullName || "Student",
            batch: f.batch?.name || "General Batch",
            pending: f.balanceAmount || 0,
            dueDate: f.nextDueDate
              ? new Date(f.nextDueDate).toLocaleDateString("en-IN")
              : "Pending",
            phone: f.student?.phone || "N/A",
          }))
        : [],
    recentCollections:
      paymentsData?.data && paymentsData.data.length > 0
        ? paymentsData.data.map((p) => ({
            _id: p._id,
            studentName: p.student?.fullName || "Student",
            batch: p.batch?.name || "Enrolled Batch",
            amount: p.amount || 0,
            mode: p.mode || "UPI",
            date: new Date(p.paidAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              hour: "2-digit",
              minute: "2-digit",
            }),
            receiptNo: p.receiptNo || "REC-N/A",
          }))
        : [],
  };

  const quickActions = [
    {
      action: "Collect Fee",
      desc: "Record payment & print receipt",
      path: "/admin-panel/fees/collect",
      icon: FaCashRegister,
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      action: "Pending Dues",
      desc: `${data.overdueStudents} pending records`,
      path: "/admin-panel/fees/pending",
      icon: FaClock,
      color: "bg-rose-50 text-rose-600 border-rose-100",
    },
    {
      action: "Transactions",
      desc: "All payments & receipts",
      path: "/admin-panel/fees/transactions",
      icon: FaReceipt,
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      action: "Financial Reports",
      desc: "Revenue & collection charts",
      path: "/admin-panel/fees/reports",
      icon: FaChartLine,
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
  ];

  const stats = [
    {
      title: "Today's Collection",
      value: `₹${(data?.todayCollection || 0).toLocaleString("en-IN")}`,
      icon: <FaMoneyBillWave />,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Total Collected",
      value: `₹${(data?.monthlyCollection || 0).toLocaleString("en-IN")}`,
      icon: <FaWallet />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Pending Dues",
      value: `₹${(data?.pendingAmount || 0).toLocaleString("en-IN")}`,
      icon: <FaExclamationCircle />,
      color: "bg-orange-50 text-[#D6451B]",
    },
    {
      title: "Pending Accounts",
      value: data?.overdueStudents || 0,
      icon: <FaClock />,
      color: "bg-red-50 text-red-600",
    },
    {
      title: "Active Students",
      value: data?.totalStudents || 0,
      icon: <FaUsers />,
      color: "bg-violet-50 text-violet-600",
    },
    {
      title: "Collection Efficiency",
      value: `${data?.collectionRate || 0}%`,
      icon: <FaChartLine />,
      color: "bg-emerald-50 text-emerald-600",
    },
  ];

  return (
    <div className="w-full min-w-0">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6 px-1 sm:px-6 lg:px-8 w-full min-w-0">
        {/* Fees Sub Navigation */}
        <FeesNav />

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between min-w-0">
            <div className="min-w-0 flex-1">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                Financial Operations
              </span>

              <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                Fees & Finance Dashboard
              </h1>

              <p className="mt-2 text-xs sm:text-sm lg:text-base max-w-2xl text-orange-100 leading-relaxed font-normal">
                Manage student fee collection, track pending dues across all batches, generate official receipts, and audit financial inflows.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <Link
                  href="/admin-panel/fees/collect"
                  className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-[#D6451B] shadow-xs hover:bg-orange-50 transition"
                >
                  <FaPlus className="text-xs" />
                  <span>Collect Fee</span>
                </Link>

                <Link
                  href="/admin-panel/fees/pending"
                  className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition"
                >
                  <FaClock className="text-xs" />
                  <span>View Pending ({data.overdueStudents})</span>
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md shrink-0 lg:w-72">
              <div className="flex items-center justify-between">
                <p className="text-xs text-orange-100 font-semibold uppercase tracking-wider">
                  Pending Dues
                </p>
                {data.pendingAmount > 0 && (
                  <span className="rounded-full bg-rose-500/80 px-2 py-0.5 text-[10px] font-bold text-white">
                    Action Required
                  </span>
                )}
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold">
                ₹{(data?.pendingAmount || 0).toLocaleString("en-IN")}
              </h2>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/20">
                <div
                  style={{ width: `${Math.min(100, Math.max(0, data?.collectionRate || 0))}%` }}
                  className="h-full rounded-full bg-white transition-all duration-500"
                />
              </div>
              <p className="mt-2 text-[11px] text-orange-100">
                {data?.collectionRate || 0}% overall collection recovery
              </p>
            </div>
          </div>
        </motion.section>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
          {quickActions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.action}
                href={item.path}
                className="group flex flex-col justify-between rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs hover:border-orange-300 hover:shadow-md transition min-w-0"
              >
                <div>
                  <div
                    className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border text-sm sm:text-base font-bold ${item.color}`}
                  >
                    <Icon />
                  </div>
                  <h3 className="mt-3 text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#D6451B] transition truncate">
                    {item.action}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500 truncate">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[#D6451B]">
                  <span>Open</span>
                  <FaArrowRight className="text-[10px] group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 xl:grid-cols-6 w-full min-w-0">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs min-w-0 overflow-hidden"
            >
              <div
                className={`flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-xl text-sm sm:text-base ${item.color}`}
              >
                {item.icon}
              </div>
              <h3 className="mt-2 text-base sm:text-xl font-extrabold text-slate-900 tracking-tight truncate">
                {isLoading ? (
                  <span className="inline-block w-16 h-5 bg-slate-200 animate-pulse rounded" />
                ) : (
                  item.value
                )}
              </h3>
              <p className="mt-0.5 text-[11px] font-semibold text-slate-500 truncate">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        {/* Two-Column Section: Pending Dues & Recent Collections */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 w-full min-w-0">
          {/* Pending Fees Table */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between w-full min-w-0">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Overdue Fees</h3>
                  <p className="text-xs text-slate-500">Students with unpaid fees</p>
                </div>
                <Link
                  href="/admin-panel/fees/pending"
                  className="text-xs font-bold text-[#D6451B] hover:underline"
                >
                  View All
                </Link>
              </div>

              <div className="mt-3">
                {isPendingLoading ? (
                  <div className="py-10 text-center text-slate-400 text-xs">
                    <FaSpinner className="animate-spin inline mr-2 text-[#D6451B]" />
                    Loading overdue fees...
                  </div>
                ) : data.pendingFees.length === 0 ? (
                  <div className="py-10 text-center text-slate-400 text-xs">
                    No pending fee details found.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {data.pendingFees.map((student) => (
                      <div
                        key={student._id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition min-w-0"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {student.name}
                          </p>
                          <p className="text-[11px] text-slate-500 truncate">
                            {student.batch}
                          </p>
                          <p className="text-[10px] text-rose-600 font-semibold">
                            Due: {student.dueDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs sm:text-sm font-extrabold text-rose-600">
                            ₹{student.pending.toLocaleString("en-IN")}
                          </span>
                          <Link
                            href={`/admin-panel/fees/collect/${student._id}`}
                            className="rounded-lg bg-[#D6451B] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#b93814] transition"
                          >
                            Collect
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <Link
                href="/admin-panel/fees/pending"
                className="text-xs font-bold text-[#D6451B] hover:underline inline-flex items-center gap-1"
              >
                <span>Check full overdue aging report</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>

          {/* Recent Collections Feed */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between w-full min-w-0">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Recent Collections</h3>
                  <p className="text-xs text-slate-500">Latest recorded fee receipts</p>
                </div>
                <Link
                  href="/admin-panel/fees/transactions"
                  className="text-xs font-bold text-[#D6451B] hover:underline"
                >
                  All Transactions
                </Link>
              </div>

              <div className="mt-3">
                {isPaymentsLoading ? (
                  <div className="py-10 text-center text-slate-400 text-xs">
                    <FaSpinner className="animate-spin inline mr-2 text-[#D6451B]" />
                    Loading recent collections...
                  </div>
                ) : data.recentCollections.length === 0 ? (
                  <div className="py-10 text-center text-slate-400 text-xs">
                    No recent fee collections found.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {data.recentCollections.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 min-w-0"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <div className="flex items-center gap-2">
                            <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                              {item.studentName}
                            </p>
                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-700 shrink-0">
                              Paid
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">
                            {item.receiptNo} • {item.mode}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            {item.date}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs sm:text-sm font-extrabold text-emerald-600">
                            +₹{item.amount.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 text-center">
              <Link
                href="/admin-panel/fees/transactions"
                className="text-xs font-bold text-[#D6451B] hover:underline inline-flex items-center gap-1"
              >
                <span>View all receipts & audit history</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
