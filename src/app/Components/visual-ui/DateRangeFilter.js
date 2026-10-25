"use client";

export default function DateRangeFilter({
  options = [
    { id: "7d", label: "7D" },
    { id: "30d", label: "30D" },
    { id: "90d", label: "90D" },
    { id: "fy", label: "All / FY" },
  ],
  selected,
  onChange,
  className = "",
}) {
  return (
    <div
      className={`inline-flex items-center gap-1 rounded-xl bg-slate-100 p-1 border border-slate-200/80 max-w-full overflow-x-auto scrollbar-none ${className}`}
    >
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={`rounded-lg px-2.5 sm:px-3 py-1 text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
              isSelected
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
