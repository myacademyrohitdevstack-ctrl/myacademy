"use client";

import { useMarkAttendence } from "@/app/mutations/Attendence";
import { useGetBatchStudents } from "@/Hooks/useGetBatchStudents";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaClipboardCheck,
  FaSave,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

export default function AttendancePage() {
    const searchParmas=useSearchParams()
    const batchId=searchParmas.get("batchId")
        const {data}=useGetBatchStudents(batchId)
        const markAtttendenceMutation=useMarkAttendence()
        const [date, setDate] = useState(
  new Date().toISOString().split("T")[0]
);
  const [students, setStudents] = useState([]);
  useEffect(()=>{
    if(!data) return
 setStudents(data)
  },[batchId,data])

  const handleStatusChange = (id, status) => {
    setStudents((prev) =>
      prev.map((student) =>
        student._id === id
          ? { ...student, status }
          : student
      )
    );
  };

  const markAllPresent = () => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        status: "present",
      }))
    );
  };

  const markAllAbsent = () => {
    setStudents((prev) =>
      prev.map((student) => ({
        ...student,
        status: "absent",
      }))
    );
  };

  const presentCount = students.filter(
    (s) => s.status === "present"
  ).length;

  const absentCount = students.filter(
    (s) => s.status === "absent"
  ).length;

 const handleSubmit = async () => {

    const payload = {
      batch: batchId,
      date,
      records: students.map((student) => ({
        student: student._id,
        status: student.status,
      })),
    };


  await markAtttendenceMutation.mutateAsync(payload)

 
};
  useEffect(() => {
  if (!data) return;

  setStudents(
    data.map((student) => ({
      ...student,
      status: "present",
    }))
  );
}, [data]);

  return (
    <div className="min-h-screen bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Hero */}

     <div className="rounded-[32px] bg-gradient-to-r from-[#D6451B] to-orange-500 p-6 text-white shadow-xl lg:p-8">
  <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

    {/* Left Side */}
    <div>
      <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-medium">
        Attendance Management
      </span>

      <h1 className="mt-4 text-3xl font-bold lg:text-5xl">
        Spoken English Mastery
      </h1>

      <p className="mt-2 text-orange-100 text-lg">
        Weekend Batch
      </p>
    </div>

    {/* Right Side */}
    <div className="grid grid-cols-2 gap-4 lg:min-w-[380px]">
      <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
        <p className="text-sm text-orange-100">
          Total Students
        </p>
        <h3 className="mt-1 text-3xl font-bold">
          {students.length}
        </h3>
      </div>

      <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
        <p className="text-sm text-orange-100">
          Present Today
        </p>
        <h3 className="mt-1 text-3xl font-bold">
          {presentCount}
        </h3>
      </div>

      <div className="col-span-2">
       <input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  className="
    w-full rounded-2xl
    border border-white/20
    bg-white/10
    px-4 py-3
    text-white
    outline-none
    backdrop-blur-sm
    [color-scheme:dark]
  "
/>
      </div>
    </div>

  </div>
</div>

        {/* Stats */}

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <StatCard
            title="Total Students"
            value={students.length}
          />

          <StatCard
            title="Present"
            value={presentCount}
          />

          <StatCard
            title="Absent"
            value={absentCount}
          />
        </div>

        {/* Actions */}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            onClick={markAllPresent}
            className="
              rounded-xl bg-green-600
              px-5 py-3
              font-medium text-white
              transition hover:bg-green-700 placeholder:text-white
            "
          >
            Mark All Present
          </button>

          <button
            onClick={markAllAbsent}
            className="
              rounded-xl bg-red-600
              px-5 py-3
              font-medium text-white
              transition hover:bg-red-700
            "
          >
            Mark All Absent
          </button>
        </div>

        {/* Students */}

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm lg:p-6">

          <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="text-xl font-bold sm:text-2xl">
              Students
            </h2>

            <input
              type="text"
              placeholder="Search student..."
              className="
                w-full rounded-xl
                border border-slate-200
                px-4 py-3
                outline-none
                transition
                focus:border-[#D6451B]
                lg:w-80
              "
            />
          </div>

          <div className="space-y-4">
            {students?.map((student) => (
              <div
                key={student?._id}
                className="
                  rounded-2xl border border-slate-200
                  bg-white p-4 shadow-sm
                  transition-all duration-300
                  hover:border-[#D6451B]
                  hover:shadow-md
                  lg:flex lg:items-center lg:justify-between
                "
              >
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {student?.fullName}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {student?.email}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 lg:mt-0 lg:w-[260px]">
                  <button
                    onClick={() =>
                      handleStatusChange(
                        student._id,
                        "present"
                      )
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium transition ${
                      student.status === "present"
                        ? "bg-green-600 text-white"
                        : "bg-green-50 text-green-600"
                    }`}
                  >
                    <FaCheck />
                    Present
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(
                        student._id,
                        "absent"
                      )
                    }
                    className={`flex items-center justify-center gap-2 rounded-xl py-3 px-3 text-sm font-medium transition ${
                      student.status === "absent"
                        ? "bg-red-600 text-white"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    <FaTimes />
                    Absent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save */}

        <div className="sticky bottom-4 z-20 mt-6 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={markAtttendenceMutation.isPending}
            className="
              flex w-full items-center justify-center gap-2
              rounded-2xl bg-[#D6451B]
              px-8 py-4
              font-semibold text-white
              shadow-lg
              transition hover:bg-[#bf3b14]
              sm:w-auto
            "
          >
            <FaSave />
           {!markAtttendenceMutation.isPending? "Save Attendance":"Saving...."}
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-[#D6451B] lg:h-14 lg:w-14">
        <FaClipboardCheck />
      </div>

      <h2 className="mt-4 text-3xl font-bold lg:text-4xl">
        {value}
      </h2>

      <p className="mt-2 text-slate-500">
        {title}
      </p>
    </div>
  );
}