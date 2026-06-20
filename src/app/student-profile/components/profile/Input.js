"use client";

export default function Input({
  label,
  icon,
  error,
  className = "",
  ...props
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <div className="relative">

        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </span>
        )}

     {icon && (
  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
    {icon}
  </span>
)}

<input
  {...props}
  className={`w-full rounded-2xl border ${
    error ? "border-red-500" : "border-slate-200"
  } bg-white py-3 pl-12 pr-4 outline-none focus:border-[#D6451B]`}
/>

      </div>

   
         <p className="mt-1 min-h-[20px] text-sm text-red-500 text-wrap">
          {error?.message || ""}
        </p> 
   
    </div>
  );
}