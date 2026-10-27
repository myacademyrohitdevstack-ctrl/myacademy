"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaCalendarDay,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaArrowRight,
  FaUserGraduate,
  FaVideo,
  FaMapMarkerAlt,
  FaCalendarMinus,
} from "react-icons/fa";
import {
  useGetTeacherTodaySessions,
  useGetTeacherPendingSessions,
} from "@/Hooks/useTimetableAttendance";
import { formatDate } from "@/Utils/formatDate";

export default function TeacherSessionDashboardWidget() {
  const router = useRouter();
  const { data: todayData, isLoading: isLoadingToday } = useGetTeacherTodaySessions();
  const { data: pendingData } = useGetTeacherPendingSessions();

  const todaySessions = todayData?.sessions || [];
  const pendingSessions = pendingData?.sessions || [];

  return (
    <div className="space-y-4 mb-6">
      {/* Alert for Pending Past Attendance */}
      {pendingSessions.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <FaExclamationCircle className="text-amber-500 text-xl shrink-0" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-amber-900">
                {pendingSessions.length} past session(s) awaiting attendance submission
              </p>
              <p className="text-xs text-amber-700">
                Please complete attendance roll calls to keep student attendance records up to date.
              </p>
            </div>
          </div>
          <Link
            href={`/teacher-panel/mark-attendence?sessionId=${pendingSessions[0]._id}&batchId=${pendingSessions[0].batch?._id || pendingSessions[0].batch}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-bold hover:bg-amber-600 transition-all shrink-0"
          >
            Mark Oldest Pending
            <FaArrowRight className="text-2xs" />
          </Link>
        </div>
      )}

      {/* Today's Scheduled Classes Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <FaCalendarDay className="text-[#D6451B]" />
              Today&apos;s Scheduled Classes
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Classes automatically populated from your recurring timetable.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href="/teacher-panel/leaves"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-all"
            >
              <FaCalendarMinus className="text-orange-500" />
              Apply Leave
            </Link>
            <span className="text-xs font-bold bg-orange-100 text-[#D6451B] px-2.5 py-1 rounded-full">
              {todaySessions.length} session(s) today
            </span>
          </div>
        </div>

        {isLoadingToday ? (
          <div className="py-8 text-center text-xs text-slate-400">Loading today&apos;s classes...</div>
        ) : todaySessions.length === 0 ? (
          <div className="py-8 text-center text-slate-400 space-y-1">
            <p className="text-sm font-bold text-slate-600">No scheduled classes today</p>
            <p className="text-xs text-slate-400">
              Classes are generated automatically based on your batch timetables.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {todaySessions.map((s) => {
              const batchId = s.batch?._id || s.batch;
              const batchName = s.batch?.name || s.title || "Class Session";
              const studentCount = s.batch?.students?.length || 0;

              return (
                <div
                  key={s._id}
                  className={`p-4 rounded-xl border transition-all flex flex-col justify-between space-y-3 ${
                    s.status === "cancelled"
                      ? "bg-rose-50/40 border-rose-200"
                      : s.attendanceMarked
                      ? "bg-emerald-50/30 border-emerald-200"
                      : "bg-white border-slate-200 hover:border-orange-300 hover:shadow-xs"
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-extrabold text-sm text-slate-900 truncate">
                        {batchName}
                      </span>
                      {s.status === "cancelled" ? (
                        <span className="px-2 py-0.5 rounded-md text-2xs font-bold bg-rose-100 text-rose-700">
                          Cancelled
                        </span>
                      ) : s.attendanceMarked ? (
                        <span className="px-2 py-0.5 rounded-md text-2xs font-bold bg-emerald-100 text-emerald-700 flex items-center gap-1">
                          <FaCheckCircle className="text-2xs" />
                          Marked
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-md text-2xs font-bold bg-amber-100 text-amber-800">
                          Pending Roll Call
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <FaClock className="text-slate-400 text-2xs" />
                        {s.startTime} - {s.endTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaUserGraduate className="text-slate-400 text-2xs" />
                        {studentCount} Students
                      </span>
                    </div>

                    {s.meetingPlatform && s.meetingPlatform !== "offline" && (
                      <p className="text-2xs text-blue-600 font-semibold flex items-center gap-1">
                        <FaVideo className="text-2xs" />
                        Online ({s.meetingPlatform})
                      </p>
                    )}
                    {s.room && (
                      <p className="text-2xs text-slate-500 flex items-center gap-1">
                        <FaMapMarkerAlt className="text-2xs" />
                        Room: {s.room}
                      </p>
                    )}

                    {s.cancellationReason && (
                      <p className="text-2xs text-rose-600 italic">
                        Reason: {s.cancellationReason}
                      </p>
                    )}
                  </div>

                  {s.status !== "cancelled" && (
                    <div>
                      {s.attendanceMarked ? (
                        <button
                          onClick={() =>
                            router.push(
                              `/teacher-panel/mark-attendence?sessionId=${s._id}&batchId=${batchId}&mode=edit`
                            )
                          }
                          className="w-full py-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition-all"
                        >
                          Review / Edit Roll Call
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            router.push(
                              `/teacher-panel/mark-attendence?sessionId=${s._id}&batchId=${batchId}`
                            )
                          }
                          className="w-full py-2 rounded-lg bg-[#D6451B] text-white hover:bg-orange-600 text-xs font-bold transition-all shadow-2xs flex items-center justify-center gap-1.5"
                        >
                          <FaCheckCircle className="text-xs" />
                          Mark Attendance
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
