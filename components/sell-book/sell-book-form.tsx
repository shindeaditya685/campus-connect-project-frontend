"use client";

import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, BookOpen, IndianRupeeIcon } from "lucide-react";
import { useRegisterBook } from "@/features/books-api/use-register-book";

const educationLevels = [
  "Elementary School (Primary School)",
  "Middle School (Secondary School)",
  "High School",
  "Undergraduate",
  "Postgraduate",
] as const;

const specificStandards = {
  "Elementary School (Primary School)": [
    "1st Grade",
    "2nd Grade",
    "3rd Grade",
    "4th Grade",
    "5th Grade",
  ],
  "Middle School (Secondary School)": ["6th Grade", "7th Grade", "8th Grade"],
  "High School": ["9th Grade", "10th Grade", "11th Grade", "12th Grade"],
  Undergraduate: ["Freshman", "Sophomore", "Junior", "Senior"],
  Postgraduate: ["Master's", "Doctoral", "Post-Doctoral"],
} as const;

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

const formSchema = z.object({
  title: z.string().min(1, "Book title is required"),
  educationLevel: z.enum(educationLevels),
  specificStandard: z.string().min(1, "Specific standard is required"),
  instituteName: z.string().min(4, "Institute name is required"),
  bookCondition: z.enum(bookConditions),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  images: z
    .array(z.instanceof(File))
    .min(1, "At least one image is required")
    .max(3, "Maximum 3 images allowed"),
});

export type RegisterFormValues = z.infer<typeof formSchema>;

export default function SellBookForm() {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const { mutate: registerBook, isPending } = useRegisterBook();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      educationLevel: undefined,
      specificStandard: "",
      bookCondition: undefined,
      description: "",
      price: undefined,
      images: [],
    },
  });

  const watchEducationLevel = form.watch("educationLevel");

  const specificStandardOptions = useMemo(() => {
    if (watchEducationLevel) {
      return specificStandards[watchEducationLevel];
    }
    return [];
  }, [watchEducationLevel]);

  const onSubmit = (data: RegisterFormValues) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "images") {
        formData.append(key, value.toString());
      }
    });
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });
    registerBook(formData);
  };

  return (
    <Card className="w-full  max-w-2xl mx-auto  shadow-lg hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          List your book right now!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter book title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="educationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Education Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {educationLevels.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="specificStandard"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Specific Standard</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={!watchEducationLevel}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select specific standard" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {specificStandardOptions.map((std) => (
                        <SelectItem key={std} value={std}>
                          {std}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instituteName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Institute Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter institute name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ... Rest of the form fields remain the same ... */}
            <FormField
              control={form.control}
              name="bookCondition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Book Condition</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select book condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {bookConditions.map((condition) => (
                        <SelectItem key={condition} value={condition}>
                          {condition}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your book" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <IndianRupeeIcon
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        type="number"
                        placeholder="0.00"
                        className="pl-10"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload Images</FormLabel>
                  <FormControl>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="images"
                            className="relative cursor-pointer bg-red-600 rounded-md font-medium text-white px-2 hover:text-gray-200 mx-auto focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload images</span>
                            <input
                              id="images"
                              name="images"
                              type="file"
                              className="sr-only"
                              multiple
                              accept="image/*"
                              onChange={(e) => {
                                const files = Array.from(e.target.files || []);
                                setImageFiles(files);
                                field.onChange(files);
                              }}
                            />
                          </label>
                        </div>
                        <p className="text-xs">
                          PNG, JPG, GIF up to 10MB (Max 3 images)
                        </p>
                      </div>
                    </div>
                  </FormControl>
                  <FormDescription>
                    {imageFiles.length > 0 &&
                      `${imageFiles.length} image(s) selected`}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              <BookOpen className="mr-2 h-4 w-4" />
              {isPending ? "Listing..." : "List Book for Sale"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
