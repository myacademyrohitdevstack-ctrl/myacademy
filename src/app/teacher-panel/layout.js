import ProtectedRoute from "@/lib/ProtectedRoutes";
import AuthProvider from "@/app/Components/AuthProvider";
import TeacherDrawerNav from "@/app/Components/portal-ui/TeacherDrawerNav";

export const metadata = {
  title: "Teacher Portal | MyAcademy",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <ProtectedRoute roles={["teacher"]}>
        <TeacherDrawerNav>{children}</TeacherDrawerNav>
      </ProtectedRoute>
    </AuthProvider>
  );
}
