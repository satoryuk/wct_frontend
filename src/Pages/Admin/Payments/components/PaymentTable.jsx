import React from "react";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Download,
  Printer,
  Eye,
} from "lucide-react";

const PaymentTable = () => {
  const [payments] = useState([
    {
      id: "#INV-001",
      date: "12 May, 2025",
      name: "Apple Inc",
      amount: 2400.0,
      status: "Completed",
      method: "Credit Card",
      category: "Software",
    },
    {
      id: "#INV-002",
      date: "10 May, 2025",
      name: "Netflix",
      amount: 14.99,
      status: "Completed",
      method: "Direct Debit",
      category: "Entertainment",
    },
    {
      id: "#INV-003",
      date: "08 May, 2025",
      name: "Amazon",
      amount: 156.24,
      status: "Pending",
      method: "Credit Card",
      category: "Shopping",
    },
    {
      id: "#INV-004",
      date: "05 May, 2025",
      name: "Uber",
      amount: 42.5,
      status: "Completed",
      method: "PayPal",
      category: "Transport",
    },
    {
      id: "#INV-005",
      date: "01 May, 2025",
      name: "Office Rent",
      amount: 1200.0,
      status: "Completed",
      method: "Bank Transfer",
      category: "Rent",
    },
  ]);

  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  // For sorting
  const [sortField, setSortField] = useState("date");
  const [sortDirection, setSortDirection] = useState("desc");

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="h-4 w-4" />
    ) : (
      <ChevronDown className="h-4 w-4" />
    );
  };

  const sortedPayments = [...payments].sort((a, b) => {
    if (sortField === "amount") {
      return sortDirection === "asc"
        ? a.amount - b.amount
        : b.amount - a.amount;
    } else {
      const valueA = a[sortField].toString().toLowerCase();
      const valueB = b[sortField].toString().toLowerCase();
      if (sortDirection === "asc") {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-300 shadow-sm mt-4">
      <div className="p-6 border-b border-gray-300 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-700">Recent Payments</h3>
        <div className="flex space-x-2">
          <button className="exportBtn">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="printBtn">
            <Printer className="h-4 w-4" />
            Print
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-500 text-white">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center gap-1">
                  Invoice ID
                  {getSortIcon("id")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center gap-1">
                  Date
                  {getSortIcon("date")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-1">
                  Name
                  {getSortIcon("name")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center gap-1">
                  Amount
                  {getSortIcon("amount")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-1">
                  Status
                  {getSortIcon("status")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("method")}
              >
                <div className="flex items-center gap-1">
                  Method
                  {getSortIcon("method")}
                </div>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center gap-1">
                  Category
                  {getSortIcon("category")}
                </div>
              </th>
              <th scope="col" className="relative px-6 py-3">
                <p className="text-white text-xs font-medium uppercase">
                  Action
                </p>
                {/* <span className="sr-only text-white">Actions</span> */}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedPayments.map((payment) => (
              <tr key={payment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {payment.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {payment.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${payment.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                      payment.status
                    )}`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.method}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {payment.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end space-x-2">
                    <button className="text-gray-400 hover:text-gray-500">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-500">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 flex items-center justify-between border-t border-gray-300">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to{" "}
          <span className="font-medium">
            {Math.min(itemsPerPage, payments.length)}
          </span>{" "}
          of <span className="font-medium">{payments.length}</span> results
        </div>
        <div className="flex space-x-1">
          <button
            className="btn text-gray-600 hover:bg-gray-200"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className="btn text-white bg-blue-600 hover:bg-blue-700"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentTable;
