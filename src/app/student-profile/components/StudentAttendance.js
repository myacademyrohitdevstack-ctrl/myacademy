"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaClipboardCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaCalendarMinus,
  FaPlus,
  FaClock,
  FaExclamationCircle,
  FaBan,
} from "react-icons/fa";
import {
  useGetStudentAttendanceReport,
  useGetMyStudentLeaves,
} from "@/Hooks/useTimetableAttendance";
import {
  useRequestStudentLeaveMutation,
  useCancelStudentLeaveMutation,
} from "@/app/mutations/TimetableAttendanceMutations";
import { formatDate } from "@/Utils/formatDate";
import Loading from "@/app/Components/ui/Loading";
import { toast } from "sonner";

export default function StudentAttendance({ user }) {
  const studentId = user?._id || user?.id;
  const { data: attendanceData, isLoading: isLoadingAttendance } =
    useGetStudentAttendanceReport(studentId);
  const { data: leavesData, isLoading: isLoadingLeaves } = useGetMyStudentLeaves();

  const requestLeaveMutation = useRequestStudentLeaveMutation();
  const cancelLeaveMutation = useCancelStudentLeaveMutation();

  const [activeTab, setActiveTab] = useState("attendance"); // "attendance" | "leaves"
  const [showLeaveModal, setShowLeaveModal] = useState(false);

  // Form state
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const summary = attendanceData?.summary || {
    totalClasses: 0,
    present: 0,
    leave: 0,
    absent: 0,
    attendancePercentage: 0,
  };

  const records = attendanceData?.report || [];
  const leaves = leavesData?.leaves || [];

  const handleLeaveSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason.trim()) {
      toast.error("Please fill in start date, end date, and reason.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date cannot be after end date.");
      return;
    }

    await requestLeaveMutation.mutateAsync({
      startDate,
      endDate,
      reason: reason.trim(),
    });

    setShowLeaveModal(false);
    setStartDate("");
    setEndDate("");
    setReason("");
  };

  const handleCancelLeave = async (leaveId) => {
    if (confirm("Are you sure you want to cancel this leave request?")) {
      await cancelLeaveMutation.mutateAsync(leaveId);
    }
  };

  if (isLoadingAttendance && isLoadingLeaves) return <Loading />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-gradient-to-r from-orange-500 via-orange-600 to-[#D6451B] p-6 rounded-2xl text-white shadow-md">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
            <FaClipboardCheck />
            Attendance & Leave Portal
          </h1>
          <p className="text-orange-100 text-xs sm:text-sm mt-1">
            Track your class attendance rate, session history, and submit leave requests.
          </p>
        </div>
        <button
          onClick={() => setShowLeaveModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-orange-600 font-bold text-sm shadow-sm hover:bg-orange-50 active:scale-95 transition-all"
        >
          <FaPlus className="text-xs" />
          Request Leave
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Attendance Rate
          </p>
          <div className="flex items-baseline gap-2 mt-2">
            <span
              className={`text-2xl sm:text-3xl font-black ${
                summary.attendancePercentage >= 75
                  ? "text-emerald-600"
                  : summary.attendancePercentage >= 60
                  ? "text-amber-600"
                  : "text-rose-600"
              }`}
            >
              {summary.attendancePercentage}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-3 overflow-hidden">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                summary.attendancePercentage >= 75
                  ? "bg-emerald-500"
                  : summary.attendancePercentage >= 60
                  ? "bg-amber-500"
                  : "bg-rose-500"
              }`}
              style={{ width: `${Math.min(summary.attendancePercentage, 100)}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Classes
          </p>
          <p className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            {summary.totalClasses}
          </p>
          <p className="text-xs text-slate-400 mt-1">Held during enrolment</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-100 bg-emerald-50/20 shadow-2xs">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            Attended (Present)
          </p>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-2">
            {summary.present}
          </p>
          <p className="text-xs text-emerald-700/70 mt-1">Classes attended</p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-100 bg-amber-50/20 shadow-2xs">
          <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
            Approved Leave
          </p>
          <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-2">
            {summary.leave}
          </p>
          <p className="text-xs text-amber-700/70 mt-1">Excused absences</p>
        </div>

        <div className="col-span-2 lg:col-span-1 bg-white p-4 sm:p-5 rounded-2xl border border-rose-100 bg-rose-50/20 shadow-2xs">
          <p className="text-xs font-semibold text-rose-700 uppercase tracking-wider">
            Unexcused Absent
          </p>
          <p className="text-2xl sm:text-3xl font-black text-rose-600 mt-2">
            {summary.absent}
          </p>
          <p className="text-xs text-rose-700/70 mt-1">Missed sessions</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-3">
        <button
          onClick={() => setActiveTab("attendance")}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-all ${
            activeTab === "attendance"
              ? "border-[#D6451B] text-[#D6451B]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          Session Attendance History ({records.length})
        </button>
        <button
          onClick={() => setActiveTab("leaves")}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-all ${
            activeTab === "leaves"
              ? "border-[#D6451B] text-[#D6451B]"
              : "border-transparent text-slate-500 hover:text-slate-800"
          }`}
        >
          My Leave Requests ({leaves.length})
        </button>
      </div>

      {/* Tab 1: Attendance Register */}
      {activeTab === "attendance" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          {records.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <FaClipboardCheck className="text-4xl mx-auto text-slate-300 mb-2" />
              <p className="font-semibold text-slate-600">No attendance records yet</p>
              <p className="text-xs mt-1">
                Your attendance will appear here once teachers record session roll calls.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Batch / Session</th>
                    <th className="py-3 px-4">Time</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Remarks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((rec, idx) => (
                    <tr key={rec.attendanceId || idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-900">
                        {formatDate(rec.date)}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800">
                          {rec.batchName}
                        </span>
                        {rec.session?.title && (
                          <span className="block text-xs text-slate-500">
                            {rec.session.title}
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap">
                        {rec.session?.startTime && rec.session?.endTime
                          ? `${rec.session.startTime} - ${rec.session.endTime}`
                          : "Regular timing"}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        {rec.status === "present" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                            <FaCheckCircle className="text-emerald-600" />
                            Present
                          </span>
                        )}
                        {rec.status === "absent" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800">
                            <FaTimesCircle className="text-rose-600" />
                            Absent
                          </span>
                        )}
                        {rec.status === "leave" && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                            <FaCalendarMinus className="text-amber-600" />
                            Approved Leave
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-slate-500">
                        {rec.remarks || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Leaves Management */}
      {activeTab === "leaves" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
          {leaves.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <FaCalendarMinus className="text-4xl mx-auto text-slate-300 mb-2" />
              <p className="font-semibold text-slate-600">No leave requests submitted</p>
              <p className="text-xs mt-1">
                Need to miss a class? Click &quot;Request Leave&quot; above to submit an excused absence request.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {leaves.map((leave) => (
                <div key={leave._id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          leave.status === "approved"
                            ? "bg-emerald-100 text-emerald-800"
                            : leave.status === "rejected"
                            ? "bg-rose-100 text-rose-800"
                            : leave.status === "cancelled"
                            ? "bg-slate-100 text-slate-700"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {leave.status.toUpperCase()}
                      </span>
                      <span className="text-xs text-slate-400">
                        Submitted on {formatDate(leave.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <FaCalendarAlt className="text-orange-500" />
                      {formatDate(leave.startDate)} to {formatDate(leave.endDate)}
                    </p>
                    <p className="text-xs text-slate-600">
                      <span className="font-semibold">Reason:</span> {leave.reason}
                    </p>
                    {leave.reviewRemarks && (
                      <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200 inline-block mt-1">
                        <span className="font-semibold">Reviewer Remarks:</span> {leave.reviewRemarks}
                      </p>
                    )}
                  </div>
                  {leave.status === "pending" && (
                    <button
                      onClick={() => handleCancelLeave(leave._id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all self-start sm:self-center"
                    >
                      <FaBan />
                      Cancel Request
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Leave Request Modal */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200"
          >
            <div className="bg-gradient-to-r from-orange-500 to-[#D6451B] p-4 text-white">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <FaCalendarMinus />
                Request Student Leave
              </h3>
              <p className="text-orange-100 text-xs mt-0.5">
                Approved leaves prevent false absences during excused dates.
              </p>
            </div>
            <form onSubmit={handleLeaveSubmit} className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Reason for Leave
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Medical illness, family emergency, academic competition..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowLeaveModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={requestLeaveMutation.isPending}
                  className="px-4 py-2 rounded-xl bg-[#D6451B] text-white text-xs font-bold hover:bg-orange-600 transition-all shadow-xs"
                >
                  {requestLeaveMutation.isPending ? "Submitting..." : "Submit Leave Request"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
