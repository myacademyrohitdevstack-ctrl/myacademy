"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReceipt,
  FaSearch,
  FaFilter,
  FaFileExport,
  FaEye,
  FaPrint,
  FaTimes,
  FaMoneyBillWave,
  FaWallet,
  FaCreditCard,
  FaCheckCircle,
  FaQrcode,
  FaUniversity,
  FaUndo,
  FaSpinner,
  FaExclamationTriangle,
} from "react-icons/fa";
import FeesNav from "../components/FeesNav";
import { useFeePayments } from "@/Hooks/useFees";
import { useReversePaymentMutation } from "@/app/mutations/feeMutations";
import { toast } from "sonner";

export default function TransactionsClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMode, setSelectedMode] = useState("all");
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [reversalTarget, setReversalTarget] = useState(null);
  const [reversalReason, setReversalReason] = useState("");

  const { data: serverData, isLoading } = useFeePayments({
    search: searchTerm,
    mode: selectedMode !== "all" ? selectedMode : undefined,
  });

  const reversePaymentMutation = useReversePaymentMutation();

  const transactionsList =
    serverData?.data && serverData.data.length > 0
      ? serverData.data.map((p) => ({
          _id: p._id,
          receiptNo: p.receiptNo,
          studentName: p.student?.fullName || "Student",
          rollNo: p.student?.email ? p.student.email.split("@")[0] : "MA-STD",
          batch: p.batch?.name || "General Batch",
          amount: p.amount,
          mode: p.mode,
          refNumber: p.referenceNumber || "N/A",
          date: new Date(p.paidAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: p.status || "completed",
          remarks: p.remarks || "Fee payment",
        }))
      : [];

  const filteredTransactions = transactionsList.filter((tx) => {
    const matchesSearch =
      tx.receiptNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.refNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesMode =
      selectedMode === "all" || tx.mode.toLowerCase() === selectedMode.toLowerCase();

    return matchesSearch && matchesMode;
  });

  const totalCollected = filteredTransactions.reduce(
    (sum, tx) => (tx.status === "completed" ? sum + tx.amount : sum),
    0
  );

  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      toast.error("No transactions to export");
      return;
    }

    const headers = ["Receipt No", "Date", "Student", "Batch", "Amount", "Mode", "Reference", "Status", "Remarks"];
    const rows = filteredTransactions.map((tx) => [
      tx.receiptNo,
      tx.date,
      `"${tx.studentName}"`,
      `"${tx.batch}"`,
      tx.amount,
      tx.mode,
      `"${tx.refNumber}"`,
      tx.status,
      `"${tx.remarks}"`,
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `MyAcademy_Fees_Ledger_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Transaction ledger exported to CSV");
  };

  const handleConfirmReversal = async (e) => {
    e.preventDefault();
    if (!reversalTarget) return;
    if (reversalReason.trim().length < 5) {
      toast.error("Please provide a reason of at least 5 characters.");
      return;
    }

    try {
      await reversePaymentMutation.mutateAsync({
        id: reversalTarget._id,
        reason: reversalReason.trim(),
      });
      setReversalTarget(null);
      setReversalReason("");
    } catch (err) {
      // Handled by onError in mutation
    }
  };

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
                Financial Audit Log
              </span>

              <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                Fee Transactions & Receipts
              </h1>

              <p className="mt-2 text-xs sm:text-sm lg:text-base max-w-2xl text-orange-100 leading-relaxed font-normal">
                Audit complete payment histories, verify reference numbers, reverse mistaken entries, view receipts, and export ledger records.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md shrink-0 lg:w-72">
              <p className="text-xs text-orange-100 font-semibold uppercase tracking-wider">
                Total Inflow (Filtered)
              </p>
              <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold">
                ₹{totalCollected.toLocaleString("en-IN")}
              </h2>
              <p className="mt-1 text-xs text-orange-100">
                {filteredTransactions.length} transaction entries
              </p>
            </div>
          </div>
        </motion.section>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">Total Transactions</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
              {isLoading ? "..." : transactionsList.length}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Recorded in ledger</p>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">UPI / QR Inflows</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-[#D6451B]">
              {transactionsList.filter((t) => t.mode === "UPI").length} receipts
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Instant digital settlement</p>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">Counter Cash Inflows</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
              {transactionsList.filter((t) => t.mode === "Cash").length} receipts
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Direct counter collection</p>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">Active Status</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-emerald-600">
              {transactionsList.filter((t) => t.status === "completed").length} Verified
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {transactionsList.filter((t) => t.status === "reversed").length} Reversed
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <div className="relative flex-1 min-w-0">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search by receipt #, student name, roll number, or transaction ref..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-xs sm:text-sm font-medium text-slate-900 outline-none focus:border-[#D6451B]"
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="rounded-xl border border-slate-200 px-3 py-2.5 text-xs sm:text-sm font-bold text-slate-700 outline-none focus:border-[#D6451B] bg-slate-50"
            >
              <option value="all">All Payment Modes</option>
              <option value="UPI">UPI</option>
              <option value="Cash">Cash Counter</option>
              <option value="Card">Card</option>
              <option value="Net Banking">Net Banking</option>
              <option value="Cheque">Cheque</option>
            </select>

            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              <FaFileExport className="text-slate-400" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 sm:px-6 py-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Recorded Transactions
              </h3>
              <p className="text-xs text-slate-500">
                Showing {filteredTransactions.length} receipts
              </p>
            </div>
            {isLoading && <FaSpinner className="animate-spin text-[#D6451B]" />}
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-slate-500 text-xs sm:text-sm">
              <FaSpinner className="animate-spin inline mr-2 text-[#D6451B]" />
              Loading fee transactions...
            </div>
          ) : filteredTransactions.length > 0 ? (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="px-6 py-3.5">Receipt #</th>
                      <th className="px-4 py-3.5">Date & Time</th>
                      <th className="px-4 py-3.5">Student</th>
                      <th className="px-4 py-3.5">Batch</th>
                      <th className="px-4 py-3.5">Mode & Ref</th>
                      <th className="px-4 py-3.5">Amount</th>
                      <th className="px-4 py-3.5">Status</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredTransactions.map((tx) => (
                      <tr key={tx._id} className="hover:bg-orange-50/40 transition">
                        <td className="px-6 py-4">
                          <span className="font-extrabold text-slate-900">
                            {tx.receiptNo}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-600">
                          {tx.date}
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <p className="font-bold text-slate-900">
                              {tx.studentName}
                            </p>
                            <p className="text-[11px] text-slate-400">
                              {tx.rollNo}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-slate-700">
                          {tx.batch}
                        </td>
                        <td className="px-4 py-4">
                          <div>
                            <span className="inline-block rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                              {tx.mode}
                            </span>
                            <p className="text-[10px] text-slate-400 mt-0.5">
                              {tx.refNumber}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`font-extrabold text-sm ${
                              tx.status === "reversed"
                                ? "text-slate-400 line-through"
                                : "text-emerald-600"
                            }`}
                          >
                            ₹{tx.amount.toLocaleString("en-IN")}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                              tx.status === "reversed"
                                ? "bg-rose-100 text-rose-700"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            {tx.status === "reversed" ? "Reversed" : "Completed"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setSelectedReceipt(tx)}
                              className="inline-flex items-center gap-1.5 rounded-xl bg-orange-50 px-3 py-1.5 text-xs font-bold text-[#D6451B] hover:bg-orange-100 transition"
                            >
                              <FaEye className="text-xs" />
                              <span>Receipt</span>
                            </button>
                            {tx.status !== "reversed" && (
                              <button
                                onClick={() => {
                                  setReversalTarget(tx);
                                  setReversalReason("");
                                }}
                                title="Reverse mistaken payment with audit reason"
                                className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
                              >
                                <FaUndo className="text-[10px]" />
                                <span>Reverse</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="divide-y divide-slate-100 lg:hidden p-3 space-y-3">
                {filteredTransactions.map((tx) => (
                  <div
                    key={tx._id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2.5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-extrabold text-slate-900 text-xs">
                          {tx.receiptNo}
                        </span>
                        <p className="font-bold text-slate-900 text-sm mt-0.5">
                          {tx.studentName}
                        </p>
                      </div>
                      <span
                        className={`font-extrabold text-base ${
                          tx.status === "reversed"
                            ? "text-slate-400 line-through"
                            : "text-emerald-600"
                        }`}
                      >
                        +₹{tx.amount.toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 space-y-0.5">
                      <p className="truncate">
                        <strong>Cohort:</strong> {tx.batch}
                      </p>
                      <p>
                        <strong>Mode:</strong> {tx.mode} ({tx.refNumber})
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {tx.date}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex justify-end gap-2">
                      <button
                        onClick={() => setSelectedReceipt(tx)}
                        className="flex items-center gap-1.5 rounded-xl bg-orange-50 px-3 py-1.5 text-xs font-bold text-[#D6451B] hover:bg-orange-100 transition"
                      >
                        <FaEye className="text-xs" />
                        <span>View Receipt</span>
                      </button>
                      {tx.status !== "reversed" && (
                        <button
                          onClick={() => {
                            setReversalTarget(tx);
                            setReversalReason("");
                          }}
                          className="flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50 px-2.5 py-1.5 text-xs font-bold text-rose-700 hover:bg-rose-100 transition"
                        >
                          <FaUndo className="text-[10px]" />
                          <span>Reverse</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-8 text-center text-slate-400 text-xs sm:text-sm">
              No transaction details found matching your search.
            </div>
          )}
        </div>

        {/* Reversal Confirmation Modal */}
        <AnimatePresence>
          {reversalTarget && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="w-full max-w-md rounded-2xl sm:rounded-3xl bg-white p-5 sm:p-6 shadow-2xl border border-slate-200"
              >
                <div className="flex items-center gap-3 text-rose-600 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-100 text-lg">
                    <FaExclamationTriangle />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Reverse Fee Receipt
                    </h3>
                    <p className="text-xs text-slate-500">
                      Receipt #{reversalTarget.receiptNo}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  This will mark the receipt as reversed, adjust the student’s fee ledger, and retain an immutable audit log.
                </p>

                <form onSubmit={handleConfirmReversal} className="mt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Reason for Reversal * (min 5 characters)
                    </label>
                    <textarea
                      required
                      minLength={5}
                      rows={3}
                      value={reversalReason}
                      onChange={(e) => setReversalReason(e.target.value)}
                      placeholder="e.g. Mistaken double entry or cheque bounce"
                      className="w-full rounded-xl border border-slate-200 p-3 text-xs font-semibold text-slate-800 outline-none focus:border-rose-500 bg-slate-50"
                    />
                  </div>

                  <div className="flex gap-2.5 pt-1">
                    <button
                      type="submit"
                      disabled={reversePaymentMutation.isPending || reversalReason.trim().length < 5}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-rose-600 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-rose-700 transition disabled:opacity-50"
                    >
                      {reversePaymentMutation.isPending ? (
                        <>
                          <FaSpinner className="animate-spin text-xs" />
                          <span>Reversing...</span>
                        </>
                      ) : (
                        <span>Confirm Reversal</span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setReversalTarget(null)}
                      className="px-4 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* View Receipt Modal */}
        <AnimatePresence>
          {selectedReceipt && (
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
                      MA
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">
                        MyAcademy
                      </h3>
                      <p className="text-[10px] font-bold tracking-wider text-[#D6451B] uppercase">
                        Official Payment Receipt
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedReceipt(null)}
                    className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="mt-5 space-y-3 rounded-xl bg-slate-50 p-4 border border-slate-100 text-xs">
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Receipt Number:</span>
                    <strong className="font-bold text-slate-900">
                      {selectedReceipt.receiptNo}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Transaction Date:</span>
                    <span className="font-medium text-slate-700">
                      {selectedReceipt.date}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Student:</span>
                    <strong className="font-bold text-slate-900">
                      {selectedReceipt.studentName}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Batch Cohort:</span>
                    <span className="font-medium text-slate-700">
                      {selectedReceipt.batch}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Payment Mode:</span>
                    <span className="font-bold text-slate-800">
                      {selectedReceipt.mode} ({selectedReceipt.refNumber})
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Status:</span>
                    <span
                      className={`font-bold ${
                        selectedReceipt.status === "reversed"
                          ? "text-rose-600"
                          : "text-emerald-600"
                      }`}
                    >
                      {selectedReceipt.status === "reversed" ? "REVERSED" : "COMPLETED"}
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-2">
                    <span className="text-slate-500">Notes:</span>
                    <span className="font-medium text-slate-700">
                      {selectedReceipt.remarks}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 text-sm font-extrabold">
                    <span className="text-slate-900">Amount Received:</span>
                    <span
                      className={`text-base ${
                        selectedReceipt.status === "reversed"
                          ? "text-slate-400 line-through"
                          : "text-emerald-600"
                      }`}
                    >
                      ₹{selectedReceipt.amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-center text-[10px] text-slate-400">
                  Certified payment receipt issued via MyAcademy Finance Ledger.
                </p>

                <div className="mt-5 flex gap-2.5">
                  <button
                    onClick={() => window.print()}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-xs sm:text-sm font-bold text-white hover:bg-slate-800 transition"
                  >
                    <FaPrint />
                    <span>Print Receipt</span>
                  </button>
                  <button
                    onClick={() => setSelectedReceipt(null)}
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
