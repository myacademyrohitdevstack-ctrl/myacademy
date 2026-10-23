"use client";

import Link from "next/link";
import { FaSearch, FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 text-[#D6451B]">
          <FaSearch className="text-2xl" />
        </div>
        <h2 className="mt-5 text-xl font-extrabold text-slate-900">
          Resource Not Found
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
          The page or resource you are looking for does not exist in your current academy account.
        </p>
        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#b93814] transition"
          >
            <FaHome className="text-xs" />
            <span>Return to Dashboard</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
