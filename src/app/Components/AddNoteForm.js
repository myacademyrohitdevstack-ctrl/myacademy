"use client";

import { useForm } from "react-hook-form";
import {
  FaFileAlt,
  FaSave,
  FaEye,
  FaTag,
} from "react-icons/fa";
import Input from "@/app/student-profile/components/profile/Input";
import TextArea from "@/app/student-profile/components/profile/TextArea";
import { useCreateNotesMutation } from "@/app/mutations/notesMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createNoteSchema } from "@/schemas/createNoteSchema";
import { useSearchParams } from "next/navigation";
import Select from "@/app/student-profile/components/profile/Select";

export default function AddNoteForm() {
  const searchParams = useSearchParams();
  const batchId = searchParams.get("batchId");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createNoteSchema),
    mode: "onBlur",
    defaultValues: {
      title: "",
      description: "",
      type: "pdf",
      visibility: "public",
    },
  });

  const createNoteMutation = useCreateNotesMutation(reset);

  if (!batchId) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
        No Batch specified. Please navigate to a batch to add notes.
      </div>
    );
  }

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description || "");
    formData.append("type", data.type);
    formData.append("visibility", data.visibility);

    if (data.file?.[0]) {
      formData.append("file", data.file[0]);
    }

    await createNoteMutation.mutateAsync({
      id: batchId,
      data: formData,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Note Title"
        placeholder="E.g. Chapter 1 Summary Notes"
        icon={<FaFileAlt />}
        {...register("title", {
          required: "Title is required",
        })}
        error={errors.title}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Select
          label="Note Type"
          icon={<FaTag />}
          {...register("type")}
          error={errors.type}
          options={[{ label: "PDF Document", value: "pdf" }]}
        />

        <Select
          label="Visibility"
          icon={<FaEye />}
          {...register("visibility")}
          error={errors.visibility}
          options={[
            {
              label: "Public (All Batch Students)",
              value: "public",
            },
            {
              label: "Private (Trainers Only)",
              value: "private",
            },
          ]}
        />
      </div>

      <TextArea
        label="Description / Syllabus Notes"
        placeholder="Enter key topics covered or instructions for students..."
        rows={4}
        {...register("description")}
        error={errors.description}
      />

      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-5">
        <Input
          type="file"
          label="Upload Note File (PDF)"
          {...register("file")}
          error={errors.file}
        />
        <p className="mt-2 text-xs text-slate-500">
          Supported format: PDF up to 25MB
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || createNoteMutation.isPending}
          className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-[#D6451B] px-8 py-3.5 font-bold text-white shadow-md hover:bg-[#bf3b14] disabled:opacity-40"
        >
          <FaSave />
          <span>
            {createNoteMutation.isPending ? "Uploading..." : "Publish Note"}
          </span>
        </button>
      </div>
    </form>
  );
}
