import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShoppingCart, Trash2, CreditCard } from "lucide-react";

interface Book {
  _id: string;
  title: string;
  educationLevel: string;
  instituteName: string;
  bookCondition: string;
  price: number;
  status: string;
  images: string[];
}

interface CartData {
  data?: {
    cart?: {
      books: Book[];
    };
  };
}

interface BookCartProps {
  cartData: CartData;
  onClearCart: () => void;
  isRemovePending: boolean;
  isClearPending: boolean;
  onRemoveBook: (id: string) => void;
  onBuyBook: (id: string) => void;
  isBuying: boolean;
}

const BookCart: React.FC<BookCartProps> = ({
  cartData,
  onClearCart,
  isRemovePending,
  isClearPending,
  onRemoveBook,
  onBuyBook,
  isBuying,
}) => {
  const books = cartData?.data?.cart?.books || [];

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Book Cart</h1>
        <Button
          variant="destructive"
          onClick={onClearCart}
          disabled={books.length === 0 || isClearPending}
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Clear Cart
        </Button>
      </div>

      {books.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books.map((book) => (
            <Card key={book._id} className="w-full">
              <CardHeader>
                <CardTitle>{book.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={book.images[0] || "/api/placeholder/300/200"}
                  alt={book.title}
                  className="w-full h-48 object-cover mb-2"
                />
                <p>
                  <strong>Education Level:</strong> {book.educationLevel}
                </p>
                <p>
                  <strong>Institute:</strong> {book.instituteName}
                </p>
                <p>
                  <strong>Condition:</strong> {book.bookCondition}
                </p>
                <p>
                  <strong>Price:</strong> ${book.price}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => onRemoveBook(book._id)}
                  disabled={isRemovePending}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Remove
                </Button>
                <Button
                  onClick={() => onBuyBook(book._id)}
                  disabled={book.status === "Sold" || isBuying}
                >
                  <CreditCard className="mr-2 h-4 w-4" />
                  {book.status === "Sold" ? "Sold" : "Buy"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookCart;
