import { useMutation } from "@tanstack/react-query";
import api from "@/lib/request-interceptor";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { PasswordFormValues } from "@/components/profile/update-password-form";

const updatePassword = async (data: PasswordFormValues) => {
  const response = await api.patch("/users/change-password", data);
  return response.data;
};

export const useUpdatePassword = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      router.push("/account");
      toast.success("Password Updated Successfully!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error);

      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    },
  });
};
