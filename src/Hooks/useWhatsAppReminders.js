import {
  getWhatsAppDashboardApi,
  listWhatsAppRemindersApi,
  getWhatsAppReminderByIdApi,
  getReminderSettingsApi,
  listReminderTemplatesApi,
  getWhatsAppIntegrationApi,
  listScheduledRemindersApi,
} from "@/app/api/whatsappReminderApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useWhatsAppDashboard = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["whatsapp-reminders-dashboard"],
    queryFn: async () => {
      const response = await getWhatsAppDashboardApi();
      return response.data?.data;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
    refetchInterval: 30000, // refresh stats every 30s
  });
};

export const useWhatsAppReminders = (params = {}) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["whatsapp-reminders-list", params],
    queryFn: async () => {
      const response = await listWhatsAppRemindersApi(params);
      return response.data;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useWhatsAppReminder = (reminderId) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["whatsapp-reminder", reminderId],
    queryFn: async () => {
      if (!reminderId) return null;
      const response = await getWhatsAppReminderByIdApi(reminderId);
      return response.data?.data;
    },
    enabled: !!user && !!reminderId,
  });
};

export const useReminderSettings = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["whatsapp-reminder-settings"],
    queryFn: async () => {
      const response = await getReminderSettingsApi();
      return response.data?.data;
    },
    enabled: !!user,
  });
};

export const useReminderTemplates = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["whatsapp-reminder-templates"],
    queryFn: async () => {
      const response = await listReminderTemplatesApi();
      return response.data?.data || [];
    },
    enabled: !!user,
  });
};

export const useWhatsAppIntegration = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["whatsapp-integration"],
    queryFn: async () => {
      const response = await getWhatsAppIntegrationApi();
      return response.data?.data;
    },
    enabled: !!user,
  });
};

export const useScheduledReminders = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["whatsapp-scheduled-reminders"],
    queryFn: async () => {
      const response = await listScheduledRemindersApi();
      return response.data?.data || [];
    },
    enabled: !!user,
  });
};
