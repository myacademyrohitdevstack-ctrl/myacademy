"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaWhatsapp,
  FaCheckDouble,
  FaPaperPlane,
  FaClock,
  FaTimesCircle,
  FaUserCheck,
  FaExternalLinkAlt,
  FaSyncAlt,
} from "react-icons/fa";
import { useRetryReminderMutation } from "@/app/mutations/whatsappReminderMutations";

export default function ReminderDetailsModal({ isOpen, onClose, reminder }) {
  const retryMutation = useRetryReminderMutation();

  if (!isOpen || !reminder) return null;

  const formatCurrency = (val) =>
    Number(val || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  const formatDate = (d) =>
    d
      ? new Date(d).toLocaleString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden my-6 text-xs"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-[#D6451B] flex items-center justify-center text-white shadow-xs">
                <FaWhatsapp className="text-xl" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Reminder Record Inspector
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  ID: {reminder._id?.slice(-8)} | Channel: {reminder.channel}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>

          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Recipient & Amount Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] uppercase font-bold text-slate-400">Recipient</p>
                <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                  {reminder.recipient?.name || "Student"}
                </p>
                <p className="text-xs text-slate-600 font-medium">{reminder.recipient?.phone}</p>
                <p className="text-[10px] text-slate-400 capitalize mt-0.5">Role: {reminder.recipient?.role}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-[10px] uppercase font-bold text-slate-400">Fee Amount Due</p>
                <p className="text-sm font-black text-slate-900 mt-0.5">
                  {formatCurrency(reminder.amountDue)}
                </p>
                <p className="text-xs text-slate-600 font-medium">
                  {reminder.installmentLabel || "Consolidated Balance"}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Status: <strong className="uppercase">{reminder.status}</strong>
                </p>
              </div>
            </div>

            {/* Failure Alert */}
            {reminder.status === "failed" && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800">
                <p className="font-bold flex items-center gap-1.5">
                  <FaTimesCircle className="text-rose-600" /> Failure Reason:
                </p>
                <p className="text-xs font-semibold mt-0.5">
                  {reminder.failureReason || "Meta API Error or network rejection"}
                </p>
              </div>
            )}

            {/* Rendered Message Text */}
            <div>
              <p className="text-[11px] font-bold text-slate-700 uppercase mb-1">
                Dispatched / Rendered Message
              </p>
              <div className="p-3.5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800">
                {reminder.renderedMessage}
              </div>
            </div>

            {/* Audit & Timestamps */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500">Created At:</span>
                <span className="font-semibold text-slate-800">{formatDate(reminder.createdAt)}</span>
              </div>
              {reminder.sentAt && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Sent to Provider:</span>
                  <span className="font-semibold text-slate-800">{formatDate(reminder.sentAt)}</span>
                </div>
              )}
              {reminder.deliveredAt && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Delivered At:</span>
                  <span className="font-semibold text-slate-800">{formatDate(reminder.deliveredAt)}</span>
                </div>
              )}
              {reminder.readAt && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Read At:</span>
                  <span className="font-semibold text-slate-800">{formatDate(reminder.readAt)}</span>
                </div>
              )}
              {reminder.manuallyConfirmedAt && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Manually Confirmed At:</span>
                  <span className="font-semibold text-teal-800">{formatDate(reminder.manuallyConfirmedAt)}</span>
                </div>
              )}
              {reminder.providerMessageId && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Meta WAMID:</span>
                  <span className="font-mono text-[10px] text-slate-700">{reminder.providerMessageId}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>

            <div className="flex items-center gap-2">
              {reminder.clickToChatUrl && (
                <a
                  href={reminder.clickToChatUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#D6451B] font-bold text-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <FaExternalLinkAlt className="text-xs" /> Open WhatsApp
                </a>
              )}
              {reminder.status === "failed" && (
                <button
                  onClick={() => retryMutation.mutate(reminder._id)}
                  disabled={retryMutation.isPending}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <FaSyncAlt className={`text-xs ${retryMutation.isPending ? "animate-spin" : ""}`} />
                  Retry Reminder
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
