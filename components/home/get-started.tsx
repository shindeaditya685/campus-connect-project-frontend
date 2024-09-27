"use client";
import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useCurrentUser } from "@/features/users-api/use-current-user";
import { useRouter } from "next/navigation";

export default function GetStartedPage() {
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();

  const router = useRouter();

  const handleClick = (path: string) => {
    router.push(`/${path}`);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4  text-white">
          Ready to Get Started?
        </h2>
        <p className="text-xl mb-8 text-white">
          Join our community of student book exchangers today!
        </p>
        {isUserLoading ? (
          <Button className="bg-white text-red-600">
            <Loader2 className="animate-spin" />
          </Button>
        ) : currentUser?.data?._id ? (
          <Button
            onClick={() => handleClick("books")}
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100"
          >
            Get started
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        ) : (
          <Button
            onClick={() => handleClick("register")}
            size="lg"
            className="bg-white text-red-600 hover:bg-gray-100"
          >
            Sign Up Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </div>
    </section>
  );
}
