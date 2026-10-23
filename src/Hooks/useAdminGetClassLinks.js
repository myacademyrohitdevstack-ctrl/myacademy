import { getClassLinksApi } from "@/app/api/classLinkApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useAdminGetAllLinks = (id) => {
  const user = useAuthStore((state) => state.user);
  const isValidId = !!id && id !== "null" && id !== "undefined";

  return useQuery({
    queryKey: ["Admin-class-links", id],
    queryFn: async () => {
      const response = await getClassLinksApi(id);
      return response.data?.classLinks || [];
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user && isValidId,
    retry: 1,
  });
};
