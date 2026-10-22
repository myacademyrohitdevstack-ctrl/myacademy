import StudentPortal from "../[section]/StudentClient";
import ProtectedRoute from "@/lib/ProtectedRoutes";

export const metadata = {
  title: "My Exam Results | Student Portal",
  description: "View assessment scores, grades, and teacher remarks",
};

export default function StudentExamsPage() {
  return (
    <ProtectedRoute roles={["student"]}>
      <StudentPortal section="exams" />
    </ProtectedRoute>
  );
}
