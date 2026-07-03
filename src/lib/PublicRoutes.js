"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import Loading from "@/app/Components/ui/Loading";

export default function PublicRoute({ children }) {
  const router = useRouter();

  const {
    isAuthenticated,
    isInitialized,
    user,
  } = useAuthStore();

  useEffect(() => {
    if (!isInitialized) return;

    if (isAuthenticated) {
      switch (user?.role) {
        case "student":
          router.replace("/student-profile/dashboard");
          break;

        case "admin":
          router.replace("/admin-panel/dashboard");
          break;

        case "teacher":
          router.replace("/teacher-panel/dashboard");
          break;

        default:
          router.replace("/");
      }
    }
  }, [isAuthenticated, isInitialized, user, router]);

  if (!isInitialized) {
    return <Loading />;
  }

  // Don't render the login/register page while redirecting
  if (isAuthenticated) {
    return null;
  }

  return children;
}