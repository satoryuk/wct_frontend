import React from "react";
import { CheckCircle, AlertTriangle, Clock, Box } from "lucide-react";

const ProductCard = ({ products = [] }) => {
  if (!products.length) return null;

  // Calculate statistics
  const totalProducts = products.length;
  const activeProducts = products.filter((product) => product.status).length;
  const lowStockProducts = products.filter(
    (product) => product.stock_qty < 10
  ).length;

  // Calculate products expiring soon (within 7 days)
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const expiringProducts = products.filter((product) => {
    if (!product.expiry_date) return false;
    const expiryDate = new Date(product.expiry_date);
    return expiryDate >= today && expiryDate <= nextWeek;
  }).length;

  const cardData = [
    {
      title: "Total Products",
      value: totalProducts,
      icon: <Box className="text-blue-600" />,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
      description: "All products in inventory",
    },
    {
      title: "Active Products",
      value: activeProducts,
      icon: <CheckCircle className="text-green-600" />,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
      description: "Currently available products",
    },
    {
      title: "Low Stock",
      value: lowStockProducts,
      icon: <AlertTriangle className="text-yellow-600" />,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
      description: "Products with quantity < 10",
    },
    {
      title: "Expiring Soon",
      value: expiringProducts,
      icon: <Clock className="text-red-600" />,
      bgColor: "bg-red-100",
      textColor: "text-red-600",
      description: "Expiring within 7 days",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                className: `${card.textColor} w-4 h-4`,
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
