import handleError from "@/Utils/handleError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createCourseApi } from "../api/coursesApi";
import { toast } from "sonner";
import queryClient from "@/lib/queryClient";

export const useCreateCourseMutation = (resetForm) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      const response = await createCourseApi(data);
      return response.data;
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["Admin-courses"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-stats"] }),
      ]);
      toast.success(data.message);
      if (resetForm) resetForm();

      setTimeout(() => {
        router.push("/admin-panel/courses");
      }, 1000);
    },
  });
};
