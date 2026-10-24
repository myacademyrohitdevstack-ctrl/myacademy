import { getStudentAttendenceDashboard } from "@/app/api/AttendenceApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useGetStudentAttendenceDashboard = (batchId) => {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["Attendence-dashboard-student", user?._id, batchId || "all"],
    queryFn: async () => {
      const response = await getStudentAttendenceDashboard(batchId);
      return response.data;
    },
    placeholderData: keepPreviousData,
    enabled: !!user?._id,
  });
};
