# MyAcademy / Inquisitive Mind Academy — Audit Baseline Report

**Audit Date:** October 24, 2026  
**Auditor:** Antigravity Senior Full-Stack Engineering & Security Team  
**Scope:** Full-stack inspection of Frontend (`d:\inquistivemind`) and Backend (`d:\myacademy-backend`, WSL `/home/rohit/myacademy-Backend`).

---

## 1. Environment & Architecture Overview

| Component | Technology | Version | Location |
|---|---|---|---|
| Frontend Framework | Next.js (App Router, JavaScript) | 16.2.9 | `d:\inquistivemind` |
| UI & Styling | Tailwind CSS v4, Framer Motion, Lucide-React | 4.x / 12.40 / 1.61 | Frontend |
| State Management | Zustand | 5.0.14 | Frontend (`src/store/`) |
| Data Fetching | TanStack React Query | 5.101.0 | Frontend (`src/providers/ReactQueryProvider.js`) |
| Backend Runtime | Node.js (Express v5) | Express 5.2.1, Node v22 (WSL) | `d:\myacademy-backend` |
| Database | MongoDB via Mongoose | 9.7.1 | MongoDB Atlas / Local cluster |
| File Storage | Cloudinary (raw & image storage) | 2.10.0 | Backend Cloudinary integration |
| Message Scheduler | Node-Cron | 4.6.0 | Backend (`Utils/reminderScheduler.js`) |
| Messaging Gateway | WhatsApp Cloud API / Direct wa.me | In-house | `Utils/whatsappService.js` |
| Email Service | Resend API | 6.14.0 | `Utils/sendEmail.js` |

---

## 2. Portals & Route Inventory

### 2.1 Public & Authentication Routes
- `/`: Public Home landing page with live dynamic stats (`/api/public-stats`), section navigation, features grid, role portal showcase, and "Book a Demo" modal.
- `/login`: Multi-role login with role tabs (Admin, Teacher, Student, Parent).
- `/signup`: Academy self-service onboarding and registration.
- `/signup/pending`: Post-signup account approval wait screen.
- `/forget-password`: Password reset request and OTP submission.

### 2.2 Super Admin Portal (`/super-admin`)
- `/super-admin/dashboard`: Platform-level overview (total academies, active plans, MRR, platform audit log).
- `/super-admin/academies`: Academy tenant lifecycle (approve, reject, suspend, reactivate, manage quotas).
- `/super-admin/plans`: SaaS subscription tier definition (name, max students, max courses, max teachers, features).
- `/super-admin/subscriptions`: Academy plan assignment, manual renewals, and status tracking.
- `/super-admin/audit-logs`: Immutable platform action history.

### 2.3 Academy Admin Portal (`/admin-panel`)
- `/admin-panel/dashboard`: Academy metrics, enrollments, quick stats.
- `/admin-panel/courses` & `/admin-panel/add-course`: Course curriculum management.
- `/admin-panel/batches/[slug]` & `/admin-panel/add-batch`: Cohorts, timetables, trainer assignments.
- `/admin-panel/teachers` & `/admin-panel/student`: User directory and approvals.
- `/admin-panel/fees/dashboard`: Outstanding dues, collection metrics, recovery rates.
- `/admin-panel/fees/fee-plans`: Installment structures and tuition templates.
- `/admin-panel/fees/collect`: Fee receipt issuance and installment recording.
- `/admin-panel/fees/reports`: Financial exports, cashbook, ledger reconciliation.
- `/admin-panel/fees/reminders`: WhatsApp automated reminder rules, logs, and template editor.
- `/admin-panel/attendence` & `/admin-panel/mark-attendence`: Real attendance tracking.
- `/admin-panel/exams` & `/admin-panel/homework`: Academy-wide academic assessments.

### 2.4 Teacher Portal (`/teacher-panel`)
- `/teacher-panel/dashboard`: Assigned cohorts, upcoming classes, student count.
- `/teacher-panel/batches/[slug]`: Cohort roster, attendance history, class notes.
- `/teacher-panel/mark-attendence`: Daily roll call (Present, Absent, Leave).
- `/teacher-panel/add-notes`: Chapter PDF uploads with instant dispatch.
- `/teacher-panel/add-classLink`: Online meeting links (Google Meet, Zoom, Teams).
- `/teacher-panel/exams`: Exam marksheets, score entry, publish controls.
- `/teacher-panel/homework`: Assignment creation, deadlines, grading.

### 2.5 Student Portal (`/student-profile`)
- `/student-profile/dashboard`: Enrolled batches, attendance rate %, tuition summary, quick notes.
- `/student-profile/classes`: Cohort schedule, notes, live class links.
- `/student-profile/homework`: Homework download, submission upload, teacher feedback.
- `/student-profile/exams`: Published exam marks, percentage, pass/fail status.
- `/student-profile/profile`: Personal and guardian details.

### 2.6 Parent Portal (`/parent-panel`)
- `/parent-panel/dashboard`: Child summary, attendance overview, outstanding fee cards.
- `/parent-panel/attendance`: Multi-child attendance drill-down with date filters.
- `/parent-panel/fees`: Child fee installments, payment receipts, balance breakdown.
- `/parent-panel/homework`: Child assignment tracking and submission status.
- `/parent-panel/exams`: Published report cards.

---

## 3. Database Schema & Tenant Models

| Model | Tenant Scoped (`academyId`) | Indexes & Key Properties | Purpose |
|---|---|---|---|
| `Academy` | Root Tenant | `slug` (unique), `status` (active, pending, suspended) | Tenant organization record |
| `User` | Yes | `email` (unique), `role`, `status`, `approvalStatus` | User identity & authentication |
| `PlatformPlan` | No (Platform) | `slug` (unique), `price`, `limits` | SaaS subscription tiers |
| `AcademySubscription` | Yes | `academyId` (unique), `planId`, `status` | Tenant billing & limits |
| `Batches` | Yes | `academyId`, `slug` (unique), `course` | Student cohorts |
| `Courses` | Yes | `academyId`, `slug` (unique), `status` | Course syllabus |
| `Attendence` | Yes | `academyId`, `batchId`, `date` | Student daily roll calls |
| `StudentFee` | Yes | `academyId`, `studentId`, `batchId` | Fee plan obligations |
| `FeePayment` | Yes | `academyId`, `receiptNumber` (unique), `status` | Payment transactions & receipts |
| `FeeSequence` | Yes | `academyId`, `key` (compound unique) | Atomic receipt numbering |
| `ReminderSettings` | Yes | `academyId` (unique), `mode` | WhatsApp integration credentials |
| `FeeReminder` | Yes | `academyId`, `studentFeeId`, `status` | Scheduled notification records |
| `ParentStudent` | Yes | `academyId`, `parentId`, `studentId` | Multi-child guardianship links |

---

## 4. Environment Variables Required (Names Only)

### Backend (`.env`):
- `PORT`
- `Mongoose_uri`
- `ACCESS_SECRET`
- `REFRESH_SECRET`
- `VERIFICATION_SECRET`
- `FRONTEND_URL`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `WHATSAPP_CLOUD_API_TOKEN` (optional if direct mode used)
- `WHATSAPP_PHONE_NUMBER_ID`
- `WHATSAPP_WEBHOOK_VERIFY_TOKEN`

### Frontend (`.env.local` / `.env`):
- `NEXT_PUBLIC_API_URL` (points to `http://localhost:5000/api` or production URL)

---

## 5. Baseline Test & Build Status Before Remediation

1. **Backend Tests**: 27 unit tests running via Node test runner (`node --test tests/*.test.js`). All 27 tests passed.
2. **Frontend Build (`next build`)**: Succeeded cleanly (65 static/dynamic routes compiled).
3. **Frontend Lint (`npm run lint`)**: Failed initially due to missing `typescript` peer dependency and 13 ESLint / React 19 compiler errors across modal, form, and client components.
4. **Mongoose Duplicate Index Warnings**: Present on `Session.expiresAt` and `Course.slug`.
