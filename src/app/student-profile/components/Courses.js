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
<div className="min-h-screen bg-slate-50">
  <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
    <div className="space-y-6 sm:space-y-8">

      {/* Header */}
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#D6451B] via-orange-500 to-orange-400 p-6 shadow-xl sm:p-8 lg:p-10"
>
  <div className="absolute inset-0">
    <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl" />
  </div>

  <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-100 backdrop-blur">
        Student Portal
      </span>

      <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
        My Courses
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-orange-100 sm:text-base">
        Continue learning, monitor your enrolled courses and keep track of your progress.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-3 sm:w-[320px]">
      <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
        <p className="text-xs uppercase text-orange-100">
          Courses
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          {batches?.length || 0}
        </h3>
      </div>

      <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
        <p className="text-xs uppercase text-orange-100">
          Active
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          {
            batches?.filter(
              ({ course }) =>
                course?.status === "published"
            ).length || 0
          }
        </h3>
      </div>
    </div>
  </div>
</motion.div>

      {/* Search */}
   {/* <div className="relative">
  <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />

  <input
    placeholder="Search your courses..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="
      h-14
      w-full
      rounded-2xl
      border
      border-slate-200
      bg-white
      pl-14
      pr-4
      text-sm
      shadow-sm
      transition-all
      focus:border-[#D6451B]
      focus:ring-4
      focus:ring-orange-100
      outline-none
    "
  />
</div> */}

      {/* Cards */}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3">

        {batches?.map(({course}) => (
           <motion.div
  key={course._id}
  whileHover={{ y: -5 }}
  transition={{ duration: 0.25 }}
className="
group
overflow-hidden
rounded-3xl
border
border-slate-200
bg-white
shadow-sm
transition-all
duration-300
hover:-translate-y-1
hover:border-orange-200
hover:shadow-xl
"
>
  {/* Thumbnail */}

  <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#D6451B] to-orange-500">
    {course?.thumbnail?.url ? (
      <img
        src={course.thumbnail.url}
        alt={course.title}
     className="
h-full
w-full
object-cover
transition-transform
duration-500
group-hover:scale-105
"
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

 <div className="space-y-5 p-5 sm:p-6">
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
      <div className="
rounded-2xl
border
border-slate-100
bg-slate-50
p-4
">
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

  <div className="space-y-3 border-t border-slate-100 pt-5">
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
      <button
  className="
    mt-6
    flex
    h-12
    w-full
    items-center
    justify-center
    rounded-2xl
    bg-[#D6451B]
    font-semibold
    text-white
    transition-all
    hover:bg-[#b93814]
    active:scale-[0.98]
  "
>
  Continue Learning
</button>
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

    </div></div></div>
  );
}