"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaTimes,
  FaExclamationTriangle,
  FaSearch,
  FaCalendarAlt,
  FaAward,
  FaPaperclip,
  FaExternalLinkAlt,
  FaEdit,
  FaSpinner,
  FaComments,
} from "react-icons/fa";
import { useStudentHomework } from "@/Hooks/useHomework";
import { useSubmitHomeworkMutation } from "@/app/mutations/homeworkMutations";
import { toast } from "sonner";
import formatDate from "@/Utils/formatDate";
import { StatCard, ProgressBar } from "@/app/Components/visual-ui";

export default function StudentHomework({ user }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusTab, setStatusTab] = useState("all"); // 'all', 'pending', 'submitted', 'graded', 'overdue'

  const { data, isLoading } = useStudentHomework();

  const summary = data?.summary || { totalAssigned: 0, completed: 0, pending: 0, overdue: 0 };
  const homeworkList = data?.homework || [];

  const [submitModalHomework, setSubmitModalHomework] = useState(null);

  const filteredHomework = homeworkList.filter((hw) => {
    const title = hw.title || "";
    const subject = hw.subject || "";
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (statusTab === "pending") return hw.submissionStatus === "pending";
    if (statusTab === "submitted") return hw.submissionStatus === "submitted" || hw.submissionStatus === "late";
    if (statusTab === "graded") return hw.submissionStatus === "graded";
    if (statusTab === "overdue") return hw.submissionStatus === "overdue";
    return true;
  });

  return (
    <div className="w-full space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-orange-600 via-[#D6451B] to-amber-600 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md mb-2">
              <FaClipboardList className="text-amber-300" />
              <span>Course Assignments</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              My Homework & Exercises
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-orange-100 max-w-xl">
              Turn in assignments, verify teacher grades, and read personalized corrective guidance.
            </p>
          </div>
        </div>

        <div className="absolute -right-8 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          label="Total Assigned"
          value={summary.totalAssigned || 0}
          icon={FaClipboardList}
          colorScheme="orange"
          subtitle="Coursework items"
        />
        <StatCard
          label="Turned In"
          value={summary.completed || 0}
          icon={FaCheckCircle}
          colorScheme="emerald"
          subtitle="Completed exercises"
        />
        <StatCard
          label="Pending Submission"
          value={summary.pending || 0}
          icon={FaClock}
          colorScheme="amber"
          subtitle="Awaiting submission"
        />
        <StatCard
          label="Past Deadline"
          value={summary.overdue || 0}
          icon={FaExclamationTriangle}
          colorScheme="rose"
          subtitle="Action needed"
        />
      </div>

      {/* Coursework Completion Progress Bar */}
      {summary.totalAssigned > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          <ProgressBar
            value={summary.completed || 0}
            max={summary.totalAssigned || 1}
            label="Coursework Completion Rate"
            color="emerald"
            showPercentage={true}
            targetBenchmark={80}
            targetLabel="Target: 80% on-time"
          />
        </div>
      )}

      {/* Filter and Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search assignment or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D6451B]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { id: "all", label: "All Tasks" },
            { id: "pending", label: "Pending" },
            { id: "submitted", label: "Turned In" },
            { id: "graded", label: "Graded" },
            { id: "overdue", label: "Overdue" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusTab(tab.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                statusTab === tab.id
                  ? "bg-[#D6451B] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Homework List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
          <FaSpinner className="text-3xl text-[#D6451B] animate-spin" />
          <p className="mt-3 text-xs font-bold text-slate-500">Loading assignments...</p>
        </div>
      ) : filteredHomework.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B] mb-3">
            <FaClipboardList className="text-2xl" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">No Assignments Found</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm">
            {searchTerm || statusTab !== "all"
              ? "No assignments match your filter or search query."
              : "You have no homework tasks assigned right now. Great job!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredHomework.map((hw) => {
            const sub = hw.submission;
            const isGraded = hw.submissionStatus === "graded";
            const isOverdue = hw.submissionStatus === "overdue";
            const isSubmitted = sub && !isGraded;

            return (
              <motion.div
                key={hw._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-lg bg-orange-100 px-2 py-0.5 text-[11px] font-black text-[#D6451B] uppercase tracking-wider">
                      {hw.subject || "General"}
                    </span>

                    {isGraded ? (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                        <FaCheckCircle className="text-[10px]" />
                        Graded: {sub.pointsAwarded}/{hw.totalPoints} Pts
                      </span>
                    ) : isSubmitted ? (
                      <span className="flex items-center gap-1 rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[10px] font-bold text-blue-700">
                        <FaCheckCircle className="text-[10px]" />
                        Submitted
                      </span>
                    ) : isOverdue ? (
                      <span className="flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[10px] font-bold text-rose-700">
                        <FaExclamationTriangle className="text-[10px]" />
                        Past Due
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
                        <FaClock className="text-[10px]" />
                        Pending
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-extrabold text-base text-slate-900">
                    {hw.title}
                  </h3>

                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Batch: {hw.batchId?.name || "Cohort"}
                  </p>

                  {hw.description && (
                    <p className="mt-2 text-xs text-slate-600 line-clamp-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {hw.description}
                    </p>
                  )}

                  {/* Teacher Resource Reference */}
                  {hw.attachments && hw.attachments.length > 0 && (
                    <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#D6451B] font-bold">
                      <FaPaperclip className="text-xs" />
                      <a
                        href={hw.attachments[0].fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1"
                      >
                        <span>{hw.attachments[0].title || "Download / View Assignment Brief"}</span>
                        <FaExternalLinkAlt className="text-[10px]" />
                      </a>
                    </div>
                  )}

                  {/* Submission Card info */}
                  {sub && (
                    <div className="mt-3 rounded-xl bg-orange-50/50 p-3 border border-orange-100 text-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700 text-[11px]">Your Work:</span>
                        <span className="text-[10px] text-slate-400">
                          Turned in on {formatDate(sub.submittedAt || sub.createdAt)}
                        </span>
                      </div>
                      {sub.content && (
                        <p className="text-slate-800 line-clamp-2 bg-white p-2 rounded-lg border border-slate-200">
                          {sub.content}
                        </p>
                      )}
                      {sub.attachments && sub.attachments.length > 0 && (
                        <a
                          href={sub.attachments[0].fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#D6451B] font-bold hover:underline"
                        >
                          <FaPaperclip />
                          <span>{sub.attachments[0].title || "Submitted Attachment"}</span>
                        </a>
                      )}

                      {/* Graded remarks */}
                      {sub.feedback && (
                        <div className="mt-2 pt-2 border-t border-orange-200/60">
                          <p className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                            <FaComments className="text-[#D6451B]" />
                            <span>Teacher Feedback:</span>
                          </p>
                          <p className="text-slate-700 italic mt-0.5 bg-white/70 p-2 rounded-lg border border-orange-100">
                            &quot;{sub.feedback}&quot;
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                    <FaCalendarAlt className="text-slate-400" />
                    <span>Due: {formatDate(hw.dueDate)}</span>
                  </div>

                  {!isGraded ? (
                    <button
                      onClick={() => setSubmitModalHomework(hw)}
                      className="flex items-center gap-1.5 rounded-xl bg-[#D6451B] px-3.5 py-1.5 font-bold text-white shadow-xs hover:bg-orange-700 transition"
                    >
                      <FaEdit className="text-xs" />
                      <span>{sub ? "Update Submission" : "Turn In Solution"}</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-lg">
                      Final Score: {sub.pointsAwarded}/{hw.totalPoints} ({sub.grade || "Graded"})
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* STUDENT SUBMISSION MODAL */}
      <AnimatePresence>
        {submitModalHomework && (
          <StudentSubmissionModal
            homework={submitModalHomework}
            onClose={() => setSubmitModalHomework(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function StudentSubmissionModal({ homework, onClose }) {
  const existingSub = homework.submission;
  const [content, setContent] = useState(existingSub?.content || "");
  const [fileUrl, setFileUrl] = useState(
    existingSub?.attachments && existingSub.attachments.length > 0
      ? existingSub.attachments[0].fileUrl
      : ""
  );
  const [fileTitle, setFileTitle] = useState(
    existingSub?.attachments && existingSub.attachments.length > 0
      ? existingSub.attachments[0].title
      : ""
  );

  const submitMutation = useSubmitHomeworkMutation(homework._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim() && !fileUrl.trim()) {
      toast.error("Please enter your answer text or provide an attachment link");
      return;
    }

    try {
      const attachments = [];
      if (fileUrl.trim()) {
        attachments.push({
          title: fileTitle.trim() || "Student Solution Attachment",
          fileUrl: fileUrl.trim(),
        });
      }

      await submitMutation.mutateAsync({
        homeworkId: homework._id,
        content: content.trim(),
        attachments,
      });

      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to submit homework");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
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
              <h3 className="font-extrabold text-base text-slate-900">
                {existingSub ? "Update Your Solution" : "Submit Homework Solution"}
              </h3>
              <p className="text-[11px] text-[#D6451B] font-bold">
                {homework.title} (Max: {homework.totalPoints} Pts)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          >
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
              Your Written Answer / Solution Notes
            </label>
            <textarea
              rows={5}
              placeholder="Type your answers, explanation, equations, or summary here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm bg-slate-50 outline-none focus:border-[#D6451B] focus:bg-white"
            />
          </div>

          <div className="rounded-2xl bg-slate-50 p-3.5 border border-slate-200 space-y-2">
            <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px]">
              Optional Attachment / Project Link
            </label>
            <input
              type="url"
              placeholder="e.g. Google Drive link, GitHub repository, Figma link, PDF url"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2 text-xs bg-white outline-none focus:border-[#D6451B]"
            />
            <input
              type="text"
              placeholder="Attachment Label (e.g. Solution PDF / Code Repo)"
              value={fileTitle}
              onChange={(e) => setFileTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-2 text-xs bg-white outline-none focus:border-[#D6451B]"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="flex items-center gap-2 rounded-xl bg-[#D6451B] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-orange-700 disabled:opacity-50"
            >
              {submitMutation.isPending ? (
                <>
                  <FaSpinner className="animate-spin text-xs" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <FaCheckCircle className="text-xs" />
                  <span>Turn In Assignment</span>
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
