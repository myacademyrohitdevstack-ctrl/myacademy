import {
  getSuperAdminDashboardApi,
  getSuperAdminAcademiesApi,
  getSuperAdminPlansApi,
  getSuperAdminSubscriptionsApi,
  getSuperAdminAuditLogsApi,
} from "@/app/api/superAdminApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useSuperAdminDashboard = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["super-admin-dashboard"],
    queryFn: async () => {
      const response = await getSuperAdminDashboardApi();
      return response.data || {};
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useSuperAdminAcademies = (params = {}) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["super-admin-academies", params],
    queryFn: async () => {
      const response = await getSuperAdminAcademiesApi(params);
      return {
        academies: response.academies || [],
        pagination: response.pagination || { page: 1, limit: 20, total: 0, pages: 1 },
      };
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useSuperAdminPlans = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["super-admin-plans"],
    queryFn: async () => {
      const response = await getSuperAdminPlansApi();
      return response.plans || [];
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useSuperAdminSubscriptions = (params = {}) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["super-admin-subscriptions", params],
    queryFn: async () => {
      const response = await getSuperAdminSubscriptionsApi(params);
      return {
        subscriptions: response.subscriptions || [],
        pagination: response.pagination || { page: 1, limit: 20, total: 0, pages: 1 },
      };
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useSuperAdminAuditLogs = (params = {}) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["super-admin-audit-logs", params],
    queryFn: async () => {
      const response = await getSuperAdminAuditLogsApi(params);
      return {
        logs: response.logs || [],
        pagination: response.pagination || { page: 1, limit: 50, total: 0, pages: 1 },
      };
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};
