import api from "./apiInstance";

/**
 * Academy Admin Parent Management Endpoints
 */

// List active parent-student links for the academy
export const listParentLinksApi = async () => {
  const response = await api.get("/admin/parent-links");
  return response.data;
};

// Create a new parent user account (with optional immediate student link)
export const createParentAccountApi = async (data) => {
  const response = await api.post("/admin/parent-links/create-parent", data);
  return response.data;
};

// Link a parent user account to a student user account
export const linkParentStudentApi = async (data) => {
  const response = await api.post("/admin/parent-links/link", data);
  return response.data;
};

// Revoke an active parent-student link
export const unlinkParentStudentApi = async (parentId, studentUserId) => {
  const response = await api.delete(`/admin/parent-links/${parentId}/${studentUserId}`);
  return response.data;
};
