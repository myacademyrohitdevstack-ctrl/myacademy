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
  const router = useRouter();
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
      ]);
      toast.success(data.message);
      router.push("/admin-panel/courses");
    },
  });
};

export const useDeleteAnnouncementtMutation = () => {
  const router = useRouter();
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
      ]);
      toast.success(data.message);
      router.push("/admin-panel/courses");
    },
  });
};
