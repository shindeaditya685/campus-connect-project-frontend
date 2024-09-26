"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BackButton = ({ isLoading }: { isLoading: boolean }) => {
  const router = useRouter();

  useEffect(() => {
    // Save the current scroll position when the component mounts
    const handleBeforeUnload = () => {
      sessionStorage.setItem("scrollPosition", window.pageYOffset.toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // Restore scroll position when the component mounts
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition));
      sessionStorage.removeItem("scrollPosition");
    }
  }, []);

  const handleBack = () => {
    router.back();
  };

  return (
    <Button
      onClick={handleBack}
      variant="outline"
      className="mb-4"
      disabled={isLoading}
    >
      <ArrowLeft className="mr-2 h-4 w-4" /> Back
    </Button>
  );
};

export default BackButton;
