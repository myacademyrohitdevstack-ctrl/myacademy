"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserFriends,
  FaUserPlus,
  FaPlus,
  FaTimes,
  FaCheckCircle,
  FaTrashAlt,
  FaSpinner,
  FaSearch,
  FaLock,
  FaEnvelope,
  FaPhoneAlt,
  FaEye,
  FaEyeSlash,
  FaRandom,
  FaUser,
} from "react-icons/fa";
import { useParentLinks } from "@/Hooks/useParent";
import { useAdminStudent } from "@/Hooks/useAdminStudents";
import {
  useCreateParentMutation,
  useLinkParentMutation,
  useUnlinkParentMutation,
} from "@/app/mutations/parentMutations";
import { toast } from "sonner";

export default function ParentsManagementClient() {
  const { data: links = [], isLoading } = useParentLinks();
  const [searchTerm, setSearchTerm] = useState("");
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  // Fetch list of parents and students in the academy (all accounts, no 10-item pagination limit)
  const { data: parentsData, isLoading: isParentsLoading } = useAdminStudent(
    1,
    "",
    "all",
    "all",
    "parent",
    "all"
  );
  const { data: studentsData, isLoading: isStudentsLoading } = useAdminStudent(
    1,
    "",
    "all",
    "all",
    "student",
    "all"
  );

  const parentsList = parentsData?.data || parentsData?.users || [];
  const studentsList = studentsData?.data || studentsData?.users || [];

  const [studentSearch, setStudentSearch] = useState("");
  const [parentSearch, setParentSearch] = useState("");
  const [createStudentSearch, setCreateStudentSearch] = useState("");

  const filteredParents = parentsList.filter((p) => {
    if (!parentSearch.trim()) return true;
    const q = parentSearch.toLowerCase();
    return (
      p.fullName?.toLowerCase().includes(q) ||
      p.email?.toLowerCase().includes(q) ||
      p.phone?.includes(q)
    );
  });

  const filteredStudents = studentsList.filter((s) => {
    if (!studentSearch.trim()) return true;
    const q = studentSearch.toLowerCase();
    return (
      s.fullName?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.phone?.includes(q)
    );
  });

  const filteredCreateStudents = studentsList.filter((s) => {
    if (!createStudentSearch.trim()) return true;
    const q = createStudentSearch.toLowerCase();
    return (
      s.fullName?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.phone?.includes(q)
    );
  });

  // Link Modal Form
  const [form, setForm] = useState({
    parentId: "",
    studentUserId: "",
    relationship: "mother",
    isPrimary: true,
  });

  // Create Parent Modal Form
  const [createForm, setCreateForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    studentUserId: "",
    relationship: "mother",
    isPrimary: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  const linkMutation = useLinkParentMutation();
  const unlinkMutation = useUnlinkParentMutation();
  const createMutation = useCreateParentMutation();

  const openLinkModal = () => {
    setStudentSearch("");
    setParentSearch("");
    setForm({
      parentId: parentsList[0]?._id || "",
      studentUserId: studentsList[0]?._id || "",
      relationship: "mother",
      isPrimary: true,
    });
    setLinkModalOpen(true);
  };

  const openCreateModal = () => {
    setCreateStudentSearch("");
    setCreateForm({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      studentUserId: "",
      relationship: "mother",
      isPrimary: true,
    });
    setShowPassword(false);
    setCreateModalOpen(true);
  };

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%";
    let pwd = "";
    for (let i = 0; i < 10; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCreateForm((prev) => ({ ...prev, password: pwd }));
    setShowPassword(true);
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();

    if (!createForm.fullName.trim()) {
      toast.error("Please enter the parent's full name");
      return;
    }
    if (!createForm.email.trim()) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!createForm.password || createForm.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    try {
      await createMutation.mutateAsync({
        fullName: createForm.fullName.trim(),
        email: createForm.email.trim(),
        phone: createForm.phone.trim(),
        password: createForm.password,
        studentUserId: createForm.studentUserId || undefined,
        relationship: createForm.relationship,
        isPrimary: createForm.isPrimary,
      });
      setCreateModalOpen(false);
    } catch (err) {
      // Handled by onError in mutation
    }
  };

  const handleLinkSubmit = async (e) => {
    e.preventDefault();
    if (!form.parentId) {
      toast.error("Please select a parent user account");
      return;
    }
    if (!form.studentUserId) {
      toast.error("Please select a student user account");
      return;
    }

    try {
      await linkMutation.mutateAsync({
        parentId: form.parentId,
        studentUserId: form.studentUserId,
        relationship: form.relationship,
        isPrimary: form.isPrimary,
      });
      setLinkModalOpen(false);
    } catch (err) {
      // Handled by onError in mutation
    }
  };

  const handleUnlink = async (parentId, studentUserId, parentName, studentName) => {
    if (
      confirm(
        `Are you sure you want to revoke the link between ${parentName || "Parent"} and ${studentName || "Student"}?`
      )
    ) {
      try {
        await unlinkMutation.mutateAsync({ parentId, studentUserId });
      } catch (err) {
        // Handled by onError in mutation
      }
    }
  };

  const filteredLinks = links.filter((link) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    const parentName = link.parentId?.fullName?.toLowerCase() || "";
    const parentEmail = link.parentId?.email?.toLowerCase() || "";
    const studentName = link.studentUserId?.fullName?.toLowerCase() || "";
    const studentEmail = link.studentUserId?.email?.toLowerCase() || "";
    return (
      parentName.includes(term) ||
      parentEmail.includes(term) ||
      studentName.includes(term) ||
      studentEmail.includes(term)
    );
  });

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      {/* Hero Header */}
      <motion.section
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg w-full min-w-0"
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between min-w-0">
          <div className="min-w-0 flex-1">
            <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              Family & Guardian Linking
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              Parent-Student Linkages
            </h1>

            <p className="mt-1.5 text-xs sm:text-sm text-orange-100 max-w-2xl font-normal">
              Connect authorized parents and guardians to enrolled students, enabling mobile attendance registers, fee statements, and parent notifications.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={openCreateModal}
              className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#D6451B] shadow-xs hover:bg-orange-50 transition"
            >
              <FaUserPlus className="text-sm" />
              <span>Create Parent Account</span>
            </button>

            <button
              onClick={openLinkModal}
              className="flex items-center justify-center gap-2 rounded-xl bg-orange-600/70 border border-white/30 px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-orange-600 transition"
            >
              <FaPlus className="text-xs" />
              <span>Link Existing Parent</span>
            </button>
          </div>
        </div>
      </motion.section>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-3 w-full min-w-0">
        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Active Linkages</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900">
            {isLoading ? "..." : links.length}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Verified connections</p>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
          <p className="text-xs font-semibold text-slate-500">Primary Guardians</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-emerald-600">
            {isLoading ? "..." : links.filter((l) => l.isPrimary).length}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Designated point of contact</p>
        </div>

        <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs col-span-2 lg:col-span-1">
          <p className="text-xs font-semibold text-slate-500">Registered Parents</p>
          <h3 className="mt-2 text-xl sm:text-2xl font-extrabold text-[#D6451B]">
            {isParentsLoading ? "..." : parentsList.length}
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Parent user accounts in academy</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs flex items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search by parent or student name/email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-[#D6451B] focus:bg-white"
          />
        </div>

        <span className="text-xs font-bold text-slate-400">
          {filteredLinks.length} Links
        </span>
      </div>

      {/* Links Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-slate-500">
            <FaSpinner className="animate-spin inline mr-2 text-[#D6451B] text-lg" />
            <span>Loading parent-student linkages...</span>
          </div>
        ) : filteredLinks.length === 0 ? (
          <div className="p-12 text-center">
            <FaUserFriends className="text-slate-300 text-5xl mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No Parent Links Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              There are no active parent-student linkages in your academy matching this search.
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={openCreateModal}
                className="inline-flex items-center gap-2 rounded-xl bg-[#D6451B] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-orange-600 transition"
              >
                <FaUserPlus />
                <span>Create Parent Account</span>
              </button>
              <button
                onClick={openLinkModal}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-xs hover:bg-slate-50 transition"
              >
                <FaPlus />
                <span>Link Existing Parent</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredLinks.map((link) => {
              const pId = link.parentId?._id || link.parentId;
              const sId = link.studentUserId?._id || link.studentUserId;

              return (
                <div
                  key={link._id}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/70 transition"
                >
                  <div className="grid sm:grid-cols-2 gap-4 flex-1 min-w-0">
                    {/* Parent Details */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 font-extrabold text-[#D6451B] text-sm border border-orange-200">
                        <FaUserFriends />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                          Parent / Guardian
                        </span>
                        <h4 className="font-extrabold text-sm text-slate-900 truncate">
                          {link.parentId?.fullName || "Parent Account"}
                        </h4>
                        <p className="text-xs text-slate-500 truncate">
                          {link.parentId?.email || "No email"} {link.parentId?.phone && `• ${link.parentId.phone}`}
                        </p>
                      </div>
                    </div>

                    {/* Student Details */}
                    <div className="flex items-center gap-3 min-w-0 sm:border-l sm:border-slate-100 sm:pl-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 font-extrabold text-slate-600 text-sm border border-slate-200">
                        <FaUser />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                          Enrolled Student
                        </span>
                        <h4 className="font-extrabold text-sm text-slate-900 truncate">
                          {link.studentUserId?.fullName || "Student Account"}
                        </h4>
                        <p className="text-xs text-slate-500 truncate">
                          {link.studentUserId?.email || "No email"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Badges & Actions */}
                  <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
                    <span className="capitalize rounded-full bg-orange-50 border border-orange-200 px-2.5 py-0.5 text-[11px] font-bold text-[#D6451B]">
                      {link.relationship || "Guardian"}
                    </span>

                    {link.isPrimary && (
                      <span className="flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700">
                        <FaCheckCircle className="text-[10px]" />
                        <span>Primary</span>
                      </span>
                    )}

                    <button
                      onClick={() =>
                        handleUnlink(
                          pId,
                          sId,
                          link.parentId?.fullName,
                          link.studentUserId?.fullName
                        )
                      }
                      disabled={unlinkMutation.isPending}
                      className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
                      title="Revoke link"
                    >
                      <FaTrashAlt className="text-xs" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* CREATE PARENT ACCOUNT MODAL */}
      <AnimatePresence>
        {createModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg rounded-3xl bg-white p-5 sm:p-7 shadow-2xl my-8 overflow-hidden"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-[#D6451B] font-bold">
                    <FaUserPlus className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Create Parent Account
                    </h3>
                    <p className="text-[11px] text-[#D6451B] font-bold">Register new parent/guardian</p>
                  </div>
                </div>
                <button
                  onClick={() => setCreateModalOpen(false)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleCreateSubmit} className="mt-5 space-y-4 text-xs">
                {/* Full Name */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Parent / Guardian Full Name *
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Sharma"
                      value={createForm.fullName}
                      onChange={(e) =>
                        setCreateForm({ ...createForm, fullName: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      placeholder="parent@example.com"
                      value={createForm.email}
                      onChange={(e) =>
                        setCreateForm({ ...createForm, email: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Mobile / Phone Number */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number
                  </label>
                  <div className="relative">
                    <FaPhoneAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="+91 9876543210"
                      value={createForm.phone}
                      onChange={(e) =>
                        setCreateForm({ ...createForm, phone: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-slate-700 uppercase tracking-wider">
                      Temporary Password *
                    </label>
                    <button
                      type="button"
                      onClick={generateRandomPassword}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#D6451B] hover:underline"
                    >
                      <FaRandom className="text-[10px]" />
                      <span>Generate</span>
                    </button>
                  </div>
                  <div className="relative">
                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      placeholder="Minimum 8 characters"
                      value={createForm.password}
                      onChange={(e) =>
                        setCreateForm({ ...createForm, password: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-10 text-xs sm:text-sm font-semibold bg-slate-50 outline-none focus:border-[#D6451B] focus:bg-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* Optional Immediate Student Linking */}
                <div className="rounded-2xl border border-orange-100 bg-orange-50/50 p-3.5 space-y-3">
                  <p className="font-extrabold text-[#D6451B] text-[11px] uppercase tracking-wider">
                    Link to Enrolled Student (Optional)
                  </p>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                        Select Student
                      </label>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {studentsList.length} total
                      </span>
                    </div>
                    {isStudentsLoading ? (
                      <p className="text-slate-400 py-1 text-xs">Loading students...</p>
                    ) : (
                      <div className="space-y-1.5">
                        {studentsList.length > 5 && (
                          <div className="relative">
                            <FaSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 text-[10px]" />
                            <input
                              type="text"
                              placeholder="Quick filter students..."
                              value={createStudentSearch}
                              onChange={(e) => setCreateStudentSearch(e.target.value)}
                              className="w-full rounded-lg border border-slate-200 pl-7 pr-2.5 py-1 text-[11px] bg-white outline-none focus:border-[#D6451B]"
                            />
                          </div>
                        )}
                        <select
                          value={createForm.studentUserId}
                          onChange={(e) =>
                            setCreateForm({ ...createForm, studentUserId: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-bold bg-white outline-none focus:border-[#D6451B]"
                        >
                          <option value="">-- No student link right now --</option>
                          {filteredCreateStudents.map((s) => (
                            <option key={s._id} value={s._id}>
                              {s.fullName} ({s.email || "No email"}{s.phone ? ` • ${s.phone}` : ""})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {createForm.studentUserId && (
                    <div className="grid gap-3 sm:grid-cols-2 pt-1">
                      <div>
                        <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1 text-[10px]">
                          Relationship
                        </label>
                        <select
                          value={createForm.relationship}
                          onChange={(e) =>
                            setCreateForm({ ...createForm, relationship: e.target.value })
                          }
                          className="w-full rounded-xl border border-slate-200 p-2 text-xs font-semibold bg-white outline-none focus:border-[#D6451B]"
                        >
                          <option value="father">Father</option>
                          <option value="mother">Mother</option>
                          <option value="guardian">Legal Guardian</option>
                          <option value="other">Other Relative</option>
                        </select>
                      </div>

                      <div className="flex items-center pt-4">
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700 text-xs">
                          <input
                            type="checkbox"
                            checked={createForm.isPrimary}
                            onChange={(e) =>
                              setCreateForm({ ...createForm, isPrimary: e.target.checked })
                            }
                            className="rounded text-[#D6451B] focus:ring-[#D6451B]"
                          />
                          <span>Primary Guardian</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex gap-2.5">
                  <button
                    type="submit"
                    disabled={createMutation.isPending}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] py-3 text-xs sm:text-sm font-bold text-white hover:bg-orange-600 transition shadow-xs disabled:opacity-50"
                  >
                    {createMutation.isPending ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Creating Account...</span>
                      </>
                    ) : (
                      <>
                        <FaUserPlus />
                        <span>Create Parent Account</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    className="px-4 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50 text-xs sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* LINK EXISTING PARENT TO STUDENT MODAL */}
      <AnimatePresence>
        {linkModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-md rounded-3xl bg-white p-5 sm:p-7 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-[#D6451B] font-bold">
                    <FaUserFriends className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">
                      Link Parent to Student
                    </h3>
                    <p className="text-[11px] text-[#D6451B] font-bold">Academy Guardian Relationship</p>
                  </div>
                </div>
                <button
                  onClick={() => setLinkModalOpen(false)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleLinkSubmit} className="mt-5 space-y-4 text-xs">
                {/* Select Parent */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-slate-700 uppercase tracking-wider">
                      Select Parent User *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setLinkModalOpen(false);
                        openCreateModal();
                      }}
                      className="text-[11px] font-bold text-[#D6451B] hover:underline"
                    >
                      + Create New Parent
                    </button>
                  </div>

                  {isParentsLoading ? (
                    <p className="text-slate-400 py-2">Loading parent accounts...</p>
                  ) : parentsList.length === 0 ? (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-amber-800 text-xs space-y-2">
                      <p>No registered parent accounts found in this academy yet.</p>
                      <button
                        type="button"
                        onClick={() => {
                          setLinkModalOpen(false);
                          openCreateModal();
                        }}
                        className="inline-flex items-center gap-1.5 font-bold text-[#D6451B] underline"
                      >
                        <FaUserPlus className="text-xs" />
                        <span>Create a parent account now</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      {parentsList.length > 5 && (
                        <div className="relative">
                          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                          <input
                            type="text"
                            placeholder="Filter parents by name, email, or phone..."
                            value={parentSearch}
                            onChange={(e) => setParentSearch(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 pl-8 pr-3 py-1.5 text-xs bg-slate-50 outline-none focus:border-[#D6451B]"
                          />
                        </div>
                      )}
                      <select
                        required
                        value={form.parentId}
                        onChange={(e) => setForm({ ...form, parentId: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-bold bg-slate-50 outline-none focus:border-[#D6451B]"
                      >
                        <option value="" disabled>
                          -- Choose a parent account ({filteredParents.length}) --
                        </option>
                        {filteredParents.map((p) => (
                          <option key={p._id} value={p._id}>
                            {p.fullName} ({p.email || "No email"}{p.phone ? ` • ${p.phone}` : ""})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Select Student */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-xs">
                      Select Student User *
                    </label>
                    <span className="text-[11px] font-semibold text-slate-400">
                      {studentsList.length} {studentsList.length === 1 ? "student" : "students"} total
                    </span>
                  </div>
                  {isStudentsLoading ? (
                    <p className="text-slate-400 py-2">Loading students...</p>
                  ) : studentsList.length === 0 ? (
                    <p className="text-slate-400 py-2">No students found.</p>
                  ) : (
                    <div className="space-y-1.5">
                      {studentsList.length > 5 && (
                        <div className="relative">
                          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
                          <input
                            type="text"
                            placeholder="Filter students by name, email, or phone..."
                            value={studentSearch}
                            onChange={(e) => setStudentSearch(e.target.value)}
                            className="w-full rounded-xl border border-slate-200 pl-8 pr-3 py-1.5 text-xs bg-slate-50 outline-none focus:border-[#D6451B]"
                          />
                        </div>
                      )}
                      <select
                        required
                        value={form.studentUserId}
                        onChange={(e) =>
                          setForm({ ...form, studentUserId: e.target.value })
                        }
                        className="w-full rounded-xl border border-slate-200 p-2.5 text-xs sm:text-sm font-bold bg-slate-50 outline-none focus:border-[#D6451B]"
                      >
                        <option value="" disabled>
                          -- Choose a student account ({filteredStudents.length}) --
                        </option>
                        {filteredStudents.map((s) => (
                          <option key={s._id} value={s._id}>
                            {s.fullName} ({s.email || "No email"}{s.phone ? ` • ${s.phone}` : ""})
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Relationship & Primary Flag */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Relationship
                    </label>
                    <select
                      value={form.relationship}
                      onChange={(e) =>
                        setForm({ ...form, relationship: e.target.value })
                      }
                      className="w-full rounded-xl border border-slate-200 p-2.5 text-xs font-semibold bg-slate-50 outline-none focus:border-[#D6451B]"
                    >
                      <option value="father">Father</option>
                      <option value="mother">Mother</option>
                      <option value="guardian">Legal Guardian</option>
                      <option value="other">Other Relative</option>
                    </select>
                  </div>

                  <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                      <input
                        type="checkbox"
                        checked={form.isPrimary}
                        onChange={(e) =>
                          setForm({ ...form, isPrimary: e.target.checked })
                        }
                        className="rounded text-[#D6451B] focus:ring-[#D6451B]"
                      />
                      <span>Primary Contact Guardian</span>
                    </label>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex gap-2.5">
                  <button
                    type="submit"
                    disabled={linkMutation.isPending || parentsList.length === 0}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] py-3 text-xs sm:text-sm font-bold text-white hover:bg-orange-600 transition shadow-xs disabled:opacity-50"
                  >
                    {linkMutation.isPending ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        <span>Linking...</span>
                      </>
                    ) : (
                      <span>Create Link</span>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setLinkModalOpen(false)}
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
