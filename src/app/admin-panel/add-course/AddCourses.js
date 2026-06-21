"use client";

import { useCreateCourseMutation } from "@/app/mutations/coursesMutations";
import Input from "@/app/student-profile/components/profile/Input";
import Select from "@/app/student-profile/components/profile/Select";
import TextArea from "@/app/student-profile/components/profile/TextArea";
import { createCourseSchema } from "@/schemas/createCourseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  FaBookOpen,
  FaAlignLeft,
  FaMoneyBillWave,
  FaClock,
  FaLayerGroup,
  FaSave,
} from "react-icons/fa";



export default function AddCourseForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver:zodResolver(createCourseSchema),
    mode:"onBlur",
    defaultValues: {
      title: "",
      slug: "",
      shortDescription: "",
      description: "",
      price: 0,
      durationInMonths: "",
      level: "beginner",
      status: "draft",
    },
  });
 const createCourseMutation=useCreateCourseMutation(reset)
  const onSubmit = async (data) => {
    console.log("submit")
 const formData = new FormData();

  formData.append("title", data.title);
  formData.append(
    "shortDescription",
    data.shortDescription
  );
  formData.append("description", data.description);
  formData.append("price", data.price);
  formData.append(
    "durationInMonths",
    data.durationInMonths
  );
  formData.append("level", data.level);
  formData.append("status", data.status);

  if (data.thumbnail) {
    formData.append(
      "image",
      data.thumbnail
    );}
    // mutation here
    await createCourseMutation.mutateAsync(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit,(error)=>console.log(error))}
      className="space-y-8"
    >
      {/* Basic Information */}

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Basic Information
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Course Title"
            placeholder="Spoken English Mastery"
            icon={<FaBookOpen />}
            {...register("title")}
            error={errors.title}
          />

          
        </div>
      </div>

      {/* Descriptions */}

      <div className="space-y-6">
        <TextArea
          label="Short Description"
          placeholder="Short course summary..."
          {...register("shortDescription")}
          error={errors.shortDescription}
        />

        <TextArea
          label="Description"
          placeholder="Detailed course description..."
          {...register("description")}
          rows={6}
          error={errors.description}
        />
      </div>

      {/* Pricing & Duration */}

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Pricing & Duration
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Input
            type="number"
            label="Price (₹)"
            placeholder="5000"
            icon={<FaMoneyBillWave />}
            {...register("price")}
            error={errors.price}
          />

          <Input
            type="number"
            label="Duration (Months)"
            placeholder="3"
            icon={<FaClock />}
            {...register("durationInMonths")}
            error={errors.durationInMonths}
          />
        </div>
      </div>

      {/* Course Settings */}

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Course Settings
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Select
            label="Level"
            error={errors.level}
            icon={<FaLayerGroup />}
            {...register("level")}
            options={[
              {
                label: "Beginner",
                value: "beginner",
              },
              {
                label: "Intermediate",
                value: "intermediate",
              },
              {
                label: "Advanced",
                value: "advanced",
              },
            ]}
          />

          <Select
            label="Status"
            error={errors.status}
            {...register("status")}
            options={[
              {
                label: "Draft",
                value: "draft",
              },
              {
                label: "Published",
                value: "published",
              },
              {
                label: "Archived",
                value: "archived",
              },
            ]}
          />
        </div>
      </div>

      {/* Thumbnail */}

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Thumbnail
        </h2>

        <Input
          type="file"
          label="Course Thumbnail"
          error={errors.thumbnail}
         {...register("thumbnail")}
        />
      </div>

      {/* Submit */}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
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

          {isSubmitting
            ? "Creating..."
            : "Create Course"}
        </button>
      </div>
    </form>
  );
}