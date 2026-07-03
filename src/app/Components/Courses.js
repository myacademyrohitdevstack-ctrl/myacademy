"use client";

import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaSearch,
  FaPlus,
  FaUsers,
  FaClock,
  FaEdit,
  FaTrash,
  FaEye,
  FaGraduationCap,
} from "react-icons/fa";

import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";
import { useRouter } from "next/navigation";

import CoursesSkeleton from "@/app/Skeletons/CourseSkeleton";

export default function Courses({courses,courseLoading,stats,statsLoading,role,permission}) {
  const router=useRouter()
  
if( courseLoading || statsLoading) return <CoursesSkeleton></CoursesSkeleton>
  return (
 <div className="mx-auto max-w-7xl space-y-6 px-4 py-28 sm:px-6 lg:px-8 ">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
className="rounded-[24px] bg-gradient-to-r from-[#D6451B] to-orange-500 p-5 text-white shadow-xl sm:p-8"      >

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
              Course Management
            </span>

          <h1 className="mt-4 text-2xl font-bold sm:text-4xl">
              Manage Courses
            </h1>

            <p className="mt-3 max-w-2xl text-orange-100">
              Create, edit and organize all academy courses, assign trainers,
              manage pricing and monitor enrollments.
            </p>

          </div>

          <button onClick={()=>{router.push(`/admin-panel/add-course`)}}  className="
flex w-full items-center justify-center gap-3
rounded-2xl bg-white px-6 py-4
font-semibold text-[#D6451B]
lg:w-auto
">

            <FaPlus />

            Add Course

          </button>

        </div>

      </motion.div>

      {/* Stats */}

    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

        <Stat
          title="Courses"
          value={stats?.totalCourses}
          icon={<FaBookOpen />}
          color="bg-blue-50 text-blue-600"
        />

    <Stat
          title="Students"
          value={stats?.totalStudents}
          icon={<FaUsers />}
          color="bg-green-50 text-green-600"
        />

         { role==="admin" &&  <Stat
          title="Trainers"
          value={stats?.totalTeachers}
          icon={<FaGraduationCap />}
          color="bg-orange-50 text-[#D6451B]"
        />}

        <Stat
          title="Batches"
         value={stats?.totalBatches}
          icon={<FaClock />}
          color="bg-purple-50 text-purple-600"
        />

      </div>

      {/* Filters */}

      {/* <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg">

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

          <div className="relative">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>

            <input
              placeholder="Search courses..."
              value={search}
              onChange={(e)=>setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-[#D6451B]"
            />

          </div>

          <select className="rounded-2xl border border-slate-200 p-3">

            <option>All Categories</option>

            <option>English</option>

            <option>IELTS</option>

            <option>Professional</option>

          </select>

          <select className="rounded-2xl border border-slate-200 p-3">

            <option>All Trainers</option>

            <option>John Smith</option>

            <option>Emma Johnson</option>

          </select>

      <button className="h-12 rounded-2xl bg-[#D6451B] text-white">
            Apply Filters
          </button>

        </div>

      </div> */}
            {/* Courses Grid */}

   <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {courses
          ?.map((course) => (

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

  <div className="relative h-44 overflow-hidden sm:h-52 bg-gradient-to-br from-[#D6451B] to-orange-500">
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

  <h2 className="line-clamp-2 text-lg font-bold text-slate-900 sm:text-xl">
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

    {/* Tags */}

   

    {/* Actions */}

 <div className="mt-5 flex gap-2  border-t border-slate-100 pt-4">
      <button
        onClick={() =>
          router.push(
            `/${role==="admin"?"admin-panel":"teacher-panel"}/batches/${course?.slug}`
          )
        }
        className="
          flex-1 flex items-center justify-center gap-2
          rounded-xl bg-blue-50 py-3
          text-blue-600 w-full
        "
      >
        <FaEye />
      </button>

      { permission.canEdit && <button
        className="
          flex flex-1 items-center justify-center gap-2
          rounded-xl bg-orange-50 py-3
          text-[#D6451B]
        "
      >
        <FaEdit />
      </button>}

     {permission.canDelete && <button
        className="
          flex flex-1 items-center justify-center gap-2
          rounded-xl bg-red-50 py-3
          text-red-600
        "
      >
        <FaTrash />
      </button>}
    </div>
  </div>
</motion.div>

          ))}

      </div>
        

  

      {/* Pagination */}

      {/* <div className="flex flex-col items-center justify-between gap-5 rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg md:flex-row">

        <p className="text-sm text-slate-500">
          Showing 1 - {courses?.length} of {courses?.length} Courses
        </p>

        <div className="flex gap-2">

          <button className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50">

            Previous

          </button>

          <button className="h-10 w-10 rounded-xl bg-[#D6451B] text-white">

            1

          </button>

          <button className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50">

            Next

          </button>

        </div>

      </div> */}

      {/* Empty State */}

      {courses?.length === 0 && (

        <div className="rounded-[24px] border border-dashed border-slate-300 bg-white px-5 py-14 text-center shadow-lg sm:py-20">

          <FaBookOpen className="mx-auto text-6xl text-[#D6451B]" />

          <h2 className="mt-6 text-3xl font-bold">

            No Courses Found

          </h2>

          <p className="mx-auto mt-3 max-w-md text-slate-500">

            There are currently no courses available.
            Click below to create your first course.

          </p>

          <button onClick={()=>{router.push('/admin-panel/add-course')}} className="mt-8 rounded-2xl bg-[#D6451B] px-8 py-4 text-white">

            Add Course

          </button>

        </div>

      )}

    </div>

  );

}

/* ---------- Reusable Stat Card ---------- */

function Stat({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
   className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg sm:p-6"
    >
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${color}`}
      >
        {icon}
      </div>

<h2 className="mt-4 text-2xl font-bold text-slate-900 sm:text-4xl">
        {value}
      </h2>

      <p className="mt-2 text-slate-500">
        {title}
      </p>
    </motion.div>
  );
}