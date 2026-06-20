"use client";

import { motion } from "framer-motion";
import { FaCamera } from "react-icons/fa";

export default function ProfileSidebar({
  user,
  profile,
  onImageChange,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-[30px] border h-fit border-slate-200 bg-white p-8 shadow-lg"
    >
      {/* Profile Image */}
      <div className="relative mx-auto w-fit">
        <img
          src={user?.profileImage || "/student.jpg"}
          alt={user?.fullName}
          className="h-40 w-40 rounded-full border-4 border-orange-100 object-cover"
        />

        <label
          htmlFor="profileImage"
          className="absolute bottom-2 right-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#D6451B] text-white shadow-lg transition hover:scale-105"
        >
          <FaCamera />
        </label>

        <input
          id="profileImage"
          type="file"
          accept="image/*"
          hidden
          onChange={onImageChange}
        />
      </div>

      {/* Name */}
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-bold text-slate-900">
          {user?.fullName || "Student"}
        </h2>

        <span className="mt-2 inline-flex rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-[#D6451B]">
          {profile?.languageLevel || "Beginner"}
        </span>
      </div>

      {/* Info */}
      <div className="mt-8 space-y-4">
        <Info
          title="Student ID"
          value={profile?.studentId || "Not Assigned"}
        />

        <Info
          title="Current Batch"
          value={profile?.batch?.name || "Not Assigned"}
        />

        <Info
          title="Current Course"
          value={
            profile?.enrolledCourses?.[0]?.title ||
            "No Course"
          }
        />

        <Info
          title="Trainer"
          value={
            profile?.batch?.teacher?.user?.fullName ||
            "Not Assigned"
          }
        />

        <Info
          title="Admission Date"
          value={
            profile?.admissionDate
              ? new Date(profile.admissionDate).toLocaleDateString()
              : "-"
          }
        />
      </div>
    </motion.div>
  );
}

function Info({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-1 font-semibold text-slate-800">
        {value}
      </h3>
    </div>
  );
}