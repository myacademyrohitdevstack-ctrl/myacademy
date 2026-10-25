"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaFilePdf,
  FaFileExcel,
  FaMoneyBillWave,
  FaChartLine,
  FaUsers,
  FaCheckCircle,
  FaArrowUp,
  FaArrowDown,
  FaSpinner,
  FaChartPie,
  FaLayerGroup,
  FaWallet,
  FaExclamationCircle,
} from "react-icons/fa";
import FeesNav from "../components/FeesNav";
import { useFeesReports } from "@/Hooks/useFees";
import { toast } from "sonner";
import {
  StatCard,
  ChartCard,
  TrendChart,
  DonutChart,
  ComparisonBarChart,
  ProgressBar,
} from "@/app/Components/visual-ui";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export default function ReportsClient() {
  const [timeframe, setTimeframe] = useState("month");

  // Calculate dynamic date ranges based on timeframe
  const { from, to } = useMemo(() => {
    const today = new Date();
    const toDate = today.toISOString().split("T")[0];
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

    return { from: fromDate.toISOString().split("T")[0], to: toDate };
  }, [timeframe]);

  const { data: serverReport, isLoading } = useFeesReports({ from, to });

  // Server data metrics
  const billedTotal = serverReport?.outstanding?.billed ?? 0;
  const collectedTotal = serverReport?.outstanding?.collected ?? 0;
  const outstandingTotal = serverReport?.outstanding?.outstanding ?? 0;
  const activeAccounts = serverReport?.outstanding?.accounts ?? 0;

  const realizationRate =
    billedTotal > 0 ? ((collectedTotal / billedTotal) * 100).toFixed(1) : 0;

  // Monthly revenue trend for TrendChart
  const monthlyData = useMemo(() => {
    if (!serverReport?.collections || serverReport.collections.length === 0) {
      return [];
    }

    return serverReport.collections.map((c) => ({
      date: `${MONTH_NAMES[(c._id.month || 1) - 1]} '${String(c._id.year || 2026).slice(-2)}`,
      amount: c.amount || 0,
      count: c.count || 0,
    }));
  }, [serverReport]);

  // Batch comparison data for ComparisonBarChart
  const batchComparisonData = useMemo(() => {
    if (!serverReport?.batchLedger || serverReport.batchLedger.length === 0) {
      return [];
    }

    return serverReport.batchLedger.slice(0, 8).map((b) => {
      const name = b.batchName || "Unassigned";
      const shortName = name.length > 12 ? `${name.slice(0, 11)}…` : name;
      return {
        label: shortName,
        Billed: b.billed || 0,
        Collected: b.collected || 0,
        Outstanding: b.outstanding || 0,
      };
    });
  }, [serverReport]);

  // Batch breakdown for table export and display
  const batchBreakdown = useMemo(() => {
    if (!serverReport?.batchLedger || serverReport.batchLedger.length === 0) {
      return [];
    }

    return serverReport.batchLedger.map((b) => ({
      batch: b.batchName || "Unassigned",
      students: b.studentCount || 0,
      billed: b.billed || 0,
      collected: b.collected || 0,
      pending: b.outstanding || 0,
      rate: b.billed > 0 ? Math.round((b.collected / b.billed) * 100) : 0,
    }));
  }, [serverReport]);

  // Payment modes distribution for DonutChart
  const paymentModesData = useMemo(() => {
    if (!serverReport?.paymentModes || serverReport.paymentModes.length === 0) {
      return [];
    }

    const palette = ["#10B981", "#D6451B", "#3B82F6", "#F59E0B", "#8B5CF6"];
    return serverReport.paymentModes.map((m, idx) => ({
      name: m._id || "Other",
      value: m.amount || 0,
      color: palette[idx % palette.length],
    }));
  }, [serverReport]);

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
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
                Financial Intelligence & Reconciliation
              </span>

              <h1 className="mt-3 text-2xl font-black sm:text-3xl lg:text-4xl tracking-tight">
                Revenue Reports & Audit
              </h1>

              <p className="mt-2 text-xs sm:text-sm lg:text-base max-w-2xl text-orange-100 leading-relaxed font-normal">
                Analyze revenue realization velocity, compare batch recovery ratios, and inspect payment channel distributions.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-xs sm:text-sm font-black text-[#D6451B] shadow-xs hover:bg-orange-50 transition cursor-pointer"
              >
                <FaFilePdf className="text-xs" />
                <span>Print / PDF</span>
              </button>
              <button
                onClick={handleExportCSV}
                className="flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition backdrop-blur-xs cursor-pointer"
              >
                <FaFileExcel className="text-xs" />
                <span>Export CSV</span>
              </button>
            </div>
          </div>
        </motion.section>

        {/* Timeframe Selector Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-xs">
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
                className={`rounded-xl px-3.5 py-2 text-xs font-bold transition shrink-0 cursor-pointer ${
                  timeframe === t.id
                    ? "bg-[#D6451B] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 self-start sm:self-auto">
            {isLoading && <FaSpinner className="animate-spin text-[#D6451B]" />}
            <span className="bg-slate-50 border border-slate-100 px-3 py-1 rounded-lg">
              Range: {from} to {to}
            </span>
          </div>
        </div>

        {/* Key Metrics Row (StatCards) */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
          <StatCard
            title="Gross Invoiced"
            value={billedTotal}
            prefix="₹"
            icon={FaMoneyBillWave}
            color="orange"
            trend={`${activeAccounts} accounts`}
            trendDirection="neutral"
            subText="Invoices raised"
            loading={isLoading}
          />

          <StatCard
            title="Realized Cash"
            value={collectedTotal}
            prefix="₹"
            icon={FaWallet}
            color="emerald"
            trend={`${realizationRate}%`}
            trendDirection="up"
            subText="Recovered inflow"
            loading={isLoading}
          />

          <StatCard
            title="Receivables Due"
            value={outstandingTotal}
            prefix="₹"
            icon={FaExclamationCircle}
            color="rose"
            trend={outstandingTotal > 0 ? "Pending" : "Cleared"}
            trendDirection={outstandingTotal > 0 ? "down" : "up"}
            subText="Receivable balance"
            loading={isLoading}
          />

          <StatCard
            title="Recovery Efficiency"
            value={Number(realizationRate) || 0}
            suffix="%"
            icon={FaChartLine}
            color="blue"
            trend={Number(realizationRate) >= 80 ? "Healthy" : "Low"}
            trendDirection={Number(realizationRate) >= 80 ? "up" : "down"}
            subText="Realization ratio"
            loading={isLoading}
          />
        </div>

        {/* Charts & Breakdown */}
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 w-full min-w-0">
          {/* Revenue Realization Trend (2 Cols) */}
          <div className="lg:col-span-2 min-w-0">
            <ChartCard
              title="Revenue Realization Trend"
              subtitle="Actual collections recorded over the selected timeframe"
              icon={FaChartLine}
              badge="FY 2026-27"
            >
              {monthlyData.length > 0 ? (
                <TrendChart
                  data={monthlyData}
                  dataKey="amount"
                  xAxisKey="date"
                  height={240}
                  strokeColor="#10B981"
                  fillGradientId="colorReportTrend"
                  unit="₹"
                  formatYAxis={(val) => `₹${Number(val) >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
                />
              ) : (
                <div className="flex h-48 flex-col items-center justify-center text-center p-6 text-slate-400">
                  <FaChartLine className="text-3xl text-slate-300 mb-2" />
                  <p className="text-xs font-semibold text-slate-600">
                    No monthly collection trends recorded in this period.
                  </p>
                </div>
              )}
            </ChartCard>
          </div>

          {/* Payment Method Distribution Donut (1 Col) */}
          <div className="min-w-0">
            <ChartCard
              title="Payment Channels"
              subtitle="Collection distribution by payment mode"
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
                  centerValue={`₹${(collectedTotal >= 1000 ? `${(collectedTotal / 1000).toFixed(0)}k` : collectedTotal)}`}
                  centerLabel="Realized"
                  unit="₹"
                  showLegend={true}
                />
              ) : (
                <div className="flex h-48 flex-col items-center justify-center text-center p-6 text-slate-400">
                  <FaChartPie className="text-3xl text-slate-300 mb-2" />
                  <p className="text-xs font-semibold text-slate-600">
                    No payment channel distribution data available.
                  </p>
                </div>
              )}
            </ChartCard>
          </div>
        </div>

        {/* Cohort Profitability Comparative Bar Chart */}
        {batchComparisonData.length > 0 && (
          <ChartCard
            title="Cohort Billing & Inflow Comparison"
            subtitle="Side-by-side comparison of invoiced fees vs collected cash per batch"
            icon={FaLayerGroup}
          >
            <ComparisonBarChart
              data={batchComparisonData}
              xAxisKey="label"
              bars={[
                { key: "Billed", name: "Invoiced Billed", color: "#64748B" },
                { key: "Collected", name: "Collected Inflow", color: "#10B981" },
                { key: "Outstanding", name: "Pending Balance", color: "#F43F5E" },
              ]}
              height={260}
              unit="₹"
              showLegend={true}
              formatYAxis={(val) => `₹${Number(val) >= 1000 ? `${(val / 1000).toFixed(0)}k` : val}`}
            />
          </ChartCard>
        )}

        {/* Batch-wise Financial Ledger */}
        <div className="rounded-2xl border border-slate-200/90 bg-white shadow-xs overflow-hidden min-w-0">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 sm:px-6 py-4">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                Cohort Profitability & Ledger
              </h3>
              <p className="text-xs text-slate-500">
                Performance breakdown across active academy batches
              </p>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {batchBreakdown.length} Cohorts
            </span>
          </div>

          {isLoading ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              <FaSpinner className="animate-spin inline mr-2 text-[#D6451B]" />
              Generating financial ledger...
            </div>
          ) : batchBreakdown.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-xs">
              No batch ledger records found for this period.
            </div>
          ) : (
            <>
              {/* Mobile Card List (< 640px) */}
              <div className="p-3.5 space-y-3 sm:hidden">
                {batchBreakdown.map((row) => (
                  <div
                    key={row.batch}
                    className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-xs text-slate-900 truncate">
                        {row.batch}
                      </h4>
                      <span className="rounded-md bg-white border border-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                        {row.students} Students
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">Billed</p>
                        <p className="font-bold text-slate-800">₹{row.billed.toLocaleString("en-IN")}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">Collected</p>
                        <p className="font-bold text-emerald-600">₹{row.collected.toLocaleString("en-IN")}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-medium">Pending</p>
                        <p className="font-bold text-rose-600">₹{row.pending.toLocaleString("en-IN")}</p>
                      </div>
                    </div>

                    <ProgressBar
                      percentage={row.rate}
                      label="Recovery Rate"
                      colorScheme="emerald"
                      height="h-1.5"
                    />
                  </div>
                ))}
              </div>

              {/* Desktop Table (>= 640px) */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="border-b border-slate-100 bg-slate-50/50 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    <tr>
                      <th className="px-6 py-3">Cohort</th>
                      <th className="px-6 py-3">Students</th>
                      <th className="px-6 py-3">Total Invoiced</th>
                      <th className="px-6 py-3">Collected</th>
                      <th className="px-6 py-3">Outstanding</th>
                      <th className="px-6 py-3">Recovery Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {batchBreakdown.map((row) => (
                      <tr
                        key={row.batch}
                        className="hover:bg-slate-50/70 transition-colors"
                      >
                        <td className="px-6 py-3.5 font-bold text-slate-900">
                          {row.batch}
                        </td>
                        <td className="px-6 py-3.5 text-slate-500">
                          {row.students}
                        </td>
                        <td className="px-6 py-3.5 font-semibold text-slate-800">
                          ₹{row.billed.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-3.5 font-bold text-emerald-600">
                          ₹{row.collected.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-3.5 font-bold text-rose-600">
                          ₹{row.pending.toLocaleString("en-IN")}
                        </td>
                        <td className="px-6 py-3.5 w-48">
                          <ProgressBar
                            percentage={row.rate}
                            colorScheme="emerald"
                            height="h-2"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
