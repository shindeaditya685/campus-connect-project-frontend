import { useQuery } from "@tanstack/react-query";

import api from "@/lib/request-interceptor";

const fetchAllBooks = async () => {
  const response = await api.get("/books/get-all-available-books");
  return response.data;
};

export const useAllBooks = () => {
  return useQuery({
    queryKey: ["all-books"],
    queryFn: fetchAllBooks,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
