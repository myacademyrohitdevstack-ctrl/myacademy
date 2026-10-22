import api from "./apiInstance";

/**
 * Exam & Results API Endpoints
 */

// Create new exam (Admin, Teacher)
export const createExamApi = async (data) => {
  const response = await api.post("/exams", data);
  return response.data;
};

// List exams with optional query params (batchId, status)
export const getExamsApi = async (params = {}) => {
  const response = await api.get("/exams", { params });
  return response.data;
};

// Get single exam details with students and results
export const getExamByIdApi = async (id) => {
  const response = await api.get(`/exams/${id}`);
  return response.data;
};

// Update exam
export const updateExamApi = async (id, data) => {
  const response = await api.patch(`/exams/${id}`, data);
  return response.data;
};

// Delete exam
export const deleteExamApi = async (id) => {
  const response = await api.delete(`/exams/${id}`);
  return response.data;
};

// Bulk save exam results / marks
export const saveExamResultsApi = async (id, data) => {
  const response = await api.post(`/exams/${id}/results`, data);
  return response.data;
};

// Student: get my own exam results
export const getMyExamResultsApi = async () => {
  const response = await api.get("/exams/my-results");
  return response.data;
};

// Parent: get linked child exam results
export const getChildExamResultsApi = async (studentUserId) => {
  const response = await api.get(`/exams/parent/${studentUserId}`);
  return response.data;
};
