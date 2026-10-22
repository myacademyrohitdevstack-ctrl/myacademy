"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClipboardList,
  FaPlus,
  FaTimes,
  FaCheckCircle,
  FaTrashAlt,
  FaSpinner,
  FaSearch,
  FaCalendarAlt,
  FaAward,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaPaperclip,
  FaEye,
} from "react-icons/fa";
import { useHomeworkList, useHomeworkDetails } from "@/Hooks/useHomework";
import { useGetAllAcademyBatches } from "@/Hooks/useAdminGetBatches";
import {
  useCreateHomeworkMutation,
  useDeleteHomeworkMutation,
  useGradeSubmissionMutation,
} from "@/app/mutations/homeworkMutations";
import { toast } from "sonner";
import formatDate from "@/Utils/formatDate";

export default function AdminHomeworkClient() {
  const [selectedBatchId, setSelectedBatchId] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { data: assignments = [], isLoading } = useHomeworkList({
    batchId: selectedBatchId || undefined,
    status: statusFilter || undefined,
  });
  const { data: batches = [] } = useGetAllAcademyBatches();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [reviewModalHomeworkId, setReviewModalHomeworkId] = useState(null);

  // Create Form State
  const [createForm, setCreateForm] = useState(() => ({
    batchId: "",
    title: "",
    subject: "",
    description: "",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    totalPoints: 100,
    attachmentTitle: "",
    attachmentUrl: "",
  }));

  const createMutation = useCreateHomeworkMutation();
  const deleteMutation = useDeleteHomeworkMutation();

  const openCreateModal = () => {
    setCreateForm({
      batchId: batches[0]?._id || "",
      title: "",
      subject: "",
      description: "",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      totalPoints: 100,
      attachmentTitle: "",
      attachmentUrl: "",
    });
    setCreateModalOpen(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!createForm.batchId) {
      toast.error("Please select a batch");
      return;
    }
    if (!createForm.title.trim() || !createForm.description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    const attachments = [];
    if (createForm.attachmentUrl.trim()) {
      attachments.push({
        title: createForm.attachmentTitle.trim() || "Reference Document",
        url: createForm.attachmentUrl.trim(),
      });
    }

    try {
      await createMutation.mutateAsync({
        batchId: createForm.batchId,
        title: createForm.title.trim(),
        subject: createForm.subject.trim(),
        description: createForm.description.trim(),
        dueDate: createForm.dueDate,
        totalPoints: Number(createForm.totalPoints) || 100,
        attachments,
      });
      setCreateModalOpen(false);
    } catch (err) {
      // Handled by onError in mutation
    }
  };

  const handleDelete = async (id, title) => {
    if (confirm(`Are you sure you want to delete assignment "${title}"?`)) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const filtered = assignments.filter((a) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      a.title?.toLowerCase().includes(term) ||
      a.subject?.toLowerCase().includes(term) ||
      a.batchId?.name?.toLowerCase().includes(term)
    );
  });

  // Calculate stats
  const totalAssigned = assignments.length;
  const totalSubmissions = assignments.reduce((acc, a) => acc + (a.submittedCount || 0), 0);
  const totalGraded = assignments.reduce((acc, a) => acc + (a.gradedCount || 0), 0);
  const pendingReview = totalSubmissions - totalGraded;

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
              Assignments & Submissions
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Homework & Exercises
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm text-orange-100 max-w-2xl font-normal">
              Publish batch assignments, review uploaded student solutions, assign marks, and share tailored feedback remarks.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-[#D6451B] shadow-xs hover:bg-orange-50 transition shrink-0"
          >
            <FaPlus className="text-xs" />
            <span>Assign Homework</span>
          </button>
        </div>
      </motion.section>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Total Assignments</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">{totalAssigned}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Active & archived tasks</p>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Student Submissions</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-blue-600">{totalSubmissions}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Submitted by students</p>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Graded Submissions</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-emerald-600">{totalGraded}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Marks & feedback provided</p>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Pending Review</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-amber-600">{pendingReview}</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Awaiting teacher grading</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by assignment title, subject, batch..."
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
            <option value="active">Active</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Homework Cards */}
      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 shadow-xs">
          <FaSpinner className="animate-spin inline mr-2 text-[#D6451B] text-lg" />
          <span>Loading homework assignments...</span>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-xs">
          <FaClipboardList className="text-slate-300 text-5xl mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Homework Found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Assign exercises and homework sets to cohorts so students can upload solutions.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D6451B] px-4 py-2.5 text-xs font-bold text-white shadow-xs"
          >
            <FaPlus />
            <span>Create First Assignment</span>
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-full bg-orange-100 text-[#D6451B] px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider">
                    {item.subject || "Homework"}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      item.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="mt-3 font-extrabold text-base text-slate-900 leading-tight">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500 font-medium">
                  Batch: <span className="font-bold text-slate-700">{item.batchId?.name || "Cohort"}</span>
                </p>

                <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-semibold text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-slate-400" />
                    <span>Due: {formatDate(item.dueDate)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaAward className="text-slate-400" />
                    <span>Points: {item.totalPoints}</span>
                  </div>
                </div>

                {/* Submission Counters Bar */}
                <div className="mt-3 grid grid-cols-3 gap-1.5 text-center p-2 rounded-xl bg-orange-50/50 border border-orange-100 text-[11px]">
                  <div>
                    <span className="block font-bold text-slate-700">{item.submittedCount}</span>
                    <span className="text-[10px] text-slate-500">Submitted</span>
                  </div>
                  <div>
                    <span className="block font-bold text-emerald-600">{item.gradedCount}</span>
                    <span className="text-[10px] text-slate-500">Graded</span>
                  </div>
                  <div>
                    <span className="block font-bold text-amber-600">{item.pendingReviewCount}</span>
                    <span className="text-[10px] text-slate-500">Pending</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setReviewModalHomeworkId(item._id)}
                  className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-orange-50 border border-orange-200 py-2.5 text-xs font-bold text-[#D6451B] hover:bg-orange-100 transition"
                >
                  <FaEye className="text-xs" />
                  <span>Review Submissions ({item.submittedCount})</span>
                </button>

                <button
                  onClick={() => handleDelete(item._id, item.title)}
                  disabled={deleteMutation.isPending}
                  className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                  title="Delete Homework"
                >
                  <FaTrashAlt className="text-xs" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* CREATE HOMEWORK MODAL */}
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
                    <FaClipboardList className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">Assign New Homework</h3>
                    <p className="text-[11px] text-[#D6451B] font-bold">Create exercise for cohort</p>
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

                {/* Title & Subject */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Assignment Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chapter 4 Practice Set"
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
                      placeholder="e.g. Mathematics"
                      value={createForm.subject}
                      onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Instructions / Problem Description *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide questions, instructions or problem numbers for students to complete..."
                    value={createForm.description}
                    onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                  />
                </div>

                {/* Due Date & Total Points */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Due Date *
                    </label>
                    <input
                      type="date"
                      required
                      value={createForm.dueDate}
                      onChange={(e) => setCreateForm({ ...createForm, dueDate: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Total Points
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={createForm.totalPoints}
                      onChange={(e) => setCreateForm({ ...createForm, totalPoints: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                    />
                  </div>
                </div>

                {/* Attachment URL */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Attachment / PDF Link (Optional)
                    </label>
                    <input
                      type="url"
                      placeholder="https://drive.google.com/..."
                      value={createForm.attachmentUrl}
                      onChange={(e) => setCreateForm({ ...createForm, attachmentUrl: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Attachment Label
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Worksheet PDF"
                      value={createForm.attachmentTitle}
                      onChange={(e) => setCreateForm({ ...createForm, attachmentTitle: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex gap-2.5">
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] py-3 text-xs sm:text-sm font-bold text-white hover:bg-orange-600 transition shadow-xs disabled:opacity-50"
                  >
                    {createMutation.isPending ? <FaSpinner className="animate-spin" /> : <FaPlus />}
                    <span>Assign Homework</span>
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

      {/* REVIEW & GRADE SUBMISSIONS MODAL */}
      {reviewModalHomeworkId && (
        <ReviewSubmissionsModal
          homeworkId={reviewModalHomeworkId}
          onClose={() => setReviewModalHomeworkId(null)}
        />
      )}
    </div>
  );
}

// Subcomponent: Review & Grade Submissions Modal
function ReviewSubmissionsModal({ homeworkId, onClose }) {
  const { data, isLoading } = useHomeworkDetails(homeworkId);
  const homework = data?.homework;
  const submissions = data?.submissions || [];
  const students = data?.students || [];

  const [activeSubId, setActiveSubId] = useState(null);
  const [pointsAwarded, setPointsAwarded] = useState("");
  const [letterGrade, setLetterGrade] = useState("A");
  const [feedback, setFeedback] = useState("");

  const gradeMutation = useGradeSubmissionMutation(homeworkId);

  const startGrading = (sub) => {
    setActiveSubId(sub._id);
    setPointsAwarded(sub.pointsAwarded !== null && sub.pointsAwarded !== undefined ? sub.pointsAwarded : homework?.totalPoints || 100);
    setLetterGrade(sub.grade || "A");
    setFeedback(sub.feedback || "");
  };

  const handleGradeSubmit = async (e) => {
    e.preventDefault();
    if (!activeSubId) return;

    try {
      await gradeMutation.mutateAsync({
        submissionId: activeSubId,
        pointsAwarded: Number(pointsAwarded),
        grade: letterGrade,
        feedback,
      });
      setActiveSubId(null);
    } catch (err) {
      // Handled by onError in mutation
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-4xl rounded-3xl bg-white p-4 sm:p-6 shadow-2xl my-6 flex flex-col max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div>
            <h3 className="font-extrabold text-base sm:text-lg text-slate-900">
              Submissions: {homework?.title || "Homework"}
            </h3>
            <p className="text-xs text-slate-500">
              Batch: <span className="font-bold text-[#D6451B]">{homework?.batchId?.name}</span> • Max Points: {homework?.totalPoints} • Due: {formatDate(homework?.dueDate)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <FaTimes />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 flex-1 overflow-y-auto pr-1">
          {isLoading ? (
            <div className="p-8 text-center text-slate-500">
              <FaSpinner className="animate-spin inline mr-2 text-[#D6451B]" />
              <span>Loading student submissions...</span>
            </div>
          ) : submissions.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <FaClipboardList className="text-4xl text-slate-300 mx-auto mb-2" />
              <p className="font-bold text-slate-700 text-sm">No Student Submissions Yet</p>
              <p className="text-xs text-slate-400 mt-1">Students in this cohort have not turned in their work yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub) => {
                const isEditing = activeSubId === sub._id;
                const isLate = sub.status === "late";
                const isGraded = sub.status === "graded";

                return (
                  <div
                    key={sub._id}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 font-extrabold text-xs text-[#D6451B] border border-orange-200">
                          {sub.studentId?.fullName?.charAt(0) || "S"}
                        </div>
                        <div>
                          <p className="font-bold text-sm text-slate-900">{sub.studentId?.fullName || "Student"}</p>
                          <p className="text-xs text-slate-400">
                            Submitted: {formatDate(sub.submittedAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isLate && (
                          <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-extrabold text-rose-800">
                            LATE SUBMISSION
                          </span>
                        )}
                        {isGraded ? (
                          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-800">
                            GRADED: {sub.pointsAwarded}/{homework?.totalPoints} ({sub.grade})
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-extrabold text-amber-800">
                            PENDING REVIEW
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Submission Text Content */}
                    {sub.content && (
                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap font-medium">
                        {sub.content}
                      </div>
                    )}

                    {/* Attachment links */}
                    {sub.attachments && sub.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {sub.attachments.map((att, i) => (
                          <a
                            key={i}
                            href={att.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-slate-200 px-2.5 py-1 text-xs font-semibold text-[#D6451B] hover:bg-orange-50"
                          >
                            <FaPaperclip className="text-[10px]" />
                            <span>{att.title || "Uploaded Attachment"}</span>
                            <FaExternalLinkAlt className="text-[9px]" />
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Feedback summary if already graded */}
                    {isGraded && !isEditing && sub.feedback && (
                      <div className="text-xs font-medium text-slate-600 bg-emerald-50/50 p-2.5 rounded-xl border border-emerald-100">
                        <span className="font-bold text-emerald-800">Teacher Feedback: </span>
                        {sub.feedback}
                      </div>
                    )}

                    {/* Grade action button / form */}
                    {isEditing ? (
                      <form onSubmit={handleGradeSubmit} className="pt-2 border-t border-slate-200 space-y-3">
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div>
                            <label className="block font-bold text-slate-700 text-[11px] mb-1">
                              Points Awarded (Max {homework?.totalPoints || 100})
                            </label>
                            <input
                              type="number"
                              required
                              min={0}
                              max={homework?.totalPoints || 100}
                              value={pointsAwarded}
                              onChange={(e) => setPointsAwarded(e.target.value)}
                              className="w-full rounded-xl border border-slate-300 bg-white p-2 text-xs font-bold text-slate-800 outline-none focus:border-[#D6451B]"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 text-[11px] mb-1">
                              Letter Grade
                            </label>
                            <select
                              value={letterGrade}
                              onChange={(e) => setLetterGrade(e.target.value)}
                              className="w-full rounded-xl border border-slate-300 bg-white p-2 text-xs font-bold text-slate-800 outline-none focus:border-[#D6451B]"
                            >
                              <option value="A+">A+ (Outstanding)</option>
                              <option value="A">A (Excellent)</option>
                              <option value="B+">B+ (Very Good)</option>
                              <option value="B">B (Good)</option>
                              <option value="C">C (Satisfactory)</option>
                              <option value="D">D (Needs Improvement)</option>
                              <option value="F">F (Incomplete / Fail)</option>
                            </select>
                          </div>

                          <div className="sm:col-span-1">
                            <label className="block font-bold text-slate-700 text-[11px] mb-1">
                              Teacher Feedback Remarks
                            </label>
                            <input
                              type="text"
                              placeholder="Well solved, correct steps..."
                              value={feedback}
                              onChange={(e) => setFeedback(e.target.value)}
                              className="w-full rounded-xl border border-slate-300 bg-white p-2 text-xs font-medium text-slate-800 outline-none focus:border-[#D6451B]"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-2 justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => setActiveSubId(null)}
                            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={gradeMutation.isPending}
                            className="flex items-center gap-1.5 rounded-xl bg-[#D6451B] px-4 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-orange-600 disabled:opacity-50"
                          >
                            {gradeMutation.isPending ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />}
                            <span>Save Grade</span>
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="pt-1 flex justify-end">
                        <button
                          onClick={() => startGrading(sub)}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D6451B] hover:underline"
                        >
                          <span>{isGraded ? "Edit Grade & Feedback" : "Grade This Submission →"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between shrink-0">
          <p className="text-xs text-slate-500 font-medium">
            {submissions.length} of {students.length} students have submitted
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
