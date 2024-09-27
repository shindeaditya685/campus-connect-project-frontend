import UpdatePasswordPage from "@/components/profile/update-password-form";
import ProtectedRoute from "@/components/protected-route/protected-route";
import React from "react";

const ChangePassword = () => {
  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen p-2 md:p-4 flex justify-center items-center overflow-auto">
        <div className="w-full max-w-[95%] sm:max-w-2xl">
          <UpdatePasswordPage />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ChangePassword;
