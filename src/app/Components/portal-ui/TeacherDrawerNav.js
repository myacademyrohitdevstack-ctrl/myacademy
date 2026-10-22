"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChartLine,
  FaBookOpen,
  FaUsers,
  FaCheckCircle,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaChalkboardTeacher,
  FaGlobe,
} from "react-icons/fa";
import useAuthStore from "@/store/authStore";
import { useLogoutMutation } from "@/app/mutations/AuthenticationMutations";

const teacherNavItems = [
  { name: "Dashboard", href: "/teacher-panel/dashboard", icon: FaChartLine },
  { name: "My Batches", href: "/teacher-panel/batches", icon: FaUsers },
  { name: "My Courses", href: "/teacher-panel/courses", icon: FaBookOpen },
  { name: "Mark Attendance", href: "/teacher-panel/mark-attendence", icon: FaCheckCircle },
  { name: "Announcements", href: "/teacher-panel/add-announcement", icon: FaChalkboardTeacher },
];

export default function TeacherDrawerNav({ children }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogoutMutation();

  const closeDrawer = () => setMobileOpen(false);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-800 flex flex-col lg:flex-row w-full max-w-full overflow-x-hidden">
      {/* Mobile Header Navigation (< 1024px) */}
      <header className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-slate-200/80 bg-white/95 px-3.5 py-2.5 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-orange-50 hover:border-orange-300 active:scale-95 transition-all"
            aria-label="Open Navigation Menu"
          >
            <FaBars className="text-base text-slate-800" />
          </button>
          <Link href="/teacher-panel/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#D6451B] to-orange-500 text-white font-bold shadow-xs">
              <FaChalkboardTeacher className="text-sm" />
            </div>
            <span className="font-extrabold text-slate-900 tracking-tight text-sm sm:text-base">Teacher Portal</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 text-[#D6451B] font-bold text-xs border border-orange-200 shadow-xs">
            {user?.fullName?.charAt(0) || "T"}
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] bg-white p-5 shadow-2xl flex flex-col justify-between h-full overflow-hidden"
            >
              <div className="flex flex-col min-h-0 overflow-hidden flex-1">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6451B] to-orange-500 text-white font-bold shadow-xs">
                      <FaChalkboardTeacher className="text-sm" />
                    </div>
                    <div>
                      <h2 className="font-extrabold text-sm text-slate-900">Teacher Hub</h2>
                      <p className="text-[11px] font-semibold text-[#D6451B]">MyAcademy</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Close menu"
                  >
                    <FaTimes className="text-base" />
                  </button>
                </div>

                <nav className="mt-4 space-y-1 overflow-y-auto flex-1 pr-1">
                  {teacherNavItems.map((item) => {
                    const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeDrawer}
                        className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                          isActive
                            ? "bg-gradient-to-r from-[#D6451B] to-orange-500 text-white shadow-md shadow-orange-200 font-extrabold"
                            : "text-slate-600 hover:bg-orange-50 hover:text-[#D6451B]"
                        }`}
                      >
                        <Icon className={`text-sm ${isActive ? "text-white" : "text-[#D6451B]"}`} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}

                  <div className="pt-2 my-2 border-t border-slate-100">
                    <Link
                      href="/"
                      onClick={closeDrawer}
                      className="flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all"
                    >
                      <FaGlobe className="text-xs text-slate-400" />
                      <span>Academy Website</span>
                    </Link>
                  </div>
                </nav>
              </div>

              <div className="pt-3 border-t border-slate-100 shrink-0 bg-white mt-auto">
                <div className="flex items-center gap-2.5 mb-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 font-bold text-xs text-[#D6451B] border border-orange-200">
                    {user?.fullName?.charAt(0) || "T"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-bold text-slate-900">{user?.fullName || "Trainer"}</p>
                    <p className="truncate text-[11px] text-slate-500">{user?.email}</p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold text-xs hover:bg-rose-100 transition-colors"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Fixed Sidebar (>= 1024px) */}
      <aside className="hidden lg:flex flex-col justify-between w-72 shrink-0 border-r border-slate-200/80 bg-white p-6 h-screen sticky top-0 overflow-hidden">
        <div className="flex flex-col min-h-0 overflow-hidden flex-1">
          <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100 shrink-0">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-[#D6451B] to-orange-500 text-white font-extrabold shadow-xs">
              <FaChalkboardTeacher className="text-lg" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-base tracking-tight">Trainer Portal</h1>
              <p className="text-[10px] tracking-[0.2em] font-bold text-[#D6451B] uppercase">
                MYACADEMY
              </p>
            </div>
          </div>

          <nav className="mt-6 space-y-1.5 overflow-y-auto flex-1 pr-1">
            {teacherNavItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/teacher-panel/dashboard" && pathname?.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-[#D6451B] to-orange-500 text-white shadow-md shadow-orange-200 font-extrabold"
                      : "text-slate-600 hover:bg-orange-50 hover:text-[#D6451B]"
                  }`}
                >
                  <Icon className={`text-base ${isActive ? "text-white" : "text-[#D6451B]"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            <div className="pt-2 my-2 border-t border-slate-100">
              <Link
                href="/"
                className="flex items-center gap-3.5 px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-all"
              >
                <FaGlobe className="text-sm text-slate-400" />
                <span>Academy Website</span>
              </Link>
            </div>
          </nav>
        </div>

        <div className="pt-4 border-t border-slate-100 space-y-3 shrink-0 bg-white mt-auto">
          <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-100 font-bold text-[#D6451B] text-base border border-orange-200">
              {user?.fullName?.charAt(0) || "T"}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-900">{user?.fullName || "Trainer"}</p>
              <p className="truncate text-xs text-slate-400 font-medium">Faculty</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 transition-all"
          >
            <FaSignOutAlt />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 w-full max-w-full p-3 sm:p-5 lg:p-8 overflow-x-hidden">{children}</main>
    </div>
  );
}
