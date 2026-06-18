"use client";

import { motion } from "framer-motion";
import {
  FaSearch,
  FaPlay,
  FaCheckCircle,
  FaBookOpen,
  FaClock,
} from "react-icons/fa";
import { useState } from "react";

const initialCourses = [
  {
    id: 1,
    title: "General English",
    level: "Intermediate",
    lessons: 30,
    completedLessons: 24,
    progress: 80,
    duration: "12 Weeks",
    status: "In Progress",
    image: "/courses/general-english.jpg",
  },
  {
    id: 2,
    title: "IELTS Preparation",
    level: "Advanced",
    lessons: 40,
    completedLessons: 8,
    progress: 20,
    duration: "16 Weeks",
    status: "In Progress",
    image: "/courses/ielts.jpg",
  },
  {
    id: 3,
    title: "Business English",
    level: "Advanced",
    lessons: 30,
    completedLessons: 30,
    progress: 100,
    duration: "10 Weeks",
    status: "Completed",
    image: "/courses/business.jpg",
  },
];

export default function Courses() {
  const [search, setSearch] = useState("");

  const filteredCourses = initialCourses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[32px] bg-gradient-to-r from-[#D6451B] to-orange-500 p-8 text-white"
      >
        <h1 className="text-4xl font-bold">
          My Courses
        </h1>

        <p className="mt-3 text-orange-100">
          Continue learning and track your course progress.
        </p>
      </motion.div>

      {/* Search */}
      <div className="relative">

        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

        <input
          placeholder="Search your courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-3xl border border-slate-200 bg-white py-4 pl-14 pr-5 outline-none shadow-lg focus:border-[#D6451B]"
        />

      </div>

      {/* Cards */}
      <div className="grid gap-8">

        {filteredCourses.map((course) => (
          <motion.div
            whileHover={{ y: -4 }}
            key={course.id}
            className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-lg"
          >
            <div className="grid lg:grid-cols-[280px_1fr]">

              {/* Image */}
              <img
                src={course.image}
                alt={course.title}
                className="h-60 w-full object-cover"
              />

              {/* Content */}
              <div className="p-8">

                <div className="flex flex-wrap items-center justify-between gap-4">

                  <div>
                    <h2 className="text-3xl font-bold">
                      {course.title}
                    </h2>

                    <p className="mt-2 text-slate-500">
                      {course.level}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-4 py-2 text-sm font-semibold ${
                      course.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-[#D6451B]"
                    }`}
                  >
                    {course.status}
                  </span>

                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-3">

                  <div className="flex items-center gap-3">

                    <FaBookOpen className="text-[#D6451B]" />

                    <div>
                      <p className="text-sm text-slate-500">
                        Lessons
                      </p>

                      <h3 className="font-semibold">
                        {course.completedLessons} / {course.lessons}
                      </h3>
                    </div>

                  </div>

                  <div className="flex items-center gap-3">

                    <FaClock className="text-[#D6451B]" />

                    <div>
                      <p className="text-sm text-slate-500">
                        Duration
                      </p>

                      <h3 className="font-semibold">
                        {course.duration}
                      </h3>
                    </div>

                  </div>

                  <div>

                    <p className="text-sm text-slate-500">
                      Progress
                    </p>

                    <h3 className="font-semibold">
                      {course.progress}%
                    </h3>

                  </div>

                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-orange-100">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1 }}
                    className="h-full rounded-full bg-gradient-to-r from-[#D6451B] to-orange-400"
                  />

                </div>

                <div className="mt-8">

                  {course.progress === 100 ? (
                    <button className="flex items-center gap-3 rounded-2xl bg-green-600 px-6 py-3 font-medium text-white">
                      <FaCheckCircle />
                      View Certificate
                    </button>
                  ) : (
                    <button className="flex items-center gap-3 rounded-2xl bg-[#D6451B] px-6 py-3 font-medium text-white hover:opacity-90">
                      <FaPlay />
                      Continue Learning
                    </button>
                  )}

                </div>

              </div>

            </div>
          </motion.div>
        ))}

      </div>

      {filteredCourses.length === 0 && (
        <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
          <h2 className="text-2xl font-bold">
            No courses found
          </h2>

          <p className="mt-2 text-slate-500">
            Try searching with a different keyword.
          </p>
        </div>
      )}

    </div>
  );
}