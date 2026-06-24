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
  <div className="min-h-screen bg-slate-50">
  <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
    <div className="space-y-6 sm:space-y-8">

      {/* Header */}

    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: .4 }}
  className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#D6451B] via-orange-500 to-orange-400 p-6 shadow-xl sm:p-8 lg:p-10"
>
  <div className="absolute inset-0">
    <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
    <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-orange-300/20 blur-3xl" />
  </div>

  <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
    <div>
      <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-orange-100 backdrop-blur">
        Student Dashboard
      </span>

      <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
        My Batches
      </h1>

      <p className="mt-3 max-w-xl text-sm leading-7 text-orange-100 sm:text-base">
        Access your assigned batches, schedules, trainers and class information.
      </p>
    </div>

    <div className="grid grid-cols-2 gap-3 sm:w-[320px]">
      <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur">
        <p className="text-xs uppercase text-orange-100">
          Batches
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
              batch => batch.status === "active"
            ).length || 0
          }
        </h3>
      </div>
    </div>
  </div>
</motion.div>

      {/* Cards */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 2xl:grid-cols-3">
          
            {batches
              ?.map((batch) => (
    
              <motion.div
      key={batch._id}
      whileHover={{ y: -4 }}
     className="
group
rounded-3xl
border
border-slate-200
bg-white
p-5
shadow-sm
transition-all
duration-300
hover:-translate-y-1
hover:border-orange-200
hover:shadow-xl
sm:p-6
"
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
          className={`shrink-0 rounded-xl px-3 py-1 text-xs font-semibold ${
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
          className={`rounded-xl px-3 py-1 text-xs font-medium ${
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
<p className="mt-5 min-h-[48px] text-sm leading-6 text-slate-500 line-clamp-2">
        {batch.description ||
          "No description available"}
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
      <div className="
mt-5
grid
grid-cols-2
gap-3
rounded-2xl
border
border-slate-100
bg-slate-50
p-4
">
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
      <div className="
mt-5
rounded-2xl
border
border-slate-100
bg-slate-50
p-5
">
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
mt-2
flex
h-12
w-full
items-center
justify-center
gap-2
rounded-2xl
bg-[#D6451B]
font-semibold
text-white
transition-all
hover:bg-[#b93814]
active:scale-[0.98]
"
  >
    <FaEye />
    View Batch
  </button>
</div>
    </motion.div>
    
              ))}
              {batches?.length === 0 && (
  <div className="rounded-3xl border border-slate-200 bg-white py-16 text-center shadow-sm">
    <h2 className="text-2xl font-bold">
      No Batches Assigned
    </h2>

    <p className="mt-2 text-slate-500">
      Your assigned batches will appear here.
    </p>
  </div>
)}
    
          </div>

    </div></div></div>
  );
}

