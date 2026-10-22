"use client";

import { motion } from "framer-motion";

export default function PortalTable({
  columns = [],
  data = [],
  renderMobileCard,
  keyExtractor = (item, index) => item._id || item.id || index,
  emptyTitle = "No records found",
  emptyDescription = "There are no items matching your criteria.",
  isLoading = false,
  isFetching = false,
  className = "",
}) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3 rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6">
        <div className="h-5 w-1/4 rounded bg-slate-200" />
        <div className="space-y-2.5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-14 w-full rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-200 bg-white/80 p-6 sm:p-10 text-center">
        <h3 className="text-base sm:text-lg font-bold text-slate-800">{emptyTitle}</h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white shadow-xs ${className}`}>
      {/* Top indeterminate progress bar when refetching */}
      {isFetching && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 animate-pulse z-40" />
      )}

      {/* Loading overlay when refetching / changing filter */}
      {isFetching && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-white/50 backdrop-blur-[1px] transition-all duration-200">
          <div className="inline-flex items-center gap-2 rounded-xl bg-slate-900/90 px-3.5 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md">
            <svg
              className="h-3.5 w-3.5 animate-spin text-amber-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3.5"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span>Updating records...</span>
          </div>
        </div>
      )}
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-bold uppercase tracking-wider text-slate-500">
              {columns.map((col, idx) => (
                <th
                  key={col.key || idx}
                  className={`px-5 py-3.5 ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"} ${col.headerClassName || ""}`}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {data.map((item, index) => (
              <motion.tr
                key={keyExtractor(item, index)}
                whileHover={{ backgroundColor: "#FAF5F0" }}
                className="transition-colors duration-150"
              >
                {columns.map((col, idx) => (
                  <td
                    key={col.key || idx}
                    className={`px-5 py-3.5 font-medium text-slate-700 ${col.align === "right" ? "text-right" : col.align === "center" ? "text-center" : "text-left"} ${col.cellClassName || ""}`}
                  >
                    {col.render ? col.render(item, index) : item[col.key]}
                  </td>
                ))}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Stack View (< 1024px) */}
      <div className="block lg:hidden p-2.5 sm:p-4 space-y-2.5 sm:space-y-3">
        {data.map((item, index) => (
          <div
            key={keyExtractor(item, index)}
            className="rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 shadow-xs min-w-0 overflow-hidden"
          >
            {renderMobileCard ? (
              renderMobileCard(item, index)
            ) : (
              <div className="space-y-2.5 min-w-0">
                {columns.map((col, idx) => (
                  <div key={col.key || idx} className="flex justify-between items-center text-xs sm:text-sm gap-2 min-w-0">
                    <span className="text-[11px] font-semibold uppercase text-slate-400 shrink-0">
                      {col.header}
                    </span>
                    <div className="font-medium text-slate-800 min-w-0 break-words text-right">
                      {col.render ? col.render(item, index) : item[col.key]}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
