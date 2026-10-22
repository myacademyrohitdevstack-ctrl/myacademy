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

  if (!isOpen || !data) return null;

  const candidates = data.candidates || [];
  const validRecipients = candidates.filter((c) => c.phone && c.phone.trim().length >= 10);
  const invalidRecipients = candidates.filter((c) => !c.phone || c.phone.trim().length < 10);
  const totalAmountDue = candidates.reduce((sum, c) => sum + (c.balanceAmount || 0), 0);

  const selectedTemplate = templates.find((t) => t._id === data.templateId);
  const templateBody = selectedTemplate
    ? selectedTemplate.messageBody
    : "Dear {{parentName}}, friendly fee reminder from {{academyName}} for {{studentName}} ({{className}}). Outstanding amount is ₹{{pendingAmount}}, due on {{dueDate}}. Thank you!";

  const isCloudApiConnected =
    integrationData?.mode === "cloud_api" && integrationData?.connectionStatus === "connected";

  const handleConfirm = () => {
    bulkSendMutation.mutate(
      {
        filterType: data.filterType,
        selectedFeeIds: data.selectedFeeIds,
        templateId: data.templateId || null,
        recipientRole: data.recipientRole || "student",
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
          className="bg-white rounded-3xl border border-slate-200 shadow-2xl w-full max-w-xl overflow-hidden my-6"
        >
          {/* Header */}
          <div className="px-6 py-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-[#D6451B] flex items-center justify-center text-white shadow-xs">
                <FaUsers className="text-xl" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-base">
                  Confirm Bulk Fee Reminders
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Review recipient counts, templates, and delivery method
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>

          <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
            {/* Delivery Method Banner */}
            <div
              className={`p-3.5 rounded-2xl border flex items-start gap-2.5 ${
                isCloudApiConnected
                  ? "bg-emerald-50/70 border-emerald-200 text-emerald-900"
                  : "bg-amber-50/80 border-amber-200 text-amber-900"
              }`}
            >
              {isCloudApiConnected ? (
                <FaCheckCircle className="text-emerald-600 mt-0.5 shrink-0 text-sm" />
              ) : (
                <FaInfoCircle className="text-amber-600 mt-0.5 shrink-0 text-sm" />
              )}
              <div>
                <p className="font-bold">
                  {isCloudApiConnected
                    ? "Dispatch Mode: Official WhatsApp Cloud API"
                    : "Dispatch Mode: Manual Click-to-Chat Generation"}
                </p>
                <p className="text-[11px] font-medium mt-0.5">
                  {isCloudApiConnected
                    ? "Messages will be sent directly in the background using your Meta Business Cloud API integration."
                    : "Reminders will be created as drafts with prepopulated Click-to-Chat links. The system will NOT claim delivery until you manually confirm."}
                </p>
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
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={bulkSendMutation.isPending || validRecipients.length === 0}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 hover:from-orange-600 hover:to-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-200 inline-flex items-center gap-2 transition-all disabled:opacity-50"
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
