"use client";

import { FaCheck, FaStar } from "react-icons/fa";

const courses = [
  {
    title: "English Fluency",
    badge: "Most Popular",
    level: "Beginner → Advanced",
    duration: "6 Months",
    live: "3 Live Classes / Week",
    speaking: true,
    certification: true,
    community: true,
    featured: true,
  },
  {
    title: "IELTS Preparation",
    level: "Intermediate → Advanced",
    duration: "4 Months",
    live: "5 Live Classes / Week",
    speaking: true,
    certification: true,
    community: true,
  },
  {
    title: "French Language",
    level: "A1 → B2",
    duration: "8 Months",
    live: "3 Live Classes / Week",
    speaking: true,
    certification: true,
    community: true,
  },
];

export default function CourseComparison() {
  return (
    <section className="relative py-28 bg-white overflow-hidden">

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.35em] text-slate-400">
            COMPARE PROGRAMS
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-slate-900">
            Find the perfect
            <span className="bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text">
              {" "}learning path
            </span>
          </h2>

          <p className="mt-5 text-slate-600 max-w-2xl mx-auto">
            Compare our most popular programs and choose the one that matches
            your goals, schedule, and future ambitions.
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid lg:grid-cols-3 gap-8">

          {courses.map((course) => (
            <div
              key={course.title}
              className={`relative rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                course.featured
                  ? "border-blue-500 shadow-xl"
                  : "border-slate-200"
              }`}
            >

              {/* Featured Ribbon */}
              {course.featured && (
                <div className="absolute top-5 right-5 flex items-center gap-2 rounded-full bg-blue-500 text-white px-3 py-1 text-xs">
                  <FaStar />
                  {course.badge}
                </div>
              )}

              {/* Top */}
              <div className="p-8 bg-gradient-to-br from-slate-50 to-white">

                <h3 className="text-2xl font-bold text-slate-900">
                  {course.title}
                </h3>

                <p className="mt-2 text-blue-600 font-medium">
                  {course.level}
                </p>

                <div className="mt-8 text-5xl font-bold text-slate-900">
                  {course.duration}
                </div>

                <p className="text-slate-500 mt-1">
                  Structured Learning Journey
                </p>

              </div>

              {/* Features */}
              <div className="p-8 border-t border-slate-100">

                <div className="space-y-5">

                  <Feature text={course.live} />

                  <Feature text="Live Speaking Practice" />

                  <Feature text="Personal Mentor Guidance" />

                  {course.certification && (
                    <Feature text="Completion Certificate" />
                  )}

                  {course.community && (
                    <Feature text="Global Community Access" />
                  )}

                  <Feature text="Learning Materials Included" />

                </div>

                <button
                  className={`mt-10 w-full rounded-xl py-4 font-medium transition ${
                    course.featured
                      ? "bg-slate-900 text-white hover:scale-[1.02]"
                      : "border border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  View Curriculum
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
        <FaCheck className="text-green-600 text-xs" />
      </div>
      <span className="text-slate-700">{text}</span>
    </div>
  );
}