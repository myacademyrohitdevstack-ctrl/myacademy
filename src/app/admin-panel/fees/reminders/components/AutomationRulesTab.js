"use client";

import { useState } from "react";
import {
  FaRobot,
  FaClock,
  FaCalendarCheck,
  FaPlay,
  FaPause,
  FaSave,
  FaSyncAlt,
  FaCheckCircle,
  FaExclamationCircle,
  FaShieldAlt,
  FaPlus,
  FaTrashAlt,
  FaSpinner,
} from "react-icons/fa";
import { useReminderSettings, useReminderTemplates } from "@/Hooks/useWhatsAppReminders";
import {
  useUpdateReminderSettingsMutation,
  useTriggerReminderRunMutation,
} from "@/app/mutations/whatsappReminderMutations";

const COMMON_TIMEZONES = [
  "Asia/Kolkata",
  "Asia/Dubai",
  "Asia/Singapore",
  "Europe/London",
  "America/New_York",
  "America/Los_Angeles",
  "UTC",
];

function AutomationRulesForm({ initialSettings, templates }) {
  const updateSettingsMutation = useUpdateReminderSettingsMutation();
  const triggerRunMutation = useTriggerReminderRunMutation();

  const [enabled, setEnabled] = useState(initialSettings?.automaticRemindersEnabled || false);
  const [isPaused, setIsPaused] = useState(initialSettings?.isPaused || false);
  const [timezone, setTimezone] = useState(initialSettings?.timezone || "Asia/Kolkata");
  const [startHour, setStartHour] = useState(initialSettings?.allowedSendingHours?.start || "09:00");
  const [endHour, setEndHour] = useState(initialSettings?.allowedSendingHours?.end || "20:00");
  const [maxReminders, setMaxReminders] = useState(initialSettings?.maximumRemindersPerInstallment ?? 3);
  const [minIntervalDays, setMinIntervalDays] = useState(initialSettings?.minimumReminderIntervalDays ?? 2);
  const [overdueEnabled, setOverdueEnabled] = useState(initialSettings?.overdueRemindersEnabled ?? true);
  const [excludeOptedOut, setExcludeOptedOut] = useState(initialSettings?.excludeOptedOut ?? true);
  const [rules, setRules] = useState(initialSettings?.rules || []);

  const handleToggleRule = (index) => {
    setRules((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], isActive: !copy[index].isActive };
      return copy;
    });
  };

  const handleRuleTemplateChange = (index, templateId) => {
    setRules((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], templateId: templateId || null };
      return copy;
    });
  };

  const handleAddCustomRule = () => {
    setRules((prev) => [
      ...prev,
      {
        ruleType: "custom_offset",
        daysOffset: 14,
        isActive: true,
        templateId: null,
      },
    ]);
  };

  const handleRemoveRule = (index) => {
    setRules((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveSettings = () => {
    updateSettingsMutation.mutate({
      automaticRemindersEnabled: enabled,
      isPaused,
      timezone,
      allowedSendingHours: {
        start: startHour,
        end: endHour,
      },
      maximumRemindersPerInstallment: Number(maxReminders),
      minimumReminderIntervalDays: Number(minIntervalDays),
      overdueRemindersEnabled: overdueEnabled,
      excludeOptedOut,
      rules,
    });
  };

  const getRuleLabel = (rule) => {
    if (rule.ruleType === "due_today" || rule.daysOffset === 0) {
      return "On Due Date (Day 0)";
    }
    if (rule.daysOffset < 0) {
      return `${Math.abs(rule.daysOffset)} Day(s) Before Due Date`;
    }
    return `${rule.daysOffset} Day(s) Overdue`;
  };

  return (
    <div className="space-y-6">
      {/* 1. Header & Quick Run Banner */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FaRobot className="text-orange-500" /> Automated Reminder Engine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure automated schedule intervals, allowed sending hours, and rate limits.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerRunMutation.mutate()}
            disabled={triggerRunMutation.isPending}
            className="px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#D6451B] font-bold text-xs inline-flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <FaSyncAlt className={`text-xs ${triggerRunMutation.isPending ? "animate-spin" : ""}`} />
            {triggerRunMutation.isPending ? "Running..." : "Run Engine Now"}
          </button>
          <button
            onClick={handleSaveSettings}
            disabled={updateSettingsMutation.isPending}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 hover:from-orange-600 hover:to-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-200 inline-flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <FaSave className="text-xs" />
            {updateSettingsMutation.isPending ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>

      {/* 2. Global Toggles & Master Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Enable / Disable Engine */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-sm font-extrabold text-slate-900">Automatic Reminders</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Allow backend hourly scheduler to evaluate dues and dispatch reminders
            </p>
          </div>
          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              enabled ? "bg-emerald-500" : "bg-slate-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                enabled ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Temporary Pause Toggle */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-sm font-extrabold text-slate-900">Pause All Automations</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Temporarily freeze automated sending without clearing your rules
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              isPaused ? "bg-amber-500" : "bg-slate-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                isPaused ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* 3. Sending Window & Frequency Protection */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
          Sending Hours & Rate Limiting Protection
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Timezone */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Academy Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full font-semibold px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none"
            >
              {COMMON_TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          {/* Allowed Hours */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Allowed Hours Window
            </label>
            <div className="flex items-center gap-1.5">
              <input
                type="time"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                className="w-full font-semibold px-2 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-center"
              />
              <span className="text-slate-400 font-bold">to</span>
              <input
                type="time"
                value={endHour}
                onChange={(e) => setEndHour(e.target.value)}
                className="w-full font-semibold px-2 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-center"
              />
            </div>
          </div>

          {/* Max Reminders per installment */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Max Reminders / Installment
            </label>
            <input
              type="number"
              min={1}
              max={10}
              value={maxReminders}
              onChange={(e) => setMaxReminders(e.target.value)}
              className="w-full font-semibold px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
            />
          </div>

          {/* Min Interval Days */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
              Min Repeat Interval (Days)
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={minIntervalDays}
              onChange={(e) => setMinIntervalDays(e.target.value)}
              className="w-full font-semibold px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800"
            />
          </div>
        </div>

        {/* Protection Checkboxes */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={overdueEnabled}
              onChange={(e) => setOverdueEnabled(e.target.checked)}
              className="rounded text-[#D6451B] focus:ring-[#D6451B]"
            />
            <span>Send Overdue Reminders</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={excludeOptedOut}
              onChange={(e) => setExcludeOptedOut(e.target.checked)}
              className="rounded text-[#D6451B] focus:ring-[#D6451B]"
            />
            <span>Strictly exclude opted-out phone numbers</span>
          </label>
        </div>
      </div>

      {/* 4. Active Rules List */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
            Automated Reminder Rules
          </h3>
          <button
            type="button"
            onClick={handleAddCustomRule}
            className="text-xs font-bold text-[#D6451B] hover:text-orange-600 inline-flex items-center gap-1"
          >
            <FaPlus className="text-[10px]" /> Add Custom Rule
          </button>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleRule(idx)}
                  className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                    rule.isActive ? "bg-emerald-500" : "bg-slate-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      rule.isActive ? "translate-x-4" : "translate-x-0"
                    }`}
                  />
                </button>
                <div>
                  <p className="font-extrabold text-slate-800">{getRuleLabel(rule)}</p>
                  <p className="text-[11px] text-slate-400">
                    Rule type: {rule.ruleType} (offset: {rule.daysOffset} days)
                  </p>
                </div>
              </div>

              {/* Template selector per rule */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Template:</span>
                <select
                  value={rule.templateId || ""}
                  onChange={(e) => handleRuleTemplateChange(idx, e.target.value)}
                  className="font-semibold px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none"
                >
                  <option value="">Default Recommended</option>
                  {templates.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name}
                    </option>
                  ))}
                </select>

                {rule.ruleType === "custom_offset" && (
                  <button
                    type="button"
                    onClick={() => handleRemoveRule(idx)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Remove rule"
                  >
                    <FaTrashAlt className="text-xs" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AutomationRulesTab() {
  const { data: settingsData, isLoading } = useReminderSettings();
  const { data: templates = [] } = useReminderTemplates();

  if (isLoading) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
        <FaSpinner className="mx-auto text-2xl text-[#D6451B] animate-spin mb-2" />
        <p className="text-xs font-semibold text-slate-500">Loading automation settings...</p>
      </div>
    );
  }

  return (
    <AutomationRulesForm
      key={settingsData?._id || "settings-loaded"}
      initialSettings={settingsData}
      templates={templates}
    />
  );
}
