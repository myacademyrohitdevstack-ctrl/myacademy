"use client";

import { motion } from "framer-motion";
import {
  FaLayerGroup,
  FaPlus,
  FaUsers,
  FaChalkboardTeacher,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useAdminGetAllBatches } from "@/Hooks/useAdminGetBatches";
import { useRouter } from "next/navigation";
import BatchesSkeleton from "@/app/Skeletons/BatchSkeleton";
import useAuthStore from "@/store/authStore";

export default function BatchesClient({ slug, permissions = {} }) {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { data: batches, isLoading } = useAdminGetAllBatches(slug);

  if (isLoading) return <BatchesSkeleton />;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4 sm:space-y-6 px-1 sm:px-6 lg:px-8 min-w-0">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full min-w-0 overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg"
      >
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between min-w-0">
          <div className="min-w-0">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Batch Management
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Manage Batches
            </h1>

            <p className="mt-2 text-xs sm:text-sm lg:text-base max-w-2xl text-orange-100 leading-relaxed font-normal">
              Create and manage classroom & online cohorts, assign trainers, schedule timings and monitor student progress.
            </p>
          </div>

          <button
            onClick={() => router.push("/admin-panel/add-batch")}
            className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#D6451B] shadow-xs hover:bg-orange-50 transition shrink-0 self-start lg:self-auto"
          >
            <FaPlus className="text-xs" />
            <span>Create Batch</span>
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 sm:grid-cols-3 w-full min-w-0">
        <Stat
          title="Total Batches"
          value={batches?.length || 0}
          icon={<FaLayerGroup />}
          color="bg-orange-50 text-[#D6451B]"
        />

        <Stat
          title="Students"
          value={
            batches?.reduce((sum, batch) => sum + (batch?.students?.length || 0), 0) || 0
          }
          icon={<FaUsers />}
          color="bg-green-50 text-green-600"
        />

        <Stat
          className="col-span-2 sm:col-span-1"
          title="Trainers"
          value={
            batches?.reduce((sum, batch) => sum + (batch?.trainers?.length || 0), 0) || 0
          }
          icon={<FaChalkboardTeacher />}
          color="bg-purple-50 text-purple-600"
        />
      </div>

      {/* Batch Cards */}
      <div className="grid grid-cols-1 gap-3.5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 w-full min-w-0">
        {batches?.map((batch) => (
          <motion.div
            key={batch._id}
            whileHover={{ y: -4 }}
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

              {/* Enrollment Pill */}
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
              <p className="mt-2.5 line-clamp-2 text-xs text-slate-500 min-h-[32px] break-words">
                {batch.description || "No description available"}
              </p>

              {/* Stats */}
              <div className="mt-3.5 grid grid-cols-2 gap-2 w-full min-w-0">
                <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100 min-w-0">
                  <p className="text-[10px] font-semibold text-slate-500 truncate">Students</p>
                  <p className="mt-0.5 font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {batch.students?.length || 0} / {batch.maxStudents}
                  </p>
                </div>

                <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100 min-w-0">
                  <p className="text-[10px] font-semibold text-slate-500 truncate">Trainers</p>
                  <p className="mt-0.5 font-bold text-xs sm:text-sm text-slate-900 truncate">
                    {batch.trainers?.length || 0}
                  </p>
                </div>
              </div>

              {/* Schedule */}
              <div className="mt-3 rounded-xl border border-slate-100 bg-slate-50/70 p-2.5 sm:p-3 w-full min-w-0">
                <p className="text-[10px] font-semibold text-slate-400 uppercase">Schedule</p>
                <p className="mt-0.5 font-bold text-xs text-slate-900 truncate" title={batch?.schedule?.days?.length ? batch.schedule.days.join(", ") : "Flexible Days"}>
                  {batch?.schedule?.days?.length
                    ? batch.schedule.days.join(", ")
                    : "Flexible Days"}
                </p>
                <p className="mt-0.5 text-xs text-slate-500 truncate">
                  {batch?.schedule?.startTime || "--"} - {batch?.schedule?.endTime || "--"}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 w-full min-w-0">
              <button
                onClick={() =>
                  router.push(
                    `/${user?.role || "admin"}-panel/batches/${slug}/batch?batchId=${batch._id}`
                  )
                }
                className="flex flex-1 min-w-0 items-center justify-center gap-1.5 rounded-xl bg-blue-50 py-2 sm:py-2.5 px-2 text-xs font-bold text-blue-600 transition hover:bg-blue-100"
              >
                <FaEye className="text-xs shrink-0" />
                <span className="truncate">Details</span>
              </button>

              {permissions.canEdit && (
                <button
                  onClick={() =>
                    router.push(
                      `/admin-panel/batches/${slug}/edit-batch?batchId=${batch._id}`
                    )
                  }
                  className="shrink-0 flex items-center justify-center px-3 rounded-xl bg-orange-50 py-2 sm:py-2.5 text-xs font-bold text-[#D6451B] transition hover:bg-orange-100"
                  title="Edit Batch"
                >
                  <FaEdit className="text-xs" />
                </button>
              )}

              {permissions.canDelete && (
                <button
                  className="shrink-0 flex items-center justify-center px-3 rounded-xl bg-red-50 py-2 sm:py-2.5 text-xs font-bold text-red-600 transition hover:bg-red-100"
                  title="Delete Batch"
                >
                  <FaTrash className="text-xs" />
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {(!batches || batches?.length === 0) && (
        <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 bg-white p-8 sm:p-14 text-center shadow-xs">
          <FaLayerGroup className="mx-auto text-4xl text-[#D6451B]" />
          <h2 className="mt-3 text-lg sm:text-xl font-bold text-slate-900">
            No Batches Found
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-xs sm:text-sm text-slate-500">
            There are currently no batches configured. Create your first batch to start assigning students.
          </p>
        </div>
      )}
    </div>
  );
}

function Stat({ title, value, icon, color, className = "" }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className={`rounded-xl sm:rounded-2xl border border-slate-200/90 bg-white p-3 sm:p-4 shadow-xs min-w-0 overflow-hidden ${className}`}
    >
      <div
        className={`flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl text-sm sm:text-lg font-bold shrink-0 ${color}`}
      >
        {icon}
      </div>

      <h2 className="mt-2.5 text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight truncate">
        {value !== undefined && value !== null ? value : 0}
      </h2>

      <p className="mt-0.5 text-xs font-semibold text-slate-500 truncate">{title}</p>
    </motion.div>
  );
}
