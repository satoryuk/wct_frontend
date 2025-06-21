import React, { useState } from "react";
import { Search, Filter, Download } from "lucide-react";
import { toast } from "react-toastify";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../../../redux/hooks/orderApiSlice";
import { useNavigate } from "react-router-dom";
import OrderTable from "./OrderTable";

const OrderMain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const {
    data: ordersData = { data: [], meta: { total: 0 } },
    isLoading,
    isError,
    error,
    refetch,
  } = useGetOrdersQuery({
    page: currentPage,
    per_page: itemsPerPage,
    search: searchTerm,
  });

  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  const handleEdit = (order) => {
    console.log("Editing order:", order.order_id);
    navigate(`edit/${order.order_id}`);
  };

  const handleToggleStatus = async (orderId, currentStatus) => {
    try {
      const newStatus = currentStatus === "pending" ? "completed" : "pending";
      await updateOrderStatus({
        id: orderId,
        status: newStatus,
      }).unwrap();

      toast.success(`Order status updated to ${newStatus} successfully!`);
      refetch();
    } catch (err) {
      toast.error(err.data?.message || "Failed to update order status");
      console.error("Failed to toggle order status:", err);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const exportToCSV = () => {
    if (!ordersData?.data?.length) {
      toast.warning("No orders available to export");
      return;
    }

    const headers = [
      "Order ID",
      "Customer ID",
      "Total Amount",
      "Order Date",
      "Status",
    ];
    const csvRows = ordersData.data.map((order) => [
      order.order_id,
      order.customer_id,
      `$${order.total_amount?.toFixed(2)}`,
      new Date(order.order_date).toLocaleString(),
      order.order_status,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvRows.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orders_export_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Error loading orders: {error?.data?.message || error.message}
      </div>
    );
  }

  return (
    <section className="w-full mb-4 mt-6 px-4 rounded-xl">
      <div className="w-full mb-4 mt-4 bg-white px-6 py-4 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-2xl text-left text-gray-600 font-bold mb-2">
              Order Management
            </h1>
            <p className="text-gray-600">View and manage customer orders.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders by ID or customer..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-20 text-gray-500">
            Loading orders...
          </div>
        ) : (
          <OrderTable
            orders={ordersData.data}
            onEdit={handleEdit}
            onToggleStatus={(orderId) => {
              const order = ordersData.data.find((o) => o.order_id === orderId);
              handleToggleStatus(orderId, order.order_status);
            }}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={ordersData.meta?.total || 0}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default OrderMain;
