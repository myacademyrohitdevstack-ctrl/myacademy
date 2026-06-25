"use client";





export default function WhatYouWillLearn({learnings}) {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl">
          <span
            className="
              rounded-full
              bg-orange-50
              px-4 py-2
              text-sm font-medium
              text-[#D6451B]
            "
          >
            What You'll Learn
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Skills You'll Gain
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            This course is designed to help you become a confident,
            fluent, and effective communicator in English.
          </p>
        </div>

        {/* Learning Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {learnings?.map((item) => (
            <div
              key={item.title}
              className="
                rounded-3xl
                border border-slate-200
                bg-white
                p-6
                transition
                hover:-translate-y-1
                hover:border-[#D6451B]
                hover:shadow-lg
              "
            >
              <div
                className="
                  flex h-14 w-14
                  items-center justify-center
                  rounded-2xl
                  bg-orange-50
                  text-xl
                  text-[#D6451B]
                "
              >
                {item.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Highlight */}
        <div
          className="
            mt-12
            rounded-[32px]
            bg-[#FFF7F4]
            p-8
            border border-orange-100
          "
        >
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="text-3xl font-bold text-[#D6451B]">
                3 Months
              </h3>

              <p className="mt-2 text-slate-600">
                Structured learning roadmap
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#D6451B]">
                Live Classes
              </h3>

              <p className="mt-2 text-slate-600">
                Interactive sessions with trainers
              </p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#D6451B]">
                Certificate
              </h3>

              <p className="mt-2 text-slate-600">
                Course completion certificate
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}