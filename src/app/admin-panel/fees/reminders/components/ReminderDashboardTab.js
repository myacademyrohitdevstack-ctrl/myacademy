"use client";

import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaCheckDouble,
  FaExclamationTriangle,
  FaClock,
  FaCalendarCheck,
  FaCalendarTimes,
  FaCalendarDay,
  FaPaperPlane,
  FaSyncAlt,
  FaRobot,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaUserCheck,
} from "react-icons/fa";
import { useTriggerReminderRunMutation, useRetryReminderMutation } from "@/app/mutations/whatsappReminderMutations";

export default function ReminderDashboardTab({
  dashboardData,
  isLoading,
  onNavigateTab,
  onOpenDetails,
}) {
  const triggerRunMutation = useTriggerReminderRunMutation();
  const retryMutation = useRetryReminderMutation();

  const metrics = dashboardData?.metrics || {
    sentThisMonth: 0,
    sentToday: 0,
    delivered: 0,
    failed: 0,
    pending: 0,
    manuallyConfirmed: 0,
  };

  const dues = dashboardData?.duesOverview || {
    dueToday: { count: 0, amount: 0 },
    overdue: { count: 0, amount: 0 },
    upcoming: { count: 0, amount: 0 },
  };

  const connection = dashboardData?.connection || {
    mode: "manual",
    connectionStatus: "not_configured",
    senderPhoneNumber: "",
  };

  const automation = dashboardData?.automation || {
    enabled: false,
    isPaused: false,
    timezone: "Asia/Kolkata",
    allowedSendingHours: { start: "09:00", end: "20:00" },
    rulesCount: 0,
  };

  const recentActivity = dashboardData?.recentActivity || [];
  const failedNeedingAttention = dashboardData?.failedNeedingAttention || [];

  const formatCurrency = (val) =>
    Number(val || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
      case "read":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <FaCheckDouble className="text-[10px]" /> Delivered
          </span>
        );
      case "sent_to_provider":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
            <FaPaperPlane className="text-[10px]" /> Provider Accepted
          </span>
        );
      case "manually_confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
            <FaUserCheck className="text-[10px]" /> Manually Sent
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <FaTimesCircle className="text-[10px]" /> Failed
          </span>
        );
      case "scheduled":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <FaClock className="text-[10px]" /> Scheduled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <FaClock className="text-[10px]" /> Draft / Queued
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Connection & Automation System Status Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Connection Status Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <FaWhatsapp className="text-emerald-500 text-base" /> WhatsApp Channel
              </span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 w-fit ${
                  connection.mode === "resend_email"
                    ? "bg-blue-50 text-blue-700 border border-blue-200"
                    : connection.mode === "platform_api" || connection.mode === "myacademy_api"
                    ? "bg-amber-50 text-amber-800 border border-amber-300"
                    : connection.mode === "cloud_api"
                    ? connection.connectionStatus === "connected"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                    : "bg-orange-50 text-[#D6451B] border border-orange-200"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    connection.mode === "resend_email"
                      ? "bg-blue-600 animate-pulse"
                      : connection.mode === "platform_api" || connection.mode === "myacademy_api"
                      ? "bg-amber-500"
                      : connection.mode === "cloud_api"
                      ? connection.connectionStatus === "connected"
                        ? "bg-emerald-500 animate-pulse"
                        : "bg-rose-500"
                      : "bg-orange-500"
                  }`}
                />
                {connection.mode === "resend_email"
                  ? "Official Resend Email: Live"
                  : connection.mode === "platform_api" || connection.mode === "myacademy_api"
                  ? "MyAcademy API (Coming Soon)"
                  : connection.mode === "cloud_api"
                  ? connection.connectionStatus === "connected"
                    ? "Custom Meta API: Live"
                    : "Custom Meta API: Disconnected"
                  : "Direct Admin WhatsApp"}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed">
              {connection.mode === "resend_email"
                ? "Official Resend Email channel active. High-deliverability branded payment invoices dispatched directly to student and parent inboxes."
                : connection.mode === "platform_api" || connection.mode === "myacademy_api"
                ? "MyAcademy Automated WhatsApp Gateway is currently under development (Coming Soon in next update)."
                : connection.mode === "cloud_api"
                ? connection.senderPhoneNumber
                  ? `Active Phone: ${connection.senderPhoneNumber}`
                  : "Custom Meta WhatsApp Cloud API credentials configured."
                : "Direct WhatsApp links generated with 1 tap. Send directly from admin device without external API."}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => onNavigateTab("integration")}
              className="text-xs font-bold text-[#D6451B] hover:text-orange-600 inline-flex items-center gap-1.5"
            >
              Configure WhatsApp Settings <FaArrowRight className="text-[10px]" />
            </button>
          </div>
        </div>

        {/* Automation Status Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                <FaRobot className="text-orange-500 text-base" /> Automatic Reminders
              </span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 w-fit ${
                  automation.enabled && !automation.isPaused
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : automation.isPaused
                    ? "bg-amber-50 text-amber-700 border border-amber-200"
                    : "bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    automation.enabled && !automation.isPaused
                      ? "bg-emerald-500"
                      : automation.isPaused
                      ? "bg-amber-500"
                      : "bg-slate-400"
                  }`}
                />
                {automation.enabled
                  ? automation.isPaused
                    ? "Automation Paused"
                    : "Automation Active"
                  : "Automation Disabled"}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-800 leading-relaxed break-words">
              {automation.enabled
                ? `${automation.rulesCount} automated rules active | Window: ${automation.allowedSendingHours?.start} - ${automation.allowedSendingHours?.end} (${automation.timezone})`
                : "Automated hourly rules are currently disabled. Reminders must be sent manually."}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <button
              onClick={() => onNavigateTab("rules")}
              className="text-xs font-bold text-[#D6451B] hover:text-orange-600 inline-flex items-center gap-1.5"
            >
              Manage Automation Rules <FaArrowRight className="text-[10px]" />
            </button>
            <button
              onClick={() => triggerRunMutation.mutate()}
              disabled={triggerRunMutation.isPending}
              className="px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#D6451B] text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <FaSyncAlt className={`text-xs ${triggerRunMutation.isPending ? "animate-spin" : ""}`} />
              {triggerRunMutation.isPending ? "Running..." : "Run Check Now"}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Reminder Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Sent This Month */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-500">Sent This Month</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{metrics.sentThisMonth}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Total across channels</p>
        </div>

        {/* Sent Today */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-500">Sent Today</p>
          <p className="text-xl sm:text-2xl font-black text-[#D6451B] mt-1">{metrics.sentToday}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Today&apos;s dispatches</p>
        </div>

        {/* Delivered / Read */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-500">Delivered</p>
          <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">{metrics.delivered}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Verified receipts</p>
        </div>

        {/* Manually Confirmed */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-500">Manually Sent</p>
          <p className="text-xl sm:text-2xl font-black text-teal-600 mt-1">{metrics.manuallyConfirmed}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Click-to-chat confirmed</p>
        </div>

        {/* Pending / Draft */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-500">Pending / Queued</p>
          <p className="text-xl sm:text-2xl font-black text-amber-600 mt-1">{metrics.pending}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Scheduled or draft</p>
        </div>

        {/* Failed */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
          <p className="text-xs font-bold text-slate-500">Failed</p>
          <p className="text-xl sm:text-2xl font-black text-rose-600 mt-1">{metrics.failed}</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Requires attention</p>
        </div>
      </div>

      {/* 3. Dues Overview with Clickable Filters to Send Reminders */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Fee Accounts Ready for Reminders
          </h3>
          <span className="text-xs text-slate-500">Click any card to load recipients</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Overdue */}
          <div
            onClick={() => onNavigateTab("send", { filter: "overdue" })}
            className="cursor-pointer group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-rose-50/80 to-red-50/40 border border-rose-200 hover:border-rose-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 text-xs font-bold text-rose-700">
                <FaCalendarTimes className="text-sm" /> Overdue Fees
              </span>
              <span className="text-[11px] font-bold text-rose-600 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                Remind <FaArrowRight className="text-[10px]" />
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-rose-700">{formatCurrency(dues.overdue.amount)}</p>
            <p className="text-xs font-medium text-rose-600/90 mt-1">
              {dues.overdue.count} students with past due installments
            </p>
          </div>

          {/* Due Today */}
          <div
            onClick={() => onNavigateTab("send", { filter: "due_today" })}
            className="cursor-pointer group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-50/80 to-orange-50/40 border border-amber-200 hover:border-amber-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 text-xs font-bold text-amber-800">
                <FaCalendarDay className="text-sm" /> Due Today
              </span>
              <span className="text-[11px] font-bold text-amber-700 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                Remind <FaArrowRight className="text-[10px]" />
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-amber-800">{formatCurrency(dues.dueToday.amount)}</p>
            <p className="text-xs font-medium text-amber-700/90 mt-1">
              {dues.dueToday.count} students with installments due today
            </p>
          </div>

          {/* Upcoming in 7 Days */}
          <div
            onClick={() => onNavigateTab("send", { filter: "all_pending" })}
            className="cursor-pointer group p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-sky-50/40 border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-2 text-xs font-bold text-blue-800">
                <FaCalendarCheck className="text-sm" /> Upcoming (7 Days)
              </span>
              <span className="text-[11px] font-bold text-blue-700 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
                View <FaArrowRight className="text-[10px]" />
              </span>
            </div>
            <p className="text-2xl sm:text-3xl font-black text-blue-800">{formatCurrency(dues.upcoming.amount)}</p>
            <p className="text-xs font-medium text-blue-700/90 mt-1">
              {dues.upcoming.count} upcoming installment dues
            </p>
          </div>
        </div>
      </div>

      {/* 4. Failed Messages Requiring Attention */}
      {failedNeedingAttention.length > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-50/60 border border-rose-200 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FaExclamationTriangle className="text-rose-600 text-sm" />
              <h3 className="text-sm font-bold text-rose-900">
                Failed Messages Requiring Attention ({failedNeedingAttention.length})
              </h3>
            </div>
            <span className="text-xs text-rose-700 font-semibold">Immediate retry available</span>
          </div>

          <div className="divide-y divide-rose-100">
            {failedNeedingAttention.map((item) => (
              <div
                key={item._id}
                className="py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <p className="text-xs font-bold text-slate-900">
                    {item.recipient?.name || item.studentId?.fullName} ({item.recipient?.phone})
                  </p>
                  <p className="text-[11px] text-rose-600 font-medium">
                    Reason: {item.failureReason || "Provider rejection"}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenDetails(item)}
                    className="px-2.5 py-1 text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-white rounded-lg transition-colors border border-rose-200"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => retryMutation.mutate(item._id)}
                    disabled={retryMutation.isPending}
                    className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold inline-flex items-center gap-1 transition-colors disabled:opacity-50"
                  >
                    <FaSyncAlt className={`text-[10px] ${retryMutation.isPending ? "animate-spin" : ""}`} />
                    Retry
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. Recent Reminder Activity */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Recent Reminder Activity
          </h3>
          <button
            onClick={() => onNavigateTab("history")}
            className="text-xs font-bold text-[#D6451B] hover:text-orange-600 inline-flex items-center gap-1"
          >
            View Complete History <FaArrowRight className="text-[10px]" />
          </button>
        </div>

        {recentActivity.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <FaWhatsapp className="mx-auto text-3xl text-slate-300 mb-2" />
            <p className="text-sm font-semibold">No recent reminder activity</p>
            <p className="text-xs text-slate-400 mt-1">
              Send your first manual fee reminder or activate automatic rules.
            </p>
          </div>
        ) : (
          <div>
            {/* Mobile Cards View (< 640px) */}
            <div className="space-y-3 sm:hidden">
              {recentActivity.map((r) => (
                <div
                  key={r._id}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/40 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-extrabold text-slate-900 text-xs">
                        {r.recipient?.name || "Student"}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">{r.recipient?.phone}</p>
                    </div>
                    {getStatusBadge(r.status)}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                    <div>
                      <span className="text-[10px] text-slate-400 font-medium">Due: </span>
                      <span className="font-black text-slate-900">{formatCurrency(r.amountDue)}</span>
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {new Date(r.createdAt).toLocaleString("en-IN", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-semibold text-slate-500">
                      Channel: {r.channel === "whatsapp_cloud_api" ? "Cloud API" : "Click-to-Chat"}
                    </span>
                    <button
                      onClick={() => onOpenDetails(r)}
                      className="px-3 py-1 rounded-lg bg-orange-50 text-[#D6451B] font-bold text-xs hover:bg-orange-100 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View (>= 640px) */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 font-bold">
                    <th className="pb-2.5">Recipient</th>
                    <th className="pb-2.5">Amount Due</th>
                    <th className="pb-2.5">Channel</th>
                    <th className="pb-2.5">Status</th>
                    <th className="pb-2.5">Time</th>
                    <th className="pb-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentActivity.map((r) => (
                    <tr key={r._id} className="hover:bg-slate-50/50">
                      <td className="py-2.5">
                        <p className="font-bold text-slate-800">{r.recipient?.name || "Student"}</p>
                        <p className="text-[11px] text-slate-500">{r.recipient?.phone}</p>
                      </td>
                      <td className="py-2.5 font-bold text-slate-900">{formatCurrency(r.amountDue)}</td>
                      <td className="py-2.5">
                        <span className="text-[11px] font-semibold text-slate-600">
                          {r.channel === "whatsapp_cloud_api" ? "Cloud API" : "Click-to-Chat"}
                        </span>
                      </td>
                      <td className="py-2.5">{getStatusBadge(r.status)}</td>
                      <td className="py-2.5 text-[11px] text-slate-500">
                        {new Date(r.createdAt).toLocaleString("en-IN", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-2.5 text-right">
                        <button
                          onClick={() => onOpenDetails(r)}
                          className="text-xs font-bold text-[#D6451B] hover:text-orange-600"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
