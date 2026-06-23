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
      .min(10, "Message must be at least 10 characters"),

    targetType: z.enum([
      "system",
      "course-batch",
    ]),

    course: z.string().optional(),

    batch: z.string().optional(),

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

    isPinned: z.boolean(),

    isPublished: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (
      data.targetType === "course-batch" &&
      !data.course
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["course"],
        message: "Course is required",
      });
    }

    if (
      data.targetType === "course-batch" &&
      !data.batch
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["batch"],
        message:
          "Select a batch or All Batches",
      });
    }

    if (
      data.publishAt &&
      data.expiresAt &&
      new Date(data.expiresAt) <=
        new Date(data.publishAt)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["expiresAt"],
        message:
          "Expiry date must be after publish date",
      });
    }
  });