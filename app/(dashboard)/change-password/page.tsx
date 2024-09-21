import UpdatePasswordPage from "@/components/profile/update-password-form";
import React from "react";

const ChangePassword = () => {
  return (
    <div className="w-full min-h-screen p-2 md:p-4 flex justify-center items-center overflow-auto">
      <div className="w-full max-w-[95%] sm:max-w-2xl">
        <UpdatePasswordPage />
      </div>
    </div>
  );
};

export default ChangePassword;
