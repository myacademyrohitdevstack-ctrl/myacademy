"use client";

export default function PortalBadge({
  children,
  variant = "default",
  size = "md",
  className = "",
}) {
  const variants = {
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    active: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    pending: "bg-amber-50 text-amber-700 border-amber-200/60",
    blocked: "bg-rose-50 text-rose-700 border-rose-200/60",
    rejected: "bg-rose-50 text-rose-700 border-rose-200/60",
    info: "bg-blue-50 text-blue-700 border-blue-200/60",
    purple: "bg-violet-50 text-violet-700 border-violet-200/60",
    default: "bg-slate-100 text-slate-700 border-slate-200",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs font-semibold rounded-full",
    md: "px-3 py-1 text-xs font-bold rounded-full",
    lg: "px-4 py-1.5 text-sm font-bold rounded-full",
  };

  const normalized = (typeof children === "string" ? children.toLowerCase() : "") || variant;
  let activeVariant = variants[variant] || variants.default;
  
  if (variants[normalized]) {
    activeVariant = variants[normalized];
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 border capitalize tracking-wide ${sizes[size]} ${activeVariant} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-75" />
      {children}
    </span>
  );
}
