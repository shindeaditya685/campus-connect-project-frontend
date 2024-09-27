"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const featuredBooks = [
  {
    title: "Introduction to Psychology",
    author: "John Smith",
    price: 25,
    condition: "Good",
  },
  {
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    price: 40,
    condition: "Like New",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 15,
    condition: "Fair",
  },
];

type Props = {
  title: string;
  author: string;
  price: number;
  condition: string;
};

const FeaturedBook = ({ title, author, price, condition }: Props) => (
  <Card className="w-full bg-white/10 border-none rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
    <CardHeader className="bg-gradient-to-r from-red-600 to-red-800  p-4">
      <CardTitle className="text-xl font-bold text-white line-clamp-2">
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="p-4">
      <p className="text-sm text-gray-300">By {author}</p>
      <p className="text-2xl font-bold text-white mt-2">${price}</p>
      <p className="text-sm text-gray-400 mt-1">Condition: {condition}</p>
    </CardContent>
    <CardFooter className="p-4">
      <Button className="w-full bg-white text-red-600 hover:bg-gray-100 transition-colors duration-300">
        View Details
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </CardFooter>
  </Card>
);

export const FeaturedBooksSection = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/books");
  };
  return (
    <section className=" py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
          Featured Books
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBooks.map((book, index) => (
            <FeaturedBook key={index} {...book} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button
            onClick={handleClick}
            className="px-8 py-3 text-lg font-semibold bg-white text-red-600 hover:bg-gray-100 transition-colors duration-300 rounded-full shadow-lg hover:shadow-xl"
          >
            View All Books
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
