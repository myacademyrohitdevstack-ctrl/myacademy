export function AnnouncementsSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-8 w-56 animate-pulse rounded-xl bg-slate-200" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="h-10 w-24 animate-pulse rounded-full bg-orange-100" />
      </div>

      <div className="space-y-5">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
          >
            <div className="flex gap-4 p-5">
              <div className="h-14 w-14 animate-pulse rounded-2xl bg-orange-100" />

              <div className="flex-1">
                <div className="flex gap-2">
                  <div className="h-6 w-20 animate-pulse rounded-full bg-yellow-100" />
                  <div className="h-6 w-16 animate-pulse rounded-full bg-blue-100" />
                </div>

                <div className="mt-4 h-6 w-2/3 animate-pulse rounded bg-slate-200" />

                <div className="mt-4 space-y-2">
                  <div className="h-4 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 animate-pulse rounded bg-slate-100" />
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                </div>

                <div className="mt-6 h-px bg-slate-100" />

                <div className="mt-4 h-5 w-32 animate-pulse rounded bg-slate-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}