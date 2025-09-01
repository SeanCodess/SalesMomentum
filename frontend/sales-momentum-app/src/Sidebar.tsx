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

export default function App() {
  return (
    <div className="min-h-screen w-full bg-neutral-900 text-neutral-100">
      <AppShell />
    </div>
  );
}

function AppShell() {
  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState<string>("dashboard");
  const [open, setOpen] = useState<Record<string, boolean>>({
    businesses: true,
  });

  const handleToggle = (id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        active={active}
        setActive={setActive}
        open={open}
        onToggleOpen={handleToggle}
      />

      {/* Content Area */}
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">
            Sales Momentum Dashboard
          </h1>
          <p className="mb-6 text-neutral-300">This is the content area.</p>"
          <DashboardCard title="Pipeline" value="$1.2M" />
          <DashboardCard title="New Leads" value="128" />
          <DashboardCard title="Win Rate" value="31%" />
        </div>
      </main>
    </div>
  );
}

function DashboardCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="mb-4 rounded-2xl bg-neutral-800 p-6 shadow-lg ring-1 ring-neutral-700">
      <div className="text-sm text-neutral-400">{title}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}

function Sidebar({
  collapsed,
  onToggleCollapse,
  active,
  setActive,
  open,
  onToggleOpen,
}: {
  collapsed: boolean;
  onToggleCollapse: () => void;
  active: string;
  setActive: (id: string) => void;
  open: Record<string, boolean>;
  onToggleOpen: (id: string) => void;
}) {
  return (
    <aside
      className={cx(
        "sticky top-0 h-screen border-r border-neutral-800 bg-neutral-900/60 backdrop-blur",
        collapsed ? "w-[76px]" : "w-[-260px]"
      )}
      aria-label="Sidebar"
    >
      {/* Header / Brand */}
      <div className="flex items-center gap-2 px-3 py-4">
        <div className="grid h-8 w-8 place-items-center rounded-xl bg-violet-600/20 ring-1 ring-violet-500/40">
          <Globe className="h-5 w-5:" />
        </div>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="text-sm font-semibold tracking-wide"
            >
              Sales Momentum
            </motion.span>
          )}
        </AnimatePresence>
        <button
          onClick={onToggleCollapse}
          className="ml-auto grid h-8 w-8 place-items-center rounded-xl hover:bg-neutral-800 hover:text-white"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <MenuIcon className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-2" role="tree" aria-label="Primary">
        {MENU.map((node) => (
          <SidebarNode
            key={node.id}
            node={node}
            depth={0}
            collapsed={collapsed}
            active={active}
            setActive={setActive}
            open={open}
            onToggleOpen={onToggleOpen}
          />
        ))}
      </nav>

      {/* Footer / Version, etc. */}
      <div className="absolute bottom-0 left-0 right-0 p-3 text-xs text-neutral-500">
        <div className="rounded-xl bg-neutral-800/60 px-3 py-2 ring-1 ring-neutral-700">
          v1.0 Demo
        </div>
      </div>
    </aside>
  );
}

function SidebarNode({
  node,
  depth,
  collapsed,
  active,
  setActive,
  open,
  onToggleOpen,
}: {
  node: MenuNode;
  depth: number;
  collapsed: boolean;
  active: string;
  setActive: (id: string) => void;
  open: Record<string, boolean>;
  onToggleOpen: (id: string) => void;
}) {
  const Icon = node.icon ?? (() => null);
  const isActive = active === node.id;
  const hasChildren = !!node.children?.length;
  const isOpen = open[node.id];

  const leftPad = useMemo(() => 6 + depth * 2, [depth]);

  const baseBtn =
    "group relative flex w-full items center gap-3 rounded-xl px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60";

  if (!hasChildren) {
    return (
      <button
        role="treeitem"
        aria-selected={isActive}
        onClick={() => setActive(node.id)}
        className={cx(
          baseBtn,
          `pl-${leftPad}`,
          isActive
            ? "bg-neutral-100 text-neutral-900 shadow-inner"
            : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
        )}
      >
        <Icon className="h-4 w-4" />
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {node.label}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    );
  }

  return (
    <div role="group" aria-label={node.label} className="mb-1">
      <button
        role="treeitem"
        aria-expanded={isOpen}
        onClick={() => onToggleOpen(node.id)}
        className={cx(
          baseBtn,
          `pl-${leftPad}`,
          "text-neutral-300 hover:bg-neutral-800 hover:text-white"
        )}
      >
        {isOpen ? (
          <ChevronDown className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
        <Icon className="h-4 w-4" />
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {node.label}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.ul
            role="group"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={cx(collapsed ? "hidden" : "block")}
          >
            {node.children?.map((child) => (
              <li key={child.id} className="mt-1">
                <button
                  role="treeitem"
                  onClick={() => setActive(child.id)}
                  className={cx(
                    baseBtn,
                    `pl-${leftPad + 4}`,
                    active === child.id
                      ? "bg-neutral-100 text-neutral-900"
                      : "text-neutral-300 hover:bg-neutral-800 hover:text-white"
                  )}
                >
                  <span className="ml-6 inline-block h-2 w-2 rounded-full bg-current" />
                  <span>{child.label}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
