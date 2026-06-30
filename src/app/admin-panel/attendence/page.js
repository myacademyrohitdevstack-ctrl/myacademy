"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

import {
  FaArrowLeft,
  FaClipboardCheck,
  FaSearch,
  FaUserGraduate,
  FaCheckCircle,
  FaTimesCircle,
  FaUsers,
  FaEdit,
} from "react-icons/fa";

import Loading from "@/app/Components/ui/Loading";
import { formatISTDateTime } from "@/Utils/formatDate";
import { useGetAttendanceById } from "@/Hooks/useGetAttendenceById";
import { useUpdateAttendance } from "@/app/mutations/Attendence";


export default function AttendancePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const attendanceId = searchParams.get("attendanceId");

  const { data, isLoading } =
    useGetAttendanceById(attendanceId);

  const attendance = data?.attendance;

  const [search, setSearch] = useState("");
const updateAttendance=useUpdateAttendance(attendanceId)


  const records = attendance?.records || [];



const present = records.filter(
  (r) => r.status === "present"
).length;

const absent = records.filter(
  (r) => r.status === "absent"
).length;

const totalStudents = records.length;

const percentage =
  totalStudents === 0
    ? 0
    : Math.round((present / totalStudents) * 100);

  const filteredStudents = useMemo(() => {
    return records.filter((item) =>
      item.student?.fullName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [records, search]);

  const updateStatus = (studentId, status) => {
  const updatedRecords = records.map((record) =>
    record.student._id === studentId
      ? {
          ...record,
          status,
        }
      : record
  );

  updateAttendance.mutate(
    {
      records: updatedRecords.map((r) => ({
        student: r.student._id,
        status: r.status,
     
      })),
    },
   
  );
};
    if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50 py-28">
      <div className="mx-auto max-w-7xl space-y-6 px-4 sm:px-6 lg:px-8">
                {/* Back */}

        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 font-medium text-[#D6451B] hover:opacity-80"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* Hero */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="
            rounded-[32px]
            bg-gradient-to-r
            from-[#D6451B]
            to-orange-500
            p-8
            text-white
            shadow-xl
          "
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
                Attendance Details
              </span>

              <h1 className="mt-5 text-4xl font-bold">
                {attendance?.batch?.name || "Batch Attendance"}
              </h1>

              <p className="mt-3 text-orange-100">
                {formatISTDateTime(attendance?.date)}
              </p>

              <p className="mt-2 text-sm text-orange-200">
                Marked by{" "}
                <span className="font-semibold text-white">
                  {attendance?.markedBy?.fullName}
                </span>
              </p>

            </div>

            <div className="rounded-2xl bg-white/20 p-5">

              <p className="text-sm text-orange-100">
                Attendance
              </p>

              <h2 className="mt-2 text-5xl font-bold">
                {percentage}%
              </h2>

              <p className="mt-2 text-sm text-orange-100">
                {present} of {totalStudents} Students Present
              </p>

            </div>

          </div>
        </motion.div>

        {/* Stats */}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Students"
            value={totalStudents}
            icon={<FaUsers />}
            color="bg-blue-50 text-blue-600"
          />

          <StatCard
            title="Present"
            value={present}
            icon={<FaCheckCircle />}
            color="bg-green-50 text-green-600"
          />

          <StatCard
            title="Absent"
            value={absent}
            icon={<FaTimesCircle />}
            color="bg-red-50 text-red-600"
          />

          <StatCard
            title="Attendance"
            value={`${percentage}%`}
            icon={<FaClipboardCheck />}
            color="bg-orange-50 text-[#D6451B]"
          />

        </div>

        {/* Search */}

        <div className="rounded-3xl border bg-white p-5 shadow-sm">

          <div className="relative">

            <FaSearch className="absolute left-4 top-4 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search student..."
              className="
                w-full
                rounded-xl
                border
                py-3
                pl-12
                pr-4
                outline-none
                transition
                focus:border-[#D6451B]
              "
            />

          </div>

        </div>
        {/* Student List */}

<div className="space-y-6">

  {/* Mobile Cards */}

  <div className="space-y-5 lg:hidden">

    {filteredStudents.length > 0 ? (

      filteredStudents.map((record) => (

        <motion.div
          key={record.student._id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >

          {/* Header */}

          <div className="bg-gradient-to-r from-orange-50 to-white p-5">

            <div className="flex items-start gap-4">

              {record.student?.profileImage?.url ? (

                <img
                  src={record.student.profileImage.url}
                  alt={record.student.fullName}
                  className="h-16 w-16 rounded-2xl object-cover"
                />

              ) : (

                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-orange-100
                    text-[#D6451B]
                  "
                >
                  <FaUserGraduate className="text-3xl" />
                </div>

              )}

              <div className="min-w-0 flex-1">

                <h3 className="truncate text-lg font-bold">
                  {record.student.fullName}
                </h3>

                <p className="truncate text-sm text-slate-500">
                  {record.student.email}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {record.student.phone || "-"}
                </p>

              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  record.status === "present"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {record.status}
              </span>

            </div>

          </div>

          {/* Details */}

          <div className="space-y-4 p-5">

            <div className="grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs text-slate-500">
                  Roll Number
                </p>

                <p className="mt-1 font-semibold">
                  {record.student.rollNumber || "-"}
                </p>

              </div>

              <div className="rounded-2xl bg-slate-50 p-4">

                <p className="text-xs text-slate-500">
                  Status
                </p>

                <p
                  className={`mt-1 font-semibold ${
                    record.status === "present"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {record.status}
                </p>

              </div>

            </div>

           

           <button
  disabled={updateAttendance.isPending}
  onClick={() =>
    updateStatus(
      record.student._id,
      record.status === "present"
        ? "absent"
        : "present"
    )
  }
  className={`rounded-xl px-4 py-2 font-medium transition ${
    record.status === "present"
      ? "bg-red-50 text-red-600 hover:bg-red-100"
      : "bg-green-50 text-green-600 hover:bg-green-100"
  } ${
    updateAttendance.isPending
      ? "cursor-not-allowed opacity-60"
      : ""
  }`}
>
  {record.status === "present"
    ? "Mark Absent"
    : "Mark Present"}
</button>

          </div>

        </motion.div>

      ))

    ) : (

      <EmptyState />

    )}

  </div>
  {/* Desktop Table */}

{/* Desktop Table */}

<div className="hidden  lg:block">

  <div className="overflow-hidden w-fit rounded-[28px] border border-slate-200 bg-white shadow-lg">

    <div className="overflow-x-auto">

      <table className="min-w-full">

        <thead className="sticky top-0 bg-slate-50">

          <tr className="border-b border-slate-200">

            <th className="px-8 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
              Student
            </th>

            <th className="px-6 py-5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
              Phone
            </th>


            <th className="px-6 py-5 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
              Status
            </th>

        

            <th className="px-8 py-5 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredStudents.length > 0 ? (

            filteredStudents.map((record) => (

              <tr
                key={record.student._id}
                className="
                  border-b
                  border-slate-100
                  transition-all
                  duration-200
                  hover:bg-orange-50/40
                "
              >

                {/* Student */}

                <td className="px-8 py-5">

                  <div className="flex items-center gap-4">

                    {record.student?.profileImage?.url ? (

                      <img
                        src={record.student.profileImage.url}
                        alt={record.student.fullName}
                        className="h-14 w-14 rounded-2xl object-cover shadow-sm"
                      />

                    ) : (

                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          bg-orange-100
                          text-xl
                          text-[#D6451B]
                        "
                      >
                        <FaUserGraduate />
                      </div>

                    )}

                    <div>

                      <h3 className="font-semibold text-slate-900">
                        {record.student.fullName}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        {record.student.email}
                      </p>

                    </div>

                  </div>

                </td>

                {/* Phone */}

                <td className="px-6 py-5 text-sm text-slate-700">

                  {record.student.phone || "-"}

                </td>

                

                {/* Status */}

                <td className="px-6 py-5 text-center">

                  <span
                    className={`inline-flex rounded-full px-4 py-2 text-xs font-semibold ${
                      record.status === "present"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {record.status}
                  </span>

                </td>

                {/* Remark */}

                

                {/* Action */}

                <td className="px-8 py-5 text-right">

                <div className="flex justify-end">



    <button
  disabled={updateAttendance.isPending}
  onClick={() =>
    updateStatus(
      record.student._id,
      record.status === "present"
        ? "absent"
        : "present"
    )
  }
  className={`rounded-xl px-4 py-2 font-medium transition ${
    record.status === "present"
      ? "bg-red-50 text-red-600 hover:bg-red-100"
      : "bg-green-50 text-green-600 hover:bg-green-100"
  } ${
    updateAttendance.isPending
      ? "cursor-not-allowed opacity-60"
      : ""
  }`}
>
  {record.status === "present"
    ? "Mark Absent"
    : "Mark Present"}
</button>



  

</div>

                </td>

              </tr>

            ))

          ) : (

            <tr>

              <td
                colSpan={6}
                className="py-20 text-center"
              >

                <div className="flex flex-col items-center">

                  <FaClipboardCheck className="text-5xl text-slate-300" />

                  <h3 className="mt-4 text-lg font-semibold text-slate-700">
                    No Students Found
                  </h3>

                  <p className="mt-2 text-slate-500">
                    No attendance records match your search.
                  </p>

                </div>

              </td>

            </tr>

          )}

        </tbody>

      </table>

    </div>

  </div>

</div>
{/* Attendance Summary */}

<div className="grid gap-6 lg:grid-cols-2">

  {/* Summary */}

  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

    <h2 className="text-xl font-bold">
      Attendance Summary
    </h2>

    {/* Present */}

    <div className="mt-6">

      <div className="mb-2 flex items-center justify-between">

        <span className="font-medium text-green-600">
          Present
        </span>

        <span className="font-semibold">
          {present} / {totalStudents}
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-green-500"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>

    {/* Absent */}

    <div className="mt-6">

      <div className="mb-2 flex items-center justify-between">

        <span className="font-medium text-red-600">
          Absent
        </span>

        <span className="font-semibold">
          {absent} / {totalStudents}
        </span>

      </div>

      <div className="h-3 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-red-500"
          style={{
            width: `${100 - percentage}%`,
          }}
        />

      </div>

    </div>

    <div className="mt-8 rounded-2xl bg-orange-50 p-5">

      <p className="text-sm text-slate-500">
        Overall Attendance
      </p>

      <h3 className="mt-2 text-5xl font-bold text-[#D6451B]">
        {percentage}%
      </h3>

    </div>

  </div>

  {/* Information */}

  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

    <h2 className="text-xl font-bold">
      Attendance Information
    </h2>

    <div className="mt-6 space-y-5">

      <div className="flex items-center justify-between border-b pb-4">

        <span className="text-slate-500">
          Batch
        </span>

        <strong>
          {attendance?.batch?.name || "-"}
        </strong>

      </div>

      <div className="flex items-center justify-between border-b pb-4">

        <span className="text-slate-500">
          Date
        </span>

        <strong>
          {formatISTDateTime(attendance?.date)}
        </strong>

      </div>

      <div className="flex items-center justify-between border-b pb-4">

        <span className="text-slate-500">
          Marked By
        </span>

        <strong>
          {attendance?.markedBy?.fullName}
        </strong>

      </div>

      <div className="flex items-center justify-between border-b pb-4">

        <span className="text-slate-500">
          Created
        </span>

        <strong>
          {formatISTDateTime(attendance?.createdAt)}
        </strong>

      </div>

      <div className="flex items-center justify-between">

        <span className="text-slate-500">
          Last Updated
        </span>

        <strong>
          {formatISTDateTime(attendance?.updatedAt)}
        </strong>

      </div>

    </div>
    </div>

  </div>

</div>
{/* Quick Insights */}

<div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

  <div className="flex items-center justify-between">

    <div>

      <h2 className="text-xl font-bold">
        Quick Insights
      </h2>

      <p className="mt-1 text-slate-500">
        Snapshot of this attendance record.
      </p>

    </div>

    <div
      className={`
        rounded-2xl px-5 py-3 text-center
        ${
          percentage >= 90
            ? "bg-green-100 text-green-700"
            : percentage >= 75
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }
      `}
    >
      <p className="text-xs uppercase">
        Performance
      </p>

      <h3 className="text-2xl font-bold">
        {percentage >= 90
          ? "Excellent"
          : percentage >= 75
          ? "Good"
          : "Needs Improvement"}
      </h3>

    </div>

  </div>

  <div className="mt-8 grid gap-5 md:grid-cols-3">

    <div className="rounded-2xl bg-slate-50 p-5">

      <p className="text-sm text-slate-500">
        Present Students
      </p>

      <h3 className="mt-2 text-3xl font-bold text-green-600">
        {present}
      </h3>

    </div>

    <div className="rounded-2xl bg-slate-50 p-5">

      <p className="text-sm text-slate-500">
        Absent Students
      </p>

      <h3 className="mt-2 text-3xl font-bold text-red-600">
        {absent}
      </h3>

    </div>

    <div className="rounded-2xl bg-slate-50 p-5">

      <p className="text-sm text-slate-500">
        Total Students
      </p>

      <h3 className="mt-2 text-3xl font-bold text-[#D6451B]">
        {totalStudents}
      </h3>

    </div>

  </div>

</div>

      </div>
    </div>
  );
}
/* ------------------------------------------------ */
/*                  Empty State                     */
/* ------------------------------------------------ */

function EmptyState() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="
        flex
        flex-col
        items-center
        justify-center
        rounded-[32px]
        border-2
        border-dashed
        border-slate-300
        bg-white
        px-6
        py-20
        text-center
      "
    >
      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-orange-100
        "
      >
        <FaClipboardCheck className="text-3xl text-[#D6451B]" />
      </div>

      <h3 className="mt-6 text-2xl font-bold text-slate-800">
        No Students Found
      </h3>

      <p className="mt-3 max-w-md text-slate-500">
        No attendance records matched your search. Try a different
        student name or clear the search box.
      </p>
    </motion.div>
  );
}
/* ------------------------------------------------ */
/*                     Stat Card                    */
/* ------------------------------------------------ */

function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.02,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        rounded-[30px]
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        transition-all
        hover:shadow-lg
      "
    >
      <div
        className={`
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-2xl
          text-2xl
          ${color}
        `}
      >
        {icon}
      </div>

      <h2 className="mt-6 text-4xl font-bold text-slate-900">
        {value}
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        {title}
      </p>
    </motion.div>
  );
}