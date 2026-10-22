"use client";

export default function CoursesSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6 px-3 py-3 sm:px-6 lg:px-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-orange-500/15 via-[#D6451B]/20 to-orange-500/15 p-4 sm:p-6 lg:p-8 border border-orange-200/40">
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-5 w-36 rounded-full bg-orange-200/60" />
            <div className="h-8 sm:h-10 w-60 sm:w-80 rounded-xl bg-orange-300/50" />
            <div className="h-4 w-full max-w-xl rounded bg-orange-200/40" />
          </div>

          <div className="h-10 sm:h-12 w-36 rounded-xl bg-white/70 border border-orange-200/40 shrink-0 self-start lg:self-auto" />
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 xl:grid-cols-4">
        {[
          { color: "bg-blue-100" },
          { color: "bg-emerald-100" },
          { color: "bg-orange-100" },
          { color: "bg-purple-100" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className={`h-9 w-9 sm:h-11 sm:w-11 rounded-xl ${item.color}`} />
              <div className="h-4 w-10 rounded-full bg-slate-100" />
            </div>
            <div className="mt-3 space-y-1">
              <div className="h-6 sm:h-7 w-12 sm:w-16 rounded bg-slate-200" />
              <div className="h-3 w-20 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <CourseCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-xs flex flex-col justify-between">
      {/* Thumbnail */}
      <div className="h-40 sm:h-44 w-full bg-slate-200 relative">
        <div className="absolute top-3 right-3 h-5 w-16 rounded-full bg-slate-300" />
      </div>

      <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-20 rounded-md bg-orange-100" />
            <div className="h-4 w-14 rounded-md bg-slate-100" />
          </div>

          <div className="h-5 w-4/5 rounded-lg bg-slate-200" />
          <div className="h-3.5 w-full rounded bg-slate-100" />
          <div className="h-3.5 w-2/3 rounded bg-slate-100" />
        </div>

        {/* Stats Row */}
        <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 rounded bg-slate-200" />
            <div className="h-3 w-16 rounded bg-slate-200" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3.5 w-3.5 rounded bg-slate-200" />
            <div className="h-3 w-14 rounded bg-slate-200" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <div className="h-9 flex-1 rounded-xl bg-orange-100/70" />
          <div className="h-9 w-9 rounded-xl bg-slate-100" />
          <div className="h-9 w-9 rounded-xl bg-slate-100" />
        </div>
      </div>
    </div>
  );
}
