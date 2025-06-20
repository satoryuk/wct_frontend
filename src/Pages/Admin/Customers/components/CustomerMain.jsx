import React, { useState, useEffect } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { toast } from "react-toastify";
import {
  useGetUserQuery,
  useDeactivateUserMutation,
} from "../../../../redux/hooks/userApiSlice";
import { useNavigate } from "react-router-dom";
import CustomerTable from "./CustomerTable";
import CustomerCard from "./CustomerCard";

const CustomerMain = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const {
    data: customerData = { data: { data: [], meta: { total: 0 } } },
    isLoading,
    isError,
    error,
    refetch,
  } = useGetUserQuery({
    page: currentPage,
    per_page: itemsPerPage,
    search: searchTerm,
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    if (customerData?.data?.data) {
      const customersOnly = customerData.data.data.filter(
        (user) => user.role === "customer"
      );
      setCustomers(customersOnly);
    }
  }, [customerData]);

  const filteredCustomers = customers.filter(
    (customer) =>
      `${customer.username ?? ""}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      `${customer.email ?? ""}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [deactivateUser] = useDeactivateUserMutation();

  const handleEdit = (customer) => {
    navigate(`${customer.id}`);
  };

  const handleToggleStatus = async (user_id, currentStatus) => {
    try {
      await deactivateUser(user_id).unwrap();
      toast.success(
        `Customer ${currentStatus ? "deactivated" : "activated"} successfully!`
      );
      refetch();
    } catch (err) {
      toast.error(err.data?.message || "Failed to update customer status");
      console.error("Failed to toggle customer status:", err);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const addNew = () => {
    navigate("createCustomer");
  };

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">
        Error loading customers: {error?.data?.message || error.message}
      </div>
    );
  }

  return (
    <section className="w-full mb-4 mt-6 px-4 rounded-xl">
      <CustomerCard customers={customers} isLoading={isLoading} />
      <div className="w-full mb-4 mt-4 bg-white px-6 py-4 rounded-xl shadow-md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
          <div>
            <h1 className="text-2xl text-left text-gray-600 font-bold mb-2">
              Customer Management
            </h1>
            <p className="text-gray-600">Manage your customer accounts.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button
              onClick={addNew}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Customer
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search customers by name or email..."
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
            Loading customers...
          </div>
        ) : (
          <CustomerTable
            customers={filteredCustomers}
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={customerData?.data?.meta?.total || 0}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};

export default CustomerMain;
