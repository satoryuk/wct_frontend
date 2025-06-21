import React from "react";
import { Edit, XCircle, CheckCircle } from "lucide-react";

const OrderTable = ({
  orders = [],
  orderItems = [],
  onEdit,
  onToggleStatus,
  currentPage = 1,
  itemsPerPage = 10,
  totalItems = 0,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (!Array.isArray(orders)) {
    return (
      <div className="text-center py-10 text-gray-500">
        Orders data is not available
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No orders to display
      </div>
    );
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Function to count items in an order
  const countItemsInOrder = (orderId) => {
    return orderItems.filter((item) => item.order_id === orderId).length;
  };

  // Function to get total quantity in an order
  const getTotalQuantity = (orderId) => {
    return orderItems
      .filter((item) => item.order_id === orderId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  return (
    <>
      <div className="overflow-x-auto mt-4 rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Items
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Quantity
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Date
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {orders.map((order) => {
              const isActive = order.order_status === "completed"; // Adjust based on your status values

              return (
                <tr
                  key={order.order_id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 text-gray-900">#{order.order_id}</td>
                  <td className="py-4 px-6 text-blue-600">
                    ${order.total_amount?.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {countItemsInOrder(order.order_id)}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {getTotalQuantity(order.order_id)}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {new Date(order.order_date).toLocaleString()}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        order.order_status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : order.order_status === "completed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.order_status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(order)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit order"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleStatus(order.order_id)}
                        className={`p-2 rounded-lg transition-colors hover:bg-opacity-20 ${
                          isActive
                            ? "text-red-600 hover:bg-red-100"
                            : "text-green-600 hover:bg-green-100"
                        }`}
                        title={isActive ? "Cancel" : "Complete"}
                      >
                        {isActive ? (
                          <XCircle className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-md disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default OrderTable;
