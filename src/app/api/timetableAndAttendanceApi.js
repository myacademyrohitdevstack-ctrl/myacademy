import api from "./apiInstance";

// --- TIMETABLES ---
export const getTimetablesApi = (params = {}) => api.get("/timetables", { params });
export const getTimetableByIdApi = (id) => api.get(`/timetables/${id}`);
export const createTimetableApi = (data) => api.post("/timetables", data);
export const updateTimetableApi = (id, data) => api.put(`/timetables/${id}`, data);
export const toggleTimetableStatusApi = (id, data) => api.patch(`/timetables/${id}/status`, data);
export const deleteTimetableApi = (id) => api.delete(`/timetables/${id}`);
export const checkTimetableConflictApi = (data) => api.post("/timetables/check-conflict", data);

// --- SESSIONS ---
export const getSessionsApi = (params = {}) => api.get("/sessions", { params });
export const getSessionByIdApi = (id) => api.get(`/sessions/${id}`);
export const getTeacherTodaySessionsApi = () => api.get("/sessions/teacher/today");
export const getTeacherUpcomingSessionsApi = () => api.get("/sessions/teacher/upcoming");
export const getTeacherPendingSessionsApi = () => api.get("/sessions/teacher/pending-attendance");
export const createExtraSessionApi = (data) => api.post("/sessions/extra", data);
export const cancelSessionApi = (id, data) => api.post(`/sessions/${id}/cancel`, data);
export const rescheduleSessionApi = (id, data) => api.post(`/sessions/${id}/reschedule`, data);
export const assignSubstituteTeacherApi = (id, data) => api.post(`/sessions/${id}/substitute`, data);
export const getMakeUpDueSessionsApi = () => api.get("/sessions/make-up-due");
export const triggerSessionGenerationApi = () => api.post("/sessions/generate");

// --- TEACHER LEAVES ---
export const requestTeacherLeaveApi = (data) => api.post("/teacher-leave", data);
export const getTeacherLeavesApi = (params = {}) => api.get("/teacher-leave", { params });
export const previewTeacherLeaveAffectedApi = (params = {}) =>
  api.get("/teacher-leave/preview-affected", { params });
export const reviewTeacherLeaveApi = (id, data) => api.put(`/teacher-leave/${id}/review`, data);
export const cancelTeacherLeaveApi = (id) => api.patch(`/teacher-leave/${id}/cancel`);

// --- STUDENT LEAVES ---
export const requestStudentLeaveApi = (data) => api.post("/student-leave", data);
export const getMyStudentLeavesApi = () => api.get("/student-leave/my");
export const getAcademyStudentLeavesApi = (params = {}) => api.get("/student-leave", { params });
export const reviewStudentLeaveApi = (id, data) => api.put(`/student-leave/${id}/review`, data);
export const cancelStudentLeaveApi = (id) => api.patch(`/student-leave/${id}/cancel`);

// --- HOLIDAYS ---
export const getHolidaysApi = (params = {}) => api.get("/holidays", { params });
export const createHolidayApi = (data) => api.post("/holidays", data);
export const previewHolidayAffectedApi = (params = {}) =>
  api.get("/holidays/preview-affected", { params });
export const deleteHolidayApi = (id) => api.delete(`/holidays/${id}`);

// --- ATTENDANCE & AUDIT ---
export const getAttendanceReportsSummaryApi = (params = {}) =>
  api.get("/attendence/reports/summary", { params });
export const getAttendanceAuditLogsApi = (params = {}) =>
  api.get("/attendence/audit-logs", { params });
export const getStudentAttendanceReportApi = (studentId) =>
  api.get(`/attendence/student/${studentId}`);
