"use client";

import { usePathname, useRouter } from "next/navigation";
import NavButton from "./nav-button";
import { useState } from "react";
import { useMedia } from "react-use";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Menu } from "lucide-react";
import { useCurrentUser } from "@/features/users-api/use-current-user";

const routes = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Books",
    href: "/books",
  },
  {
    label: "List book",
    href: "/list-book",
  },
  {
    label: "My Orders",
    href: "/orders",
  },
  {
    label: "Account",
    href: "/account",
  },
];

export default function Navigation() {
  const { data: currentUser } = useCurrentUser();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const onClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button
            variant="outline"
            size="sm"
            className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
          >
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="px-2">
          <nav className="flex flex-col gap-y-2 pt-6">
            {!currentUser?.data?._id && (
              <Button variant={"/" === pathname ? "secondary" : "ghost"}>
                Home
              </Button>
            )}
            {currentUser?.data?._id &&
              routes.map((route) => (
                <Button
                  key={route.href}
                  variant={route.href === pathname ? "secondary" : "ghost"}
                  onClick={() => onClick(route.href)}
                  className="w-full justify-start"
                >
                  {route.label}
                </Button>
              ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <nav className="flex gap-3">
      {!currentUser?.data?._id && <Button>Home</Button>}
      {currentUser?.data?._id &&
        routes.map((route, index) => (
          <NavButton
            label={route.label}
            href={route.href}
            isActive={pathname === route.href}
            key={index}
          />
        ))}
    </nav>
  );
}
