import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CreditCard, DollarSign, BarChart2 } from "lucide-react";

export default function BankingDashboard() {
  const [data] = useState([
    { name: "January", transactions: 65 },
    { name: "February", transactions: 59 },
    { name: "March", transactions: 80 },
    { name: "April", transactions: 81 },
    { name: "May", transactions: 56 },
    { name: "June", transactions: 55 },
    { name: "July", transactions: 40 },
    { name: "August", transactions: 25 },
    { name: "September", transactions: 30 },
    { name: "October", transactions: 40 },
    { name: "November", transactions: 50 },
    { name: "December", transactions: 60 },
  ]);

  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-4">
        {/* Left Column (2/5 width) */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm h-full">
            <div className="flex items-center mb-6">
              <div className="bg-green-500 h-3 w-3 rounded-sm mr-2"></div>
              <span className="text-sm">Transactions Flow</span>
            </div>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={data}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 90]}
                  />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="transactions"
                    stroke="#ff9eb0"
                    strokeWidth={2}
                    dot={{
                      stroke: "#ff9eb0",
                      strokeWidth: 2,
                      r: 4,
                      fill: "#fff",
                    }}
                    activeDot={{
                      r: 6,
                      stroke: "#ff9eb0",
                      strokeWidth: 2,
                      fill: "#fff",
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Column (3/5 width) - Graph */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Account Balance Card */}
          <div className="bg-blue-500 rounded-lg p-6 text-left text-white shadow-lg shadow-blue-400 mb-4 hover:scale-105 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-medium mb-1">Account Balance</h2>
                <p className="text-4xl font-bold">$643,543.65</p>
              </div>
              <div className="bg-blue-400/30 p-3 rounded-lg">
                <CreditCard className="h-6 w-6" />
              </div>
            </div>
            <div className="text-sm mt-4">
              <p>Main Account:</p>
              <p>Thong Vathana - 005 000 206 | USD</p>
            </div>
          </div>

          {/* Transaction Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Total Transaction Amount */}
            <div className="paymentCard">
              <div className="bg-green-100 p-3 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-gray-600 font-medium">
                Total Transaction Amount
              </p>
              <p className="text-2xl font-bold">$643,543.65</p>
            </div>
            {/* Total Transaction Account */}
            <div className="paymentCard">
              <div className="bg-orange-100 p-3 rounded-lg">
                <BarChart2 className="h-6 w-6 text-orange-500" />
              </div>
              <p className="text-gray-600 font-medium">
                Total Transaction Account
              </p>
              <p className="text-2xl font-bold">245</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
