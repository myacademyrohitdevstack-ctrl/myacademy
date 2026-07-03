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
  const searchParams=useSearchParams()
  const batchId=searchParams.get("batchId") 
  if(!batchId) return 
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:zodResolver(createNoteSchema),
    mode:"onBlur",
    defaultValues: {
  title: "",
  description: "",
  type: "pdf",
  visibility: "public",
},
  });
const createNoteMutation=useCreateNotesMutation(reset)
const onSubmit = async (data) => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append(
    "description",
    data.description || ""
  );

  formData.append("type", data.type);
  formData.append(
    "visibility",
    data.visibility
  );

  if (data.file?.[0]) {
    formData.append("file", data.file[0]);
  }

  await createNoteMutation.mutateAsync({
    id: batchId,
    data: formData,
  });
};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <Input
        label="Note Title"
        placeholder="Chapter 1 Notes"
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
    options={[
      { label: "PDF", value: "pdf" },
      // { label: "PPT", value: "ppt" },
      // { label: "DOC", value: "doc" },
      // { label: "Image", value: "image" },
      // { label: "Video", value: "video" },
      // { label: "Other", value: "other" },
    ]}
  />

  <Select
    label="Visibility"
    icon={<FaEye />}
    {...register("visibility")}
    error={errors.visibility}
    options={[
      {
        label: "Public",
        value: "public",
      },
      {
        label: "Private",
        value: "private",
      },
    ]}
  />

</div>
      <TextArea
        label="Description"
        placeholder="Optional description..."
        rows={4}
        {...register("description")}
        error={errors.description}
      />

   <div className="rounded-2xl border border-dashed border-slate-300 p-5">

  <Input
    type="file"
    label="Upload Note File"
    {...register("file")}
    error={errors.file}
  />

  <p className="mt-2 text-sm text-slate-500">
    Supported: PDF,
     {/* PPT, DOC, Images, Videos */}
  </p>

</div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={
            isSubmitting ||
            createNoteMutation.isPending
          }
          className="
            flex items-center gap-2
            rounded-2xl
            bg-[#D6451B]
            px-6 py-3
            text-white
            font-semibold
            hover:bg-[#bf3b14]
          "
        >
          <FaSave />

          {createNoteMutation.isPending
            ? "Uploading..."
            : "Add Note"}
        </button>
      </div>
    </form>
  );
}