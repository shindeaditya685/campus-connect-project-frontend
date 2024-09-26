import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/request-interceptor";
import { toast } from "react-toastify";

const addToCart = async (id: string) => {
  const response = await api.post(`/carts/add-to-cart/${id}`);
  return response.data;
};

export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess: () => {
      toast.success("Book added to the cart!");
      // Invalidate and refetch cart queries
      queryClient.invalidateQueries(["cart"]);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to add book to cart"
      );
    },
  });
};
