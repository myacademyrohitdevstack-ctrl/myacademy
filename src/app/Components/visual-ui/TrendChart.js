"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function CustomTrendTooltip({ active, payload, label, unit }) {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-xs text-xs">
        <p className="font-semibold text-slate-500 text-[11px]">{label}</p>
        <p className="mt-0.5 font-extrabold text-slate-900 text-sm">
          {unit}
          {Number(item.value).toLocaleString("en-IN")}
        </p>
      </div>
    );
  }
  return null;
}

export default function TrendChart({
  data = [],
  dataKey = "amount",
  xAxisKey = "date",
  height = 240,
  strokeColor = "#D6451B",
  fillGradientId = "colorTrend",
  unit = "₹",
  formatYAxis = (val) => `${val}`,
  curveType = "monotone",
  className = "",
  showGrid = true,
}) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-center text-xs text-slate-400">
        No trend data available for this range
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 12, left: -16, bottom: 0 }}
        >
          <defs>
            <linearGradient id={fillGradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={strokeColor} stopOpacity={0.35} />
              <stop offset="95%" stopColor={strokeColor} stopOpacity={0.0} />
            </linearGradient>
          </defs>

          {showGrid && (
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#F1F5F9"
            />
          )}

          <XAxis
            dataKey={xAxisKey}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#94A3B8", fontSize: 11, fontWeight: 500 }}
            dy={8}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            tick={{ fill: "#94A3B8", fontSize: 10, fontWeight: 500 }}
            tickFormatter={formatYAxis}
            dx={-4}
          />

          <Tooltip content={<CustomTrendTooltip unit={unit} />} />

          <Area
            type={curveType}
            dataKey={dataKey}
            stroke={strokeColor}
            strokeWidth={2.5}
            fillOpacity={1}
            fill={`url(#${fillGradientId})`}
            activeDot={{ r: 5, fill: strokeColor, stroke: "#FFFFFF", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
