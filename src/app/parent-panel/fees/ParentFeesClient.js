"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMoneyBillWave,
  FaReceipt,
  FaCalendarAlt,
  FaCheckCircle,
  FaClock,
  FaExclamationCircle,
  FaPrint,
  FaTimes,
  FaSpinner,
  FaCreditCard,
  FaUniversity,
  FaQrcode,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { useMyChildren, useChildFees } from "@/Hooks/useParent";
import ChildSwitcher from "../components/ChildSwitcher";

export default function ParentFeesClient() {
  const { data: childrenList, isLoading: isChildrenLoading } = useMyChildren();
  const [selectedChildId, setSelectedChildId] = useState("");
  const [viewReceipt, setViewReceipt] = useState(null);

  useEffect(() => {
    if (childrenList && childrenList.length > 0 && !selectedChildId) {
      const firstId = childrenList[0]?.user?._id || childrenList[0]?._id;
      setSelectedChildId(firstId);
    }
  }, [childrenList, selectedChildId]);

  const { data: feesData, isLoading: isFeesLoading } =
    useChildFees(selectedChildId);

  const selectedChildObj = childrenList?.find(
    (c) => (c.user?._id || c._id) === selectedChildId
  );

  const fees = feesData?.fees || [];
  const payments = feesData?.payments || [];

  const totalCourseFee = fees.reduce((sum, f) => sum + (f.totalAmount || 0), 0);
  const totalDiscounts = fees.reduce(
    (sum, f) => sum + (f.discountAmount || 0) + (f.scholarshipAmount || 0),
    0
  );
  const totalPayable = fees.reduce((sum, f) => sum + (f.totalPayable || 0), 0);
  const totalPaid = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalBalance = Math.max(0, totalPayable - totalPaid);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* Child Switcher */}
      <ChildSwitcher
        childrenList={childrenList}
        selectedChildId={selectedChildId}
        onSelect={(id) => setSelectedChildId(id)}
      />

      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
      >
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between min-w-0">
          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Student Tuition & Accounts
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl truncate">
              {selectedChildObj?.user?.fullName || "Child"} Fee Statement
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm text-orange-100 max-w-2xl font-normal">
              Transparent ledger tracking active installment timetables, scholarship waivers, and verified payment receipts.
            </p>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md shrink-0 lg:w-72">
            <div className="flex items-center justify-between">
              <p className="text-xs text-orange-100 font-semibold uppercase tracking-wider">
                Outstanding Dues
              </p>
              <FaMoneyBillWave className="text-white/80" />
            </div>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold">
              ₹{totalBalance.toLocaleString("en-IN")}
            </h2>
            <p className="mt-1 text-xs text-orange-100">
              {totalBalance === 0 ? "All installments cleared" : "Upcoming installment balance"}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Summary Row */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Gross Tuition</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
            ₹{totalCourseFee.toLocaleString("en-IN")}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Assigned fee structures</p>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Scholarships & Waivers</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-emerald-600">
            ₹{totalDiscounts.toLocaleString("en-IN")}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Total deductions applied</p>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Total Paid</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-[#D6451B]">
            ₹{totalPaid.toLocaleString("en-IN")}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Cleared transactions</p>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Remaining Due</p>
          <h3 className={`mt-2 text-xl sm:text-2xl font-extrabold ${
            totalBalance > 0 ? "text-rose-600" : "text-emerald-600"
          }`}>
            ₹{totalBalance.toLocaleString("en-IN")}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Current net balance</p>
        </div>
      </div>

      {isFeesLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
          <FaSpinner className="animate-spin inline mr-2 text-[#D6451B] text-lg" />
          <span>Loading student fee ledgers and receipts...</span>
        </div>
      ) : fees.length === 0 && payments.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <FaFileInvoiceDollar className="text-slate-300 text-5xl mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Fee Accounts Assigned</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Your academy has not yet assigned a structured fee plan to this student profile.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Active Fee Plans & Installment Timetables */}
          {fees.map((planAcc) => (
            <div
              key={planAcc._id}
              className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden"
            >
              <div className="p-4 sm:p-6 border-b border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-extrabold text-slate-900">
                      {planAcc.feePlan?.name || planAcc.feePlanName || "Course Fee Structure"}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${
                        planAcc.status === "paid"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : planAcc.status === "partially_paid"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {planAcc.status?.replace("_", " ") || "Active"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Net Payable: ₹{(planAcc.totalPayable || 0).toLocaleString("en-IN")} • Balance: ₹{(planAcc.balanceAmount || 0).toLocaleString("en-IN")}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <p className="text-xs text-slate-400 font-semibold">Assigned On</p>
                  <p className="text-xs font-bold text-slate-700">
                    {planAcc.createdAt
                      ? new Date(planAcc.createdAt).toLocaleDateString("en-IN")
                      : "Active"}
                  </p>
                </div>
              </div>

              {/* Installments Table */}
              {planAcc.installments && planAcc.installments.length > 0 ? (
                <div className="p-4 sm:p-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                    Installment Schedule & Due Dates
                  </h4>

                  <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                    {planAcc.installments.map((inst, i) => {
                      const isInstPaid = inst.status === "paid";
                      const isInstOverdue = inst.status === "overdue";
                      const dueDateStr = inst.dueDate
                        ? new Date(inst.dueDate).toLocaleDateString("en-IN")
                        : "Due date N/A";

                      return (
                        <div
                          key={i}
                          className={`rounded-xl border p-3.5 text-xs transition ${
                            isInstPaid
                              ? "border-emerald-200 bg-emerald-50/40"
                              : isInstOverdue
                              ? "border-rose-200 bg-rose-50/40"
                              : "border-slate-200 bg-slate-50/40"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-slate-800">
                              Installment #{inst.installmentNumber || i + 1}
                            </span>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                isInstPaid
                                  ? "bg-emerald-100 text-emerald-800"
                                  : isInstOverdue
                                  ? "bg-rose-100 text-rose-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {inst.status || "Pending"}
                            </span>
                          </div>

                          <div className="mt-2.5 flex items-baseline justify-between">
                            <span className="text-sm font-extrabold text-slate-900">
                              ₹{(inst.amount || 0).toLocaleString("en-IN")}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Due: {dueDateStr}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          ))}

          {/* Payment Receipts History */}
          <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaReceipt className="text-[#D6451B]" />
                <h3 className="text-sm font-bold text-slate-900">
                  Verified Payment Receipts
                </h3>
              </div>
              <span className="text-xs font-bold text-slate-400">
                {payments.length} {payments.length === 1 ? "Receipt" : "Receipts"}
              </span>
            </div>

            {payments.length === 0 ? (
              <div className="p-10 text-center text-slate-400 text-xs">
                No fee payment transactions have been recorded yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {payments.map((p) => {
                  const paidDate = p.paidAt
                    ? new Date(p.paidAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "Date N/A";

                  return (
                    <div
                      key={p._id}
                      className="p-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/70 transition"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#D6451B]">
                          <FaReceipt className="text-base" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-xs sm:text-sm text-slate-900">
                              {p.receiptNo || "REC-ACADEMY"}
                            </span>
                            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase">
                              {p.mode || "Payment"}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Paid on {paidDate} • Ref: {p.referenceNumber || "Direct"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto">
                        <span className="text-sm font-extrabold text-slate-900">
                          ₹{(p.amount || 0).toLocaleString("en-IN")}
                        </span>

                        <button
                          onClick={() => setViewReceipt(p)}
                          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-[#D6451B] hover:text-[#D6451B] transition shadow-2xs"
                        >
                          <FaPrint className="text-xs" />
                          <span>View Receipt</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Official Receipt Printable Modal */}
      <AnimatePresence>
        {viewReceipt && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 sm:p-4 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6451B] to-orange-500 text-white shadow-xs">
                    <FaReceipt className="text-base" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">Official Fee Receipt</h3>
                    <p className="text-[11px] text-[#D6451B] font-bold">MyAcademy SaaS Verification</p>
                  </div>
                </div>
                <button
                  onClick={() => setViewReceipt(null)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <FaTimes />
                </button>
              </div>

              <div id="parent-printable-receipt" className="mt-5 space-y-4 text-xs">
                <div className="rounded-2xl bg-orange-50/60 p-4 border border-orange-100 text-center">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Receipt Number
                  </span>
                  <h4 className="text-lg font-extrabold text-[#D6451B]">
                    {viewReceipt.receiptNo || "REC-2026-000000"}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Date: {viewReceipt.paidAt ? new Date(viewReceipt.paidAt).toLocaleDateString("en-IN") : ""}
                  </p>
                </div>

                <div className="space-y-2 border-y border-slate-100 py-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student:</span>
                    <span className="font-bold text-slate-900">
                      {selectedChildObj?.user?.fullName || "Enrolled Student"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Payment Mode:</span>
                    <span className="font-bold text-slate-900 uppercase">
                      {viewReceipt.mode || "UPI"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reference / UTR ID:</span>
                    <span className="font-mono text-slate-700">
                      {viewReceipt.referenceNumber || "DIRECT"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-bold text-emerald-700 uppercase">
                      {viewReceipt.status || "Completed"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-base font-extrabold text-slate-900 pt-1">
                  <span>Amount Paid:</span>
                  <span className="text-xl text-[#D6451B]">
                    ₹{(viewReceipt.amount || 0).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex gap-2.5">
                <button
                  onClick={handlePrint}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] py-3 text-xs sm:text-sm font-bold text-white hover:bg-orange-600 transition shadow-xs"
                >
                  <FaPrint className="text-xs" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setViewReceipt(null)}
                  className="px-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
