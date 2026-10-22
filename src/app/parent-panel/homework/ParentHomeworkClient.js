"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaSearch,
  FaCalendarAlt,
  FaAward,
  FaPaperclip,
  FaExternalLinkAlt,
  FaSpinner,
  FaComments,
  FaChild,
  FaUserGraduate,
} from "react-icons/fa";
import { useMyChildren } from "@/Hooks/useParent";
import { useChildHomework } from "@/Hooks/useHomework";
import ChildSwitcher from "../components/ChildSwitcher";
import formatDate from "@/Utils/formatDate";

export default function ParentHomeworkClient() {
  const { data: childrenList = [], isLoading: isChildrenLoading } = useMyChildren();
  const [selectedChildId, setSelectedChildId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusTab, setStatusTab] = useState("all");

  const defaultChildId = childrenList[0]?.user?._id || childrenList[0]?._id || "";
  const effectiveChildId = selectedChildId || defaultChildId;

  const selectedChildObj = childrenList.find(
    (c) => (c.user?._id || c._id) === effectiveChildId
  );
  const childName = selectedChildObj?.user?.fullName || "Child";

  const { data: homeworkData, isLoading: isHwLoading } = useChildHomework(effectiveChildId);

  const summary = homeworkData?.summary || { totalAssigned: 0, completed: 0, pending: 0, overdue: 0 };
  const homeworkList = homeworkData?.homework || [];

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
              <FaChild className="text-amber-300" />
              <span>Parent Coursework Tracking</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              {childName}&apos;s Homework & Assignments
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-orange-100 max-w-xl">
              Keep track of pending assignments, submission timeliness, overdue warnings, and teacher evaluations.
            </p>
          </div>
        </div>

        <div className="absolute -right-8 -bottom-10 h-48 w-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
      </div>

      {/* Child Switcher */}
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
            You do not currently have any student profiles linked to your parent account.
          </p>
        </div>
      ) : (
        <>
          {/* Metric Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Total Given</p>
              <p className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{summary.totalAssigned}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Turned In</p>
              <p className="text-xl sm:text-2xl font-black text-emerald-600 mt-1">{summary.completed}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-600">Pending</p>
              <p className="text-xl sm:text-2xl font-black text-amber-600 mt-1">{summary.pending}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
              <p className="text-[11px] font-bold uppercase tracking-wider text-rose-600">Overdue Alert</p>
              <p className="text-xl sm:text-2xl font-black text-rose-600 mt-1">{summary.overdue}</p>
            </div>
          </div>

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
                { id: "all", label: "All Assignments" },
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

          {/* List of Tasks */}
          {isHwLoading ? (
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
                  ? "No tasks match your selected filter or search query."
                  : `${childName} has no homework tasks assigned right now.`}
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
                            Turned In
                          </span>
                        ) : isOverdue ? (
                          <span className="flex items-center gap-1 rounded-full bg-rose-50 border border-rose-200 px-2.5 py-0.5 text-[10px] font-bold text-rose-700">
                            <FaExclamationTriangle className="text-[10px]" />
                            Overdue
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold text-amber-700">
                            <FaClock className="text-[10px]" />
                            Pending Submission
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

                      {/* Attached Resource link */}
                      {hw.attachments && hw.attachments.length > 0 && (
                        <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#D6451B] font-bold">
                          <FaPaperclip className="text-xs" />
                          <a
                            href={hw.attachments[0].fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline flex items-center gap-1"
                          >
                            <span>{hw.attachments[0].title || "Assignment Resource"}</span>
                            <FaExternalLinkAlt className="text-[10px]" />
                          </a>
                        </div>
                      )}

                      {/* Child submission details */}
                      {sub && (
                        <div className="mt-3 rounded-xl bg-orange-50/50 p-3 border border-orange-100 text-xs space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-700 text-[11px]">
                              Submitted by {childName}:
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {formatDate(sub.submittedAt || sub.createdAt)}
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
                              <span>{sub.attachments[0].title || "Child Attached Solution"}</span>
                            </a>
                          )}

                          {/* Teacher Feedback to Parent */}
                          {sub.feedback && (
                            <div className="mt-2 pt-2 border-t border-orange-200/60">
                              <p className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                                <FaComments className="text-[#D6451B]" />
                                <span>Teacher Evaluation:</span>
                              </p>
                              <p className="text-slate-700 italic mt-0.5 bg-white/70 p-2 rounded-lg border border-orange-100">
                                &quot;{sub.feedback}&quot;
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                        <FaCalendarAlt className="text-slate-400" />
                        <span>Due: {formatDate(hw.dueDate)}</span>
                      </div>

                      {isGraded ? (
                        <span className="text-[11px] font-black text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-lg">
                          Grade: {sub.pointsAwarded}/{hw.totalPoints} ({sub.grade || "A"})
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-500">
                          Max: {hw.totalPoints} Pts
                        </span>
                      )}
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
