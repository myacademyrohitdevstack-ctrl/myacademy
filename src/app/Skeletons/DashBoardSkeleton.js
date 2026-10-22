"use client";

export default function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-7xl space-y-5 sm:space-y-6 lg:space-y-8 animate-pulse">
      {/* Hero Skeleton */}
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-orange-500/15 via-[#D6451B]/20 to-rose-500/15 p-4 sm:p-6 lg:p-8 border border-orange-200/40">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-5 w-28 rounded-full bg-orange-200/60" />
            <div className="h-8 sm:h-10 w-64 sm:w-96 rounded-xl bg-orange-300/50" />
            <div className="h-4 w-full max-w-xl rounded bg-orange-200/40" />
            <div className="h-4 w-3/4 max-w-md rounded bg-orange-200/40" />
          </div>

          {/* Overview Stat Box on Desktop */}
          <div className="hidden lg:block rounded-2xl border border-orange-200/40 bg-white/40 p-5 w-80 shrink-0 space-y-3.5 backdrop-blur-xs">
            <div className="flex items-center justify-between pb-2 border-b border-orange-200/30">
              <div className="h-4 w-20 rounded bg-orange-200/60" />
              <div className="h-4 w-4 rounded-full bg-orange-200/60" />
            </div>
            <div className="space-y-2.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="h-3.5 w-28 rounded bg-orange-200/40" />
                  <div className="h-3.5 w-8 rounded bg-orange-300/50" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Primary KPI Stats Grid */}
      <section className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-4">
        {[
          { color: "bg-blue-100" },
          { color: "bg-purple-100" },
          { color: "bg-emerald-100" },
          { color: "bg-orange-100" },
        ].map((item, idx) => (
          <div
            key={idx}
            className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <div className={`h-9 w-9 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl ${item.color}`} />
              <div className="h-4 w-10 rounded-full bg-slate-100" />
            </div>
            <div className="mt-3 sm:mt-4 space-y-1.5">
              <div className="h-7 sm:h-8 w-16 sm:w-20 rounded-lg bg-slate-200" />
              <div className="h-3.5 w-24 rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </section>

      {/* Main Content Split: Recent Admissions & Sidebar Widgets */}
      <div className="grid gap-5 sm:gap-6 xl:grid-cols-[2fr_1fr]">
        {/* Left: Recent Admissions Table */}
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3.5 sm:p-6 lg:p-7 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="h-6 w-44 rounded-lg bg-slate-200" />
            <div className="h-4 w-16 rounded bg-slate-100" />
          </div>

          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100 text-xs">
                  <th className="pb-3"><div className="h-3.5 w-20 rounded bg-slate-200" /></th>
                  <th className="pb-3"><div className="h-3.5 w-20 rounded bg-slate-200" /></th>
                  <th className="pb-3"><div className="h-3.5 w-24 rounded bg-slate-200" /></th>
                  <th className="pb-3 text-right"><div className="h-3.5 w-16 rounded bg-slate-200 ml-auto" /></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[1, 2, 3, 4, 5].map((row) => (
                  <tr key={row} className="py-3">
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 shrink-0 rounded-full bg-orange-100/70" />
                        <div className="space-y-1.5">
                          <div className="h-4 w-28 rounded bg-slate-200" />
                          <div className="h-3 w-16 rounded bg-slate-100" />
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5">
                      <div className="space-y-1.5">
                        <div className="h-3.5 w-32 rounded bg-slate-100" />
                        <div className="h-3 w-20 rounded bg-slate-100" />
                      </div>
                    </td>
                    <td className="py-3.5">
                      <div className="h-3.5 w-24 rounded bg-slate-100" />
                    </td>
                    <td className="py-3.5 text-right">
                      <div className="h-6 w-16 rounded-full bg-emerald-100/60 ml-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="space-y-3 lg:hidden">
            {[1, 2, 3].map((card) => (
              <div key={card} className="rounded-xl border border-slate-100 bg-slate-50/60 p-3 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-orange-100/70" />
                    <div className="space-y-1">
                      <div className="h-3.5 w-24 rounded bg-slate-200" />
                      <div className="h-3 w-14 rounded bg-slate-100" />
                    </div>
                  </div>
                  <div className="h-5 w-14 rounded-full bg-emerald-100/60" />
                </div>
                <div className="h-3 w-40 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar: Quick Actions & Live Classes / Announcements */}
        <div className="space-y-5 sm:space-y-6">
          {/* Quick Actions Card */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs space-y-3.5">
            <div className="h-5 w-28 rounded-lg bg-slate-200" />
            <div className="space-y-2.5">
              {[1, 2, 3].map((btn) => (
                <div
                  key={btn}
                  className="h-11 w-full rounded-xl bg-slate-100/80 border border-slate-200/50 flex items-center px-3 gap-2.5"
                >
                  <div className="h-5 w-5 rounded bg-slate-200" />
                  <div className="h-3.5 w-24 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          </div>

          {/* Schedule / Updates Card */}
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="h-5 w-28 rounded-lg bg-slate-200" />
              <div className="h-4 w-12 rounded bg-slate-100" />
            </div>
            <div className="space-y-3">
              {[1, 2].map((item) => (
                <div key={item} className="rounded-xl border border-slate-100 bg-slate-50/70 p-3 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-32 rounded bg-slate-200" />
                    <div className="h-4 w-12 rounded-full bg-orange-100" />
                  </div>
                  <div className="h-3 w-20 rounded bg-slate-100" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
