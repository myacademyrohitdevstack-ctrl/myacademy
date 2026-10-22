import {
  getMyChildrenApi,
  getChildDashboardApi,
  getChildAttendanceApi,
  getChildFeesApi,
} from "@/app/api/parentApi";
import { listParentLinksApi } from "@/app/api/parentManagementApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useMyChildren = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["parent-children"],
    queryFn: async () => {
      const response = await getMyChildrenApi();
      return response.children || [];
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useChildDashboard = (studentUserId) => {
  return useQuery({
    queryKey: ["parent-child-dashboard", studentUserId],
    queryFn: async () => {
      if (!studentUserId) return null;
      const response = await getChildDashboardApi(studentUserId);
      return response.data || null;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!studentUserId,
  });
};

export const useChildAttendance = (studentUserId, params = {}) => {
  return useQuery({
    queryKey: ["parent-child-attendance", studentUserId, params],
    queryFn: async () => {
      if (!studentUserId) return { attendance: [], summary: {} };
      const response = await getChildAttendanceApi(studentUserId, params);
      return {
        attendance: response.attendance || [],
        summary: response.summary || {},
        count: response.count || 0,
      };
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!studentUserId,
  });
};

export const useChildFees = (studentUserId) => {
  return useQuery({
    queryKey: ["parent-child-fees", studentUserId],
    queryFn: async () => {
      if (!studentUserId) return { fees: [], payments: [] };
      const response = await getChildFeesApi(studentUserId);
      return {
        fees: response.fees || [],
        payments: response.payments || [],
      };
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!studentUserId,
  });
};

export const useParentLinks = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["admin-parent-links"],
    queryFn: async () => {
      const response = await listParentLinksApi();
      return response.links || [];
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};
