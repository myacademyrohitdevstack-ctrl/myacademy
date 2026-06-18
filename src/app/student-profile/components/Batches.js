"use client";

import { motion } from "framer-motion";
import {
  FaUsers,
  FaUserTie,
  FaClock,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

const batches = [
  {
    id: 1,
    name: "Morning English Batch",
    trainer: "John Smith",
    timing: "9:00 AM - 10:30 AM",
    days: "Mon • Wed • Fri",
    room: "Classroom A",
    students: 18,
    attendance: "92%",
    status: "Active",
  },
  {
    id: 2,
    name: "IELTS Evening Batch",
    trainer: "Emma Johnson",
    timing: "6:00 PM - 7:30 PM",
    days: "Tue • Thu • Sat",
    room: "Classroom B",
    students: 22,
    attendance: "85%",
    status: "Upcoming",
  },
];

export default function Batches() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[32px] bg-gradient-to-r from-[#D6451B] to-orange-500 p-8 text-white shadow-xl"
      >
        <h1 className="text-4xl font-bold">
          My Batches
        </h1>

        <p className="mt-3 text-orange-100">
          View your assigned batches, trainers, schedules and attendance.
        </p>
      </motion.div>

      {/* Cards */}

      <div className="grid gap-6">

        {batches.map((batch, index) => (
          <motion.div
            key={batch.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg"
          >
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <h2 className="text-2xl font-bold">
                    {batch.name}
                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      batch.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-[#D6451B]"
                    }`}
                  >
                    {batch.status}
                  </span>

                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-3">

                  <Info
                    icon={<FaUserTie />}
                    title="Trainer"
                    value={batch.trainer}
                  />

                  <Info
                    icon={<FaClock />}
                    title="Timing"
                    value={batch.timing}
                  />

                  <Info
                    icon={<FaCalendarAlt />}
                    title="Days"
                    value={batch.days}
                  />

                  <Info
                    icon={<FaMapMarkerAlt />}
                    title="Classroom"
                    value={batch.room}
                  />

                  <Info
                    icon={<FaUsers />}
                    title="Students"
                    value={batch.students}
                  />

                  <Info
                    icon={<FaCheckCircle />}
                    title="Attendance"
                    value={batch.attendance}
                  />

                </div>

              </div>

              <button className="rounded-2xl bg-[#D6451B] px-6 py-3 font-medium text-white hover:opacity-90">
                View Batch
              </button>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}

function Info({ icon, title, value }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B]">
        {icon}
      </div>

      <div>

        <p className="text-sm text-slate-500">
          {title}
        </p>

        <h3 className="font-semibold">
          {value}
        </h3>

      </div>

    </div>
  );
}