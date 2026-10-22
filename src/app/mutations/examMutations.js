import handleError from "@/Utils/handleError";
import queryClient from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createExamApi,
  updateExamApi,
  deleteExamApi,
  saveExamResultsApi,
} from "@/app/api/examApi";

export const useCreateExamMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await createExamApi(data);
      return response;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      toast.success(data.message || "Exam created successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useUpdateExamMutation = (id) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await updateExamApi(id, data);
      return response;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      queryClient.invalidateQueries({ queryKey: ["exam-details", id] });
      toast.success(data.message || "Exam updated successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useDeleteExamMutation = () => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await deleteExamApi(id);
      return response;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      toast.success(data.message || "Exam deleted successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useSaveExamResultsMutation = (examId) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await saveExamResultsApi(examId, data);
      return response;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      queryClient.invalidateQueries({ queryKey: ["exam-details", examId] });
      queryClient.invalidateQueries({ queryKey: ["student-my-exam-results"] });
      queryClient.invalidateQueries({ queryKey: ["parent-child-exam-results"] });
      toast.success(data.message || "Exam marks published successfully");
    },
    onError: (error) => handleError(error),
  });
};
