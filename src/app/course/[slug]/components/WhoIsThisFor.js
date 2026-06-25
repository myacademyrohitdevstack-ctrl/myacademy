"use client";

import {
  FaUserGraduate,
  FaCheckCircle,
} from "react-icons/fa";

export default function WhoIsThisCourseFor({whoIsThisFor}) {

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="max-w-3xl mb-12">
          <span
            className="
              inline-flex items-center
              rounded-full
              bg-orange-100
              px-4 py-2
              text-sm font-medium
              text-[#D6451B]
            "
          >
            Perfect For
          </span>

          <h2 className="mt-5 text-4xl font-bold text-slate-900">
            Who Is This Course For?
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Designed for learners who want
            practical language skills,
            confidence, and real-world
            communication ability.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {whoIsThisFor.map((item, index) => (
            <div
              key={index}
              className="
                flex items-start gap-4
                rounded-3xl
                border border-slate-200
                bg-slate-50
                p-6
              "
            >
              <div
                className="
                  flex h-12 w-12 shrink-0
                  items-center justify-center
                  rounded-2xl
                  bg-orange-50
                  text-[#D6451B]
                "
              >
                <FaUserGraduate />
              </div>

              <div>
                <div className="flex items-start gap-2">
                  <FaCheckCircle
                    className="
                      mt-1 shrink-0
                      text-green-500
                    "
                  />

                  <p className="text-slate-700 leading-relaxed">
                    {item}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}