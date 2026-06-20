"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaUser,
  FaBookOpen,
  FaVideo,
  FaUsers,
  FaBullhorn,
  FaCertificate,
  FaCog,
} from "react-icons/fa";

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: FaHome,
  },
  {
    id: "profile",
    label: "Profile",
    icon: FaUser,
  },
  {
    id: "courses",
    label: "Courses",
    icon: FaBookOpen,
  },
  {
    id: "classes",
    label: "Classes",
    icon: FaVideo,
  },
  {
    id: "batches",
    label: "Batches",
    icon: FaUsers,
  },
  {
    id: "announcements",
    label: "Announcements",
    icon: FaBullhorn,
  },
  {
    id: "certificates",
    label: "Certificates",
    icon: FaCertificate,
  },
  {
    id: "settings",
    label: "Settings",
    icon: FaCog,
  },
];

export default function StudentNavbar({ section }) {
  const router=useRouter()
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-24 z-30 mt-6"
    >
      <div className="overflow-x-auto scrollbar-hide">
        <div className="inline-flex min-w-max gap-2 rounded-[28px] border border-slate-200 bg-white p-2 shadow-lg">

          {navItems.map((item) => {
            const Icon = item.icon;
            const active = section === item.id;

            return (
              <button
                key={item.id}
                onClick={()=>{router.push(`/student-profile/${item.id}`)}}
                className={`relative flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-medium transition-all duration-300 ${
                  active
                    ? "text-white"
                    : "text-slate-600 hover:bg-orange-50 hover:text-[#D6451B]"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="student-nav-active"
                    transition={{
                      type: "spring",
                      stiffness: 350,
                      damping: 30,
                    }}
                    className="absolute inset-0 rounded-2xl bg-[#D6451B]"
                  />
                )}

                <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                  <Icon className="text-sm" />
                  {item.label}
                </span>
              </button>
            );
          })}

        </div>
      </div>
    </motion.div>
  );
}