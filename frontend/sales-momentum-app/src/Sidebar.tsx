import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  BarChart2,
  Building2,
  Menu as MenuIcon,
  ChevronLeft,
  Globe,
} from "lucide-react";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type MenuNode = {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  to?: string;
  children?: MenuNode[];
};

const MENU: MenuNode[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  { id: "reports", label: "Reports", icon: BarChart2 },
  {
    id: "businesses",
    label: "Businesses",
    icon: Building2,
    children: [
      { id: "all", label: "View All Businesses" },
      { id: "biz1", label: "Business 1" },
      { id: "biz2", label: "Businesses 2" },
      { id: "biz3", label: "Businesses 3" },
    ],
  },
];
