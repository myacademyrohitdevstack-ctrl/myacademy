"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Building2,
  User,
  Mail,
  Phone,
  Users,
  CheckCircle2,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Send,
} from "lucide-react";
import useDemoModalStore from "@/store/demoModalStore";
import SITE_CONFIG from "../siteConfig";

export default function BookDemoModal() {
  const { isOpen, closeModal } = useDemoModalStore();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    academyName: "",
    email: "",
    phone: "",
    studentCount: "100-500",
    modules: ["Fees & Receipts", "Attendance"],
    message: "",
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCloseModal = () => {
    setSubmitted(false);
    closeModal();
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const toggleModule = (mod) => {
    setFormData((prev) => ({
      ...prev,
      modules: prev.modules.includes(mod)
        ? prev.modules.filter((m) => m !== mod)
        : [...prev.modules, mod],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate instant confirmation
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const availableModules = [
    "Fees & Receipts",
    "Attendance",
    "Multi-Cohort Batches",
    "WhatsApp Alerts",
    "Teacher Hub",
    "Parent Portal",
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-2xl z-10 my-auto"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="h-4 w-4" />
            </button>

            {!submitted ? (
              <div>
                {/* Header */}
                <div className="pr-10">
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-[#D6451B]">
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>Personalized 1-on-1 Walkthrough</span>
                  </div>
                  <h3 className="mt-3 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                    Book a Free Demo of MyAcademy
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    See how MyAcademy eliminates fee chaos, automates roll call,
                    and streamlines multi-cohort batches for your institute.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name <span className="text-[#D6451B]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          placeholder="e.g. Rajesh Sharma"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-[#D6451B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition"
                        />
                      </div>
                    </div>

                    {/* Academy Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Academy / Institute Name <span className="text-[#D6451B]">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="text"
                          required
                          value={formData.academyName}
                          onChange={(e) =>
                            setFormData({ ...formData, academyName: e.target.value })
                          }
                          placeholder="e.g. Apex Learning Hub"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-[#D6451B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Official Email <span className="text-[#D6451B]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="director@academy.com"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-[#D6451B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition"
                        />
                      </div>
                    </div>

                    {/* Phone / WhatsApp */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Mobile / WhatsApp <span className="text-[#D6451B]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:border-[#D6451B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Student Count */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Estimated Students Count
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <select
                        value={formData.studentCount}
                        onChange={(e) =>
                          setFormData({ ...formData, studentCount: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-3 text-xs sm:text-sm text-slate-800 focus:border-[#D6451B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition cursor-pointer"
                      >
                        <option value="under-100">Less than 100 students</option>
                        <option value="100-500">100 - 500 students</option>
                        <option value="500-1500">500 - 1,500 students</option>
                        <option value="1500-plus">1,500+ students (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  {/* Modules of Interest */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Modules You Want to Explore
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {availableModules.map((mod) => {
                        const selected = formData.modules.includes(mod);
                        return (
                          <button
                            key={mod}
                            type="button"
                            onClick={() => toggleModule(mod)}
                            className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                              selected
                                ? "bg-[#D6451B] text-white shadow-xs"
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            }`}
                          >
                            {selected ? "✓ " : "+ "}
                            {mod}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D6451B] to-orange-500 py-3.5 px-6 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:from-[#ba3913] hover:to-orange-600 active:scale-98 transition disabled:opacity-60 cursor-pointer"
                    >
                      {loading ? (
                        <span>Scheduling Demo...</span>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Request Live Interactive Demo</span>
                        </>
                      )}
                    </button>
                    <p className="mt-2 text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Zero commitment • Free 14-day full pilot access</span>
                    </p>
                  </div>
                </form>
              </div>
            ) : (
              /* Success View */
              <div className="py-4 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-xs"
                >
                  <CheckCircle2 className="h-8 w-8" />
                </motion.div>

                <h3 className="mt-4 text-2xl font-extrabold text-slate-900">
                  Demo Requested Successfully!
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong>{formData.fullName}</strong>. An academy
                  architect from MyAcademy will reach out to{" "}
                  <strong>{formData.phone || formData.email}</strong> within 2
                  hours to arrange your guided demo.
                </p>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20MyAcademy,%20I%20just%20booked%20a%20demo%20for%20${encodeURIComponent(
                      formData.academyName || "my academy"
                    )}.%20Can%20we%20connect%20now?`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-emerald-700 shadow-sm transition"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Chat on WhatsApp Now</span>
                  </a>

                  <button
                    onClick={handleCloseModal}
                    className="w-full sm:w-auto rounded-xl border border-slate-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
