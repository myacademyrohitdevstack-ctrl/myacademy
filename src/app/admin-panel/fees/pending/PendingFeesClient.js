"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaClock,
  FaSearch,
  FaFilter,
  FaWhatsapp,
  FaCashRegister,
  FaFileExport,
  FaExclamationCircle,
  FaCheckCircle,
  FaPhoneAlt,
  FaUserGraduate,
  FaSpinner,
} from "react-icons/fa";
import FeesNav from "../components/FeesNav";
import { usePendingFees } from "@/Hooks/useFees";

export default function PendingFeesClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("all");
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'critical', 'upcoming'
  const [reminderToast, setReminderToast] = useState(null);

  const { data: serverPending, isLoading } = usePendingFees();

  const now = new Date();
  const studentsList =
    serverPending && serverPending.length > 0
      ? serverPending.map((f) => {
          const dueDateObj = f.nextDueDate ? new Date(f.nextDueDate) : null;
          const diffDays = dueDateObj
            ? Math.max(0, Math.floor((now.getTime() - dueDateObj.getTime()) / (1000 * 3600 * 24)))
            : 0;

          return {
            _id: f._id,
            studentId: f.student?._id || f._id,
            name: f.student?.fullName || "Student",
            rollNo: f.student?.email ? f.student.email.split("@")[0] : "MA-STD",
            batch: f.batch?.name || "General Batch",
            totalFee: f.totalPayable || 0,
            paidAmount: f.paidAmount || 0,
            pending: f.balanceAmount || 0,
            dueDate: dueDateObj ? dueDateObj.toLocaleDateString("en-IN") : "Pending",
            overdueDays: diffDays,
            phone: f.student?.phone || "+91 98765 00000",
            status: f.urgency || (diffDays > 7 ? "critical" : "upcoming"),
          };
        })
      : [];

  const batchesList = [
    "all",
    ...Array.from(new Set(studentsList.map((s) => s.batch))),
  ];

  const filteredStudents = studentsList.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm);

    const matchesBatch =
      selectedBatch === "all" || student.batch === selectedBatch;

    const matchesTab =
      activeTab === "all"
        ? true
        : activeTab === "critical"
        ? student.status === "critical"
        : student.status === "upcoming" || student.status === "moderate";

    return matchesSearch && matchesBatch && matchesTab;
  });

  const totalOutstanding = filteredStudents.reduce((sum, s) => sum + s.pending, 0);

  const handleSendReminder = (student) => {
    const message = `Hello ${student.name}, this is a gentle fee reminder from MyAcademy. Your pending fee balance of ₹${student.pending.toLocaleString("en-IN")} for batch ${student.batch} was due on ${student.dueDate}. Kindly clear the outstanding at the earliest.`;
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${student.phone.replace(/[^0-9]/g, "")}?text=${encoded}`;
    window.open(whatsappUrl, "_blank");

    setReminderToast(`WhatsApp reminder dispatched to ${student.name}!`);
    setTimeout(() => setReminderToast(null), 4000);
  };

  return (
    <div className="w-full min-w-0">
      <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6 px-1 sm:px-6 lg:px-8 w-full min-w-0">
        <FeesNav />

        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between min-w-0">
            <div className="min-w-0 flex-1">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                Accounts Receivable
              </span>

              <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
                Pending Fees & Dues
              </h1>

              <p className="mt-2 text-xs sm:text-sm lg:text-base max-w-2xl text-orange-100 leading-relaxed font-normal">
                Monitor student overdue balances across batches, dispatch automated WhatsApp reminders, and settle collections.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 sm:p-5 backdrop-blur-md shrink-0 lg:w-72">
              <p className="text-xs text-orange-100 font-semibold uppercase tracking-wider">
                Filtered Outstanding
              </p>
              <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold">
                ₹{totalOutstanding.toLocaleString("en-IN")}
              </h2>
              <p className="mt-1 text-xs text-orange-100">
                {filteredStudents.length} student accounts shown
              </p>
            </div>
          </div>
        </motion.section>

        {/* Toast Notification */}
        {reminderToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-800"
          >
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-emerald-600 text-base" />
              <span>{reminderToast}</span>
            </div>
            <button
              onClick={() => setReminderToast(null)}
              className="text-emerald-700 hover:text-emerald-900"
            >
              ✕
            </button>
          </motion.div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">Total Unpaid Students</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
              {isLoading ? "..." : studentsList.length}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Across all batches</p>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-rose-600">Critical Overdue (&gt;10d)</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-rose-600">
              {studentsList.filter((s) => s.status === "critical").length}
            </h3>
            <p className="text-[11px] text-rose-500 mt-0.5">High priority collection</p>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-amber-600">Upcoming Due Dates</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-amber-600">
              {studentsList.filter((s) => s.status === "upcoming" || s.status === "moderate").length}
            </h3>
            <p className="text-[11px] text-amber-600 mt-0.5">Due in the next 15 days</p>
          </div>

          <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
            <p className="text-xs font-semibold text-slate-500">Average Pending</p>
            <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
              ₹
              {studentsList.length > 0
                ? Math.round(
                    studentsList.reduce((acc, s) => acc + s.pending, 0) /
                      studentsList.length
                  ).toLocaleString("en-IN")
                : 0}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">Per delinquent student</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
          <div className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2.5 bg-slate-50 focus-within:border-[#D6451B]">
            <FaSearch className="text-slate-400 text-xs" />
            <input
              type="text"
              placeholder="Search by student name, roll number, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2 bg-slate-50">
              <FaFilter className="text-slate-400 text-xs" />
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-700 outline-none"
              >
                {batchesList.map((b) => (
                  <option key={b} value={b}>
                    {b === "all" ? "All Cohorts" : b}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Filter Tabs */}
            <div className="flex rounded-xl bg-slate-100 p-1">
              <button
                onClick={() => setActiveTab("all")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  activeTab === "all"
                    ? "bg-white text-slate-900 shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveTab("critical")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  activeTab === "critical"
                    ? "bg-rose-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-rose-600"
                }`}
              >
                Critical
              </button>
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                  activeTab === "upcoming"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "text-slate-600 hover:text-amber-600"
                }`}
              >
                Upcoming
              </button>
            </div>
          </div>
        </div>

        {/* Pending Dues Students Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs w-full min-w-0">
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3.5 px-4 sm:px-6">Student</th>
                  <th className="py-3.5 px-4 hidden md:table-cell">Batch Cohort</th>
                  <th className="py-3.5 px-4">Pending Due</th>
                  <th className="py-3.5 px-4">Due Date</th>
                  <th className="py-3.5 px-4 hidden lg:table-cell">Overdue Age</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-500">
                      <FaSpinner className="animate-spin inline mr-2 text-[#D6451B]" />
                      Loading pending fee accounts...
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-slate-400">
                      No pending fee details found.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <tr
                      key={student._id}
                      className="hover:bg-orange-50/40 transition group"
                    >
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-orange-100 text-xs sm:text-sm font-bold text-[#D6451B] shrink-0">
                            {student.name.charAt(0)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate">
                              {student.name}
                            </p>
                            <p className="text-[11px] text-slate-500 truncate">
                              {student.phone}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 hidden md:table-cell">
                        <span className="font-semibold text-slate-700">
                          {student.batch}
                        </span>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-extrabold text-rose-600 text-sm sm:text-base">
                          ₹{student.pending.toLocaleString("en-IN")}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          of ₹{student.totalFee.toLocaleString("en-IN")}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <span className="font-semibold text-slate-800">
                          {student.dueDate}
                        </span>
                      </td>

                      <td className="py-4 px-4 hidden lg:table-cell">
                        {student.overdueDays > 0 ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-0.5 text-[11px] font-bold text-rose-700">
                            <FaClock className="text-[9px]" />
                            <span>{student.overdueDays} days late</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                            Upcoming
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleSendReminder(student)}
                            title="Send WhatsApp Reminder"
                            className="flex items-center gap-1 rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 py-1.5 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition shrink-0"
                          >
                            <FaWhatsapp className="text-emerald-600 text-sm" />
                            <span className="hidden sm:inline">WhatsApp</span>
                          </button>

                          <Link
                            href={`/admin-panel/fees/collect/${student.studentId || student._id}`}
                            className="flex items-center gap-1 rounded-lg bg-[#D6451B] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#b93814] shadow-xs transition shrink-0"
                          >
                            <FaCashRegister className="text-xs" />
                            <span>Collect</span>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
