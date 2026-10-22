import handleError from "@/Utils/handleError";
import queryClient from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  updateAcademyStatusApi,
  createSuperAdminPlanApi,
  updateSuperAdminPlanApi,
  assignSuperAdminSubscriptionApi,
} from "@/app/api/superAdminApi";

export const useUpdateAcademyStatusMutation = () => {
  return useMutation({
    mutationFn: async ({ academyId, status, reason }) => {
      const response = await updateAcademyStatusApi(academyId, { status, reason });
      return response;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["super-admin-academies"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin-audit-logs"] });
      toast.success(data.message || "Academy status updated successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useCreatePlanMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await createSuperAdminPlanApi(data);
      return response;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["super-admin-plans"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin-audit-logs"] });
      toast.success("Platform SaaS plan created successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useUpdatePlanMutation = () => {
  return useMutation({
    mutationFn: async ({ planId, data }) => {
      const response = await updateSuperAdminPlanApi(planId, data);
      return response;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["super-admin-plans"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin-audit-logs"] });
      toast.success("Platform SaaS plan updated successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useAssignSubscriptionMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await assignSuperAdminSubscriptionApi(data);
      return response;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["super-admin-subscriptions"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin-academies"] });
      queryClient.invalidateQueries({ queryKey: ["super-admin-audit-logs"] });
      toast.success("Academy subscription assigned successfully");
    },
    onError: (error) => handleError(error),
  });
};
