import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function NavLogo() {
  return (
    <div>
      <Link
        href="/"
        className="text-white/80 flex items-center justify-center space-x-2 cursor-pointer"
      >
        <BookOpen size={30} />
        {/* <span className="font-bold text-xl">CampusBookConnect</span> */}
      </Link>
    </div>
  );
}
