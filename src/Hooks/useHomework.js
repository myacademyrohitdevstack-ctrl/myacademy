import { useQuery } from "@tanstack/react-query";
import {
  getHomeworkListApi,
  getHomeworkByIdApi,
  getMyHomeworkApi,
  getChildHomeworkApi,
} from "@/app/api/homeworkApi";
import useAuthStore from "@/store/authStore";

// List homework assignments for admin/teacher
export const useHomeworkList = (params = {}) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["homework-list", params],
    queryFn: async () => {
      const response = await getHomeworkListApi(params);
      return response.assignments || [];
    },
    enabled: !!user,
  });
};

// Get single homework details with submissions
export const useHomeworkDetails = (id) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["homework-details", id],
    queryFn: async () => {
      const response = await getHomeworkByIdApi(id);
      return response;
    },
    enabled: !!user && !!id,
  });
};

// Student: get all my assigned homework
export const useStudentHomework = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["student-my-homework"],
    queryFn: async () => {
      const response = await getMyHomeworkApi();
      return response;
    },
    enabled: !!user,
  });
};

// Parent: get child homework
export const useChildHomework = (studentUserId) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["parent-child-homework", studentUserId],
    queryFn: async () => {
      const response = await getChildHomeworkApi(studentUserId);
      return response;
    },
    enabled: !!user && !!studentUserId,
  });
};
