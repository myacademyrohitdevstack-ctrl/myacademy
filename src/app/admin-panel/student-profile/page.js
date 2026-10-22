"use client";

import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserGraduate,
  FaCheckCircle,
  FaCalendarAlt,
  FaAward,
  FaMoneyBillWave,
} from "react-icons/fa";

const stats = [
  {
    title: "Attendance",
    value: "92%",
    icon: <FaCheckCircle />,
    color: "bg-green-50 text-green-600",
  },
  {
    title: "Course Progress",
    value: "78%",
    icon: <FaUserGraduate />,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Certificates",
    value: "3",
    icon: <FaAward />,
    color: "bg-orange-50 text-[#D6451B]",
  },
  {
    title: "Pending Fees",
    value: "₹4,000",
    icon: <FaMoneyBillWave />,
    color: "bg-red-50 text-red-600",
  },
];

export default function StudentProfile() {
  return (
    <div className="space-y-4 sm:space-y-6 max-w-7xl mx-auto py-2 sm:py-4 px-3 sm:px-6">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 p-4 sm:p-6 lg:p-8 text-white shadow-lg"
      >

        <div className="flex flex-wrap items-center justify-between gap-6">

          <div>

            <button className="mb-5 flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2">

              <FaArrowLeft />

              Back to Students

            </button>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              Student Profile
            </h1>

            <p className="mt-3 text-orange-100">
              Complete academic and personal information.
            </p>

          </div>

          <button className="flex items-center gap-2 rounded-2xl bg-white px-6 py-3 font-semibold text-[#D6451B]">

            <FaEdit />

            Edit Student

          </button>

        </div>

      </motion.div>

      {/* Profile Card */}

      <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm">

        <div className="flex flex-col gap-8 lg:flex-row">

          <img
            src="/student.jpg"
            alt="Student Avatar"
            className="h-20 w-20 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-orange-100"
          />

          <div className="flex-1">

            <div className="flex flex-wrap items-center gap-4">

              <h2 className="text-3xl font-bold">
                Anjali Sharma
              </h2>

              <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600">

                Active

              </span>

            </div>

            <p className="mt-3 text-slate-500">
              General English • Intermediate Level
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">

              <Info
                icon={<FaEnvelope />}
                label="Email"
                value="anjali@gmail.com"
              />

              <Info
                icon={<FaPhone />}
                label="Phone"
                value="+91 9876543210"
              />

              <Info
                icon={<FaCalendarAlt />}
                label="Joining"
                value="12 Jan 2026"
              />

              <Info
                icon={<FaMapMarkerAlt />}
                label="Location"
                value="Chandigarh"
              />

            </div>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 xl:grid-cols-4">

        {stats.map((item) => (

          <motion.div
            whileHover={{ y: -5 }}
            key={item.title}
            className="rounded-xl sm:rounded-2xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-sm"
          >

            <div className={`flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl text-base sm:text-xl ${item.color}`}>

              {item.icon}

            </div>

            <h2 className="mt-2 sm:mt-4 text-lg sm:text-2xl lg:text-3xl font-extrabold">
              {item.value}
            </h2>

            <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-slate-500 font-medium truncate">
              {item.title}
            </p>

          </motion.div>

        ))}

      </div>
            {/* Details */}

      <div className="grid gap-8 xl:grid-cols-[1fr_380px]">

        {/* Left */}

        <div className="space-y-8">

          {/* Personal Information */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm"
          >

            <h2 className="text-2xl font-bold">
              Personal Information
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <ProfileItem
                label="First Name"
                value="Anjali"
              />

              <ProfileItem
                label="Last Name"
                value="Sharma"
              />

              <ProfileItem
                label="Gender"
                value="Female"
              />

              <ProfileItem
                label="Date of Birth"
                value="12 May 2002"
              />

              <ProfileItem
                label="Blood Group"
                value="B+"
              />

              <ProfileItem
                label="Nationality"
                value="Indian"
              />

            </div>

          </motion.div>

          {/* Guardian Details */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm"
          >

            <h2 className="text-2xl font-bold">
              Guardian Information
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <ProfileItem
                label="Father Name"
                value="Rajesh Sharma"
              />

              <ProfileItem
                label="Mother Name"
                value="Sunita Sharma"
              />

              <ProfileItem
                label="Guardian Phone"
                value="+91 9876543210"
              />

              <ProfileItem
                label="Occupation"
                value="Business"
              />

            </div>

          </motion.div>

          {/* Address */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm"
          >

            <h2 className="text-2xl font-bold">
              Address
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <ProfileItem
                label="Country"
                value="India"
              />

              <ProfileItem
                label="State"
                value="Punjab"
              />

              <ProfileItem
                label="City"
                value="Chandigarh"
              />

              <ProfileItem
                label="Pincode"
                value="160001"
              />

            </div>

            <div className="mt-8 rounded-2xl bg-slate-50 p-5">

              <h3 className="font-semibold">
                Full Address
              </h3>

              <p className="mt-3 text-slate-600">
                House No. 215, Sector 34,
                Chandigarh, Punjab,
                India - 160001
              </p>

            </div>

          </motion.div>

        </div>

        {/* Right */}

        <div className="space-y-8">

          {/* Course */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm"
          >

            <h2 className="text-2xl font-bold">
              Course Details
            </h2>

            <div className="mt-8 space-y-5">

              <ProfileItem
                label="Course"
                value="General English"
              />

              <ProfileItem
                label="Level"
                value="Intermediate"
              />

              <ProfileItem
                label="Batch"
                value="Morning Batch"
              />

              <ProfileItem
                label="Trainer"
                value="John Smith"
              />

              <ProfileItem
                label="Joining Date"
                value="12 Jan 2026"
              />

              <ProfileItem
                label="Duration"
                value="6 Months"
              />

              <ProfileItem
                label="Expected Completion"
                value="12 Jul 2026"
              />

            </div>

          </motion.div>

          {/* Fee Summary */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm"
          >

            <h2 className="text-2xl font-bold">
              Fee Summary
            </h2>

            <div className="mt-8 space-y-4">

              <FeeRow
                title="Admission Fee"
                amount="₹1,000"
              />

              <FeeRow
                title="Course Fee"
                amount="₹18,000"
              />

              <FeeRow
                title="Discount"
                amount="- ₹2,000"
                green
              />

              <div className="border-t pt-4">

                <FeeRow
                  title="Total Paid"
                  amount="₹13,000"
                  green
                />

                <FeeRow
                  title="Pending"
                  amount="₹4,000"
                  red
                />

              </div>

            </div>

          </motion.div>

          {/* Documents */}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm"
          >

            <h2 className="text-2xl font-bold">
              Documents
            </h2>

            <div className="mt-6 space-y-4">

              {[
                "Student Photo",
                "Aadhar Card",
                "Certificate",
                "Signature",
              ].map((doc) => (

                <button
                  key={doc}
                  className="flex w-full items-center justify-between rounded-2xl border border-slate-200 p-4 transition hover:border-[#D6451B]"
                >

                  <span>{doc}</span>

                  <span className="text-[#D6451B]">
                    View
                  </span>

                </button>

              ))}

            </div>

          </motion.div>

        </div>

      </div>
            {/* Bottom Section */}

      <div className="grid gap-8 xl:grid-cols-2">

        {/* Attendance */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm"
        >
          <h2 className="text-2xl font-bold">
            Attendance History
          </h2>

          <div className="mt-8 space-y-4">

            {[
              ["18 Jun 2026", "Speaking Practice", "Present"],
              ["17 Jun 2026", "Grammar Workshop", "Present"],
              ["16 Jun 2026", "Business English", "Absent"],
              ["15 Jun 2026", "Conversation Class", "Present"],
              ["14 Jun 2026", "Listening Skills", "Present"],
            ].map(([date, cls, status]) => (

              <div
                key={date}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-5"
              >

                <div>

                  <h3 className="font-semibold">
                    {cls}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {date}
                  </p>

                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    status === "Present"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {status}
                </span>

              </div>

            ))}

          </div>

        </motion.div>

        {/* Payments */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm"
        >

          <h2 className="text-2xl font-bold">
            Payment History
          </h2>

          <div className="mt-8 space-y-4">

            {[
              ["Admission Fee", "₹1,000", "Paid"],
              ["Course Installment 1", "₹5,000", "Paid"],
              ["Course Installment 2", "₹7,000", "Paid"],
              ["Course Installment 3", "₹4,000", "Pending"],
            ].map(([title, amount, status]) => (

              <div
                key={title}
                className="flex items-center justify-between rounded-2xl border border-slate-200 p-5"
              >

                <div>

                  <h3 className="font-semibold">
                    {title}
                  </h3>

                  <p className="text-slate-500">
                    {amount}
                  </p>

                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    status === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {status}
                </span>

              </div>

            ))}

          </div>

        </motion.div>

      </div>

      {/* Certificates */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm"
      >

        <div className="flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Certificates
          </h2>

          <button className="rounded-xl bg-[#D6451B] px-5 py-2 text-white">
            Generate Certificate
          </button>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {[
            "Grammar Completion",
            "Speaking Excellence",
            "Intermediate English",
          ].map((certificate) => (

            <div
              key={certificate}
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-[#D6451B]"
            >

              <FaAward className="text-4xl text-[#D6451B]" />

              <h3 className="mt-5 font-semibold">
                {certificate}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Issued on 15 June 2026
              </p>

              <button className="mt-5 rounded-xl bg-orange-50 px-5 py-2 font-medium text-[#D6451B]">
                Download
              </button>

            </div>

          ))}

        </div>

      </motion.div>

      {/* Activity Timeline */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-sm"
      >

        <h2 className="text-2xl font-bold">
          Recent Activity
        </h2>

        <div className="mt-8 space-y-6">

          {[
            "Completed Speaking Practice class.",
            "Paid ₹5,000 course installment.",
            "Joined Morning Batch.",
            "Profile updated by Admin.",
            "Admission created.",
          ].map((activity, index) => (

            <div
              key={index}
              className="flex gap-5"
            >

              <div className="mt-1 h-4 w-4 rounded-full bg-[#D6451B]" />

              <div>

                <p className="font-medium">
                  {activity}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {index + 1} day{index > 0 && "s"} ago
                </p>

              </div>

            </div>

          ))}

        </div>

      </motion.div>

    </div>
  );
}

/* ---------- Components ---------- */

function Info({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-[#D6451B]">
        {icon}
      </div>

      <div>
        <p className="text-sm text-slate-500">
          {label}
        </p>

        <p className="font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <h3 className="mt-1 font-semibold text-slate-900">
        {value}
      </h3>
    </div>
  );
}

function FeeRow({ title, amount, green, red }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-slate-600">
        {title}
      </span>

      <span
        className={`font-bold ${
          green
            ? "text-green-600"
            : red
            ? "text-red-600"
            : "text-slate-900"
        }`}
      >
        {amount}
      </span>
    </div>
  );
}