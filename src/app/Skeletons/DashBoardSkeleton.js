"use client";

export default function DashboardSkeleton() {
  return (
    <div className="animate-pulse py-4 md:py-8 lg:py-10">
      <div className="mx-auto max-w-7xl space-y-4  px-4 md:px-0 md:space-y-6 lg:space-y-8">

        {/* Hero */}
        <div className="rounded-3xl bg-slate-200 p-5 sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div className="flex-1">
              <div className="h-8 w-64 rounded-xl bg-slate-300" />
              <div className="mt-4 h-4 w-full max-w-md rounded bg-slate-300" />
              <div className="mt-2 h-4 w-3/4 max-w-sm rounded bg-slate-300" />

              <div className="mt-6 h-12 w-44 rounded-2xl bg-slate-300" />
            </div>

            <div className="w-full rounded-3xl bg-slate-300 p-6 lg:w-80">
              <div className="h-4 w-28 rounded bg-slate-400" />
              <div className="mt-3 h-7 w-40 rounded bg-slate-400" />
              <div className="mt-2 h-4 w-24 rounded bg-slate-400" />

              <div className="mt-6 h-3 rounded-full bg-slate-400" />

              <div className="mt-3 flex justify-between">
                <div className="h-4 w-20 rounded bg-slate-400" />
                <div className="h-4 w-12 rounded bg-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg"
            >
              <div className="h-14 w-14 rounded-2xl bg-slate-200" />

              <div className="mt-4 h-8 w-16 rounded bg-slate-200" />

              <div className="mt-3 h-4 w-24 rounded bg-slate-200" />
            </div>
          ))}
        </div>

        {/* Course + Classes */}
        <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">

          {/* Course Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg">
            <div className="h-8 w-48 rounded bg-slate-200" />

            <div className="mt-3 h-4 w-32 rounded bg-slate-200" />

            <div className="mt-6 h-3 rounded-full bg-slate-200" />

            <div className="mt-6 flex justify-between">
              <div>
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="mt-2 h-5 w-20 rounded bg-slate-200" />
              </div>

              <div>
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="mt-2 h-5 w-16 rounded bg-slate-200" />
              </div>
            </div>

            <div className="mt-6 h-12 w-44 rounded-2xl bg-slate-200" />
          </div>

          {/* Classes Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg">
            <div className="h-8 w-48 rounded bg-slate-200" />

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="mt-4 rounded-3xl border border-slate-100 p-4"
              >
                <div className="h-4 w-20 rounded bg-slate-200" />

                <div className="mt-3 h-5 w-3/4 rounded bg-slate-200" />

                <div className="mt-2 h-4 w-1/2 rounded bg-slate-200" />

                <div className="mt-4 h-11 w-full rounded-2xl bg-slate-200 sm:w-36" />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="grid gap-6 lg:grid-cols-2">

          {/* Streak */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <div className="flex gap-4">
              <div className="h-16 w-16 rounded-2xl bg-slate-200" />

              <div>
                <div className="h-6 w-40 rounded bg-slate-200" />
                <div className="mt-2 h-4 w-28 rounded bg-slate-200" />
              </div>
            </div>

            <div className="mt-6 h-3 rounded-full bg-slate-200" />

            <div className="mt-3 h-4 w-40 rounded bg-slate-200" />
          </div>

          {/* Announcements */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <div className="h-8 w-56 rounded bg-slate-200" />

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="mt-4 rounded-2xl border border-slate-100 p-4"
              >
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-slate-200" />

                  <div className="flex-1">
                    <div className="h-4 w-24 rounded bg-slate-200" />

                    <div className="mt-3 h-5 w-3/4 rounded bg-slate-200" />

                    <div className="mt-3 h-4 w-full rounded bg-slate-200" />
                    <div className="mt-2 h-4 w-5/6 rounded bg-slate-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}