"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaAward,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaSpinner,
  FaUserGraduate,
  FaFileAlt,
  FaComments,
} from "react-icons/fa";
import { useStudentExamResults } from "@/Hooks/useExams";
import formatDate from "@/Utils/formatDate";

export default function StudentExams({ user }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'passed', 'failed', 'absent'

  const { data, isLoading } = useStudentExamResults();

  const summary = data?.summary || { totalExams: 0, passedExams: 0, avgPercentage: 0 };
  const results = data?.results || [];

  const filteredResults = results.filter((res) => {
    const exam = res.examId || {};
    const title = exam.title || "";
    const subject = exam.subject || "";
    const matchesSearch =
      title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === "passed") return res.isPassed && !res.isAbsent;
    if (filterStatus === "failed") return !res.isPassed && !res.isAbsent;
    if (filterStatus === "absent") return res.isAbsent;
    return true;
  });

  return (
    <div className="w-full space-y-6">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-orange-600 via-[#D6451B] to-amber-600 p-6 sm:p-8 text-white shadow-xl">
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-md mb-2">
              <FaAward className="text-amber-300" />
              <span>Academic Performance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              My Exam Results & Report Cards
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-orange-100 max-w-xl">
              Track your test scores, grades, teacher feedback, and subject performance across enrolled batches.
            </p>
          </div>
        </div>

        <div className="absolute -right-8 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100 text-[#D6451B] font-black text-lg">
            <FaFileAlt />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Exams Completed</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900">{summary.totalExams}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 font-black text-lg">
            <FaCheckCircle />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Passed Assessments</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900">{summary.passedExams}</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600 font-black text-lg">
            <FaAward />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall Average</p>
            <p className="text-xl sm:text-2xl font-black text-slate-900">{summary.avgPercentage}%</p>
          </div>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search exam or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-[#D6451B]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {[
            { id: "all", label: "All Results" },
            { id: "passed", label: "Passed" },
            { id: "failed", label: "Needs Improvement" },
            { id: "absent", label: "Absent" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition ${
                filterStatus === tab.id
                  ? "bg-[#D6451B] text-white shadow-xs"
                  : "bg-slate-50 text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Exam Results List */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
          <FaSpinner className="text-3xl text-[#D6451B] animate-spin" />
          <p className="mt-3 text-xs font-bold text-slate-500">Loading your exam records...</p>
        </div>
      ) : filteredResults.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B] mb-3">
            <FaAward className="text-2xl" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">No Exam Results Found</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm">
            {searchTerm || filterStatus !== "all"
              ? "No exam records match your search or filter criteria."
              : "No examination grades have been published for you yet."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {filteredResults.map((res) => {
            const exam = res.examId || {};
            const isAbsent = res.isAbsent;
            const isPassed = res.isPassed;

            return (
              <motion.div
                key={res._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <span className="rounded-lg bg-orange-100 px-2 py-0.5 text-[11px] font-black text-[#D6451B] uppercase tracking-wider">
                      {exam.subject || "General Assessment"}
                    </span>

                    {isAbsent ? (
                      <span className="flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[10px] font-bold text-rose-700">
                        <FaTimesCircle className="text-[10px]" />
                        Absent
                      </span>
                    ) : isPassed ? (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                        <FaCheckCircle className="text-[10px]" />
                        Passed
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
                        <FaTimesCircle className="text-[10px]" />
                        Below Passing Mark
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 font-extrabold text-base text-slate-900">
                    {exam.title || "Examination"}
                  </h3>

                  <p className="text-xs text-slate-500 font-semibold mt-0.5">
                    Batch: {exam.batchId?.name || "Enrolled Cohort"}
                  </p>

                  {/* Score Highlight Box */}
                  <div className="mt-4 rounded-2xl bg-linear-to-br from-slate-50 to-orange-50/50 p-4 border border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Marks Secured
                      </p>
                      <p className="text-2xl font-black text-slate-900 mt-0.5">
                        {isAbsent ? (
                          <span className="text-rose-600 text-lg">ABSENT</span>
                        ) : (
                          <>
                            {res.marksObtained}
                            <span className="text-sm font-bold text-slate-400">
                              {" "}
                              / {exam.totalMarks || 100}
                            </span>
                          </>
                        )}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Grade
                      </p>
                      <span
                        className={`inline-block mt-0.5 rounded-xl px-3 py-1 text-sm font-black ${
                          isAbsent
                            ? "bg-rose-100 text-rose-700"
                            : isPassed
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {isAbsent ? "ABS" : res.grade || `${res.percentage}%`}
                      </span>
                    </div>
                  </div>

                  {/* Remarks */}
                  {res.remarks && (
                    <div className="mt-3 rounded-xl bg-slate-50 p-3 border border-slate-100 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-1">
                        <FaComments className="text-[#D6451B]" />
                        <span>Teacher Remarks:</span>
                      </div>
                      <p className="text-slate-600 italic">
                        &quot;{res.remarks}&quot;
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-slate-400" />
                    <span>Exam Date: {formatDate(exam.examDate)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaClock className="text-slate-400" />
                    <span>Passing Cutoff: {exam.passingMarks}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
