# MyAcademy — Customer Pilot Operational Runbook

**Target Audience:** DevOps, System Administrators, and Academy Onboarding Teams  
**Product Version:** 1.0.0 (Production Pilot)  

---

## 1. System Requirements & Environment Configuration

### 1.1 Backend Environment Variables (`.env`)
Ensure the following variable names are configured before starting the service (never commit secret values to version control):

```bash
# Server & Port
PORT=5000

# Database
Mongoose_uri=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/myacademy

# JWT Secrets (Generate high-entropy 64-character strings)
ACCESS_SECRET=<secret>
REFRESH_SECRET=<secret>
VERIFICATION_SECRET=<secret>

# Frontend Origin for CORS
FRONTEND_URL=https://myacademy.app # or http://localhost:3001 in development

# Cloudinary Storage
CLOUDINARY_CLOUD_NAME=<cloud_name>
CLOUDINARY_API_KEY=<api_key>
CLOUDINARY_API_SECRET=<api_secret>

# Email Notifications (Resend API)
RESEND_API_KEY=<resend_key>
EMAIL_FROM="MyAcademy Notifications <notifications@myacademy.app>"

# WhatsApp Cloud API (Optional: Direct wa.me mode works without external API keys)
WHATSAPP_CLOUD_API_TOKEN=<meta_system_user_token>
WHATSAPP_PHONE_NUMBER_ID=<meta_phone_number_id>
WHATSAPP_WEBHOOK_VERIFY_TOKEN=<webhook_secret>
```

### 1.2 Frontend Environment Variables (`.env.local` / `.env`)
```bash
NEXT_PUBLIC_API_URL=https://api.myacademy.app/api # or http://localhost:5000/api
```

---

## 2. Service Startup & Verification

### 2.1 Backend Deployment
```bash
# Install dependencies
npm ci --production

# Run test suite
npm test

# Launch production server with process manager (e.g., PM2)
pm2 start Server.js --name "myacademy-backend"
```
*Health check:* Verify `GET /health` returns status `200 OK`.

### 2.2 Frontend Deployment
```bash
# Install dependencies
npm ci --legacy-peer-deps

# Create optimized build
npm run build

# Start Next.js production server
pm2 start npm --name "myacademy-frontend" -- start -- -p 3001
```
*Verification:* Confirm `GET /pdf.worker.min.mjs` returns status 200 with the 1.04MB worker bundle.

---

## 3. Academy Pilot Onboarding Step-by-Step

1. **Super Admin Creation**:
   - Ensure initial Super Admin account is provisioned with `platformRole: "super_admin"`.
   - Access `/super-admin/dashboard` to create platform subscription plans (e.g., "Starter", "Growth", "Enterprise") defining student and teacher quotas.

2. **Academy Organization Setup**:
   - Sign up via `/signup` with academy branding, primary contact email, and phone number.
   - Super Admin approves the tenant under `/super-admin/academies` and assigns a pilot subscription plan.

3. **Academic Setup**:
   - Academy Admin navigates to `/admin-panel/courses` and adds courses.
   - Admin creates batches (`/admin-panel/add-batch`), assigns instructors, and sets class schedules.

4. **Faculty & Student Enrollment**:
   - Instructors sign up or are created via `/admin-panel/teachers`.
   - Students are enrolled via `/admin-panel/student` or bulk import.
   - Assign tuition fee structures via `/admin-panel/fees/fee-plans`.

5. **Parent Linkage**:
   - Invite or register guardians and link them to students via `/admin-panel/parents`.

---

## 4. Disaster Recovery & Rollback Strategy

1. **Database Backups**:
   - Daily automated Atlas snapshot backups with 7-day retention.
   - On-demand mongodump before applying schema or bulk migration updates:
     ```bash
     mongodump --uri="$Mongoose_uri" --out="./backups/$(date +%F)"
     ```
2. **Rollback Plan**:
   - If an upgrade encounters errors, point the frontend and backend services to the previous stable release tags or container images.
   - In case of database restore:
     ```bash
     mongorestore --uri="$Mongoose_uri" --drop "./backups/<date>"
     ```

---

## 5. Known Limitations & Customer Support

1. **Meta WhatsApp Cloud API**:
   - If the academy does not have an approved Meta Business Account with WhatsApp template approvals, configure the reminder engine to **"Direct Admin WhatsApp"** mode in `/admin-panel/fees/reminders`. This delivers compliant `wa.me` links with one tap without requiring Meta API approval.
2. **Online Payment Gateways**:
   - Online automated credit card checkout is not enabled in this pilot version. All payments are recorded as verified cash, UPI reference, or bank transfer in the fee ledger with instant PDF receipts.
3. **Customer Support Escalation**:
   - Support Channel: `support@inquisitivemind.in` or in-app "Book a Demo / Support" modal.
   - P0 Critical (Outage / Security): 2-hour response objective.
   - P1 Operational (Billing / Attendance): 24-hour response objective.
