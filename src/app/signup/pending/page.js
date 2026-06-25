"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaClock,
  FaHome,
  FaHeadset,
} from "react-icons/fa";

export default function PendingApprovalPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4 py-24 sm:px-6">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(214,69,27,0.08),transparent_55%)]" />

      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#D6451B]/5 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-orange-200/30 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative w-full max-w-lg"
      >
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-10">

          {/* Success */}
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 sm:h-24 sm:w-24">
              <FaCheckCircle className="text-4xl text-green-600 sm:text-5xl" />
            </div>
          </div>

          {/* Heading */}

          <h1 className="mt-6 text-center text-2xl font-bold text-slate-900 sm:text-4xl">
            Registration Successful
          </h1>

         

          <p className="mt-2 text-center text-sm leading-7 text-slate-500 sm:text-base">
            Your account has been created successfully and is currently waiting
            for approval from our administration team.
          </p>

          {/* Status */}

          <div className="mt-8 rounded-2xl border border-orange-100 bg-orange-50 p-5">

            <div className="flex items-start gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow">
                <FaClock className="text-xl text-[#D6451B]" />
              </div>

              <div>

                <h3 className="font-semibold text-slate-900">
                  What happens next?
                </h3>

                <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-600">

                  <li>✓ Our team reviews your registration.</li>

                  <li>✓ You'll receive an approval email.</li>

                  <li>✓ Login and start learning immediately.</li>

                </ul>

              </div>

            </div>

          </div>

          {/* Notice */}

          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">

            <p className="text-center text-sm leading-6 text-slate-500">
              Account approval generally takes
              <span className="font-semibold text-slate-800">
                {" "}within 24 hours.
              </span>

              <br className="hidden sm:block" />

              If you need urgent access, contact our support team.
            </p>

          </div>

          {/* Buttons */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <Link
              href="/"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#D6451B] py-3.5 font-medium text-white transition hover:opacity-90"
            >
              <FaHome />
              Back to Home
            </Link>

            <Link
              href="/contact"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-200 py-3.5 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <FaHeadset />
              Contact Support
            </Link>

          </div>

        </div>
      </motion.div>
    </section>
  );
}