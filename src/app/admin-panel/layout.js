import ProtectedRoute from "@/lib/ProtectedRoutes";
import AuthProvider from "@/app/Components/AuthProvider";
import AdminDrawerNav from "@/app/Components/portal-ui/AdminDrawerNav";

export const metadata = {
  title: "Admin Console | MyAcademy",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Layout({ children }) {
  return (
    <AuthProvider>
      <ProtectedRoute roles={["admin"]}>
        <AdminDrawerNav>{children}</AdminDrawerNav>
      </ProtectedRoute>
    </AuthProvider>
  );
}
