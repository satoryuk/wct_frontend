import React from "react";
import OrderTable from "./components/OrderTable";

const OrdersPage = () => {
  return (
    <section>
      <h2 className="text-2xl text-gray-600 text-left font-bold py-4">
        Order History
      </h2>
      {/* Top Products */}
      <OrderTable />
    </section>
  );
};

export default OrdersPage;
