"use client";

import {
  FaUser,
  FaPhoneAlt,
  FaEnvelope,
  FaUsers,
} from "react-icons/fa";

import Input from "./Input";
import Select from "./Select";

export default function GuardianSection({
  errors,
  register,
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-start gap-4 sm:mb-8">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-100 text-lg text-indigo-600">
          <FaUsers />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Guardian Information
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
            Enter the details of your parent or guardian for official communication.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
        <Input
          icon={<FaUser />}
          label="Father's Name"
          placeholder="Enter father's name"
          error={errors.guardian?.fatherName}
          {...register("guardian.fatherName")}
        />

        <Input
          icon={<FaUser />}
          label="Mother's Name"
          placeholder="Enter mother's name"
          error={errors.guardian?.motherName}
          {...register("guardian.motherName")}
        />

        <Input
          icon={<FaUsers />}
          label="Guardian Name"
          placeholder="Enter guardian name"
          error={errors.guardian?.guardianName}
          {...register("guardian.guardianName")}
        />

        <Select
          label="Relationship"
          error={errors.guardian?.relationship}
          {...register("guardian.relationship")}
          options={[
            { value: "Father", label: "Father" },
            { value: "Mother", label: "Mother" },
            { value: "Guardian", label: "Guardian" },
            { value: "Brother", label: "Brother" },
            { value: "Sister", label: "Sister" },
            { value: "Grandparent", label: "Grandparent" },
            { value: "Relative", label: "Relative" },
            { value: "Other", label: "Other" },
          ]}
        />

        <Input
          icon={<FaPhoneAlt />}
          label="Guardian Phone"
          placeholder="Enter phone number"
          error={errors.guardian?.phone}
          {...register("guardian.phone")}
        />

        <Input
          icon={<FaEnvelope />}
          label="Guardian Email"
          placeholder="Enter email address"
          error={errors.guardian?.email}
          {...register("guardian.email")}
        />
      </div>
    </section>
  );
}