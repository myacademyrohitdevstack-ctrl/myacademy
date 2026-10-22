"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import Input from "@/app/student-profile/components/profile/Input";
import Select from "@/app/student-profile/components/profile/Select";
import TextArea from "@/app/student-profile/components/profile/TextArea";

import {
  FaBullhorn,
  FaBookOpen,
  FaUsers,
  FaCalendarAlt,
  FaSave,
  FaFlag,
  FaCheckCircle,
  FaThumbtack,
  FaLayerGroup,
  FaInfoCircle,
} from "react-icons/fa";
import { useAdminGetAllBatches } from "@/Hooks/useAdminGetBatches";
import { useAdminGetBatche } from "@/Hooks/useAdminGetBatch";
import { createAnnouncementSchema } from "@/schemas/createAnnouncementSchema";
import { useCreateAnnouncementtMutation } from "@/app/mutations/AnnouncementMutation";
import useAuthStore from "@/store/authStore";

export default function AddAnnouncementForm({ courses }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const batchIdParam = searchParams.get("batchId");

  const user = useAuthStore((state) => state.user);
  const isAdmin = user?.role === "admin";

  const { data: preloadedBatch } = useAdminGetBatche(batchIdParam);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createAnnouncementSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      message: "",
      targetType: batchIdParam ? "course-batch" : isAdmin ? "system" : "course-batch",
      course: "",
      batch: batchIdParam || "",
      priority: "normal",
      publishAt: "",
      expiresAt: "",
      isPinned: false,
      isPublished: true,
    },
  });

  const targetType = watch("targetType");
  const selectedCourse = watch("course");
  const isPinned = watch("isPinned");
  const isPublished = watch("isPublished");

  // Pre-fill course and batch if batchId was provided in URL
  useEffect(() => {
    if (preloadedBatch && batchIdParam) {
      setValue("targetType", "course-batch");
      const courseId = preloadedBatch.course?._id || preloadedBatch.course;
      if (courseId) {
        setValue("course", String(courseId));
      }
      setValue("batch", String(preloadedBatch._id));
    }
  }, [preloadedBatch, batchIdParam, setValue]);

  const courseSlug = courses?.find(
    (course) => course._id === selectedCourse
  )?.slug;

  const { data: batches } = useAdminGetAllBatches(courseSlug);
  const createAnnouncementMutation = useCreateAnnouncementtMutation();

  const onSubmit = async (data) => {
    let payload = {
      title: data.title.trim(),
      message: data.message.trim(),
      priority: data.priority,
      isPinned: Boolean(data.isPinned),
      isPublished: data.isPublished !== false,
    };

    if (data.targetType === "system" || data.targetType === "academy") {
      payload.targetType = "system";
      payload.course = null;
      payload.batch = null;
    } else if (data.batch === "all") {
      payload.targetType = "course";
      payload.course = data.course;
      payload.batch = null;
    } else {
      payload.targetType = "batch";
      payload.course = data.course;
      payload.batch = data.batch;
    }

    if (data.publishAt && data.publishAt.trim() !== "") {
      payload.publishAt = new Date(data.publishAt).toISOString();
    }

    if (data.expiresAt && data.expiresAt.trim() !== "") {
      payload.expiresAt = new Date(data.expiresAt).toISOString();
    }

    await createAnnouncementMutation.mutateAsync(payload);

    // Smart redirect: return to the originating batch if batchId was in URL
    if (batchIdParam) {
      const slug = courseSlug || "all";
      router.push(
        `/${user?.role || "admin"}-panel/batches/${slug}/batch?batchId=${batchIdParam}&tab=announcements`
      );
    } else {
      router.push(`/${user?.role || "admin"}-panel/courses`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Banner if creating for a specific batch from batch page */}
      {batchIdParam && preloadedBatch && (
        <div className="flex items-center gap-3 rounded-2xl border border-orange-200 bg-orange-50/70 p-4 text-orange-950">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
            <FaBullhorn />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-700">
              Broadcasting to Batch
            </p>
            <p className="font-bold text-sm sm:text-base text-slate-900 truncate">
              {preloadedBatch.name}
              {preloadedBatch.course?.title && (
                <span className="text-xs font-normal text-slate-600 ml-1.5">
                  • {preloadedBatch.course.title}
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Basic Info */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Announcement Details
        </h2>

        <div className="grid gap-6">
          <Input
            label="Title"
            placeholder="e.g. Tomorrow is a Holiday / Schedule Update"
            icon={<FaBullhorn />}
            {...register("title")}
            error={errors.title}
          />

          <TextArea
            label="Message"
            placeholder="Write announcement details for students and staff..."
            rows={5}
            {...register("message")}
            error={errors.message}
          />
        </div>
      </div>

      {/* Target Audience */}
      <div>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-800">
            Target Audience
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose who should receive this announcement across your academy.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Select
              label="Target Scope"
              icon={<FaUsers />}
              {...register("targetType")}
              error={errors.targetType}
              options={[
                ...(isAdmin
                  ? [
                      {
                        label: "Entire Academy (All Students, Teachers & Parents)",
                        value: "system",
                      },
                    ]
                  : []),
                {
                  label: "Specific Course / Batch",
                  value: "course-batch",
                },
              ]}
            />
            {targetType === "system" && (
              <p className="mt-2 text-xs text-slate-500 flex items-center gap-1.5">
                <FaInfoCircle className="text-orange-500 shrink-0" />
                This announcement will be delivered to every enrolled student, teacher, and parent in your academy.
              </p>
            )}
          </div>

          <Select
            label="Priority Level"
            icon={<FaFlag />}
            {...register("priority")}
            error={errors.priority}
            options={[
              {
                label: "Normal Priority",
                value: "normal",
              },
              {
                label: "Low Priority",
                value: "low",
              },
              {
                label: "High Priority",
                value: "high",
              },
              {
                label: "Urgent Priority",
                value: "urgent",
              },
            ]}
          />
        </div>

        {targetType === "course-batch" && (
          <div className="mt-6 p-4 sm:p-6 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-6">
            <Select
              label="Course"
              icon={<FaBookOpen />}
              {...register("course")}
              error={errors.course}
              placeholder="Select a Course"
              options={(courses || []).map((course) => ({
                label: course.title,
                value: course._id,
              }))}
            />

            {selectedCourse && (
              <Select
                label="Batch"
                icon={<FaUsers />}
                {...register("batch")}
                error={errors.batch}
                placeholder="Select Batch or All Batches"
                options={[
                  ...(isAdmin
                    ? [
                        {
                          label: "All Batches in this Course (Course-Wide)",
                          value: "all",
                        },
                      ]
                    : []),
                  ...(batches || []).map((batch) => ({
                    label: batch.name,
                    value: batch._id,
                  })),
                ]}
              />
            )}
          </div>
        )}
      </div>

      {/* Publishing & Visibility Settings */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Publication & Pinning
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Published Toggle Card */}
          <div
            onClick={() => setValue("isPublished", !isPublished)}
            className={`cursor-pointer rounded-2xl border p-4 transition-all flex items-start gap-3.5 select-none ${
              isPublished
                ? "border-emerald-300 bg-emerald-50/60 shadow-xs"
                : "border-slate-200 bg-slate-50 hover:bg-slate-100/70"
            }`}
          >
            <div
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                isPublished
                  ? "bg-emerald-500 text-white"
                  : "border-2 border-slate-300 bg-white"
              }`}
            >
              {isPublished && <FaCheckCircle className="text-xs" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-slate-900">
                {isPublished ? "Published (Live)" : "Draft (Unpublished)"}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {isPublished
                  ? "Immediately visible to students, staff, and triggers the notification icon."
                  : "Saved as draft. Hidden from students until published."}
              </p>
            </div>
          </div>

          {/* Pinned Toggle Card */}
          <div
            onClick={() => setValue("isPinned", !isPinned)}
            className={`cursor-pointer rounded-2xl border p-4 transition-all flex items-start gap-3.5 select-none ${
              isPinned
                ? "border-amber-300 bg-amber-50/60 shadow-xs"
                : "border-slate-200 bg-slate-50 hover:bg-slate-100/70"
            }`}
          >
            <div
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-colors ${
                isPinned
                  ? "bg-amber-500 text-white"
                  : "border-2 border-slate-300 bg-white"
              }`}
            >
              {isPinned && <FaThumbtack className="text-xs" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm text-slate-900">
                {isPinned ? "📌 Pinned to Top" : "Standard Feed"}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {isPinned
                  ? "Keeps this announcement stuck at the top of the feed for maximum visibility."
                  : "Appears in standard chronological order."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule & Expiry */}
      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Scheduling (Optional)
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            type="datetime-local"
            label="Schedule Publish Date (Optional)"
            icon={<FaCalendarAlt />}
            {...register("publishAt")}
            error={errors.publishAt}
          />

          <Input
            type="datetime-local"
            label="Auto-Expire Date (Optional)"
            icon={<FaCalendarAlt />}
            {...register("expiresAt")}
            error={errors.expiresAt}
          />
        </div>
      </div>

      {/* Submit */}
      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting || createAnnouncementMutation.isPending}
          className="
            flex items-center gap-2
            rounded-2xl
            bg-[#D6451B]
            px-6 py-3
            font-semibold
            text-white
            transition
            hover:bg-[#bf3b14]
            disabled:opacity-50
            shadow-md
          "
        >
          <FaSave />
          {createAnnouncementMutation.isPending
            ? "Creating Announcement..."
            : "Broadcast Announcement"}
        </button>
      </div>
    </form>
  );
}
