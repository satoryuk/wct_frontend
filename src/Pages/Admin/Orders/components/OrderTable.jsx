import React from "react";
import { useState, useEffect } from "react";
import {
  MoreHorizontal,
  Calendar,
  ChevronDown,
  Search,
  Download,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { sampleOrders } from "./data";

// Tab options
const tabs = ["All Order", "Completed", "Pending", "Canceled"];

const OrderTable = ({ orders = sampleOrders }) => {
  const [activeTab, setActiveTab] = useState("All Order");
  const [isMenuOpen, setIsMenuOpen] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialOrders, setInitialOrders] = useState(orders);
  const [filteredOrders, setFilteredOrders] = useState(orders);

  // Default date range (only used when filter is applied)
  const [startDate, setStartDate] = useState({
    day: "01",
    month: "01",
    year: "2025",
  });
  const [endDate, setEndDate] = useState({
    day: "01",
    month: "01",
    year: "2025",
  });
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isDateFilterActive, setIsDateFilterActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Mobile view state
  const [isMobileView, setIsMobileView] = useState(false);

  // Check screen size on component mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Update useEffect to include search filtering
  useEffect(() => {
    setIsLoading(true);
    // Simulate API call delay
    const timer = setTimeout(() => {
      // Filter orders based on active tab and date range
      let updatedOrders = [...initialOrders];

      // Filter by date range first (only if date filter is active)
      if (isDateFilterActive) {
        updatedOrders = updatedOrders.filter((order) => {
          // Convert dates to numbers for comparison (format is DD-MM-YYYY)
          const orderDateParts = order.date.split("-");

          // Create Date objects for comparison (year, month-1, day)
          const orderDate = new Date(
            parseInt(orderDateParts[2]),
            parseInt(orderDateParts[1]) - 1,
            parseInt(orderDateParts[0])
          );

          const filterStartDate = new Date(
            parseInt(startDate.year),
            parseInt(startDate.month) - 1,
            parseInt(startDate.day)
          );

          const filterEndDate = new Date(
            parseInt(endDate.year),
            parseInt(endDate.month) - 1,
            parseInt(endDate.day)
          );

          // Check if order date falls within range
          return orderDate >= filterStartDate && orderDate <= filterEndDate;
        });
      }

      // Then filter by tab
      if (activeTab === "Completed") {
        updatedOrders = updatedOrders.filter(
          (order) =>
            order.status === "Delivered" || order.payment === "Completed"
        );
      } else if (activeTab === "Pending") {
        updatedOrders = updatedOrders.filter(
          (order) => order.status === "Pending" || order.payment === "Pending"
        );
      } else if (activeTab === "Canceled") {
        updatedOrders = updatedOrders.filter(
          (order) => order.status === "Canceled"
        );
      }

      // Apply search filter if search term exists
      if (searchTerm.trim() !== "") {
        updatedOrders = updatedOrders.filter(
          (order) =>
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.payment.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Apply sorting if a sort field is selected
      if (sortField) {
        updatedOrders.sort((a, b) => {
          if (sortDirection === "asc") {
            return a[sortField].localeCompare(b[sortField]);
          } else {
            return b[sortField].localeCompare(a[sortField]);
          }
        });
      }

      setFilteredOrders(updatedOrders);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [
    activeTab,
    sortField,
    sortDirection,
    startDate,
    endDate,
    isDateFilterActive,
    searchTerm,
    initialOrders,
  ]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleMenu = (index) => {
    if (isMenuOpen === index) {
      setIsMenuOpen(null);
    } else {
      setIsMenuOpen(index);
    }
  };

  const toggleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    if (newSelectAll) {
      // Select all orders
      setSelectedOrders(filteredOrders.map((order) => order.id));
    } else {
      // Deselect all orders
      setSelectedOrders([]);
    }
  };

  const toggleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      // Remove from selected
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
      setSelectAll(false);
    } else {
      // Add to selected
      setSelectedOrders([...selectedOrders, orderId]);
      // Check if all are now selected
      if (selectedOrders.length + 1 === filteredOrders.length) {
        setSelectAll(true);
      }
    }
  };

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleSort = (field) => {
    // If clicking on the same field, toggle direction
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // New field, set it and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleDateChange = (which, field, value) => {
    if (which === "start") {
      setStartDate({
        ...startDate,
        [field]: value,
      });
    } else {
      setEndDate({
        ...endDate,
        [field]: value,
      });
    }
  };

  const handleCancelDateFilter = () => {
    setIsDateFilterActive(false);
    setShowDatePicker(false);
  };

  const handleApplyDateFilter = () => {
    setIsDateFilterActive(true);
    setShowDatePicker(false);
  };

  // Format date object to string (DD-MM-YYYY)
  const formatDateObj = (dateObj) => {
    return `${dateObj.day}-${dateObj.month}-${dateObj.year}`;
  };

  // color text
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-500";
      case "Pending":
        return "text-yellow-500";
      case "Failed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "text-blue-500";
      case "Pending":
        return "text-yellow-500";
      case "Canceled":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  // Export orders to CSV
  const exportToCSV = () => {
    // Create CSV header
    const headers = [
      "Order ID",
      "Customer",
      "Payment",
      "Date",
      "Type",
      "Status",
      "Total",
    ];

    // Convert orders to CSV rows
    const csvRows = filteredOrders.map((order) => [
      order.id,
      order.name,
      order.payment,
      order.date,
      order.type,
      order.status,
      order.total,
    ]);

    // Combine header and rows
    const csvContent = [
      headers.join(","),
      ...csvRows.map((row) => row.join(",")),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `orders_export_${new Date().toISOString().slice(0, 10)}.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Render mobile card view for orders
  const renderMobileOrderCards = () => {
    return currentOrders.map((order) => (
      <div
        key={order.id}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4"
      >
        <div className="flex justify-between items-start mb-3">
          <div>
            <span className="text-sm text-gray-500">Order ID:</span>
            <h3 className="font-semibold">{order.id}</h3>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              order.status === "Delivered"
                ? "bg-green-100 text-green-800"
                : order.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {order.status}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm mb-3">
          <div>
            <span className="text-gray-500">Customer:</span>
            <p>{order.name}</p>
          </div>
          <div>
            <span className="text-gray-500">Date:</span>
            <p>{order.date}</p>
          </div>
          <div>
            <span className="text-gray-500">Payment:</span>
            <p
              className={`${
                order.payment === "Completed"
                  ? "text-green-600"
                  : order.payment === "Pending"
                  ? "text-yellow-600"
                  : "text-red-600"
              }`}
            >
              {order.payment}
            </p>
          </div>
          <div>
            <span className="text-gray-500">Total:</span>
            <p className="font-semibold">{order.total}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full">
            <Edit size={16} />
          </button>
          <button className="p-2 text-red-600 hover:bg-red-50 rounded-full">
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    ));
  };

  // Render pagination controls
  const renderPagination = () => {
    return (
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstItem + 1} to{" "}
          {Math.min(indexOfLastItem, filteredOrders.length)} of{" "}
          {filteredOrders.length} orders
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Page numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            const pageNumber = i + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === pageNumber
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm border border-gray-300">
      {/* Tabs */}
      <div className="flex flex-col md:flex-row justify-between mb-6 border-b pb-4 border-gray-300">
        <div className="flex space-x-8 mb-4 md:mb-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`pb-2 text-lg font-medium ${
                activeTab === tab
                  ? "text-green-500 border-b-2 border-green-500"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search bar */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>

          {/* Export button */}
          <button onClick={exportToCSV} className="exportBtn">
            <Download size={16} className="mr-2" />
            Export
          </button>

          {/* Date Range Picker */}
          <div className="relative">
            <div
              className={`flex items-center space-x-2 pl-4 pr-8 py-2 border rounded-md cursor-pointer hover:bg-gray-50 ${
                !isDateFilterActive ? "bg-gray-100" : ""
              }`}
              onClick={toggleDatePicker}
            >
              <Calendar className="text-gray-400" size={16} />
              <span>
                {isDateFilterActive
                  ? `${startDate.day}-${startDate.month}-${startDate.year} to ${endDate.day}-${endDate.month}-${endDate.year}`
                  : "All Dates"}
              </span>
              <ChevronDown className="text-gray-400" size={16} />
            </div>

            {showDatePicker && (
              <div className="absolute right-0 mt-2 p-4 bg-white rounded-md shadow-lg z-10 border w-80">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs text-gray-500">Day</label>
                        <select
                          value={startDate.day}
                          onChange={(e) =>
                            handleDateChange("start", "day", e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                        >
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(
                            (day) => (
                              <option
                                key={`start-day-${day}`}
                                value={day < 10 ? `0${day}` : day}
                              >
                                {day}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Month</label>
                        <select
                          value={startDate.month}
                          onChange={(e) =>
                            handleDateChange("start", "month", e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                        >
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (month) => (
                              <option
                                key={`start-month-${month}`}
                                value={month < 10 ? `0${month}` : month}
                              >
                                {new Date(2025, month - 1, 1).toLocaleString(
                                  "default",
                                  { month: "short" }
                                )}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Year</label>
                        <select
                          value={startDate.year}
                          onChange={(e) =>
                            handleDateChange("start", "year", e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                        >
                          {Array.from({ length: 6 }, (_, i) => 2023 + i).map(
                            (year) => (
                              <option key={`start-year-${year}`} value={year}>
                                {year}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="text-xs text-gray-500">Day</label>
                        <select
                          value={endDate.day}
                          onChange={(e) =>
                            handleDateChange("end", "day", e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                        >
                          {Array.from({ length: 31 }, (_, i) => i + 1).map(
                            (day) => (
                              <option
                                key={`end-day-${day}`}
                                value={day < 10 ? `0${day}` : day}
                              >
                                {day}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Month</label>
                        <select
                          value={endDate.month}
                          onChange={(e) =>
                            handleDateChange("end", "month", e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                        >
                          {Array.from({ length: 12 }, (_, i) => i + 1).map(
                            (month) => (
                              <option
                                key={`end-month-${month}`}
                                value={month < 10 ? `0${month}` : month}
                              >
                                {new Date(2025, month - 1, 1).toLocaleString(
                                  "default",
                                  { month: "short" }
                                )}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Year</label>
                        <select
                          value={endDate.year}
                          onChange={(e) =>
                            handleDateChange("end", "year", e.target.value)
                          }
                          className="w-full p-2 border rounded-md"
                        >
                          {Array.from({ length: 6 }, (_, i) => 2023 + i).map(
                            (year) => (
                              <option key={`end-year-${year}`} value={year}>
                                {year}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <button
                      className="px-4 py-2 text-gray-600 border rounded-md hover:bg-gray-100"
                      onClick={handleCancelDateFilter}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      onClick={handleApplyDateFilter}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Table */}
      <div className="mt-2">
        <h2 className="text-xl text-left font-bold text-gray-700 mb-4 md:mb-0">
          Orders Summary
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <span className="ml-3 text-lg text-gray-500">Loading...</span>
          </div>
        ) : isMobileView ? (
          // Mobile view
          <div className="mt-4">{renderMobileOrderCards()}</div>
        ) : (
          // Desktop table view
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="py-3 px-4">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectAll}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600">ID</th>
                  <th className="py-3 px-4 text-left text-gray-600">Name</th>
                  <th className="py-3 px-4 text-left text-gray-600">Payment</th>
                  <th className="py-3 px-4 text-left text-gray-600">
                    Paid Date
                  </th>
                  <th className="py-3 px-4 text-left text-gray-600">Type</th>
                  <th className="py-3 px-4 text-left text-gray-600">Status</th>
                  <th className="py-3 px-4 text-left text-gray-600">Total</th>
                  <th className="py-3 px-4 text-left text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleSelectOrder(order.id)}
                      />
                    </td>
                    <td className="py-4 px-4 text-gray-800">{order.id}</td>
                    <td className="py-4 px-4 text-gray-800">{order.name}</td>
                    <td
                      className={`py-4 px-4 ${getPaymentStatusColor(
                        order.payment
                      )}`}
                    >
                      {order.payment}
                    </td>
                    <td className="py-4 px-4">
                      <span className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl">
                        {order.date}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-800">{order.type}</td>
                    <td
                      className={`py-4 px-4 ${getOrderStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </td>
                    <td className="py-4 px-4 text-red-500 font-medium">
                      {order.total}
                    </td>
                    <td className="py-4 px-4 relative">
                      <button
                        className="p-1 rounded-full hover:bg-gray-200"
                        onClick={() => toggleMenu(index)}
                      >
                        <MoreHorizontal size={20} />
                      </button>

                      {isMenuOpen === index && (
                        <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg z-10">
                          <div className="py-1">
                            <button className="w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100">
                              View
                            </button>
                            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                              Delete
                            </button>
                            <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                              Refund
                            </button>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && renderPagination()}
      </div>
    </div>
  );
};

export default OrderTable;
