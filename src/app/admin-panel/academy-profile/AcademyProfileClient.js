"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaUniversity,
  FaGlobe,
  FaBuilding,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaReceipt,
  FaCheckCircle,
  FaSpinner,
  FaUpload,
  FaSave,
  FaImage,
  FaSignature,
  FaIdCard,
  FaLaptopHouse,
  FaLayerGroup,
  FaInfoCircle,
} from "react-icons/fa";
import { useAcademyProfile } from "@/Hooks/useAcademy";
import { useUpdateAcademyProfileMutation } from "@/app/mutations/academyMutations";
import { StatCard, ProgressBar } from "@/app/Components/visual-ui";
import { toast } from "sonner";

function AcademyProfileForm({ academy, updateMutation }) {
  const fileInputRef = useRef(null);

  // Form State initialized directly from loaded academy profile data
  const [formData, setFormData] = useState({
    name: academy?.name || "",
    tagline: academy?.tagline || "",
    email: academy?.email || "",
    phone: academy?.phone || "",
    supportPhone: academy?.supportPhone || "",
    website: academy?.website || "",
    isOnline: Boolean(academy?.isOnline),
    deliveryMode: academy?.deliveryMode || (academy?.isOnline ? "online" : "offline"),
    address: academy?.address || "",
    city: academy?.city || "",
    state: academy?.state || "",
    pincode: academy?.pincode || "",
    country: academy?.country || "India",
    taxNumber: academy?.taxNumber || "",
    currency: academy?.currency || "₹",
    receiptPrefix: academy?.receiptPrefix || "REC",
    receiptNotes:
      academy?.receiptNotes ||
      "Thank you for your payment. This is an official computer-generated receipt.",
    signatoryName: academy?.signatoryName || "",
    signatoryTitle: academy?.signatoryTitle || "Authorized Signatory",
    logo: academy?.logo || "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(academy?.logo || "");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDeliveryModeChange = (mode) => {
    setFormData((prev) => ({
      ...prev,
      deliveryMode: mode,
      isOnline: mode === "online" || mode === "hybrid",
    }));
  };

  const handleLogoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Logo file size must be under 5MB");
        return;
      }
      setLogoFile(file);
      const objectUrl = URL.createObjectURL(file);
      setLogoPreview(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      toast.error("Academy Name is required");
      return;
    }

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      payload.append(key, formData[key]);
    });

    if (logoFile) {
      payload.append("logo", logoFile);
    }

    try {
      await updateMutation.mutateAsync(payload);
    } catch (err) {
      // Handled in mutation
    }
  };

  // Calculate profile completion score
  const completionFields = [
    formData.name,
    formData.email,
    formData.phone,
    formData.logo,
    formData.tagline,
    formData.website,
    formData.deliveryMode,
    formData.address || formData.isOnline,
    formData.taxNumber,
    formData.signatoryName,
  ];
  const filledCount = completionFields.filter(Boolean).length;
  const completionScore = Math.round((filledCount / completionFields.length) * 100);

  return (
    <div className="w-full min-w-0 space-y-5 sm:space-y-6 pb-12">
      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-amber-500 via-[#D6451B] to-rose-600 p-5 sm:p-7 lg:p-8 text-white shadow-lg w-full"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 overflow-hidden shadow-inner">
              {logoPreview ? (
                <img
                  src={logoPreview}
                  alt={formData.name || "Academy Logo"}
                  className="h-full w-full object-contain p-2"
                />
              ) : (
                <FaUniversity className="text-3xl sm:text-4xl text-white/90" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                  Tenant Configuration
                </span>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-extrabold ${
                    formData.deliveryMode === "online"
                      ? "bg-cyan-500 text-white"
                      : formData.deliveryMode === "hybrid"
                      ? "bg-emerald-500 text-white"
                      : "bg-white/90 text-slate-800"
                  }`}
                >
                  {formData.deliveryMode === "online" && <FaGlobe className="text-[10px]" />}
                  {formData.deliveryMode === "offline" && <FaBuilding className="text-[10px]" />}
                  {formData.deliveryMode === "hybrid" && <FaLayerGroup className="text-[10px]" />}
                  <span>
                    {formData.deliveryMode === "online"
                      ? "100% Online Academy"
                      : formData.deliveryMode === "hybrid"
                      ? "Hybrid Campus"
                      : "Physical Campus"}
                  </span>
                </span>
              </div>

              <h1 className="mt-2 text-2xl font-black sm:text-3xl lg:text-4xl truncate">
                {formData.name || academy?.name || "My Academy Profile"}
              </h1>

              <p className="mt-1 text-xs sm:text-sm text-orange-100 max-w-2xl font-normal">
                {formData.tagline ||
                  "Manage academy operational parameters, virtual delivery model, official logo, and fee receipt branding."}
              </p>
            </div>
          </div>

          {/* Quick Metrics Badge */}
          <div className="rounded-2xl border border-white/25 bg-white/10 p-4 sm:p-5 backdrop-blur-md shrink-0 lg:w-72">
            <div className="flex items-center justify-between text-xs text-orange-100 font-semibold uppercase">
              <span>Branding Completeness</span>
              <span className="font-extrabold text-white text-sm">{completionScore}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full bg-white transition-all duration-500"
                style={{ width: `${completionScore}%` }}
              />
            </div>
            <p className="mt-2 text-[11px] text-orange-100">
              Logo, receipt titles & contact hotlines configured
            </p>
          </div>
        </div>
      </motion.section>

      {/* Main Form & Live Receipt Preview Grid */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* Left Column: Form Settings (7 cols) */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* Section 1: Academy Delivery Mode */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <FaGlobe className="text-[#D6451B] text-base" />
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Academy Operational & Delivery Mode
                </h2>
                <p className="text-xs text-slate-500">
                  Specify whether your academy operates completely online, physical campus, or hybrid.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: "online",
                  label: "100% Online",
                  desc: "Virtual classes, e-learning portal, digital fee receipts with online designation.",
                  icon: FaGlobe,
                  color: "border-cyan-500 bg-cyan-50/50 text-cyan-900",
                },
                {
                  id: "offline",
                  label: "Physical Campus",
                  desc: "Traditional brick-and-mortar classrooms with physical location address.",
                  icon: FaBuilding,
                  color: "border-orange-500 bg-orange-50/50 text-orange-900",
                },
                {
                  id: "hybrid",
                  label: "Hybrid Academy",
                  desc: "Combination of virtual online cohorts and physical campus attendance.",
                  icon: FaLayerGroup,
                  color: "border-emerald-500 bg-emerald-50/50 text-emerald-900",
                },
              ].map((opt) => {
                const Icon = opt.icon;
                const isSelected = formData.deliveryMode === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleDeliveryModeChange(opt.id)}
                    className={`flex flex-col text-left p-3.5 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? opt.color
                        : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Icon className="text-lg" />
                      {isSelected && <FaCheckCircle className="text-xs" />}
                    </div>
                    <span className="font-black text-xs sm:text-sm mt-2">{opt.label}</span>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">{opt.desc}</p>
                  </button>
                );
              })}
            </div>

            {formData.isOnline && (
              <div className="rounded-xl bg-cyan-50 p-3.5 border border-cyan-100 flex items-start gap-2.5 text-xs text-cyan-900">
                <FaInfoCircle className="text-cyan-600 mt-0.5 shrink-0" />
                <p>
                  <strong>Online Academy Notice:</strong> Your official fee receipts and parent
                  portals will prominently display the <strong>🌐 Online Virtual Academy</strong> badge,
                  along with your digital website, hotline, and online portal details.
                </p>
              </div>
            )}
          </div>

          {/* Section 2: Core Identity & Branding */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <FaUniversity className="text-[#D6451B] text-base" />
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Core Details & Visual Branding
                </h2>
                <p className="text-xs text-slate-500">
                  Logo and official titles applied across fee receipts, student badges, and invoices.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Academy Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Inquisitive Mind Academy"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Tenant Slug (Identifier)</label>
                <input
                  type="text"
                  value={academy?.slug || ""}
                  disabled
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 text-xs sm:text-sm font-mono text-slate-500 cursor-not-allowed"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Tagline / Motto</label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  placeholder="e.g. Inspiring Excellence in Education"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              {/* Logo Upload & Preview */}
              <div className="sm:col-span-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo Preview"
                        className="h-full w-full object-contain p-1"
                      />
                    ) : (
                      <FaImage className="text-2xl text-slate-300" />
                    )}
                  </div>

                  <div className="flex-1 text-center sm:text-left">
                    <p className="text-xs font-bold text-slate-800">Official Academy Logo</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      PNG, JPG, or SVG up to 5MB. Rendered directly on fee receipts and portal headers.
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:border-[#D6451B] hover:text-[#D6451B] transition shadow-xs"
                      >
                        <FaUpload className="text-[10px]" />
                        <span>Upload Logo</span>
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleLogoFileChange}
                        className="hidden"
                      />

                      {logoPreview && (
                        <button
                          type="button"
                          onClick={() => {
                            setLogoFile(null);
                            setLogoPreview("");
                            setFormData((p) => ({ ...p, logo: "" }));
                          }}
                          className="rounded-xl px-2.5 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/60">
                  <label className="text-[11px] font-bold text-slate-500">
                    Or direct logo image URL:
                  </label>
                  <input
                    type="url"
                    name="logo"
                    value={formData.logo}
                    onChange={(e) => {
                      handleChange(e);
                      setLogoPreview(e.target.value);
                    }}
                    placeholder="https://example.com/logo.png"
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 outline-none focus:border-[#D6451B]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Contact & Campus Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <FaPhoneAlt className="text-[#D6451B] text-base" />
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Contact & Campus Location
                </h2>
                <p className="text-xs text-slate-500">
                  Hotlines, website, and physical address for fee invoices and notifications.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Official Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="contact@academy.com"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Primary Phone *</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Support / Hotline Phone</label>
                <input
                  type="text"
                  name="supportPhone"
                  value={formData.supportPhone}
                  onChange={handleChange}
                  placeholder="+91 98765 43211"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Official Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://rohitdevstack.online"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">
                  {formData.isOnline
                    ? "Registered Correspondence Address (Optional for Online)"
                    : "Campus Street Address *"}
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="e.g. 102 Education Avenue, Sector 4"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New Delhi"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Delhi"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Pincode / ZIP</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="110001"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="India"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Fee Receipt & Legal Disclaimers */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100">
              <FaReceipt className="text-[#D6451B] text-base" />
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                  Official Fee Receipt & Invoice Settings
                </h2>
                <p className="text-xs text-slate-500">
                  Tax registration, currency symbol, receipt prefix, and authorized signature.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700">Tax ID / GSTIN Number</label>
                <input
                  type="text"
                  name="taxNumber"
                  value={formData.taxNumber}
                  onChange={handleChange}
                  placeholder="e.g. 07AAAAA0000A1Z5"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Receipt Prefix</label>
                <input
                  type="text"
                  name="receiptPrefix"
                  value={formData.receiptPrefix}
                  onChange={handleChange}
                  placeholder="REC"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Currency Symbol</label>
                <input
                  type="text"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  placeholder="₹"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700">Signatory Title</label>
                <input
                  type="text"
                  name="signatoryTitle"
                  value={formData.signatoryTitle}
                  onChange={handleChange}
                  placeholder="Finance Controller / Director"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Authorized Signatory Name</label>
                <input
                  type="text"
                  name="signatoryName"
                  value={formData.signatoryName}
                  onChange={handleChange}
                  placeholder="e.g. Dr. R. Sharma"
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700">Receipt Footer Terms & Notes</label>
                <textarea
                  name="receiptNotes"
                  rows={2}
                  value={formData.receiptNotes}
                  onChange={handleChange}
                  placeholder="Notes printed on receipt bottom..."
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Save Action Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#D6451B] to-orange-600 px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:shadow-xl hover:from-orange-600 hover:to-orange-700 active:scale-95 transition-all disabled:opacity-50"
            >
              {updateMutation.isPending ? (
                <>
                  <FaSpinner className="animate-spin text-sm" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <FaSave className="text-sm" />
                  <span>Save Academy Details</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Live Fee Receipt Preview Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="sticky top-20">
            <div className="flex items-center justify-between pb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                Live Official Receipt Preview
              </span>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                Realtime Branding
              </span>
            </div>

            {/* Receipt Card Mockup */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-md space-y-4">
              {/* Receipt Header */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-4 gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 overflow-hidden shadow-2xs">
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Academy Logo"
                        className="h-full w-full object-contain p-1"
                      />
                    ) : (
                      <span className="text-base font-black text-[#D6451B]">
                        {formData.name?.charAt(0) || "A"}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 truncate">
                      {formData.name || "Academy Name"}
                    </h3>
                    <p className="text-[11px] text-slate-400 truncate">
                      {formData.tagline || "Excellence in Education"}
                    </p>

                    {/* Online Academy Indicator on Receipt */}
                    {formData.isOnline && (
                      <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-bold text-cyan-700 border border-cyan-200">
                        <FaGlobe className="text-[9px]" />
                        <span>Online Virtual Academy</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="rounded-md bg-[#D6451B]/10 px-2 py-0.5 text-[10px] font-extrabold text-[#D6451B] uppercase tracking-wider">
                    Official Receipt
                  </span>
                  <p className="mt-1 font-mono text-[11px] font-bold text-slate-700">
                    {formData.receiptPrefix || "REC"}-2026-000492
                  </p>
                </div>
              </div>

              {/* Receipt Meta */}
              <div className="text-[11px] text-slate-500 space-y-1">
                {formData.taxNumber && (
                  <p>
                    <strong>GSTIN / Tax:</strong> {formData.taxNumber}
                  </p>
                )}
                <p>
                  <strong>Contact:</strong> {formData.phone || "Phone N/A"} |{" "}
                  {formData.email || "Email N/A"}
                </p>
                {formData.website && (
                  <p>
                    <strong>Portal:</strong> {formData.website}
                  </p>
                )}
                {!formData.isOnline && formData.address && (
                  <p>
                    <strong>Campus:</strong> {formData.address},{" "}
                    {formData.city || ""} {formData.pincode || ""}
                  </p>
                )}
              </div>

              {/* Mock Installment Table */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 space-y-2 text-xs">
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Student:</span>
                  <strong className="text-slate-900">Aditya Verma (STD-9201)</strong>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Cohort / Course:</span>
                  <span className="text-slate-800 font-semibold">Senior Batch Alpha</span>
                </div>
                <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                  <span className="text-slate-500">Payment Mode:</span>
                  <span className="text-slate-800 font-bold">UPI / QR (TXN-918239)</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-extrabold text-slate-900">Total Paid:</span>
                  <span className="font-black text-[#D6451B] text-sm">
                    {formData.currency || "₹"}12,500
                  </span>
                </div>
              </div>

              {/* Signatory Box */}
              <div className="flex items-end justify-between pt-2 border-t border-slate-100 text-xs">
                <div>
                  <p className="text-[10px] text-slate-400">Payment Verified By:</p>
                  <p className="font-bold text-slate-800 text-[11px]">
                    {formData.signatoryName || "Academy Finance Team"}
                  </p>
                  <p className="text-[10px] text-slate-500">{formData.signatoryTitle}</p>
                </div>

                <div className="rounded-lg border border-dashed border-emerald-300 bg-emerald-50 px-2.5 py-1 text-center">
                  <span className="text-[9px] font-black uppercase text-emerald-700 tracking-wider">
                    Official Stamp
                  </span>
                </div>
              </div>

              {/* Receipt Footer Notes */}
              <p className="text-[10px] text-slate-400 text-center italic pt-1">
                {formData.receiptNotes ||
                  "Thank you for your payment. This is an official computer-generated receipt."}
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function AcademyProfileClient() {
  const { data: academy, isLoading } = useAcademyProfile();
  const updateMutation = useUpdateAcademyProfileMutation();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <FaSpinner className="animate-spin text-3xl text-[#D6451B]" />
        <span className="ml-3 text-sm font-bold text-slate-600">Loading academy details...</span>
      </div>
    );
  }

  return (
    <AcademyProfileForm
      key={academy?._id || "academy-profile-form"}
      academy={academy}
      updateMutation={updateMutation}
    />
  );
}
