"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarMinus,
  FaCalendarAlt,
  FaPlus,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaBan,
  FaExclamationTriangle,
  FaChalkboardTeacher,
} from "react-icons/fa";
import {
  useGetTeacherLeaves,
} from "@/Hooks/useTimetableAttendance";
import {
  useRequestTeacherLeaveMutation,
  useCancelTeacherLeaveMutation,
} from "@/app/mutations/TimetableAttendanceMutations";
import { previewTeacherLeaveAffectedApi } from "@/app/api/timetableAndAttendanceApi";
import { formatDate } from "@/Utils/formatDate";
import Loading from "@/app/Components/ui/Loading";
import { toast } from "sonner";
import useAuthStore from "@/store/authStore";

export default function TeacherLeavesClient() {
  const user = useAuthStore((state) => state.user);
  const { data: leavesData, isLoading } = useGetTeacherLeaves();
  const requestMutation = useRequestTeacherLeaveMutation();
  const cancelMutation = useCancelTeacherLeaveMutation();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [type, setType] = useState("planned");

  const [affectedSessions, setAffectedSessions] = useState([]);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  // When dates change, preview affected sessions
  useEffect(() => {
    let isCancelled = false;
    async function loadPreview() {
      if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
        setAffectedSessions([]);
        return;
      }
      try {
        setIsLoadingPreview(true);
        const res = await previewTeacherLeaveAffectedApi({
          teacherId: user?._id || user?.id,
          startDate,
          endDate,
        });
        if (!isCancelled) {
          setAffectedSessions(res.data?.affectedSessions || []);
        }
      } catch (err) {
        if (!isCancelled) setAffectedSessions([]);
      } finally {
        if (!isCancelled) setIsLoadingPreview(false);
      }
    }
    loadPreview();
    return () => {
      isCancelled = true;
    };
  }, [startDate, endDate, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason.trim()) {
      toast.error("Please fill in start date, end date, and reason.");
      return;
    }
    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date cannot be after end date.");
      return;
    }

    await requestMutation.mutateAsync({
      startDate,
      endDate,
      reason: reason.trim(),
      type,
    });

    setStartDate("");
    setEndDate("");
    setReason("");
    setAffectedSessions([]);
  };

  const handleCancel = async (id) => {
    if (confirm("Cancel this leave request?")) {
      await cancelMutation.mutateAsync(id);
    }
  };

  if (isLoading) return <Loading />;

  const leaves = leavesData?.leaves || [];

  return (
    <div className="w-full space-y-6">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-[#D6451B] p-6 rounded-2xl text-white shadow-md">
        <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
          <FaCalendarMinus />
          Teacher Leave Management
        </h1>
        <p className="text-orange-100 text-xs sm:text-sm mt-1">
          Submit planned or emergency leaves. Your scheduled sessions will be flagged for administrator review without penalizing student attendance.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Leave Request Form */}
        <div className="lg:col-span-1 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FaPlus className="text-orange-500 text-xs" />
            Apply for Leave
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Leave Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
              >
                <option value="planned">Planned Leave</option>
                <option value="emergency">Emergency Leave</option>
                <option value="sick">Medical / Sick Leave</option>
                <option value="casual">Casual Leave</option>
                <option value="other">Other</option>
              </select>
            </div>

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
                Reason
              </label>
              <textarea
                rows={3}
                required
                placeholder="Reason for leave..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              />
            </div>

            {/* Affected Sessions Live Preview */}
            {startDate && endDate && (
              <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 space-y-2">
                <p className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                  <FaExclamationTriangle />
                  Affected Classes Preview
                </p>
                {isLoadingPreview ? (
                  <p className="text-xs text-amber-700">Checking scheduled sessions...</p>
                ) : affectedSessions.length === 0 ? (
                  <p className="text-xs text-emerald-700 font-semibold">
                    ✓ No classes scheduled in this period.
                  </p>
                ) : (
                  <div>
                    <p className="text-xs text-amber-800 font-semibold mb-1">
                      {affectedSessions.length} class(es) scheduled during these dates:
                    </p>
                    <ul className="text-xs text-slate-700 space-y-1 max-h-36 overflow-y-auto">
                      {affectedSessions.map((s) => (
                        <li key={s._id} className="bg-white p-1.5 rounded-md border border-amber-100 flex items-center justify-between">
                          <span className="font-bold text-slate-800">{s.batch?.name || "Batch"}</span>
                          <span className="text-slate-500">{formatDate(s.date)} ({s.startTime}-{s.endTime})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={requestMutation.isPending}
              className="w-full py-2.5 rounded-xl bg-[#D6451B] text-white text-xs font-bold hover:bg-orange-600 active:scale-98 transition-all shadow-xs"
            >
              {requestMutation.isPending ? "Submitting..." : "Submit Leave Request"}
            </button>
          </form>
        </div>

        {/* Right Column: Leave History */}
        <div className="lg:col-span-2 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FaClock className="text-orange-500 text-xs" />
            My Leave History ({leaves.length})
          </h2>

          {leaves.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <FaCalendarMinus className="text-4xl mx-auto text-slate-300 mb-2" />
              <p className="font-semibold text-slate-600">No leave requests recorded</p>
              <p className="text-xs mt-1">Submit your first request using the form on the left.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {leaves.map((leave) => (
                <div key={leave._id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
                      <span className="text-xs text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded-md font-semibold">
                        {leave.type}
                      </span>
                      <span className="text-xs text-slate-400">
                        Submitted {formatDate(leave.createdAt)}
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
                      onClick={() => handleCancel(leave._id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-bold transition-all self-start sm:self-center"
                    >
                      <FaBan />
                      Cancel
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
