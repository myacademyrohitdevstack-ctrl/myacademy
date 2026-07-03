import ProtectedRoute from "@/lib/ProtectedRoutes";



export default function Layout({ children }) {
  return (
    <ProtectedRoute roles={["teacher"]}>
      {children}
  </ProtectedRoute>
  );
}