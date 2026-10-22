"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaClock,
  FaHome,
  FaWhatsapp,
} from "react-icons/fa";
import SITE_CONFIG from "@/app/siteConfig";

export default function PendingApprovalPage() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 px-3 pt-20 pb-12 sm:px-6">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-orange-100/50 via-transparent to-transparent pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-lg"
      >
        <div className="rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-4 sm:p-8 shadow-lg">
          {/* Success Check Icon */}
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 sm:h-20 sm:w-20 sm:rounded-3xl">
              <FaCheckCircle className="text-3xl sm:text-4xl" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-center text-xl font-extrabold text-slate-900 sm:text-2xl lg:text-3xl">
            Academy Registration Submitted!
          </h1>

          <p className="mt-2 text-center text-xs sm:text-sm leading-relaxed text-slate-600">
            Your academy workspace has been created and is currently queued for
            verification by the MyAcademy platform administration.
          </p>

          {/* Timeline Process */}
          <div className="mt-6 rounded-xl sm:rounded-2xl border border-orange-100 bg-orange-50/60 p-3.5 sm:p-5">
            <div className="flex items-start gap-3 sm:gap-3.5">
              <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#D6451B] shadow-xs">
                <FaClock className="text-base sm:text-lg" />
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                  What happens next?
                </h3>

                <ul className="mt-2 space-y-1.5 text-xs leading-5 text-slate-600 font-medium">
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Platform team reviews your academy registration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Dedicated academy workspace and communication gateway provisioned</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Log in to your Admin Panel to add teachers, batches, and students</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Expedited Access Note */}
          <div className="mt-4 rounded-xl sm:rounded-2xl border border-slate-200 bg-slate-50 p-3 sm:p-4 text-center">
            <p className="text-xs leading-relaxed text-slate-500">
              Approval typically completes within{" "}
              <span className="font-bold text-slate-800">24 hours</span>.
              Need expedited approval for an upcoming batch?
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row">
            <Link
              href="/"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-[#D6451B] py-3 text-xs sm:text-sm font-bold text-white shadow-xs transition hover:bg-orange-700"
            >
              <FaHome />
              <span>Back to Home</span>
            </Link>

            <a
              href={`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=Hi,%20I%20have%20registered%20on%20the%20portal%20and%20would%20like%20to%20speed%20up%20my%20account%20approval.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl sm:rounded-2xl border border-emerald-300 bg-emerald-50 py-3 text-xs sm:text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
            >
              <FaWhatsapp className="text-base text-emerald-600" />
              <span>Contact Support</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
