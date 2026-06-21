import ProtectedRoute from "@/lib/ProtectedRoutes";


export default function Layout({ children }) {
  return (
    <ProtectedRoute roles={["admin"]}>
      {children}
    </ProtectedRoute>
  );
}