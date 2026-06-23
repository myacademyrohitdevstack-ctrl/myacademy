"use client";

import Link from "next/link";
import {
  FaClock,
  FaSignal,
  FaLanguage,
  FaUsers,
  FaStar,
  FaPlay,
} from "react-icons/fa";

export default function CourseHero({ course }) {
  return (
    <section className="relative overflow-hidden bg-[#FFF7F4] pt-32 pb-20">
      {/* Background */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-orange-100 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange-50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-[#D6451B]">
              <FaStar />
              Most Popular Course
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-6xl">
              {course?.title}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
              {course?.shortDescription}
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-4">

              <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm">
                <FaClock className="text-[#D6451B]" />
                <div>
                  <p className="text-xs text-slate-500">
                    Duration
                  </p>
                  <p className="font-semibold">
                    {course?.durationInMonths} Months
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm">
                <FaSignal className="text-[#D6451B]" />
                <div>
                  <p className="text-xs text-slate-500">
                    Level
                  </p>
                  <p className="font-semibold capitalize">
                    {course?.level}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm">
                <FaLanguage className="text-[#D6451B]" />
                <div>
                  <p className="text-xs text-slate-500">
                    Language
                  </p>
                  <p className="font-semibold">
                    {course?.language}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-sm">
                <FaUsers className="text-[#D6451B]" />
                <div>
                  <p className="text-xs text-slate-500">
                    Students
                  </p>
                  <p className="font-semibold">
                    500+
                  </p>
                </div>
              </div>

            </div>

            {/* Price */}
            <div className="mt-8 flex items-center gap-4">
              <span className="text-4xl font-bold text-[#D6451B]">
                ₹{course?.price}
              </span>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                Enrollment Open
              </span>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="
                  flex items-center justify-center gap-3
                  rounded-2xl
                  bg-[#D6451B]
                  px-8 py-4
                  font-semibold
                  text-white
                  transition
                  hover:scale-105
                "
              >
                Book Free Demo
              </Link>

              <button
                className="
                  flex items-center justify-center gap-3
                  rounded-2xl
                  border border-slate-300
                  bg-white
                  px-8 py-4
                  font-semibold
                  text-slate-700
                "
              >
                <FaPlay />
                Watch Overview
              </button>
            </div>
          </div>

          {/* Right */}
          <div>
            <div className="overflow-hidden rounded-[32px] bg-white p-3 shadow-2xl">
              {course?.thumbnail?.url ? (
                <img
                  src={course.thumbnail.url}
                  alt={course.title}
                  className="h-[450px] w-full rounded-[24px] object-cover"
                />
              ) : (
                <div className="flex h-[450px] items-center justify-center rounded-[24px] bg-gradient-to-br from-[#D6451B] to-orange-400">
                  <FaLanguage className="text-8xl text-white/70" />
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}