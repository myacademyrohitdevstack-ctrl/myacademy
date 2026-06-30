"use client";

export default function ProfileSkeleton() {
  return (
    <div className="animate-pulse min-h-screen bg-gradient-to-b from-orange-50/40 via-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-0">

        {/* Hero */}
        <div className="rounded-[32px] bg-slate-200 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

            <div className="flex-1">
              <div className="h-6 w-32 rounded-full bg-slate-300" />

              <div className="mt-4 h-10 w-56 rounded-xl bg-slate-300" />

              <div className="mt-4 h-4 w-full max-w-xl rounded bg-slate-300" />
              <div className="mt-2 h-4 w-3/4 max-w-lg rounded bg-slate-300" />
            </div>

            <div className="grid grid-cols-2 gap-3 lg:w-[320px]">
              <div className="rounded-2xl bg-slate-300 p-4 h-24" />
              <div className="rounded-2xl bg-slate-300 p-4 h-24" />
            </div>

          </div>
        </div>

        {/* Content */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">

          {/* Sidebar */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">

            <div className="mx-auto h-32 w-32 rounded-full bg-slate-200" />

            <div className="mt-5 h-6 w-40 mx-auto rounded bg-slate-200" />

            <div className="mt-3 h-4 w-56 mx-auto rounded bg-slate-200" />

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="h-20 rounded-2xl bg-slate-100" />
              <div className="h-20 rounded-2xl bg-slate-100" />
            </div>

            <div className="mt-6 space-y-3">
              {[1,2,3,4,5].map((item)=>(
                <div
                  key={item}
                  className="h-16 rounded-2xl bg-slate-100"
                />
              ))}
            </div>

          </div>

          {/* Form */}
          <div className="space-y-8">

            {[1,2,3,4].map((section)=>(
              <div key={section}>
                <div className="h-7 w-56 rounded bg-slate-200" />
                <div className="mt-2 h-4 w-80 rounded bg-slate-200" />

                <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
                  <div className="grid gap-4 md:grid-cols-2">

                    {[1,2,3,4].map((field)=>(
                      <div
                        key={field}
                        className="h-14 rounded-2xl bg-slate-100"
                      />
                    ))}

                  </div>
                </div>
              </div>
            ))}

            {/* Buttons */}
            <div className="flex gap-4">
              <div className="h-12 w-36 rounded-2xl bg-slate-200" />
              <div className="h-12 w-36 rounded-2xl bg-slate-200" />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}