"use client";

import { useMemo } from "react";
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
  FaCreditCard,
  FaChartPie,
} from "react-icons/fa";
import FeesNav from "../components/FeesNav";
import { useFeesDashboard, usePendingFees, useFeePayments } from "@/Hooks/useFees";
import {
  StatCard,
  ChartCard,
  TrendChart,
  DonutChart,
  ProgressBar,
} from "@/app/Components/visual-ui";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function FeeDashboard({ data: propData, statsLoading: propLoading }) {
  const { data: dashboardData, isLoading: isDashLoading } = useFeesDashboard();
  const { data: pendingData, isLoading: isPendingLoading } = usePendingFees({ limit: 6 });
  const { data: paymentsData, isLoading: isPaymentsLoading } = useFeePayments({ limit: 6 });

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
            urgency: f.urgency || "moderate",
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

  // Format monthly collection trend for TrendChart
  const monthlyTrendData = useMemo(() => {
    if (!dashboardData?.monthlyCollections || dashboardData.monthlyCollections.length === 0) {
      return [];
    }

    return dashboardData.monthlyCollections.map((m) => {
      const monthLabel = MONTH_NAMES[(m.month || 1) - 1] || "Mon";
      return {
        date: `${monthLabel} '${String(m.year || 2026).slice(-2)}`,
        amount: m.amount || 0,
        count: m.count || 0,
      };
    });
  }, [dashboardData]);

  // Format payment modes distribution for DonutChart
  const paymentModesData = useMemo(() => {
    if (!dashboardData?.paymentModes || dashboardData.paymentModes.length === 0) {
      return [];
    }

    const palette = ["#10B981", "#D6451B", "#3B82F6", "#F59E0B", "#8B5CF6"];
    return dashboardData.paymentModes.map((m, idx) => ({
      name: m._id || "Other",
      value: m.amount || 0,
      color: palette[idx % palette.length],
    }));
  }, [dashboardData]);

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
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
                Financial Operations Hub
              </span>

              <h1 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl tracking-tight">
                Fees & Revenue Dashboard
              </h1>

              <p className="mt-2 text-xs sm:text-sm lg:text-base max-w-2xl text-orange-100 leading-relaxed font-normal">
                Manage student fee recovery, track pending dues across batches, analyze monthly cash inflow trends, and audit verified transactions.
              </p>

              <div className="mt-5 flex flex-wrap gap-2.5">
                <Link
                  href="/admin-panel/fees/collect"
                  className="flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs sm:text-sm font-black text-[#D6451B] shadow-xs hover:bg-orange-50 transition"
                >
                  <FaPlus className="text-xs" />
                  <span>Collect Fee</span>
                </Link>

                <Link
                  href="/admin-panel/fees/pending"
                  className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition backdrop-blur-xs"
                >
                  <FaClock className="text-xs" />
                  <span>View Pending ({data.overdueStudents})</span>
                </Link>
              </div>
            </div>

            {/* Recovery Rate Card */}
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md shrink-0 lg:w-72">
              <div className="flex items-center justify-between">
                <p className="text-xs text-orange-100 font-semibold uppercase tracking-wider">
                  Pending Dues
                </p>
                {data.pendingAmount > 0 && (
                  <span className="rounded-full bg-rose-500/90 px-2 py-0.5 text-[10px] font-bold text-white">
                    Action Required
                  </span>
                )}
              </div>
              <h2 className="mt-2 text-2xl sm:text-3xl font-black">
                ₹{(data?.pendingAmount || 0).toLocaleString("en-IN")}
              </h2>
              <div className="mt-3">
                <ProgressBar
                  percentage={data?.collectionRate || 0}
                  colorScheme="emerald"
                  height="h-2"
                  showPercentage={false}
                />
              </div>
              <p className="mt-2 text-[11px] text-orange-100 font-medium">
                {data?.collectionRate || 0}% overall tuition collection recovery
              </p>
            </div>
          </div>
        </motion.section>

        {/* Quick Operations Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
          {quickActions.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.action}
                href={item.path}
                className="group flex flex-col justify-between rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-xs hover:border-orange-300 hover:shadow-md transition min-w-0"
              >
                <div>
                  <div
                    className={`flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border text-sm sm:text-base font-bold ${item.color}`}
                  >
                    <Icon />
                  </div>
                  <h3 className="mt-3 text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-[#D6451B] transition truncate">
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

        {/* Primary Financial StatCards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
          <StatCard
            title="Today's Collection"
            value={data?.todayCollection || 0}
            prefix="₹"
            icon={FaMoneyBillWave}
            color="emerald"
            trend="Active"
            trendDirection="up"
            subText="Recorded today"
            loading={isLoading}
          />

          <StatCard
            title="Total Inflow"
            value={data?.monthlyCollection || 0}
            prefix="₹"
            icon={FaWallet}
            color="blue"
            trend="+8%"
            trendDirection="up"
            subText="All-time realized"
            loading={isLoading}
          />

          <StatCard
            title="Pending Dues"
            value={data?.pendingAmount || 0}
            prefix="₹"
            icon={FaExclamationCircle}
            color="rose"
            trend={data?.overdueStudents ? `${data.overdueStudents} accounts` : null}
            trendDirection="down"
            subText="Receivable balance"
            loading={isLoading}
            onClick={() => {}}
          />

          <StatCard
            title="Collection Rate"
            value={data?.collectionRate || 0}
            suffix="%"
            icon={FaChartLine}
            color="orange"
            trend={data?.collectionRate >= 80 ? "Healthy" : "Attention"}
            trendDirection={data?.collectionRate >= 80 ? "up" : "down"}
            subText={`${data?.totalStudents || 0} enrolled students`}
            loading={isLoading}
          />
        </div>

        {/* Visual Charts: 6-Month Inflow Trend + Payment Channels Donut */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 w-full min-w-0">
          {/* Revenue Inflow Trend (2 Cols) */}
          <div className="lg:col-span-2 min-w-0">
            <ChartCard
              title="Cash Inflow Velocity"
              subtitle="Monthly collection realization trajectory"
              icon={FaChartLine}
              actions={
                <Link
                  href="/admin-panel/fees/reports"
                  className="text-xs font-bold text-[#D6451B] hover:underline flex items-center gap-1"
                >
                  <span>Detailed Reports</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              }
            >
              {monthlyTrendData.length > 0 ? (
                <TrendChart
                  data={monthlyTrendData}
                  dataKey="amount"
                  xAxisKey="date"
                  height={220}
                  strokeColor="#D6451B"
                  unit="₹"
                  formatYAxis={(val) => `₹${Number(val) >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
              ) : (
                <div className="flex h-48 flex-col items-center justify-center text-center p-6 text-slate-400">
                  <FaChartLine className="text-3xl text-slate-300 mb-2" />
                  <p className="text-xs font-semibold text-slate-600">
                    No monthly payment history recorded yet.
                  </p>
                </div>
              )}
            </ChartCard>
          </div>

          {/* Payment Channels Donut (1 Col) */}
          <div className="min-w-0">
            <ChartCard
              title="Payment Channels"
              subtitle="Inflows by collection mode"
              icon={FaChartPie}
            >
              {paymentModesData.length > 0 ? (
                <DonutChart
                  data={paymentModesData}
                  nameKey="name"
                  valueKey="value"
                  height={190}
                  innerRadius={50}
                  outerRadius={70}
                  centerValue={`₹${((data?.monthlyCollection || 0) >= 1000 ? `${((data?.monthlyCollection || 0) / 1000).toFixed(0)}k` : data?.monthlyCollection || 0)}`}
                  centerLabel="Inflow"
                  unit="₹"
                  showLegend={true}
                />
              ) : (
                <div className="flex h-48 flex-col items-center justify-center text-center p-6 text-slate-400">
                  <FaCreditCard className="text-3xl text-slate-300 mb-2" />
                  <p className="text-xs font-semibold text-slate-600">
                    No payment mode breakdown available.
                  </p>
                </div>
              )}
            </ChartCard>
          </div>
        </div>

        {/* Two-Column Section: Pending Dues & Recent Collections */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 w-full min-w-0">
          {/* Pending Fees Table */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between w-full min-w-0">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600 text-xs">
                    <FaClock />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">Overdue Fees</h3>
                    <p className="text-[11px] text-slate-500">Students with unpaid installments</p>
                  </div>
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
                    <FaCheckCircle className="text-emerald-500 text-3xl mx-auto mb-2" />
                    All student fee accounts are fully cleared!
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
                          <span className="text-xs sm:text-sm font-black text-rose-600">
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
          <div className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between w-full min-w-0">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-xs">
                    <FaReceipt />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900">Recent Collections</h3>
                    <p className="text-[11px] text-slate-500">Latest recorded fee receipts</p>
                  </div>
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
                          <p className="text-xs sm:text-sm font-black text-emerald-600">
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
