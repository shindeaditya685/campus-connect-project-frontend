import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactSellerDialog from "./contact-seller-dialog";
import { Badge } from "@/components/ui/badge";
import { Truck, XCircle, Clock, CheckCircle } from "lucide-react";

type OrderStatus = "Pending" | "Shipped" | "Delivered" | "Cancelled";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

export interface Order {
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

const StatusIcon = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case "Pending":
      return <Clock className="w-5 h-5 text-yellow-500" />;
    case "Shipped":
      return <Truck className="w-5 h-5 text-blue-500" />;
    case "Delivered":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "Cancelled":
      return <XCircle className="w-5 h-5 text-red-500" />;
    default:
      return null;
  }
};

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Order #{order.id}</CardTitle>
        <Badge
          variant={order.status === "Cancelled" ? "destructive" : "default"}
          className="flex items-center gap-1"
        >
          <StatusIcon status={order.status} />
          {order.status}
        </Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-2">Ordered on: {order.date}</p>
        <ul className="list-disc list-inside mb-2">
          {order.books.map((book) => (
            <li key={book.id} className="text-sm">
              {book.title} by {book.author} - ${book.price.toFixed(2)}
            </li>
          ))}
        </ul>
        <p className="font-semibold">Total: ${order.total.toFixed(2)}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-sm">Seller: {order.seller.name}</p>
          <ContactSellerDialog seller={order.seller} />
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
