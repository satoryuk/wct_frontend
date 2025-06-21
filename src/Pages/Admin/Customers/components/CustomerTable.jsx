import React from "react";
import {
  Edit,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  UserCheck,
  UserX,
} from "lucide-react";

const CustomerTable = ({
  customers = [],
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

  if (!Array.isArray(customers)) {
    return (
      <div className="text-center py-10 text-gray-500">
        Customers data is not available
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        No Customers to display
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

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      <div className="overflow-x-auto mt-4 rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {/* <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Profile
              </th> */}
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone Number
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-3 py-3.5 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date of Birth
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
            {customers.map((customer) => {
              const isActive = customer.status === 1;

              return (
                <tr
                  key={customer.user_id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  {/* <td className="py-4 px-6">
                    {customer.profile ? (
                      <img
                        src={customer.profile}
                        alt={customer.username}
                        className="w-10 h-10 rounded object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                      </div>
                    )}
                  </td> */}
                  <td className="py-4 px-6 text-gray-900">
                    {customer.username}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{customer.email}</td>
                  <td className="py-4 px-6 text-gray-700">
                    {customer.phone || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {customer.gender || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {formatDate(customer.dob)}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {formatStatus(customer.status)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onEdit(customer)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Customer"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onToggleStatus(customer.user_id)}
                        className={`p-2 rounded-lg transition-colors hover:bg-opacity-20 ${
                          isActive
                            ? "text-red-600 hover:bg-red-100"
                            : "text-green-600 hover:bg-green-100"
                        }`}
                        title={isActive ? "Deactivate" : "Activate"}
                      >
                        {isActive ? (
                          <UserX className="w-4 h-4" />
                        ) : (
                          <UserCheck className="w-4 h-4" />
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
      {customers.length > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 sm:mb-0">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, totalItems)} of {totalItems} Customers
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

export default CustomerTable;
