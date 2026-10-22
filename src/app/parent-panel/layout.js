import ProtectedRoute from "@/lib/ProtectedRoutes";
import AuthProvider from "@/app/Components/AuthProvider";
import ParentDrawerNav from "@/app/Components/portal-ui/ParentDrawerNav";

export const metadata = {
  title: "Parent Portal | MyAcademy",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ParentLayout({ children }) {
  return (
    <AuthProvider>
      <ProtectedRoute roles={["parent"]}>
        <ParentDrawerNav>{children}</ParentDrawerNav>
      </ProtectedRoute>
    </AuthProvider>
  );
}
