import { ChevronDown, User } from "lucide-react";
import DashboardCard from "./DashboardCard";

const BusinesssInfoCard = () => (
  <DashboardCard className="col-span-3">
    <div className="flex flex-col">
      <h2 className="text-2xl font-bold">Business Name</h2>
      <p className="text-sm text-gray-400">Date Started this Year – Date Now</p>
    </div>
  </DashboardCard>
);

const UserProfileCard = () => (
  <DashboardCard className="col-span-2">
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <User className="h-6 w-6" />
        <span className="font-semibold">Username</span>
      </div>
      <ChevronDown className="h-5 w-5" />
    </div>
  </DashboardCard>
);

const AverageIncomeCard = () => (
  <DashboardCard className="col-span-2 flex-col items-start gap-4">
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <ChevronDown />
        <h3 className="font-semibold">Daily Average Income</h3>
      </div>
      <p className="text-xl font-bold">₱ 1,586.50</p>
    </div>
    <div className="flex items-center gap-2 ml-2">
      <ChevronDown />
      <h3 className="font-semibold">This Week</h3>
    </div>
  </DashboardCard>
);

const PeakPerformanceCard = () => (
  <DashboardCard className="col-span-3 flex-col items-start gap-4">
    <h3 className="text-xl font-bold">Peak Sales Performamce</h3>
    <div className="flex items-center justify-between w-full bg-gray-800/50 p-2 rounded-lg">
      <div className="flex items-center gap-2">
        <ChevronDown />
        <span className="font-semibold">Year</span>
      </div>
      <span className="text-2xl font-bold">2024</span>
    </div>
    <div className="w-full border-b border-gray-600"></div>
    <div className="flex flex-col w-full gap-2">
      <p>Month with Most Sales</p>
      <p className="font-bold text-lg">March (₱42,345.00)</p>
    </div>
    <div className="w-full border-b border-gray-600"></div>
    <div className="flex flex-col w-full gap-2">
      <p>Day with Most Sales</p>
      <p className="font-bold text-lg">July 14 (₱3,345.00)</p>
    </div>
    <button className="w-full p-2 mt-2 text-center bg-gray-900 font-semibold rounded-lg">
      View Best Sales Day per Month
    </button>
  </DashboardCard>
);

const SalesChartCard = () => (
  <DashboardCard className="col-span-2 row-span-2">
    <div className="w-full h-full bg-white rounded-lg p-4">
      {/* Placeholder for the chart image/component */}
      <div className="w-full h-full bg-gray-300 rounded flex items-center justify-center">
        <p className="text-gray-500">Sales Trajectory Chart</p>
      </div>
    </div>
  </DashboardCard>
);

export const Dashboard = () => {
  return (
    <div className="grid grid-cols-5 grid-rows-3 gap-6 h-full">
      <BusinesssInfoCard />
      <UserProfileCard />
      <AverageIncomeCard />
      <PeakPerformanceCard />
      <SalesChartCard />
    </div>
  );
};
