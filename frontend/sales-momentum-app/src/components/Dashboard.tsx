import { ChevronDown, User } from "lucide-react";
import DashboardCard from "./DashboardCard";
import { useState } from "react";
import Dropdown from "./Dropdown";

const BusinessInfoCard = () => (
  <DashboardCard className="col-span-3">
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">Business Name</h2>
      <p className="text-sm text-gray-400">Date Started this Year – Date Now</p>
    </div>
  </DashboardCard>
);
const averageData = {
  Daily: [
    { label: "Daily Average This Week", value: "1,590.00" },
    { label: "Daily Average This Month", value: "1,585.75" },
    { label: "Daily Average This Year", value: "1,572.30" },
  ],
  Weekly: [
    { label: "Weekly Average This Month", value: "11,130.00" },
    { label: "Weekly Average This Year", value: "11,005.00" },
    { label: "Weekly Average All Time", value: "10,850.00" },
  ],
  Monthly: [
    { label: "Monthly Average This Year", value: "47,700.00" },
    { label: "Monthly Average All Time", value: "46,900.00" },
  ],
  Yearly: [{ label: "Yearly Average", value: "580,350.00" }],
};

const peakPerformanceData = {
  "This Year": {
    month: { label: "March", value: "84,750.00" },
    week: { label: "July 14-20", value: "18,420.00" },
    day: { label: "July 14", value: "2,940.00" },
  },
  "This Month": {
    week: { label: "September 8-14", value: "16,380.00" },
    day: { label: "September 12", value: "2,765.00" },
    month: "September",
  },
  "This Week": {
    day: { label: "September 17", value: "2,340.00" },
    week: "September 15 - 21",
  },
};

const AVERAGE_OPTIONS = ["Daily", "Weekly", "Monthly", "Yearly"] as const;
type AverageType = (typeof AVERAGE_OPTIONS)[number];

const PEAK_PERFORMANCE_OPTIONS = [
  "This Year",
  "This Month",
  "This Week",
] as const;
type PeakPerformancePeriod = (typeof PEAK_PERFORMANCE_OPTIONS)[number];

const UserProfileCard = () => (
  <DashboardCard className="col-span-2">
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <User className="w-6 h-6" />
        <span className="font-semibold">Username</span>
      </div>
      <ChevronDown className="w-5 h-5" />
    </div>
  </DashboardCard>
);

const AverageIncomeCard = () => {
  const [selectedAverage, setSelectedAverage] = useState<AverageType>("Daily");

  return (
    <DashboardCard className="col-span-2 flex-col items-start gap-4">
      <Dropdown
        options={AVERAGE_OPTIONS}
        selectedValue={selectedAverage}
        onSelect={(option) => setSelectedAverage(option as AverageType)}
        label="Average"
      />

      <div className="flex flex-col w-full gap-3 mt-2">
        {averageData[selectedAverage].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between w-full"
          >
            <p className="text-sm text-gray-300">{item.label}</p>
            <p className="font-bold text-lg">₱ {item.value}</p>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

const PeakPerformanceCard = () => {
  const [period, setPeriod] = useState<PeakPerformancePeriod>("This Year");
  const data = peakPerformanceData[period];

  return (
    <DashboardCard className="col-span-2 row-span-2 flex-col items-start gap-4">
      <h3 className="text-xl font-bold">Peak Performance</h3>
      <Dropdown
        options={PEAK_PERFORMANCE_OPTIONS}
        selectedValue={period}
        onSelect={(option) => setPeriod(option as PeakPerformancePeriod)}
        label="Period"
      />

      {period === "This Year" && (
        <>
          <div className="w-full border-b border-gray-600 my-2" />
          <div className="flex flex-col w-full gap-2">
            <p>Month with Most Sales</p>
            <p className="font-bold text-lg">
              {data.month?.label} (₱{data.month?.value})
            </p>
          </div>
          <div className="w-full border-b border-gray-600 my-2" />
          <div className="flex flex-col w-full gap-2">
            <p>Week with Most Sales</p>
            <p className="font-bold text-lg">
              {data.week?.label} (₱{data.week?.value})
            </p>
          </div>
        </>
      )}

      {period === "This Month" && (
        <>
          <div className="w-full border-b border-gray-600 my-2" />
          <div className="flex flex-col w-full gap-2">
            <p>Week with Most Sales</p>
            <p className="font-bold text-lg">
              {data.week?.label} (₱{data.week?.value})
            </p>
          </div>
        </>
      )}

      <div className="w-full border-b border-gray-600 my-2" />
      <div className="flex flex-col w-full gap-2">
        <p>Day with Most Sales</p>
        <p className="font-bold text-lg">
          {data.day?.label} (₱{data.day?.value})
        </p>
      </div>

      {period === "This Month" && (
        <div className="flex items-center justify-between w-full mt-auto">
          <p className="text-sm">Month: {data.month}</p>
          <button className="text-sm font-semibold text-violet-400 hover:text-violet-300">
            Change Month
          </button>
        </div>
      )}

      {period === "This Week" && (
        <div className="flex items-center justify-between w-full mt-auto">
          <p className="text-sm">Date: {data.week}</p>
          <button className="text-sm font-semibold text-violet-400 hover:text-violet-300">
            Change Week
          </button>
        </div>
      )}
    </DashboardCard>
  );
};

const SalesChartCard = () => (
  <DashboardCard className="lg:col-span-2 lg:row-span-2 col-span-full">
    <div className="w-full h-full bg-white rounded-lg p-4">
      {/* Placeholder for the chart image/component */}
      <div className="w-full h-full bg-gray-300 rounded flex items-center justify-center min-h-[200px]">
        <p className="text-gray-500">Sales Trajectory Chart</p>
      </div>
    </div>
  </DashboardCard>
);

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <BusinessInfoCard />
      <UserProfileCard />
      <div className="lg:col-span-3 flex flex-col gap-6 col-span-full">
        <AverageIncomeCard />
        <SalesChartCard />
      </div>
      <PeakPerformanceCard />
    </div>
  );
};
