import ProtectedRoute from "@/lib/ProtectedRoutes";
import AuthProvider from "@/app/Components/AuthProvider";
import SuperAdminDrawerNav from "@/app/Components/portal-ui/SuperAdminDrawerNav";

export const metadata = {
  title: "Platform Super Admin | MyAcademy",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SuperAdminLayout({ children }) {
  return (
    <AuthProvider>
      <ProtectedRoute roles={["super_admin"]}>
        <SuperAdminDrawerNav>{children}</SuperAdminDrawerNav>
      </ProtectedRoute>
    </AuthProvider>
  );
}
