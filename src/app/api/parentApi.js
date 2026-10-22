import api from "./apiInstance";

/**
 * Parent Portal API Endpoints
 */

// Get all children linked to the logged-in parent
export const getMyChildrenApi = async () => {
  const response = await api.get("/parent/children");
  return response.data;
};

// Get aggregated child overview dashboard
export const getChildDashboardApi = async (studentUserId) => {
  const response = await api.get(`/parent/children/${studentUserId}/dashboard`);
  return response.data;
};

// Get child attendance history and summary
export const getChildAttendanceApi = async (studentUserId, params = {}) => {
  const response = await api.get(`/parent/children/${studentUserId}/attendance`, {
    params,
  });
  return response.data;
};

// Get child assigned fee accounts and payment transactions
export const getChildFeesApi = async (studentUserId) => {
  const response = await api.get(`/parent/children/${studentUserId}/fees`);
  return response.data;
};
