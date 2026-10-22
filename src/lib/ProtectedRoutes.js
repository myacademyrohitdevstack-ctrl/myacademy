"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Loading from "@/app/Components/ui/Loading";

export default function ProtectedRoute({
  children,
  roles = [],
}) {
  const router = useRouter();

  const {
    isAuthenticated,
    isInitialized,
    user,
  } = useAuthStore();

  const isSuperAdmin =
    user?.platformRole === "super_admin" || user?.role === "super_admin";

  const hasRole =
    roles.length === 0 ||
    roles.includes(user?.role) ||
    roles.includes(user?.platformRole);

  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    // A Super Admin operates exclusively at the platform level
    // and should always be redirected to the Super Admin platform rather than the regular Admin panel
    if (isSuperAdmin && !roles.includes("super_admin")) {
      router.replace("/super-admin/dashboard");
      return;
    }

    if (!hasRole) {
      router.replace("/");
    }
  }, [isAuthenticated, isInitialized, user, roles, hasRole, isSuperAdmin, router]);

  if (!isInitialized) {
    return <Loading type={roles[0]} />;
  }

  if (!isAuthenticated) {
    return null;
  }

  // Prevent flash of regular admin / other portal view for super admin
  if (isSuperAdmin && !roles.includes("super_admin")) {
    return null;
  }

  if (!hasRole) {
    return null;
  }

  return children;
}
