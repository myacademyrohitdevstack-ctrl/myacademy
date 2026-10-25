"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaFilter,
  FaSpinner,
  FaExclamationTriangle,
  FaUserGraduate,
  FaCalendarAlt,
} from "react-icons/fa";
import { useMyChildren, useChildAttendance } from "@/Hooks/useParent";
import ChildSwitcher from "../components/ChildSwitcher";
import { StatCard, ProgressBar, AttendanceHeatmap } from "@/app/Components/visual-ui";

export default function ParentAttendanceClient() {
  const { data: childrenList, isLoading: isChildrenLoading } = useMyChildren();
  const [selectedChildId, setSelectedChildId] = useState("");
  const activeChildId =
    selectedChildId ||
    childrenList?.[0]?.user?._id ||
    childrenList?.[0]?._id ||
    "";

  const [dateFilter, setDateFilter] = useState({
    from: "",
    to: "",
  });
  const [statusTab, setStatusTab] = useState("all"); // 'all', 'present', 'absent'

  const { data: attendanceData, isLoading: isAttendanceLoading } =
    useChildAttendance(activeChildId, {
      from: dateFilter.from || undefined,
      to: dateFilter.to || undefined,
    });

  const selectedChildObj = childrenList?.find(
    (c) => (c.user?._id || c._id) === activeChildId
  );

  const rawList = attendanceData?.attendance || [];
  const summary = attendanceData?.summary || {};

  const filteredList = rawList.filter((r) => {
    if (statusTab === "present") return r.status === "present";
    if (statusTab === "absent") return r.status === "absent";
    return true;
  });

  const percentage = summary.percentage !== null && summary.percentage !== undefined
    ? summary.percentage
    : null;

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* Child Switcher */}
      <ChildSwitcher
        childrenList={childrenList}
        selectedChildId={activeChildId}
        onSelect={(id) => setSelectedChildId(id)}
      />

      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between min-w-0">
          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Classroom Attendance Register
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl truncate">
              {selectedChildObj?.user?.fullName || "Child"} Attendance Log
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm text-orange-100 max-w-2xl font-normal">
              Official day-by-day attendance marked by academy faculty across all assigned classroom cohorts.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md shrink-0 lg:w-72">
            <div className="flex items-center justify-between">
              <p className="text-xs text-orange-100 font-semibold uppercase tracking-wider">
                Overall Rate
              </p>
              <FaCalendarCheck className="text-white/80" />
            </div>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold">
              {percentage !== null ? `${percentage}%` : "--%"}
            </h2>
            <p className="mt-1 text-xs text-orange-100">
              {summary.present || 0} Present / {(summary.present || 0) + (summary.absent || 0)} Classes
            </p>
          </div>
        </div>
      </motion.section>

      {/* Attendance Warning if below 75% */}
      {percentage !== null && percentage < 75 && (
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-900 text-xs sm:text-sm">
          <FaExclamationTriangle className="text-amber-600 text-lg shrink-0" />
          <div>
            <p className="font-bold">Attention Required: Attendance Below 75%</p>
            <p className="text-xs text-amber-700 mt-0.5">
              The student&apos;s current attendance rate is {percentage}%. Consistent class participation is essential for academic continuity and certification requirements.
            </p>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
        <StatCard
          label="Total Recorded"
          value={rawList.length}
          icon={FaCalendarAlt}
          colorScheme="slate"
          subtitle="Session marks"
        />
        <StatCard
          label="Classes Present"
          value={summary.present || 0}
          icon={FaCheckCircle}
          colorScheme="emerald"
          subtitle="Attended sessions"
        />
        <StatCard
          label="Classes Absent"
          value={summary.absent || 0}
          icon={FaTimesCircle}
          colorScheme="rose"
          subtitle="Missed sessions"
        />
        <StatCard
          label="Attendance Rate"
          value={percentage !== null ? `${percentage}%` : "N/A"}
          icon={FaCalendarCheck}
          colorScheme={percentage !== null && percentage < 75 ? "rose" : "emerald"}
          subtitle="Realization rate"
        />
      </div>

      {/* Target Benchmark Progress Bar */}
      {rawList.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs">
          <ProgressBar
            value={summary.present || 0}
            max={(summary.present || 0) + (summary.absent || 0) || 1}
            label="Attendance Regularity Score"
            color={percentage !== null && percentage < 75 ? "rose" : "emerald"}
            showPercentage={true}
            targetBenchmark={75}
            targetLabel="Minimum Required: 75%"
          />
        </div>
      )}

      {/* Regularity Heatmap Calendar Grid */}
      <div className="w-full">
        <AttendanceHeatmap
          records={rawList}
          daysCount={45}
          title="Attendance Activity (Last 45 Days)"
          subtitle="Green indicates verified classroom presence"
        />
      </div>

      {/* Date Filters & Tabs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100">
          {["all", "present", "absent"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusTab(tab)}
              className={`rounded-lg px-3.5 py-1.5 text-xs font-bold capitalize transition-all ${
                statusTab === tab
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab === "all" ? `All (${rawList.length})` : tab}
            </button>
          ))}
        </div>

        {/* Date Range Inputs */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-semibold">From:</span>
            <input
              type="date"
              value={dateFilter.from}
              onChange={(e) =>
                setDateFilter((prev) => ({ ...prev, from: e.target.value }))
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-[#D6451B]"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-semibold">To:</span>
            <input
              type="date"
              value={dateFilter.to}
              onChange={(e) =>
                setDateFilter((prev) => ({ ...prev, to: e.target.value }))
              }
              className="rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 outline-none focus:border-[#D6451B]"
            />
          </div>

          {(dateFilter.from || dateFilter.to) && (
            <button
              onClick={() => setDateFilter({ from: "", to: "" })}
              className="rounded-xl border border-slate-200 px-2.5 py-1.5 font-bold text-slate-500 hover:bg-slate-50"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Attendance Register List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {isAttendanceLoading ? (
          <div className="p-12 text-center text-slate-500">
            <FaSpinner className="animate-spin inline mr-2 text-[#D6451B] text-lg" />
            <span>Fetching attendance logs...</span>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-2xl text-emerald-600 mb-2">
              <FaCalendarCheck />
            </div>
            <h3 className="text-sm font-bold text-slate-800">In Good Standing • Zero Absences Recorded</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              No missed sessions recorded under this view. The student remains in full academic compliance.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredList.map((item, idx) => {
              const isPresent = item.status === "present";
              const isAbsent = item.status === "absent";
              const dateObj = item.date ? new Date(item.date) : null;

              return (
                <div
                  key={idx}
                  className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${
                        isPresent
                          ? "bg-emerald-100 text-emerald-700"
                          : isAbsent
                          ? "bg-rose-100 text-rose-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {isPresent ? (
                        <FaCheckCircle className="text-base" />
                      ) : isAbsent ? (
                        <FaTimesCircle className="text-base" />
                      ) : (
                        <FaCalendarAlt className="text-base" />
                      )}
                    </div>

                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                        {dateObj
                          ? dateObj.toLocaleDateString("en-IN", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Class Date"}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        Class Session ID: #{idx + 1}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`self-start sm:self-auto rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${
                      isPresent
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : isAbsent
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.status || "Unmarked"}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
