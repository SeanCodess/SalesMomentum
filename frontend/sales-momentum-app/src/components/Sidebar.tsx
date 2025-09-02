import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, Menu as MenuIcon, Globe } from "lucide-react";
import { MENU } from "../data/menu";
import SidebarNode from "./SidebarNode";
import { cx } from "../utils/cx";

export default function Sidebar({
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
        collapsed ? "w-[76px]" : "w-[260px]"
      )}
      aria-label="Sidebar"
    >
      {/* Header / Brand */}
      <div className="flex items-center gap-2 px-3 py-4">
        <div className="grid h-8 w-8 place-items-center rounded-xl bg-violet-600/20 ring-1 ring-violet-500/40">
          <Globe className="h-5 w-5" />
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
