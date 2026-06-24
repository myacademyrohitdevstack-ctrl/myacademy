"use client";

import { useGetStudentClassLInks } from "@/Hooks/useGetStudentClassLinks";
import { useGetStudentNotes } from "@/Hooks/useGetStudentNotes";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Modal from "@/app/Components/ui/Modals";
import PdfViewer from "@/Utils/pdfViewer";
import {

  FaUserTie,
  
  FaFilePdf,
  FaPlus,
  FaBullhorn,
  FaVideo,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { formatISTDateTime } from "@/Utils/formatDate";
import { useGetStudentBatchById } from "@/Hooks/useGetStudentBatchById";
import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";
import { useAnnouncementByBatchId } from "@/Hooks/useAnnouncementByBatchId";


export default function LiveClasses() {
  const searchParams=useSearchParams()
  const batchId=searchParams.get("batchId")
  const {data:classLinks,isLoading:classLoading}=useGetStudentClassLInks(batchId)
  const {data:notes,isLoading:notesLoading}=useGetStudentNotes(batchId)
  const {data:batch}=useGetStudentBatchById(batchId)
    const {data:announcements}=useAnnouncementByBatchId(batchId)
   const [pdfOpen,setPdfOpen]=useState(false)
    const [pdfUrl,setPdfUrl]=useState("")
  const [activeTab,setActiveTab]=useState("links")
  if(notesLoading || classLoading) return
  return (
<div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
  <div className="space-y-6 sm:space-y-8">

    {/* Hero */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#D6451B] via-[#e85b2f] to-orange-500 p-5 text-white shadow-xl sm:p-8 lg:p-10"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.18),transparent_55%)]" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}
        <div className="flex-1">

          <span className="inline-flex w-fit rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold tracking-wide backdrop-blur sm:px-4 sm:text-sm">
            Student Batch
          </span>

          <h1 className="mt-4 break-words text-2xl font-bold leading-tight sm:text-3xl lg:text-5xl">
            {batch?.name}
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-orange-100 sm:text-base">
            {batch?.course?.title}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">

            <div className="flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur">

              <FaUserTie className="text-sm" />

              <span className="text-sm font-medium">
                {batch?.trainers
                  ?.map((t) => capitalizeFirstLetter(t.fullName))
                  .join(", ")}
              </span>

            </div>

          </div>

        </div>

        {/* Right Stats */}

        <div className="grid w-full grid-cols-2 gap-3 lg:w-72">

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

            <p className="text-xs uppercase tracking-wide text-orange-100">
              Course
            </p>

            <p className="mt-2 line-clamp-2 text-sm font-semibold">
              {batch?.course?.title}
            </p>

          </div>

          <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">

            <p className="text-xs uppercase tracking-wide text-orange-100">
              Trainers
            </p>

            <p className="mt-2 text-lg font-bold">
              {batch?.trainers?.length || 0}
            </p>

          </div>

        </div>

      </div>
    </motion.div>

    {/* Tabs */}

    <div className="overflow-x-auto pb-1">

      <div className="inline-flex min-w-full gap-2 rounded-2xl bg-slate-100 p-1 sm:w-fit">

        <button
          onClick={() => setActiveTab("notes")}
          className={`whitespace-nowrap rounded-xl px-4 py-3 text-sm font-semibold transition sm:px-6 ${
            activeTab === "notes"
              ? "bg-[#D6451B] text-white shadow-md"
              : "text-slate-700 hover:bg-white"
          }`}
        >
          Notes
        </button>

        <button
          onClick={() => setActiveTab("links")}
          className={`whitespace-nowrap rounded-xl px-4 py-3 text-sm font-semibold transition sm:px-6 ${
            activeTab === "links"
              ? "bg-[#D6451B] text-white shadow-md"
              : "text-slate-700 hover:bg-white"
          }`}
        >
          Class Links
        </button>

        <button
          onClick={() => setActiveTab("announcements")}
          className={`whitespace-nowrap rounded-xl px-4 py-3 text-sm font-semibold transition sm:px-6 ${
            activeTab === "announcements"
              ? "bg-[#D6451B] text-white shadow-md"
              : "text-slate-700 hover:bg-white"
          }`}
        >
          Announcements
        </button>

      </div>

    </div>
      {/* Schedule */}
 {activeTab === "notes" && (
  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg sm:p-6 lg:p-8">

    {/* Header */}

    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

      <div>

        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Notes
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Study materials shared by your trainer.
        </p>

      </div>

      <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-[#D6451B]">
        {notes?.length || 0} Notes
      </span>

    </div>

    {notes?.length > 0 ? (

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {notes.map((note) => (

          <motion.div
            key={note._id}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-[#D6451B] hover:shadow-xl"
          >

            {/* Top */}

            <div className="border-b border-slate-100 p-5">

              <div className="flex flex-wrap gap-2">

                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-[#D6451B]">
                  Note #{note?.noteNumber || "-"}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    note?.visibility === "public"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {note?.visibility}
                </span>

              </div>

              <h3 className="mt-4 line-clamp-2 text-lg font-bold text-slate-900">
                {note?.title}
              </h3>

              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                {note?.description || "No description available"}
              </p>

            </div>

            {/* Stats */}

            <div className="grid grid-cols-2 gap-3 p-5">

              <div className="rounded-2xl bg-slate-50 p-3">

                <p className="text-xs text-slate-500">
                  File Type
                </p>

                <p className="mt-1 font-semibold uppercase">
                  {note?.type}
                </p>

              </div>

              <div className="rounded-2xl bg-slate-50 p-3">

                <p className="text-xs text-slate-500">
                  File Size
                </p>

                <p className="mt-1 font-semibold">
                  {note?.file?.size
                    ? `${(note.file.size / 1024 / 1024).toFixed(2)} MB`
                    : "-"}
                </p>

              </div>

            </div>

            {/* File */}

            <div className="border-t border-slate-100 p-5">

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100">
                  <FaFilePdf className="text-xl text-red-500" />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="truncate font-semibold text-slate-800">
                    {note?.file?.originalName || "Attachment"}
                  </p>

                  <p className="text-xs text-slate-500">
                    {new Date(note.createdAt).toLocaleDateString("en-IN")}
                  </p>

                </div>

              </div>

              <button
                onClick={() => {
                  setPdfUrl(note?.file?.url);
                  setPdfOpen(true);
                }}
                className="mt-4 w-full rounded-2xl bg-[#D6451B] py-3 font-semibold text-white transition hover:bg-[#b93814]"
              >
                View PDF
              </button>

            </div>

          </motion.div>

        ))}

      </div>

    ) : (

      <div className="flex flex-col items-center justify-center py-16">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">

          <FaFilePdf className="text-3xl text-[#D6451B]" />

        </div>

        <h3 className="mt-5 text-xl font-semibold text-slate-800">
          No Notes Available
        </h3>

        <p className="mt-2 text-center text-slate-500">
          Your trainer hasn't uploaded any study material yet.
        </p>

      </div>

    )}

  </div>
)}
 
       {/* Class Links */}
 
  {activeTab === "links" && (
  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg sm:p-6 lg:p-8">

    {/* Header */}

    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

      <div>

        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Class Links
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Join upcoming live classes and watch recordings.
        </p>

      </div>

      <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-[#D6451B]">
        {classLinks?.length || 0} Classes
      </span>

    </div>

    {classLinks?.length > 0 ? (

      <div className="mt-6 space-y-5">

        {classLinks.map((link) => (

          <motion.div
            key={link._id}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-[#D6451B] hover:shadow-xl"
          >

            <div className="p-5">

              {/* Top */}

              <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">

                <div className="min-w-0 flex-1">

                  <div className="flex flex-wrap gap-2">

                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-[#D6451B]">
                      Class #{link.classNumber || "-"}
                    </span>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        link.status === "live"
                          ? "bg-green-100 text-green-700"
                          : link.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : link.status === "cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {link.status}
                    </span>

                  </div>

                  <h3 className="mt-4 text-xl font-bold text-slate-900">
                    {link.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {link.description || "No description available"}
                  </p>

                </div>

              </div>

              {/* Stats */}

              <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

                <div className="rounded-2xl bg-slate-50 p-3">

                  <p className="text-xs text-slate-500">
                    Date
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {formatISTDateTime(link.meetingDate)}
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-3">

                  <p className="text-xs text-slate-500">
                    Platform
                  </p>

                  <p className="mt-1 font-semibold capitalize">
                    {link.platform}
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-3">

                  <p className="text-xs text-slate-500">
                    Duration
                  </p>

                  <p className="mt-1 font-semibold">
                    {link.durationMinutes} min
                  </p>

                </div>

                <div className="rounded-2xl bg-slate-50 p-3">

                  <p className="text-xs text-slate-500">
                    Attendance
                  </p>

                  <p className="mt-1 font-semibold">
                    {link.attendanceEnabled ? "Enabled" : "Disabled"}
                  </p>

                </div>

              </div>

              {/* Buttons */}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">

                <a
                  href={link.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#D6451B] px-5 py-3 font-semibold text-white transition hover:bg-[#b93814]"
                >
                  <FaExternalLinkAlt />
                  Join Meeting
                </a>

                {link.recordingUrl && (
                  <a
                    href={link.recordingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                  >
                    🎥 Recording
                  </a>
                )}

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    ) : (

      <div className="flex flex-col items-center justify-center py-16">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">
          <FaVideo className="text-3xl text-[#D6451B]" />
        </div>

        <h3 className="mt-5 text-xl font-semibold text-slate-800">
          No Live Classes
        </h3>

        <p className="mt-2 text-center text-slate-500">
          Live classes will appear here once scheduled.
        </p>

      </div>

    )}

  </div>
)}
   {activeTab === "announcements" && (
  <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-lg sm:p-6 lg:p-8">

    {/* Header */}

    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

      <div>

        <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Announcements
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Stay updated with important notices and reminders.
        </p>

      </div>

      <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-[#D6451B]">
        {announcements?.length || 0} Updates
      </span>

    </div>

    {announcements?.length > 0 ? (

      <div className="mt-6 space-y-5">

        {announcements.map((announcement) => (

          <motion.div
            key={announcement._id}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:border-[#D6451B] hover:shadow-xl"
          >

            {/* Accent */}

            <div className="absolute left-0 top-0 h-full w-1.5 bg-[#D6451B]" />

            <div className="p-5 sm:p-6">

              <div className="flex gap-4">

                {/* Icon */}

                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-[#D6451B]">

                  <FaBullhorn className="text-xl" />

                </div>

                {/* Content */}

                <div className="min-w-0 flex-1">

                  {/* Tags */}

                  <div className="flex flex-wrap items-center gap-2">

                    {announcement?.pinned && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                        📌 Pinned
                      </span>
                    )}

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        announcement?.type === "system"
                          ? "bg-purple-100 text-purple-700"
                          : announcement?.type === "course"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {announcement?.type}
                    </span>

                    <span className="text-xs text-slate-500">
                      {formatISTDateTime(announcement.createdAt)}
                    </span>

                  </div>

                  {/* Title */}

                  <h3 className="mt-4 text-lg font-bold text-slate-900 sm:text-xl">
                    {announcement.title}
                  </h3>

                  {/* Message */}

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-600">
                    {announcement.message}
                  </p>

                  {/* Footer */}

                  <div className="mt-6 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                      <p className="text-xs text-slate-500">
                        Posted By
                      </p>

                      <p className="font-semibold text-slate-800">
                        {announcement?.createdBy?.fullName || "Admin"}
                      </p>

                    </div>

                    {announcement.pinned && (
                      <span className="rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-[#D6451B]">
                        Important
                      </span>
                    )}

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        ))}

      </div>

    ) : (

      <div className="flex flex-col items-center justify-center py-16">

        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100">

          <FaBullhorn className="text-3xl text-[#D6451B]" />

        </div>

        <h3 className="mt-5 text-xl font-semibold text-slate-800">
          No Announcements Yet
        </h3>

        <p className="mt-2 max-w-sm text-center text-slate-500">
          Important announcements from your teachers and administrators will appear here.
        </p>

      </div>

    )}

  </div>
)}

    </div>
     <Modal
         isOpen={pdfOpen}
          onClose={() => setPdfOpen(false)}>
          <PdfViewer url={pdfUrl}></PdfViewer>
          
    
        </Modal>
    </div>
  );
}