import api from "./apiInstance";

/**
 * Super Admin Platform Endpoints
 */

// Platform analytics metrics and overview
export const getSuperAdminDashboardApi = async () => {
  const response = await api.get("/super-admin/dashboard");
  return response.data;
};

// List academies with pagination, status filter, and search
export const getSuperAdminAcademiesApi = async (params = {}) => {
  const response = await api.get("/super-admin/academies", { params });
  return response.data;
};

// Update academy status (active, inactive, suspended) with reason
export const updateAcademyStatusApi = async (academyId, data) => {
  const response = await api.patch(`/super-admin/academies/${academyId}/status`, data);
  return response.data;
};

// List platform SaaS plans
export const getSuperAdminPlansApi = async () => {
  const response = await api.get("/super-admin/plans");
  return response.data;
};

// Create a new platform SaaS plan
export const createSuperAdminPlanApi = async (data) => {
  const response = await api.post("/super-admin/plans", data);
  return response.data;
};

// Update an existing platform SaaS plan
export const updateSuperAdminPlanApi = async (planId, data) => {
  const response = await api.patch(`/super-admin/plans/${planId}`, data);
  return response.data;
};

// List academy subscriptions
export const getSuperAdminSubscriptionsApi = async (params = {}) => {
  const response = await api.get("/super-admin/subscriptions", { params });
  return response.data;
};

// Assign or upgrade academy subscription
export const assignSuperAdminSubscriptionApi = async (data) => {
  const response = await api.post("/super-admin/subscriptions", data);
  return response.data;
};

// Query platform audit logs
export const getSuperAdminAuditLogsApi = async (params = {}) => {
  const response = await api.get("/super-admin/audit-logs", { params });
  return response.data;
};
