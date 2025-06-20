import React from "react";
import PaymentCard from "./components/PaymentCard";
import PaymentTable from "./components/PaymentTable";

const PaymentsPage = () => {
  return (
    <section>
      <h2 className="text-2xl text-gray-600 text-left font-bold py-4">
        Payment Overview
      </h2>
      <div>
        <PaymentCard />
      </div>
      <PaymentTable />
    </section>
  );
};

export default PaymentsPage;
