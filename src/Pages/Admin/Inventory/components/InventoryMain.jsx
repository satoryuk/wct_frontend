import React, { useState } from "react";
import { Filter, Download, Search } from "lucide-react"; // Added missing icons
import { toast } from "react-toastify";
import { useGetInventoryQuery } from "../../../../redux/hooks/inventoryApiSlice";
import { useNavigate } from "react-router-dom";
import InventoryTable from "./InventoryTable";
import InventoryCard from "./InventoryCard";

const InventoryMain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const {
    data: inventoryData,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetInventoryQuery({
    page: currentPage,
    per_page: itemsPerPage,
    search: searchTerm,
  });

  console.log("inventory", inventoryData);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const exportToCSV = () => {
    if (!inventoryData?.data?.length) {
      toast.warning("No products available to export");
      return;
    }

    const headers = [
      "ID",
      "Name",
      "Price",
      "Quantity",
      "Category",
      "Expiry Date",
      "Status",
    ];
    const csvRows = inventoryData.data.map((product) => [
      // Fixed variable name from productsData to inventoryData
      product.product_id,
      `"${product.product_name?.replace(/"/g, '""')}"`,
      product.price ? `$${product.price.toFixed(2)}` : "",
      product.stock_qty || 0,
      product.category_id,
      product.expiry_date
        ? new Date(product.expiry_date).toLocaleDateString()
        : "N/A",
      product.status ? "Active" : "Inactive",
    ]);

    const csvContent = [
      headers.join(","),
      ...csvRows.map((row) => row.join(",")),
    ].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `products_export_${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Error loading products: {error?.data?.message || error.message}
      </div>
    );
  }

  return (
    <section className="w-full mb-4 mt-6 px-4 rounded-xl">
      <InventoryCard products={inventoryData?.data} isLoading={isLoading} />
      <div className="w-full mb-4 mt-4 bg-white px-6 py-4 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-2xl text-left text-gray-600 font-bold mb-2">
              Inventory Management
            </h1>
            <p className="text-gray-600">
              Manage your product inventory with ease and efficiency.
            </p>
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
              placeholder="Search products by name..."
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
            Loading products...
          </div>
        ) : (
          <InventoryTable
            // products={inventoryData?.data} // Fixed variable name from filteredinventory to inventoryData.data
            currentPage={currentPage}
            inventoryData={inventoryData?.data}
            itemsPerPage={itemsPerPage}
            totalItems={inventoryData.meta?.total || 0}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default InventoryMain;
