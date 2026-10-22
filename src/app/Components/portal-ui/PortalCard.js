"use client";

import { motion } from "framer-motion";

export default function PortalCard({
  children,
  className = "",
  header,
  action,
  hoverable = false,
  padding = "p-3.5 sm:p-5 lg:p-6",
  ...props
}) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -3, transition: { duration: 0.2 } } : {}}
      className={`rounded-2xl sm:rounded-3xl border border-slate-200/80 bg-white/95 backdrop-blur-xs shadow-xs hover:shadow-md transition-all duration-300 ${padding} ${className}`}
      {...props}
    >
      {(header || action) && (
        <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 sm:mb-4 border-b border-slate-100 gap-3">
          <div className="min-w-0">
            {typeof header === "string" ? (
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-slate-900 tracking-tight truncate">{header}</h2>
            ) : (
              header
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </motion.div>
  );
}
