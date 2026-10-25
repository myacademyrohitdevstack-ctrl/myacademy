# MyAcademy — Staff Permissions Automated Test Suite & Verification Runbook

## 1. Test Suite Summary

- **Test Framework:** Node.js native test runner (`node:test`, `node:assert`)
- **Backend Test File:** [`d:\myacademy-backend\tests\staffPermissions.test.js`](file:///d:/myacademy-backend/tests/staffPermissions.test.js)
- **Total Test Cases Executed:** 58 tests across 16 test suites
- **Overall Result:** **58 Passed, 0 Failed, 0 Cancelled, 0 Skipped** (Duration: ~965ms)

---

## 2. Test Scenarios Implemented & Verified

### Scenario 1: Staff Member with Permission Granted Succeeds
- **Objective:** Verify that when `academy_staff` has a permission (e.g., `fees.read`, `fees.create`), access is granted through `requirePermission`.
- **Outcome:** `hasPermission(user, 'fees.read') === true`; HTTP request passes cleanly to `next()`.

### Scenario 2: Staff Member Without Permission Receives 403 Forbidden
- **Objective:** Verify that when `academy_staff` lacks a permission (e.g., `fees.delete`), access is rejected.
- **Outcome:** `res.status(403)` returned with message: `"Access denied. Required permission: 'fees.delete'."`.

### Scenario 3: `requirePermissionOrRole` Permits Role or Explicit Permission
- **Objective:** Verify dual-path authorization for shared endpoints.
- **Outcome:**
  - Teacher accesses via `role: "teacher"`.
  - Staff accesses via granted `students.read` permission.
  - Staff without `students.read` receives `403 Forbidden`.

### Scenario 4: `requireAcademyOwner` Strictly Restricts Staff From Owner Actions
- **Objective:** Ensure staff members, even with elevated permissions, cannot access owner-only routes (e.g., `/api/admin/staff`, `/api/admin/subscription-usage`).
- **Outcome:**
  - Academy Owner passes verification.
  - Platform Super Admin passes verification.
  - Staff member with all permissions receives `403 Forbidden` (`isAcademyOwner === false`).

### Scenario 5: Server-Controlled Allowlist Rejects Arbitrary / Injected Permissions
- **Objective:** Prevent malicious actors from sending arbitrary permission strings (e.g., `superadmin.takeover`, `billing.bypass`, `__proto__.pollute`).
- **Outcome:** Invalid strings are rejected by allowlist validation filter against `VALID_PERMISSIONS_LIST`.

### Scenario 6: Immediate Revocation Without Token Renewal
- **Objective:** Verify that database changes take effect immediately on subsequent requests without requiring user re-login.
- **Outcome:** Fresh user record loaded from DB evaluates updated permissions on the subsequent request; revoked permission is instantly denied.

### Scenario 7: Suspended / Blocked Staff Member Access Denied
- **Objective:** Verify that `status: "blocked"` or `approvalStatus: "rejected"` immediately terminates portal access.
- **Outcome:** Blocked staff member is rejected with `401 Unauthorized`.

### Scenario 8: Cross-Tenant Isolation
- **Objective:** Verify that Academy A staff cannot view or alter Academy B resources even if they hold the required permission.
- **Outcome:** `authorizeResourceAccess` detects tenant ID mismatch (`academyA !== academyB`) and returns `404 Not Found in this academy`.

### Scenario 9: Backward Compatibility for Academy Owner & Admins
- **Objective:** Ensure existing Academy Admins/Owners retain 100% full access to all features.
- **Outcome:** `hasPermission` returns `true` for all permissions in `VALID_PERMISSIONS_LIST`.

---

## 3. How to Run the Test Suite

Run the following command from the backend directory:

```bash
cd d:\myacademy-backend
npm test
```
