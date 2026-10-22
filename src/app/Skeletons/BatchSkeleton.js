"use client";

export default function BatchesSkeleton() {
  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6 px-1 sm:px-6 lg:px-8 min-w-0 animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-orange-500/15 via-[#D6451B]/20 to-orange-500/15 p-4 sm:p-6 lg:p-8 border border-orange-200/40">
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-5 w-32 rounded-full bg-orange-200/60" />
            <div className="h-8 sm:h-10 w-56 sm:w-80 rounded-xl bg-orange-300/50" />
            <div className="h-4 w-full max-w-xl rounded bg-orange-200/40" />
          </div>

          <div className="h-10 sm:h-12 w-36 rounded-xl bg-white/70 border border-orange-200/40 shrink-0 self-start lg:self-auto" />
        </div>
      </div>

      {/* 3 Stat Cards Skeleton */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 w-full">
        {[
          { color: "bg-orange-100" },
          { color: "bg-emerald-100" },
          { color: "bg-purple-100" },
        ].map((item, idx) => (
          <div
            key={idx}
            className={`rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-xs ${
              idx === 2 ? "col-span-2 sm:col-span-1" : ""
            }`}
          >
            <div className="flex items-center justify-between">
              <div className={`h-8 w-8 sm:h-10 sm:w-10 rounded-xl ${item.color}`} />
              <div className="h-4 w-8 rounded-full bg-slate-100" />
            </div>
            <div className="mt-2.5 sm:mt-3 space-y-1">
              <div className="h-6 sm:h-7 w-12 sm:w-16 rounded bg-slate-200" />
              <div className="h-3 w-20 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Batch Cards Grid Skeleton */}
      <div className="grid grid-cols-1 gap-3.5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 w-full">
        {Array.from({ length: 6 }).map((_, index) => (
          <BatchCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export function BatchCardSkeleton() {
  return (
    <div className="w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-4">
      <div className="space-y-3.5">
        {/* Header: Name + Status Badge */}
        <div className="flex items-start justify-between gap-2.5">
          <div className="space-y-1.5 flex-1">
            <div className="h-5 w-40 rounded-lg bg-slate-200" />
            <div className="h-3.5 w-24 rounded bg-slate-100" />
          </div>
          <div className="h-5 w-16 rounded-full bg-emerald-100/70" />
        </div>

        {/* Course Info */}
        <div className="flex items-center gap-2 py-1">
          <div className="h-4 w-4 rounded bg-slate-200" />
          <div className="h-3.5 w-32 rounded bg-slate-100" />
        </div>

        {/* Timings / Schedule chip */}
        <div className="h-6 w-36 rounded-lg bg-slate-100" />

        {/* Student & Trainer counts */}
        <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 rounded bg-slate-200" />
            <div className="h-3 w-16 rounded bg-slate-200" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 rounded bg-slate-200" />
            <div className="h-3 w-16 rounded bg-slate-200" />
          </div>
        </div>
      </div>

      {/* Footer: Action Buttons */}
      <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
        <div className="h-9 flex-1 rounded-xl bg-orange-100/70" />
        <div className="h-9 w-9 rounded-xl bg-slate-100" />
        <div className="h-9 w-9 rounded-xl bg-slate-100" />
      </div>
    </div>
  );
}
