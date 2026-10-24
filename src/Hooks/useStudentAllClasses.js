import { getStudentAllClassesApi } from "@/app/api/userApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useStudentsAllClasses = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?._id || user?.id;
  return useQuery({
    queryKey: ["classes", userId],
    queryFn: async () => {
      const response = await getStudentAllClassesApi();
      return response.data?.classes;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!userId,
  });
};
