# MyAcademy — Defects and Fixes Log

This document records all verified defects identified during the production-readiness audit, their root causes, remediations, and verification tests.

---

### DEFECT-01: Conditional Hook Execution in BulkSendConfirmModal
- **Severity**: HIGH (React Rules of Hooks Violation)
- **Component**: `src/app/admin-panel/fees/reminders/components/BulkSendConfirmModal.js`
- **Symptom**: ESLint reported `React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render.`
- **Root Cause**: `useState` was invoked on line 45, after an early return on line 30 (`if (!isOpen || !data) return null;`). When modal state toggled, hook call count changed dynamically, risking component crash.
- **Fix**: Reordered hooks to the top of the component before any conditional early returns.
- **Verification**: `npm run lint` now passes with 0 hook order errors.

---

### DEFECT-02: Impure Functions Called Directly in Render Body
- **Severity**: MEDIUM (React 19 / Compiler Purity Warning)
- **Components**:
  - `src/app/super-admin/subscriptions/SuperAdminSubscriptionsClient.js` (`Date.now()`)
  - `src/app/admin-panel/fees/collect/CollectFeeClient.js` (`Math.random()`)
- **Symptom**: Calling impure functions directly inside component body causes hydration mismatches and unstable re-renders.
- **Fix**: Wrapped initial state computations in pure lazy initializers:
  - `useState(() => 'UPI-' + Math.floor(100000 + Math.random() * 900000))`
  - `useState(() => ({ startsAt: ..., currentPeriodEnd: ... }))`
- **Verification**: Zero purity violations reported by React Compiler rules in ESLint.

---

### DEFECT-03: Cascading State Updates in useEffect
- **Severity**: MEDIUM (Performance & Cascading Render Flaw)
- **Components**:
  - `src/app/parent-panel/attendance/ParentAttendanceClient.js`
  - `src/app/parent-panel/fees/ParentFeesClient.js`
  - `src/app/admin-panel/fees/collect/CollectFeeClient.js`
  - `src/app/Components/BookDemoModal.js`
- **Symptom**: Components used `useEffect` solely to set fallback or derived state synchronously from existing props or query parameters, triggering double renders.
- **Fix**:
  - In `ParentAttendanceClient.js` and `ParentFeesClient.js`, replaced `useEffect` with derived state `activeChildId = selectedChildId || childrenList?.[0]?.user?._id || ""`.
  - In `CollectFeeClient.js`, derived `selectedStudent` directly from `selectedStudentId` and `studentsList`.
  - In `BookDemoModal.js`, removed `setSubmitted(false)` from `useEffect` and placed it cleanly in `handleCloseModal`.
- **Verification**: React Compiler `react-hooks/set-state-in-effect` errors resolved; pages render cleanly on first pass.

---

### DEFECT-04: Broken ESLint Pipeline Due to Missing TypeScript Peer Dependency
- **Severity**: MEDIUM (Developer Experience & CI Blocker)
- **Symptom**: `npm run lint` failed with `Error: Cannot find module 'typescript'`.
- **Root Cause**: Next.js 16 flat ESLint configuration (`eslint-config-next`) requires `typescript` parser internals even in JavaScript projects. Installing unpinned typescript pulled v7 canary which lacked `ts.Extension.Cjs`.
- **Fix**: Installed pinned stable `typescript@5.7.3` as devDependency.
- **Verification**: `npm run lint` executed successfully across all source directories with zero errors.

---

### DEFECT-05: Mongoose Duplicate Schema Index Warnings
- **Severity**: LOW (Database Optimization & Log Noise)
- **Models**:
  - `Modals/Sessions.js` (`expiresAt`)
  - `Modals/Courses.js` (`slug`)
- **Symptom**: At server boot, Mongoose printed `Warning: mongoose: Duplicate schema index on {"expiresAt":1} for model "Session"` and `Course.slug`.
- **Root Cause**: Fields declared `index: true` or `unique: true` on the property and additionally declared `schema.index({ ... })`.
- **Fix**: Removed redundant `index: true` on `Sessions.expiresAt` (leaving TTL index) and removed redundant compound `courseSchema.index({ slug: 1 })`.
- **Verification**: Backend boots cleanly with zero Mongoose index warnings.

---

### DEFECT-06: Unescaped JSX Entities
- **Severity**: LOW (Syntax & HTML Standard Compliance)
- **Components**:
  - `src/app/Components/Dashboard.js`
  - `src/app/admin-panel/fees/fee-plans/FeePlansClient.js`
  - `src/app/admin-panel/fees/reminders/components/IntegrationSettingsTab.js`
- **Fix**: Escaped quotes using standard HTML entities (`&apos;`, `&quot;`).
- **Verification**: Zero `react/no-unescaped-entities` errors in ESLint.

---

### DEFECT-07: PDF Document Viewer Runtime Crash
- **Severity**: HIGH (Core Student/Teacher Feature Blocker)
- **Component**: `src/Utils/pdfViewer.js`
- **Symptom**: When clicking "View" on any chapter study material, client crashed with `TypeError: Object.defineProperty called on non-object at pdfjs-dist/build/pdf.mjs`.
- **Root Cause**: Next.js development Webpack eval source maps conflicted with `pdfjs-dist` ESM build, and the remote unpkg worker URL triggered browser cross-origin worker restrictions.
- **Fix**:
  1. Aliased `pdfjs-dist` to `node_modules/pdfjs-dist/build/pdf.min.mjs` in `next.config.mjs`.
  2. Placed same-origin worker files `pdf.worker.min.mjs` and `pdf.worker.mjs` into `public/`.
  3. Added responsive sizing with `ResizeObserver`, zoom/rotation controls, watermark overlay, and an iframe fallback toggle.
- **Verification**: Verified via `GET /pdf.worker.min.mjs` (status 200, 1,046,183 bytes) and successful rendering of student cohort study notes.

---

### DEFECT-08: Public Navbar Rendered Across Internal Portal Pages
- **Severity**: MEDIUM (UI/UX Inconsistency)
- **Component**: `src/app/Components/Navbar.js`
- **Symptom**: Public home navbar rendered above drawer layouts inside `/login`, `/admin-panel/...`, `/student-profile/...`, causing double header bars.
- **Fix**: Added route guard in `Navbar.js`:
  ```javascript
  if (pathname !== "/") {
    return null;
  }
  ```
- **Verification**: Live HTTP tests confirmed Navbar renders only on `/` (`hasNavbar: true`) and is absent on `/login`, `/student-profile/dashboard`, etc. (`hasNavbar: false`).
