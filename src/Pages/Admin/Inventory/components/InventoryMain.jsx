import React, { useState } from "react";
import { Filter, Download, Search } from "lucide-react";
import { toast } from "react-toastify";
import { useGetInventoryQuery } from "../../../../redux/hooks/inventoryApiSlice";
import { useNavigate } from "react-router-dom";
import InventoryTable from "./InventoryTable";
import InventoryCard from "./InventoryCard";

const InventoryMain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [stockStatusFilter, setStockStatusFilter] = useState("all"); // 'all', 'in stock', 'out of stock'
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(Date.now()); // Track last update time
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
    stock_status: stockStatusFilter !== "all" ? stockStatusFilter : undefined,
    lastUpdated,
  });

  console.log("inventory", inventoryData);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleStockStatusFilter = (stockStatus) => {
    setStockStatusFilter(stockStatus);
    setCurrentPage(1);
    setShowFilterDropdown(false);
  };

  const exportToCSV = () => {
    if (!inventoryData?.data?.length) {
      toast.warning("No products available to export");
      return;
    }

    const headers = ["Product Name", "Stock", "Status"];
    const csvRows = inventoryData.data.map((product) => [
      `"${product.name?.replace(/"/g, '""')}"`,
      product.stock || 0,
      product.stockStatus,
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
            <div className="relative">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              >
                <Filter className="w-4 h-4" />
                Filter
                {stockStatusFilter !== "all" && (
                  <span className="ml-1 text-xs bg-blue-500 text-white rounded-full px-2 py-0.5">
                    {stockStatusFilter === "in stock"
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                )}
              </button>
              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <div className="py-1">
                    <button
                      onClick={() => handleStockStatusFilter("all")}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        stockStatusFilter === "all"
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      All Products
                    </button>
                    <button
                      onClick={() => handleStockStatusFilter("in stock")}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        stockStatusFilter === "in stock"
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      In Stock
                    </button>
                    <button
                      onClick={() => handleStockStatusFilter("out of stock")}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        stockStatusFilter === "out of stock"
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      Out of Stock
                    </button>
                  </div>
                </div>
              )}
            </div>
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
