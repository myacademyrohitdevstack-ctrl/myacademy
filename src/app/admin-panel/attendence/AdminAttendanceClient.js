"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClipboardCheck,
  FaCalendarAlt,
  FaCalendarCheck,
  FaCalendarMinus,
  FaClock,
  FaUsers,
  FaChalkboardTeacher,
  FaPlus,
  FaPlay,
  FaPause,
  FaTrash,
  FaEdit,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaSync,
  FaSearch,
  FaFilter,
  FaHistory,
  FaUserTie,
  FaLayerGroup,
  FaBan,
} from "react-icons/fa";
import {
  useGetTimetables,
  useGetSessions,
  useGetTeacherLeaves,
  useGetAcademyStudentLeaves,
  useGetHolidays,
  useGetAttendanceReportsSummary,
  useGetAttendanceAuditLogs,
} from "@/Hooks/useTimetableAttendance";
import { useGetAllAcademyBatches } from "@/Hooks/useAdminGetBatches";
import { useAdminStudent } from "@/Hooks/useAdminStudents";
import {
  useCreateTimetableMutation,
  useToggleTimetableStatusMutation,
  useDeleteTimetableMutation,
  useCreateExtraSessionMutation,
  useCancelSessionMutation,
  useRescheduleSessionMutation,
  useAssignSubstituteMutation,
  useTriggerSessionGenerationMutation,
  useReviewTeacherLeaveMutation,
  useReviewStudentLeaveMutation,
  useCreateHolidayMutation,
  useDeleteHolidayMutation,
} from "@/app/mutations/TimetableAttendanceMutations";
import {
  checkTimetableConflictApi,
  previewHolidayAffectedApi,
  previewTeacherLeaveAffectedApi,
} from "@/app/api/timetableAndAttendanceApi";
import { formatDate } from "@/Utils/formatDate";
import Loading from "@/app/Components/ui/Loading";
import { toast } from "sonner";
import Link from "next/link";

const DAYS_OF_WEEK = [
  { id: 1, name: "Mon", full: "monday" },
  { id: 2, name: "Tue", full: "tuesday" },
  { id: 3, name: "Wed", full: "wednesday" },
  { id: 4, name: "Thu", full: "thursday" },
  { id: 5, name: "Fri", full: "friday" },
  { id: 6, name: "Sat", full: "saturday" },
  { id: 0, name: "Sun", full: "sunday" },
];

export default function AdminAttendanceClient() {
  const [activeTab, setActiveTab] = useState("overview");

  // Queries
  const { data: summaryData, isLoading: isLoadingSummary } = useGetAttendanceReportsSummary();
  const { data: timetablesData, isLoading: isLoadingTimetables } = useGetTimetables();
  const { data: sessionsData, isLoading: isLoadingSessions } = useGetSessions();
  const { data: teacherLeavesData, isLoading: isLoadingTeacherLeaves } = useGetTeacherLeaves();
  const { data: studentLeavesData, isLoading: isLoadingStudentLeaves } = useGetAcademyStudentLeaves();
  const { data: holidaysData, isLoading: isLoadingHolidays } = useGetHolidays();
  const { data: auditLogsData, isLoading: isLoadingAudit } = useGetAttendanceAuditLogs();

  const { data: batches = [] } = useGetAllAcademyBatches();
  const { data: teachersData } = useAdminStudent(1, "", "", "", "teacher", 200);
  const teachers = teachersData?.users || teachersData?.students || [];

  // Mutations
  const createTimetableMutation = useCreateTimetableMutation();
  const toggleStatusMutation = useToggleTimetableStatusMutation();
  const deleteTimetableMutation = useDeleteTimetableMutation();
  const createExtraSessionMutation = useCreateExtraSessionMutation();
  const cancelSessionMutation = useCancelSessionMutation();
  const rescheduleSessionMutation = useRescheduleSessionMutation();
  const assignSubstituteMutation = useAssignSubstituteMutation();
  const triggerGenerationMutation = useTriggerSessionGenerationMutation();
  const reviewTeacherLeaveMutation = useReviewTeacherLeaveMutation();
  const reviewStudentLeaveMutation = useReviewStudentLeaveMutation();
  const createHolidayMutation = useCreateHolidayMutation();
  const deleteHolidayMutation = useDeleteHolidayMutation();

  // Modals state
  const [showCreateTimetableModal, setShowCreateTimetableModal] = useState(false);
  const [showExtraSessionModal, setShowExtraSessionModal] = useState(false);
  const [showCancelSessionModal, setShowCancelSessionModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showSubstituteModal, setShowSubstituteModal] = useState(false);
  const [showHolidayModal, setShowHolidayModal] = useState(false);
  const [reviewingTeacherLeave, setReviewingTeacherLeave] = useState(null);
  const [reviewingStudentLeave, setReviewingStudentLeave] = useState(null);
  const [selectedSession, setSelectedSession] = useState(null);

  // Timetable Form State
  const [ttBatch, setTtBatch] = useState("");
  const [ttTeacher, setTtTeacher] = useState("");
  const [ttDays, setTtDays] = useState([1, 3, 5]); // Mon, Wed, Fri by default
  const [ttStartTime, setTtStartTime] = useState("17:00");
  const [ttEndTime, setTtEndTime] = useState("18:00");
  const [ttStartDate, setTtStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [ttEndDate, setTtEndDate] = useState("");
  const [ttRoom, setTtRoom] = useState("");
  const [ttPlatform, setTtPlatform] = useState("offline");
  const [ttConflictWarning, setTtConflictWarning] = useState([]);

  // Extra Session Form State
  const [extraBatch, setExtraBatch] = useState("");
  const [extraTeacher, setExtraTeacher] = useState("");
  const [extraDate, setExtraDate] = useState("");
  const [extraStartTime, setExtraStartTime] = useState("16:00");
  const [extraEndTime, setExtraEndTime] = useState("17:00");
  const [extraTitle, setExtraTitle] = useState("Special Revision Class");

  // Cancellation Form State
  const [cancelReason, setCancelReason] = useState("");
  const [cancelMakeUpRequired, setCancelMakeUpRequired] = useState(true);

  // Reschedule Form State
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleStartTime, setRescheduleStartTime] = useState("17:00");
  const [rescheduleEndTime, setRescheduleEndTime] = useState("18:00");
  const [rescheduleTeacher, setRescheduleTeacher] = useState("");

  // Substitute Form State
  const [substituteTeacherId, setSubstituteTeacherId] = useState("");

  // Holiday Form State
  const [holidayTitle, setHolidayTitle] = useState("");
  const [holidayStartDate, setHolidayStartDate] = useState("");
  const [holidayEndDate, setHolidayEndDate] = useState("");
  const [holidayScope, setHolidayScope] = useState("academy");
  const [holidayBatch, setHolidayBatch] = useState("");
  const [holidayAffectedCount, setHolidayAffectedCount] = useState(null);

  // Teacher Leave Review State
  const [tlAction, setTlAction] = useState("approved");
  const [tlRemarks, setTlRemarks] = useState("");
  const [tlAffectedPreview, setTlAffectedPreview] = useState([]);
  const [tlSessionActions, setTlSessionActions] = useState({});

  // Student Leave Review State
  const [slAction, setSlAction] = useState("approved");
  const [slRemarks, setSlRemarks] = useState("");

  // Timetable Conflict Pre-Check
  const handleCheckConflict = async () => {
    if (!ttBatch || !ttTeacher || ttDays.length === 0 || !ttStartTime || !ttEndTime) return;
    try {
      const res = await checkTimetableConflictApi({
        batch: ttBatch,
        teacher: ttTeacher,
        daysOfWeek: ttDays,
        startTime: ttStartTime,
        endTime: ttEndTime,
        effectiveStartDate: ttStartDate,
        effectiveEndDate: ttEndDate || null,
      });
      if (res.data?.hasConflict) {
        setTtConflictWarning(res.data.conflicts || []);
      } else {
        setTtConflictWarning([]);
      }
    } catch (e) {
      // ignore
    }
  };

  const handleCreateTimetable = async (e) => {
    e.preventDefault();
    if (ttDays.length === 0) {
      toast.error("Please select at least one day of the week.");
      return;
    }
    const daysNames = ttDays.map((d) => DAYS_OF_WEEK.find((item) => item.id === d)?.full).filter(Boolean);

    await createTimetableMutation.mutateAsync({
      batch: ttBatch,
      teacher: ttTeacher,
      daysOfWeek: ttDays,
      days: daysNames,
      startTime: ttStartTime,
      endTime: ttEndTime,
      effectiveStartDate: ttStartDate,
      effectiveEndDate: ttEndDate || null,
      room: ttRoom,
      meetingPlatform: ttPlatform,
    });

    setShowCreateTimetableModal(false);
    setTtConflictWarning([]);
  };

  const handleCreateExtraSession = async (e) => {
    e.preventDefault();
    await createExtraSessionMutation.mutateAsync({
      batch: extraBatch,
      teacher: extraTeacher,
      date: extraDate,
      startTime: extraStartTime,
      endTime: extraEndTime,
      title: extraTitle,
    });
    setShowExtraSessionModal(false);
  };

  const handleCancelSessionSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSession || !cancelReason.trim()) {
      toast.error("Cancellation reason is required.");
      return;
    }
    await cancelSessionMutation.mutateAsync({
      id: selectedSession._id,
      data: {
        reason: cancelReason.trim(),
        makeUpRequired: cancelMakeUpRequired,
      },
    });
    setShowCancelSessionModal(false);
    setSelectedSession(null);
    setCancelReason("");
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSession || !rescheduleDate) return;
    await rescheduleSessionMutation.mutateAsync({
      id: selectedSession._id,
      data: {
        newDate: rescheduleDate,
        newStartTime: rescheduleStartTime,
        newEndTime: rescheduleEndTime,
        newTeacher: rescheduleTeacher || undefined,
      },
    });
    setShowRescheduleModal(false);
    setSelectedSession(null);
  };

  const handleAssignSubstituteSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSession || !substituteTeacherId) return;
    await assignSubstituteMutation.mutateAsync({
      id: selectedSession._id,
      data: {
        substituteTeacherId,
      },
    });
    setShowSubstituteModal(false);
    setSelectedSession(null);
  };

  const handleOpenTeacherLeaveReview = async (leave) => {
    setReviewingTeacherLeave(leave);
    setTlAction("approved");
    setTlRemarks("");
    try {
      const res = await previewTeacherLeaveAffectedApi({
        teacherId: leave.teacher?._id || leave.teacher,
        startDate: leave.startDate,
        endDate: leave.endDate,
      });
      const sessions = res.data?.affectedSessions || [];
      setTlAffectedPreview(sessions);
      const defaultActions = {};
      sessions.forEach((s) => {
        defaultActions[s._id] = "cancelled"; // default action when teacher is away
      });
      setTlSessionActions(defaultActions);
    } catch (e) {
      setTlAffectedPreview([]);
    }
  };

  const handleTeacherLeaveSubmit = async (e) => {
    e.preventDefault();
    if (!reviewingTeacherLeave) return;

    const sessionActions = Object.entries(tlSessionActions).map(([sessionId, action]) => ({
      sessionId,
      action,
    }));

    await reviewTeacherLeaveMutation.mutateAsync({
      id: reviewingTeacherLeave._id,
      data: {
        status: tlAction,
        reviewRemarks: tlRemarks,
        sessionActions,
      },
    });

    setReviewingTeacherLeave(null);
  };

  const handleStudentLeaveSubmit = async (e) => {
    e.preventDefault();
    if (!reviewingStudentLeave) return;
    await reviewStudentLeaveMutation.mutateAsync({
      id: reviewingStudentLeave._id,
      data: {
        status: slAction,
        reviewRemarks: slRemarks,
      },
    });
    setReviewingStudentLeave(null);
  };

  const handleCreateHoliday = async (e) => {
    e.preventDefault();
    await createHolidayMutation.mutateAsync({
      title: holidayTitle,
      startDate: holidayStartDate,
      endDate: holidayEndDate,
      scope: holidayScope,
      batch: holidayScope === "batch" ? holidayBatch : undefined,
    });
    setShowHolidayModal(false);
    setHolidayTitle("");
    setHolidayStartDate("");
    setHolidayEndDate("");
  };

  const metrics = summaryData?.metrics || {
    totalRollCallsMarked: 0,
    totalSessions: 0,
    cancelledSessions: 0,
    pendingSessions: 0,
    makeUpDue: 0,
    overallRate: 0,
  };

  const timetables = timetablesData?.timetables || [];
  const sessions = sessionsData?.sessions || [];
  const teacherLeaves = teacherLeavesData?.leaves || [];
  const studentLeaves = studentLeavesData?.leaves || [];
  const holidays = holidaysData?.holidays || [];
  const auditLogs = auditLogsData?.logs || [];

  return (
    <div className="w-full space-y-6">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-[#D6451B] p-6 rounded-2xl text-white shadow-md flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2">
            <FaClipboardCheck />
            Timetable, Attendance & Leave Console
          </h1>
          <p className="text-orange-100 text-xs sm:text-sm mt-1">
            Automated recurring timetables, session generation, attendance registers, and leave governance.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => triggerGenerationMutation.mutate()}
            disabled={triggerGenerationMutation.isPending}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/20 hover:bg-white/30 text-white text-xs font-bold backdrop-blur-sm transition-all"
          >
            <FaSync className={triggerGenerationMutation.isPending ? "animate-spin" : ""} />
            Generate Sessions (30d)
          </button>
          <button
            onClick={() => setShowCreateTimetableModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-[#D6451B] hover:bg-orange-50 text-xs font-bold shadow-xs transition-all"
          >
            <FaPlus />
            New Weekly Timetable
          </button>
        </div>
      </div>

      {/* High-Level Metric Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-2xs font-bold text-slate-500 uppercase">Roll Calls Marked</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{metrics.totalRollCallsMarked}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
          <p className="text-2xs font-bold text-slate-500 uppercase">Active Sessions</p>
          <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{metrics.totalSessions}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-amber-200 bg-amber-50/30 shadow-2xs">
          <p className="text-2xs font-bold text-amber-800 uppercase">Pending Roll Calls</p>
          <p className="text-xl sm:text-2xl font-black text-amber-600 mt-1">{metrics.pendingSessions}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-rose-200 bg-rose-50/30 shadow-2xs">
          <p className="text-2xs font-bold text-rose-800 uppercase">Cancelled Classes</p>
          <p className="text-xl sm:text-2xl font-black text-rose-600 mt-1">{metrics.cancelledSessions}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/30 shadow-2xs">
          <p className="text-2xs font-bold text-blue-800 uppercase">Make-Up Classes Due</p>
          <p className="text-xl sm:text-2xl font-black text-blue-600 mt-1">{metrics.makeUpDue}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 shadow-2xs">
          <p className="text-2xs font-bold text-emerald-800 uppercase">Overall Attendance</p>
          <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">{metrics.overallRate}%</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto border-b border-slate-200 pb-2 scrollbar-hide text-xs font-bold">
        {[
          { id: "overview", label: "Overview & Reports", icon: FaClipboardCheck },
          { id: "timetables", label: `Timetables (${timetables.length})`, icon: FaCalendarAlt },
          { id: "sessions", label: `Scheduled Sessions (${sessions.length})`, icon: FaClock },
          { id: "teacher-leaves", label: `Teacher Leaves (${teacherLeaves.filter((l) => l.status === "pending").length} pending)`, icon: FaChalkboardTeacher },
          { id: "student-leaves", label: `Student Leaves (${studentLeaves.filter((l) => l.status === "pending").length} pending)`, icon: FaUsers },
          { id: "holidays", label: `Holidays (${holidays.length})`, icon: FaCalendarMinus },
          { id: "audit", label: `Audit Log`, icon: FaHistory },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
                active
                  ? "bg-[#D6451B] text-white shadow-xs"
                  : "text-slate-600 hover:bg-orange-50 hover:text-[#D6451B]"
              }`}
            >
              <Icon className="text-xs" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & REPORTS */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                <FaClipboardCheck className="text-orange-500" />
                Recent Roll Calls
              </h3>
              <Link
                href="/admin-panel/mark-attendence"
                className="text-xs font-bold text-[#D6451B] hover:underline flex items-center gap-1"
              >
                Mark Attendance
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 uppercase font-bold text-slate-500">
                  <tr>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Batch / Session</th>
                    <th className="py-2.5 px-3">Roll Call Counts</th>
                    <th className="py-2.5 px-3">Attendance %</th>
                    <th className="py-2.5 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(summaryData?.attendances || []).slice(0, 15).map((att) => {
                    const present = att.records.filter((r) => r.status === "present").length;
                    const absent = att.records.filter((r) => r.status === "absent").length;
                    const leave = att.records.filter((r) => r.status === "leave").length;
                    const total = att.records.length;
                    const rate = total > 0 ? Math.round((present / total) * 100) : 0;

                    return (
                      <tr key={att._id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-3 font-medium text-slate-900 whitespace-nowrap">
                          {formatDate(att.date)}
                        </td>
                        <td className="py-3 px-3 font-bold text-slate-800">
                          {att.batch?.name || "Batch"}
                        </td>
                        <td className="py-3 px-3 whitespace-nowrap">
                          <span className="text-emerald-600 font-bold">{present} Present</span> •{" "}
                          <span className="text-rose-600 font-bold">{absent} Absent</span> •{" "}
                          <span className="text-amber-600 font-bold">{leave} Leave</span>
                        </td>
                        <td className="py-3 px-3 font-extrabold text-slate-800">{rate}%</td>
                        <td className="py-3 px-3">
                          <Link
                            href={`/admin-panel/attendence/view?attendanceId=${att._id}`}
                            className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                          >
                            Details
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: TIMETABLES */}
      {activeTab === "timetables" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">
              Recurring Weekly Timetables ({timetables.length})
            </h3>
            <button
              onClick={() => setShowCreateTimetableModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D6451B] text-white text-xs font-bold hover:bg-orange-600 transition-all shadow-xs"
            >
              <FaPlus />
              Create Timetable
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {timetables.map((tt) => {
              const dayPills = (tt.daysOfWeek || []).map((d) => {
                const found = DAYS_OF_WEEK.find((item) => item.id === d);
                return found ? found.name : d;
              });

              return (
                <div
                  key={tt._id}
                  className={`bg-white rounded-2xl border p-5 shadow-2xs space-y-3 transition-all ${
                    tt.isActive ? "border-slate-200/90" : "border-slate-200 bg-slate-50/50 opacity-75"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">{tt.batch?.name || "Batch"}</h4>
                      <p className="text-xs text-slate-500 font-medium flex items-center gap-1 mt-0.5">
                        <FaUserTie className="text-slate-400 text-2xs" />
                        {tt.teacher?.fullName || "Unassigned"}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-2xs font-extrabold ${
                        tt.isActive ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      {tt.isActive ? "ACTIVE" : "PAUSED"}
                    </span>
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-semibold text-slate-400">Days:</span>
                      {dayPills.map((day) => (
                        <span key={day} className="px-2 py-0.5 rounded-md bg-orange-50 text-[#D6451B] font-bold text-2xs">
                          {day}
                        </span>
                      ))}
                    </div>

                    <p className="flex items-center gap-1.5">
                      <FaClock className="text-slate-400 text-2xs" />
                      <span className="font-bold text-slate-800">{tt.startTime} - {tt.endTime}</span>
                    </p>

                    <p className="flex items-center gap-1.5 text-2xs text-slate-500">
                      <span>Effective:</span> {formatDate(tt.effectiveStartDate)}
                      {tt.effectiveEndDate && ` to ${formatDate(tt.effectiveEndDate)}`}
                    </p>

                    {tt.room && <p className="text-2xs text-slate-500">Room: {tt.room}</p>}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => toggleStatusMutation.mutate({ id: tt._id, data: { isActive: !tt.isActive } })}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 text-2xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      {tt.isActive ? <FaPause className="text-amber-500" /> : <FaPlay className="text-emerald-500" />}
                      {tt.isActive ? "Pause" : "Resume"}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Delete this timetable? Future unrecorded sessions will be cancelled.")) {
                          deleteTimetableMutation.mutate(tt._id);
                        }
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-2xs font-bold"
                    >
                      <FaTrash />
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: SCHEDULED SESSIONS */}
      {activeTab === "sessions" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h3 className="font-extrabold text-base text-slate-900">
              Generated & Extra Sessions ({sessions.length})
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowExtraSessionModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-500 text-white text-xs font-bold hover:bg-orange-600 transition-all shadow-xs"
              >
                <FaPlus />
                Schedule Extra Class
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 uppercase font-bold text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Batch</th>
                  <th className="py-2.5 px-3">Timing</th>
                  <th className="py-2.5 px-3">Teacher</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Attendance</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sessions.map((s) => (
                  <tr key={s._id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-3 font-medium text-slate-900 whitespace-nowrap">
                      {formatDate(s.date)}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-800">
                      {s.batch?.name || s.title}
                      {s.isExtraSession && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded-sm bg-purple-100 text-purple-700 text-2xs font-bold">
                          EXTRA
                        </span>
                      )}
                      {s.isMakeUp && (
                        <span className="ml-1.5 px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-700 text-2xs font-bold">
                          MAKE-UP
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-medium text-slate-600">
                      {s.startTime} - {s.endTime}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-semibold text-slate-800">{s.teacher?.fullName || "—"}</span>
                      {s.substituteTeacher && (
                        <span className="block text-2xs text-amber-700 font-bold">
                          Sub: {s.substituteTeacher.fullName}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-0.5 rounded-full text-2xs font-extrabold ${
                          s.status === "completed"
                            ? "bg-emerald-100 text-emerald-800"
                            : s.status === "cancelled"
                            ? "bg-rose-100 text-rose-800"
                            : s.status === "rescheduled"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {s.status.toUpperCase()}
                      </span>
                      {s.cancellationReason && (
                        <span className="block text-2xs text-rose-600 italic mt-0.5 truncate max-w-[150px]">
                          {s.cancellationReason}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      {s.attendanceMarked ? (
                        <span className="text-emerald-600 font-bold">✓ Recorded</span>
                      ) : (
                        <span className="text-amber-600 font-semibold">Pending</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap space-x-1">
                      {s.status !== "cancelled" && !s.attendanceMarked && (
                        <>
                          <button
                            onClick={() => {
                              setSelectedSession(s);
                              setShowCancelSessionModal(true);
                            }}
                            className="px-2 py-1 rounded-md bg-rose-50 text-rose-600 hover:bg-rose-100 text-2xs font-bold"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSession(s);
                              setRescheduleTeacher(s.teacher?._id || "");
                              setShowRescheduleModal(true);
                            }}
                            className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 text-2xs font-bold"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSession(s);
                              setShowSubstituteModal(true);
                            }}
                            className="px-2 py-1 rounded-md bg-amber-50 text-amber-700 hover:bg-amber-100 text-2xs font-bold"
                          >
                            Substitute
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: TEACHER LEAVES */}
      {activeTab === "teacher-leaves" && (
        <div className="space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">
            Teacher Leave Governance ({teacherLeaves.length})
          </h3>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100">
            {teacherLeaves.map((leave) => (
              <div key={leave._id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{leave.teacher?.fullName || "Teacher"}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-2xs font-bold ${
                        leave.status === "approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : leave.status === "rejected"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {leave.status.toUpperCase()}
                    </span>
                    <span className="text-2xs text-slate-400 capitalize bg-slate-100 px-2 py-0.5 rounded-md">
                      {leave.type}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">
                    {formatDate(leave.startDate)} to {formatDate(leave.endDate)}
                  </p>
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold">Reason:</span> {leave.reason}
                  </p>
                </div>

                {leave.status === "pending" && (
                  <button
                    onClick={() => handleOpenTeacherLeaveReview(leave)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#D6451B] text-white text-xs font-bold hover:bg-orange-600 transition-all shadow-xs self-start md:self-center"
                  >
                    Review & Resolve Sessions
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: STUDENT LEAVES */}
      {activeTab === "student-leaves" && (
        <div className="space-y-4">
          <h3 className="font-extrabold text-base text-slate-900">
            Student Leave Approvals ({studentLeaves.length})
          </h3>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100">
            {studentLeaves.map((leave) => (
              <div key={leave._id} className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">{leave.student?.fullName || "Student"}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-2xs font-bold ${
                        leave.status === "approved"
                          ? "bg-emerald-100 text-emerald-800"
                          : leave.status === "rejected"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {leave.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700">
                    {formatDate(leave.startDate)} to {formatDate(leave.endDate)}
                  </p>
                  <p className="text-xs text-slate-600">
                    <span className="font-semibold">Reason:</span> {leave.reason}
                  </p>
                </div>

                {leave.status === "pending" && (
                  <div className="flex items-center gap-2 self-start md:self-center">
                    <button
                      onClick={() => {
                        setReviewingStudentLeave(leave);
                        setSlAction("approved");
                      }}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-all shadow-xs"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => {
                        setReviewingStudentLeave(leave);
                        setSlAction("rejected");
                      }}
                      className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-all shadow-xs"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: HOLIDAYS */}
      {activeTab === "holidays" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-base text-slate-900">
              Academy & Batch Holidays ({holidays.length})
            </h3>
            <button
              onClick={() => setShowHolidayModal(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#D6451B] text-white text-xs font-bold hover:bg-orange-600 transition-all shadow-xs"
            >
              <FaPlus />
              Declare Holiday
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {holidays.map((h) => (
              <div key={h._id} className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-base">{h.title}</span>
                  <span className="px-2 py-0.5 rounded-full text-2xs font-extrabold bg-blue-100 text-blue-800 uppercase">
                    {h.scope}
                  </span>
                </div>
                <p className="text-xs text-slate-600 font-semibold flex items-center gap-1">
                  <FaCalendarAlt className="text-orange-500" />
                  {formatDate(h.startDate)} to {formatDate(h.endDate)}
                </p>
                {h.batch?.name && (
                  <p className="text-xs text-slate-500 font-medium">Batch: {h.batch.name}</p>
                )}
                {h.description && (
                  <p className="text-xs text-slate-500 italic">{h.description}</p>
                )}
                <div className="pt-2 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => {
                      if (confirm("Delete this holiday?")) {
                        deleteHolidayMutation.mutate(h._id);
                      }
                    }}
                    className="text-rose-600 hover:text-rose-800 text-xs font-bold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 7: AUDIT LOG */}
      {activeTab === "audit" && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs p-5 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
            <FaHistory className="text-orange-500" />
            Attendance & Scheduling Audit History ({auditLogs.length})
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-700">
              <thead className="bg-slate-50 border-b border-slate-200 uppercase font-bold text-slate-500">
                <tr>
                  <th className="py-2.5 px-3">Timestamp</th>
                  <th className="py-2.5 px-3">Action</th>
                  <th className="py-2.5 px-3">Target</th>
                  <th className="py-2.5 px-3">Actor</th>
                  <th className="py-2.5 px-3">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-50/50">
                    <td className="py-2.5 px-3 whitespace-nowrap text-slate-500">
                      {formatDate(log.createdAt)}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap font-bold text-slate-800">
                      {log.action}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 font-medium">{log.targetType}</td>
                    <td className="py-2.5 px-3 text-slate-800 font-semibold whitespace-nowrap">
                      {log.actor?.fullName || "System"} ({log.actorRole || "admin"})
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 font-mono text-2xs truncate max-w-xs">
                      {JSON.stringify(log.details)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: CREATE RECURRING TIMETABLE */}
      {showCreateTimetableModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-orange-500 to-[#D6451B] p-4 text-white">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <FaCalendarAlt />
                Create Recurring Weekly Timetable
              </h3>
              <p className="text-orange-100 text-xs mt-0.5">
                Automatically generates class instances for the rolling 30-day window.
              </p>
            </div>
            <form onSubmit={handleCreateTimetable} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Batch / Cohort</label>
                  <select
                    required
                    value={ttBatch}
                    onChange={(e) => {
                      setTtBatch(e.target.value);
                      handleCheckConflict();
                    }}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                  >
                    <option value="">Select Batch</option>
                    {batches.map((b) => (
                      <option key={b._id} value={b._id}>{b.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Teacher</label>
                  <select
                    required
                    value={ttTeacher}
                    onChange={(e) => {
                      setTtTeacher(e.target.value);
                      handleCheckConflict();
                    }}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                  >
                    <option value="">Select Teacher</option>
                    {teachers.map((t) => (
                      <option key={t._id} value={t._id}>{t.fullName}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Class Days of Week</label>
                <div className="grid grid-cols-7 gap-1.5">
                  {DAYS_OF_WEEK.map((d) => {
                    const isSelected = ttDays.includes(d.id);
                    return (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => {
                          const next = isSelected ? ttDays.filter((id) => id !== d.id) : [...ttDays, d.id];
                          setTtDays(next);
                          handleCheckConflict();
                        }}
                        className={`py-2 text-center rounded-xl font-bold text-xs transition-all ${
                          isSelected ? "bg-[#D6451B] text-white shadow-xs" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                      >
                        {d.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    required
                    value={ttStartTime}
                    onChange={(e) => {
                      setTtStartTime(e.target.value);
                      handleCheckConflict();
                    }}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Time</label>
                  <input
                    type="time"
                    required
                    value={ttEndTime}
                    onChange={(e) => {
                      setTtEndTime(e.target.value);
                      handleCheckConflict();
                    }}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Effective Start Date</label>
                  <input
                    type="date"
                    required
                    value={ttStartDate}
                    onChange={(e) => setTtStartDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Effective End Date (Optional)</label>
                  <input
                    type="date"
                    value={ttEndDate}
                    onChange={(e) => setTtEndDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Room / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Lab 2 / Room 101"
                    value={ttRoom}
                    onChange={(e) => setTtRoom(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Platform</label>
                  <select
                    value={ttPlatform}
                    onChange={(e) => setTtPlatform(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                  >
                    <option value="offline">Offline / Classroom</option>
                    <option value="zoom">Zoom</option>
                    <option value="google-meet">Google Meet</option>
                    <option value="teams">Microsoft Teams</option>
                  </select>
                </div>
              </div>

              {ttConflictWarning.length > 0 && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
                  <p className="text-xs font-bold text-rose-800 flex items-center gap-1">
                    <FaExclamationTriangle /> Conflict Warning:
                  </p>
                  <ul className="text-2xs text-rose-700 list-disc list-inside">
                    {ttConflictWarning.map((c, idx) => (
                      <li key={idx}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateTimetableModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createTimetableMutation.isPending}
                  className="px-4 py-2 rounded-xl bg-[#D6451B] text-white text-xs font-bold hover:bg-orange-600 shadow-xs"
                >
                  {createTimetableMutation.isPending ? "Generating Sessions..." : "Create & Generate Sessions"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 2: CANCEL SESSION */}
      {showCancelSessionModal && selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-rose-500 to-rose-700 p-4 text-white">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <FaBan />
                Cancel Class Session
              </h3>
              <p className="text-rose-100 text-xs mt-0.5">
                Students will NOT be marked absent for cancelled sessions.
              </p>
            </div>
            <form onSubmit={handleCancelSessionSubmit} className="p-5 space-y-4">
              <div>
                <p className="text-xs font-bold text-slate-800">
                  {selectedSession.batch?.name || selectedSession.title} on {formatDate(selectedSession.date)} ({selectedSession.startTime}-{selectedSession.endTime})
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Reason for Cancellation</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. Instructor illness, bad weather, room maintenance..."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="makeUpCheckbox"
                  checked={cancelMakeUpRequired}
                  onChange={(e) => setCancelMakeUpRequired(e.target.checked)}
                  className="rounded text-rose-600 focus:ring-rose-500"
                />
                <label htmlFor="makeUpCheckbox" className="text-xs font-bold text-slate-700 cursor-pointer">
                  Require Make-Up / Replacement Class
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCancelSessionModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={cancelSessionMutation.isPending}
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 shadow-xs"
                >
                  {cancelSessionMutation.isPending ? "Cancelling..." : "Confirm Cancellation"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 3: RESCHEDULE SESSION */}
      {showRescheduleModal && selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-4 text-white">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <FaClock />
                Reschedule Session
              </h3>
              <p className="text-blue-100 text-xs mt-0.5">
                Creates a linked replacement session without double-counting attendance.
              </p>
            </div>
            <form onSubmit={handleRescheduleSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">New Date</label>
                <input
                  type="date"
                  required
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    required
                    value={rescheduleStartTime}
                    onChange={(e) => setRescheduleStartTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Time</label>
                  <input
                    type="time"
                    required
                    value={rescheduleEndTime}
                    onChange={(e) => setRescheduleEndTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Teacher (Optional)</label>
                <select
                  value={rescheduleTeacher}
                  onChange={(e) => setRescheduleTeacher(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden bg-white"
                >
                  <option value="">Keep Assigned Teacher</option>
                  {teachers.map((t) => (
                    <option key={t._id} value={t._id}>{t.fullName}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowRescheduleModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={rescheduleSessionMutation.isPending}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 shadow-xs"
                >
                  {rescheduleSessionMutation.isPending ? "Rescheduling..." : "Confirm Reschedule"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 4: ASSIGN SUBSTITUTE TEACHER */}
      {showSubstituteModal && selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-amber-500 to-amber-700 p-4 text-white">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <FaChalkboardTeacher />
                Assign Substitute Teacher
              </h3>
              <p className="text-amber-100 text-xs mt-0.5">
                The substitute teacher will see this session on their dashboard and can take attendance.
              </p>
            </div>
            <form onSubmit={handleAssignSubstituteSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Substitute Teacher</label>
                <select
                  required
                  value={substituteTeacherId}
                  onChange={(e) => setSubstituteTeacherId(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                >
                  <option value="">Select Teacher</option>
                  {teachers
                    .filter((t) => t._id !== selectedSession.teacher?._id)
                    .map((t) => (
                      <option key={t._id} value={t._id}>{t.fullName} ({t.email})</option>
                    ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowSubstituteModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={assignSubstituteMutation.isPending}
                  className="px-4 py-2 rounded-xl bg-amber-600 text-white text-xs font-bold hover:bg-amber-700 shadow-xs"
                >
                  {assignSubstituteMutation.isPending ? "Assigning..." : "Confirm Substitute"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 5: TEACHER LEAVE REVIEW & SESSION RESOLUTION */}
      {reviewingTeacherLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-orange-500 to-[#D6451B] p-4 text-white">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <FaChalkboardTeacher />
                Review Teacher Leave Request
              </h3>
              <p className="text-orange-100 text-xs mt-0.5">
                Instructor: {reviewingTeacherLeave.teacher?.fullName} ({formatDate(reviewingTeacherLeave.startDate)} to {formatDate(reviewingTeacherLeave.endDate)})
              </p>
            </div>
            <form onSubmit={handleTeacherLeaveSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <p><span className="font-bold">Reason:</span> {reviewingTeacherLeave.reason}</p>
                <p><span className="font-bold">Type:</span> {reviewingTeacherLeave.type}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Decision</label>
                <select
                  value={tlAction}
                  onChange={(e) => setTlAction(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-bold focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                >
                  <option value="approved">Approve Leave</option>
                  <option value="rejected">Reject Leave</option>
                </select>
              </div>

              {tlAction === "approved" && tlAffectedPreview.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-800">
                    Resolve {tlAffectedPreview.length} Affected Session(s):
                  </p>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {tlAffectedPreview.map((s) => (
                      <div key={s._id} className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs flex items-center justify-between gap-2">
                        <div>
                          <p className="font-bold text-slate-900">{s.batch?.name || s.title}</p>
                          <p className="text-2xs text-slate-500">{formatDate(s.date)} ({s.startTime}-{s.endTime})</p>
                        </div>
                        <select
                          value={tlSessionActions[s._id] || "cancelled"}
                          onChange={(e) => setTlSessionActions({ ...tlSessionActions, [s._id]: e.target.value })}
                          className="rounded-lg border border-slate-300 p-1.5 text-2xs font-bold bg-white"
                        >
                          <option value="cancelled">Cancel (Make-Up Due)</option>
                          <option value="pending">Keep Pending</option>
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Review Remarks</label>
                <textarea
                  rows={2}
                  placeholder="Optional remarks for instructor..."
                  value={tlRemarks}
                  onChange={(e) => setTlRemarks(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setReviewingTeacherLeave(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reviewTeacherLeaveMutation.isPending}
                  className="px-4 py-2 rounded-xl bg-[#D6451B] text-white text-xs font-bold hover:bg-orange-600 shadow-xs"
                >
                  {reviewTeacherLeaveMutation.isPending ? "Submitting..." : "Submit Review"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 6: STUDENT LEAVE REVIEW */}
      {reviewingStudentLeave && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-orange-500 to-[#D6451B] p-4 text-white">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <FaUsers />
                {slAction === "approved" ? "Approve" : "Reject"} Student Leave
              </h3>
              <p className="text-orange-100 text-xs mt-0.5">
                {reviewingStudentLeave.student?.fullName} ({formatDate(reviewingStudentLeave.startDate)} to {formatDate(reviewingStudentLeave.endDate)})
              </p>
            </div>
            <form onSubmit={handleStudentLeaveSubmit} className="p-5 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <p><span className="font-bold">Reason:</span> {reviewingStudentLeave.reason}</p>
                {slAction === "approved" && (
                  <p className="text-emerald-700 font-semibold mt-1">
                    ✓ Approving will automatically convert any recorded absences during excused dates to Approved Leave.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Remarks</label>
                <textarea
                  rows={2}
                  placeholder="Optional review remarks..."
                  value={slRemarks}
                  onChange={(e) => setSlRemarks(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setReviewingStudentLeave(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={reviewStudentLeaveMutation.isPending}
                  className={`px-4 py-2 rounded-xl text-white text-xs font-bold shadow-xs ${
                    slAction === "approved" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-rose-600 hover:bg-rose-700"
                  }`}
                >
                  {reviewStudentLeaveMutation.isPending ? "Processing..." : `Confirm ${slAction}`}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 7: DECLARE HOLIDAY */}
      {showHolidayModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-orange-500 to-[#D6451B] p-4 text-white">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <FaCalendarMinus />
                Declare Holiday
              </h3>
              <p className="text-orange-100 text-xs mt-0.5">
                Automatically cancels affected future sessions without creating false absences.
              </p>
            </div>
            <form onSubmit={handleCreateHoliday} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Holiday Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diwali Vacation, Eid, National Holiday"
                  value={holidayTitle}
                  onChange={(e) => setHolidayTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={holidayStartDate}
                    onChange={(e) => setHolidayStartDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={holidayEndDate}
                    onChange={(e) => setHolidayEndDate(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Scope</label>
                <select
                  value={holidayScope}
                  onChange={(e) => setHolidayScope(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                >
                  <option value="academy">Entire Academy (All Batches)</option>
                  <option value="batch">Specific Batch Only</option>
                </select>
              </div>

              {holidayScope === "batch" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Batch</label>
                  <select
                    required
                    value={holidayBatch}
                    onChange={(e) => setHolidayBatch(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                  >
                    <option value="">Select Batch</option>
                    {batches.map((b) => (
                      <option key={b._id} value={b._id}>{b.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowHolidayModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createHolidayMutation.isPending}
                  className="px-4 py-2 rounded-xl bg-[#D6451B] text-white text-xs font-bold hover:bg-orange-600 shadow-xs"
                >
                  {createHolidayMutation.isPending ? "Declaring..." : "Declare Holiday"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* MODAL 8: EXTRA CLASS */}
      {showExtraSessionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
          <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden border border-slate-200">
            <div className="bg-gradient-to-r from-orange-500 to-[#D6451B] p-4 text-white">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <FaPlus />
                Schedule One-Time Extra Session
              </h3>
              <p className="text-orange-100 text-xs mt-0.5">
                Creates an independent one-time class session for a batch.
              </p>
            </div>
            <form onSubmit={handleCreateExtraSession} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Batch</label>
                <select
                  required
                  value={extraBatch}
                  onChange={(e) => setExtraBatch(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                >
                  <option value="">Select Batch</option>
                  {batches.map((b) => (
                    <option key={b._id} value={b._id}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Teacher</label>
                <select
                  required
                  value={extraTeacher}
                  onChange={(e) => setExtraTeacher(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden bg-white"
                >
                  <option value="">Select Teacher</option>
                  {teachers.map((t) => (
                    <option key={t._id} value={t._id}>{t.fullName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                <input
                  type="date"
                  required
                  value={extraDate}
                  onChange={(e) => setExtraDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Start Time</label>
                  <input
                    type="time"
                    required
                    value={extraStartTime}
                    onChange={(e) => setExtraStartTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">End Time</label>
                  <input
                    type="time"
                    required
                    value={extraEndTime}
                    onChange={(e) => setExtraEndTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Session Topic / Title</label>
                <input
                  type="text"
                  required
                  value={extraTitle}
                  onChange={(e) => setExtraTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 p-2 text-xs font-medium focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowExtraSessionModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createExtraSessionMutation.isPending}
                  className="px-4 py-2 rounded-xl bg-[#D6451B] text-white text-xs font-bold hover:bg-orange-600 shadow-xs"
                >
                  {createExtraSessionMutation.isPending ? "Scheduling..." : "Schedule Session"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
