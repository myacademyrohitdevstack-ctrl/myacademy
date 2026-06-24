"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaCamera,
  FaCheck,
  FaTimes,
  FaSpinner,
} from "react-icons/fa";
import CommingSoon from "@/app/Components/ui/CommingSoon";

export default function ProfileSidebar({
  user,
  profile,
  onImageUpload,
  isUploading,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!selectedFile) {
      setPreview("");
      return;
    }

    const url = URL.createObjectURL(selectedFile);
    setPreview(url);

    return () => URL.revokeObjectURL(url);
  }, [selectedFile]);

  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setSelectedFile(file);
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview("");
  };

  const handleUpload = () => {
    if (!selectedFile) return;
 
    onImageUpload(selectedFile, () => {
      setSelectedFile(null);
      setPreview("");
    });
  };

  return (
  <motion.div
  initial={{ opacity: 0, x: -15 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.35 }}
  className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg"
>
  {/* Top Banner */}
  <div className="relative h-28 bg-gradient-to-r from-[#D6451B] via-orange-500 to-orange-400">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.25),transparent_55%)]" />
  </div>

  {/* Avatar */}
  <div className="-mt-14 px-6">
    <div className="relative mx-auto w-fit">
      <img
        src={preview || user?.profileImage?.url || "/student.jpg"}
        alt={user?.fullName}
        className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-xl sm:h-36 sm:w-36"
      />

      {!selectedFile ? (
        <>
          <label
            htmlFor="profileImage"
            className="absolute bottom-1 right-1 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#D6451B] text-white shadow-lg transition hover:scale-110"
          >
            <FaCamera />
          </label>

          <input
            id="profileImage"
            type="file"
            accept="image/*"
            hidden
            onChange={handleChange}
          />
        </>
      ) : (
        <div className="absolute bottom-1 right-1 flex gap-2">
          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition hover:scale-105 disabled:opacity-50"
          >
            {isUploading ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaCheck />
            )}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={isUploading}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500 text-white shadow-lg transition hover:scale-105"
          >
            <FaTimes />
          </button>
        </div>
      )}
    </div>

    {/* Name */}
    <div className="mt-5 text-center">
      <h2 className="text-2xl font-bold text-slate-900">
        {user?.fullName || "Student"}
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        {user?.email}
      </p>

      <span className="mt-4 inline-flex rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-[#D6451B]">
        {profile?.languageLevel || "Beginner"}
      </span>
    </div>

    {/* Quick Stats */}
    <div className="mt-6 grid grid-cols-2 gap-3">
      <StatCard
        title="Batch"
        value={profile?.batch?.name || "-"}
      />

      <StatCard
        title="Course"
        value={profile?.enrolledCourses?.length || 0}
      />
    </div>

    {/* Information */}
    <div className="relative mt-6 space-y-3 pb-6">
      <CommingSoon />

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
            ? new Date(
                profile.admissionDate
              ).toLocaleDateString()
            : "-"
        }
      />
    </div>
  </div>
</motion.div>
  );
}

function Info({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{title}</p>

      <h3 className="mt-1 font-semibold text-slate-800">
        {value}
      </h3>
    </div>
  );
}
function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-orange-100 bg-orange-50 p-4 text-center transition hover:bg-orange-100">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
        {title}
      </p>

      <h3 className="mt-2 text-lg font-bold text-[#D6451B]">
        {value}
      </h3>
    </div>
  );
}