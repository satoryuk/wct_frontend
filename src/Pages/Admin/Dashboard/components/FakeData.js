// Fixed FakeData with date properties and corrected typos

export const LineChartData = [
  {
    name: "January",
    "Products Sold": 65,
    "Customers Amount": 28,
    "Orders Amount": 18,
    "Monthly Revenue": 18,
    date: "2024-01-15", // Added date property (middle of month)
  },
  {
    name: "February",
    "Products Sold": 59,
    "Customers Amount": 48,
    "Orders Amount": 48,
    "Monthly Revenue": 48,
    date: "2024-02-15",
  },
  {
    name: "March",
    "Products Sold": 80,
    "Customers Amount": 40,
    "Orders Amount": 77,
    "Monthly Revenue": 77,
    date: "2024-03-15",
  },
  {
    name: "April",
    "Products Sold": 81,
    "Customers Amount": 19,
    "Orders Amount": 9,
    "Monthly Revenue": 20,
    date: "2024-04-15",
  },
  {
    name: "May",
    "Products Sold": 56,
    "Customers Amount": 86,
    "Orders Amount": 100,
    "Monthly Revenue": 30,
    date: "2024-05-15",
  },
  {
    name: "June",
    "Products Sold": 55,
    "Customers Amount": 27,
    "Orders Amount": 27,
    "Monthly Revenue": 40,
    date: "2024-06-15",
  },
  {
    name: "July",
    "Products Sold": 40,
    "Customers Amount": 90,
    "Orders Amount": 40,
    "Monthly Revenue": 50,
    date: "2024-07-15",
  },
  {
    name: "August",
    "Products Sold": 20,
    "Customers Amount": 10,
    "Orders Amount": 10,
    "Monthly Revenue": 9,
    date: "2024-08-15",
  },
  {
    name: "September",
    "Products Sold": 30,
    "Customers Amount": 20,
    "Orders Amount": 20,
    "Monthly Revenue": 100,
    date: "2024-09-15",
  },
  {
    name: "October",
    "Products Sold": 40,
    "Customers Amount": 30,
    "Orders Amount": 30,
    "Monthly Revenue": 27,
    date: "2024-10-15",
  },
  {
    name: "November",
    "Products Sold": 50,
    "Customers Amount": 40,
    "Orders Amount": 40,
    "Monthly Revenue": 40,
    date: "2023-11-15", // Previous year data
  },
  {
    name: "December",
    "Products Sold": 60,
    "Customers Amount": 50,
    "Orders Amount": 50,
    "Monthly Revenue": 10,
    date: "2023-12-15", // Previous year data
  },
];

export const BarChartData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Products Sold", // Fixed typo
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgb(75, 192, 192)",
      borderWidth: 1,
    },
    {
      label: "Customers Amount",
      data: [28, 48, 40, 19, 86, 27, 90],
      backgroundColor: "rgba(153, 102, 255, 0.2)",
      borderColor: "rgb(153, 102, 255)",
      borderWidth: 1,
    },
    {
      label: "Orders Amount",
      data: [18, 48, 77, 9, 100, 27, 40],
      backgroundColor: "rgba(255, 159, 64, 0.2)",
      borderColor: "rgb(255, 159, 64)",
      borderWidth: 1,
    },
  ],
};

// Helper function to calculate pie chart data from line chart data
export const calculatePieChartData = (lineChartData) => {
  if (!lineChartData || lineChartData.length === 0) {
    return [];
  }

  // Initialize totals for each category
  const totals = {
    "Products Sold": 0,
    "Customers Amount": 0,
    "Orders Amount": 0,
    "Monthly Revenue": 0,
  };

  // Sum up values across all months
  lineChartData.forEach((monthData) => {
    Object.keys(totals).forEach((key) => {
      totals[key] += monthData[key] || 0;
    });
  });

  // Convert to pie chart format
  return Object.keys(totals).map((name) => ({
    name,
    value: totals[name],
  }));
};
