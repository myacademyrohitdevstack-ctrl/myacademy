import handleError from "@/Utils/handleError";
import queryClient from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createHomeworkApi,
  updateHomeworkApi,
  deleteHomeworkApi,
  submitHomeworkApi,
  gradeSubmissionApi,
} from "@/app/api/homeworkApi";

export const useCreateHomeworkMutation = () => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await createHomeworkApi(data);
      return response;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["homework-list"] });
      toast.success(data.message || "Homework created successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useUpdateHomeworkMutation = (id) => {
  return useMutation({
    mutationFn: async (data) => {
      const response = await updateHomeworkApi(id, data);
      return response;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["homework-list"] });
      queryClient.invalidateQueries({ queryKey: ["homework-details", id] });
      toast.success(data.message || "Homework updated successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useDeleteHomeworkMutation = () => {
  return useMutation({
    mutationFn: async (id) => {
      const response = await deleteHomeworkApi(id);
      return response;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["homework-list"] });
      toast.success(data.message || "Homework deleted successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useSubmitHomeworkMutation = (defaultHomeworkId) => {
  return useMutation({
    mutationFn: async (payload) => {
      const { homeworkId, ...data } = payload || {};
      const targetId = homeworkId || defaultHomeworkId;
      const response = await submitHomeworkApi(targetId, data);
      return response;
    },
    retry: false,
    onSuccess: (data, variables) => {
      const targetId = variables?.homeworkId || defaultHomeworkId;
      queryClient.invalidateQueries({ queryKey: ["student-my-homework"] });
      if (targetId) {
        queryClient.invalidateQueries({ queryKey: ["homework-details", targetId] });
      }
      toast.success(data?.message || "Homework submitted successfully");
    },
    onError: (error) => handleError(error),
  });
};

export const useGradeSubmissionMutation = (homeworkId) => {
  return useMutation({
    mutationFn: async ({ submissionId, ...data }) => {
      const response = await gradeSubmissionApi(homeworkId, submissionId, data);
      return response;
    },
    retry: false,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["homework-list"] });
      queryClient.invalidateQueries({ queryKey: ["homework-details", homeworkId] });
      queryClient.invalidateQueries({ queryKey: ["student-my-homework"] });
      queryClient.invalidateQueries({ queryKey: ["parent-child-homework"] });
      toast.success(data.message || "Submission graded successfully");
    },
    onError: (error) => handleError(error),
  });
};
