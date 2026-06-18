"use client";

import { FaArrowRight, FaClock, FaUsers } from "react-icons/fa";

const programs = [
  {
    title: "English Fluency Mastery",
    level: "Beginner → Advanced",
    duration: "6 Months",
    students: "4,200+ Students",
    image: "/programs/english-fluency.jpg",
    description:
      "Build confidence in speaking, listening, vocabulary, pronunciation, and real-life communication.",
  },
  {
    title: "IELTS Success Program",
    level: "Band 6 → Band 8+",
    duration: "12 Weeks",
    students: "2,100+ Students",
    image: "/programs/ielts.jpg",
    description:
      "Intensive preparation covering Listening, Reading, Writing, and Speaking with mock tests.",
  },
  {
    title: "French Language Pathway",
    level: "A1 → B2",
    duration: "8 Months",
    students: "1,500+ Students",
    image: "/programs/french.jpg",
    description:
      "Master French communication through immersive learning and DELF preparation.",
  },
];

export default function FeaturedPrograms() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs tracking-[0.35em] uppercase text-slate-400">
            Featured Programs
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-slate-900">
            Most Popular
            <span className="block bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
              Learning Programs
            </span>
          </h2>

          <p className="mt-5 text-slate-600">
            Carefully designed programs that have helped thousands of learners
            achieve fluency, academic success, and career growth.
          </p>
        </div>

        {/* Programs */}
        <div className="space-y-8">

          {programs.map((program, index) => (
            <div
              key={program.title}
              className={`grid lg:grid-cols-2 gap-0 overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-sm ${
                index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}
              <div className="relative h-[320px] lg:h-[420px] overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">

                <div className="inline-flex w-fit rounded-full bg-blue-50 text-blue-600 px-4 py-2 text-xs font-medium">
                  {program.level}
                </div>

                <h3 className="mt-5 text-3xl lg:text-4xl font-bold text-slate-900">
                  {program.title}
                </h3>

                <p className="mt-5 text-slate-600 leading-relaxed">
                  {program.description}
                </p>

                {/* Meta */}
                <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">

                  <div className="flex items-center gap-2">
                    <FaClock />
                    {program.duration}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaUsers />
                    {program.students}
                  </div>

                </div>

                {/* Outcomes */}
                <div className="mt-8 space-y-3 text-sm text-slate-700">

                  <div>✓ Live Instructor-Led Classes</div>
                  <div>✓ Speaking Practice Sessions</div>
                  <div>✓ Progress Tracking & Feedback</div>
                  <div>✓ Completion Certificate</div>

                </div>

                <button className="mt-8 flex items-center gap-3 font-medium text-slate-900 group">
                  View Program
                  <FaArrowRight className="group-hover:translate-x-1 transition" />
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}