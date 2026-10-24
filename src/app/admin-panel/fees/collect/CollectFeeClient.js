"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCashRegister,
  FaUserGraduate,
  FaWallet,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
  FaCheckCircle,
  FaPrint,
  FaReceipt,
  FaTimes,
  FaUniversity,
  FaCreditCard,
  FaMoneyBillWave,
  FaQrcode,
  FaSearch,
  FaSpinner,
} from "react-icons/fa";
import FeesNav from "../components/FeesNav";
import { useSearchFeeStudents } from "@/Hooks/useFees";
import { useCollectPaymentMutation } from "@/app/mutations/feeMutations";
import { toast } from "sonner";

export default function CollectFeeClient({ studentId }) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: serverStudents, isLoading: isStudentsLoading } = useSearchFeeStudents({
    search: searchTerm,
    limit: 50,
  });

  const studentsList = serverStudents || [];

  const [selectedStudentId, setSelectedStudentId] = useState(studentId || "");
  const activeStudentId = selectedStudentId || studentId;

  const selectedStudent =
    (activeStudentId
      ? studentsList.find((s) => s._id === activeStudentId || s.userId === activeStudentId)
      : null) ||
    studentsList[0] ||
    null;

  const [customFeeAccountId, setCustomFeeAccountId] = useState("");
  const selectedFeeAccountId =
    customFeeAccountId || selectedStudent?.feeAccounts?.[0]?._id || "";
  const setSelectedFeeAccountId = (id) => setCustomFeeAccountId(id);

  const [customAmount, setCustomAmount] = useState(null);
  const amount =
    customAmount !== null ? customAmount : (selectedStudent?.pendingAmount || 0);
  const setAmount = (val) => setCustomAmount(val);

  const [paymentMode, setPaymentMode] = useState("UPI");
  const [refNumber, setRefNumber] = useState(
    () => `UPI-${Math.floor(100000 + Math.random() * 900000)}`
  );
  const [discount, setDiscount] = useState(0);
  const [paymentDate, setPaymentDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [remarks, setRemarks] = useState("Tuition installment payment");
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [generatedReceipt, setGeneratedReceipt] = useState(null);

  const collectPaymentMutation = useCollectPaymentMutation();

  const handleStudentChange = (id) => {
    setSelectedStudentId(id);
    setCustomAmount(null);
    setDiscount(0);
    setCustomFeeAccountId("");
  };

  const handleCollect = async (e) => {
    e.preventDefault();
    const finalAmount = Math.max(0, Number(amount) - Number(discount));

    if (finalAmount <= 0) {
      toast.error("Collection amount must be greater than zero");
      return;
    }

    const feeAccount =
      selectedStudent?.feeAccounts?.find((a) => a._id === selectedFeeAccountId) ||
      selectedStudent?.feeAccounts?.[0];

    if (!feeAccount?._id) {
      toast.error("No active fee account selected for this student");
      return;
    }

    try {
      const payload = {
        studentFeeId: feeAccount._id,
        amount: finalAmount,
        mode: paymentMode,
        referenceNumber: refNumber,
        paidAt: new Date(paymentDate).toISOString(),
        remarks: remarks,
      };

      const res = await collectPaymentMutation.mutateAsync(payload);
      const saved = res.data;

      setGeneratedReceipt({
        receiptNo: saved.receiptNo,
        date: new Date(saved.paidAt).toLocaleDateString("en-IN"),
        studentName: saved.student?.fullName || selectedStudent?.name || "Student",
        rollNo: selectedStudent?.rollNo || "MA-STD",
        batch: saved.batch?.name || selectedStudent?.batch || "Enrolled Cohort",
        amount: saved.amount,
        mode: saved.mode,
        refNumber: saved.referenceNumber,
        discount: Number(discount),
        remarks: saved.remarks,
        remainingPending: Math.max(0, (selectedStudent?.pendingAmount || 0) - finalAmount),
      });
      setReceiptOpen(true);
    } catch (err) {
      // Handled by onError in mutation
    }
  };

  return (
    <div className="w-full min-w-0">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6 px-1 sm:px-6 lg:px-8 w-full min-w-0">
        <FeesNav />

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between min-w-0">
            <div className="min-w-0 flex-1">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                Fee Collection Terminal
              </span>

              <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                Collect Student Fee
              </h1>

              <p className="mt-2 text-xs sm:text-sm lg:text-base max-w-2xl text-orange-100 leading-relaxed font-normal">
                Record student tuition payments across cash, UPI, cards, and bank transfers with instant official invoice receipt generation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
              <Link
                href="/admin-panel/fees/fee-plans"
                className="flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition backdrop-blur-xs"
              >
                <FaUserGraduate className="text-xs" />
                <span>Assign Plan</span>
              </Link>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md shrink-0 lg:w-72">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-orange-100 font-semibold uppercase tracking-wider">
                    Pending Dues
                  </p>
                  <FaWallet className="text-white/80" />
                </div>
                <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold">
                  ₹{(selectedStudent?.pendingAmount || 0).toLocaleString("en-IN")}
                </h2>
                <p className="mt-1 text-xs text-orange-100">
                  Next due: {selectedStudent?.dueDate || "No dues pending"}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {isStudentsLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            <FaSpinner className="animate-spin inline mr-2 text-[#D6451B] text-lg" />
            <span>Loading student fee records from server...</span>
          </div>
        ) : studentsList.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-[#D6451B] mb-3">
              <FaUserGraduate />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              No Student Fee Records Found
            </h3>
            <p className="mt-1 text-xs text-slate-500 max-w-md mx-auto">
              There are currently no active student fee accounts in your academy. Assign a fee plan to enrolled students to record payments and generate official receipts.
            </p>
            <div className="mt-5">
              <Link
                href="/admin-panel/fees/fee-plans"
                className="inline-flex items-center gap-2 rounded-xl bg-[#D6451B] px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-[#b93814] transition"
              >
                <FaUserGraduate className="text-xs" />
                <span>Go to Fee Plans & Assign Student</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Form and Student Details Grid */
          <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 w-full min-w-0">
            {/* Left Column: Student Details Card */}
            <div className="lg:col-span-1 space-y-4 sm:space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                    Select Student
                  </h3>
                </div>

                {/* Dynamic search input */}
                <div className="mt-3 relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
                  <input
                    type="text"
                    placeholder="Filter by name / phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 py-2 pl-8 pr-3 text-xs font-semibold text-slate-800 outline-none focus:border-[#D6451B] bg-slate-50"
                  />
                </div>

                <div className="mt-2">
                  <select
                    value={selectedStudent?._id || selectedStudent?.userId}
                    onChange={(e) => handleStudentChange(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-bold text-slate-800 outline-none focus:border-[#D6451B] bg-slate-50"
                  >
                    {studentsList.map((s) => (
                      <option key={s._id || s.userId} value={s._id || s.userId}>
                        {s.name} ({s.phone || s.email || "Student"}) - Dues: ₹{s.pendingAmount || 0}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Fee Account selector if student has multiple accounts */}
                {selectedStudent?.feeAccounts && selectedStudent.feeAccounts.length > 1 && (
                  <div className="mt-3">
                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Select Fee Account
                    </label>
                    <select
                      value={selectedFeeAccountId}
                      onChange={(e) => setSelectedFeeAccountId(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 p-2 text-xs font-semibold text-slate-800 bg-slate-50"
                    >
                      {selectedStudent.feeAccounts.map((acc, idx) => (
                        <option key={acc._id} value={acc._id}>
                          Account #{idx + 1} - {acc.batch?.name || "General"} (Due: ₹{acc.balanceAmount})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectedStudent && (
                  <>
                    <div className="mt-6 flex items-center gap-3.5 pb-4 border-b border-slate-100">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-lg font-bold text-[#D6451B]">
                        {selectedStudent.name ? selectedStudent.name.charAt(0) : "S"}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-base font-bold text-slate-900 truncate">
                          {selectedStudent.name}
                        </h4>
                        <p className="text-xs text-slate-500 truncate">
                          {selectedStudent.email || "Enrolled Student"}
                        </p>
                        <span className="mt-1 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                          Active Student
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 space-y-3 text-xs">
                      <div className="flex items-center gap-2 text-slate-600">
                        <FaPhoneAlt className="text-slate-400 shrink-0" />
                        <span className="truncate">{selectedStudent.phone || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <FaEnvelope className="text-slate-400 shrink-0" />
                        <span className="truncate">{selectedStudent.email || "N/A"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-600">
                        <FaCalendarAlt className="text-slate-400 shrink-0" />
                        <span className="truncate">Due: {selectedStudent.dueDate || "No dues"}</span>
                      </div>
                    </div>

                    {/* Fee Progress Breakdown */}
                    <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">Total Billed Fee</span>
                        <span className="font-bold text-slate-900">
                          ₹{(selectedStudent.totalFee || 0).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500 font-medium">Already Paid</span>
                        <span className="font-bold text-emerald-600">
                          ₹{(selectedStudent.paidAmount || 0).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs font-bold border-t border-slate-100 pt-2">
                        <span className="text-rose-600">Current Outstanding</span>
                        <span className="text-rose-600">
                          ₹{(selectedStudent.pendingAmount || 0).toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                        <div
                          style={{
                            width: `${
                              selectedStudent.totalFee > 0
                                ? Math.round(
                                    (selectedStudent.paidAmount / selectedStudent.totalFee) * 100
                                  )
                                : 0
                            }%`,
                          }}
                          className="h-full rounded-full bg-gradient-to-r from-[#D6451B] to-emerald-500"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Column: Payment Collection Form */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-xs">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      Payment Details
                    </h3>
                    <p className="text-xs text-slate-500">
                      Enter transaction information and submit to update ledger
                    </p>
                  </div>
                  {selectedStudent?.feeAccounts?.[0]?.batch?.name && (
                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-[#D6451B] truncate max-w-[200px]">
                      Batch: {selectedStudent.feeAccounts[0].batch.name}
                    </span>
                  )}
                </div>

                <form onSubmit={handleCollect} className="mt-6 space-y-4 sm:space-y-5">
                  {/* Amount to collect & Discount */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Amount to Collect (₹) *
                      </label>
                      <div className="mt-1.5 relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                          ₹
                        </span>
                        <input
                          type="number"
                          min="1"
                          value={amount}
                          onChange={(e) => setAmount(Number(e.target.value))}
                          required
                          className="w-full rounded-xl border border-slate-200 py-3 pl-8 pr-4 text-sm font-bold text-slate-900 outline-none focus:border-[#D6451B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Scholarship / Discount (₹)
                      </label>
                      <div className="mt-1.5 relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
                          ₹
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={discount}
                          onChange={(e) => setDiscount(Number(e.target.value))}
                          className="w-full rounded-xl border border-slate-200 py-3 pl-8 pr-4 text-sm font-bold text-slate-900 outline-none focus:border-[#D6451B]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Mode Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Payment Method *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {[
                        { mode: "UPI", icon: FaQrcode },
                        { mode: "Cash", icon: FaMoneyBillWave },
                        { mode: "Card", icon: FaCreditCard },
                        { mode: "Net Banking", icon: FaUniversity },
                      ].map((item) => {
                        const Icon = item.icon;
                        const selected = paymentMode === item.mode;
                        return (
                          <button
                            key={item.mode}
                            type="button"
                            onClick={() => {
                              setPaymentMode(item.mode);
                              if (item.mode === "UPI") {
                                setRefNumber(
                                  `UPI-${Math.floor(100000 + Math.random() * 900000)}`
                                );
                              } else if (item.mode === "Card") {
                                setRefNumber(
                                  `CARD-${Math.floor(100000 + Math.random() * 900000)}`
                                );
                              } else if (item.mode === "Cash") {
                                setRefNumber("CASH-COUNTER");
                              } else {
                                setRefNumber(
                                  `NEFT-${Math.floor(100000 + Math.random() * 900000)}`
                                );
                              }
                            }}
                            className={`flex items-center justify-center gap-2 rounded-xl p-3 text-xs font-bold border transition ${
                              selected
                                ? "border-[#D6451B] bg-orange-50 text-[#D6451B] shadow-xs"
                                : "border-slate-200 hover:bg-slate-50 text-slate-700"
                            }`}
                          >
                            <Icon className="text-sm" />
                            <span>{item.mode}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Reference ID & Date */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Transaction / Reference ID
                      </label>
                      <input
                        type="text"
                        value={refNumber}
                        onChange={(e) => setRefNumber(e.target.value)}
                        placeholder="e.g. UPI-984214, Cheque #5501"
                        className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-medium text-slate-900 outline-none focus:border-[#D6451B]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                        Payment Date
                      </label>
                      <input
                        type="date"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                        className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-medium text-slate-900 outline-none focus:border-[#D6451B]"
                      />
                    </div>
                  </div>

                  {/* Remarks */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Remarks / Internal Note
                    </label>
                    <input
                      type="text"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="e.g. Month installment paid by student"
                      className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-xs sm:text-sm font-medium text-slate-900 outline-none focus:border-[#D6451B]"
                    />
                  </div>

                  {/* Net Summary Bar */}
                  <div className="rounded-xl bg-orange-50/80 border border-orange-100 p-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-700">
                        Net Amount to Collect
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Includes discount deduction
                      </p>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#D6451B]">
                      ₹{Math.max(0, Number(amount) - Number(discount)).toLocaleString(
                        "en-IN"
                      )}
                    </h3>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={collectPaymentMutation.isPending || !selectedStudent}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:from-[#b93814] hover:to-orange-600 transition disabled:opacity-60"
                    >
                      {collectPaymentMutation.isPending ? (
                        <>
                          <FaSpinner className="animate-spin" />
                          <span>Recording Payment in Ledger...</span>
                        </>
                      ) : (
                        <>
                          <FaCheckCircle />
                          <span>Record Payment & Generate Official Receipt</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Printable Official Receipt Modal */}
        <AnimatePresence>
          {receiptOpen && generatedReceipt && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-lg rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-7 shadow-2xl border border-slate-200"
              >
                {/* Receipt Header */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6451B] to-orange-500 text-white font-extrabold shadow-xs">
                      MA
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">
                        MyAcademy
                      </h3>
                      <p className="text-[10px] font-bold tracking-wider text-[#D6451B] uppercase">
                        Official Fee Receipt
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setReceiptOpen(false)}
                    className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* Receipt Details Box */}
                <div className="mt-5 space-y-3 rounded-xl bg-slate-50 p-4 border border-slate-100 text-xs">
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Receipt No:</span>
                    <strong className="font-bold text-slate-900">
                      {generatedReceipt.receiptNo}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Payment Date:</span>
                    <span className="font-semibold text-slate-800">
                      {generatedReceipt.date}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Student Name:</span>
                    <strong className="font-bold text-slate-900">
                      {generatedReceipt.studentName}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Batch Cohort:</span>
                    <span className="font-medium text-slate-700">
                      {generatedReceipt.batch}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Payment Mode:</span>
                    <span className="font-bold text-slate-800">
                      {generatedReceipt.mode} ({generatedReceipt.refNumber})
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Remarks:</span>
                    <span className="font-medium text-slate-700">
                      {generatedReceipt.remarks}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 text-sm font-extrabold">
                    <span className="text-slate-900">Amount Paid:</span>
                    <span className="text-emerald-600 text-base">
                      ₹{generatedReceipt.amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs font-semibold text-rose-600">
                    <span>Remaining Balance:</span>
                    <span>
                      ₹{generatedReceipt.remainingPending.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Footer Notice */}
                <p className="mt-4 text-center text-[10px] text-slate-400">
                  This is a computer-generated fee acknowledgement receipt issued by MyAcademy.
                </p>

                {/* Receipt Actions */}
                <div className="mt-5 flex gap-2.5">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 transition"
                  >
                    <FaPrint />
                    <span>Print Receipt</span>
                  </button>
                  <button
                    onClick={() => setReceiptOpen(false)}
                    className="flex items-center justify-center px-4 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
