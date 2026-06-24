import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, "Current password is required"),

    newPassword: z
      .string()
      .min(
        8,
        "New password must be at least 8 characters"
      ),

    confirmPassword: z
      .string()
      .min(
        8,
        "Confirm password is required"
      ),
  })
  .refine(
    (data) =>
      data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );