"use client";
import { UserProfile } from "@/components/profile/user-profile";
import { useCurrentUser } from "@/features/users-api/use-current-user";

const Profile = () => {
  const { data: currentUser, isLoading } = useCurrentUser();

  if (!currentUser) {
    console.log("Not current user found");
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
    <div className="w-full min-h-screen p-2 md:p-4 flex justify-center items-center overflow-auto">
      <div className="w-full max-w-[95%] sm:max-w-2xl">
        <UserProfile
          user={user}
          onUpdatePassword={() => {}}
          onEditAvatar={() => {}}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default Profile;
