"use client";

import { FaUser, FaPhoneAlt, FaSave } from "react-icons/fa";

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
    <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Emergency Contact
        </h2>

        <p className="mt-1 text-slate-500">
          This person will be contacted in case of an emergency.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

       <Input
label="Contact Name"
error={errors.emergencyContact?.name}
{...register("emergencyContact.name")}
/>

<Input
label="Phone"
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
  { value: "Friend", label: "Friend" },
  { value: "Guardian", label: "Guardian" },
]}
/>

      </div>

      {/* Buttons */}

      <div className="mt-10 flex flex-col-reverse gap-4 sm:flex-row sm:justify-end">

        <button
          type="button"
          onClick={handleCancel}
        
          className="rounded-2xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center gap-2 rounded-2xl bg-[#D6451B] px-6 py-3 font-medium text-white transition hover:bg-[#b93814] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <FaSave />

          {isSubmitting
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>
    </section>
  );
}