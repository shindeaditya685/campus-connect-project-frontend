import { useMutation } from "@tanstack/react-query";
import api from "@/lib/request-interceptor";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ProfileFormValues } from "@/components/profile/edit-profile-form";

const updateDetails = async (data: ProfileFormValues) => {
  const response = await api.patch("/users/update-details", data);
  return response.data;
};

export const useUpdateDetails = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: updateDetails,
    onSuccess: () => {
      router.push("/account");
      toast.success("Profile updated successfully!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      console.log(error);

      const errorMessage = error.response?.data?.message || "An error occurred";
      toast.error(errorMessage);
    },
  });
};
