import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import BackButton from "./back-button";
import Image from "next/image";
import { useAddToCart } from "@/features/cart/use-add-to-cart";
import { usePlaceOrder } from "@/features/orders-api/use-place-order";

interface Book {
  _id: string;
  userId: string;
  title: string;
  educationLevel: string;
  instituteName: string;
  bookCondition: string;
  specificStandard: string;
  description: string;
  images: string[];
  price: number;
  purchasedBy: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface BookDetailPageProps {
  book: Book;
  isLoading: boolean;
}

const BookDetailPage: React.FC<BookDetailPageProps> = ({ book, isLoading }) => {
  const [mainImage, setMainImage] = useState<string>(book.images[0]);
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();
  const { mutate: placeOrder, isPending: isOrderPending } = usePlaceOrder();

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleAddToCart = () => {
    addToCart(book._id);
  };

  const handlePlaceOrder = () => {
    placeOrder(book._id);
  };

  return (
    <div className="container mx-auto p-4">
      <BackButton isLoading={isLoading} />
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{book.title}</CardTitle>
          <div className="flex justify-between items-center">
            <Badge variant="secondary">{book.educationLevel}</Badge>
            <Badge variant="outline">{book.status}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Image
                src={mainImage}
                alt={book.title}
                width={1000}
                height={1000}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="flex space-x-2 overflow-x-auto">
                {book.images.map((img, index) => (
                  <Image
                    key={index}
                    width={1000}
                    height={1000}
                    src={img}
                    alt={`${book.title} - ${index + 1}`}
                    className="w-16 h-16 object-cover rounded cursor-pointer"
                    onClick={() => setMainImage(img)}
                  />
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">Details</h3>
                <p>
                  <strong>Institute:</strong> {book.instituteName}
                </p>
                <p>
                  <strong>Specific Standard:</strong> {book.specificStandard}
                </p>
                <p>
                  <strong>Condition:</strong> {book.bookCondition}
                </p>
                <p>
                  <strong>Price:</strong> ${book.price}
                </p>
              </div>
              <ScrollArea className="h-40">
                <h3 className="text-lg font-semibold">Description</h3>
                <p>{book.description}</p>
              </ScrollArea>
              <div>
                <p>
                  <strong>Listed on:</strong> {formatDate(book.createdAt)}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? "Adding to Cart..." : "Add to Cart"}
          </Button>
          <Button onClick={handlePlaceOrder} disabled={isOrderPending}>
            Buy Now
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default BookDetailPage;
