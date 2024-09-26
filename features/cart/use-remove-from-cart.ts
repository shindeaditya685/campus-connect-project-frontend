/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/request-interceptor";
import { toast } from "react-toastify";

const removeFromCart = async (id: string) => {
  const response = await api.patch(`/carts/remove-from-cart/${id}`);
  return response.data;
};

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeFromCart,
    onSuccess: (data) => {
      toast.success(data.message || "Book removed from the cart!");
      //@ts-expect-error
      queryClient.invalidateQueries(["cart"]);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.error("Error removing book from cart:", error.response || error);
      toast.error(
        error.response?.data?.message || "Failed to remove book from cart"
      );
    },
  });
};
