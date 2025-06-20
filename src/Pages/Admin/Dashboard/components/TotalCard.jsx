import React from "react";
import { Users, Package, ShoppingCart, Wallet } from "lucide-react";

const cardData = [
  {
    title: "Total Customers",
    value: "2,564",
    change: "+5.2%",
    trend: "up",
    icon: <Users size={16} className="text-blue-600" />,
    color: "blue",
  },
  {
    title: "Total Products",
    value: "2,564",
    change: "",
    trend: "",
    icon: <Package size={16} className="text-purple-600" />,
    color: "purple",
  },
  {
    title: "Total Orders",
    value: "156",
    change: "-0.2%",
    trend: "down",
    icon: <ShoppingCart size={16} className="text-orange-600" />,
    color: "orange",
  },
  {
    title: "Monthly Income",
    value: "$2,565",
    change: "+5.2%",
    trend: "up",
    icon: <Wallet size={16} className="text-green-600" />,
    color: "green",
  },
];

const TotalCard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full mb-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-4 overflow-hidden relative"
        >
          <div
            className={`absolute top-0 left-0 w-1.5 h-full bg-${card.color}-500`}
          />

          <div className="flex justify-between items-start">
            <div className="pl-2">
              <h4 className="text-gray-500 text-sm font-medium mb-1">
                {card.title}
              </h4>
              <p className="text-xl font-bold mb-1">{card.value}</p>
              {card.change && (
                <div className="flex items-center">
                  <span
                    className={`text-sm font-medium ${
                      card.trend === "up" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {card.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-1">this month</span>
                </div>
              )}
            </div>

            <div className={`bg-${card.color}-100 p-2 rounded-lg`}>
              {React.cloneElement(card.icon, {
                className: `text-${card.color}-600`,
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TotalCard;
