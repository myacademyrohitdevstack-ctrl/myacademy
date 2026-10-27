"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaUser,
  FaBookOpen,
  FaVideo,
  FaUsers,
  FaCog,
  FaClipboardCheck,
} from "react-icons/fa";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: FaHome,
  },
  {
    id: "profile",
    label: "My Profile",
    icon: FaUser,
  },
  {
    id: "batches",
    label: "My Batches",
    icon: FaUsers,
  },
  {
    id: "attendance",
    label: "Attendance & Leaves",
    icon: FaClipboardCheck,
  },
  {
    id: "classes",
    label: "Live Classes",
    icon: FaVideo,
  },
  {
    id: "courses",
    label: "My Courses",
    icon: FaBookOpen,
  },
  {
    id: "settings",
    label: "Settings",
    icon: FaCog,
  },
];

export default function StudentNavbar({ section }) {
  const router = useRouter();

  return (
    <div className="sticky top-20 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs py-2 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;

            return (
              <button
                key={item.id}
                onClick={() => router.push(`/student-profile/${item.id}`)}
                className={`relative flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2 text-xs sm:text-sm font-bold transition-all duration-200 ${
                  active
                    ? "text-white shadow-xs"
                    : "text-slate-600 hover:bg-orange-50 hover:text-[#D6451B]"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="student-nav-active-pill"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 32,
                    }}
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500"
                  />
                )}

                <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                  <Icon className="text-xs sm:text-sm" />
                  <span>{item.label}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
