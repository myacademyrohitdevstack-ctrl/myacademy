import { z } from "zod";

export const profileSchema = z.object({
  // User
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters"),

  email: z.string().email(),

  phone: z
    .string()
    .min(10, "Phone number is required"),

  profileImage: z.string().optional(),

  // Student

  dateOfBirth: z.string().optional(),

  gender: z.enum(["male", "female", "other"]).optional(),
  role: z.enum(["student", "teacher"]).optional(),

  languageLevel: z.enum([
    "Beginner",
    "Elementary",
    "Intermediate",
    "Upper Intermediate",
    "Advanced",
  ]).optional(),

  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    postalCode: z.string().optional(),
  }).optional(),

  guardian: z.object({
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    guardianName: z.string().optional(),
    relationship: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
  }).optional(),

  emergencyContact: z.object({
    name: z.string().optional(),
    phone: z.string().optional(),
    relation: z.string().optional(),
  }).optional(),
});