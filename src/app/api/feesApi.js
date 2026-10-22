import api from "./apiInstance";

// Dashboard & Analytics
export function getFeesDashboardApi() {
  return api.get("/fees/dashboard");
}

export function getFeesReportsApi(params = {}) {
  return api.get("/fees/reports", { params });
}

// Fee Plans
export function getFeePlansApi(params = {}) {
  return api.get("/fees/plans", { params });
}

export function getAcademyBatchesApi() {
  return api.get("/fees/batches");
}

export function createFeePlanApi(data) {
  return api.post("/fees/plans", data);
}

export function updateFeePlanApi(id, data) {
  return api.patch(`/fees/plans/${id}`, data);
}

export function archiveFeePlanApi(id) {
  return api.delete(`/fees/plans/${id}`);
}

// Students & Fee Accounts
export function searchFeeStudentsApi(params = {}) {
  return api.get("/fees/students", { params });
}

export function listStudentFeesApi(params = {}) {
  return api.get("/fees/student-fees", { params });
}

export function assignFeePlanApi(data) {
  return api.post("/fees/assign", data);
}

export function getStudentFeeSummaryApi(studentId) {
  return api.get(`/fees/students/${studentId}/summary`);
}

export function getPendingFeesApi(params = {}) {
  return api.get("/fees/pending", { params });
}

// Payments & Receipts
export function collectPaymentApi(data) {
  return api.post("/fees/payments", data);
}

export function listPaymentsApi(params = {}) {
  return api.get("/fees/payments", { params });
}

export function getReceiptApi(id) {
  return api.get(`/fees/payments/${id}/receipt`);
}

export function reversePaymentApi(id, data) {
  return api.post(`/fees/payments/${id}/reverse`, data);
}
