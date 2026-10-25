import api from "./apiInstance";

/**
 * Returns grouped permission categories and valid allowlist keys.
 */
export function getStaffCatalogApi() {
  return api.get("/admin/staff/permissions-catalog");
}

/**
 * Lists all staff members in the academy.
 */
export function getStaffMembersApi() {
  return api.get("/admin/staff");
}

/**
 * Fetches single staff member by ID.
 */
export function getStaffMemberByIdApi(id) {
  return api.get(`/admin/staff/${id}`);
}

/**
 * Creates / onboards a new staff member.
 */
export function createStaffMemberApi(data) {
  return api.post("/admin/staff", data);
}

/**
 * Updates staff permissions.
 */
export function updateStaffPermissionsApi(id, permissions) {
  return api.patch(`/admin/staff/${id}/permissions`, { permissions });
}

/**
 * Updates staff profile details (fullName, phone, staffTitle).
 */
export function updateStaffProfileApi(id, data) {
  return api.patch(`/admin/staff/${id}/profile`, data);
}

/**
 * Toggles staff status (active / blocked).
 */
export function updateStaffStatusApi(id, data) {
  return api.patch(`/admin/staff/${id}/status`, data);
}

/**
 * Soft deletes staff member.
 */
export function deleteStaffMemberApi(id) {
  return api.delete(`/admin/staff/${id}`);
}
