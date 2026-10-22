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
  FaMobileAlt,
  FaCloud,
  FaCog,
  FaBolt,
  FaCheck,
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

  // Map initial mode to 3 distinct options: 'direct_whatsapp' | 'myacademy_api' | 'cloud_api'
  const getInitialMode = (m) => {
    if (m === "platform_api" || m === "myacademy_api") return "myacademy_api";
    if (m === "cloud_api" || m === "custom_api") return "cloud_api";
    return "direct_whatsapp";
  };

  const [mode, setMode] = useState(getInitialMode(initialIntegration?.mode));
  const [phoneNumberId, setPhoneNumberId] = useState(initialIntegration?.phoneNumberId || "");
  const [businessAccountId, setBusinessAccountId] = useState(initialIntegration?.businessAccountId || "");
  const [accessToken, setAccessToken] = useState(initialIntegration?.accessToken || "");
  const [senderPhoneNumber, setSenderPhoneNumber] = useState(initialIntegration?.senderPhoneNumber || "");
  const [webhookVerifyToken, setWebhookVerifyToken] = useState(
    initialIntegration?.webhookVerifyToken || "myacademy_secret_verify_token_2026"
  );

  const handleSave = (e) => {
    if (e && e.preventDefault) e.preventDefault();
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
      <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <FaWhatsapp className="text-emerald-500 text-xl" /> WhatsApp Messaging Engine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Select your preferred WhatsApp communication mode. All modes are fully mobile-responsive.
          </p>
        </div>

        {mode === "cloud_api" && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => testMutation.mutate()}
              disabled={testMutation.isPending || !phoneNumberId}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <FaSyncAlt className={`text-xs ${testMutation.isPending ? "animate-spin" : ""}`} />
              {testMutation.isPending ? "Testing..." : "Test Connection"}
            </button>
            <button
              type="button"
              onClick={() => disconnectMutation.mutate()}
              disabled={disconnectMutation.isPending}
              className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs inline-flex items-center justify-center gap-1.5 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <FaTrashAlt className="text-xs" /> Disconnect
            </button>
          </div>
        )}
      </div>

      {/* 2. 3 Distinct Mode Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
        {/* Mode 1: Direct WhatsApp (Admin's App) */}
        <div
          onClick={() => setMode("direct_whatsapp")}
          className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all relative flex flex-col justify-between ${
            mode === "direct_whatsapp"
              ? "bg-orange-50/50 border-[#D6451B] ring-2 ring-[#D6451B]/20 shadow-xs"
              : "bg-white border-slate-200 hover:border-slate-300"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-xl bg-orange-100 text-[#D6451B] flex items-center justify-center font-black text-xs">
                  <FaMobileAlt />
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-orange-600">Option 1</span>
              </div>
              {mode === "direct_whatsapp" && (
                <span className="h-5 w-5 rounded-full bg-[#D6451B] text-white flex items-center justify-center text-[10px]">
                  <FaCheck />
                </span>
              )}
            </div>

            <h3 className="font-extrabold text-sm text-slate-900 mb-1">
              Direct Admin WhatsApp
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open WhatsApp directly on your mobile device or web browser with dynamic variables pre-filled. No API keys or developer accounts needed.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-700">
              <FaBolt className="text-[10px]" /> 100% Free & Zero Setup
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Click-to-Chat</span>
          </div>
        </div>

        {/* Mode 2: MyAcademy WhatsApp API (Managed Platform Gateway) */}
        <div
          onClick={() => setMode("myacademy_api")}
          className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all relative flex flex-col justify-between ${
            mode === "myacademy_api"
              ? "bg-purple-50/50 border-purple-600 ring-2 ring-purple-600/20 shadow-xs"
              : "bg-white border-slate-200 hover:border-slate-300"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-xs">
                  <FaCloud />
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-purple-600">Option 2 (Recommended)</span>
              </div>
              {mode === "myacademy_api" && (
                <span className="h-5 w-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-[10px]">
                  <FaCheck />
                </span>
              )}
            </div>

            <h3 className="font-extrabold text-sm text-slate-900 mb-1">
              MyAcademy WhatsApp API
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Automated cloud messaging handled completely by MyAcademy. No need to obtain or find API keys, webhooks, or Meta accounts!
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700">
              <FaCheckCircle className="text-[10px]" /> Managed Cloud Gateway
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Auto Dispatch</span>
          </div>
        </div>

        {/* Mode 3: Custom Meta Cloud API (Their Own API) */}
        <div
          onClick={() => setMode("cloud_api")}
          className={`cursor-pointer p-4 sm:p-5 rounded-2xl border transition-all relative flex flex-col justify-between ${
            mode === "cloud_api"
              ? "bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs"
              : "bg-white border-slate-200 hover:border-slate-300"
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="h-7 w-7 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-xs">
                  <FaCog />
                </span>
                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">Option 3</span>
              </div>
              {mode === "cloud_api" && (
                <span className="h-5 w-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                  <FaCheck />
                </span>
              )}
            </div>

            <h3 className="font-extrabold text-sm text-slate-900 mb-1">
              Your Own Meta API
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connect your academy's own Meta WhatsApp Business Account for custom branded sender number and verification badges.
            </p>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700">
              <FaKey className="text-[10px]" /> Custom Credentials
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Meta Verified</span>
          </div>
        </div>
      </div>

      {/* 3. Details / Actions For Selected Mode */}

      {/* Mode 1 Details & Confirmation */}
      {mode === "direct_whatsapp" && (
        <div className="p-5 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <p className="font-extrabold text-sm text-slate-900">Direct Admin WhatsApp Ready</p>
            </div>
            <p className="text-xs text-slate-500 max-w-xl">
              All reminder dispatches will generate instant click-to-chat links. You can trigger messages directly from your mobile phone or WhatsApp Web with one tap.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saveMutation.isPending}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#D6451B] hover:bg-orange-600 text-white font-extrabold text-xs shadow-md shadow-orange-200 inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shrink-0"
          >
            <FaSave className="text-xs" />
            {saveMutation.isPending ? "Saving..." : "Set as Default Mode"}
          </button>
        </div>
      )}

      {/* Mode 2 Details & Confirmation */}
      {mode === "myacademy_api" && (
        <div className="p-5 rounded-2xl sm:rounded-3xl bg-purple-50/50 border border-purple-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-purple-600 animate-pulse" />
                <p className="font-extrabold text-sm text-slate-900">MyAcademy WhatsApp Gateway Active</p>
              </div>
              <p className="text-xs text-slate-600 max-w-xl">
                Zero configuration required. All manual and automated reminders will be delivered through MyAcademy's high-speed cloud infrastructure.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={saveMutation.isPending}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs shadow-md shadow-purple-200 inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shrink-0"
            >
              <FaSave className="text-xs" />
              {saveMutation.isPending ? "Saving..." : "Activate MyAcademy Gateway"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-purple-200/60 text-[11px] text-purple-900">
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-purple-600 shrink-0" /> No Meta Business Account Required
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-purple-600 shrink-0" /> Automatic Hourly Fee Alerts
            </div>
            <div className="flex items-center gap-2">
              <FaCheckCircle className="text-purple-600 shrink-0" /> Fallback Direct WhatsApp Links
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Custom Meta Cloud API Form */}
      {mode === "cloud_api" && (
        <div className="space-y-4">
          <form onSubmit={handleSave} className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 shadow-xs space-y-4">
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
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-200 inline-flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <FaSave className="text-xs" />
                {saveMutation.isPending ? "Saving..." : "Save Custom API Configuration"}
              </button>
            </div>
          </form>

          {/* Webhook Guide */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 shadow-md space-y-3">
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
                  type="button"
                  onClick={handleCopyWebhookUrl}
                  className="w-full sm:w-auto justify-center px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-[10px] inline-flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <FaCopy className="text-[9px]" /> Copy Full URL
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-800 border border-slate-700">
                <span className="font-mono text-emerald-300 text-[11px] truncate">
                  Verify Token: {webhookVerifyToken}
                </span>
                <button
                  type="button"
                  onClick={handleCopyToken}
                  className="w-full sm:w-auto justify-center px-2.5 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 font-bold text-[10px] inline-flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  <FaCopy className="text-[9px]" /> Copy Token
                </button>
              </div>
            </div>
          </div>
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
