import StudentPortal from "../[section]/StudentClient";
import ProtectedRoute from "@/lib/ProtectedRoutes";

export const metadata = {
  title: "My Homework & Assignments | Student Portal",
  description: "View and submit homework assignments and see grading feedback",
};

export default function StudentHomeworkPage() {
  return (
    <ProtectedRoute roles={["student"]}>
      <StudentPortal section="homework" />
    </ProtectedRoute>
  );
}
