import { useQuery } from "@tanstack/react-query";
import {
  getTimetablesApi,
  getTimetableByIdApi,
  getSessionsApi,
  getSessionByIdApi,
  getTeacherTodaySessionsApi,
  getTeacherUpcomingSessionsApi,
  getTeacherPendingSessionsApi,
  getMakeUpDueSessionsApi,
  getHolidaysApi,
  getTeacherLeavesApi,
  getMyStudentLeavesApi,
  getAcademyStudentLeavesApi,
  getAttendanceReportsSummaryApi,
  getAttendanceAuditLogsApi,
  getStudentAttendanceReportApi,
} from "@/app/api/timetableAndAttendanceApi";

export const useGetTeacherTodaySessions = () =>
  useQuery({
    queryKey: ["teacher-today-sessions"],
    queryFn: async () => {
      const res = await getTeacherTodaySessionsApi();
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
  });

export const useGetTeacherUpcomingSessions = () =>
  useQuery({
    queryKey: ["teacher-upcoming-sessions"],
    queryFn: async () => {
      const res = await getTeacherUpcomingSessionsApi();
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useGetTeacherPendingSessions = () =>
  useQuery({
    queryKey: ["teacher-pending-sessions"],
    queryFn: async () => {
      const res = await getTeacherPendingSessionsApi();
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
  });

export const useGetTimetables = (params = {}) =>
  useQuery({
    queryKey: ["timetables", params],
    queryFn: async () => {
      const res = await getTimetablesApi(params);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useGetTimetableById = (id) =>
  useQuery({
    queryKey: ["timetable", id],
    queryFn: async () => {
      const res = await getTimetableByIdApi(id);
      return res.data;
    },
    enabled: Boolean(id),
  });

export const useGetSessions = (params = {}) =>
  useQuery({
    queryKey: ["sessions", params],
    queryFn: async () => {
      const res = await getSessionsApi(params);
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
  });

export const useGetSessionById = (id) =>
  useQuery({
    queryKey: ["session", id],
    queryFn: async () => {
      const res = await getSessionByIdApi(id);
      return res.data;
    },
    enabled: Boolean(id),
  });

export const useGetMakeUpDueSessions = () =>
  useQuery({
    queryKey: ["make-up-due-sessions"],
    queryFn: async () => {
      const res = await getMakeUpDueSessionsApi();
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useGetHolidays = (params = {}) =>
  useQuery({
    queryKey: ["holidays", params],
    queryFn: async () => {
      const res = await getHolidaysApi(params);
      return res.data;
    },
    staleTime: 1000 * 60 * 10,
  });

export const useGetTeacherLeaves = (params = {}) =>
  useQuery({
    queryKey: ["teacher-leaves", params],
    queryFn: async () => {
      const res = await getTeacherLeavesApi(params);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useGetMyStudentLeaves = () =>
  useQuery({
    queryKey: ["my-student-leaves"],
    queryFn: async () => {
      const res = await getMyStudentLeavesApi();
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useGetAcademyStudentLeaves = (params = {}) =>
  useQuery({
    queryKey: ["academy-student-leaves", params],
    queryFn: async () => {
      const res = await getAcademyStudentLeavesApi(params);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useGetAttendanceReportsSummary = (params = {}) =>
  useQuery({
    queryKey: ["attendance-reports-summary", params],
    queryFn: async () => {
      const res = await getAttendanceReportsSummaryApi(params);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useGetAttendanceAuditLogs = (params = {}) =>
  useQuery({
    queryKey: ["attendance-audit-logs", params],
    queryFn: async () => {
      const res = await getAttendanceAuditLogsApi(params);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const useGetStudentAttendanceReport = (studentId) =>
  useQuery({
    queryKey: ["student-attendance-report", studentId],
    queryFn: async () => {
      const res = await getStudentAttendanceReportApi(studentId);
      return res.data;
    },
    enabled: Boolean(studentId),
  });
