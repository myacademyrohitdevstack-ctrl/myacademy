"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import StudentLoading from "@/app/student-profile/components/StudentLoading";

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

  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }

    if (roles.length && !roles.includes(user?.role)) {
      router.replace("/");
    }
  }, [isAuthenticated, isInitialized, user, roles, router]);

  if (!isInitialized) {
    return <StudentLoading />;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (roles.length && !roles.includes(user?.role)) {
    return null;
  }

  return children;
}