"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaMoneyBillWave,
  FaClipboardCheck,
  FaLayerGroup,
  FaUsers,
  FaShieldAlt,
  FaChalkboardTeacher,
  FaChartLine,
  FaWhatsapp,
  FaCheckCircle,
  FaArrowRight,
  FaReceipt,
  FaCalendarAlt,
  FaClock,
  FaChevronDown,
  FaUniversity,
  FaCreditCard,
  FaQrcode,
  FaBell,
  FaLock,
  FaMobileAlt,
} from "react-icons/fa";
import useAuthStore from "@/store/authStore";
import SITE_CONFIG from "./siteConfig";

export default function HomePage() {
  const user = useAuthStore((state) => state.user);
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeModule, setActiveModule] = useState("fees"); // 'fees', 'attendance', 'batches'

  const isSuperAdmin =
    user?.platformRole === "super_admin" || user?.role === "super_admin";

  const portalHref = !user
    ? "/login"
    : isSuperAdmin
    ? "/super-admin/dashboard"
    : user.role === "parent"
    ? "/parent-panel/dashboard"
    : user.role === "admin"
    ? "/admin-panel/dashboard"
    : user.role === "teacher"
    ? "/teacher-panel/dashboard"
    : "/student-profile/dashboard";

  const stats = [
    { value: "500+", label: "Academies Powered", icon: FaUniversity },
    { value: "₹12Cr+", label: "Fees Processed", icon: FaMoneyBillWave },
    { value: "99.2%", label: "Attendance Accuracy", icon: FaClipboardCheck },
    { value: "4,500+", label: "Batches Scheduled", icon: FaLayerGroup },
  ];

  const saasModules = {
    fees: {
      title: "Fee Management & Digital Cash Flow",
      badge: "Automated Finance",
      description:
        "Eliminate overdue fee chaos. Collect tuition via UPI, QR code, cash or cards, dispatch instant WhatsApp payment reminders, and print certified tax receipts.",
      points: [
        "Instant multi-mode fee collection (Cash counter, UPI, Net Banking, Cards)",
        "Overdue dues ledger with automated WhatsApp reminder dispatches",
        "Official printable fee receipts & automated receipt numbering",
        "Revenue forecasting, payment mode analytics & batch recovery rates",
      ],
      statTitle: "Today's Inflow",
      statValue: "₹42,500",
      statSub: "89.3% collection recovery rate",
      btnText: "Explore Fee Console",
      btnHref: "/admin-panel/fees/dashboard",
    },
    attendance: {
      title: "Real-Time Student Attendance Tracking",
      badge: "Smart Attendance",
      description:
        "Say goodbye to manual paper attendance registers. Teachers mark batch attendance with one tap, while administrators monitor absent alerts and attendance compliance percentages.",
      points: [
        "1-click batch attendance marking (Present, Absent, Late)",
        "Automated absentee notification triggers for parents & students",
        "Student percentage attendance records & threshold warning badges",
        "Comprehensive attendance history calendar & exportable registers",
      ],
      statTitle: "Average Attendance",
      statValue: "94.8%",
      statSub: "Real-time verification across all cohorts",
      btnText: "Explore Attendance",
      btnHref: user ? portalHref : "/login",
    },
    batches: {
      title: "Multi-Cohort Batch & Timetable Scheduling",
      badge: "Batch Management",
      description:
        "Manage dozens of classroom cohorts and online batches simultaneously. Assign trainers, enforce seat capacities, schedule timings, and keep schedules synchronized.",
      points: [
        "Structured batch scheduling (Morning, Evening, Weekend slots)",
        "Trainer allocation & classroom/online platform link configuration",
        "Live cohort seat capacity limits & enrollment status tracking",
        "Centralized batch notices & schedule adjustment broadcasts",
      ],
      statTitle: "Active Cohorts",
      statValue: "45 Batches",
      statSub: "Fully synchronized timetables",
      btnText: "Manage Batches",
      btnHref: user ? portalHref : "/login",
    },
  };

  const faqs = [
    {
      question: "What is MyAcademy SaaS?",
      answer:
        "MyAcademy is an all-in-one cloud management operating system purpose-built for coaching institutes, tuition centers, academies, and vocational training schools to streamline fee collections, track real-time attendance, and manage batch schedules.",
    },
    {
      question: "How does fee collection and receipt generation work?",
      answer:
        "Administrators can record payments received via UPI, Cash, Card, or Net Banking. The system automatically reconciles the student's outstanding ledger balance, issues a numbered official receipt with print/download capability, and sends automated WhatsApp payment reminders for pending installments.",
    },
    {
      question: "Can teachers mark attendance from their mobile phones?",
      answer:
        "Yes! MyAcademy features a fully responsive, mobile-first Teacher Hub where instructors can pull up their assigned batch roster, mark Present/Absent in seconds, and review historical attendance trends.",
    },
    {
      question: "Can students view their fee receipts and attendance history?",
      answer:
        "Yes. Students have access to a dedicated Student Portal where they can inspect their fee payment history, download official PDF receipts, review remaining dues, and monitor their attendance percentage.",
    },
    {
      question: "How quickly can my academy get started with MyAcademy?",
      answer:
        "Setup takes less than 5 minutes. Create your admin account, configure your initial batches and fee structures, and begin enrolling students immediately.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-orange-50/20 to-slate-50 px-3 pt-8 pb-12 sm:px-6 sm:pt-16 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-3.5 py-1 text-xs font-bold text-[#D6451B]">
                  <span className="flex h-2 w-2 rounded-full bg-[#D6451B] animate-pulse" />
                  <span>The All-In-One Academy Operating System</span>
                </div>

                <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-5xl leading-[1.15]">
                  Automate Your Academy’s{" "}
                  <span className="bg-gradient-to-r from-[#D6451B] to-orange-500 bg-clip-text text-transparent">
                    Fees, Attendance & Batches
                  </span>
                </h1>

                <p className="mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600 max-w-2xl">
                  Say goodbye to scattered spreadsheets and delayed fee reminders.
                  <strong> MyAcademy</strong> gives you an integrated SaaS console to collect student fees, track real-time attendance, manage multi-batch schedules, and scale your academy effortlessly.
                </p>

                {/* CTAs */}
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <Link
                    href={portalHref}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#D6451B] to-orange-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:from-[#b93814] hover:to-orange-600 active:scale-98"
                  >
                    <span>{user ? "Open Your Portal" : "Access Admin Console"}</span>
                    <FaArrowRight className="text-xs" />
                  </Link>

                  <a
                    href="#modules"
                    className="flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:border-slate-400"
                  >
                    <span>See How It Works</span>
                  </a>

                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hello%20MyAcademy,%20I%20am%20interested%20in%20the%20Academy%20Management%20SaaS.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-xs sm:text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
                  >
                    <FaWhatsapp className="text-base text-emerald-600" />
                    <span>Live Demo Inquiry</span>
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="mt-8 flex flex-wrap items-center gap-5 text-xs text-slate-500 font-semibold border-t border-slate-200/80 pt-6">
                  <span className="flex items-center gap-1.5">
                    <FaCheckCircle className="text-emerald-500 text-sm" /> Automated WhatsApp Reminders
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaCheckCircle className="text-emerald-500 text-sm" /> Instant Printable Receipts
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaCheckCircle className="text-emerald-500 text-sm" /> Role-Based Access
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Right Live Interactive Visual Card */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                className="relative rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-xl shadow-slate-200/50"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6451B] to-orange-500 text-white font-extrabold shadow-xs">
                      MA
                    </div>
                    <div>
                      <h3 className="font-extrabold text-sm text-slate-900">MyAcademy Hub</h3>
                      <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block" /> Live Academy Metrics
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-orange-100 px-2.5 py-0.5 text-[10px] font-bold text-[#D6451B]">
                    Active Session
                  </span>
                </div>

                {/* Dashboard Snapshot Widgets */}
                <div className="mt-5 space-y-3.5">
                  {/* Fee Collection Card */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-600 flex items-center gap-1.5">
                        <FaMoneyBillWave className="text-[#D6451B]" /> Today's Fee Collection
                      </span>
                      <span className="font-extrabold text-emerald-600 text-sm">+₹42,500</span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#D6451B] to-emerald-500 w-[89%]" />
                    </div>
                    <p className="mt-1.5 text-[10px] text-slate-400">89.3% collection recovery rate</p>
                  </div>

                  {/* Attendance Card */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-600 flex items-center gap-1.5">
                        <FaClipboardCheck className="text-blue-600" /> Today's Batch Attendance
                      </span>
                      <span className="font-extrabold text-blue-600 text-sm">94.8% Present</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">142 marked present • 8 absent notified via SMS</p>
                  </div>

                  {/* Batches Overview Card */}
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-600 flex items-center gap-1.5">
                        <FaLayerGroup className="text-purple-600" /> Multi-Cohort Status
                      </span>
                      <span className="font-extrabold text-purple-600 text-sm">6 Active Batches</span>
                    </div>
                    <p className="mt-1 text-[11px] text-slate-500">Full Stack, AI Morning, Python Evening & UI/UX</p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {["A", "P", "R", "D"].map((initial, i) => (
                        <div
                          key={i}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 font-bold text-[10px] text-[#D6451B] border-2 border-white shadow-xs"
                        >
                          {initial}
                        </div>
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-500">+180 students active</span>
                  </div>
                  <Link
                    href="/admin-panel/fees/dashboard"
                    className="text-xs font-bold text-[#D6451B] hover:underline"
                  >
                    View Ledger →
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Bar */}
      <section className="relative -mt-6 sm:-mt-8 z-10 px-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-4 rounded-2xl sm:rounded-3xl border border-slate-200/90 bg-white p-4 sm:p-6 shadow-xl shadow-slate-200/60">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-center gap-3 sm:gap-4 p-2">
                  <div className="flex h-11 w-11 sm:h-13 sm:w-13 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B] text-lg sm:text-xl shadow-xs">
                    <Icon />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                      {stat.value}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium truncate">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Core SaaS Modules Interactive Showcase */}
      <section id="modules" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D6451B]">
              Core Pillars
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Three Powerful Engines in One System
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-500">
              Purpose-built specifically for academy management — without bloated unrelated features.
            </p>

            {/* Interactive Module Selector Tabs */}
            <div className="mt-7 flex items-center justify-center gap-2 p-1.5 rounded-2xl bg-slate-200/70 max-w-md mx-auto">
              {[
                { id: "fees", label: "Fee Management", icon: FaMoneyBillWave },
                { id: "attendance", label: "Attendance", icon: FaClipboardCheck },
                { id: "batches", label: "Batches", icon: FaLayerGroup },
              ].map((tab) => {
                const Icon = tab.icon;
                const active = activeModule === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveModule(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                      active
                        ? "bg-white text-[#D6451B] shadow-sm font-extrabold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Icon className="text-xs" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Module Deep Dive Display */}
          <div className="mt-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeModule}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-lg"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-7">
                    <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-[#D6451B] border border-orange-100">
                      {saasModules[activeModule].badge}
                    </span>
                    <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-slate-900">
                      {saasModules[activeModule].title}
                    </h3>
                    <p className="mt-3 text-xs sm:text-base text-slate-600 leading-relaxed">
                      {saasModules[activeModule].description}
                    </p>

                    <div className="mt-6 space-y-3">
                      {saasModules[activeModule].points.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xs mt-0.5">
                            ✓
                          </div>
                          <span className="text-xs sm:text-sm text-slate-700 font-medium">
                            {point}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        href={saasModules[activeModule].btnHref}
                        className="flex items-center gap-2 rounded-2xl bg-[#D6451B] px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#b93814] transition shadow-xs"
                      >
                        <span>{saasModules[activeModule].btnText}</span>
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Key Performance Indicator
                        </p>
                        <h4 className="mt-1 text-base font-bold text-slate-900">
                          {saasModules[activeModule].statTitle}
                        </h4>
                        <div className="mt-4 text-3xl sm:text-4xl font-extrabold text-[#D6451B]">
                          {saasModules[activeModule].statValue}
                        </div>
                        <p className="mt-1 text-xs text-slate-500">
                          {saasModules[activeModule].statSub}
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-200/80 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Cloud Sync:</span>
                          <strong className="text-emerald-600">Active Real-Time</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Audit Compliance:</span>
                          <strong className="text-slate-800">100% Certified</strong>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">Role Isolation:</span>
                          <strong className="text-slate-800">Admin / Teacher / Student</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Role-Based Portals Architecture */}
      <section id="portals" className="py-12 sm:py-20 bg-white border-y border-slate-200/80 px-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D6451B]">
              Role-Based Architecture
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              One Unified System. Three Purpose-Built Portals.
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-500">
              Every stakeholder gets a dedicated interface engineered for maximum productivity.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Admin Console Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between hover:border-orange-300 transition hover:shadow-lg">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-[#D6451B] text-xl font-bold shadow-xs">
                  <FaShieldAlt />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Admin Console</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Total operational control: collect fees, track overdue dues, schedule multi-cohort batches, approve admissions, and audit ledger transactions.
                </p>

                <div className="mt-5 space-y-2 text-xs text-slate-700">
                  <p className="flex items-center gap-2">✓ Full fee collection & finance ledger</p>
                  <p className="flex items-center gap-2">✓ Batch scheduling & trainer assignments</p>
                  <p className="flex items-center gap-2">✓ Student admissions & attendance audit</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link
                  href="/admin-panel/dashboard"
                  className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-[#D6451B] py-2.5 text-xs font-bold text-white hover:bg-[#b93814] transition"
                >
                  <span>Launch Admin Console</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>

            {/* Teacher Hub Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between hover:border-orange-300 transition hover:shadow-lg">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-600 text-xl font-bold shadow-xs">
                  <FaChalkboardTeacher />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Teacher Hub</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Mobile-optimized classroom portal: mark batch attendance in seconds, inspect student rosters, update timetables, and broadcast announcements.
                </p>

                <div className="mt-5 space-y-2 text-xs text-slate-700">
                  <p className="flex items-center gap-2">✓ 1-tap mobile attendance marking</p>
                  <p className="flex items-center gap-2">✓ Assigned cohort timetables & calendars</p>
                  <p className="flex items-center gap-2">✓ Student attendance compliance alerts</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link
                  href="/teacher-panel/dashboard"
                  className="flex items-center justify-center gap-1.5 w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition"
                >
                  <span>Teacher Portal</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>

            {/* Student Portal Card */}
            <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-slate-50/50 p-6 flex flex-col justify-between hover:border-orange-300 transition hover:shadow-lg">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 text-xl font-bold shadow-xs">
                  <FaUsers />
                </div>
                <h3 className="mt-4 text-xl font-bold text-slate-900">Student Portal</h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Transparency for students & guardians: view paid fees, download official invoice receipts, inspect attendance percentages, and check cohort timings.
                </p>

                <div className="mt-5 space-y-2 text-xs text-slate-700">
                  <p className="flex items-center gap-2">✓ Fee payment history & PDF receipts</p>
                  <p className="flex items-center gap-2">✓ Real-time attendance percentage</p>
                  <p className="flex items-center gap-2">✓ Timetables & cohort updates</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <Link
                  href="/student-profile/dashboard"
                  className="flex items-center justify-center gap-1.5 w-full rounded-xl border border-slate-300 bg-white py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                >
                  <span>Student Portal</span>
                  <FaArrowRight className="text-[10px]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why MyAcademy Features Bar */}
      <section id="features" className="py-12 sm:py-20 px-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-2xl mx-auto">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D6451B]">
              Why MyAcademy
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Built for Academy Growth & Financial Control
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-500">
              Replace messy paper registers and chaotic messaging apps with a modern, automated SaaS.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-lg">
                <FaWhatsapp />
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900">WhatsApp Reminders</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Send professional 1-click payment due notifications directly to student WhatsApp numbers.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-lg">
                <FaReceipt />
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900">Official Receipts</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Generate instant numbered fee receipts with student details, payment modes, and printable formats.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#D6451B] text-lg">
                <FaMobileAlt />
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900">100% Mobile Friendly</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Optimized for mobile viewports so teachers, students, and administrators can operate on any screen size.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600 text-lg">
                <FaLock />
              </div>
              <h3 className="mt-3 text-base font-bold text-slate-900">Secure Cloud Ledger</h3>
              <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                Bank-grade encryption, role-based protection, and zero data loss for all financial and attendance records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-12 sm:py-20 bg-white border-t border-slate-200/80 px-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="rounded-full bg-orange-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D6451B]">
              FAQ
            </span>
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-xs sm:text-base text-slate-500">
              Everything you need to know about MyAcademy SaaS.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/40 transition"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-bold text-slate-900 hover:text-[#D6451B] transition"
                >
                  <span>{faq.question}</span>
                  <FaChevronDown
                    className={`shrink-0 text-xs transition-transform duration-200 ${
                      activeFaq === index ? "rotate-180 text-[#D6451B]" : "text-slate-400"
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-12 sm:py-16 px-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-8 sm:p-12 text-center text-white shadow-xl shadow-orange-500/20">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Upgrade Your Academy Management?
            </h2>
            <p className="mt-3 max-w-xl mx-auto text-xs sm:text-base text-orange-100">
              Join forward-thinking coaching centers and academies streamlining fees, attendance, and batches with MyAcademy.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                href={portalHref}
                className="rounded-2xl bg-white px-6 py-3.5 text-xs sm:text-sm font-bold text-[#D6451B] shadow-md hover:bg-orange-50 transition"
              >
                Launch MyAcademy Portal
              </Link>
              <a
                href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hello%20MyAcademy,%20I%20would%20like%20to%20schedule%20an%20academy%20onboarding.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-2xl border border-white/40 bg-white/10 px-5 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/20 transition"
              >
                <FaWhatsapp className="text-base" />
                <span>Contact via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Academy Footer */}
      <footer className="border-t border-slate-200 bg-white py-12 px-3 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="mx-auto max-w-7xl grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6451B] to-orange-500 text-white font-extrabold text-sm shadow-xs">
                MA
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">MyAcademy</h3>
            </div>
            <p className="mt-3 leading-relaxed text-slate-500">
              Next-generation cloud Academy Management SaaS for fee collection, attendance tracking, and multi-cohort batch management.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Core Modules</h4>
            <div className="mt-3 space-y-2">
              <p><Link href="/admin-panel/fees/dashboard" className="hover:text-[#D6451B]">Fees & Finance Dashboard</Link></p>
              <p><Link href="/admin-panel/fees/collect" className="hover:text-[#D6451B]">Collect Student Fee</Link></p>
              <p><Link href="/admin-panel/fees/pending" className="hover:text-[#D6451B]">Pending Dues & Reminders</Link></p>
              <p><Link href="/admin-panel/fees/transactions" className="hover:text-[#D6451B]">Audit Receipts & Ledger</Link></p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Portals</h4>
            <div className="mt-3 space-y-2">
              <p><Link href="/admin-panel/dashboard" className="hover:text-[#D6451B]">Admin Console</Link></p>
              <p><Link href="/teacher-panel/dashboard" className="hover:text-[#D6451B]">Teacher Hub</Link></p>
              <p><Link href="/student-profile/dashboard" className="hover:text-[#D6451B]">Student Portal</Link></p>
              <p><Link href="/login" className="hover:text-[#D6451B]">Portal Login</Link></p>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Contact & Support</h4>
            <div className="mt-3 space-y-2">
              <p>Email: {SITE_CONFIG.email}</p>
              <p>Phone: {SITE_CONFIG.phone}</p>
              <p>Support: 24/7 Dedicated</p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl border-t border-slate-100 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400">
          <p>© 2026 MyAcademy SaaS. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-600">Privacy Policy</span>
            <span className="hover:text-slate-600">Terms of Service</span>
            <span className="hover:text-slate-600">Security Audit</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
