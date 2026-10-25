"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUserShield,
  FaUserPlus,
  FaSearch,
  FaShieldAlt,
  FaCheck,
  FaTimes,
  FaEdit,
  FaTrash,
  FaBan,
  FaCheckCircle,
  FaLock,
  FaKey,
  FaMagic,
  FaArrowLeft,
  FaSpinner,
  FaExclamationTriangle,
  FaIdBadge,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  useStaffCatalogQuery,
  useStaffListQuery,
  useCreateStaffMutation,
  useUpdateStaffPermissionsMutation,
  useUpdateStaffProfileMutation,
  useUpdateStaffStatusMutation,
  useDeleteStaffMutation,
} from "@/app/mutations/staffMutations";
import { usePermissions } from "@/Hooks/usePermissions";
import PortalCard from "@/app/Components/portal-ui/PortalCard";
import PortalBadge from "@/app/Components/portal-ui/PortalBadge";
import PortalButton from "@/app/Components/portal-ui/PortalButton";

// Quick Presets Definition
const PRESETS = [
  {
    name: "Academic Staff",
    description: "Classes, batches, admissions, attendance, exams & homework",
    color: "from-blue-500 to-indigo-600",
    permissions: [
      "students.read",
      "students.create",
      "students.update",
      "batches.read",
      "batches.create",
      "batches.update",
      "courses.read",
      "courses.create",
      "courses.update",
      "attendance.read",
      "attendance.create",
      "attendance.update",
      "exams.read",
      "exams.manage",
      "homework.read",
      "homework.manage",
      "announcements.manage",
    ],
  },
  {
    name: "Accountant / Fee Officer",
    description: "Fee collection, receipts, installment plans & financial reports",
    color: "from-emerald-500 to-teal-600",
    permissions: [
      "fees.read",
      "fees.create",
      "fees.update",
      "students.read",
      "reports.read",
      "reminders.read",
      "reminders.send",
    ],
  },
  {
    name: "Operations Partner",
    description: "Broad academic and operational duties with read-only settings",
    color: "from-amber-500 to-orange-600",
    permissions: [
      "students.read",
      "students.create",
      "students.update",
      "teachers.read",
      "batches.read",
      "batches.create",
      "batches.update",
      "courses.read",
      "courses.create",
      "attendance.read",
      "attendance.create",
      "fees.read",
      "fees.create",
      "reports.read",
      "announcements.manage",
      "reminders.read",
      "reminders.send",
      "academy_settings.read",
    ],
  },
];

export default function StaffClient() {
  const { isOwner, isSuperAdmin } = usePermissions();

  const { data: catalogData, isLoading: catalogLoading } = useStaffCatalogQuery();
  const { data: staffList = [], isLoading: staffLoading } = useStaffListQuery(isOwner);

  // Search & Filter State
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [permissionsModalUser, setPermissionsModalUser] = useState(null);
  const [profileModalUser, setProfileModalUser] = useState(null);
  const [statusModalUser, setStatusModalUser] = useState(null);
  const [deleteModalUser, setDeleteModalUser] = useState(null);

  // Form states
  const [newStaffForm, setNewStaffForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    staffTitle: "",
    permissions: [],
  });

  const [editPermissionsList, setEditPermissionsList] = useState([]);
  const [editProfileForm, setEditProfileForm] = useState({
    fullName: "",
    phone: "",
    staffTitle: "",
  });
  const [blockReason, setBlockReason] = useState("");

  // Mutations
  const createMutation = useCreateStaffMutation(() => {
    setIsAddModalOpen(false);
    setNewStaffForm({
      fullName: "",
      email: "",
      phone: "",
      password: "",
      staffTitle: "",
      permissions: [],
    });
  });

  const updatePermissionsMutation = useUpdateStaffPermissionsMutation(() => {
    setPermissionsModalUser(null);
  });

  const updateProfileMutation = useUpdateStaffProfileMutation(() => {
    setProfileModalUser(null);
  });

  const updateStatusMutation = useUpdateStaffStatusMutation(() => {
    setStatusModalUser(null);
    setBlockReason("");
  });

  const deleteMutation = useDeleteStaffMutation(() => {
    setDeleteModalUser(null);
  });

  // Filtered staff list
  const filteredStaff = useMemo(() => {
    return staffList.filter((s) => {
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        s.fullName?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.staffTitle?.toLowerCase().includes(q) ||
        s.phone?.includes(q);

      const matchStatus =
        statusFilter === "all" || s.status === statusFilter;

      return matchSearch && matchStatus;
    });
  }, [staffList, search, statusFilter]);

  const categories = catalogData?.categories || [];
  const validPermissions = catalogData?.validPermissions || [];

  // Permission helpers
  const togglePermission = (list, setList, perm) => {
    if (list.includes(perm)) {
      setList(list.filter((p) => p !== perm));
    } else {
      setList([...list, perm]);
    }
  };

  const toggleCategory = (list, setList, cat) => {
    const catPerms = cat.permissions.map((p) => p.id);
    const allSelected = catPerms.every((p) => list.includes(p));
    if (allSelected) {
      setList(list.filter((p) => !catPerms.includes(p)));
    } else {
      const merged = Array.from(new Set([...list, ...catPerms]));
      setList(merged);
    }
  };

  const applyPreset = (setList, presetPermissions) => {
    setList([...presetPermissions]);
  };

  // If not owner/super admin, display access restricted screen
  if (!isOwner && !isSuperAdmin) {
    return (
      <div className="p-4 sm:p-8 max-w-4xl mx-auto">
        <PortalCard className="p-8 text-center bg-white border border-rose-200">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-500 mb-4 border border-rose-100">
            <FaLock className="text-2xl" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
            Academy Owner Authorization Required
          </h2>
          <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
            Staff management, role assignments, and delegated permission control are exclusively restricted to the verified Academy Owner.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/admin-panel/dashboard"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 text-white font-bold text-sm shadow-md shadow-orange-500/20 hover:opacity-95 transition-all"
            >
              <FaArrowLeft className="text-xs" />
              <span>Return to Dashboard</span>
            </Link>
          </div>
        </PortalCard>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-100 text-[#D6451B] font-bold text-sm border border-orange-200">
              <FaUserShield className="text-base" />
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Academy Staff & Permissions
            </h1>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-medium">
            Safely delegate specific administrative responsibilities to staff members without exposing ownership or Super Admin controls.
          </p>
        </div>

        <button
          onClick={() => {
            setNewStaffForm({
              fullName: "",
              email: "",
              phone: "",
              password: "",
              staffTitle: "",
              permissions: [],
            });
            setIsAddModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D6451B] to-orange-500 text-white font-extrabold text-sm shadow-lg shadow-orange-500/20 hover:opacity-95 active:scale-98 transition-all cursor-pointer"
        >
          <FaUserPlus className="text-base" />
          <span>Add Staff Member</span>
        </button>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <PortalCard className="p-5 border border-slate-200/80 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Staff</p>
              <p className="text-2xl font-black text-slate-900 mt-1">{staffList.length}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 font-bold">
              <FaIdBadge className="text-lg" />
            </div>
          </div>
          <p className="mt-3 text-[11px] font-semibold text-slate-500">Registered staff with custom scopes</p>
        </PortalCard>

        <PortalCard className="p-5 border border-emerald-100 bg-emerald-50/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Active Staff</p>
              <p className="text-2xl font-black text-emerald-700 mt-1">
                {staffList.filter((s) => s.status === "active").length}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 font-bold">
              <FaCheckCircle className="text-lg" />
            </div>
          </div>
          <p className="mt-3 text-[11px] font-semibold text-emerald-600">Currently permitted to log in</p>
        </PortalCard>

        <PortalCard className="p-5 border border-rose-100 bg-rose-50/40">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-rose-600 uppercase tracking-wider">Suspended Staff</p>
              <p className="text-2xl font-black text-rose-700 mt-1">
                {staffList.filter((s) => s.status === "blocked").length}
              </p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 font-bold">
              <FaBan className="text-lg" />
            </div>
          </div>
          <p className="mt-3 text-[11px] font-semibold text-rose-600">Access immediately revoked</p>
        </PortalCard>
      </div>

      {/* Directory Search & Filter Controls */}
      <PortalCard className="p-4 border border-slate-200/80 bg-white">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search staff by name, email, phone, or title..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-9 pr-4 text-xs sm:text-sm text-slate-900 outline-none transition focus:border-[#D6451B] focus:bg-white focus:ring-2 focus:ring-orange-100"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-auto rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3 text-xs sm:text-sm font-semibold text-slate-700 outline-none transition focus:border-[#D6451B] focus:bg-white"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active Only</option>
              <option value="blocked">Suspended Only</option>
            </select>
          </div>
        </div>
      </PortalCard>

      {/* Staff Members List */}
      {staffLoading ? (
        <PortalCard className="p-12 text-center bg-white border border-slate-200/80">
          <FaSpinner className="animate-spin text-2xl text-[#D6451B] mx-auto mb-3" />
          <p className="text-sm font-bold text-slate-600">Loading academy staff directory...</p>
        </PortalCard>
      ) : filteredStaff.length === 0 ? (
        <PortalCard className="p-12 text-center bg-white border border-dashed border-slate-300">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B] mb-3">
            <FaUserShield className="text-2xl" />
          </div>
          <h3 className="text-base font-extrabold text-slate-800">
            {search || statusFilter !== "all" ? "No matching staff members found" : "No academy staff members yet"}
          </h3>
          <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
            {search || statusFilter !== "all"
              ? "Try adjusting your search query or filter settings."
              : "Delegate administrative tasks by adding trusted staff or partners with specific permissions."}
          </p>
          {!search && statusFilter === "all" && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 text-white font-bold text-xs shadow-md shadow-orange-500/20 hover:opacity-95"
            >
              <FaUserPlus />
              <span>Add First Staff Member</span>
            </button>
          )}
        </PortalCard>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStaff.map((staff) => {
            const isBlocked = staff.status === "blocked";
            const permsCount = staff.permissions?.length || 0;

            return (
              <PortalCard
                key={staff._id}
                className={`p-5 bg-white border transition-all duration-200 flex flex-col justify-between ${
                  isBlocked ? "border-rose-200 bg-rose-50/20" : "border-slate-200/80 hover:border-orange-200 hover:shadow-md"
                }`}
              >
                <div>
                  {/* Card Header: Avatar + Status */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100 text-[#D6451B] font-black text-base border border-orange-200 shadow-xs">
                        {staff.fullName?.charAt(0) || "S"}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-extrabold text-slate-900 text-sm truncate">
                          {staff.fullName}
                        </h4>
                        <p className="text-xs font-bold text-[#D6451B] truncate">
                          {staff.staffTitle || "Academy Staff"}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold ${
                        isBlocked
                          ? "bg-rose-100 text-rose-700 border border-rose-200"
                          : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {isBlocked ? <FaBan className="text-[10px]" /> : <FaCheck className="text-[10px]" />}
                      <span>{isBlocked ? "Suspended" : "Active"}</span>
                    </span>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-4 space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                    <div className="flex items-center gap-2 truncate">
                      <FaEnvelope className="text-slate-400 shrink-0 text-[11px]" />
                      <span className="truncate">{staff.email}</span>
                    </div>
                    {staff.phone && (
                      <div className="flex items-center gap-2 truncate">
                        <FaPhoneAlt className="text-slate-400 shrink-0 text-[11px]" />
                        <span>{staff.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <FaCalendarAlt className="shrink-0" />
                      <span>Added {new Date(staff.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Permissions Summary Badge */}
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="font-bold text-slate-700 flex items-center gap-1.5">
                        <FaShieldAlt className="text-[#D6451B] text-[11px]" />
                        <span>Permissions</span>
                      </span>
                      <span className="font-black text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {permsCount} of {validPermissions.length}
                      </span>
                    </div>

                    {/* Permissions preview pills */}
                    <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                      {permsCount === 0 ? (
                        <span className="text-[11px] font-semibold text-slate-400 italic">
                          No permissions assigned
                        </span>
                      ) : (
                        staff.permissions.slice(0, 4).map((p) => (
                          <span
                            key={p}
                            className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-bold"
                          >
                            {p}
                          </span>
                        ))
                      )}
                      {permsCount > 4 && (
                        <span className="inline-block px-1.5 py-0.5 rounded-md bg-orange-100 text-[#D6451B] text-[10px] font-extrabold">
                          +{permsCount - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setPermissionsModalUser(staff);
                        setEditPermissionsList([...(staff.permissions || [])]);
                      }}
                      className="px-2.5 py-1.5 rounded-xl bg-orange-50 text-[#D6451B] hover:bg-orange-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
                      title="Configure Permissions"
                    >
                      <FaKey className="text-[11px]" />
                      <span>Permissions</span>
                    </button>

                    <button
                      onClick={() => {
                        setProfileModalUser(staff);
                        setEditProfileForm({
                          fullName: staff.fullName || "",
                          phone: staff.phone || "",
                          staffTitle: staff.staffTitle || "",
                        });
                      }}
                      className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                      title="Edit Profile"
                    >
                      <FaEdit className="text-xs" />
                    </button>

                    <button
                      onClick={() => {
                        setStatusModalUser(staff);
                      }}
                      className={`p-2 rounded-xl transition-colors ${
                        isBlocked
                          ? "text-emerald-600 hover:bg-emerald-50"
                          : "text-amber-600 hover:bg-amber-50"
                      }`}
                      title={isBlocked ? "Activate Staff" : "Suspend Staff"}
                    >
                      <FaBan className="text-xs" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      setDeleteModalUser(staff);
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                    title="Remove Staff"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </PortalCard>
            );
          })}
        </div>
      )}

      {/* ================= MODAL: ADD STAFF MEMBER ================= */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-[#D6451B]">
                    <FaUserPlus className="text-base" />
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">Add Academy Staff</h3>
                    <p className="text-xs text-slate-500">Create staff credentials and assign delegated permissions</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Basic Details Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newStaffForm.fullName}
                    onChange={(e) =>
                      setNewStaffForm({ ...newStaffForm, fullName: e.target.value })
                    }
                    placeholder="e.g., Sarah Johnson"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#D6451B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newStaffForm.email}
                    onChange={(e) =>
                      setNewStaffForm({ ...newStaffForm, email: e.target.value })
                    }
                    placeholder="sarah@academy.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#D6451B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Staff Designation / Title
                  </label>
                  <input
                    type="text"
                    value={newStaffForm.staffTitle}
                    onChange={(e) =>
                      setNewStaffForm({ ...newStaffForm, staffTitle: e.target.value })
                    }
                    placeholder="e.g., Academic Coordinator, Accountant"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#D6451B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={newStaffForm.phone}
                    onChange={(e) =>
                      setNewStaffForm({ ...newStaffForm, phone: e.target.value })
                    }
                    placeholder="e.g., +91 98765 43210"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#D6451B] focus:bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Temporary Password * (Min 8 Characters)
                  </label>
                  <input
                    type="password"
                    required
                    value={newStaffForm.password}
                    onChange={(e) =>
                      setNewStaffForm({ ...newStaffForm, password: e.target.value })
                    }
                    placeholder="••••••••••••"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#D6451B] focus:bg-white"
                  />
                </div>
              </div>

              {/* Quick Presets */}
              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                    <FaMagic className="text-amber-500" />
                    <span>Quick Permission Presets</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setNewStaffForm({ ...newStaffForm, permissions: [] })}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-800 underline"
                  >
                    Clear All
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() =>
                        applyPreset((p) => setNewStaffForm({ ...newStaffForm, permissions: p }), preset.permissions)
                      }
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-orange-300 bg-slate-50 hover:bg-orange-50/50 text-left transition-all group cursor-pointer"
                    >
                      <p className="text-xs font-extrabold text-slate-800 group-hover:text-[#D6451B]">
                        {preset.name}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{preset.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Permission Checkboxes by Category */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                    Granular Permission Scopes
                  </h4>
                  <span className="text-xs font-extrabold text-[#D6451B]">
                    {newStaffForm.permissions.length} selected
                  </span>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {categories.map((cat) => {
                    const catPerms = cat.permissions.map((p) => p.id);
                    const allCatSelected = catPerms.every((p) =>
                      newStaffForm.permissions.includes(p)
                    );

                    return (
                      <div key={cat.category} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/50">
                          <div>
                            <p className="text-xs font-extrabold text-slate-900">{cat.category}</p>
                            <p className="text-[10px] text-slate-500">{cat.description}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              toggleCategory(
                                newStaffForm.permissions,
                                (p) => setNewStaffForm({ ...newStaffForm, permissions: p }),
                                cat
                              )
                            }
                            className="text-[11px] font-bold text-[#D6451B] hover:underline"
                          >
                            {allCatSelected ? "Deselect Category" : "Select Category"}
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {cat.permissions.map((perm) => {
                            const isChecked = newStaffForm.permissions.includes(perm.id);
                            return (
                              <label
                                key={perm.id}
                                className={`flex items-start gap-2.5 p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                                  isChecked
                                    ? "bg-orange-50 border border-orange-200"
                                    : "bg-white border border-slate-200/60 hover:bg-slate-100"
                                }`}
                              >
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() =>
                                    togglePermission(
                                      newStaffForm.permissions,
                                      (p) => setNewStaffForm({ ...newStaffForm, permissions: p }),
                                      perm.id
                                    )
                                  }
                                  className="mt-0.5 rounded text-[#D6451B] focus:ring-[#D6451B]"
                                />
                                <div>
                                  <p className="font-bold text-slate-800 text-[11px]">{perm.label}</p>
                                  <p className="text-[10px] text-slate-500 leading-tight">{perm.desc}</p>
                                </div>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={
                    !newStaffForm.fullName ||
                    !newStaffForm.email ||
                    newStaffForm.password.length < 8 ||
                    createMutation.isPending
                  }
                  onClick={() => createMutation.mutate(newStaffForm)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-500/20 hover:opacity-95 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {createMutation.isPending && <FaSpinner className="animate-spin text-xs" />}
                  <span>Create Staff Account</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL: EDIT PERMISSIONS ================= */}
      <AnimatePresence>
        {permissionsModalUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 space-y-5"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-[#D6451B]">
                    <FaKey className="text-base" />
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-slate-900">
                      Configure Permissions: {permissionsModalUser.fullName}
                    </h3>
                    <p className="text-xs text-slate-500">{permissionsModalUser.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setPermissionsModalUser(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Presets */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                    <FaMagic className="text-amber-500" />
                    <span>Apply Preset Scopes</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setEditPermissionsList([])}
                    className="text-[11px] font-bold text-slate-500 hover:text-slate-800 underline"
                  >
                    Clear All
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setEditPermissionsList([...preset.permissions])}
                      className="p-2.5 rounded-xl border border-slate-200 hover:border-orange-300 bg-slate-50 hover:bg-orange-50/50 text-left transition-all group cursor-pointer"
                    >
                      <p className="text-xs font-extrabold text-slate-800 group-hover:text-[#D6451B]">
                        {preset.name}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{preset.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Grouped Categories */}
              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {categories.map((cat) => {
                  const catPerms = cat.permissions.map((p) => p.id);
                  const allCatSelected = catPerms.every((p) =>
                    editPermissionsList.includes(p)
                  );

                  return (
                    <div key={cat.category} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/70">
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/50">
                        <div>
                          <p className="text-xs font-extrabold text-slate-900">{cat.category}</p>
                          <p className="text-[10px] text-slate-500">{cat.description}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleCategory(editPermissionsList, setEditPermissionsList, cat)}
                          className="text-[11px] font-bold text-[#D6451B] hover:underline"
                        >
                          {allCatSelected ? "Deselect Category" : "Select Category"}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {cat.permissions.map((perm) => {
                          const isChecked = editPermissionsList.includes(perm.id);
                          return (
                            <label
                              key={perm.id}
                              className={`flex items-start gap-2.5 p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                                isChecked
                                  ? "bg-orange-50 border border-orange-200"
                                  : "bg-white border border-slate-200/60 hover:bg-slate-100"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() =>
                                  togglePermission(editPermissionsList, setEditPermissionsList, perm.id)
                                }
                                className="mt-0.5 rounded text-[#D6451B] focus:ring-[#D6451B]"
                              />
                              <div>
                                <p className="font-bold text-slate-800 text-[11px]">{perm.label}</p>
                                <p className="text-[10px] text-slate-500 leading-tight">{perm.desc}</p>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-600">
                  {editPermissionsList.length} of {validPermissions.length} permissions assigned
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setPermissionsModalUser(null)}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={updatePermissionsMutation.isPending}
                    onClick={() =>
                      updatePermissionsMutation.mutate({
                        id: permissionsModalUser._id,
                        permissions: editPermissionsList,
                      })
                    }
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-500/20 hover:opacity-95 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                  >
                    {updatePermissionsMutation.isPending && (
                      <FaSpinner className="animate-spin text-xs" />
                    )}
                    <span>Save Permissions</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL: EDIT PROFILE ================= */}
      <AnimatePresence>
        {profileModalUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="text-base font-black text-slate-900">Edit Staff Profile</h3>
                <button
                  onClick={() => setProfileModalUser(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={editProfileForm.fullName}
                    onChange={(e) =>
                      setEditProfileForm({ ...editProfileForm, fullName: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#D6451B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Staff Designation / Title
                  </label>
                  <input
                    type="text"
                    value={editProfileForm.staffTitle}
                    onChange={(e) =>
                      setEditProfileForm({ ...editProfileForm, staffTitle: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#D6451B] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editProfileForm.phone}
                    onChange={(e) =>
                      setEditProfileForm({ ...editProfileForm, phone: e.target.value })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs sm:text-sm text-slate-900 outline-none focus:border-[#D6451B] focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProfileModalUser(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={updateProfileMutation.isPending}
                  onClick={() =>
                    updateProfileMutation.mutate({
                      id: profileModalUser._id,
                      data: editProfileForm,
                    })
                  }
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-500/20 hover:opacity-95"
                >
                  {updateProfileMutation.isPending ? "Saving..." : "Save Profile"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL: SUSPEND / ACTIVATE ================= */}
      <AnimatePresence>
        {statusModalUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    statusModalUser.status === "active"
                      ? "bg-rose-100 text-rose-600"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  <FaBan className="text-lg" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">
                    {statusModalUser.status === "active"
                      ? `Suspend ${statusModalUser.fullName}?`
                      : `Activate ${statusModalUser.fullName}?`}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {statusModalUser.status === "active"
                      ? "This will immediately revoke their ability to access the academy portal."
                      : "This will restore their ability to sign in with their granted permissions."}
                  </p>
                </div>
              </div>

              {statusModalUser.status === "active" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Reason for Suspension (Optional)
                  </label>
                  <input
                    type="text"
                    value={blockReason}
                    onChange={(e) => setBlockReason(e.target.value)}
                    placeholder="e.g., Seasonal leave, reassignment"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 px-3.5 text-xs text-slate-900 outline-none focus:border-[#D6451B] focus:bg-white"
                  />
                </div>
              )}

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setStatusModalUser(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={updateStatusMutation.isPending}
                  onClick={() =>
                    updateStatusMutation.mutate({
                      id: statusModalUser._id,
                      status: statusModalUser.status === "active" ? "blocked" : "active",
                      blockReason,
                    })
                  }
                  className={`px-5 py-2.5 rounded-xl text-white font-extrabold text-xs shadow-md transition-all ${
                    statusModalUser.status === "active"
                      ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/20"
                      : "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20"
                  }`}
                >
                  {updateStatusMutation.isPending
                    ? "Updating..."
                    : statusModalUser.status === "active"
                    ? "Confirm Suspension"
                    : "Confirm Activation"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================= MODAL: DELETE STAFF ================= */}
      <AnimatePresence>
        {deleteModalUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 sm:p-7 max-w-md w-full shadow-2xl border border-slate-100 space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                  <FaExclamationTriangle className="text-lg" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900">Remove Staff Member</h3>
                  <p className="text-xs text-slate-500">
                    Are you sure you want to remove <strong>{deleteModalUser.fullName}</strong>?
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 bg-rose-50 p-3 rounded-2xl border border-rose-100">
                This account will be soft-deleted and removed from the active staff directory. Their access will be permanently terminated.
              </p>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDeleteModalUser(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={deleteMutation.isPending}
                  onClick={() => deleteMutation.mutate(deleteModalUser._id)}
                  className="px-5 py-2.5 rounded-xl bg-rose-600 text-white font-extrabold text-xs shadow-md shadow-rose-600/20 hover:bg-rose-700"
                >
                  {deleteMutation.isPending ? "Removing..." : "Yes, Remove Account"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
