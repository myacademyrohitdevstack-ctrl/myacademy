"use client";

import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhoneAlt,
  FaUserGraduate,
  FaShieldAlt,
  FaIdBadge,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import useAuthStore from "@/store/authStore";
import { useMyChildren } from "@/Hooks/useParent";

export default function ParentProfileClient() {
  const user = useAuthStore((state) => state.user);
  const { data: childrenList, isLoading } = useMyChildren();

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 min-w-0">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white/20 text-4xl text-white shadow-inner backdrop-blur-md">
            <FaUserCircle />
          </div>

          <div className="min-w-0 text-center sm:text-left">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Parent Profile
            </span>
            <h1 className="mt-2 text-2xl font-extrabold sm:text-3xl truncate">
              {user?.fullName || "Parent Account"}
            </h1>
            <p className="text-xs sm:text-sm text-orange-100 font-normal mt-0.5">
              Authorized guardian profile linked to registered academy students.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Grid: Personal Details & Linked Children */}
      <div className="grid gap-4 sm:gap-6 lg:grid-cols-3 w-full min-w-0">
        {/* Left Column: Account Details */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
            Guardian Information
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <span className="text-[11px] font-semibold text-slate-400">Full Name</span>
              <p className="font-bold text-slate-900 mt-0.5">{user?.fullName || "Parent"}</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <span className="text-[11px] font-semibold text-slate-400">Email Address</span>
              <p className="font-bold text-slate-900 mt-0.5">{user?.email || "N/A"}</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
              <span className="text-[11px] font-semibold text-slate-400">Phone Number</span>
              <p className="font-bold text-slate-900 mt-0.5">{user?.phone || "Not specified"}</p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-semibold text-slate-400">Account Role</span>
                <p className="font-bold text-[#D6451B] mt-0.5 uppercase tracking-wide text-xs">
                  {user?.role || "parent"}
                </p>
              </div>
              <FaShieldAlt className="text-slate-300 text-lg" />
            </div>
          </div>
        </div>

        {/* Right Column (2 cols): Linked Children Records */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <FaUserGraduate className="text-[#D6451B]" />
              <h3 className="text-sm font-bold text-slate-900">
                Linked Student Profiles
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-400">
              {childrenList?.length || 0} Connected
            </span>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              <FaSpinner className="animate-spin inline mr-2 text-[#D6451B]" />
              <span>Fetching linked student profiles...</span>
            </div>
          ) : !childrenList || childrenList.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No students are currently linked to your parent account.
            </div>
          ) : (
            <div className="space-y-3">
              {childrenList.map((child) => (
                <div
                  key={child._id}
                  className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 hover:border-orange-200 transition"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-orange-100 font-extrabold text-[#D6451B] text-base border border-orange-200">
                        {child.user?.fullName?.charAt(0) || "S"}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-900">
                          {child.user?.fullName || "Student"}
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {child.user?.email || "No email"} • {child.user?.phone || "No phone"}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                      {child.parentRelationship && (
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-[#D6451B] capitalize">
                          {child.parentRelationship}
                        </span>
                      )}
                      {child.isPrimary && (
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                          Primary Guardian
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
