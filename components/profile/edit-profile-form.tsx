import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, ArrowLeft } from "lucide-react"; // Import icons

// Zod schema for form validation
const profileSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(1, "Username is required"),
  address: z.string().optional(),
  contactNumber: z
    .string()
    .regex(/^\d+$/, "Contact Number must be digits only")
    .optional(),
  description: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface User {
  fullName: string;
  email: string;
  username: string;
  address: string;
  contactNumber: string;
  description: string;
}

interface EditProfileProps {
  user: User;
  isLoading: boolean;
  onBack: () => void; // Add onBack prop for the back button
}

export const EditProfileForm: React.FC<EditProfileProps> = ({
  user,
  isLoading,
  onBack,
}) => {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      address: user.address,
      contactNumber: user.contactNumber,
      description: user.description,
    },
  });

  // Update form default values when `user` prop changes
  useEffect(() => {
    form.reset({
      fullName: user.fullName,
      email: user.email,
      username: user.username,
      address: user.address,
      contactNumber: user.contactNumber,
      description: user.description,
    });
  }, [user, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    console.log(values);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <Button
          variant="ghost"
          onClick={onBack}
          className="p-0"
          disabled={isLoading}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <CardTitle>Edit Profile</CardTitle>
        <div className="w-6" /> {/* Spacer for alignment */}
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      {...field}
                      disabled={isLoading}
                    />
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
                    <Input
                      placeholder="Email"
                      type="email"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Username"
                      {...field}
                      disabled={isLoading}
                    />
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
                    <Input
                      placeholder="Address"
                      {...field}
                      disabled={isLoading}
                    />
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
                    <Input
                      placeholder="Contact Number"
                      {...field}
                      disabled={isLoading}
                    />
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
                    <Input
                      placeholder="Description"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
