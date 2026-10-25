# MyAcademy — Staff Permissions Database Migration & Rollback Strategy

## 1. Schema Extensions & Impact Analysis

### A. Model: `User` (`d:\myacademy-backend\Modals\User.js`)

The changes to the `User` schema are 100% additive and backward-compatible:

| Field | Type | Default | Description | Impact on Existing Records |
| :--- | :--- | :--- | :--- | :--- |
| `role` | `String` (enum) | `"student"` | Added `"academy_staff"` to enum: `["student", "teacher", "admin", "parent", "academy_staff"]` | **Zero impact**. Existing records retain `"student"`, `"teacher"`, `"admin"`, or `"parent"`. |
| `staffTitle` | `String` | `""` | Optional title/designation for staff (e.g., `"Operations Lead"`) | **Zero impact**. Defaults to `""` for all existing documents. |
| `permissions` | `[String]` | `[]` | Explicit allowed permission keys from allowlist | **Zero impact**. Defaults to `[]` for existing documents. Admins/owners do not rely on this field. |
| `invitedBy` | `ObjectId` | `null` | Reference to the owner who created this staff account | **Zero impact**. Defaults to `null` for existing documents. |

---

## 2. Backward Compatibility Guarantee

1. **Existing Academy Admins & Owners:**
   - Existing admins have `role: "admin"`.
   - `hasPermission(user, permission)` returns `true` automatically for `user.role === "admin"`.
   - They do not need any permissions populated in their `permissions` array.
2. **Platform Super Admins:**
   - Platform super admins have `platformRole: "super_admin"`.
   - `hasPermission` returns `true` automatically.
3. **Teachers, Students, Parents:**
   - Existing role checks continue to work as previously designed.

---

## 3. Data Migration Script (Optional / Safety Baseline)

Because all added fields have safe defaults in Mongoose (`default: []`, `default: ""`, `default: null`), **no database migration script is strictly required** for the application to function immediately.

However, if you wish to backfill all pre-existing records explicitly in MongoDB:

```javascript
// Optional MongoDB Shell Backfill Script:
db.users.updateMany(
  { permissions: { $exists: false } },
  { $set: { permissions: [], staffTitle: "", invitedBy: null } }
);
```

---

## 4. Rollback Plan

If you ever need to rollback this feature:

### Step 1: Code Reversion
1. Revert `Modals/User.js` role enum to remove `"academy_staff"`.
2. Remove `Middleware/authorizePermission.js` and `Routes/staff.js`.
3. Restore original route files (`Routes/admin.js`, `Routes/fees.js`, etc.).
4. In frontend, remove `/admin-panel/staff` route.

### Step 2: Database Clean-up
If any staff accounts were created with `role: "academy_staff"`:

```javascript
// Clean-up query to deactivate or remove test staff accounts
db.users.updateMany(
  { role: "academy_staff" },
  { $set: { isDeleted: true, status: "blocked" } }
);
```
