"use client";

import { forwardRef } from "react";

const PortalSelect = forwardRef(function PortalSelect(
  {
    label,
    error,
    helperText,
    icon: Icon,
    options = [],
    children,
    className = "",
    containerClassName = "",
    required = false,
    isLoading = false,
    ...props
  },
  ref
) {
  const isSelected = props.value !== undefined && props.value !== null && props.value !== "";

  return (
    <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
            {label}
            {required && <span className="text-rose-500 ml-1">*</span>}
          </label>
          {isSelected && (
            <span className="inline-flex h-2 w-2 rounded-full bg-amber-500 animate-pulse" title="Active filter" />
          )}
        </div>
      )}
      <div className="relative flex items-center group">
        {Icon && (
          <div
            className={`absolute left-3.5 pointer-events-none z-10 transition-colors duration-200 ${
              isLoading
                ? "text-amber-500"
                : isSelected
                ? "text-amber-600"
                : "text-slate-400 group-hover:text-amber-500"
            }`}
          >
            <Icon className="text-base" />
          </div>
        )}
        <select
          ref={ref}
          disabled={isLoading || props.disabled}
          className={`w-full min-h-[46px] rounded-2xl border px-4 py-2.5 text-sm font-medium outline-none transition-all duration-200 appearance-none cursor-pointer pr-10 shadow-xs ${
            Icon ? "pl-11" : ""
          } ${
            error
              ? "border-rose-300 focus:border-rose-500 bg-rose-50/10 text-slate-900"
              : isLoading
              ? "border-amber-400 bg-amber-50/40 text-amber-950 ring-2 ring-amber-400/20 cursor-wait"
              : isSelected
              ? "border-amber-300/90 bg-amber-50/30 text-amber-950 font-semibold hover:border-amber-400 focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20 focus:bg-white"
              : "border-slate-200 bg-white text-slate-700 hover:border-amber-300 hover:text-slate-900 focus:border-amber-500 focus:ring-4 focus:ring-amber-400/20"
          } ${className}`}
          {...props}
        >
          {children ? (
            children
          ) : (
            options.map((opt) => (
              <option
                key={typeof opt === "object" ? opt.value : opt}
                value={typeof opt === "object" ? opt.value : opt}
              >
                {typeof opt === "object" ? opt.label : opt}
              </option>
            ))
          )}
        </select>
        <div className="absolute right-3.5 flex items-center justify-center pointer-events-none">
          {isLoading ? (
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
          ) : (
            <svg
              className={`h-4 w-4 transition-colors duration-200 ${
                isSelected ? "text-amber-600 font-bold" : "text-slate-400 group-hover:text-amber-500"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
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

export default PortalSelect;
