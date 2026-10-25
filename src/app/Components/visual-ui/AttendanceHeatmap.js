"use client";

import { useMemo } from "react";
import { FaCheckCircle, FaTimesCircle, FaCalendarMinus, FaFire } from "react-icons/fa";

export default function AttendanceHeatmap({
  attendanceRecords = [], // Array of { date, status: 'present'|'absent'|'leave' }
  daysCount = 45,
  title = "Attendance Consistency",
  subtitle = "Last 45 class days",
  currentStreak = 0,
  className = "",
}) {
  // Generate date matrix
  const { days, stats } = useMemo(() => {
    const recordMap = new Map();
    (attendanceRecords || []).forEach((r) => {
      if (r.date) {
        const key = new Date(r.date).toISOString().split("T")[0];
        recordMap.set(key, r.status);
      }
    });

    const list = [];
    const now = new Date();
    let presentCount = 0;
    let leaveCount = 0;
    let absentCount = 0;

    for (let i = daysCount - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const key = d.toISOString().split("T")[0];
      const status = recordMap.get(key) || "unrecorded";

      if (status === "present") presentCount++;
      else if (status === "leave") leaveCount++;
      else if (status === "absent") absentCount++;

      list.push({
        dateStr: key,
        displayDate: d.toLocaleDateString("en-IN", {
          month: "short",
          day: "numeric",
          weekday: "short",
        }),
        status,
        isWeekend: d.getDay() === 0,
      });
    }

    return {
      days: list,
      stats: {
        present: presentCount,
        leave: leaveCount,
        absent: absentCount,
        total: presentCount + leaveCount + absentCount,
      },
    };
  }, [attendanceRecords, daysCount]);

  const getColorClass = (status, isWeekend) => {
    switch (status) {
      case "present":
        return "bg-emerald-500 hover:bg-emerald-600 text-white shadow-2xs";
      case "leave":
        return "bg-amber-400 hover:bg-amber-500 text-white";
      case "absent":
        return "bg-rose-500 hover:bg-rose-600 text-white";
      default:
        return isWeekend
          ? "bg-slate-100 border border-slate-200/40 opacity-50"
          : "bg-slate-100 hover:bg-slate-200";
    }
  };

  return (
    <div className={`rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h4 className="font-extrabold text-sm text-slate-900">{title}</h4>
          <p className="text-[11px] text-slate-500">{subtitle}</p>
        </div>

        {currentStreak > 0 && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 border border-orange-200 px-2.5 py-1 text-xs font-bold text-[#D6451B] self-start sm:self-auto">
            <FaFire className="text-orange-500" />
            <span>{currentStreak} Day Attendance Streak</span>
          </div>
        )}
      </div>

      {/* Grid of Days */}
      <div className="mt-3.5">
        <div className="flex flex-wrap gap-1.5 sm:gap-2">
          {days.map((day) => (
            <div
              key={day.dateStr}
              title={`${day.displayDate}: ${day.status}`}
              className={`h-4 w-4 sm:h-5 sm:w-5 rounded-md cursor-pointer transition-transform hover:scale-125 ${getColorClass(
                day.status,
                day.isWeekend
              )}`}
            />
          ))}
        </div>
      </div>

      {/* Legend & Stats */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500" />
            <span className="text-[11px] font-semibold text-slate-600">
              Present ({stats.present})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-amber-400" />
            <span className="text-[11px] font-semibold text-slate-600">
              Leave ({stats.leave})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-sm bg-rose-500" />
            <span className="text-[11px] font-semibold text-slate-600">
              Absent ({stats.absent})
            </span>
          </div>
        </div>

        <span className="text-[11px] text-slate-400 font-medium">
          {stats.total > 0
            ? `${Math.round((stats.present / (stats.total || 1)) * 100)}% Regularity`
            : "No recorded classes"}
        </span>
      </div>
    </div>
  );
}
