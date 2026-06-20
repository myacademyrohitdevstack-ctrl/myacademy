"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import StudentLoading from "../student-profile/components/StudentLoading";

export default function AuthProvider({ children }) {
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
  const setInitialized = useAuthStore(
    (state) => state.setInitialized
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/auth/refresh-token`,
          {},
          { withCredentials: true }
        );

        login({
          user: res.data.user,
          accessToken: res.data.accessToken,
        });
      } catch (err) {
        logout();
      } finally {
        setInitialized();
        setLoading(false);
      }
    };

    refresh();
  }, []);

  if (loading) {
    return <StudentLoading />;
  }

  return children;
}