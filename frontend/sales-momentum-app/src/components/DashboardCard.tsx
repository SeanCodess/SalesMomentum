export default function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="mb-4 rounded-2xl bg-neutral-800 p-6 shadow-lg ring-1 ring-neutral-700">
      <div className="text-sm text-neutral-400">{title}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}
