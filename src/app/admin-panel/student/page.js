"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilter,
  FaUserCheck,
  FaUserGraduate,
  FaUndo,
} from "react-icons/fa";

import { useAdminStudent } from "@/Hooks/useAdminStudents";
import useDebounce from "@/Hooks/useDebounce";
import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";
import { useAdminDeleteUser } from "@/app/mutations/AdminMutations";

import PortalCard from "@/app/Components/portal-ui/PortalCard";
import PortalTable from "@/app/Components/portal-ui/PortalTable";
import PortalInput from "@/app/Components/portal-ui/PortalInput";
import PortalSelect from "@/app/Components/portal-ui/PortalSelect";
import PortalBadge from "@/app/Components/portal-ui/PortalBadge";
import PortalButton from "@/app/Components/portal-ui/PortalButton";

export default function Students() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    status: "",
    approvalStatus: "",
    role: "",
  });

  const debouncedSearch = useDebounce(search, 500);
  const deleteUserMutation = useAdminDeleteUser();
  const { data, isLoading, isFetching } = useAdminStudent(
    page,
    debouncedSearch,
    filters.status,
    filters.approvalStatus,
    filters.role
  );

  const users = data?.users || [];
  const pagination = data?.pagination || {};

  const handleStatusChange = (e) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, status: e.target.value }));
  };

  const handleApprovalChange = (e) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, approvalStatus: e.target.value }));
  };

  const handleRoleChange = (e) => {
    setPage(1);
    setFilters((prev) => ({ ...prev, role: e.target.value }));
  };

  const handleResetFilters = () => {
    setSearch("");
    setPage(1);
    setFilters({
      status: "",
      approvalStatus: "",
      role: "",
    });
  };

  const hasActiveFilters = Boolean(
    filters.status || filters.approvalStatus || filters.role || search
  );
  const activeCount = [
    filters.status,
    filters.approvalStatus,
    filters.role,
    search,
  ].filter(Boolean).length;

  const handleDelete = (userId, name) => {
    if (confirm(`Are you sure you want to delete ${name || "this student"}?`)) {
      deleteUserMutation.mutate(userId);
    }
  };

  const columns = [
    {
      header: "Student Name",
      key: "fullName",
      render: (student) => (
        <div className="flex items-center gap-3 min-w-0 max-w-[260px]">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-[#D6451B] border border-orange-200 text-sm shadow-xs">
            {student.fullName?.charAt(0) || "S"}
          </div>
          <div className="min-w-0 flex-1">
            <h4
              className="font-bold text-slate-900 text-sm leading-snug truncate"
              title={student.fullName}
            >
              {student.fullName}
              <span className="ml-2 inline-flex items-center rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200/60">
                {capitalizeFirstLetter(student.role)}
              </span>
            </h4>
            <p className="text-[11px] text-slate-400 font-medium">
              ID #{student._id?.toString().slice(-6).toUpperCase()}
            </p>
          </div>
        </div>
      ),
    },
    {
      header: "Contact Info",
      key: "email",
      render: (student) => (
        <div className="max-w-[220px] xl:max-w-[280px] min-w-0">
          <p
            className="font-semibold text-slate-800 text-xs sm:text-sm break-all leading-snug"
            title={student.email}
          >
            {student.email}
          </p>
          <p className="text-xs text-slate-400 mt-0.5 truncate">
            {student.phone || "No phone"}
          </p>
        </div>
      ),
    },
    {
      header: "Approval",
      key: "approvalStatus",
      render: (student) => (
        <PortalBadge variant={student.approvalStatus} size="sm">
          {student.approvalStatus}
        </PortalBadge>
      ),
    },
    {
      header: "Account Status",
      key: "status",
      render: (student) => (
        <PortalBadge variant={student.status} size="sm">
          {student.status}
        </PortalBadge>
      ),
    },
    {
      header: "Actions",
      key: "actions",
      align: "right",
      render: (student) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => router.push(`/admin-panel/user/${student._id}`)}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-50 text-[#D6451B] border border-orange-200/70 hover:bg-orange-100 transition-colors shadow-2xs cursor-pointer"
            title="Edit User"
          >
            <FaEdit className="text-xs" />
          </button>
          <button
            onClick={() => handleDelete(student._id, student.fullName)}
            disabled={deleteUserMutation.isPending}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 border border-rose-200/70 hover:bg-rose-100 transition-colors shadow-2xs cursor-pointer disabled:opacity-50"
            title="Delete User"
          >
            <FaTrash className="text-xs" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-5 max-w-7xl mx-auto px-3 sm:px-6">
      {/* Executive Compact Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] via-orange-500 to-amber-500 p-4 sm:p-6 text-white shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4"
      >
        <div className="absolute -right-8 -top-8 h-40 sm:h-52 w-40 sm:w-52 rounded-full bg-white/15 blur-2xl pointer-events-none" />

        <div className="relative">
          <span className="inline-flex rounded-full bg-white/20 border border-white/30 px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md">
            Administration
          </span>
          <h1 className="mt-1.5 text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-white">
            Student Management
          </h1>
          <p className="mt-1 text-orange-100 font-medium text-xs sm:text-sm max-w-xl">
            Monitor, approve, update, and manage student accounts across all cohorts.
          </p>
        </div>

        <PortalButton
          variant="secondary"
          size="sm"
          icon={FaPlus}
          onClick={() => router.push("/admin-panel/add-user?role=student")}
          className="w-full sm:w-auto shrink-0 shadow-xs"
        >
          Add New Student
        </PortalButton>
      </motion.div>

      {/* Filter and Search Bar */}
      <PortalCard padding="p-3.5 sm:p-5" className="relative overflow-hidden shadow-xs border border-slate-200/80">
        {isFetching && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D6451B] via-orange-400 to-amber-400 animate-pulse z-10" />
        )}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-orange-50 text-[#D6451B] border border-orange-200/70 text-xs shadow-2xs">
                <FaFilter />
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-800">
                Filter & Search
              </span>
              {hasActiveFilters && (
                <span className="inline-flex items-center rounded-full bg-orange-100 border border-orange-200 px-2 py-0.5 text-[10px] sm:text-[11px] font-bold text-[#D6451B]">
                  {activeCount} active
                </span>
              )}
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#D6451B] hover:text-orange-700 transition-colors cursor-pointer"
              >
                <FaUndo className="text-[10px]" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="grid gap-2.5 sm:gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
            <PortalInput
              icon={FaSearch}
              placeholder="Search by name, email..."
              value={search}
              isLoading={isFetching && Boolean(search)}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
            />

            <PortalSelect
              icon={FaFilter}
              value={filters.status}
              isLoading={isFetching}
              onChange={handleStatusChange}
            >
              <option value="">All Statuses</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="blocked">Blocked</option>
            </PortalSelect>

            <PortalSelect
              icon={FaUserCheck}
              value={filters.approvalStatus}
              isLoading={isFetching}
              onChange={handleApprovalChange}
            >
              <option value="">All Approvals</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending Approval</option>
              <option value="rejected">Rejected</option>
            </PortalSelect>

            <PortalSelect
              icon={FaUserGraduate}
              value={filters.role}
              isLoading={isFetching}
              onChange={handleRoleChange}
            >
              <option value="">All Roles</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </PortalSelect>
          </div>
        </div>
      </PortalCard>

      {/* Main Student Data Table */}
      <div className="space-y-3.5">
        <PortalTable
          columns={columns}
          data={users}
          isLoading={isLoading}
          isFetching={isFetching}
          emptyTitle="No students found"
          emptyDescription="No student records matched your search parameters."
          renderMobileCard={(student) => (
            <div className="space-y-2.5 min-w-0 w-full">
              {/* Header: Avatar, Name, Role, ID & Status Badge */}
              <div className="flex items-start justify-between gap-2.5 min-w-0">
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 font-bold text-[#D6451B] border border-orange-200 text-sm shadow-xs">
                    {student.fullName?.charAt(0) || "S"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h4
                        className="font-bold text-slate-900 text-sm leading-snug truncate"
                        title={student.fullName}
                      >
                        {student.fullName}
                      </h4>
                      <span className="inline-flex items-center rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200/60">
                        {capitalizeFirstLetter(student.role)}
                      </span>
                    </div>
                    <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                      ID #{student._id?.toString().slice(-6).toUpperCase()}
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <PortalBadge variant={student.status} size="sm">
                    {student.status}
                  </PortalBadge>
                </div>
              </div>

              {/* Contact Info: Email & Phone */}
              <div className="rounded-xl bg-slate-50/90 p-2.5 border border-slate-100 space-y-1.5 min-w-0">
                <div className="flex items-start gap-2 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 w-12 pt-0.5">
                    Email
                  </span>
                  <span
                    className="text-xs font-semibold text-slate-800 break-all leading-relaxed select-all min-w-0 flex-1"
                    title={student.email}
                  >
                    {student.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 min-w-0 pt-1.5 border-t border-slate-200/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0 w-12">
                    Phone
                  </span>
                  <span className="text-xs font-semibold text-slate-700 truncate">
                    {student.phone || "No phone provided"}
                  </span>
                </div>
              </div>

              {/* Approval Status Row */}
              <div className="flex items-center justify-between gap-2 pt-0.5 text-xs">
                <span className="text-xs font-semibold text-slate-500">
                  Approval Status
                </span>
                <PortalBadge variant={student.approvalStatus} size="sm">
                  {student.approvalStatus}
                </PortalBadge>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <PortalButton
                  variant="orangeOutline"
                  size="sm"
                  icon={FaEdit}
                  className="flex-1 justify-center shadow-xs"
                  onClick={() => router.push(`/admin-panel/user/${student._id}`)}
                >
                  Edit Details
                </PortalButton>
                <button
                  type="button"
                  onClick={() => handleDelete(student._id, student.fullName)}
                  disabled={deleteUserMutation.isPending}
                  className="inline-flex items-center justify-center gap-1.5 px-3 min-h-[36px] rounded-xl bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs hover:bg-rose-100 active:scale-[0.98] transition-all shadow-xs cursor-pointer disabled:opacity-50"
                  title="Delete Student"
                >
                  <FaTrash className="text-xs" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )}
        />

        {/* Compact Pagination Footer */}
        {users.length > 0 && pagination.totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
            <p className="text-xs font-semibold text-slate-500 text-center sm:text-left">
              Showing Page <span className="text-slate-900 font-bold">{pagination.page}</span> of{" "}
              <span className="text-slate-900 font-bold">{pagination.totalPages}</span> ({pagination.total} total students)
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5">
              <PortalButton
                variant="outline"
                size="sm"
                disabled={!pagination.hasPreviousPage}
                onClick={() => setPage((prev) => prev - 1)}
              >
                Previous
              </PortalButton>

              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`h-8 w-8 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    page === pageNum
                      ? "bg-[#D6451B] text-white font-extrabold shadow-xs"
                      : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <PortalButton
                variant="outline"
                size="sm"
                disabled={!pagination.hasNextPage}
                onClick={() => setPage((prev) => prev + 1)}
              >
                Next
              </PortalButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
