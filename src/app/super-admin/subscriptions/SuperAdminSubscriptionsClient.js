"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCreditCard,
  FaPlus,
  FaUniversity,
  FaCheckCircle,
  FaClock,
  FaCalendarAlt,
  FaTimes,
  FaSpinner,
  FaChevronLeft,
  FaChevronRight,
  FaExclamationCircle,
} from "react-icons/fa";
import {
  useSuperAdminSubscriptions,
  useSuperAdminAcademies,
  useSuperAdminPlans,
} from "@/Hooks/useSuperAdmin";
import { useAssignSubscriptionMutation } from "@/app/mutations/superAdminMutations";
import { toast } from "sonner";

export default function SuperAdminSubscriptionsClient() {
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [assignModalOpen, setAssignModalOpen] = useState(false);

  const { data, isLoading } = useSuperAdminSubscriptions({
    page,
    limit: 15,
    status: statusFilter || undefined,
  });

  const subscriptions = data?.subscriptions || [];
  const pagination = data?.pagination || { page: 1, limit: 15, total: 0, pages: 1 };

  const { data: academiesData } = useSuperAdminAcademies({ limit: 100 });
  const { data: plansData } = useSuperAdminPlans();

  const academiesList = academiesData?.academies || [];
  const plansList = plansData || [];

  const [assignForm, setAssignForm] = useState(() => ({
    academyId: "",
    planId: "",
    billingCycle: "monthly",
    status: "active",
    startsAt: new Date().toISOString().split("T")[0],
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 3600 * 1000)
      .toISOString()
      .split("T")[0],
  }));

  const assignSubscriptionMutation = useAssignSubscriptionMutation();

  const openAssignModal = () => {
    setAssignForm({
      academyId: academiesList[0]?._id || "",
      planId: plansList[0]?._id || "",
      billingCycle: "monthly",
      status: "active",
      startsAt: new Date().toISOString().split("T")[0],
      currentPeriodEnd: new Date(Date.now() + 30 * 24 * 3600 * 1000)
        .toISOString()
        .split("T")[0],
    });
    setAssignModalOpen(true);
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!assignForm.academyId) {
      toast.error("Please choose an academy");
      return;
    }
    if (!assignForm.planId) {
      toast.error("Please choose a plan");
      return;
    }

    try {
      await assignSubscriptionMutation.mutateAsync({
        academyId: assignForm.academyId,
        planId: assignForm.planId,
        billingCycle: assignForm.billingCycle,
        status: assignForm.status,
        startsAt: new Date(assignForm.startsAt).toISOString(),
        currentPeriodEnd: assignForm.currentPeriodEnd
          ? new Date(assignForm.currentPeriodEnd).toISOString()
          : null,
      });
      setAssignModalOpen(false);
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
              Billing Ledger
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Academy Subscriptions
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm text-orange-100 max-w-2xl font-normal">
              Manage multi-tenant SaaS subscription agreements, billing renewals, free trials, and account tier upgrades.
            </p>
          </div>

          <button
            onClick={openAssignModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-[#D6451B] shadow-xs hover:bg-orange-50 transition shrink-0"
          >
            <FaPlus className="text-xs" />
            <span>Assign Subscription</span>
          </button>
        </div>
      </motion.section>

      {/* Filter Tabs */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 overflow-x-auto">
          {[
            { label: "All", value: "" },
            { label: "Active", value: "active" },
            { label: "Trialing", value: "trialing" },
            { label: "Past Due", value: "past_due" },
            { label: "Cancelled", value: "cancelled" },
            { label: "Expired", value: "expired" },
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

        <span className="text-xs font-bold text-slate-400">
          {pagination.total || 0} Total Records
        </span>
      </div>

      {/* Subscriptions Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">
            <FaSpinner className="animate-spin inline mr-2 text-[#D6451B] text-lg" />
            <span>Loading subscriptions...</span>
          </div>
        ) : subscriptions.length === 0 ? (
          <div className="p-12 text-center">
            <FaCreditCard className="text-slate-300 text-4xl mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No Subscriptions Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              There are no academy subscriptions matching your filter. Click &ldquo;Assign Subscription&rdquo; to create one.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {subscriptions.map((sub) => {
              const isActive = sub.status === "active";
              const isTrial = sub.status === "trialing";
              const isPastDue = sub.status === "past_due";
              const startStr = sub.startsAt
                ? new Date(sub.startsAt).toLocaleDateString("en-IN")
                : "N/A";
              const endStr = sub.currentPeriodEnd
                ? new Date(sub.currentPeriodEnd).toLocaleDateString("en-IN")
                : "Open-ended";

              return (
                <div
                  key={sub._id}
                  className="p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 hover:bg-slate-50/70 transition"
                >
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#D6451B] font-extrabold text-base border border-orange-200">
                      <FaCreditCard />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                          {sub.academyId?.name || "Academy Tenant"}
                        </h4>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            isActive
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : isTrial
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : isPastDue
                              ? "bg-rose-50 text-rose-700 border border-rose-200"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {sub.status || "active"}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 mt-0.5">
                        Plan: <strong>{sub.planId?.name || "Platform Plan"}</strong> ({sub.billingCycle}) • Period: {startStr} to {endStr}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end lg:self-auto shrink-0">
                    <div className="text-right">
                      <span className="text-base font-extrabold text-slate-900">
                        ₹{(sub.amount || 0).toLocaleString("en-IN")}
                      </span>
                      <p className="text-[10px] text-slate-400 capitalize">
                        {sub.billingCycle} billing
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600">
            <span>
              Page {pagination.page} of {pagination.pages}
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

      {/* Assign Subscription Modal */}
      <AnimatePresence>
        {assignModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 sm:p-4 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6451B] to-rose-600 text-white shadow-xs">
                    <FaCreditCard className="text-base" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Assign Academy Subscription
                    </h3>
                    <p className="text-[11px] text-[#D6451B] font-bold">Subscription Ledger Record</p>
                  </div>
                </div>
                <button
                  onClick={() => setAssignModalOpen(false)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleAssignSubmit} className="mt-5 space-y-4 text-xs">
                {/* Select Academy */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Select Academy Tenant *
                  </label>
                  <select
                    required
                    value={assignForm.academyId}
                    onChange={(e) =>
                      setAssignForm({ ...assignForm, academyId: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-bold bg-slate-50 outline-none focus:border-[#D6451B]"
                  >
                    <option value="" disabled>
                      -- Choose an academy --
                    </option>
                    {academiesList.map((aca) => (
                      <option key={aca._id} value={aca._id}>
                        {aca.name} ({aca.slug})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Plan */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Select SaaS Plan *
                  </label>
                  <select
                    required
                    value={assignForm.planId}
                    onChange={(e) =>
                      setAssignForm({ ...assignForm, planId: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-bold bg-slate-50 outline-none focus:border-[#D6451B]"
                  >
                    <option value="" disabled>
                      -- Choose a platform plan --
                    </option>
                    {plansList.map((p) => (
                      <option key={p._id} value={p._id}>
                        {p.name} - ₹{p.monthlyPrice}/mo (₹{p.annualPrice}/yr)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Billing Cycle & Status */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Billing Cycle
                    </label>
                    <select
                      value={assignForm.billingCycle}
                      onChange={(e) =>
                        setAssignForm({ ...assignForm, billingCycle: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                    >
                      <option value="monthly">Monthly</option>
                      <option value="annual">Annual</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Status
                    </label>
                    <select
                      value={assignForm.status}
                      onChange={(e) =>
                        setAssignForm({ ...assignForm, status: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                    >
                      <option value="active">Active</option>
                      <option value="trialing">Trialing</option>
                      <option value="past_due">Past Due</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="expired">Expired</option>
                    </select>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Starts At *
                    </label>
                    <input
                      type="date"
                      required
                      value={assignForm.startsAt}
                      onChange={(e) =>
                        setAssignForm({ ...assignForm, startsAt: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-[#D6451B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Current Period End
                    </label>
                    <input
                      type="date"
                      value={assignForm.currentPeriodEnd}
                      onChange={(e) =>
                        setAssignForm({
                          ...assignForm,
                          currentPeriodEnd: e.target.value,
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-[#D6451B]"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex gap-2.5">
                  <button
                    type="submit"
                    disabled={assignSubscriptionMutation.isPending}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] py-3 text-xs sm:text-sm font-bold text-white hover:bg-orange-600 transition shadow-xs disabled:opacity-50"
                  >
                    {assignSubscriptionMutation.isPending ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Assigning...</span>
                      </>
                    ) : (
                      <span>Confirm Subscription</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAssignModalOpen(false)}
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
