"use client";
import { EditProfileForm } from "@/components/profile/edit-profile-form";
import ProtectedRoute from "@/components/protected-route/protected-route";
import { useCurrentUser } from "@/features/users-api/use-current-user";
import { useRouter } from "next/navigation";
import React from "react";

const EditProfile = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const router = useRouter();

  const onBack = () => {
    router.push("/account");
  };

  const user = {
    id: currentUser?.data?._id,
    username: currentUser?.data?.username,
    email: currentUser?.data?.email,
    fullName: currentUser?.data?.fullName,
    address: currentUser?.data?.address,
    avatar: currentUser?.data?.avatar,
    description: currentUser?.data?.description,
    contactNumber: currentUser?.data?.contactNumber,
  };

  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen p-2 md:p-4 flex justify-center items-center overflow-auto">
        <div className="w-full max-w-[95%] sm:max-w-2xl">
          <EditProfileForm user={user} isLoading={isLoading} onBack={onBack} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default EditProfile;
