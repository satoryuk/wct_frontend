import React from "react";
import DashboardGraph from "./components/DashboardGraph";
import TotalCard from "./components/TotalCard";
import TopProductTable from "./components/TopProductTable";
const DashboardPage = () => {
  return (
    <section>
      <h2 className="text-2xl text-gray-600 text-left font-bold py-4">
        Dashboard Overview
      </h2>
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
        <TotalCard />
      </div>
      <DashboardGraph />
      <TopProductTable />
    </section>
  );
};

export default DashboardPage;
