"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHistory,
  FaShieldAlt,
  FaSearch,
  FaFilter,
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
  FaUserShield,
  FaNetworkWired,
} from "react-icons/fa";
import { useSuperAdminAuditLogs } from "@/Hooks/useSuperAdmin";

export default function SuperAdminAuditLogsClient() {
  const [actionFilter, setActionFilter] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSuperAdminAuditLogs({
    page,
    limit: 25,
    action: actionFilter || undefined,
  });

  const logs = data?.logs || [];
  const pagination = data?.pagination || { page: 1, limit: 25, total: 0, pages: 1 };

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500 via-[#D6451B] to-rose-600 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between min-w-0">
          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Compliance & Security
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Platform Audit Logs
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm text-orange-100 max-w-2xl font-normal">
              Immutable ledger of administrative platform actions including tenant suspensions, plan creations, and subscription assignments.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md shrink-0 lg:w-72">
            <p className="text-xs text-orange-100 font-semibold uppercase tracking-wider">
              Total Log Events
            </p>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold">
              {pagination.total || 0}
            </h2>
            <p className="mt-1 text-xs text-orange-100">
              Verified security events
            </p>
          </div>
        </div>
      </motion.section>

      {/* Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Filter Action:</span>
          <select
            value={actionFilter}
            onChange={(e) => {
              setActionFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-[#D6451B]"
          >
            <option value="">All Platform Actions</option>
            <option value="academy.suspended">academy.suspended</option>
            <option value="academy.active">academy.active</option>
            <option value="academy.inactive">academy.inactive</option>
            <option value="plan.created">plan.created</option>
            <option value="plan.updated">plan.updated</option>
            <option value="subscription.assigned">subscription.assigned</option>
          </select>
        </div>

        <span className="text-xs font-bold text-slate-400">
          Showing Page {pagination.page} of {pagination.pages}
        </span>
      </div>

      {/* Audit Log Table / Cards */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">
            <FaSpinner className="animate-spin inline mr-2 text-[#D6451B] text-lg" />
            <span>Retrieving platform audit logs...</span>
          </div>
        ) : logs.length === 0 ? (
          <div className="p-12 text-center">
            <FaHistory className="text-slate-300 text-4xl mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No Audit Events Logged</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No audit logs have been recorded matching this filter.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {logs.map((log) => {
              const dateStr = log.createdAt
                ? new Date(log.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Timestamp N/A";

              const isSuspended = log.action?.includes("suspended");
              const isPlan = log.action?.includes("plan");
              const isSub = log.action?.includes("subscription");

              return (
                <div
                  key={log._id}
                  className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3 hover:bg-slate-50/70 transition"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wider ${
                          isSuspended
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : isPlan
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : isSub
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {log.action}
                      </span>

                      <span className="text-xs text-slate-400">
                        Target: <strong>{log.targetType || "Entity"}</strong> ({String(log.targetId || "").slice(-8)})
                      </span>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-600">
                      <span>
                        Actor: <strong>{log.actorId?.fullName || "Super Admin"}</strong> ({log.actorId?.email || "Platform"})
                      </span>
                      {log.ip && (
                        <span className="flex items-center gap-1 font-mono text-[11px] text-slate-400">
                          <FaNetworkWired className="text-[10px]" />
                          {log.ip}
                        </span>
                      )}
                    </div>

                    {log.reason && (
                      <div className="mt-2 rounded-xl bg-orange-50/60 p-2.5 text-xs text-slate-700 border border-orange-100">
                        <span className="font-bold text-[#D6451B]">Reason:</span> {log.reason}
                      </div>
                    )}
                  </div>

                  <div className="self-end lg:self-auto text-right shrink-0">
                    <span className="text-xs font-bold text-slate-500">
                      {dateStr}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
            <span>
              Page {pagination.page} of {pagination.pages}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 hover:bg-slate-50 disabled:opacity-40"
              >
                <FaChevronLeft className="text-[10px]" />
                <span>Prev</span>
              </button>
              <button
                disabled={page >= pagination.pages}
                onClick={() => setPage((p) => p + 1)}
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 hover:bg-slate-50 disabled:opacity-40"
              >
                <span>Next</span>
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
