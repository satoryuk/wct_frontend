import React, { useState } from "react";
import { Plus, Search, Filter, Download } from "lucide-react";
import { toast } from "react-toastify";
import {
  useGetProductsQuery,
  useDeactivateProductMutation,
} from "../../../../redux/hooks/productApiSlice";
import { useNavigate } from "react-router-dom";
import ProductTable from "./ProductTable";
import ProductCard from "./ProductCard";

const ProductMain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const navigate = useNavigate();

  const {
    data: productsData = { data: [], meta: { total: 0 } },
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsQuery({
    page: currentPage,
    per_page: itemsPerPage,
    search: searchTerm,
  });

  console.log(productsData)

  const filteredproducts = Array.isArray(productsData?.data)
    ? productsData?.data.filter((product) =>
        `${product.product_name ?? ""}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  const [deactivateProduct] = useDeactivateProductMutation();

  const handleEdit = (product) => {
    console.log("Editing product:", product.product_id);
    navigate(`edit/${product.product_id}`);
  };

  const handleToggleStatus = async (product_id, currentStatus) => {
    try {
      await deactivateProduct(product_id).unwrap();
      toast.success(
        `Product ${currentStatus ? "deactivated" : "activated"} successfully!`
      );
      refetch();
    } catch (err) {
      toast.error(err.data?.message || "Failed to update product status");
      console.error("Failed to toggle product status:", err);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const exportToCSV = () => {
    if (!productsData?.data?.length) {
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
    const csvRows = productsData.data.map((product) => [
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
    <section className="w-full mb-4 mt-6 px-4  rounded-xl">
      <ProductCard products={productsData.data} />
      <div className="w-full mb-4 mt-4 bg-white px-6 py-4 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-2xl text-left text-gray-600 font-bold mb-2">
              Product Management
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
            <button
              onClick={() => navigate("createProduct")}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Add Product
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
          <ProductTable
            products={filteredproducts}
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={productsData.meta?.total || 0}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default ProductMain;
