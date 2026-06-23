"use client";

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

export default function BatchDetailsPage() {
    const searchParams=useSearchParams()
    const batchId=searchParams.get("batchId")
    const {data:notes,isLoading}=useAdminGetAllNotes(batchId)
    const {data:classLinks}=useAdminGetAllLinks(batchId)
  const {data:batch}=useAdminGetBatche(batchId)
  const {data:announcements}=useAnnouncementByBatchId(batchId)
    const [pdfOpen,setPdfOpen]=useState(false)
    const [pdfUrl,setPdfUrl]=useState("")
    const [activeTab, setActiveTab] = useState("notes");
    const router=useRouter()
    const deleteNoteMutation=usedeleteNotesMutation()
    const deleteClassLinkMutation=useDeleteClassLinkMutation()
    const deleteAnnoucementMutation=useDeleteAnnouncementtMutation()
 if(!batchId || isLoading) return 


  return (
    <div className="py-28">
    <div className="mx-auto max-w-7xl space-y-8 px-2 ">
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
      </div>

      {/* Tabs */}

      <div className="flex gap-3">
        <button
          onClick={() => setActiveTab("notes")}
          className={`
            rounded-2xl px-6 py-3 font-medium transition
            ${
              activeTab === "notes"
                ? "bg-[#D6451B] text-white"
                : "bg-white border border-slate-200"
            }
          `}
        >
          Notes
        </button>

        <button
          onClick={() => setActiveTab("links")}
          className={`
            rounded-2xl px-6 py-3 font-medium transition
            ${
              activeTab === "links"
                ? "bg-[#D6451B] text-white"
                : "bg-white border border-slate-200"
            }
          `}
        >
          Class Links
        </button>
        <button
  onClick={() => setActiveTab("announcements")}
  className={`
    rounded-2xl px-6 py-3 font-medium transition
    ${
      activeTab === "announcements"
        ? "bg-[#D6451B] text-white"
        : "bg-white border border-slate-200"
    }
  `}
>
  Announcements
</button>
      </div>

      {/* Notes */}

      {activeTab === "notes" && (
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                Notes
              </h2>

              <p className="mt-2 text-slate-500">
                Manage study materials for this
                batch
              </p>
            </div>

            <button
           onClick={()=>{router.push(`/admin-panel/add-notes?batchId=${batchId}`)}}
              className="
                flex items-center gap-2
                rounded-2xl
                bg-[#D6451B]
                px-5 py-3
                text-white
              "
            >
              <FaPlus />
              Add Note
            </button>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {notes.map((note) => (
            <div
  key={note._id}
  className="
    group overflow-hidden
    rounded-3xl border border-slate-200
    bg-white p-5 shadow-sm
    transition-all duration-300
    hover:-translate-y-1
    hover:border-[#D6451B]
    hover:shadow-xl
  "
>
  {/* Header */}

  <div className="flex items-start justify-between gap-4">

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

      <h3 className="mt-3 text-lg font-bold text-slate-900 line-clamp-2">
        {note?.title}
      </h3>

      <p className="mt-2 text-sm text-slate-500 line-clamp-3">
        {note?.description || "No description available"}
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
        onClick={() => {
          deleteNoteMutation.mutate(note._id);
        }}
        disabled={deleteNoteMutation.isPending}
        className="
          flex h-10 w-10 items-center justify-center
          rounded-xl bg-red-50
          text-red-600
          transition hover:bg-red-100
        "
      >
        {deleteNoteMutation.isPending &&
        deleteNoteMutation.variables === note._id ? (
          <FaSpinner className="animate-spin" />
        ) : (
          <FaTrash />
        )}
      </button>

    </div>

  </div>

  {/* File Info */}

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
          ? `${(note.file.size / 1024 / 1024).toFixed(2)} MB`
          : "-"}
      </p>
    </div>

  </div>

  {/* File Section */}

  <div
    className="
      mt-5 flex items-center justify-between
      rounded-2xl border border-slate-100
      bg-slate-50 p-4
    "
  >

    <div className="flex items-center gap-3 min-w-0">

      <div
        className="
          flex h-12 w-12 items-center justify-center
          rounded-2xl bg-red-100
        "
      >
        <FaFilePdf className="text-red-500 text-xl" />
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
        rounded-xl bg-blue-50
        px-4 py-2
        text-sm font-medium
        text-blue-600
        transition hover:bg-blue-100
      "
    >
      View
    </button>

  </div>
</div>
            ))}
          </div>
        </div>
      )}

      {/* Class Links */}

      {activeTab === "links" && (
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                Class Links
              </h2>

              <p className="mt-2 text-slate-500">
                Manage online meetings and
                recordings
              </p>
            </div>

            <button
             onClick={()=>{router.push(`/admin-panel/add-classLink?batchId=${batchId}`)}}
              className="
                flex items-center gap-2
                rounded-2xl
                bg-[#D6451B]
                px-5 py-3
                text-white
              "
            >
              <FaPlus />
              Add Link
            </button>
          </div>

          <div className="mt-8 space-y-5">
            {classLinks?.map((link) => (
             <div
  key={link._id}
  className="
    rounded-3xl
    border border-slate-200
    bg-white
    p-5
    shadow-sm
    transition-all
    hover:border-[#D6451B]
    hover:shadow-lg
  "
>
  {/* Header */}

  <div className="flex items-start justify-between gap-4">

    <div className="min-w-0 flex-1">

      <div className="flex flex-wrap items-center gap-2">

        <span
          className="
            rounded-full
            bg-orange-100
            px-3 py-1
            text-xs
            font-semibold
            text-[#D6451B]
          "
        >
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

      <h3 className="mt-3 text-lg font-bold text-slate-900">
        {link.title}
      </h3>

      <p className="mt-2 line-clamp-2 text-sm text-slate-500 min-h-[40px]">
        {link.description || "No description provided"}
      </p>

    </div>

    <div className="flex gap-2">

      <button
        className="
          rounded-xl
          bg-orange-50
          p-3
          text-[#D6451B]
          transition
          hover:bg-orange-100
        "
      >
        <FaEdit />
      </button>

      <button
        onClick={() =>
          deleteClassLinkMutation.mutate(link._id)
        }
        disabled={deleteClassLinkMutation.isPending}
        className="
          rounded-xl
          bg-red-50
          p-3
          text-red-600
          transition
          hover:bg-red-100
        "
      >
        {deleteClassLinkMutation.isPending &&
        deleteClassLinkMutation.variables ===
          link._id ? (
          <FaSpinner className="animate-spin" />
        ) : (
          <FaTrash />
        )}
      </button>

    </div>

  </div>

  {/* Info Section */}

  <div className="mt-5 grid grid-cols-2 gap-3">

    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-xs text-slate-500">
        Meeting Date
      </p>

      <p className="mt-1 text-sm font-semibold">
        {formatISTDateTime(link.meetingDate)}
      </p>
    </div>

    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-xs text-slate-500">
        Platform
      </p>

      <p className="mt-1 text-sm font-semibold capitalize">
        {link.platform}
      </p>
    </div>

    <div className="rounded-2xl bg-slate-50 p-3">
      <p className="text-xs text-slate-500">
        Duration
      </p>

      <p className="mt-1 text-sm font-semibold">
        {link.durationMinutes} min
      </p>
    </div>

    <div className="rounded-2xl bg-slate-50 p-3">
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

  <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-200 pt-5">

    <a
      href={link.meetingLink}
      target="_blank"
      rel="noopener noreferrer"
      className="
        flex items-center gap-2
        rounded-xl
        bg-green-50
        px-4 py-3
        text-sm font-medium
        text-green-700
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
          flex items-center gap-2
          rounded-xl
          bg-blue-50
          px-4 py-3
          text-sm font-medium
          text-blue-700
        "
      >
        🎥 Recording
      </a>
    )}

  </div>
</div>
            ))}
          </div>
        </div>
      )}
{activeTab === "announcements" && (
  <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold">
          Announcements
        </h2>

        <p className="mt-2 text-slate-500">
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
          flex items-center gap-2
          rounded-2xl
          bg-[#D6451B]
          px-5 py-3
          text-white
          transition
          hover:opacity-90
        "
      >
        <FaPlus />
        Add Announcement
      </button>
    </div>

    {announcements?.length > 0 ? (
      <div className="mt-8 space-y-4">
        {announcements?.map((announcement) => (
          <div
            key={announcement._id}
            className="
              group relative overflow-hidden
              rounded-3xl border border-slate-200
              bg-white p-5 shadow-sm
              transition-all duration-300
              hover:border-[#D6451B]
              hover:shadow-lg
            "
          >
            {/* Left Accent */}
            <div className="absolute left-0 top-0 h-full w-1 bg-[#D6451B]" />

            <div className="flex gap-4">
              {/* Icon */}
              <div
                className="
                  flex h-14 w-14 shrink-0
                  items-center justify-center
                  rounded-2xl bg-orange-100
                  text-[#D6451B]
                "
              >
                <FaBullhorn className="text-xl" />
              </div>

              {/* Content */}
              <div className="flex-1">
                {/* Top Row */}
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
                <h3 className="mt-3 text-xl font-bold text-slate-900">
                  {announcement?.title}
                </h3>

                {/* Message */}
                <p className="mt-3 whitespace-pre-wrap leading-relaxed text-slate-600">
                  {announcement?.message}
                </p>

                {/* Footer */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-500">
                      Posted By
                    </p>

                    <p className="font-medium text-slate-700">
                      {announcement?.createdBy
                        ?.fullName || "Admin"}
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
      <div className="flex flex-col items-center justify-center py-16">
        <div
          className="
            flex h-20 w-20 items-center justify-center
            rounded-full bg-orange-100
          "
        >
          <FaBullhorn className="text-3xl text-[#D6451B]" />
        </div>

        <h3 className="mt-5 text-xl font-semibold text-slate-700">
          No Announcements Yet
        </h3>

        <p className="mt-2 text-center text-slate-500">
          Create your first announcement to notify students.
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

function StatCard({
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