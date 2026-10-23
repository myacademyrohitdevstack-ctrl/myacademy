import { getStudentClassLinksApi } from "@/app/api/userApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetStudentClassLInks = (batchId, tab) => {
  const user = useAuthStore((state) => state.user);
  const isValidBatchId = !!batchId && batchId !== "null" && batchId !== "undefined";

  return useQuery({
    queryKey: ["class-links", user?._id || user?.id, batchId],
    queryFn: async () => {
      const response = await getStudentClassLinksApi(batchId);
      return response.data?.classLinks || [];
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user && isValidBatchId && tab === "links",
    retry: 1,
  });
};
