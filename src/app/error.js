"use client";

import { useEffect } from "react";
import { FaExclamationTriangle, FaRedo, FaHome } from "react-icons/fa";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error("Unhandled client error captured by error boundary:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
          <FaExclamationTriangle className="text-2xl" />
        </div>
        <h2 className="mt-5 text-xl font-extrabold text-slate-900">
          Unable to Load This Page
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
          {error?.message && !error.message.includes("digest")
            ? error.message
            : "The requested resource could not be loaded, or you may be trying to access an item from another academy account."}
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] px-5 py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-[#b93814] transition cursor-pointer"
          >
            <FaRedo className="text-xs" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            <FaHome className="text-xs" />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
