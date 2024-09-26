"use client";

import { Loader2 } from "lucide-react";
import NavLogo from "./nav-logo";
import Navigation from "./navigation";
import UserButton from "./UserButton";
import Cart from "../cart/cart";
import { useCurrentUser } from "@/features/users-api/use-current-user";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { useGetCart } from "@/features/cart/use-get-cart";

export default function Header() {
  const { data: currentUser, isLoading, isError } = useCurrentUser();
  const { data: cartData } = useGetCart();
  const router = useRouter();

  console.log(cartData?.data);

  const cartSize = cartData?.data?.cart?.books?.length || 0;

  const onViewProfile = () => {
    router.push("/profile");
  };

  const onLogin = () => {
    router.push("/login");
  };

  return (
    <header className="w-full bg-zinc-900">
      <div className="flex justify-between items-center py-6 px-10">
        <div className="hidden lg:flex">
          <NavLogo />
        </div>
        <Navigation />
        <div className="flex items-center space-x-4">
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : isError ? (
            <Button onClick={onLogin}>Login</Button>
          ) : (
            <>
              <Cart itemCount={cartSize} />
              <UserButton
                avatar={currentUser.data?.avatar}
                username={currentUser.data?.username}
                onViewProfile={onViewProfile}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
