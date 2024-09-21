import { useQuery } from "@tanstack/react-query";

import api from "@/lib/request-interceptor";

const fetchUserOrders = async () => {
  const response = await api.get("/orders/get-user-orders");
  return response.data;
};

export const useUserOrders = () => {
  return useQuery({
    queryKey: ["userOrders"],
    queryFn: fetchUserOrders,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
