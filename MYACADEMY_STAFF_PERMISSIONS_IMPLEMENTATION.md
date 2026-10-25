# MyAcademy — Custom Academy Staff Permissions Implementation

## 1. Executive Summary

This document details the architecture, design, and implementation of the **Custom Academy Staff Permissions System** in MyAcademy SaaS.

The system allows an Academy Owner to safely onboard a partner, senior employee, or administrative assistant (`academy_staff`) and delegate specific operational responsibilities (e.g., student admissions, fee collection, batch scheduling) without granting ownership of the academy or Super Admin platform privileges.

---

## 2. Security Boundaries & Logical Access Model

| Role | Scope | Authority & Limits |
| :--- | :--- | :--- |
| **Platform Super Admin** | Platform-wide | Manages academies, platform plans, subscriptions, and system audit logs. Retains existing unrestricted access. Cannot be demoted or managed by academy owners or staff. |
| **Academy Owner** | Single Academy | The authentic tenant owner (`Academy.owner === User._id`). Full authority over all features in their academy, plus **exclusive authority** to invite staff, grant/revoke staff permissions, suspend staff, update academy profile, and view billing/subscription quotas. |
| **Academy Staff (`academy_staff`)** | Single Academy | Delegated staff member with **explicit, server-validated permissions**. Cannot manage other staff, cannot modify academy ownership, cannot manage billing/subscription, and cannot access platform Super Admin features. Has zero access to unassigned modules. |
| **Teacher / Student / Parent** | Scoped | Retains existing functionality, assignments, parent-child links, and attendance controls without privilege broadening. |

---

## 3. Server-Controlled Permission Catalog & Allowlist

All permissions are governed by a server-controlled allowlist in [`Utils/permissions.js`](file:///d:/myacademy-backend/Utils/permissions.js):

### Grouped Permission Catalog:

1. **Students**
   - `students.read`: View student directory & profile details.
   - `students.create`: Admit new students individually or via bulk import.
   - `students.update`: Edit student details, approve, reject, or block accounts.
   - `students.delete`: Remove student accounts.
2. **Teachers**
   - `teachers.read`: Browse faculty directory.
   - `teachers.create`: Add new teacher accounts.
   - `teachers.update`: Update teacher details.
   - `teachers.delete`: Remove teacher accounts.
3. **Batches & Courses**
   - `batches.read`, `batches.create`, `batches.update`, `batches.delete`: Cohort management.
   - `courses.read`, `courses.create`, `courses.update`, `courses.delete`: Curriculum & catalog.
4. **Attendance**
   - `attendance.read`: View attendance registers & dashboards.
   - `attendance.create`: Mark daily roll calls.
   - `attendance.update`: Edit or correct historical roll calls.
5. **Fees & Financials**
   - `fees.read`: View fee ledgers, student dues, transactions & receipts.
   - `fees.create`: Collect fee payments & create fee plans.
   - `fees.update`: Modify installment templates and plan terms.
   - `fees.delete`: Perform payment reversals or archive plans.
6. **Exams & Homework**
   - `exams.read`, `exams.manage`: Assessments, grades, report cards.
   - `homework.read`, `homework.manage`: Assignments & grading.
7. **Communications & Alerts**
   - `announcements.manage`: Broadcast updates.
   - `reminders.read`, `reminders.send`: WhatsApp fee reminder engine.
8. **Reports & Analytics**
   - `reports.read`: Financial cashbooks, revenue trends & executive stats.
9. **Academy Settings**
   - `academy_settings.read`: View academy profile.
   - `academy_settings.update`: Modify branding, address, receipt notes.
10. **Staff Management (Owner Only)**
    - `staff.read`, `staff.invite`, `staff.permissions.manage`: Strictly enforced owner-only operations.

---

## 4. Backend Implementation Details

### A. Database Model Changes (`Modals/User.js`)
- Added `"academy_staff"` to `role` enum.
- Added `permissions: { type: [String], default: [] }` with a Mongoose validator verifying each string against `VALID_PERMISSIONS_LIST`.
- Added `staffTitle: { type: String, default: "", trim: true, maxlength: 100 }`.
- Added `invitedBy: { type: ObjectId, ref: "User", default: null }`.

### B. Authorization Middleware (`Middleware/authorizePermission.js`)
- `requirePermission(permission)`: Checks `hasPermission(req.user, permission)`. Returns `403 Forbidden` if missing.
- `requireAnyPermission(...permissions)`: Requires at least one permission in the list.
- `requirePermissionOrRole(permission, ...roles)`: Allows access if user has one of the roles OR possesses the permission.
- `requireAcademyOwner`: Restricts action strictly to `isAcademyOwner(req.user, req.academy)`.

### C. Route Protections
- `/api/admin/staff`: Protected with `protect, requireAcademyOwner`.
- `/api/admin/subscription-usage`: Protected with `protect, requireAcademyOwner`.
- Protected routes across `admin.js`, `fees.js`, `batches.js`, `courses.js`, `attendence.js`, `whatsappReminders.js`, `exam.js`, `homework.js`, and `announcement.js`.

### D. Immediate Invalidation & Security Checks
- In `protect.js`, the user is loaded directly from the database on every authenticated request (`User.findOne({ _id: decoded.id })`). Any permission revocation, status change, or account suspension takes effect **immediately** on the very next HTTP request without requiring token expiration or re-login.
- Defense-in-depth: Staff members cannot approve, reject, block, update, or delete administrative/owner accounts.

---

## 5. Frontend Implementation Details

### A. Navigation & UI Filtering (`AdminDrawerNav.js`)
- Responsive sidebar navigation dynamically filters links based on `usePermissions()`.
- "Academy Staff" navigation link is strictly visible only to the Academy Owner (`ownerOnly: true`).
- Modular links (Fees, Students, Teachers, Exams, etc.) are only rendered if the logged-in user possesses the required permission.

### B. Owner Staff Management Interface (`/admin-panel/staff`)
- **Directory Overview:** Searchable & filterable directory of all academy staff members with status badges (Active/Suspended) and granted permission pills.
- **Add Staff Member Modal:**
  - Full Name, Email, Phone, Password (min 8 chars), and Designation.
  - One-click presets: *Academic Staff*, *Accountant / Fee Officer*, *Operations Partner*.
  - Grouped category permission checkboxes with "Select/Deselect All Category" toggles.
- **Permissions Editor Modal:** Live configuration of individual permissions with instant updates.
- **Profile Editor Modal:** Update staff designation, phone, or name.
- **Suspend / Activate Toggle:** Temporarily lock or restore staff account access.
- **Soft Deletion Modal:** Soft-delete staff accounts with confirmation.
- **Non-Owner Defense:** If accessed directly by URL by a non-owner, displays a clear Access Restricted card.
