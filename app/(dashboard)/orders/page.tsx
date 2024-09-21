import MyOrdersComponent from "@/components/order-page/my-orders-page";
import React from "react";

const OrdersPage = () => {
  return (
    <div className="w-full min-h-screen p-2 md:p-4 flex justify-center items-center overflow-auto">
      <div className="w-full max-w-[95%] sm:max-w-2xl">
        <MyOrdersComponent />
      </div>
    </div>
  );
};

export default OrdersPage;
