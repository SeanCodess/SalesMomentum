import React from "react";
import { cx } from "../utils/cx";

export default function DashboardCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cx(
        "rounded-2xl bg-neutral-800 p-6 shadow-lg ring-1 ring-neutral-700 flex",
        className
      )}
    >
      {children}
    </div>
  );
}
