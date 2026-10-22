"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUserCircle,
  FaHome,
  FaBookOpen,
  FaVideo,
  FaCog,
  FaSignOutAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaMoneyBillWave,
  FaCertificate,
  FaGraduationCap,
  FaPhoneAlt,
  FaCheckCircle,
  FaCrown,
  FaChartPie,
  FaUserFriends,
} from "react-icons/fa";
import useAuthStore from "@/store/authStore";
import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";
import { useLogoutMutation } from "../mutations/AuthenticationMutations";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const logoutMutation = useLogoutMutation();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const user = useAuthStore((state) => state.user);
  const pathname = usePathname();

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isSuperAdmin =
    user?.platformRole === "super_admin" || user?.role === "super_admin";
  const isParent = user?.role === "parent";

  // Determine portal path based on user role
  const portalPath = isSuperAdmin
    ? "super-admin"
    : isParent
    ? "parent-panel"
    : user?.role === "admin"
    ? "admin-panel"
    : user?.role === "teacher"
    ? "teacher-panel"
    : "student-profile";

  // Dynamic Navigation Links based on authentication
  const guestLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/#features" },
    { name: "Fees & Finance", path: "/#fees" },
    { name: "Attendance", path: "/#attendance" },
    { name: "Batches", path: "/#batches" },
    { name: "Portals", path: "/#portals" },
  ];

  const superAdminLinks = [
    { name: "Platform Overview", path: "/super-admin/dashboard", icon: FaChartPie },
    { name: "Academies", path: "/super-admin/academies", icon: FaUsers },
    { name: "SaaS Plans", path: "/super-admin/plans", icon: FaBookOpen },
    { name: "Subscriptions", path: "/super-admin/subscriptions", icon: FaMoneyBillWave },
    { name: "Audit Logs", path: "/super-admin/audit-logs", icon: FaCertificate },
  ];

  const parentLinks = [
    { name: "Dashboard", path: "/parent-panel/dashboard", icon: FaHome },
    { name: "Attendance", path: "/parent-panel/attendance", icon: FaCheckCircle },
    { name: "Fees", path: "/parent-panel/fees", icon: FaMoneyBillWave },
    { name: "Batches", path: "/parent-panel/batches", icon: FaUsers },
  ];

  const studentLinks = [
    { name: "Dashboard", path: "/student-profile/dashboard", icon: FaHome },
    { name: "My Batches", path: "/student-profile/batches", icon: FaUsers },
    { name: "Live Classes", path: "/student-profile/classes", icon: FaVideo },
    { name: "My Courses", path: "/student-profile/courses", icon: FaBookOpen },
    { name: "Certificates", path: "/student-profile/certificates", icon: FaCertificate },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admin-panel/dashboard", icon: FaHome },
    { name: "Students", path: "/admin-panel/student", icon: FaUsers },
    { name: "Teachers", path: "/admin-panel/teachers", icon: FaChalkboardTeacher },
    { name: "Courses", path: "/admin-panel/courses", icon: FaBookOpen },
    { name: "Fees", path: "/admin-panel/fees/dashboard", icon: FaMoneyBillWave },
  ];

  const teacherLinks = [
    { name: "Dashboard", path: "/teacher-panel/dashboard", icon: FaHome },
    { name: "My Batches", path: "/teacher-panel/batches", icon: FaUsers },
    { name: "Courses", path: "/teacher-panel/courses", icon: FaBookOpen },
    { name: "Attendance", path: "/teacher-panel/mark-attendence", icon: FaCheckCircle },
  ];

  const currentNavLinks = !user
    ? guestLinks
    : isSuperAdmin
    ? superAdminLinks
    : isParent
    ? parentLinks
    : user.role === "admin"
    ? adminLinks
    : user.role === "teacher"
    ? teacherLinks
    : studentLinks;

  // Profile dropdown menu items
  const profileItems = [
    {
      title: "Dashboard",
      icon: FaHome,
      href: `/${portalPath}/dashboard`,
    },
    {
      title: "My Profile",
      icon: FaUserCircle,
      href: `/${portalPath}/profile`,
    },
    {
      title: "Courses",
      icon: FaBookOpen,
      href: `/${portalPath}/courses`,
    },
    ...(portalPath === "student-profile"
      ? [
          {
            title: "My Batches",
            icon: FaUsers,
            href: `/${portalPath}/batches`,
          },
          {
            title: "Live Classes",
            icon: FaVideo,
            href: `/${portalPath}/classes`,
          },
        ]
      : []),
    ...(portalPath === "super-admin"
      ? [
          {
            title: "Academies",
            icon: FaUsers,
            href: "/super-admin/academies",
          },
          {
            title: "SaaS Plans",
            icon: FaBookOpen,
            href: "/super-admin/plans",
          },
          {
            title: "Subscriptions",
            icon: FaMoneyBillWave,
            href: "/super-admin/subscriptions",
          },
          {
            title: "Audit Logs",
            icon: FaCertificate,
            href: "/super-admin/audit-logs",
          },
        ]
      : []),
    ...(portalPath === "parent-panel"
      ? [
          {
            title: "Attendance",
            icon: FaCheckCircle,
            href: "/parent-panel/attendance",
          },
          {
            title: "Fee Status",
            icon: FaMoneyBillWave,
            href: "/parent-panel/fees",
          },
        ]
      : []),
    ...(portalPath === "admin-panel"
      ? [
          {
            title: "Students",
            icon: FaUsers,
            href: `/${portalPath}/student`,
          },
          {
            title: "Teachers",
            icon: FaChalkboardTeacher,
            href: `/${portalPath}/teachers`,
          },
          {
            title: "Fee Management",
            icon: FaMoneyBillWave,
            href: `/${portalPath}/fees/dashboard`,
          },
        ]
      : []),
    {
      title: "Settings",
      icon: FaCog,
      href: `/${portalPath}/settings`,
    },
  ];

  const handleLogout = () => {
    setProfileOpen(false);
    setOpen(false);
    logoutMutation.mutate();
  };

  // Hide global website navbar on dedicated portal pages
  if (
    pathname?.startsWith("/super-admin") ||
    pathname?.startsWith("/parent-panel") ||
    pathname?.startsWith("/admin-panel") ||
    pathname?.startsWith("/student-profile") ||
    pathname?.startsWith("/teacher-panel") ||
    pathname?.startsWith("/teacher-profile")
  ) {
    return null;
  }

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md shadow-xs transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-[#D6451B] shadow-md shadow-orange-200/60 transition group-hover:scale-105 p-1.5">
            <Image
              src="/icon1.png"
              alt="MyAcademy"
              width={32}
              height={32}
              className="h-8 w-8 object-contain"
            />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-[#D6451B] transition">
                MyAcademy
              </h2>
              <span className="hidden sm:inline-flex rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-extrabold text-[#D6451B] uppercase tracking-wider">
                SaaS
              </span>
            </div>
            <p className="text-[10px] font-medium tracking-[0.2em] text-[#D6451B] uppercase">
              Academy Management
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {currentNavLinks.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/" && pathname?.startsWith(item.path));
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-orange-50 text-[#D6451B] font-bold"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {item.icon && <item.icon className="text-sm opacity-80" />}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop User Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 transition hover:text-[#D6451B] hover:bg-orange-50"
              >
                Student Login
              </Link>

              <Link
                href="/signup"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition hover:opacity-95 hover:shadow-lg hover:shadow-orange-500/30"
              >
                <span>Register Academy</span>
              </Link>
            </div>
          ) : (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-3 rounded-full border border-slate-200 bg-white p-1.5 pr-4 transition hover:border-[#D6451B] hover:shadow-md"
              >
                {user.profileImage?.url ? (
                  <Image
                    src={user.profileImage.url}
                    alt={user.fullName || "User"}
                    width={36}
                    height={36}
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-orange-100"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-r from-[#D6451B] to-orange-500 text-sm font-bold text-white shadow-xs">
                    {user?.fullName?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                )}

                <div className="text-left">
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    {capitalizeFirstLetter(user?.fullName || "User")}
                  </p>
                  <p className="text-[10px] font-medium capitalize text-[#D6451B]">
                    {isSuperAdmin ? "Super Admin" : isParent ? "Parent" : user?.role} Portal
                  </p>
                </div>

                <FaChevronDown
                  className={`text-xs text-slate-400 transition-transform duration-200 ${
                    profileOpen ? "rotate-180 text-[#D6451B]" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl z-50"
                  >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#D6451B] via-orange-600 to-orange-500 p-4 text-white">
                      <div className="flex items-center gap-3">
                        {user.profileImage?.url ? (
                          <Image
                            src={user.profileImage.url}
                            alt=""
                            width={48}
                            height={48}
                            className="h-12 w-12 rounded-full border-2 border-white object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold backdrop-blur">
                            {user?.fullName?.charAt(0)?.toUpperCase()}
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <h3 className="truncate text-sm font-bold">
                            {user?.fullName}
                          </h3>
                          <p className="truncate text-xs text-orange-100">
                            {user?.email}
                          </p>
                          <span className="mt-1 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                            {isSuperAdmin ? "Super Admin" : isParent ? "Parent" : user?.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="p-2 space-y-1">
                      {profileItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#D6451B]"
                        >
                          <item.icon className="text-[#D6451B] text-sm" />
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-slate-100 p-2">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold text-rose-600 transition hover:bg-rose-50"
                      >
                        <FaSignOutAlt className="text-sm" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile Header Buttons */}
        <div className="flex items-center gap-2 lg:hidden">
          {user ? (
            <Link
              href={`/${portalPath}/dashboard`}
              className="flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-bold text-[#D6451B]"
            >
              <span>{isSuperAdmin ? "Super Admin" : isParent ? "Parent" : user?.role}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-[#D6451B] px-3.5 py-1.5 text-xs font-semibold text-white"
            >
              Login
            </Link>
          )}

          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:bg-slate-50 cursor-pointer active:scale-95"
            aria-label="Toggle Navigation Menu"
          >
            {open ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
          </button>
        </div>
      </div>
    </header>

    {/* Mobile Drawer Menu rendered OUTSIDE <header> to escape backdrop-filter containing block */}
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[9999] lg:hidden">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setOpen(false)}
          />

          {/* Slide-out Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm h-full bg-white shadow-2xl flex flex-col justify-between overflow-hidden z-10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top */}
            <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6451B] to-orange-500 shadow-xs p-1.5">
                  <Image
                    src="/icon1.png"
                    alt="MyAcademy"
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">MyAcademy</h3>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#D6451B]">
                    Academy Portal
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 cursor-pointer"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            {/* Scrollable middle container */}
            <div className="flex-1 overflow-y-auto">
              {/* Drawer User Card */}
              <div className="p-5 border-b border-slate-100 bg-slate-50/70">
                {user ? (
                  <div className="rounded-2xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 text-white shadow-md">
                    <div className="flex items-center gap-3">
                      {user.profileImage?.url ? (
                        <Image
                          src={user.profileImage.url}
                          alt=""
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-full border-2 border-white object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-bold">
                          {user?.fullName?.charAt(0)?.toUpperCase()}
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h4 className="truncate font-bold text-white">
                          {user?.fullName}
                        </h4>
                        <p className="truncate text-xs text-orange-100">
                          {user?.email}
                        </p>
                        <span className="mt-1.5 inline-block rounded-full bg-white/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide">
                          {isSuperAdmin ? "Super Admin" : isParent ? "Parent" : user?.role} Portal
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-slate-500 text-center mb-3">
                      Access your interactive batches, notes & study portal
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/login"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center rounded-xl border border-slate-300 bg-white py-3 text-center text-sm font-bold text-slate-800 transition hover:border-[#D6451B]"
                      >
                        Login
                      </Link>
                      <Link
                        href="/signup"
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-center rounded-xl bg-[#D6451B] py-3 text-center text-sm font-bold text-white shadow-xs transition hover:bg-orange-700"
                      >
                        Register Academy
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Links */}
              <div className="px-4 py-4 space-y-6">
                <div>
                  <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    {user ? `${user.role} Navigation` : "Explore Academy"}
                  </p>
                  <div className="space-y-1">
                    {currentNavLinks.map((item) => (
                      <Link
                        key={item.name}
                        href={item.path}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#D6451B]"
                      >
                        {item.icon && <item.icon className="text-[#D6451B] text-base" />}
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                {user && (
                  <div>
                    <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                      Account & Preferences
                    </p>
                    <div className="space-y-1">
                      {profileItems.map((item) => (
                        <Link
                          key={item.title}
                          href={item.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-orange-50 hover:text-[#D6451B]"
                        >
                          <item.icon className="text-slate-400 text-sm" />
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="border-t border-slate-200 p-4 bg-slate-50 shrink-0">
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-50 cursor-pointer"
                >
                  <FaSignOutAlt />
                  <span>Log Out</span>
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-xs text-slate-500">
                    Need help enrolling? Call +91 98787 61488
                  </p>
                </div>
              )}
              <p className="mt-3 text-center text-[10px] text-slate-400">
                &copy; 2026 MyAcademy. All rights reserved.
              </p>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  </>
);
}
