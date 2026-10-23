import { studentBatchesApi } from "@/app/api/userApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetStudentBatches = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?._id || user?.id;

  return useQuery({
    queryKey: ["batches", userId],
    queryFn: async () => {
      const response = await studentBatchesApi(userId);
      return response.data?.batches || [];
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user && !!userId,
    retry: 1,
  });
};
