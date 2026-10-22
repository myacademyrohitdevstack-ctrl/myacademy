"use client";

import PortalLoading from "@/app/Components/portal-ui/PortalLoading";

export default function StudentLoading({ title, subtitle }) {
  return (
    <PortalLoading
      type="student"
      title={title || "Loading Student Portal..."}
      subtitle={subtitle || "Preparing your enrolled cohorts, attendance tracking, and fee receipts..."}
    />
  );
}
