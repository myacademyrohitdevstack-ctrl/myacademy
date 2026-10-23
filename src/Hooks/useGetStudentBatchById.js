import { getStudentBatchByIdApi } from "@/app/api/userApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetStudentBatchById = (batchId) => {
  const user = useAuthStore((state) => state.user);
  const isValidBatchId = !!batchId && batchId !== "null" && batchId !== "undefined";

  return useQuery({
    queryKey: ["batch", user?._id || user?.id, batchId],
    queryFn: async () => {
      const response = await getStudentBatchByIdApi(batchId);
      return response.data?.batch;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user && isValidBatchId,
    retry: 1,
  });
};
