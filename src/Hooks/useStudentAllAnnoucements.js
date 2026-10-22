import { getStudentAllAnnocemntsApi } from "@/app/api/userApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useStudentsAllAnnouncements = () => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["Announcements", user?._id || user?.id],
    queryFn: async () => {
      const response = await getStudentAllAnnocemntsApi();
      return response.data.announcements;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};
