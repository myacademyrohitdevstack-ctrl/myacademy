"use client";

import { useState, useEffect } from "react";
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
  FaChild,
} from "react-icons/fa";
import { useMyChildren } from "@/Hooks/useParent";
import { useChildExamResults } from "@/Hooks/useExams";
import ChildSwitcher from "../components/ChildSwitcher";
import formatDate from "@/Utils/formatDate";
import { StatCard, ChartCard, ComparisonBarChart } from "@/app/Components/visual-ui";

export default function ParentExamsClient() {
  const { data: childrenList = [], isLoading: isChildrenLoading } = useMyChildren();
  const [selectedChildId, setSelectedChildId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const defaultChildId = childrenList[0]?.user?._id || childrenList[0]?._id || "";
  const effectiveChildId = selectedChildId || defaultChildId;

  const selectedChildObj = childrenList.find(
    (c) => (c.user?._id || c._id) === effectiveChildId
  );
  const childName = selectedChildObj?.user?.fullName || "Child";

  const { data: examData, isLoading: isExamLoading } = useChildExamResults(effectiveChildId);

  const summary = examData?.summary || { totalExams: 0, passedExams: 0, avgPercentage: 0 };
  const results = examData?.results || [];

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
              <FaChild className="text-amber-300" />
              <span>Parent Academic Oversight</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {childName}&apos;s Exam Results & Scorecards
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-orange-100 max-w-xl">
              Monitor test scores, subject proficiencies, and teacher feedback for your enrolled child.
            </p>
          </div>
        </div>

        <div className="absolute -right-8 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Child Switcher (if parent has multiple children) */}
      <ChildSwitcher
        childrenList={childrenList}
        selectedChildId={effectiveChildId}
        onSelect={(id) => setSelectedChildId(id)}
      />

      {isChildrenLoading ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
          <FaSpinner className="text-3xl text-[#D6451B] animate-spin" />
          <p className="mt-3 text-xs font-bold text-slate-500">Loading student profiles...</p>
        </div>
      ) : childrenList.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B] mb-3">
            <FaUserGraduate className="text-2xl" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900">No Enrolled Children Found</h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm">
            You do not currently have any student profiles linked to your parent account. Contact your academy administrator for assistance.
          </p>
        </div>
      ) : (
        <>
          {/* Performance Overview (StatCards) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <StatCard
              title="Exams Completed"
              value={summary.totalExams || 0}
              icon={FaFileAlt}
              color="blue"
              subText="Term assessments"
              loading={isExamLoading}
            />

            <StatCard
              title="Passed Tests"
              value={summary.passedExams || 0}
              icon={FaCheckCircle}
              color="emerald"
              trend={summary.totalExams > 0 ? `${Math.round(((summary.passedExams || 0) / summary.totalExams) * 100)}%` : "0%"}
              trendDirection="up"
              subText="Met passing standard"
              loading={isExamLoading}
            />

            <StatCard
              title="Average Score"
              value={summary.avgPercentage || 0}
              suffix="%"
              icon={FaAward}
              color="orange"
              trend={(summary.avgPercentage || 0) >= 75 ? "Distinction" : "Passing"}
              trendDirection={(summary.avgPercentage || 0) >= 75 ? "up" : "neutral"}
              subText="Cumulative average"
              loading={isExamLoading}
            />

            <StatCard
              title="Clearance Ratio"
              value={summary.totalExams > 0 ? Math.round(((summary.passedExams || 0) / summary.totalExams) * 100) : 100}
              suffix="%"
              icon={FaUserGraduate}
              color="purple"
              subText="Subject success rate"
              loading={isExamLoading}
            />
          </div>

          {/* Child Subject Performance Comparison Chart */}
          {results.length > 0 && (
            <ChartCard
              title={`${childName}'s Subject Scores vs Maximum Marks`}
              subtitle="Side-by-side assessment comparison"
              icon={FaAward}
            >
              <ComparisonBarChart
                data={results.slice(0, 8).map((r) => {
                  const title = r.examId?.title || "Exam";
                  const short = title.length > 12 ? `${title.slice(0, 11)}…` : title;
                  return {
                    label: short,
                    Scored: r.marksObtained || 0,
                    Total: r.examId?.totalMarks || 100,
                  };
                })}
                xAxisKey="label"
                bars={[
                  { key: "Scored", name: "Marks Scored", color: "#10B981" },
                  { key: "Total", name: "Total Marks", color: "#E2E8F0" },
                ]}
                height={230}
                showLegend={true}
              />
            </ChartCard>
          )}

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
                { id: "all", label: "All Records" },
                { id: "passed", label: "Passed" },
                { id: "failed", label: "Needs Help" },
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

          {/* Results List */}
          {isExamLoading ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200">
              <FaSpinner className="text-3xl text-[#D6451B] animate-spin" />
              <p className="mt-3 text-xs font-bold text-slate-500">Fetching scorecards...</p>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border border-slate-200 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B] mb-3">
                <FaAward className="text-2xl" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900">No Exam Records Available</h3>
              <p className="mt-1 text-xs text-slate-500 max-w-sm">
                {searchTerm || filterStatus !== "all"
                  ? "No exams match your search or filter criteria."
                  : `No examination results have been published for ${childName} yet.`}
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
                          {exam.subject || "General"}
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
                            Below Cutoff
                          </span>
                        )}
                      </div>

                      <h3 className="mt-3 font-extrabold text-base text-slate-900">
                        {exam.title || "Assessment"}
                      </h3>

                      <p className="text-xs text-slate-500 font-semibold mt-0.5">
                        Batch: {exam.batchId?.name || "Cohort"}
                      </p>

                      {/* Marks Container */}
                      <div className="mt-4 rounded-2xl bg-linear-to-br from-slate-50 to-orange-50/50 p-4 border border-slate-100 flex items-center justify-between">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Score Achieved
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

                      {/* Teacher Remarks */}
                      {res.remarks && (
                        <div className="mt-3 rounded-xl bg-slate-50 p-3 border border-slate-100 text-xs">
                          <div className="flex items-center gap-1.5 text-slate-700 font-bold mb-1">
                            <FaComments className="text-[#D6451B]" />
                            <span>Teacher Feedback to Parents:</span>
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
                        <span>Date: {formatDate(exam.examDate)}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <FaClock className="text-slate-400" />
                        <span>Passing Threshold: {exam.passingMarks}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}
