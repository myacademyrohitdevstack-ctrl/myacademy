"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaFileAlt,
  FaPlus,
  FaCheckCircle,
  FaInfoCircle,
  FaTag,
} from "react-icons/fa";
import {
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
} from "@/app/mutations/whatsappReminderMutations";

const AVAILABLE_VARIABLES = [
  { tag: "{{studentName}}", label: "Student Name" },
  { tag: "{{parentName}}", label: "Parent Name" },
  { tag: "{{academyName}}", label: "Academy Name" },
  { tag: "{{className}}", label: "Class / Batch" },
  { tag: "{{pendingAmount}}", label: "Pending Amount" },
  { tag: "{{feeAmount}}", label: "Total Fee Amount" },
  { tag: "{{paidAmount}}", label: "Paid Amount" },
  { tag: "{{dueDate}}", label: "Due Date" },
  { tag: "{{installmentName}}", label: "Installment Name" },
  { tag: "{{supportPhone}}", label: "Support Phone" },
];

function TemplateModalDialog({ onClose, templateToEdit }) {
  const [name, setName] = useState(templateToEdit?.name || "");
  const [category, setCategory] = useState(templateToEdit?.category || "due_soon");
  const [messageBody, setMessageBody] = useState(templateToEdit?.messageBody || "");
  const [providerTemplateName, setProviderTemplateName] = useState(templateToEdit?.providerTemplateName || "");
  const [language, setLanguage] = useState(templateToEdit?.language || "en");

  const textareaRef = useRef(null);

  const createMutation = useCreateTemplateMutation();
  const updateMutation = useUpdateTemplateMutation();

  const isEditing = Boolean(templateToEdit?._id);

  const handleInsertVariable = (tag) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      setMessageBody((prev) => prev + " " + tag);
      return;
    }
    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;
    const before = messageBody.substring(0, start);
    const after = messageBody.substring(end, messageBody.length);
    const newText = before + tag + after;
    setMessageBody(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + tag.length, start + tag.length);
    }, 50);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!messageBody.trim()) return;

    const payload = {
      name: name.trim(),
      category,
      messageBody: messageBody.trim(),
      providerTemplateName: providerTemplateName.trim(),
      language,
    };

    if (isEditing) {
      updateMutation.mutate(
        { templateId: templateToEdit._id, payload },
        {
          onSuccess: () => onClose(),
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => onClose(),
      });
    }
  };

  const samplePreview = messageBody
    .replace(/\{\{studentName\}\}/g, "Rahul Sharma")
    .replace(/\{\{parentName\}\}/g, "Mr. Sharma")
    .replace(/\{\{academyName\}\}/g, "MyAcademy")
    .replace(/\{\{className\}\}/g, "Physics Class 12")
    .replace(/\{\{pendingAmount\}\}/g, "3,500")
    .replace(/\{\{feeAmount\}\}/g, "15,000")
    .replace(/\{\{paidAmount\}\}/g, "11,500")
    .replace(/\{\{dueDate\}\}/g, "28-Oct-2026")
    .replace(/\{\{installmentName\}\}/g, "Term 2 Installment")
    .replace(/\{\{supportPhone\}\}/g, "+91 98765 43210");

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden my-4 sm:my-6"
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border-b border-slate-100 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl sm:rounded-2xl bg-[#D6451B] flex items-center justify-center text-white shadow-xs shrink-0">
              <FaFileAlt className="text-base sm:text-lg" />
            </div>
            <div className="min-w-0">
              <h3 className="font-extrabold text-slate-900 text-xs sm:text-base truncate">
                {isEditing ? "Edit Message Template" : "Create New Message Template"}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
                Define reusable message templates with dynamic placeholders
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

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
          {/* Template Name & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Template Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Standard Due Soon Reminder"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D6451B]/20"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D6451B]/20"
              >
                <option value="due_soon">Due Soon (-3 to -1 days)</option>
                <option value="due_today">Due Today (Day 0)</option>
                <option value="overdue">Overdue (+3 to +7 days)</option>
                <option value="critical">Critical Dues</option>
                <option value="custom">Custom Academy Notice</option>
              </select>
            </div>
          </div>

          {/* Provider Template Name (Meta WhatsApp Cloud API) */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-[11px] font-bold text-slate-700 uppercase">
                Meta Template Name (Optional)
              </label>
              <span className="text-[10px] text-slate-400">Required only for pre-approved Cloud API templates</span>
            </div>
            <input
              type="text"
              placeholder="e.g. myacademy_fee_reminder_v1"
              value={providerTemplateName}
              onChange={(e) => setProviderTemplateName(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D6451B]/20"
            />
          </div>

          {/* Dynamic Variable Chips */}
          <div>
            <p className="text-[11px] font-bold text-slate-700 uppercase mb-1.5 flex items-center gap-1.5">
              <FaTag className="text-[#D6451B]" /> Click variable to insert at cursor:
            </p>
            <div className="flex flex-wrap gap-1.5 p-2.5 rounded-2xl bg-orange-50/50 border border-orange-100">
              {AVAILABLE_VARIABLES.map((v) => (
                <button
                  key={v.tag}
                  type="button"
                  onClick={() => handleInsertVariable(v.tag)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-orange-200 hover:border-orange-400 text-[#D6451B] font-mono text-[11px] font-bold shadow-2xs hover:scale-105 transition-all"
                >
                  {v.tag}
                </button>
              ))}
            </div>
          </div>

          {/* Template Body */}
          <div>
            <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
              Template Message Body *
            </label>
            <textarea
              ref={textareaRef}
              required
              rows={5}
              placeholder="Write your template text with dynamic placeholders..."
              value={messageBody}
              onChange={(e) => setMessageBody(e.target.value)}
              className="w-full p-3.5 text-xs font-medium text-slate-800 bg-white border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#D6451B]/20 leading-relaxed font-sans"
            />
          </div>

          {/* Live Rendered Sample Preview */}
          {messageBody.trim() && (
            <div>
              <p className="text-[11px] font-bold text-slate-700 uppercase mb-1">
                Live Sample Preview (with mock values)
              </p>
              <div className="p-3.5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-[11px] leading-relaxed whitespace-pre-wrap border border-slate-800 shadow-inner">
                {samplePreview}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors text-center"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending || !name.trim() || !messageBody.trim()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 hover:from-orange-600 hover:to-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-200 transition-all disabled:opacity-50 text-center"
            >
              {isPending ? "Saving..." : isEditing ? "Save Changes" : "Create Template"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function TemplateModal({ isOpen, onClose, templateToEdit }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <TemplateModalDialog
        key={templateToEdit?._id || "new-template"}
        onClose={onClose}
        templateToEdit={templateToEdit}
      />
    </AnimatePresence>
  );
}
