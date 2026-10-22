import handleError from "@/Utils/handleError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import queryClient from "@/lib/queryClient";
import {
  adminCreateAnnouncementApi,
  adminDeleteAnnouncementApi,
} from "../api/adminApi";

export const useCreateAnnouncementtMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await adminCreateAnnouncementApi(data);
      return response.data;
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["Announcements"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-annoucements"] }),
        queryClient.invalidateQueries({ queryKey: ["my-notifications"] }),
      ]);
      toast.success(data.message || "Announcement published successfully");
    },
  });
};

export const useDeleteAnnouncementtMutation = () => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await adminDeleteAnnouncementApi(id);
      return response.data;
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["Announcements"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-annoucements"] }),
        queryClient.invalidateQueries({ queryKey: ["my-notifications"] }),
      ]);
      toast.success(data.message || "Announcement deleted successfully");
    },
  });
};
