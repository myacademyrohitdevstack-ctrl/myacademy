import {
  getFeesDashboardApi,
  getFeesReportsApi,
  getFeePlansApi,
  getAcademyBatchesApi,
  searchFeeStudentsApi,
  listStudentFeesApi,
  getStudentFeeSummaryApi,
  getPendingFeesApi,
  listPaymentsApi,
  getReceiptApi,
} from "@/app/api/feesApi";
import useAuthStore from "@/store/authStore";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useFeesDashboard = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["fees-dashboard"],
    queryFn: async () => {
      const response = await getFeesDashboardApi();
      return response.data?.data;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useFeesReports = (params = {}) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["fees-reports", params],
    queryFn: async () => {
      const response = await getFeesReportsApi(params);
      return response.data?.data;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useFeePlans = (params = {}) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["fees-plans", params],
    queryFn: async () => {
      const response = await getFeePlansApi(params);
      return response.data;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useAcademyBatches = () => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["academy-batches-all"],
    queryFn: async () => {
      const response = await getAcademyBatchesApi();
      return response.data?.data || [];
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useSearchFeeStudents = (params = {}, options = {}) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["fees-students", params],
    queryFn: async () => {
      const response = await searchFeeStudentsApi(params);
      return response.data?.data || [];
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user && (options.enabled !== undefined ? options.enabled : true),
  });
};

export const useStudentFees = (params = {}, options = {}) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["fees-student-fees", params],
    queryFn: async () => {
      const response = await listStudentFeesApi(params);
      return response.data?.data || [];
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user && (options.enabled !== undefined ? options.enabled : true),
  });
};

export const useStudentFeeSummary = (studentId) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["fees-student-summary", studentId],
    queryFn: async () => {
      const response = await getStudentFeeSummaryApi(studentId);
      return response.data?.data;
    },
    enabled: !!user && !!studentId,
  });
};

export const usePendingFees = (params = {}) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["fees-pending", params],
    queryFn: async () => {
      const response = await getPendingFeesApi(params);
      return response.data?.data || [];
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useFeePayments = (params = {}) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["fees-payments", params],
    queryFn: async () => {
      const response = await listPaymentsApi(params);
      return response.data;
    },
    keepPreviousData: true,
    placeholderData: keepPreviousData,
    enabled: !!user,
  });
};

export const useFeeReceipt = (id) => {
  const user = useAuthStore.getState().user;
  return useQuery({
    queryKey: ["fees-receipt", id],
    queryFn: async () => {
      const response = await getReceiptApi(id);
      return response.data?.data;
    },
    enabled: !!user && !!id,
  });
};
