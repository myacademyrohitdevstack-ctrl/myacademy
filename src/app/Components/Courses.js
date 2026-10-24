"use client";

import { motion } from "framer-motion";
import {
  FaBookOpen,
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

export default function Courses({
  courses,
  courseLoading,
  stats,
  statsLoading,
  role,
  permission = {},
}) {
  const router = useRouter();

  if (courseLoading || statsLoading) return <CoursesSkeleton />;

  return (
    <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6 px-3 py-3 sm:px-6 lg:px-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg"
      >
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Course Management
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Manage Courses
            </h1>

            <p className="mt-2 text-xs sm:text-sm lg:text-base max-w-2xl text-orange-100 leading-relaxed font-normal">
              Create, edit and organize academy courses, assign trainers, manage pricing and monitor student enrollments.
            </p>
          </div>

          {role === "admin" && (permission?.canAdd ?? true) && (
            <button
              onClick={() => router.push("/admin-panel/add-course")}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#D6451B] shadow-xs hover:bg-orange-50 transition lg:w-auto shrink-0"
            >
              <FaPlus className="text-xs" />
              <span>Add Course</span>
            </button>
          )}
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 xl:grid-cols-4">
        <Stat
          title="Courses"
          value={stats?.totalCourses || 0}
          icon={<FaBookOpen />}
          color="bg-blue-50 text-blue-600"
        />

        <Stat
          title="Students"
          value={stats?.totalStudents || 0}
          icon={<FaUsers />}
          color="bg-green-50 text-green-600"
        />

        {role === "admin" && (
          <Stat
            title="Trainers"
            value={stats?.totalTeachers || 0}
            icon={<FaGraduationCap />}
            color="bg-orange-50 text-[#D6451B]"
          />
        )}

        <Stat
          title="Batches"
          value={stats?.totalBatches || 0}
          icon={<FaClock />}
          color="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Courses Grid */}
      <div className="grid gap-3.5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses?.map((course) => (
          <motion.div
            key={course._id}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail */}
              <div className="relative h-36 sm:h-48 overflow-hidden bg-gradient-to-br from-[#D6451B] to-orange-500">
                {course?.thumbnail?.url ? (
                  <img
                    src={course.thumbnail.url}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <FaBookOpen className="text-4xl sm:text-5xl text-white/50" />
                  </div>
                )}

                <span className="absolute left-3 top-3 rounded-full bg-white/95 backdrop-blur-xs px-2.5 py-0.5 text-[10px] sm:text-xs font-bold text-[#D6451B] shadow-xs">
                  {course?.category || "Course"}
                </span>

                <span
                  className={`absolute right-3 top-3 rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-bold ${
                    course?.enrollmentOpen
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {course?.enrollmentOpen ? "Open" : "Closed"}
                </span>
              </div>

              {/* Content */}
              <div className="p-3.5 sm:p-5">
                <h2 className="line-clamp-2 text-sm sm:text-base font-bold text-slate-900">
                  {capitalizeFirstLetter(course?.title)}
                </h2>

                <p className="mt-1.5 line-clamp-2 text-xs text-slate-500 min-h-[32px]">
                  {course?.shortDescription || "Structured academy curriculum."}
                </p>

                {/* Metrics */}
                <div className="mt-3.5 grid grid-cols-2 gap-2">
                  <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                    <p className="text-[10px] font-semibold text-slate-500">Price</p>
                    <p className="mt-0.5 font-extrabold text-xs sm:text-sm text-[#D6451B]">
                      ₹{course?.price || 0}
                    </p>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
                    <p className="text-[10px] font-semibold text-slate-500">Duration</p>
                    <p className="mt-0.5 font-bold text-xs sm:text-sm text-slate-800">
                      {course?.durationInMonths} Months
                    </p>
                  </div>
                </div>

                {/* Meta Pills */}
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-medium">Level: <strong className="capitalize text-slate-800">{course?.level}</strong></span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold capitalize ${
                      course?.status === "published"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                    }`}
                  >
                    {course?.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-3.5 sm:p-5 pt-0 border-t border-slate-100 mt-2 flex gap-2">
              <button
                onClick={() =>
                  router.push(
                    `/${role === "admin" ? "admin-panel" : "teacher-panel"}/batches/${course?.slug}`
                  )
                }
                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-blue-50 py-2 sm:py-2.5 text-xs font-bold text-blue-600 hover:bg-blue-100 transition"
                title="View Batches"
              >
                <FaEye className="text-xs" />
                <span>Batches</span>
              </button>

              {permission.canEdit && (
                <button
                  className="flex items-center justify-center px-3 rounded-xl bg-orange-50 py-2 sm:py-2.5 text-xs font-bold text-[#D6451B] hover:bg-orange-100 transition"
                  title="Edit Course"
                >
                  <FaEdit className="text-xs" />
                </button>
              )}

              {permission.canDelete && (
                <button
                  className="flex items-center justify-center px-3 rounded-xl bg-red-50 py-2 sm:py-2.5 text-xs font-bold text-red-600 hover:bg-red-100 transition"
                  title="Delete Course"
                >
                  <FaTrash className="text-xs" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {courses?.length === 0 && (
        <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 bg-white p-8 sm:p-14 text-center shadow-xs">
          <FaBookOpen className="mx-auto text-4xl text-[#D6451B]" />
          <h2 className="mt-3 text-lg sm:text-xl font-bold text-slate-800">
            No Courses Found
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-xs sm:text-sm text-slate-500">
            There are currently no courses created. Click below to add your first course.
          </p>
          {role === "admin" && (permission?.canAdd ?? true) && (
            <button
              onClick={() => router.push("/admin-panel/add-course")}
              className="mt-5 rounded-xl bg-[#D6451B] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-orange-600 transition"
            >
              Add Course
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function Stat({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 shadow-xs"
    >
      <div
        className={`flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl text-sm sm:text-lg font-bold ${color}`}
      >
        {icon}
      </div>

      <h2 className="mt-2.5 text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
        {value !== undefined && value !== null ? value : 0}
      </h2>

      <p className="mt-0.5 text-xs font-semibold text-slate-500 truncate">{title}</p>
    </motion.div>
  );
}
