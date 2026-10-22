"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaChartPie,
  FaPaperPlane,
  FaHistory,
  FaClock,
  FaFileAlt,
  FaRobot,
  FaCog,
} from "react-icons/fa";
import FeesNav from "../components/FeesNav";
import ReminderDashboardTab from "./components/ReminderDashboardTab";
import SendRemindersTab from "./components/SendRemindersTab";
import ReminderHistoryTab from "./components/ReminderHistoryTab";
import ScheduledRemindersTab from "./components/ScheduledRemindersTab";
import TemplatesTab from "./components/TemplatesTab";
import AutomationRulesTab from "./components/AutomationRulesTab";
import IntegrationSettingsTab from "./components/IntegrationSettingsTab";
import ManualSendModal from "./components/ManualSendModal";
import BulkSendConfirmModal from "./components/BulkSendConfirmModal";
import ReminderDetailsModal from "./components/ReminderDetailsModal";

import {
  useWhatsAppDashboard,
  useReminderTemplates,
  useWhatsAppIntegration,
} from "@/Hooks/useWhatsAppReminders";

export default function RemindersClient() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sendTabInitialFilter, setSendTabInitialFilter] = useState("all_pending");

  // Modal states
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [selectedCandidateForManual, setSelectedCandidateForManual] = useState(null);

  const [bulkConfirmModalOpen, setBulkConfirmModalOpen] = useState(false);
  const [bulkConfirmData, setBulkConfirmData] = useState(null);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedReminderForDetails, setSelectedReminderForDetails] = useState(null);

  // Queries
  const { data: dashboardData, isLoading: dashboardLoading } = useWhatsAppDashboard();
  const { data: templates = [] } = useReminderTemplates();
  const { data: integrationData } = useWhatsAppIntegration();

  const handleNavigateTab = (tabKey, options = {}) => {
    if (options.filter) {
      setSendTabInitialFilter(options.filter);
    }
    setActiveTab(tabKey);
  };

  const handleOpenManualModal = ({ candidate }) => {
    setSelectedCandidateForManual(candidate);
    setManualModalOpen(true);
  };

  const handleOpenBulkConfirmModal = (data) => {
    setBulkConfirmData(data);
    setBulkConfirmModalOpen(true);
  };

  const handleOpenDetails = (reminder) => {
    setSelectedReminderForDetails(reminder);
    setDetailsModalOpen(true);
  };

  const tabs = [
    { key: "dashboard", label: "Dashboard", icon: FaChartPie },
    { key: "send", label: "Send Reminders", icon: FaPaperPlane },
    { key: "history", label: "Reminder History", icon: FaHistory },
    { key: "scheduled", label: "Scheduled", icon: FaClock },
    { key: "templates", label: "Message Templates", icon: FaFileAlt },
    { key: "rules", label: "Automation Rules", icon: FaRobot },
    { key: "integration", label: "Integration", icon: FaCog },
  ];

  return (
    <div className="w-full min-w-0 space-y-4 sm:space-y-6">
      <FeesNav />

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#128C7E] p-4 sm:p-6 lg:p-8 text-white shadow-xl"
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-emerald-300 backdrop-blur-md mb-2">
              <FaWhatsapp className="text-sm" /> WhatsApp Business Communication Engine
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight">
              WhatsApp Fee Reminder System
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
              Automate due date alerts, overdue notifications, and fee follow-ups with Direct WhatsApp, MyAcademy Managed API, or Custom Meta Cloud API.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => handleNavigateTab("send", { filter: "all_pending" })}
              className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D6451B] to-orange-500 hover:from-orange-600 hover:to-orange-500 text-white font-extrabold text-xs shadow-md shadow-orange-950/20 inline-flex items-center justify-center gap-2 transition-all"
            >
              <FaPaperPlane className="text-xs" /> Send Reminders
            </button>
          </div>
        </div>
      </motion.div>

        {/* Tab Navigation Navigation Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-1.5 shadow-xs overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 min-w-max">
            {tabs.map((tab) => {
              const active = activeTab === tab.key;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                    active
                      ? "bg-slate-900 text-white shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`text-xs sm:text-sm ${active ? "text-emerald-400" : "text-slate-400"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          {activeTab === "dashboard" && (
            <ReminderDashboardTab
              dashboardData={dashboardData}
              isLoading={dashboardLoading}
              onNavigateTab={handleNavigateTab}
              onOpenDetails={handleOpenDetails}
            />
          )}

          {activeTab === "send" && (
            <SendRemindersTab
              templates={templates}
              integrationData={integrationData}
              initialFilter={sendTabInitialFilter}
              onOpenManualModal={handleOpenManualModal}
              onOpenBulkConfirmModal={handleOpenBulkConfirmModal}
            />
          )}

          {activeTab === "history" && (
            <ReminderHistoryTab onOpenDetails={handleOpenDetails} />
          )}

          {activeTab === "scheduled" && (
            <ScheduledRemindersTab />
          )}

          {activeTab === "templates" && (
            <TemplatesTab />
          )}

          {activeTab === "rules" && (
            <AutomationRulesTab />
          )}

          {activeTab === "integration" && (
            <IntegrationSettingsTab />
          )}
        </motion.div>

        {/* Global Modals */}
        <ManualSendModal
          isOpen={manualModalOpen}
          onClose={() => setManualModalOpen(false)}
          candidate={selectedCandidateForManual}
          templates={templates}
          integrationData={integrationData}
        />

        <BulkSendConfirmModal
          isOpen={bulkConfirmModalOpen}
          onClose={() => setBulkConfirmModalOpen(false)}
          data={bulkConfirmData}
          templates={templates}
          integrationData={integrationData}
        />

        <ReminderDetailsModal
          isOpen={detailsModalOpen}
          onClose={() => setDetailsModalOpen(false)}
          reminder={selectedReminderForDetails}
        />
    </div>
  );
}
