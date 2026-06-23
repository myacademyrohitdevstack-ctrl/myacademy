"use client";

import { motion } from "framer-motion";
import {
  FaSearch,
  FaPlay,
  FaCheckCircle,
  FaBookOpen,
  FaClock,
  FaEye,
  FaEdit,
} from "react-icons/fa";
import { useState } from "react";
import { useGetStudentBatches } from "@/Hooks/useGetStudentBatches";
import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";


export default function Courses() {
  const [search, setSearch] = useState("");
  const {data:batches,isLoading}=useGetStudentBatches()


if(isLoading) return
  return (
 <div className="  max-w-6xl mx-auto py-10">

    <div className="space-y-8 px-2">

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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {batches?.map(({course}) => (
           <motion.div
  key={course._id}
  whileHover={{ y: -5 }}
  transition={{ duration: 0.25 }}
  className="
    overflow-hidden
    rounded-3xl
    border border-slate-200
    bg-white
    shadow-sm
    transition-all
    hover:shadow-xl
  "
>
  {/* Thumbnail */}

  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#D6451B] to-orange-500">
    {course?.thumbnail?.url ? (
      <img
        src={course.thumbnail.url}
        alt={course.title}
        className="h-full w-full object-cover"
      />
    ) : (
      <div className="flex h-full items-center justify-center">
        <FaBookOpen className="text-6xl text-white/60" />
      </div>
    )}

    {/* Category */}

    <span
      className="
        absolute left-4 top-4
        rounded-full bg-white
        px-3 py-1
        text-xs font-semibold
        text-[#D6451B]
      "
    >
      {course?.category || "Course"}
    </span>

    {/* Enrollment */}

    <span
      className={`
        absolute right-4 top-4
        rounded-full px-3 py-1
        text-xs font-semibold
        ${
          course?.enrollmentOpen
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }
      `}
    >
      {course?.enrollmentOpen
        ? "Open"
        : "Closed"}
    </span>
  </div>

  {/* Content */}

  <div className="p-5">
    {/* Title */}

    <h2 className="line-clamp-2 text-xl font-bold text-slate-900">
      {capitalizeFirstLetter(course?.title)}
    </h2>

    {/* Description */}

    <p className="mt-3 min-h-15 line-clamp-3 text-sm text-slate-500">
      {course?.shortDescription}
    </p>

    {/* Stats */}

    <div className="mt-5 grid grid-cols-2 gap-3">
      <div className="rounded-2xl bg-slate-50 p-3">
        <p className="text-xs text-slate-500">
          Price
        </p>

        <p className="mt-1 font-bold text-[#D6451B]">
          ₹{course?.price}
        </p>
      </div>

      <div className="rounded-2xl bg-slate-50 p-3">
        <p className="text-xs text-slate-500">
          Duration
        </p>

        <p className="mt-1 font-semibold">
          {course?.durationInMonths} Months
        </p>
      </div>
    </div>

    {/* Meta */}

    <div className="mt-5 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">
          Level
        </span>

        <span className="rounded-lg bg-orange-50 px-3 py-1 text-sm font-medium text-[#D6451B] capitalize">
          {course?.level}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">
          Language
        </span>

        <span className="font-medium">
          {course?.language}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-500">
          Status
        </span>

        <span
          className={`
            rounded-lg px-3 py-1 text-sm font-medium capitalize
            ${
              course?.status === "published"
                ? "bg-green-100 text-green-700"
                : course?.status === "draft"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-slate-100 text-slate-700"
            }
          `}
        >
          {course?.status}
        </span>
      </div>
    </div>

  </div>
</motion.div>
        ))}

      </div>

      {batches?.length === 0 && (
        <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
          <h2 className="text-2xl font-bold">
            No courses found
          </h2>

          <p className="mt-2 text-slate-500">
            Try searching with a different keyword.
          </p>
        </div>
      )}

    </div></div>
  );
}