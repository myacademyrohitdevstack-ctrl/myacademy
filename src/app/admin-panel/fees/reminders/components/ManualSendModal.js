"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaWhatsapp,
  FaPaperPlane,
  FaClock,
  FaUserGraduate,
  FaUserFriends,
  FaCheckCircle,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaEdit,
  FaExclamationTriangle,
  FaSpinner,
  FaMobileAlt,
  FaCloud,
  FaEnvelope,
} from "react-icons/fa";
import {
  previewWhatsAppReminderApi,
  sendManualWhatsAppReminderApi,
  confirmManualSendApi,
  scheduleWhatsAppReminderApi,
} from "@/app/api/whatsappReminderApi";
import queryClient from "@/lib/queryClient";
import { toast } from "sonner";

function ManualSendDialog({
  onClose,
  candidate,
  templates,
  integrationData,
  initialRecipientRole = "student",
}) {
  const [recipientRole, setRecipientRole] = useState(initialRecipientRole || "student");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [selectedInstallmentId, setSelectedInstallmentId] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [scheduledAt, setScheduledAt] = useState("");

  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewData, setPreviewData] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [sentReminderRecord, setSentReminderRecord] = useState(null);

  const isCloudApiConnected =
    integrationData?.mode === "cloud_api" && integrationData?.connectionStatus === "connected";

  const installments = candidate?.rawDoc?.installments || [];

  // Load preview whenever relevant inputs change
  useEffect(() => {
    let cancelled = false;

    const fetchPreview = async () => {
      setPreviewLoading(true);
      try {
        const res = await previewWhatsAppReminderApi({
          studentFeeId: candidate._id,
          installmentId: selectedInstallmentId || null,
          templateId: selectedTemplateId || null,
          customTemplateBody: isEditing && customMessage ? customMessage : null,
          recipientRole,
        });

        if (!cancelled && res.data?.success) {
          setPreviewData(res.data.data);
        }
      } catch (err) {
        console.error("Preview fetch error:", err);
      } finally {
        if (!cancelled) setPreviewLoading(false);
      }
    };

    fetchPreview();
    return () => {
      cancelled = true;
    };
  }, [candidate._id, selectedInstallmentId, selectedTemplateId, recipientRole, isEditing, customMessage]);

  const handleToggleEditing = () => {
    if (!isEditing) {
      setCustomMessage(previewData?.renderedMessage || "");
      setIsEditing(true);
    } else {
      setIsEditing(false);
      setCustomMessage("");
    }
  };

  const handleSend = async (channelPreference = "auto") => {
    setActionLoading(true);
    try {
      const res = await sendManualWhatsAppReminderApi({
        studentFeeId: candidate._id,
        installmentId: selectedInstallmentId || null,
        templateId: selectedTemplateId || null,
        customMessage: customMessage || null,
        recipientRole,
        channelPreference,
      });

      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-list"] });

      if (channelPreference === "click_to_chat" || channelPreference === "direct_whatsapp") {
        const record = res.data?.data;
        const clickUrl = res.data?.clickToChatUrl || record?.clickToChatUrl;
        const clickUrls = res.data?.clickToChatUrls || [];
        setSentReminderRecord(record);
        if (clickUrls.length > 1) {
          clickUrls.forEach((item) => {
            if (item.url) window.open(item.url, "_blank", "noopener,noreferrer");
          });
        } else if (clickUrl) {
          window.open(clickUrl, "_blank", "noopener,noreferrer");
        }
        toast.info(res.data?.message || "WhatsApp opened. Please click 'Confirm Manually Sent' after sending.");
      } else if (channelPreference === "myacademy_api") {
        toast.success(res.data?.message || "Reminder dispatched via MyAcademy WhatsApp Gateway!");
        onClose();
      } else if (channelPreference === "resend_email" || channelPreference === "email") {
        toast.success(res.data?.message || "Payment reminder email successfully dispatched via Resend!");
        onClose();
      } else {
        toast.success(res.data?.message || "Reminder dispatched via WhatsApp Cloud API!");
        onClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to dispatch reminder.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleConfirmManual = async () => {
    if (!sentReminderRecord?._id) return;
    setActionLoading(true);
    try {
      await confirmManualSendApi(sentReminderRecord._id);
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-list"] });
      toast.success("Reminder confirmed and marked as sent in history.");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to confirm manual send.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSchedule = async () => {
    if (!scheduledAt || new Date(scheduledAt) <= new Date()) {
      toast.error("Please pick a valid future date and time.");
      return;
    }
    setActionLoading(true);
    try {
      await scheduleWhatsAppReminderApi({
        studentFeeId: candidate._id,
        installmentId: selectedInstallmentId || null,
        scheduledAt,
        templateId: selectedTemplateId || null,
        customMessage: customMessage || null,
        recipientRole,
      });

      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-scheduled-reminders"] });
      toast.success("Reminder successfully scheduled!");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to schedule reminder.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden my-4 sm:my-6"
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-transparent border-b border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#D6451B] to-orange-500 flex items-center justify-center text-white shadow-xs shrink-0">
              <FaWhatsapp className="text-lg sm:text-xl" />
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-base truncate">
                Fee Reminder Preview & Dispatch
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
                {candidate.studentName} ({candidate.batch})
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

        <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Recipient Contact Status Alert */}
          {previewData?.recipient && (
            <div
              className={`p-3.5 rounded-2xl border text-xs flex items-start gap-2.5 ${
                previewData.recipient.isValidPhone
                  ? "bg-emerald-50/70 border-emerald-200 text-emerald-800"
                  : "bg-rose-50/80 border-rose-200 text-rose-800"
              }`}
            >
              {previewData.recipient.isValidPhone ? (
                <FaCheckCircle className="text-emerald-600 mt-0.5 shrink-0 text-sm" />
              ) : (
                <FaExclamationTriangle className="text-rose-600 mt-0.5 shrink-0 text-sm" />
              )}
              <div>
                <p className="font-bold">
                  Target Recipient: {previewData.recipient.name} ({recipientRole === "both" ? "Student & Parent" : previewData.recipient.role})
                </p>
                {recipientRole === "both" ? (
                  <div className="mt-1 space-y-0.5 text-[11px] text-slate-700 font-medium">
                    <p>
                      • Student ({candidate.studentName}): {previewData.recipient.studentContact?.phone || candidate.phone || "No phone"}
                      {(previewData.recipient.studentContact?.email || candidate?.studentEmail || candidate?.email) && (
                        <span className="text-blue-700 font-semibold"> • Email: {previewData.recipient.studentContact?.email || candidate?.studentEmail || candidate?.email}</span>
                      )}
                    </p>
                    <p>
                      • Parent / Guardian: {previewData.recipient.parentContact?.phone || "No phone linked"}
                      {previewData.recipient.parentContact?.email && (
                        <span className="text-blue-700 font-semibold"> • Email: {previewData.recipient.parentContact.email}</span>
                      )}
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-[11px] text-slate-700 font-medium mt-0.5">
                      Phone: {previewData.recipient.phone || "No phone configured"}
                      {(previewData.recipient.email || candidate?.studentEmail || candidate?.email) && (
                        <span className="ml-2 font-semibold text-blue-700">
                          • Email: {previewData.recipient.email || candidate?.studentEmail || candidate?.email}
                        </span>
                      )}
                    </p>
                    {!previewData.recipient.isValidPhone && (
                      <p className="text-[11px] font-semibold mt-0.5">
                        Phone Number Warning: {previewData.recipient.phoneValidationReason}. You can still dispatch reminders via Resend Email if email is configured.
                      </p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Config Row: Installment, Role, Template */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Installment
              </label>
              <select
                value={selectedInstallmentId}
                onChange={(e) => setSelectedInstallmentId(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D6451B]/20"
              >
                <option value="">Consolidated Balance (₹{candidate.balanceAmount})</option>
                {installments.map((inst) => (
                  <option key={inst._id} value={inst._id}>
                    {inst.label} (₹{inst.amount - (inst.paidAmount || 0)} due)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Recipient
              </label>
              <select
                value={recipientRole}
                onChange={(e) => setRecipientRole(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D6451B]/20"
              >
                <option value="student">Student ({candidate.studentName})</option>
                <option value="parent">Parent / Guardian</option>
                <option value="both">Both (Student &amp; Parent)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Template
              </label>
              <select
                value={selectedTemplateId}
                onChange={(e) => {
                  setSelectedTemplateId(e.target.value);
                  setIsEditing(false);
                  setCustomMessage("");
                }}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D6451B]/20"
              >
                <option value="">Default Reminder Template</option>
                {templates
                  .filter((t) => t.isActive)
                  .map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Message Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-600 uppercase">
                Message Preview {isEditing && "(Customized)"}
              </span>
              <button
                onClick={handleToggleEditing}
                className="text-xs font-bold text-[#D6451B] hover:text-orange-600 inline-flex items-center gap-1"
              >
                <FaEdit className="text-[10px]" />
                {isEditing ? "Reset to Template" : "Edit Message"}
              </button>
            </div>

            {previewLoading ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                <FaSpinner className="mx-auto text-xl text-[#D6451B] animate-spin mb-1" />
                <p className="text-xs text-slate-500 font-medium">Rendering variables...</p>
              </div>
            ) : isEditing ? (
              <textarea
                rows={6}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                className="w-full p-3.5 text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D6451B]/20 leading-relaxed"
              />
            ) : (
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs whitespace-pre-wrap leading-relaxed border border-slate-800 shadow-inner">
                {previewData?.renderedMessage || "No preview generated"}
              </div>
            )}
          </div>

          {/* Click-to-Chat Manual Confirmation Banner */}
          {sentReminderRecord && (
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-teal-900 text-xs space-y-2">
              <p className="font-bold flex items-center gap-1.5">
                <FaCheckCircle className="text-teal-600 text-sm" /> WhatsApp conversation opened!
              </p>
              <p className="text-[11px] text-teal-800">
                Please review and click Send in WhatsApp. Once sent, click the button below to record this
                reminder in your academy history.
              </p>
              <button
                onClick={handleConfirmManual}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs inline-flex items-center gap-1.5 shadow-xs transition-colors disabled:opacity-50"
              >
                Confirm Manually Sent
              </button>
            </div>
          )}

          {/* Schedule Accordion Toggle */}
          <div className="pt-2 border-t border-slate-100">
            <button
              onClick={() => setIsScheduling(!isScheduling)}
              className="text-xs font-bold text-purple-700 hover:text-purple-800 inline-flex items-center gap-1.5"
            >
              <FaCalendarAlt className="text-xs" />
              {isScheduling ? "Hide One-Time Schedule" : "Schedule for Later Date & Time"}
            </button>

            {isScheduling && (
              <div className="mt-2.5 p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200 flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="w-full sm:w-auto text-xs px-3 py-2 rounded-xl bg-white border border-purple-200 text-slate-800 font-semibold focus:outline-none"
                />
                <button
                  onClick={handleSchedule}
                  disabled={actionLoading || !scheduledAt}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs inline-flex items-center justify-center gap-1.5 shadow-xs transition-colors disabled:opacity-50"
                >
                  Confirm Schedule
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <span className="text-xs text-slate-500 font-semibold text-center sm:text-left">
            Pending amount: ₹{previewData?.amountDue || candidate.balanceAmount}
          </span>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors text-center cursor-pointer"
            >
              Cancel
            </button>

            {/* Option 1: Direct Admin WhatsApp */}
            <button
              type="button"
              onClick={() => handleSend("click_to_chat")}
              disabled={actionLoading || !previewData?.recipient?.isValidPhone}
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#D6451B] border border-orange-200 font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 cursor-pointer shadow-2xs"
              title="Open message directly on admin WhatsApp"
            >
              <FaMobileAlt className="text-xs text-[#D6451B]" />
              Open Admin WhatsApp
            </button>

            {/* Option 2: MyAcademy WhatsApp API (Coming Soon) */}
            <button
              type="button"
              disabled
              className="w-full sm:w-auto px-3.5 py-2.5 rounded-xl bg-slate-100 text-slate-400 font-extrabold text-xs inline-flex items-center justify-center gap-1.5 border border-slate-200 cursor-not-allowed opacity-75"
              title="MyAcademy WhatsApp Gateway is coming soon in an upcoming release"
            >
              <FaCloud className="text-xs" />
              MyAcademy API
              <span className="ml-1 px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-[9px] font-black uppercase">
                Soon
              </span>
            </button>

            {/* Option 3: Custom Meta Cloud API (If connected) */}
            {isCloudApiConnected && (
              <button
                type="button"
                onClick={() => handleSend("cloud_api")}
                disabled={actionLoading || !previewData?.recipient?.isValidPhone}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs inline-flex items-center justify-center gap-1.5 shadow-sm transition-colors disabled:opacity-50 cursor-pointer"
                title="Send using your verified Meta Cloud API"
              >
                <FaPaperPlane className="text-xs" />
                Send via Custom Meta API
              </button>
            )}

            {/* Option 4: Official Email via Resend */}
            <button
              type="button"
              onClick={() => handleSend("resend_email")}
              disabled={actionLoading || (!previewData?.recipient?.isValidEmail && !previewData?.recipient?.email && !candidate?.studentEmail && !candidate?.email)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs inline-flex items-center justify-center gap-1.5 shadow-md shadow-blue-200 transition-all disabled:opacity-50 cursor-pointer"
              title="Send official payment reminder email via Resend"
            >
              <FaEnvelope className="text-xs" />
              Send via Resend Email
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ManualSendModal({
  isOpen,
  onClose,
  candidate,
  initialRecipientRole = "student",
  templates = [],
  integrationData,
}) {
  if (!isOpen || !candidate) return null;

  return (
    <AnimatePresence>
      <ManualSendDialog
        key={candidate._id}
        onClose={onClose}
        candidate={candidate}
        initialRecipientRole={initialRecipientRole}
        templates={templates}
        integrationData={integrationData}
      />
    </AnimatePresence>
  );
}
