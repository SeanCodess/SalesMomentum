import { LayoutDashboard, BarChart2, Building2 } from "lucide-react";
import type { MenuNode } from "../types";

export const MENU: MenuNode[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  { id: "ledger", label: "Ledger", icon: BarChart2 },
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
