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
  FaEdit,
  FaBookOpen,
  FaLink,
  FaClipboardCheck,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { formatISTDateTime } from "@/Utils/formatDate";
import { useGetStudentBatchById } from "@/Hooks/useGetStudentBatchById";
import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";
import { useAnnouncementByBatchId } from "@/Hooks/useAnnouncementByBatchId";
import Loading from "@/app/Components/ui/Loading";
import { NotesSkeleton } from "@/app/Skeletons/NotesSkeleton";
import { ClassLinksSkeleton } from "@/app/Skeletons/ClassesSkeleton";
import { AnnouncementsSkeleton } from "@/app/Skeletons/AnnouncementSkeleton";
import { StatCard } from "@/app/admin-panel/batches/[slug]/batch/BatchClient";
import { useGetStudentAttendenceDashboard } from "@/Hooks/useStudentAttendanceDashboard";


export default function LiveClasses() {
  const searchParams=useSearchParams()
    const [activeTab,setActiveTab]=useState("notes")
  const batchId=searchParams.get("batchId")
  const {data:classLinks,isLoading:classLoading}=useGetStudentClassLInks(batchId,activeTab)
  const {data:notes,isLoading:notesLoading}=useGetStudentNotes(batchId,activeTab)
  const {data:batch,isLoading:batchLoading}=useGetStudentBatchById(batchId)
    const {data:announcements,isLoading:annoucementLoading}=useAnnouncementByBatchId(batchId,activeTab)
    const {data:attendance}=useGetStudentAttendenceDashboard()
   const [pdfOpen,setPdfOpen]=useState(false)
    const [pdfUrl,setPdfUrl]=useState("")

if(batchLoading) return <Loading></Loading>
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




<div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
  <div className="flex gap-2 overflow-x-auto scrollbar-hide">

    <TabButton
      active={activeTab === "notes"}
      onClick={() => setActiveTab("notes")}
      icon={<FaBookOpen />}
      label="Notes"
    />

    <TabButton
      active={activeTab === "links"}
      onClick={() => setActiveTab("links")}
      icon={<FaLink />}
      label="Links"
    />

    <TabButton
      active={activeTab === "announcements"}
      onClick={() => setActiveTab("announcements")}
      icon={<FaBullhorn />}
      label="Updates"
    />

    <TabButton
      active={activeTab === "attendance"}
      onClick={() => setActiveTab("attendance")}
      icon={<FaClipboardCheck />}
      label="Attendance"
    />

  </div>
</div>
      {/* Schedule */}
   {!notesLoading && activeTab === "notes" && (
   <>
     {/* Header */}
 
     <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
 
       <div>
 
         <h2 className="text-2xl font-bold sm:text-3xl">
           Notes
         </h2>
 
         <p className="mt-1 text-sm text-slate-500 sm:text-base">
           Manage study materials for this batch
         </p>
 
       </div>
 
   
 
     </div>
 
     {/* Notes Grid */}
 
     <div className="mt-6 grid gap-5 md:grid-cols-2">
 
       {notes.map((note) => (
 
         <div
           key={note._id}
           className="
             group overflow-hidden
             rounded-3xl border border-slate-200
             bg-white p-4 shadow-sm
             transition-all duration-300
             hover:-translate-y-1
             hover:border-[#D6451B]
             hover:shadow-xl
             sm:p-5
           "
         >
 
           {/* Header */}
 
           <div className="flex items-start justify-between gap-3">
 
             <div className="min-w-0 flex-1">
 
               <div className="flex flex-wrap items-center gap-2">
 
                 <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-[#D6451B]">
                   Note #{note?.noteNumber || "-"}
                 </span>
 
                 <span
                   className={`
                     rounded-full px-3 py-1 text-xs font-semibold
                     ${
                       note?.visibility === "public"
                         ? "bg-green-50 text-green-600"
                         : "bg-red-50 text-red-600"
                     }
                   `}
                 >
                   {note?.visibility}
                 </span>
 
               </div>
 
               <h3 className="mt-3 text-base font-bold text-slate-900 sm:text-lg">
                 {note?.title}
               </h3>
 
               <p className="mt-2 text-sm text-slate-500 line-clamp-3">
                 {note?.description ||
                   "No description available"}
               </p>
 
             </div>
 
          
 
           </div>
 
           {/* Stats */}
 
           <div className="mt-5 grid grid-cols-2 gap-3">
 
             <div className="rounded-2xl bg-slate-50 p-3">
 
               <p className="text-xs text-slate-500">
                 Type
               </p>
 
               <p className="font-semibold uppercase">
                 {note?.type}
               </p>
 
             </div>
 
             <div className="rounded-2xl bg-slate-50 p-3">
 
               <p className="text-xs text-slate-500">
                 Size
               </p>
 
               <p className="font-semibold">
                 {note?.file?.size
                   ? `${(
                       note.file.size /
                       1024 /
                       1024
                     ).toFixed(2)} MB`
                   : "-"}
               </p>
 
             </div>
 
           </div>
 
           {/* File Section */}
 
           <div
             className="
               mt-5 flex flex-col gap-4
               rounded-2xl border border-slate-100
               bg-slate-50 p-4
               sm:flex-row sm:items-center sm:justify-between
             "
           >
 
             <div className="flex min-w-0 items-center gap-3">
 
               <div
                 className="
                   flex h-12 w-12 shrink-0
                   items-center justify-center
                   rounded-2xl bg-red-100
                 "
               >
                 <FaFilePdf className="text-xl text-red-500" />
               </div>
 
               <div className="min-w-0">
 
                 <p className="truncate font-medium">
                   {note?.file?.originalName ||
                     "Attachment"}
                 </p>
 
                 <p className="text-xs text-slate-500">
                   {new Date(
                     note.createdAt
                   ).toLocaleDateString("en-IN")}
                 </p>
 
               </div>
 
             </div>
 
             <button
               onClick={() => {
                 setPdfUrl(note?.file?.url);
                 setPdfOpen(true);
               }}
               className="
                 w-full rounded-xl
                 bg-blue-50 px-4 py-2
                 text-sm font-medium
                 text-blue-600
                 hover:bg-blue-100
                 sm:w-auto
               "
             >
               View
             </button>
 
           </div>
 
         </div>
 
       ))}
 
     </div>
   </>
 )} {notesLoading && <NotesSkeleton></NotesSkeleton>}
 
       {/* Class Links */}
 
   {!classLoading && activeTab === "links" && (
   <div >
     
     {/* Header */}
 
     <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
 
       <div>
         <h2 className="text-2xl font-bold sm:text-3xl">
           Class Links
         </h2>
 
         <p className="mt-1 text-sm text-slate-500 sm:text-base">
           Manage online meetings and recordings
         </p>
       </div>
 
   
 
     </div>
 
     {/* Content */}
 
     <div className="mt-6 space-y-4 sm:mt-8">
 
       {classLinks?.length > 0 ? (
         classLinks.map((link) => (
           <div
             key={link._id}
             className="
               rounded-2xl border border-slate-200
               bg-white p-4 shadow-sm
               transition-all duration-300
               hover:border-[#D6451B]
               hover:shadow-lg
             "
           >
             {/* Top Section */}
 
             <div>
 
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
 
               <h3 className="mt-3 break-words text-lg font-bold text-slate-900">
                 {link.title}
               </h3>
 
               <p className="mt-2 text-sm text-slate-500 line-clamp-3">
                 {link.description || "No description provided"}
               </p>
 
             </div>
 
             {/* Stats */}
 
             <div className="mt-5 grid grid-cols-2 gap-3">
 
               <div className="rounded-xl bg-slate-50 p-3">
                 <p className="text-xs text-slate-500">
                   Meeting Date
                 </p>
 
                 <p className="mt-1 text-sm font-semibold">
                   {formatISTDateTime(link.meetingDate)}
                 </p>
               </div>
 
               <div className="rounded-xl bg-slate-50 p-3">
                 <p className="text-xs text-slate-500">
                   Platform
                 </p>
 
                 <p className="mt-1 text-sm font-semibold capitalize">
                   {link.platform}
                 </p>
               </div>
 
               <div className="rounded-xl bg-slate-50 p-3">
                 <p className="text-xs text-slate-500">
                   Duration
                 </p>
 
                 <p className="mt-1 text-sm font-semibold">
                   {link.durationMinutes} min
                 </p>
               </div>
 
               <div className="rounded-xl bg-slate-50 p-3">
                 <p className="text-xs text-slate-500">
                   Attendance
                 </p>
 
                 <p className="mt-1 text-sm font-semibold">
                   {link.attendanceEnabled
                     ? "Enabled"
                     : "Disabled"}
                 </p>
               </div>
 
             </div>
 
         
 
             {/* Footer */}
 
             <div className="mt-5 border-t border-slate-200 pt-5">
 
               <div className="flex flex-col gap-3 sm:flex-row">
 
                 <a
                   href={link.meetingLink}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="
                     flex flex-1 items-center justify-center gap-2
                     rounded-xl bg-green-50
                     px-4 py-3
                     text-sm font-medium text-green-700
                     hover:bg-green-100
                   "
                 >
                   <FaExternalLinkAlt />
                   Join Meeting
                 </a>
 
                 {link.recordingUrl && (
                   <a
                     href={link.recordingUrl}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="
                       flex flex-1 items-center justify-center gap-2
                       rounded-xl bg-blue-50
                       px-4 py-3
                       text-sm font-medium text-blue-700
                       hover:bg-blue-100
                     "
                   >
                     🎥 Recording
                   </a>
                 )}
 
               </div>
 
             </div>
 
           </div>
         ))
       ) : (
         <div className="rounded-2xl border border-dashed border-slate-300 py-12 text-center">
 
           <h3 className="text-lg font-semibold">
             No Class Links Yet
           </h3>
 
           <p className="mt-2 text-sm text-slate-500">
             Create your first online class link.
           </p>
 
      
 
         </div>
       )}
 
     </div>
 
   </div>
 )} {classLoading && <ClassLinksSkeleton></ClassLinksSkeleton>}
 { !annoucementLoading && activeTab === "announcements" && (
   <div >
 
     {/* Header */}
 
     <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
 
       <div>
 
         <h2 className="text-2xl sm:text-3xl font-bold">
           Announcements
         </h2>
 
         <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-500">
           Important updates, notices and reminders for students
         </p>
 
       </div>
 
     
     </div>
 
     {announcements?.length > 0 ? (
 
       <div className="mt-6 sm:mt-8 space-y-4">
 
         {announcements?.map((announcement) => (
 
           <div
             key={announcement._id}
             className="
               group relative overflow-hidden
               rounded-2xl sm:rounded-3xl
               border border-slate-200
               bg-white
               p-4 sm:p-5
               shadow-sm
               transition-all duration-300
               hover:border-[#D6451B]
               hover:shadow-lg
             "
           >
 
             {/* Accent */}
 
             <div className="absolute left-0 top-0 h-full w-1 bg-[#D6451B]" />
 
             <div className="flex flex-col sm:flex-row gap-4">
 
               {/* Icon */}
 
               <div
                 className="
                   flex h-12 w-12 sm:h-14 sm:w-14 shrink-0
                   items-center justify-center
                   rounded-xl sm:rounded-2xl
                   bg-orange-100
                   text-[#D6451B]
                 "
               >
                 <FaBullhorn className="text-lg sm:text-xl" />
               </div>
 
               {/* Content */}
 
               <div className="flex-1 min-w-0">
 
                 {/* Meta */}
 
                 <div className="flex flex-wrap items-center gap-2">
 
                   {announcement?.pinned && (
                     <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
                       📌 Pinned
                     </span>
                   )}
 
                   <span
                     className={`
                       rounded-full px-3 py-1 text-xs font-semibold
                       ${
                         announcement?.type === "system"
                           ? "bg-purple-100 text-purple-700"
                           : announcement?.type === "course"
                           ? "bg-blue-100 text-blue-700"
                           : "bg-green-100 text-green-700"
                       }
                     `}
                   >
                     {announcement?.type}
                   </span>
 
                   <span className="text-xs text-slate-500">
                     {formatISTDateTime(
                       announcement?.createdAt
                     )}
                   </span>
 
                 </div>
 
                 {/* Title */}
 
                 <h3 className="mt-3 text-lg sm:text-xl font-bold text-slate-900 break-words">
                   {announcement?.title}
                 </h3>
 
                 {/* Message */}
 
                 <p className="mt-3 text-sm sm:text-base whitespace-pre-wrap leading-relaxed text-slate-600">
                   {announcement?.message}
                 </p>
 
                 {/* Footer */}
 
                 <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-100 pt-4">
 
                   <div>
 
                     <p className="text-xs text-slate-500">
                       Posted By
                     </p>
 
                     <p className="font-medium text-slate-700 break-words">
                       {announcement?.createdBy?.fullName ||
                         "Admin"}
                     </p>
 
                   </div>
 
               
 
                 </div>
 
               </div>
 
             </div>
 
           </div>
 
         ))}
 
       </div>
 
     ) : (
 
       <div className="flex flex-col items-center justify-center py-12 sm:py-16">
 
         <div
           className="
             flex h-16 w-16 sm:h-20 sm:w-20
             items-center justify-center
             rounded-full bg-orange-100
           "
         >
           <FaBullhorn className="text-2xl sm:text-3xl text-[#D6451B]" />
         </div>
 
         <h3 className="mt-5 text-lg sm:text-xl font-semibold text-slate-700">
           No Announcements Yet
         </h3>
 
         <p className="mt-2 max-w-md text-center text-sm sm:text-base text-slate-500">
           Create your first announcement to notify students.
         </p>
 
       </div>
 
     )}
 
   </div>
 )}  { annoucementLoading && <AnnouncementsSkeleton></AnnouncementsSkeleton>}
{activeTab === "attendance" && (
  <div className="space-y-6">

    {/* Header */}

    <div>
      <h2 className="text-2xl font-bold sm:text-3xl">
        My Attendance
      </h2>

      <p className="mt-2 text-sm text-slate-500 sm:text-base">
        Track your attendance and stay on target.
      </p>
    </div>

    {/* Stats */}

    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

      <StatCard
        title="Attendance"
        value={`${attendance?.stats?.attendancePercentage || 0}%`}
        icon={<FaClipboardCheck />}
        color="bg-green-50 text-green-600"
      />

      <StatCard
        title="Present"
        value={attendance?.stats?.present || 0}
        icon={<FaCheck />}
        color="bg-blue-50 text-blue-600"
      />

      <StatCard
        title="Absent"
        value={attendance?.stats?.absent || 0}
        icon={<FaTimes />}
        color="bg-red-50 text-red-600"
      />

    </div>

    {/* Progress */}

    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

      <div className="flex items-center justify-between">
        <h3 className="font-bold text-slate-800">
          Attendance Progress
        </h3>

        <span className="text-lg font-bold text-[#D6451B]">
          {attendance?.stats?.attendancePercentage || 0}%
        </span>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">

        <div
          className="h-full rounded-full bg-[#D6451B] transition-all duration-500"
          style={{
            width: `${attendance?.stats?.attendancePercentage || 0}%`,
          }}
        />

      </div>

      <p
        className={`mt-4 text-sm font-medium ${
          attendance?.stats?.attendancePercentage >= 75
            ? "text-green-600"
            : attendance?.stats?.attendancePercentage >= 50
            ? "text-amber-600"
            : "text-red-600"
        }`}
      >
        {attendance?.stats?.attendancePercentage >= 75
          ? "✅ Excellent! Your attendance is above the required 75%."
          : attendance?.stats?.attendancePercentage >= 50
          ? `⚠️ Your attendance is ${attendance?.stats?.attendancePercentage}%. Try to reach at least 75%.`
          : `❌ Your attendance is ${attendance?.stats?.attendancePercentage}%. Please improve to meet the 75% requirement.`}
      </p>

    </div>

    {/* Recent Attendance */}

    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-5">
        <h3 className="text-lg font-bold">
          Recent Attendance
        </h3>
      </div>

      {attendance?.recentAttendance?.length > 0 ? (

        <div className="divide-y divide-slate-100">

          {attendance.recentAttendance.map((item) => (

            <div
              key={item.date}
              className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5"
            >

              <div>
                <p className="text-sm text-slate-500">
                  Class Date
                </p>

                <h4 className="font-semibold text-slate-800">
                  {new Date(item.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </h4>
              </div>

              <span
                className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
                  item.status === "present"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.status === "present" ? "Present" : "Absent"}
              </span>

            </div>

          ))}

        </div>

      ) : (

        <div className="flex flex-col items-center justify-center px-6 py-12">

          <FaClipboardCheck className="mb-4 text-5xl text-slate-300" />

          <h3 className="text-lg font-semibold text-slate-700">
            No Attendance Records
          </h3>

          <p className="mt-2 max-w-sm text-center text-sm text-slate-500">
            Your attendance hasn't been marked yet. Once your trainer records attendance, it will appear here.
          </p>

        </div>

      )}

    </div>

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
function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all ${
        active
          ? "bg-[#D6451B] text-white shadow-md"
          : "bg-slate-50 text-slate-600 hover:bg-slate-100"
      }`}
    >
      <span className="text-base">{icon}</span>
      <span>{label}</span>
    </button>
  );
}