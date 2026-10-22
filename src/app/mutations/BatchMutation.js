import handleError from "@/Utils/handleError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createBatchApi, updatedBatchApi } from "../api/BatchApi";
import queryClient from "@/lib/queryClient";

export const useCreateBatchMutation = (resetForm) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      const response = await createBatchApi(data);
      return response.data;
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["Admin-batches"] }),
        queryClient.invalidateQueries({ queryKey: ["all-academy-batches"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-batch"] }),
        queryClient.invalidateQueries({ queryKey: ["batch"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-courses"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-stats"] }),
        queryClient.invalidateQueries({ queryKey: ["academy-batches-all"] }),
      ]);
      toast.success(data.message);
      if (resetForm) resetForm();

      setTimeout(() => {
        router.push("/admin-panel/courses");
      }, 1000);
    },
  });
};

export const useUpdateBatchMutation = (resetForm) => {
  const router = useRouter();
  return useMutation({
    mutationFn: async (data) => {
      const response = await updatedBatchApi(data);
      return response.data;
    },
    retry: false,
    onError: (error) => handleError(error),
    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["batch"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-batch"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-courses"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-batches"] }),
        queryClient.invalidateQueries({ queryKey: ["all-academy-batches"] }),
        queryClient.invalidateQueries({ queryKey: ["Admin-stats"] }),
        queryClient.invalidateQueries({ queryKey: ["academy-batches-all"] }),
      ]);
      toast.success(data.message);
      if (resetForm) resetForm();

      router.push("/admin-panel/courses");
    },
  });
};
