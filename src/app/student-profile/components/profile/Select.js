"use client";

import React from "react";

export default function Select({
  label,
  icon,
  options = [],
  error,
  className = "",
  placeholder = "Select an option",
  ...props
}) {
  return (
    <div className={`${className} relative`}>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

        <select
          {...props}
          className={`w-full appearance-none rounded-2xl border border-slate-200 bg-white py-3 ${
            icon ? "pl-12" : "pl-4"
          } pr-10 text-slate-700 outline-none transition-all duration-200 focus:border-[#D6451B] focus:ring-4 focus:ring-orange-100`}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Dropdown Arrow */}
        <svg
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

     
   
   <p className="absolute left-0 top-full mt-1 text-sm text-red-500">
      {error?.message || ""}
    </p>

     
    </div>
  );
}