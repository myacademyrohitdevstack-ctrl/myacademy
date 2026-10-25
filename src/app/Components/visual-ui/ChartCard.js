"use client";

import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

export default function ChartCard({
  title,
  subtitle,
  icon: Icon,
  badge,
  actions,
  children,
  loading = false,
  empty = false,
  emptyMessage = "No chart data available for this timeframe.",
  className = "",
  padding = "p-4 sm:p-6",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`rounded-2xl border border-slate-200/90 bg-white shadow-xs hover:border-slate-300 transition-all ${padding} ${className}`}
    >
      {/* Header */}
      {(title || subtitle || actions || badge) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div className="flex items-start sm:items-center gap-3 min-w-0">
            {Icon && (
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#D6451B] border border-orange-200/60 text-sm">
                {typeof Icon === "function" ? <Icon /> : Icon}
              </div>
            )}
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight truncate">
                  {title}
                </h3>
                {badge && (
                  <span className="inline-flex rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                    {badge}
                  </span>
                )}
              </div>
              {subtitle && (
                <p className="text-xs text-slate-500 font-medium truncate mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {actions && <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">{actions}</div>}
        </div>
      )}

      {/* Body */}
      <div className="mt-4 w-full min-w-0">
        {loading ? (
          <div className="flex h-56 sm:h-64 items-center justify-center gap-2 text-xs font-bold text-slate-400">
            <FaSpinner className="animate-spin text-base text-[#D6451B]" />
            <span>Loading visual metrics...</span>
          </div>
        ) : empty ? (
          <div className="flex h-56 sm:h-64 flex-col items-center justify-center text-center p-6 text-slate-400">
            <div className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
              📊
            </div>
            <p className="text-xs font-semibold text-slate-600 max-w-xs">{emptyMessage}</p>
          </div>
        ) : (
          children
        )}
      </div>
    </motion.div>
  );
}
