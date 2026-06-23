"use client";

import Link from "next/link";
import {
  FaArrowRight,
  FaLanguage,
  FaSchool,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";

export default function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-[40px] bg-[#D6451B]">

          {/* Background Shapes */}
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-20 left-10 h-52 w-52 rounded-full bg-orange-400/20" />

          <div className="relative grid lg:grid-cols-2 gap-12 p-8 md:p-12 lg:p-16">

            {/* Left */}
            <div className="text-white">
              <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm backdrop-blur">
                Admissions Open 2026
              </span>

              <h2 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">
                Start Speaking
                <span className="block text-orange-100">
                  With Confidence
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-lg text-white/80 leading-relaxed">
                Join expert-led English Speaking, French Language,
                and School Tuition classes designed to help students
                achieve academic and career success.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="
                    flex items-center justify-center gap-3
                    rounded-2xl bg-white
                    px-8 py-4 font-semibold
                    text-[#D6451B]
                    transition hover:scale-105
                  "
                >
                  Book Free Demo
                  <FaArrowRight />
                </Link>

                <Link
                  href="/courses"
                  className="
                    rounded-2xl border border-white/30
                    px-8 py-4 font-semibold
                    text-center text-white
                    hover:bg-white/10
                  "
                >
                  View Courses
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap gap-8">
                <div>
                  <h3 className="text-3xl font-bold">500+</h3>
                  <p className="text-white/70 text-sm">
                    Students
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">50+</h3>
                  <p className="text-white/70 text-sm">
                    Batches
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-bold">98%</h3>
                  <p className="text-white/70 text-sm">
                    Satisfaction
                  </p>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center">
              <div className="grid gap-5 w-full">

                <div className="rounded-3xl bg-white p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B]">
                      <FaLanguage />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        English Speaking
                      </h3>

                      <p className="text-sm text-slate-500">
                        Fluency, grammar & confidence
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-xl ml-0 lg:ml-10">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B]">
                      <FaSchool />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        School Classes
                      </h3>

                      <p className="text-sm text-slate-500">
                        Classes 1st to 12th
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B]">
                      <FaUserGraduate />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        French Language
                      </h3>

                      <p className="text-sm text-slate-500">
                        Beginner to advanced level
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl bg-white p-6 shadow-xl ml-0 lg:ml-10">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B]">
                      <FaChalkboardTeacher />
                    </div>

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Live Interactive Classes
                      </h3>

                      <p className="text-sm text-slate-500">
                        Learn directly from expert trainers
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}