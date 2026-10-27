import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import handleError from "@/Utils/handleError";
import {
  createTimetableApi,
  updateTimetableApi,
  toggleTimetableStatusApi,
  deleteTimetableApi,
  createExtraSessionApi,
  cancelSessionApi,
  rescheduleSessionApi,
  assignSubstituteTeacherApi,
  triggerSessionGenerationApi,
  requestTeacherLeaveApi,
  reviewTeacherLeaveApi,
  cancelTeacherLeaveApi,
  requestStudentLeaveApi,
  reviewStudentLeaveApi,
  cancelStudentLeaveApi,
  createHolidayApi,
  deleteHolidayApi,
} from "@/app/api/timetableAndAttendanceApi";

export const useCreateTimetableMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => (await createTimetableApi(data)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["timetables"] });
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-today-sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-upcoming-sessions"] });
      toast.success(data.message || "Timetable created successfully.");
    },
    onError: handleError,
  });
};

export const useUpdateTimetableMutation = (id) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => (await updateTimetableApi(id, data)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["timetables"] });
      qc.invalidateQueries({ queryKey: ["timetable", id] });
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-today-sessions"] });
      toast.success(data.message || "Timetable updated successfully.");
    },
    onError: handleError,
  });
};

export const useToggleTimetableStatusMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => (await toggleTimetableStatusApi(id, data)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["timetables"] });
      qc.invalidateQueries({ queryKey: ["sessions"] });
      toast.success(data.message || "Timetable status updated.");
    },
    onError: handleError,
  });
};

export const useDeleteTimetableMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => (await deleteTimetableApi(id)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["timetables"] });
      qc.invalidateQueries({ queryKey: ["sessions"] });
      toast.success(data.message || "Timetable deleted successfully.");
    },
    onError: handleError,
  });
};

export const useCreateExtraSessionMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => (await createExtraSessionApi(data)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-today-sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-upcoming-sessions"] });
      toast.success(data.message || "Extra session scheduled successfully.");
    },
    onError: handleError,
  });
};

export const useCancelSessionMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => (await cancelSessionApi(id, data)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-today-sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-pending-sessions"] });
      qc.invalidateQueries({ queryKey: ["make-up-due-sessions"] });
      toast.success(data.message || "Session cancelled successfully.");
    },
    onError: handleError,
  });
};

export const useRescheduleSessionMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => (await rescheduleSessionApi(id, data)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-today-sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-upcoming-sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-pending-sessions"] });
      toast.success(data.message || "Session rescheduled successfully.");
    },
    onError: handleError,
  });
};

export const useAssignSubstituteMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }) => (await assignSubstituteTeacherApi(id, data)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-today-sessions"] });
      toast.success(data.message || "Substitute teacher assigned.");
    },
    onError: handleError,
  });
};

export const useTriggerSessionGenerationMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => (await triggerSessionGenerationApi()).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-today-sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-upcoming-sessions"] });
      toast.success(data.message || "Session generation triggered.");
    },
    onError: handleError,
  });
};

export const useRequestTeacherLeaveMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => (await requestTeacherLeaveApi(data)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["teacher-leaves"] });
      toast.success(data.message || "Teacher leave request submitted.");
    },
    onError: handleError,
  });
};

export const useReviewTeacherLeaveMutation = (id) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => (await reviewTeacherLeaveApi(id, data)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["teacher-leaves"] });
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-today-sessions"] });
      toast.success(data.message || "Teacher leave reviewed successfully.");
    },
    onError: handleError,
  });
};

export const useCancelTeacherLeaveMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => (await cancelTeacherLeaveApi(id)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["teacher-leaves"] });
      toast.success(data.message || "Teacher leave cancelled.");
    },
    onError: handleError,
  });
};

export const useRequestStudentLeaveMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => (await requestStudentLeaveApi(data)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["my-student-leaves"] });
      toast.success(data.message || "Student leave requested.");
    },
    onError: handleError,
  });
};

export const useReviewStudentLeaveMutation = (id) => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => (await reviewStudentLeaveApi(id, data)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["academy-student-leaves"] });
      qc.invalidateQueries({ queryKey: ["my-student-leaves"] });
      qc.invalidateQueries({ queryKey: ["Attendence"] });
      toast.success(data.message || "Student leave reviewed successfully.");
    },
    onError: handleError,
  });
};

export const useCancelStudentLeaveMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => (await cancelStudentLeaveApi(id)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["my-student-leaves"] });
      toast.success(data.message || "Leave request cancelled.");
    },
    onError: handleError,
  });
};

export const useCreateHolidayMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => (await createHolidayApi(data)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["holidays"] });
      qc.invalidateQueries({ queryKey: ["sessions"] });
      qc.invalidateQueries({ queryKey: ["teacher-today-sessions"] });
      toast.success(data.message || "Holiday created successfully.");
    },
    onError: handleError,
  });
};

export const useDeleteHolidayMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => (await deleteHolidayApi(id)).data,
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ["holidays"] });
      qc.invalidateQueries({ queryKey: ["sessions"] });
      toast.success(data.message || "Holiday deleted.");
    },
    onError: handleError,
  });
};
