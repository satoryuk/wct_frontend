import React, { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as LineTooltip,
  Legend as LineLegend,
  ResponsiveContainer as LineContainer,
} from "recharts";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer as PieContainer,
  Legend as PieLegend,
  Tooltip as PieTooltip,
} from "recharts";
import { LineChartData, calculatePieChartData } from "./FakeData";

// Colors for both charts to maintain consistency
const COLORS = [
  "#4BC0C0", // teal
  "#9966FF", // purple
  "#FF9F40", // orange
  "#40FF5D", // green
];

// Pie chart label configuration
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const ChartDashboard = () => {
  // Shared state for date filters
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Get today's date in YYYY-MM-DD format for max date attribute
  const today = new Date().toISOString().split("T")[0];

  // Filter line chart data based on selected date range
  const filteredLineData = useMemo(() => {
    if (!startDate && !endDate) return LineChartData;

    return LineChartData.filter((item) => {
      const itemDate = new Date(item.date);

      // If only start date is provided
      if (startDate && !endDate) {
        return itemDate >= new Date(startDate);
      }

      // If only end date is provided
      if (!startDate && endDate) {
        return itemDate <= new Date(endDate);
      }

      // If both dates are provided
      return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });
  }, [startDate, endDate]);

  // Generate pie chart data directly from filtered line chart data
  const calculatedPieData = useMemo(() => {
    return calculatePieChartData(filteredLineData);
  }, [filteredLineData]);

  // Handle filter reset
  const handleReset = () => {
    setStartDate("");
    setEndDate("");
  };

  return (
    <div className="w-full">
      {/* Shared date filter controls */}
      <div className="bg-white shadow-md rounded-lg p-5 mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Filter Dashboard Data
        </h3>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center">
            <label
              htmlFor="startDate"
              className="mr-2 text-sm font-medium text-gray-600"
            >
              From:
            </label>
            <input
              id="startDate"
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={endDate || today}
            />
          </div>

          <div className="flex items-center">
            <label
              htmlFor="endDate"
              className="mr-2 text-sm font-medium text-gray-600"
            >
              To:
            </label>
            <input
              id="endDate"
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              max={today}
            />
          </div>

          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all ml-auto"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Charts container */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Line Chart */}
        <div className="w-full lg:w-2/3 bg-white shadow-md rounded-lg p-5 transition-all hover:shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Sales Performance Metrics
            </h3>
            <div className="text-sm text-gray-500">
              {filteredLineData.length} data points
            </div>
          </div>

          {filteredLineData.length > 0 ? (
            <LineContainer width="100%" height={350}>
              <LineChart
                data={filteredLineData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  stroke="#9CA3AF"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 90]}
                  stroke="#9CA3AF"
                />
                <LineTooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <LineLegend verticalAlign="top" height={36} iconType="circle" />
                <Line
                  type="monotone"
                  dataKey="Products Sold"
                  stroke={COLORS[0]}
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="Customers Amount"
                  stroke={COLORS[1]}
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="Orders Amount"
                  stroke={COLORS[2]}
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="Monthly Revenue"
                  stroke={COLORS[3]}
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              </LineChart>
            </LineContainer>
          ) : (
            <div className="flex flex-col justify-center items-center h-64 text-gray-500 bg-gray-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p className="text-center">
                No data available for the selected date range
              </p>
              <button
                onClick={handleReset}
                className="mt-3 px-4 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Pie Chart */}
        <div className="w-full lg:w-1/3 bg-white shadow-md rounded-lg p-5 transition-all hover:shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Sales Distribution
            </h3>
            <div className="text-sm text-gray-500">
              {calculatedPieData.length} categories
            </div>
          </div>

          {calculatedPieData.length > 0 ? (
            <PieContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={calculatedPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  innerRadius={60}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {calculatedPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke="#FFFFFF"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <PieTooltip
                  formatter={(value) => `${value}`}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "8px",
                    border: "1px solid #E5E7EB",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <PieLegend
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                  iconType="circle"
                />
              </PieChart>
            </PieContainer>
          ) : (
            <div className="flex flex-col justify-center items-center h-64 text-gray-500 bg-gray-50 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mb-2 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                />
              </svg>
              <p className="text-center">
                No data available for the selected date range
              </p>
              <button
                onClick={handleReset}
                className="mt-3 px-4 py-1.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartDashboard;
