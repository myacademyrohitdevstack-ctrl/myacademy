"use client";

import { motion } from "framer-motion";

import { FaBookOpen } from "react-icons/fa";
import AddStudentForm from "./AddStudentForm";


export default function AddStudent() {
  return (
    <div className="py-24 ">
      {/* Hero */}
<div className="mx-auto max-w-6xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          rounded-[30px]
          bg-gradient-to-r
          from-[#D6451B]
          to-orange-500
          p-8
          text-white
          shadow-xl
        "
      >
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-white/20 p-4">
            <FaBookOpen className="text-3xl" />
          </div>

          <div>
            <h1 className="text-4xl font-bold">
              Add New Student
            </h1>

            <p className="mt-2 text-orange-100">
              Add a new Student for your academy.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="
          rounded-[30px]
          border
          border-slate-200
          bg-white
          p-8
          shadow-lg
        "
      >
       <AddStudentForm></AddStudentForm>
      </motion.div>
      </div>
    </div>
  );
}