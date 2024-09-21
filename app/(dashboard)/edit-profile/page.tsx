"use client";
import { EditProfileForm } from "@/components/profile/edit-profile-form";
import { useCurrentUser } from "@/features/users-api/use-current-user";
import { useRouter } from "next/navigation";
import React from "react";

const EditProfile = () => {
  const { data: currentUser, isLoading } = useCurrentUser();
  const router = useRouter();

  const onBack = () => {
    router.push("/account");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!currentUser) {
    return <div>No user data found</div>;
  }

  const user = {
    username: currentUser?.data?.username,
    email: currentUser?.data?.email,
    fullName: currentUser?.data?.fullName,
    address: currentUser?.data?.address,
    avatar: currentUser?.data?.avatar,
    description: currentUser?.data?.description,
    contactNumber: currentUser?.data?.contactNumber,
  };

  return (
    <div>
      <EditProfileForm user={user} isLoading={isLoading} onBack={onBack} />
    </div>
  );
};

export default EditProfile;
