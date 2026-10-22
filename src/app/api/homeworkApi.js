import api from "./apiInstance";

/**
 * Homework & Submissions API Endpoints
 */

// Create new homework assignment (Admin, Teacher)
export const createHomeworkApi = async (data) => {
  const response = await api.post("/homework", data);
  return response.data;
};

// List homework assignments with optional query params (batchId, status)
export const getHomeworkListApi = async (params = {}) => {
  const response = await api.get("/homework", { params });
  return response.data;
};

// Get single homework details with submissions
export const getHomeworkByIdApi = async (id) => {
  const response = await api.get(`/homework/${id}`);
  return response.data;
};

// Update homework
export const updateHomeworkApi = async (id, data) => {
  const response = await api.patch(`/homework/${id}`, data);
  return response.data;
};

// Delete homework
export const deleteHomeworkApi = async (id) => {
  const response = await api.delete(`/homework/${id}`);
  return response.data;
};

// Student: submit homework solution
export const submitHomeworkApi = async (id, data) => {
  const response = await api.post(`/homework/${id}/submit`, data);
  return response.data;
};

// Admin / Teacher: grade a student submission
export const gradeSubmissionApi = async (homeworkId, submissionId, data) => {
  const response = await api.patch(`/homework/${homeworkId}/grade/${submissionId}`, data);
  return response.data;
};

// Student: get all assigned homework with submission status
export const getMyHomeworkApi = async () => {
  const response = await api.get("/homework/my-homework");
  return response.data;
};

// Parent: get linked child homework status
export const getChildHomeworkApi = async (studentUserId) => {
  const response = await api.get(`/homework/parent/${studentUserId}`);
  return response.data;
};
