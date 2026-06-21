"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/app/student-profile/components/profile/Input";
import Select from "@/app/student-profile/components/profile/Select";

import {
  FaUsers,
  FaVideo,
  FaCalendarAlt,
  FaSave,
  FaHeading,
} from "react-icons/fa";
import { createClassLinkSchema } from "@/schemas/classLinkSchema";
import { useAddClassLinkMutation } from "@/app/mutations/classLinkMutation";



export default function AddForm({ batches = [] }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createClassLinkSchema),
    mode: "onBlur",
    defaultValues: {
      batch: "",
      title: "",
      meetingLink: "",
      meetingDate: "",
      description: "",
    },
  });

  const createClassLinkMutation =
    useAddClassLinkMutation(reset);

  const onSubmit = async (data) => {
    await createClassLinkMutation.mutateAsync({
      id:"6a380bd36d1cdf6a9da7ff8e",
      data,
    });

    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit,
        (errors) => console.log(errors)
      )}
      className="space-y-8"
    >
      {/* Basic Information */}

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Class Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* <Select
            label="Batch"
            icon={<FaUsers />}
            {...register("batch")}
            error={errors.batch}
            options={batches.map((batch) => ({
              label: batch.name,
              value: batch._id,
            }))}
          /> */}

          <Input
            label="Class Title"
            placeholder="IELTS Speaking Session"
            icon={<FaHeading />}
            {...register("title")}
            error={errors.title}
          />
        </div>
      </div>

      {/* Meeting Details */}

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Meeting Details
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            type="datetime-local"
            label="Meeting Date & Time"
            icon={<FaCalendarAlt />}
            {...register("meetingDate")}
            error={errors.meetingDate}
          />

          <Input
            label="Meeting Link"
            placeholder="https://meet.google.com/..."
            icon={<FaVideo />}
            {...register("meetingLink")}
            error={errors.meetingLink}
          />
        </div>
      </div>

      {/* Description */}

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Additional Information
        </h2>

        <textarea
          {...register("description")}
          placeholder="Class agenda, notes, instructions..."
          className="
            min-h-[120px]
            w-full
            rounded-2xl
            border
            border-slate-300
            p-4
            outline-none
            focus:border-[#D6451B]
          "
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Submit */}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={
            isSubmitting ||
            createClassLinkMutation.isPending
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

          {isSubmitting ||
          createClassLinkMutation.isPending
            ? "Creating..."
            : "Create Class Link"}
        </button>
      </div>
    </form>
  );
}