"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUniversity,
  FaSearch,
  FaFilter,
  FaCheckCircle,
  FaBan,
  FaTimes,
  FaSpinner,
  FaCalendarAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaUserTie,
  FaExclamationTriangle,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useSuperAdminAcademies } from "@/Hooks/useSuperAdmin";
import { useUpdateAcademyStatusMutation } from "@/app/mutations/superAdminMutations";
import { toast } from "sonner";

export default function SuperAdminAcademiesClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSuperAdminAcademies({
    page,
    limit: 15,
    search: searchTerm || undefined,
    status: statusFilter || undefined,
  });

  const academies = data?.academies || [];
  const pagination = data?.pagination || { page: 1, limit: 15, total: 0, pages: 1 };

  const [selectedAcademy, setSelectedAcademy] = useState(null);
  const [newStatus, setNewStatus] = useState("active");
  const [suspensionReason, setSuspensionReason] = useState("");

  const updateStatusMutation = useUpdateAcademyStatusMutation();

  const openStatusModal = (aca) => {
    setSelectedAcademy(aca);
    setNewStatus(aca.status || "active");
    setSuspensionReason("");
  };

  const handleStatusSubmit = async (e) => {
    e.preventDefault();
    if (newStatus === "suspended" && !suspensionReason.trim()) {
      toast.error("A reason is mandatory when suspending an academy tenant.");
      return;
    }

    try {
      await updateStatusMutation.mutateAsync({
        academyId: selectedAcademy._id,
        status: newStatus,
        reason: suspensionReason.trim(),
      });
      setSelectedAcademy(null);
    } catch (err) {
      // Handled by onError in mutation
    }
  };

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500 via-[#D6451B] to-rose-600 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between min-w-0">
          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Tenant Management
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Academy Directory
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm text-orange-100 max-w-2xl font-normal">
              Manage platform academy tenants, inspect account owners, and manage operational status with audited access controls.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md shrink-0 lg:w-72">
            <p className="text-xs text-orange-100 font-semibold uppercase tracking-wider">
              Total Tenants
            </p>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold">
              {pagination.total || 0}
            </h2>
            <p className="mt-1 text-xs text-orange-100">
              Across all platform regions
            </p>
          </div>
        </div>
      </motion.section>

      {/* Filter and Search Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by name, slug, or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 overflow-x-auto">
          {[
            { label: "All", value: "" },
            { label: "Active", value: "active" },
            { label: "Inactive", value: "inactive" },
            { label: "Suspended", value: "suspended" },
          ].map((tab) => (
            <button
              key={tab.value}
              onClick={() => {
                setStatusFilter(tab.value);
                setPage(1);
              }}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold capitalize transition-all whitespace-nowrap ${
                statusFilter === tab.value
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Academies Table / List */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">
            <FaSpinner className="animate-spin inline mr-2 text-[#D6451B] text-lg" />
            <span>Loading academy tenants...</span>
          </div>
        ) : academies.length === 0 ? (
          <div className="p-12 text-center">
            <FaUniversity className="text-slate-300 text-4xl mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No Academies Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              No academy tenants match your active filters or search terms.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {academies.map((aca) => {
              const isActive = aca.status === "active";
              const isSuspended = aca.status === "suspended";
              const createdStr = aca.createdAt
                ? new Date(aca.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A";

              return (
                <div
                  key={aca._id}
                  className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/70 transition"
                >
                  <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#D6451B] font-extrabold text-base border border-orange-200">
                      {aca.name?.charAt(0) || "A"}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                          {aca.name}
                        </h3>
                        <span className="font-mono text-[11px] text-slate-400">
                          /{aca.slug}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : isSuspended
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {aca.status || "active"}
                        </span>
                      </div>

                      <div className="mt-1 flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-slate-500">
                        <span>
                          Owner: <strong>{aca.owner?.fullName || "Admin"}</strong>
                        </span>
                        {aca.email && <span>• {aca.email}</span>}
                        {aca.phone && <span>• {aca.phone}</span>}
                        <span>• Enrolled: {createdStr}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 self-end lg:self-auto shrink-0">
                    <span className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-bold text-slate-700 capitalize">
                      Plan: {aca.plan || "free"}
                    </span>

                    <button
                      onClick={() => openStatusModal(aca)}
                      className="rounded-xl bg-[#D6451B] px-3.5 py-1.5 text-xs font-bold text-white hover:bg-orange-600 transition shadow-xs"
                    >
                      Change Status
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Bar */}
        {pagination.pages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
            <span>
              Page {pagination.page} of {pagination.pages} ({pagination.total} tenants)
            </span>
            <div className="flex items-center gap-1.5">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 hover:bg-slate-50 disabled:opacity-40"
              >
                <FaChevronLeft className="text-[10px]" />
                <span>Prev</span>
              </button>
              <button
                disabled={page >= pagination.pages}
                onClick={() => setPage((p) => p + 1)}
                className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 py-1.5 hover:bg-slate-50 disabled:opacity-40"
              >
                <span>Next</span>
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Change Status Modal */}
      <AnimatePresence>
        {selectedAcademy && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 sm:p-4 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6451B] to-rose-600 text-white shadow-xs">
                    <FaUniversity className="text-base" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">Manage Tenant Status</h3>
                    <p className="text-[11px] text-[#D6451B] font-bold">{selectedAcademy.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAcademy(null)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleStatusSubmit} className="mt-5 space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Operational Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-bold bg-slate-50 outline-none focus:border-[#D6451B]"
                  >
                    <option value="active">Active (Full operational access)</option>
                    <option value="inactive">Inactive (Dormant account)</option>
                    <option value="suspended">Suspended (Access blocked across all users)</option>
                  </select>
                </div>

                {newStatus === "suspended" && (
                  <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-3.5 space-y-2">
                    <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                      <FaExclamationTriangle className="text-xs" />
                      <span>Audit Reason Required for Suspension</span>
                    </div>
                    <textarea
                      required
                      rows={3}
                      value={suspensionReason}
                      onChange={(e) => setSuspensionReason(e.target.value)}
                      placeholder="Specify clear compliance or billing reason for suspending this tenant..."
                      className="w-full rounded-xl border border-rose-200 bg-white p-2.5 text-xs text-slate-800 outline-none focus:border-rose-500"
                    />
                  </div>
                )}

                <div className="pt-2 flex gap-2.5">
                  <button
                    type="submit"
                    disabled={updateStatusMutation.isPending}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] py-3 text-xs sm:text-sm font-bold text-white hover:bg-orange-600 transition shadow-xs disabled:opacity-50"
                  >
                    {updateStatusMutation.isPending ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Updating Status...</span>
                      </>
                    ) : (
                      <span>Save Status</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedAcademy(null)}
                    className="px-4 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
