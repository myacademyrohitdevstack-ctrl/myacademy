"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as XLSX from "xlsx";
import {
  FaTimes,
  FaFileExcel,
  FaUpload,
  FaDownload,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTrash,
  FaSpinner,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUsers,
  FaBookOpen,
  FaLayerGroup,
} from "react-icons/fa";
import { toast } from "sonner";
import { useAdminGetAllCourses } from "@/Hooks/useAdminGetCourses";
import { useAdminGetAllBatches } from "@/Hooks/useAdminGetBatches";
import {
  useAdminBulkCreateStudents,
  useAdminBulkCreateTeachers,
} from "@/app/mutations/AdminMutations";

export default function BulkImportModal({
  isOpen,
  onClose,
  type = "student", // "student" or "teacher"
  defaultCourseId = "",
  defaultBatchId = "",
  onSuccess,
}) {
  const fileInputRef = useRef(null);

  // Form & selection state
  const [selectedCourseId, setSelectedCourseId] = useState(defaultCourseId || "");
  const [selectedBatchId, setSelectedBatchId] = useState(defaultBatchId || "");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [parsedRows, setParsedRows] = useState([]);
  const [isParsing, setIsParsing] = useState(false);
  const [step, setStep] = useState("upload"); // "upload" | "preview" | "summary"
  const [importSummary, setImportSummary] = useState(null);

  // Data queries
  const { data: courses = [], isLoading: coursesLoading } = useAdminGetAllCourses();
  const selectedCourseSlug = courses.find((c) => c._id === selectedCourseId)?.slug;
  const { data: batches = [], isLoading: batchesLoading } = useAdminGetAllBatches(selectedCourseSlug);

  // Mutations
  const bulkCreateStudentsMutation = useAdminBulkCreateStudents();
  const bulkCreateTeachersMutation = useAdminBulkCreateTeachers();

  const isStudent = type === "student";
  const title = isStudent ? "Bulk Import Students" : "Bulk Import Teachers";
  const subtitle = isStudent
    ? "Upload an Excel or CSV file to enroll multiple students directly into a batch."
    : "Upload an Excel or CSV file to register multiple teachers/faculty profiles.";

  // Normalize column header keys
  const normalizeKey = (key) => {
    const k = String(key || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (k.includes("name") || k === "fullname" || k === "student" || k === "teacher") return "fullName";
    if (k.includes("email") || k.includes("mail")) return "email";
    if (k.includes("phone") || k.includes("mobile") || k.includes("contact") || k.includes("cell")) return "phone";
    if (k.includes("pass") || k.includes("pwd")) return "password";
    return key;
  };

  // 1. Download Sample Excel Template
  const handleDownloadTemplate = () => {
    let headers;
    let sampleData;

    if (isStudent) {
      headers = ["Full Name", "Email", "Phone", "Password (Optional)"];
      sampleData = [
        ["Aarav Sharma", "aarav.sharma@example.com", "9876543210", "Student@123"],
        ["Priya Patel", "priya.patel@example.com", "9812345678", "Student@456"],
        ["Rohan Gupta", "rohan.gupta@example.com", "9898989898", ""],
      ];
    } else {
      headers = ["Full Name", "Email", "Phone", "Password (Optional)"];
      sampleData = [
        ["Dr. Rajesh Kumar", "rajesh.kumar@example.com", "9876501234", "Teacher@123"],
        ["Sunita Verma", "sunita.verma@example.com", "9812309876", "Teacher@456"],
      ];
    }

    const ws = XLSX.utils.aoa_to_sheet([headers, ...sampleData]);
    // Set column widths
    ws["!cols"] = [{ wch: 22 }, { wch: 30 }, { wch: 16 }, { wch: 20 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, isStudent ? "Students_Sample" : "Teachers_Sample");
    XLSX.writeFile(wb, isStudent ? "Students_Import_Template.xlsx" : "Teachers_Import_Template.xlsx");
    toast.success("Sample template downloaded!");
  };

  // 2. Parse uploaded file
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    const fileExt = uploadedFile.name.split(".").pop().toLowerCase();
    if (!["xlsx", "xls", "csv"].includes(fileExt)) {
      toast.error("Please upload an Excel (.xlsx, .xls) or CSV (.csv) file.");
      return;
    }

    setIsParsing(true);
    setFileName(uploadedFile.name);
    setFile(uploadedFile);

    const reader = new FileReader();

    reader.onload = (evt) => {
      try {
        const buffer = evt.target?.result;
        const workbook = XLSX.read(buffer, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];
        const rawJson = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        if (!rawJson || rawJson.length === 0) {
          toast.error("The selected file is empty. Please check the sheet contents.");
          setIsParsing(false);
          return;
        }

        // Transform rows
        const normalized = rawJson.map((row, idx) => {
          const item = {
            id: `row-${idx + 1}`,
            rowNum: idx + 1,
            fullName: "",
            email: "",
            phone: "",
            password: "",
          };

          Object.keys(row).forEach((k) => {
            const mapped = normalizeKey(k);
            if (mapped === "fullName") item.fullName = String(row[k] || "").trim();
            if (mapped === "email") item.email = String(row[k] || "").trim().toLowerCase();
            if (mapped === "phone") item.phone = String(row[k] || "").trim();
            if (mapped === "password") item.password = String(row[k] || "").trim();
          });

          // Validation flags
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          item.isValidEmail = emailRegex.test(item.email);
          item.isValidName = item.fullName.length >= 2;
          item.isValid = item.isValidEmail && item.isValidName;

          return item;
        });

        setParsedRows(normalized);
        setStep("preview");
      } catch (err) {
        console.error("Excel parse error:", err);
        toast.error("Failed to parse file. Please verify it is a valid Excel or CSV document.");
      } finally {
        setIsParsing(false);
      }
    };

    reader.readAsArrayBuffer(uploadedFile);
  };

  // Delete row from preview
  const handleRemoveRow = (id) => {
    setParsedRows((prev) => prev.filter((r) => r.id !== id));
  };

  // Reset modal state
  const handleReset = () => {
    setFile(null);
    setFileName("");
    setParsedRows([]);
    setStep("upload");
    setImportSummary(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Confirm import
  const handleConfirmImport = async () => {
    const validRows = parsedRows.filter((r) => r.isValid);

    if (validRows.length === 0) {
      toast.error("No valid entries found to import. Please check your file data.");
      return;
    }

    if (isStudent) {
      if (!selectedCourseId) {
        toast.error("Please select a Course for these students.");
        return;
      }
      if (!selectedBatchId) {
        toast.error("Please select a Batch for enrolling these students.");
        return;
      }

      bulkCreateStudentsMutation.mutate(
        {
          courseId: selectedCourseId,
          batchId: selectedBatchId,
          students: validRows.map((r) => ({
            fullName: r.fullName,
            email: r.email,
            phone: r.phone,
            password: r.password || undefined,
          })),
        },
        {
          onSuccess: (res) => {
            setImportSummary(res.data || res);
            setStep("summary");
            if (onSuccess) onSuccess();
          },
        }
      );
    } else {
      bulkCreateTeachersMutation.mutate(
        {
          teachers: validRows.map((r) => ({
            fullName: r.fullName,
            email: r.email,
            phone: r.phone,
            password: r.password || undefined,
          })),
        },
        {
          onSuccess: (res) => {
            setImportSummary(res.data || res);
            setStep("summary");
            if (onSuccess) onSuccess();
          },
        }
      );
    }
  };

  if (!isOpen) return null;

  const validCount = parsedRows.filter((r) => r.isValid).length;
  const invalidCount = parsedRows.length - validCount;
  const isSubmitting =
    bulkCreateStudentsMutation.isPending || bulkCreateTeachersMutation.isPending;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden my-4 sm:my-6 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-gradient-to-r from-[#D6451B]/10 via-orange-500/10 to-amber-500/10 border-b border-slate-100 flex items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#D6451B] flex items-center justify-center text-white shadow-xs shrink-0">
                {isStudent ? (
                  <FaUserGraduate className="text-lg sm:text-xl" />
                ) : (
                  <FaChalkboardTeacher className="text-lg sm:text-xl" />
                )}
              </div>
              <div className="min-w-0">
                <h3 className="font-extrabold text-slate-900 text-sm sm:text-lg truncate">
                  {title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">
                  {subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                handleReset();
                onClose();
              }}
              disabled={isSubmitting}
              className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors shrink-0 disabled:opacity-50"
            >
              <FaTimes className="text-xs" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 text-xs">
            {/* STEP 1: UPLOAD */}
            {step === "upload" && (
              <div className="space-y-4">
                {/* Download Sample Box */}
                <div className="p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2">
                      <FaFileExcel className="text-emerald-600 text-base" /> Download Sample Spreadsheet
                    </h4>
                    <p className="text-[11px] text-slate-600">
                      Use our pre-formatted Excel template with columns for Full Name, Email, Phone, and Password.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleDownloadTemplate}
                    className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-white hover:bg-orange-100 border border-orange-200 text-[#D6451B] font-bold text-xs inline-flex items-center justify-center gap-2 transition-all shadow-2xs shrink-0 cursor-pointer"
                  >
                    <FaDownload className="text-xs" /> Download Template
                  </button>
                </div>

                {/* Dropzone */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-[#D6451B] bg-slate-50/50 hover:bg-orange-50/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10 text-center transition-all cursor-pointer group"
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    className="hidden"
                    onChange={handleFileUpload}
                  />

                  <div className="mx-auto h-12 w-12 sm:h-14 sm:w-14 rounded-2xl bg-orange-100 group-hover:bg-[#D6451B] text-[#D6451B] group-hover:text-white flex items-center justify-center transition-colors mb-3">
                    {isParsing ? (
                      <FaSpinner className="text-xl sm:text-2xl animate-spin" />
                    ) : (
                      <FaUpload className="text-xl sm:text-2xl" />
                    )}
                  </div>

                  <h4 className="font-extrabold text-slate-900 text-sm sm:text-base">
                    {isParsing ? "Reading and validating spreadsheet..." : "Click to select or drop your file here"}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                    Supports Microsoft Excel (.xlsx, .xls) and Comma-Separated Values (.csv)
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2: REVIEW & BATCH SELECTION */}
            {step === "preview" && (
              <div className="space-y-4">
                {/* File info and Batch selection for students */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 flex items-center gap-1.5 truncate">
                      <FaFileExcel className="text-emerald-600" /> {fileName}
                    </span>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-[#D6451B] hover:underline font-bold text-[11px] shrink-0"
                    >
                      Change File
                    </button>
                  </div>

                  {/* Course & Batch Selectors for Students */}
                  {isStudent && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200/80">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                          <FaBookOpen className="text-[#D6451B]" /> Select Course <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={selectedCourseId}
                          onChange={(e) => {
                            setSelectedCourseId(e.target.value);
                            setSelectedBatchId("");
                          }}
                          className="w-full h-9 rounded-xl border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D6451B]/30"
                        >
                          <option value="">-- Choose Course --</option>
                          {courses.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                          <FaLayerGroup className="text-[#D6451B]" /> Enroll Into Batch <span className="text-rose-500">*</span>
                        </label>
                        <select
                          value={selectedBatchId}
                          onChange={(e) => setSelectedBatchId(e.target.value)}
                          disabled={!selectedCourseId || batchesLoading}
                          className="w-full h-9 rounded-xl border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#D6451B]/30 disabled:opacity-50"
                        >
                          <option value="">
                            {!selectedCourseId
                              ? "-- Select course first --"
                              : batchesLoading
                              ? "Loading batches..."
                              : batches.length === 0
                              ? "No batches in this course"
                              : "-- Choose Batch --"}
                          </option>
                          {batches.map((b) => (
                            <option key={b._id} value={b._id}>
                              {b.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                {/* KPI Metrics */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-center">
                    <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase">Total Rows</p>
                    <p className="text-base sm:text-xl font-black text-slate-900 mt-0.5">{parsedRows.length}</p>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
                    <p className="text-[10px] sm:text-xs text-emerald-700 font-bold uppercase">Ready to Import</p>
                    <p className="text-base sm:text-xl font-black text-emerald-800 mt-0.5">{validCount}</p>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-rose-50 border border-rose-200 text-center">
                    <p className="text-[10px] sm:text-xs text-rose-700 font-bold uppercase">Incomplete</p>
                    <p className="text-base sm:text-xl font-black text-rose-800 mt-0.5">{invalidCount}</p>
                  </div>
                </div>

                {/* Warning if invalid rows exist */}
                {invalidCount > 0 && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-2">
                    <FaExclamationTriangle className="text-amber-600 text-sm mt-0.5 shrink-0" />
                    <p className="text-[11px] leading-relaxed">
                      <strong>{invalidCount} row(s)</strong> are missing mandatory name or valid email address. These will be automatically excluded, or you can delete them below.
                    </p>
                  </div>
                )}

                {/* Review Table / Cards */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-extrabold text-slate-800 text-xs sm:text-sm">
                      Review Records ({parsedRows.length})
                    </h4>
                    <span className="text-[11px] text-slate-400">Passwords auto-generate if left blank</span>
                  </div>

                  {/* Desktop Table */}
                  <div className="hidden md:block border border-slate-200 rounded-2xl overflow-hidden max-h-60 overflow-y-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-slate-100/80 sticky top-0 text-[11px] font-extrabold text-slate-600 border-b border-slate-200">
                        <tr>
                          <th className="py-2 px-3">#</th>
                          <th className="py-2 px-3">Full Name</th>
                          <th className="py-2 px-3">Email</th>
                          <th className="py-2 px-3">Phone</th>
                          <th className="py-2 px-3">Status</th>
                          <th className="py-2 px-3 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {parsedRows.map((row, i) => (
                          <tr key={row.id} className={row.isValid ? "hover:bg-slate-50" : "bg-rose-50/40"}>
                            <td className="py-2 px-3 text-slate-400 font-mono text-[11px]">{i + 1}</td>
                            <td className="py-2 px-3 font-bold text-slate-900">{row.fullName || "—"}</td>
                            <td className="py-2 px-3 font-medium text-slate-700">{row.email || "—"}</td>
                            <td className="py-2 px-3 text-slate-600">{row.phone || "—"}</td>
                            <td className="py-2 px-3">
                              {row.isValid ? (
                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                                  <FaCheckCircle className="text-[9px]" /> Valid
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold text-rose-700 border border-rose-200">
                                  <FaExclamationTriangle className="text-[9px]" /> Incomplete
                                </span>
                              )}
                            </td>
                            <td className="py-2 px-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleRemoveRow(row.id)}
                                className="h-7 w-7 rounded-lg text-rose-500 hover:bg-rose-100 inline-flex items-center justify-center transition-colors cursor-pointer"
                                title="Remove row"
                              >
                                <FaTrash className="text-[10px]" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Cards */}
                  <div className="block md:hidden space-y-2 max-h-60 overflow-y-auto pr-1">
                    {parsedRows.map((row, i) => (
                      <div
                        key={row.id}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-2.5 ${
                          row.isValid ? "bg-white border-slate-200" : "bg-rose-50/50 border-rose-200"
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-slate-400">#{i + 1}</span>
                            <h5 className="font-bold text-slate-900 text-xs truncate">
                              {row.fullName || "Unnamed"}
                            </h5>
                            {row.isValid ? (
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                            ) : (
                              <span className="h-1.5 w-1.5 rounded-full bg-rose-500 shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">{row.email || "Missing Email"}</p>
                          {row.phone && <p className="text-[10px] text-slate-400">{row.phone}</p>}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveRow(row.id)}
                          className="h-8 w-8 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 flex items-center justify-center shrink-0 transition-colors"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: RESULTS / SUMMARY */}
            {step === "summary" && importSummary && (
              <div className="space-y-4 text-center py-2">
                <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                  <FaCheckCircle />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900">Import Process Completed!</h3>
                  <p className="text-xs text-slate-500">
                    {isStudent
                      ? `Enrolled students into ${importSummary.batchName || "batch"}`
                      : "Registered faculty and teacher profiles successfully."}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-center">
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <p className="text-[10px] text-emerald-700 font-bold uppercase">Imported</p>
                    <p className="text-xl font-black text-emerald-800 mt-0.5">{importSummary.importedCount || 0}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
                    <p className="text-[10px] text-amber-700 font-bold uppercase">Duplicates Skipped</p>
                    <p className="text-xl font-black text-amber-800 mt-0.5">{importSummary.skippedCount || 0}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200">
                    <p className="text-[10px] text-rose-700 font-bold uppercase">Errors</p>
                    <p className="text-xl font-black text-rose-800 mt-0.5">{importSummary.errorCount || 0}</p>
                  </div>
                </div>

                {/* Show skipped details if any */}
                {importSummary.skipped?.length > 0 && (
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-left max-h-36 overflow-y-auto">
                    <p className="font-bold text-[11px] text-amber-900 mb-1">Skipped Entries (Already Registered):</p>
                    <ul className="text-[11px] text-amber-800 space-y-0.5 list-disc list-inside">
                      {importSummary.skipped.map((s, idx) => (
                        <li key={idx}>
                          {s.name} ({s.email}) — {s.reason}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer Actions */}
          <div className="px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 shrink-0">
            {step === "upload" && (
              <div className="flex justify-end w-full">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors text-center cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}

            {step === "preview" && (
              <>
                <button
                  type="button"
                  onClick={() => setStep("upload")}
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors text-center cursor-pointer disabled:opacity-50"
                >
                  Back to Upload
                </button>

                <button
                  type="button"
                  onClick={handleConfirmImport}
                  disabled={isSubmitting || validCount === 0 || (isStudent && (!selectedCourseId || !selectedBatchId))}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 hover:from-orange-600 hover:to-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-200 inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin text-xs" /> Enrolling & Importing...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="text-xs" /> Confirm & Import ({validCount} Records)
                    </>
                  )}
                </button>
              </>
            )}

            {step === "summary" && (
              <div className="flex justify-end w-full">
                <button
                  type="button"
                  onClick={() => {
                    handleReset();
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 hover:from-orange-600 hover:to-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-200 transition-all cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
