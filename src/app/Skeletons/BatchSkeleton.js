"use client";

export default function BatchesSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6  md:px-0">
        <div className="space-y-6 sm:space-y-8">

          {/* Hero */}
          <div className="animate-pulse overflow-hidden rounded-3xl bg-white p-6 shadow-xl sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              <div className="space-y-4">
                <div className="h-6 w-32 rounded-full bg-slate-200" />
                <div className="h-10 w-72 rounded-xl bg-slate-200" />
                <div className="h-4 w-96 max-w-full rounded bg-slate-200" />
                <div className="h-4 w-72 max-w-full rounded bg-slate-200" />
              </div>

              <div className="grid grid-cols-2 gap-3 sm:w-[320px]">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl bg-slate-100 p-4"
                  >
                    <div className="h-3 w-16 rounded bg-slate-200" />
                    <div className="mt-3 h-8 w-12 rounded bg-slate-200" />
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Batch Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <BatchCardSkeleton key={index} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export function BatchCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      {/* Header */}
      <div className="flex justify-between gap-3">
        <div className="flex-1">
          <div className="h-6 w-40 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-28 rounded bg-slate-200" />
        </div>

        <div className="h-7 w-20 rounded-xl bg-slate-200" />
      </div>

      {/* Enrollment */}
      <div className="mt-4 h-7 w-32 rounded-xl bg-slate-200" />

      {/* Description */}
      <div className="mt-5 space-y-2">
        <div className="h-4 rounded bg-slate-200" />
        <div className="h-4 rounded bg-slate-200" />
      </div>

      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="rounded-2xl bg-slate-100 p-4"
          >
            <div className="h-3 w-16 rounded bg-slate-200" />
            <div className="mt-3 h-5 w-20 rounded bg-slate-200" />
          </div>
        ))}
      </div>

      {/* Dates */}
      <div className="mt-5 grid grid-cols-2 gap-3 rounded-2xl bg-slate-100 p-4">
        <div>
          <div className="h-3 w-16 rounded bg-slate-200" />
          <div className="mt-2 h-4 w-20 rounded bg-slate-200" />
        </div>

        <div>
          <div className="ml-auto h-3 w-16 rounded bg-slate-200" />
          <div className="mt-2 ml-auto h-4 w-20 rounded bg-slate-200" />
        </div>
      </div>

      {/* Schedule */}
      <div className="mt-5 rounded-2xl bg-slate-100 p-5">
        <div className="h-3 w-20 rounded bg-slate-200" />
        <div className="mt-3 h-4 w-full rounded bg-slate-200" />
        <div className="mt-2 h-4 w-32 rounded bg-slate-200" />

        <div className="mt-4 flex justify-between">
          <div className="h-3 w-16 rounded bg-slate-200" />
          <div className="h-6 w-20 rounded-lg bg-slate-200" />
        </div>
      </div>

      {/* Button */}
      <div className="mt-5 border-t border-slate-100 pt-4">
        <div className="h-12 w-full rounded-2xl bg-slate-200" />
      </div>

    </div>
  );
}