/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/request-interceptor";
import { toast } from "react-toastify";

const placeOrder = async (id: string) => {
  const response = await api.post(`/orders/place-order/${id}`);
  return response.data;
};

export const usePlaceOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: placeOrder,
    onSuccess: () => {
      toast.success("Book ordered successfully!");
      //@ts-expect-error
      queryClient.invalidateQueries(["books"]);
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
