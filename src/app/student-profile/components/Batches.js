"use client";

import BatchesSkeleton from "@/app/Skeletons/BatchSkeleton";
import { useGetStudentBatches } from "@/Hooks/useGetStudentBatches";
import { formatISTDateTime } from "@/Utils/formatDate";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FaEye } from "react-icons/fa";

export default function Batches() {
  const { data: batches, isLoading } = useGetStudentBatches();
  const router = useRouter();

  if (isLoading) return <BatchesSkeleton />;

  return (
    <div className="py-2 sm:py-4">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] via-orange-500 to-orange-400 p-4 sm:p-6 lg:p-8 text-white shadow-lg"
        >
          <div className="relative flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-100 backdrop-blur">
                Student Cohorts
              </span>

              <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                My Batches
              </h1>

              <p className="mt-2 max-w-xl text-xs sm:text-sm lg:text-base text-orange-100 font-normal leading-relaxed">
                Access your assigned cohorts, timetables, trainers, and class links.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:w-[280px] shrink-0">
              <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur">
                <p className="text-[10px] uppercase font-bold text-orange-100 tracking-wider">
                  Batches
                </p>
                <h3 className="mt-1 text-xl sm:text-2xl font-extrabold">
                  {batches?.length || 0}
                </h3>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur">
                <p className="text-[10px] uppercase font-bold text-orange-100 tracking-wider">
                  Active
                </p>
                <h3 className="mt-1 text-xl sm:text-2xl font-extrabold">
                  {batches?.filter((b) => b.status === "active").length || 0}
                </h3>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-3.5 sm:gap-6 sm:grid-cols-2 2xl:grid-cols-3 w-full min-w-0">
          {batches?.map((batch) => (
            <motion.div
              key={batch._id}
              whileHover={{ y: -3 }}
              className="w-full min-w-0 max-w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="w-full min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-2.5 w-full min-w-0">
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm sm:text-base font-bold text-slate-900" title={batch.name}>
                      {batch.name}
                    </h2>
                    <p className="mt-0.5 text-xs text-slate-500 truncate" title={batch.course?.title}>
                      {batch.course?.title}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] sm:text-xs font-semibold ${
                      batch.status === "active"
                        ? "bg-green-100 text-green-700"
                        : batch.status === "completed"
                        ? "bg-blue-100 text-blue-700"
                        : batch.status === "cancelled"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {batch.status}
                  </span>
                </div>

                {/* Enrollment */}
                <div className="mt-2.5 flex flex-wrap gap-1.5 min-w-0">
                  <span
                    className={`inline-block max-w-full truncate rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                      batch.enrollmentOpen
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {batch.enrollmentOpen ? "Enrollment Open" : "Enrollment Closed"}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-2.5 min-h-[32px] text-xs text-slate-500 line-clamp-2 break-words">
                  {batch.description || "No description available"}
                </p>

                {/* Stats */}
                <div className="mt-3.5 grid grid-cols-2 gap-2 w-full min-w-0">
                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 min-w-0">
                    <p className="text-[10px] font-semibold text-slate-500 truncate">Students</p>
                    <p className="mt-0.5 font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {batch.students?.length || 0} / {batch.maxStudents}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 min-w-0">
                    <p className="text-[10px] font-semibold text-slate-500 truncate">Trainers</p>
                    <p className="mt-0.5 font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {batch.trainers?.length || 0}
                    </p>
                  </div>
                </div>

                {/* Schedule */}
                <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 sm:p-3 w-full min-w-0">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase">Schedule</p>
                  <p className="mt-0.5 font-bold text-xs text-slate-900 truncate" title={batch?.schedule?.days?.length ? batch.schedule.days.join(", ") : "Schedule Not Set"}>
                    {batch?.schedule?.days?.length
                      ? batch.schedule.days.join(", ")
                      : "Schedule Not Set"}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500 truncate">
                    {batch?.schedule?.startTime || "--"} - {batch?.schedule?.endTime || "--"}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 border-t border-slate-100 pt-3 w-full min-w-0">
                <button
                  onClick={() =>
                    router.push(`/student-profile/classes?batchId=${batch._id}`)
                  }
                  className="flex h-10 w-full min-w-0 items-center justify-center gap-2 rounded-xl bg-[#D6451B] px-3 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-[#b93814] active:scale-[0.98]"
                >
                  <FaEye className="text-xs shrink-0" />
                  <span className="truncate">View Batch & Classes</span>
                </button>
              </div>
            </motion.div>
          ))}

          {batches?.length === 0 && (
            <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center sm:col-span-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                No Batches Assigned
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500">
                Your assigned batches and live classes will appear here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
