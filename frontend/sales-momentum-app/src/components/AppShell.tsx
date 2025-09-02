import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardCard from "./DashboardCard";

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
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-2 text-2xl font-semibold tracking-tight">
            Sales Momentum Dashboard
          </h1>
          <p className="mb-6 text-neutral-300">This is the content area."</p>
          <DashboardCard title="Pipeline" value="$1.2M" />
          <DashboardCard title="New Leads" value="128" />
          <DashboardCard title="Win Rate" value="31%" />
        </div>
      </main>
    </div>
  );
}
