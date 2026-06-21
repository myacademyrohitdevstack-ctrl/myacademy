import { z } from "zod";

export const createBatchSchema = z
  .object({
    course: z
      .string()
      .trim()
      .min(1, "Course is required"),

    name: z
      .string()
      .trim()
      .min(3, "Batch name must be at least 3 characters")
      .max(100, "Batch name cannot exceed 100 characters"),

    startDate: z.string().min(1, "Start date is required"),

    endDate: z.string().min(1, "End date is required"),

    maxStudents: z.preprocess(
      (v) => (v === "" ? undefined : Number(v)),
      z
        .number()
        .min(1, "Maximum students must be at least 1")
        .max(500, "Maximum students cannot exceed 500")
    ),

    status: z.enum([
      "upcoming",
      "active",
      "completed",
      "cancelled",
    ]),
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const start = new Date(data.startDate);
      start.setHours(0, 0, 0, 0);

      return start >= today;
    },
    {
      path: ["startDate"],
      message: "Start date cannot be earlier than today",
    }
  )
  .refine(
    (data) => {
      const start = new Date(data.startDate);
      const end = new Date(data.endDate);

      return end > start;
    },
    {
      path: ["endDate"],
      message: "End date must be after the start date",
    }
  );