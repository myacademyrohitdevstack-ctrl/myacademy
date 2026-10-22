"use client";

import { useMarkAttendence } from "@/app/mutations/Attendence";
import { useGetBatchStudents } from "@/Hooks/useGetBatchStudents";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  FaClipboardCheck,
  FaSave,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
} from "react-icons/fa";

export default function AttendancePage() {
  const searchParams = useSearchParams();
  const batchId = searchParams.get("batchId");
  const { data } = useGetBatchStudents(batchId);
  const markAtttendenceMutation = useMarkAttendence();

  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [statusOverrides, setStatusOverrides] = useState({});

  // Derive students list directly from data & overrides without triggering cascading renders
  const rawStudents = (data || []).map((student) => ({
    ...student,
    status: statusOverrides[student._id] || "present",
  }));

  const students = searchTerm
    ? rawStudents.filter((s) =>
        s.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : rawStudents;

  const handleStatusChange = (id, status) => {
    setStatusOverrides((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const markAllPresent = () => {
    const next = {};
    (data || []).forEach((s) => {
      next[s._id] = "present";
    });
    setStatusOverrides(next);
  };

  const markAllAbsent = () => {
    const next = {};
    (data || []).forEach((s) => {
      next[s._id] = "absent";
    });
    setStatusOverrides(next);
  };

  const presentCount = rawStudents.filter((s) => s.status === "present").length;
  const absentCount = rawStudents.filter((s) => s.status === "absent").length;

  const handleSubmit = async () => {
    const payload = {
      batch: batchId,
      date,
      records: rawStudents.map((student) => ({
        student: student._id,
        status: student.status,
      })),
    };

    await markAtttendenceMutation.mutateAsync(payload);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Hero Banner */}
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
              Attendance Register
            </span>
            <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight">
              Mark Batch Attendance
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-orange-100 font-medium">
              Record daily student presence, calculate batch statistics, and log attendance into student profiles.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:min-w-[340px]">
            <div className="rounded-2xl bg-white/10 p-3.5 sm:p-4 backdrop-blur-sm border border-white/20">
              <p className="text-xs text-orange-100 font-medium">Total Enrolled</p>
              <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold">
                {rawStudents.length}
              </h3>
            </div>

            <div className="rounded-2xl bg-white/10 p-3.5 sm:p-4 backdrop-blur-sm border border-white/20">
              <p className="text-xs text-orange-100 font-medium">Present Today</p>
              <h3 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
                {presentCount}
              </h3>
            </div>

            <div className="col-span-2">
              <div className="relative">
                <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/60 text-xs" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-white/30 bg-white/15 pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-white outline-none backdrop-blur-md [color-scheme:dark]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search student by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-[#D6451B]"
          />
        </div>

        <div className="flex w-full sm:w-auto items-center gap-2">
          <button
            onClick={markAllPresent}
            className="flex-1 sm:flex-initial rounded-xl bg-emerald-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-emerald-700 shadow-xs"
          >
            Mark All Present
          </button>

          <button
            onClick={markAllAbsent}
            className="flex-1 sm:flex-initial rounded-xl bg-rose-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:bg-rose-700 shadow-xs"
          >
            Mark All Absent
          </button>
        </div>
      </div>

      {/* Students List */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-xs">
        <div className="space-y-3">
          {students.map((student) => (
            <div
              key={student?._id}
              className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3 sm:p-4 transition-all hover:border-[#D6451B] hover:bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                  {student?.fullName}
                </h4>
                <p className="text-xs text-slate-500 truncate">{student?.email}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:w-[240px]">
                <button
                  type="button"
                  onClick={() => handleStatusChange(student._id, "present")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition ${
                    student.status === "present"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200/60 hover:bg-emerald-100"
                  }`}
                >
                  <FaCheck className="text-xs" />
                  <span>Present</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleStatusChange(student._id, "absent")}
                  className={`flex items-center justify-center gap-1.5 rounded-xl py-2.5 text-xs font-bold transition ${
                    student.status === "absent"
                      ? "bg-rose-600 text-white shadow-xs"
                      : "bg-rose-50 text-rose-700 border border-rose-200/60 hover:bg-rose-100"
                  }`}
                >
                  <FaTimes className="text-xs" />
                  <span>Absent</span>
                </button>
              </div>
            </div>
          ))}

          {students.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
              No students found for this batch.
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Save Action Bar */}
      <div className="sticky bottom-4 z-30 flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={markAtttendenceMutation.isPending}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-[#D6451B] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#bf3b14] disabled:opacity-40"
        >
          <FaSave />
          <span>
            {markAtttendenceMutation.isPending
              ? "Saving Records..."
              : "Save Attendance Records"}
          </span>
        </button>
      </div>
    </div>
  );
}
