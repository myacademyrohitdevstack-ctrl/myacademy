"use client";

import React, { Suspense, useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  FaClipboardCheck,
  FaSave,
  FaCheck,
  FaTimes,
  FaCalendarAlt,
  FaArrowLeft,
  FaSearch,
  FaCalendarMinus,
  FaLayerGroup,
  FaUsers,
  FaClock,
  FaChevronRight,
  FaSpinner,
} from "react-icons/fa";
import { useMarkAttendence } from "@/app/mutations/Attendence";
import { useGetBatchStudents } from "@/Hooks/useGetBatchStudents";
import { useGetAllAcademyBatches } from "@/Hooks/useAdminGetBatches";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";

function BatchAttendanceRegister({
  selectedBatchId,
  selectedBatch,
  batches,
  onSelectBatch,
  onClearBatch,
}) {
  const { data: batchStudents = [], isLoading: isLoadingStudents } =
    useGetBatchStudents(selectedBatchId);

  const markAttendanceMutation = useMarkAttendence();

  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusOverrides, setStatusOverrides] = useState({});

  // Map students with status overrides
  const rawStudents = useMemo(() => {
    return (batchStudents || []).map((student) => ({
      ...student,
      status: statusOverrides[student._id] || "present",
    }));
  }, [batchStudents, statusOverrides]);

  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) return rawStudents;
    const term = searchTerm.toLowerCase();
    return rawStudents.filter(
      (s) =>
        s.fullName?.toLowerCase().includes(term) ||
        s.email?.toLowerCase().includes(term)
    );
  }, [rawStudents, searchTerm]);

  const handleStatusChange = (id, status) => {
    setStatusOverrides((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const markAll = (status) => {
    const next = {};
    (batchStudents || []).forEach((s) => {
      next[s._id] = status;
    });
    setStatusOverrides(next);
  };

  const presentCount = rawStudents.filter((s) => s.status === "present").length;
  const leaveCount = rawStudents.filter((s) => s.status === "leave").length;
  const absentCount = rawStudents.filter((s) => s.status === "absent").length;

  const handleSubmit = async () => {
    if (!selectedBatchId) {
      toast.error("Please select a batch first.");
      return;
    }
    if (rawStudents.length === 0) {
      toast.error("No enrolled students found in this batch to record attendance.");
      return;
    }

    const payload = {
      batch: selectedBatchId,
      date,
      records: rawStudents.map((student) => ({
        student: student._id,
        status: student.status,
      })),
    };

    await markAttendanceMutation.mutateAsync(payload);
  };

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* Top Navigation & Batch Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <button
          onClick={onClearBatch}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#D6451B] hover:text-orange-700 transition-colors"
        >
          <FaArrowLeft className="text-xs" />
          <span>Switch Cohort / All Batches</span>
        </button>

        {batches.length > 1 && (
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-medium text-slate-500 hidden sm:inline">
              Selected Cohort:
            </span>
            <select
              value={selectedBatchId}
              onChange={(e) => onSelectBatch(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-[#D6451B] shadow-xs cursor-pointer"
            >
              {batches.map((b) => (
                <option key={b._id} value={b._id}>
                  {b.name} ({typeof b.course === "object" ? b.course?.title : "Course"})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Hero Banner with Stats */}
      <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <FaClipboardCheck />
                Attendance Register
              </span>
              <span className="rounded-full bg-white/20 border border-white/20 px-3.5 py-1 text-xs font-bold tracking-wide">
                Cohort: {selectedBatch?.name || "Active Batch"}
              </span>
            </div>
            <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight">
              {selectedBatch?.name || "Mark Batch Attendance"}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-orange-100 font-medium">
              {typeof selectedBatch?.course === "object" && selectedBatch.course?.title
                ? `Course: ${selectedBatch.course.title} • `
                : ""}
              Record daily presence, absences, and leaves for this session.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 lg:min-w-[390px]">
            <div className="rounded-2xl bg-white/10 p-3 sm:p-4 backdrop-blur-sm border border-white/20">
              <p className="text-xs text-orange-100 font-medium">Enrolled</p>
              <h3 className="mt-1 text-xl sm:text-2xl font-extrabold">
                {rawStudents.length}
              </h3>
            </div>

            <div className="rounded-2xl bg-white/10 p-3 sm:p-4 backdrop-blur-sm border border-white/20">
              <p className="text-xs text-orange-100 font-medium">Present</p>
              <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-white">
                {presentCount}
              </h3>
            </div>

            <div className="rounded-2xl bg-white/10 p-3 sm:p-4 backdrop-blur-sm border border-white/20">
              <p className="text-xs text-orange-100 font-medium">Leave</p>
              <h3 className="mt-1 text-xl sm:text-2xl font-extrabold text-amber-200">
                {leaveCount}
              </h3>
            </div>

            <div className="col-span-3">
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

      {/* Quick Action Buttons and Student Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search student by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm outline-none focus:border-[#D6451B] shadow-xs"
          />
        </div>

        <div className="flex w-full sm:w-auto items-center gap-2">
          <button
            type="button"
            onClick={() => markAll("present")}
            className="flex-1 sm:flex-initial rounded-xl bg-emerald-600 px-3.5 py-2 text-xs sm:text-sm font-bold text-white transition hover:bg-emerald-700 shadow-xs"
          >
            All Present
          </button>

          <button
            type="button"
            onClick={() => markAll("leave")}
            className="flex-1 sm:flex-initial rounded-xl bg-amber-500 px-3.5 py-2 text-xs sm:text-sm font-bold text-white transition hover:bg-amber-600 shadow-xs"
          >
            All Leave
          </button>

          <button
            type="button"
            onClick={() => markAll("absent")}
            className="flex-1 sm:flex-initial rounded-xl bg-rose-600 px-3.5 py-2 text-xs sm:text-sm font-bold text-white transition hover:bg-rose-700 shadow-xs"
          >
            All Absent
          </button>
        </div>
      </div>

      {/* Students List */}
      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-xs">
        {isLoadingStudents ? (
          <div className="space-y-3 p-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-16 rounded-xl bg-slate-100 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div
                key={student?._id}
                className="rounded-xl sm:rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3 sm:p-4 transition-all hover:border-[#D6451B] hover:bg-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div className="min-w-0 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-100 text-[#D6451B] font-bold flex items-center justify-center shrink-0 uppercase text-sm">
                    {student?.fullName ? student.fullName.charAt(0) : "S"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                      {student?.fullName}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">{student?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-1.5 sm:w-[310px]">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(student._id, "present")}
                    className={`flex items-center justify-center gap-1 rounded-xl py-2 px-2 text-xs font-bold transition ${
                      student.status === "present"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-200/60 hover:bg-emerald-100"
                    }`}
                  >
                    <FaCheck className="text-[11px]" />
                    <span>Present</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusChange(student._id, "leave")}
                    className={`flex items-center justify-center gap-1 rounded-xl py-2 px-2 text-xs font-bold transition ${
                      student.status === "leave"
                        ? "bg-amber-500 text-white shadow-xs"
                        : "bg-amber-50 text-amber-700 border border-amber-200/60 hover:bg-amber-100"
                    }`}
                  >
                    <FaCalendarMinus className="text-[11px]" />
                    <span>Leave</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleStatusChange(student._id, "absent")}
                    className={`flex items-center justify-center gap-1 rounded-xl py-2 px-2 text-xs font-bold transition ${
                      student.status === "absent"
                        ? "bg-rose-600 text-white shadow-xs"
                        : "bg-rose-50 text-rose-700 border border-rose-200/60 hover:bg-rose-100"
                    }`}
                  >
                    <FaTimes className="text-[11px]" />
                    <span>Absent</span>
                  </button>
                </div>
              </div>
            ))}

            {filteredStudents.length === 0 && (
              <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
                {rawStudents.length === 0
                  ? "No students enrolled in this batch yet."
                  : "No students matching your search."}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Sticky Bottom Save Action Bar */}
      <div className="sticky bottom-4 z-30 flex items-center justify-between rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 shadow-lg">
        <div className="hidden sm:flex items-center gap-2.5 text-xs font-bold">
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-50 px-3 py-1.5 text-emerald-700 border border-emerald-200/70">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>{presentCount} Present</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-1.5 text-amber-700 border border-amber-200/70">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>{leaveCount} Leave</span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-rose-50 px-3 py-1.5 text-rose-700 border border-rose-200/70">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>{absentCount} Absent</span>
          </span>
        </div>

        <button
          onClick={handleSubmit}
          disabled={markAttendanceMutation.isPending || rawStudents.length === 0}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#D6451B] px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-500/25 transition hover:bg-[#bf3b14] disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
        >
          {markAttendanceMutation.isPending ? (
            <>
              <FaSpinner className="animate-spin text-sm" />
              <span>Saving Records...</span>
            </>
          ) : (
            <>
              <FaSave />
              <span>Save Attendance Records</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function AttendancePageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const user = useAuthStore((state) => state.user);

  const queryBatchId = searchParams.get("batchId") || "";
  const [chosenBatchId, setChosenBatchId] = useState("");
  const [batchSearchTerm, setBatchSearchTerm] = useState("");

  const { data: batches = [], isLoading: isLoadingBatches } =
    useGetAllAcademyBatches();

  // If chosenBatchId is explicitly set, use it. Otherwise use queryBatchId.
  // If neither is set, and only 1 batch is returned, default to it.
  const selectedBatchId = useMemo(() => {
    if (chosenBatchId) return chosenBatchId;
    if (queryBatchId) return queryBatchId;
    if (batches.length === 1) return batches[0]._id;
    return "";
  }, [chosenBatchId, queryBatchId, batches]);

  const handleSelectBatch = (id) => {
    setChosenBatchId(id);
    router.replace(`${pathname}?batchId=${id}`, { scroll: false });
  };

  const handleClearSelectedBatch = () => {
    setChosenBatchId("");
    router.replace(pathname, { scroll: false });
  };

  const selectedBatch = useMemo(
    () => batches.find((b) => b._id === selectedBatchId),
    [batches, selectedBatchId]
  );

  // Filter available batches for the picker
  const filteredBatches = useMemo(() => {
    if (!batchSearchTerm.trim()) return batches;
    const term = batchSearchTerm.toLowerCase();
    return batches.filter(
      (b) =>
        b.name?.toLowerCase().includes(term) ||
        b.course?.title?.toLowerCase().includes(term)
    );
  }, [batches, batchSearchTerm]);

  // VIEW 1: Batch Chooser (when no batch is selected)
  if (!selectedBatchId) {
    return (
      <div className="w-full min-w-0 space-y-6">
        {/* Banner */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-5 sm:p-7 lg:p-8 text-white shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="rounded-full bg-white/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1.5">
                <FaClipboardCheck />
                Attendance Register
              </span>
              <h1 className="mt-3 text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
                Select a Cohort / Batch
              </h1>
              <p className="mt-1.5 text-xs sm:text-sm text-orange-100 max-w-xl">
                Choose the batch you want to record daily attendance for. Once selected, you can mark students present, leave, or absent.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 px-5 py-3.5 backdrop-blur-sm border border-white/20 shrink-0 text-center">
              <p className="text-xs text-orange-100 font-medium">Available Batches</p>
              <h3 className="mt-0.5 text-2xl sm:text-3xl font-extrabold">
                {isLoadingBatches ? "..." : batches.length}
              </h3>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search cohort or course name..."
              value={batchSearchTerm}
              onChange={(e) => setBatchSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2.5 text-xs sm:text-sm outline-none focus:border-[#D6451B] shadow-xs"
            />
          </div>
          <p className="text-xs text-slate-500 self-end sm:self-center font-medium">
            Showing {filteredBatches.length} of {batches.length} batches
          </p>
        </div>

        {/* Loading Batches */}
        {isLoadingBatches && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="rounded-2xl border border-slate-200 bg-white p-5 animate-pulse space-y-3"
              >
                <div className="h-5 bg-slate-200 rounded-md w-3/4" />
                <div className="h-4 bg-slate-100 rounded-md w-1/2" />
                <div className="h-8 bg-slate-100 rounded-xl w-full mt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Empty Batches */}
        {!isLoadingBatches && filteredBatches.length === 0 && (
          <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-50 text-[#D6451B] flex items-center justify-center text-2xl">
              <FaLayerGroup />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              {batches.length === 0 ? "No Assigned Batches Found" : "No Matching Batches Found"}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              {batches.length === 0
                ? "You currently have no cohorts assigned to your profile. Please contact your academy administrator to assign you to a batch."
                : "No batches match your search criteria. Try a different search keyword."}
            </p>
            {batches.length === 0 && (
              <button
                onClick={() =>
                  router.push(
                    user?.role === "teacher"
                      ? "/teacher-panel/dashboard"
                      : "/admin-panel/dashboard"
                  )
                }
                className="inline-flex items-center gap-2 rounded-xl bg-[#D6451B] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#bf3b14] transition shadow-xs"
              >
                <FaArrowLeft className="text-xs" />
                <span>Return to Dashboard</span>
              </button>
            )}
          </div>
        )}

        {/* Batches Grid */}
        {!isLoadingBatches && filteredBatches.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBatches.map((batch) => {
              const studentCount = batch.students?.length || 0;
              const courseTitle =
                typeof batch.course === "object"
                  ? batch.course?.title
                  : "Course";
              const scheduleDays = batch.schedule?.days?.join(", ") || "";
              const scheduleTime =
                batch.schedule?.startTime && batch.schedule?.endTime
                  ? `${batch.schedule.startTime} - ${batch.schedule.endTime}`
                  : "";

              return (
                <div
                  key={batch._id}
                  onClick={() => handleSelectBatch(batch._id)}
                  className="group relative cursor-pointer rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all hover:border-[#D6451B] hover:shadow-md hover:-translate-y-0.5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-9 h-9 rounded-xl bg-orange-50 text-[#D6451B] flex items-center justify-center text-sm font-bold shrink-0 group-hover:bg-[#D6451B] group-hover:text-white transition-colors">
                          <FaLayerGroup />
                        </span>
                        <div>
                          <h3 className="font-bold text-slate-900 text-base sm:text-lg group-hover:text-[#D6451B] transition-colors leading-tight">
                            {batch.name}
                          </h3>
                          <p className="text-xs text-slate-500 font-medium truncate max-w-[200px]">
                            {courseTitle}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 border border-emerald-200/60 shrink-0">
                        Active
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-slate-500">
                          <FaUsers className="text-slate-400" />
                          Enrolled Students
                        </span>
                        <span className="font-bold text-slate-800">
                          {studentCount} Students
                        </span>
                      </div>

                      {(scheduleDays || scheduleTime) && (
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-slate-500">
                            <FaClock className="text-slate-400" />
                            Schedule
                          </span>
                          <span className="font-semibold text-slate-700 truncate max-w-[150px]">
                            {scheduleTime || scheduleDays}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#D6451B] group-hover:text-orange-700">
                    <span>Mark Attendance</span>
                    <FaChevronRight className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  // VIEW 2: Attendance Register for Selected Batch (Keyed by selectedBatchId so state resets cleanly)
  return (
    <BatchAttendanceRegister
      key={selectedBatchId}
      selectedBatchId={selectedBatchId}
      selectedBatch={selectedBatch}
      batches={batches}
      onSelectBatch={handleSelectBatch}
      onClearBatch={handleClearSelectedBatch}
    />
  );
}

export default function AttendancePage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#D6451B] border-t-transparent" />
        </div>
      }
    >
      <AttendancePageContent />
    </Suspense>
  );
}
