"use client";

import { Loader2 } from "lucide-react";
import NavLogo from "./nav-logo";
import Navigation from "./navigation";
import UserButton from "./UserButton";
import { useCurrentUser } from "@/features/users-api/use-current-user";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function Header() {
  const { data: currentUser, isLoading, isError } = useCurrentUser();
  const router = useRouter();

  const onViewProfile = () => {
    router.push("/profile");
  };

  const onLogin = () => {
    router.push("/login");
  };

  return (
    <header className="w-full bg-zinc-900">
      <div className="flex justify-between py-6 px-10">
        <div className="hidden lg:flex">
          <NavLogo />
        </div>
        <Navigation />
        <div>
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : isError ? (
            <Button onClick={onLogin}>Login</Button>
          ) : (
            <UserButton
              avatar={currentUser.data?.avatar}
              username={currentUser.data?.username}
              onViewProfile={onViewProfile}
            />
          )}
        </div>
      </div>
    </header>
  );
}
