"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

type Props = {
  label: string;
  href: string;
  isActive?: boolean;
};

export default function NavButton({ label, href, isActive }: Props) {
  const router = useRouter();

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <Button
      className={cn(
        "text-white border-none transition-colors duration-300 ease-in-out",
        isActive
          ? "bg-red-600 text-white hover:bg-red-700" // Active state styles
          : "bg-slate-800 text-gray-300 hover:bg-slate-700 hover:text-white" // Inactive state styles
      )}
      onClick={() => onClick(href)}
    >
      {label}
    </Button>
  );
}
