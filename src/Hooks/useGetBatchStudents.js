import { batchStudentsApi } from "@/app/api/BatchApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetBatchStudents = (batchId) => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["Batch-students", batchId],
    queryFn: async () => {
      if (!batchId) return [];
      const response = await batchStudentsApi(batchId);
      return response.data.students || [];
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: Boolean(user && batchId),
  });
};
