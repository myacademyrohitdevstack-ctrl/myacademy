"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaFileAlt,
  FaFilePdf,
  FaFileExcel,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChartLine,
  FaUsers,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaSpinner,
} from "react-icons/fa";
import FeesNav from "../components/FeesNav";
import { useFeesReports } from "@/Hooks/useFees";
import { toast } from "sonner";

export default function ReportsClient() {
  const [timeframe, setTimeframe] = useState("month");

  // Calculate dynamic date ranges based on timeframe
  const getDateRange = () => {
    const today = new Date();
    const to = today.toISOString().split("T")[0];
    let fromDate = new Date();

    if (timeframe === "month") {
      fromDate.setDate(1);
    } else if (timeframe === "quarter") {
      fromDate.setMonth(fromDate.getMonth() - 3);
    } else if (timeframe === "half") {
      fromDate.setMonth(fromDate.getMonth() - 6);
    } else {
      fromDate = new Date(today.getFullYear(), 3, 1); // FY April 1
    }

    const from = fromDate.toISOString().split("T")[0];
    return { from, to };
  };

  const { from, to } = getDateRange();
  const { data: serverReport, isLoading } = useFeesReports({ from, to });

  // Strict server data without dummy fallback values
  const billedTotal = serverReport?.outstanding?.billed ?? 0;
  const collectedTotal = serverReport?.outstanding?.collected ?? 0;
  const outstandingTotal = serverReport?.outstanding?.outstanding ?? 0;
  const activeAccounts = serverReport?.outstanding?.accounts ?? 0;

  const realizationRate =
    billedTotal > 0 ? ((collectedTotal / billedTotal) * 100).toFixed(1) : 0;

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyData =
    serverReport?.collections && serverReport.collections.length > 0
      ? serverReport.collections.map((c) => ({
          month: `${monthNames[c._id.month - 1]} ${c._id.year}`,
          amount: c.amount,
          count: c.count,
        }))
      : [];

  const batchBreakdown =
    serverReport?.batchLedger && serverReport.batchLedger.length > 0
      ? serverReport.batchLedger.map((b) => ({
          batch: b.batchName,
          students: b.studentCount,
          billed: b.billed,
          collected: b.collected,
          pending: b.outstanding,
          rate: b.billed > 0 ? Math.round((b.collected / b.billed) * 100) : 0,
        }))
      : [];

  const paymentModes =
    serverReport?.paymentModes && serverReport.paymentModes.length > 0
      ? (() => {
          const totalAmt =
            serverReport.paymentModes.reduce((acc, m) => acc + m.amount, 0) || 1;
          const colors = [
            "bg-emerald-500",
            "bg-[#D6451B]",
            "bg-blue-500",
            "bg-purple-500",
            "bg-amber-500",
          ];
          return serverReport.paymentModes.map((m, idx) => ({
            mode: m._id,
            amount: m.amount,
            share: Math.round((m.amount / totalAmt) * 100),
            color: colors[idx % colors.length],
          }));
        })()
      : [];

  const handleExportCSV = () => {
    if (batchBreakdown.length === 0) {
      toast.error("No report details to export");
      return;
    }

    const headers = [
      "Batch Cohort",
      "Students",
      "Total Billed",
      "Collected",
      "Pending Dues",
      "Recovery Rate %",
    ];
    const rows = batchBreakdown.map((b) => [
      `"${b.batch}"`,
      b.students,
      b.billed,
      b.collected,
      b.pending,
      `${b.rate}%`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `MyAcademy_Financial_Report_${timeframe}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Financial report exported to CSV");
  };

  return (
    <div className="w-full min-w-0">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6 px-1 sm:px-6 lg:px-8 w-full min-w-0">
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
                Financial Intelligence
              </span>

              <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                Financial Reports & Audit
              </h1>

              <p className="mt-2 text-xs sm:text-sm lg:text-base max-w-2xl text-orange-100 leading-relaxed font-normal">
                Analyze revenue collections, cash-flow velocity, recovery rates, and batch profitability metrics.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-xs sm:text-sm font-bold text-[#D6451B] shadow-xs hover:bg-orange-50 transition"
              >
                <FaFilePdf className="text-xs" />
                <span>Print / PDF</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition"
              >
                <FaFileExcel className="text-xs" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </motion.section>

        {/* Timeframe Selector Bar */}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {[
              { id: "month", label: "This Month" },
              { id: "quarter", label: "Past Quarter" },
              { id: "half", label: "Last 6 Months" },
              { id: "fy", label: "Full Fiscal Year" },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTimeframe(t.id)}
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition shrink-0 ${
                  timeframe === t.id
                    ? "bg-[#D6451B] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
            {isLoading && <FaSpinner className="animate-spin text-[#D6451B]" />}
            <span className="hidden sm:inline-block">
              Period: {from} to {to}
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">Gross Billed</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
              ₹{billedTotal.toLocaleString("en-IN")}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-slate-400">
              <span>Total invoices raised</span>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">Total Collected</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-emerald-600">
              ₹{collectedTotal.toLocaleString("en-IN")}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
              <FaArrowUp />
              <span>{realizationRate}% realization</span>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">Total Outstanding</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-rose-600">
              ₹{outstandingTotal.toLocaleString("en-IN")}
            </h3>
            <div className="mt-1 flex items-center gap-1 text-[11px] font-bold text-rose-600">
              <FaArrowDown />
              <span>Receivable balance</span>
            </div>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">Fee Accounts</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-[#D6451B]">
              {activeAccounts}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Enrolled student ledgers</p>
          </div>
        </div>

        {/* Charts & Breakdown */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 w-full min-w-0">
          {/* Monthly Collection Bars */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Revenue Realization Trend
                </h3>
                <p className="text-xs text-slate-500">
                  Actual collections recorded in the financial ledger
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                FY 2026-27
              </span>
            </div>

            <div className="mt-6">
              {isLoading ? (
                <div className="py-12 text-center text-slate-400 text-xs">
                  <FaSpinner className="animate-spin inline mr-2 text-[#D6451B]" />
                  Loading revenue realization trend...
                </div>
              ) : monthlyData.length === 0 ? (
                <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
                  No monthly collection trends recorded in this period.
                </div>
              ) : (
                <div className="space-y-4">
                  {monthlyData.map((item) => (
                    <div key={item.month} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-700">{item.month}</span>
                        <span className="text-emerald-600">
                          ₹{item.amount.toLocaleString("en-IN")}{" "}
                          <span className="text-slate-400 font-normal">
                            ({item.count} payment{item.count !== 1 ? "s" : ""})
                          </span>
                        </span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          style={{
                            width: "100%",
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-[#D6451B] to-emerald-500 transition-all duration-500"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Payment Method Distribution */}
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-slate-100">
                <h3 className="text-base font-bold text-slate-900">
                  Payment Channels
                </h3>
                <p className="text-xs text-slate-500">
                  Collection breakdown by mode
                </p>
              </div>

              <div className="mt-6">
                {isLoading ? (
                  <div className="py-12 text-center text-slate-400 text-xs">
                    <FaSpinner className="animate-spin inline mr-2 text-[#D6451B]" />
                    Loading channels...
                  </div>
                ) : paymentModes.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 text-xs sm:text-sm">
                    No payment channel distribution data available.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentModes.map((channel) => (
                      <div key={channel.mode} className="space-y-1">
                        <div className="flex justify-between text-xs font-bold">
                          <span className="text-slate-700">{channel.mode}</span>
                          <span className="text-slate-900">{channel.share}%</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                          <div
                            style={{ width: `${Math.max(4, channel.share)}%` }}
                            className={`h-full rounded-full ${channel.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 rounded-xl bg-orange-50/60 p-3 text-xs text-[#D6451B] font-medium text-center">
              💡 Digital collections record instant receipt confirmations.
            </div>
          </div>
        </div>

        {/* Batch-wise Financial Ledger */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 sm:px-6 py-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Cohort Profitability & Ledger
              </h3>
              <p className="text-xs text-slate-500">
                Batch-level revenue performance and outstanding balances
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="p-12 text-center text-slate-500 text-xs sm:text-sm">
                <FaSpinner className="animate-spin inline mr-2 text-[#D6451B]" />
                Loading cohort ledger...
              </div>
            ) : batchBreakdown.length === 0 ? (
              <div className="p-12 text-center text-slate-400 text-xs sm:text-sm">
                No cohort ledger details recorded for the selected period.
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="px-6 py-3.5">Cohort Batch</th>
                    <th className="px-4 py-3.5">Enrolled</th>
                    <th className="px-4 py-3.5">Total Billed</th>
                    <th className="px-4 py-3.5">Collected</th>
                    <th className="px-4 py-3.5">Pending Dues</th>
                    <th className="px-6 py-3.5 text-right">Recovery Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {batchBreakdown.map((b) => (
                    <tr key={b.batch} className="hover:bg-orange-50/40 transition">
                      <td className="px-6 py-4 font-bold text-slate-900">
                        {b.batch}
                      </td>
                      <td className="px-4 py-4 text-slate-600">
                        {b.students} students
                      </td>
                      <td className="px-4 py-4 text-slate-800">
                        ₹{b.billed.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-4 font-bold text-emerald-600">
                        ₹{b.collected.toLocaleString("en-IN")}
                      </td>
                      <td className="px-4 py-4 font-bold text-rose-600">
                        ₹{b.pending.toLocaleString("en-IN")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="inline-block rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-extrabold text-emerald-700">
                          {b.rate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
