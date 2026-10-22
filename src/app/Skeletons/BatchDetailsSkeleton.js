"use client";

export default function BatchDetailsSkeleton() {
  return (
    <div className="py-2 sm:py-4 animate-pulse">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6 px-3 sm:px-6 lg:px-8">
        {/* Hero Banner */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-orange-500/15 via-[#D6451B]/20 to-orange-500/15 p-4 sm:p-6 lg:p-8 border border-orange-200/40">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3 flex-1">
              <div className="h-5 w-28 rounded-full bg-orange-200/60" />
              <div className="h-8 sm:h-10 w-60 sm:w-80 rounded-xl bg-orange-300/50" />
              <div className="h-4 w-full max-w-lg rounded bg-orange-200/40" />
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
              <div className="h-10 w-44 rounded-xl bg-white/70 border border-orange-200/40" />
              <div className="h-10 w-24 rounded-full bg-white/70 border border-orange-200/40" />
            </div>
          </div>
        </div>

        {/* 4 Quick Stat Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[
            { color: "bg-blue-100" },
            { color: "bg-purple-100" },
            { color: "bg-emerald-100" },
            { color: "bg-orange-100" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs"
            >
              <div className="flex items-center justify-between">
                <div className={`h-10 w-10 rounded-xl ${item.color}`} />
                <div className="h-4 w-10 rounded-full bg-slate-100" />
              </div>
              <div className="mt-3 space-y-1">
                <div className="h-7 w-14 rounded bg-slate-200" />
                <div className="h-3 w-20 rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation Bar Skeleton */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-slate-200 pb-2">
          {["Notes & Documents", "Live Classes", "Attendance", "Announcements"].map(
            (tab, idx) => (
              <div
                key={idx}
                className={`h-10 rounded-xl px-4 py-2 flex items-center gap-2 shrink-0 ${
                  idx === 0
                    ? "bg-orange-50 border border-orange-200"
                    : "bg-slate-100/70"
                }`}
              >
                <div className="h-4 w-4 rounded bg-slate-300" />
                <div className="h-3.5 w-24 rounded bg-slate-300" />
              </div>
            )
          )}
        </div>

        {/* Tab Content Cards Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs space-y-3.5"
            >
              <div className="flex items-center justify-between">
                <div className="h-6 w-20 rounded-full bg-orange-100" />
                <div className="h-5 w-16 rounded bg-slate-100" />
              </div>
              <div className="h-5 w-4/5 rounded bg-slate-200" />
              <div className="h-3.5 w-full rounded bg-slate-100" />
              <div className="h-3.5 w-2/3 rounded bg-slate-100" />
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                <div className="h-9 flex-1 rounded-xl bg-orange-100/70" />
                <div className="h-9 w-9 rounded-xl bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
