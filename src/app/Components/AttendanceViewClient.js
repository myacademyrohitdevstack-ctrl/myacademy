/* eslint-disable @next/next/no-img-element */
"use client";

import { useMemo, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  FaArrowLeft,
  FaClipboardCheck,
  FaSearch,
  FaUserGraduate,
  FaCheckCircle,
  FaTimesCircle,
  FaUsers,
  FaCalendarAlt,
  FaUserTie,
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
  FaCalendarMinus,
} from "react-icons/fa";

import Loading from "@/app/Components/ui/Loading";
import { formatISTDateTime } from "@/Utils/formatDate";
import { useGetAttendanceById } from "@/Hooks/useGetAttendenceById";
import { useUpdateAttendance } from "@/app/mutations/Attendence";

function AttendanceViewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const attendanceId = searchParams.get("attendanceId");

  const { data, isLoading } = useGetAttendanceById(attendanceId);
  const attendance = data?.attendance;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'present' | 'absent' | 'leave'
  const updateAttendance = useUpdateAttendance(attendanceId);

  const records = useMemo(() => attendance?.records || [], [attendance?.records]);

  const present = records.filter((r) => r.status === "present").length;
  const leave = records.filter((r) => r.status === "leave").length;
  const absent = records.filter((r) => r.status === "absent").length;
  const totalStudents = records.length;

  const percentage =
    totalStudents === 0 ? 0 : Math.round((present / totalStudents) * 100);

  const filteredStudents = useMemo(() => {
    return records.filter((item) => {
      const student = item.student || {};
      const name = student.fullName || "";
      const email = student.email || "";
      const roll = student.rollNumber || "";
      const phone = student.phone || "";

      const q = search.trim().toLowerCase();
      const nameMatch =
        !q ||
        name.toLowerCase().includes(q) ||
        email.toLowerCase().includes(q) ||
        roll.toLowerCase().includes(q) ||
        phone.toLowerCase().includes(q);

      const statusMatch =
        statusFilter === "all" ? true : item.status === statusFilter;

      return nameMatch && statusMatch;
    });
  }, [records, search, statusFilter]);

  const updateStatus = (studentId, status) => {
    if (!studentId) return;
    const updatedRecords = records.map((record) => {
      const recId = record.student?._id || record.student;
      return recId === studentId
        ? {
            ...record,
            status,
          }
        : record;
    });

    updateAttendance.mutate({
      records: updatedRecords.map((r) => ({
        student: r.student?._id || r.student,
        status: r.status,
      })),
    });
  };

  if (isLoading) return <Loading />;

  if (!attendanceId) {
    return (
      <div className="w-full min-w-0 p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-amber-100 text-amber-600">
          <FaClipboardCheck className="text-xl" />
        </div>
        <h3 className="font-bold text-slate-800 text-base">No Attendance Session Selected</h3>
        <p className="text-slate-500 text-xs">Please select a valid attendance session from the cohorts list.</p>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-xl bg-[#D6451B] px-4 py-2 text-xs font-bold text-white hover:bg-orange-600 transition"
        >
          <FaArrowLeft className="text-xs" />
          <span>Go Back</span>
        </button>
      </div>
    );
  }

  if (!attendance) {
    return (
      <div className="w-full min-w-0 p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <FaClipboardCheck className="text-xl" />
        </div>
        <h3 className="font-bold text-slate-800 text-base">Attendance Record Not Found</h3>
        <p className="text-slate-500 text-xs">This attendance record may have been deleted or moved.</p>
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 rounded-xl bg-[#D6451B] px-4 py-2 text-xs font-bold text-white hover:bg-orange-600 transition"
        >
          <FaArrowLeft className="text-xs" />
          <span>Back to Cohort</span>
        </button>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#D6451B] hover:text-orange-700 transition-colors"
      >
        <FaArrowLeft className="text-xs" />
        <span>Back to Cohort Details</span>
      </button>

      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between min-w-0">
          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Cohort Attendance Register
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl truncate">
              {attendance?.batch?.name || "Batch Attendance"}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs sm:text-sm text-orange-100">
              <span className="flex items-center gap-1.5 font-medium">
                <FaCalendarAlt className="text-white/80" />
                {formatISTDateTime(attendance?.date)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 font-medium">
                <FaUserTie className="text-white/80" />
                Marked by: {attendance?.markedBy?.fullName || "Faculty"}
              </span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2.5 rounded-2xl bg-white/10 px-4 py-2.5 backdrop-blur-md border border-white/20">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-[#D6451B] text-sm">
                <FaUsers />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-orange-200">Enrolled</p>
                <p className="text-base sm:text-lg font-extrabold">{totalStudents}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-2xl bg-white/10 px-4 py-2.5 backdrop-blur-md border border-white/20">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white text-sm">
                <FaCheckCircle />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-orange-200">Present</p>
                <p className="text-base sm:text-lg font-extrabold">{present}</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 rounded-2xl bg-white/10 px-4 py-2.5 backdrop-blur-md border border-white/20">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-500 text-white text-sm">
                <FaTimesCircle />
              </div>
              <div>
                <p className="text-[10px] uppercase font-semibold text-orange-200">Absent</p>
                <p className="text-base sm:text-lg font-extrabold">{absent}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500">Total Enrolled</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-700 text-xs sm:text-sm">
              <FaUsers />
            </div>
          </div>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
            {totalStudents}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Students in cohort</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500">Present</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-xs sm:text-sm">
              <FaCheckCircle />
            </div>
          </div>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-emerald-600">
            {present}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Attended class</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500">Absent</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-50 text-rose-600 text-xs sm:text-sm">
              <FaTimesCircle />
            </div>
          </div>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-rose-600">
            {absent}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Missed session</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-slate-500">Overall Rate</p>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-50 text-[#D6451B] text-xs sm:text-sm">
              <FaClipboardCheck />
            </div>
          </div>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-[#D6451B]">
            {percentage}%
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Presence ratio</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full sm:max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search student by name, email, roll no, or phone..."
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#D6451B] focus:bg-white"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none bg-slate-100 p-1 rounded-xl text-xs font-bold shrink-0">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === "all"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            All ({records.length})
          </button>
          <button
            onClick={() => setStatusFilter("present")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === "present"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-emerald-700"
            }`}
          >
            Present ({present})
          </button>
          <button
            onClick={() => setStatusFilter("leave")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === "leave"
                ? "bg-amber-500 text-white shadow-xs"
                : "text-slate-600 hover:text-amber-700"
            }`}
          >
            Leave ({leave})
          </button>
          <button
            onClick={() => setStatusFilter("absent")}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              statusFilter === "absent"
                ? "bg-rose-600 text-white shadow-xs"
                : "text-slate-600 hover:text-rose-700"
            }`}
          >
            Absent ({absent})
          </button>
        </div>
      </div>

      {/* Student List Section */}
      <div className="space-y-4">
        {/* Mobile Cards */}
        <div className="space-y-3 lg:hidden">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((record, index) => {
              const studentId = record.student?._id || record.student || `rec-${index}`;
              const studentName = record.student?.fullName || "Student Account Removed";
              const studentEmail = record.student?.email || "—";
              const studentPhone = record.student?.phone || "—";
              const studentRoll = record.student?.rollNumber || "—";

              return (
                <div
                  key={studentId}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-xs transition hover:border-[#D6451B]"
                >
                  <div className="flex items-start gap-3.5">
                    {record.student?.profileImage?.url ? (
                      <img
                        src={record.student.profileImage.url}
                        alt={studentName}
                        className="h-11 w-11 rounded-xl object-cover shrink-0 border border-slate-200 shadow-xs"
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-orange-100 font-bold text-[#D6451B] text-base border border-orange-200 shadow-xs">
                        {studentName.charAt(0) || <FaUserGraduate />}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="truncate text-sm sm:text-base font-extrabold text-slate-900">
                          {studentName}
                        </h3>
                        <span
                          className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                            record.status === "present"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : record.status === "leave"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {record.status}
                        </span>
                      </div>

                      <p className="truncate text-xs text-slate-500 mt-0.5">
                        {studentEmail}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
                        {studentRoll !== "—" && (
                          <span>Roll: <strong className="text-slate-800">{studentRoll}</strong></span>
                        )}
                        {studentPhone !== "—" && (
                          <span>Phone: <strong className="text-slate-800">{studentPhone}</strong></span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status Toggle Action Buttons */}
                  <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-3 gap-1.5">
                    <button
                      disabled={updateAttendance.isPending}
                      onClick={() => updateStatus(studentId, "present")}
                      className={`rounded-lg py-1.5 text-xs font-bold transition ${
                        record.status === "present"
                          ? "bg-emerald-600 text-white shadow-xs"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                      }`}
                    >
                      Present
                    </button>
                    <button
                      disabled={updateAttendance.isPending}
                      onClick={() => updateStatus(studentId, "leave")}
                      className={`rounded-lg py-1.5 text-xs font-bold transition ${
                        record.status === "leave"
                          ? "bg-amber-500 text-white shadow-xs"
                          : "bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100"
                      }`}
                    >
                      Leave
                    </button>
                    <button
                      disabled={updateAttendance.isPending}
                      onClick={() => updateStatus(studentId, "absent")}
                      className={`rounded-lg py-1.5 text-xs font-bold transition ${
                        record.status === "absent"
                          ? "bg-rose-600 text-white shadow-xs"
                          : "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState />
          )}
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block w-full min-w-0">
          <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200">
                  <tr className="text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Roll Number</th>
                    <th className="px-6 py-4">Phone Number</th>
                    <th className="px-6 py-4 text-center">Status</th>
                    <th className="px-6 py-4 text-right">Quick Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((record, index) => {
                      const studentId = record.student?._id || record.student || `rec-${index}`;
                      const studentName = record.student?.fullName || "Student Account Removed";
                      const studentEmail = record.student?.email || "—";
                      const studentPhone = record.student?.phone || "—";
                      const studentRoll = record.student?.rollNumber || "—";

                      return (
                        <tr
                          key={studentId}
                          className="hover:bg-orange-50/30 transition-colors"
                        >
                          {/* Student */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              {record.student?.profileImage?.url ? (
                                <img
                                  src={record.student.profileImage.url}
                                  alt={studentName}
                                  className="h-10 w-10 rounded-xl object-cover border border-slate-200 shadow-xs"
                                />
                              ) : (
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 font-bold text-[#D6451B] text-sm border border-orange-200 shadow-xs">
                                  {studentName.charAt(0) || <FaUserGraduate />}
                                </div>
                              )}

                              <div>
                                <p className="font-extrabold text-slate-900 text-sm">
                                  {studentName}
                                </p>
                                <p className="text-[11px] text-slate-500">
                                  {studentEmail}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Roll Number */}
                          <td className="px-6 py-4 font-semibold text-slate-700">
                            {studentRoll}
                          </td>

                          {/* Phone */}
                          <td className="px-6 py-4 font-semibold text-slate-700">
                            {studentPhone}
                          </td>

                          {/* Status Badge */}
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                                record.status === "present"
                                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                  : record.status === "leave"
                                  ? "bg-amber-50 text-amber-700 border border-amber-200"
                                  : "bg-rose-50 text-rose-700 border border-rose-200"
                              }`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${
                                  record.status === "present"
                                    ? "bg-emerald-500"
                                    : record.status === "leave"
                                    ? "bg-amber-500"
                                    : "bg-rose-500"
                                }`}
                              />
                              {record.status}
                            </span>
                          </td>

                          {/* Action Toggle */}
                          <td className="px-6 py-4 text-right">
                            <button
                              disabled={updateAttendance.isPending}
                              onClick={() =>
                                updateStatus(
                                  studentId,
                                  record.status === "present" ? "absent" : "present"
                                )
                              }
                              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 font-bold text-xs transition shadow-xs ${
                                record.status === "present"
                                  ? "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                                  : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                              } ${
                                updateAttendance.isPending
                                  ? "cursor-not-allowed opacity-60"
                                  : ""
                              }`}
                            >
                              {record.status === "present" ? "Mark Absent" : "Mark Present"}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center">
                        <EmptyState />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Summary & Cohort Details */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-2 w-full min-w-0">
        {/* Attendance Breakdown */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Attendance Distribution
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Statistical breakdown of presence across this classroom cohort
          </p>

          <div className="mt-5 space-y-4">
            {/* Present Progress */}
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
                <span className="text-emerald-700">Present</span>
                <span className="text-slate-900">
                  {present} / {totalStudents} ({percentage}%)
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            {/* Absent Progress */}
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs font-bold">
                <span className="text-rose-700">Absent</span>
                <span className="text-slate-900">
                  {absent} / {totalStudents} ({100 - percentage}%)
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-rose-500 transition-all duration-500"
                  style={{ width: `${100 - percentage}%` }}
                />
              </div>
            </div>

            {/* Overall Assessment Banner */}
            <div className="mt-5 rounded-2xl bg-orange-50/70 border border-orange-200/60 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-600">Cohort Performance</p>
                <p className="mt-0.5 text-xs text-slate-500">
                  {percentage >= 85
                    ? "High classroom engagement achieved."
                    : percentage >= 70
                    ? "Normal cohort presence maintained."
                    : "Attendance follow-up recommended."}
                </p>
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#D6451B]">
                {percentage}%
              </span>
            </div>
          </div>
        </div>

        {/* Attendance Record Information */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Session Details & Audit
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            System metadata and verification logs
          </p>

          <div className="mt-5 divide-y divide-slate-100 text-xs">
            <div className="flex items-center justify-between py-2.5">
              <span className="text-slate-500 font-medium">Cohort Batch</span>
              <strong className="text-slate-900">{attendance?.batch?.name || "—"}</strong>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="text-slate-500 font-medium">Session Date</span>
              <strong className="text-slate-900">{formatISTDateTime(attendance?.date)}</strong>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="text-slate-500 font-medium">Marked By Faculty</span>
              <strong className="text-slate-900">
                {attendance?.markedBy?.fullName || "Faculty"}
              </strong>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="text-slate-500 font-medium">Logged in System</span>
              <strong className="text-slate-900">{formatISTDateTime(attendance?.createdAt)}</strong>
            </div>

            <div className="flex items-center justify-between py-2.5">
              <span className="text-slate-500 font-medium">Last Modified</span>
              <strong className="text-slate-900">{formatISTDateTime(attendance?.updatedAt)}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 sm:py-14 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-[#D6451B]">
        <FaClipboardCheck className="text-2xl" />
      </div>
      <h3 className="mt-4 text-base font-bold text-slate-800">
        No Students Found
      </h3>
      <p className="mt-1 max-w-sm text-xs text-slate-500">
        No students matched your search criteria. Try a different keyword or reset the status filter.
      </p>
    </div>
  );
}

export default function AttendanceViewClient() {
  return (
    <Suspense fallback={<Loading />}>
      <AttendanceViewContent />
    </Suspense>
  );
}
