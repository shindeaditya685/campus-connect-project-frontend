import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut } from "lucide-react";
import Image from "next/image";
import { useLogout } from "@/features/users-api/use-logout";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  avatar: string;
  username: string;
  onViewProfile: () => void;
};

export default function UserButton({ avatar, username }: Props) {
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full"
          aria-label="User menu"
        >
          <Image
            src={avatar}
            alt={`${username}'s avatar`}
            fill
            className="object-cover rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuItem
          onClick={() => router.push("/account")}
          className="cursor-pointer"
        >
          <User className="mr-2 h-4 w-4" />
          <span>View Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleLogout}
          className="cursor-pointer text-red-600"
          disabled={logout.isPending}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>{logout.isPending ? "Logging out..." : "Log out"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
