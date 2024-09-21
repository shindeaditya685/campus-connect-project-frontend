import BrowseBooksComponent from "@/components/browse-books/browse-books";
import React from "react";

const Books = () => {
  return (
    <div className="w-full min-h-screen p-2 md:p-4 flex justify-center items-center overflow-auto">
      <div className="w-full max-w-[95%] ">
        <BrowseBooksComponent />
      </div>
    </div>
  );
};

export default Books;
