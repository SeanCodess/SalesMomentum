import { useState } from "react";
import Sidebar from "./Sidebar";
import { cx } from "../utils/cx";
import { Dashboard } from "./Dashboard";

const renderContent = (active: string) => {
  switch (active) {
    case "dashboard":
      return <Dashboard />;
    case "reports":
      return <div>Reports Content</div>;
    case "all":
      return <div>All Businesses Content</div>;
    default:
      return <div>Welcome! Please select a section from the sidebar.</div>;
  }
};

export default function AppShell() {
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
      <main
        className={cx(
          "transition-all duration-300 ease-in-out p-6",
          collapsed ? "pl-24" : "pl-64"
        )}
      >
        {renderContent(active)}
      </main>
    </div>
  );
}
