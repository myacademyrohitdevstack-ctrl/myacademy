import { getNoteApi } from "@/app/api/notesApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useAdminGetAllNotes = (id) => {
  const user = useAuthStore((state) => state.user);
  const isValidId = !!id && id !== "null" && id !== "undefined";

  return useQuery({
    queryKey: ["Admin-notes", id],
    queryFn: async () => {
      const response = await getNoteApi(id);
      return response.data?.notes || [];
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user && isValidId,
    retry: 1,
  });
};
