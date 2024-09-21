import { useMutation } from "@tanstack/react-query";
import api from "@/lib/request-interceptor";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const registerBook = async (data: FormData) => {
  const response = await api.post("/books/register-book", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useRegisterBook = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: registerBook,
    onSuccess: () => {
      router.push("/books");
      toast.success("Book registered successfully!");
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while registering the book."
      );
    },
  });
};
