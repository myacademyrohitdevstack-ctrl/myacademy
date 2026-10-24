"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFileInvoiceDollar,
  FaPlus,
  FaUsers,
  FaLayerGroup,
  FaCalendarAlt,
  FaCheckCircle,
  FaEdit,
  FaTrash,
  FaTimes,
  FaMoneyBillWave,
  FaTag,
  FaSpinner,
  FaUserGraduate,
  FaCashRegister,
} from "react-icons/fa";
import Link from "next/link";
import FeesNav from "../components/FeesNav";
import { useFeePlans, useAcademyBatches, useSearchFeeStudents } from "@/Hooks/useFees";
import {
  useCreateFeePlanMutation,
  useArchiveFeePlanMutation,
  useAssignFeePlanMutation,
} from "@/app/mutations/feeMutations";
import { toast } from "sonner";

export default function FeePlansClient() {
  const [modalOpen, setModalOpen] = useState(false);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignedSuccessStudent, setAssignedSuccessStudent] = useState(null);
  const [removedIds, setRemovedIds] = useState([]);

  const [newPlan, setNewPlan] = useState({
    name: "",
    batchId: "",
    totalAmount: 30000,
    frequency: "Monthly",
    installments: 3,
    lateFee: 200,
  });

  const [assignData, setAssignData] = useState({
    studentId: "",
    feePlanId: "",
    discountAmount: 0,
    startDate: new Date().toISOString().split("T")[0],
    notes: "",
  });

  const { data: serverPlansData, isLoading } = useFeePlans({ status: "active" });
  const { data: academyBatches, isLoading: isBatchesLoading } = useAcademyBatches();
  const { data: academyStudents, isLoading: isStudentsLoading } = useSearchFeeStudents({ limit: 100 });

  const createPlanMutation = useCreateFeePlanMutation();
  const archivePlanMutation = useArchiveFeePlanMutation();
  const assignPlanMutation = useAssignFeePlanMutation();

  const plansList =
    serverPlansData?.data && serverPlansData.data.length > 0
      ? serverPlansData.data
          .filter((p) => !removedIds.includes(p._id))
          .map((p) => ({
            _id: p._id,
            name: p.name,
            batchId: p.batch?._id || p.batch,
            batch: p.batch?.name || "All Cohorts",
            courseId: p.course?._id || p.course,
            totalAmount: p.totalAmount,
            frequency: p.frequency
              ? p.frequency.charAt(0).toUpperCase() + p.frequency.slice(1)
              : "Monthly",
            installments: p.installments || 1,
            installmentAmount: Math.round(
              p.totalAmount / Math.max(1, p.installments || 1)
            ),
            lateFee: p.lateFeeAmount || 0,
            assignedStudents: p.assignedStudents || 0,
            status: p.status
              ? p.status.charAt(0).toUpperCase() + p.status.slice(1)
              : "Active",
          }))
      : [];

  const handleCreatePlan = async (e) => {
    e.preventDefault();
    if (!newPlan.name.trim()) {
      toast.error("Please provide a plan title");
      return;
    }

    if (Number(newPlan.totalAmount) < 100) {
      toast.error("Total fee amount must be at least ₹100");
      return;
    }

    const instCount = Math.max(1, Number(newPlan.installments));

    const freqMap = {
      Monthly: "monthly",
      "Bi-Monthly": "bi-monthly",
      Quarterly: "quarterly",
      "One-Time": "one-time",
    };

    const selectedBatch = academyBatches?.find((b) => b._id === newPlan.batchId);

    const payload = {
      name: newPlan.name.trim(),
      description: selectedBatch
        ? `Structured fee plan for ${selectedBatch.name}`
        : "Academy-wide fee structure",
      course: selectedBatch?.course?._id || selectedBatch?.course || null,
      batch: newPlan.batchId ? newPlan.batchId : null,
      totalAmount: Number(newPlan.totalAmount),
      frequency: freqMap[newPlan.frequency] || "monthly",
      installments: instCount,
      lateFeeAmount: Number(newPlan.lateFee || 0),
      lateFeeGraceDays: 5,
    };

    try {
      await createPlanMutation.mutateAsync(payload);
      setModalOpen(false);
      setNewPlan({
        name: "",
        batchId: "",
        totalAmount: 30000,
        frequency: "Monthly",
        installments: 3,
        lateFee: 200,
      });
    } catch (err) {
      // Handled by onError in mutation
    }
  };

  const openAssignModal = (plan = null) => {
    setAssignedSuccessStudent(null);
    setAssignData({
      studentId: academyStudents?.[0]?._id || academyStudents?.[0]?.userId || "",
      feePlanId: plan ? plan._id : (plansList[0]?._id || ""),
      discountAmount: 0,
      startDate: new Date().toISOString().split("T")[0],
      notes: "Fee plan assigned by administrator",
    });
    setAssignModalOpen(true);
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!assignData.studentId) {
      toast.error("Please select a student");
      return;
    }
    if (!assignData.feePlanId) {
      toast.error("Please select a fee plan");
      return;
    }

    const selectedPlan = plansList.find((p) => p._id === assignData.feePlanId);

    const payload = {
      studentId: assignData.studentId,
      feePlanId: assignData.feePlanId,
      batchId: selectedPlan?.batchId || null,
      discountAmount: Number(assignData.discountAmount || 0),
      startDate: assignData.startDate,
      notes: assignData.notes,
    };

    try {
      await assignPlanMutation.mutateAsync(payload);
      setAssignedSuccessStudent(assignData.studentId);
    } catch (err) {
      // Handled by onError in mutation
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to archive this fee structure?")) {
      try {
        await archivePlanMutation.mutateAsync(id);
      } catch (err) {
        // Handled by onError in mutation
      }
    }
  };

  const totalAssigned = plansList.reduce(
    (sum, p) => sum + p.assignedStudents,
    0
  );

  return (
    <div className="w-full min-w-0">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6 px-1 sm:px-6 lg:px-8 w-full min-w-0">
        <FeesNav />

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between min-w-0">
            <div className="min-w-0 flex-1">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                Fee Plan Configuration
              </span>

              <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                Fee Structures & Plans
              </h1>

              <p className="mt-2 text-xs sm:text-sm lg:text-base max-w-2xl text-orange-100 leading-relaxed font-normal">
                Define batch fee templates, installment timetables, admission dues, and assign customized payment plans to enrolled students.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => openAssignModal()}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition"
              >
                <FaUserGraduate className="text-xs" />
                <span>Assign to Student</span>
              </button>

              <button
                onClick={() => setModalOpen(true)}
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-[#D6451B] shadow-xs hover:bg-orange-50 transition"
              >
                <FaPlus className="text-xs" />
                <span>Create Fee Structure</span>
              </button>
            </div>
          </div>
        </motion.section>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">Active Plans</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
              {isLoading ? "..." : plansList.length}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Template structures</p>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">Enrolled Students</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-[#D6451B]">
              {totalAssigned}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Assigned to active plans</p>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">Average Plan Value</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-emerald-600">
              ₹
              {plansList.length > 0
                ? (
                    plansList.reduce((sum, p) => sum + p.totalAmount, 0) /
                    plansList.length
                  ).toFixed(0)
                : 0}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Across all cohorts</p>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">Payment Modes Supported</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-blue-600">
              UPI & Cash
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">+ Cards & Net Banking</p>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3 w-full min-w-0">
          {isLoading ? (
            <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500 text-xs sm:text-sm">
              <FaSpinner className="animate-spin inline mr-2 text-[#D6451B]" />
              Loading fee structures...
            </div>
          ) : plansList.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-[#D6451B] mb-3">
                <FaFileInvoiceDollar />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                No Fee Structures Configured
              </h3>
              <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
                No fee plans have been configured yet. Click &quot;Create Fee Structure&quot; above to define installment rules and fee amounts.
              </p>
            </div>
          ) : (
            plansList.map((plan) => (
              <div
                key={plan._id}
                className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition w-full min-w-0"
              >
                <div>
                  <div className="flex items-start justify-between gap-2.5">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-slate-900 truncate">
                        {plan.name}
                      </h3>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        Batch: {plan.batch}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 shrink-0">
                      {plan.status}
                    </span>
                  </div>

                  {/* Amount Highlight */}
                  <div className="mt-4 rounded-xl bg-orange-50/60 p-3 border border-orange-100">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Total Structure Fee
                    </p>
                    <h4 className="mt-0.5 text-xl font-extrabold text-[#D6451B]">
                      ₹{plan.totalAmount.toLocaleString("en-IN")}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1">
                      {plan.installments > 1
                        ? `${plan.installments} installments of ₹${plan.installmentAmount.toLocaleString(
                            "en-IN"
                          )} / ${plan.frequency}`
                        : "Full one-time lump-sum"}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="mt-4 space-y-2 text-xs text-slate-600">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Frequency:</span>
                      <strong className="text-slate-800">{plan.frequency}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Late Penalty:</span>
                      <strong className="text-rose-600">
                        {plan.lateFee > 0 ? `₹${plan.lateFee} / period` : "None"}
                      </strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Assigned Students:</span>
                      <strong className="text-slate-800">
                        {plan.assignedStudents} enrolled
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => openAssignModal(plan)}
                    className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-[#D6451B] py-2 text-xs font-bold text-white hover:bg-[#b93814] transition shadow-xs"
                  >
                    <FaUserGraduate className="text-xs" />
                    <span>Assign to Student</span>
                  </button>

                  <button
                    onClick={() => handleDelete(plan._id)}
                    disabled={archivePlanMutation.isPending}
                    className="p-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 transition disabled:opacity-50"
                    title="Archive Fee Structure"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create Plan Modal */}
        <AnimatePresence>
          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-7 shadow-2xl border border-slate-200"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6451B] to-orange-500 text-white font-extrabold shadow-xs">
                      <FaPlus />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">
                        Create Fee Structure
                      </h3>
                      <p className="text-xs text-slate-500">
                        Add a new pricing tier and installment plan
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <FaTimes />
                  </button>
                </div>

                <form onSubmit={handleCreatePlan} className="mt-5 space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Plan Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Full Stack Web Development - 3 Installments"
                      value={newPlan.name}
                      onChange={(e) =>
                        setNewPlan({ ...newPlan, name: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-medium outline-none focus:border-[#D6451B]"
                    />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Batch Cohort
                      </label>
                      <select
                        value={newPlan.batchId}
                        onChange={(e) =>
                          setNewPlan({ ...newPlan, batchId: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-bold bg-slate-50 outline-none focus:border-[#D6451B]"
                      >
                        <option value="">All Batches (Academy-wide)</option>
                        {isBatchesLoading ? (
                          <option disabled>Loading academy batches...</option>
                        ) : academyBatches && academyBatches.length > 0 ? (
                          academyBatches.map((b) => (
                            <option key={b._id} value={b._id}>
                              {b.name} {b.course?.title ? `(${b.course.title})` : ""}
                            </option>
                          ))
                        ) : (
                          <option disabled>No batches found</option>
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Total Fee Amount (₹) *
                      </label>
                      <input
                        type="number"
                        min="100"
                        required
                        value={newPlan.totalAmount}
                        onChange={(e) =>
                          setNewPlan({
                            ...newPlan,
                            totalAmount: Number(e.target.value),
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-bold outline-none focus:border-[#D6451B]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Frequency
                      </label>
                      <select
                        value={newPlan.frequency}
                        onChange={(e) =>
                          setNewPlan({ ...newPlan, frequency: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-bold bg-slate-50 outline-none focus:border-[#D6451B]"
                      >
                        <option>Monthly</option>
                        <option>Bi-Monthly</option>
                        <option>Quarterly</option>
                        <option>One-Time</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Installments
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="24"
                        value={newPlan.installments}
                        onChange={(e) =>
                          setNewPlan({
                            ...newPlan,
                            installments: Number(e.target.value),
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-bold outline-none focus:border-[#D6451B]"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Late Fine / Grace (₹)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={newPlan.lateFee}
                        onChange={(e) =>
                          setNewPlan({
                            ...newPlan,
                            lateFee: Number(e.target.value),
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-bold outline-none focus:border-[#D6451B]"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex gap-2">
                    <button
                      type="submit"
                      disabled={createPlanMutation.isPending}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#b93814] transition shadow-xs disabled:opacity-50"
                    >
                      {createPlanMutation.isPending ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Saving Structure...</span>
                        </>
                      ) : (
                        <span>Save Structure</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="px-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Assign Fee Plan to Student Modal */}
        <AnimatePresence>
          {assignModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-7 shadow-2xl border border-slate-200"
              >
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6451B] to-orange-500 text-white font-extrabold shadow-xs">
                      <FaUserGraduate />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">
                        Assign Fee Plan to Student
                      </h3>
                      <p className="text-xs text-slate-500">
                        Create student tuition account & installment timetable
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAssignModalOpen(false)}
                    className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <FaTimes />
                  </button>
                </div>

                {assignedSuccessStudent ? (
                  <div className="mt-6 text-center space-y-4">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 text-2xl">
                      <FaCheckCircle />
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-900">
                        Fee Plan Assigned Successfully!
                      </h4>
                      <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                        The student&apos;s fee account and payment installments have been generated in the ledger. You can now collect payment immediately.
                      </p>
                    </div>

                    <div className="flex gap-2.5 pt-2">
                      <Link
                        href={`/admin-panel/fees/collect/${assignedSuccessStudent}`}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#b93814] shadow-xs transition"
                      >
                        <FaCashRegister className="text-xs" />
                        <span>Collect Payment Now</span>
                      </Link>
                      <button
                        onClick={() => {
                          setAssignedSuccessStudent(null);
                          setAssignModalOpen(false);
                        }}
                        className="px-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50"
                      >
                        Done
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleAssignSubmit} className="mt-5 space-y-4 text-xs">
                    {/* Student Selection */}
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Select Student *
                      </label>
                      <select
                        required
                        value={assignData.studentId}
                        onChange={(e) =>
                          setAssignData({ ...assignData, studentId: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-bold bg-slate-50 outline-none focus:border-[#D6451B]"
                      >
                        <option value="" disabled>
                          -- Choose a student --
                        </option>
                        {isStudentsLoading ? (
                          <option disabled>Loading students...</option>
                        ) : academyStudents && academyStudents.length > 0 ? (
                          academyStudents.map((s) => (
                            <option key={s._id || s.userId} value={s._id || s.userId}>
                              {s.name} ({s.phone || s.email || "Student"})
                            </option>
                          ))
                        ) : (
                          <option disabled>No students found</option>
                        )}
                      </select>
                    </div>

                    {/* Fee Plan Selection */}
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Select Fee Plan *
                      </label>
                      <select
                        required
                        value={assignData.feePlanId}
                        onChange={(e) =>
                          setAssignData({ ...assignData, feePlanId: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-bold bg-slate-50 outline-none focus:border-[#D6451B]"
                      >
                        <option value="" disabled>
                          -- Choose a fee structure --
                        </option>
                        {plansList.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.name} - ₹{p.totalAmount.toLocaleString("en-IN")} ({p.frequency})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Discount & Start Date */}
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Scholarship / Discount (₹)
                        </label>
                        <input
                          type="number"
                          min="0"
                          value={assignData.discountAmount}
                          onChange={(e) =>
                            setAssignData({
                              ...assignData,
                              discountAmount: Number(e.target.value),
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-bold outline-none focus:border-[#D6451B]"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                          Installment Start Date
                        </label>
                        <input
                          type="date"
                          required
                          value={assignData.startDate}
                          onChange={(e) =>
                            setAssignData({
                              ...assignData,
                              startDate: e.target.value,
                            })
                          }
                          className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-bold outline-none focus:border-[#D6451B]"
                        />
                      </div>
                    </div>

                    {/* Internal Notes */}
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Remarks / Enrollment Note
                      </label>
                      <input
                        type="text"
                        value={assignData.notes}
                        onChange={(e) =>
                          setAssignData({ ...assignData, notes: e.target.value })
                        }
                        placeholder="e.g. Standard admission fee schedule"
                        className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-medium outline-none focus:border-[#D6451B]"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex gap-2">
                      <button
                        type="submit"
                        disabled={assignPlanMutation.isPending}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#b93814] transition shadow-xs disabled:opacity-50"
                      >
                        {assignPlanMutation.isPending ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            <span>Assigning Plan...</span>
                          </>
                        ) : (
                          <span>Assign Fee Plan</span>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => setAssignModalOpen(false)}
                        className="px-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
