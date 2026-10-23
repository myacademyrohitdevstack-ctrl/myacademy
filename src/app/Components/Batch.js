"use client";
import { FaClipboardCheck, FaEye } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaBookOpen,
  FaLink,
  FaPlus,
  FaEdit,
  FaTrash,
  FaExternalLinkAlt,
  FaFilePdf,
  FaSpinner,
  FaBullhorn,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminGetAllNotes } from "@/Hooks/useAdminGetNotes";
import Modal from "@/app/Components/ui/Modals";
import dynamic from "next/dynamic";

const PdfViewer = dynamic(() => import("@/Utils/pdfViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center p-8 text-xs text-slate-400">
      Loading Document Viewer...
    </div>
  ),
});
import { usedeleteNotesMutation } from "@/app/mutations/notesMutation";
import { useAdminGetAllLinks } from "@/Hooks/useAdminGetClassLinks";
import { formatISTDateTime } from "@/Utils/formatDate";
import { useDeleteClassLinkMutation } from "@/app/mutations/classLinkMutation";
import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";
import { useAdminGetAllBatches } from "@/Hooks/useAdminGetBatches";
import { useAdminGetBatche } from "@/Hooks/useAdminGetBatch";
import { useAnnouncementByBatchId } from "@/Hooks/useAnnouncementByBatchId";
import { useDeleteAnnouncementtMutation } from "@/app/mutations/AnnouncementMutation";
import { NotesSkeleton } from "@/app/Skeletons/NotesSkeleton";
import { AnnouncementsSkeleton } from "@/app/Skeletons/AnnouncementSkeleton";
import { ClassLinksSkeleton } from "@/app/Skeletons/ClassesSkeleton";
import Loading from "@/app/Components/ui/Loading";
import { useGetAttendenceDashboard } from "@/Hooks/useGetAttendenceDashboard";
import { useDeleteAttendance } from "@/app/mutations/Attendence";
import useAuthStore from "@/store/authStore";

export default function BatchDetailsPage({permissions}) {
  const user=useAuthStore(state=>state.user)
    const searchParams=useSearchParams()
    const batchId=searchParams.get("batchId")
       const [activeTab, setActiveTab] = useState("notes");
  const {data:notes,isLoading:notesLoading}=useAdminGetAllNotes(batchId,activeTab)
  const {data:classLinks,isLoading:classLoading}=useAdminGetAllLinks(batchId,activeTab)
  const {data:batch,isLoading:batchLoading,isError:batchError}=useAdminGetBatche(batchId)
  const {data:announcements,isLoading:annoucementLoading}=useAnnouncementByBatchId(batchId,activeTab)
  const [pdfOpen,setPdfOpen]=useState(false)
  const [pdfUrl,setPdfUrl]=useState("")
  const {data:attendance}=useGetAttendenceDashboard(batchId)

  const router=useRouter()
  const deleteNoteMutation=usedeleteNotesMutation()
  const deleteClassLinkMutation=useDeleteClassLinkMutation()
  const deleteAnnoucementMutation=useDeleteAnnouncementtMutation()
  const deleteAttendance=useDeleteAttendance()

  if(batchLoading) return <Loading></Loading> 

  if (!batchId || batchError || (!batchLoading && !batch)) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-12 text-center">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <FaExclamationTriangle className="text-2xl" />
          </div>
          <h2 className="mt-5 text-xl sm:text-2xl font-extrabold text-slate-900">
            Batch Not Found or Inaccessible
          </h2>
          <p className="mt-2 text-sm text-slate-500 leading-relaxed">
            This batch could not be found in your academy. It may have been deleted, or you might be logged into an account from a different academy.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => router.push(user?.role === "teacher" ? "/teacher-panel/courses" : "/admin-panel/courses")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] px-5 py-2.5 text-sm font-bold text-white shadow-xs hover:bg-[#b93814] transition cursor-pointer"
            >
              <FaBookOpen className="text-xs" />
              <span>Back to Courses</span>
            </button>
            <button
              onClick={() => router.push(user?.role === "teacher" ? "/teacher-panel/dashboard" : "/admin-panel/dashboard")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  } 

  return (
    <div className="py-2 sm:py-4 w-full min-w-0">
<div className="mx-auto max-w-7xl space-y-4 sm:space-y-6 px-1 sm:px-6 lg:px-8 w-full min-w-0">
      {/* Hero */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          rounded-2xl sm:rounded-3xl
          bg-gradient-to-r
          from-[#D6451B]
          to-orange-500
          p-4 sm:p-6 lg:p-8
          text-white
          shadow-xl
          w-full min-w-0 overflow-hidden
        "
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
              Batch Details
            </span>

            <h1 className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-4xl">
              {batch?.name}
            </h1>

            <p className="mt-3 text-orange-100">
              {batch?.description}
            </p>
          </div>

          <span
            className={`
              rounded-full
              bg-white/20
              px-5 py-3
              font-semibold 
               ${
              batch?.status === "active"
                ? "bg-white text-green-600"
                : "bg-red-50 text-red-600"
            }
            `}
          >
            {capitalizeFirstLetter(batch?.status)}
          </span>
        </div>
      </motion.div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 xl:grid-cols-4 w-full min-w-0">
      

        <StatCard
          title="Notes"
          value={notes?.length}
          icon={<FaBookOpen />}
          color="bg-blue-50 text-blue-600"
        />

        <StatCard
          title="Class Links"
          value={classLinks?.length}
          icon={<FaLink />}
          color="bg-orange-50 text-[#D6451B]"
        />
        <StatCard
  title="Announcements"
  value={announcements?.length || 0}
  icon={<FaBullhorn />}
  color="bg-purple-50 text-purple-600"
/>
<StatCard
  title="Attendance"
  value={attendance?.length || 0}



  icon={<FaClipboardCheck />}
  color="bg-emerald-50 text-emerald-600"
/>
      </div>

      {/* Tabs */}
      <div className="w-full min-w-0 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xs overflow-x-auto scrollbar-none">
        <div className="flex sm:grid sm:grid-cols-4 gap-1 min-w-full">
          <button
            onClick={() => setActiveTab("notes")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
              activeTab === "notes"
                ? "bg-[#D6451B] text-white shadow-xs"
                : "text-slate-600 hover:text-[#D6451B] hover:bg-orange-50/60"
            }`}
          >
            <FaBookOpen className="text-sm shrink-0" />
            <span>Notes</span>
          </button>

          <button
            onClick={() => setActiveTab("links")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
              activeTab === "links"
                ? "bg-[#D6451B] text-white shadow-xs"
                : "text-slate-600 hover:text-[#D6451B] hover:bg-orange-50/60"
            }`}
          >
            <FaLink className="text-sm shrink-0" />
            <span>Links</span>
          </button>

          <button
            onClick={() => setActiveTab("announcements")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
              activeTab === "announcements"
                ? "bg-[#D6451B] text-white shadow-xs"
                : "text-slate-600 hover:text-[#D6451B] hover:bg-orange-50/60"
            }`}
          >
            <FaBullhorn className="text-sm shrink-0" />
            <span>Updates</span>
          </button>

          <button
            onClick={() => setActiveTab("attendance")}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-bold whitespace-nowrap transition-all shrink-0 ${
              activeTab === "attendance"
                ? "bg-[#D6451B] text-white shadow-xs"
                : "text-slate-600 hover:text-[#D6451B] hover:bg-orange-50/60"
            }`}
          >
            <FaClipboardCheck className="text-sm shrink-0" />
            <span>Attendance</span>
          </button>
        </div>
      </div>

      {/* Notes */}

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

      <button
        onClick={() => {
          router.push(
            `/${user.role}-panel/add-notes?batchId=${batchId}`
          );
        }}
        className="
          flex w-full items-center justify-center gap-2
          rounded-2xl bg-[#D6451B]
          px-5 py-3 text-white
          sm:w-auto
        "
      >
        <FaPlus />
        Add Note
      </button>

    </div>

    {/* Notes Grid */}

    {notes?.length > 0 ? (
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {notes.map((note) => (

        <div
          key={note._id}
          className="
            group overflow-hidden
            rounded-2xl sm:rounded-3xl border border-slate-200
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

            {/* Actions */}

            <div className="flex shrink-0 gap-2">

           {permissions.canEdit &&   <button
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-xl bg-orange-50
                  text-[#D6451B]
                  hover:bg-orange-100
                "
              >
                <FaEdit />
              </button>}

             { permissions.canDelete && <button
                onClick={() => {
                  deleteNoteMutation.mutate(note._id);
                }}
                disabled={deleteNoteMutation.isPending}
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-xl bg-red-50
                  text-red-600
                  hover:bg-red-100
                "
              >
                {deleteNoteMutation.isPending &&
                deleteNoteMutation.variables ===
                  note._id ? (
                  <FaSpinner className="animate-spin" />
                ) : (
                  <FaTrash />
                )}
              </button>}

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
  ) : (
    <div className="mt-6 rounded-2xl border border-dashed border-slate-300 py-12 text-center">
      <h3 className="text-lg font-semibold text-slate-800">No Study Notes Yet</h3>
      <p className="mt-2 text-sm text-slate-500">
        No notes have been added to this batch yet.
      </p>
    </div>
  )}
  </>
)}
{notesLoading && <NotesSkeleton></NotesSkeleton>}
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

      <button
        onClick={() =>
          router.push(
            `/${user.role}-panel/add-classLink?batchId=${batchId}`
          )
        }
        className="
          flex w-full items-center justify-center gap-2
          rounded-xl bg-[#D6451B]
          px-5 py-3 text-white
          sm:w-auto
        "
      >
        <FaPlus />
        Add Link
      </button>

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

            {/* Edit/Delete */}

        <div className="mt-5 grid grid-cols-2 gap-3">

              {permissions.canEdit &&    <button
                className="
                  flex items-center justify-center gap-2
                  rounded-xl bg-orange-50 py-3
                  text-[#D6451B]
                  transition hover:bg-orange-100
                "
              >
                <FaEdit />
                Edit
              </button> }

             {permissions.canDelete &&     <button
                onClick={() =>
                  deleteClassLinkMutation.mutate(link._id)
                }
                disabled={deleteClassLinkMutation.isPending}
                className="
                  flex items-center justify-center gap-2
                  rounded-xl bg-red-50 py-3
                  text-red-600
                  transition hover:bg-red-100
                "
              >
                {deleteClassLinkMutation.isPending &&
                deleteClassLinkMutation.variables === link._id ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FaTrash />
                    Delete
                  </>
                )}
              </button>}

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

          <button
            onClick={() =>
              router.push(
                `/admin-panel/add-classLink?batchId=${batchId}`
              )
            }
            className="
              mt-5 rounded-xl
              bg-[#D6451B]
              px-5 py-3
              text-white
            "
          >
            Add Link
          </button>

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

      <button
        onClick={() =>
          router.push(
            `/${user.role}-panel/add-announcement?batchId=${batchId}`
          )
        }
        className="
          flex w-full sm:w-auto items-center justify-center gap-2
          rounded-xl sm:rounded-2xl
          bg-[#D6451B]
          px-4 py-3 sm:px-5
          text-white
          transition hover:opacity-90
        "
      >
        <FaPlus />
        Add Announcement
      </button>

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

                  {(announcement?.isPinned || announcement?.pinned) && (
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                      📌 Pinned
                    </span>
                  )}

                  {(() => {
                    const target = announcement?.targetType || announcement?.type || "batch";
                    const isSystem = target === "system" || target === "academy";
                    const isCourse = target === "course";
                    return (
                      <span
                        className={`
                          rounded-full px-3 py-1 text-xs font-semibold
                          ${
                            isSystem
                              ? "bg-purple-100 text-purple-700"
                              : isCourse
                              ? "bg-blue-100 text-blue-700"
                              : "bg-emerald-100 text-emerald-700"
                          }
                        `}
                      >
                        {isSystem ? "Entire Academy" : isCourse ? "Course-Wide" : "Batch"}
                      </span>
                    );
                  })()}

                  {announcement?.priority && announcement?.priority !== "normal" && (
                    <span
                      className={`
                        rounded-full px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider
                        ${
                          announcement.priority === "urgent"
                            ? "bg-rose-100 text-rose-700 border border-rose-200"
                            : announcement.priority === "high"
                            ? "bg-orange-100 text-orange-700 border border-orange-200"
                            : "bg-slate-100 text-slate-600"
                        }
                      `}
                    >
                      {announcement.priority}
                    </span>
                  )}

                  {announcement?.isPublished === false && (
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600 border border-slate-200">
                      Draft (Unpublished)
                    </span>
                  )}

                  <span className="text-xs text-slate-500">
                    {formatISTDateTime(
                      announcement?.publishAt || announcement?.createdAt
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
                        "Academy Admin"}
                      {announcement?.createdBy?.role && (
                        <span className="ml-1.5 text-xs font-normal text-slate-400 capitalize">
                          ({announcement.createdBy.role})
                        </span>
                      )}
                    </p>

                  </div>

                 <div className="flex gap-2">

                     {permissions.canEdit &&   <button
                      className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl bg-orange-50
                        text-[#D6451B]
                        transition hover:bg-orange-100
                      "
                    >
                      <FaEdit />
                    </button>}

                   {permissions.canDelete &&     <button
                      onClick={() =>
                        deleteAnnoucementMutation.mutate(
                          announcement._id
                        )
                      }
                      disabled={
                        deleteAnnoucementMutation.isPending
                      }
                      className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl bg-red-50
                        text-red-600
                        transition hover:bg-red-100
                      "
                    >
                      {deleteAnnoucementMutation.isPending &&
                      deleteAnnoucementMutation.variables ===
                        announcement._id ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaTrash />
                      )}
                    </button>}

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
)} { annoucementLoading && <AnnouncementsSkeleton></AnnouncementsSkeleton>}
{activeTab === "attendance" && (
  <div className="space-y-4 sm:space-y-6">

    {/* Header */}
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
          Attendance
        </h2>
        <p className="mt-0.5 text-xs sm:text-sm text-slate-500">
          Monitor attendance performance and manage daily records.
        </p>
      </div>

      <button
        onClick={() =>
          router.push(`/${user.role}-panel/mark-attendence?batchId=${batchId}`)
        }
        className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white shadow-xs hover:bg-[#bf3b14] transition shrink-0"
      >
        <FaPlus className="text-xs" />
        <span>Mark Attendance</span>
      </button>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4 w-full min-w-0">
      <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
        <p className="text-xs font-semibold text-slate-500">
          Total Classes
        </p>
        <h3 className="mt-1.5 text-xl sm:text-2xl font-extrabold text-slate-900">
          {attendance?.stats?.totalClasses || 0}
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Sessions recorded</p>
      </div>

      <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
        <p className="text-xs font-semibold text-slate-500">
          Average Attendance
        </p>
        <h3 className="mt-1.5 text-xl sm:text-2xl font-extrabold text-emerald-600">
          {attendance?.stats?.averageAttendance || "0%"}
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Overall presence</p>
      </div>

      <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
        <p className="text-xs font-semibold text-slate-500">
          Present Today
        </p>
        <h3 className="mt-1.5 text-xl sm:text-2xl font-extrabold text-emerald-600">
          {attendance?.stats?.todayPresent ?? 0}
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Students in class</p>
      </div>

      <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-4 shadow-xs">
        <p className="text-xs font-semibold text-slate-500">
          Absent Today
        </p>
        <h3 className="mt-1.5 text-xl sm:text-2xl font-extrabold text-rose-600">
          {attendance?.stats?.todayAbsent ?? 0}
        </h3>
        <p className="text-[11px] text-slate-400 mt-0.5">Missed today</p>
      </div>
    </div>

    {/* History */}
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      <div className="border-b border-slate-100 p-4 sm:p-5">
        <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
          Attendance History
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Previously recorded session registers
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {attendance?.attendanceHistory?.length > 0 ? (
          attendance.attendanceHistory.map((item) => (
            <div
              key={item._id}
              className="p-4 sm:p-5 hover:bg-slate-50/50 transition-colors"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                      {formatISTDateTime(item.date).split(",")[0]}
                    </h4>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                        item.percentage >= 90
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : item.percentage >= 75
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}
                    >
                      {item.percentage}%
                    </span>
                  </div>

                  <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      style={{
                        width: `${item.percentage}%`,
                      }}
                      className={`h-full rounded-full ${
                        item.percentage >= 75 ? "bg-emerald-500" : "bg-[#D6451B]"
                      }`}
                    />
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold">
                    <span className="text-emerald-700">
                      ✓ {item.present} Present
                    </span>
                    <span className="text-rose-700">
                      ✕ {item.absent} Absent
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 justify-end shrink-0">
                  {permissions.canEdit && (
                    <button
                      onClick={() => {
                        router.push(`/admin-panel/attendence?attendanceId=${item._id}`);
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-blue-50 px-3.5 py-2 text-xs font-bold text-blue-600 hover:bg-blue-100 transition shadow-xs cursor-pointer"
                      title="View attendance details"
                    >
                      <FaEye className="text-xs" />
                      <span>View</span>
                    </button>
                  )}

                  {permissions.canDelete && (
                    <button
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this attendance record?")) {
                          deleteAttendance.mutate(item._id);
                        }
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-600 hover:bg-rose-100 transition shadow-xs cursor-pointer"
                      title="Delete attendance record"
                    >
                      <FaTrash className="text-xs" />
                      <span>Delete</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center text-xs text-slate-400">
            No attendance records found for this cohort yet.
          </div>
        )}
      </div>
    </div>

    {/* Bottom Cards */}

    <div className="grid gap-6 lg:grid-cols-2 relative">
   
     

      <div className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-xs">

        <h3 className="font-bold">
          Attendance Insights
        </h3>

        <div className="mt-6 space-y-5">

          <div className="flex justify-between">
            <span>Total Classes</span>
            <strong>{attendance?.stats?.totalClasses}</strong>
          </div>


          <div className="flex justify-between">
            <span>Highest Attendance</span>
            <strong className="text-green-600">
            {attendance?.insights?.highestAttendance?.percentage}
            </strong>
          </div>

          <div className="flex justify-between">
            <span>Lowest Attendance</span>
            <strong className="text-red-600">
              {attendance?.insights?.lowestAttendance?.percentage}
            </strong>
          </div>

          <div className="flex justify-between">
            <span>Last Updated</span>
            <strong>
               {formatISTDateTime(attendance?.insights?.lastUpdated)}
            </strong>
          </div>

        </div>

      </div>

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

export function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="
        rounded-xl sm:rounded-2xl
        border border-slate-200
        bg-white
        p-3 sm:p-4
        shadow-xs
      "
    >
      <div
        className={`
          flex h-9 w-9 sm:h-11 sm:w-11 items-center
          justify-center rounded-2xl
          text-sm sm:text-lg ${color}
        `}
      >
        {icon}
      </div>

      <h2 className="mt-2.5 text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
        {value}
      </h2>

      <p className="mt-0.5 text-xs font-semibold text-slate-500 truncate">
        {title}
      </p>
    </motion.div>
  );
}