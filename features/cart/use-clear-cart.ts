/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/request-interceptor";
import { toast } from "react-toastify";

const clearCart = async () => {
  const response = await api.post("/carts/clear-cart");
  return response.data;
};

export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => {
      toast.success("Cart cleared successfully!");
      //@ts-expect-error
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
