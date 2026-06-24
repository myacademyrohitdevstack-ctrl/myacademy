"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import Input from "./Input";

export default function AddressSection({
  register,
  errors,
}) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-start gap-4 sm:mb-8">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-lg text-[#D6451B]">
          <FaMapMarkerAlt />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Address Details
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500 sm:text-base">
            Keep your residential address updated for communication and records.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
        <Input
          icon={<FaMapMarkerAlt />}
          label="Street Address"
          placeholder="Enter your street address"
          error={errors.address?.street}
          {...register("address.street")}
          className="md:col-span-2"
        />

        <Input
          icon={<FaMapMarkerAlt />}
          label="City"
          placeholder="Enter city"
          error={errors.address?.city}
          {...register("address.city")}
        />

        <Input
          icon={<FaMapMarkerAlt />}
          label="State"
          placeholder="Enter state"
          error={errors.address?.state}
          {...register("address.state")}
        />

        <Input
          icon={<FaMapMarkerAlt />}
          label="Country"
          placeholder="Enter country"
          error={errors.address?.country}
          {...register("address.country")}
        />

        <Input
          icon={<FaMapMarkerAlt />}
          label="Postal Code"
          placeholder="Enter postal code"
          error={errors.address?.postalCode}
          {...register("address.postalCode")}
        />
      </div>
    </section>
  );
}