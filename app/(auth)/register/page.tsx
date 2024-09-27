"use client";
import { RegisterForm } from "@/components/auth/register-form";
import { useCurrentUser } from "@/features/users-api/use-current-user";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();

  if (currentUser) {
    router.push("/");
  }

  return (
    <div className="w-full min-h-screen  p-4 sm:p-6 md:p-8 flex justify-center items-center overflow-auto">
      <div className="w-full max-w-[95%] sm:max-w-md">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
