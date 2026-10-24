"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaWhatsapp,
  FaPaperPlane,
  FaExclamationTriangle,
  FaCheckCircle,
  FaUsers,
  FaInfoCircle,
  FaSpinner,
  FaMobileAlt,
  FaCloud,
  FaCog,
  FaCheck,
} from "react-icons/fa";
import { useSendBulkRemindersMutation } from "@/app/mutations/whatsappReminderMutations";

export default function BulkSendConfirmModal({
  isOpen,
  onClose,
  data, // { filterType, selectedFeeIds, templateId, recipientRole, candidates }
  templates = [],
  integrationData,
}) {
  const bulkSendMutation = useSendBulkRemindersMutation();

  const isCloudApiConnected =
    integrationData?.mode === "cloud_api" && integrationData?.connectionStatus === "connected";

  const [dispatchMode, setDispatchMode] = useState(
    isCloudApiConnected ? "custom_api" : "myacademy_api"
  );

  if (!isOpen || !data) return null;

  const candidates = data.candidates || [];
  const validRecipients = candidates.filter((c) => c.phone && c.phone.trim().length >= 10);
  const invalidRecipients = candidates.filter((c) => !c.phone || c.phone.trim().length < 10);
  const totalAmountDue = candidates.reduce((sum, c) => sum + (c.balanceAmount || 0), 0);

  const selectedTemplate = templates.find((t) => t._id === data.templateId);
  const templateBody = selectedTemplate
    ? selectedTemplate.messageBody
    : "Dear {{parentName}}, friendly fee reminder from {{academyName}} for {{studentName}} ({{className}}). Outstanding amount is ₹{{pendingAmount}}, due on {{dueDate}}. Thank you!";

  const handleConfirm = () => {
    bulkSendMutation.mutate(
      {
        filterType: data.filterType,
        selectedFeeIds: data.selectedFeeIds,
        templateId: data.templateId || null,
        recipientRole: data.recipientRole || "student",
        dispatchMode,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const formatCurrency = (val) =>
    Number(val || 0).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden my-4 sm:my-6"
        >
          {/* Header */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-b border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-[#D6451B] flex items-center justify-center text-white shadow-xs shrink-0">
                <FaUsers className="text-lg sm:text-xl" />
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-slate-900 text-xs sm:text-base truncate">
                  Confirm Bulk Fee Reminders
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
                  Review recipient counts, templates, and delivery method
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors shrink-0"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>

          <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
            {/* 3 WhatsApp Messaging Dispatch Modes */}
            <div className="space-y-2">
              <label className="block text-[11px] font-extrabold uppercase tracking-wider text-slate-600">
                Choose WhatsApp Dispatch Method
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* 1. MyAcademy WhatsApp API (Managed) */}
                <div
                  onClick={() => setDispatchMode("myacademy_api")}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    dispatchMode === "myacademy_api"
                      ? "bg-purple-50/70 border-purple-600 ring-2 ring-purple-600/20"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-xs text-purple-900 flex items-center gap-1.5">
                        <FaCloud className="text-purple-600" /> MyAcademy API
                      </span>
                      {dispatchMode === "myacademy_api" && (
                        <FaCheck className="text-purple-600 text-xs" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Platform managed gateway. Instant cloud dispatch with zero setup.
                    </p>
                  </div>
                  <span className="mt-2 text-[9px] font-bold text-purple-700 uppercase">Recommended</span>
                </div>

                {/* 2. Direct Admin WhatsApp */}
                <div
                  onClick={() => setDispatchMode("direct_whatsapp")}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    dispatchMode === "direct_whatsapp"
                      ? "bg-orange-50/70 border-[#D6451B] ring-2 ring-[#D6451B]/20"
                      : "bg-white border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-xs text-slate-900 flex items-center gap-1.5">
                        <FaMobileAlt className="text-[#D6451B]" /> Direct WhatsApp
                      </span>
                      {dispatchMode === "direct_whatsapp" && (
                        <FaCheck className="text-[#D6451B] text-xs" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      Creates Click-to-Chat links for sending directly from admin WhatsApp.
                    </p>
                  </div>
                  <span className="mt-2 text-[9px] font-bold text-orange-700 uppercase">Manual Links</span>
                </div>

                {/* 3. Custom Meta Cloud API */}
                <div
                  onClick={() => {
                    if (isCloudApiConnected) setDispatchMode("custom_api");
                  }}
                  className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                    !isCloudApiConnected
                      ? "bg-slate-50 border-slate-200 opacity-60 cursor-not-allowed"
                      : dispatchMode === "custom_api"
                      ? "bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-600/20 cursor-pointer"
                      : "bg-white border-slate-200 hover:border-slate-300 cursor-pointer"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-extrabold text-xs text-emerald-900 flex items-center gap-1.5">
                        <FaCog className="text-emerald-600" /> Custom Meta API
                      </span>
                      {dispatchMode === "custom_api" && (
                        <FaCheck className="text-emerald-600 text-xs" />
                      )}
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">
                      {isCloudApiConnected
                        ? "Dispatches using your academy's custom Meta Cloud API credentials."
                        : "Not configured. Configure in Integration Settings to use."}
                    </p>
                  </div>
                  <span className="mt-2 text-[9px] font-bold text-emerald-700 uppercase">
                    {isCloudApiConnected ? "Meta Verified" : "Unconnected"}
                  </span>
                </div>
              </div>
            </div>

            {/* Recipient Summary Cards */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                <p className="text-[10px] uppercase font-bold text-slate-500">Total Selected</p>
                <p className="text-xl font-black text-slate-900 mt-0.5">{candidates.length}</p>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                <p className="text-[10px] uppercase font-bold text-emerald-700">Valid Phone</p>
                <p className="text-xl font-black text-emerald-800 mt-0.5">{validRecipients.length}</p>
              </div>
              <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-center">
                <p className="text-[10px] uppercase font-bold text-rose-700">Invalid Phone</p>
                <p className="text-xl font-black text-rose-800 mt-0.5">{invalidRecipients.length}</p>
              </div>
            </div>

            {/* Total Balance Being Reminded */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <span className="font-bold text-slate-700">Total Outstanding Balance:</span>
              <span className="font-black text-slate-900 text-sm">{formatCurrency(totalAmountDue)}</span>
            </div>

            {/* Message Template Preview */}
            <div>
              <p className="font-bold text-slate-700 mb-1">
                Template: {selectedTemplate?.name || "Default Fee Reminder"}
              </p>
              <div className="p-3.5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
                {templateBody}
              </div>
            </div>

            {/* Warning for Invalid Recipients */}
            {invalidRecipients.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900">
                <p className="font-bold flex items-center gap-1.5 text-xs">
                  <FaExclamationTriangle className="text-rose-600" />
                  {invalidRecipients.length} Student(s) Missing Valid Phone Numbers
                </p>
                <p className="text-[11px] text-rose-700 mt-0.5">
                  These students will be automatically skipped during processing:
                </p>
                <ul className="mt-1 list-disc list-inside text-[11px] text-rose-800 space-y-0.5 max-h-24 overflow-y-auto">
                  {invalidRecipients.map((c) => (
                    <li key={c._id}>
                      {c.studentName} ({c.batch}) — {c.phone ? `"${c.phone}" (invalid)` : "Missing phone"}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors text-center"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={bulkSendMutation.isPending || validRecipients.length === 0}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 hover:from-orange-600 hover:to-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-200 inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {bulkSendMutation.isPending ? (
                <>
                  <FaSpinner className="animate-spin text-xs" /> Processing...
                </>
              ) : (
                <>
                  <FaPaperPlane className="text-xs" />
                  Confirm & Dispatch ({validRecipients.length})
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
