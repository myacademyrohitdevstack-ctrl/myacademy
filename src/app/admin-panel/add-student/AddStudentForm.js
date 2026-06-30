"use client";

import { useForm } from "react-hook-form";
import { FaSave, FaUserGraduate, FaBookOpen, FaVoicemail, FaEnvelope, FaPhone, FaPhoneAlt, FaLock } from "react-icons/fa";

import Input from "@/app/student-profile/components/profile/Input";
import Select from "@/app/student-profile/components/profile/Select";
import { useAdminGetAllCourses } from "@/Hooks/useAdminGetCourses";
import { useAdminGetAllBatches } from "@/Hooks/useAdminGetBatches";
import { useAdminCreateStuent } from "@/app/mutations/AdminMutations";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { createStudentSchema } from "@/schemas/createStudentSchema";
// import { useCreateStudentMutation } from "@/app/mutations/studentMutations";

export default function AddStudentForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting, },
  } = useForm({
    // resolver: zodResolver(createStudentSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password:"",
      course: "",
      batch: "",
    },
  });
  const selectedCourse=watch("course")

  const {data:courses}=useAdminGetAllCourses()
  const courseSlug = courses?.find(
    (course) => course._id === selectedCourse
  )?.slug;
  
  const { data: batches } =
    useAdminGetAllBatches(courseSlug);
  const createStudentMutation = useAdminCreateStuent();

  const onSubmit = async (data) => {
const payload={
    fullName:data.name,
    email:data.email,
    phone:data.phone,
    courseId:data.course,
    batchId:data.batch,
    password:data.password
}

    await createStudentMutation.mutateAsync(payload);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      {/* Basic Information */}

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Basic Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Input
            label="Student Name"
            placeholder="John Doe"
            icon={<FaUserGraduate />}
            {...register("name")}
            error={errors.name}
          />

          <Input
          icon={<FaEnvelope></FaEnvelope>}
            type="email"
            label="Email"
            placeholder="john@example.com"
            {...register("email")}
            error={errors.email}
          />

          <Input
          icon={<FaPhoneAlt></FaPhoneAlt>}
            label="Mobile Number"
            placeholder="+91 9876543210"
            {...register("phone")}
            error={errors.phone}
          />
          <Input
          icon={<FaLock></FaLock>}
            label="Password"
            placeholder="Enter password"
            {...register("password")}
            error={errors.password}
          />
        </div>
      </div>

      {/* Course Assignment */}

      <div>
        <h2 className="mb-4 text-xl font-bold text-slate-800">
          Course Assignment
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
         <Select
  label="Course"
  icon={<FaBookOpen />}
  {...register("course")}
  error={errors.course}
  options={
    courses?.map((course) => ({
      label: course.title,
      value: course._id,
    })) ?? []
  }
/>

          <Select
            label="Batch"
            {...register("batch")}
            error={errors.batch}
            options={
    batches?.map((batch) => ({
      label: batch.name,
      value: batch._id,
    })) ?? []
  }
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

          {isSubmitting ? "Creating..." : "Create Student"}
        </button>
      </div>
    </form>
  );
}