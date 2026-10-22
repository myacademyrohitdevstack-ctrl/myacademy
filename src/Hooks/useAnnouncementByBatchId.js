import { announcementByBatchIdApi } from "@/app/api/AnnoucementsApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useAnnouncementByBatchId = (batchId, tab) => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["Announcements", batchId],
    queryFn: async () => {
      const response = await announcementByBatchIdApi(batchId);
      return response.data.announcements;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user && !!batchId && tab === "announcements",
  });
};
