import React from "react";
import { Users, CheckCircle, Loader2 } from "lucide-react";

const CustomerCard = ({ customers = [], isLoading = false }) => {
  // Calculate statistics
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(
    (customer) => customer?.status
  ).length;

  const cardData = [
    {
      title: "Total Customers",
      value: isLoading ? "-" : totalCustomers,
      icon: isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Users className="text-blue-600" />
      ),
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      description: "All registered customers",
    },
    {
      title: "Active Customers",
      value: isLoading ? "-" : activeCustomers,
      icon: isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <CheckCircle className="text-green-600" />
      ),
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      description: "Currently active customers",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <p className="text-2xl font-bold mt-1">{card.value}</p>
              <p className="text-xs text-gray-400 mt-1">{card.description}</p>
            </div>
            <div
              className={`${card.bgColor} rounded-full p-3 h-10 w-10 flex items-center justify-center`}
            >
              {React.cloneElement(card.icon, {
                className: `${
                  isLoading ? "text-gray-400" : card.textColor
                } w-4 h-4`,
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerCard;
