"use client";

import { motion } from "framer-motion";

export default function ActivityTimeline({
  items = [], // Array of { id, title, description, timestamp, icon, badge, badgeColor, actionLabel, onAction }
  emptyMessage = "No recent activity recorded.",
  className = "",
}) {
  if (!items || items.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-slate-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={`relative space-y-4 pl-4 sm:pl-6 before:absolute before:left-[17px] sm:before:left-[21px] before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 ${className}`}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id || index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 }}
            className="relative flex items-start gap-3.5 group"
          >
            {/* Timeline Node Badge */}
            <div
              className={`relative z-10 flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-slate-50 text-slate-700 shadow-xs ring-2 ring-slate-200 transition-transform group-hover:scale-110 ${
                item.nodeColor || "bg-orange-50 text-[#D6451B] ring-orange-200"
              }`}
            >
              {Icon && (typeof Icon === "function" ? <Icon className="text-xs" /> : Icon)}
            </div>

            {/* Content Card */}
            <div className="min-w-0 flex-1 rounded-xl border border-slate-100 bg-slate-50/70 p-3 hover:bg-white hover:border-slate-200 hover:shadow-2xs transition-all">
              <div className="flex flex-wrap items-center justify-between gap-1.5">
                <div className="flex items-center gap-2 min-w-0">
                  <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate">
                    {item.title}
                  </h4>
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                        item.badgeColor || "bg-orange-100 text-[#D6451B]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>

                {item.timestamp && (
                  <span className="text-[10px] text-slate-400 font-medium shrink-0">
                    {item.timestamp}
                  </span>
                )}
              </div>

              {item.description && (
                <p className="mt-1 text-xs text-slate-500 font-medium leading-relaxed">
                  {item.description}
                </p>
              )}

              {item.actionLabel && (
                <button
                  onClick={item.onAction}
                  className="mt-2 text-xs font-bold text-[#D6451B] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  {item.actionLabel} &rarr;
                </button>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
