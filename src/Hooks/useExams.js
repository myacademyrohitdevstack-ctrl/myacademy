import { useQuery } from "@tanstack/react-query";
import {
  getExamsApi,
  getExamByIdApi,
  getMyExamResultsApi,
  getChildExamResultsApi,
} from "@/app/api/examApi";
import useAuthStore from "@/store/authStore";

// List exams for admin/teacher
export const useExams = (params = {}) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["exams", params],
    queryFn: async () => {
      const response = await getExamsApi(params);
      return response.exams || [];
    },
    enabled: !!user,
  });
};

// Get single exam details with results
export const useExamDetails = (id) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["exam-details", id],
    queryFn: async () => {
      const response = await getExamByIdApi(id);
      return response;
    },
    enabled: !!user && !!id,
  });
};

// Student: get personal exam results
export const useStudentExamResults = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["student-my-exam-results"],
    queryFn: async () => {
      const response = await getMyExamResultsApi();
      return response;
    },
    enabled: !!user,
  });
};

// Parent: get child exam results
export const useChildExamResults = (studentUserId) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["parent-child-exam-results", studentUserId],
    queryFn: async () => {
      const response = await getChildExamResultsApi(studentUserId);
      return response;
    },
    enabled: !!user && !!studentUserId,
  });
};
