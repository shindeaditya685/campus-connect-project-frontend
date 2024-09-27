/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/request-interceptor";
import { toast } from "react-toastify";

const cancelOrder = async (orderId: string) => {
  const response = await api.post(`/orders/cancel-order/${orderId}`);
  return response.data;
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      toast.success("order cancelled successfully!");
      //@ts-expect-error
      queryClient.invalidateQueries(["userOrders"]);
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
