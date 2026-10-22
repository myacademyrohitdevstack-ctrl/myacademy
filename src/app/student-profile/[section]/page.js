import React from "react";
import StudentPortal from "./StudentClient";
import ProtectedRoute from "@/lib/ProtectedRoutes";

export default async function Page({ params }) {
  const { section } = await params;
  return (
    <ProtectedRoute roles={["student"]}>
      <StudentPortal section={section} />
    </ProtectedRoute>
  );
}
