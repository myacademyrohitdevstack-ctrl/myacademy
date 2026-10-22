import handleError from "@/Utils/handleError";
import queryClient from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createFeePlanApi,
  updateFeePlanApi,
  archiveFeePlanApi,
  assignFeePlanApi,
  collectPaymentApi,
  reversePaymentApi,
} from "@/app/api/feesApi";

export const useCreateFeePlanMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await createFeePlanApi(data);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fees-plans"] });
      queryClient.invalidateQueries({ queryKey: ["fees-dashboard"] });
      toast.success(data.message || "Fee plan created successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useUpdateFeePlanMutation = () => {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const response = await updateFeePlanApi(id, data);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fees-plans"] });
      queryClient.invalidateQueries({ queryKey: ["fees-dashboard"] });
      toast.success(data.message || "Fee plan updated successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useArchiveFeePlanMutation = () => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await archiveFeePlanApi(id);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fees-plans"] });
      queryClient.invalidateQueries({ queryKey: ["fees-dashboard"] });
      toast.success(data.message || "Fee plan archived successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useAssignFeePlanMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await assignFeePlanApi(data);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fees-student-fees"] });
      queryClient.invalidateQueries({ queryKey: ["fees-students"] });
      queryClient.invalidateQueries({ queryKey: ["fees-pending"] });
      queryClient.invalidateQueries({ queryKey: ["fees-dashboard"] });
      toast.success(data.message || "Fee assigned to student successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useCollectPaymentMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await collectPaymentApi(data);
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fees-payments"] });
      queryClient.invalidateQueries({ queryKey: ["fees-pending"] });
      queryClient.invalidateQueries({ queryKey: ["fees-students"] });
      queryClient.invalidateQueries({ queryKey: ["fees-student-fees"] });
      queryClient.invalidateQueries({ queryKey: ["fees-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["fees-reports"] });
      toast.success(data.message || "Payment recorded successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useReversePaymentMutation = () => {
  return useMutation({
    mutationFn: async ({ id, reason }) => {
      const response = await reversePaymentApi(id, { reason });
      return response.data;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fees-payments"] });
      queryClient.invalidateQueries({ queryKey: ["fees-pending"] });
      queryClient.invalidateQueries({ queryKey: ["fees-students"] });
      queryClient.invalidateQueries({ queryKey: ["fees-student-fees"] });
      queryClient.invalidateQueries({ queryKey: ["fees-dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["fees-reports"] });
      toast.success(data.message || "Payment reversed successfully");
    },
    onError: (error) => handleError(error),
  });
};
