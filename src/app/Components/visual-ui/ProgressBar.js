"use client";

import { motion } from "framer-motion";

export default function ProgressBar({
  percentage = 0,
  targetPercentage = null,
  targetLabel = "75% Target",
  height = "h-2.5",
  colorScheme = "auto", // 'auto' | 'orange' | 'emerald' | 'amber' | 'blue' | 'gradient'
  label = "",
  subLabel = "",
  showPercentage = true,
  className = "",
}) {
  const safePercent = Math.min(100, Math.max(0, Math.round(Number(percentage) || 0)));

  let fillClass = "bg-[#D6451B]";
  if (colorScheme === "auto") {
    if (safePercent >= 75) fillClass = "bg-gradient-to-r from-emerald-500 to-teal-500";
    else if (safePercent >= 60) fillClass = "bg-gradient-to-r from-amber-500 to-orange-400";
    else fillClass = "bg-gradient-to-r from-rose-500 to-red-500";
  } else if (colorScheme === "gradient") {
    fillClass = "bg-gradient-to-r from-[#D6451B] to-amber-500";
  } else if (colorScheme === "emerald") {
    fillClass = "bg-emerald-500";
  } else if (colorScheme === "blue") {
    fillClass = "bg-blue-500";
  } else if (colorScheme === "orange") {
    fillClass = "bg-[#D6451B]";
  }

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between gap-2 text-xs font-semibold mb-1.5">
          <span className="text-slate-700 truncate">{label}</span>
          <div className="flex items-center gap-1.5 shrink-0">
            {subLabel && <span className="text-slate-400 font-normal">{subLabel}</span>}
            {showPercentage && (
              <span className="font-bold text-slate-900">{safePercent}%</span>
            )}
          </div>
        </div>
      )}

      <div className={`relative ${height} w-full rounded-full bg-slate-100 overflow-hidden`}>
        <motion.div
          className={`h-full rounded-full ${fillClass}`}
          initial={{ width: 0 }}
          animate={{ width: `${safePercent}%` }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />

        {/* Target Benchmark Marker */}
        {targetPercentage !== null && targetPercentage > 0 && targetPercentage < 100 && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-slate-900/60 z-10"
            style={{ left: `${targetPercentage}%` }}
            title={targetLabel}
          />
        )}
      </div>

      {targetPercentage !== null && (
        <div className="mt-1 flex items-center justify-between text-[10px] text-slate-400 font-medium">
          <span>0%</span>
          <span className="font-bold text-slate-700">{targetLabel}</span>
          <span>100%</span>
        </div>
      )}
    </div>
  );
}
