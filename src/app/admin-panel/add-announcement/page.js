"use client";

import AddAnnouncementForm from "@/app/Components/AddAnnoucementForm";
import { useAdminGetAllCourses } from "@/Hooks/useAdminGetCourses";
import { motion } from "framer-motion";
import { FaBullhorn } from "react-icons/fa";

export default function Page() {
  const { data: courses } = useAdminGetAllCourses();

  return (
    <div className="py-2 sm:py-4">
      <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-11 w-11 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl bg-white/20 text-white shrink-0">
              <FaBullhorn className="text-xl sm:text-2xl" />
            </div>

            <div>
              <h1 className="text-xl sm:text-3xl font-extrabold">
                Add New Announcement
              </h1>

              <p className="mt-1 text-xs sm:text-sm text-orange-100 font-normal">
                Broadcast an update to your students and batches.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-xs"
        >
          <AddAnnouncementForm courses={courses} />
        </motion.div>
      </div>
    </div>
  );
}
