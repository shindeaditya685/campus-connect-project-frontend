import { useQuery } from "@tanstack/react-query";

import api from "@/lib/request-interceptor";

const fetchCurrentUser = async () => {
  const response = await api.get("/users/user");
  return response.data;
};

export const useCurrentUser = () => {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: fetchCurrentUser,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
