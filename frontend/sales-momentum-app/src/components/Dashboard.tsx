import { ChevronDown, User } from "lucide-react";
import DashboardCard from "./DashboardCard";
import { useState } from "react";
import Dropdown from "./Dropdown";
import {
  averageData,
  peakPerformanceData,
  AVERAGE_OPTIONS,
  PEAK_PERFORMANCE_OPTIONS,
  type AverageType,
  type PeakPerformancePeriod,
} from "../data/dashboardData";

const BusinessInfoCard = () => (
  <DashboardCard className="flex-[4] min-w-0">
    <div className="flex flex-col min-w-0 w-full">
      <h2 className="font-bold text-lg md:text-xl lg:text-2xl whitespace-nowrap overflow-hidden text-ellipsis">
        Business Name
      </h2>
      <p className="text-gray-400 text-xs md:text-[0.8rem] whitespace-nowrap overflow-hidden text-ellipsis">
        Date Started this Year – Date Now
      </p>
    </div>
  </DashboardCard>
);

const UserProfileCard = () => (
  <DashboardCard className="flex-[1] min-w-0 max-w-[160px] md:max-w-[240px] lg:max-w-[320px]">
    <div className="flex items-center justify-between w-full min-w-0">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <User className="w-6 h-6 flex-shrink-0" />
        <span className="font-semibold truncate text-sm md:text-base min-w-0">
          Username That Might Be Very Long
        </span>
      </div>
      <ChevronDown className="w-5 h-5 ml-2 flex-shrink-0" />
    </div>
  </DashboardCard>
);

const AverageIncomeCard = () => {
  const [selectedAverage, setSelectedAverage] = useState<AverageType>("Daily");

  return (
    // REMOVED min-w-[350px] from here
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
    // REMOVED min-w-[350px] from here
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
  <DashboardCard className="lg:col-span-2 lg:row-span-2 col-span-full min-w-[350px]">
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-row flex-nowrap justify-between items-center gap-6">
        <BusinessInfoCard />
        <UserProfileCard />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AverageIncomeCard />
            <SalesChartCard />
          </div>
        </div>
        <div className="lg:col-span-2">
          <PeakPerformanceCard />
        </div>
      </div>
    </div>
  );
};
