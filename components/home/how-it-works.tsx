"use client";
import { Book, ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HowItWorksPage() {
  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <section className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-10 text-white tracking-wide">
          How It Works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          <button
            onClick={() => handleClick("list-book")}
            className="flex flex-col items-center bg-white/10 p-6 rounded-lg shadow-lg hover:bg-white/20 transition duration-300"
          >
            <Book size={48} className="mb-4 text-white" />
            <h3 className="text-xl font-semibold mb-2 text-white">
              List Your Books
            </h3>
            <p className="text-white text-center">
              Post your textbooks for sale in minutes.
            </p>
          </button>
          <button
            onClick={() => handleClick("books")}
            className="flex flex-col items-center bg-white/10 p-6 rounded-lg shadow-lg hover:bg-white/20 transition duration-300"
          >
            <Search size={48} className="mb-4 text-white" />
            <h3 className="text-xl font-semibold mb-2 text-white">
              Find Great Deals
            </h3>
            <p className="text-white text-center">
              Search for the books you need at low prices.
            </p>
          </button>
          <button
            onClick={() => handleClick("orders")}
            className="flex flex-col items-center bg-white/10 p-6 rounded-lg shadow-lg hover:bg-white/20 transition duration-300"
          >
            <ArrowRight size={48} className="mb-4 text-white" />
            <h3 className="text-xl font-semibold mb-2 text-white">
              Meet and Exchange
            </h3>
            <p className="text-white text-center">
              Connect with buyers/sellers on campus.
            </p>
          </button>
        </div>
      </div>
    </section>
  );
}
