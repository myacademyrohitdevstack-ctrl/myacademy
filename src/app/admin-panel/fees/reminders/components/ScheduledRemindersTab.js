"use client";

import {
  FaClock,
  FaCalendarAlt,
  FaWhatsapp,
  FaBan,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";
import { useScheduledReminders } from "@/Hooks/useWhatsAppReminders";
import { useCancelScheduledReminderMutation } from "@/app/mutations/whatsappReminderMutations";

export default function ScheduledRemindersTab() {
  const { data: scheduledReminders = [], isLoading } = useScheduledReminders();
  const cancelMutation = useCancelScheduledReminderMutation();

  const formatCurrency = (val) =>
    Number(val || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FaClock className="text-purple-600" /> Scheduled Reminders
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Future one-time fee reminders queued for automatic dispatch.
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 w-fit">
          {scheduledReminders.length} Scheduled
        </span>
      </div>

      {/* Table */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="text-center py-12 text-slate-500">
            <FaSpinner className="mx-auto text-2xl text-[#D6451B] animate-spin mb-2" />
            <p className="text-xs font-semibold">Loading scheduled reminders...</p>
          </div>
        ) : scheduledReminders.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <FaCalendarAlt className="mx-auto text-3xl text-slate-300 mb-2" />
            <p className="text-sm font-bold text-slate-800">No scheduled reminders</p>
            <p className="text-xs text-slate-400 mt-1">
              You can schedule reminders for a specific date and time from the &quot;Send Reminders&quot; tab.
            </p>
          </div>
        ) : (
          <div>
            {/* Mobile Cards View (< 768px) */}
            <div className="space-y-3 md:hidden">
              {scheduledReminders.map((item) => (
                <div
                  key={item._id}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-white space-y-2.5 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-extrabold text-slate-900 text-xs sm:text-sm">
                        {item.recipient?.name || "Student"}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">{item.recipient?.phone}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Student: {item.studentId?.fullName || "Account"}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      <FaClock className="text-[9px]" /> Scheduled
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1.5 border-t border-slate-100">
                    <div>
                      <p className="text-[10px] text-slate-400">Amount Due</p>
                      <p className="font-black text-slate-900">{formatCurrency(item.amountDue)}</p>
                      <p className="text-[10px] text-slate-400">{item.installmentLabel || "Consolidated Balance"}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400">Scheduled At</p>
                      <p className="font-semibold text-slate-700 text-[11px]">
                        {new Date(item.scheduledAt).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">
                      By {item.createdBy?.fullName || "Admin"}
                    </span>

                    <button
                      onClick={() => cancelMutation.mutate(item._id)}
                      disabled={cancelMutation.isPending}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs inline-flex items-center gap-1 transition-colors disabled:opacity-50"
                    >
                      <FaBan className="text-[10px]" /> Cancel Schedule
                    </button>
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
                    <th className="pb-3">Scheduled For</th>
                    <th className="pb-3">Created By</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scheduledReminders.map((item) => (
                    <tr key={item._id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3">
                        <p className="font-extrabold text-slate-900">{item.recipient?.name || "Student"}</p>
                        <p className="text-[11px] text-slate-500 font-medium">{item.recipient?.phone}</p>
                        <p className="text-[10px] text-slate-400">
                          Student: {item.studentId?.fullName || "Account"}
                        </p>
                      </td>
                      <td className="py-3">
                        <p className="font-extrabold text-slate-900">{formatCurrency(item.amountDue)}</p>
                        <p className="text-[11px] text-slate-500">
                          {item.installmentLabel || "Consolidated Balance"}
                        </p>
                      </td>
                      <td className="py-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          <FaClock className="text-[10px]" />
                          {new Date(item.scheduledAt).toLocaleString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </td>
                      <td className="py-3 text-[11px] font-medium text-slate-600">
                        {item.createdBy?.fullName || "Admin"}
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => cancelMutation.mutate(item._id)}
                          disabled={cancelMutation.isPending}
                          className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs inline-flex items-center gap-1 transition-colors disabled:opacity-50"
                        >
                          <FaBan className="text-[10px]" /> Cancel
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
