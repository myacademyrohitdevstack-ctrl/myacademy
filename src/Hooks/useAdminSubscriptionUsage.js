import { adminGetSubscriptionUsageApi } from "@/app/api/adminApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useAdminSubscriptionUsage = () => {
  const user = useAuthStore((state) => state.user);

  return useQuery({
    queryKey: ["Admin-subscription-usage"],
    queryFn: async () => {
      const response = await adminGetSubscriptionUsageApi();
      return response.data?.data;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: user?.role === "admin",
  });
};
