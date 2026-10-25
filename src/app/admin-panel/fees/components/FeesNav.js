"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaChartPie,
  FaCashRegister,
  FaClock,
  FaHistory,
  FaFileInvoiceDollar,
  FaFileAlt,
  FaWhatsapp,
} from "react-icons/fa";

export default function FeesNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/admin-panel/fees/dashboard",
      aliases: ["/admin-panel/fees"],
      icon: FaChartPie,
    },
    {
      name: "Collect Fee",
      href: "/admin-panel/fees/collect",
      aliases: ["/admin-panel/fees/fee-collection"],
      icon: FaCashRegister,
    },
    {
      name: "Pending Dues",
      href: "/admin-panel/fees/pending",
      aliases: ["/admin-panel/fees/pending-fees"],
      icon: FaClock,
    },
    {
      name: "WhatsApp Reminders",
      href: "/admin-panel/fees/reminders",
      aliases: [],
      icon: FaWhatsapp,
    },
    {
      name: "Transactions",
      href: "/admin-panel/fees/transactions",
      aliases: ["/admin-panel/fees/history", "/admin-panel/fees/transections"],
      icon: FaHistory,
    },
    {
      name: "Fee Plans",
      href: "/admin-panel/fees/fee-plans",
      aliases: [],
      icon: FaFileInvoiceDollar,
    },
    {
      name: "Reports",
      href: "/admin-panel/fees/reports",
      aliases: [],
      icon: FaFileAlt,
    },
  ];

  const isActive = (item) => {
    if (pathname === item.href) return true;
    if (item.href === "/admin-panel/fees/dashboard") {
      return pathname === "/admin-panel/fees/dashboard" || pathname === "/admin-panel/fees";
    }
    if (item.aliases?.some((alias) => pathname === alias || pathname?.startsWith(alias + "/"))) return true;
    if (pathname?.startsWith(item.href + "/")) return true;
    return false;
  };

  return (
    <div className="w-full min-w-0 bg-white border border-slate-200 rounded-2xl p-1.5 shadow-xs mb-4 sm:mb-6 overflow-x-auto scrollbar-none">
      <div className="flex items-center gap-1 min-w-max">
        {navItems.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shrink-0 ${
                active
                  ? "bg-gradient-to-r from-[#D6451B] to-orange-500 text-white shadow-xs"
                  : "text-slate-600 hover:text-[#D6451B] hover:bg-orange-50/70"
              }`}
            >
              <Icon className={`text-xs sm:text-sm ${active ? "text-white" : "text-slate-500"}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
