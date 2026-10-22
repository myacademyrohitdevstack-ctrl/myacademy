import api from "./apiInstance";

/**
 * Fetch notifications tailored to the user's role and enrolled/assigned batches
 */
export const getMyNotificationsApi = async () => {
  const response = await api.get("/notifications");
  return response.data;
};

/**
 * Mark a single notification as read
 */
export const markNotificationReadApi = async (id) => {
  const response = await api.patch(`/notifications/${id}/read`);
  return response.data;
};

/**
 * Mark all notifications as read
 */
export const markAllNotificationsReadApi = async () => {
  const response = await api.patch("/notifications/mark-all-read");
  return response.data;
};
