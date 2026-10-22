import api from "./apiInstance";

// 1. Dashboard & Analytics
export function getWhatsAppDashboardApi() {
  return api.get("/whatsapp-reminders/dashboard");
}

// 2. Reminder History & Listing
export function listWhatsAppRemindersApi(params = {}) {
  return api.get("/whatsapp-reminders", { params });
}

export function getWhatsAppReminderByIdApi(reminderId) {
  return api.get(`/whatsapp-reminders/${reminderId}`);
}

// 3. Message Preview & Sending
export function previewWhatsAppReminderApi(payload) {
  return api.post("/whatsapp-reminders/preview", payload);
}

export function sendManualWhatsAppReminderApi(payload) {
  return api.post("/whatsapp-reminders/send", payload);
}

export function sendBulkWhatsAppRemindersApi(payload) {
  return api.post("/whatsapp-reminders/bulk-send", payload);
}

export function confirmManualSendApi(reminderId) {
  return api.post(`/whatsapp-reminders/${reminderId}/confirm-manual-send`);
}

export function retryWhatsAppReminderApi(reminderId) {
  return api.post(`/whatsapp-reminders/${reminderId}/retry`);
}

export function cancelWhatsAppReminderApi(reminderId) {
  return api.post(`/whatsapp-reminders/${reminderId}/cancel`);
}

// 4. Settings & Automation Rules
export function getReminderSettingsApi() {
  return api.get("/whatsapp-reminders/settings/rules");
}

export function updateReminderSettingsApi(payload) {
  return api.patch("/whatsapp-reminders/settings/rules", payload);
}

export function triggerReminderRunApi() {
  return api.post("/whatsapp-reminders/settings/trigger-run");
}

// 5. Message Templates
export function listReminderTemplatesApi() {
  return api.get("/whatsapp-reminders/templates/all");
}

export function createReminderTemplateApi(payload) {
  return api.post("/whatsapp-reminders/templates", payload);
}

export function updateReminderTemplateApi(templateId, payload) {
  return api.patch(`/whatsapp-reminders/templates/${templateId}`, payload);
}

export function deleteReminderTemplateApi(templateId) {
  return api.delete(`/whatsapp-reminders/templates/${templateId}`);
}

export function resetDefaultTemplatesApi() {
  return api.post("/whatsapp-reminders/templates/reset-defaults");
}

// 6. WhatsApp Integration Settings
export function getWhatsAppIntegrationApi() {
  return api.get("/whatsapp-reminders/integration/status");
}

export function saveWhatsAppIntegrationApi(payload) {
  return api.post("/whatsapp-reminders/integration/save", payload);
}

export function testWhatsAppConnectionApi() {
  return api.post("/whatsapp-reminders/integration/test");
}

export function disconnectWhatsAppIntegrationApi() {
  return api.delete("/whatsapp-reminders/integration/disconnect");
}

// 7. Scheduled Reminders
export function listScheduledRemindersApi() {
  return api.get("/whatsapp-reminders/scheduled/list");
}

export function scheduleWhatsAppReminderApi(payload) {
  return api.post("/whatsapp-reminders/scheduled/create", payload);
}

export function cancelScheduledReminderApi(reminderId) {
  return api.delete(`/whatsapp-reminders/scheduled/${reminderId}`);
}
