"use client";

import { motion } from "framer-motion";

export default function PortalProgressBar({
  progress = 0,
  label,
  showPercentage = true,
  height = "h-3",
  color = "from-yellow-400 to-amber-500",
  className = "",
}) {
  const percentage = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs font-semibold text-slate-600 mb-1.5">
          {label && <span>{label}</span>}
          {showPercentage && <span className="text-yellow-700 font-bold">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50 ${height}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${color} rounded-full shadow-xs`}
        />
      </div>
    </div>
  );
}
