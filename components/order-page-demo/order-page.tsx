/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client";
import React from "react";
import { useUserOrders } from "@/features/orders-api/use-user-orders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Package,
  X,
  Loader2,
  ShoppingCart,
  Truck,
  CheckCircle,
} from "lucide-react";
import api from "@/lib/request-interceptor";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
}

interface Order {
  orderId: string;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
  book: Book;
  seller: {
    fullName: string;
  };
}

interface GroupedOrder {
  date: string;
  orders: Order[];
  total: number;
}

const OrderCard = ({
  order,
  onCancelOrder,
}: {
  order: Order;
  onCancelOrder: (orderId: string) => Promise<void>;
}) => (
  <Card className="mb-4">
    <CardHeader>
      <CardTitle className="flex justify-between items-center">
        <span>Order ID: {order.orderId}</span>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            order.status === "Pending"
              ? "bg-yellow-100 text-yellow-800"
              : order.status === "Shipped"
              ? "bg-blue-100 text-blue-800"
              : order.status === "Delivered"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          <Package className="w-4 h-4 mr-1" />
          {order.status}
        </span>
      </CardTitle>
      <CardDescription>Sold by: {order.seller.fullName}</CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow key={order.book.id}>
            <TableCell>{order.book.title}</TableCell>
            <TableCell>{order.book.author}</TableCell>
            <TableCell>${order.book.price.toFixed(2)}</TableCell>
            <TableCell>
              {order.status === "Pending" && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to cancel this order? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>No, keep it</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onCancelOrder(order.orderId)}
                      >
                        Yes, cancel order
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter className="flex justify-between items-center">
      <p className="font-semibold">Total: ${order.book.price.toFixed(2)}</p>
    </CardFooter>
  </Card>
);

const OrderPage = () => {
  const { data: ordersData, isLoading, isError } = useUserOrders();
  const queryClient = useQueryClient();

  const handleCancelOrder = async (orderId: string) => {
    try {
      await api.post(`/orders/cancel-order/${orderId}`);
      // @ts-expect-error
      queryClient.invalidateQueries(["order-page"]);
      toast.success("Order cancelled!");
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error("Order failed!");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Error loading orders. Please try again later.
      </div>
    );
  }

  const groupedOrders: GroupedOrder[] = ordersData?.data?.orders || [];

  const ordersByStatus = {
    Pending: [],
    Shipped: [],
    Delivered: [],
    Cancelled: [],
  };

  groupedOrders.forEach((groupedOrder) => {
    groupedOrder.orders.forEach((order) => {
      ordersByStatus[order.status]?.push(order);
    });
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Orders</h1>
      <Tabs defaultValue="Pending">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="Pending" className="flex items-center">
            <ShoppingCart className="w-4 h-4 mr-2" /> Pending
          </TabsTrigger>
          <TabsTrigger value="Shipped" className="flex items-center">
            <Truck className="w-4 h-4 mr-2" /> Shipped
          </TabsTrigger>
          <TabsTrigger value="Delivered" className="flex items-center">
            <CheckCircle className="w-4 h-4 mr-2" /> Delivered
          </TabsTrigger>
          <TabsTrigger value="Cancelled" className="flex items-center">
            <X className="w-4 h-4 mr-2" /> Cancelled
          </TabsTrigger>
        </TabsList>
        {Object.entries(ordersByStatus).map(([status, orders]) => (
          <TabsContent key={status} value={status}>
            {orders.length === 0 ? (
              <p className="text-center text-gray-500 my-4">
                No {status.toLowerCase()} orders.
              </p>
            ) : (
              orders.map((order, index) => (
                <OrderCard
                  key={index}
                  order={order}
                  onCancelOrder={handleCancelOrder}
                />
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default OrderPage;
