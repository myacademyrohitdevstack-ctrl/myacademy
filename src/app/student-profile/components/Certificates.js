"use client";

import { motion } from "framer-motion";
import {
  FaAward,
  FaDownload,
  FaEye,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

const certificates = [
  {
    id: 1,
    course: "General English",
    level: "Intermediate",
    issued: "15 June 2026",
    certificateNo: "IMA-2026-0001",
    instructor: "John Smith",
    status: "Issued",
  },
  {
    id: 2,
    course: "Business English",
    level: "Advanced",
    issued: "02 April 2026",
    certificateNo: "IMA-2026-0002",
    instructor: "Emma Johnson",
    status: "Issued",
  },
];

export default function Certificates() {
  return (
    <div className="space-y-8">

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[32px] bg-gradient-to-r from-[#D6451B] to-orange-500 p-8 text-white shadow-xl"
      >
        <div className="flex items-center gap-5">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
            <FaAward className="text-3xl" />
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              My Certificates
            </h1>

            <p className="mt-2 text-orange-100">
              View, preview and download your course completion certificates.
            </p>

          </div>

        </div>
      </motion.div>

      {/* Certificates */}

      <div className="grid gap-8 lg:grid-cols-2">

        {certificates.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-lg"
          >

            {/* Top */}
            <div className="bg-gradient-to-r from-[#D6451B] to-orange-500 p-8 text-white">

              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.course}
                  </h2>

                  <p className="mt-2 text-orange-100">
                    {item.level}
                  </p>

                </div>

                <FaAward className="text-5xl opacity-30" />

              </div>

            </div>

            {/* Body */}

            <div className="space-y-5 p-8">

              <Info
                icon={<FaCalendarAlt />}
                label="Issue Date"
                value={item.issued}
              />

              <Info
                icon={<FaCheckCircle />}
                label="Instructor"
                value={item.instructor}
              />

              <Info
                icon={<FaAward />}
                label="Certificate No."
                value={item.certificateNo}
              />

              <div className="rounded-2xl bg-green-50 p-4">

                <span className="rounded-full bg-green-600 px-3 py-1 text-sm text-white">
                  {item.status}
                </span>

              </div>

              <div className="flex gap-4 pt-2">

                <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 py-3 hover:bg-slate-50">
                  <FaEye />
                  Preview
                </button>

                <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#D6451B] py-3 text-white hover:opacity-90">
                  <FaDownload />
                  Download
                </button>

              </div>

            </div>

          </motion.div>
        ))}

      </div>

    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B]">
        {icon}
      </div>

      <div>

        <p className="text-sm text-slate-500">
          {label}
        </p>

        <h3 className="font-semibold text-slate-900">
          {value}
        </h3>

      </div>

    </div>
  );
}