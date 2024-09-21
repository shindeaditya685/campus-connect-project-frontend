/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User, Edit, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookData {
  title: string;
  price: number;
  status: string;
}

interface UserProfileProps {
  user: {
    username: string;
    email: string;
    fullName: string;
    address: string;
    avatar: string;
    description: string;
    contactNumber: string;
  };
  onUpdatePassword: () => void;
  onEditAvatar: () => void;
  isLoading: boolean;
  isUpdatingAvatar: boolean;
  books: BookData[];
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  onUpdatePassword,
  onEditAvatar,
  isLoading,
  isUpdatingAvatar,
  books,
}) => {
  const router = useRouter();

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center ">
          <User className="mr-2" />
          {isLoading ? (
            "Loading User Profile..."
          ) : (
            <h1 className="text-2xl font-bold">User Profile</h1>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="animate-spin h-12 w-12 text-gray-600" />
          </div>
        ) : (
          <>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  {isUpdatingAvatar ? (
                    <div className="flex justify-center items-center py-10">
                      <Loader2 className="animate-spin h-12 w-12 text-gray-600" />
                    </div>
                  ) : (
                    <AvatarImage
                      src={user.avatar}
                      alt={user.fullName}
                      className="object-cover rounded-full"
                    />
                  )}
                  <AvatarFallback>{user.fullName}</AvatarFallback>
                </Avatar>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onEditAvatar(e.target.files[0])}
                />
                <Button
                  size="sm"
                  className="absolute bottom-0 right-0"
                  onClick={() =>
                    document.getElementById("avatar-upload").click()
                  }
                >
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.fullName}</h2>
                <p className="text-gray-500">@{user.username}</p>
              </div>
            </div>
            <Tabs defaultValue="info">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="info">Personal Info</TabsTrigger>
                <TabsTrigger value="listings">My Listings</TabsTrigger>
                <TabsTrigger value="transactions">
                  Transaction History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="info">
                <Card>
                  <CardContent className="space-y-4 mt-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" value={user.fullName} readOnly />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user.email} readOnly />
                    </div>
                    <div>
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" value={user.username} readOnly />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" value={user.address} readOnly />
                    </div>
                    <div>
                      <Label htmlFor="contactNumber">Contact Number</Label>
                      <Input
                        id="contactNumber"
                        value={user.contactNumber}
                        readOnly
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Input
                        id="description"
                        value={user.description}
                        readOnly
                      />
                    </div>
                    <div className="flex space-x-2">
                      <Button onClick={() => router.push("/edit-profile")}>
                        <Edit className="mr-2 h-4 w-4" /> Edit Profile
                      </Button>
                      <Button onClick={onUpdatePassword} variant="outline">
                        Update Password
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="listings">
                <Card>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Book Title</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {books?.map((book, index) => (
                          <TableRow key={index}>
                            <TableCell>{book?.title}</TableCell>
                            <TableCell>${book?.price}</TableCell>
                            <TableCell>{book?.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="transactions">
                <Card>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Book Title</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>JavaScript: The Good Parts</TableCell>
                          <TableCell>Sale</TableCell>
                          <TableCell>$40.00</TableCell>
                          <TableCell>2023-09-15</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Data Science for Beginners</TableCell>
                          <TableCell>Purchase</TableCell>
                          <TableCell>$55.00</TableCell>
                          <TableCell>2023-09-10</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </>
        )}
      </CardContent>
    </Card>
  );
};
