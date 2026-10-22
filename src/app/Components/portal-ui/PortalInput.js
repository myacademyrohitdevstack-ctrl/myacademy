"use client";

import { forwardRef } from "react";

const PortalInput = forwardRef(function PortalInput(
  {
    label,
    error,
    helperText,
    icon: Icon,
    className = "",
    containerClassName = "",
    type = "text",
    required = false,
    isLoading = false,
    ...props
  },
  ref
) {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative flex items-center group">
        {Icon && (
          <div
            className={`absolute left-3.5 pointer-events-none transition-colors duration-200 z-10 ${
              isLoading
                ? "text-amber-500"
                : "text-slate-400 group-hover:text-amber-500"
            }`}
          >
            <Icon className="text-base" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full min-h-[46px] rounded-2xl border bg-white px-4 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 shadow-xs ${
            Icon ? "pl-11" : ""
          } ${
            isLoading ? "pr-10 border-amber-400 ring-2 ring-amber-400/20" : ""
          } ${
            error
              ? "border-rose-300 focus:border-rose-500 bg-rose-50/10"
              : "border-slate-200 focus:border-amber-500 hover:border-amber-300 focus:ring-4 focus:ring-amber-400/20"
          } ${className}`}
          {...props}
        />
        {isLoading && (
          <div className="absolute right-3.5 flex items-center justify-center pointer-events-none">
            <svg
              className="h-4 w-4 animate-spin text-amber-500"
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
                className="opacity-80"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          </div>
        )}
      </div>
      {error && (
        <p className="text-xs font-medium text-rose-500 mt-0.5">{error}</p>
      )}
      {!error && helperText && (
        <p className="text-xs text-slate-400 mt-0.5">{helperText}</p>
      )}
    </div>
  );
});

export default PortalInput;
