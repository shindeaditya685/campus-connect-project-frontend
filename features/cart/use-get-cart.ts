import { useQuery } from "@tanstack/react-query";
import api from "@/lib/request-interceptor";

const fetchCartDetails = async () => {
  const response = await api.get(`/carts/get-cart`);
  return response.data;
};

export const useGetCart = () => {
  return useQuery({
    queryKey: ["singleBook"],
    queryFn: fetchCartDetails,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
