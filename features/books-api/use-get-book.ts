import { useQuery } from "@tanstack/react-query";
import api from "@/lib/request-interceptor";

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

interface BookResponse {
  data: Book;
}

const fetchSingleBook = async (id: string): Promise<BookResponse> => {
  const response = await api.get<BookResponse>(`/books/get-book/${id}`);
  return response.data;
};

export const useGetBook = (id: string) => {
  return useQuery<BookResponse, Error>({
    queryKey: ["singleBook", id],
    queryFn: () => fetchSingleBook(id),
    enabled: !!id,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
