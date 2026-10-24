"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  GraduationCap,
  Sparkles,
  Shield,
  UserCheck,
  Users,
  HeartHandshake,
  ArrowRight,
  LogOut,
  Calendar,
  MessageSquare,
  Home,
  Layers,
  BookOpen,
  CreditCard,
  User,
  Phone,
} from "lucide-react";
import useAuthStore from "@/store/authStore";
import useDemoModalStore from "@/store/demoModalStore";
import { useLogoutMutation } from "../mutations/AuthenticationMutations";
import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";
import SITE_CONFIG from "../siteConfig";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logoutMutation = useLogoutMutation();
  const openDemoModal = useDemoModalStore((state) => state.openModal);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const loginDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  // Detect scroll for blur/glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section spy on home page
      if (pathname === "/") {
        const sections = [
          "contact",
          "fees",
          "teachers",
          "batches",
          "courses",
          "features",
          "home",
        ];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 160 && rect.bottom >= 160) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        loginDropdownRef.current &&
        !loginDropdownRef.current.contains(e.target)
      ) {
        setLoginDropdownOpen(false);
      }
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target)
      ) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Smooth scroll handler
  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
      }
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "features", label: "Features" },
    { id: "courses", label: "Courses" },
    { id: "batches", label: "Batches" },
    { id: "teachers", label: "Teachers" },
    { id: "fees", label: "Fees" },
    { id: "contact", label: "Contact" },
  ];

  const roleLogins = [
    {
      role: "admin",
      title: "Admin Console",
      sub: "Academy management, finance & settings",
      href: "/login?role=admin",
      icon: Shield,
      badgeColor: "bg-orange-50 text-[#D6451B] border-orange-200",
    },
    {
      role: "teacher",
      title: "Teacher Hub",
      sub: "Roll call, study notes & batches",
      href: "/login?role=teacher",
      icon: UserCheck,
      badgeColor: "bg-purple-50 text-purple-600 border-purple-200",
    },
    {
      role: "student",
      title: "Student Portal",
      sub: "Classes, attendance rate & fee receipts",
      href: "/login?role=student",
      icon: GraduationCap,
      badgeColor: "bg-blue-50 text-blue-600 border-blue-200",
    },
    {
      role: "parent",
      title: "Parent Portal",
      sub: "Child progress & fee payments",
      href: "/login?role=parent",
      icon: HeartHandshake,
      badgeColor: "bg-emerald-50 text-emerald-600 border-emerald-200",
    },
  ];

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

  const handleLogout = () => {
    setProfileDropdownOpen(false);
    logoutMutation.mutate();
  };

  // The public navbar must only be rendered on the home page
  if (pathname !== "/") {
    return null;
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs py-2.5 sm:py-3"
            : "bg-white/80 backdrop-blur-sm border-b border-slate-200/40 py-3 sm:py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              onClick={() => setActiveSection("home")}
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#D6451B] to-orange-500 text-white font-extrabold shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform duration-200">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight font-heading">
                    MyAcademy
                  </span>
                  <span className="hidden xs:inline-block rounded-md bg-orange-100/90 px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#D6451B]">
                    CRM
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium -mt-1 hidden sm:block">
                  Academy Management System
                </span>
              </div>
            </Link>

            {/* Desktop Center Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id && pathname === "/";
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`relative px-3 py-1.5 text-xs xl:text-sm font-bold transition-colors cursor-pointer rounded-lg ${
                      isActive
                        ? "text-[#D6451B]"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#D6451B] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Right CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              {/* If Authenticated: Show Portal Button & User Menu */}
              {user ? (
                <div className="flex items-center gap-3">
                  <Link
                    href={getPortalHref()}
                    className="flex items-center gap-1.5 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-800 transition shadow-xs"
                  >
                    <span>Open {capitalizeFirstLetter(user.role)} Portal</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  {/* Profile Dropdown */}
                  <div className="relative" ref={profileDropdownRef}>
                    <button
                      onClick={() =>
                        setProfileDropdownOpen(!profileDropdownOpen)
                      }
                      className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5 pr-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 font-extrabold text-xs text-[#D6451B]">
                        {user.fullName ? user.fullName[0].toUpperCase() : "U"}
                      </div>
                      <span className="max-w-[100px] truncate">
                        {capitalizeFirstLetter(user.fullName)}
                      </span>
                      <ChevronDown
                        className={`h-3 w-3 text-slate-400 transition-transform ${
                          profileDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {profileDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl z-50"
                        >
                          <div className="px-3 py-2 border-b border-slate-100 mb-1">
                            <p className="text-xs font-bold text-slate-800 truncate">
                              {user.fullName}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">
                              {user.email}
                            </p>
                            <span className="mt-1.5 inline-block rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-[#D6451B] border border-orange-200 uppercase">
                              {user.role}
                            </span>
                          </div>

                          <Link
                            href={getPortalHref()}
                            onClick={() => setProfileDropdownOpen(false)}
                            className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                          >
                            <Home className="h-3.5 w-3.5 text-slate-400" />
                            <span>Dashboard Home</span>
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition cursor-pointer text-left"
                          >
                            <LogOut className="h-3.5 w-3.5" />
                            <span>Sign Out</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                /* Guest View: Role Login Dropdown & Book a Demo Button */
                <>
                  <div className="relative" ref={loginDropdownRef}>
                    <button
                      onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                      className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer"
                    >
                      <User className="h-3.5 w-3.5 text-slate-500" />
                      <span>Login</span>
                      <ChevronDown
                        className={`h-3 w-3 text-slate-400 transition-transform ${
                          loginDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {loginDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.96 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.96 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-2xl z-50"
                        >
                          <div className="px-3 py-2 border-b border-slate-100 mb-1.5">
                            <p className="text-xs font-extrabold text-slate-900">
                              Choose Your Portal
                            </p>
                            <p className="text-[11px] text-slate-400">
                              Select your role to access your workspace
                            </p>
                          </div>

                          <div className="space-y-1">
                            {roleLogins.map((item) => {
                              const Icon = item.icon;
                              return (
                                <Link
                                  key={item.role}
                                  href={item.href}
                                  onClick={() => setLoginDropdownOpen(false)}
                                  className="flex items-start gap-2.5 rounded-xl p-2.5 hover:bg-slate-50 transition group"
                                >
                                  <div
                                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-sm ${item.badgeColor}`}
                                  >
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div className="min-w-0 flex-1">
                                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-[#D6451B] transition flex items-center justify-between">
                                      <span>{item.title}</span>
                                      <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </h4>
                                    <p className="text-[11px] text-slate-400 truncate">
                                      {item.sub}
                                    </p>
                                  </div>
                                </Link>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Primary Book a Demo Button */}
                  <button
                    onClick={() => openDemoModal()}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:from-[#ba3913] hover:to-orange-600 transition active:scale-95 cursor-pointer"
                  >
                    <Calendar className="h-3.5 w-3.5" />
                    <span>Book a Demo</span>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => openDemoModal()}
                className="flex items-center gap-1 rounded-lg bg-orange-50 px-2.5 py-1.5 text-xs font-bold text-[#D6451B] border border-orange-200"
              >
                <Calendar className="h-3 w-3" />
                <span>Demo</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-slate-900" />
                ) : (
                  <Menu className="h-5 w-5 text-slate-900" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 240 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-xs sm:max-w-sm bg-white p-5 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#D6451B] to-orange-500 text-white font-extrabold shadow-xs">
                      <GraduationCap className="h-4 w-4" />
                    </div>
                    <span className="font-extrabold text-slate-900 text-base">
                      MyAcademy
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="mt-4 space-y-1">
                  <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Navigation
                  </p>
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => handleNavClick(link.id)}
                      className={`flex items-center justify-between w-full rounded-xl px-3 py-2.5 text-xs sm:text-sm font-bold text-left transition ${
                        activeSection === link.id && pathname === "/"
                          ? "bg-orange-50 text-[#D6451B]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="h-3 w-3 text-slate-300" />
                    </button>
                  ))}
                </div>

                {/* Role Logins Section */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <p className="px-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Portal Access
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {roleLogins.map((item) => {
                      const Icon = item.icon;
                      return (
                        <Link
                          key={item.role}
                          href={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex flex-col items-center justify-center p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-orange-50/50 hover:border-orange-200 transition text-center"
                        >
                          <div
                            className={`flex h-7 w-7 items-center justify-center rounded-lg border text-xs mb-1.5 ${item.badgeColor}`}
                          >
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <span className="text-[11px] font-bold text-slate-800">
                            {item.title.split(" ")[0]}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Bottom Actions in Drawer */}
              <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openDemoModal();
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 py-3 px-4 text-xs font-bold text-white shadow-md shadow-orange-500/20"
                >
                  <Calendar className="h-3.5 w-3.5" />
                  <span>Book a Live Demo</span>
                </button>

                <a
                  href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hello%20MyAcademy,%20I%20want%20to%20learn%20more%20about%20your%20Academy%20Management%20Platform.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 py-2.5 px-4 text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition"
                >
                  <MessageSquare className="h-3.5 w-3.5" />
                  <span>WhatsApp Inquiry</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
