import { getStudentStaticsApi } from "@/app/api/userApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useStudentStatics = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?._id || user?.id;
  return useQuery({
    queryKey: ["statics", userId],
    queryFn: async () => {
      const response = await getStudentStaticsApi();
      return response.data?.statics;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
};
