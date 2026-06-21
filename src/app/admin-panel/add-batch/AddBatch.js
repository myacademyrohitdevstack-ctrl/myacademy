"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Input from "@/app/student-profile/components/profile/Input";
import Select from "@/app/student-profile/components/profile/Select";



import {
  FaBookOpen,
  FaUsers,
  FaCalendarAlt,
  FaLayerGroup,
  FaSave,
} from "react-icons/fa";
import { createBatchSchema } from "@/schemas/createBatchSchema";
import { useCreateBatchMutation } from "@/app/mutations/BatchMutation";

export default function AddBatchForm({ courses = [] }) {

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createBatchSchema),
    mode: "onBlur",
    defaultValues: {
      course: "",
      name: "",
      startDate: "",
      endDate: "",
      maxStudents: 50,
      status: "upcoming",
    },
  });

  const createBatchMutation=useCreateBatchMutation(reset)
  const onSubmit = async (data) => {
console.log(data)
    await createBatchMutation.mutateAsync({id:data.course,data});

    reset();
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
      <Select
        label="Course"
        icon={<FaBookOpen />}
        {...register("course")}
        error={errors.course}
        options={[
          ...courses.map((course) => ({
            label: course.title,
            value: course._id,
          })),
        ]}
      />

      <Input
        label="Batch Name"
        placeholder="Morning IELTS Batch"
        icon={<FaUsers />}
        {...register("name")}
        error={errors.name}
      />
    </div>
  </div>

  {/* Schedule */}

  <div>
    <h2 className="mb-4 text-xl font-bold text-slate-800">
      Schedule
    </h2>

    <div className="grid gap-6 md:grid-cols-2">
      <Input
        type="date"
        label="Start Date"
        icon={<FaCalendarAlt />}
        {...register("startDate")}
        error={errors.startDate}
      />

      <Input
        type="date"
        label="End Date"
        icon={<FaCalendarAlt />}
        {...register("endDate")}
        error={errors.endDate}
      />
    </div>
  </div>

  {/* Settings */}

  <div>
    <h2 className="mb-4 text-xl font-bold text-slate-800">
      Batch Settings
    </h2>

    <div className="grid gap-6 md:grid-cols-2">
      <Input
        type="number"
        label="Maximum Students"
        placeholder="50"
        icon={<FaUsers />}
        {...register("maxStudents")}
        error={errors.maxStudents}
      />

      <Select
        label="Status"
        icon={<FaLayerGroup />}
        {...register("status")}
        error={errors.status}
        options={[
          {
            label: "Upcoming",
            value: "upcoming",
          },
          {
            label: "Active",
            value: "active",
          },
          {
            label: "Completed",
            value: "completed",
          },
          {
            label: "Cancelled",
            value: "cancelled",
          },
        ]}
      />
    </div>
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
        : "Create Batch"}
    </button>
  </div>
</form>
  );
}