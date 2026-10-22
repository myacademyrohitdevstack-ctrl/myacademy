"use client";

import { forwardRef } from "react";

const PortalTextArea = forwardRef(function PortalTextArea(
  {
    label,
    error,
    helperText,
    rows = 4,
    className = "",
    containerClassName = "",
    required = false,
    ...props
  },
  ref
) {
  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-600">
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        rows={rows}
        className={`w-full rounded-2xl border bg-white px-4 py-3 text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200 focus:ring-2 focus:ring-yellow-400/20 ${
          error
            ? "border-rose-300 focus:border-rose-500 bg-rose-50/10"
            : "border-slate-200 focus:border-yellow-500 hover:border-slate-300"
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs font-medium text-rose-500 mt-0.5">{error}</p>
      )}
      {!error && helperText && (
        <p className="text-xs text-slate-400 mt-0.5">{helperText}</p>
      )}
    </div>
  );
});

export default PortalTextArea;
