import ProtectedRoute from "@/lib/ProtectedRoutes";
import AuthProvider from "@/app/Components/AuthProvider";
import StudentDrawerNav from "@/app/Components/portal-ui/StudentDrawerNav";

export const metadata = {
  title: "Student Portal | MyAcademy",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <ProtectedRoute roles={["student"]}>
        <StudentDrawerNav>{children}</StudentDrawerNav>
      </ProtectedRoute>
    </AuthProvider>
  );
}
