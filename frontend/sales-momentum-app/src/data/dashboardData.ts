export const averageData = {
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

export const peakPerformanceData = {
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

export const AVERAGE_OPTIONS = ["Daily", "Weekly", "Monthly", "Yearly"] as const;
export type AverageType = (typeof AVERAGE_OPTIONS)[number];

export const PEAK_PERFORMANCE_OPTIONS = [
  "This Year",
  "This Month",
  "This Week",
] as const;
export type PeakPerformancePeriod = (typeof PEAK_PERFORMANCE_OPTIONS)[number];