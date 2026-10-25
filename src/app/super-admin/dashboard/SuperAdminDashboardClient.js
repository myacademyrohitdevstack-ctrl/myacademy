"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCrown,
  FaUniversity,
  FaUsers,
  FaCreditCard,
  FaLayerGroup,
  FaHistory,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPlus,
  FaArrowRight,
  FaSpinner,
  FaClock,
} from "react-icons/fa";
import { useSuperAdminDashboard } from "@/Hooks/useSuperAdmin";
import { StatCard, ChartCard, DonutChart, ProgressBar } from "@/app/Components/visual-ui";

export default function SuperAdminDashboardClient() {
  const { data, isLoading } = useSuperAdminDashboard();

  const metrics = data?.metrics || {};
  const recentAcademies = data?.recentAcademies || [];
  const subscriptionsByStatus = data?.subscriptionsByStatus || [];

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500 via-[#D6451B] to-rose-600 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between min-w-0">
          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Platform Command Center
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Super Admin Overview
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm text-orange-100 max-w-2xl font-normal">
              Multi-tenant academy orchestration, SaaS pricing plans, subscription lifecycle monitoring, and platform audit security.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href="/super-admin/plans"
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs sm:text-sm font-bold text-[#D6451B] shadow-xs hover:bg-orange-50 transition"
            >
              <FaPlus className="text-xs" />
              <span>Create SaaS Plan</span>
            </Link>

            <Link
              href="/super-admin/subscriptions"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition backdrop-blur-xs"
            >
              <FaCreditCard className="text-xs" />
              <span>Manage Subscriptions</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Primary KPI Grid (StatCards) */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
        <StatCard
          title="Total Academies"
          value={metrics.totalAcademies || 0}
          icon={FaUniversity}
          color="orange"
          trend={`${metrics.activeAcademies || 0} active`}
          trendDirection="up"
          subText={`${metrics.pendingAcademies || 0} pending review`}
          loading={isLoading}
        />

        <StatCard
          title="Platform Users"
          value={metrics.totalUsers || 0}
          icon={FaUsers}
          color="blue"
          trend="+18%"
          trendDirection="up"
          subText="Students, teachers & staff"
          loading={isLoading}
        />

        <StatCard
          title="Active Subscriptions"
          value={metrics.activeSubscriptions || 0}
          icon={FaCreditCard}
          color="emerald"
          trend={`${metrics.trials || 0} trials`}
          trendDirection="up"
          subText="Paid recurring SaaS tenants"
          loading={isLoading}
        />

        <StatCard
          title="SaaS Plans"
          value={metrics.activePlans || 0}
          icon={FaLayerGroup}
          color="purple"
          subText="Published billing tiers"
          loading={isLoading}
        />
      </div>

      {/* Pending Approvals Alert Banner */}
      {!isLoading && metrics.pendingAcademies > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-amber-200 bg-amber-50/80 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white font-bold">
              <FaClock className="text-base" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900">
                {metrics.pendingAcademies} Academy Registration{metrics.pendingAcademies > 1 ? "s" : ""} Awaiting Review
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                New academy owners have submitted their workspace details for verification and platform access.
              </p>
            </div>
          </div>

          <Link
            href="/super-admin/academies"
            className="rounded-xl bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-700 transition shadow-xs whitespace-nowrap self-stretch sm:self-auto text-center"
          >
            Review Pending Tenants
          </Link>
        </motion.div>
      )}

      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
          <FaSpinner className="animate-spin inline mr-2 text-[#D6451B] text-lg" />
          <span>Aggregating multi-tenant platform metrics...</span>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 w-full min-w-0">
          {/* Recent Academies Table (2 cols on lg) */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaUniversity className="text-[#D6451B]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Recently Registered Academies
                </h3>
              </div>
              <Link
                href="/super-admin/academies"
                className="text-xs font-bold text-[#D6451B] hover:underline flex items-center gap-1"
              >
                <span>View All Academies</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>

            {recentAcademies.length === 0 ? (
              <div className="p-10 text-center text-slate-400 text-xs">
                No academy tenants registered on the platform yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {recentAcademies.map((aca) => {
                  const isAct = aca.status === "active";
                  const isPend = aca.status === "pending";
                  const isHold = aca.status === "on_hold";
                  const isRej = aca.status === "rejected";
                  const isSusp = aca.status === "suspended";

                  return (
                    <div
                      key={aca._id}
                      className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-sm text-slate-900 truncate">
                            {aca.name}
                          </h4>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider border ${
                              isAct
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : isPend
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : isHold
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : isRej
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : isSusp
                                ? "bg-red-50 text-red-700 border-red-200"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}
                          >
                            {aca.status?.replace("_", " ") || "active"}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Owner: {aca.owner?.fullName || "Academy Admin"} ({aca.email || "No email"})
                        </p>
                      </div>

                      <div className="flex items-center gap-2 self-start sm:self-auto">
                        <span className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-bold text-slate-700 capitalize">
                          Plan: {aca.plan || "standard"}
                        </span>
                        <Link
                          href={`/super-admin/academies?search=${encodeURIComponent(aca.name)}`}
                          className="rounded-xl bg-orange-50 px-2.5 py-1 text-xs font-bold text-[#D6451B] hover:bg-orange-100 transition"
                        >
                          Manage
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Subscription Status Breakdown & Audit Trail */}
          <div className="space-y-4 sm:space-y-6">
            {/* Subscription Health Breakdown */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FaCreditCard className="text-[#D6451B]" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Subscription Health
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  Status Distribution
                </span>
              </div>

              {subscriptionsByStatus.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">
                  No subscription records found.
                </p>
              ) : (
                <DonutChart
                  data={subscriptionsByStatus.map((item) => ({
                    name: item._id ? item._id.charAt(0).toUpperCase() + item._id.slice(1).replace("_", " ") : "Unknown",
                    value: item.count || 0,
                  }))}
                  height={220}
                  innerRadius={50}
                  outerRadius={75}
                  centerLabel="Total Subs"
                  centerValue={subscriptionsByStatus.reduce((acc, curr) => acc + (curr.count || 0), 0)}
                  showLegend={true}
                />
              )}
            </div>

            {/* Platform Quick Links */}
            <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50/60 to-white p-4 sm:p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Platform Operations
              </h3>
              <div className="space-y-2">
                <Link
                  href="/super-admin/academies"
                  className="flex items-center justify-between rounded-xl bg-white p-3 text-xs font-bold text-slate-800 border border-slate-200 hover:border-[#D6451B] transition shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <FaUniversity className="text-[#D6451B]" />
                    <span>Academy Multi-Tenant Directory</span>
                  </div>
                  <FaArrowRight className="text-slate-400 text-[10px]" />
                </Link>

                <Link
                  href="/super-admin/plans"
                  className="flex items-center justify-between rounded-xl bg-white p-3 text-xs font-bold text-slate-800 border border-slate-200 hover:border-[#D6451B] transition shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <FaLayerGroup className="text-[#D6451B]" />
                    <span>Configure SaaS Pricing & Limits</span>
                  </div>
                  <FaArrowRight className="text-slate-400 text-[10px]" />
                </Link>

                <Link
                  href="/super-admin/audit-logs"
                  className="flex items-center justify-between rounded-xl bg-white p-3 text-xs font-bold text-slate-800 border border-slate-200 hover:border-[#D6451B] transition shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <FaHistory className="text-[#D6451B]" />
                    <span>Security & Audit Logs</span>
                  </div>
                  <FaArrowRight className="text-slate-400 text-[10px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
