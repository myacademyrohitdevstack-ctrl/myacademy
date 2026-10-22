"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaGraduationCap,
  FaShieldAlt,
  FaChalkboardTeacher,
  FaUniversity,
  FaMoneyBillWave,
  FaClipboardCheck,
} from "react-icons/fa";

export default function PortalLoading({
  type,
  title,
  subtitle,
}) {
  const pathname = usePathname();

  const isAdmin =
    type === "admin" || (!type && (pathname?.startsWith("/admin-panel") || pathname?.startsWith("/admin")));
  const isTeacher =
    type === "teacher" || (!type && (pathname?.startsWith("/teacher-panel") || pathname?.startsWith("/teacher")));
  const isStudent =
    type === "student" || (!type && (pathname?.startsWith("/student-profile") || pathname?.startsWith("/student")));

  let displayTitle = title;
  let displaySubtitle = subtitle;
  let Icon = FaUniversity;
  let badgeText = "MyAcademy";
  let themeConfig = {
    ringColor: "border-[#D6451B]",
    gradient: "from-[#D6451B] to-orange-500",
    badgeColor: "bg-orange-50 text-[#D6451B] border-orange-200",
    tagline: "Synchronizing Academy Cloud Workspace",
  };

  if (isAdmin) {
    displayTitle = displayTitle || "Loading Admin Console...";
    displaySubtitle =
      displaySubtitle || "Syncing academy finances, multi-cohort batches, and student ledgers...";
    Icon = FaShieldAlt;
    badgeText = "Admin Console • Executive Suite";
    themeConfig = {
      ringColor: "border-[#D6451B]",
      gradient: "from-[#D6451B] via-orange-600 to-amber-500",
      badgeColor: "bg-orange-50 text-[#D6451B] border-orange-200",
      tagline: "Verifying permissions & loading analytics...",
    };
  } else if (isTeacher) {
    displayTitle = displayTitle || "Loading Teacher Portal...";
    displaySubtitle =
      displaySubtitle || "Fetching assigned classroom cohorts, attendance registers, and schedules...";
    Icon = FaChalkboardTeacher;
    badgeText = "Teacher Hub • Faculty Portal";
    themeConfig = {
      ringColor: "border-purple-600",
      gradient: "from-purple-600 via-indigo-600 to-violet-500",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
      tagline: "Connecting faculty hub & batch rosters...",
    };
  } else if (isStudent) {
    displayTitle = displayTitle || "Loading Student Portal...";
    displaySubtitle =
      displaySubtitle || "Preparing your enrolled cohorts, attendance tracking, and fee receipts...";
    Icon = FaGraduationCap;
    badgeText = "Student Portal • Learning Workspace";
    themeConfig = {
      ringColor: "border-blue-600",
      gradient: "from-blue-600 via-sky-600 to-emerald-500",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
      tagline: "Syncing enrolled cohorts & schedules...",
    };
  } else {
    displayTitle = displayTitle || "Loading MyAcademy...";
    displaySubtitle =
      displaySubtitle || "Please wait while we initialize your academy portal workspace...";
    Icon = FaUniversity;
    badgeText = "MyAcademy Cloud OS";
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50/90 p-4 w-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-5 text-center max-w-sm w-full"
      >
        {/* Animated Double-Ring Spinner with Center Gradient Icon */}
        <div className="relative flex h-20 w-20 items-center justify-center">
          {/* Subtle outer pulse */}
          <div className="absolute inset-0 rounded-3xl bg-slate-200/60 animate-ping opacity-25" />
          {/* Static track */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
          {/* Spinning colored indicator */}
          <div
            className={`h-20 w-20 rounded-full border-4 ${themeConfig.ringColor} border-t-transparent animate-spin`}
          />
          {/* Inner Badge Icon */}
          <div
            className={`absolute flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${themeConfig.gradient} text-white font-extrabold shadow-md`}
          >
            <Icon className="text-base" />
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-1.5 px-2">
          <span
            className={`inline-block text-[10px] uppercase font-extrabold tracking-widest px-3 py-1 rounded-full border ${themeConfig.badgeColor}`}
          >
            {badgeText}
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            {displayTitle}
          </h2>
          <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-xs mx-auto">
            {displaySubtitle}
          </p>
        </div>

        {/* Dynamic Progress Indicator Bar */}
        <div className="w-56 space-y-1.5">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
              className={`h-full w-1/2 rounded-full bg-gradient-to-r ${themeConfig.gradient}`}
            />
          </div>
          <p className="text-[10px] font-semibold text-slate-400">
            {themeConfig.tagline}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
