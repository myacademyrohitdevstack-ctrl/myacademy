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
errors,register
}) {
  return (
    <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Guardian Information
        </h2>

        <p className="mt-1 text-slate-500">
          Provide the details of your parent or guardian.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">

      <Input
label="Father Name"
error={errors.guardian?.fatherName}
{...register("guardian.fatherName")}
/>

<Input
label="Mother Name"
error={errors.guardian?.motherName}
{...register("guardian.motherName")}
/>

<Input
label="Guardian Name"
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
  { value: "Other", label: "Other" },
]}
/>

<Input
label="Guardian Phone"
error={errors.guardian?.phone}
{...register("guardian.phone")}
/>

<Input
label="Guardian Email"
error={errors.guardian?.email}
{...register("guardian.email")}
/>

      </div>
    </section>
  );
}