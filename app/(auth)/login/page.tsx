"use client";

import { LoginForm } from "@/components/auth/login-form";

const LoginPage = () => {
  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 flex justify-center items-center overflow-auto">
      <div className="w-full max-w-[95%] sm:max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
