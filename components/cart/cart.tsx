"use client";

import React from "react";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface CartProps {
  itemCount: number;
}

const Cart: React.FC<CartProps> = ({ itemCount }) => {
  const router = useRouter();
  const path = usePathname();

  const handleCartClick = () => {
    router.push("/cart"); // Adjust this route as needed
  };

  return (
    <Button variant="ghost" className="relative p-2" onClick={handleCartClick}>
      <ShoppingCart
        className={cn(path === "/cart" && "text-red-600 h-6 w-6", "h-6 w-6")}
      />
      {itemCount >= 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 px-2 py-1 text-xs"
        >
          {itemCount}
        </Badge>
      )}
    </Button>
  );
};

export default Cart;
