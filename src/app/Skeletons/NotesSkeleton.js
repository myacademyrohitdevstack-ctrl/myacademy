export function NotesSkeleton() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="h-8 w-40 animate-pulse rounded-xl bg-slate-200" />
          <div className="mt-2 h-4 w-64 animate-pulse rounded bg-slate-100" />
        </div>

        <div className="h-10 w-24 animate-pulse rounded-full bg-orange-100" />
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
          >
            <div className="border-b border-slate-100 p-5">
              <div className="flex gap-2">
                <div className="h-6 w-20 animate-pulse rounded-full bg-orange-100" />
                <div className="h-6 w-16 animate-pulse rounded-full bg-slate-200" />
              </div>

              <div className="mt-4 h-6 w-3/4 animate-pulse rounded bg-slate-200" />

              <div className="mt-4 space-y-2">
                <div className="h-4 animate-pulse rounded bg-slate-100" />
                <div className="h-4 animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-slate-100" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-5">
              <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
              <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
            </div>

            <div className="border-t border-slate-100 p-5">
              <div className="h-16 animate-pulse rounded-2xl bg-slate-100" />
              <div className="mt-4 h-12 animate-pulse rounded-2xl bg-orange-100" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}