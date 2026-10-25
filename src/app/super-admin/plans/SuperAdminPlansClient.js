"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaLayerGroup,
  FaPlus,
  FaCheck,
  FaCheckCircle,
  FaEdit,
  FaTimes,
  FaSpinner,
  FaUsers,
  FaBookOpen,
  FaClock,
} from "react-icons/fa";
import { useSuperAdminPlans } from "@/Hooks/useSuperAdmin";
import {
  useCreatePlanMutation,
  useUpdatePlanMutation,
} from "@/app/mutations/superAdminMutations";
import { toast } from "sonner";

export const AVAILABLE_PLAN_FEATURES = [
  {
    category: "Financials & Reminders",
    items: [
      { id: "Fee Management & Invoicing", label: "Fee Management & Invoicing", desc: "Installments, fee structures & discounts" },
      { id: "Fee Ledgers & Offline Receipts", label: "Fee Ledgers & Receipts", desc: "Payment receipts & offline collection" },
      { id: "Automated WhatsApp Alerts", label: "Automated WhatsApp Alerts", desc: "Meta Cloud API & Direct reminders" },
      { id: "Resend Email Payment Notices", label: "Resend Email Payment Notices", desc: "Official tuition payment notices via Resend" },
    ],
  },
  {
    category: "Academics & Operations",
    items: [
      { id: "Attendance Tracking", label: "Attendance Tracking", desc: "Daily attendance logs & student activity" },
      { id: "Batch & Course Management", label: "Batch & Course Management", desc: "Academic curriculum, batches & instructors" },
      { id: "Homework & Assignments", label: "Homework & Assignments", desc: "Assignment uploads, submissions & grading" },
      { id: "Exam Management & Results", label: "Exam Management & Results", desc: "Schedule exams & generate report cards" },
      { id: "Live Virtual Classes", label: "Live Virtual Classes", desc: "Zoom & Google Meet class link integrations" },
    ],
  },
  {
    category: "Portals & Role Access",
    items: [
      { id: "Student Portal", label: "Student Portal", desc: "Progress rings, marks trend & schedule" },
      { id: "Parent Portal", label: "Parent Portal", desc: "Ward attendance, fee dues & exam records" },
      { id: "Teacher Portal", label: "Teacher Portal", desc: "Batches, attendance grading & homework" },
    ],
  },
  {
    category: "Intelligence & Branding",
    items: [
      { id: "Advanced Analytics & Reports", label: "Advanced Analytics & Reports", desc: "Revenue charts, enrollment trends & heatmaps" },
      { id: "Custom Academy Branding & Receipts", label: "Custom Academy Branding", desc: "Academy logo & mode on fee receipts" },
      { id: "Audit Logs & Security History", label: "Audit Logs & Security", desc: "Track staff actions & system audit trail" },
      { id: "Priority Support & Cloud Backup", label: "Priority Support & Cloud Backup", desc: "Expedited assistance & automated backups" },
    ],
  },
];

const STARTER_FEATURES = [
  "Attendance Tracking",
  "Batch & Course Management",
  "Fee Management & Invoicing",
  "Student Portal",
];

const PRO_FEATURES = [
  "Attendance Tracking",
  "Batch & Course Management",
  "Homework & Assignments",
  "Exam Management & Results",
  "Fee Management & Invoicing",
  "Fee Ledgers & Offline Receipts",
  "Automated WhatsApp Alerts",
  "Student Portal",
  "Parent Portal",
  "Teacher Portal",
];

const ALL_FEATURES = AVAILABLE_PLAN_FEATURES.flatMap((cat) => cat.items.map((item) => item.id));

export default function SuperAdminPlansClient() {
  const { data: plans = [], isLoading } = useSuperAdminPlans();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [customFeatureInput, setCustomFeatureInput] = useState("");

  const [planForm, setPlanForm] = useState({
    name: "",
    code: "",
    description: "",
    monthlyPrice: 999,
    annualPrice: 9999,
    trialDays: 14,
    limits: {
      students: 100,
      courses: 10,
    },
    features: [...STARTER_FEATURES],
    isActive: true,
  });

  const createPlanMutation = useCreatePlanMutation();
  const updatePlanMutation = useUpdatePlanMutation();

  const openCreateModal = () => {
    setPlanForm({
      name: "",
      code: "",
      description: "",
      monthlyPrice: 999,
      annualPrice: 9999,
      trialDays: 14,
      limits: { students: 100, courses: 10 },
      features: [...STARTER_FEATURES],
      isActive: true,
    });
    setCustomFeatureInput("");
    setCreateModalOpen(true);
  };

  const openEditModal = (plan) => {
    setEditingPlan(plan);
    const existingFeatures = Array.isArray(plan.features)
      ? plan.features
      : typeof plan.features === "string"
      ? plan.features.split(",").map((f) => f.trim()).filter(Boolean)
      : [];

    setPlanForm({
      name: plan.name || "",
      code: plan.code || "",
      description: plan.description || "",
      monthlyPrice: plan.monthlyPrice || 0,
      annualPrice: plan.annualPrice || 0,
      trialDays: plan.trialDays || 0,
      limits: {
        students: plan.limits?.students || 100,
        courses: plan.limits?.courses || 10,
      },
      features: existingFeatures,
      isActive: plan.isActive !== false,
    });
    setCustomFeatureInput("");
  };

  const toggleFeature = (featureId) => {
    setPlanForm((prev) => {
      const current = Array.isArray(prev.features) ? prev.features : [];
      const exists = current.includes(featureId);
      return {
        ...prev,
        features: exists ? current.filter((f) => f !== featureId) : [...current, featureId],
      };
    });
  };

  const handleAddCustomFeature = (e) => {
    e?.preventDefault();
    const trimmed = customFeatureInput.trim();
    if (!trimmed) return;
    setPlanForm((prev) => {
      const current = Array.isArray(prev.features) ? prev.features : [];
      if (current.includes(trimmed)) return prev;
      return {
        ...prev,
        features: [...current, trimmed],
      };
    });
    setCustomFeatureInput("");
  };

  const handleRemoveFeature = (featureId) => {
    setPlanForm((prev) => ({
      ...prev,
      features: (prev.features || []).filter((f) => f !== featureId),
    }));
  };

  const defaultFeatureIds = new Set(ALL_FEATURES);
  const customSelectedFeatures = (planForm.features || []).filter((f) => !defaultFeatureIds.has(f));

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!planForm.name || !planForm.code) {
      toast.error("Plan name and code are required");
      return;
    }

    const payload = {
      name: planForm.name.trim(),
      code: planForm.code.trim().toLowerCase(),
      description: planForm.description,
      monthlyPrice: Number(planForm.monthlyPrice),
      annualPrice: Number(planForm.annualPrice),
      trialDays: Number(planForm.trialDays),
      limits: planForm.limits,
      features: Array.isArray(planForm.features) ? planForm.features.filter(Boolean) : [],
      isActive: planForm.isActive,
    };

    try {
      await createPlanMutation.mutateAsync(payload);
      setCreateModalOpen(false);
    } catch (err) {
      // Handled by onError in mutation
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: planForm.name.trim(),
      description: planForm.description,
      monthlyPrice: Number(planForm.monthlyPrice),
      annualPrice: Number(planForm.annualPrice),
      trialDays: Number(planForm.trialDays),
      limits: planForm.limits,
      features: Array.isArray(planForm.features) ? planForm.features.filter(Boolean) : [],
      isActive: planForm.isActive,
    };

    try {
      await updatePlanMutation.mutateAsync({
        planId: editingPlan._id,
        data: payload,
      });
      setEditingPlan(null);
    } catch (err) {
      // Handled by onError in mutation
    }
  };

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500 via-[#D6451B] to-rose-600 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between min-w-0">
          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Monetization & Plans
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Platform SaaS Plans
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm text-orange-100 max-w-2xl font-normal">
              Define academy subscription pricing tiers, feature allocations, trial periods, and capacity limits.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-bold text-[#D6451B] shadow-xs hover:bg-orange-50 transition shrink-0"
          >
            <FaPlus className="text-xs" />
            <span>Create New Plan</span>
          </button>
        </div>
      </motion.section>

      {/* Plans Grid */}
      {isLoading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
          <FaSpinner className="animate-spin inline mr-2 text-[#D6451B] text-lg" />
          <span>Loading platform plans...</span>
        </div>
      ) : plans.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
          <FaLayerGroup className="text-slate-300 text-5xl mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No SaaS Plans Created</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            You have not configured any subscription pricing tiers for academies yet.
          </p>
          <button
            onClick={openCreateModal}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#D6451B] px-4 py-2.5 text-xs font-bold text-white shadow-xs"
          >
            <FaPlus />
            <span>Create First Plan</span>
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((p) => {
            const isPlanActive = p.isActive !== false;
            return (
              <div
                key={p._id}
                className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[10px] uppercase font-bold text-[#D6451B] tracking-wider">
                        CODE: {p.code}
                      </span>
                      <h3 className="text-lg font-extrabold text-slate-900 mt-0.5">
                        {p.name}
                      </h3>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                        isPlanActive
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-500 border border-slate-200"
                      }`}
                    >
                      {isPlanActive ? "Active" : "Archived"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 mt-2 min-h-[32px] line-clamp-2">
                    {p.description || "Academy tier with dedicated feature entitlements."}
                  </p>

                  {/* Pricing Box */}
                  <div className="mt-4 rounded-xl bg-orange-50/60 p-3.5 border border-orange-100 flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-extrabold text-slate-900">
                        ₹{p.monthlyPrice?.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs text-slate-500 font-semibold"> /month</span>
                    </div>
                    <span className="text-xs font-bold text-[#D6451B]">
                      ₹{p.annualPrice?.toLocaleString("en-IN")}/yr
                    </span>
                  </div>

                  {/* Capacity Limits & Trial */}
                  <div className="mt-3.5 grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-semibold">
                    <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-2 border border-slate-100">
                      <FaUsers className="text-[#D6451B]" />
                      <span>{p.limits?.students || 0} Students</span>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-lg bg-slate-50 p-2 border border-slate-100">
                      <FaClock className="text-[#D6451B]" />
                      <span>{p.trialDays || 0} Days Trial</span>
                    </div>
                  </div>

                  {/* Features List */}
                  {p.features && p.features.length > 0 && (
                    <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                      <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                        Features Included
                      </p>
                      {p.features.map((feat, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-xs text-slate-700"
                        >
                          <FaCheck className="text-[10px] text-emerald-500 shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => openEditModal(p)}
                    className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white py-2.5 text-xs font-bold text-slate-700 hover:border-[#D6451B] hover:text-[#D6451B] transition shadow-2xs"
                  >
                    <FaEdit className="text-xs" />
                    <span>Edit Plan</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create / Edit Plan Modal */}
      <AnimatePresence>
        {(createModalOpen || editingPlan) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 sm:p-4 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-xl sm:max-w-2xl rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6451B] to-amber-500 text-white shadow-xs">
                    <FaLayerGroup className="text-base" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      {editingPlan ? "Edit SaaS Plan" : "Create SaaS Plan"}
                    </h3>
                    <p className="text-[11px] text-[#D6451B] font-bold">Pricing & Feature Limits</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCreateModalOpen(false);
                    setEditingPlan(null);
                  }}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <FaTimes />
                </button>
              </div>

              <form
                onSubmit={editingPlan ? handleEditSubmit : handleCreateSubmit}
                className="mt-5 space-y-4 text-xs"
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Plan Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Standard Academy"
                      value={planForm.name}
                      onChange={(e) =>
                        setPlanForm({ ...planForm, name: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-[#D6451B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Code (Slug) *
                    </label>
                    <input
                      type="text"
                      required
                      disabled={!!editingPlan}
                      placeholder="e.g. standard"
                      value={planForm.code}
                      onChange={(e) =>
                        setPlanForm({ ...planForm, code: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-[#D6451B] disabled:bg-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Short description of this tier..."
                    value={planForm.description}
                    onChange={(e) =>
                      setPlanForm({ ...planForm, description: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-medium outline-none focus:border-[#D6451B]"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Monthly Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={planForm.monthlyPrice}
                      onChange={(e) =>
                        setPlanForm({
                          ...planForm,
                          monthlyPrice: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-[#D6451B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Annual Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={planForm.annualPrice}
                      onChange={(e) =>
                        setPlanForm({
                          ...planForm,
                          annualPrice: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-[#D6451B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Trial Days
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={planForm.trialDays}
                      onChange={(e) =>
                        setPlanForm({
                          ...planForm,
                          trialDays: Number(e.target.value),
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-[#D6451B]"
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Max Students
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={planForm.limits?.students || 100}
                      onChange={(e) =>
                        setPlanForm({
                          ...planForm,
                          limits: {
                            ...planForm.limits,
                            students: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-[#D6451B]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Max Courses
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={planForm.limits?.courses || 10}
                      onChange={(e) =>
                        setPlanForm({
                          ...planForm,
                          limits: {
                            ...planForm.limits,
                            courses: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold outline-none focus:border-[#D6451B]"
                    />
                  </div>
                </div>

                {/* Interactive Features Checklist */}
                <div className="space-y-3 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                    <div>
                      <label className="block font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                        Features Checklist ({planForm.features?.length || 0} selected)
                      </label>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Tick the modules and capabilities included in this tier.
                      </p>
                    </div>

                    {/* Quick Presets */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => setPlanForm({ ...planForm, features: [...STARTER_FEATURES] })}
                        className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[10px] transition cursor-pointer"
                        title="Select typical starter features"
                      >
                        Starter
                      </button>
                      <button
                        type="button"
                        onClick={() => setPlanForm({ ...planForm, features: [...PRO_FEATURES] })}
                        className="px-2 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-[#D6451B] border border-orange-200 font-bold text-[10px] transition cursor-pointer"
                        title="Select pro academy features"
                      >
                        Pro
                      </button>
                      <button
                        type="button"
                        onClick={() => setPlanForm({ ...planForm, features: [...ALL_FEATURES] })}
                        className="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-[10px] transition cursor-pointer"
                        title="Select all features"
                      >
                        Select All
                      </button>
                      <button
                        type="button"
                        onClick={() => setPlanForm({ ...planForm, features: [] })}
                        className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500 font-bold text-[10px] transition cursor-pointer"
                        title="Clear all selected features"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* Categorized Checkbox List */}
                  <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                    {AVAILABLE_PLAN_FEATURES.map((cat) => (
                      <div key={cat.category} className="space-y-2">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                          {cat.category}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cat.items.map((item) => {
                            const isChecked = (planForm.features || []).includes(item.id);
                            return (
                              <label
                                key={item.id}
                                onClick={(e) => {
                                  e.preventDefault();
                                  toggleFeature(item.id);
                                }}
                                className={`flex items-start gap-2.5 p-2.5 rounded-xl border text-left transition cursor-pointer ${
                                  isChecked
                                    ? "bg-orange-50/70 border-[#D6451B] ring-1 ring-[#D6451B]/30"
                                    : "bg-slate-50/50 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  readOnly
                                  className="mt-0.5 rounded text-[#D6451B] focus:ring-[#D6451B] cursor-pointer"
                                />
                                <div className="min-w-0 flex-1">
                                  <p className={`text-xs font-bold leading-tight ${isChecked ? "text-[#D6451B]" : "text-slate-800"}`}>
                                    {item.label}
                                  </p>
                                  <p className="text-[10px] text-slate-500 leading-tight mt-0.5 truncate">
                                    {item.desc}
                                  </p>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    ))}

                    {/* Custom & Legacy Features Section */}
                    {customSelectedFeatures.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-100">
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                          Custom &amp; Legacy Features
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {customSelectedFeatures.map((feat) => (
                            <span
                              key={feat}
                              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-100 text-[#D6451B] text-xs font-bold border border-orange-200"
                            >
                              <span>{feat}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveFeature(feat)}
                                className="text-orange-600 hover:text-orange-900 cursor-pointer"
                              >
                                <FaTimes className="text-[10px]" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Custom Feature Write-in */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                      Add Bespoke / Custom Feature
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="e.g. AI Doubt Assistant, Custom Mobile App..."
                        value={customFeatureInput}
                        onChange={(e) => setCustomFeatureInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCustomFeature();
                          }
                        }}
                        className="flex-1 rounded-xl border border-slate-200 p-2 text-xs font-semibold outline-none focus:border-[#D6451B]"
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomFeature}
                        className="px-3 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer flex items-center gap-1"
                      >
                        <FaPlus className="text-[10px]" /> Add
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={planForm.isActive}
                    onChange={(e) =>
                      setPlanForm({ ...planForm, isActive: e.target.checked })
                    }
                    className="rounded text-[#D6451B] focus:ring-[#D6451B]"
                  />
                  <label htmlFor="isActive" className="font-bold text-slate-700 cursor-pointer">
                    Active & Available for Academy Subscriptions
                  </label>
                </div>

                <div className="pt-3 border-t border-slate-100 flex gap-2.5">
                  <button
                    type="submit"
                    disabled={
                      createPlanMutation.isPending || updatePlanMutation.isPending
                    }
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] py-3 text-xs sm:text-sm font-bold text-white hover:bg-orange-600 transition shadow-xs disabled:opacity-50"
                  >
                    {createPlanMutation.isPending || updatePlanMutation.isPending ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Saving Plan...</span>
                      </>
                    ) : (
                      <span>{editingPlan ? "Update Plan" : "Create Plan"}</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCreateModalOpen(false);
                      setEditingPlan(null);
                    }}
                    className="px-4 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
