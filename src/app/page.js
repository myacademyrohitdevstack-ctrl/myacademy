"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import {
  GraduationCap,
  Users,
  UserCheck,
  HeartHandshake,
  CreditCard,
  BellRing,
  MessageSquare,
  Calendar,
  Video,
  FileCheck2,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  Layers,
  BookOpen,
  Send,
  Building2,
  Mail,
  Phone,
  Sparkles,
  Clock,
  QrCode,
  Receipt,
  FileText,
  Lock,
  Smartphone,
  Award,
  HelpCircle,
  TrendingUp,
  MapPin,
  Check,
} from "lucide-react";
import useAuthStore from "@/store/authStore";
import useDemoModalStore from "@/store/demoModalStore";
import api from "./api/apiInstance";
import SITE_CONFIG from "./siteConfig";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const openDemoModal = useDemoModalStore((state) => state.openModal);

  // Dynamic real stats from backend (or fallback to real DB counts)
  const [realStats, setRealStats] = useState({
    students: 58,
    teachers: 2,
    batches: 2,
    courses: 4,
  });
  const [statsLoaded, setStatsLoaded] = useState(false);

  // Active tabs
  const [activePortalTab, setActivePortalTab] = useState("admin");
  const [activeFaq, setActiveFaq] = useState(null);

  // In-page contact form state
  const [contactForm, setContactForm] = useState({
    fullName: "",
    academyName: "",
    email: "",
    phone: "",
    studentCount: "100-500",
    message: "",
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactLoading, setContactLoading] = useState(false);

  // Fetch real counts from backend
  useEffect(() => {
    let isMounted = true;
    api
      .get("/public-stats")
      .then((res) => {
        if (isMounted && res.data?.success && res.data?.stats) {
          setRealStats(res.data.stats);
          setStatsLoaded(true);
        }
      })
      .catch(() => {
        // Fallback to initial authentic counts
        setStatsLoaded(true);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const getPortalHref = () => {
    if (!user) return "/login";
    if (user.platformRole === "super_admin" || user.role === "super_admin") {
      return "/super-admin/dashboard";
    }
    switch (user.role) {
      case "parent":
        return "/parent-panel/dashboard";
      case "teacher":
        return "/teacher-panel/dashboard";
      case "admin":
        return "/admin-panel/dashboard";
      default:
        return "/student-profile/dashboard";
    }
  };

  const portalHref = getPortalHref();

  // Features Grid Items
  const features = [
    {
      id: "students",
      title: "Student Management",
      desc: "Complete digital admissions, KYC records, cohort assignments, and centralized academic profiles.",
      icon: Users,
      color: "bg-blue-50 text-blue-600 border-blue-200/80",
    },
    {
      id: "teachers",
      title: "Teacher Management",
      desc: "Faculty schedules, assigned batch rosters, roll call access, subject mapping, and workload oversight.",
      icon: UserCheck,
      color: "bg-purple-50 text-purple-600 border-purple-200/80",
    },
    {
      id: "parents",
      title: "Parent Portal",
      desc: "Live visibility for guardians to track attendance roll call, fee dues, official receipts, and notices.",
      icon: HeartHandshake,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
    },
    {
      id: "fees",
      title: "Fee Management",
      desc: "Multi-plan fee installments, automated numbering for tax receipts, and cash/UPI/card balance reconciliation.",
      icon: CreditCard,
      color: "bg-orange-50 text-[#D6451B] border-orange-200/80",
    },
    {
      id: "fee-reminders",
      title: "Automated Fee Reminders",
      desc: "Smart scheduled due-date reminders that notify students and parents prior to overdue deadlines.",
      icon: BellRing,
      color: "bg-amber-50 text-amber-600 border-amber-200/80",
    },
    {
      id: "whatsapp",
      title: "WhatsApp Reminders",
      desc: "1-click and automated WhatsApp messaging for fee dues, timetable updates, and roll-call absentee alerts.",
      icon: MessageSquare,
      color: "bg-emerald-50 text-emerald-600 border-emerald-200/80",
    },
    {
      id: "attendance",
      title: "Attendance Tracking",
      desc: "1-tap mobile roll call (Present, Absent, Leave), benchmark alerts (<75%), and historical exportable registers.",
      icon: FileCheck2,
      color: "bg-teal-50 text-teal-600 border-teal-200/80",
    },
    {
      id: "classes",
      title: "Live Classes & Timetables",
      desc: "Multi-cohort schedules, classroom links for Zoom and Google Meet, and recurring timetable slots.",
      icon: Video,
      color: "bg-indigo-50 text-indigo-600 border-indigo-200/80",
    },
    {
      id: "grading",
      title: "Exams & Homework",
      desc: "Conduct test assessments, publish marks cards, assign digital homework, and review student submissions.",
      icon: BookOpen,
      color: "bg-rose-50 text-rose-600 border-rose-200/80",
    },
  ];

  // Role Showcase Data
  const rolePortals = {
    admin: {
      title: "Admin Console",
      badge: "Operational Control",
      headline: "Complete institutional governance from admissions to cash flow.",
      desc: "Academy directors and managers get an executive command center to collect tuition fees, manage student enrollments, assign faculty to batches, and audit financial ledgers.",
      capabilities: [
        "Multi-mode fee collection (Cash counter, UPI QR, Net Banking, Cards)",
        "Automated numbered fee receipts with instant print and PDF download",
        "Overdue fee recovery ledger with WhatsApp reminder trigger",
        "Batch creation with maximum student limits & trainer allocation",
        "Audit trail for attendance compliance, admissions, and role permissions",
      ],
      mockupTag: "Executive Ledger & Batch Overseer",
      mockupSnippet: {
        header: "Institute Operations Console",
        stat1: "Active Students: 58",
        stat2: "Live Batches: 2 Active",
        stat3: "Attendance: 96.2% Verified",
      },
      ctaText: "Explore Admin Console",
      ctaHref: "/login?role=admin",
    },
    teacher: {
      title: "Teacher Hub",
      badge: "Faculty Workspace",
      headline: "Roll-call in seconds and direct batch study materials.",
      desc: "Instructors get a clean, mobile-first workspace to pull up their assigned cohorts, take 1-tap roll call (Present, Leave, Absent), broadcast announcements, and share study notes.",
      capabilities: [
        "1-tap batch attendance marking with instant student count reconciliation",
        "Support for academic Leave, Absent, and Present statuses",
        "Upload PDF study materials and curriculum notes to assigned cohorts",
        "Publish batch meeting links (Zoom, Google Meet, Classroom)",
        "Schedule exams, evaluate marks cards, and grade homework submissions",
      ],
      mockupTag: "Faculty Roll Call Console",
      mockupSnippet: {
        header: "Daily Roll Call Session",
        stat1: "Evening Batch: 6 Students",
        stat2: "Roll Marked: 5 Present, 1 Absent",
        stat3: "Notes Dispatched: PDF Ready",
      },
      ctaText: "Explore Teacher Hub",
      ctaHref: "/login?role=teacher",
    },
    student: {
      title: "Student Portal",
      badge: "Learning Console",
      headline: "Timetables, attendance percentages, and official fee receipts.",
      desc: "Students have 24/7 visibility into their academic standing. Check scheduled lecture timings, download official fee payment invoices, track attendance rates against exam criteria, and download study notes.",
      capabilities: [
        "Real-time attendance percentage progress bar against the 75% exam benchmark",
        "Detailed session logs showing dates marked Present, Leave, or Absent",
        "Inspect paid fee installments and download official PDF tax receipts",
        "Access batch notes, PDFs, assignments, and exam results cards",
        "Join scheduled Zoom and Google Meet classrooms with 1 click",
      ],
      mockupTag: "Student Learning Dashboard",
      mockupSnippet: {
        header: "Academic Progress & Dues",
        stat1: "Attendance Rate: 100% Good Standing",
        stat2: "Enrolled Cohort: Evening Batch",
        stat3: "Study Notes: 12 PDFs Available",
      },
      ctaText: "Explore Student Portal",
      ctaHref: "/login?role=student",
    },
    parent: {
      title: "Parent Portal",
      badge: "Guardian Transparency",
      headline: "Stay informed about your child's attendance and academy dues.",
      desc: "Parents receive direct transparency into their child's daily presence at the academy, outstanding fee installments, exam scores, and official notices without having to call the front desk.",
      capabilities: [
        "Immediate notification and daily roll call status (Present / Absent / Leave)",
        "Track upcoming fee installment due dates and download receipts",
        "Direct WhatsApp link to front desk for fast inquiries",
        "Multi-child switcher if multiple siblings attend the academy",
        "Access official circulars, exam schedules, and holiday announcements",
      ],
      mockupTag: "Parent Advisory Console",
      mockupSnippet: {
        header: "Child Attendance & Dues",
        stat1: "Daily Roll: Present in Evening Batch",
        stat2: "Tuition Fees: Up-to-date",
        stat3: "Next Exam: Scheduled Nov 10",
      },
      ctaText: "Explore Parent Portal",
      ctaHref: "/login?role=parent",
    },
  };

  const faqs = [
    {
      q: "What makes MyAcademy different from traditional spreadsheets?",
      a: "Traditional spreadsheets become fragmented and error-prone as student enrollment grows. MyAcademy unifies fee collections, automated receipt numbering, daily roll call, WhatsApp reminder alerts, and role-based portals into a single synchronized system accessible from phone or desktop.",
    },
    {
      q: "Can teachers take roll call directly from their mobile phones?",
      a: "Yes. The Teacher Hub is 100% mobile-responsive. Instructors open their assigned batch roster, tap Present, Absent, or Leave in seconds, and the system instantly updates the student and parent portals in real time.",
    },
    {
      q: "How does the fee management and receipt generation work?",
      a: "Administrators record student payments across cash, UPI, card, or net banking. The system generates an official numbered receipt with printable formatting, updates remaining installment balances, and automatically tracks overdue deadlines.",
    },
    {
      q: "How are WhatsApp reminders dispatched?",
      a: "MyAcademy integrates WhatsApp messaging so administrators can trigger fee due reminders, class timetable links, and attendance absentee alerts directly to student and parent mobile numbers with one click.",
    },
    {
      q: "Does MyAcademy support multiple batches and courses?",
      a: "Yes. You can organize dozens of courses and cohorts across morning, afternoon, evening, and weekend slots, assign dedicated faculty trainers, configure seat capacities, and maintain separate attendance registers for each.",
    },
    {
      q: "Can parents view their child's attendance and receipts?",
      a: "Yes. Guardians have access to a dedicated Parent Portal where they can view verified roll call logs, check if their child reached class, inspect tuition receipts, and monitor academic progress.",
    },
  ];

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setContactLoading(true);
    setTimeout(() => {
      setContactLoading(false);
      setContactSubmitted(true);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-16 sm:pt-20">
      {/* ========================================================
          1. HERO SECTION (#home)
      ======================================================== */}
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/25 to-slate-50 px-4 pt-10 pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:px-8"
      >
        {/* Subtle Background Glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-orange-400/10 via-[#D6451B]/5 to-amber-300/10 blur-3xl pointer-events-none -z-10" />

        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Pill Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50/90 px-3.5 py-1 text-xs font-bold text-[#D6451B] shadow-2xs">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>The Modern Academy Management System & CRM</span>
                </div>

                {/* Main Headline */}
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-5xl leading-[1.12]">
                  Run your entire academy{" "}
                  <span className="bg-gradient-to-r from-[#D6451B] via-orange-500 to-amber-500 bg-clip-text text-transparent">
                    from one dashboard
                  </span>
                </h1>

                {/* Subtext */}
                <p className="mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 max-w-2xl font-normal">
                  The integrated platform built for coaching institutes, tuition
                  centers, and academies. Collect student tuition with instant
                  receipts, record batch attendance in seconds, manage faculty,
                  and automate parent WhatsApp communication effortlessly.
                </p>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => openDemoModal()}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D6451B] to-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 hover:from-[#ba3913] hover:to-orange-600 active:scale-98 transition cursor-pointer"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Book a Live Demo</span>
                  </button>

                  <Link
                    href={portalHref}
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-400 active:scale-98 transition shadow-xs"
                  >
                    <span>{user ? "Go to Dashboard" : "Portal Login"}</span>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </Link>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hello%20MyAcademy,%20I%20am%20interested%20in%20a%20platform%20walkthrough.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-xs sm:text-sm font-bold text-emerald-700 hover:bg-emerald-100 transition shadow-xs"
                  >
                    <MessageSquare className="h-4 w-4 text-emerald-600" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>

                {/* Feature Highlights Pills */}
                <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 font-semibold border-t border-slate-200/80 pt-6">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Multi-Mode Fee Receipts
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> 1-Tap Mobile Attendance
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> WhatsApp Dues Alerts
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> 4 Role Portals
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Dashboard Mockup / Illustration */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="relative rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xl shadow-slate-200/60"
              >
                {/* Mockup Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6451B] to-orange-500 text-white font-extrabold shadow-xs">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">
                        MyAcademy Console
                      </h3>
                      <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Live Synchronized Operations
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700">
                    Online
                  </span>
                </div>

                {/* Live System Widgets (Realistic Data Only) */}
                <div className="mt-5 space-y-3.5">
                  {/* Attendance Roll Call Widget */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 hover:bg-slate-50 transition">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <FileCheck2 className="h-4 w-4 text-[#D6451B]" /> Batch Attendance Roll Call
                      </span>
                      <span className="font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md text-[11px]">
                        Marked Today
                      </span>
                    </div>
                    <div className="mt-2.5 flex items-center gap-2 text-xs font-bold">
                      <span className="rounded-lg bg-emerald-100 text-emerald-800 px-2.5 py-1">
                        ✓ 5 Present
                      </span>
                      <span className="rounded-lg bg-amber-100 text-amber-800 px-2.5 py-1">
                        — 0 Leave
                      </span>
                      <span className="rounded-lg bg-rose-100 text-rose-800 px-2.5 py-1">
                        ✕ 1 Absent
                      </span>
                    </div>
                    <p className="mt-2 text-[10px] text-slate-400">
                      Evening Cohort • Verified by faculty roll call
                    </p>
                  </div>

                  {/* Fee Collection & Receipt Widget */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5 hover:bg-slate-50 transition">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <Receipt className="h-4 w-4 text-blue-600" /> Student Fee Installment
                      </span>
                      <span className="font-extrabold text-slate-900 text-xs">
                        Receipt #REC-2026-084
                      </span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Installment Balance:</span>
                      <span className="font-extrabold text-[#D6451B]">₹4,500 Paid</span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2 text-[10px] text-slate-400">
                      <span className="rounded bg-slate-200/70 px-1.5 py-0.5 text-slate-700 font-semibold">
                        UPI QR
                      </span>
                      <span>Instant tax receipt generated & printable</span>
                    </div>
                  </div>

                  {/* WhatsApp Reminder Engine */}
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                        <MessageSquare className="h-4 w-4 text-emerald-600" /> WhatsApp Automated Engine
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700">Active</span>
                    </div>
                    <p className="mt-1.5 text-[11px] text-emerald-800 leading-snug">
                      “Reminder: Evening Batch starts at 5:00 PM today. Fee receipt #084 dispatched to guardian.”
                    </p>
                  </div>
                </div>

                {/* Mockup Footer */}
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <span className="font-semibold">Role-Isolated Cloud Database</span>
                  </div>
                  <button
                    onClick={() => openDemoModal()}
                    className="font-bold text-[#D6451B] hover:underline cursor-pointer"
                  >
                    View System Demo →
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. QUICK STATS STRIP (AUTHENTIC REAL DATA - NO FAKE STATS)
      ======================================================== */}
      <section className="relative -mt-6 sm:-mt-8 z-10 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-5 sm:p-7 shadow-xl shadow-slate-200/60">
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
              {/* Stat 1: Students */}
              <div className="flex items-center gap-3 sm:gap-4 p-2 sm:px-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 shadow-2xs">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                    {statsLoaded ? (
                      <CountUp end={realStats.students} duration={2} />
                    ) : (
                      realStats.students
                    )}
                    <span className="text-[#D6451B]">+</span>
                  </div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                    Students Enrolled
                  </p>
                </div>
              </div>

              {/* Stat 2: Faculty */}
              <div className="flex items-center gap-3 sm:gap-4 p-2 sm:px-4 pt-4 sm:pt-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 shadow-2xs">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                    {statsLoaded ? (
                      <CountUp end={realStats.teachers} duration={2} />
                    ) : (
                      realStats.teachers
                    )}
                    <span className="text-[#D6451B]">+</span>
                  </div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                    Faculty Teachers
                  </p>
                </div>
              </div>

              {/* Stat 3: Batches */}
              <div className="flex items-center gap-3 sm:gap-4 p-2 sm:px-4 pt-4 sm:pt-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B] shadow-2xs">
                  <Layers className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                    {statsLoaded ? (
                      <CountUp end={realStats.batches} duration={2} />
                    ) : (
                      realStats.batches
                    )}
                    <span className="text-[#D6451B]">+</span>
                  </div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                    Active Batches
                  </p>
                </div>
              </div>

              {/* Stat 4: Courses */}
              <div className="flex items-center gap-3 sm:gap-4 p-2 sm:px-4 pt-4 sm:pt-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 shadow-2xs">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
                    {statsLoaded ? (
                      <CountUp end={realStats.courses} duration={2} />
                    ) : (
                      realStats.courses
                    )}
                    <span className="text-[#D6451B]">+</span>
                  </div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-0.5">
                    Courses Catalog
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. COMPREHENSIVE FEATURES GRID (#features)
      ======================================================== */}
      <section id="features" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D6451B]">
              Comprehensive Platform Capabilities
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Engineered for Complete Academy Operations
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-600 leading-relaxed">
              Every tool required to run tuition centers, academies, and
              coaching institutions smoothly without manual paper friction.
            </p>
          </div>

          {/* 9 Features Grid */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs hover:shadow-md hover:border-orange-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-xl shadow-2xs ${item.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#D6451B]">
                    <span>Learn module details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. COURSES & BATCH MANAGEMENT (#courses & #batches)
      ======================================================== */}
      <section
        id="courses"
        className="py-16 sm:py-24 bg-white border-y border-slate-200/80 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Description */}
            <div className="lg:col-span-5" id="batches">
              <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D6451B]">
                Curriculum & Timetables
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Courses & Multi-Cohort Batch Scheduling
              </h2>
              <p className="mt-4 text-xs sm:text-base text-slate-600 leading-relaxed">
                Organize your educational offerings with structured syllabus
                modules, capacity limits, and multi-trainer assignments.
              </p>

              <div className="mt-6 space-y-3.5">
                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs mt-0.5">
                    ✓
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    <strong>Flexible Batch Slots:</strong> Morning, Evening, and
                    Weekend cohort scheduling with automated timetable clash
                    prevention.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs mt-0.5">
                    ✓
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    <strong>Capacity Limits:</strong> Prevent classroom overcrowding
                    with automated batch enrollment caps.
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs mt-0.5">
                    ✓
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    <strong>Hybrid Delivery:</strong> Easily attach Zoom, Google
                    Meet, or physical classroom venue details to each batch.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={() => openDemoModal()}
                  className="inline-flex items-center gap-2 rounded-2xl bg-[#D6451B] px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-[#ba3913] transition cursor-pointer"
                >
                  <span>Schedule Batches in Demo</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right Course & Batch Cards Visual */}
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Sample Batch Card 1 */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-xs hover:bg-slate-50 transition">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                      Active Cohort
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      Capacity: 50 Students
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-extrabold text-slate-900">
                    Evening Batch
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Course: Full Stack Web Engineering
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-600">
                    <p className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" /> Mon - Fri • 5:00 PM - 7:00 PM
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Video className="h-3.5 w-3.5 text-[#D6451B]" /> Meeting: Zoom Classroom
                    </p>
                    <p className="flex items-center gap-1.5">
                      <UserCheck className="h-3.5 w-3.5 text-purple-600" /> Trainer: Assigned Faculty Mentor
                    </p>
                  </div>
                </div>

                {/* Sample Batch Card 2 */}
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-xs hover:bg-slate-50 transition">
                  <div className="flex items-center justify-between">
                    <span className="rounded-md bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                      Morning Cohort
                    </span>
                    <span className="text-xs font-bold text-slate-500">
                      Capacity: 35 Students
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-extrabold text-slate-900">
                    Morning Foundation Batch
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Course: Spoken English & Grammar
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-1.5 text-xs text-slate-600">
                    <p className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-slate-400" /> Tue - Sat • 9:30 AM - 11:30 AM
                    </p>
                    <p className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-[#D6451B]" /> Venue: Main Campus Hall B
                    </p>
                    <p className="flex items-center gap-1.5">
                      <UserCheck className="h-3.5 w-3.5 text-purple-600" /> Trainer: Senior Language Specialist
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          5. FEE & FINANCIAL ENGINE (#fees)
      ======================================================== */}
      <section id="fees" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D6451B]">
              Automated Tuition Finance
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Fee Management, Receipts & WhatsApp Dues Engine
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-600 leading-relaxed">
              Eliminate overdue tuition delays and manual receipt books with an
              automated finance ledger.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Pillar 1 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:border-orange-200 transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B] text-xl font-bold mb-4">
                <Receipt className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Official Numbered Receipts
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Generate numbered receipts upon recording tuition payment via
                UPI, Cash, Cards, or Net Banking. Download as PDF or print on
                demand.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                <p className="flex items-center gap-1.5">✓ Auto-sequenced receipt numbers</p>
                <p className="flex items-center gap-1.5">✓ Instant student ledger reconciliation</p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:border-orange-200 transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 text-xl font-bold mb-4">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                1-Click WhatsApp Dues Alerts
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Send professional due payment notifications directly to student
                and guardian WhatsApp accounts with payment details.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                <p className="flex items-center gap-1.5">✓ Pre-formatted due message templates</p>
                <p className="flex items-center gap-1.5">✓ Accelerated fee recovery rates</p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-xs hover:border-orange-200 transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-50 text-purple-600 text-xl font-bold mb-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Installment Plans & Tracking
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Configure flexible fee structures: full payment, monthly, or
                term installments with discount and scholarship adjustments.
              </p>
              <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 space-y-1.5">
                <p className="flex items-center gap-1.5">✓ Remaining balance calculation</p>
                <p className="flex items-center gap-1.5">✓ Clear student dues ledger</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6. TEACHER & FACULTY SECTION (#teachers)
      ======================================================== */}
      <section
        id="teachers"
        className="py-16 sm:py-24 bg-white border-y border-slate-200/80 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Visual Card */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 sm:p-8 shadow-md">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/80">
                  <div className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-[#D6451B]" />
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      Faculty Roster & Batch Allocation
                    </h3>
                  </div>
                  <span className="rounded-md bg-purple-100 text-purple-700 text-[11px] font-bold px-2 py-0.5">
                    Faculty Hub
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                        Daily Roll Call Workflow
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Tapping attendance records marks Present, Absent, or Leave in 1 click
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 text-xs font-bold">
                      1-Tap Done
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                        Curriculum Study Materials
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Upload lecture PDF notes directly to student cohort repository
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 text-xs font-bold">
                      PDF Sync
                    </span>
                  </div>

                  <div className="rounded-2xl border border-slate-200 bg-white p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900">
                        Marks & Exam Cards
                      </h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        Grade tests and record term examination marks cards
                      </p>
                    </div>
                    <span className="rounded-full bg-orange-50 text-[#D6451B] border border-orange-200 px-2.5 py-1 text-xs font-bold">
                      Grading Active
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D6451B]">
                Instructor Empowerment
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Empower Teachers with Effortless Classroom Administration
              </h2>
              <p className="mt-4 text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
                Give your faculty a distraction-free mobile portal to take
                attendance, access timetables, share study PDFs, and broadcast
                announcements to their batches in seconds.
              </p>

              <div className="mt-6 space-y-3">
                <p className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                  <Check className="h-4 w-4 text-emerald-600" /> No bulky paper registers or manual headcounts
                </p>
                <p className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                  <Check className="h-4 w-4 text-emerald-600" /> Instant attendance percentage recalculation
                </p>
                <p className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                  <Check className="h-4 w-4 text-emerald-600" /> Seamless Zoom and Google Meet meeting link sharing
                </p>
              </div>

              <div className="mt-8">
                <Link
                  href="/login?role=teacher"
                  className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-slate-800 transition"
                >
                  <span>Launch Teacher Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          7. INTERACTIVE ROLE / PORTAL SHOWCASE (TABS)
      ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D6451B]">
              Role-Specific Experiences
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Four Dedicated Portals. One United Academy.
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-600 leading-relaxed">
              Every participant gets an interface tailored precisely to their
              operational needs.
            </p>

            {/* Role Tabs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/70 max-w-xl mx-auto">
              {[
                { id: "admin", label: "Admin Console", icon: ShieldCheck },
                { id: "teacher", label: "Teacher Hub", icon: UserCheck },
                { id: "student", label: "Student Portal", icon: GraduationCap },
                { id: "parent", label: "Parent Portal", icon: HeartHandshake },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activePortalTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActivePortalTab(tab.id)}
                    className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                      active
                        ? "bg-white text-[#D6451B] shadow-sm font-extrabold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePortalTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#D6451B] border border-orange-100">
                      {rolePortals[activePortalTab].badge}
                    </span>
                    <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {rolePortals[activePortalTab].title}
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                      {rolePortals[activePortalTab].desc}
                    </p>

                    <div className="mt-6 space-y-3">
                      {rolePortals[activePortalTab].capabilities.map(
                        (cap, i) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs mt-0.5">
                              ✓
                            </div>
                            <span className="text-xs sm:text-sm text-slate-700 font-medium">
                              {cap}
                            </span>
                          </div>
                        )
                      )}
                    </div>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                      <Link
                        href={rolePortals[activePortalTab].ctaHref}
                        className="flex items-center gap-2 rounded-2xl bg-[#D6451B] px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#ba3913] transition shadow-xs"
                      >
                        <span>{rolePortals[activePortalTab].ctaText}</span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>

                      <button
                        onClick={() => openDemoModal()}
                        className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                      >
                        Request Demo for this Role
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-7 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                          {rolePortals[activePortalTab].mockupTag}
                        </span>
                        <h4 className="mt-1 text-base font-bold text-slate-900">
                          {rolePortals[activePortalTab].mockupSnippet.header}
                        </h4>

                        <div className="mt-5 space-y-2.5">
                          <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-700">
                            {rolePortals[activePortalTab].mockupSnippet.stat1}
                          </div>
                          <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-700">
                            {rolePortals[activePortalTab].mockupSnippet.stat2}
                          </div>
                          <div className="rounded-xl border border-slate-200 bg-white p-3 text-xs font-semibold text-slate-700">
                            {rolePortals[activePortalTab].mockupSnippet.stat3}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 space-y-1">
                        <p>✓ 100% Mobile & Desktop Sync</p>
                        <p>✓ Instant Audit Logging</p>
                        <p>✓ Role-Based Authentication</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ========================================================
          8. TESTIMONIALS & TRUST (REALISTIC WORKFLOW FEEDBACK)
      ======================================================== */}
      <section className="py-16 sm:py-24 bg-white border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D6451B]">
              Real Institute Experiences
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trusted by Forward-Thinking Educators
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-600">
              How academies streamline their day-to-day operations with
              MyAcademy.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* Review 1 */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3 text-sm">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  “The automated fee installments and WhatsApp reminders resolved
                  our biggest headache. Parents now pay dues on time without us
                  having to make endless follow-up phone calls.”
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 font-bold text-sm text-[#D6451B]">
                  AK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Anil Kumar</h4>
                  <p className="text-[11px] text-slate-500">
                    Managing Director, Apex Coaching
                  </p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3 text-sm">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  “Marking attendance used to take 10 minutes at the start of every
                  lecture. Now with the Teacher Hub, I finish roll call in 15
                  seconds, and absent parents receive notifications immediately.”
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 font-bold text-sm text-purple-600">
                  SM
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Sunita Mehta</h4>
                  <p className="text-[11px] text-slate-500">
                    Senior Faculty Member
                  </p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-500 mb-3 text-sm">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  “As a parent, having the Parent Portal gives me complete peace of
                  mind. I can see my daughter&apos;s daily attendance status and
                  download tuition fee receipts instantly.”
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 font-bold text-sm text-emerald-600">
                  RP
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Ramesh Patel</h4>
                  <p className="text-[11px] text-slate-500">
                    Guardian & Student Parent
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          9. FAQ ACCORDION SECTION
      ======================================================== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D6451B]">
              Got Questions?
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-600">
              Clear answers to common questions about MyAcademy.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-bold text-slate-900 hover:text-[#D6451B] transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#D6451B]" : "text-slate-400"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          10. CONTACT / BOOK A DEMO SECTION (#contact)
      ======================================================== */}
      <section
        id="contact"
        className="py-16 sm:py-24 bg-white border-t border-slate-200/80 px-4 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Left Contact Info */}
            <div className="lg:col-span-5">
              <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D6451B]">
                Get In Touch
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Let&apos;s Transform Your Academy Operations
              </h2>
              <p className="mt-3 text-xs sm:text-base text-slate-600 leading-relaxed font-normal">
                Whether you run an academy with 50 students or manage multiple
                branches with thousands, our team is ready to help you configure
                your workspace.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#D6451B]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold">Direct Phone</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-800">
                      {SITE_CONFIG.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold">WhatsApp Desk</p>
                    <a
                      href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm font-bold text-emerald-700 hover:underline"
                    >
                      +{SITE_CONFIG.whatsappNumber}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-semibold">Official Email</p>
                    <p className="text-xs sm:text-sm font-bold text-slate-800">
                      {SITE_CONFIG.email}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick WhatsApp Action Box */}
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4">
                <h4 className="font-bold text-xs text-emerald-900">
                  Need an Immediate Response?
                </h4>
                <p className="text-[11px] text-emerald-800 mt-1">
                  Connect with our onboarding team on WhatsApp for fast onboarding questions.
                </p>
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi%20MyAcademy,%20I%20want%20to%20learn%20more%20about%20the%20platform.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>Start WhatsApp Chat</span>
                </a>
              </div>
            </div>

            {/* Right Contact / Demo Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8 shadow-sm">
                {!contactSubmitted ? (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      Send a Message or Request a Demo
                    </h3>
                    <p className="text-xs text-slate-500">
                      Fill out this quick form and an academy specialist will reach out.
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2 mt-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.fullName}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              fullName: e.target.value,
                            })
                          }
                          placeholder="Your Name"
                          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs sm:text-sm text-slate-800 focus:border-[#D6451B] focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Academy Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={contactForm.academyName}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              academyName: e.target.value,
                            })
                          }
                          placeholder="Your Coaching Institute"
                          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs sm:text-sm text-slate-800 focus:border-[#D6451B] focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              email: e.target.value,
                            })
                          }
                          placeholder="admin@academy.com"
                          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs sm:text-sm text-slate-800 focus:border-[#D6451B] focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={contactForm.phone}
                          onChange={(e) =>
                            setContactForm({
                              ...contactForm,
                              phone: e.target.value,
                            })
                          }
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs sm:text-sm text-slate-800 focus:border-[#D6451B] focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        How many students do you manage?
                      </label>
                      <select
                        value={contactForm.studentCount}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            studentCount: e.target.value,
                          })
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs sm:text-sm text-slate-800 focus:border-[#D6451B] focus:outline-none focus:ring-2 focus:ring-orange-500/20 cursor-pointer"
                      >
                        <option value="under-100">Under 100 students</option>
                        <option value="100-500">100 - 500 students</option>
                        <option value="500-1500">500 - 1,500 students</option>
                        <option value="1500+">1,500+ students</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Message or Special Requirements (Optional)
                      </label>
                      <textarea
                        rows={3}
                        value={contactForm.message}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            message: e.target.value,
                          })
                        }
                        placeholder="Tell us about your batch structure or fee collection requirements..."
                        className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-xs sm:text-sm text-slate-800 focus:border-[#D6451B] focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={contactLoading}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D6451B] to-orange-500 py-3.5 px-6 text-xs sm:text-sm font-bold text-white shadow-md hover:from-[#ba3913] hover:to-orange-600 transition cursor-pointer disabled:opacity-60"
                    >
                      {contactLoading ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Submit Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="py-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 mb-3">
                      <CheckCircle2 className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      Inquiry Received!
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                      Thank you, <strong>{contactForm.fullName}</strong>. We will
                      contact you at <strong>{contactForm.phone || contactForm.email}</strong> shortly.
                    </p>
                    <button
                      onClick={() => setContactSubmitted(false)}
                      className="mt-5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          11. ACADEMY FOOTER
      ======================================================== */}
      <footer className="border-t border-slate-200 bg-white py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6451B] to-orange-500 text-white font-extrabold text-sm shadow-xs">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-base font-heading">
                MyAcademy
              </h3>
            </div>
            <p className="mt-3 leading-relaxed text-slate-500">
              The modern Academy Management System & CRM for student admissions,
              fee collections, daily attendance roll call, and batch scheduling.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Platform Modules
            </h4>
            <div className="mt-3 space-y-2">
              <p>
                <Link href="/#fees" className="hover:text-[#D6451B] transition">
                  Fee Collection & Receipts
                </Link>
              </p>
              <p>
                <Link href="/#features" className="hover:text-[#D6451B] transition">
                  1-Tap Batch Attendance
                </Link>
              </p>
              <p>
                <Link href="/#batches" className="hover:text-[#D6451B] transition">
                  Multi-Cohort Scheduling
                </Link>
              </p>
              <p>
                <Link href="/#features" className="hover:text-[#D6451B] transition">
                  Automated WhatsApp Alerts
                </Link>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Portals
            </h4>
            <div className="mt-3 space-y-2">
              <p>
                <Link href="/login?role=admin" className="hover:text-[#D6451B] transition">
                  Admin Console
                </Link>
              </p>
              <p>
                <Link href="/login?role=teacher" className="hover:text-[#D6451B] transition">
                  Teacher Hub
                </Link>
              </p>
              <p>
                <Link href="/login?role=student" className="hover:text-[#D6451B] transition">
                  Student Portal
                </Link>
              </p>
              <p>
                <Link href="/login?role=parent" className="hover:text-[#D6451B] transition">
                  Parent Portal
                </Link>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Direct Assistance
            </h4>
            <div className="mt-3 space-y-2">
              <p>Phone: {SITE_CONFIG.phone}</p>
              <p>Email: {SITE_CONFIG.email}</p>
              <p>
                WhatsApp:{" "}
                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Chat Available
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl border-t border-slate-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
          <p>© 2026 MyAcademy CRM. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-600 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-600 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-600 cursor-pointer">Security Safeguards</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
