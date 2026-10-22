"use client";

import { motion } from "framer-motion";
import PortalButton from "./PortalButton";

export default function PortalEmptyState({
  icon: Icon,
  title = "No data found",
  description = "There are no items to display right now.",
  actionText,
  onAction,
  className = "",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-2xl sm:rounded-3xl border border-dashed border-slate-200 bg-white/60 p-5 sm:p-10 text-center backdrop-blur-xs ${className}`}
    >
      {Icon && (
        <div className="mx-auto flex h-14 w-14 sm:h-20 sm:w-20 items-center justify-center rounded-2xl sm:rounded-3xl bg-yellow-50 text-yellow-600 text-2xl sm:text-3xl shadow-xs border border-yellow-200/60">
          <Icon />
        </div>
      )}
      <h3 className="mt-4 sm:mt-5 text-lg sm:text-xl font-bold text-slate-900">{title}</h3>
      <p className="mx-auto mt-1.5 sm:mt-2 max-w-sm text-xs sm:text-sm text-slate-500 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <div className="mt-5 sm:mt-6">
          <PortalButton onClick={onAction}>{actionText}</PortalButton>
        </div>
      )}
    </motion.div>
  );
}
