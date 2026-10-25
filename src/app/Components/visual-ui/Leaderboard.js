"use client";

import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";

export default function Leaderboard({
  items = [], // Array of { id, name, rank, score, sub, avatar, badge }
  title = "Academic Leaderboard",
  subtitle = "Top student performers",
  unit = "%",
  emptyMessage = "No leaderboard data available.",
  className = "",
}) {
  if (!items || items.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-slate-400">
        {emptyMessage}
      </div>
    );
  }

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100 text-amber-600 border border-amber-300 shadow-2xs font-black text-xs">
            <FaTrophy />
          </div>
        );
      case 2:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-slate-700 border border-slate-300 shadow-2xs font-black text-xs">
            <FaMedal />
          </div>
        );
      case 3:
        return (
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-700 border border-orange-300 shadow-2xs font-black text-xs">
            <FaAward />
          </div>
        );
      default:
        return (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-slate-500 font-bold text-xs">
            #{rank}
          </div>
        );
    }
  };

  return (
    <div className={`rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs ${className}`}>
      {(title || subtitle) && (
        <div className="pb-3 border-b border-slate-100 mb-3 flex items-center justify-between">
          <div>
            <h4 className="font-extrabold text-sm text-slate-900">{title}</h4>
            {subtitle && <p className="text-[11px] text-slate-500">{subtitle}</p>}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Top {items.length}
          </span>
        </div>
      )}

      <div className="space-y-2.5">
        {items.map((item, index) => {
          const rank = item.rank || index + 1;
          const score = Number(item.score) || 0;

          return (
            <div
              key={item.id || index}
              className="flex items-center justify-between gap-3 p-2.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-white hover:border-slate-200 hover:shadow-2xs transition-all min-w-0"
            >
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                {getRankBadge(rank)}

                {/* Avatar */}
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-100 text-[#D6451B] font-black text-xs border border-orange-200">
                  {item.avatar || item.name?.charAt(0) || "S"}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <p className="font-extrabold text-xs text-slate-900 truncate">
                      {item.name}
                    </p>
                    {item.badge && (
                      <span className="rounded-md bg-white border border-slate-200 px-1.5 py-0.2 text-[9px] font-bold text-slate-600">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.sub && (
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">
                      {item.sub}
                    </p>
                  )}
                </div>
              </div>

              {/* Score Indicator */}
              <div className="text-right shrink-0">
                <span className="font-black text-xs sm:text-sm text-slate-900">
                  {score}
                  {unit}
                </span>
                <div className="w-14 sm:w-18 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#D6451B] to-emerald-500 rounded-full"
                    style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
