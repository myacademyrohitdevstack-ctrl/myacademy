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

export default function Settings() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    language: "English",
  });

  const handleToggle = (field) => {
    setSettings((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="space-y-8">

      {/* Hero */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="rounded-[32px] bg-gradient-to-r from-[#D6451B] to-orange-500 p-8 text-white shadow-xl"
      >
        <h1 className="text-4xl font-bold">
          Settings
        </h1>

        <p className="mt-3 text-orange-100">
          Manage your account preferences and security settings.
        </p>
      </motion.div>

      {/* Security */}

      <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg">

        <div className="flex items-center gap-3">

          <FaLock className="text-2xl text-[#D6451B]" />

          <h2 className="text-2xl font-bold">
            Change Password
          </h2>

        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">

          <input
            type="password"
            placeholder="Current Password"
            className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-[#D6451B]"
          />

          <div />

          <input
            type="password"
            placeholder="New Password"
            className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-[#D6451B]"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="rounded-2xl border border-slate-200 p-4 outline-none focus:border-[#D6451B]"
          />

        </div>

        <button className="mt-6 rounded-2xl bg-[#D6451B] px-6 py-3 text-white">
          Update Password
        </button>

      </div>

      {/* Notifications */}

      <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg">

        <div className="flex items-center gap-3">

          <FaBell className="text-2xl text-[#D6451B]" />

          <h2 className="text-2xl font-bold">
            Notifications
          </h2>

        </div>

        <div className="mt-8 space-y-5">

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

      <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg">

        <div className="flex items-center gap-3">

          <FaGlobe className="text-2xl text-[#D6451B]" />

          <h2 className="text-2xl font-bold">
            Preferences
          </h2>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Language
            </label>

            <select
              className="w-full rounded-2xl border border-slate-200 p-4 outline-none focus:border-[#D6451B]"
              value={settings.language}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  language: e.target.value,
                })
              }
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Punjabi</option>
            </select>

          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 p-5">

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

            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm">
              Soon
            </span>

          </div>

        </div>

      </div>

      {/* Account */}

      <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-lg">

        <div className="flex items-center gap-3">

          <FaUserShield className="text-2xl text-[#D6451B]" />

          <h2 className="text-2xl font-bold">
            Account
          </h2>

        </div>

        <div className="mt-8 flex flex-wrap gap-4">

          <button className="flex items-center gap-2 rounded-2xl bg-[#D6451B] px-6 py-3 text-white">
            <FaSave />
            Save Settings
          </button>

          <button className="flex items-center gap-2 rounded-2xl border border-red-200 px-6 py-3 text-red-600 hover:bg-red-50">
            <FaSignOutAlt />
            Logout
          </button>

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