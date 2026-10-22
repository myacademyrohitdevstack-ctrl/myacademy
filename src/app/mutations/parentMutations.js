import handleError from "@/Utils/handleError";
import queryClient from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createParentAccountApi,
  linkParentStudentApi,
  unlinkParentStudentApi,
} from "@/app/api/parentManagementApi";

export const useCreateParentMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await createParentAccountApi(data);
      return response;
    },
    retry: false,
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-parent-links"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-Student-List"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-stats"] }),
      ]);
      toast.success(data.message || "Parent account created successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useLinkParentMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await linkParentStudentApi(data);
      return response;
    },
    retry: false,
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-parent-links"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-Student-List"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-stats"] }),
      ]);
      toast.success(data.message || "Parent linked to student successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useUnlinkParentMutation = () => {
  return useMutation({
    mutationFn: async ({ parentId, studentUserId }) => {
      const response = await unlinkParentStudentApi(parentId, studentUserId);
      return response;
    },
    retry: false,
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["admin-parent-links"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-Student-List"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-stats"] }),
      ]);
      toast.success(data.message || "Parent link revoked successfully");
    },
    onError: (error) => handleError(error),
  });
};
