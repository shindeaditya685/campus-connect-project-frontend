"use client";

import { useRouter } from "next/navigation";
import TypingText from "./typing-text";
import { Button } from "../ui/button";
import { BookOpen } from "lucide-react";

export default function HeroLandingPage() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/books");
  };
  return (
    <section className="bg-gradient-to-br from-red-600 to-red-800 text-white py-24 px-6">
      <div className="container mx-auto max-w-4xl space-y-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          YOUR CAMPUS BOOK
          <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
            MARKETPLACE
          </span>
        </h1>
        <TypingText />
        <div>
          <Button
            onClick={handleClick}
            className="px-8 py-4 text-lg font-semibold bg-white text-red-600 hover:bg-gray-100 transition-colors duration-300 rounded-full shadow-lg hover:shadow-xl"
          >
            <span>Explore Books</span>
            <BookOpen size={24} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
