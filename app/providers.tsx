"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient();
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        {children}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default Providers;
