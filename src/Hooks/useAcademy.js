import { useQuery } from "@tanstack/react-query";
import { adminGetAcademyProfileApi, getPublicAcademyInfoApi } from "@/app/api/adminApi";
import useAuthStore from "@/store/authStore";

export function useAcademyProfile() {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["academyProfile"],
    queryFn: async () => {
      const res = await adminGetAcademyProfileApi();
      return res.data?.academy;
    },
    enabled: !!user && (user.role === "admin" || user.platformRole === "super_admin"),
    staleTime: 5 * 60 * 1000,
  });
}

export function usePublicAcademyInfo() {
  const user = useAuthStore((state) => state.user);
  return useQuery({
    queryKey: ["publicAcademyInfo"],
    queryFn: async () => {
      const res = await getPublicAcademyInfoApi();
      return res.data?.academy;
    },
    enabled: !!user,
    staleTime: 10 * 60 * 1000,
  });
}
