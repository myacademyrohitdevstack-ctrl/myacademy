import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminUpdateAcademyProfileApi } from "@/app/api/adminApi";
import { toast } from "sonner";

export function useUpdateAcademyProfileMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const res = await adminUpdateAcademyProfileApi(formData);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["academyProfile"] });
      queryClient.invalidateQueries({ queryKey: ["publicAcademyInfo"] });
      toast.success(data?.message || "Academy details updated successfully!");
    },
    onError: (err) => {
      const message = err.response?.data?.message || err.message || "Failed to update academy details.";
      toast.error(message);
    },
  });
}
