"use client";

import { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaWhatsapp,
  FaCheckDouble,
  FaTimesCircle,
  FaPaperPlane,
  FaUserCheck,
  FaClock,
  FaBan,
  FaSyncAlt,
  FaExternalLinkAlt,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
} from "react-icons/fa";
import { useWhatsAppReminders } from "@/Hooks/useWhatsAppReminders";
import {
  useConfirmManualSendMutation,
  useRetryReminderMutation,
  useCancelReminderMutation,
} from "@/app/mutations/whatsappReminderMutations";

export default function ReminderHistoryTab({ onOpenDetails }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);

  const confirmManualMutation = useConfirmManualSendMutation();
  const retryMutation = useRetryReminderMutation();
  const cancelMutation = useCancelReminderMutation();

  const formatChannelName = (channel) => {
    if (channel === "resend_email" || channel === "email") return "Resend Email";
    if (channel === "myacademy_api" || channel === "platform_api") return "MyAcademy API";
    if (channel === "whatsapp_cloud_api" || channel === "cloud_api") return "Meta Cloud API";
    return "Click-to-Chat";
  };

  const queryParams = {
    page,
    limit: 15,
    status: statusFilter,
    search: searchTerm,
    from: fromDate || undefined,
    to: toDate || undefined,
  };

  const { data: response, isLoading } = useWhatsAppReminders(queryParams);

  const reminders = response?.data || [];
  const total = response?.total || 0;
  const totalPages = response?.pages || 1;

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
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <FaCheckDouble className="text-[10px]" /> Delivered
          </span>
        );
      case "sent_to_provider":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
            <FaPaperPlane className="text-[10px]" /> Provider Accepted
          </span>
        );
      case "manually_confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-700 border border-teal-200">
            <FaUserCheck className="text-[10px]" /> Manually Confirmed
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <FaTimesCircle className="text-[10px]" /> Failed
          </span>
        );
      case "scheduled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            <FaClock className="text-[10px]" /> Scheduled
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
            <FaBan className="text-[10px]" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <FaClock className="text-[10px]" /> Click-to-Chat Draft
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search by recipient, phone, or text..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6451B]/20"
            />
          </div>

          {/* Status Dropdown & Date Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:items-center gap-2.5 w-full lg:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D6451B]/20"
            >
              <option value="all">All Statuses</option>
              <option value="delivered">Delivered / Read</option>
              <option value="sent_to_provider">Provider Accepted</option>
              <option value="manually_confirmed">Manually Confirmed</option>
              <option value="draft">Click-to-Chat Draft</option>
              <option value="failed">Failed</option>
              <option value="scheduled">Scheduled</option>
              <option value="cancelled">Cancelled</option>
            </select>

            {/* Date Pickers */}
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
                setPage(1);
              }}
              className="text-xs px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold"
              title="From date"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
                setPage(1);
              }}
              className="text-xs px-2.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-semibold"
              title="To date"
            />

            {(fromDate || toDate || statusFilter !== "all" || searchTerm) && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setFromDate("");
                  setToDate("");
                  setPage(1);
                }}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 px-3 py-2 rounded-xl bg-rose-50 text-center"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Table */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="text-center py-12 text-slate-500">
            <FaSpinner className="mx-auto text-2xl text-[#D6451B] animate-spin mb-2" />
            <p className="text-xs font-semibold">Loading reminder history...</p>
          </div>
        ) : reminders.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <FaWhatsapp className="mx-auto text-3xl text-slate-300 mb-2" />
            <p className="text-sm font-bold text-slate-800">No reminder records found</p>
            <p className="text-xs text-slate-400 mt-1">
              Adjust your search filters or send fee reminders to see them recorded here.
            </p>
          </div>
        ) : (
          <div>
            {/* Mobile Cards View (< 768px) */}
            <div className="space-y-3 md:hidden">
              {reminders.map((r) => (
                <div
                  key={r._id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        {r.recipient?.name || "Student"}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">{r.recipient?.phone}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Student: {r.studentId?.fullName || "Student Account"}
                      </p>
                    </div>
                    {getStatusBadge(r.status)}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100">
                    <div>
                      <p className="text-[10px] text-slate-400">Amount Due</p>
                      <p className="font-black text-slate-900">{formatCurrency(r.amountDue)}</p>
                      <p className="text-[10px] text-slate-400">{r.installmentLabel || "Consolidated Balance"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400">Channel & Rule</p>
                      <p className="font-semibold text-slate-700 text-[11px]">
                        {formatChannelName(r.channel)}
                      </p>
                      <p className="text-[10px] text-slate-400 capitalize">
                        {r.reminderRule?.replace(/_/g, " ") || "Manual"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
                    <span className="text-[10px] text-slate-400">
                      {new Date(r.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* Open WhatsApp if Click-to-Chat */}
                      {r.clickToChatUrl && r.status === "draft" && (
                        <a
                          href={r.clickToChatUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#D6451B] font-bold text-xs inline-flex items-center gap-1 transition-colors"
                        >
                          <FaExternalLinkAlt className="text-[10px]" /> Open
                        </a>
                      )}

                      {/* Mark manually sent if draft */}
                      {r.status === "draft" && (
                        <button
                          onClick={() => confirmManualMutation.mutate(r._id)}
                          disabled={confirmManualMutation.isPending}
                          className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-xs inline-flex items-center gap-1 transition-colors disabled:opacity-50"
                        >
                          <FaUserCheck className="text-[10px]" /> Confirm
                        </button>
                      )}

                      {/* Retry if failed */}
                      {r.status === "failed" && (
                        <button
                          onClick={() => retryMutation.mutate(r._id)}
                          disabled={retryMutation.isPending}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs inline-flex items-center gap-1 transition-colors disabled:opacity-50"
                        >
                          <FaSyncAlt className={`text-[10px] ${retryMutation.isPending ? "animate-spin" : ""}`} />
                          Retry
                        </button>
                      )}

                      {/* Cancel if scheduled */}
                      {r.status === "scheduled" && (
                        <button
                          onClick={() => cancelMutation.mutate(r._id)}
                          disabled={cancelMutation.isPending}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1 transition-colors disabled:opacity-50"
                        >
                          <FaBan className="text-[10px]" /> Cancel
                        </button>
                      )}

                      {/* View full message details */}
                      <button
                        onClick={() => onOpenDetails(r)}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1 transition-colors"
                      >
                        <FaEye className="text-[10px]" /> Inspect
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table View (>= 768px) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 font-bold">
                    <th className="pb-3">Recipient & Student</th>
                    <th className="pb-3">Installment & Amount</th>
                    <th className="pb-3">Channel</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Timestamp</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {reminders.map((r) => (
                    <tr key={r._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3">
                        <p className="font-extrabold text-slate-900">{r.recipient?.name || "Student"}</p>
                        <p className="text-[11px] text-slate-500 font-medium">{r.recipient?.phone}</p>
                        <p className="text-[10px] text-slate-400">
                          Student: {r.studentId?.fullName || "Student Account"}
                        </p>
                      </td>
                      <td className="py-3">
                        <p className="font-extrabold text-slate-900">{formatCurrency(r.amountDue)}</p>
                        <p className="text-[11px] text-slate-500">{r.installmentLabel || "Consolidated Balance"}</p>
                      </td>
                      <td className="py-3">
                        <span className="text-[11px] font-semibold text-slate-700">
                          {formatChannelName(r.channel)}
                        </span>
                        <p className="text-[10px] text-slate-400 capitalize">{r.reminderRule?.replace(/_/g, " ")}</p>
                      </td>
                      <td className="py-3">{getStatusBadge(r.status)}</td>
                      <td className="py-3 text-[11px] text-slate-500">
                        {new Date(r.createdAt).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Open WhatsApp if Click-to-Chat */}
                          {r.clickToChatUrl && r.status === "draft" && (
                            <a
                              href={r.clickToChatUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#D6451B] font-bold text-xs inline-flex items-center gap-1 transition-colors"
                            >
                              <FaExternalLinkAlt className="text-[10px]" /> Open
                            </a>
                          )}

                          {/* Mark manually sent if draft */}
                          {r.status === "draft" && (
                            <button
                              onClick={() => confirmManualMutation.mutate(r._id)}
                              disabled={confirmManualMutation.isPending}
                              className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-700 font-bold text-xs inline-flex items-center gap-1 transition-colors disabled:opacity-50"
                            >
                              <FaUserCheck className="text-[10px]" /> Confirm
                            </button>
                          )}

                          {/* Retry if failed */}
                          {r.status === "failed" && (
                            <button
                              onClick={() => retryMutation.mutate(r._id)}
                              disabled={retryMutation.isPending}
                              className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs inline-flex items-center gap-1 transition-colors disabled:opacity-50"
                            >
                              <FaSyncAlt className={`text-[10px] ${retryMutation.isPending ? "animate-spin" : ""}`} />
                              Retry
                            </button>
                          )}

                          {/* Cancel if scheduled */}
                          {r.status === "scheduled" && (
                            <button
                              onClick={() => cancelMutation.mutate(r._id)}
                              disabled={cancelMutation.isPending}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1 transition-colors disabled:opacity-50"
                            >
                              <FaBan className="text-[10px]" /> Cancel
                            </button>
                          )}

                          {/* View full message details */}
                          <button
                            onClick={() => onOpenDetails(r)}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center gap-1 transition-colors"
                          >
                            <FaEye className="text-[10px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. Pagination */}
        {totalPages > 1 && (
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>
              Showing {(page - 1) * 15 + 1} - {Math.min(page * 15, total)} of {total} reminders
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <span className="font-bold text-slate-700">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-40"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
