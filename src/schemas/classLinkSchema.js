import { z } from "zod";

export const createClassLinkSchema = z.object({
//   batch: z
//     .string()
//     .min(1, "Batch is required"),

  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title cannot exceed 100 characters"),

  meetingLink: z
    .string()
    .trim()
    .url("Please enter a valid meeting link"),

  meetingDate: z
    .string()
    .min(1, "Meeting date is required"),

  description: z
    .string()
    .max(1000, "Description cannot exceed 1000 characters")
    .optional(),
});