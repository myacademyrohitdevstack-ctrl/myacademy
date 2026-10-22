import { z } from "zod";

export const createAnnouncementSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(3, "Title must be at least 3 characters"),

    message: z
      .string()
      .trim()
      .min(5, "Message must be at least 5 characters"),

    targetType: z.enum([
      "system",
      "academy",
      "course-batch",
    ]),

    course: z.string().optional().or(z.literal("")),

    batch: z.string().optional().or(z.literal("")),

    priority: z.enum([
      "low",
      "normal",
      "high",
      "urgent",
    ]),

    publishAt: z
      .string()
      .optional()
      .or(z.literal("")),

    expiresAt: z
      .string()
      .optional()
      .or(z.literal("")),

    isPinned: z.boolean().default(false),

    isPublished: z.boolean().default(true),
  })
  .superRefine((data, ctx) => {
    if (data.targetType === "course-batch") {
      if (!data.course || data.course === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["course"],
          message: "Please select a Course",
        });
      }

      if (!data.batch || data.batch === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["batch"],
          message: "Select a Batch or 'All Batches (Entire Course)'",
        });
      }
    }

    if (
      data.publishAt &&
      data.expiresAt &&
      new Date(data.expiresAt) <= new Date(data.publishAt)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["expiresAt"],
        message: "Expiry date must be after publish date",
      });
    }
  });
