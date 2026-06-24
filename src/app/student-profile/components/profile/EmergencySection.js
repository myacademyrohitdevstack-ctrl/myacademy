"use client";

import {
  FaUser,
  FaPhoneAlt,
  FaSave,
  FaUserShield,
} from "react-icons/fa";

import Input from "./Input";
import Select from "./Select";

export default function EmergencySection({
  errors,
  register,
  profileUpdateMutation,
  handleCancel,
  isSubmitting = false,
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-start gap-4 sm:mb-8">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-lg text-red-600">
          <FaUserShield />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Emergency Contact
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
            This person will be contacted if there's an emergency involving you.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
        <Input
          icon={<FaUser />}
          label="Contact Name"
          placeholder="Enter full name"
          error={errors.emergencyContact?.name}
          {...register("emergencyContact.name")}
        />

        <Input
          icon={<FaPhoneAlt />}
          label="Phone Number"
          placeholder="Enter phone number"
          error={errors.emergencyContact?.phone}
          {...register("emergencyContact.phone")}
        />

        <Select
          label="Relationship"
          error={errors.emergencyContact?.relation}
          {...register("emergencyContact.relation")}
          options={[
            { value: "Father", label: "Father" },
            { value: "Mother", label: "Mother" },
            { value: "Guardian", label: "Guardian" },
            { value: "Brother", label: "Brother" },
            { value: "Sister", label: "Sister" },
            { value: "Friend", label: "Friend" },
            { value: "Relative", label: "Relative" },
          ]}
          className="md:col-span-2"
        />
      </div>

      {/* Divider */}
      <div className="my-8 border-t border-slate-200" />

      {/* Buttons */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={handleCancel}
          className="w-full rounded-2xl border border-slate-300 bg-white px-6 py-3 font-medium text-slate-700 transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 sm:w-auto"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting || profileUpdateMutation?.isPending}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D6451B] px-6 py-3 font-semibold text-white shadow-lg shadow-orange-300/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#bf3d17] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        >
          <FaSave className="text-sm" />

          {isSubmitting || profileUpdateMutation?.isPending
            ? "Saving Changes..."
            : "Save Changes"}
        </button>
      </div>
    </section>
  );
}