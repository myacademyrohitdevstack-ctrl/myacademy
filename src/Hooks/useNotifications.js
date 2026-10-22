import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getMyNotificationsApi,
  markNotificationReadApi,
  markAllNotificationsReadApi,
} from "@/app/api/notificationApi";
import queryClient from "@/lib/queryClient";
import useAuthStore from "@/store/authStore";

export const useNotifications = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ["my-notifications", user?.id || user?._id],
    queryFn: getMyNotificationsApi,
    enabled: !!user,
    refetchInterval: 30000, // Poll every 30s for live batch/class announcements
    refetchOnWindowFocus: true,
    staleTime: 10000,
  });
};

export const useMarkNotificationRead = () => {
  return useMutation({
    mutationFn: (id) => markNotificationReadApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-notifications"] });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  return useMutation({
    mutationFn: markAllNotificationsReadApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-notifications"] });
    },
  });
};
