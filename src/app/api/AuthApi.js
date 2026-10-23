import api from "./apiInstance";

export function loginApi(data) {
  return api.post("/auth/login", data);
}

export function verify2FaApi(data) {
  return api.post("/auth/verify-2fa", data);
}

export function signUpApi(data) {
  return api.post("/auth/createUser", data);
}

export function sendOtp(data) {
  return api.post("/auth/send-otp", data);
}

export function verifyOtp(data) {
  return api.post("/auth/verify-otp", data);
}

export function logoutApi() {
  return api.post("/auth/logout");
}

export function resetPasswordApi(data) {
  return api.post("/auth/reset-password", data);
}

export function updatePasswordApi(data) {
  return api.patch("/auth/update-password", data);
}
