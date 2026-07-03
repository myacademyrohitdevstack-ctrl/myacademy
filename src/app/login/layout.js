import PublicRoute from "@/lib/PublicRoutes";



export default function Layout({ children }) {
  return (
  <PublicRoute>
    {children}
  </PublicRoute>
  );
}