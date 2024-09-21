import { useQuery } from "@tanstack/react-query";

import api from "@/lib/request-interceptor";

const fetchUserAvailableBooks = async (userId: string) => {
  const response = await api.get(`/books/get-user-books/${userId}`);
  return response.data;
};

export const useUsersAvailbaleBooks = (userId: string) => {
  return useQuery({
    queryKey: ["usersBooks", userId],
    queryFn: () => fetchUserAvailableBooks(userId),
    enabled: !!userId,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
