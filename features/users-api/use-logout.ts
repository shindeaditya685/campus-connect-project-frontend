import api from "@/lib/request-interceptor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const logoutUser = async () => {
  localStorage.removeItem("accessToken");
  delete api.defaults.headers.common["Authorization"];
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.clear();
      router.push("/login");
      toast.success("Logged out successfully");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error(error.response?.data || error.message);
    },
  });
};
