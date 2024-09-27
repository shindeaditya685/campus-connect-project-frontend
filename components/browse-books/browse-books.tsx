/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, IndianRupee, School } from "lucide-react";
import { useAllBooks } from "@/features/books-api/use-all-books";
import { useRouter } from "next/navigation";
import { useAddToCart } from "@/features/cart/use-add-to-cart";

// Define types for education levels and book conditions
const educationLevels = [
  "Elementary School (Primary School)",
  "Middle School (Secondary School)",
  "High School",
  "Undergraduate",
  "Postgraduate",
] as const;

const bookConditions = [
  "Mint",
  "Like New",
  "Near Fine",
  "Fine",
  "Very Good",
  "Good",
  "Fair",
  "Poor",
] as const;

type EducationLevel = (typeof educationLevels)[number];
type BookCondition = (typeof bookConditions)[number];

// Define interfaces for our data structures
interface RawBook {
  _id: string;
  title: string;
  seller: {
    fullName: string;
  };
  educationLevel: EducationLevel;
  instituteName: string;
  bookCondition: BookCondition;
  price: number;
  images: string[];
  status: string;
}

interface ProcessedBook {
  id: string;
  title: string;
  bookCondition: BookCondition;
  sellerFullname: string;
  educationLevel: EducationLevel;
  instituteName: string;
  price: number;
  image: string;
  status: string;
}

interface FilterSelectProps<T extends string> {
  id: string;
  label: string;
  placeholder: string;
  options: readonly T[];
  onValueChange: (value: T | null) => void;
  value: T | null;
}

interface PriceRangeSliderProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  max: number;
}

interface BookCardProps {
  book: ProcessedBook;
}

const BrowseBooksComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEducationLevel, setSelectedEducationLevel] = useState<
    EducationLevel | ""
  >("");
  const [selectedCondition, setSelectedCondition] = useState<
    BookCondition | ""
  >("");
  const [selectedInstitute, setSelectedInstitute] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const { data: allBooks, isLoading } = useAllBooks();

  const [availableBooks, setAvailableBooks] = useState<ProcessedBook[]>([]);

  useEffect(() => {
    if (allBooks?.data) {
      const processed: ProcessedBook[] = allBooks.data.map((book: RawBook) => ({
        id: book._id,
        title: book.title,
        bookCondition: book.bookCondition,
        sellerFullname: book.seller.fullName,
        educationLevel: book.educationLevel,
        instituteName: book.instituteName,
        price: book.price,
        image: book.images[0],
        status: book.status,
      }));
      setAvailableBooks(processed);
    }
  }, [allBooks]);

  const filteredBooks = availableBooks.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesEducationLevel =
      !selectedEducationLevel || book.educationLevel === selectedEducationLevel;
    const matchesCondition =
      !selectedCondition || book.bookCondition === selectedCondition;
    const matchesInstitute =
      !selectedInstitute || book.instituteName === selectedInstitute;
    const matchesPrice =
      book.price >= priceRange[0] && book.price <= priceRange[1];

    return (
      matchesSearch &&
      matchesEducationLevel &&
      matchesCondition &&
      matchesInstitute &&
      matchesPrice
    );
  });

  const instituteNames = [
    ...new Set(availableBooks.map((book) => book.instituteName)),
  ];

  return (
    <div className="flex flex-col md:flex-row">
      {/* Fixed Filter sidebar */}
      <div className="w-full md:w-1/4 md:fixed md:top-[7rem] md:left-0 md:bottom-0 md:overflow-y-auto p-4">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FilterSelect
              id="education-level"
              label="Education Level"
              placeholder="Select education level"
              options={educationLevels}
              value={selectedEducationLevel}
              onValueChange={(value) =>
                setSelectedEducationLevel(value as EducationLevel)
              }
            />
            <FilterSelect
              id="condition"
              label="Book Condition"
              placeholder="Select condition"
              options={bookConditions}
              value={selectedCondition}
              onValueChange={(value) =>
                setSelectedCondition(value as BookCondition)
              }
            />
            <FilterSelect
              id="institute"
              label="Institute"
              placeholder="Select institute"
              options={instituteNames}
              value={selectedInstitute}
              onValueChange={setSelectedInstitute}
            />
            <PriceRangeSlider
              value={priceRange}
              onChange={setPriceRange}
              max={1000}
            />
          </CardContent>
        </Card>
      </div>

      {/* Books grid */}
      <div className="w-full md:w-3/4 md:ml-[25%] p-6  min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <p className="col-span-full text-center text-lg font-semibold">
              Loading books...
            </p>
          ) : filteredBooks.length > 0 ? (
            filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <p className="col-span-full text-center text-lg font-semibold">
              No books found matching the current filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterSelect = <T extends string>({
  id,
  label,
  placeholder,
  options,
  onValueChange,
  value,
}: FilterSelectProps<T>) => (
  <div>
    <label htmlFor={id} className="text-sm font-medium">
      {label}
    </label>
    <Select
      onValueChange={(newValue) => onValueChange(newValue as T | null)}
      value={value || undefined}
    >
      <SelectTrigger id={id}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        {options.map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  value,
  onChange,
  max,
}) => (
  <div>
    <label htmlFor="price-range" className="text-sm font-medium">
      Price Range
    </label>
    <Slider
      id="price-range"
      min={0}
      max={max}
      step={1}
      value={value}
      onValueChange={onChange}
      className="mt-2"
    />
    <div className="flex justify-between text-sm mt-1">
      <span>${value[0]}</span>
      <span>${value[1]}</span>
    </div>
  </div>
);

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const router = useRouter();
  const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigating to book details
    addToCart(book.id);
  };

  return (
    <Card
      className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
      onClick={() => router.push(`books/${book.id}`)}
    >
      <div className="relative h-48">
        <Image
          src={book.image}
          alt={book.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg truncate">{book.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600">{book.sellerFullname}</p>
        <p className="text-sm mt-2 flex items-center">
          <BookOpen className="inline mr-1 h-4 w-4" /> {book.educationLevel}
        </p>
        <p className="text-sm mt-1">Condition: {book.bookCondition}</p>
        <p className="text-sm mt-1 flex items-center">
          <School className="inline mr-1 h-4 w-4" /> {book.instituteName}
        </p>
        <p className="text-sm mt-1">Status: {book.status}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <span className="text-lg font-bold flex items-center">
          <IndianRupee className="inline mr-1 h-5 w-5" />
          {book.price}
        </span>
        <Button onClick={handleAddToCart} disabled={isAddingToCart}>
          {isAddingToCart ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BrowseBooksComponent;
