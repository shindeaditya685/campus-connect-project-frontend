"use client";
import BookDetailPage from "@/components/browse-books/book-detail-page";
import { useGetBook } from "@/features/books-api/use-get-book";

type Props = {
  params: {
    id: string;
  };
};

const SingleBookPage = ({ params: { id } }: Props) => {
  const { data: bookData, isLoading: isBookLoading } = useGetBook(id);

  if (isBookLoading) {
    return <div>Loading...</div>;
  }

  if (!bookData?.data) {
    return <div>Book not found</div>;
  }

  return <BookDetailPage book={bookData.data} isLoading={isBookLoading} />;
};

export default SingleBookPage;
