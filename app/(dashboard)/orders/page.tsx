import OrderPage from "@/components/order-page-demo/order-page";
import ProtectedRoute from "@/components/protected-route/protected-route";
import React from "react";

const OrderPageTwo = () => {
  return (
    <ProtectedRoute>
      <OrderPage />
    </ProtectedRoute>
  );
};

export default OrderPageTwo;
