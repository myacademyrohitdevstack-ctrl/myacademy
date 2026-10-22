import handleError from "@/Utils/handleError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import queryClient from "@/lib/queryClient";
import {
  deleteAttendanceApi,
  postattendanceapi,
  updateAttendanceApi,
} from "../api/AttendenceApi";

export const useMarkAttendence = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      const response = await postattendanceapi(data);
      return response.data;
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["Attendence-dashboard"] }),
        queryClient.invalidateQueries({ queryKey: ["Attendence"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-stats"] }),
      ]);
      toast.success(data.message);

      setTimeout(() => {
        router.push("/admin-panel/courses");
      }, 1000);
    },
  });
};

export const useUpdateAttendance = (id) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      const response = await updateAttendanceApi(id, data);
      return response.data;
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["Attendence", id] }),
        queryClient.invalidateQueries({ queryKey: ["Attendence"] }),
        queryClient.invalidateQueries({ queryKey: ["Attendence-dashboard"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-stats"] }),
      ]);
      toast.success(data.message);

      router.push("/admin-panel/courses");
    },
  });
};

export const useDeleteAttendance = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (id) => {
      const response = await deleteAttendanceApi(id);
      return response.data;
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["Attendence-dashboard"] }),
        queryClient.invalidateQueries({ queryKey: ["Attendence"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-stats"] }),
      ]);
      toast.success(data.message);

      router.push("/admin-panel/courses");
    },
  });
};
