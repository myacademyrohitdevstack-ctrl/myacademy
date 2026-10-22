import React from "react";
import { FaLock } from "react-icons/fa";

export default function CommingSoon() {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-[3px] bg-white/70 rounded-3xl">
      <div className="flex flex-col items-center gap-3 p-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-[#D6451B] text-white shadow-lg">
          <FaLock className="text-xl" />
        </div>

        <div className="rounded-full border border-orange-200 bg-white px-4 py-1.5 shadow-sm">
          <span className="bg-gradient-to-r from-orange-500 to-[#D6451B] bg-clip-text text-xs font-bold text-transparent uppercase tracking-wider">
            Coming Soon
          </span>
        </div>

        <p className="max-w-[220px] text-center text-xs sm:text-sm text-slate-600 font-medium">
          We&apos;re preparing this feature for your academy portal.
        </p>
      </div>
    </div>
  );
}
