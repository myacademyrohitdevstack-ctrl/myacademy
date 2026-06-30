"use client";

import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaSearch,
  FaPlus,
  FaUsers,
  FaUserGraduate,
  FaCheckCircle,
  FaClock,
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import Link from "next/link";
import { useAdminStudent } from "@/Hooks/useAdminStudents";
import useDebounce from "@/Hooks/useDebounce";
import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";
import { useRouter } from "next/navigation";
import { useAdminDeleteUser } from "@/app/mutations/AdminMutations";

export default function Students() {
  const router=useRouter()
  const [page,setPage]=useState(1)
  const [search, setSearch] = useState("");
const [filters, setFilters] = useState({
  search: "",
  status: "",
  approvalStatus: "",
  role:""
});
const deleteUserMutation=useAdminDeleteUser()
  const debouncedSearch = useDebounce(search, 500);
  const {data,isLoading}=useAdminStudent(page,filters.search,filters.status,filters.approvalStatus,filters.role)
  const users=data?.users || []
  const pagination=data?.pagination || {}
useEffect(() => {
  setFilters(prev=>({...prev,search:debouncedSearch}))
}, [debouncedSearch]);

  if(isLoading) return
  return (
    <div className="space-y-8 mx-auto max-w-7xl py-24 px-4 md:px-0">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] bg-gradient-to-r from-[#D6451B] to-orange-500 p-8 text-white shadow-xl"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
              Student Management
            </span>

            <h1 className="mt-6 text-4xl font-bold">
              Manage Students
            </h1>

            <p className="mt-3 max-w-2xl text-orange-100">
              Add new students, update their information, assign courses,
              manage batches and monitor learning progress.
            </p>

          </div>

          <Link href="/admin-panel/add-student" className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 font-semibold text-[#D6451B] hover:scale-105 transition">

            <FaPlus />

            Add Student

          </Link>

        </div>

      </motion.div>

    

      {/* Filters */}

      <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg">

        <div className="grid gap-4 lg:grid-cols-4">

          <div className="relative">

            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search students..."
              className="w-full rounded-2xl border border-slate-200 py-3 pl-12 pr-4 outline-none focus:border-[#D6451B]"
            />

          </div>

          <select className="rounded-2xl border border-slate-200 p-3 outline-none">

            <option>All Courses</option>

            <option>General English</option>

            <option>IELTS</option>

            <option>Business English</option>

          </select>

          <select className="rounded-2xl border border-slate-200 p-3 outline-none">

            <option>All Batches</option>

            <option>Morning</option>

            <option>Evening</option>

            <option>Weekend</option>

          </select>

          <select className="rounded-2xl border border-slate-200 p-3 outline-none"
 value={filters.status}
  onChange={(e) =>
    setFilters((prev) => ({
      ...prev,
      status: e.target.value,
    }))
  }
>
  <option value="all">All Status</option>
  <option value="active">Active</option>
  <option value="blocked">Blocked</option>
  <option value="pending">Pending</option>

          </select>
          <select
          className="rounded-2xl border border-slate-200 p-3 outline-none"
  value={filters.approvalStatus}
  onChange={(e) =>
    setFilters((prev) => ({
      ...prev,
      approvalStatus: e.target.value,
    }))
  }
>
  <option value="all">All Approval Status</option>
  <option value="pending">Pending</option>
  <option value="approved">Approved</option>
  <option value="rejected">Rejected</option>
</select>
          <select
          className="rounded-2xl border border-slate-200 p-3 outline-none"
  value={filters.role}
  onChange={(e) =>
    setFilters((prev) => ({
      ...prev,
      role: e.target.value,
    }))
  }
>
  <option value="all">All</option>
  <option value="teacher">Teacher</option>
  <option value="student">Student</option>
=
</select>

        </div>

      </div>
            {/* Students Table */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl"
      >
        {/* Table Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              Students List
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Showing {users?.length} students
            </p>

          </div>

          <button className="rounded-2xl bg-[#D6451B] px-5 py-3 text-white transition hover:opacity-90">
            Export
          </button>

        </div>

        {/* Desktop Table */}

        <div className="hidden overflow-x-auto lg:block">

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Student
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Contact
                </th>

               
<th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
  Approval
</th>

<th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
  Status
</th>
              

                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {users
                .map((student) => (
                  <motion.tr
                    key={student._id}
                    whileHover={{ backgroundColor: "#fff7f4" }}
                    className="border-b border-slate-100 last:border-none"
                  >

                    {/* Student */}

                    <td className="px-6 py-5">

                      <div className="flex items-center gap-4">

                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D6451B]/10 text-lg font-bold text-[#D6451B]">

                          {student.fullName.charAt(0)}

                        </div>

                        <div>

                          <h3 className="font-semibold text-slate-900">
                            {student.fullName}{` (${capitalizeFirstLetter(student.role)})`}
                          </h3>

                          <p className="text-sm text-slate-500">
                            ID #{student._id.toString().padStart(4, "0")}
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Contact */}

                    <td className="px-6 py-5">

                      <p className="font-medium">
                        {student.email}
                      
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {student.phone}
                      </p>
                   

                    </td>

                   
<td className="px-6 py-5">
  <span
    className={`rounded-full px-4 py-2 text-sm font-medium ${
      student.approvalStatus === "approved"
        ? "bg-green-100 text-green-700"
        : student.approvalStatus === "pending"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700"
    }`}
  >
    {student.approvalStatus}
  </span>
</td>
                    {/* Status */}

                    <td className="px-6 py-5">

                      <span
                        className={`rounded-full px-4 py-2 text-sm font-medium ${
                          student.status === "active"
                            ? "bg-green-100 text-green-700":
                            student.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            :"bg-red-100 text-red-700"
                        }`}
                      >
                        {student.status}
                      </span>

                    </td>

                    {/* Actions */}

                    <td className="px-6 py-5">

                      <div className="flex justify-end gap-3">


                        <button onClick={()=>{router.push(`/admin-panel/user/${student._id}`)}} className="rounded-xl cursor-pointer bg-orange-50 p-3 text-[#D6451B] transition hover:scale-105">

                          <FaEdit />

                        </button>

                        <button onClick={()=>{deleteUserMutation.mutate(student._id)}} className="rounded-xl cursor-pointer bg-red-50 p-3 text-red-600  hover:scale-105 active:scale-90 transition-all">

                          <FaTrash />

                        </button>

                      </div>

                    </td>

                  </motion.tr>
                ))}

            </tbody>
         

          </table>

        </div>

        {/* Mobile Cards */}

        <div className="space-y-5 p-5 lg:hidden">

          {users
            .map((student) => (

              <div
                key={student._id}
                className="rounded-3xl border border-slate-200 p-5"
              >

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D6451B]/10 font-bold text-[#D6451B]">

                    {student?.fullName.charAt(0)}

                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {student?.fullName}
                    </h3>

                    {/* <p className="text-sm text-slate-500">
                      {student?.course}
                    </p> */}

                  </div>

                </div>

             <div className="mt-5 space-y-2 text-sm">
  <p>
    <span className="font-semibold">Email:</span>{" "}
    {student?.email}
  </p>

  <p>
    <span className="font-semibold">Phone:</span>{" "}
    {student?.phone}
  </p>

  {/* <p>
    <span className="font-semibold">Batch:</span>{" "}
    {student?.batch}
  </p> */}

  <div className="flex flex-wrap gap-2 pt-2">
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        student.approvalStatus === "approved"
          ? "bg-green-100 text-green-700"
          : student.approvalStatus === "pending"
          ? "bg-yellow-100 text-yellow-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {student.approvalStatus}
    </span>

    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        student.status === "active"
          ? "bg-blue-100 text-blue-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {student.status}
    </span>
  </div>
</div>

                <div className="mt-5 flex gap-3">

                

                  <button onClick={()=>{router.push(`/admin-panel/user/${student._id}`)}} className="flex-1 rounded-xl bg-orange-50 py-3 text-[#D6451B]">

                    <FaEdit className="mx-auto" />

                  </button>

                  <button className="flex-1 rounded-xl bg-red-50 py-3 text-red-600">

                    <FaTrash className="mx-auto" />

                  </button>

                </div>

              </div>

            ))}

        </div>

      </motion.div>
            {/* Footer */}

    {users.length !== 0 &&  <div className="flex flex-col items-center justify-between gap-5 rounded-[30px] border border-slate-200 bg-white p-6 shadow-lg md:flex-row">

     <p className="text-sm text-slate-500">
  Showing{" "}
  <span className="font-semibold">
    {(pagination.page - 1) * pagination.limit + 1}
  </span>
  -
  <span className="font-semibold">
    {Math.min(
      pagination.page * pagination.limit,
      pagination.total
    )}
  </span>{" "}
  of{" "}
  <span className="font-semibold">
    {pagination.total}
  </span>{" "}
  students
</p>

        {/* Pagination */}

        <div className="flex items-center gap-2">

        <button
  disabled={!pagination.hasPreviousPage}
  onClick={() => setPage((prev) => prev - 1)}
  className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50 disabled:opacity-50"
>
  Previous
</button>

         {Array.from(
  { length: pagination.totalPages },
  (_, i) => i + 1
).map((pageNumber) => (
  <button
    key={pageNumber}
    onClick={() => setPage(pageNumber)}
    className={`h-10 w-10 rounded-xl ${
      page === pageNumber
        ? "bg-[#D6451B] text-white"
        : "border border-slate-200 hover:bg-slate-50"
    }`}
  >
    {pageNumber}
  </button>
))}

      <button
  disabled={!pagination.hasNextPage}
  onClick={() => setPage((prev) => prev + 1)}
  className="rounded-xl border border-slate-200 px-4 py-2 hover:bg-slate-50 disabled:opacity-50"
>
  Next
</button>

          

        </div>

      </div>}

      {/* Empty State */}

      {users.length === 0 && (

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-[32px] border border-dashed border-slate-300 bg-white py-20 text-center shadow-lg"
        >

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-50 text-4xl text-[#D6451B]">

            <FaUserGraduate />

          </div>

          <h2 className="mt-6 text-2xl font-bold text-slate-900">
            No Students Found
          </h2>

          <p className="mx-auto mt-3 max-w-md text-slate-500">
            You haven't added any students yet.
            Start by creating your first student profile.
          </p>

          <button className="mt-8 rounded-2xl bg-[#D6451B] px-8 py-4 font-semibold text-white hover:opacity-90">

            Add Student

          </button>

        </motion.div>

      )}

    </div>
  );
}

/* ---------- Reusable Stat Card ---------- */

function Stat({ title, value, icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg"
    >

      <div className="flex items-center justify-between">

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-xl ${color}`}
        >
          {icon}
        </div>

      </div>

      <h2 className="mt-6 text-4xl font-bold text-slate-900">
        {value}
      </h2>

      <p className="mt-2 text-slate-500">
        {title}
      </p>

    </motion.div>
  );
}