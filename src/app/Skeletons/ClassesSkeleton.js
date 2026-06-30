export function ClassLinksSkeleton() {
  return (
    <div className="rounded-3xl max-w-7xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-8 w-48 animate-pulse rounded-xl bg-slate-200" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="h-10 w-24 animate-pulse rounded-full bg-orange-100" />
      </div>

      <div className="space-y-5">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="rounded-3xl border border-slate-200 bg-white p-5"
          >
            <div className="flex gap-2">
              <div className="h-6 w-20 animate-pulse rounded-full bg-orange-100" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
            </div>

            <div className="mt-4 h-7 w-1/2 animate-pulse rounded bg-slate-200" />

            <div className="mt-3 space-y-2">
              <div className="h-4 animate-pulse rounded bg-slate-100" />
              <div className="h-4 animate-pulse rounded bg-slate-100" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {[...Array(4)].map((_, j) => (
                <div
                  key={j}
                  className="h-20 animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <div className="h-12 flex-1 animate-pulse rounded-2xl bg-orange-100" />
              <div className="h-12 flex-1 animate-pulse rounded-2xl bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}