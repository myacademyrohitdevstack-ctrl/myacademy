"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
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
  FaInfoCircle,
  FaPhoneAlt,
} from "react-icons/fa";
import useAuthStore from "@/store/authStore";
import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";
import {  useLogoutMutation } from "../mutations/AuthenticationMutations";

export default function Navbar() {
  const logoutMutation=useLogoutMutation()

  const [open, setOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef(null);
 const user=useAuthStore((state)=>state.user)

const links = [
  { name: "Home", path: "/", icon: FaHome },
  { name: "Courses", path: "/courses", icon: FaBookOpen },
  { name: "About", path: "/about", icon: FaInfoCircle },
  { name: "Contact", path: "/contact", icon: FaPhoneAlt },
];
useEffect(() => {

  const handler = (e) => {

    if (
      profileRef.current &&
      !profileRef.current.contains(e.target)
    ) {
      setProfileOpen(false);
    }

  };

  document.addEventListener(
    "mousedown",
    handler
  );

  return () =>
    document.removeEventListener(
      "mousedown",
      handler
    );

}, []);
const dashboardPath =
  user?.role === "admin"
    ? "/admin/dashboard"
    : user?.role === "teacher"
    ? "/teacher/dashboard"
    : "/student/dashboard";

const profileItems = [
  {
    title: "Dashboard",
    icon: FaHome,
    href: dashboardPath,
  },
  {
    title: "My Profile",
    icon: FaUserCircle,
    href: "/student-profile/profile",
  },
  {
    title: "My Courses",
    icon: FaBookOpen,
    href: "/student-profile/courses",
  },
  {
    title: "Live Classes",
    icon: FaVideo,
    href: "/student-profile/classes",
  },
  {
    title: "Batches",
    icon: FaVideo,
    href: "/student-profile/batches",
  },
  {
    title: "Announcements",
    icon: FaVideo,
    href: "/student-profile/announcements",
  },
  {
    title: "Certificates",
    icon: FaVideo,
    href: "/student-profile/certificates",
  },
  {
    title: "Settings",
    icon: FaCog,
    href: "/student-profile/settings",
  },
];
const ProfileItem = ({
  href,
  icon: Icon,
  title,
}) => (
  <Link
    href={href}
    className="flex items-center gap-4 rounded-xl px-4 py-3 transition hover:bg-orange-50"
  >
    <Icon className="text-[#D6451B]" />

    <span className="text-sm font-medium">
      {title}
    </span>
  </Link>
);

const handleLogout=()=>{
logoutMutation.mutate()
}
  return (
<header
  className={`fixed top-0 left-0 z-50 w-full border-b border-slate-200/60 transition-all ${
    open
      ? "bg-white"
      : "bg-white/90 backdrop-blur-md"
  }`}
>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/icon1.png"
            alt="Inquisitive Mind Academy"
            className="h-11 w-11 object-contain"
          />

          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Inquisitive Mind
            </h2>

            <p className="text-[10px] tracking-[0.35em] text-[#D6451B]">
              ACADEMY
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map((item) => {
  const Icon = item.icon;

  return (
    <Link
      key={item.name}
      href={item.path}
      className="flex items-center gap-4 rounded-2xl px-4 py-4 hover:bg-orange-50"
    >
      <Icon className="text-[#D6451B]" />
      {item.name}
    </Link>
  );
})}
        </nav>

     {/* Desktop Actions */}
<div className="hidden lg:flex items-center gap-5">

  {!user ? (
    <>
      <Link
        href="/login"
        className="text-sm font-medium text-slate-600 transition hover:text-[#D6451B]"
      >
        Login
      </Link>

      <Link
        href="/signup"
        className="rounded-full bg-[#D6451B] px-6 py-2.5 text-sm font-semibold text-white transition hover:shadow-lg hover:shadow-orange-200"
      >
        Enroll Now
      </Link>
    </>
  ) : (
    <div
      className="relative"
      ref={profileRef}
    >
      {/* Profile Button */}
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-2 py-2 transition hover:border-[#D6451B] hover:shadow-lg"
      >
        {user.profileImage ? (
          <img
            src={user.profileImage}
            alt={user.fullName}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-[#D6451B] to-orange-500 text-lg font-bold text-white">
            {user.fullName.charAt(0).toUpperCase()}
          </div>
        )}

        <div className="hidden text-left xl:block">
          <h3 className="text-sm font-semibold text-slate-900">
            {capitalizeFirstLetter(user?.fullName)}
          </h3>

          <p className="text-xs capitalize text-slate-500">
            {user.role}
          </p>
        </div>

        <FaChevronDown
          className={`text-sm text-slate-500 transition ${
            profileOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
           transition={{
  duration: 0.2,
  ease: "easeOut",
}}
            className="absolute right-0 mt-4 w-80 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
          >
            {/* Header */}
<div className="bg-gradient-to-r from-[#D6451B] via-[#e65a2d] to-orange-500 p-6 text-white">

  <div className="flex items-center gap-4">

    {user.profileImage ? (
      <img
        src={user.profileImage}
        className="h-16 w-16 rounded-full border-2 border-white object-cover"
      />
    ) : (
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold backdrop-blur">
        {user.fullName.charAt(0)}
      </div>
    )}

    <div>

      <h2 className="text-lg font-semibold">
        {user.fullName}
      </h2>

      <p className="text-sm text-orange-100">
        {user.email}
      </p>

      <span className="mt-3 inline-flex rounded-full bg-white/20 px-3 py-1 text-xs font-medium capitalize">
        {user.role}
      </span>

    </div>

  </div>

</div>
<div className="space-y-1 p-3">

  {profileItems.map((item) => (
    <ProfileItem
      key={item.title}
      {...item}
    />
  ))}

</div>
<div className="border-t border-slate-100 p-3">

  <button
  onClick={handleLogout}
    className="flex w-full items-center gap-4 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50"
  >
    <FaSignOutAlt />

    <span  className="font-medium">
      Logout
    </span>

  </button>

</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )}
</div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-xl text-slate-900 lg:hidden"
          aria-label="Toggle Menu"
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
     <AnimatePresence>
  {open && (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.28 }}
      className="fixed inset-0 z-[60] bg-white overf lg:hidden"
    >
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

  <Link
    href="/"
    onClick={() => setOpen(false)}
    className="flex items-center gap-3"
  >
    <img
      src="/icon1.png"
      className="h-10 w-10"
    />

    <div>

      <h2 className="font-bold">
        Inquisitive Mind
      </h2>

      <p className="text-[10px] tracking-[0.35em] text-[#D6451B]">
        ACADEMY
      </p>

    </div>

  </Link>

  <button
    onClick={() => setOpen(false)}
    className="rounded-full p-2 hover:bg-slate-100"
  >
    <FaTimes size={22} />
  </button>

</div>
<div className="px-6 pt-6">

  {user ? (

    <div className="rounded-3xl bg-gradient-to-r from-[#D6451B] via-[#e65a2d] to-orange-500 p-6 text-white shadow-xl">

      <div className="flex items-center gap-4">

        {user.profileImage ? (
          <img
            src={user.profileImage}
            className="h-16 w-16 rounded-full border-2 border-white object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">
            {user.fullName[0]}
          </div>
        )}

        <div>

          <h2 className="text-lg font-semibold">
            {user.fullName}
          </h2>

          <p className="text-sm text-orange-100">
            {user.email}
          </p>

          <span className="mt-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs capitalize">
            {user.role}
          </span>

        </div>

      </div>

    </div>

  ) : (

    <div className="space-y-3">

      <Link
        href="/login"
        onClick={() => setOpen(false)}
        className="block rounded-2xl border py-4 text-center font-semibold"
      >
        Login
      </Link>

      <Link
        href="/signup"
        onClick={() => setOpen(false)}
        className="block rounded-2xl bg-[#D6451B] py-4 text-center font-semibold text-white"
      >
        Enroll Now
      </Link>

    </div>

  )}

</div>
<div className="flex h-[calc(100vh-80px)] flex-col">

  {/* Scrollable Content */}
  <div className="flex-1 overflow-y-auto px-6 py-6">

    <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
      Navigation
    </h3>

    <div className="space-y-2">
      {links.map((item) => (
        <Link
          key={item.name}
          href={item.path}
          onClick={() => setOpen(false)}
          className="flex items-center rounded-2xl px-4 py-4 font-medium transition hover:bg-orange-50 hover:text-[#D6451B]"
        >
          {item.name}
        </Link>
      ))}
    </div>

    {user && (
      <>
        <h3 className="mt-8 mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
          Account
        </h3>

        <div className="space-y-2">
          {profileItems.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 rounded-2xl px-4 py-4 font-medium transition hover:bg-orange-50"
              >
                <Icon className="text-[#D6451B]" />

                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>
      </>
    )}
  </div>

  {/* Bottom */}
  <div className="border-t border-slate-200 bg-white p-6">

    {user ? (
      <button onClick={handleLogout} className="flex w-full items-center justify-center gap-3 rounded-2xl border border-red-200 py-4 font-semibold text-red-600 transition hover:bg-red-50">
        <FaSignOutAlt />
        Logout
      </button>
    ) : (
      <Link
        href="/login"
        className="block rounded-2xl bg-[#D6451B] py-4 text-center font-semibold text-white"
      >
        Login
      </Link>
    )}

    <p className="mt-6 text-center text-sm text-slate-400">
      © 2026 Inquisitive Mind Academy
    </p>

  </div>

</div>
    </motion.div>
  )}
</AnimatePresence>

    </header>
  );
}