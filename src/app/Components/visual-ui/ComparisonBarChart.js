"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function CustomBarTooltip({ active, payload, label, unit }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white/95 px-3 py-2 shadow-lg backdrop-blur-xs text-xs space-y-1">
        <p className="font-bold text-slate-700 text-xs">{label}</p>
        {payload.map((entry, idx) => (
          <div key={idx} className="flex items-center justify-between gap-3 text-xs">
            <span className="flex items-center gap-1.5 text-slate-600">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span>{entry.name}:</span>
            </span>
            <span className="font-extrabold text-slate-900">
              {unit}
              {Number(entry.value).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function ComparisonBarChart({
  data = [],
  xAxisKey = "label",
  bars = [
    { key: "value", name: "Value", color: "#D6451B" },
  ],
  height = 250,
  unit = "",
  formatYAxis = (val) => `${val}`,
  className = "",
  showLegend = false,
}) {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center text-center text-xs text-slate-400">
        No comparison data available
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`} style={{ width: "100%", height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 10, right: 10, left: -16, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
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
          <Tooltip content={<CustomBarTooltip unit={unit} />} />
          {showLegend && (
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: "12px", fontSize: "11px" }}
            />
          )}
          {bars.map((bar) => (
            <Bar
              key={bar.key}
              dataKey={bar.key}
              name={bar.name}
              fill={bar.color || "#D6451B"}
              radius={[6, 6, 0, 0]}
              maxBarSize={45}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
