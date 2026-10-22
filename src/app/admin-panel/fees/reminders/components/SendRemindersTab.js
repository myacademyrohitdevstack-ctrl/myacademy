"use client";

import { useState, useMemo } from "react";
import {
  FaSearch,
  FaFilter,
  FaWhatsapp,
  FaPaperPlane,
  FaCalendarAlt,
  FaUserGraduate,
  FaUserFriends,
  FaCheckSquare,
  FaSquare,
  FaExclamationCircle,
  FaInfoCircle,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import { usePendingFees } from "@/Hooks/useFees";

export default function SendRemindersTab({
  templates = [],
  integrationData,
  initialFilter = "all_pending",
  onOpenManualModal,
  onOpenBulkConfirmModal,
}) {
  const [filterType, setFilterType] = useState(initialFilter); // 'all_pending', 'due_today', 'overdue'
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFeeIds, setSelectedFeeIds] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [recipientRole, setRecipientRole] = useState("student"); // 'student' or 'parent'

  const { data: serverPending, isLoading } = usePendingFees();

  // Normalize candidate fee items
  const feeCandidates = useMemo(() => {
    if (!serverPending || !Array.isArray(serverPending)) return [];

    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    return serverPending.map((f) => {
      const dueDateObj = f.nextDueDate ? new Date(f.nextDueDate) : null;
      const isDueToday = dueDateObj && dueDateObj >= startOfToday && dueDateObj <= endOfToday;
      const isOverdue = dueDateObj && dueDateObj < startOfToday;
      const daysOverdue = isOverdue
        ? Math.max(1, Math.floor((startOfToday.getTime() - dueDateObj.getTime()) / (1000 * 3600 * 24)))
        : 0;

      return {
        _id: f._id,
        studentId: f.student?._id || f._id,
        studentName: f.student?.fullName || "Student",
        rollNo: f.student?.email ? f.student.email.split("@")[0] : "MA-STD",
        phone: f.student?.phone || "",
        batch: f.batch?.name || "General Batch",
        totalPayable: f.totalPayable || 0,
        paidAmount: f.paidAmount || 0,
        balanceAmount: f.balanceAmount || 0,
        dueDate: dueDateObj,
        formattedDueDate: dueDateObj
          ? dueDateObj.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
          : "Promptly",
        isDueToday,
        isOverdue,
        daysOverdue,
        rawDoc: f,
      };
    });
  }, [serverPending]);

  // Filter candidates
  const filteredCandidates = useMemo(() => {
    return feeCandidates.filter((item) => {
      // 1. Dues status filter
      if (filterType === "due_today" && !item.isDueToday) return false;
      if (filterType === "overdue" && !item.isOverdue) return false;

      // 2. Search filter
      if (searchTerm.trim()) {
        const s = searchTerm.toLowerCase();
        const matchesName = item.studentName.toLowerCase().includes(s);
        const matchesRoll = item.rollNo.toLowerCase().includes(s);
        const matchesPhone = item.phone.includes(s);
        const matchesBatch = item.batch.toLowerCase().includes(s);
        if (!matchesName && !matchesRoll && !matchesPhone && !matchesBatch) return false;
      }

      return true;
    });
  }, [feeCandidates, filterType, searchTerm]);

  // Toggle single selection
  const handleToggleSelect = (id) => {
    setSelectedFeeIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle select all in current filtered view
  const handleToggleSelectAll = () => {
    if (selectedFeeIds.length === filteredCandidates.length && filteredCandidates.length > 0) {
      setSelectedFeeIds([]);
    } else {
      setSelectedFeeIds(filteredCandidates.map((c) => c._id));
    }
  };

  const selectedCount = selectedFeeIds.length;
  const totalFilteredOutstanding = filteredCandidates.reduce((acc, c) => acc + c.balanceAmount, 0);

  const isCloudApiConnected =
    integrationData?.mode === "cloud_api" && integrationData?.connectionStatus === "connected";

  const formatCurrency = (val) =>
    Number(val || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  return (
    <div className="space-y-5">
      {/* 1. Header & Channel Notice */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900">Send Fee Reminders</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select students with unpaid fees to preview and send targeted WhatsApp notifications.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1.5 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 ${
              isCloudApiConnected
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            <FaWhatsapp className="text-sm" />
            {isCloudApiConnected
              ? "Meta Cloud API Active (Automated Background Send)"
              : "Manual Mode Active (WhatsApp Web / Click-to-Chat)"}
          </span>
        </div>
      </div>

      {/* 2. Controls & Filter Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        {/* Top row: Filter tabs & Recipient switch */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none bg-slate-100 p-1 rounded-xl text-xs font-bold w-full sm:w-fit">
            <button
              onClick={() => {
                setFilterType("all_pending");
                setSelectedFeeIds([]);
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all shrink-0 ${
                filterType === "all_pending"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Pending ({feeCandidates.length})
            </button>
            <button
              onClick={() => {
                setFilterType("overdue");
                setSelectedFeeIds([]);
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all shrink-0 ${
                filterType === "overdue"
                  ? "bg-rose-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-rose-600"
              }`}
            >
              Overdue ({feeCandidates.filter((c) => c.isOverdue).length})
            </button>
            <button
              onClick={() => {
                setFilterType("due_today");
                setSelectedFeeIds([]);
              }}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all shrink-0 ${
                filterType === "due_today"
                  ? "bg-amber-500 text-white shadow-xs"
                  : "text-slate-600 hover:text-amber-600"
              }`}
            >
              Due Today ({feeCandidates.filter((c) => c.isDueToday).length})
            </button>
          </div>

          {/* Right side: Recipient Role toggle + Template selector */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 w-full lg:w-auto">
            {/* Recipient Role */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-bold w-full sm:w-auto justify-center">
              <button
                onClick={() => setRecipientRole("student")}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg inline-flex items-center justify-center gap-1.5 transition-all ${
                  recipientRole === "student"
                    ? "bg-white text-[#D6451B] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FaUserGraduate className="text-xs" /> Student
              </button>
              <button
                onClick={() => setRecipientRole("parent")}
                className={`flex-1 sm:flex-initial px-3 py-1.5 rounded-lg inline-flex items-center justify-center gap-1.5 transition-all ${
                  recipientRole === "parent"
                    ? "bg-white text-[#D6451B] shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <FaUserFriends className="text-xs" /> Parent / Guardian
              </button>
            </div>

            {/* Template Selector */}
            <select
              value={selectedTemplateId}
              onChange={(e) => setSelectedTemplateId(e.target.value)}
              className="w-full sm:w-auto text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D6451B]/20"
            >
              <option value="">Default Friendly Template</option>
              {templates
                .filter((t) => t.isActive)
                .map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.name} ({t.category})
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Bottom row: Search input & Bulk Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="relative w-full sm:w-80">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search by student, roll no, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#D6451B]/20"
            />
          </div>

          {/* Bulk Send CTA */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() =>
                onOpenBulkConfirmModal({
                  filterType: selectedCount > 0 ? "selected" : filterType,
                  selectedFeeIds: selectedCount > 0 ? selectedFeeIds : filteredCandidates.map((c) => c._id),
                  templateId: selectedTemplateId,
                  recipientRole,
                  candidates: selectedCount > 0
                    ? filteredCandidates.filter((c) => selectedFeeIds.includes(c._id))
                    : filteredCandidates,
                })
              }
              disabled={filteredCandidates.length === 0}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 hover:from-orange-600 hover:to-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-200 inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <FaPaperPlane className="text-xs" />
              {selectedCount > 0
                ? `Send to Selected (${selectedCount})`
                : `Send to All in List (${filteredCandidates.length})`}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Students Table */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="text-center py-12 text-slate-500">
            <FaSpinner className="mx-auto text-2xl text-[#D6451B] animate-spin mb-2" />
            <p className="text-xs font-semibold">Loading fee records...</p>
          </div>
        ) : filteredCandidates.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <FaCheckCircle className="mx-auto text-3xl text-emerald-500 mb-2" />
            <p className="text-sm font-bold text-slate-800">No pending dues found</p>
            <p className="text-xs text-slate-400 mt-1">
              All student fee installments for the selected criteria are fully settled.
            </p>
          </div>
        ) : (
          <div>
            {/* Mobile Cards View (< 768px) */}
            <div className="space-y-3 md:hidden">
              {/* Select All Bar on Mobile */}
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                <button
                  onClick={handleToggleSelectAll}
                  className="flex items-center gap-2 text-xs font-bold text-slate-700"
                >
                  {selectedCount === filteredCandidates.length && filteredCandidates.length > 0 ? (
                    <FaCheckSquare className="text-base text-[#D6451B]" />
                  ) : (
                    <FaSquare className="text-base text-slate-300" />
                  )}
                  <span>Select All ({filteredCandidates.length})</span>
                </button>
                <span className="text-xs text-slate-500 font-semibold">{selectedCount} selected</span>
              </div>

              {filteredCandidates.map((candidate) => {
                const isSelected = selectedFeeIds.includes(candidate._id);
                return (
                  <div
                    key={candidate._id}
                    className={`p-3.5 rounded-2xl border transition-all space-y-2.5 ${
                      isSelected
                        ? "bg-orange-50/40 border-[#D6451B]/60 shadow-xs"
                        : "bg-white border-slate-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5 min-w-0">
                        <button
                          onClick={() => handleToggleSelect(candidate._id)}
                          className="text-slate-400 mt-0.5 shrink-0"
                        >
                          {isSelected ? (
                            <FaCheckSquare className="text-base text-[#D6451B]" />
                          ) : (
                            <FaSquare className="text-base text-slate-300" />
                          )}
                        </button>
                        <div className="min-w-0">
                          <p className="font-extrabold text-slate-900 text-xs sm:text-sm truncate">
                            {candidate.studentName}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {candidate.batch} {candidate.rollNo ? `• ${candidate.rollNo}` : ""}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          candidate.isOverdue
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : candidate.isDueToday
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {candidate.formattedDueDate}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] text-slate-400">Balance Due</p>
                        <p className="font-black text-slate-900 text-xs sm:text-sm">
                          {formatCurrency(candidate.balanceAmount)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400">Contact</p>
                        <p className="font-semibold text-slate-700 text-[11px]">
                          {candidate.phone || "No phone"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        onOpenManualModal({
                          candidate,
                          templateId: selectedTemplateId,
                          recipientRole,
                        })
                      }
                      className="w-full py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#D6451B] font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <FaWhatsapp className="text-sm" /> Send / Preview Reminder
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table View (>= 768px) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500 font-bold">
                    <th className="pb-3 w-10">
                      <button
                        onClick={handleToggleSelectAll}
                        className="text-slate-400 hover:text-slate-600"
                        title="Select all"
                      >
                        {selectedCount === filteredCandidates.length && filteredCandidates.length > 0 ? (
                          <FaCheckSquare className="text-base text-[#D6451B]" />
                        ) : (
                          <FaSquare className="text-base text-slate-300" />
                        )}
                      </button>
                    </th>
                    <th className="pb-3">Student</th>
                    <th className="pb-3">Batch</th>
                    <th className="pb-3">Pending Balance</th>
                    <th className="pb-3">Due Date</th>
                    <th className="pb-3">Contact</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCandidates.map((candidate) => {
                    const isSelected = selectedFeeIds.includes(candidate._id);
                    return (
                      <tr
                        key={candidate._id}
                        className={`hover:bg-slate-50/60 transition-colors ${
                          isSelected ? "bg-orange-50/30" : ""
                        }`}
                      >
                        <td className="py-3">
                          <button
                            onClick={() => handleToggleSelect(candidate._id)}
                            className="text-slate-400 hover:text-slate-600"
                          >
                            {isSelected ? (
                              <FaCheckSquare className="text-base text-[#D6451B]" />
                            ) : (
                              <FaSquare className="text-base text-slate-300" />
                            )}
                          </button>
                        </td>
                        <td className="py-3">
                          <p className="font-extrabold text-slate-900">{candidate.studentName}</p>
                          <p className="text-[11px] text-slate-400 font-medium">{candidate.rollNo}</p>
                        </td>
                        <td className="py-3 font-semibold text-slate-700">{candidate.batch}</td>
                        <td className="py-3">
                          <p className="font-extrabold text-slate-900">
                            {formatCurrency(candidate.balanceAmount)}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Paid: {formatCurrency(candidate.paidAmount)}
                          </p>
                        </td>
                        <td className="py-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${
                              candidate.isOverdue
                                ? "bg-rose-50 text-rose-700 border border-rose-200"
                                : candidate.isDueToday
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {candidate.formattedDueDate}
                            {candidate.isOverdue && ` (${candidate.daysOverdue}d overdue)`}
                          </span>
                        </td>
                        <td className="py-3 font-medium text-slate-600">{candidate.phone || "No phone"}</td>
                        <td className="py-3 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() =>
                                onOpenManualModal({
                                  candidate,
                                  templateId: selectedTemplateId,
                                  recipientRole,
                                })
                              }
                              className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#D6451B] font-bold text-xs inline-flex items-center gap-1 transition-colors"
                            >
                              <FaWhatsapp className="text-sm" /> Send / Preview
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
