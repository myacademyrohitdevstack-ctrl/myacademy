"use client";

import { motion } from "framer-motion";

export default function PortalButton({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  isLoading = false,
  disabled = false,
  className = "",
  type = "button",
  onClick,
  ...props
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-slate-950 font-bold shadow-md shadow-yellow-200/60 hover:from-yellow-300 hover:to-amber-400 active:scale-[0.98]",
    secondary:
      "bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98] shadow-xs font-bold",
    outline:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] font-bold",
    yellowOutline:
      "border border-yellow-400/60 bg-yellow-50/80 text-yellow-800 hover:bg-yellow-100 active:scale-[0.98] font-bold",
    orangeOutline:
      "border border-yellow-400/60 bg-yellow-50/80 text-yellow-800 hover:bg-yellow-100 active:scale-[0.98] font-bold",
    danger:
      "bg-rose-600 text-white hover:bg-rose-700 active:scale-[0.98] shadow-xs font-bold",
    ghost:
      "text-slate-700 hover:bg-yellow-50 hover:text-yellow-700 active:scale-[0.98] font-bold",
  };

  const sizes = {
    sm: "min-h-[36px] sm:min-h-[40px] px-3 sm:px-4 py-1.5 sm:py-2 text-xs rounded-xl",
    md: "min-h-[40px] sm:min-h-[46px] px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-xl sm:rounded-2xl",
    lg: "min-h-[46px] sm:min-h-[52px] px-5 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl sm:rounded-2xl",
  };

  return (
    <motion.button
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 disabled:opacity-50 disabled:cursor-not-allowed ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin h-4 w-4 text-current"
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
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon className="text-sm sm:text-base shrink-0" />}
          <span className="truncate">{children}</span>
          {Icon && iconPosition === "right" && <Icon className="text-sm sm:text-base shrink-0" />}
        </>
      )}
    </motion.button>
  );
}
