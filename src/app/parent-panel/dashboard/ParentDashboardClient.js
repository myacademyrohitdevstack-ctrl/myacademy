"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaBookOpen,
  FaBullhorn,
  FaChalkboardTeacher,
  FaCheckCircle,
  FaTimesCircle,
  FaArrowRight,
  FaClock,
  FaSpinner,
  FaFire,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useMyChildren, useChildDashboard, useChildFees } from "@/Hooks/useParent";
import ChildSwitcher from "../components/ChildSwitcher";

export default function ParentDashboardClient() {
  const { data: childrenList, isLoading: isChildrenLoading } = useMyChildren();
  const [selectedChildIdState, setSelectedChildIdState] = useState("");

  // Derive active child ID to avoid setState inside useEffect
  const selectedChildId =
    selectedChildIdState ||
    childrenList?.[0]?.user?._id ||
    childrenList?.[0]?._id ||
    "";

  const { data: dashboardData, isLoading: isDashboardLoading } =
    useChildDashboard(selectedChildId);
  const { data: feesData } = useChildFees(selectedChildId);

  const selectedChildObj = childrenList?.find(
    (c) => (c.user?._id || c._id) === selectedChildId
  );

  // Compute fees summary
  const totalBalance =
    feesData?.fees?.reduce((sum, f) => sum + (f.balanceAmount || 0), 0) || 0;
  const totalPaid =
    feesData?.payments?.reduce((sum, p) => sum + (p.amount || 0), 0) || 0;

  if (isChildrenLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-500">
        <FaSpinner className="animate-spin inline mr-2 text-[#D6451B] text-lg" />
        <span>Loading your linked children...</span>
      </div>
    );
  }

  if (!childrenList || childrenList.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center max-w-lg mx-auto">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-[#D6451B] mb-3">
          <FaUserGraduate />
        </div>
        <h3 className="text-base font-bold text-slate-900">
          No Linked Children Found
        </h3>
        <p className="mt-2 text-xs text-slate-500 leading-relaxed">
          Your parent account is active, but an academy administrator has not yet linked a student profile to you. Please contact your academy office to complete the student link.
        </p>
      </div>
    );
  }

  const {
    student,
    batches = [],
    attendance = [],
    attendancePercentage: rawPercentage,
    attendanceSummary = {},
    announcements = [],
  } = dashboardData || {};

  // Compute or fallback attendance summary metrics
  const presentCount =
    attendanceSummary.present ??
    attendance.filter((r) => r.status === "present").length;
  const absentCount =
    attendanceSummary.absent ??
    attendance.filter((r) => r.status === "absent").length;
  const totalMarked =
    attendanceSummary.total ?? presentCount + absentCount;
  const currentStreak = attendanceSummary.currentStreak ?? 0;

  const attendancePercentage =
    rawPercentage !== null && rawPercentage !== undefined
      ? rawPercentage
      : totalMarked > 0
      ? Math.round((presentCount / totalMarked) * 100)
      : null;

  const isEligible =
    attendancePercentage === null || attendancePercentage >= 75;

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* Child Switcher Component */}
      <ChildSwitcher
        childrenList={childrenList}
        selectedChildId={selectedChildId}
        onSelect={(id) => setSelectedChildIdState(id)}
      />

      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between min-w-0">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                Parent Portal
              </span>
              {selectedChildObj?.parentRelationship && (
                <span className="rounded-full bg-black/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider capitalize">
                  Relation: {selectedChildObj.parentRelationship}
                </span>
              )}
            </div>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl truncate">
              {student?.fullName || selectedChildObj?.user?.fullName || "Child Progress"}
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm text-orange-100 max-w-2xl font-normal">
              Track real-time classroom attendance, batch schedules, upcoming dues, and official academy updates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              href={`/parent-panel/attendance?childId=${selectedChildId}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-xs sm:text-sm font-bold text-[#D6451B] shadow-xs hover:bg-orange-50 transition"
            >
              <FaCalendarCheck className="text-xs" />
              <span>Full Attendance Log</span>
            </Link>

            <Link
              href={`/parent-panel/fees?childId=${selectedChildId}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition"
            >
              <FaMoneyBillWave className="text-xs" />
              <span>Fees & Receipts</span>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
        {/* Attendance Rate */}
        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Attendance Rate</span>
            <FaCalendarCheck className="text-xs text-[#D6451B]" />
          </div>
          <h3
            className={`mt-2 text-xl sm:text-2xl font-extrabold ${
              attendancePercentage !== null
                ? attendancePercentage >= 75
                  ? "text-emerald-600"
                  : "text-rose-600"
                : "text-slate-700"
            }`}
          >
            {attendancePercentage !== null ? `${attendancePercentage}%` : "No Records"}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {totalMarked > 0 ? `${presentCount} / ${totalMarked} classes present` : "No sessions recorded"}
          </p>
        </div>

        {/* Enrolled Batches */}
        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Enrolled Cohorts</span>
            <FaBookOpen className="text-xs text-[#D6451B]" />
          </div>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
            {batches.length}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Active curriculum batches</p>
        </div>

        {/* Pending Fee Dues */}
        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Pending Dues</span>
            <FaMoneyBillWave className="text-xs text-[#D6451B]" />
          </div>
          <h3
            className={`mt-2 text-xl sm:text-2xl font-extrabold ${
              totalBalance > 0 ? "text-rose-600" : "text-emerald-600"
            }`}
          >
            ₹{totalBalance.toLocaleString("en-IN")}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            {totalBalance > 0 ? "Installment pending" : "All dues cleared"}
          </p>
        </div>

        {/* Total Paid Fees */}
        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold">Total Paid</span>
            <FaCheckCircle className="text-xs text-emerald-500" />
          </div>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
            ₹{totalPaid.toLocaleString("en-IN")}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Recorded fee receipts</p>
        </div>
      </div>

      {isDashboardLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
          <FaSpinner className="animate-spin inline mr-2 text-[#D6451B] text-lg" />
          <span>Synchronizing student records...</span>
        </div>
      ) : (
        /* Main 2-Column Content */
        <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 w-full min-w-0">
          {/* Left Column (2 cols): Batches & ATTENDANCE OVERVIEW */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0">
            {/* ENHANCED ATTENDANCE OVERVIEW CARD */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-lg text-[#D6451B]">
                    <FaCalendarCheck />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      Classroom Attendance Overview & Regularity
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Day-by-day attendance marked by faculty across all cohorts
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  {attendancePercentage === null ? (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-600">
                      No Records
                    </span>
                  ) : attendancePercentage >= 75 ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                      <FaCheckCircle className="text-[10px]" />
                      <span>Exam Eligible (75%+ Met)</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[11px] font-bold text-rose-700">
                      <FaExclamationTriangle className="text-[10px]" />
                      <span>Shortage Warning (&lt;75%)</span>
                    </span>
                  )}

                  <Link
                    href={`/parent-panel/attendance?childId=${selectedChildId}`}
                    className="text-xs font-bold text-[#D6451B] hover:underline flex items-center gap-1 ml-2"
                  >
                    <span>View All</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                </div>
              </div>

              {/* Attendance Quick Metrics Bar */}
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-3">
                  <span className="text-[11px] font-medium text-slate-500">Overall Regularity</span>
                  <p
                    className={`mt-1 text-xl sm:text-2xl font-extrabold ${
                      attendancePercentage !== null
                        ? attendancePercentage >= 75
                          ? "text-emerald-600"
                          : "text-rose-600"
                        : "text-slate-700"
                    }`}
                  >
                    {attendancePercentage !== null ? `${attendancePercentage}%` : "N/A"}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">Min 75% required</p>
                </div>

                <div className="rounded-xl border border-emerald-100 bg-emerald-50/40 p-3">
                  <span className="text-[11px] font-medium text-emerald-800">Attended Classes</span>
                  <p className="mt-1 text-xl sm:text-2xl font-extrabold text-emerald-700">
                    {presentCount}
                  </p>
                  <p className="text-[10px] text-emerald-600 mt-0.5">Marked present</p>
                </div>

                <div className="rounded-xl border border-rose-100 bg-rose-50/40 p-3">
                  <span className="text-[11px] font-medium text-rose-800">Missed Sessions</span>
                  <p className="mt-1 text-xl sm:text-2xl font-extrabold text-rose-700">
                    {absentCount}
                  </p>
                  <p className="text-[10px] text-rose-600 mt-0.5">Absences recorded</p>
                </div>

                <div className="rounded-xl border border-orange-100 bg-orange-50/40 p-3">
                  <span className="text-[11px] font-medium text-orange-900">Current Streak</span>
                  <p className="mt-1 text-xl sm:text-2xl font-extrabold text-[#D6451B]">
                    {currentStreak}
                  </p>
                  <p className="text-[10px] text-orange-700 mt-0.5">Consecutive days</p>
                </div>
              </div>

              {/* Benchmark Progress Bar */}
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/60 p-3.5">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                  <span>Regularity vs Mandatory 75% Requirement</span>
                  <span
                    className={
                      attendancePercentage >= 75
                        ? "text-emerald-600 font-bold"
                        : "text-rose-600 font-bold"
                    }
                  >
                    {attendancePercentage !== null
                      ? `${attendancePercentage}% Attended`
                      : "No Sessions"}
                  </span>
                </div>

                <div className="relative mt-2.5 h-2.5 w-full rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      (attendancePercentage || 0) >= 75
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                        : "bg-gradient-to-r from-rose-500 to-amber-500"
                    }`}
                    style={{
                      width: `${Math.min(100, attendancePercentage || 0)}%`,
                    }}
                  />
                  {/* 75% marker line */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-900/60 z-10"
                    style={{ left: "75%" }}
                    title="75% Required Benchmark"
                  />
                </div>

                <div className="mt-1 flex justify-between text-[10px] text-slate-400">
                  <span>0%</span>
                  <span className="font-semibold text-slate-700">75% (Min. Benchmark)</span>
                  <span>100%</span>
                </div>
              </div>

              {/* Attendance Shortage Alert if < 75% */}
              {attendancePercentage !== null && attendancePercentage < 75 && (
                <div className="mt-3.5 rounded-xl border border-rose-200 bg-rose-50/80 p-3 text-xs text-rose-800 flex items-start gap-2.5">
                  <FaExclamationTriangle className="text-rose-600 mt-0.5 shrink-0 text-sm" />
                  <div>
                    <span className="font-bold">Attention Required:</span>
                    <p className="mt-0.5 text-rose-700 leading-relaxed text-[11px]">
                      Your child&apos;s attendance is currently below the academy&apos;s 75% mandatory threshold. Regular attendance is required to remain eligible for term examinations and certificates.
                    </p>
                  </div>
                </div>
              )}

              {/* Recent Classroom Attendance List */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Recent Attendance Records
                </h4>

                {attendance.length === 0 ? (
                  <div className="py-8 text-center text-slate-400 text-xs">
                    No attendance records recorded for this student yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {attendance.slice(0, 8).map((record, idx) => {
                      const isPresent = record.status === "present";
                      const isAbsent = record.status === "absent";
                      const recordDate = record.date
                        ? new Date(record.date).toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })
                        : "Date N/A";

                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5 text-xs hover:bg-slate-100/60 transition"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            {isPresent ? (
                              <FaCheckCircle className="text-emerald-500 text-sm shrink-0" />
                            ) : isAbsent ? (
                              <FaTimesCircle className="text-rose-500 text-sm shrink-0" />
                            ) : (
                              <FaClock className="text-slate-400 text-sm shrink-0" />
                            )}
                            <div className="min-w-0">
                              <p className="font-bold text-slate-800 truncate">
                                {record.batchName || "Classroom Session"}
                              </p>
                              <p className="text-[11px] text-slate-400">{recordDate}</p>
                            </div>
                          </div>

                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider shrink-0 ${
                              isPresent
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : isAbsent
                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {record.status || "Unmarked"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Enrolled Batches */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FaChalkboardTeacher className="text-[#D6451B]" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Enrolled Batches & Classes
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {batches.length} {batches.length === 1 ? "Batch" : "Batches"}
                </span>
              </div>

              {batches.length === 0 ? (
                <div className="py-8 text-center text-slate-500 text-xs">
                  Student is not currently enrolled in any active classroom batch.
                </div>
              ) : (
                <div className="mt-3.5 space-y-3">
                  {batches.map((b) => (
                    <div
                      key={b._id}
                      className="rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 sm:p-4 hover:border-orange-200 transition"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {b.name}
                          </h4>
                          <p className="text-xs text-[#D6451B] font-semibold mt-0.5">
                            {b.course?.title || b.course?.name || "General Course"}
                          </p>
                        </div>
                        <span className="self-start sm:self-auto rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                          Active Cohort
                        </span>
                      </div>

                      {b.trainers && b.trainers.length > 0 && (
                        <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="font-semibold text-slate-400">Instructors:</span>
                          <span>{b.trainers.map((t) => t.fullName).join(", ")}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column (1 col): Announcements & Quick Contacts */}
          <div className="space-y-4 sm:space-y-6 min-w-0">
            {/* Announcements */}
            <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FaBullhorn className="text-[#D6451B]" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Academy Announcements
                  </h3>
                </div>
                <span className="text-xs font-bold text-slate-400">
                  {announcements.length}
                </span>
              </div>

              {announcements.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-xs">
                  No published announcements from the academy at this time.
                </div>
              ) : (
                <div className="mt-3.5 space-y-3">
                  {announcements.map((a) => (
                    <div
                      key={a._id}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-bold text-slate-900 truncate">
                          {a.title}
                        </h4>
                        {a.priority === "urgent" && (
                          <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-bold text-rose-700 shrink-0">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-slate-600 line-clamp-3 leading-relaxed">
                        {a.message}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {a.publishAt
                          ? new Date(a.publishAt).toLocaleDateString("en-IN")
                          : ""}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions Card */}
            <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-4 sm:p-6 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Quick Navigation
              </h3>
              <div className="space-y-2">
                <Link
                  href={`/parent-panel/attendance?childId=${selectedChildId}`}
                  className="flex items-center justify-between rounded-xl bg-white p-3 text-xs font-bold text-slate-800 border border-slate-200 hover:border-[#D6451B] transition shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <FaCalendarCheck className="text-[#D6451B]" />
                    <span>Detailed Attendance Register</span>
                  </div>
                  <FaArrowRight className="text-slate-400 text-[10px]" />
                </Link>

                <Link
                  href={`/parent-panel/fees?childId=${selectedChildId}`}
                  className="flex items-center justify-between rounded-xl bg-white p-3 text-xs font-bold text-slate-800 border border-slate-200 hover:border-[#D6451B] transition shadow-2xs"
                >
                  <div className="flex items-center gap-2">
                    <FaMoneyBillWave className="text-[#D6451B]" />
                    <span>View Fee Ledgers & Invoices</span>
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
