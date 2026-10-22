import handleError from "@/Utils/handleError";
import queryClient from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  sendManualWhatsAppReminderApi,
  sendBulkWhatsAppRemindersApi,
  confirmManualSendApi,
  retryWhatsAppReminderApi,
  cancelWhatsAppReminderApi,
  updateReminderSettingsApi,
  triggerReminderRunApi,
  createReminderTemplateApi,
  updateReminderTemplateApi,
  deleteReminderTemplateApi,
  resetDefaultTemplatesApi,
  saveWhatsAppIntegrationApi,
  testWhatsAppConnectionApi,
  disconnectWhatsAppIntegrationApi,
  scheduleWhatsAppReminderApi,
  cancelScheduledReminderApi,
} from "@/app/api/whatsappReminderApi";

export const useSendManualReminderMutation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await sendManualWhatsAppReminderApi(payload);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-list"] });
      queryClient.invalidateQueries({ queryKey: ["pending-fees"] });
      queryClient.invalidateQueries({ queryKey: ["fees-pending"] });
      queryClient.invalidateQueries({ queryKey: ["fees-dashboard"] });
      toast.success(data.message || "Manual reminder created successfully.");
    },
    onError: (error) => handleError(error),
  });
};

export const useSendBulkRemindersMutation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await sendBulkWhatsAppRemindersApi(payload);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-list"] });
      queryClient.invalidateQueries({ queryKey: ["pending-fees"] });
      queryClient.invalidateQueries({ queryKey: ["fees-pending"] });
      queryClient.invalidateQueries({ queryKey: ["fees-dashboard"] });
      toast.success(data.message || "Bulk reminders processed.");
    },
    onError: (error) => handleError(error),
  });
};

export const useConfirmManualSendMutation = () => {
  return useMutation({
    mutationFn: async (reminderId) => {
      const response = await confirmManualSendApi(reminderId);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-list"] });
      toast.success(data.message || "Reminder confirmed as manually sent.");
    },
    onError: (error) => handleError(error),
  });
};

export const useRetryReminderMutation = () => {
  return useMutation({
    mutationFn: async (reminderId) => {
      const response = await retryWhatsAppReminderApi(reminderId);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-list"] });
      toast.success(data.message || "Reminder retried successfully.");
    },
    onError: (error) => handleError(error),
  });
};

export const useCancelReminderMutation = () => {
  return useMutation({
    mutationFn: async (reminderId) => {
      const response = await cancelWhatsAppReminderApi(reminderId);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-list"] });
      toast.success(data.message || "Reminder cancelled.");
    },
    onError: (error) => handleError(error),
  });
};

export const useUpdateReminderSettingsMutation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await updateReminderSettingsApi(payload);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminder-settings"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      toast.success(data.message || "Reminder settings saved successfully.");
    },
    onError: (error) => handleError(error),
  });
};

export const useTriggerReminderRunMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await triggerReminderRunApi();
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-list"] });
      toast.success(data.message || "Automated reminder engine run completed.");
    },
    onError: (error) => handleError(error),
  });
};

export const useCreateTemplateMutation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await createReminderTemplateApi(payload);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminder-templates"] });
      toast.success(data.message || "Template created successfully.");
    },
    onError: (error) => handleError(error),
  });
};

export const useUpdateTemplateMutation = () => {
  return useMutation({
    mutationFn: async ({ templateId, payload }) => {
      const response = await updateReminderTemplateApi(templateId, payload);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminder-templates"] });
      toast.success(data.message || "Template updated successfully.");
    },
    onError: (error) => handleError(error),
  });
};

export const useDeleteTemplateMutation = () => {
  return useMutation({
    mutationFn: async (templateId) => {
      const response = await deleteReminderTemplateApi(templateId);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminder-templates"] });
      toast.success(data.message || "Template removed.");
    },
    onError: (error) => handleError(error),
  });
};

export const useResetDefaultTemplatesMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await resetDefaultTemplatesApi();
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminder-templates"] });
      toast.success(data.message || "Recommended templates restored.");
    },
    onError: (error) => handleError(error),
  });
};

export const useSaveIntegrationMutation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await saveWhatsAppIntegrationApi(payload);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-integration"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      toast.success(data.message || "Integration settings saved successfully.");
    },
    onError: (error) => handleError(error),
  });
};

export const useTestIntegrationMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await testWhatsAppConnectionApi();
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-integration"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      toast.success(data.message || "WhatsApp connection verified successfully!");
    },
    onError: (error) => handleError(error),
  });
};

export const useDisconnectIntegrationMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await disconnectWhatsAppIntegrationApi();
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-integration"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      toast.success(data.message || "Integration disconnected.");
    },
    onError: (error) => handleError(error),
  });
};

export const useScheduleReminderMutation = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const response = await scheduleWhatsAppReminderApi(payload);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-scheduled-reminders"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      toast.success(data.message || "Reminder scheduled successfully.");
    },
    onError: (error) => handleError(error),
  });
};

export const useCancelScheduledReminderMutation = () => {
  return useMutation({
    mutationFn: async (reminderId) => {
      const response = await cancelScheduledReminderApi(reminderId);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["whatsapp-scheduled-reminders"] });
      queryClient.invalidateQueries({ queryKey: ["whatsapp-reminders-dashboard"] });
      toast.success(data.message || "Scheduled reminder cancelled.");
    },
    onError: (error) => handleError(error),
  });
};
