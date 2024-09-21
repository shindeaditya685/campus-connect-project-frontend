"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useLogin } from "@/features/users-api/use-login";

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters." }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const mutation = useLogin();

  const onSubmit = async (values: LoginFormData) => {
    setError(null);
    try {
      await mutation.mutateAsync(values);
      
    } catch (error) {
      console.log("Error occured while logging into account", error);
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <Card className="w-full max-w-[95%] sm:max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl sm:text-3xl text-center">
          Login
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
              {mutation.isPending ? "Logging in..." : "Login"}
            </Button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
