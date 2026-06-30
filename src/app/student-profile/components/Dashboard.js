"use client";

import { useStudentsAllAnnouncements } from "@/Hooks/useStudentAllAnnoucements";
import { useStudentsAllClasses } from "@/Hooks/useStudentAllClasses";
import capitalizeFirstLetter from "@/Utils/captilizeFirstLetter";
import { formatISTDateTime } from "@/Utils/formatDate";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {

  FaFire,
  FaArrowRight,
  FaBullhorn,
  FaVideo,
  FaChalkboardTeacher,
  FaUsers,
  FaStickyNote,
  FaFilePdf,
  FaLock,
} from "react-icons/fa";
import { useStudentStatics } from "@/Hooks/useStudentsStatics";
import CommingSoon from "@/app/Components/ui/CommingSoon";
import DashboardSkeleton from "@/app/Skeletons/DashBoardSkeleton";


export default function Dashboard({user}) {
  const {data:announcements,isLoading:announcementsLoading}=useStudentsAllAnnouncements()
  const {data:classes,isLoading:classesLoading}=useStudentsAllClasses()
  const {data:statics,isLoading:staticsLoading}=useStudentStatics()
  const router=useRouter()
  
const stats = [
  {
    title: "Classes",
    value: statics?.classes || 0,
    icon: <FaChalkboardTeacher />,
  },
  {
    title: "Batches",
    value: statics?.batches || 0,
    icon: <FaUsers />,
  },
  {
    title: "Notes",
    value: statics?.notes || 0,
    icon: <FaStickyNote />,
  },
  {
    title: "PDF Resources",
    value: statics?.pdfs || 0,
    icon: <FaFilePdf />,
  },
];
if(announcementsLoading || classesLoading || staticsLoading) return <DashboardSkeleton></DashboardSkeleton>
  return (
  <div className="py-4 md:py-8 lg:py-10">
  <div className="mx-auto max-w-7xl space-y-4 px-3 sm:px-4 md:space-y-6 lg:space-y-8">

      {/* Hero */}
    <motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  className="
    rounded-3xl
    bg-gradient-to-r
    from-[#D6451B]
    to-[#ff855e]
    p-5
    sm:p-6
    lg:p-8
    text-white
    shadow-xl
  "
>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>
        <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
  Welcome Back, {capitalizeFirstLetter(user?.fullName)} 👋
</h1>
       

            <p className="mt-4 max-w-xl text-orange-100">
              Continue your English learning journey and achieve fluency with
              every lesson.
            </p>

            <Link href="/student-profile/batches" className="mt-8 w-fit flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-[#D6451B]">
              Resume Learning
              <FaArrowRight />
            </Link>
          </div>

          <div className="rounded-3xl bg-white/15 p-6 backdrop-blur">
            <p className="text-sm text-orange-100">
              Current Course
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              General English
            </h2>

            <p className="text-orange-100">
              Intermediate Level
            </p>

            <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/30">
              <div className="h-full w-[78%] rounded-full bg-white" />
            </div>

            <div className="mt-2 flex justify-between text-sm">
              <span>Progress</span>
              <span>78%</span>
            </div>
          </div>

        </div>
      </motion.div>

      {/* Stats */}
  <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">

        {stats.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -6 }}
className="
rounded-3xl
border
border-slate-200
bg-white
p-4
sm:p-5
lg:p-6
shadow-lg
"          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-xl text-[#D6451B]">
              {item.icon}
            </div>

           <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
  {item.value}
</h3>

            <p className="mt-2 text-slate-500">
              {item.title}
            </p>
          </motion.div>
        ))}

      </div>

      {/* Course + Classes */}
   <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">

        {/* Current Course */}
        <motion.div
          whileHover={{ y: -4 }}
className="
relative
rounded-3xl
border
border-slate-200
bg-white
p-5
sm:p-6
lg:p-8
shadow-lg
"        >
        <CommingSoon></CommingSoon>
          <h2 className="text-2xl font-bold">
            Current Course
          </h2>

          <p className="mt-2 text-slate-500">
            General English • Intermediate
          </p>

          <div className="mt-6 h-3 rounded-full bg-orange-100 overflow-hidden">
            <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-[#D6451B] to-orange-400" />
          </div>

          <div className="mt-6 flex justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Current Module
              </p>

              <h3 className="font-semibold">
                Module 8 / 10
              </h3>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Completion
              </p>

              <h3 className="font-semibold text-[#D6451B]">
                78%
              </h3>
            </div>
          </div>

          <button className="mt-8 rounded-2xl bg-[#D6451B] px-6 py-3 text-white hover:opacity-90">
            Continue Course
          </button>
        </motion.div>

        {/* Upcoming Classes */}
        <motion.div
          whileHover={{ y: -4 }}
          className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg"
        >
          <h2 className="text-2xl font-bold">
            Upcoming Classes
          </h2>
{classes?.length > 0 ? (
  <div className="mt-6 space-y-4">
    {classes.map((item) => (
      <div
        key={item._id}
        className="
          group
          rounded-3xl
          border border-slate-200
          bg-gradient-to-r
          from-white
          to-orange-50/30
          p-4 sm:p-5
          transition-all duration-300
          hover:-translate-y-1
          hover:border-[#D6451B]
          hover:shadow-lg
        "
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                Upcoming
              </span>
            </div>

            <h3 className="mt-2 truncate text-base font-bold text-slate-900 sm:text-lg">
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {formatISTDateTime(item.meetingDate)}
            </p>
          </div>

          <a
            href={item.meetingLink}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex w-full items-center justify-center gap-2
              rounded-2xl
              bg-[#D6451B]
              px-4 py-3
              font-medium text-white
              transition-all duration-300
              hover:opacity-90
              sm:w-auto
            "
          >
            <FaVideo />
            <span>Join Class</span>
          </a>

        </div>
      </div>
    ))}
  </div>
) : (
  <div
    className="
      mt-6
      rounded-3xl
      border border-dashed border-slate-200
      bg-slate-50
      py-12
      px-6
      text-center
    "
  >
    <div
      className="
        mx-auto
        flex h-16 w-16
        items-center justify-center
        rounded-2xl
        bg-orange-100
        text-[#D6451B]
      "
    >
      <FaVideo className="text-2xl" />
    </div>

    <h3 className="mt-4 text-lg font-semibold text-slate-800">
      No Upcoming Classes
    </h3>

    <p className="mt-2 text-sm text-slate-500 max-w-xs mx-auto">
      There are no scheduled classes right now. Check back later for new sessions.
    </p>
  </div>
)}
        </motion.div>

      </div>

      {/* Bottom */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Streak */}
      <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg relative overflow-hidden">

  {/* Coming Soon Overlay */}
<CommingSoon></CommingSoon>

  {/* Card Content */}
  <div className="flex items-center gap-4">
    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-2xl text-[#D6451B]">
      <FaFire />
    </div>

    <div>
      <h2 className="text-2xl font-bold">
        15 Day Streak 🔥
      </h2>

      <p className="text-slate-500">
        Keep learning every day.
      </p>
    </div>
  </div>

  <div className="mt-6 h-3 overflow-hidden rounded-full bg-orange-100">
    <div className="h-full w-4/5 bg-gradient-to-r from-[#D6451B] to-orange-400" />
  </div>

  <p className="mt-3 text-sm text-slate-500">
    Weekly Goal: 8 / 10 Lessons
  </p>
</div>

        {/* Announcements */}
     <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg">
<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">    <div>
      <h2 className="text-2xl font-bold">
        Latest Announcements
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Important updates from your academy
      </p>
    </div>

    <div className="rounded-2xl bg-orange-50 px-4 py-2 text-sm font-medium text-[#D6451B]">
      {announcements?.length || 0} Updates
    </div>
  </div>

  <div className="mt-6 space-y-4">
    {announcements?.length > 0 ? (
      announcements.map((item) => (
        <div
          key={item._id}
        className="
group
rounded-2xl
border
border-slate-200
bg-gradient-to-r
from-white
to-orange-50/30
p-4
sm:p-5
transition-all
duration-300
hover:border-[#D6451B]
hover:shadow-md
"
        >
          <div className="flex gap-4">
            <div
              className="
                flex h-12 w-12 shrink-0
                items-center justify-center
                rounded-2xl bg-orange-100
                text-[#D6451B]
              "
            >
              <FaBullhorn />
            </div>

            <div className="flex-1">
             <div className="flex flex-col gap-3 sm:flex-row">
                {item.pinned && (
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-700">
                    📌 Pinned
                  </span>
                )}

                <span className="text-xs text-slate-500">
                  {formatISTDateTime(item.createdAt)}
                </span>
              </div>

<h3 className="mt-1 text-base sm:text-lg font-semibold text-slate-900">                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                {item.message}
              </p>

              <div className="mt-3 text-xs text-slate-500">
                Posted by{" "}
                <span className="font-medium">
                  {item.createdBy?.fullName || "Admin"}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="flex flex-col items-center justify-center py-10">
        <FaBullhorn className="text-4xl text-slate-300" />

        <h3 className="mt-3 font-semibold text-slate-700">
          No Announcements
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          You're all caught up for now.
        </p>
      </div>
    )}
  </div>
</div>

      </div>

    </div></div>
  );
}