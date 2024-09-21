"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderCard from "./order-card";
import { useUserOrders } from "@/features/orders-api/use-user-orders";
import { Loader } from "lucide-react";

type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

interface Order {
  id: number;
  date: string;
  status: OrderStatus;
  books: Book[];
  total: number;
  seller: {
    name: string;
    email: string;
  };
}

const MyOrdersComponent = () => {
  const [filter, setFilter] = useState<"all" | OrderStatus>("all");
  const { data: allOrders, isLoading } = useUserOrders();

  const orders: Order[] = allOrders?.data?.orders || [];

  // Filter orders based on selected tab (filter)
  const filteredOrders = orders.filter(
    (order) => filter === "all" || order.status === filter
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!orders.length) {
    return <div className="text-center py-8">No orders found.</div>;
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-5">
        <TabsTrigger value="all" onClick={() => setFilter("all")}>
          All
        </TabsTrigger>
        <TabsTrigger value="Pending" onClick={() => setFilter("Pending")}>
          Pending
        </TabsTrigger>
        <TabsTrigger value="Shipped" onClick={() => setFilter("Shipped")}>
          Shipped
        </TabsTrigger>
        <TabsTrigger value="Delivered" onClick={() => setFilter("Delivered")}>
          Delivered
        </TabsTrigger>
        <TabsTrigger value="Cancelled" onClick={() => setFilter("Cancelled")}>
          Cancelled
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        ) : (
          <div className="text-center py-8">No orders found.</div>
        )}
      </TabsContent>

      {["Pending", "Shipped", "Delivered", "Cancelled"].map((status) => (
        <TabsContent key={status} value={status}>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="text-center py-8">
              No {status.toLowerCase()} orders found.
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default MyOrdersComponent;
