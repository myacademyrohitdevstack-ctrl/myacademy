"use client";

import { motion } from "framer-motion";

export default function ProgressRing({
  percentage = 0,
  size = 110,
  strokeWidth = 9,
  targetPercentage = null,
  colorScheme = "auto", // 'auto' (green/amber/red based on 75) | 'orange' | 'emerald' | 'blue' | 'purple'
  label = "",
  centerSub = "",
  showPercentage = true,
  className = "",
}) {
  const safePercent = Math.min(100, Math.max(0, Math.round(Number(percentage) || 0)));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (safePercent / 100) * circumference;

  let strokeColor = "#D6451B";
  let trackColor = "#F1F5F9";
  let textColor = "text-slate-900";

  if (colorScheme === "auto") {
    if (safePercent >= 75) {
      strokeColor = "#10B981"; // emerald
      textColor = "text-emerald-700";
    } else if (safePercent >= 60) {
      strokeColor = "#F59E0B"; // amber
      textColor = "text-amber-700";
    } else {
      strokeColor = "#F43F5E"; // rose
      textColor = "text-rose-600";
    }
  } else if (colorScheme === "emerald") {
    strokeColor = "#10B981";
    textColor = "text-emerald-700";
  } else if (colorScheme === "blue") {
    strokeColor = "#3B82F6";
    textColor = "text-blue-600";
  } else if (colorScheme === "purple") {
    strokeColor = "#8B5CF6";
    textColor = "text-purple-600";
  } else {
    strokeColor = "#D6451B";
    textColor = "text-[#D6451B]";
  }

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="rotate-[-90deg] overflow-visible"
        >
          {/* Background Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />

          {/* Animated Progress Stroke */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="transparent"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />

          {/* Optional Benchmark marker (e.g. 75%) */}
          {targetPercentage !== null && (
            <circle
              cx={
                size / 2 +
                radius * Math.cos(((targetPercentage * 3.6 - 90) * Math.PI) / 180)
              }
              cy={
                size / 2 +
                radius * Math.sin(((targetPercentage * 3.6 - 90) * Math.PI) / 180)
              }
              r={strokeWidth / 2 + 1}
              fill="#0F172A"
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          )}
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
          {showPercentage ? (
            <>
              <span className={`font-black tracking-tight text-lg sm:text-xl ${textColor}`}>
                {safePercent}%
              </span>
              {centerSub && (
                <span className="text-[10px] font-semibold text-slate-400 -mt-0.5 max-w-[80%] truncate">
                  {centerSub}
                </span>
              )}
            </>
          ) : (
            centerSub && (
              <span className="text-xs font-bold text-slate-700">{centerSub}</span>
            )
          )}
        </div>
      </div>

      {label && (
        <span className="mt-2 text-xs font-bold text-slate-700 text-center">
          {label}
        </span>
      )}
    </div>
  );
}
