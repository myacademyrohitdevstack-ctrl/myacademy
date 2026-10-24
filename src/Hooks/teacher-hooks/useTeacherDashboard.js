"use client";

import {
  teacherDashboardAnnoucementApi,
  teacherDashboardApi,
  teacherDashboardClassesApi,
  teacherDashboardEnrollmentsApi,
} from "@/app/api/teacherApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useTeacherdashboard = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id || user?._id || "";
  return useQuery({
    queryKey: ["teacher-dashboard", userId],
    queryFn: async () => {
      const response = await teacherDashboardApi();
      return response.data.stats;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: Boolean(user && userId),
  });
};

export const useTeacherdashboardEnrollements = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id || user?._id || "";
  return useQuery({
    queryKey: ["teacher-enrollments", userId],
    queryFn: async () => {
      const response = await teacherDashboardEnrollmentsApi();
      return response.data.enrollments;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: Boolean(user && userId),
  });
};

export const useTeacherdashboardClasses = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id || user?._id || "";
  return useQuery({
    queryKey: ["teacher-classes", userId],
    queryFn: async () => {
      const response = await teacherDashboardClassesApi();
      return response.data.classes;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: Boolean(user && userId),
  });
};

export const useTeacherdashboardAnnoucements = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id || user?._id || "";
  return useQuery({
    queryKey: ["teacher-annoucemnets", userId],
    queryFn: async () => {
      const response = await teacherDashboardAnnoucementApi();
      return response.data.announcements;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: Boolean(user && userId),
  });
};
