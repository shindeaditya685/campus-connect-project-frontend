/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Home, Phone, FileText, Camera, Lock } from "lucide-react";
import { useRegister } from "@/features/users-api/use-register";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  fullName: z.string().min(1, { message: "Full name is required." }),
  avatar: z.any().optional(),
  address: z.string().min(1, { message: "Address is required." }),
  description: z.string().optional(),
  contactNumber: z
    .string()
    .regex(/^\d{10}$/, { message: "Contact number must be 10 digits." }),
  password: z.string().min(4, "Password must be at least 4 characters."),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      fullName: "",
      address: "",
      description: "",
      contactNumber: "",
      password: "",
    },
  });

  const [error, setError] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const router = useRouter();

  const mutation = useRegister();

  async function onSubmit(values: RegisterFormData) {
    setError(null);
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (typeof value === "string") {
          formData.append(key, value);
        }
      });

      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }

      // @ts-expect-error
      await mutation.mutateAsync(formData);
      router.push("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Please check the fields and try again."
      );
    }
  }

  return (
    <Card className="w-full max-w-[95%] sm:max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl text-center">
          Register
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-8"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <Input
                        className="flex-grow"
                        placeholder="johndoe"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <Input
                        className="flex-grow"
                        type="email"
                        placeholder="john@example.com"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="avatar"
              render={() => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Camera className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <Input
                        className="flex-grow"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setAvatarFile(file);
                        }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Home className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <Input
                        className="flex-grow"
                        placeholder="123 Main St, City, Country"
                        {...field}
                      />
                    </div>
                  </FormControl>
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
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <Textarea
                        className="flex-grow"
                        placeholder="Tell us about yourself"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <Input
                        className="flex-grow"
                        placeholder="1234567890"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription>10-digit phone number</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <Lock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                      <Input
                        className="flex-grow"
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Registering..." : "Register"}
            </Button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </Form>
        <div className="pt-4 w-full text-center text-sm">
          <Link
            href={"/login"}
            className="text-gray-400 hover:underline font-medium"
          >
            Already registered?
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
