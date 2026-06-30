"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaLock,
  FaBell,
  FaGlobe,
  FaMoon,
  FaSave,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";
import { useLogoutMutation, useUpdatePasswordMutation } from "@/app/mutations/AuthenticationMutations";
import CommingSoon from "@/app/Components/ui/CommingSoon";
import Input from "./profile/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema } from "@/schemas/updatePasswordSchema";


export default function Settings() {
  const logoutMutation=useLogoutMutation()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    language: "English",
  });
const updatePasswordMutation =
  useUpdatePasswordMutation();

const {
  register,
  handleSubmit,
  reset,
  formState: {
    errors,
    isSubmitting,
  },
} = useForm({
  resolver: zodResolver(
    updatePasswordSchema
  ),
  mode: "onBlur",
  defaultValues: {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  },
});

const onPasswordSubmit = async (
  data
) => {
  await updatePasswordMutation.mutateAsync(
    {
      currentPassword:
        data.currentPassword,
      newPassword: data.newPassword,
    }
  );

  reset();
};
  const handleToggle = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  const handleLogout=()=>{
logoutMutation.mutate()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/40 via-white to-slate-50">
    <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-0 space-y-8">

      {/* Hero */}

   <motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  className="rounded-3xl bg-gradient-to-r from-[#D6451B] to-orange-500 px-5 py-6 text-white shadow-xl sm:px-8 sm:py-8"
>
  <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
    Settings
  </h1>

  <p className="mt-2 max-w-2xl text-sm text-orange-100 sm:text-base">
    Manage your account preferences and security settings.
  </p>
</motion.div>

      {/* Security */}

<div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg sm:p-8">
  <div className="flex items-center gap-3">
    <FaLock className="text-xl text-[#D6451B] sm:text-2xl" />

    <h2 className="text-xl font-bold sm:text-2xl">
      Change Password
    </h2>
  </div>

  <form
    onSubmit={handleSubmit(
      onPasswordSubmit
    )}
    className="mt-6"
  >
    <div className="grid gap-6 md:grid-cols-2">
      <Input
        label="Current Password"
        type="password"
        icon={<FaLock />}
        placeholder="Enter current password"
        {...register(
          "currentPassword"
        )}
        error={errors.currentPassword}
      />

      <div className="hidden md:block" />

      <Input
        label="New Password"
        type="password"
        icon={<FaLock />}
        placeholder="Enter new password"
        {...register("newPassword")}
        error={errors.newPassword}
      />

      <Input
        label="Confirm Password"
        type="password"
        icon={<FaLock />}
        placeholder="Confirm new password"
        {...register(
          "confirmPassword"
        )}
        error={errors.confirmPassword}
      />
    </div>

    <button
      type="submit"
      disabled={
        isSubmitting ||
        updatePasswordMutation.isPending
      }
      className="
        mt-6
        flex items-center gap-2
        rounded-2xl
        bg-[#D6451B]
        px-6 py-3
        font-medium
        text-white
        transition
        hover:bg-[#bf3c17]
        disabled:opacity-50
      "
    >
      <FaSave />

      {updatePasswordMutation.isPending
        ? 'Updating...'
        : 'Update Password'}
    </button>
  </form>
</div>

      {/* Notifications */}

  <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg sm:p-8 relative">
    <CommingSoon></CommingSoon>
  <div className="flex items-center gap-3">
    <FaBell className="text-xl text-[#D6451B] sm:text-2xl" />

    <h2 className="text-xl font-bold sm:text-2xl">
      Notifications
    </h2>
  </div>

  <div className="mt-6 space-y-4">
    <Switch
      title="Email Notifications"
      value={settings.emailNotifications}
      onClick={() => handleToggle("emailNotifications")}
    />

    <Switch
      title="SMS Notifications"
      value={settings.smsNotifications}
      onClick={() => handleToggle("smsNotifications")}
    />
  </div>
</div>

      {/* Preferences */}

   <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg sm:p-8 relative">
       <CommingSoon></CommingSoon>
  <div className="flex items-center gap-3">
    <FaGlobe className="text-xl text-[#D6451B] sm:text-2xl" />

    <h2 className="text-xl font-bold sm:text-2xl">
      Preferences
    </h2>
  </div>

  <div className="mt-6 grid gap-5 md:grid-cols-2">
    <div>
      <label className="mb-2 block font-medium">
        Language
      </label>

      <select
        value={settings.language}
        onChange={(e) =>
          setSettings({
            ...settings,
            language: e.target.value,
          })
        }
        className="w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none transition focus:border-[#D6451B]"
      >
        <option>English</option>
        <option>Hindi</option>
        <option>Punjabi</option>
      </select>
    </div>

    <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-4 sm:p-5">
      <div>
        <div className="flex items-center gap-2">
          <FaMoon className="text-[#D6451B]" />

          <h3 className="font-semibold">
            Dark Mode
          </h3>
        </div>

        <p className="mt-1 text-sm text-slate-500">
          Coming Soon
        </p>
      </div>

      <span className="rounded-full bg-slate-100 px-3 py-2 text-sm">
        Soon
      </span>
    </div>
  </div>
</div>

      {/* Account */}

   <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-lg sm:p-8">
  <div className="flex items-center gap-3">
    <FaUserShield className="text-xl text-[#D6451B] sm:text-2xl" />

    <h2 className="text-xl font-bold sm:text-2xl">
      Account
    </h2>
  </div>

  <div className="mt-6 flex flex-col gap-3 sm:flex-row">
    {/* <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D6451B] px-6 py-3 font-medium text-white transition hover:bg-[#bf3c17] sm:w-auto">
      <FaSave />
      Save Settings
    </button> */}

    <button
      onClick={handleLogout}
      className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-200 px-6 py-3 font-medium text-red-600 transition hover:bg-red-50 sm:w-auto"
    >
      <FaSignOutAlt />
      Logout
    </button>
  </div>
</div>

    </div>
    </div>
  );
}

function Switch({ title, value, onClick }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-5">

      <h3 className="font-medium">
        {title}
      </h3>

      <button
        onClick={onClick}
        className={`relative h-7 w-14 rounded-full transition ${
          value ? "bg-[#D6451B]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            value ? "left-8" : "left-1"
          }`}
        />
      </button>

    </div>
  );
}