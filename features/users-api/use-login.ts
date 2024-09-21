import { LoginFormData } from "@/components/auth/login-form";
import { useMutation } from "@tanstack/react-query";
import api from "@/lib/request-interceptor";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const loginUser = async (data: LoginFormData) => {
  const response = await api.post("/users/login", data);

  if (response.data.accessToken) {
    localStorage.setItem("accessToken", response.data.accessToken);
  }
  return response.data;
};

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("accessToken", data.data.accessToken);
      router.push("/");
      toast.success("Logged in successfully!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log();
      toast.error(error.response?.data?.message);
    },
  });
};
