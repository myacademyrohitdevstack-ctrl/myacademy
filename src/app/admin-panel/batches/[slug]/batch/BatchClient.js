"use client";
import { FaClipboardCheck } from "react-icons/fa";
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
} from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useAdminGetAllNotes } from "@/Hooks/useAdminGetNotes";
import Modal from "@/app/Components/ui/Modals";
import PdfViewer from "@/Utils/pdfViewer";
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

export default function BatchDetailsPage() {
    const searchParams=useSearchParams()
    const batchId=searchParams.get("batchId")
       const [activeTab, setActiveTab] = useState("notes");
    const {data:notes,isLoading:notesLoading}=useAdminGetAllNotes(batchId,activeTab)
    const {data:classLinks,isLoading:classLoading}=useAdminGetAllLinks(batchId,activeTab)
  const {data:batch,isLoading:batchLoading}=useAdminGetBatche(batchId)
  const {data:announcements,isLoading:annoucementLoading}=useAnnouncementByBatchId(batchId,activeTab)
    const [pdfOpen,setPdfOpen]=useState(false)
    const [pdfUrl,setPdfUrl]=useState("")
    const {data:attendance}=useGetAttendenceDashboard(batchId)
 
    const router=useRouter()
    const deleteNoteMutation=usedeleteNotesMutation()
    const deleteClassLinkMutation=useDeleteClassLinkMutation()
    const deleteAnnoucementMutation=useDeleteAnnouncementtMutation()
 if(batchLoading) return <Loading></Loading> 

  return (
    <div className="py-28">
<div className="mx-auto max-w-7xl space-y-6 px-4  sm:px-6 lg:px-8">
      {/* Hero */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="
          rounded-[32px]
          bg-gradient-to-r
          from-[#D6451B]
          to-orange-500
          p-8
          text-white
          shadow-xl
        "
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
              Batch Details
            </span>

            <h1 className="mt-5 text-4xl font-bold">
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

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      

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

 
  <div className="rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm">
   <div className="grid  grid-cols-4 gap-1">

      <button
        onClick={() => setActiveTab("notes")}
        className={`flex  items-center justify-center gap-1 rounded-xl py-3 text-xs font-semibold transition-all sm:flex-row sm:text-sm ${
          activeTab === "notes"
            ? "bg-[#D6451B] text-white shadow-md"
            : "text-slate-600 hover:bg-slate-50"
        }`}
      >
        <FaBookOpen className="text-sm" />
        <span>Notes</span>
      </button>

      <button
        onClick={() => setActiveTab("links")}
        className={`flex  items-center justify-center gap-1 rounded-xl py-3 text-xs font-semibold transition-all sm:flex-row sm:text-sm ${
          activeTab === "links"
            ? "bg-[#D6451B] text-white shadow-md"
            : "text-slate-600 hover:bg-slate-50"
        }`}
      >
        <FaLink className="text-sm" />
        <span>Links</span>
      </button>

      <button
        onClick={() => setActiveTab("announcements")}
        className={`flex  items-center justify-center gap-1 rounded-xl py-3 text-xs font-semibold transition-all sm:flex-row sm:text-sm ${
          activeTab === "announcements"
            ? "bg-[#D6451B] text-white shadow-md"
            : "text-slate-600 hover:bg-slate-50"
        }`}
      >
        <FaBullhorn className="text-sm" />
        <span>Updates</span>
      </button>
<button
  onClick={() => setActiveTab("attendance")}
  className={`flex  items-center justify-center gap-1 rounded-xl py-3 text-xs font-semibold transition-all sm:flex-row sm:text-sm ${
    activeTab === "attendance"
      ? "bg-[#D6451B] text-white shadow-md"
      : "text-slate-600 hover:bg-slate-50"
  }`}
>
  <FaClipboardCheck className="text-sm" />
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
            `/admin-panel/add-notes?batchId=${batchId}`
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

            {/* Actions */}

            <div className="flex shrink-0 gap-2">

              <button
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-xl bg-orange-50
                  text-[#D6451B]
                  hover:bg-orange-100
                "
              >
                <FaEdit />
              </button>

              <button
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
              </button>

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
            `/admin-panel/add-classLink?batchId=${batchId}`
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

              <button
                className="
                  flex items-center justify-center gap-2
                  rounded-xl bg-orange-50 py-3
                  text-[#D6451B]
                  transition hover:bg-orange-100
                "
              >
                <FaEdit />
                Edit
              </button>

              <button
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
              </button>

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
            `/admin-panel/add-announcement?batchId=${batchId}`
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

                  <div className="flex gap-2">

                    <button
                      className="
                        flex h-10 w-10 items-center justify-center
                        rounded-xl bg-orange-50
                        text-[#D6451B]
                        transition hover:bg-orange-100
                      "
                    >
                      <FaEdit />
                    </button>

                    <button
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
                    </button>

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
  <div className="space-y-6">

    {/* Header */}

    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-2xl font-bold">
          Attendance
        </h2>

        <p className="mt-1 text-slate-500">
          Monitor attendance performance and manage daily records.
        </p>
      </div>

      <button
        onClick={() =>
          router.push(`/admin-panel/mark-attendence?batchId=${batchId}`)
        }
        className="flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] px-5 py-3 text-white"
      >
        <FaPlus />
        Mark Attendance
      </button>
    </div>

    {/* Stats */}

    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

      <div className="rounded-3xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Total Classes
        </p>

        <h3 className="mt-2 text-3xl font-bold">
          {attendance?.stats?.totalClasses}
        </h3>
      </div>

      <div className="rounded-3xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Average Attendance
        </p>

        <h3 className="mt-2 text-3xl font-bold text-green-600">
       {attendance?.stats?.averageAttendance}
        </h3>
      </div>

      <div className="rounded-3xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Present Today
        </p>

        <h3 className="mt-2 text-3xl font-bold text-green-600">
          {attendance?.stats?.todayPresent}
        </h3>
      </div>

      <div className="rounded-3xl border bg-white p-5 shadow-sm">
        <p className="text-sm text-slate-500">
          Absent Today
        </p>

        <h3 className="mt-2 text-3xl font-bold text-red-600">
         {attendance?.stats?.todayAbsent}
        </h3>
      </div>

    </div>

    {/* History */}

    <div className="rounded-3xl border bg-white shadow-sm">

      <div className="border-b p-6">
        <h3 className="text-xl font-bold">
          Attendance History
        </h3>
      </div>

      <div className="divide-y">

        {attendance?.attendanceHistory?.map((item) => (
          <div
            key={item._id}
            className="p-5"
          >

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

              <div className="flex-1">

                <div className="flex items-center justify-between">

                  <h4 className="font-semibold">
                    {formatISTDateTime(item.date).split(",")[0]}
                  </h4>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.percentage >= 90
                        ? "bg-green-100 text-green-700"
                        : item.percentage >= 75
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.percentage}%
                  </span>

                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">

                  <div
                    style={{
                      width: `${item.percentage}%`,
                    }}
                    className="h-full rounded-full bg-[#D6451B]"
                  />

                </div>

                <div className="mt-4 flex gap-6 text-sm">

                  <span className="text-green-600">
                    ✅ {item.present} Present
                  </span>

                  <span className="text-red-600">
                    ❌ {item.absent} Absent
                  </span>

                </div>

              </div>

              <div className="flex gap-3">

                <button
                  className="rounded-xl bg-blue-50 px-4 py-2 text-blue-600"
                >
                  View
                </button>

                <button
                  className="rounded-xl bg-orange-50 px-4 py-2 text-[#D6451B]"
                >
                  Edit
                </button>

              </div>

            </div>

          </div>
        ))}

      </div>

    </div>

    {/* Bottom Cards */}

    <div className="grid gap-6 lg:grid-cols-2">

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

        <h3 className="font-bold">
          Recent Absentees
        </h3>

        <div className="mt-5 space-y-4">

          {attendance?.recentAbsentees?.map((student) => (

            <div
              key={student}
              className="flex items-center justify-between"
            >

              <div>
                <p className="font-medium">
                  {student}
                </p>

                <p className="text-sm text-slate-500">
                  26 Jun 2026
                </p>
              </div>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
                Absent
              </span>

            </div>

          ))}

        </div>

      </div>

      <div className="rounded-3xl border bg-white p-6 shadow-sm">

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
        rounded-[30px]
        border border-slate-200
        bg-white
        p-6
        shadow-lg
      "
    >
      <div
        className={`
          flex h-14 w-14 items-center
          justify-center rounded-2xl
          text-2xl ${color}
        `}
      >
        {icon}
      </div>

      <h2 className="mt-6 text-4xl font-bold">
        {value}
      </h2>

      <p className="mt-2 text-slate-500">
        {title}
      </p>
    </motion.div>
  );
}