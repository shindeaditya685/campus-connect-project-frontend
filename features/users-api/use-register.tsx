/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/request-interceptor";
import { toast } from "react-toastify";
import { RegisterFormData } from "@/components/auth/register-form";

const registerUser = async (data: RegisterFormData) => {
  const response = await api.post("/users/register", data);
  return response.data;
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      // console.log("Login successful:", data);
      toast.success("You have registered successfully", data.message);

      // Redirect to home page or update app state
    },
    onError: (error: any) => {
      console.log(error.response);
      toast.error(error.response?.data || error.message);
    },
  });
};
