"use client";
import React, { useEffect, useState } from "react";
import { UserProfile } from "@/components/profile/user-profile";
import { useCurrentUser } from "@/features/users-api/use-current-user";
import api from "@/lib/request-interceptor";
import { useRouter } from "next/navigation";
import { useUsersAvailbaleBooks } from "@/features/users-api/use-users-available-books";
import ProtectedRoute from "@/components/protected-route/protected-route";

const Profile = () => {
  const {
    data: currentUser,
    isLoading: isUserLoading,
    refetch,
  } = useCurrentUser();

  const { data: usersBooks, isLoading: isBooksLoading } =
    useUsersAvailbaleBooks(currentUser?.data?._id);

  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
  const [avatarKey, setAvatarKey] = useState(Date.now());
  const router = useRouter();

  useEffect(() => {
    if (currentUser?.data?.avatar) {
      setAvatarKey(Date.now());
    }
  }, [currentUser?.data?.avatar]);

  const user = {
    username: currentUser?.data?.username,
    email: currentUser?.data?.email,
    fullName: currentUser?.data?.fullName,
    address: currentUser?.data?.address,
    avatar: `${currentUser?.data?.avatar}?${avatarKey}`,
    description: currentUser?.data?.description,
    contactNumber: currentUser?.data?.contactNumber,
  };

  const onEditAvatar = async (file: File) => {
    if (!file) return;

    setIsUpdatingAvatar(true);
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response = await api.patch("users/update-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        console.log("Avatar updated successfully");
        await refetch(); // Refresh user data
        setAvatarKey(Date.now()); // Force avatar refresh
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
    } finally {
      setIsUpdatingAvatar(false);
    }
  };

  const onUpdatePassword = () => {
    router.push("/change-password");
  };

  type BookData = {
    _id: string;
    title: string;
    price: number;
    status: string;
  };

  const books =
    usersBooks?.data?.map((book: BookData) => ({
      id: book._id,
      title: book.title,
      price: book.price,
      status: book.status,
    })) || [];

  // console.log("books", books);

  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen p-2 md:p-4 flex justify-center items-center overflow-auto">
        <div className="w-full max-w-[95%] sm:max-w-2xl">
          <UserProfile
            user={user}
            onUpdatePassword={onUpdatePassword}
            onEditAvatar={onEditAvatar}
            isLoading={isUserLoading || isBooksLoading}
            isUpdatingAvatar={isUpdatingAvatar}
            books={books}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
