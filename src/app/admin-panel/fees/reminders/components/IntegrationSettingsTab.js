"use client";

import { useState } from "react";
import {
  FaWhatsapp,
  FaKey,
  FaPhoneAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSyncAlt,
  FaSave,
  FaExternalLinkAlt,
  FaShieldAlt,
  FaInfoCircle,
  FaTrashAlt,
  FaCopy,
  FaSpinner,
} from "react-icons/fa";
import { useWhatsAppIntegration } from "@/Hooks/useWhatsAppReminders";
import {
  useSaveIntegrationMutation,
  useTestIntegrationMutation,
  useDisconnectIntegrationMutation,
} from "@/app/mutations/whatsappReminderMutations";
import { toast } from "sonner";

function IntegrationSettingsForm({ initialIntegration }) {
  const saveMutation = useSaveIntegrationMutation();
  const testMutation = useTestIntegrationMutation();
  const disconnectMutation = useDisconnectIntegrationMutation();

  const [mode, setMode] = useState(initialIntegration?.mode || "manual");
  const [phoneNumberId, setPhoneNumberId] = useState(initialIntegration?.phoneNumberId || "");
  const [businessAccountId, setBusinessAccountId] = useState(initialIntegration?.businessAccountId || "");
  const [accessToken, setAccessToken] = useState(initialIntegration?.accessToken || "");
  const [senderPhoneNumber, setSenderPhoneNumber] = useState(initialIntegration?.senderPhoneNumber || "");
  const [webhookVerifyToken, setWebhookVerifyToken] = useState(
    initialIntegration?.webhookVerifyToken || "myacademy_secret_verify_token_2026"
  );

  const handleSave = (e) => {
    e.preventDefault();
    saveMutation.mutate({
      mode,
      phoneNumberId,
      businessAccountId,
      accessToken,
      senderPhoneNumber,
      webhookVerifyToken,
    });
  };

  const handleCopyWebhookUrl = () => {
    const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:5000";
    const webhookUrl = `${origin.replace(":3000", ":5000")}/api/webhooks/whatsapp`;
    navigator.clipboard.writeText(webhookUrl);
    toast.success("Webhook URL copied to clipboard!");
  };

  const handleCopyToken = () => {
    navigator.clipboard.writeText(webhookVerifyToken);
    toast.success("Verify Token copied to clipboard!");
  };

  const isConnected =
    initialIntegration?.mode === "cloud_api" && initialIntegration?.connectionStatus === "connected";

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FaWhatsapp className="text-emerald-500 text-lg" /> WhatsApp Integration Settings
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Choose between free manual Click-to-Chat links or official Meta WhatsApp Business Cloud API.
          </p>
        </div>

        {mode === "cloud_api" && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => testMutation.mutate()}
              disabled={testMutation.isPending || !phoneNumberId}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <FaSyncAlt className={`text-xs ${testMutation.isPending ? "animate-spin" : ""}`} />
              {testMutation.isPending ? "Testing..." : "Test Connection"}
            </button>
            <button
              type="button"
              onClick={() => disconnectMutation.mutate()}
              disabled={disconnectMutation.isPending}
              className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50"
            >
              <FaTrashAlt className="text-xs" /> Disconnect
            </button>
          </div>
        )}
      </div>

      {/* 2. Mode Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Mode 1: Manual */}
        <div
          onClick={() => setMode("manual")}
          className={`cursor-pointer p-5 rounded-2xl border transition-all ${
            mode === "manual"
              ? "bg-orange-50/40 border-[#D6451B] ring-2 ring-[#D6451B]/20 shadow-xs"
              : "bg-white border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-orange-100 text-[#D6451B] flex items-center justify-center font-black text-xs">
                1
              </span>
              Mode 1: Manual WhatsApp (Click-to-Chat)
            </h3>
            {mode === "manual" && <FaCheckCircle className="text-[#D6451B] text-base" />}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Zero setup required. No API credentials or Meta Business verification needed. Generates pre-filled
            WhatsApp Web links. The academy administrator clicks to open WhatsApp and confirms sent status.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
            Free forever & ready immediately
          </div>
        </div>

        {/* Mode 2: Cloud API */}
        <div
          onClick={() => setMode("cloud_api")}
          className={`cursor-pointer p-5 rounded-2xl border transition-all ${
            mode === "cloud_api"
              ? "bg-emerald-50/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
              : "bg-white border-slate-200 hover:border-slate-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <span className="h-6 w-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">
                2
              </span>
              Mode 2: Official WhatsApp Cloud API
            </h3>
            {mode === "cloud_api" && <FaCheckCircle className="text-emerald-600 text-base" />}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Direct integration with Meta WhatsApp Business Platform. Enables background automated reminders,
            delivery receipts, and read confirmations without manual clicking.
          </p>
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
            Automated hourly dispatch & delivery tracking
          </div>
        </div>
      </div>

      {/* 3. Official Cloud API Form (shown when mode === 'cloud_api') */}
      {mode === "cloud_api" && (
        <form onSubmit={handleSave} className="p-5 sm:p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-extrabold text-sm text-slate-900">
              Meta WhatsApp Business Cloud API Credentials
            </h3>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1 ${
                isConnected
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                  : "bg-rose-50 text-rose-700 border border-rose-200"
              }`}
            >
              {isConnected ? "Connected & Verified" : "Not Connected"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Phone Number ID */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Phone Number ID *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 104829104829104"
                value={phoneNumberId}
                onChange={(e) => setPhoneNumberId(e.target.value)}
                className="w-full font-semibold px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* WhatsApp Business Account ID */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                WhatsApp Business Account (WABA) ID
              </label>
              <input
                type="text"
                placeholder="e.g. 192837465019283"
                value={businessAccountId}
                onChange={(e) => setBusinessAccountId(e.target.value)}
                className="w-full font-semibold px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Permanent Access Token */}
            <div className="sm:col-span-2">
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                System User Permanent Access Token *
              </label>
              <input
                type="password"
                required
                placeholder="EAAG..."
                value={accessToken}
                onChange={(e) => setAccessToken(e.target.value)}
                className="w-full font-mono text-xs px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
              <p className="text-[10px] text-slate-400 mt-1">
                Stored securely on backend. Never exposed in public responses.
              </p>
            </div>

            {/* Sender Phone Number */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Sender Display Phone Number
              </label>
              <input
                type="text"
                placeholder="e.g. +91 98765 43210"
                value={senderPhoneNumber}
                onChange={(e) => setSenderPhoneNumber(e.target.value)}
                className="w-full font-semibold px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>

            {/* Webhook Verification Token */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Webhook Verify Token
              </label>
              <input
                type="text"
                value={webhookVerifyToken}
                onChange={(e) => setWebhookVerifyToken(e.target.value)}
                className="w-full font-semibold px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              disabled={saveMutation.isPending}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 inline-flex items-center gap-2 transition-all disabled:opacity-50"
            >
              <FaSave className="text-xs" />
              {saveMutation.isPending ? "Saving..." : "Save API Configuration"}
            </button>
          </div>
        </form>
      )}

      {/* 4. Manual Mode Save Banner (when mode === 'manual') */}
      {mode === "manual" && (
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-extrabold text-sm text-slate-900">Manual Click-to-Chat Active</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Academy fee reminders will generate prepopulated wa.me links. No credentials required.
            </p>
          </div>
          <button
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="px-5 py-2.5 rounded-xl bg-[#D6451B] hover:bg-orange-600 text-white font-extrabold text-xs shadow-md shadow-orange-200 inline-flex items-center gap-2 transition-all disabled:opacity-50 shrink-0"
          >
            <FaSave className="text-xs" />
            {saveMutation.isPending ? "Saving..." : "Confirm Manual Mode"}
          </button>
        </div>
      )}

      {/* 5. Meta Webhook Setup Instructions Card */}
      {mode === "cloud_api" && (
        <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-xs uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <FaShieldAlt className="text-sm" /> Webhook Setup Guide (Meta Developers Console)
            </h4>
            <span className="text-[10px] text-slate-400">Receives delivery & read receipts</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            In your Meta App Dashboard under <strong>WhatsApp → Configuration → Webhook</strong>:
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <span className="font-mono text-emerald-300 text-[11px] truncate">
                Callback URL: /api/webhooks/whatsapp
              </span>
              <button
                onClick={handleCopyWebhookUrl}
                className="w-full sm:w-auto justify-center px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-[10px] inline-flex items-center gap-1 shrink-0"
              >
                <FaCopy className="text-[9px]" /> Copy Full URL
              </button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-800 border border-slate-700">
              <span className="font-mono text-emerald-300 text-[11px] truncate">
                Verify Token: {webhookVerifyToken}
              </span>
              <button
                onClick={handleCopyToken}
                className="w-full sm:w-auto justify-center px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-[10px] inline-flex items-center gap-1 shrink-0"
              >
                <FaCopy className="text-[9px]" /> Copy Token
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Subscribe to the <strong>messages</strong> webhook field to automatically capture delivery and read
            status updates in real time.
          </p>
        </div>
      )}
    </div>
  );
}

export default function IntegrationSettingsTab() {
  const { data: integrationData, isLoading } = useWhatsAppIntegration();

  if (isLoading) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
        <FaSpinner className="mx-auto text-2xl text-[#D6451B] animate-spin mb-2" />
        <p className="text-xs font-semibold text-slate-500">Loading WhatsApp settings...</p>
      </div>
    );
  }

  return (
    <IntegrationSettingsForm
      key={integrationData?._id || "integration-loaded"}
      initialIntegration={integrationData}
    />
  );
}
