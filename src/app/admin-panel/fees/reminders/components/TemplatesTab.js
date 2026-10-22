"use client";

import { useState } from "react";
import {
  FaPlus,
  FaFileAlt,
  FaEdit,
  FaTrashAlt,
  FaUndo,
  FaCheckCircle,
  FaClock,
  FaSpinner,
  FaTag,
  FaWhatsapp,
} from "react-icons/fa";
import { useReminderTemplates } from "@/Hooks/useWhatsAppReminders";
import {
  useDeleteTemplateMutation,
  useResetDefaultTemplatesMutation,
} from "@/app/mutations/whatsappReminderMutations";
import TemplateModal from "./TemplateModal";

export default function TemplatesTab() {
  const { data: templates = [], isLoading } = useReminderTemplates();
  const deleteMutation = useDeleteTemplateMutation();
  const resetDefaultsMutation = useResetDefaultTemplatesMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [templateToEdit, setTemplateToEdit] = useState(null);

  const handleOpenCreate = () => {
    setTemplateToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (tmpl) => {
    setTemplateToEdit(tmpl);
    setIsModalOpen(true);
  };

  const getCategoryBadge = (cat) => {
    switch (cat) {
      case "due_soon":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            Due Soon
          </span>
        );
      case "due_today":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
            Due Today
          </span>
        );
      case "overdue":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            Overdue
          </span>
        );
      case "critical":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-800 border border-red-300">
            Critical
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
            {cat}
          </span>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FaFileAlt className="text-[#D6451B]" /> Message Templates
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure dynamic WhatsApp notification templates with variable substitution.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => resetDefaultsMutation.mutate()}
            disabled={resetDefaultsMutation.isPending}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <FaUndo className={`text-xs ${resetDefaultsMutation.isPending ? "animate-spin" : ""}`} />
            Restore Defaults
          </button>
          <button
            onClick={handleOpenCreate}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 hover:from-orange-600 hover:to-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-200 inline-flex items-center justify-center gap-1.5 transition-all"
          >
            <FaPlus className="text-xs" /> New Template
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      {isLoading ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <FaSpinner className="mx-auto text-2xl text-[#D6451B] animate-spin mb-2" />
          <p className="text-xs font-semibold text-slate-500">Loading templates...</p>
        </div>
      ) : templates.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <FaFileAlt className="mx-auto text-3xl text-slate-300 mb-2" />
          <p className="text-sm font-bold text-slate-800">No message templates available</p>
          <p className="text-xs text-slate-400 mt-1">
            Click &quot;Restore Defaults&quot; to load standard WhatsApp templates.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((tmpl) => (
            <div
              key={tmpl._id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                {/* Title & Badges */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm text-slate-900">{tmpl.name}</h3>
                    {tmpl.isDefault && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600">
                        Default
                      </span>
                    )}
                  </div>
                  {getCategoryBadge(tmpl.category)}
                </div>

                {tmpl.providerTemplateName && (
                  <p className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md w-fit mb-2">
                    Meta Template: {tmpl.providerTemplateName}
                  </p>
                )}

                {/* Body Preview */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                  {tmpl.messageBody}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">
                  Updated: {new Date(tmpl.updatedAt || tmpl.createdAt).toLocaleDateString("en-IN")}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(tmpl)}
                    className="p-2 rounded-lg text-slate-500 hover:text-[#D6451B] hover:bg-orange-50 transition-colors"
                    title="Edit Template"
                  >
                    <FaEdit className="text-xs" />
                  </button>
                  {!tmpl.isDefault && (
                    <button
                      onClick={() => deleteMutation.mutate(tmpl._id)}
                      disabled={deleteMutation.isPending}
                      className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors disabled:opacity-50"
                      title="Delete Template"
                    >
                      <FaTrashAlt className="text-xs" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Template Modal */}
      <TemplateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        templateToEdit={templateToEdit}
      />
    </div>
  );
}
