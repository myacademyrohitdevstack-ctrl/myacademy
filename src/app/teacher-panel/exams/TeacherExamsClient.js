"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFileAlt,
  FaPlus,
  FaTimes,
  FaCheckCircle,
  FaTrashAlt,
  FaSpinner,
  FaSearch,
  FaUsers,
  FaChartLine,
  FaCalendarAlt,
  FaClock,
  FaAward,
  FaEdit,
} from "react-icons/fa";
import { useExams, useExamDetails } from "@/Hooks/useExams";
import { useGetAllAcademyBatches } from "@/Hooks/useAdminGetBatches";
import {
  useCreateExamMutation,
  useDeleteExamMutation,
  useSaveExamResultsMutation,
} from "@/app/mutations/examMutations";
import { toast } from "sonner";
import formatDate from "@/Utils/formatDate";

export default function TeacherExamsClient() {
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: exams = [], isLoading } = useExams({
    batchId: selectedBatchId || undefined,
    status: statusFilter || undefined,
  });
  const { data: batches = [] } = useGetAllAcademyBatches();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [marksModalExamId, setMarksModalExamId] = useState(null);

  // Create Form State
  const [createForm, setCreateForm] = useState({
    batchId: "",
    title: "",
    subject: "",
    examDate: new Date().toISOString().split("T")[0],
    durationMinutes: 60,
    totalMarks: 100,
    passingMarks: 35,
    instructions: "",
  });

  const createMutation = useCreateExamMutation();
  const deleteMutation = useDeleteExamMutation();

  const openCreateModal = () => {
    setCreateForm({
      batchId: batches[0]?._id || "",
      title: "",
      subject: "",
      examDate: new Date().toISOString().split("T")[0],
      durationMinutes: 60,
      totalMarks: 100,
      passingMarks: 35,
      instructions: "",
    });
    setCreateModalOpen(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!createForm.batchId) {
      toast.error("Please select a batch");
      return;
    }
    if (!createForm.title.trim()) {
      toast.error("Please enter exam title");
      return;
    }

    try {
      await createMutation.mutateAsync({
        ...createForm,
        durationMinutes: Number(createForm.durationMinutes),
        totalMarks: Number(createForm.totalMarks),
        passingMarks: Number(createForm.passingMarks),
      });
      toast.success("Exam scheduled successfully!");
      setCreateModalOpen(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create exam");
    }
  };

  const handleDelete = async (id, title) => {
    if (!confirm(`Are you sure you want to delete exam "${title}"?`)) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Exam deleted successfully");
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to delete exam");
    }
  };

  // Filter exams by search
  const filteredExams = exams.filter((exam) => {
    const term = searchTerm.toLowerCase();
    const titleMatch = exam.title?.toLowerCase().includes(term);
    const subjectMatch = exam.subject?.toLowerCase().includes(term);
    const batchMatch = exam.batchId?.name?.toLowerCase().includes(term);
    return titleMatch || subjectMatch || batchMatch;
  });

  // Overview metrics
  const totalExamsCount = exams.length;
  const publishedExamsCount = exams.filter((e) => e.isResultsPublished).length;
  const pendingEvaluationCount = exams.filter((e) => !e.isResultsPublished).length;

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-orange-600 via-[#D6451B] to-amber-600 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md mb-2">
              <FaAward className="text-amber-300" />
              <span>Teacher Academic Assessment</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Class Examinations & Results
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-orange-100 max-w-xl">
              Schedule tests, mark attendance, enter student test scores, and publish official grades for your batches.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-xs sm:text-sm font-black text-[#D6451B] shadow-lg hover:bg-orange-50 active:scale-95 transition"
          >
            <FaPlus className="text-xs" />
            <span>Schedule New Exam</span>
          </button>
        </div>

        <div className="absolute -right-8 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-[#D6451B] font-black text-lg">
            <FaFileAlt />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Exams</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900">{totalExamsCount}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 font-black text-lg">
            <FaCheckCircle />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Evaluated & Published</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900">{publishedExamsCount}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 font-black text-lg">
            <FaClock />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Grading Pending</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900">{pendingEvaluationCount}</p>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search exam title, subject, or batch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D6451B]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Batch Selector */}
          <select
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-[#D6451B]"
          >
            <option value="">All My Batches</option>
            {batches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>

          {/* Status Selector */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-700 outline-none focus:border-[#D6451B]"
          >
            <option value="">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="ongoing">Ongoing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Exam Cards Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
          <FaSpinner className="text-3xl text-[#D6451B] animate-spin" />
          <p className="mt-3 text-xs font-bold text-slate-500">Loading exams list...</p>
        </div>
      ) : filteredExams.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B] mb-3">
            <FaFileAlt className="text-2xl" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">No Exams Scheduled</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm">
            You have not scheduled any examinations yet. Click &quot;Schedule New Exam&quot; to create assessments for your class.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-4 flex items-center gap-2 rounded-xl bg-[#D6451B] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-orange-700 transition"
          >
            <FaPlus className="text-xs" />
            <span>Create First Exam</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredExams.map((exam) => (
            <motion.div
              key={exam._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-orange-100 px-2 py-0.5 text-[11px] font-black text-[#D6451B] uppercase tracking-wider">
                      {exam.subject || "General"}
                    </span>
                    <span
                      className={`rounded-lg px-2 py-0.5 text-[11px] font-black uppercase tracking-wider ${
                        exam.status === "completed"
                          ? "bg-emerald-100 text-emerald-700"
                          : exam.status === "cancelled"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </div>

                  {exam.isResultsPublished ? (
                    <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                      <FaCheckCircle className="text-[10px]" />
                      Results Out
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
                      <FaClock className="text-[10px]" />
                      Pending Marks
                    </span>
                  )}
                </div>

                <h3 className="mt-3 font-extrabold text-base text-slate-900 line-clamp-1">
                  {exam.title}
                </h3>

                <p className="mt-1 text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                  <FaUsers className="text-[#D6451B]" />
                  <span>{exam.batchId?.name || "Unassigned Batch"}</span>
                </p>

                {exam.instructions && (
                  <p className="mt-2 text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    {exam.instructions}
                  </p>
                )}

                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-1.5 font-medium">
                    <FaCalendarAlt className="text-slate-400" />
                    <span>{formatDate(exam.examDate)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <FaClock className="text-slate-400" />
                    <span>{exam.durationMinutes} mins</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <FaAward className="text-slate-400" />
                    <span>Max: {exam.totalMarks} Marks</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <FaCheckCircle className="text-slate-400" />
                    <span>Pass: {exam.passingMarks} Marks</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setMarksModalExamId(exam._id)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-orange-50 border border-orange-200 py-2.5 text-xs font-bold text-[#D6451B] hover:bg-orange-100 transition"
                >
                  <FaEdit className="text-xs" />
                  <span>{exam.isResultsPublished ? "Review / Edit Marks" : "Record Marks"}</span>
                </button>

                <button
                  onClick={() => handleDelete(exam._id, exam.title)}
                  disabled={deleteMutation.isPending}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                  title="Delete Exam"
                >
                  <FaTrashAlt className="text-xs" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* CREATE EXAM MODAL */}
      <AnimatePresence>
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg rounded-3xl bg-white p-5 sm:p-7 shadow-2xl my-8 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-[#D6451B] font-bold">
                    <FaFileAlt className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">Schedule Examination</h3>
                    <p className="text-[11px] text-[#D6451B] font-bold">New cohort assessment</p>
                  </div>
                </div>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="mt-5 space-y-4 text-xs">
                {/* Select Batch */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Batch *
                  </label>
                  <select
                    required
                    value={createForm.batchId}
                    onChange={(e) => setCreateForm({ ...createForm, batchId: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-bold bg-slate-50 outline-none focus:border-[#D6451B]"
                  >
                    <option value="" disabled>-- Choose a batch --</option>
                    {batches.map((b) => (
                      <option key={b._id} value={b._id}>
                        {b.name} ({b.students?.length || 0} students)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Exam Title & Subject */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Exam Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Midterm Test 1"
                      value={createForm.title}
                      onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Physics / English"
                      value={createForm.subject}
                      onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                    />
                  </div>
                </div>

                {/* Date & Duration */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Exam Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={createForm.examDate}
                      onChange={(e) => setCreateForm({ ...createForm, examDate: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Duration (Minutes)
                    </label>
                    <input
                      type="number"
                      min={10}
                      max={360}
                      value={createForm.durationMinutes}
                      onChange={(e) => setCreateForm({ ...createForm, durationMinutes: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                    />
                  </div>
                </div>

                {/* Total Marks & Passing Marks */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Total Maximum Marks *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={createForm.totalMarks}
                      onChange={(e) => setCreateForm({ ...createForm, totalMarks: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Passing Marks *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      value={createForm.passingMarks}
                      onChange={(e) => setCreateForm({ ...createForm, passingMarks: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                    />
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Instructions / Syllabus
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Provide topics covered, calculator policy, or test guidelines..."
                    value={createForm.instructions}
                    onChange={(e) => setCreateForm({ ...createForm, instructions: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="flex items-center gap-2 rounded-xl bg-[#D6451B] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-orange-700 disabled:opacity-50"
                  >
                    {createMutation.isPending ? (
                      <>
                        <FaSpinner className="animate-spin text-xs" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <FaCheckCircle className="text-xs" />
                        <span>Publish Exam</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MARKS ENTRY MODAL */}
      <AnimatePresence>
        {marksModalExamId && (
          <TeacherMarksEntryModal
            examId={marksModalExamId}
            onClose={() => setMarksModalExamId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TeacherMarksEntryModal({ examId, onClose }) {
  const { data, isLoading } = useExamDetails(examId);
  const saveMutation = useSaveExamResultsMutation();

  const exam = data?.exam;
  const existingResults = data?.results || [];

  // Local state for mark entries keyed by studentUserId
  const [entries, setEntries] = useState({});
  const [publishStatus, setPublishStatus] = useState("completed");

  // Sync state once data loads
  const [initialized, setInitialized] = useState(false);
  if (data && !initialized) {
    const map = {};
    const students = exam?.batchId?.students || [];

    students.forEach((stu) => {
      const studentId = stu._id || stu;
      const existing = existingResults.find(
        (r) => (r.studentUserId?._id || r.studentUserId) === studentId
      );

      if (existing) {
        map[studentId] = {
          marksObtained: existing.marksObtained !== undefined ? existing.marksObtained : "",
          isAbsent: existing.isAbsent || false,
          remarks: existing.remarks || "",
        };
      } else {
        map[studentId] = {
          marksObtained: "",
          isAbsent: false,
          remarks: "",
        };
      }
    });

    setEntries(map);
    setPublishStatus(exam?.status || "completed");
    setInitialized(true);
  }

  const handleEntryChange = (studentId, field, val) => {
    setEntries((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [field]: val,
      },
    }));
  };

  const calculateGrade = (marks, total) => {
    if (marks === "" || isNaN(marks) || total <= 0) return "-";
    const pct = (Number(marks) / Number(total)) * 100;
    if (pct >= 90) return "A+";
    if (pct >= 80) return "A";
    if (pct >= 70) return "B";
    if (pct >= 60) return "C";
    if (pct >= 50) return "D";
    return "F";
  };

  const handleSaveMarks = async (e) => {
    e.preventDefault();
    const students = exam?.batchId?.students || [];
    const resultsPayload = students.map((stu) => {
      const sId = stu._id || stu;
      const record = entries[sId] || { marksObtained: 0, isAbsent: false, remarks: "" };
      return {
        studentUserId: sId,
        marksObtained: record.isAbsent ? 0 : Number(record.marksObtained || 0),
        isAbsent: Boolean(record.isAbsent),
        remarks: record.remarks || "",
      };
    });

    try {
      await saveMutation.mutateAsync({
        examId,
        results: resultsPayload,
        status: publishStatus,
      });
      toast.success("Exam results and report cards saved successfully!");
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to record marks");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl bg-white shadow-2xl overflow-hidden my-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-[#D6451B]">
              <FaAward className="text-lg" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-sm sm:text-base">
                Record Student Grades: {exam?.title || "Exam"}
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Batch: {exam?.batchId?.name} | Maximum: {exam?.totalMarks} Marks | Pass: {exam?.passingMarks} Marks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center p-12">
            <FaSpinner className="text-3xl text-[#D6451B] animate-spin" />
            <p className="mt-2 text-xs font-bold text-slate-500">Loading student roster...</p>
          </div>
        ) : (
          <form onSubmit={handleSaveMarks} className="flex flex-col flex-1 overflow-hidden">
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900 flex items-center justify-between gap-3">
                <span>
                  💡 Entering marks automatically updates student report cards and calculates pass/fail thresholds.
                </span>
                <div className="flex items-center gap-2 shrink-0">
                  <label className="font-bold text-[11px] uppercase tracking-wider text-amber-800">
                    Exam Status:
                  </label>
                  <select
                    value={publishStatus}
                    onChange={(e) => setPublishStatus(e.target.value)}
                    className="rounded-lg border border-amber-300 bg-white px-2 py-1 text-xs font-bold text-amber-900"
                  >
                    <option value="scheduled">Scheduled</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed & Published</option>
                  </select>
                </div>
              </div>

              {/* Roster Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-[11px] font-black text-slate-600 uppercase border-b border-slate-200">
                    <tr>
                      <th className="p-3">Student</th>
                      <th className="p-3 w-28">Status</th>
                      <th className="p-3 w-28">Marks (/{exam?.totalMarks})</th>
                      <th className="p-3 w-24">Grade</th>
                      <th className="p-3">Teacher Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {(exam?.batchId?.students || []).length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-slate-400 font-semibold">
                          No students enrolled in this batch yet.
                        </td>
                      </tr>
                    ) : (
                      (exam?.batchId?.students || []).map((student) => {
                        const sId = student._id || student;
                        const rec = entries[sId] || { marksObtained: "", isAbsent: false, remarks: "" };
                        const grade = rec.isAbsent ? "ABS" : calculateGrade(rec.marksObtained, exam?.totalMarks);
                        const isPass = !rec.isAbsent && Number(rec.marksObtained) >= Number(exam?.passingMarks);

                        return (
                          <tr key={sId} className="hover:bg-slate-50/70 transition">
                            <td className="p-3">
                              <p className="font-bold text-slate-900 text-xs sm:text-sm">
                                {student.fullName || "Student"}
                              </p>
                              <p className="text-[11px] text-slate-400 font-mono">
                                {student.email}
                              </p>
                            </td>

                            <td className="p-3">
                              <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={rec.isAbsent}
                                  onChange={(e) => handleEntryChange(sId, "isAbsent", e.target.checked)}
                                  className="rounded border-slate-300 text-[#D6451B] focus:ring-[#D6451B]"
                                />
                                <span className={`text-[11px] font-bold ${rec.isAbsent ? "text-rose-600" : "text-slate-600"}`}>
                                  {rec.isAbsent ? "Absent" : "Present"}
                                </span>
                              </label>
                            </td>

                            <td className="p-3">
                              <input
                                type="number"
                                min={0}
                                max={exam?.totalMarks || 100}
                                disabled={rec.isAbsent}
                                value={rec.marksObtained}
                                onChange={(e) => handleEntryChange(sId, "marksObtained", e.target.value)}
                                placeholder="0"
                                className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-bold text-slate-800 bg-slate-50 focus:bg-white focus:border-[#D6451B] outline-none disabled:bg-slate-100 disabled:text-slate-400"
                              />
                            </td>

                            <td className="p-3">
                              <span
                                className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black ${
                                  rec.isAbsent
                                    ? "bg-rose-100 text-rose-700"
                                    : isPass
                                    ? "bg-emerald-100 text-emerald-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                {grade}
                              </span>
                            </td>

                            <td className="p-3">
                              <input
                                type="text"
                                placeholder="e.g. Excellent clarity / Needs practice in algebra"
                                value={rec.remarks}
                                onChange={(e) => handleEntryChange(sId, "remarks", e.target.value)}
                                className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-xs bg-slate-50 focus:bg-white focus:border-[#D6451B] outline-none"
                              />
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={saveMutation.isPending || (exam?.batchId?.students || []).length === 0}
                className="flex items-center gap-2 rounded-xl bg-[#D6451B] px-6 py-2 text-xs font-bold text-white shadow-xs hover:bg-orange-700 disabled:opacity-50"
              >
                {saveMutation.isPending ? (
                  <>
                    <FaSpinner className="animate-spin text-xs" />
                    <span>Saving Report Cards...</span>
                  </>
                ) : (
                  <>
                    <FaCheckCircle className="text-xs" />
                    <span>Save & Publish Marks</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
