"use client";

import { useForm, watch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
} from "react-icons/fa";
import { useAdminGetAllCourses } from "@/Hooks/useAdminGetCourses";
import { useAdminGetAllBatches } from "@/Hooks/useAdminGetBatches";
import { useMemo } from "react";
import { createAnnouncementSchema } from "@/schemas/createAnnouncementSchema";
import { useCreateAnnouncementtMutation } from "@/app/mutations/AnnouncementMutation";


// import { useCreateAnnouncementMutation } from "@/app/mutations/announcementMutation";

export default function AddAnnouncementForm() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(
      createAnnouncementSchema
    ),
    mode: "onBlur",
    defaultValues: {
      title: "",
      message: "",
      targetType: "system",
      course: "",
      batch: "",
      priority: "normal",
      publishAt: "",
      expiresAt: "",
      isPinned: false,
      isPublished: true,
    },
  });
  const targetType = watch("targetType");
  const selectedCourse=watch("course")
 
  const {data:courses}=useAdminGetAllCourses()


const courseSlug = courses?.find(
  (course) => course._id === selectedCourse
)?.slug;

const { data: batches } =
  useAdminGetAllBatches(courseSlug);
  const createAnnouncementMutation =
    useCreateAnnouncementtMutation();

const onSubmit = async (data) => {
  let payload = {
    ...data,
  };

  if (data.targetType === "system") {
    payload.targetType = "system";
    payload.course = null;
    payload.batch = null;
  } else if (data.batch === "all") {
    payload.targetType = "course";
    payload.batch = null;
  } else {
    payload.targetType = "batch";
  }



  await createAnnouncementMutation.mutateAsync(payload);
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      {/* Basic Info */}

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Announcement Details
        </h2>

        <div className="grid gap-6">
          <Input
            label="Title"
            placeholder="Holiday Notice"
            icon={<FaBullhorn />}
            {...register("title")}
            error={errors.title}
          />

          <TextArea
            label="Message"
            placeholder="Write announcement..."
            rows={5}
            {...register("message")}
            error={errors.message}
          />
        </div>
      </div>

      {/* Target */}

    {/* Target */}

<div>
  <h2 className="mb-4 text-xl font-bold text-slate-800">
    Target Audience
  </h2>

  <div className="grid gap-6 md:grid-cols-2">
    <Select
      label="Target Type"
      icon={<FaUsers />}
      {...register("targetType")}
      error={errors.targetType}
      options={[
        {
          label: "Entire System",
          value: "system",
        },
        {
          label: "Course / Batch",
          value: "course-batch",
        },
      ]}
    />

    <Select
      label="Priority"
      icon={<FaFlag />}
      {...register("priority")}
      error={errors.priority}
      options={[
        {
          label: "Low",
          value: "low",
        },
        {
          label: "Normal",
          value: "normal",
        },
        {
          label: "High",
          value: "high",
        },
        {
          label: "Urgent",
          value: "urgent",
        },
      ]}
    />
  </div>

  {targetType === "course-batch" && (
    <div className="mt-6 space-y-6">
      <Select
        label="Course"
        icon={<FaBookOpen />}
        {...register("course")}
        error={errors.course}
        options={(courses || []).map(
          (course) => ({
            label: course.title,
            value: course._id,
          })
        )}
      />

      {selectedCourse && (
        <Select
          label="Batch"
          icon={<FaUsers />}
          {...register("batch")}
          error={errors.batch}
          options={[
            {
              label:
                "All Batches (Entire Course)",
              value: "all",
            },

            ...(batches || []).map(
              (batch) => ({
                label: batch.name,
                value: batch._id,
              })
            ),
          ]}
        />
      )}
    </div>
  )}
</div>

      {/* Schedule */}

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Publishing
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            type="datetime-local"
            label="Publish At"
            icon={<FaCalendarAlt />}
            {...register("publishAt")}
            error={errors.publishAt}
          />

          <Input
            type="datetime-local"
            label="Expires At"
            icon={<FaCalendarAlt />}
            {...register("expiresAt")}
            error={errors.expiresAt}
          />
        </div>
      </div>

      {/* Settings */}

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Settings
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Select
            label="Pinned"
            {...register("isPinned", {
              setValueAs: (value) =>
                value === "true",
            })}
            options={[
              {
                label: "No",
                value: "false",
              },
              {
                label: "Yes",
                value: "true",
              },
            ]}
          />

          <Select
            label="Published"
            {...register("isPublished", {
              setValueAs: (value) =>
                value === "true",
            })}
            options={[
              {
                label: "Yes",
                value: "true",
              },
              {
                label: "No",
                value: "false",
              },
            ]}
          />
        </div>
      </div>

      {/* Submit */}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={
            isSubmitting ||
            createAnnouncementMutation.isPending
          }
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
          "
        >
          <FaSave />

          {createAnnouncementMutation.isPending
            ? "Creating..."
            : "Create Announcement"}
        </button>
      </div>
    </form>
  );
}