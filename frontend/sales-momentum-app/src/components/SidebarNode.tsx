import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cx } from "../utils/cx";
import type { MenuNode } from "../types";

export default function SidebarNode({
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
