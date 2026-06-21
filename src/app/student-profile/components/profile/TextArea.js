"use client";

export default function TextArea({
  label,
  error,
  rows = 4,
  placeholder,
  required = false,
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-700">
          {label}
          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <textarea
        {...props}
        rows={rows}
        placeholder={placeholder}
      
        className={`
          w-full rounded-2xl border bg-white px-4 py-3
          outline-none transition-all duration-200
          resize-none
          ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-slate-200 focus:border-[#D6451B]"
          }
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}