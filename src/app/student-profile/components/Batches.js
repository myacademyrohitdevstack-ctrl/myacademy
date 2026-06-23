"use client";

import { useGetStudentBatches } from "@/Hooks/useGetStudentBatches";
import { formatISTDateTime } from "@/Utils/formatDate";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {

  FaEye,
} from "react-icons/fa";



export default function Batches() {
  const {data:batches,isLoading}=useGetStudentBatches()
  const router=useRouter()
  if(isLoading) return
  return (
    <div className="max-w-6xl mx-auto">
    <div className="space-y-8">

      {/* Header */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[32px] bg-gradient-to-r from-[#D6451B] to-orange-500 p-8 text-white shadow-xl"
      >
        <h1 className="text-4xl font-bold">
          My Batches
        </h1>

        <p className="mt-3 text-orange-100">
          View your assigned batches, trainers, schedules and attendance.
        </p>
      </motion.div>

      {/* Cards */}

      <div className="grid gap-7 lg:grid-cols-2 xl:grid-cols-3">
          
            {batches
              ?.map((batch) => (
    
              <motion.div
      key={batch._id}
      whileHover={{ y: -4 }}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-xl"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-xl font-bold text-slate-900">
            {batch.name}
          </h2>
    
          <p className="mt-1 text-sm text-slate-500">
            {batch.course?.title}
          </p>
        </div>
    
        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
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
      <div className="mt-3">
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            batch.enrollmentOpen
              ? "bg-blue-100 text-blue-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {batch.enrollmentOpen
            ? "Enrollment Open"
            : "Enrollment Closed"}
        </span>
      </div>
    
      {/* Description */}
      <p className="mt-4 line-clamp-2 text-sm text-slate-500">
        {batch.description ||
          "No description available"}
      </p>
    
      {/* Stats */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">
            Students
          </p>
    
          <p className="mt-1 font-semibold text-slate-900">
            {batch.students?.length || 0}/
            {batch.maxStudents}
          </p>
        </div>
    
        <div className="rounded-2xl bg-slate-50 p-3">
          <p className="text-xs text-slate-500">
            Trainers
          </p>
    
          <p className="mt-1 font-semibold text-slate-900">
            {batch.trainers?.length || 0}
          </p>
        </div>
      </div>
    
      {/* Dates */}
      <div className="mt-4 flex justify-between rounded-2xl bg-slate-50 p-3">
        <div>
          <p className="text-xs text-slate-500">
            Start Date
          </p>
    
          <p className="mt-1 text-sm font-medium">
            {formatISTDateTime(batch.startDate).split(",")[0]}
          </p>
        </div>
    
        <div className="text-right">
          <p className="text-xs text-slate-500">
            End Date
          </p>
    
          <p className="mt-1 text-sm font-medium">
          {formatISTDateTime(batch.endDate).split(",")[0]}
          </p>
        </div>
      </div>
    
      {/* Schedule */}
      <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-xs text-slate-500">
          Schedule
        </p>
    
        <p className="mt-1 font-medium text-slate-900">
          {batch?.schedule?.days?.length
            ? batch.schedule.days.join(", ")
            : "Schedule Not Set"}
        </p>
    
        <p className="mt-2 text-sm text-slate-500">
          {batch?.schedule?.startTime || "--"}
          {" - "}
          {batch?.schedule?.endTime || "--"}
        </p>
    
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Platform
          </span>
    
          <span className="rounded-lg bg-white px-2 py-1 text-sm font-medium capitalize">
            {batch.meetingPlatform}
          </span>
        </div>
      </div>
    
      {/* Actions */}
      <div className="mt-5 border-t border-slate-100 pt-4">
  <button
    onClick={() =>
      router.push(
        `/student-profile/classes?batchId=${batch._id}`
      )
    }
    className="
      flex w-full items-center justify-center gap-2
      rounded-xl
      bg-blue-50
      py-3
      font-medium
      text-blue-600
      transition
      hover:bg-blue-100
    "
  >
    <FaEye />
    View Batch
  </button>
</div>
    </motion.div>
    
              ))}
    
          </div>

    </div></div>
  );
}

function Info({ icon, title, value }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B]">
        {icon}
      </div>

      <div>

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h3 className="font-semibold">
          {value}
        </h3>

      </div>

    </div>
  );
}