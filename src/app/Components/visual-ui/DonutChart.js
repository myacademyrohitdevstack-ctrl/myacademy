"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const DEFAULT_COLORS = [
  "#D6451B", // Brand Orange
  "#10B981", // Emerald
  "#3B82F6", // Blue
  "#F59E0B", // Amber
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#64748B", // Slate
];

function CustomDonutTooltip({ active, payload, total, unit }) {
  if (active && payload && payload.length) {
    const item = payload[0];
    const val = item.value;
    const pct = total > 0 ? Math.round((val / total) * 100) : 0;
    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-xs text-xs">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: item.payload.fill || item.color }}
          />
          <span className="font-bold text-slate-800">{item.name}</span>
        </div>
        <p className="mt-1 text-slate-600 font-extrabold text-sm">
          {unit}
          {val.toLocaleString("en-IN")}
          <span className="ml-1 text-[11px] font-medium text-slate-400">
            ({pct}%)
          </span>
        </p>
      </div>
    );
  }
  return null;
}

export default function DonutChart({
  data = [],
  nameKey = "name",
  valueKey = "value",
  colors = DEFAULT_COLORS,
  height = 240,
  innerRadius = 55,
  outerRadius = 80,
  centerValue = "",
  centerLabel = "",
  showLegend = true,
  unit = "",
  className = "",
}) {
  const filteredData = (data || []).filter((item) => Number(item[valueKey]) > 0);
  const total = filteredData.reduce((acc, curr) => acc + (Number(curr[valueKey]) || 0), 0);

  if (!filteredData || filteredData.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-center text-xs text-slate-400">
        No distribution data to display
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="relative" style={{ width: "100%", height }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomDonutTooltip total={total} unit={unit} />} />
            <Pie
              data={filteredData}
              dataKey={valueKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              innerRadius={innerRadius}
              outerRadius={outerRadius}
              paddingAngle={filteredData.length > 1 ? 3 : 0}
              stroke="#FFFFFF"
              strokeWidth={2}
            >
              {filteredData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color || colors[index % colors.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* Center Text in Donut */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-tight">
            {centerValue !== "" ? centerValue : total.toLocaleString("en-IN")}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {centerLabel || "Total"}
          </span>
        </div>
      </div>

      {/* Visual Legend with pills & percentages */}
      {showLegend && (
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
          {filteredData.map((item, idx) => {
            const val = Number(item[valueKey]) || 0;
            const pct = total > 0 ? Math.round((val / total) * 100) : 0;
            const swatchColor = item.color || colors[idx % colors.length];

            return (
              <div
                key={item[nameKey] || idx}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-2.5 py-1.5 min-w-0"
              >
                <div className="flex items-center gap-1.5 min-w-0 flex-1 pr-1">
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: swatchColor }}
                  />
                  <span className="font-semibold text-slate-700 text-[11px] truncate">
                    {item[nameKey]}
                  </span>
                </div>
                <div className="shrink-0 text-right">
                  <span className="font-extrabold text-slate-900 text-xs">
                    {val.toLocaleString("en-IN")}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1">
                    {pct}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
