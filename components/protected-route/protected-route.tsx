"use client";

import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/users-api/use-current-user";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!currentUser) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
