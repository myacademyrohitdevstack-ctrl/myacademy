import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import handleError from "@/Utils/handleError";
import {
  getStaffCatalogApi,
  getStaffMembersApi,
  createStaffMemberApi,
  updateStaffPermissionsApi,
  updateStaffProfileApi,
  updateStaffStatusApi,
  deleteStaffMemberApi,
} from "../api/staffApi";

export const useStaffCatalogQuery = () => {
  return useQuery({
    queryKey: ["staffCatalog"],
    queryFn: async () => {
      const res = await getStaffCatalogApi();
      return res.data;
    },
    staleTime: 10 * 60 * 1000,
  });
};

export const useStaffListQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["staffList"],
    queryFn: async () => {
      const res = await getStaffMembersApi();
      return res.data?.staff || [];
    },
    enabled,
    staleTime: 30 * 1000,
  });
};

export const useCreateStaffMutation = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      const res = await createStaffMemberApi(data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Staff member created successfully");
      queryClient.invalidateQueries({ queryKey: ["staffList"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (err) => handleError(err),
  });
};

export const useUpdateStaffPermissionsMutation = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, permissions }) => {
      const res = await updateStaffPermissionsApi(id, permissions);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Permissions updated successfully");
      queryClient.invalidateQueries({ queryKey: ["staffList"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (err) => handleError(err),
  });
};

export const useUpdateStaffProfileMutation = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await updateStaffProfileApi(id, data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Profile updated successfully");
      queryClient.invalidateQueries({ queryKey: ["staffList"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (err) => handleError(err),
  });
};

export const useUpdateStaffStatusMutation = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status, blockReason }) => {
      const res = await updateStaffStatusApi(id, { status, blockReason });
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Staff status updated successfully");
      queryClient.invalidateQueries({ queryKey: ["staffList"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (err) => handleError(err),
  });
};

export const useDeleteStaffMutation = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const res = await deleteStaffMemberApi(id);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Staff member removed successfully");
      queryClient.invalidateQueries({ queryKey: ["staffList"] });
      if (onSuccessCallback) onSuccessCallback(data);
    },
    onError: (err) => handleError(err),
  });
};
