"use client";

import { FaChild, FaUserGraduate, FaCheckCircle } from "react-icons/fa";

export default function ChildSwitcher({
  childrenList = [],
  selectedChildId,
  onSelect,
}) {
  if (!childrenList || childrenList.length <= 1) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-3 sm:p-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-100 text-[#D6451B]">
            <FaChild className="text-sm" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Switch Enrolled Child</p>
            <p className="text-[11px] text-slate-500">
              Select child to inspect attendance, class batches, and fees
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {childrenList.map((c) => {
            const childId = c.user?._id || c._id;
            const isSelected = childId === selectedChildId;
            return (
              <button
                key={childId}
                onClick={() => onSelect(childId)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all ${
                  isSelected
                    ? "bg-[#D6451B] text-white shadow-xs"
                    : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-orange-50 hover:text-[#D6451B]"
                }`}
              >
                <FaUserGraduate className={`text-xs ${isSelected ? "text-white" : "text-slate-400"}`} />
                <span>{c.user?.fullName || "Child"}</span>
                {c.parentRelationship && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                  }`}>
                    {c.parentRelationship}
                  </span>
                )}
                {isSelected && <FaCheckCircle className="text-[10px]" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
