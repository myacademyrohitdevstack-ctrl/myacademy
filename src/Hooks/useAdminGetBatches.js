import { adminGetBatchApi } from "@/app/api/adminApi";
import api from "@/app/api/apiInstance";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useAdminGetAllBatches = (slug) => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["Admin-batches", slug, user?._id || user?.id],
    queryFn: async () => {
      const response = await adminGetBatchApi(slug);
      return response.data.batches;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: Boolean(user && slug),
  });
};

export const useGetAllAcademyBatches = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?._id || user?.id || "";
  return useQuery({
    queryKey: ["all-academy-batches", userId],
    queryFn: async () => {
      const response = await api.get("/batches");
      return response.data.batches || [];
    },
    enabled: Boolean(user && userId),
  });
};
