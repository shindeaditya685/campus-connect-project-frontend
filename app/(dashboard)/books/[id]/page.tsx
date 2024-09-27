"use client";
import BookDetailPage from "@/components/browse-books/book-detail-page";
import ProtectedRoute from "@/components/protected-route/protected-route";
import { useGetBook } from "@/features/books-api/use-get-book";
import { Loader2 } from "lucide-react";

type Props = {
  params: {
    id: string;
  };
};

const SingleBookPage = ({ params: { id } }: Props) => {
  const { data: bookData, isLoading: isBookLoading } = useGetBook(id);

  if (isBookLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!bookData?.data) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Book not found!</h1>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <BookDetailPage book={bookData.data} isLoading={isBookLoading} />
    </ProtectedRoute>
  );
};

export default SingleBookPage;
