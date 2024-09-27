"use client";

import React from "react";
import BookCart from "@/components/cart/book-cart";
import { useClearCart } from "@/features/cart/use-clear-cart";
import { useRemoveFromCart } from "@/features/cart/use-remove-from-cart";
import { useGetCart } from "@/features/cart/use-get-cart";
import { usePlaceOrder } from "@/features/orders-api/use-place-order";
import ProtectedRoute from "@/components/protected-route/protected-route";

const CartPage: React.FC = () => {
  const { data: cartData } = useGetCart();
  const { mutate: clearCart, isPending: isClearPending } = useClearCart();
  const { mutate: removeFromCart, isPending: isRemovePending } =
    useRemoveFromCart();
  const { mutate: buyBook, isPending: isBuying } = usePlaceOrder();

  const onClearCart = () => {
    clearCart();
  };

  const onRemoveBook = (id: string) => {
    removeFromCart(id);
  };

  const onBuyBook = (id: string) => {
    buyBook(id);
  };

  return (
    <ProtectedRoute>
      <BookCart
        onBuyBook={onBuyBook}
        cartData={cartData}
        isClearPending={isClearPending}
        onClearCart={onClearCart}
        onRemoveBook={onRemoveBook}
        isRemovePending={isRemovePending}
        isBuying={isBuying}
      />
    </ProtectedRoute>
  );
};

export default CartPage;
