import React from "react";
import {
  Edit,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
} from "lucide-react";

const ProductTable = ({
  products = [],
  onEdit,
  onToggleStatus,
  currentPage = 1,
  itemsPerPage = 10,
  totalItems = 0,
  onPageChange,
}) => {
  // Calculate pagination values
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  if (!Array.isArray(products)) {
    return (
      <div className="text-center py-10 text-gray-500">
        Products data is not available
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No products to display
      </div>
    );
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const formatStatus = (status) => {
    return status === 1 ? "Active" : "Inactive";
  };

  // Format expiry date for display
  const formatExpiryDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="overflow-x-auto mt-4 rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock Qty
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {products.map((product) => {
              const isAvailable = product.status === 1;

              return (
                <tr
                  key={product.product_id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.product_name}
                        className="w-10 h-10 rounded object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-900">
                    {product.product_name}
                  </td>
                  <td className="py-4 px-6 text-blue-600">
                    ${product.price?.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {product.stock_qty}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {product.category?.category_name || "N/A"}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isAvailable
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {formatStatus(product.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {formatExpiryDate(product.expiry_date)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(product)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit product"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleStatus(product.product_id)}
                        className={`p-2 rounded-lg transition-colors hover:bg-opacity-20 ${
                          isAvailable
                            ? "text-red-600 hover:bg-red-100"
                            : "text-green-600 hover:bg-green-100"
                        }`}
                        title={isAvailable ? "Deactivate" : "Activate"}
                      >
                        {isAvailable ? (
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
      {products.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 sm:mb-0">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, totalItems)} of {totalItems} products
          </div>

          <div className="flex items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center px-3 py-2 border border-gray-300 rounded-l-lg text-sm font-medium ${
                currentPage === 1
                  ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "text-gray-700 bg-white hover:bg-gray-50"
              }`}
            >
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </button>

            <div className="hidden sm:flex">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                // Show limited page numbers with ellipsis
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 &&
                    pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                      className={`px-3 py-2 border-t border-b border-gray-300 text-sm font-medium ${
                        currentPage === pageNumber
                          ? "bg-blue-50 text-blue-600 border-blue-500 z-10"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  (pageNumber === currentPage - 2 && currentPage > 3) ||
                  (pageNumber === currentPage + 2 &&
                    currentPage < totalPages - 2)
                ) {
                  return (
                    <span
                      key={pageNumber}
                      className="px-3 py-2 border-t border-b border-gray-300 text-sm text-gray-500 bg-white"
                    >
                      ...
                    </span>
                  );
                }
                return null;
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
              className={`flex items-center justify-center px-3 py-2 border border-gray-300 rounded-r-lg text-sm font-medium ${
                currentPage === totalPages || totalPages === 0
                  ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "text-gray-700 bg-white hover:bg-gray-50"
              }`}
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;
