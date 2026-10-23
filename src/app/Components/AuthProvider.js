"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import PortalLoading from "./portal-ui/PortalLoading";

const PUBLIC_ROUTES = [
  "/login",
  "/signup",
  "/forget-password",
  "/reset-password",
  "/verify-email",
];

const checkIsPublic = (path) => {
  if (!path || path === "/") return true;
  return PUBLIC_ROUTES.some((route) => path.startsWith(route));
};

export default function AuthProvider({ children }) {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setInitialized = useAuthStore((state) => state.setInitialized);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const pathname = usePathname();
  const isPublic = checkIsPublic(pathname);

  // If on a public route or already initialized, never block UI with a full-screen loading screen
  const [loading, setLoading] = useState(() => !isPublic && !isInitialized);
  const hasAttemptedRef = useRef(false);

  useEffect(() => {
    // If already initialized or already attempted refresh, avoid redundant calls
    if (isInitialized || hasAttemptedRef.current) {
      return;
    }
    hasAttemptedRef.current = true;

    const refresh = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
            timeout: 2500, // 2.5s strict timeout prevents hung requests or cold-start freezes
          }
        );

        if (res.data?.user && res.data?.accessToken) {
          login({
            user: res.data.user,
            accessToken: res.data.accessToken,
          });
        } else {
          logout();
        }
      } catch (err) {
        logout();
      } finally {
        setInitialized();
        setLoading(false);
      }
    };

    refresh();
  }, [isInitialized, login, logout, setInitialized]);

  // Only block the UI on protected routes while waiting for initial authentication check
  if (loading && !isPublic) {
    return <PortalLoading />;
  }

  return children;
}
