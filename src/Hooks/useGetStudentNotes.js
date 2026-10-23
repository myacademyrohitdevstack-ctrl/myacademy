import { getStudentNotesApi } from "@/app/api/userApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetStudentNotes = (batchId, tab) => {
  const user = useAuthStore((state) => state.user);
  const isValidBatchId = !!batchId && batchId !== "null" && batchId !== "undefined";

  return useQuery({
    queryKey: ["notes", user?._id || user?.id, batchId],
    queryFn: async () => {
      const response = await getStudentNotesApi(batchId);
      return response.data?.notes || [];
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user && isValidBatchId && tab === "notes",
    retry: 1,
  });
};
