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

export default function AdminExamsClient() {
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
      setCreateModalOpen(false);
    } catch (err) {
      // Handled by mutation onError
    }
  };

  const handleDelete = async (id, title) => {
    if (confirm(`Are you sure you want to delete exam "${title}" and all its marks?`)) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const filteredExams = exams.filter((e) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      e.title?.toLowerCase().includes(term) ||
      e.subject?.toLowerCase().includes(term) ||
      e.batchId?.name?.toLowerCase().includes(term)
    );
  });

  // Calculate overall metrics
  const totalExams = exams.length;
  const completedExams = exams.filter((e) => e.status === "completed").length;
  const gradedList = exams.filter((e) => e.averagePercentage !== null);
  const overallAvg =
    gradedList.length > 0
      ? Math.round((gradedList.reduce((acc, e) => acc + e.averagePercentage, 0) / gradedList.length) * 10) / 10
      : null;

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between min-w-0">
          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Examination & Report Cards
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Exams & Academic Results
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm text-orange-100 max-w-2xl font-normal">
              Schedule cohort examinations, evaluate student scorecards, record marks, and publish official grades and progress reports.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-[#D6451B] shadow-xs hover:bg-orange-50 transition shrink-0"
          >
            <FaPlus className="text-xs" />
            <span>Create New Exam</span>
          </button>
        </div>
      </motion.section>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 w-full min-w-0">
        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Scheduled Exams</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">{totalExams}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Across all academy cohorts</p>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Completed & Graded</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-emerald-600">{completedExams}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Results published to students</p>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold text-slate-500">Average Performance</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-[#D6451B]">
            {overallAvg !== null ? `${overallAvg}%` : "Pending"}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Mean score across completed tests</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by title, subject, batch..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <select
            value={selectedBatchId}
            onChange={(e) => setSelectedBatchId(e.target.value)}
            className="flex-1 sm:flex-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-[#D6451B]"
          >
            <option value="">All Batches</option>
            {batches.map((b) => (
              <option key={b._id} value={b._id}>
                {b.name}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-700 outline-none focus:border-[#D6451B]"
          >
            <option value="">All Statuses</option>
            <option value="scheduled">Scheduled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Exams List */}
      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-xs">
          <FaSpinner className="animate-spin inline mr-2 text-[#D6451B] text-lg" />
          <span>Loading exams and scorecards...</span>
        </div>
      ) : filteredExams.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <FaFileAlt className="text-slate-300 text-5xl mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Exams Found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Schedule an examination to track student grades, percentage averages, and report cards.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D6451B] px-4 py-2.5 text-xs font-bold text-white shadow-xs"
          >
            <FaPlus />
            <span>Create First Exam</span>
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredExams.map((exam) => (
            <motion.div
              key={exam._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-full bg-orange-100 text-[#D6451B] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
                    {exam.subject || "General"}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      exam.status === "completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {exam.status}
                  </span>
                </div>

                <h3 className="mt-3 font-extrabold text-base text-slate-900 leading-tight">
                  {exam.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 font-medium">
                  Batch: <span className="font-bold text-slate-700">{exam.batchId?.name || "General Batch"}</span>
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-slate-400" />
                    <span>{formatDate(exam.examDate)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaClock className="text-slate-400" />
                    <span>{exam.durationMinutes} mins</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaAward className="text-slate-400" />
                    <span>Max: {exam.totalMarks} marks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCheckCircle className="text-emerald-500" />
                    <span>Pass: {exam.passingMarks} marks</span>
                  </div>
                </div>

                {exam.isResultsPublished && (
                  <div className="mt-3 flex items-center justify-between text-xs font-bold px-1">
                    <span className="text-slate-500">Graded Students:</span>
                    <span className="text-emerald-600">{exam.gradedCount} students</span>
                  </div>
                )}
              </div>

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
                    Instructions & Syllabus Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Chapters included, calculator allowed, etc..."
                    value={createForm.instructions}
                    onChange={(e) => setCreateForm({ ...createForm, instructions: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex gap-2.5">
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] py-3 text-xs sm:text-sm font-bold text-white hover:bg-orange-600 transition shadow-xs disabled:opacity-50"
                  >
                    {createMutation.isPending ? <FaSpinner className="animate-spin" /> : <FaPlus />}
                    <span>Schedule Exam</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="px-4 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* RECORD / EDIT MARKS MODAL */}
      {marksModalExamId && (
        <MarksEntryModal
          examId={marksModalExamId}
          onClose={() => setMarksModalExamId(null)}
        />
      )}
    </div>
  );
}

// Subcomponent: Marks Entry Modal
function MarksEntryModal({ examId, onClose }) {
  const { data, isLoading } = useExamDetails(examId);
  const exam = data?.exam;
  const students = data?.students || [];
  const existingResults = data?.results || [];

  const [marksState, setMarksState] = useState({});
  const [remarksState, setRemarksState] = useState({});
  const [initialized, setInitialized] = useState(false);

  // Initialize marks from existing results
  if (!initialized && existingResults.length > 0) {
    const mObj = {};
    const rObj = {};
    existingResults.forEach((r) => {
      const sId = r.studentId?._id || r.studentId;
      mObj[sId] = r.marksObtained;
      rObj[sId] = r.remarks || "";
    });
    setMarksState(mObj);
    setRemarksState(rObj);
    setInitialized(true);
  }

  const saveMutation = useSaveExamResultsMutation(examId);

  const handleSave = async () => {
    const payload = students
      .filter((s) => marksState[s._id] !== undefined && marksState[s._id] !== "")
      .map((s) => ({
        studentId: s._id,
        marksObtained: Number(marksState[s._id]),
        remarks: remarksState[s._id] || "",
      }));

    if (payload.length === 0) {
      toast.error("Please enter marks for at least one student.");
      return;
    }

    try {
      await saveMutation.mutateAsync({ results: payload });
      onClose();
    } catch (err) {
      // Handled by mutation onError
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-3xl rounded-3xl bg-white p-4 sm:p-6 shadow-2xl my-6 flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
              Record Marks & Grades: {exam?.title || "Exam"}
            </h3>
            <p className="text-xs text-slate-500">
              Batch: <span className="font-bold text-[#D6451B]">{exam?.batchId?.name}</span> • Max Marks: {exam?.totalMarks} • Passing: {exam?.passingMarks}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <FaTimes />
          </button>
        </div>

        {/* Students Table */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          {isLoading ? (
            <div className="p-8 text-center text-slate-500">
              <FaSpinner className="animate-spin inline mr-2 text-[#D6451B]" />
              <span>Loading enrolled cohort students...</span>
            </div>
          ) : students.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
              No students are currently enrolled in this batch.
            </div>
          ) : (
            <div className="space-y-3">
              {students.map((student, idx) => {
                const marksVal = marksState[student._id] ?? "";
                const marksNum = Number(marksVal);
                const hasScore = marksVal !== "" && !isNaN(marksNum);
                const pct = hasScore && exam?.totalMarks ? Math.round((marksNum / exam.totalMarks) * 100) : null;
                const isPass = hasScore && exam?.passingMarks ? marksNum >= exam.passingMarks : false;

                return (
                  <div
                    key={student._id}
                    className="p-3 sm:p-3.5 rounded-2xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <span className="text-xs font-bold text-slate-400 w-5">{idx + 1}.</span>
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 font-extrabold text-xs text-[#D6451B] border border-orange-200">
                        {student.fullName?.charAt(0) || "S"}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-xs sm:text-sm text-slate-900 truncate">{student.fullName}</p>
                        <p className="text-[11px] text-slate-400 truncate">{student.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      {/* Marks Input */}
                      <div className="w-24">
                        <input
                          type="number"
                          placeholder="Marks"
                          min={0}
                          max={exam?.totalMarks || 100}
                          value={marksVal}
                          onChange={(e) =>
                            setMarksState({ ...marksState, [student._id]: e.target.value })
                          }
                          className="w-full text-center rounded-xl border border-slate-300 bg-white py-2 px-2 text-xs font-bold text-slate-800 outline-none focus:border-[#D6451B]"
                        />
                      </div>

                      {/* Percentage & Pass/Fail badge */}
                      {hasScore ? (
                        <div className="flex items-center gap-1.5 w-24 justify-center">
                          <span className="text-xs font-bold text-slate-700">{pct}%</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                              isPass ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {isPass ? "PASS" : "FAIL"}
                          </span>
                        </div>
                      ) : (
                        <div className="w-24 text-center text-[10px] font-semibold text-slate-400">
                          Not graded
                        </div>
                      )}

                      {/* Remarks */}
                      <div className="hidden sm:block w-36">
                        <input
                          type="text"
                          placeholder="Teacher remark"
                          value={remarksState[student._id] || ""}
                          onChange={(e) =>
                            setRemarksState({ ...remarksState, [student._id]: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 bg-white py-2 px-2.5 text-[11px] font-medium text-slate-700 outline-none focus:border-[#D6451B]"
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-500 font-medium">
            Grading {Object.keys(marksState).filter((k) => marksState[k] !== "").length} of {students.length} students
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saveMutation.isPending || students.length === 0}
              className="flex items-center gap-2 rounded-xl bg-[#D6451B] px-5 py-2.5 text-xs font-bold text-white hover:bg-orange-600 transition shadow-xs disabled:opacity-50"
            >
              {saveMutation.isPending ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
              <span>Publish Scorecards</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
