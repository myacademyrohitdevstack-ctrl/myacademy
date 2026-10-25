"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { FaArrowUp, FaArrowDown, FaMinus } from "react-icons/fa";

export default function StatCard({
  title,
  value,
  subText,
  icon: Icon,
  trend,
  trendLabel = "vs last period",
  trendDirection = "up", // 'up' | 'down' | 'neutral'
  color = "orange", // 'orange' | 'emerald' | 'amber' | 'blue' | 'purple' | 'rose'
  sparklineData = null,
  onClick,
  className = "",
  loading = false,
  prefix = "",
  suffix = "",
}) {
  const colorMap = {
    orange: {
      bg: "bg-orange-50",
      text: "text-[#D6451B]",
      border: "border-orange-100",
      accent: "#D6451B",
      pill: "bg-orange-50 text-[#D6451B] border-orange-200/80",
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-100",
      accent: "#10B981",
      pill: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-100",
      accent: "#F59E0B",
      pill: "bg-amber-50 text-amber-700 border-amber-200/80",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-100",
      accent: "#3B82F6",
      pill: "bg-blue-50 text-blue-700 border-blue-200/80",
    },
    purple: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-100",
      accent: "#8B5CF6",
      pill: "bg-purple-50 text-purple-700 border-purple-200/80",
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-100",
      accent: "#F43F5E",
      pill: "bg-rose-50 text-rose-700 border-rose-200/80",
    },
  };

  const scheme = colorMap[color] || colorMap.orange;

  // Determine numeric vs string value for animated counter
  const isNumeric = typeof value === "number" || (!isNaN(Number(value)) && value !== "" && value !== null && value !== undefined);
  const numericVal = isNumeric ? Number(value) : 0;

  return (
    <motion.div
      whileHover={onClick ? { y: -3 } : { y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 truncate">
            {title}
          </p>
          <div className="mt-1.5 flex items-baseline gap-1">
            {loading ? (
              <div className="h-8 w-24 rounded-lg bg-slate-200 animate-pulse" />
            ) : (
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight truncate">
                {prefix}
                {isNumeric ? (
                  <CountUp end={numericVal} duration={1.2} separator="," decimals={numericVal % 1 !== 0 ? 1 : 0} />
                ) : (
                  value ?? "—"
                )}
                {suffix}
              </h3>
            )}
          </div>
        </div>

        {Icon && (
          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border ${scheme.bg} ${scheme.text} ${scheme.border} text-lg shadow-2xs`}
          >
            {typeof Icon === "function" ? <Icon /> : Icon}
          </div>
        )}
      </div>

      {/* Footer / Trend Strip */}
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          {trend ? (
            <span
              className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-extrabold border ${
                trendDirection === "up"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : trendDirection === "down"
                  ? "bg-rose-50 text-rose-700 border-rose-200"
                  : "bg-slate-50 text-slate-600 border-slate-200"
              }`}
            >
              {trendDirection === "up" ? (
                <FaArrowUp className="text-[9px]" />
              ) : trendDirection === "down" ? (
                <FaArrowDown className="text-[9px]" />
              ) : (
                <FaMinus className="text-[8px]" />
              )}
              <span>{trend}</span>
            </span>
          ) : null}

          <span className="text-[11px] font-medium text-slate-400 truncate">
            {subText || trendLabel}
          </span>
        </div>

        {/* Optional mini sparkline SVG */}
        {sparklineData && sparklineData.length >= 2 && (
          <div className="shrink-0 w-16 h-6">
            <svg viewBox="0 0 64 24" className="w-full h-full overflow-visible">
              <path
                d={generateSparklinePath(sparklineData, 64, 24)}
                fill="none"
                stroke={scheme.accent}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function generateSparklinePath(data, width, height) {
  if (!data || data.length < 2) return "";
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const padding = 2;
  const usableHeight = height - padding * 2;

  const points = data.map((val, idx) => {
    const x = Math.round(idx * step);
    const y = Math.round(height - padding - ((val - min) / range) * usableHeight);
    return `${x},${y}`;
  });

  return `M ${points.join(" L ")}`;
}
