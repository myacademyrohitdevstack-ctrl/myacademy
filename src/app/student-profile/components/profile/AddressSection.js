"use client";

import { FaMapMarkerAlt } from "react-icons/fa";
import Input from "./Input";

export default function AddressSection({
  register,
  errors,
}) {
  return (
    <section className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Address
        </h2>

        <p className="mt-1 text-slate-500">
          Keep your residential address up to date.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Input
          icon={<FaMapMarkerAlt />}
          label="Street"
          placeholder="Street Address"
          error={errors.address?.street}
          {...register("address.street")}
          className="md:col-span-2"
        />

        <Input
          icon={<FaMapMarkerAlt />}
          label="City"
          placeholder="City"
          error={errors.address?.city}
          {...register("address.city")}
        />

        <Input
          icon={<FaMapMarkerAlt />}
          label="State"
          placeholder="State"
          error={errors.address?.state}
          {...register("address.state")}
        />

        <Input
          icon={<FaMapMarkerAlt />}
          label="Country"
          placeholder="Country"
          error={errors.address?.country}
          {...register("address.country")}
        />

        <Input
          icon={<FaMapMarkerAlt />}
          label="Postal Code"
          placeholder="Postal Code"
          error={errors.address?.postalCode}
          {...register("address.postalCode")}
        />
      </div>
    </section>
  );
}