"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import StudentLoading from "../student-profile/components/StudentLoading";


export default function AuthProvider({ children }) {
  const setAccessToken = useAuthStore(
    (state) => state.setAccessToken
  );
  const setUser = useAuthStore(
    (state) => state.setUser
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
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
      } catch (error) {
        console.log("Not logged in");
      } finally {
        setLoading(false);
      }
    };

    refresh();
  }, []);

  if (loading) return <StudentLoading></StudentLoading>;

  return children;
}