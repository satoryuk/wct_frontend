import React from "react";
import { Box, AlertCircle, CheckCircle, Loader2 } from "lucide-react";

const InventoryCard = ({ products = [], isLoading = false }) => {
  // Calculate statistics
  const totalProducts = products.length;
  const outOfStockProducts = products.filter(
    (product) => product?.stock === 0
  ).length;
  const activeProducts = products.filter(
    (product) => product?.status && product?.stock > 0
  ).length;

  const cardData = [
    {
      title: "Total Products",
      value: isLoading ? "-" : totalProducts,
      icon: isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <Box className="text-blue-600" />
      ),
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      description: "All products in inventory",
    },
    {
      title: "Out of Stock",
      value: isLoading ? "-" : outOfStockProducts,
      icon: isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <AlertCircle className="text-red-600" />
      ),
      bgColor: "bg-red-100",
      textColor: "text-red-600",
      description: "Products with zero stock",
    },
    {
      title: "Active Products",
      value: isLoading ? "-" : activeProducts,
      icon: isLoading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <CheckCircle className="text-green-600" />
      ),
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      description: "Available and active products",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
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

export default InventoryCard;
