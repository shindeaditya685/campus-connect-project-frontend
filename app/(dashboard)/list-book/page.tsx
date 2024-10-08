import ProtectedRoute from "@/components/protected-route/protected-route";
import SellBookForm from "@/components/sell-book/sell-book-form";
import React from "react";

const SellBookPage = () => {
  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen p-2 md:p-4 flex justify-center items-center overflow-auto">
        <div className="w-full max-w-[95%] sm:max-w-2xl">
          <SellBookForm />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default SellBookPage;
