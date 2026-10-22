"use client";

import { motion } from "framer-motion";

export default function PortalStatCard({
  title,
  value,
  icon,
  growth,
  badgeText,
  colorScheme = "yellow",
  index = 0,
}) {
  const schemes = {
    yellow: {
      bg: "bg-yellow-50/90",
      text: "text-yellow-700",
      border: "border-yellow-200/90",
      accentBg: "bg-yellow-400/20",
    },
    orange: {
      bg: "bg-amber-50/90",
      text: "text-amber-700",
      border: "border-amber-200/90",
      accentBg: "bg-amber-400/20",
    },
    blue: {
      bg: "bg-blue-50/90",
      text: "text-blue-700",
      border: "border-blue-200/90",
      accentBg: "bg-blue-400/20",
    },
    violet: {
      bg: "bg-violet-50/90",
      text: "text-violet-700",
      border: "border-violet-200/90",
      accentBg: "bg-violet-400/20",
    },
    emerald: {
      bg: "bg-emerald-50/90",
      text: "text-emerald-700",
      border: "border-emerald-200/90",
      accentBg: "bg-emerald-400/20",
    },
  };

  const activeScheme = schemes[colorScheme] || schemes.yellow;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-xl sm:rounded-2xl border ${activeScheme.border} bg-white p-3.5 sm:p-5 shadow-xs hover:shadow-md transition-all`}
    >
      <div className="flex items-center justify-between gap-2">
        <div
          className={`flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl ${activeScheme.bg} ${activeScheme.text} text-sm sm:text-lg font-bold border ${activeScheme.border} shrink-0`}
        >
          {icon}
        </div>
        {growth && (
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-[10px] sm:text-xs font-bold text-emerald-700 border border-emerald-200 shrink-0">
            {growth}
          </span>
        )}
        {badgeText && (
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 sm:px-2.5 sm:py-0.5 text-[10px] sm:text-xs font-semibold text-slate-600 shrink-0">
            {badgeText}
          </span>
        )}
      </div>

      <div className="mt-2.5 sm:mt-4">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
          {value !== undefined && value !== null ? value : "0"}
        </h3>
        <p className="mt-0.5 text-[11px] sm:text-xs lg:text-sm font-semibold text-slate-500 truncate">{title}</p>
      </div>
    </motion.div>
  );
}
