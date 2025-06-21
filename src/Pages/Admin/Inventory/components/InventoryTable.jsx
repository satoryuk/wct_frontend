import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const InventoryTable = ({ inventoryData, onPageChange, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading inventory data...
      </div>
    );
  }
  console.log("Inventory", inventoryData);

  if (!Array.isArray(inventoryData)) {
    return (
      <div className="text-center py-10 text-gray-500">
        Inventory data is not available
      </div>
    );
  }

  if (inventoryData.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No inventory items to display
      </div>
    );
  }

  const formatStatus = (status) => {
    return status === 1 ? "Active" : "Inactive";
  };

  return (
    <>
      <div className="overflow-x-auto mt-4 rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Qty
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {inventoryData.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {product.stock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.status === 1 || product.status === true
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {formatStatus(product.status)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      product.stockStatus === "in stock"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stockStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default InventoryTable;
