"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBell,
  FaCheckDouble,
  FaBullhorn,
  FaTimes,
  FaExternalLinkAlt,
  FaExclamationCircle,
  FaLayerGroup,
  FaCalendarAlt,
} from "react-icons/fa";
import {
  useNotifications,
  useMarkNotificationRead,
  useMarkAllNotificationsRead,
} from "@/Hooks/useNotifications";

export default function NotificationBell({ className = "" }) {
  const router = useRouter();
  const { data, isLoading } = useNotifications();
  const markReadMutation = useMarkNotificationRead();
  const markAllReadMutation = useMarkAllNotificationsRead();

  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all"); // 'all' | 'unread'
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);

  const dropdownRef = useRef(null);

  const notifications = data?.notifications || [];
  const unreadCount = data?.unreadCount || 0;

  // Close on outside click
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isOpen]);

  const filteredNotifications = notifications.filter((item) => {
    if (activeFilter === "unread") return !item.isRead;
    return true;
  });

  const handleNotificationClick = (item) => {
    if (!item.isRead) {
      markReadMutation.mutate(item._id);
    }
    setIsOpen(false);
    if (item.link) {
      router.push(item.link);
    }
  };

  const handleOpenPreview = (e, item) => {
    e.stopPropagation();
    if (!item.isRead) {
      markReadMutation.mutate(item._id);
    }
    setSelectedAnnouncement(item);
  };

  const formatRelativeTime = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffSec = Math.floor((now - date) / 1000);

    if (diffSec < 60) return "Just now";
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    if (diffSec < 604800) return `${Math.floor(diffSec / 86400)}d ago`;

    return date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Bell Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-orange-50 hover:border-orange-300 hover:text-[#D6451B] active:scale-95 transition-all shadow-xs"
        aria-label="View announcements and notifications"
      >
        <FaBell className="text-sm sm:text-base" />

        {/* Unread Counter Badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-[#D6451B] to-rose-600 text-white font-extrabold text-[10px] shadow-sm animate-in zoom-in-75">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-[18px] w-[18px] rounded-full bg-orange-500 opacity-75 animate-ping pointer-events-none" />
        )}
      </button>

      {/* Notifications Popover Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed inset-x-3 top-14 sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-[380px] max-w-[calc(100vw-24px)] rounded-2xl sm:rounded-3xl border border-slate-200 bg-white shadow-2xl z-50 overflow-hidden flex flex-col"
          >
            {/* Popover Header */}
            <div className="p-3.5 sm:p-4 border-b border-slate-100 bg-gradient-to-r from-orange-50/50 via-white to-amber-50/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-100 text-[#D6451B]">
                    <FaBullhorn className="text-xs" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 leading-tight">
                      Announcements
                    </h3>
                    <p className="text-[10px] text-slate-500">
                      Batch & class updates
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {unreadCount > 0 && (
                    <button
                      type="button"
                      onClick={() => markAllReadMutation.mutate()}
                      disabled={markAllReadMutation.isPending}
                      className="flex items-center gap-1 text-[11px] font-bold text-[#D6451B] hover:text-orange-700 transition px-2 py-1 rounded-lg hover:bg-orange-50"
                      title="Mark all as read"
                    >
                      <FaCheckDouble className="text-[10px]" />
                      <span>Mark all read</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 sm:hidden"
                  >
                    <FaTimes className="text-xs" />
                  </button>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="mt-3 flex items-center gap-1.5 p-1 rounded-xl bg-slate-100/90 text-[11px] font-bold">
                <button
                  type="button"
                  onClick={() => setActiveFilter("all")}
                  className={`flex-1 py-1 rounded-lg transition-all ${
                    activeFilter === "all"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  All ({notifications.length})
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter("unread")}
                  className={`flex-1 py-1 rounded-lg transition-all ${
                    activeFilter === "unread"
                      ? "bg-white text-slate-900 shadow-2xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Unread ({unreadCount})
                </button>
              </div>
            </div>

            {/* Notifications Scroll List */}
            <div className="max-h-[360px] overflow-y-auto divide-y divide-slate-100 overscroll-contain">
              {isLoading ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  Checking for new announcements...
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 mx-auto">
                    <FaBell className="text-base" />
                  </div>
                  <h4 className="font-bold text-xs text-slate-700">
                    No Announcements
                  </h4>
                  <p className="text-[11px] text-slate-400 max-w-[200px] mx-auto">
                    {activeFilter === "unread"
                      ? "You have caught up with all batch announcements."
                      : "No announcements have been published for your batches yet."}
                  </p>
                </div>
              ) : (
                filteredNotifications.map((item) => {
                  const isUrgent = item.priority === "urgent" || item.priority === "high";

                  return (
                    <div
                      key={item._id}
                      onClick={() => handleNotificationClick(item)}
                      className={`p-3.5 sm:p-4 text-left transition-colors cursor-pointer group flex items-start gap-3 ${
                        !item.isRead
                          ? "bg-orange-50/40 hover:bg-orange-50/80"
                          : "hover:bg-slate-50"
                      }`}
                    >
                      {/* Priority Icon indicator */}
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                          isUrgent
                            ? "bg-rose-100 text-rose-600 border border-rose-200"
                            : item.batch
                            ? "bg-blue-100 text-blue-600 border border-blue-200"
                            : "bg-orange-100 text-[#D6451B] border border-orange-200"
                        }`}
                      >
                        {isUrgent ? (
                          <FaExclamationCircle />
                        ) : (
                          <FaBullhorn />
                        )}
                      </div>

                      {/* Content */}
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {item.batch?.name ? (
                              <span className="rounded-md bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-200/60 truncate max-w-[140px]">
                                {item.batch.name}
                              </span>
                            ) : item.course?.title ? (
                              <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200/60 truncate max-w-[140px]">
                                {item.course.title}
                              </span>
                            ) : (
                              <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-600">
                                Academy Update
                              </span>
                            )}

                            {isUrgent && (
                              <span className="rounded-md bg-rose-50 px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider text-rose-700 border border-rose-200">
                                {item.priority}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[10px] font-medium text-slate-400">
                              {formatRelativeTime(item.createdAt)}
                            </span>
                            {!item.isRead && (
                              <span className="h-2 w-2 rounded-full bg-[#D6451B] shrink-0" />
                            )}
                          </div>
                        </div>

                        <h4 className="font-extrabold text-xs text-slate-900 group-hover:text-[#D6451B] transition-colors line-clamp-1">
                          {item.title}
                        </h4>

                        <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                          {item.message}
                        </p>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-slate-400 font-medium">
                            {item.createdBy?.fullName ? `By ${item.createdBy.fullName}` : ""}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => handleOpenPreview(e, item)}
                            className="text-[10px] font-bold text-[#D6451B] hover:underline flex items-center gap-1"
                          >
                            <span>Read</span>
                            <FaExternalLinkAlt className="text-[8px]" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Popover Footer */}
            {notifications.length > 0 && (
              <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
                <p className="text-[10px] font-semibold text-slate-500">
                  Tap any announcement to navigate directly to its batch
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Announcement Detail Modal */}
      <AnimatePresence>
        {selectedAnnouncement && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-3 sm:p-4 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl space-y-4"
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-[#D6451B]">
                    <FaBullhorn className="text-base" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900 leading-snug">
                      {selectedAnnouncement.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <FaCalendarAlt className="text-[10px]" />
                      <span>{new Date(selectedAnnouncement.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedAnnouncement(null)}
                  className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Badges Info */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {selectedAnnouncement.batch?.name && (
                  <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-700 border border-blue-200">
                    Batch: {selectedAnnouncement.batch.name}
                  </span>
                )}
                {selectedAnnouncement.course?.title && (
                  <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                    Course: {selectedAnnouncement.course.title}
                  </span>
                )}
                {selectedAnnouncement.priority && (
                  <span className="rounded-lg bg-orange-50 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-[#D6451B] border border-orange-200">
                    {selectedAnnouncement.priority} priority
                  </span>
                )}
              </div>

              {/* Message Body */}
              <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 text-xs sm:text-sm text-slate-700 leading-relaxed max-h-60 overflow-y-auto whitespace-pre-wrap">
                {selectedAnnouncement.message}
              </div>

              {/* Actions Footer */}
              <div className="flex items-center gap-2.5 pt-2">
                {selectedAnnouncement.link && (
                  <button
                    type="button"
                    onClick={() => {
                      const link = selectedAnnouncement.link;
                      setSelectedAnnouncement(null);
                      setIsOpen(false);
                      router.push(link);
                    }}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-[#D6451B] py-2.5 text-xs sm:text-sm font-bold text-white hover:bg-orange-600 transition shadow-xs"
                  >
                    <span>Go to Batch Announcement</span>
                    <FaExternalLinkAlt className="text-xs" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedAnnouncement(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
